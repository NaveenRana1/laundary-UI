import axios from "axios";

// ─── In-memory token store (survives the tab, not localStorage) ──────────────
const tokenStore = {
  get: () => window.__accessToken ?? null,
  set: (token) => { window.__accessToken = token; },
  clear: () => { delete window.__accessToken; },
};

// ─── Axios instance ───────────────────────────────────────────────────────────
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",

  // CRITICAL: sends the HttpOnly refresh-token cookie on every request
  withCredentials: true,

  headers: { "Content-Type": "application/json" },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue  = [];   // requests that arrived while refresh was in-flight

/**
 * Flush the queue once we know the refresh result.
 * @param {Error|null} error   - pass error to reject all, null to resolve all
 * @param {string|null} token  - the fresh access token (only when error === null)
 */
const flushQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  failedQueue = [];
};

// ─── Request interceptor — attach in-memory access token ─────────────────────
API.interceptors.request.use(
  (config) => {
    const token = tokenStore.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor — transparent token refresh on 401 ─────────────────
API.interceptors.response.use(
  // 2xx — pass straight through
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ── Not a 401, or we already retried this request → give up ──────────────
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // ── A refresh is already running → queue this request ────────────────────
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      });
    }

    // ── We are the first 401 — own the refresh ────────────────────────────────
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      /**
       * POST /auth/refresh
       *
       * The browser automatically includes the HttpOnly refresh-token cookie
       * because withCredentials: true is set on the instance.
       *
       * Server must respond with:
       *   { access_token: "<jwt>" }
       *
       * Server should also rotate the refresh-token cookie here (sliding window).
       */
      const { data } = await API.post("/auth/refresh");
      const newAccessToken = data.access_token;

      // Store fresh token in memory only — never localStorage / sessionStorage
      tokenStore.set(newAccessToken);

      // Update default header so any parallel requests that bypass the
      // interceptor also get the new token.
      API.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

      // Let all queued requests retry with the new token
      flushQueue(null, newAccessToken);

      // Retry the original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return API(originalRequest);

    } catch (refreshError) {
      // Refresh token is expired / revoked / invalid
      flushQueue(refreshError, null);
      tokenStore.clear();

      // Remove stale default header
      delete API.defaults.headers.common["Authorization"];

      // Hard redirect to login — adapt if you use React Router
      window.location.href = "/login";

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

// ─── Exported helpers for auth endpoints ─────────────────────────────────────

/**
 * Call after a successful login.
 * The server sets the HttpOnly refresh-token cookie automatically in the
 * Set-Cookie response header — you only need to store the access token.
 */
export const setAccessToken = (token) => tokenStore.set(token);

/**
 * Call on explicit logout — also hit the server to revoke the cookie.
 */
export const logout = async () => {
  try {
    await API.post("/auth/logout"); // server clears the HttpOnly cookie
  } finally {
    tokenStore.clear();
    delete API.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  }
};

export default API;
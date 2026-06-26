import { useState } from "react";
import API, { setAccessToken } from "./api";   // ← use memory store, not localStorage
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  .lw-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: #f4f1ec;
    position: relative;
    overflow: hidden;
  }

  .lw-wrap::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    border: 40px solid rgba(26,54,93,0.06);
    border-radius: 50%;
  }

  .lw-wrap::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -40px;
    width: 280px; height: 280px;
    border: 50px solid rgba(26,54,93,0.04);
    border-radius: 50%;
  }

  .lw-card {
    background: #fff;
    border: 0.5px solid #d6d0c5;
    border-radius: 4px;
    width: 100%;
    max-width: 360px;
    padding: 2.5rem 2rem 2rem;
    position: relative;
    z-index: 1;
  }

  .lw-topbar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1a365d 0%, #c8a96e 100%);
    border-radius: 4px 4px 0 0;
  }

  .lw-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .lw-icon {
    width: 38px; height: 38px;
    background: #1a365d;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  .lw-icon i {
    font-size: 18px;
    color: #c8a96e;
  }

  .lw-brand {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #1a365d;
    line-height: 1;
  }

  .lw-brand span {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-top: 2px;
  }

  .lw-heading {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 4px;
    text-align: center;
  }

  .lw-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #8a8070;
    text-align: center;
    margin: 0 0 1.75rem;
    font-weight: 300;
  }

  .lw-field {
    margin-bottom: 1rem;
  }

  .lw-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #5a5040;
    display: block;
    margin-bottom: 6px;
  }

  .lw-input-wrap {
    display: flex;
    align-items: center;
    border: 1px solid #d6d0c5;
    border-radius: 2px;
    background: #faf9f7;
    transition: border-color 0.2s;
  }

  .lw-input-wrap:focus-within {
    border-color: #1a365d;
    background: #fff;
  }

  .lw-input-wrap i {
    font-size: 15px;
    color: #b0a898;
    padding: 0 10px 0 12px;
    flex-shrink: 0;
  }

  .lw-input-wrap input {
    flex: 1;
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1a1a1a;
    padding: 10px 12px 10px 0;
    outline: none;
    box-shadow: none;
  }

  .lw-input-wrap input::placeholder {
    color: #c0b8ac;
    font-weight: 300;
  }

  .lw-eye-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 12px 0 4px;
    color: #b0a898;
    font-size: 15px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }
  .lw-eye-btn:hover { color: #1a365d; }

  .lw-forgot {
    text-align: right;
    margin-top: 6px;
  }

  .lw-forgot a {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #c8a96e;
    text-decoration: none;
    font-weight: 400;
    cursor: pointer;
  }

  .lw-forgot a:hover { text-decoration: underline; }

  .lw-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 1.5rem 0 1.25rem;
  }

  .lw-divider::before, .lw-divider::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: #e0dbd2;
  }

  .lw-divider span {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: #b0a898;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .lw-btn {
    width: 100%;
    background: #1a365d;
    color: #fff;
    border: none;
    border-radius: 2px;
    padding: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .lw-btn:hover { background: #162d52; }
  .lw-btn:active { transform: scale(0.98); }
  .lw-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .lw-btn i { font-size: 15px; }

  .lw-register {
    text-align: center;
    margin-top: 1.5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #8a8070;
    font-weight: 300;
  }

  .lw-register a {
    color: #1a365d;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid #c8a96e;
    padding-bottom: 1px;
    cursor: pointer;
  }

  .lw-badges {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 1.75rem;
    padding-top: 1.25rem;
    border-top: 0.5px solid #e8e3da;
    flex-wrap: wrap;
  }

  .lw-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    color: #9a9080;
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 300;
    letter-spacing: 0.04em;
  }

  .lw-badge i { font-size: 12px; color: #c8a96e; }

  .lw-error {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #b94040;
    background: #fdf0f0;
    border: 0.5px solid #e8c0c0;
    border-radius: 2px;
    padding: 8px 12px;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      /**
       * Store access token in memory only (never localStorage).
       * The refresh token is an HttpOnly cookie — the browser handles it
       * automatically. setAccessToken() writes to window.__accessToken.
       */
      setAccessToken(res.data.access_token);

      navigate("/dashboard");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : "Invalid email or password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <>
      <style>{styles}</style>

      <div className="lw-wrap">
        <div className="lw-card">
          <div className="lw-topbar" />

          {/* Logo */}
          <div className="lw-logo">
            <div className="lw-icon">
              <i className="ti ti-shirt" aria-hidden="true" />
            </div>
            <div className="lw-brand">
              Fresh Fold
              <span>Premium Laundry</span>
            </div>
          </div>

          <h2 className="lw-heading">Welcome back</h2>
          <p className="lw-sub">Sign in to manage your orders</p>

          {error && <div className="lw-error">{error}</div>}

          <div className="lw-field">
            <label className="lw-label" htmlFor="email">
              Email
            </label>
            <div className="lw-input-wrap">
              <i className="ti ti-mail" aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="rahul@example.com"
                value={form.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="lw-field">
            <label className="lw-label" htmlFor="password">
              Password
            </label>
            <div className="lw-input-wrap">
              <i className="ti ti-lock" aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="lw-eye-btn"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                <i className={`ti ${showPwd ? "ti-eye-off" : "ti-eye"}`} />
              </button>
            </div>
          </div>

          <div className="lw-forgot">
            <a onClick={() => navigate("/forgot-password")}>Forgot password?</a>
          </div>

          <div className="lw-divider">
            <span>or</span>
          </div>

          <button className="lw-btn" onClick={login} disabled={loading}>
            <i className="ti ti-arrow-right" aria-hidden="true" />
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="lw-register">
            New customer?{" "}
            <a onClick={() => navigate("/register")}>Create an account</a>
          </p>

          <div className="lw-badges">
            <span className="lw-badge">
              <i className="ti ti-shield-check" aria-hidden="true" /> Secure
              login
            </span>
            <span className="lw-badge">
              <i className="ti ti-clock" aria-hidden="true" /> 24hr pickup
            </span>
            <span className="lw-badge">
              <i className="ti ti-star" aria-hidden="true" /> 5-star care
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
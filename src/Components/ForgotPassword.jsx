import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

/* ─── Design tokens (matches Login.jsx palette) ──────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  /* ── Reset & base ── */
  .fp-wrap *,
  .fp-wrap *::before,
  .fp-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Page shell ── */
  .fp-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: #f4f1ec;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Decorative rings (same as Login) ── */
  .fp-wrap::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 240px; height: 240px;
    border: 44px solid rgba(26,54,93,0.055);
    border-radius: 50%;
  }
  .fp-wrap::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -40px;
    width: 300px; height: 300px;
    border: 52px solid rgba(26,54,93,0.035);
    border-radius: 50%;
  }

  /* ── Card ── */
  .fp-card {
    background: #fff;
    border: 0.5px solid #d6d0c5;
    border-radius: 4px;
    width: 100%;
    max-width: 380px;
    padding: 0 0 2rem;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  /* ── Accent top bar ── */
  .fp-topbar {
    height: 4px;
    background: linear-gradient(90deg, #1a365d 0%, #c8a96e 100%);
  }

  /* ── Card body padding ── */
  .fp-body { padding: 2rem 2rem 0; }

  /* ── Logo ── */
  .fp-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2rem;
    justify-content: center;
  }
  .fp-logo-icon {
    width: 38px; height: 38px;
    background: #1a365d;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .fp-logo-icon i { font-size: 18px; color: #c8a96e; }
  .fp-brand {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 600;
    color: #1a365d; line-height: 1;
  }
  .fp-brand span {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px; font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c8a96e; margin-top: 2px;
  }

  /* ── Step indicator ── */
  .fp-steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-bottom: 2rem;
  }
  .fp-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    flex: 1;
  }
  .fp-step-dot {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 2px solid #d6d0c5;
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 500;
    color: #b0a898;
    transition: all 0.35s ease;
    position: relative;
    z-index: 1;
  }
  .fp-step-dot.active {
    border-color: #1a365d;
    background: #1a365d;
    color: #c8a96e;
  }
  .fp-step-dot.done {
    border-color: #c8a96e;
    background: #c8a96e;
    color: #fff;
  }
  .fp-step-label {
    font-size: 10px; font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #b0a898;
    white-space: nowrap;
  }
  .fp-step-label.active { color: #1a365d; font-weight: 500; }
  .fp-step-label.done   { color: #c8a96e; }

  .fp-step-line {
    flex: 1;
    height: 1.5px;
    background: #e0dbd2;
    margin-bottom: 18px;
    transition: background 0.35s ease;
    max-width: 48px;
  }
  .fp-step-line.done { background: #c8a96e; }

  /* ── Heading ── */
  .fp-heading {
    font-family: 'Playfair Display', serif;
    font-size: 21px; font-weight: 600;
    color: #1a1a1a; text-align: center; margin-bottom: 4px;
  }
  .fp-sub {
    font-size: 13px; font-weight: 300;
    color: #8a8070; text-align: center;
    margin-bottom: 1.75rem; line-height: 1.5;
  }

  /* ── Fields ── */
  .fp-field { margin-bottom: 1rem; }
  .fp-label {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #5a5040;
    display: block; margin-bottom: 6px;
  }
  .fp-input-wrap {
    display: flex; align-items: center;
    border: 1px solid #d6d0c5;
    border-radius: 2px;
    background: #faf9f7;
    transition: border-color 0.2s, background 0.2s;
  }
  .fp-input-wrap:focus-within {
    border-color: #1a365d; background: #fff;
  }
  .fp-input-wrap i {
    font-size: 15px; color: #b0a898;
    padding: 0 10px 0 12px; flex-shrink: 0;
  }
  .fp-input-wrap input {
    flex: 1; border: none; background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: #1a1a1a;
    padding: 10px 12px 10px 0; outline: none;
  }
  .fp-input-wrap input::placeholder { color: #c0b8ac; font-weight: 300; }

  /* Eye toggle */
  .fp-eye {
    background: none; border: none; cursor: pointer;
    padding: 0 12px 0 4px; color: #b0a898;
    font-size: 15px; display: flex; align-items: center;
    transition: color 0.2s;
  }
  .fp-eye:hover { color: #1a365d; }

  /* Password strength bar */
  .fp-strength {
    margin-top: 6px;
    display: flex; gap: 4px;
  }
  .fp-strength-seg {
    flex: 1; height: 3px; border-radius: 2px;
    background: #e8e3da;
    transition: background 0.3s ease;
  }
  .fp-strength-seg.s1 { background: #c0392b; }
  .fp-strength-seg.s2 { background: #e67e22; }
  .fp-strength-seg.s3 { background: #f1c40f; }
  .fp-strength-seg.s4 { background: #27ae60; }
  .fp-strength-text {
    font-size: 10px; color: #9a9080;
    margin-top: 4px; text-align: right;
    letter-spacing: 0.04em;
  }

  /* ── Button ── */
  .fp-btn {
    width: 100%; background: #1a365d; color: #fff;
    border: none; border-radius: 2px; padding: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 0.25rem;
  }
  .fp-btn:hover:not(:disabled) { background: #162d52; }
  .fp-btn:active:not(:disabled) { transform: scale(0.98); }
  .fp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .fp-btn i { font-size: 15px; }

  /* ── Spinner ── */
  @keyframes fp-spin { to { transform: rotate(360deg); } }
  .fp-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: fp-spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  /* ── Success panel ── */
  @keyframes fp-pop {
    0%   { opacity: 0; transform: scale(0.88); }
    100% { opacity: 1; transform: scale(1); }
  }
  .fp-success {
    display: flex; flex-direction: column;
    align-items: center; text-align: center;
    padding: 1rem 0 0.5rem;
    animation: fp-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .fp-success-ring {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a365d 0%, #c8a96e 100%);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
    box-shadow: 0 8px 24px rgba(26,54,93,0.2);
  }
  .fp-success-ring i { font-size: 28px; color: #fff; }
  .fp-success h3 {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 600;
    color: #1a1a1a; margin-bottom: 8px;
  }
  .fp-success p {
    font-size: 13px; font-weight: 300;
    color: #8a8070; line-height: 1.6;
    max-width: 280px;
  }

  /* ── Alert / error ── */
  .fp-alert {
    font-size: 12px; color: #b94040;
    background: #fdf0f0;
    border: 0.5px solid #e8c0c0;
    border-radius: 2px; padding: 8px 12px;
    margin-bottom: 1rem; text-align: center;
    display: flex; align-items: center; gap: 6px;
    justify-content: center;
  }
  .fp-alert i { font-size: 14px; flex-shrink: 0; }

  /* ── Back link ── */
  .fp-back {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: #9a9080;
    cursor: pointer; margin-bottom: 1.5rem;
    width: fit-content;
    transition: color 0.2s;
    background: none; border: none;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }
  .fp-back:hover { color: #1a365d; }
  .fp-back i { font-size: 14px; }

  /* ── Footer badges ── */
  .fp-footer {
    display: flex; gap: 8px; justify-content: center;
    margin-top: 1.75rem; padding: 1.25rem 2rem 0;
    border-top: 0.5px solid #e8e3da; flex-wrap: wrap;
  }
  .fp-badge {
    font-size: 10px; color: #9a9080;
    display: flex; align-items: center; gap: 4px;
    font-weight: 300; letter-spacing: 0.04em;
  }
  .fp-badge i { font-size: 12px; color: #c8a96e; }

  /* ── Hint text ── */
  .fp-hint {
    font-size: 11px; color: #b0a898;
    margin-top: 5px; padding-left: 2px;
  }

  /* ── Animate-in ── */
  @keyframes fp-slide {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fp-animate { animation: fp-slide 0.3s ease both; }
`;

/* ─── Password strength helper ───────────────────────────────────────────── */
function getStrength(pwd) {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];

/* ─── Step indicator component ───────────────────────────────────────────── */
function Steps({ current }) {
  const steps = ["Request", "Check email", "Reset"];
  return (
    <div className="fp-steps">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done   = idx < current;
        const active = idx === current;
        return (
          <div key={label} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
            <div className="fp-step">
              <div className={`fp-step-dot ${done ? "done" : active ? "active" : ""}`}>
                {done ? <i className="ti ti-check" style={{ fontSize: 12 }} /> : idx}
              </div>
              <span className={`fp-step-label ${done ? "done" : active ? "active" : ""}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`fp-step-line ${done ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FORGOT PASSWORD  (Step 1 + Step 2 success view)
   POST /forgot-password  →  { message, reset: token }
═══════════════════════════════════════════════════════════════════════════ */
export function ForgotPassword() {
  const navigate = useNavigate();
  const [email,   setEmail]   = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);

  const handleSubmit = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("That doesn't look like a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      /**
       * POST /forgot-password
       * body: { email }
       * success: { message, reset: "<token>" }
       *
       * Note: in production, the server would email the link — here the token
       * comes back in the response so you can test without SMTP setup.
       */
      const { data } = await API.post("/forgot-password", { email: trimmed });

      /**
       * If your backend sends the token in the response (dev mode), you can
       * forward the user straight to /reset-password?token=<token>.
       * Comment this out and rely on the email link in production.
       */
      if (data.reset) {
        // dev shortcut — remove in production
        navigate(`/reset-password?token=${data.reset}`);
        return;
      }

      setSent(true);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fp-wrap">
        <div className="fp-card">
          <div className="fp-topbar" />
          <div className="fp-body">

            {/* Logo */}
            <div className="fp-logo">
              <div className="fp-logo-icon">
                <i className="ti ti-shirt" />
              </div>
              <div className="fp-brand">
                Fresh Fold
                <span>Premium Laundry</span>
              </div>
            </div>

            <Steps current={sent ? 2 : 1} />

            {/* ── Sent success ── */}
            {sent ? (
              <div className="fp-success fp-animate">
                <div className="fp-success-ring">
                  <i className="ti ti-mail-check" />
                </div>
                <h3>Check your inbox</h3>
                <p>
                  We've sent a password reset link to <strong>{email}</strong>.
                  It expires in 1 hour.
                </p>
                <button
                  className="fp-btn"
                  style={{ marginTop: "1.5rem", maxWidth: 240 }}
                  onClick={() => navigate("/login")}
                >
                  <i className="ti ti-arrow-left" />
                  Back to sign in
                </button>
              </div>
            ) : (
              /* ── Request form ── */
              <div className="fp-animate">
                <button className="fp-back" onClick={() => navigate("/login")}>
                  <i className="ti ti-arrow-left" /> Back to sign in
                </button>

                <h2 className="fp-heading">Forgot password?</h2>
                <p className="fp-sub">
                  Enter the email on your account and we'll send a reset link.
                </p>

                {error && (
                  <div className="fp-alert">
                    <i className="ti ti-alert-circle" />
                    {error}
                  </div>
                )}

                <div className="fp-field">
                  <label className="fp-label" htmlFor="fp-email">Email address</label>
                  <div className="fp-input-wrap">
                    <i className="ti ti-mail" />
                    <input
                      id="fp-email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={email}
                      autoComplete="email"
                      onChange={(e) => { setError(""); setEmail(e.target.value); }}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                  </div>
                  <p className="fp-hint">
                    <i className="ti ti-info-circle" style={{ fontSize: 11, marginRight: 4 }} />
                    The link expires in 1 hour.
                  </p>
                </div>

                <button className="fp-btn" onClick={handleSubmit} disabled={loading}>
                  {loading
                    ? <><div className="fp-spinner" /> Sending…</>
                    : <><i className="ti ti-send" /> Send reset link</>
                  }
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="fp-footer">
            <span className="fp-badge">
              <i className="ti ti-shield-lock" /> Secure reset
            </span>
            <span className="fp-badge">
              <i className="ti ti-clock" /> Expires in 1 hr
            </span>
            <span className="fp-badge">
              <i className="ti ti-star" /> 5-star care
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESET PASSWORD  (Step 3)
   POST /reset-password  →  { message }
   Reads ?token=<token> from the URL — matches your backend PasswordReset model
═══════════════════════════════════════════════════════════════════════════ */
export function ResetPassword() {
  const navigate = useNavigate();

  // Pull the token from the URL: /reset-password?token=<token>
  const token = new URLSearchParams(window.location.search).get("token") ?? "";

  const [form,      setForm]      = useState({ password: "", confirm: "" });
  const [showPwd,   setShowPwd]   = useState(false);
  const [showConf,  setShowConf]  = useState(false);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [done,      setDone]      = useState(false);

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    setError("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.password) { setError("Please enter a new password."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (form.password !== form.confirm) { setError("Passwords don't match."); return; }
    if (!token) { setError("Reset token is missing. Please request a new link."); return; }

    setLoading(true);
    setError("");
    try {
      /**
       * POST /reset-password
       * body: { token, new_password }   ← matches your reset_password() signature
       */
      await API.post("/reset-password", {
        token,
        new_password: form.password,
      });
      setDone(true);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : "Reset failed. The link may have expired — please request a new one."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fp-wrap">
        <div className="fp-card">
          <div className="fp-topbar" />
          <div className="fp-body">

            {/* Logo */}
            <div className="fp-logo">
              <div className="fp-logo-icon">
                <i className="ti ti-shirt" />
              </div>
              <div className="fp-brand">
                Fresh Fold
                <span>Premium Laundry</span>
              </div>
            </div>

            <Steps current={done ? 4 : 3} />

            {/* ── Success ── */}
            {done ? (
              <div className="fp-success fp-animate">
                <div className="fp-success-ring">
                  <i className="ti ti-shield-check" />
                </div>
                <h3>Password updated</h3>
                <p>
                  Your password has been changed. You can now sign in with your
                  new credentials.
                </p>
                <button
                  className="fp-btn"
                  style={{ marginTop: "1.5rem", maxWidth: 220 }}
                  onClick={() => navigate("/login")}
                >
                  <i className="ti ti-login" /> Sign in now
                </button>
              </div>
            ) : (
              /* ── Reset form ── */
              <div className="fp-animate">
                <h2 className="fp-heading">Set new password</h2>
                <p className="fp-sub">
                  Choose something strong — your clothes deserve it.
                </p>

                {error && (
                  <div className="fp-alert">
                    <i className="ti ti-alert-circle" />
                    {error}
                  </div>
                )}

                {/* New password */}
                <div className="fp-field">
                  <label className="fp-label" htmlFor="rp-password">New password</label>
                  <div className="fp-input-wrap">
                    <i className="ti ti-lock" />
                    <input
                      id="rp-password"
                      name="password"
                      type={showPwd ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="fp-eye"
                      onClick={() => setShowPwd((v) => !v)}
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      <i className={`ti ${showPwd ? "ti-eye-off" : "ti-eye"}`} />
                    </button>
                  </div>

                  {/* Strength bar */}
                  {form.password && (
                    <>
                      <div className="fp-strength">
                        {[1, 2, 3, 4].map((seg) => (
                          <div
                            key={seg}
                            className={`fp-strength-seg ${strength >= seg ? `s${strength}` : ""}`}
                          />
                        ))}
                      </div>
                      <p className="fp-strength-text">{STRENGTH_LABELS[strength]}</p>
                    </>
                  )}
                </div>

                {/* Confirm password */}
                <div className="fp-field">
                  <label className="fp-label" htmlFor="rp-confirm">Confirm password</label>
                  <div
                    className="fp-input-wrap"
                    style={
                      form.confirm && form.confirm !== form.password
                        ? { borderColor: "#c0392b" }
                        : form.confirm && form.confirm === form.password
                        ? { borderColor: "#27ae60" }
                        : {}
                    }
                  >
                    <i
                      className="ti ti-lock-check"
                      style={
                        form.confirm && form.confirm === form.password
                          ? { color: "#27ae60" }
                          : {}
                      }
                    />
                    <input
                      id="rp-confirm"
                      name="confirm"
                      type={showConf ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={form.confirm}
                      onChange={handleChange}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="fp-eye"
                      onClick={() => setShowConf((v) => !v)}
                      aria-label={showConf ? "Hide" : "Show"}
                    >
                      <i className={`ti ${showConf ? "ti-eye-off" : "ti-eye"}`} />
                    </button>
                  </div>
                </div>

                <button className="fp-btn" onClick={handleSubmit} disabled={loading}>
                  {loading
                    ? <><div className="fp-spinner" /> Updating…</>
                    : <><i className="ti ti-check" /> Update password</>
                  }
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="fp-footer">
            <span className="fp-badge">
              <i className="ti ti-shield-lock" /> Encrypted reset
            </span>
            <span className="fp-badge">
              <i className="ti ti-clock" /> Token expires in 1 hr
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
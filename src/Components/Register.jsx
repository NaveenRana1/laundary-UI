import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  .rw-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: #f4f1ec;
    position: relative;
    overflow: hidden;
  }

  .rw-wrap::before {
    content: '';
    position: absolute;
    top: -80px; left: -60px;
    width: 260px; height: 260px;
    border: 45px solid rgba(200,169,110,0.08);
    border-radius: 50%;
  }

  .rw-wrap::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -40px;
    width: 220px; height: 220px;
    border: 40px solid rgba(26,54,93,0.05);
    border-radius: 50%;
  }

  .rw-card {
    background: #fff;
    border: 0.5px solid #d6d0c5;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    padding: 2.5rem 2rem 2rem;
    position: relative;
    z-index: 1;
  }

  .rw-topbar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #c8a96e 0%, #1a365d 100%);
    border-radius: 4px 4px 0 0;
  }

  .rw-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .rw-icon {
    width: 38px; height: 38px;
    background: #c8a96e;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  .rw-icon i {
    font-size: 18px;
    color: #fff;
  }

  .rw-brand {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #1a365d;
    line-height: 1;
  }

  .rw-brand span {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-top: 2px;
  }

  .rw-heading {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 4px;
    text-align: center;
  }

  .rw-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #8a8070;
    text-align: center;
    margin: 0 0 1.75rem;
    font-weight: 300;
  }

  .rw-field {
    margin-bottom: 1rem;
  }

  .rw-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #5a5040;
    display: block;
    margin-bottom: 6px;
  }

  .rw-input-wrap {
    display: flex;
    align-items: center;
    border: 1px solid #d6d0c5;
    border-radius: 2px;
    background: #faf9f7;
    transition: border-color 0.2s;
  }

  .rw-input-wrap:focus-within {
    border-color: #c8a96e;
    background: #fff;
  }

  .rw-input-wrap.rw-input-error {
    border-color: #c0392b;
    background: #fdf8f8;
  }

  .rw-input-wrap i {
    font-size: 15px;
    color: #b0a898;
    padding: 0 10px 0 12px;
    flex-shrink: 0;
  }

  .rw-input-wrap input {
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

  .rw-input-wrap input::placeholder {
    color: #c0b8ac;
    font-weight: 300;
  }

  .rw-eye-btn {
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
  .rw-eye-btn:hover { color: #1a365d; }

  .rw-field-hint {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: #b94040;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Password strength */
  .rw-strength {
    margin-top: 6px;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .rw-strength-bar {
    flex: 1;
    height: 3px;
    background: #e8e3da;
    border-radius: 2px;
    transition: background 0.3s;
  }

  .rw-strength-bar.active-weak   { background: #c0392b; }
  .rw-strength-bar.active-fair   { background: #e67e22; }
  .rw-strength-bar.active-good   { background: #f0c040; }
  .rw-strength-bar.active-strong { background: #27ae60; }

  .rw-strength-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    color: #9a9080;
    min-width: 42px;
    text-align: right;
    letter-spacing: 0.04em;
  }

  /* Password rules checklist */
  .rw-rules {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .rw-rule {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #aaa098;
    transition: color 0.2s;
  }

  .rw-rule.met { color: #27ae60; }
  .rw-rule.unmet { color: #c0392b; }

  .rw-rule i { font-size: 12px; }

  .rw-terms {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 1.25rem 0 1.5rem;
  }

  .rw-terms input[type="checkbox"] {
    margin-top: 2px;
    accent-color: #1a365d;
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  .rw-terms label {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #8a8070;
    font-weight: 300;
    line-height: 1.5;
    cursor: pointer;
  }

  .rw-terms label a {
    color: #1a365d;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid #c8a96e;
    padding-bottom: 1px;
  }

  .rw-btn {
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

  .rw-btn:hover { background: #162d52; }
  .rw-btn:active { transform: scale(0.98); }
  .rw-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .rw-btn i { font-size: 15px; }

  .rw-login {
    text-align: center;
    margin-top: 1.5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #8a8070;
    font-weight: 300;
  }

  .rw-login a {
    color: #1a365d;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid #c8a96e;
    padding-bottom: 1px;
    cursor: pointer;
  }

  .rw-perks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 1.75rem;
    padding-top: 1.25rem;
    border-top: 0.5px solid #e8e3da;
  }

  .rw-perk {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: #9a9080;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 300;
  }

  .rw-perk i { font-size: 13px; color: #c8a96e; flex-shrink: 0; }

  .rw-error {
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

  .rw-success {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #2d7a4f;
    background: #f0fdf5;
    border: 0.5px solid #b0dfc0;
    border-radius: 2px;
    padding: 8px 12px;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

// ── Password rule checks ──
const rules = [
  { key: "length",   label: "At least 8 characters",           test: (p) => p.length >= 8 },
  { key: "upper",    label: "One uppercase letter (A–Z)",       test: (p) => /[A-Z]/.test(p) },
  { key: "number",   label: "One number (0–9)",                 test: (p) => /[0-9]/.test(p) },
  { key: "symbol",   label: "One symbol (!@#$%^&*…)",           test: (p) => /[^A-Za-z0-9]/.test(p) },
];

function getStrength(password) {
  const passed = rules.filter((r) => r.test(password)).length;
  return passed; // 0–4
}

const strengthMeta = ["", "Weak", "Fair", "Good", "Strong"];
const strengthClass = ["", "active-weak", "active-fair", "active-good", "active-strong"];

// ── Simple email format check ──
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [agreed, setAgreed]   = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [touched, setTouched] = useState({});   // track which fields were blurred
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const strength      = getStrength(form.password);
  const ruleResults   = rules.map((r) => ({ ...r, met: r.test(form.password) }));
  const allRulesMet   = ruleResults.every((r) => r.met);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  // ── Field-level inline hints ──
  const nameError  = touched.name  && !form.name.trim()           ? "Name is required." : "";
  const emailError = touched.email && !isValidEmail(form.email)   ? "Enter a valid email address." : "";

  const register = async () => {
    // Mark all touched so hints appear
    setTouched({ name: true, email: true, password: true });

    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!allRulesMet) {
      setError("Password does not meet all requirements.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/register", {
        name:     form.name.trim(),
        email:    form.email.trim().toLowerCase(),
        password: form.password,
      });
      setSuccess("Account created! Redirecting you to login…");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const msg = err?.response?.data?.detail || "";
      if (msg.toLowerCase().includes("email")) {
        setError("This email is already registered. Try signing in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") register();
  };

  return (
    <>
      <style>{styles}</style>

      <div className="rw-wrap">
        <div className="rw-card">
          <div className="rw-topbar" />

          {/* Logo */}
          <div className="rw-logo">
            <div className="rw-icon">
              <i className="ti ti-shirt" aria-hidden="true" />
            </div>
            <div className="rw-brand">
              Fresh Fold
              <span>Premium Laundry</span>
            </div>
          </div>

          <h2 className="rw-heading">Create your account</h2>
          <p className="rw-sub">Fresh starts begin here</p>

          {error   && <div className="rw-error">{error}</div>}
          {success && <div className="rw-success">{success}</div>}

          {/* ── Full Name ── */}
          <div className="rw-field">
            <label className="rw-label" htmlFor="name">Full Name</label>
            <div className={`rw-input-wrap ${nameError ? "rw-input-error" : ""}`}>
              <i className="ti ti-user" aria-hidden="true" />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Rahul Sharma"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoComplete="name"
              />
            </div>
            {nameError && (
              <div className="rw-field-hint">
                <i className="ti ti-alert-circle" /> {nameError}
              </div>
            )}
          </div>

          {/* ── Email ── */}
          <div className="rw-field">
            <label className="rw-label" htmlFor="email">Email Address</label>
            <div className={`rw-input-wrap ${emailError ? "rw-input-error" : ""}`}>
              <i className="ti ti-mail" aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="rahul@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoComplete="email"
              />
            </div>
            {emailError && (
              <div className="rw-field-hint">
                <i className="ti ti-alert-circle" /> {emailError}
              </div>
            )}
          </div>

          {/* ── Password ── */}
          <div className="rw-field">
            <label className="rw-label" htmlFor="password">Password</label>
            <div className="rw-input-wrap">
              <i className="ti ti-lock" aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="rw-eye-btn"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                <i className={`ti ${showPwd ? "ti-eye-off" : "ti-eye"}`} />
              </button>
            </div>

            {/* Strength meter */}
            {form.password.length > 0 && (
              <div className="rw-strength">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`rw-strength-bar ${strength >= level ? strengthClass[strength] : ""}`}
                  />
                ))}
                <span className="rw-strength-label">{strengthMeta[strength]}</span>
              </div>
            )}

            {/* Rules checklist — shown once user starts typing */}
            {form.password.length > 0 && (
              <div className="rw-rules">
                {ruleResults.map((r) => (
                  <div key={r.key} className={`rw-rule ${r.met ? "met" : "unmet"}`}>
                    <i className={`ti ${r.met ? "ti-circle-check" : "ti-circle-x"}`} />
                    {r.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="rw-terms">
            <input
              id="agree"
              type="checkbox"
              checked={agreed}
              onChange={(e) => { setError(""); setAgreed(e.target.checked); }}
            />
            <label htmlFor="agree">
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          <button className="rw-btn" onClick={register} disabled={loading}>
            <i className="ti ti-user-plus" aria-hidden="true" />
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="rw-login">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Sign in</a>
          </p>

          {/* Perks */}
          <div className="rw-perks">
            <span className="rw-perk">
              <i className="ti ti-truck-delivery" aria-hidden="true" /> Free pickup
            </span>
            <span className="rw-perk">
              <i className="ti ti-clock" aria-hidden="true" /> 24hr turnaround
            </span>
            <span className="rw-perk">
              <i className="ti ti-shield-check" aria-hidden="true" /> Secure & private
            </span>
            <span className="rw-perk">
              <i className="ti ti-star" aria-hidden="true" /> 5-star service
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
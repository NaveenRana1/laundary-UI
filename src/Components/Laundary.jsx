import { useState } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { font-family: 'DM Sans', sans-serif; }
  h1,h2,h3,.font-display { font-family: 'Playfair Display', serif; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.5);opacity:0} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .float { animation: float 4s ease-in-out infinite; }
  .spin-slow { animation: spin-slow 12s linear infinite; }
  .fade-up { animation: fadeUp 0.7s ease both; }
  .spin { animation: spin 0.8s linear infinite; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .bubble { position:absolute; border-radius:50%; }
  .shimmer {
    background: linear-gradient(90deg, #e0f2fe 25%, #bae6fd 50%, #e0f2fe 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;

// ── CONFIG: change this to your backend URL ──
const API_BASE_URL = "https://laundary-beckend.onrender.com";

const SERVICES = [
  { icon: "🧺", title: "Wash & Fold",   desc: "Fresh, fluffy laundry folded and ready. Per-kg pricing, same-day available.", price: "₹60/kg",    color: "from-sky-400 to-blue-500"     },
  { icon: "👔", title: "Dry Cleaning",  desc: "Expert care for delicates, suits, and silks. Stain treatment included.",      price: "₹150/pc",   color: "from-violet-400 to-purple-600" },
  { icon: "🔥", title: "Steam Ironing", desc: "Crisp, wrinkle-free clothes pressed to perfection.",                          price: "₹15/pc",    color: "from-orange-400 to-red-500"    },
  { icon: "👟", title: "Shoe Cleaning", desc: "Deep clean and whitening for all types of footwear.",                         price: "₹200/pair", color: "from-emerald-400 to-teal-600"  },
  { icon: "🛏️", title: "Bedding & Linen", desc: "Duvets, comforters, curtains — large items handled with care.",            price: "₹200/pc",   color: "from-pink-400 to-rose-500"     },
  { icon: "🧥", title: "Premium Care",  desc: "Luxury fabrics, bridal wear, leather jackets — white-glove treatment.",      price: "Custom",    color: "from-yellow-400 to-amber-500"  },
];

const STEPS = [
  { num: "01", title: "Schedule Pickup", desc: "Book online or call us. Choose your time slot — we come to you." },
  { num: "02", title: "We Collect",      desc: "Our rider picks up your laundry bag from your doorstep." },
  { num: "03", title: "Expert Cleaning", desc: "Your clothes are sorted, cleaned, and quality-checked." },
  { num: "04", title: "Delivered Fresh", desc: "Clean, folded, and packaged clothes delivered back to you." },
];

const PLANS = [
  { plan: "Basic",    price: "₹299", desc: "Up to 5kg laundry. Wash & fold. 48hr delivery.",                              highlight: false },
  { plan: "Standard", price: "₹549", desc: "Up to 10kg. Wash, fold & iron. 24hr delivery. Free pickup.",                  highlight: true  },
  { plan: "Premium",  price: "₹999", desc: "Unlimited pieces. All services. Same-day express. Priority support.",         highlight: false },
];

// ── Toast component ──
function Toast({ message, type, onClose }) {
  const colors = {
    error:   "bg-red-50 border-red-200 text-red-700",
    success: "bg-green-50 border-green-200 text-green-700",
    info:    "bg-sky-50 border-sky-200 text-sky-700",
  };
  const icons = { error: "❌", success: "✅", info: "ℹ️" };
  return (
    <div className={`fixed top-20 right-4 z-[100] flex items-start gap-3 px-5 py-4 rounded-2xl border shadow-xl max-w-sm fade-up ${colors[type]}`}>
      <span>{icons[type]}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={onClose} className="text-lg leading-none opacity-50 hover:opacity-100 ml-2">×</button>
    </div>
  );
}

// ── Logout helper ──
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

// ── Spinner ──
function Spinner() {
  return (
    <svg className="spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
  );
}

export default function Laundary() {
  const [activeNav,  setActiveNav]  = useState("home");
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [toast,      setToast]      = useState(null); // { message, type }
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    quantity: "",
    date: "",
    notes: "",
  });

  // ── Show toast helper ──
  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // ── Field updater ──
  const setField = (key, value) => setForm(f => ({ ...f, [key]: value }));

  // ── Basic email validation ──
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ── Form validation ──
  const isFormValid = form.name.trim() && form.email.trim() && form.phone.trim() && form.service;

  // ── Submit handler ──
  const handleOrder = async () => {
    if (!isFormValid) {
      showToast("Please fill in Name, Email, Phone, and Service Type.", "error");
      return;
    }

    if (!isValidEmail(form.email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      showToast("Please enter a valid 10-digit phone number.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          phone:   form.phone.trim(),
          address: form.address.trim(),
          service: form.service,
          date:    form.date,
          notes:   form.notes.trim(),
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Server returned an unexpected response. Please try again.");
      }

      if (response.ok) {
        setSubmitted(true);
        showToast("Booking confirmed! We'll call you shortly.", "success");
      } else {
        const errMsg =
          typeof data?.detail === "string"
            ? data.detail
            : Array.isArray(data?.detail)
            ? data.detail.map(e => e.msg).join(", ")
            : data?.message || data?.error || "Booking failed. Please try again.";
        showToast(errMsg, "error");
      }
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        showToast(
          "Cannot reach server. Check if your backend is running on " + API_BASE_URL,
          "error"
        );
      } else {
        showToast(err.message || "Something went wrong. Please try again.", "error");
      }
      console.error("[FreshFold] Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", address: "", service: "", date: "", notes: "" });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <style>{fontStyle}</style>

      {/* ── TOAST ── */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">F</div>
            <span className="font-display font-bold text-xl text-gray-900">Fresh<span className="text-sky-500">Fold</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["home","services","how-it-works","pricing","contact"].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`text-sm font-medium capitalize transition-colors cursor-pointer ${activeNav === id ? "text-sky-600" : "text-gray-500 hover:text-gray-900"}`}>
                {id.replace(/-/g," ")}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+917876193566" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">📞 +91 78761 93566</a>
            <button onClick={() => scrollTo("contact")} className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-sky-200 cursor-pointer">
              Book Pickup
            </button>
            {/* ── LOGOUT BUTTON ── */}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 hover:bg-red-50 px-4 py-2 rounded-full transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-700 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-700"></div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-sky-50 px-6 py-4 flex flex-col gap-4">
            {["home","services","how-it-works","pricing","contact"].map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm font-medium capitalize text-gray-700">
                {id.replace(/-/g," ")}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="bg-sky-500 text-white text-sm font-semibold px-5 py-2 rounded-full w-full">Book Pickup</button>
            {/* ── MOBILE LOGOUT ── */}
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-red-500 border border-red-200 bg-red-50 px-5 py-2 rounded-full w-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-blue-200/30 rounded-full blur-3xl"></div>
        {[...Array(6)].map((_,i) => (
          <div key={i} className="bubble" style={{
            width:`${30+i*15}px`, height:`${30+i*15}px`,
            top:`${15+i*12}%`, left:`${5+i*15}%`,
            background:`rgba(56,189,248,${0.06+i*0.02})`,
            animation:`float ${3+i}s ease-in-out infinite`,
            animationDelay:`${i*0.5}s`
          }}/>
        ))}
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-semibold px-4 py-2 rounded-full mb-6 fade-up">
              <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
              Available Today · Same Day Delivery
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight text-gray-900 fade-up delay-1">
              Laundry,<br/>
              <span className="text-sky-500">Done Right.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-md fade-up delay-2">
              Professional wash, dry, fold, and delivery — right from your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 fade-up delay-3">
              <button onClick={() => scrollTo("contact")}
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-sky-200 hover:-translate-y-0.5 cursor-pointer">
                Schedule Free Pickup →
              </button>
              <button onClick={() => scrollTo("services")}
                className="border-2 border-gray-200 hover:border-sky-300 text-gray-700 font-semibold px-8 py-4 rounded-2xl transition-all hover:bg-sky-50 cursor-pointer">
                View Services
              </button>
            </div>
            <div className="mt-12 flex gap-8 fade-up delay-4">
              {[["10K+","Happy Customers"],["24hr","Turnaround"],["4.9★","Rating"]].map(([val,label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold text-gray-900">{val}</div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end fade-up delay-2">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] float shadow-2xl shadow-sky-300/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-2">🧺</div>
                  <div className="font-display text-xl font-semibold">Fresh & Clean</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 float" style={{animationDelay:"1s"}}>
                <div className="text-2xl">✨</div>
                <div className="text-xs font-semibold text-gray-700 mt-1">Eco Detergent</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 float" style={{animationDelay:"2s"}}>
                <div className="text-2xl">🚀</div>
                <div className="text-xs font-semibold text-gray-700 mt-1">Express 6hr</div>
              </div>
              <div className="absolute -inset-6 border-2 border-dashed border-sky-200 rounded-full spin-slow opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-blue-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">From everyday laundry to special care garments — we handle it all with expertise and love.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sky-600 font-bold text-lg">{s.price}</span>
                  <button onClick={() => scrollTo("contact")} className="text-xs font-semibold text-sky-500 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer">
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r"></div>
            {STEPS.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-200 group-hover:from-sky-400 group-hover:to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                  <span className="font-display text-2xl font-bold text-sky-600 group-hover:text-white transition-colors">{step.num}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-sky-500 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <p className="text-sky-200 font-semibold text-sm uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">Simple, Fair Prices</h2>
            <p className="mt-4 text-sky-100 max-w-xl mx-auto">No hidden charges. What you see is what you pay.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((p, i) => (
              <div key={i} className={`rounded-3xl p-8 border transition-all hover:-translate-y-1 ${p.highlight ? "bg-white text-gray-900 shadow-2xl border-white scale-105" : "bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20"}`}>
                {p.highlight && <div className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">Most Popular</div>}
                <div className={`font-display text-lg font-bold mb-2 ${p.highlight ? "text-gray-900" : "text-white"}`}>{p.plan}</div>
                <div className={`font-display text-4xl font-bold mb-1 ${p.highlight ? "text-sky-600" : "text-white"}`}>{p.price}</div>
                <div className={`text-xs mb-4 ${p.highlight ? "text-gray-400" : "text-sky-200"}`}>per order</div>
                <p className={`text-sm leading-relaxed mb-6 ${p.highlight ? "text-gray-600" : "text-sky-100"}`}>{p.desc}</p>
                <button onClick={() => scrollTo("contact")}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${p.highlight ? "bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-200" : "bg-white/10 hover:bg-white/20 text-white border border-white/30"}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="contact" className="py-24 bg-blue-100">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Get Started</p>
            <h2 className="font-display text-4xl font-bold text-gray-900">Schedule a Pickup</h2>
            <p className="mt-3 text-gray-500">Fill in your details and we'll reach out to confirm your slot.</p>
          </div>

          {submitted ? (
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-3xl p-12 text-center fade-up">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-500">We've received your request. Our team will call you within 30 minutes to confirm your pickup slot.</p>
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="text-sm text-gray-400 bg-white rounded-xl px-4 py-3 inline-block">
                  📞 Expect a call on <span className="font-semibold text-gray-700">{form.phone}</span>
                </div>
                <div className="text-sm text-gray-400 bg-white rounded-xl px-4 py-3 inline-block">
                  ✉️ Confirmation sent to <span className="font-semibold text-gray-700">{form.email}</span>
                </div>
              </div>
              <button onClick={resetForm} className="mt-6 block mx-auto bg-sky-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors cursor-pointer">
                Book Another
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-3xl p-8 border border-gray-100">
              {/* Row 1: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Rahul Sharma"
                    value={form.name}
                    onChange={e => setField("name", e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none bg-white text-sm transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={form.email}
                    onChange={e => setField("email", e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none bg-white text-sm transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Row 2: Phone */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => setField("phone", e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none bg-white text-sm transition-all disabled:opacity-50"
                />
              </div>

              {/* Row 3: Address */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Address</label>
                <input
                  type="text"
                  placeholder="Sector 17, Chandigarh"
                  value={form.address}
                  onChange={e => setField("address", e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none bg-white text-sm transition-all disabled:opacity-50"
                />
              </div>

              {/* Row 4: Service + Date */}
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.service}
                    onChange={e => setField("service", e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none bg-white text-sm transition-all disabled:opacity-50"
                  >
                    <option value="">Select service...</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={e => setField("date", e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none bg-white text-sm transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Row 5: Notes */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Any specific requirements, stains, or allergies..."
                  value={form.notes}
                  onChange={e => setField("notes", e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none bg-white text-sm transition-all resize-none disabled:opacity-50"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleOrder}
                disabled={!isFormValid || loading}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-sky-200 hover:-translate-y-0.5 text-sm cursor-pointer"
              >
                {loading ? (
                  <><Spinner /> Processing your booking...</>
                ) : !isFormValid ? (
                  "Fill required fields to continue"
                ) : (
                  "Schedule Free Pickup →"
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                <span className="text-red-400">*</span> Required fields &nbsp;·&nbsp; Free pickup · No prepayment · Cancel anytime
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold">F</div>
                <span className="font-display text-white font-bold text-lg">FreshFold</span>
              </div>
              <p className="text-sm leading-relaxed">Professional laundry & dry cleaning service. Fresh, fast, and delivered to your door.</p>
            </div>
            {[
              { title:"Services", links:["Wash & Fold","Dry Cleaning","Ironing","Shoe Cleaning"] },
              { title:"Company",  links:["About Us","How It Works","Pricing","Blog"] },
              { title:"Contact",  links:["+91 78761 93566","hello@freshfold.in","Mon-Sun: 7AM–10PM","Track Your Order"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => <li key={l} className="text-sm hover:text-sky-400 cursor-pointer transition-colors">{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2025 FreshFold. All rights reserved.</p>
            <div className="flex gap-4">
              {["Privacy Policy","Terms of Service","Refund Policy"].map(l => (
                <span key={l} className="text-xs hover:text-sky-400 cursor-pointer transition-colors">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
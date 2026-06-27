
const colors = {
  blue: "#1a6fc4",
  blueDark: "#155aa0",
  blueLight: "#E6F1FB",
  blueBorder: "#B5D4F4",
  blueText: "#185FA5",
  text: "#1a1a18",
  textSecondary: "#5c5c58",
  textMuted: "#9a9a96",
  bg: "#f5f5f3",
  surface: "#ffffff",
  surfaceAlt: "#f9f9f8",
  border: "rgba(0,0,0,0.10)",
  borderStrong: "rgba(0,0,0,0.18)",
};

const s = {
  
  root: { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: colors.bg, color: colors.text, minHeight: "100vh" },

  
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", borderBottom: `0.5px solid ${colors.border}`, background: colors.surface, position: "sticky", top: 0, zIndex: 100 },
  navBrand: { display: "flex", alignItems: "center", gap: 10 },
  navLogo: { width: 36, height: 36, background: colors.blue, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" },
  navLogoIcon: { color: "#fff", fontSize: 20 },
  navName: { fontSize: 18, fontWeight: 500, color: colors.text },
  navLinks: { display: "flex", alignItems: "center", gap: 8 },

  
  btnGhost: { background: "transparent", border: `0.5px solid ${colors.borderStrong}`, borderRadius: 8, padding: "7px 18px", fontSize: 14, cursor: "pointer", color: colors.text, fontFamily: "inherit" },
  btnPrimary: { background: colors.blue, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 14, cursor: "pointer", color: "#fff", fontFamily: "inherit", fontWeight: 500 },
  btnLgPrimary: { background: colors.blue, border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 15, cursor: "pointer", color: "#fff", fontFamily: "inherit", fontWeight: 500 },
  btnLgOutline: { background: "transparent", border: `0.5px solid ${colors.borderStrong}`, borderRadius: 8, padding: "12px 28px", fontSize: 15, cursor: "pointer", color: colors.text, fontFamily: "inherit", fontWeight: 500 },

  
  hero: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "5rem 2rem 4rem", gap: "1.5rem" },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 6, background: colors.blueLight, border: `0.5px solid ${colors.blueBorder}`, borderRadius: 99, padding: "5px 14px", fontSize: 13, color: colors.blueText, fontWeight: 500 },
  heroH1: { fontSize: 48, fontWeight: 500, lineHeight: 1.15, maxWidth: 640, color: colors.text },
  heroEm: { color: colors.blue, fontStyle: "normal" },
  heroP: { fontSize: 17, color: colors.textSecondary, maxWidth: 480, lineHeight: 1.7 },
  heroActions: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  heroStats: { display: "flex", gap: "2.5rem", marginTop: "1rem", flexWrap: "wrap", justifyContent: "center" },
  stat: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 },
  statNum: { fontSize: 24, fontWeight: 500 },
  statLabel: { fontSize: 13, color: colors.textSecondary },

  
  strip: { display: "flex", gap: 12, padding: "0 2rem 3rem", justifyContent: "center", flexWrap: "wrap" },
  stripCard: { background: colors.surface, border: `0.5px solid ${colors.border}`, borderRadius: 12, padding: "1.25rem", display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center", flex: 1, minWidth: 140, maxWidth: 170 },
  stripIcon: { width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 },
  stripTitle: { fontSize: 14, fontWeight: 500 },
  stripDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 1.4 },


  section: { padding: "3rem 2rem", maxWidth: 900, margin: "0 auto" },
  sectionLabel: { fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: colors.blue, fontWeight: 500, marginBottom: "0.5rem" },
  sectionH2: { fontSize: 28, fontWeight: 500, marginBottom: "2rem" },
  steps: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" },
  step: { display: "flex", flexDirection: "column", gap: 10 },
  stepNum: { width: 32, height: 32, background: colors.blueLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, color: colors.blueText },
  stepH3: { fontSize: 15, fontWeight: 500 },
  stepP: { fontSize: 14, color: colors.textSecondary, lineHeight: 1.6 },



  ctaSection: { padding: "2rem 2rem 5rem", textAlign: "center" },
  ctaGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", maxWidth: 640, margin: "0 auto", marginTop: "2rem" },
  ctaCard: { background: colors.surface, border: `0.5px solid ${colors.border}`, borderRadius: 12, padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" },
  ctaCardFeatured: { background: colors.surface, border: `1.5px solid ${colors.blueBorder}`, borderRadius: 12, padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" },
  ctaH3: { fontSize: 17, fontWeight: 500 },
  ctaP: { fontSize: 14, color: colors.textSecondary },
  authBtnBlue: { width: "100%", padding: 10, background: colors.blue, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", color: "#fff" },
  authBtnOutline: { width: "100%", padding: 10, background: "transparent", border: `0.5px solid ${colors.borderStrong}`, borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", color: colors.text },

};



function ServiceCard({ bg, iconColor, icon, title, desc }) {
  return (
    <div style={s.stripCard}>
      <div style={{ ...s.stripIcon, background: bg }}>
        <span style={{ color: iconColor, fontSize: 22 }}>{icon}</span>
      </div>
      <strong style={s.stripTitle}>{title}</strong>
      <p style={s.stripDesc}>{desc}</p>
    </div>
  );
}

function StepCard({ num, title, desc }) {
  return (
    <div style={s.step}>
      <div style={s.stepNum}>{num}</div>
      <h3 style={s.stepH3}>{title}</h3>
      <p style={s.stepP}>{desc}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, city, initials, avatarBg, avatarColor }) {
  return (
    <div style={s.testimonialCard}>
      <p style={s.testimonialQuote}>"{quote}"</p>
      <div style={s.testimonialAuthor}>
        <div style={{ ...s.testimonialAvatar, background: avatarBg, color: avatarColor }}>{initials}</div>
        <div>
          <div style={s.testimonialName}>{name}</div>
          <div style={s.testimonialCity}>{city}</div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ featured, name, price, per, desc, features }) {
  return (
    <div style={featured ? s.pricingCardFeatured : s.pricingCard}>
      {featured && <span style={s.pricingBadge}>Most popular</span>}
      <div style={s.pricingName}>{name}</div>
      <div style={s.pricingPrice}>
        {price} <span style={s.pricingPer}>{per}</span>
      </div>
      <p style={s.pricingDesc}>{desc}</p>
      <ul style={s.pricingFeatures}>
        {features.map((f, i) => (
          <li key={i} style={s.pricingFeature}>
            <span style={s.pricingCheck}>✓</span> {f}
          </li>
        ))}
      </ul>
      <a
        href="/register"
        style={{
          ...(featured ? s.authBtnBlue : s.authBtnOutline),
          marginTop: 8,
          textDecoration: "none",
          textAlign: "center",
          display: "block",
        }}
      >
        {featured ? "Get started" : "Choose plan"}
      </a>
    </div>
  );
}



export default function FreshDropLanding() {
  return (
    <div style={s.root}>

      {/* Sticky nav */}
      <nav style={s.nav}>
        <a href="/" style={{ ...s.navBrand, textDecoration: "none" }}>
          <div style={s.navLogo}>
            <span style={s.navLogoIcon}>🧺</span>
          </div>
          <span style={s.navName}>
            Fresh<span style={{ color: colors.blue }}>Drop</span>
          </span>
        </a>
        <div style={s.navLinks}>
          <a href="/login" style={{ ...s.btnGhost, textDecoration: "none", display: "inline-block" }}>Log in</a>
          <a href="/register" style={{ ...s.btnPrimary, textDecoration: "none", display: "inline-block" }}>Sign up free</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroBadge}>🚚 Free pickup &amp; delivery in 24 hrs</div>
        <h1 style={s.heroH1}>
          Laundry done right,<br />
          <em style={s.heroEm}>delivered to your door</em>
        </h1>
        <p style={s.heroP}>
          Schedule a pickup in under 60 seconds. We wash, fold, and return your clothes fresh — so you don't have to think about it.
        </p>
        <div style={s.heroActions}>
          <a href="/register" style={{ ...s.btnLgPrimary, textDecoration: "none" }}>Get started free</a>
          <a href="/login" style={{ ...s.btnLgOutline, textDecoration: "none" }}>Log in to your account</a>
        </div>
  
      </div>

      {/* Service strip */}
      <div style={s.strip}>
        <ServiceCard bg="#E6F1FB" iconColor="#185FA5" icon="👕" title="Wash & fold" desc="Sorted, washed, folded perfectly" />
        <ServiceCard bg="#EAF3DE" iconColor="#3B6D11" icon="👔" title="Dry cleaning" desc="Professional care for delicates" />
        <ServiceCard bg="#FAEEDA" iconColor="#854F0B" icon="📅" title="Subscription" desc="Weekly plans, set and forget" />
        <ServiceCard bg="#FBEAF0" iconColor="#993556" icon="🚐" title="Free delivery" desc="Door-to-door, always included" />
      </div>

      {/* How it works */}
      <div style={s.section}>
        <div style={s.sectionLabel}>How it works</div>
        <h2 style={s.sectionH2}>Ready in three steps</h2>
        <div style={s.steps}>
          <StepCard num="1" title="Schedule a pickup" desc="Choose a time that works for you — same day or in advance." />
          <StepCard num="2" title="We handle the rest" desc="Your laundry is washed, folded, or dry cleaned with care." />
          <StepCard num="3" title="Delivered fresh" desc="Clean clothes returned to your door within 24 hours." />
        </div>
      </div>

   
      <div style={s.ctaSection}>
        <div style={s.sectionLabel}>Get started</div>
        <h2 style={s.sectionH2}>Create your account today</h2>
        <div style={s.ctaGrid}>
          <div style={s.ctaCardFeatured}>
            <h3 style={s.ctaH3}>New here?</h3>
            <p style={s.ctaP}>Sign up and get your first pickup free.</p>
            <a href="/register" style={{ ...s.authBtnBlue, textDecoration: "none", textAlign: "center", display: "block" }}>Create an account</a>
          </div>
          <div style={s.ctaCard}>
            <h3 style={s.ctaH3}>Returning customer</h3>
            <p style={s.ctaP}>Welcome back — sign in to manage orders.</p>
            <a href="/login" style={{ ...s.authBtnOutline, textDecoration: "none", textAlign: "center", display: "block" }}>Log in</a>
          </div>
        </div>
      </div>

    

    </div>
  );
}
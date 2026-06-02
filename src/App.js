import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════
   TOKENS
══════════════════════════════════════════════════ */
const T = {
  bg:      "#F4F1EC",
  surface: "#FDFBF8",
  ink:     "#0D0D0B",
  mid:     "#48443F",
  faint:   "#9A958E",
  line:    "#E0DBD2",
  accent:  "#C9501A",
  accentL: "rgba(201,80,26,0.10)",
  tag:     "#ECEAE2",
  tagTxt:  "#524E49",
  live:    "#3A6648",
  liveL:   "rgba(58,102,72,0.10)",
  dev:     "#9A7220",
};
const F = {
  display: "'Bricolage Grotesque','Arial Black',sans-serif",
  body:    "'Questrial','Arial',sans-serif",
  mono:    "'DM Mono','Fira Mono',monospace",
};

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const ME = {
  name:      "Khem Bikram Rana",
  location:  "Kathmandu, Nepal",
  email:     "khembikram1@gmail.com",
  github:    "github.com/khembikram",
  linkedin:  "linkedin.com/in/khembikram",
  web:       "khembikram.com.np",
  webHref:   "https://khembikram.com.np/",
  bio:       "I build things for the web — fast, clean, and made to last. Full-stack developer, SEO engineer, and CMS specialist with 3+ years shipping real products.",
  longBio:   "I'm a full-stack developer and SEO specialist based in Kathmandu, Nepal. I've shipped products for agencies and startups — from custom POS systems to Drupal and WordPress platforms handling thousands of daily visitors.\n\nI treat SEO as an engineering discipline: Core Web Vitals, technical audits, structured data, crawl optimisation — not just keywords. I care about performance, clean architecture, and software that feels effortless to use.",
  available: true,
  yearsExp:  "3+",
  photo:     null, /* ← set to your image URL e.g. "https://..." */
};

const WEB3_KEY = "c0e139c5-4573-474d-bcf3-46fb1621d4ff";

const ROLES = [
  "Full Stack Developer",
  "SEO Specialist",
  "React Developer",
  "WordPress & Drupal Expert",
  "Java Spring Boot Dev",
  "Problem Solver",
];

const SKILLS = [
  { name: "React & Frontend",        pct: 92 },
  { name: "Java Spring Boot",        pct: 85 },
  { name: "PostgreSQL & Databases",  pct: 84 },
  { name: "SEO & Core Web Vitals",   pct: 90 },
  { name: "WordPress & Drupal",      pct: 88 },
  { name: "JavaScript / TypeScript", pct: 90 },
];

const STACK = [
  "React","Java","Spring Boot","PostgreSQL","Electron",
  "JavaScript","TypeScript","WordPress","Drupal","PHP",
  "HTML5","CSS3","Tailwind","Git","Docker",
  "SEO","Core Web Vitals","Figma","Linux",
];

const SERVICES = [
  {
    icon: "⚡",
    title: "Full Stack Development",
    price: "From $800",
    desc: "End-to-end web applications built with React frontends and Java Spring Boot backends. Production-grade, scalable, and performant.",
    items: ["React / Next.js frontends","Java Spring Boot APIs","PostgreSQL database design","Electron desktop apps","REST & WebSocket integration"],
  },
  {
    icon: "🔍",
    title: "SEO Engineering",
    price: "From $300",
    desc: "Technical SEO treated as an engineering problem — crawl budgets, structured data, Core Web Vitals, and measurable organic growth.",
    items: ["Technical SEO audits","Core Web Vitals optimisation","Schema & structured data","Google Search Console setup","Monthly reporting & roadmaps"],
  },
  {
    icon: "🧩",
    title: "WordPress & Drupal",
    price: "From $500",
    desc: "Custom CMS builds from scratch — themes, modules, Gutenberg blocks, and WooCommerce. Done properly, not with page builders.",
    items: ["Custom WordPress themes","Gutenberg block libraries","Drupal 9/10 module dev","WooCommerce integration","CMS migration & upgrades"],
  },
  {
    icon: "🖥️",
    title: "Desktop Applications",
    price: "From $1,200",
    desc: "Cross-platform Electron apps with full backend integration — POS systems, internal tools, and anything that needs to run offline.",
    items: ["Electron + React desktop apps","Thermal printer integration","Offline-first architecture","Barcode & hardware I/O","Fiscal compliance (TSE/Fiskaly)"],
  },
];

const PROJECTS = [
  {
    id: 1,
    name:   "Restaurant POS System",
    year:   "2024",
    cat:    "Desktop · Full Stack",
    desc:   "Full-featured desktop POS built with React, Java Spring Boot, and PostgreSQL — fiscal compliance, kitchen routing, multi-payment, and thermal printing.",
    long:   "A comprehensive Electron desktop application integrating a React frontend with a Java Spring Boot backend and PostgreSQL database. Features include multi-payment processing (Stripe, SumUp, cash), German TSE/Fiskaly fiscal compliance, KOT/BOT kitchen routing, dynamic thermal printer management, product variants with image management, barcode scanning, and RTL/LTR layout switching.",
    tech:   ["React","Electron","Java","Spring Boot","PostgreSQL"],
    status: "Live",
    link:   "#",
  },
  {
    id: 2,
    name:   "Drupal CMS Platforms",
    year:   "2024",
    cat:    "CMS · Full Stack",
    desc:   "Enterprise Drupal builds for Anchor Points clients — custom modules, content architecture, performance tuning, and SEO integration.",
    long:   "Architected and developed multiple Drupal 9/10 platforms for agency clients. Work covered custom module development, content type architecture, Views configuration, performance optimisation, and technical SEO — structured data, sitemaps, canonical tags, and Core Web Vitals improvements.",
    tech:   ["Drupal","PHP","MySQL","Twig","SEO"],
    status: "Live",
    link:   "#",
  },
  {
    id: 3,
    name:   "WordPress Client Sites",
    year:   "2023",
    cat:    "CMS · SEO",
    desc:   "Full WordPress builds and SEO campaigns for LQ Digital clients — custom themes, Gutenberg blocks, and measurable organic growth.",
    long:   "Delivered 20+ WordPress sites for LQ Digital clients — custom theme development, Gutenberg block libraries, WooCommerce integration, and comprehensive on-page SEO. Increased organic traffic by 60% across key accounts through technical audits, schema markup, and Core Web Vitals work.",
    tech:   ["WordPress","PHP","WooCommerce","JavaScript","SEO"],
    status: "Live",
    link:   "#",
  },
  {
    id: 4,
    name:   "SEO Technical Audits",
    year:   "2023",
    cat:    "SEO · Strategy",
    desc:   "End-to-end technical SEO audits — crawl budget analysis, structured data, Core Web Vitals, and actionable roadmaps for 20+ sites.",
    long:   "Conducted deep technical SEO audits for clients across e-commerce and editorial verticals. Deliverables included crawl budget analysis, canonical and redirect mapping, structured data implementation, PageSpeed/LCP improvement plans, and monthly reporting. Maintained 5-star freelance rating across 50+ Upwork projects.",
    tech:   ["SEO","Core Web Vitals","Schema","Google Search Console","Screaming Frog"],
    status: "Live",
    link:   "#",
  },
];

const EXPERIENCE = [
  {
    company:  "Anchor Points",
    role:     "Full Stack Developer",
    period:   "Jan 2024 — Dec 2025",
    duration: "2 yrs",
    location: "Kathmandu, Nepal",
    bullets:  [
      "Built and maintained enterprise Drupal & WordPress platforms for agency clients",
      "Developed a full-featured restaurant POS (React + Java Spring Boot + PostgreSQL)",
      "Led technical SEO — audits, structured data, Core Web Vitals optimisation",
      "Improved site performance by 40% across multiple client properties",
    ],
  },
  {
    company:  "Upwork",
    role:     "Freelance Web Developer & SEO Specialist",
    period:   "May 2023 — Feb 2025",
    duration: "1 yr 10 mos",
    location: "Remote",
    bullets:  [
      "Completed 50+ projects with a consistent 5-star rating",
      "Delivered technical SEO audits and on-page optimisation for 20+ sites",
      "Built WordPress, Drupal, and React projects for clients across the US and Europe",
      "Maintained 100% client satisfaction across all engagements",
    ],
  },
  {
    company:  "LQ Digital",
    role:     "Web Developer",
    period:   "Jan 2023 — Jan 2024",
    duration: "1 yr",
    location: "Lalitpur, Nepal",
    bullets:  [
      "Increased organic traffic by 60% via technical SEO and performance improvements",
      "Delivered 20+ responsive WordPress sites for varied client verticals",
      "Implemented Gutenberg block libraries and WooCommerce solutions",
    ],
  },
];

const TESTIMONIALS = [
  {
    name:    "Client via Upwork",
    role:    "E-commerce Store Owner",
    text:    "Khem delivered exactly what we needed — fast turnaround, clean code, and the SEO improvements were immediately visible in Search Console within weeks.",
    rating:  5,
  },
  {
    name:    "Client via Upwork",
    role:    "SaaS Startup Founder",
    text:    "One of the best freelancers I've worked with. He understood the requirements quickly, communicated well throughout, and the final product was exactly what we discussed.",
    rating:  5,
  },
  {
    name:    "Client via Upwork",
    role:    "Digital Agency, UK",
    text:    "Excellent Drupal work. Khem built our custom module from scratch, handled the content migration, and optimised the site performance significantly. Would hire again.",
    rating:  5,
  },
];

const EDUCATION = [
  {
    institution: "Tribhuvan University",
    degree:      "Bachelor of Information Technology",
    period:      "2019 — 2023",
    location:    "Kathmandu, Nepal",
  },
];

/* ══════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════ */
function useTypewriter(words, speed = 75, pause = 2000) {
  const [text, setText] = useState("");
  const [idx,  setIdx]  = useState(0);
  const [del,  setDel]  = useState(false);
  useEffect(() => {
    const word = words[idx];
    if (!del && text.length < word.length) {
      const t = setTimeout(() => setText(word.slice(0, text.length + 1)), speed);
      return () => clearTimeout(t);
    }
    if (!del && text.length === word.length) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text.length > 0) {
      const t = setTimeout(() => setText(text.slice(0, -1)), speed / 2);
      return () => clearTimeout(t);
    }
    if (del && text.length === 0) { setDel(false); setIdx(i => (i + 1) % words.length); }
  }, [text, del, idx, words, speed, pause]);
  return text;
}

function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const tot = el.scrollHeight - el.clientHeight;
      setPct(tot > 0 ? Math.round((window.scrollY / tot) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pct;
}

/* ══════════════════════════════════════════════════
   ATOMS
══════════════════════════════════════════════════ */
function Tag({ children }) {
  return (
    <span style={{ display:"inline-block", padding:"3px 10px", background:T.tag, color:T.tagTxt, borderRadius:4, fontSize:12, fontWeight:500, fontFamily:F.body }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:48 }}>
      <span style={{ fontSize:10, fontWeight:700, color:T.accent, letterSpacing:"0.22em", textTransform:"uppercase", whiteSpace:"nowrap", fontFamily:F.body }}>
        {children}
      </span>
      <div style={{ flex:1, height:1, background:T.line }} />
    </div>
  );
}

function Btn({ children, onClick, outline=false, small=false, style={} }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: small ? "8px 18px" : "12px 28px",
        borderRadius:5, fontSize: small ? 13 : 14,
        fontWeight:700, cursor:"pointer", fontFamily:F.body,
        transition:"all .18s", letterSpacing:"0.01em",
        ...(outline
          ? { background:"transparent", color:T.ink, border:`1.5px solid ${hov ? T.ink : T.line}` }
          : { background: hov ? "#A83E12" : T.accent, color:"#fff", border:"none" }),
        ...style,
      }}>{children}</button>
  );
}

function Stars({ n = 5 }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color:"#E9A23B", fontSize:14 }}>★</span>
      ))}
    </div>
  );
}

function PhotoBlock({ size=320, height=null }) {
  const src = ME.photo || "/Khem_Bikram_Rana.jpeg";
  const h = height || size;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ width:size, height:h, flexShrink:0, borderRadius:14, overflow:"hidden", border:`1px solid ${T.line}`, background:"#E5E0D8", position:"relative", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      {!failed && (
        <img
          src={src}
          alt={ME.name}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", opacity: loaded ? 1 : 0, transition:"opacity .3s ease" }}
        />
      )}
      {(!loaded || failed) && (
        <>
          <svg width="100%" height="100%" viewBox="0 0 320 400" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"
            style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
            <rect width="320" height="400" fill="#DDD8CE"/>
            <circle cx="160" cy="140" r="52" fill="#C4BEB4"/>
            <ellipse cx="160" cy="340" rx="88" ry="70" fill="#C4BEB4"/>
          </svg>
          {failed && (
            <span style={{ position:"relative", zIndex:1, marginBottom:20, fontSize:10, color:"#9C9488", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:F.body }}>
              Add your photo
            </span>
          )}
        </>
      )}
    </div>
  );
}

/* Scroll-to-top button */
function BackToTop() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const h = () => setVis(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!vis) return null;
  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      title="Back to top"
      style={{ position:"fixed", bottom:28, right:24, zIndex:200,
        width:44, height:44, borderRadius:"50%",
        background:T.ink, color:"#fff", border:"none",
        fontSize:18, cursor:"pointer", display:"flex",
        alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 16px rgba(0,0,0,0.18)", transition:"opacity .2s",
        fontFamily:F.body }}>
      ↑
    </button>
  );
}

/* ══════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════ */
function Nav({ page, go }) {
  const [open, setOpen] = useState(false);
  const prog = useScrollProgress();
  const links = ["Home","Work","Services","About","Contact"];

  return (
    <>
      {/* Scroll progress bar */}
      <div style={{ position:"fixed", top:0, left:0, zIndex:200, height:2, width:`${prog}%`, background:T.accent, transition:"width .1s linear", pointerEvents:"none" }} />

      <nav style={{ position:"sticky", top:0, zIndex:100, background:`${T.bg}f4`, backdropFilter:"blur(18px)", borderBottom:`1px solid ${T.line}` }}>
        <div style={{ maxWidth:1060, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:62 }}>
          <button onClick={() => { go("Home"); setOpen(false); }} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:F.display, fontSize:24, fontWeight:800, color:T.ink, letterSpacing:"-1.5px", lineHeight:1 }}>
            KBR<span style={{ color:T.accent }}>.</span>
          </button>

          <div className="nav-desk" style={{ display:"flex", gap:32 }}>
            {links.map(l => (
              <button key={l} onClick={() => go(l)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:F.body, fontSize:13, fontWeight:600, color: page===l ? T.ink : T.faint, letterSpacing:"0.01em", transition:"color .15s", borderBottom:`2px solid ${page===l ? T.accent : "transparent"}`, paddingBottom:2 }}>
                {l}
              </button>
            ))}
          </div>

          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button className="hire-btn" onClick={() => go("Contact")}
              style={{ padding:"8px 20px", background:T.accent, color:"#fff", border:"none", borderRadius:5, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:F.body, transition:"background .15s" }}
              onMouseEnter={e => e.currentTarget.style.background="#A83E12"}
              onMouseLeave={e => e.currentTarget.style.background=T.accent}>
              Hire me
            </button>
            <button className="menu-btn" onClick={() => setOpen(o => !o)}
              style={{ display:"none", background:"none", border:`1.5px solid ${T.line}`, borderRadius:6, padding:"6px 12px", cursor:"pointer", color:T.ink, fontSize:18, lineHeight:1, alignItems:"center" }}>
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <div style={{ background:T.surface, borderTop:`1px solid ${T.line}`, padding:"16px 24px 22px" }}>
            {links.map(l => (
              <button key={l} onClick={() => { go(l); setOpen(false); }} style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", fontSize:17, fontWeight:700, fontFamily:F.body, color: page===l ? T.accent : T.ink, cursor:"pointer", padding:"12px 0", borderBottom:`1px solid ${T.line}` }}>
                {l}
              </button>
            ))}
            <button onClick={() => { go("Contact"); setOpen(false); }} style={{ marginTop:16, width:"100%", padding:"13px 0", background:T.accent, color:"#fff", border:"none", borderRadius:6, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:F.body }}>
              Hire me
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

/* ══════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════ */
function PageHome({ go }) {
  const role = useTypewriter(ROLES);

  return (
    <main style={{ maxWidth:1060, margin:"0 auto", padding:"0 24px" }}>

      {/* ── HERO ── */}
      <section style={{ padding:"80px 0 72px", borderBottom:`1px solid ${T.line}` }}>
        <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:52, alignItems:"center" }}>
          <div>
            {ME.available && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:T.surface, border:`1px solid ${T.line}`, borderRadius:20, padding:"5px 14px", fontSize:12, color:T.live, fontWeight:700, marginBottom:28, fontFamily:F.body }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:T.live, animation:"pulse 2s infinite" }} />
                Available for new projects
              </div>
            )}
            <h1 style={{ fontFamily:F.display, fontSize:"clamp(42px,7.5vw,80px)", fontWeight:800, color:T.ink, lineHeight:1.0, letterSpacing:"-3px", marginBottom:20 }}>
              {ME.name}
            </h1>
            <div style={{ minHeight:32, marginBottom:20 }}>
              <span style={{ fontFamily:F.mono, fontSize:"clamp(14px,2.2vw,17px)", color:T.accent, fontWeight:500 }}>
                › {role}<span style={{ animation:"blink 1s step-end infinite", color:T.faint }}>_</span>
              </span>
            </div>
            <p style={{ fontSize:"clamp(14px,1.8vw,17px)", color:T.mid, lineHeight:1.82, maxWidth:500, marginBottom:40, fontFamily:F.body }}>
              {ME.bio}
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Btn onClick={() => go("Work")}>View my work →</Btn>
              <Btn onClick={() => go("Contact")} outline>Get in touch</Btn>
            </div>
          </div>
          <div className="hero-photo"><PhotoBlock size={300} height={360} /></div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ padding:"40px 0", borderBottom:`1px solid ${T.line}` }}>
        <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1 }}>
          {[
            { n:"3+",  l:"Years experience" },
            { n:"50+", l:"Projects delivered" },
            { n:"20+", l:"SEO audits done" },
            { n:"5★",  l:"Upwork rating" },
          ].map((s,i) => (
            <div key={i} style={{ textAlign:"center", padding:"20px 16px", borderRight: i<3 ? `1px solid ${T.line}` : "none" }}>
              <div style={{ fontFamily:F.display, fontSize:30, fontWeight:800, color:T.ink, letterSpacing:"-1px" }}>{s.n}</div>
              <div style={{ fontFamily:F.body, fontSize:12, color:T.faint, marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section style={{ padding:"68px 0", borderBottom:`1px solid ${T.line}` }}>
        <SectionLabel>What I Do</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:20 }}>
          {SERVICES.map((s,i) => (
            <div key={i} style={{ padding:"26px 22px", background:T.surface, border:`1px solid ${T.line}`, borderRadius:12, cursor:"pointer", transition:"border-color .2s, transform .2s" }}
              onClick={() => go("Services")}
              onMouseEnter={e => { e.currentTarget.style.borderColor=T.accent; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=T.line;   e.currentTarget.style.transform="translateY(0)"; }}>
              <div style={{ fontSize:26, marginBottom:14 }}>{s.icon}</div>
              <div style={{ fontFamily:F.display, fontSize:17, fontWeight:800, color:T.ink, marginBottom:6, letterSpacing:"-0.5px" }}>{s.title}</div>
              <div style={{ fontFamily:F.body, fontSize:12, color:T.accent, fontWeight:700, marginBottom:10 }}>{s.price}</div>
              <p style={{ fontSize:13, color:T.mid, lineHeight:1.75, fontFamily:F.body }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop:28, textAlign:"center" }}>
          <Btn onClick={() => go("Services")} outline>See full service details →</Btn>
        </div>
      </section>

      {/* ── WORK PREVIEW ── */}
      <section style={{ padding:"68px 0", borderBottom:`1px solid ${T.line}` }}>
        <SectionLabel>Selected Work</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", border:`1px solid ${T.line}`, borderRadius:10, overflow:"hidden" }}>
          {PROJECTS.slice(0,3).map((p,i) => (
            <HomeProjectCard key={p.id} p={p} go={go}
              style={{ borderRight: i<2 ? `1px solid ${T.line}` : "none" }} />
          ))}
        </div>
        <div style={{ marginTop:28, textAlign:"center" }}>
          <Btn onClick={() => go("Work")} outline>All projects →</Btn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:"68px 0", borderBottom:`1px solid ${T.line}` }}>
        <SectionLabel>Client Testimonials</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} style={{ padding:"28px 24px", background:T.surface, border:`1px solid ${T.line}`, borderRadius:12 }}>
              <Stars n={t.rating} />
              <p style={{ fontFamily:F.body, fontSize:14, color:T.mid, lineHeight:1.8, margin:"14px 0 20px", fontStyle:"italic" }}>
                "{t.text}"
              </p>
              <div style={{ fontFamily:F.display, fontSize:14, fontWeight:800, color:T.ink, letterSpacing:"-0.2px" }}>{t.name}</div>
              <div style={{ fontFamily:F.body, fontSize:12, color:T.faint, marginTop:3 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding:"68px 0" }}>
        <div style={{ background:T.ink, borderRadius:16, padding:"56px 48px", textAlign:"center" }}>
          <div style={{ fontFamily:F.display, fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#fff", letterSpacing:"-1.5px", marginBottom:16 }}>
            Got a project in mind?
          </div>
          <p style={{ fontFamily:F.body, fontSize:16, color:"rgba(255,255,255,0.65)", lineHeight:1.75, maxWidth:480, margin:"0 auto 32px" }}>
            I'm currently available for freelance work and full-time roles. Let's talk about what you're building.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <Btn onClick={() => go("Contact")} style={{ background:T.accent }}>Start a conversation →</Btn>
            <Btn onClick={() => go("Work")} style={{ background:"transparent", color:"#fff", border:"1.5px solid rgba(255,255,255,0.25)" }}>See my work</Btn>
          </div>
        </div>
      </section>
    </main>
  );
}

function HomeProjectCard({ p, go, style={} }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => go("Work")}
      style={{ padding:"26px 24px", background: hov ? T.surface : "transparent", transition:"background .18s", cursor:"pointer", ...style }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
        <span style={{ fontSize:10, color:T.faint, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:F.body }}>{p.year} · {p.cat}</span>
        <span style={{ fontSize:11, fontWeight:700, color: p.status==="Live" ? T.live : T.dev, fontFamily:F.body }}>{p.status}</span>
      </div>
      <h3 style={{ fontFamily:F.display, fontSize:18, fontWeight:800, color: hov ? T.accent : T.ink, marginBottom:10, letterSpacing:"-0.4px", transition:"color .18s" }}>
        {p.name}
      </h3>
      <p style={{ fontSize:13, color:T.mid, lineHeight:1.72, marginBottom:14, fontFamily:F.body }}>{p.desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
        {p.tech.slice(0,3).map(t => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   WORK
══════════════════════════════════════════════════ */
function PageWork() {
  const [active, setActive] = useState(null);

  return (
    <main style={{ maxWidth:1060, margin:"0 auto", padding:"0 24px" }}>
      <section style={{ padding:"72px 0 88px" }}>
        <SectionLabel>Work</SectionLabel>
        <h1 style={{ fontFamily:F.display, fontSize:"clamp(38px,6.5vw,68px)", fontWeight:800, color:T.ink, lineHeight:1.0, letterSpacing:"-3px", marginBottom:56 }}>
          Projects &<br />Case Studies.
        </h1>
        <div style={{ border:`1px solid ${T.line}`, borderRadius:10, overflow:"hidden" }}>
          {PROJECTS.map((p,i) => (
            <div key={p.id}>
              <div onClick={() => setActive(active===p.id ? null : p.id)}
                style={{ display:"grid", gridTemplateColumns:"1fr auto", padding:"22px 28px", cursor:"pointer", background: active===p.id ? T.surface : "transparent", borderBottom:`1px solid ${T.line}`, transition:"background .15s", gap:16, alignItems:"center" }}
                onMouseEnter={e => { if(active!==p.id) e.currentTarget.style.background="#F9F7F2"; }}
                onMouseLeave={e => { if(active!==p.id) e.currentTarget.style.background="transparent"; }}>
                <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
                  <span style={{ fontFamily:F.display, fontSize:19, fontWeight:800, color:T.ink, letterSpacing:"-0.5px" }}>{p.name}</span>
                  <span style={{ fontSize:10, color:T.faint, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:F.body }}>{p.year} · {p.cat}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <span style={{ fontSize:11, fontWeight:700, color: p.status==="Live" ? T.live : T.dev, fontFamily:F.body }}>{p.status}</span>
                  <span style={{ color:T.faint, fontSize:20, display:"inline-block", transition:"transform .22s", transform: active===p.id ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </div>
              </div>
              {active===p.id && (
                <div style={{ padding:"28px 28px 32px", background:T.surface, borderBottom:`1px solid ${T.line}` }}>
                  <div className="proj-detail" style={{ display:"grid", gridTemplateColumns:"1fr 240px", gap:40 }}>
                    <div>
                      <p style={{ fontSize:15, color:T.mid, lineHeight:1.84, marginBottom:20, fontFamily:F.body }}>{p.long}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:22 }}>
                        {p.tech.map(t => <Tag key={t}>{t}</Tag>)}
                      </div>
                      <a href={p.link} style={{ fontSize:13, color:T.accent, textDecoration:"none", fontWeight:700, fontFamily:F.body }}>View project ↗</a>
                    </div>
                    <div>
                      {[{ l:"Category",v:p.cat },{ l:"Year",v:p.year },{ l:"Status",v:p.status }].map(r => (
                        <div key={r.l} style={{ paddingBottom:14, marginBottom:14, borderBottom:`1px solid ${T.line}` }}>
                          <span style={{ fontSize:10, fontWeight:700, color:T.faint, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:F.body, display:"block", marginBottom:4 }}>{r.l}</span>
                          <span style={{ fontSize:14, color:T.ink, fontWeight:600, fontFamily:F.body }}>{r.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ══════════════════════════════════════════════════
   SERVICES PAGE
══════════════════════════════════════════════════ */
function PageServices({ go }) {
  return (
    <main style={{ maxWidth:1060, margin:"0 auto", padding:"0 24px" }}>
      <section style={{ padding:"72px 0 88px" }}>
        <SectionLabel>Services</SectionLabel>
        <h1 style={{ fontFamily:F.display, fontSize:"clamp(38px,6.5vw,68px)", fontWeight:800, color:T.ink, lineHeight:1.0, letterSpacing:"-3px", marginBottom:16 }}>
          How I Can<br />Help You.
        </h1>
        <p style={{ fontFamily:F.body, fontSize:16, color:T.mid, lineHeight:1.82, maxWidth:520, marginBottom:64 }}>
          I work with startups, agencies, and businesses to build web products that perform. Here's what I offer.
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:1, border:`1px solid ${T.line}`, borderRadius:12, overflow:"hidden" }}>
          {SERVICES.map((s,i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, background: i%2===0 ? T.surface : "transparent", borderBottom: i<SERVICES.length-1 ? `1px solid ${T.line}` : "none" }}>
              <div style={{ padding:"40px 36px", borderRight:`1px solid ${T.line}` }}>
                <div style={{ fontSize:32, marginBottom:16 }}>{s.icon}</div>
                <div style={{ fontFamily:F.display, fontSize:22, fontWeight:800, color:T.ink, letterSpacing:"-0.5px", marginBottom:6 }}>{s.title}</div>
                <div style={{ fontFamily:F.body, fontSize:13, color:T.accent, fontWeight:700, marginBottom:16 }}>{s.price}</div>
                <p style={{ fontFamily:F.body, fontSize:14, color:T.mid, lineHeight:1.8 }}>{s.desc}</p>
              </div>
              <div style={{ padding:"40px 36px" }}>
                <p style={{ fontFamily:F.body, fontSize:11, fontWeight:700, color:T.faint, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:20 }}>What's included</p>
                <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:12 }}>
                  {s.items.map((item,j) => (
                    <li key={j} style={{ display:"flex", gap:10, fontFamily:F.body, fontSize:14, color:T.mid, lineHeight:1.6 }}>
                      <span style={{ color:T.accent, fontWeight:700, flexShrink:0 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:56, background:T.ink, borderRadius:12, padding:"44px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
          <div>
            <div style={{ fontFamily:F.display, fontSize:24, fontWeight:800, color:"#fff", letterSpacing:"-0.5px", marginBottom:8 }}>Ready to get started?</div>
            <p style={{ fontFamily:F.body, fontSize:14, color:"rgba(255,255,255,0.6)", lineHeight:1.7, maxWidth:380 }}>Drop me a message with your project details and I'll get back to you within a few hours.</p>
          </div>
          <Btn onClick={() => go("Contact")} style={{ background:T.accent, flexShrink:0 }}>Get a quote →</Btn>
        </div>
      </section>
    </main>
  );
}

/* ══════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════ */
function PageAbout({ go }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setAnimated(true); }, { threshold:.15 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ maxWidth:1060, margin:"0 auto", padding:"0 24px" }}>

      {/* BIO */}
      <section style={{ padding:"72px 0 64px", borderBottom:`1px solid ${T.line}` }}>
        <SectionLabel>About</SectionLabel>
        <div className="about-top" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:56, alignItems:"start" }}>
          <div>
            <h1 style={{ fontFamily:F.display, fontSize:"clamp(38px,6vw,62px)", fontWeight:800, color:T.ink, lineHeight:1.0, letterSpacing:"-2.5px", marginBottom:32 }}>
              Developer.<br />Search Engine Optimization<br />
            </h1>
            {ME.longBio.split("\n\n").map((para,i) => (
              <p key={i} style={{ fontSize:16, color:T.mid, lineHeight:1.85, marginBottom:18, fontFamily:F.body }}>{para}</p>
            ))}
            <div style={{ marginTop:28, display:"flex", gap:20, flexWrap:"wrap", alignItems:"center" }}>
              <span style={{ fontSize:13, color:T.faint, fontFamily:F.body }}>📍 {ME.location}</span>
              <span style={{ fontSize:13, color:T.live, fontWeight:700, fontFamily:F.body, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:T.live, animation:"pulse 2s infinite", display:"inline-block" }} />
                Available for work
              </span>
            </div>
            <div style={{ marginTop:28, display:"flex", gap:10, flexWrap:"wrap" }}>
              <Btn onClick={() => go("Contact")}>Hire me →</Btn>
              <Btn outline onClick={() => go("Work")}>See my work</Btn>
            </div>
          </div>
          <div className="about-photo"><PhotoBlock size={280} /></div>
        </div>
      </section>

      {/* SKILLS */}
      <section ref={ref} style={{ padding:"60px 0", borderBottom:`1px solid ${T.line}` }}>
        <SectionLabel>Skills</SectionLabel>
        <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px 60px" }}>
          {SKILLS.map((s,i) => (
            <div key={s.name}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                <span style={{ fontSize:14, color:T.mid, fontFamily:F.body }}>{s.name}</span>
                <span style={{ fontSize:12, color:T.faint, fontFamily:F.body }}>{s.pct}%</span>
              </div>
              <div style={{ height:2, background:T.line, borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:2, background:T.accent, width: animated ? `${s.pct}%` : "0%", transition:`width 1.1s ease ${i*0.1}s` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={{ padding:"60px 0", borderBottom:`1px solid ${T.line}` }}>
        <SectionLabel>Experience</SectionLabel>
        {EXPERIENCE.map((e,i) => (
          <div key={i} className="exp-row" style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:32, padding:"32px 0", borderBottom: i<EXPERIENCE.length-1 ? `1px solid ${T.line}` : "none" }}>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:T.ink, marginBottom:5, fontFamily:F.display, letterSpacing:"-0.3px" }}>{e.company}</div>
              <div style={{ fontSize:12, color:T.faint, lineHeight:1.7, fontFamily:F.body }}>{e.period}</div>
              <div style={{ fontSize:12, color:T.faint, fontFamily:F.body }}>{e.duration} · {e.location}</div>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:T.ink, marginBottom:14, fontFamily:F.body }}>{e.role}</div>
              <ul style={{ margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:9 }}>
                {e.bullets.map((b,j) => (
                  <li key={j} style={{ display:"flex", gap:10, fontSize:14, color:T.mid, lineHeight:1.68, fontFamily:F.body }}>
                    <span style={{ color:T.accent, flexShrink:0 }}>—</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* EDUCATION */}
      <section style={{ padding:"60px 0", borderBottom:`1px solid ${T.line}` }}>
        <SectionLabel>Education</SectionLabel>
        {EDUCATION.map((e,i) => (
          <div key={i} className="exp-row" style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:32, padding:"24px 0" }}>
            <div>
              <div style={{ fontSize:12, color:T.faint, fontFamily:F.body }}>{e.period}</div>
              <div style={{ fontSize:12, color:T.faint, fontFamily:F.body }}>{e.location}</div>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:T.ink, fontFamily:F.body, marginBottom:4 }}>{e.degree}</div>
              <div style={{ fontSize:14, color:T.mid, fontFamily:F.body }}>{e.institution}</div>
            </div>
          </div>
        ))}
      </section>

      {/* STACK */}
      <section style={{ padding:"60px 0", borderBottom:`1px solid ${T.line}` }}>
        <SectionLabel>Tools & Technologies</SectionLabel>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {STACK.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"60px 0" }}>
        <SectionLabel>What Clients Say</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} style={{ padding:"26px 24px", background:T.surface, border:`1px solid ${T.line}`, borderRadius:12 }}>
              <Stars n={t.rating} />
              <p style={{ fontFamily:F.body, fontSize:14, color:T.mid, lineHeight:1.8, margin:"14px 0 18px", fontStyle:"italic" }}>"{t.text}"</p>
              <div style={{ fontFamily:F.display, fontSize:14, fontWeight:800, color:T.ink, letterSpacing:"-0.2px" }}>{t.name}</div>
              <div style={{ fontFamily:F.body, fontSize:12, color:T.faint, marginTop:3 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════ */
function PageContact() {
  const [form,   setForm]   = useState({ name:"", email:"", subject:"", msg:"" });
  const [status, setStatus] = useState("idle");
  const [err,    setErr]    = useState("");

  const links = [
    { label:"Email",    value:ME.email,    href:`mailto:${ME.email}` },
    { label:"GitHub",   value:ME.github,   href:`https://${ME.github}` },
    { label:"LinkedIn", value:ME.linkedin, href:`https://${ME.linkedin}` },
    { label:"Website",  value:ME.web,      href:ME.webHref },
  ];

  const submit = async () => {
    if(!form.name.trim()||!form.email.trim()||!form.msg.trim()){ setErr("Please fill in your name, email, and message."); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){ setErr("Please enter a valid email address."); return; }
    setErr(""); setStatus("sending");
    try {
      const res  = await fetch("https://api.web3forms.com/submit", { method:"POST", headers:{"Content-Type":"application/json",Accept:"application/json"}, body:JSON.stringify({ access_key:WEB3_KEY, name:form.name, email:form.email, subject:form.subject||`Portfolio contact from ${form.name}`, message:form.msg, from_name:"Portfolio Contact Form", botcheck:"" }) });
      const data = await res.json();
      if(data.success){ setStatus("success"); setForm({name:"",email:"",subject:"",msg:""}); }
      else{ setStatus("error"); setErr(data.message||"Something went wrong."); }
    } catch { setStatus("error"); setErr("Network error — please try again."); }
  };

  const inp = (extra={}) => ({ width:"100%", padding:"11px 0", background:"transparent", border:"none", borderBottom:`1px solid ${T.line}`, color:T.ink, fontSize:14, outline:"none", fontFamily:F.body, transition:"border-color .2s", boxSizing:"border-box", ...extra });

  return (
    <main style={{ maxWidth:1060, margin:"0 auto", padding:"0 24px" }}>
      <section style={{ padding:"72px 0 100px" }}>
        <SectionLabel>Contact</SectionLabel>
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"start" }}>
          <div>
            <h1 style={{ fontFamily:F.display, fontSize:"clamp(34px,5.5vw,56px)", fontWeight:800, color:T.ink, lineHeight:1.0, letterSpacing:"-2px", marginBottom:20 }}>
              Let's build<br />something great.
            </h1>
            <p style={{ fontSize:15, color:T.mid, lineHeight:1.82, marginBottom:40, fontFamily:F.body }}>
              Open to full-time roles, freelance projects, and interesting collaborations. I typically respond within a couple of hours.
            </p>

            {/* Availability badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:T.liveL, border:`1px solid ${T.live}`, borderRadius:8, padding:"10px 16px", marginBottom:32 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:T.live, animation:"pulse 2s infinite", flexShrink:0 }} />
              <span style={{ fontFamily:F.body, fontSize:13, color:T.live, fontWeight:700 }}>Available now — response within 2 hours</span>
            </div>

            <div>
              {links.map(l => (
                <div key={l.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:`1px solid ${T.line}` }}>
                  <span style={{ fontSize:10, fontWeight:700, color:T.faint, textTransform:"uppercase", letterSpacing:"0.14em", fontFamily:F.body }}>{l.label}</span>
                  <a href={l.href} style={{ fontSize:14, color:T.ink, textDecoration:"none", fontWeight:600, fontFamily:F.body, transition:"color .15s" }}
                    onMouseEnter={e => e.currentTarget.style.color=T.accent}
                    onMouseLeave={e => e.currentTarget.style.color=T.ink}>
                    {l.value} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            {status==="success" ? (
              <div style={{ padding:"56px 0", textAlign:"center" }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"#EAF3ED", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:26, color:T.live }}>✓</div>
                <div style={{ fontFamily:F.display, fontSize:22, fontWeight:800, color:T.ink, marginBottom:10, letterSpacing:"-0.5px" }}>Message sent!</div>
                <p style={{ fontSize:14, color:T.mid, lineHeight:1.7, fontFamily:F.body }}>Thanks for reaching out. I'll reply to<br /><strong>{ME.email}</strong> shortly.</p>
                <button onClick={() => setStatus("idle")} style={{ marginTop:24, padding:"10px 22px", background:"transparent", border:`1px solid ${T.line}`, borderRadius:6, fontSize:13, color:T.mid, cursor:"pointer", fontFamily:F.body }}>Send another →</button>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:26 }}>
                {[
                  { key:"name",    label:"Name",    ph:"Your full name",     type:"text",  req:true },
                  { key:"email",   label:"Email",   ph:"you@example.com",    type:"email", req:true },
                  { key:"subject", label:"Subject", ph:"What's this about?", type:"text",  req:false },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize:10, fontWeight:700, color:T.faint, letterSpacing:"0.14em", textTransform:"uppercase", display:"block", marginBottom:8, fontFamily:F.body }}>
                      {f.label}{f.req && <span style={{ color:T.accent }}> *</span>}
                    </label>
                    <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))} placeholder={f.ph} style={inp()}
                      onFocus={e => e.target.style.borderColor=T.accent}
                      onBlur={e => e.target.style.borderColor=T.line} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:T.faint, letterSpacing:"0.14em", textTransform:"uppercase", display:"block", marginBottom:8, fontFamily:F.body }}>
                    Message<span style={{ color:T.accent }}> *</span>
                  </label>
                  <textarea value={form.msg} onChange={e => setForm(p => ({...p,msg:e.target.value}))} placeholder="Tell me about your project…" rows={5}
                    style={inp({ resize:"vertical", paddingTop:10 })}
                    onFocus={e => e.target.style.borderColor=T.accent}
                    onBlur={e => e.target.style.borderColor=T.line} />
                </div>
                {err && <p style={{ color:"#B04040", fontSize:13, margin:0, fontFamily:F.body }}>{err}</p>}
                <button onClick={submit} disabled={status==="sending"}
                  style={{ padding:"14px 0", background: status==="sending" ? T.faint : T.accent, color:"#fff", border:"none", borderRadius:6, fontSize:14, fontWeight:700, cursor: status==="sending" ? "not-allowed" : "pointer", fontFamily:F.body, transition:"background .2s" }}>
                  {status==="sending" ? "Sending…" : "Send message →"}
                </button>
                <p style={{ fontSize:12, color:T.faint, margin:0, textAlign:"center", fontFamily:F.body }}>
                  Sends directly to {ME.email} via Web3Forms
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════ */
function Footer({ go }) {
  return (
    <footer style={{ borderTop:`1px solid ${T.line}`, background:T.surface }}>
      <div style={{ maxWidth:1060, margin:"0 auto", padding:"44px 24px" }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:40, alignItems:"start", marginBottom:36 }}>
          <div>
            <button onClick={() => go("Home")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:F.display, fontSize:26, fontWeight:800, color:T.ink, letterSpacing:"-1.5px", marginBottom:12, display:"block" }}>
              KBR<span style={{ color:T.accent }}>.</span>
            </button>
            <p style={{ fontSize:13, color:T.faint, lineHeight:1.75, maxWidth:220, fontFamily:F.body, marginBottom:16 }}>
              Full-stack developer & SEO specialist based in Kathmandu, Nepal.
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:T.live, animation:"pulse 2s infinite" }} />
              <span style={{ fontSize:12, color:T.live, fontWeight:700, fontFamily:F.body }}>Available for work</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize:10, fontWeight:700, color:T.faint, letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:F.body, marginBottom:14 }}>Pages</p>
            {["Home","Work","Services","About","Contact"].map(p => (
              <button key={p} onClick={() => go(p)} style={{ display:"block", background:"none", border:"none", fontSize:14, color:T.mid, fontFamily:F.body, cursor:"pointer", padding:"4px 0", textAlign:"left", transition:"color .15s" }}
                onMouseEnter={e => e.currentTarget.style.color=T.accent}
                onMouseLeave={e => e.currentTarget.style.color=T.mid}>{p}</button>
            ))}
          </div>
          <div>
            <p style={{ fontSize:10, fontWeight:700, color:T.faint, letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:F.body, marginBottom:14 }}>Links</p>
            {[
              { l:"GitHub",   h:`https://${ME.github}` },
              { l:"LinkedIn", h:`https://${ME.linkedin}` },
              { l:"Website",  h:ME.webHref },
              { l:"Email",    h:`mailto:${ME.email}` },
            ].map(x => (
              <a key={x.l} href={x.h} style={{ display:"block", fontSize:14, color:T.mid, textDecoration:"none", fontFamily:F.body, padding:"4px 0", transition:"color .15s" }}
                onMouseEnter={e => e.currentTarget.style.color=T.accent}
                onMouseLeave={e => e.currentTarget.style.color=T.mid}>{x.l} ↗</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize:10, fontWeight:700, color:T.faint, letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:F.body, marginBottom:14 }}>Contact</p>
            <a href={`mailto:${ME.email}`} style={{ display:"block", fontSize:13, color:T.mid, textDecoration:"none", fontFamily:F.body, marginBottom:8 }}>{ME.email}</a>
            <span style={{ fontSize:13, color:T.faint, fontFamily:F.body, display:"block" }}>{ME.location}</span>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${T.line}`, paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <span style={{ fontSize:12, color:T.faint, fontFamily:F.body }}>© {new Date().getFullYear()} Khem Bikram Rana. All rights reserved.</span>
          <span style={{ fontSize:12, color:T.faint, fontFamily:F.body }}>Built with React · Hosted on {ME.web}</span>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("Home");
  const go = (p) => setPage(p);

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);
  useEffect(() => {
    const titles = { Home:"Khem Bikram Rana — Full Stack Dev & SEO Specialist", Work:"Work — KBR", Services:"Services — KBR", About:"About — KBR", Contact:"Contact — KBR" };
    document.title = titles[page] || "KBR";
  }, [page]);

  return (
    <div style={{ background:T.bg, minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Questrial&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }
        input::placeholder, textarea::placeholder { color:#C8C4BC; }
        input, textarea { -webkit-appearance:none; appearance:none; }
        .page-in { animation: fadeUp .32s ease; }
        @media(max-width:740px){
          .hero-grid    { grid-template-columns:1fr !important; }
          .hero-photo   { display:none !important; }
          .about-top    { grid-template-columns:1fr !important; gap:32px !important; }
          .about-photo  { display:none !important; }
          .skills-grid  { grid-template-columns:1fr !important; }
          .exp-row      { grid-template-columns:1fr !important; gap:6px !important; }
          .proj-detail  { grid-template-columns:1fr !important; }
          .contact-grid { grid-template-columns:1fr !important; gap:40px !important; }
          .footer-grid  { grid-template-columns:1fr 1fr !important; gap:28px !important; }
          .stats-row    { grid-template-columns:repeat(2,1fr) !important; }
          .nav-desk     { display:none !important; }
          .hire-btn     { display:none !important; }
          .menu-btn     { display:flex !important; }
        }
        @media(min-width:741px){ .menu-btn { display:none !important; } }
      `}</style>

      <Nav page={page} go={go} />

      <div className="page-in" key={page}>
        {page==="Home"     && <PageHome     go={go} />}
        {page==="Work"     && <PageWork     />}
        {page==="Services" && <PageServices go={go} />}
        {page==="About"    && <PageAbout    go={go} />}
        {page==="Contact"  && <PageContact  />}
      </div>

      <Footer go={go} />
      <BackToTop />
    </div>
  );
}
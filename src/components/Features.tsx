"use client";
import { useEffect, useState } from "react";

const features = [
  {
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>,
    title:"Smart Retail Device",
    tag:"Hardware + Counter OS",
    tagColor:"#a78bfa",
    headline:"One device. Every workflow at the counter.",
    desc:"A purpose-built device running a custom Counter OS designed exclusively for rural retail. It replaces the notebook, WhatsApp scheme group, paper ledger and manual cash register — with one screen that works even without internet.",
    points:[
      "Custom Counter OS built for rural retail",
      "Fully offline — works without any internet",
      "Touch-first interface, no training required",
      "Secure hardware with automatic updates",
      "Handles sales, inventory, campaigns and payments",
    ],
    stat:{ val:"1 Device", sub:"replaces everything" },
    accent:"rgba(139,92,246,.15)",
    accentBorder:"rgba(139,92,246,.3)",
  },
  {
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zm3 3h4v4h-4z"/></svg>,
    title:"QR Campaign Engine",
    tag:"Campaigns",
    tagColor:"#6ee7b7",
    headline:"Scan. Approve. Reward. In under 10 seconds.",
    desc:"Customers scan product QR codes at the counter. The device checks eligibility instantly and the retailer approves with one tap. Brand rewards, discounts and loyalty points unlock immediately — zero paperwork, zero WhatsApp chains, full audit trail.",
    points:[
      "Scan-to-reward in under 10 seconds",
      "Eligibility verified in real time on-device",
      "Retailer has full approve or reject control",
      "Complete audit trail per transaction",
      "Works with any existing product label",
    ],
    stat:{ val:"<10s", sub:"scan to reward" },
    accent:"rgba(16,185,129,.12)",
    accentBorder:"rgba(16,185,129,.25)",
  },
  {
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    title:"Real-time Demand Data",
    tag:"Analytics",
    tagColor:"#a78bfa",
    headline:"The first real view into rural purchase behaviour.",
    desc:"Every counter transaction becomes a live data point. Brands get their first real window into what rural customers are actually buying — by product, region, season and store. No more relying on distributor estimates or gut feel.",
    points:[
      "Live sell-out dashboard for brands",
      "Product-level purchase analytics by region",
      "Geographic demand heatmaps",
      "Campaign ROI measurement in real time",
      "Seasonal and trend forecasting",
    ],
    stat:{ val:"Live", sub:"purchase data" },
    accent:"rgba(139,92,246,.12)",
    accentBorder:"rgba(139,92,246,.25)",
  },
  {
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>,
    title:"Inventory Management",
    tag:"Operations",
    tagColor:"#6ee7b7",
    headline:"Never run out of stock. Never over-order.",
    desc:"Track stock levels across every product in real time. Get automated low-stock alerts and place reorder requests directly to distributors from the device — without leaving the counter or making a single phone call.",
    points:[
      "Real-time stock tracking per product",
      "Automated low-stock alerts",
      "One-tap reorder directly to distributor",
      "Order confirmation and tracking on device",
      "Multi-category inventory dashboard",
    ],
    stat:{ val:"Zero", sub:"manual stock counts" },
    accent:"rgba(16,185,129,.1)",
    accentBorder:"rgba(16,185,129,.22)",
  },
  {
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>,
    title:"Embedded Fintech",
    tag:"Finance",
    tagColor:"#fbbf24",
    headline:"Formal finance, woven into the rural counter.",
    desc:"Payments, credit scoring and financial services woven directly into the point-of-sale moment. Because every Namusté transaction is digitally recorded, it creates the financial data trail needed to unlock formal credit for retailers and their customers.",
    points:[
      "Digital payment collection at counter",
      "Sales-history-based credit scoring",
      "Working capital loans for retailers",
      "Customer buy-now-pay-later for purchases",
      "Regulatory-grade transaction compliance",
    ],
    stat:{ val:"₹0", sub:"collateral needed" },
    accent:"rgba(251,191,36,.08)",
    accentBorder:"rgba(251,191,36,.2)",
  },
  {
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77Z"/><path d="m9 12 2 2 4-4"/></svg>,
    title:"Brand Scheme Connect",
    tag:"Brands",
    tagColor:"#a78bfa",
    headline:"Zero scheme leakage. 100% verified delivery.",
    desc:"Trade schemes, seasonal promotions and loyalty programs delivered digitally to every enrolled retailer — fully tracked, verified and reported in real time. Brands lose crores every year to scheme leakage. Namusté eliminates it entirely.",
    points:[
      "Zero scheme leakage — every rupee accounted for",
      "Real-time redemption tracking per retailer",
      "Customer-level eligibility gating on device",
      "Brand performance dashboard with live data",
      "Seasonal and product-specific campaign support",
    ],
    stat:{ val:"100%", sub:"verified delivery" },
    accent:"rgba(139,92,246,.12)",
    accentBorder:"rgba(139,92,246,.28)",
  },
  {
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    title:"End-to-End Security",
    tag:"Security",
    tagColor:"#6ee7b7",
    headline:"Trust built into every touchpoint.",
    desc:"Every transaction is encrypted and every action is auditable. From QR scan to campaign approval to reward delivery — the entire chain is cryptographically signed and stored in an immutable audit log, making Namusté fully compliant at any scale.",
    points:[
      "End-to-end encryption on all transactions",
      "Immutable audit log for every action",
      "Cryptographic signature on every approval",
      "Role-based access control per retailer",
      "Regulatory-grade data compliance built in",
    ],
    stat:{ val:"256-bit", sub:"encryption" },
    accent:"rgba(16,185,129,.1)",
    accentBorder:"rgba(16,185,129,.22)",
  },
  {
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
    title:"Offline-First Sync",
    tag:"Reliability",
    tagColor:"#6ee7b7",
    headline:"Built for rural India. Works everywhere, always.",
    desc:"Most rural counters have poor or no internet. The Namusté device stores all transactions locally in encrypted storage and syncs to the cloud the moment connectivity returns — zero data loss, ever. The retailer never sees a spinner or an error.",
    points:[
      "100% offline functionality — always works",
      "Automatic background sync on reconnection",
      "Zero transaction data loss guaranteed",
      "Works on 2G / 3G / 4G / WiFi seamlessly",
      "Local encrypted storage on the device",
    ],
    stat:{ val:"100%", sub:"uptime guaranteed" },
    accent:"rgba(16,185,129,.1)",
    accentBorder:"rgba(16,185,129,.22)",
  },
];

const tabs = features.map(f => ({ label: f.tag, title: f.title }));

export default function Features() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: .07 }
    );
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const f = features[active];

  return (
    <section id="features" style={{ padding:"104px 0", background:"var(--bg2)", position:"relative", overflow:"hidden" }}>
      <div className="dot-grid" style={{ position:"absolute", inset:0, opacity:.4, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 44px", position:"relative", zIndex:2 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:"center", maxWidth:640, margin:"0 auto 56px" }}>
          <div className="pill" style={{ marginBottom:18 }}>Platform Features</div>
          <h2 className="hf" style={{ fontWeight:900, color:"#fff", fontSize:"clamp(30px,4vw,48px)", lineHeight:1.1, letterSpacing:"-.8px", marginBottom:14 }}>
            Everything at <span className="gt">the Counter</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,.38)", fontSize:16, lineHeight:1.75 }}>
            One device replaces the notebook, WhatsApp scheme groups, paper ledger and cash register — for every rural retail counter.
          </p>
        </div>

        {/* Tab sidebar + content panel */}
        <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:1, background:"rgba(139,92,246,.1)", borderRadius:20, overflow:"hidden" }} className="feat-layout">

          {/* LEFT: Tab list */}
          <div style={{ background:"rgba(255,255,255,.02)", display:"flex", flexDirection:"column" }}>
            {features.map((feat, i) => (
              <button key={feat.title} onClick={() => setActive(i)} style={{
                display:"flex", alignItems:"center", gap:14,
                padding:"18px 20px",
                background: active===i ? "rgba(139,92,246,.15)" : "transparent",
                border:"none", borderRight: active===i ? "2px solid #8b5cf6" : "2px solid transparent",
                borderBottom:"1px solid rgba(139,92,246,.08)",
                cursor:"pointer", textAlign:"left",
                transition:"background .2s, border-color .2s",
              }}
                onMouseEnter={e => { if(active!==i) e.currentTarget.style.background="rgba(139,92,246,.07)"; }}
                onMouseLeave={e => { if(active!==i) e.currentTarget.style.background="transparent"; }}
              >
                {/* Icon */}
                <div style={{
                  width:36, height:36, borderRadius:9, flexShrink:0,
                  background: active===i ? "rgba(139,92,246,.2)" : "rgba(255,255,255,.04)",
                  border: active===i ? "1px solid rgba(139,92,246,.35)" : "1px solid rgba(255,255,255,.06)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color: active===i ? feat.tagColor : "rgba(255,255,255,.3)",
                  transition:"all .2s",
                }}>
                  <svg width="16" height="16" viewBox={feat.icon.props.viewBox} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {feat.icon.props.children}
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize:11, fontWeight:600, color: active===i ? feat.tagColor : "rgba(255,255,255,.3)", marginBottom:2, letterSpacing:".04em" }}>{feat.tag}</div>
                  <div className="hf" style={{ fontSize:13, fontWeight:600, color: active===i ? "#fff" : "rgba(255,255,255,.45)", lineHeight:1.3 }}>{feat.title}</div>
                </div>
                {active===i && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"#8b5cf6", flexShrink:0 }}/>}
              </button>
            ))}
          </div>

          {/* RIGHT: Content panel */}
          <div key={f.title} style={{
            background: f.accent,
            borderLeft:`1px solid ${f.accentBorder}`,
            padding:"44px 48px",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            position:"relative", overflow:"hidden",
            animation:"fadeIn .3s ease",
          }}>
            {/* Decorative glow */}
            <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle,${f.accentBorder} 0%,transparent 70%)`, pointerEvents:"none" }}/>
            <div style={{ position:"absolute", bottom:-40, left:-40, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle,${f.accentBorder} 0%,transparent 70%)`, pointerEvents:"none" }}/>

            <div style={{ position:"relative", zIndex:2 }}>
              {/* Tag + stat row */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28, flexWrap:"wrap", gap:12 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(139,92,246,.12)", border:"1px solid rgba(139,92,246,.22)", borderRadius:999, padding:"5px 14px" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:f.tagColor }}/>
                  <span style={{ color:f.tagColor, fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase" }}>{f.tag}</span>
                </div>
                {f.stat && (
                  <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(139,92,246,.2)", borderRadius:12, padding:"10px 18px", textAlign:"center" }}>
                    <div className="hf" style={{ fontWeight:900, fontSize:22, color:"#c4b5fd", lineHeight:1 }}>{f.stat.val}</div>
                    <div style={{ color:"rgba(196,181,253,.45)", fontSize:10, marginTop:3 }}>{f.stat.sub}</div>
                  </div>
                )}
              </div>

              {/* Headline */}
              <h3 className="hf" style={{ fontWeight:800, fontSize:"clamp(20px,2.5vw,28px)", color:"#fff", lineHeight:1.25, marginBottom:14, letterSpacing:"-.4px" }}>
                {f.headline}
              </h3>

              {/* Description */}
              <p style={{ color:"rgba(255,255,255,.52)", fontSize:15, lineHeight:1.8, marginBottom:32, maxWidth:560 }}>
                {f.desc}
              </p>

              {/* Points — 2 column grid */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 24px", marginBottom:36 }} className="points-grid">
                {f.points.map(p => (
                  <div key={p} style={{ display:"flex", alignItems:"flex-start", gap:9 }}>
                    <div style={{ width:18, height:18, borderRadius:"50%", flexShrink:0, marginTop:1, background:"rgba(16,185,129,.12)", border:"1px solid rgba(16,185,129,.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="9" height="9" viewBox="0 0 10 10">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#10b981" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ color:"rgba(255,255,255,.6)", fontSize:13, lineHeight:1.55 }}>{p}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
                <a href="#contact" className="btn-purple" style={{ fontSize:13, padding:"10px 22px" }}>
                  Apply for Early Access
                </a>
                <span style={{ color:"rgba(255,255,255,.25)", fontSize:13 }}>
                  {active + 1} of {features.length} features
                </span>
              </div>
            </div>

            {/* Bottom: next feature hint */}
            {active < features.length - 1 && (
              <div style={{ position:"relative", zIndex:2, marginTop:32, paddingTop:20, borderTop:"1px solid rgba(139,92,246,.12)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ color:"rgba(255,255,255,.2)", fontSize:12 }}>Next feature</span>
                <button onClick={() => setActive(active + 1)} style={{
                  display:"flex", alignItems:"center", gap:8,
                  background:"rgba(139,92,246,.1)", border:"1px solid rgba(139,92,246,.2)",
                  borderRadius:8, padding:"7px 14px", cursor:"pointer",
                  color:"rgba(196,181,253,.7)", fontSize:12, fontWeight:600,
                  fontFamily:"'Poppins',system-ui,sans-serif", transition:"all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(139,92,246,.2)"; e.currentTarget.style.color="#c4b5fd"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(139,92,246,.1)"; e.currentTarget.style.color="rgba(196,181,253,.7)"; }}
                >
                  {features[active + 1].title} →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateX(8px); } to { opacity:1; transform:translateX(0); } }
        @media(max-width:900px) {
          .feat-layout { grid-template-columns: 1fr !important; }
          .feat-layout > div:first-child { display: grid !important; grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:540px) {
          .feat-layout > div:first-child { grid-template-columns: 1fr !important; }
          .points-grid { grid-template-columns: 1fr !important; }
          [style*="padding:\"44px 48px\""] { padding: 28px 20px !important; }
        }
      `}</style>
    </section>
  );
}

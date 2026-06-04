"use client";
import { useEffect } from "react";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    tag: "Hardware + Counter OS",
    title: "Smart Retail Device",
    headline: "One device. Every workflow at the counter.",
    desc: "A purpose-built offline-first device running custom Counter OS. It replaces paper notebooks, ledger calculators, and manual cash registers with one integrated touch screen.",
    stat: "1 Device Replaces All",
    color: "var(--accent-green)",
    glow: "var(--green-glow)",
    featured: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3h-3zm3 3h4v4h-4z" />
      </svg>
    ),
    tag: "Campaigns",
    title: "QR Campaign Engine",
    headline: "Scan & verify in under 10s.",
    desc: "Instantly check campaign eligibility and deliver brand rewards with one tap — zero paperwork or scheme leakages.",
    stat: "<10s Scan to Reward",
    color: "var(--accent-green-mid)",
    glow: "rgba(82,204,79,0.12)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    tag: "Analytics",
    title: "Real-time Demand Data",
    headline: "Live purchase insights.",
    desc: "Get real-time sell-out trends. See what's selling at the counter by product, region, and season.",
    stat: "Live Brand Insights",
    color: "var(--gold)",
    glow: "var(--gold-glow)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
    tag: "Finance",
    title: "Embedded Fintech",
    headline: "Formal fintech in-built.",
    desc: "Collect digital payments and build transaction histories to qualify for zero-collateral working capital credit.",
    stat: "₹0 Collateral Credit",
    color: "var(--accent-green)",
    glow: "var(--green-glow)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    tag: "Reliability",
    title: "Offline-First Sync",
    headline: "Built for poor connectivity.",
    desc: "Stores transaction records in secure local storage and syncs to the cloud automatically upon reconnection.",
    stat: "100% Offline Uptime",
    color: "var(--gold)",
    glow: "var(--gold-glow)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
      </svg>
    ),
    tag: "Operations",
    title: "Inventory Management",
    headline: "Automated stock tracking.",
    desc: "Track items, receive automatic low-stock notifications, and send restock orders directly to wholesale distributors.",
    stat: "One-Tap Reordering",
    color: "var(--accent-green-mid)",
    glow: "rgba(82,204,79,0.12)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    tag: "Brands",
    title: "Brand Scheme Connect",
    headline: "Zero scheme leakage.",
    desc: "Distribute promotions and loyalty campaigns directly to retailers with 100% verified digital redemption.",
    stat: "100% Verified Delivery",
    color: "var(--accent-green)",
    glow: "var(--green-glow)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    tag: "Security",
    title: "End-to-End Security",
    headline: "Cryptographically secured.",
    desc: "Every transaction, verification, and campaign redemption is digitally signed and logged in an immutable ledger.",
    stat: "256-bit Encryption",
    color: "var(--gold)",
    glow: "var(--gold-glow)",
  },
];

export default function Features() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal-bento").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" style={{ padding: "104px 0", background: "var(--bg2)", position: "relative", overflow: "hidden" }}>
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(82,204,79,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 44px", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <div className="reveal-bento" style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px", opacity: 0, transform: "translateY(20px)", transition: "opacity .6s ease, transform .6s ease" }}>
          <div className="pill" style={{ marginBottom: 18 }}>Platform Features</div>
          <h2 className="hf" style={{ fontWeight: 900, color: "#fff", fontSize: "clamp(30px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-.8px", marginBottom: 14 }}>
            Everything at <span className="gt-green">the Counter</span>
          </h2>
          <p style={{ color: "var(--ink2)", fontSize: 16, lineHeight: 1.75 }}>
            Replaces the paper notebook, ledger calculators, and cash box with a smart touch-first device designed exclusively for rural commerce.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal-bento bento-card"
              style={{
                gridColumn: f.featured ? "span 2" : "span 1",
                background: "var(--bg3)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                padding: f.featured ? "40px" : "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                transition: "transform .3s ease, border-color .3s ease, box-shadow .3s ease, background .3s ease",
                opacity: 0,
                transform: "translateY(30px)",
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = f.color;
                e.currentTarget.style.boxShadow = `0 12px 30px ${f.glow}`;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.background = "var(--surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "var(--bg3)";
              }}
            >
              {/* Card Glow Effect */}
              <div style={{ position: "absolute", top: -60, right: -60, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${f.glow} 0%, transparent 70%)`, pointerEvents: "none", opacity: 0.5 }} />

              <div>
                {/* Header Row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--bg2)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", color: f.color }}>
                    {f.icon}
                  </div>
                  <span style={{ color: "var(--muted)", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
                    {f.tag}
                  </span>
                </div>

                {/* Text Content */}
                <h3 className="hf" style={{ fontWeight: 800, fontSize: f.featured ? "clamp(20px, 2.5vw, 24px)" : "18px", color: "#fff", lineHeight: 1.3, marginBottom: 10 }}>
                  {f.featured ? f.headline : f.title}
                </h3>
                <p style={{ color: "var(--ink2)", fontSize: f.featured ? "15px" : "13.5px", lineHeight: 1.6, marginBottom: 28 }}>
                  {f.desc}
                </p>
              </div>

              {/* Footer Row / Metrics */}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="hf" style={{ color: f.color, fontWeight: 700, fontSize: 13, letterSpacing: ".05em" }}>
                  {f.stat}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" style={{ transition: "stroke .2s" }} className="arrow-icon">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .reveal-bento.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .bento-card:hover .arrow-icon {
          stroke: var(--accent-green) !important;
        }
        @media(max-width: 960px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-card {
            grid-column: span 1 !important;
          }
        }
        @media(max-width: 600px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          [style*="padding: \"0 44px\""] {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

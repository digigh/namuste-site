"use client";
import { useEffect } from "react";

const steps = [
  {
    num: "01",
    title: "Customer Visits Counter",
    desc: "A customer walks in to purchase products — seeds, medicines, hardware, FMCG goods, or any local inventory items.",
    c: "var(--gold)",
    glow: "var(--gold-glow)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Product QR Scanned",
    desc: "The retailer scans the product QR using the Namuste device. Eligibility for campaigns is instantly resolved in real-time.",
    c: "var(--accent-green-mid)",
    glow: "rgba(82,204,79,0.18)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3h-3zm3 3h4v4h-4z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Retailer Approves",
    desc: "The retailer reviews the unlocked promotion on screen and approves the transaction — digitizing the record in one tap.",
    c: "var(--bronze)",
    glow: "rgba(204,138,90,0.18)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Customer Gets Rewarded",
    desc: "Upon verification, the customer instantly receives cashback, loyalty points, or campaign discounts directly at the counter.",
    c: "var(--accent-green)",
    glow: "var(--green-glow)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal-flow").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="solutions" style={{ padding: "104px 0", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: "-80px", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(82,204,79,0.03) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 44px", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <div className="reveal-flow" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 80px", opacity: 0, transform: "translateY(20px)", transition: "opacity .6s ease, transform .6s ease" }}>
          <div className="pill" style={{ marginBottom: 18 }}>How It Works</div>
          <h2 className="hf" style={{ fontWeight: 900, color: "#fff", fontSize: "clamp(30px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-.8px", marginBottom: 14 }}>
            4 Steps. <span className="gt-green">One Device.</span>
          </h2>
          <p style={{ color: "var(--ink2)", fontSize: 16, lineHeight: 1.75 }}>
            From customer arrival to reward delivery — the entire rural retail journey runs through Namuste.
          </p>
        </div>

        {/* Steps Horizontal Roadmap */}
        <div style={{ position: "relative", marginBottom: 80 }} className="steps-container-outer">
          
          {/* Animated Connecting Flowing Line */}
          <div className="flowing-pipeline" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "28px" }} className="steps-grid-inner">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="reveal-flow step-flow-card"
                style={{
                  background: "var(--bg3)",
                  border: "1px solid var(--border)",
                  borderRadius: "24px",
                  padding: "36px 28px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  transition: "transform .3s ease, border-color .3s ease, box-shadow .3s ease, background .3s ease",
                  opacity: 0,
                  transform: "translateY(30px)",
                  transitionDelay: `${i * 95}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = s.c;
                  e.currentTarget.style.boxShadow = `0 12px 30px ${s.glow}`;
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "var(--bg3)";
                }}
              >
                {/* Large Background Step Number */}
                <div className="hf" style={{ position: "absolute", top: 12, right: 24, fontSize: 56, fontWeight: 900, color: s.c, opacity: 0.05, userSelect: "none", pointerEvents: "none" }}>
                  {s.num}
                </div>

                {/* Styled Pulsing Icon Capsule */}
                <div style={{ position: "relative", marginBottom: 28 }}>
                  <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: s.c, opacity: 0.1, filter: "blur(2px)" }} className="pulse-glow" />
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--bg2)", border: `1.5px solid ${s.c}`, display: "flex", alignItems: "center", justifyContent: "center", color: s.c, position: "relative", zIndex: 2 }}>
                    {s.icon}
                  </div>
                </div>

                {/* Step Metadata */}
                <span style={{ color: s.c, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Step {s.num}
                </span>
                <h3 className="hf" style={{ fontWeight: 800, fontSize: 17, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>
                  {s.title}
                </h3>
                <p style={{ color: "var(--ink2)", fontSize: 13.5, lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Secured CTA Section */}
        <div className="reveal-flow" style={{ background: "rgba(82,204,79,.03)", border: "1px solid var(--border2)", borderRadius: "24px", padding: "52px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 28, position: "relative", overflow: "hidden", backdropFilter: "blur(8px)", opacity: 0, transform: "translateY(25px)", transition: "opacity .6s ease, transform .6s ease" }}>
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
          <div style={{ position: "absolute", top: -80, left: -80, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(82,204,79,.1) 0%,transparent 70%)", pointerEvents: "none" }} />
          
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(82,204,79,.08)", border: "1px solid rgba(82,204,79,.2)", borderRadius: 99, padding: "5px 12px", marginBottom: 14 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)" }} />
              <span style={{ color: "var(--accent-green)", fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>End-to-End Secured</span>
            </div>
            <h3 className="hf" style={{ fontWeight: 800, color: "#fff", fontSize: "clamp(20px,2.5vw,28px)", lineHeight: 1.3 }}>
              Brand visibility. Retailer empowered.<br />Customer rewarded.
            </h3>
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <a href="#contact" className="btn-green" style={{ boxShadow: "0 6px 30px var(--green-glow)" }}>See It In Action →</a>
          </div>
        </div>
      </div>

      <style>{`
        .flowing-pipeline {
          position: absolute;
          top: 64px;
          left: 6%;
          right: 6%;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--accent-green-mid), var(--bronze), var(--accent-green), var(--gold));
          background-size: 200% auto;
          animation: pipelineFlow 6s linear infinite;
          opacity: 0.25;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes pipelineFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: -200% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.15); opacity: 0.25; }
        }
        .pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .reveal-flow.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media(max-width: 960px) {
          .flowing-pipeline {
            display: none !important;
          }
          .steps-grid-inner {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media(max-width: 540px) {
          .steps-grid-inner {
            grid-template-columns: 1fr !important;
          }
          [style*="padding: \"0 44px\""] {
            padding: 0 20px !important;
          }
          [style*="padding: \"52px 48px\""] {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

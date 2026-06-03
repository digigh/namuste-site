"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconLeaf, IconBox, IconCoin, IconCheck, IconShield, IconWifi } from "./Icons";

const stars = [
  { x: "5%", y: "9%", s: 2, d: 0 },
  { x: "14%", y: "5%", s: 1, d: 0.5 },
  { x: "24%", y: "13%", s: 2, d: 1.1 },
  { x: "76%", y: "10%", s: 2, d: 0.7 },
  { x: "86%", y: "4%", s: 1, d: 1.4 },
  { x: "94%", y: "12%", s: 2, d: 0.3 },
  { x: "3%", y: "38%", s: 1, d: 0.6 },
  { x: "97%", y: "35%", s: 2, d: 0.9 },
];

type Industry = "agri" | "pharma" | "kirana";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<Industry>("agri");

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // simulated tablet content mapping
  const mockContent = {
    agri: {
      title: "Agri-Input Counter",
      status: "Cooperative Orders Active",
      stats: [
        { l: "Crop Cycle", v: "Kharif Sowing" },
        { l: "Seeds Inventory", v: "420 Bags" },
        { l: "Active Schemes", v: "5 Brands" },
      ],
      alert: "Restocking seeds in Burdwan route..."
    },
    pharma: {
      title: "Chemist B2B Portal",
      status: "Expiries Under Check",
      stats: [
        { l: "Near Expiry Alerts", v: "14 Items" },
        { l: "Order Bundles", v: "8 Sets" },
        { l: "B2B Shipments", v: "Verified" },
      ],
      alert: "Expiry alert compiled for Area Manager..."
    },
    kirana: {
      title: "Kirana POS Ledger",
      status: "Stock Rotation Clear",
      stats: [
        { l: "FMCG Inventory", v: "1,200 SKUs" },
        { l: "Margin Suggestion", v: "12.4% Avg" },
        { l: "Cash Flow", v: "Healthy" },
      ],
      alert: "FIFO inventory rotation suggested..."
    }
  };

  return (
    <section id="product" style={{
      minHeight: "95vh",
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      paddingTop: "100px",
      paddingBottom: "60px"
    }}>
      {/* Decorative radial glows */}
      <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "min(900px,100vw)", height: "600px", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(82,204,79,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div className="line-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.7 }} />
      
      {stars.map((s, i) => (
        <div key={i} className="aStar" style={{
          position: "absolute", left: s.x, top: s.y, width: s.s, height: s.s, borderRadius: "50%",
          background: i % 2 === 0 ? "var(--accent-green)" : "var(--gold)",
          animationDelay: `${s.d}s`, pointerEvents: "none"
        }} />
      ))}

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "60px", alignItems: "center" }} className="hero-grid">
          
          {/* LEFT COLUMN: Text Copy & Core Stats */}
          <div className="reveal-l">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ height: 1, width: 32, background: "linear-gradient(90deg,transparent,var(--accent-green-mid))" }} />
              <span style={{ color: "var(--accent-green)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
                Universal Channel Intelligence
              </span>
              <div style={{ height: 1, width: 32, background: "linear-gradient(90deg,var(--accent-green-mid),transparent)" }} />
            </div>

            <h1 className="hf" style={{ color: "var(--ink)", fontSize: "clamp(34px, 5.5vw, 56px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-1.5px", marginBottom: "20px" }}>
              The Counter OS for Any <span className="gt">Channel Network.</span>
            </h1>

            <p style={{ color: "var(--ink2)", fontSize: "clamp(14px, 1.8vw, 16px)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "520px" }}>
              A live, intelligent operating system that sits on top of your distributed channel partners. Connect sales, run verified B2B incentive programs, and eliminate scheme leakage in real time.
            </p>

            <div style={{ display: "flex", gap: 14, marginBottom: "48px" }} className="hero-actions">
              <Link href="/contact" className="btn-green">Apply for Early Access</Link>
              <Link href="/platform" className="btn-ghost">See Platform Modules →</Link>
            </div>

            {/* Core Trust Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
              {[
                { v: "12M+", l: "Kiranas & Dealers", c: "var(--accent-green)" },
                { v: "₹40L Cr+", l: "Annual Market Size", c: "var(--gold)" },
                { v: "~0%", l: "Digitized Today", c: "#f87171" }
              ].map((st) => (
                <div key={st.l}>
                  <div className="hf" style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 900, color: st.c, lineHeight: 1, marginBottom: "6px" }}>{st.v}</div>
                  <div style={{ color: "var(--ink2)", fontSize: "11px", lineHeight: 1.4, fontWeight: 500 }}>{st.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Perspectival Tablet & Hovering Cards */}
          <div className="reveal-r" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            
            {/* Category selection selector */}
            <div style={{ 
              position: "absolute", top: "-48px", zIndex: 30, display: "flex", gap: "8px", 
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", padding: "4px" 
            }}>
              {[
                { id: "agri", label: "Agriculture", icon: <IconLeaf size={12} /> },
                { id: "pharma", label: "Pharmacy", icon: <IconBox size={12} /> },
                { id: "kirana", label: "Kirana / FMCG", icon: <IconCoin size={12} /> },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as Industry)} style={{
                  display: "flex", alignItems: "center", gap: "6px", border: "none", borderRadius: "16px",
                  padding: "6px 14px", fontSize: "11px", fontWeight: "bold", cursor: "pointer", transition: "all .2s",
                  background: activeTab === tab.id ? "var(--accent-green)" : "transparent",
                  color: activeTab === tab.id ? "var(--bg)" : "var(--ink2)"
                }}>
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 3D Glassmorphic Tablet container */}
            <div style={{
              width: "100%", maxWidth: "420px", height: "300px", borderRadius: "20px",
              background: "var(--card-bg)", border: "1px solid var(--border2)",
              padding: "24px", boxShadow: "var(--shadow)", backdropFilter: "blur(12px)",
              transform: "perspective(1200px) rotateY(-10deg) rotateX(4deg)",
              transition: "transform .5s ease",
              position: "relative", zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between"
            }}>
              {/* Tablet screen mock */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "12px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-green)", animation: "blink 1.8s infinite" }} />
                  <span style={{ fontSize: "11px", color: "var(--accent-green)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em" }}>Counter OS Active</span>
                </div>
                <span style={{ fontSize: "10px", color: "var(--ink2)", fontFamily: "monospace" }}>v2.1 (Offline-Ready)</span>
              </div>

              <div>
                <h3 className="hf" style={{ fontSize: "20px", fontWeight: 900, color: "var(--ink)", marginBottom: "4px" }}>{mockContent[activeTab].title}</h3>
                <p style={{ fontSize: "12px", color: "var(--accent-green-mid)", fontWeight: 500, marginBottom: "20px" }}>{mockContent[activeTab].status}</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {mockContent[activeTab].stats.map((st) => (
                    <div key={st.l} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--ink2)" }}>{st.l}</span>
                      <span className="hf" style={{ fontSize: "12px", fontWeight: "bold", color: "var(--ink)" }}>{st.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,208,96,0.06)", border: "1px solid rgba(255,208,96,0.15)", borderRadius: "8px", padding: "8px 12px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)" }} />
                <span style={{ fontSize: "10px", color: "var(--gold)", fontWeight: 500, fontFamily: "monospace" }}>{mockContent[activeTab].alert}</span>
              </div>
            </div>

            {/* Overlapping Hovering Badges */}
            {/* Card 1: OTP verified */}
            <div className="af2" style={{
              position: "absolute", left: "-32px", top: "52px", zIndex: 20,
              background: "var(--card-bg)", border: "1px solid var(--accent-green-mid)",
              borderRadius: "12px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px",
              boxShadow: "var(--shadow)", backdropFilter: "blur(8px)"
            }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(82,204,79,0.12)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)" }}>
                <IconCheck size={12} />
              </div>
              <div>
                <div style={{ fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", color: "var(--accent-green-mid)", letterSpacing: "0.05em" }}>Fulfillment</div>
                <div className="hf" style={{ fontSize: "11px", fontWeight: "bold", color: "var(--ink)" }}>OTP Verified ✓</div>
              </div>
            </div>

            {/* Card 2: Partner Trust */}
            <div className="af3" style={{
              position: "absolute", right: "-32px", bottom: "40px", zIndex: 20,
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: "12px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px",
              boxShadow: "var(--shadow)", backdropFilter: "blur(8px)"
            }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(255,208,96,0.1)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>
                ★
              </div>
              <div>
                <div style={{ fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", color: "var(--ink2)", letterSpacing: "0.05em" }}>Score Tracker</div>
                <div className="hf" style={{ fontSize: "11px", fontWeight: "bold", color: "var(--ink)" }}>98% Partner Trust</div>
              </div>
            </div>

          </div>

        </div>
      </div>
      <style>{`
        @media(max-width:900px){
          .hero-grid { grid-template-columns: 1fr!important; gap: 80px!important; text-align: center!important; }
          .hero-actions { justify-content: center!important; }
          [style*="gridTemplateColumns: \\"repeat(3, 1fr)\\""] { justify-content: center!important; }
          [style*="transform: \\"perspective(1200px) rotateY(-10deg) rotateX(4deg)\\""] { transform: none!important; }
          .af2, .af3 { position: static!important; display: inline-flex!important; margin: 10px!important; }
          .reveal-r { flex-direction: column!important; align-items: center!important; }
        }
        @media(max-width:480px){
          .hero-actions { flex-direction: column!important; }
        }
      `}</style>
    </section>
  );
}

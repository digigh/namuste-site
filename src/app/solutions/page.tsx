import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconLeaf, IconBox, IconCoin, IconBarChart } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Industry Solutions & Use Cases — Namuste Technologies",
  description: "Learn how Counter OS adapts across key sectors: Agriculture inputs, Pharmacy B2B fulfillment, Kirana stock rotations, and Hardware inventory tracking.",
};

const verticals = [
  {
    title: "Agriculture & Crop Inputs",
    tag: "Agri-Input",
    icon: <IconLeaf size={24} />,
    headline: "Sync crop cycles, manage regional distributors, and secure bulk cashbacks.",
    desc: "Designed exclusively for rural seed, pesticide, and fertilizer dealers. Helps track local sowing schedules, bulk order from regional wholesale distributors, and verify B2B scheme payouts on high-value inputs.",
    features: [
      "Track seasonal demand aligned with local sowing cycles",
      "Manage credit books and reward balances for cooperative accounts",
      "Distributor order logs with automated delivery tracking",
      "Secure digital cashbacks on bulk brand schemes",
    ],
    badgeColor: "var(--accent-green)",
  },
  {
    title: "Pharmacies & Chemists",
    tag: "Pharma & Healthcare",
    icon: <IconBox size={24} />,
    headline: "Monitor expiry-sensitive items, bundle orders, and secure B2B verifications.",
    desc: "For local chemists and pharmacists who require safe, certified shipments. Counter OS checks drug validity dates, triggers early warning alerts for near-expiry items, and automates order bundling.",
    features: [
      "Automated near-expiry stock notifications",
      "One-tap B2B order compilation to verified stockists",
      "OTP-authenticated drug bundle verifications",
      "FIFO (First-In, First-Out) inventory suggestions",
    ],
    badgeColor: "var(--diamond-blue)",
  },
  {
    title: "Kirana & Grocery Stores",
    tag: "FMCG Retail",
    icon: <IconCoin size={24} />,
    headline: "Speed up retail billing, rotate FMCG stock, and optimize item margins.",
    desc: "Keeps fast-moving consumer goods flowing. Accelerate walk-in consumer sales using the fast checkout cart system, track batch codes, and get instant suggestions on high-margin cash-cow items.",
    features: [
      "Frictionless consumer cart system with optional OTP loyalty",
      "Automated stock rotations to clear low-life inventory",
      "Margin analysis suggestions showing underperforming categories",
      "Offline transactions sync background database on reconnect",
    ],
    badgeColor: "var(--gold)",
  },
  {
    title: "Hardware, Textiles & Electronics",
    tag: "Specialty Trade",
    icon: <IconBarChart size={24} />,
    headline: "Manage multi-unit tracking (meters, kits, boxes) and protect high-value stock.",
    desc: "Tailored to handle diverse units and variations. Track inventory by meters, pairs, rolls, or bundles and manage secure, serial-tracked electronics or hardware appliances without margin losses.",
    features: [
      "Flexible unit of measurement (UoM) configurations",
      "Serial and batch tracking for high-value appliances",
      "Automated stock levels alert with distributor auto-refill",
      "Dynamic customer purchase segmentation for repeat business",
    ],
    badgeColor: "var(--bronze)",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", paddingTop: "110px", overflowX: "hidden" }}>
        
        {/* Header Banner */}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px", position: "relative" }}>
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
            <span className="pill" style={{ marginBottom: "20px" }}>Tailored Verticals</span>
            <h1 className="hf" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: "24px", color: "var(--ink)" }}>
              One OS. <span className="gt-green">Built for Every Trade.</span>
            </h1>
            <p style={{ color: "var(--ink2)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto" }}>
              While the underlying supply chain mechanics stay uniform, Counter OS adapts its catalog, calculations, and rules to match your specific industry.
            </p>
          </div>
        </section>

        {/* Sectors Grid */}
        <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
              {verticals.map((v, i) => (
                <div key={v.title} style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1fr 1fr", 
                  gap: "64px", 
                  alignItems: "center", 
                  borderBottom: i < verticals.length - 1 ? "1px solid var(--border)" : "none",
                  paddingBottom: i < verticals.length - 1 ? "60px" : "0"
                }} className="solutions-g">
                  <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "6px 12px", marginBottom: "20px", color: v.badgeColor }}>
                      {v.icon}
                      <span style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em" }}>{v.tag}</span>
                    </div>
                    <h3 className="hf" style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "var(--ink)", marginBottom: "14px", lineHeight: 1.2 }}>{v.title}</h3>
                    <p className="hf" style={{ color: v.badgeColor, fontSize: "16px", fontWeight: 600, lineHeight: 1.4, marginBottom: "18px" }}>{v.headline}</p>
                    <p style={{ color: "var(--ink2)", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>{v.desc}</p>
                  </div>
                  <div style={{ order: i % 2 === 0 ? 2 : 1, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "40px", boxShadow: "var(--shadow)" }}>
                    <h4 className="hf" style={{ fontWeight: 700, color: "var(--ink)", fontSize: "15px", marginBottom: "20px" }}>Sector Capabilities:</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {v.features.map((feat) => (
                        <div key={feat} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(82,204,79,0.1)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)", flexShrink: 0, marginTop: "2px" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ margin: "auto" }}><path d="M20 6 9 17l-5-5"/></svg>
                          </div>
                          <span style={{ fontSize: "13px", color: "var(--ink2)", lineHeight: 1.5 }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){
          .solutions-g { grid-template-columns: 1fr!important; gap: 32px!important; }
          .solutions-g > div { order: unset!important; }
        }
      `}</style>
    </>
  );
}

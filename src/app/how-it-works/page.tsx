import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconTarget, IconLayers, IconUsers, IconSmartphone, IconBarChart, IconCheck, IconShield } from "@/components/Icons";

export const metadata: Metadata = {
  title: "How Counter OS Works — Namuste Technologies",
  description: "Explore the end-to-end B2B and B2C supply chain flow of Counter OS. From smart B2B wholesale ordering to OTP-verified delivery and AI analytics.",
};

const steps = [
  {
    num: "01",
    title: "Onboarding & Shop Setup",
    icon: <IconUsers size={24} />,
    color: "var(--accent-green)",
    desc: "Users download and choose their role (Retailer or Distributor), selecting their trade category (Agri, Food & Grocery, Pharma, Hardware, Electronics). The platform immediately seeds a starter inventory catalog using smart category data.",
    highlights: ["Select Retailer/Distributor role", "Define business trade category", "AI-Generated smart inventory seeding"],
  },
  {
    num: "02",
    title: "B2B Wholesale Ordering",
    icon: <IconLayers size={24} />,
    color: "var(--accent-green-mid)",
    desc: "Retailers browse their linked distributor's catalog from the counter, compile their list, and submit a wholesale purchase order. Wholesalers receive instant notifications to review, edit, and approve the order.",
    highlights: ["Browse wholesale catalogs in real time", "Distributor receives push notifications", "Secure 4-digit Delivery OTP generated on approval"],
  },
  {
    num: "03",
    title: "OTP-Verified Fulfillment & Rewards",
    icon: <IconShield size={24} />,
    color: "var(--accent-green-deep)",
    desc: "When delivery arrives at the retail counter, the retailer verifies the physical package and shares the 4-digit OTP. The distributor enters the OTP on their device, confirming delivery and triggering instant backend resolutions.",
    highlights: ["Distributor receives wallet payout instantly", "Retailer earns 5% to 10% cashback rewards", "Retailer inventory quantities auto-increment"],
  },
  {
    num: "04",
    title: "Point of Sale (POS) & Consumer Cart",
    icon: <IconSmartphone size={24} />,
    color: "var(--gold)",
    desc: "Retailers process quick consumer checkouts using a high-speed, touch-first POS cart. Sales are logged in the offline ledger, automatically reducing stock levels and updating live profit values in the store wallet.",
    highlights: ["High-speed cart for walk-in retail bills", "Optional consumer OTP for loyalty points", "Real-time margin and wallet balance updates"],
  },
  {
    num: "05",
    title: "AI Business Intelligence Buddy",
    icon: <IconBarChart size={24} />,
    color: "var(--diamond-blue)",
    desc: "The on-device AI system monitors operations. It reads printed paper invoices using computer vision, tracks stockout risk indicators, warns about low-margin products, and highlights optimal pricing adjustments.",
    highlights: ["OCR scanning extracts printed invoices", "Automated low-stock alerts", "Margin optimization action plans"],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", paddingTop: "110px", overflowX: "hidden" }}>
        
        {/* Banner */}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px", position: "relative" }}>
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
            <span className="pill" style={{ marginBottom: "20px" }}>Core Workflow</span>
            <h1 className="hf" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: "24px", color: "var(--ink)" }}>
              The Supply Chain <span className="gt-green">Timeline.</span>
            </h1>
            <p style={{ color: "var(--ink2)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto" }}>
              From initial store setup and wholesale B2B ordering to OTP delivery verification and AI-driven stock recommendations.
            </p>
          </div>
        </section>

        {/* Timeline Steps */}
        <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "80px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
            
            {/* Center line for desktop */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "40px", width: "1px", background: "var(--border)", opacity: 0.5 }} className="timeline-line" />

            <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
              {steps.map((s) => (
                <div key={s.num} style={{ display: "flex", gap: "32px", position: "relative", zIndex: 10 }} className="timeline-item">
                  
                  {/* Step Number Circle */}
                  <div style={{ 
                    width: "80px", 
                    height: "80px", 
                    borderRadius: "50%", 
                    background: "var(--bg)", 
                    border: `2px solid ${s.color}`, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    color: s.color, 
                    fontWeight: 900, 
                    fontSize: "20px", 
                    flexShrink: 0,
                    boxShadow: "var(--shadow)"
                  }} className="hf">
                    {s.num}
                  </div>

                  {/* Step Details Card */}
                  <div className="card" style={{ padding: "32px", flex: 1 }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px", color: s.color }}>
                      {s.icon}
                      <h3 className="hf" style={{ fontSize: "20px", fontWeight: 800, color: "var(--ink)" }}>{s.title}</h3>
                    </div>
                    <p style={{ color: "var(--ink2)", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>{s.desc}</p>
                    
                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                      <h4 className="hf" style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", marginBottom: "12px" }}>Key Functions:</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }} className="points-grid">
                        {s.highlights.map((h) => (
                          <div key={h} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "rgba(82,204,79,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)" }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ margin: "auto" }}><path d="M20 6 9 17l-5-5"/></svg>
                            </div>
                            <span style={{ fontSize: "12px", color: "var(--ink2)" }}>{h}</span>
                          </div>
                        ))}
                      </div>
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
        @media(max-width:768px){
          .timeline-line { display: none!important; }
          .timeline-item { flex-direction: column!important; gap: 16px!important; align-items: center!important; text-align: center!important; }
          .points-grid { grid-template-columns: 1fr!important; text-align: left!important; }
        }
      `}</style>
    </>
  );
}

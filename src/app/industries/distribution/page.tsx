import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, Truck, PhoneCall, ShieldCheck, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Voice & Chat for Distribution & Field Teams — Namuste",
  description:
    "Namuste handles product, order, delivery status, and dealer helpline conversations across distribution networks and regional territories.",
};

export default function DistributionPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO SECTION */}
        <section
          style={{
            minHeight: "85vh",
            paddingTop: "140px",
            paddingBottom: "80px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="bg-radial-hero"
        >
          <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 36px", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)", marginBottom: "24px" }}>
              <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Industries</Link>
              <span>/</span>
              <span style={{ color: "var(--green)" }}>Distribution & Field Businesses</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }} className="hero-grid">
              <div>
                <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "520px" }}>
                  Orders move. Questions multiply. Support should <span className="serif-italic">keep pace.</span>
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "480px", marginBottom: "32px" }}>
                  Retailers, distributors and field teams need answers across fragmented channels and territory working hours.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn-primary">
                    Experience Partner Assistant <ArrowRight size={15} />
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Talk to Namuste <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Connected Trail */}
              <div className="glass-card" style={{ padding: "28px", borderRadius: "18px", background: "rgba(12, 14, 12, 0.8)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "14px 18px", borderRadius: "12px", border: "1px solid var(--border-coral)" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--coral)", textTransform: "uppercase" }}>Retailer Inbound:</div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)" }}>Where is my pending order for Burdwan district?</div>
                  </div>
                  <div style={{ background: "rgba(118, 192, 67, 0.08)", padding: "14px 18px", borderRadius: "12px", border: "1px solid var(--border-green)" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase" }}>Namuste Helpline:</div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)" }}>Order #5092 dispatched from warehouse; driver ETA is today at 4:30 PM.</div>
                  </div>
                  <div style={{ background: "rgba(10, 18, 10, 0.9)", padding: "12px 18px", borderRadius: "12px", border: "1px solid var(--green)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--green-luminous)" }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--green-luminous)" }}>Status verified & WhatsApp GPS tracking sent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              One network. A <span className="serif-italic">consistent answer</span> everywhere.
            </span>
          </div>
        </section>

        {/* DISTRIBUTION CAPABILITIES */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ maxWidth: "640px", marginBottom: "56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>Supply Chain Workflows</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 42px)", color: "var(--text-ivory)", lineHeight: 1.2 }}>
                End-to-end support for <span className="serif-italic">dealers and field reps.</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="cards-grid-3">
              {[
                { title: "24/7 Retailer Helpline", desc: "Automates order lookups, invoice copies, payment status, and credit limit inquiries instantly." },
                { title: "Trade Scheme Verification", desc: "Explains volume promotions, cashback eligibility, and resolves dealer incentive queries with zero leakage." },
                { title: "Complaint Registration & Routing", desc: "Captures damaged shipment reports with photos and escalates directly to territory dispatch officers." },
              ].map((c, i) => (
                <div key={i} className="glass-card" style={{ padding: "32px", borderRadius: "18px" }}>
                  <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "10px" }}>{c.title}</h3>
                  <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@media (max-width: 900px) { .cards-grid-3 { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

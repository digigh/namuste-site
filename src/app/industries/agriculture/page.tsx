import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sprout, PhoneCall, Globe, CheckCircle2, ArrowRight, Sparkles, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Multilingual AI Voice & Chat for Agriculture & Rural Commerce — Namuste",
  description:
    "Namuste makes farmer helplines, seed/crop input enquiries, dealer support, and multilingual rural surveys accessible through natural voice and chat.",
};

export default function AgriculturePage() {
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
              <span style={{ color: "var(--green)" }}>Agriculture & Rural Commerce</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }} className="hero-grid">
              <div>
                <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "520px" }}>
                  The market is multilingual. Support should <span className="serif-italic">be too.</span>
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "480px", marginBottom: "32px" }}>
                  Farmers, retailers and distributors need accessible support across languages, geographies and varying levels of digital comfort.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn-primary">
                    Experience Agriculture Assistant <ArrowRight size={15} />
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Book a Demo <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Connected Trail */}
              <div className="glass-card" style={{ padding: "28px", borderRadius: "18px", background: "rgba(12, 16, 12, 0.85)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "14px 18px", borderRadius: "12px", border: "1px solid var(--border-coral)" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--coral)", textTransform: "uppercase" }}>Farmer (Hindi Voice Call):</div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)" }}>&ldquo;धान की फसल के लिए कौन सा खाद सही रहेगा इस मौसम में?&rdquo;</div>
                  </div>
                  <div style={{ background: "rgba(118, 192, 67, 0.08)", padding: "14px 18px", borderRadius: "12px", border: "1px solid var(--border-green)" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase" }}>Namuste Voice AI (Hindi):</div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)" }}>&ldquo;आपके जिले (हुगली) के अनुसार बुवाई के 20 दिन बाद अनुशंसित जिंक व यूरिया का प्रयोग करें...&rdquo;</div>
                  </div>
                  <div style={{ background: "rgba(10, 18, 10, 0.9)", padding: "12px 18px", borderRadius: "12px", border: "1px solid var(--green)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--green-luminous)" }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--green-luminous)" }}>Crop guide & nearest dealer contact sent via SMS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Every voice understood. <span className="serif-italic">Every need organised.</span>
            </span>
          </div>
        </section>

        {/* AGRI CAPABILITIES */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ maxWidth: "640px", marginBottom: "56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>Vernacular Agri Modules</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 42px)", color: "var(--text-ivory)", lineHeight: 1.2 }}>
                Designed for field-level <span className="serif-italic">simplicity.</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="cards-grid-3">
              {[
                { title: "Vernacular Farmer Helplines", desc: "Speaks naturally in Hindi, Bengali, Telugu, Tamil, Marathi, Punjabi and regional dialects with zero robotic tones." },
                { title: "Retailer & Distributor Orders", desc: "Automates seasonal crop input orders, credit confirmations, and dispatch tracking from local agri-dealers." },
                { title: "Multilingual Field Surveys", desc: "Executes thousands of farmer sentiment and crop health voice surveys with automated transcription and analytics." },
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

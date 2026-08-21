import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart3, Users, Globe, CheckCircle2, ArrowRight, Sparkles, Sliders } from "lucide-react";

export const metadata: Metadata = {
  title: "Multilingual Voice & Chat Survey Agent — Namuste",
  description:
    "Namuste conducts structured quantitative and qualitative surveys across thousands of respondents simultaneously in native languages with verified data capture.",
};

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
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
              <span style={{ color: "var(--green)" }}>Research & Surveys</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }} className="hero-grid">
              <div>
                <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "520px" }}>
                  More conversations should not require <span className="serif-italic">larger teams.</span>
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "480px", marginBottom: "32px" }}>
                  Large-volume research becomes expensive and inconsistent when every interview depends entirely on manual calling.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn-primary">
                    Experience Survey Agent <ArrowRight size={15} />
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Discuss a Study <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Connected Trail */}
              <div className="glass-card" style={{ padding: "28px", borderRadius: "18px", background: "rgba(12, 14, 12, 0.85)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ background: "rgba(118, 192, 67, 0.08)", padding: "14px 18px", borderRadius: "12px", border: "1px solid var(--border-green)" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase" }}>Namuste Survey Agent:</div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)" }}>&ldquo;May I ask you 4 quick questions regarding your recent retail store experience?&rdquo;</div>
                  </div>
                  <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "14px 18px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Respondent:</div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)" }}>&ldquo;Yes, continue. Product quality was great, but delivery took 3 days.&rdquo;</div>
                  </div>
                  <div style={{ background: "rgba(10, 18, 10, 0.9)", padding: "12px 18px", borderRadius: "12px", border: "1px solid var(--green)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--green-luminous)" }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--green-luminous)" }}>Sentiment classified as Positive Quality / Delayed Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Structured conversations. <span className="serif-italic">Research-ready outcomes.</span>
            </span>
          </div>
        </section>

        {/* SURVEY CAPABILITIES */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ maxWidth: "640px", marginBottom: "56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>Survey Execution Engine</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 42px)", color: "var(--text-ivory)", lineHeight: 1.2 }}>
                High-volume data collection with <span className="serif-italic">zero manual dialing.</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="cards-grid-3">
              {[
                { title: "Dynamic Adaptive Branching", desc: "Intelligently skips or deep-dives into specific questions based on respondent answers in real-time." },
                { title: "Multilingual Voice Interviews", desc: "Conducts concurrent outbound voice interviews across thousands of phone numbers in regional dialects." },
                { title: "Structured Quantitative Output", desc: "Transcribes audio, extracts verified ratings/metrics, and feeds clean tabular data into BI dashboards." },
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

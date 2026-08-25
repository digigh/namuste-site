import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChannelSwitcher from "@/components/ChannelSwitcher";
import { PhoneCall, MessageSquare, Globe, Cpu, Zap, ShieldCheck, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Namuste Platform Architecture — One Intelligence Layer for Voice & Chat",
  description:
    "Explore the Namuste platform: configure custom knowledge, orchestrate multi-turn conversations, automate calendar & CRM workflows, and hand off seamlessly to human teams.",
};

export default function ProductPlatformPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#000000", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section
          className="product-hero-pad bg-radial-hero"
          style={{
            minHeight: "80vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="product-container" style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
            <div className="pill" style={{ marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16" }} />
              The Core Architecture
            </div>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(32px, 4vw, 54px)",
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#F5F5F0",
                marginBottom: "20px",
                maxWidth: "760px",
              }}
            >
              One intelligence layer across <br />
              <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
                Voice, WhatsApp and Web.
              </span>
            </h1>
            <p
              style={{
                color: "#A1A1AA",
                fontSize: "clamp(15px, 1.3vw, 17.5px)",
                lineHeight: 1.65,
                maxWidth: "580px",
                marginBottom: "32px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Upload your operating guidelines once. Namuste turns fragmented customer enquiries into structured, verified business actions in sub-second response times.
            </p>
            <div className="product-hero-actions" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary" style={{ padding: "13px 26px", fontSize: "14px", fontWeight: 700 }}>
                Explore Platform Demo <ArrowRight size={15} />
              </Link>
              <Link href="/how-it-works" className="btn-secondary" style={{ padding: "13px 24px", fontSize: "14px" }}>
                See How It Works <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "32px", paddingLeft: "16px", paddingRight: "16px" }}>
            <span className="serif" style={{ fontSize: "clamp(18px, 2.2vw, 28px)", color: "#F5F5F0", fontWeight: 300 }}>
              Engineered for <span className="serif-italic" style={{ color: "#9BEA16" }}>clarity, speed and human trust.</span>
            </span>
          </div>
        </section>

        {/* CHANNELS BREAKDOWN */}
        <section className="product-section-pad" style={{ background: "rgba(10, 12, 10, 0.9)", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="product-container" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>Native Channels</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "#F5F5F0", lineHeight: 1.2, marginBottom: "14px", fontWeight: 300 }}>
                Every channel speaking with <span className="serif-italic" style={{ color: "#9BEA16" }}>one unified brain.</span>
              </h2>
            </div>

            <ChannelSwitcher />
          </div>
        </section>

        {/* PLATFORM MODULES */}
        <section className="product-section-pad" style={{ background: "#000000", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="product-container" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>System Capabilities</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "#F5F5F0", lineHeight: 1.2, fontWeight: 300 }}>
                Built to orchestrate <span className="serif-italic" style={{ color: "#9BEA16" }}>complex real-world logic.</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="platform-grid">
              {[
                { title: "Knowledge Ingestion Engine", desc: "Ingests price lists, clinician schedules, FAQs, and SOP documents. Automatically updates conversational context." },
                { title: "Deterministic Guardrails", desc: "Strict verification rules ensure the AI never makes promises, pricing commitments, or diagnostic claims outside policy." },
                { title: "Sub-600ms Conversational Latency", desc: "Ultra-fast voice synthesis creates natural human cadence with interruption handling and background noise cancellation." },
                { title: "2-Way Calendar & CRM Sync", desc: "Directly books Google Calendar, Outlook, Practo, Zoho, and custom REST API endpoints in real-time." },
                { title: "Contextual Human Handover", desc: "When sentiment escalates or edge-cases arise, transfers calls to human staff with complete live transcripts." },
                { title: "Multilingual Dialect Intelligence", desc: "Understands mixed language phrasings (Hinglish, Benglish, colloquial vernaculars) without misinterpreting intent." },
              ].map((c, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: "28px 24px",
                    borderRadius: "18px",
                    background: "rgba(14, 16, 14, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <h3 className="serif" style={{ fontSize: "19px", color: "#F5F5F0", marginBottom: "10px", fontWeight: 400 }}>{c.title}</h3>
                  <p style={{ fontSize: "13.5px", color: "#A1A1AA", lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .product-hero-pad {
          padding-top: 140px;
          padding-bottom: 60px;
        }
        .product-section-pad {
          padding: 90px 36px;
        }
        .product-container {
          padding: 0 36px;
        }
        @media (max-width: 900px) {
          .platform-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .product-hero-pad {
            padding-top: 100px !important;
            padding-bottom: 40px !important;
          }
          .product-section-pad {
            padding: 60px 16px !important;
          }
          .product-container {
            padding: 0 16px !important;
          }
          .product-hero-actions {
            flex-direction: column !important;
            width: 100% !important;
          }
          .product-hero-actions a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
}

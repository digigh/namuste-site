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
            <div className="pill" style={{ marginBottom: "16px" }}>The Core Architecture</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "680px" }}>
              One intelligence layer across <span className="serif-italic">Voice, WhatsApp and Web.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "32px" }}>
              Upload your operating guidelines once. Namuste turns fragmented customer enquiries into structured, verified business actions in sub-second response times.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Explore Platform Demo <ArrowRight size={15} />
              </Link>
              <Link href="/how-it-works" className="btn-secondary">
                See How It Works <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "80px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Engineered for <span className="serif-italic">clarity, speed and human trust.</span>
            </span>
          </div>
        </section>

        {/* CHANNELS BREAKDOWN */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}>
              <div className="pill" style={{ marginBottom: "16px" }}>Native Channels</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "16px" }}>
                Every channel speaking with <span className="serif-italic">one unified brain.</span>
              </h2>
            </div>

            <ChannelSwitcher />
          </div>
        </section>

        {/* PLATFORM MODULES */}
        <section style={{ padding: "100px 36px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ maxWidth: "600px", marginBottom: "56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>System Capabilities</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 42px)", color: "var(--text-ivory)", lineHeight: 1.2 }}>
                Built to orchestrate <span className="serif-italic">complex real-world logic.</span>
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
      <style>{`@media (max-width: 900px) { .platform-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

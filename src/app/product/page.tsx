import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChannelSwitcher from "@/components/ChannelSwitcher";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Namuste Platform Architecture — One Intelligence Layer for Voice & Chat",
  description:
    "Explore the Namuste platform: configure custom knowledge, orchestrate multi-turn conversations, automate calendar & CRM workflows, and hand off seamlessly to human teams.",
};

const MODULES = [
  { title: "Knowledge Ingestion Engine", desc: "Ingests price lists, clinician schedules, FAQs, and SOP documents. Automatically updates conversational context." },
  { title: "Deterministic Guardrails", desc: "Strict verification rules ensure the AI never makes promises, pricing commitments, or diagnostic claims outside policy." },
  { title: "Sub-600ms Conversational Latency", desc: "Ultra-fast voice synthesis creates natural human cadence with interruption handling and background noise cancellation." },
  { title: "2-Way Calendar & CRM Sync", desc: "Directly books Google Calendar, Outlook, Practo, Zoho, and custom REST API endpoints in real-time." },
  { title: "Contextual Human Handover", desc: "When sentiment escalates or edge-cases arise, transfers calls to human staff with complete live transcripts." },
  { title: "Multilingual Dialect Intelligence", desc: "Understands mixed language phrasings (Hinglish, Benglish, colloquial vernaculars) without misinterpreting intent." },
];

export default function ProductPlatformPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section className="pp-hero-pad" style={{ position: "relative" }}>
          <div className="pp-container">
            <div className="pp-eyebrow">
              <span className="pp-eyebrow-dot" />
              THE CORE ARCHITECTURE
              <span className="pp-eyebrow-rule" />
            </div>
            <h1 className="pp-headline">
              One intelligence layer across <span style={{ color: "var(--green)" }}>Voice, WhatsApp and Web.</span>
            </h1>
            <p className="pp-desc">
              Upload your operating guidelines once. Namuste turns fragmented customer enquiries into structured, verified business actions in sub-second response times.
            </p>
            <div className="pp-hero-actions">
              <Link href="/contact" className="pp-btn-primary">
                Explore Platform Demo <ArrowRight size={15} />
              </Link>
              <Link href="/how-it-works" className="pp-btn-secondary">
                See How It Works <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="pp-hero-line">
            Engineered for <span style={{ color: "var(--green)", fontWeight: 700 }}>clarity, speed and human trust.</span>
          </div>
        </section>

        {/* CHANNELS BREAKDOWN */}
        <section className="pp-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="pp-container-wide">
            <div className="pp-section-head">
              <div className="pp-eyebrow">
                <span className="pp-eyebrow-dot" />
                NATIVE CHANNELS
              </div>
              <h2 className="pp-h2">
                Every channel speaking with <span style={{ color: "var(--green)" }}>one unified brain.</span>
              </h2>
            </div>

            <ChannelSwitcher />
          </div>
        </section>

        {/* PLATFORM MODULES */}
        <section className="pp-section-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div className="pp-container-wide">
            <div className="pp-section-head" style={{ textAlign: "left", margin: "0 0 48px" }}>
              <div className="pp-eyebrow">
                <span className="pp-eyebrow-dot" />
                SYSTEM CAPABILITIES
              </div>
              <h2 className="pp-h2" style={{ margin: 0 }}>
                Built to orchestrate <span style={{ color: "var(--green)" }}>complex real-world logic.</span>
              </h2>
            </div>

            <div className="pp-modules-grid">
              {MODULES.map((m, i) => (
                <Card key={i} className="pp-module-card">
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="pp-module-title">{m.title}</h3>
                    <p className="pp-module-desc">{m.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .pp-hero-pad { padding: 150px 40px 60px; }
        .pp-container { max-width: 900px; margin: 0 auto; }
        .pp-container-wide { max-width: 1280px; margin: 0 auto; }

        .pp-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 18px;
        }
        .pp-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .pp-eyebrow-rule { width: 60px; height: 1px; background: var(--border2); }

        .pp-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4.4vw, 58px);
          line-height: 1.1; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 20px; max-width: 780px;
        }
        .pp-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17.5px); line-height: 1.65; max-width: 580px; margin: 0 0 32px; }

        .pp-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 60px; }
        .pp-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 28px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14px; font-weight: 700; text-decoration: none;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .pp-btn-primary:hover { transform: translateY(-2px); }
        .pp-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .pp-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        .pp-hero-line {
          text-align: center; padding-top: 32px; border-top: 1px solid var(--border);
          font-family: var(--font-sans); font-weight: 700; font-size: clamp(18px, 2.2vw, 28px);
          color: var(--text-ivory); max-width: 1280px; margin: 0 auto; padding-left: 16px; padding-right: 16px;
        }

        .pp-section-pad { padding: 90px 36px; }
        .pp-section-head { max-width: 680px; margin: 0 auto 48px; text-align: center; }
        .pp-h2 { font-size: clamp(28px, 3.8vw, 44px); color: var(--text-ivory); line-height: 1.2; font-weight: 700; letter-spacing: -0.015em; }

        .pp-modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .pp-module-title { font-size: 18px; font-weight: 700; color: var(--text-ivory); margin: 0; }
        .pp-module-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin: 0; }

        @media (max-width: 900px) {
          .pp-modules-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .pp-hero-pad { padding: 110px 20px 40px; }
          .pp-section-pad { padding: 60px 20px; }
          .pp-hero-actions { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}

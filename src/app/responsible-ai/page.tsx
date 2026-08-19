import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, UserCheck, CheckCircle2, ArrowRight, EyeOff, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Responsible AI, Safety Guardrails & Governance — Namuste",
  description:
    "Explore Namuste's responsible AI commitments: deterministic boundaries, zero medical/legal diagnosis, data minimisation, PII masking, and human escalation.",
};

export default function ResponsibleAIPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section
          style={{
            minHeight: "80vh",
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
            <div className="pill" style={{ marginBottom: "16px" }}>Safety & Governance</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "700px" }}>
              Responsible AI with <span className="serif-italic">deterministic safety guardrails.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "580px", marginBottom: "32px" }}>
              How we protect customer trust through strict domain grounding, privacy by design, and human escalation protocols.
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              AI that respects <span className="serif-italic">boundaries and human judgment.</span>
            </span>
          </div>
        </section>

        {/* PILLARS OF RESPONSIBLE AI */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="resp-grid">
              {[
                {
                  icon: <ShieldCheck size={24} />,
                  title: "1. Strict Domain Grounding & Zero Hallucination",
                  desc: "Namuste only provides information explicitly present in your verified operational handbook. If a caller asks something out of scope, the AI acknowledges its boundary and offers a callback.",
                },
                {
                  icon: <AlertTriangle size={24} />,
                  title: "2. Explicit Clinical & Professional Boundaries",
                  desc: "In healthcare, Namuste strictly handles scheduling, clinic policies, and administrative FAQs. It explicitly refuses to diagnose, prescribe, or interpret clinical tests. In professional services, it never gives legal or financial advice.",
                },
                {
                  icon: <EyeOff size={24} />,
                  title: "3. PII & Data Minimisation",
                  desc: "All conversation transcripts are sanitized to redact sensitive personal identifiers (Aadhaar, credit cards, confidential health notes). Data is encrypted at rest and in transit with TLS 1.3.",
                },
                {
                  icon: <UserCheck size={24} />,
                  title: "4. Transparent AI Disclosure & Human Escalation",
                  desc: "The assistant clearly identifies itself as an automated AI assistant. At any point during a conversation, callers can request human transfer, immediately bridging to your designated staff with full context.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: "36px",
                    borderRadius: "18px",
                    background: "rgba(16, 18, 16, 0.8)",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "rgba(118, 192, 67, 0.12)",
                      color: "var(--green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "12px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@media (max-width: 860px) { .resp-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

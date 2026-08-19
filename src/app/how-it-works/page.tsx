import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Sparkles, Layers, BookOpen, Sliders, Network, Play, Rocket, LineChart } from "lucide-react";

export const metadata: Metadata = {
  title: "How Namuste Works — 7-Step Deployment Blueprint",
  description:
    "From workflow selection and knowledge ingestion to channel connection, live testing, and continuous learning — explore the end-to-end Namuste implementation roadmap.",
};

const steps = [
  {
    num: "01",
    title: "Choose a Purpose-Built Workflow",
    icon: <Layers size={22} />,
    desc: "Select from pre-configured playbooks for Doctors & Clinics, Legal/Accounting Intake, Distribution Helplines, Admissions, or custom enterprise flows.",
  },
  {
    num: "02",
    title: "Ingest Verified Business Knowledge",
    icon: <BookOpen size={22} />,
    desc: "Upload price lists, practitioner timetables, clinic FAQs, service scopes, and operational handbooks. Namuste indexes approved facts with zero hallucination.",
  },
  {
    num: "03",
    title: "Configure Actions & Escalation Rules",
    icon: <Sliders size={22} />,
    desc: "Define calendar booking links, CRM webhook endpoints, qualification criteria, and human transfer conditions for high-priority conversations.",
  },
  {
    num: "04",
    title: "Connect Native Channels",
    icon: <Network size={22} />,
    desc: "Activate telephony PBX forwarding for Voice AI, connect official WhatsApp Business Cloud API numbers, and embed the 10KB web concierge script.",
  },
  {
    num: "05",
    title: "Test with Live Multilingual Audio",
    icon: <Play size={22} />,
    desc: "Run simulated patient, customer, or dealer calls in our sandbox environment to calibrate cadence, accents, and boundary checks before going live.",
  },
  {
    num: "06",
    title: "Launch with Human-in-the-Loop",
    icon: <Rocket size={22} />,
    desc: "Deploy live. Your human team receives real-time screen notifications, contextual handover transcripts, and instant outcome confirmations.",
  },
  {
    num: "07",
    title: "Continuous Outcome Learning",
    icon: <LineChart size={22} />,
    desc: "Namuste analyzes unanswered nuances and conversational drop-offs, surfacing actionable knowledge base refinements for your administrators.",
  },
];

export default function HowItWorksPage() {
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
            <div className="pill" style={{ marginBottom: "16px" }}>Deployment Architecture</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "680px" }}>
              The 7-step roadmap from knowledge to <span className="serif-italic">autonomous outcomes.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "32px" }}>
              Deploy in under 48 hours. No complex coding or machine learning expertise required.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Start Your Deployment <ArrowRight size={15} />
              </Link>
              <Link href="/industries/doctors-and-clinics" className="btn-secondary">
                View Clinic Demo <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "80px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Simple setup. <span className="serif-italic">Enterprise grade execution.</span>
            </span>
          </div>
        </section>

        {/* TIMELINE LIST */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="glass-card"
                  style={{
                    padding: "32px 36px",
                    borderRadius: "18px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "28px",
                    background: "rgba(16, 16, 16, 0.8)",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: "rgba(118, 192, 67, 0.12)",
                      border: "1px solid rgba(118, 192, 67, 0.25)",
                      color: "var(--green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="serif" style={{ fontSize: "22px", color: "var(--text-ivory)", marginBottom: "8px" }}>
                      {step.title}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "14.5px", lineHeight: 1.7 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

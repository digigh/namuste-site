import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Layers, BookOpen, Sliders, Network, Play, Rocket, LineChart } from "lucide-react";

export const metadata: Metadata = {
  title: "How Namuste Works — 7-Step Deployment Blueprint",
  description:
    "From workflow selection and knowledge ingestion to channel connection, live testing, and continuous learning — explore the end-to-end Namuste implementation roadmap.",
};

const STEPS = [
  {
    num: "01",
    title: "Choose a Purpose-Built Workflow",
    icon: <Layers size={20} />,
    desc: "Select from pre-configured playbooks for Doctors & Clinics, Legal/Accounting Intake, Distribution Helplines, Admissions, or custom enterprise flows.",
  },
  {
    num: "02",
    title: "Ingest Verified Business Knowledge",
    icon: <BookOpen size={20} />,
    desc: "Upload price lists, practitioner timetables, clinic FAQs, service scopes, and operational handbooks. Namuste indexes approved facts with zero hallucination.",
  },
  {
    num: "03",
    title: "Configure Actions & Escalation Rules",
    icon: <Sliders size={20} />,
    desc: "Define calendar booking links, CRM webhook endpoints, qualification criteria, and human transfer conditions for high-priority conversations.",
  },
  {
    num: "04",
    title: "Connect Native Channels",
    icon: <Network size={20} />,
    desc: "Activate telephony PBX forwarding for Voice AI, connect official WhatsApp Business Cloud API numbers, and embed the 10KB web concierge script.",
  },
  {
    num: "05",
    title: "Test with Live Multilingual Audio",
    icon: <Play size={20} />,
    desc: "Run simulated patient, customer, or dealer calls in our sandbox environment to calibrate cadence, accents, and boundary checks before going live.",
  },
  {
    num: "06",
    title: "Launch with Human-in-the-Loop",
    icon: <Rocket size={20} />,
    desc: "Deploy live. Your human team receives real-time screen notifications, contextual handover transcripts, and instant outcome confirmations.",
  },
  {
    num: "07",
    title: "Continuous Outcome Learning",
    icon: <LineChart size={20} />,
    desc: "Namuste analyzes unanswered nuances and conversational drop-offs, surfacing actionable knowledge base refinements for your administrators.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section className="hiw-hero-pad">
          <div className="hiw-container">
            <div className="hiw-eyebrow">
              <span className="hiw-eyebrow-dot" />
              DEPLOYMENT ARCHITECTURE
              <span className="hiw-eyebrow-rule" />
            </div>
            <h1 className="hiw-headline">
              The 7-step roadmap from knowledge to <span style={{ color: "var(--green)" }}>autonomous outcomes.</span>
            </h1>
            <p className="hiw-desc">
              Deploy in under 48 hours. No complex coding or machine learning expertise required.
            </p>
            <div className="hiw-actions">
              <Link href="/contact" className="hiw-btn-primary">
                Start Your Deployment <ArrowRight size={15} />
              </Link>
              <Link href="/industries/doctors-and-clinics" className="hiw-btn-secondary">
                View Clinic Demo <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="hiw-hero-line">
            Simple setup. <span style={{ color: "var(--green)", fontWeight: 700 }}>Enterprise grade execution.</span>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="hiw-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="hiw-timeline-wrap">
            <div className="hiw-timeline-line" />
            <div className="hiw-timeline-list">
              {STEPS.map((step) => (
                <div key={step.num} className="hiw-step-row">
                  <div className="hiw-step-node">{step.num}</div>
                  <Card className="hiw-step-card">
                    <CardContent className="flex items-start gap-4">
                      <span className="hiw-step-icon">{step.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <h3 className="hiw-step-title">{step.title}</h3>
                        <p className="hiw-step-desc">{step.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .hiw-hero-pad { min-height: 78vh; padding: 150px 36px 60px; display: flex; flex-direction: column; justify-content: space-between; }
        .hiw-container { max-width: 900px; margin: 0 auto; width: 100%; }

        .hiw-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 18px;
        }
        .hiw-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .hiw-eyebrow-rule { width: 60px; height: 1px; background: var(--border2); }

        .hiw-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4vw, 52px);
          line-height: 1.12; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 20px; max-width: 720px;
        }
        .hiw-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17px); line-height: 1.65; max-width: 560px; margin: 0 0 32px; }

        .hiw-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .hiw-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14px; font-weight: 700; text-decoration: none;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .hiw-btn-primary:hover { transform: translateY(-2px); }
        .hiw-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 24px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .hiw-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        .hiw-hero-line {
          text-align: center; margin-top: 60px; border-top: 1px solid var(--border); padding-top: 32px;
          font-family: var(--font-sans); font-weight: 700; font-size: clamp(19px, 2.4vw, 30px); color: var(--text-ivory);
        }

        .hiw-section-pad { padding: 90px 36px; }
        .hiw-timeline-wrap { position: relative; max-width: 820px; margin: 0 auto; }
        .hiw-timeline-line { position: absolute; top: 28px; bottom: 60px; left: 27px; width: 2px; background: var(--border2); }
        .hiw-timeline-list { display: flex; flex-direction: column; gap: 20px; }
        .hiw-step-row { display: grid; grid-template-columns: 56px 1fr; gap: 20px; align-items: flex-start; position: relative; }
        .hiw-step-node {
          position: relative; z-index: 1;
          width: 56px; height: 56px; border-radius: 16px;
          background: var(--green-glow); border: 1px solid var(--border-green); color: var(--green);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 17px; flex-shrink: 0;
        }
        .hiw-step-icon {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--surface2); color: var(--green);
        }
        .hiw-step-title { font-size: 20px; font-weight: 700; color: var(--text-ivory); margin: 0 0 6px; }
        .hiw-step-desc { font-size: 14px; color: var(--text-muted); line-height: 1.65; margin: 0; }

        @media (max-width: 768px) {
          .hiw-hero-pad { padding: 110px 20px 40px; }
          .hiw-section-pad { padding: 60px 20px; }
          .hiw-actions { flex-direction: column; align-items: stretch; }
          .hiw-step-row { grid-template-columns: 44px 1fr; gap: 14px; }
          .hiw-step-node { width: 44px; height: 44px; font-size: 14px; border-radius: 12px; }
          .hiw-timeline-line { left: 21px; }
        }
      `}</style>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PhoneForwarded,
  UserCheck,
  Headphones,
  BarChart2,
  LifeBuoy,
  Repeat,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Universal AI Assistant Use Cases — Namuste",
  description:
    "Explore universal conversational workflows: AI Receptionist, Lead Qualification, 24/7 Support, Survey Agent, Helplines, and Automated Follow-up.",
};

const USE_CASES = [
  {
    id: "receptionist",
    icon: <PhoneForwarded size={20} />,
    title: "AI Receptionist",
    subtitle: "Front-desk answering & schedule coordination",
    desc: "Answers routine enquiries, checks live clinician/partner availability, captures caller details, and schedules appointments with zero hold times.",
    example: "Patient calls clinic → AI answers in 1 ring → Confirms dermatologist slot → WhatsApp calendar invite dispatched.",
    tag: "Most Popular",
  },
  {
    id: "qualification",
    icon: <UserCheck size={20} />,
    title: "Lead Qualification Agent",
    subtitle: "Screen high-intent prospects before human calls",
    desc: "Asks business-defined qualifying questions (budget, scale, location, urgency), filters out spam, and prioritizes top leads for sales reps.",
    example: "Prospective corporate client → Qualifies turnover and jurisdiction → Schedules partner consultation call.",
    tag: "High ROI",
  },
  {
    id: "support",
    icon: <Headphones size={20} />,
    title: "24/7 Customer Support",
    subtitle: "First-contact resolution for common queries",
    desc: "Resolves billing questions, order statuses, warranty inquiries, and account updates while escalating complex disputes with full history.",
    example: "Retailer asks about order status → AI verifies invoice ID → Shares live driver location and estimated arrival.",
    tag: "Omnichannel",
  },
  {
    id: "surveys",
    icon: <BarChart2 size={20} />,
    title: "Voice & Chat Survey Agent",
    subtitle: "Structured multilingual interview execution",
    desc: "Conducts multi-turn voice interviews across thousands of respondents simultaneously with dynamic branching and verified data capture.",
    example: "Outbound study call in Bengali → Completes 5-question satisfaction survey → Tabulates metrics in BI dashboard.",
    tag: "Multilingual",
  },
  {
    id: "helplines",
    icon: <LifeBuoy size={20} />,
    title: "Public & Enterprise Helplines",
    subtitle: "Consistent information dissemination at scale",
    desc: "Provides accessible, certified guidelines across regional languages for policy queries, campus admissions, and product guidelines.",
    example: "Farmer calls helpline → AI provides recommended sowing practices for current weather conditions.",
    tag: "High Capacity",
  },
  {
    id: "followup",
    icon: <Repeat size={20} />,
    title: "Follow-up & Nurturing Agent",
    subtitle: "Automated reminders, renewals & confirmations",
    desc: "Proactively reminds clients of upcoming appointments, pending document submissions, and subscription renewals via voice or WhatsApp.",
    example: "Pre-visit call 24h prior → Patient confirms attendance → Clinic front desk sees updated schedule.",
    tag: "Retention",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section className="uc-hero-pad">
          <div className="uc-container">
            <div className="uc-eyebrow">
              <span className="uc-eyebrow-dot" />
              UNIVERSAL CAPABILITIES
              <span className="uc-eyebrow-rule" />
            </div>
            <h1 className="uc-headline">
              Six proven conversational workflows. <span style={{ color: "var(--green)" }}>Endless industry applications.</span>
            </h1>
            <p className="uc-desc">
              Every use case transforms a high-volume communication failure point into a structured, measurable business outcome.
            </p>
            <div className="uc-actions">
              <Link href="/contact" className="uc-btn-primary">
                Configure a Custom Use Case <ArrowRight size={15} />
              </Link>
              <Link href="/industries/doctors-and-clinics" className="uc-btn-secondary">
                See Clinic Receptionist Demo <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="uc-hero-line">
            One conversation. <span style={{ color: "var(--green)", fontWeight: 700 }}>One structured next step.</span>
          </div>
        </section>

        {/* USE CASES GRID */}
        <section className="uc-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="uc-container-wide">
            <div className="uc-grid">
              {USE_CASES.map((uc) => (
                <Card key={uc.id} className="uc-card">
                  <CardContent className="flex flex-col justify-between h-full gap-5">
                    <div>
                      <div className="uc-card-top">
                        <span className="uc-card-icon">{uc.icon}</span>
                        <Badge variant="secondary" className="uc-tag">{uc.tag}</Badge>
                      </div>
                      <h3 className="uc-card-title">{uc.title}</h3>
                      <div className="uc-card-subtitle">{uc.subtitle}</div>
                      <p className="uc-card-desc">{uc.desc}</p>
                    </div>

                    <div className="uc-example-box">
                      <div className="uc-example-label">Example Flow</div>
                      <div className="uc-example-text">{uc.example}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .uc-hero-pad { min-height: 78vh; padding: 150px 36px 60px; display: flex; flex-direction: column; justify-content: space-between; }
        .uc-container { max-width: 900px; margin: 0 auto; width: 100%; }
        .uc-container-wide { max-width: 1280px; margin: 0 auto; }

        .uc-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 18px;
        }
        .uc-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .uc-eyebrow-rule { width: 60px; height: 1px; background: var(--border2); }

        .uc-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4vw, 52px);
          line-height: 1.12; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 20px; max-width: 780px;
        }
        .uc-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17px); line-height: 1.65; max-width: 560px; margin: 0 0 32px; }

        .uc-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .uc-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14px; font-weight: 700; text-decoration: none;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .uc-btn-primary:hover { transform: translateY(-2px); }
        .uc-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 24px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .uc-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        .uc-hero-line {
          text-align: center; margin-top: 60px; border-top: 1px solid var(--border); padding-top: 32px;
          font-family: var(--font-sans); font-weight: 700; font-size: clamp(19px, 2.4vw, 30px); color: var(--text-ivory);
        }

        .uc-section-pad { padding: 90px 36px; }
        .uc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .uc-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .uc-card-icon {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .uc-tag { background: var(--overlay-1) !important; color: var(--text-muted) !important; border: 1px solid var(--border) !important; font-size: 10px !important; }
        .uc-card-title { font-size: 20px; font-weight: 700; color: var(--text-ivory); margin: 0 0 4px; }
        .uc-card-subtitle { font-size: 12px; color: var(--green); font-weight: 600; margin-bottom: 14px; }
        .uc-card-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin: 0; }

        .uc-example-box { background: var(--overlay-1); border: 1px solid var(--border); border-radius: 12px; padding: 14px; }
        .uc-example-label { font-size: 10.5px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .uc-example-text { font-size: 12.5px; color: var(--text-muted); line-height: 1.5; }

        @media (max-width: 960px) {
          .uc-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .uc-hero-pad { padding: 110px 20px 40px; }
          .uc-section-pad { padding: 60px 20px; }
          .uc-actions { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}

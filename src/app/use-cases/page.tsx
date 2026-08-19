import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PhoneForwarded,
  UserCheck,
  Headphones,
  BarChart2,
  LifeBuoy,
  Repeat,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Universal AI Assistant Use Cases — Namuste",
  description:
    "Explore universal conversational workflows: AI Receptionist, Lead Qualification, 24/7 Support, Survey Agent, Helplines, and Automated Follow-up.",
};

const useCases = [
  {
    id: "receptionist",
    icon: <PhoneForwarded size={22} />,
    title: "AI Receptionist",
    subtitle: "Front-desk answering & schedule coordination",
    desc: "Answers routine enquiries, checks live clinician/partner availability, captures caller details, and schedules appointments with zero hold times.",
    example: "Patient calls clinic → AI answers in 1 ring → Confirms dermatologist slot → WhatsApp calendar invite dispatched.",
    tag: "Most Popular",
  },
  {
    id: "qualification",
    icon: <UserCheck size={22} />,
    title: "Lead Qualification Agent",
    subtitle: "Screen high-intent prospects before human calls",
    desc: "Asks business-defined qualifying questions (budget, scale, location, urgency), filters out spam, and prioritizes top leads for sales reps.",
    example: "Prospective corporate client → Qualifies turnover and jurisdiction → Schedules partner consultation call.",
    tag: "High ROI",
  },
  {
    id: "support",
    icon: <Headphones size={22} />,
    title: "24/7 Customer Support",
    subtitle: "First-contact resolution for common queries",
    desc: "Resolves billing questions, order statuses, warranty inquiries, and account updates while escalating complex disputes with full history.",
    example: "Retailer asks about order status → AI verifies invoice ID → Shares live driver location and estimated arrival.",
    tag: "Omnichannel",
  },
  {
    id: "surveys",
    icon: <BarChart2 size={22} />,
    title: "Voice & Chat Survey Agent",
    subtitle: "Structured multilingual interview execution",
    desc: "Conducts multi-turn voice interviews across thousands of respondents simultaneously with dynamic branching and verified data capture.",
    example: "Outbound study call in Bengali → Completes 5-question satisfaction survey → Tabulates metrics in BI dashboard.",
    tag: "Multilingual",
  },
  {
    id: "helplines",
    icon: <LifeBuoy size={22} />,
    title: "Public & Enterprise Helplines",
    subtitle: "Consistent information dissemination at scale",
    desc: "Provides accessible, certified guidelines across regional languages for policy queries, campus admissions, and product guidelines.",
    example: "Farmer calls helpline → AI provides recommended sowing practices for current weather conditions.",
    tag: "High Capacity",
  },
  {
    id: "followup",
    icon: <Repeat size={22} />,
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
            <div className="pill" style={{ marginBottom: "16px" }}>Universal Capabilities</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "20px", maxWidth: "680px" }}>
              Six proven conversational workflows. <span className="serif-italic">Endless industry applications.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "560px", marginBottom: "32px" }}>
              Every use case transforms a high-volume communication failure point into a structured, measurable business outcome.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Configure a Custom Use Case <ArrowRight size={15} />
              </Link>
              <Link href="/industries/doctors-and-clinics" className="btn-secondary">
                See Clinic Receptionist Demo <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "80px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              One conversation. <span className="serif-italic">One structured next step.</span>
            </span>
          </div>
        </section>

        {/* USE CASES GRID */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }} className="use-cases-grid">
              {useCases.map((uc) => (
                <div
                  key={uc.id}
                  className="glass-card"
                  style={{
                    padding: "36px",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "rgba(16, 16, 16, 0.75)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: "rgba(118, 192, 67, 0.12)",
                          color: "var(--green)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {uc.icon}
                      </div>
                      <span className="pill" style={{ fontSize: "10px" }}>{uc.tag}</span>
                    </div>

                    <h3 className="serif" style={{ fontSize: "22px", color: "var(--text-ivory)", marginBottom: "4px" }}>
                      {uc.title}
                    </h3>
                    <div style={{ fontSize: "12.5px", color: "var(--green-luminous)", fontWeight: 500, marginBottom: "14px" }}>
                      {uc.subtitle}
                    </div>
                    <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "20px" }}>
                      {uc.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "14px",
                    }}
                  >
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Example Flow
                    </div>
                    <div style={{ fontSize: "12.5px", color: "var(--text-body)", lineHeight: 1.5 }}>
                      {uc.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@media (max-width: 960px) { .use-cases-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

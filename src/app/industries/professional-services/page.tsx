import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntakeAssistantDemo from "@/components/IntakeAssistantDemo";
import {
  Scale,
  FileText,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Calendar,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Client Intake for Lawyers, Accountants & Consultants — Namuste",
  description:
    "Namuste qualifies high-intent prospective client enquiries, verifies jurisdiction/scope, checks conflicts, and schedules initial partner consultations automatically.",
};

export default function ProfessionalServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* =========================================================================
            HERO SECTION (Exact Match with Image 3 Mockup)
            ========================================================================= */}
        <section
          style={{
            minHeight: "90vh",
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
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)", marginBottom: "24px" }}>
              <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Industries</Link>
              <span>/</span>
              <span style={{ color: "var(--green)" }}>Professional Services</span>
            </div>

            {/* Top Grid: Problem statement vs Image 3 Thread Conversation Nodes */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "48px",
                alignItems: "center",
                marginBottom: "40px",
              }}
              className="hero-grid"
            >
              {/* Left Column */}
              <div>
                <h1
                  className="serif"
                  style={{
                    fontSize: "clamp(30px, 3.4vw, 46px)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: "-0.018em",
                    color: "var(--text-ivory)",
                    marginBottom: "20px",
                    maxWidth: "520px",
                  }}
                >
                  New enquiries arrive. Your expertise should not have to <span className="serif-italic">wait.</span>
                </h1>

                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "clamp(15px, 1.3vw, 17px)",
                    lineHeight: 1.65,
                    maxWidth: "480px",
                    marginBottom: "32px",
                  }}
                >
                  Namuste answers, qualifies and organises incoming client conversations before they reach your team.
                </p>

                {/* Profession Pills matching Mockup */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "36px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(118, 192, 67, 0.12)",
                      border: "1px solid var(--green)",
                      borderRadius: "10px",
                      padding: "10px 18px",
                      color: "var(--green-luminous)",
                      fontSize: "13.5px",
                      fontWeight: 600,
                    }}
                  >
                    <Scale size={16} /> Lawyers
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "10px 18px",
                      color: "var(--text-body)",
                      fontSize: "13.5px",
                      fontWeight: 500,
                    }}
                  >
                    <FileText size={16} /> Accountants
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "10px 18px",
                      color: "var(--text-body)",
                      fontSize: "13.5px",
                      fontWeight: 500,
                    }}
                  >
                    <Briefcase size={16} /> Consultants
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <a href="#intake-demo" className="btn-primary">
                    Experience the Client Intake Assistant <ArrowRight size={15} />
                  </a>
                  <Link href="/contact" className="btn-secondary">
                    Book a Demo <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right: Connected Conversation Trail Matching Image 3 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "420px", width: "100%", margin: "0 auto" }}>
                {/* Node 1: Client Inbound */}
                <div
                  className="glass-card"
                  style={{
                    padding: "16px 20px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    background: "rgba(20, 20, 20, 0.8)",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-ivory)",
                      flexShrink: 0,
                    }}
                  >
                    <UserCheck size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                      Prospective Client:
                    </div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.4 }}>
                      I need help with a property dispute.
                    </div>
                  </div>
                </div>

                {/* Connector Line 1 */}
                <div style={{ width: "2px", height: "24px", background: "var(--green)", margin: "0 auto", opacity: 0.6 }} />

                {/* Node 2: Namuste */}
                <div
                  className="glass-card"
                  style={{
                    padding: "16px 20px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    background: "rgba(16, 24, 16, 0.85)",
                    border: "1px solid var(--border-green)",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "rgba(118, 192, 67, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--green)",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase" }}>
                      Namuste Intake:
                    </div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.4 }}>
                      Which city is the property located in?
                    </div>
                  </div>
                </div>

                {/* Connector Line 2 */}
                <div style={{ width: "2px", height: "24px", background: "var(--green)", margin: "0 auto", opacity: 0.6 }} />

                {/* Node 3: Outcome Check */}
                <div
                  className="glass-card"
                  style={{
                    padding: "14px 20px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: "rgba(10, 18, 10, 0.95)",
                    border: "1px solid var(--green)",
                    boxShadow: "0 0 25px rgba(118, 192, 67, 0.2)",
                  }}
                >
                  <CheckCircle2 size={18} style={{ color: "var(--green-luminous)" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--green-luminous)" }}>
                    Consultation qualified
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom 3-step timeline */}
            <div style={{ display: "flex", justifyContent: "center", gap: "36px", flexWrap: "wrap", fontSize: "13px", color: "var(--text-muted)", marginTop: "24px" }}>
              <span>Capture requirements</span>
              <span style={{ color: "var(--green)" }}>→</span>
              <span>Qualify enquiries</span>
              <span style={{ color: "var(--green)" }}>→</span>
              <span>Schedule consultations</span>
            </div>
          </div>

          {/* Editorial Transition */}
          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Less administrative back-and-forth. <span className="serif-italic">More valuable conversations.</span>
            </span>
          </div>
        </section>

        {/* =========================================================================
            INTERACTIVE INTAKE ASSISTANT DEMO
            ========================================================================= */}
        <section id="intake-demo" style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}>
              <div className="pill" style={{ marginBottom: "16px" }}>Interactive Practice Simulator</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "16px" }}>
                Test the <span className="serif-italic">Intake Assistant</span> for your practice.
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.7 }}>
                See how Namuste asks domain questions, verifies client jurisdiction, and auto-dispatches checklist requirements for Law Firms, Accountants, and Consultants.
              </p>
            </div>

            <IntakeAssistantDemo />
          </div>
        </section>

        {/* =========================================================================
            KEY PROFESSIONAL MODULES
            ========================================================================= */}
        <section style={{ padding: "100px 36px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ maxWidth: "600px", marginBottom: "56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>Intake Capabilities</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 42px)", color: "var(--text-ivory)", lineHeight: 1.2 }}>
                Screen prospects, eliminate friction, <span className="serif-italic">protect billable time.</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
              className="intake-cards-grid"
            >
              {[
                {
                  icon: <Scale size={22} />,
                  title: "Conflict of Interest Screening",
                  desc: "Asks preliminary opposing party names to flag direct conflicts before any sensitive matter details are disclosed.",
                },
                {
                  icon: <FileText size={22} />,
                  title: "Automated Document Checklists",
                  desc: "Dispatches required filing documents, deeds, or audited reports via WhatsApp so clients arrive prepared for their first call.",
                },
                {
                  icon: <Calendar size={22} />,
                  title: "Partner Consultation Booking",
                  desc: "Matches the prospective client with the right subject matter partner and schedules discovery calls based on real-time availability.",
                },
              ].map((c, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: "32px",
                    borderRadius: "18px",
                    background: "rgba(18, 18, 18, 0.7)",
                  }}
                >
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
                      marginBottom: "20px",
                    }}
                  >
                    {c.icon}
                  </div>
                  <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "10px" }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.65 }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONVERSION SECTION
            ========================================================================= */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 48px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "18px" }}>
              Elevate your firm&apos;s <span className="serif-italic">client intake experience.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "15.5px", lineHeight: 1.7, marginBottom: "32px" }}>
              Configure custom qualification criteria for your practice in days with dedicated onboarding support.
            </p>
            <Link href="/contact" className="btn-primary" style={{ padding: "14px 32px", fontSize: "15px" }}>
              Schedule Practice Consultation <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .intake-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

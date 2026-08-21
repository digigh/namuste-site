import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClinicAssistantDemo from "@/components/ClinicAssistantDemo";
import {
  PhoneCall,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Stethoscope,
  HeartPulse,
  Sparkles,
  MessageSquare,
  Building2,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Receptionist & Appointment Assistant for Doctors & Clinics — Namuste",
  description:
    "Namuste answers patient calls 24/7, coordinates doctor appointments, handles clinic FAQs, and automates pre-visit instructions so your front-desk can focus on in-person care.",
};

export default function DoctorsAndClinicsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* =========================================================================
            HERO SECTION (Exact Match with Image 2 Mockup)
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
              <span style={{ color: "var(--green)" }}>Doctors & Clinics</span>
            </div>

            {/* Top Grid: Problem statement vs Image 2 Thread Conversation Nodes */}
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
              {/* Left: Emotional Problem Statement */}
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
                  Patients are calling. Your front desk is already <span className="serif-italic">busy.</span>
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
                  Namuste answers routine patient enquiries, captures appointment requests and follows up—while your team focuses on care.
                </p>

                {/* Capability Bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "36px", fontSize: "13px", color: "var(--text-body)" }}>
                  <span>Answer enquiries</span>
                  <span style={{ color: "var(--green)" }}>•</span>
                  <span>Manage appointments</span>
                  <span style={{ color: "var(--green)" }}>•</span>
                  <span>Send reminders</span>
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <a href="#clinic-demo" className="btn-primary">
                    Experience the Clinic Assistant <ArrowRight size={15} />
                  </a>
                  <Link href="/contact" className="btn-secondary">
                    Book a Demo <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right: Connected Conversation Trail Matching Image 2 */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "420px", width: "100%", margin: "0 auto" }}>
                {/* Node 1: Patient Inbound */}
                <div
                  className="glass-card"
                  style={{
                    padding: "16px 20px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    background: "rgba(22, 16, 16, 0.8)",
                    border: "1px solid var(--border-coral)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(248, 113, 113, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--coral)",
                      flexShrink: 0,
                    }}
                  >
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--coral)", textTransform: "uppercase" }}>
                      Patient:
                    </div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.4 }}>
                      Is the dermatologist available tomorrow?
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
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(118, 192, 67, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--green)",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase" }}>
                      Namuste:
                    </div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.4 }}>
                      Would you prefer morning or evening?
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
                    Appointment requested
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Transition */}
          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              A <span className="serif-italic">calmer</span> front desk. A more <span className="serif-italic">responsive</span> clinic.
            </span>
          </div>
        </section>

        {/* =========================================================================
            LIVE CLINIC ASSISTANT DEMO SECTION
            ========================================================================= */}
        <section id="clinic-demo" style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}>
              <div className="pill" style={{ marginBottom: "16px" }}>Interactive Playground</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "16px" }}>
                Test the <span className="serif-italic">Clinic Assistant</span> in action.
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.7 }}>
                See how Namuste coordinates patient questions, verifies doctor timetables, and generates automated EMR calendar appointments across different medical specialties.
              </p>
            </div>

            <ClinicAssistantDemo />
          </div>
        </section>

        {/* =========================================================================
            CLINICAL WORKFLOW CAPABILITIES
            ========================================================================= */}
        <section style={{ padding: "100px 36px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ maxWidth: "600px", marginBottom: "56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>Front-Desk Superpowers</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 3.8vw, 42px)", color: "var(--text-ivory)", lineHeight: 1.2 }}>
                Everything your patient expects, <span className="serif-italic">instantly answered.</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
              className="clinic-cards-grid"
            >
              {[
                {
                  icon: <Calendar size={22} />,
                  title: "Doctor Schedule Coordination",
                  desc: "Connects with your clinic calendar to offer available morning and evening consultation slots without double-booking.",
                },
                {
                  icon: <Clock size={22} />,
                  title: "Pre-Visit Guidance & Prep",
                  desc: "Automatically tells patients fasting instructions for blood tests or imaging prep requirements before they arrive.",
                },
                {
                  icon: <MessageSquare size={22} />,
                  title: "WhatsApp Slot Confirmations",
                  desc: "Sends instant WhatsApp messages with appointment date, clinic directions, doctor details, and 1-tap reschedule buttons.",
                },
                {
                  icon: <HeartPulse size={22} />,
                  title: "Appointment Reminders & No-Show Reduction",
                  desc: "Gentle automated reminder calls/texts 24 hours prior reduce unattended slots by over 40%.",
                },
                {
                  icon: <Building2 size={22} />,
                  title: "Clinic FAQs & Directions",
                  desc: "Answers parking availability, accepted payment methods, consultation fees, and emergency helpline numbers.",
                },
                {
                  icon: <ShieldAlert size={22} />,
                  title: "Deterministic Emergency Handover",
                  desc: "Any mention of acute chest pain, trauma, or medical crisis immediately triggers emergency guidance and front-desk escalation.",
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
            SAFETY BOUNDARIES GUARANTEE
            ========================================================================= */}
        <section style={{ padding: "80px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div
              className="glass-card"
              style={{
                padding: "36px 44px",
                borderRadius: "20px",
                border: "1px solid rgba(118, 192, 67, 0.25)",
                background: "rgba(10, 18, 10, 0.8)",
                display: "flex",
                alignItems: "center",
                gap: "28px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "rgba(118, 192, 67, 0.15)",
                  color: "var(--green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShieldAlert size={26} />
              </div>
              <div style={{ flex: 1, minWidth: "260px" }}>
                <h4 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "6px" }}>
                  Strict Clinical Safety & Administrative Boundary
                </h4>
                <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.6 }}>
                  Namuste operates strictly as an administrative front-desk concierge. It coordinates schedules, answers clinic policies, and collects basic intake. It <strong style={{ color: "var(--text-ivory)" }}>never diagnoses diseases, interprets lab tests, or provides medical treatment advice</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONVERSION SECTION
            ========================================================================= */}
        <section style={{ padding: "100px 36px", background: "var(--bg)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 48px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "18px" }}>
              Give your clinic the <span className="serif-italic">calm front desk</span> it deserves.
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "15.5px", lineHeight: 1.7, marginBottom: "32px" }}>
              Set up Namuste for your clinic in under 48 hours with zero hardware required.
            </p>
            <Link href="/contact" className="btn-primary" style={{ padding: "14px 32px", fontSize: "15px" }}>
              Schedule Clinic Assistant Demo <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .clinic-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

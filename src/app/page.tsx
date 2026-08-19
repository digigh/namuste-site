import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LuminousThread from "@/components/LuminousThread";
import HeroConversation from "@/components/HeroConversation";
import ChannelSwitcher from "@/components/ChannelSwitcher";
import {
  PhoneCall,
  MessageSquare,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Scale,
  Package,
  Sprout,
  GraduationCap,
  BarChart3,
  Network,
  Users,
  BrainCircuit,
  Headphones,
  Check,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* =========================================================================
            1. HERO SECTION (Exact Match with Image 1 Design Mockup)
            70% Intentional Negative Space / 30% Active Content
            ========================================================================= */}
        <section
          style={{
            minHeight: "92vh",
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
            {/* Top Grid: Problem Statement & Signals vs Negative Space */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "48px",
                alignItems: "flex-start",
                marginBottom: "40px",
              }}
              className="hero-grid"
            >
              {/* Left Column: Emotional Problem Statement */}
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
                    maxWidth: "540px",
                  }}
                >
                  Your customers are calling. Is someone <span className="serif-italic">always</span> answering?
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
                  Missed calls, delayed replies and forgotten follow-ups cost businesses real opportunities.
                </p>

                {/* 3 Problem Signals (Coral Accent strictly for missed states) */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
                  <div
                    className="glass-card"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-coral)",
                      background: "var(--coral-bg)",
                    }}
                  >
                    <PhoneCall size={16} style={{ color: "var(--coral)" }} />
                    <span style={{ fontSize: "13.5px", color: "var(--text-ivory)", fontWeight: 500 }}>
                      3 missed calls
                    </span>
                  </div>

                  <div
                    className="glass-card"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-coral)",
                      background: "var(--coral-bg)",
                    }}
                  >
                    <MessageSquare size={16} style={{ color: "var(--coral)" }} />
                    <span style={{ fontSize: "13.5px", color: "var(--text-ivory)", fontWeight: 500 }}>
                      8 unread enquiries
                    </span>
                  </div>

                  <div
                    className="glass-card"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-coral)",
                      background: "var(--coral-bg)",
                    }}
                  >
                    <Clock size={16} style={{ color: "var(--coral)" }} />
                    <span style={{ fontSize: "13.5px", color: "var(--text-ivory)", fontWeight: 500 }}>
                      Follow-up overdue
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Audio Simulation Module */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <HeroConversation />
              </div>
            </div>

            {/* Luminous Green Thread Trajectory (Problem to Outcome) */}
            <div style={{ margin: "20px 0" }}>
              <LuminousThread height={160} outcomeText="Every conversation gets a next step." />
            </div>

            {/* Lower Hero: Product Reveal & Conversion CTAs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "600px",
              }}
            >
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(24px, 2.6vw, 34px)",
                  color: "var(--text-ivory)",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                }}
              >
                Meet Namuste.
              </h2>
              <p style={{ color: "var(--text-body)", fontSize: "15px", lineHeight: 1.6 }}>
                AI voice and chat assistants for every customer conversation.
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "8px" }}>
                <Link href="/contact" className="btn-primary">
                  Experience Namuste <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Book a Demo <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* Editorial Transition Text at Bottom of Section */}
          <div style={{ textAlign: "center", marginTop: "64px", borderTop: "1px solid var(--border)", paddingTop: "36px" }}>
            <span
              className="serif"
              style={{
                fontSize: "clamp(18px, 1.8vw, 24px)",
                color: "var(--text-muted)",
                fontStyle: "normal",
              }}
            >
              From hello to an <span className="serif-italic" style={{ color: "var(--green)" }}>outcome.</span>
            </span>
          </div>
        </section>

        {/* =========================================================================
            2. TRANSFORMATION FRAMEWORK
            Answer → Understand → Act → Follow Up → Learn
            ========================================================================= */}
        <section style={{ padding: "90px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>The Transformation Engine</div>
              <h2 className="serif" style={{ fontSize: "clamp(24px, 2.8vw, 36px)", color: "var(--text-ivory)", lineHeight: 1.25, marginBottom: "14px", letterSpacing: "-0.015em" }}>
                How unorganised conversations become <span className="serif-italic">clear business actions.</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.65 }}>
                Namuste handles routine customer queries with depth and precision, taking concrete actions and handing off to humans when empathy is paramount.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "18px",
              }}
              className="steps-grid"
            >
              {[
                {
                  num: "01",
                  title: "Answer",
                  desc: "Picks up within 1 ring across Voice, WhatsApp, or Web without placing anyone on hold.",
                },
                {
                  num: "02",
                  title: "Understand",
                  desc: "Grasps intent across accents, vernacular languages, and messy colloquial phrasing.",
                },
                {
                  num: "03",
                  title: "Qualify & Act",
                  desc: "Asks domain-specific questions, verifies calendars, and triggers backend actions in real time.",
                },
                {
                  num: "04",
                  title: "Follow Up",
                  desc: "Dispatches WhatsApp confirmations, document checklists, and calendar invites automatically.",
                },
                {
                  num: "05",
                  title: "Learn",
                  desc: "Surfaces unresolved questions to your team, continuously refining accuracy without manual retraining.",
                },
              ].map((step, idx) => (
                <div
                  key={step.num}
                  className="glass-card"
                  style={{
                    padding: "28px 22px",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "rgba(18, 18, 18, 0.7)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: "var(--green)",
                        opacity: 0.8,
                        marginBottom: "16px",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {step.num}
                    </div>
                    <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "10px" }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.65 }}>
                      {step.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      height: "2px",
                      width: "36px",
                      background: idx === 0 ? "var(--green)" : "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. OMNICHANNEL SUITE: VOICE, WHATSAPP, WEB
            ========================================================================= */}
        <section style={{ padding: "100px 36px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px" }}>
              <div className="pill" style={{ marginBottom: "14px" }}>Omnichannel Presence</div>
              <h2 className="serif" style={{ fontSize: "clamp(24px, 2.8vw, 36px)", color: "var(--text-ivory)", lineHeight: 1.25, marginBottom: "14px", letterSpacing: "-0.015em" }}>
                One intelligence layer. <span className="serif-italic">Three native channels.</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.65 }}>
                Deploy unified knowledge once. Namuste automatically adapts responses whether spoken naturally on a phone call or typed on WhatsApp.
              </p>
            </div>

            <ChannelSwitcher />
          </div>
        </section>

        {/* =========================================================================
            4. PRIORITY INDUSTRIES SHOWCASE (Doctors & Clinics Flagship First)
            ========================================================================= */}
        <section style={{ padding: "90px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
              <div>
                <div className="pill" style={{ marginBottom: "12px" }}>Industry Expertise</div>
                <h2 className="serif" style={{ fontSize: "clamp(24px, 2.8vw, 36px)", color: "var(--text-ivory)", lineHeight: 1.25, letterSpacing: "-0.015em" }}>
                  Specialised playbooks for <span className="serif-italic">high-friction sectors.</span>
                </h2>
              </div>
              <Link href="/industries/doctors-and-clinics" className="btn-secondary" style={{ fontSize: "13px" }}>
                Explore All Verticals <ArrowRight size={14} />
              </Link>
            </div>

            {/* Industry Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
              className="industry-grid"
            >
              {/* 1. Flagship: Doctors & Clinics */}
              <Link
                href="/industries/doctors-and-clinics"
                className="glass-card"
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid rgba(118, 192, 67, 0.3)",
                  background: "rgba(12, 18, 12, 0.85)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(118, 192, 67, 0.15)",
                        color: "var(--green-luminous)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Stethoscope size={22} />
                    </div>
                    <span className="pill" style={{ fontSize: "10.5px" }}>Priority 01</span>
                  </div>

                  <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                    Doctors & Clinics
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.65, marginBottom: "20px" }}>
                    Answers routine patient queries, coordinates appointments, explains clinic timings, and sends pre-visit prep instructions while the front desk focuses on care.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--green)", fontSize: "13.5px", fontWeight: 600 }}>
                  <span>Experience Clinic Assistant</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              {/* 2. Professional Services */}
              <Link
                href="/industries/professional-services"
                className="glass-card"
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "var(--text-ivory)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Scale size={22} />
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>Priority 02</span>
                  </div>

                  <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                    Professional Services
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.65, marginBottom: "20px" }}>
                    Qualifies high-intent client enquiries for law firms, accounting practices, and consultants. Screens conflicts and schedules consultations before human engagement.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-body)", fontSize: "13.5px", fontWeight: 600 }}>
                  <span>View Intake Assistant</span>
                  <ArrowRight size={14} />
                </div>
              </Link>

              {/* 3. Enterprise & Conglomerates */}
              <Link
                href="/enterprise"
                className="glass-card"
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "var(--text-ivory)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Network size={22} />
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>Enterprise</span>
                  </div>

                  <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                    Conglomerates & Groups
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.65, marginBottom: "20px" }}>
                    Central intelligence layer unifying multi-brand portfolios with isolated knowledge bases, RBAC governance, and consolidated group analytics.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-body)", fontSize: "13.5px", fontWeight: 600 }}>
                  <span>Explore Enterprise Layer</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. RESPONSIBLE AI & HUMAN COLLABORATION
            ========================================================================= */}
        <section style={{ padding: "90px 36px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <div
              className="glass-card responsible-grid"
              style={{
                padding: "40px",
                borderRadius: "20px",
                background: "rgba(10, 15, 10, 0.7)",
                border: "1px solid rgba(118, 192, 67, 0.2)",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div>
                <div className="pill" style={{ marginBottom: "12px" }}>
                  <ShieldCheck size={14} /> Responsible AI & Safety Guardrails
                </div>
                <h2 className="serif" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", color: "var(--text-ivory)", lineHeight: 1.25, marginBottom: "14px", letterSpacing: "-0.015em" }}>
                  AI with strictly defined boundaries and <span className="serif-italic">human oversight.</span>
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "14.5px", lineHeight: 1.65, marginBottom: "20px" }}>
                  Namuste operates exclusively on approved business knowledge. It never hallucinates answers, never provides medical or legal advice, and escalates to human team members with complete contextual history.
                </p>
                <Link href="/responsible-ai" className="btn-secondary" style={{ fontSize: "13px" }}>
                  Read Our Responsible AI Policy <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { title: "Strict Domain Knowledge", desc: "Answers are grounded strictly in your verified FAQs and operating guidelines." },
                  { title: "Deterministic Escalation", desc: "Complex or emotional enquiries transfer immediately to designated human staff." },
                  { title: "Zero Hallucination Guarantee", desc: "If an answer is outside the approved handbook, Namuste politely offers a callback." },
                  { title: "PII & Data Minimisation", desc: "Transcripts masked according to strict privacy regulations and SOC2 standards." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(118, 192, 67, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--green)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <Check size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-ivory)", marginBottom: "2px" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. FINAL CALL TO ACTION
            ========================================================================= */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="pill" style={{ marginBottom: "16px" }}>Ready to Experience Namuste?</div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.015em" }}>
              Turn every customer call into an <span className="serif-italic">organised outcome.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "15.5px", lineHeight: 1.65, marginBottom: "32px" }}>
              Schedule a 20-minute tailored consultation to hear Namuste speak with your custom business knowledge and test live multilingual calls.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary" style={{ padding: "12px 28px", fontSize: "14px" }}>
                Book a Live Consultation <ArrowRight size={15} />
              </Link>
              <Link href="/industries/doctors-and-clinics" className="btn-secondary" style={{ padding: "12px 24px", fontSize: "14px" }}>
                Test Clinic Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 960px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .industry-grid { grid-template-columns: 1fr !important; }
          .responsible-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClinicLiveAgent from "@/components/ClinicLiveAgent";
import { Card, CardContent } from "@/components/ui/card";
import {
  PhoneCall,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  HeartPulse,
  Headphones,
  MessageSquare,
  Building2,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";
import LeadTrialTriggerButton from "@/components/LeadTrialTriggerButton";

// Note: metadata is still exported — works in client components too
export const metadata: Metadata = {
  title: "AI Receptionist & Appointment Assistant for Doctors & Clinics — Namuste",
  description:
    "Namuste answers patient calls 24/7, coordinates doctor appointments, handles clinic FAQs, and automates pre-visit instructions so your front-desk can focus on in-person care.",
};

const CAPABILITIES = [
  { icon: <Calendar size={20} />, title: "Doctor Schedule Coordination", desc: "Connects with your clinic calendar to offer available morning and evening consultation slots without double-booking." },
  { icon: <Clock size={20} />, title: "Pre-Visit Guidance & Prep", desc: "Automatically tells patients fasting instructions for blood tests or imaging prep requirements before they arrive." },
  { icon: <MessageSquare size={20} />, title: "WhatsApp Slot Confirmations", desc: "Sends instant WhatsApp messages with appointment date, clinic directions, doctor details, and 1-tap reschedule buttons." },
  { icon: <HeartPulse size={20} />, title: "Appointment Reminders & No-Show Reduction", desc: "Gentle automated reminder calls/texts 24 hours prior reduce unattended slots by over 40%." },
  { icon: <Building2 size={20} />, title: "Clinic FAQs & Directions", desc: "Answers parking availability, accepted payment methods, consultation fees, and emergency helpline numbers." },
  { icon: <ShieldAlert size={20} />, title: "Deterministic Emergency Handover", desc: "Any mention of acute chest pain, trauma, or medical crisis immediately triggers emergency guidance and front-desk escalation." },
];

export default function DoctorsAndClinicsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section className="dc-hero-pad">
          <div className="dc-container-wide">
            <div className="dc-breadcrumb">
              <Link href="/">Industries</Link>
              <span>/</span>
              <span className="is-current">Doctors & Clinics</span>
            </div>

            <div className="dc-hero-grid">
              {/* Left: problem statement */}
              <div>
                <h1 className="dc-headline">
                  Patients are calling. Your front desk is already <span style={{ color: "var(--green)" }}>busy.</span>
                </h1>
                <p className="dc-desc">
                  Namuste answers routine patient enquiries, captures appointment requests and follows up—while your team focuses on care.
                </p>

                <div className="dc-capability-bar">
                  <span>Answer enquiries</span>
                  <span className="dc-dot">•</span>
                  <span>Manage appointments</span>
                  <span className="dc-dot">•</span>
                  <span>Send reminders</span>
                </div>

                <div className="dc-actions">
                  <a href="#clinic-demo" className="dc-btn-primary">
                    Experience the Clinic Assistant <ArrowRight size={15} />
                  </a>
                  <Link href="/contact" className="dc-btn-secondary">
                    Book a Demo <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right: conversation trail */}
              <div className="dc-trail">
                <div className="dc-node is-alert">
                  <span className="dc-node-icon is-alert"><PhoneCall size={18} /></span>
                  <div>
                    <div className="dc-node-label is-alert">Patient:</div>
                    <div className="dc-node-text">Is the dermatologist available tomorrow?</div>
                  </div>
                </div>

                <div className="dc-connector" />

                <div className="dc-node is-response">
                  <span className="dc-node-icon is-response"><Headphones size={18} /></span>
                  <div>
                    <div className="dc-node-label is-response">Namuste:</div>
                    <div className="dc-node-text">Would you prefer morning or evening?</div>
                  </div>
                </div>

                <div className="dc-connector" />

                <div className="dc-node is-outcome">
                  <CheckCircle2 size={18} style={{ color: "var(--green)" }} />
                  <span className="dc-outcome-text">Appointment requested</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dc-hero-line">
            A <span style={{ color: "var(--green)", fontWeight: 700 }}>calmer</span> front desk. A more <span style={{ color: "var(--green)", fontWeight: 700 }}>responsive</span> clinic.
          </div>
        </section>

        {/* DOCTORS & CLINIC SPECIAL LAUNCH OFFER (Theme-Adaptive & Animated) */}
        <section className="dc-trial-section">
          <div className="dc-container-wide">
            <div className="dc-trial-card">
              <div className="dc-trial-glow" />
              <div className="dc-trial-body">
                <div className="dc-trial-info">
                  <div className="dc-trial-badge-row">
                    <span className="dc-trial-badge">
                      <Stethoscope size={13} />
                      <span>CLINIC LAUNCH OFFER</span>
                    </span>
                    <span className="dc-trial-pill">7 DAYS FREE TRIAL</span>
                    <span className="dc-trial-badge-sub">100 FREE VOICE MINUTES</span>
                  </div>

                  <h3 className="dc-trial-heading">
                    Try the Doctors &amp; Clinic AI Platform Free for 7 Days
                  </h3>

                  <p className="dc-trial-subtext">
                    Let Namuste answer patient enquiries, schedule consultations on your doctor calendar, and confirm bookings over WhatsApp. Zero hardware, setup in 2 minutes, and no credit card required.
                  </p>

                  <div className="dc-trial-perks-row">
                    <span className="dc-trial-perk"><CheckCircle2 size={14} /> 100 Free Voice Minutes</span>
                    <span className="dc-trial-perk"><CheckCircle2 size={14} /> OPD Calendar Integration</span>
                    <span className="dc-trial-perk"><CheckCircle2 size={14} /> WhatsApp Slot Confirmation</span>
                    <span className="dc-trial-perk"><CheckCircle2 size={14} /> No Credit Card Required</span>
                  </div>
                </div>

                <div className="dc-trial-cta-col">
                  <LeadTrialTriggerButton
                    className="dc-trial-cta-btn"
                  >
                    <span className="dc-trial-btn-shine" />
                    <span>Start 7-Day Free Trial</span>
                    <ArrowUpRight size={15} />
                  </LeadTrialTriggerButton>
                  <Link href="/pricing" className="dc-trial-pricing-link">
                    View Solo, Pro &amp; Clinic Plans <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PURPOSE-BUILT PHOTO BANNER */}
        <section className="dc-section-pad" style={{ paddingBottom: 0, background: "var(--bg)" }}>
          <div className="dc-container-wide">
            <div className="dc-section-head" style={{ textAlign: "left", margin: "0 0 32px" }}>
              <div className="dc-eyebrow">
                <span className="dc-eyebrow-dot" />
                WHERE WE START
              </div>
              <h2 className="dc-h2" style={{ margin: 0 }}>
                Purpose-built for <span style={{ color: "var(--green)" }}>Doctors & Clinics.</span>
              </h2>
            </div>
            <div className="clinic-photo-banner">
              <img src="/hero-assets/doctor-card.jpg" alt="Doctors & Clinics" />
              <div className="clinic-photo-scrim" />
              <div className="clinic-photo-label">Doctors & Clinics</div>
            </div>
          </div>
        </section>

        {/* LIVE CLINIC ASSISTANT DEMO */}
        <section id="clinic-demo" className="dc-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="dc-container">
            <div className="dc-section-head">
              <div className="dc-eyebrow" style={{ justifyContent: "center" }}>
                <span className="dc-eyebrow-dot" />
                INTERACTIVE PLAYGROUND
              </div>
              <h2 className="dc-h2">
                Test the <span style={{ color: "var(--green)" }}>Clinic Assistant</span> in action.
              </h2>
              <p className="dc-section-desc">
                See how Namuste coordinates patient questions, verifies doctor timetables, and generates automated EMR calendar appointments across different medical specialties.
              </p>
            </div>

            <ClinicLiveAgent />
          </div>
        </section>

        {/* CLINICAL WORKFLOW CAPABILITIES */}
        <section className="dc-section-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <div className="dc-container-wide">
            <div className="dc-section-head" style={{ textAlign: "left", margin: "0 0 48px" }}>
              <div className="dc-eyebrow">
                <span className="dc-eyebrow-dot" />
                FRONT-DESK SUPERPOWERS
              </div>
              <h2 className="dc-h2" style={{ margin: 0 }}>
                Everything your patient expects, <span style={{ color: "var(--green)" }}>instantly answered.</span>
              </h2>
            </div>

            <div className="dc-cards-grid">
              {CAPABILITIES.map((c, idx) => (
                <Card key={idx} className="dc-cap-card">
                  <CardContent className="flex flex-col gap-3">
                    <span className="dc-cap-icon">{c.icon}</span>
                    <h3 className="dc-cap-title">{c.title}</h3>
                    <p className="dc-cap-desc">{c.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SAFETY BOUNDARIES GUARANTEE */}
        <section className="dc-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="dc-container">
            <Card className="dc-safety-card">
              <CardContent className="flex items-center gap-6 flex-wrap">
                <span className="dc-safety-icon"><ShieldAlert size={26} /></span>
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <h4 className="dc-safety-title">Strict Clinical Safety & Administrative Boundary</h4>
                  <p className="dc-safety-desc">
                    Namuste operates strictly as an administrative front-desk concierge. It coordinates schedules, answers clinic policies, and collects basic intake. It <strong style={{ color: "var(--text-ivory)" }}>never diagnoses diseases, interprets lab tests, or provides medical treatment advice</strong>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CONVERSION */}
        <section className="dc-section-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div className="dc-closing">
            <h2 className="dc-h2">
              Give your clinic the <span style={{ color: "var(--green)" }}>calm front desk</span> it deserves.
            </h2>
            <p className="dc-section-desc" style={{ margin: "0 auto 32px" }}>
              Set up Namuste for your clinic in under 48 hours with zero hardware required.
            </p>
            <Link href="/contact" className="dc-btn-primary">
              Schedule Clinic Assistant Demo <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .dc-hero-pad { min-height: 88vh; padding: 150px 36px 60px; display: flex; flex-direction: column; justify-content: space-between; }
        .dc-container { max-width: 1200px; margin: 0 auto; }
        .dc-container-wide { max-width: 1360px; margin: 0 auto; }

        .dc-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); margin-bottom: 24px; }
        .dc-breadcrumb a { color: var(--text-muted); text-decoration: none; }
        .dc-breadcrumb .is-current { color: var(--green); }

        .dc-hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; margin-bottom: 40px; }

        .dc-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(30px, 3.4vw, 48px);
          line-height: 1.18; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 20px; max-width: 560px;
        }
        .dc-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17px); line-height: 1.65; max-width: 480px; margin: 0 0 28px; }

        .dc-capability-bar { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 32px; font-size: 13px; color: var(--text-body); }
        .dc-dot { color: var(--green); }

        .dc-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .dc-btn-primary {
          position: relative;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 28px; border-radius: 999px;
          background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%);
          color: #05180D !important;
          font-size: 14px; font-weight: 800; text-decoration: none;
          letter-spacing: -0.01em;
          box-shadow: 0 0 28px rgba(0, 229, 117, 0.42), 0 10px 24px rgba(0, 0, 0, 0.3);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .dc-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 38px rgba(0, 229, 117, 0.65), 0 14px 30px rgba(0, 0, 0, 0.4);
        }
        .dc-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 24px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .dc-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        .dc-trail { display: flex; flex-direction: column; gap: 4px; max-width: 420px; width: 100%; margin: 0 auto; }
        .dc-node {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 20px; border-radius: 14px;
          background: var(--surface); border: 1px solid var(--border);
          box-shadow: 0 12px 28px -20px rgba(11, 15, 13, 0.3);
        }
        .dc-node.is-alert { background: var(--coral-bg); border-color: var(--border-coral); }
        .dc-node.is-response { background: var(--green-glow); border-color: var(--border-green); }
        .dc-node.is-outcome { justify-content: center; gap: 10px; background: var(--green-glow); border-color: var(--border-green); box-shadow: 0 12px 28px -16px var(--green-glow-strong); }
        .dc-node-icon {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .dc-node-icon.is-alert { background: var(--coral-bg); color: var(--coral); }
        .dc-node-icon.is-response { background: var(--green-glow); color: var(--green); }
        .dc-node-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
        .dc-node-label.is-alert { color: var(--coral); }
        .dc-node-label.is-response { color: var(--green); }
        .dc-node-text { font-size: 13.5px; color: var(--text-ivory); line-height: 1.4; margin-top: 1px; }
        .dc-outcome-text { font-size: 14px; font-weight: 700; color: var(--green); }
        .dc-connector { width: 2px; height: 20px; background: var(--border-green); margin: 0 auto; }

        .dc-hero-line {
          text-align: center; margin-top: 60px; border-top: 1px solid var(--border); padding-top: 32px;
          font-family: var(--font-sans); font-weight: 700; font-size: clamp(19px, 2.4vw, 30px); color: var(--text-ivory);
        }

        /* CLINIC LAUNCH TRIAL CARD (Theme-Adaptive & Animated) */
        .dc-trial-section {
          padding: 30px 36px 70px;
        }
        .dc-trial-card {
          position: relative;
          border-radius: 24px;
          background: var(--surface2);
          border: 1.5px solid var(--border-green);
          box-shadow: 0 20px 60px -15px var(--shadow-subtle), 0 0 30px -5px var(--green-glow);
          overflow: hidden;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .dc-trial-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, var(--green-glow-strong) 0%, transparent 65%);
          pointer-events: none;
        }
        .dc-trial-body {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 36px 44px;
          gap: 36px;
          flex-wrap: wrap;
        }
        .dc-trial-info {
          flex: 1;
          min-width: 320px;
        }
        .dc-trial-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .dc-trial-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--green-glow);
          color: var(--green);
          border: 1px solid var(--border-green);
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.05em;
        }
        .dc-trial-pill {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--green);
          background: var(--green-glow);
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid var(--border-green);
        }
        .dc-trial-badge-sub {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .dc-trial-heading {
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-ivory);
          margin: 0 0 10px;
          line-height: 1.25;
        }
        .dc-trial-subtext {
          font-size: 14.5px;
          color: var(--text-body);
          line-height: 1.6;
          max-width: 660px;
          margin: 0 0 18px;
        }
        .dc-trial-perks-row {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-body);
        }
        .dc-trial-perk {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .dc-trial-perk svg {
          color: var(--green);
        }
        .dc-trial-cta-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .dc-trial-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 34px;
          border-radius: 999px;
          background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%);
          color: #05180D !important;
          font-size: 14.5px;
          font-weight: 800;
          letter-spacing: -0.01em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          outline: none;
          box-shadow: 0 0 32px rgba(0, 229, 117, 0.45), 0 10px 24px rgba(0, 0, 0, 0.3);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }
        .dc-trial-cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 44px rgba(0, 229, 117, 0.7), 0 14px 34px rgba(0, 0, 0, 0.4);
        }
        .dc-trial-btn-shine {
          position: absolute;
          top: 0;
          left: -120%;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          transform: skewX(-20deg);
          animation: dcBtnShine 3.2s infinite ease-in-out;
        }
        @keyframes dcBtnShine {
          0% { left: -120%; }
          35%, 100% { left: 160%; }
        }
        .dc-trial-pricing-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .dc-trial-pricing-link:hover {
          color: var(--green);
        }

        .dc-section-pad { padding: 90px 36px; }
        .dc-section-head { max-width: 680px; margin: 0 auto 48px; text-align: center; }
        .dc-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 16px;
        }
        .dc-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .dc-h2 { font-size: clamp(28px, 3.6vw, 44px); color: var(--text-ivory); line-height: 1.2; font-weight: 700; letter-spacing: -0.015em; margin: 0 0 16px; }
        .dc-section-desc { color: var(--text-muted); font-size: 15px; line-height: 1.7; margin: 0; }

        .clinic-photo-banner { position: relative; border-radius: 24px; overflow: hidden; height: 420px; }
        .clinic-photo-banner img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.92); display: block; }
        .clinic-photo-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%); }
        .clinic-photo-label { position: absolute; bottom: 24px; left: 28px; color: #fff; font-size: 18px; font-weight: 700; }

        .dc-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .dc-cap-icon {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .dc-cap-title { font-size: 19px; font-weight: 700; color: var(--text-ivory); margin: 0; }
        .dc-cap-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin: 0; }

        .dc-safety-card { border-color: var(--border-green); }
        .dc-safety-icon {
          width: 52px; height: 52px; border-radius: 16px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .dc-safety-title { font-size: 20px; font-weight: 700; color: var(--text-ivory); margin: 0 0 6px; }
        .dc-safety-desc { color: var(--text-muted); font-size: 14px; line-height: 1.6; margin: 0; }

        .dc-closing { max-width: 680px; margin: 0 auto; }

        @media (max-width: 960px) {
          .dc-hero-grid { grid-template-columns: 1fr; }
          .dc-cards-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .dc-hero-pad { padding: 110px 20px 40px; }
          .dc-section-pad { padding: 60px 20px; }
          .dc-actions { flex-direction: column; align-items: stretch; }
          .clinic-photo-banner { height: 260px; }
        }
      `}</style>
    </>
  );
}

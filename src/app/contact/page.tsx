import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoBookingWizard from "@/components/DemoBookingWizard";
import { Mail, MapPin, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Demo & Experience Namuste — Tailored AI Consultation",
  description:
    "Schedule an interactive live demonstration of Namuste AI Voice & Chat Assistants tailored to your clinic, practice, or enterprise communication workflows.",
};

const GUARANTEES = [
  "Live test call with your custom business knowledge",
  "Demonstration of sub-600ms multilingual voice cadence",
  "Step-by-step calendar, WhatsApp & CRM integration walkthrough",
  "Custom SLA, pricing & ROI calculation for your enquiry volume",
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        <section className="ct-hero-pad">
          <div className="ct-container">
            <div className="ct-layout">
              {/* Left Column: Context & Direct Reach */}
              <div>
                <div className="ct-eyebrow">
                  <span className="ct-eyebrow-dot" />
                  TAILORED CONSULTATION
                </div>
                <h1 className="ct-headline">
                  Experience Namuste on your <span style={{ color: "var(--green)" }}>actual business workflows.</span>
                </h1>
                <p className="ct-desc">
                  Tell us about your industry, channels, and biggest front-desk friction points. We will configure a live interactive voice/chat demo for your evaluation.
                </p>

                <div className="ct-guarantees">
                  {GUARANTEES.map((item, i) => (
                    <div key={i} className="ct-guarantee-row">
                      <span className="ct-guarantee-icon"><Check size={12} strokeWidth={3} /></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="ct-office">
                  <div className="ct-office-row">
                    <Mail size={16} />
                    <span>General: <strong>connect@namuste.com</strong></span>
                  </div>
                  <div className="ct-office-row">
                    <Mail size={16} />
                    <span>Billing & Payments: <strong>payments@namuste.com</strong></span>
                  </div>
                  <div className="ct-office-row ct-office-row-top">
                    <MapPin size={16} />
                    <span>245 B/1, Raipur Road, Kolkata 700047, West Bengal, India</span>
                  </div>
                  <div className="ct-legal">
                    <div>GST Number: <strong style={{ color: "var(--text-body)" }}>19AALCN3032B1ZR</strong></div>
                    <div>CIN: <strong style={{ color: "var(--text-body)" }}>U62013WB2026PTC286896</strong></div>
                  </div>
                </div>
              </div>

              {/* Right Column: Adaptive Demo Booking Wizard */}
              <div>
                <DemoBookingWizard />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .ct-hero-pad { min-height: 88vh; padding: 150px 36px 80px; }
        .ct-container { max-width: 1360px; margin: 0 auto; }
        .ct-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; align-items: flex-start; }

        .ct-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 18px;
        }
        .ct-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }

        .ct-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(30px, 3.4vw, 46px);
          line-height: 1.18; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 18px;
        }
        .ct-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 16.5px); line-height: 1.65; margin: 0 0 32px; }

        .ct-guarantees { display: flex; flex-direction: column; gap: 18px; margin-bottom: 40px; }
        .ct-guarantee-row { display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--text-body); }
        .ct-guarantee-icon {
          width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }

        .ct-office { border-top: 1px solid var(--border); padding-top: 28px; display: flex; flex-direction: column; gap: 14px; color: var(--text-muted); font-size: 13.5px; }
        .ct-office-row { display: flex; align-items: center; gap: 10px; }
        .ct-office-row svg { color: var(--green); flex-shrink: 0; }
        .ct-office-row-top { align-items: flex-start; }
        .ct-office-row-top svg { margin-top: 2px; }
        .ct-legal { border-top: 1px solid var(--border); padding-top: 12px; margin-top: 4px; font-size: 12px; color: var(--text-dim); line-height: 1.6; }

        @media (max-width: 960px) {
          .ct-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .ct-hero-pad { padding: 110px 20px 50px; }
        }
      `}</style>
    </>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoBookingWizard from "@/components/DemoBookingWizard";
import { Mail, MapPin, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Demo & Experience Namuste — Tailored AI Consultation",
  description:
    "Schedule an interactive live demonstration of Namuste AI Voice & Chat Assistants tailored to your clinic, practice, or enterprise communication workflows.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section
          style={{
            minHeight: "90vh",
            paddingTop: "140px",
            paddingBottom: "80px",
            position: "relative",
          }}
          className="bg-radial-hero"
        >
          <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 36px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: "64px",
                alignItems: "flex-start",
              }}
              className="contact-layout-grid"
            >
              {/* Left Column: Context & Direct Reach */}
              <div>
                <div className="pill" style={{ marginBottom: "16px" }}>Tailored Consultation</div>
                <h1 className="serif" style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "18px" }}>
                  Experience Namuste on your <span className="serif-italic">actual business workflows.</span>
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 16.5px)", lineHeight: 1.65, marginBottom: "32px" }}>
                  Tell us about your industry, channels, and biggest front-desk friction points. We will configure a live interactive voice/chat demo for your evaluation.
                </p>

                {/* Consultation Guarantees */}
                <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "40px" }}>
                  {[
                    "Live test call with your custom business knowledge",
                    "Demonstration of sub-600ms multilingual voice cadence",
                    "Step-by-step calendar, WhatsApp & CRM integration walkthrough",
                    "Custom SLA, pricing & ROI calculation for your enquiry volume",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "var(--text-body)" }}>
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
                        }}
                      >
                        ✓
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Registered Office Details */}
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    color: "var(--text-muted)",
                    fontSize: "13.5px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Mail size={16} style={{ color: "var(--green)" }} />
                    <span>connect@namuste.com</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <MapPin size={16} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
                    <span>245 B/1, Raipur Road, Kolkata 700047, West Bengal, India</span>
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
      <style>{`@media (max-width: 960px) { .contact-layout-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

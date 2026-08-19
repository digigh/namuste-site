import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ArrowRight, Sparkles, Building2, Stethoscope, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparent Pricing & Plans — Namuste",
  description:
    "Explore transparent pricing for Namuste AI Voice and Chat Assistants. Predictable monthly subscriptions with pay-as-you-go usage.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section
          style={{
            minHeight: "75vh",
            paddingTop: "140px",
            paddingBottom: "60px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="bg-radial-hero"
        >
          <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 36px", width: "100%", textAlign: "center" }}>
            <div className="pill" style={{ marginBottom: "16px", display: "inline-flex" }}>Transparent Value</div>
            <h1 className="serif" style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.018em", color: "var(--text-ivory)", marginBottom: "18px" }}>
              Predictable pricing designed for <span className="serif-italic">every business stage.</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, maxWidth: "560px", margin: "0 auto 32px" }}>
              A combination of fixed platform access, assisted onboarding, and pay-as-you-go conversational usage.
            </p>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section style={{ padding: "80px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "28px",
              }}
              className="pricing-grid"
            >
              {/* Tier 1: Practice / Clinic */}
              <div
                className="glass-card"
                style={{
                  padding: "40px",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "rgba(16, 16, 16, 0.75)",
                }}
              >
                <div>
                  <div className="pill" style={{ fontSize: "11px", marginBottom: "14px" }}>Doctors & Single Practices</div>
                  <h3 className="serif" style={{ fontSize: "26px", color: "var(--text-ivory)", marginBottom: "8px" }}>
                    Practice Edition
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.6, marginBottom: "24px" }}>
                    Ideal for individual doctor clinics, dental practices, and boutique consulting firms needing 24/7 reception.
                  </p>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", marginBottom: "24px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "12px" }}>
                      What&apos;s Included:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        "Inbound Voice AI Receptionist (1 phone line)",
                        "WhatsApp appointment confirmation bot",
                        "Calendar & EMR sync (Google, Practo)",
                        "Pre-visit preparation guidance",
                        "Standard business hours human escalation",
                      ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--text-body)" }}>
                          <Check size={14} style={{ color: "var(--green)", marginTop: "3px", flexShrink: 0 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/contact" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  Get Practice Pricing
                </Link>
              </div>

              {/* Tier 2: Multi-Specialty & Mid-Market (Featured) */}
              <div
                className="glass-card"
                style={{
                  padding: "40px",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "rgba(14, 22, 14, 0.9)",
                  border: "1px solid rgba(118, 192, 67, 0.35)",
                  boxShadow: "0 16px 48px rgba(0, 0, 0, 0.8)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--green)",
                    color: "#050505",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 14px",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Most Popular
                </div>

                <div>
                  <div className="pill" style={{ fontSize: "11px", marginBottom: "14px" }}>Polyclinics & Networks</div>
                  <h3 className="serif" style={{ fontSize: "26px", color: "var(--text-ivory)", marginBottom: "8px" }}>
                    Growth Network
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.6, marginBottom: "24px" }}>
                    For multi-doctor clinics, hospitals, regional distributors, and growing mid-market enterprises.
                  </p>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", marginBottom: "24px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--green-luminous)", textTransform: "uppercase", marginBottom: "12px" }}>
                      Everything in Practice plus:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        "Multi-doctor / multi-department routing",
                        "Multilingual voice (Hindi, Bengali, Tamil, Telugu, etc.)",
                        "Web concierge widget with lead capture",
                        "Outbound automated appointment reminders",
                        "CRM & Custom ERP Webhook connectors",
                        "Priority SLA & dedicated onboarding manager",
                      ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--text-body)" }}>
                          <Check size={14} style={{ color: "var(--green)", marginTop: "3px", flexShrink: 0 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Schedule Growth Consultation <ArrowRight size={15} />
                </Link>
              </div>

              {/* Tier 3: Enterprise Conglomerates */}
              <div
                className="glass-card"
                style={{
                  padding: "40px",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "rgba(16, 16, 16, 0.75)",
                }}
              >
                <div>
                  <div className="pill" style={{ fontSize: "11px", marginBottom: "14px" }}>Conglomerates & Large Groups</div>
                  <h3 className="serif" style={{ fontSize: "26px", color: "var(--text-ivory)", marginBottom: "8px" }}>
                    Enterprise Layer
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: 1.6, marginBottom: "24px" }}>
                    For diversified groups and enterprise brands running millions of interactions across subsidiary companies.
                  </p>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", marginBottom: "24px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "12px" }}>
                      Enterprise Suite:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        "Multi-brand isolated knowledge sandboxes",
                        "Custom on-prem / private VPC deployments",
                        "Group-wide role-based access control (RBAC)",
                        "Custom AI voice cloning & tailored latency SLA",
                        "SOC2, ISO & HIPAA compliant data handling",
                        "Dedicated 24/7 technical account manager",
                      ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--text-body)" }}>
                          <Check size={14} style={{ color: "var(--green)", marginTop: "3px", flexShrink: 0 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/contact" className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  Talk to Enterprise Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@media (max-width: 960px) { .pricing-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

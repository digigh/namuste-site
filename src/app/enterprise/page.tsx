import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnterpriseLayerVisualizer from "@/components/EnterpriseLayerVisualizer";
import {
  Network,
  ShieldCheck,
  Building2,
  Lock,
  BarChart3,
  Layers,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Voice & Chat for Enterprise Conglomerates & Multi-Brand Groups — Namuste",
  description:
    "Deploy specialised AI assistants across subsidiary companies, brands, and business units while keeping governance, data privacy, and executive intelligence unified.",
};

export default function EnterprisePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* =========================================================================
            HERO SECTION (Exact Match with Image 4 Mockup)
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
              <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Solutions</Link>
              <span>/</span>
              <span style={{ color: "var(--green)" }}>Conglomerates & Enterprise</span>
            </div>

            {/* Top Grid */}
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
                  Many businesses. Millions of conversations. <span className="serif-italic">One intelligence layer.</span>
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
                  Deploy specialised AI assistants across companies, brands and departments—while keeping governance, knowledge and outcomes connected.
                </p>

                {/* Capability Bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "36px", fontSize: "13px", color: "var(--text-body)" }}>
                  <span>Central governance</span>
                  <span style={{ color: "var(--green)" }}>•</span>
                  <span>Independent workflows</span>
                  <span style={{ color: "var(--green)" }}>•</span>
                  <span>Unified intelligence</span>
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn-primary">
                    Design Your Enterprise AI Layer <ArrowRight size={15} />
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Talk to Enterprise <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Node Topology */}
              <div>
                <EnterpriseLayerVisualizer />
              </div>
            </div>
          </div>

          {/* Editorial Transition */}
          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
            <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--text-ivory)" }}>
              Built centrally. Configured locally. <span className="serif-italic">Learned collectively.</span>
            </span>
          </div>
        </section>

        {/* =========================================================================
            ENTERPRISE ARCHITECTURE PILLARS
            ========================================================================= */}
        <section style={{ padding: "100px 36px", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 64px" }}>
              <div className="pill" style={{ marginBottom: "16px" }}>Enterprise Governance Framework</div>
              <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "16px" }}>
                Unify intelligence without flattening <span className="serif-italic">local workflows.</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "15.5px", lineHeight: 1.7 }}>
                Large multi-entity groups require strong perimeter controls. Namuste guarantees strict knowledge isolation between subsidiaries while providing top-level leadership total visibility.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
              className="enterprise-pillars-grid"
            >
              {[
                {
                  icon: <Lock size={22} />,
                  title: "Isolated Knowledge Sandboxes",
                  desc: "Each operating brand or department maintains its own proprietary knowledge base, business rules, and API connections.",
                },
                {
                  icon: <Building2 size={22} />,
                  title: "Role-Based Access Control (RBAC)",
                  desc: "Assign distinct administrative, operational, and viewer permissions across national HQ, regional directors, and local branch heads.",
                },
                {
                  icon: <BarChart3 size={22} />,
                  title: "Consolidated Group Analytics",
                  desc: "Gain real-time visibility into overall call volumes, resolution velocities, customer sentiment trends, and team productivity across entities.",
                },
                {
                  icon: <Layers size={22} />,
                  title: "Modular Custom Integrations",
                  desc: "Connect seamlessly to enterprise ERPs (SAP, Oracle, Salesforce) and custom in-house databases via secure webhooks.",
                },
                {
                  icon: <ShieldCheck size={22} />,
                  title: "Enterprise SLA & Dedicated Compute",
                  desc: "Guaranteed 99.9% uptime SLAs with dedicated private VPC deployment options and localized Indian data sovereignty.",
                },
                {
                  icon: <Sparkles size={22} />,
                  title: "Phased Group Rollout Strategy",
                  desc: "Start with one high-friction workflow in a single business unit, validate ROI, and deploy reusable playbooks across the group.",
                },
              ].map((item, idx) => (
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
                    {item.icon}
                  </div>
                  <h3 className="serif" style={{ fontSize: "20px", color: "var(--text-ivory)", marginBottom: "10px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            ENTERPRISE CONVERSION
            ========================================================================= */}
        <section style={{ padding: "100px 36px", background: "var(--bg)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 48px)", color: "var(--text-ivory)", lineHeight: 1.2, marginBottom: "18px" }}>
              Architect your group&apos;s <span className="serif-italic">enterprise AI layer.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "15.5px", lineHeight: 1.7, marginBottom: "32px" }}>
              Speak with our enterprise solutions team to review data privacy architecture, VPC options, and group deployment playbooks.
            </p>
            <Link href="/contact" className="btn-primary" style={{ padding: "14px 32px", fontSize: "15px" }}>
              Request Enterprise Architecture Briefing <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .enterprise-pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

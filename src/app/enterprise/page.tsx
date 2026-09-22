import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnterpriseLayerVisualizer from "@/components/EnterpriseLayerVisualizer";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  Building2,
  Lock,
  BarChart3,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Voice & Chat for Enterprise Conglomerates & Multi-Brand Groups — Namuste",
  description:
    "Deploy specialised AI assistants across subsidiary companies, brands, and business units while keeping governance, data privacy, and executive intelligence unified.",
};

const PILLARS = [
  { icon: <Lock size={20} />, title: "Isolated Knowledge Sandboxes", desc: "Each operating brand or department maintains its own proprietary knowledge base, business rules, and API connections." },
  { icon: <Building2 size={20} />, title: "Role-Based Access Control (RBAC)", desc: "Assign distinct administrative, operational, and viewer permissions across national HQ, regional directors, and local branch heads." },
  { icon: <BarChart3 size={20} />, title: "Consolidated Group Analytics", desc: "Gain real-time visibility into overall call volumes, resolution velocities, customer sentiment trends, and team productivity across entities." },
  { icon: <Layers size={20} />, title: "Modular Custom Integrations", desc: "Connect seamlessly to enterprise ERPs (SAP, Oracle, Salesforce) and custom in-house databases via secure webhooks." },
  { icon: <ShieldCheck size={20} />, title: "Enterprise SLA & Dedicated Compute", desc: "Guaranteed 99.9% uptime SLAs with dedicated private VPC deployment options and localized Indian data sovereignty." },
  { icon: <Sparkles size={20} />, title: "Phased Group Rollout Strategy", desc: "Start with one high-friction workflow in a single business unit, validate ROI, and deploy reusable playbooks across the group." },
];

export default function EnterprisePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section className="ep-hero-pad">
          <div className="ep-container-wide">
            <div className="ep-breadcrumb">
              <Link href="/">Solutions</Link>
              <span>/</span>
              <span className="is-current">Conglomerates & Enterprise</span>
            </div>

            <div className="ep-hero-grid">
              <div>
                <h1 className="ep-headline">
                  Many businesses. Millions of conversations. <span style={{ color: "var(--green)" }}>One intelligence layer.</span>
                </h1>
                <p className="ep-desc">
                  Deploy specialised AI assistants across companies, brands and departments — while keeping governance, knowledge and outcomes connected.
                </p>
                <div className="ep-capability-bar">
                  <span>Central governance</span>
                  <span className="ep-dot">•</span>
                  <span>Independent workflows</span>
                  <span className="ep-dot">•</span>
                  <span>Unified intelligence</span>
                </div>
                <div className="ep-actions">
                  <Link href="/contact" className="ep-btn-primary">
                    Design Your Enterprise AI Layer <ArrowRight size={15} />
                  </Link>
                  <Link href="/contact" className="ep-btn-secondary">
                    Talk to Enterprise <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div>
                <EnterpriseLayerVisualizer />
              </div>
            </div>
          </div>

          <div className="ep-hero-line">
            Built centrally. Configured locally. <span style={{ color: "var(--green)", fontWeight: 700 }}>Learned collectively.</span>
          </div>
        </section>

        {/* ARCHITECTURE PILLARS */}
        <section className="ep-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="ep-container-wide">
            <div className="ep-section-head">
              <div className="ep-eyebrow">
                <span className="ep-eyebrow-dot" />
                ENTERPRISE GOVERNANCE FRAMEWORK
              </div>
              <h2 className="ep-h2">
                Unify intelligence without flattening <span style={{ color: "var(--green)" }}>local workflows.</span>
              </h2>
              <p className="ep-section-desc">
                Large multi-entity groups require strong perimeter controls. Namuste guarantees strict knowledge isolation between subsidiaries while providing top-level leadership total visibility.
              </p>
            </div>

            <div className="ep-pillars-grid">
              {PILLARS.map((item, i) => (
                <Card key={i} className="ep-pillar-card">
                  <CardContent className="flex flex-col gap-3">
                    <span className="ep-pillar-icon">{item.icon}</span>
                    <h3 className="ep-pillar-title">{item.title}</h3>
                    <p className="ep-pillar-desc">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="ep-section-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div className="ep-closing">
            <h2 className="ep-h2">
              Architect your group&apos;s <span style={{ color: "var(--green)" }}>enterprise AI layer.</span>
            </h2>
            <p className="ep-section-desc" style={{ margin: "0 auto 32px" }}>
              Speak with our enterprise solutions team to review data privacy architecture, VPC options, and group deployment playbooks.
            </p>
            <Link href="/contact" className="ep-btn-primary">
              Request Enterprise Architecture Briefing <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .ep-hero-pad { min-height: 88vh; padding: 150px 36px 60px; display: flex; flex-direction: column; justify-content: space-between; }
        .ep-container-wide { max-width: 1360px; margin: 0 auto; width: 100%; }

        .ep-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); margin-bottom: 24px; }
        .ep-breadcrumb a { color: var(--text-muted); text-decoration: none; }
        .ep-breadcrumb .is-current { color: var(--green); }

        .ep-hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; margin-bottom: 40px; }

        .ep-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4vw, 50px);
          line-height: 1.15; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 20px; max-width: 560px;
        }
        .ep-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17px); line-height: 1.65; max-width: 480px; margin: 0 0 28px; }

        .ep-capability-bar { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 32px; font-size: 13px; color: var(--text-muted); }
        .ep-dot { color: var(--green); }

        .ep-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .ep-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14px; font-weight: 700; text-decoration: none;
          box-shadow: 0 12px 24px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .ep-btn-primary:hover { transform: translateY(-2px); }
        .ep-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 24px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .ep-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        .ep-hero-line {
          text-align: center; margin-top: 60px; border-top: 1px solid var(--border); padding-top: 32px;
          font-family: var(--font-sans); font-weight: 700; font-size: clamp(19px, 2.4vw, 30px); color: var(--text-ivory);
        }

        .ep-section-pad { padding: 90px 36px; }
        .ep-section-head { max-width: 680px; margin: 0 auto 56px; text-align: center; }
        .ep-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 16px;
        }
        .ep-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }
        .ep-h2 { font-size: clamp(28px, 3.6vw, 44px); color: var(--text-ivory); line-height: 1.2; font-weight: 700; letter-spacing: -0.015em; margin: 0 0 16px; }
        .ep-section-desc { color: var(--text-muted); font-size: 15.5px; line-height: 1.7; margin: 0; }

        .ep-pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .ep-pillar-icon {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .ep-pillar-title { font-size: 19px; font-weight: 700; color: var(--text-ivory); margin: 0; }
        .ep-pillar-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin: 0; }

        .ep-closing { max-width: 680px; margin: 0 auto; }

        @media (max-width: 960px) {
          .ep-hero-grid { grid-template-columns: 1fr; }
          .ep-pillars-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .ep-hero-pad { padding: 110px 20px 40px; }
          .ep-section-pad { padding: 60px 20px; }
          .ep-actions { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}

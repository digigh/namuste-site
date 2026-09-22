import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparent Pricing & Plans — Namuste",
  description:
    "Explore transparent pricing for Namuste AI Voice and Chat Assistants. Predictable monthly subscriptions with pay-as-you-go usage.",
};

const TIERS = [
  {
    tag: "Doctors & Single Practices",
    name: "Practice Edition",
    desc: "Ideal for individual doctor clinics, dental practices, and boutique consulting firms needing 24/7 reception.",
    includesLabel: "What's Included:",
    features: [
      "Inbound Voice AI Receptionist (1 phone line)",
      "WhatsApp appointment confirmation bot",
      "Calendar & EMR sync (Google, Practo)",
      "Pre-visit preparation guidance",
      "Standard business hours human escalation",
    ],
    cta: { label: "Get Practice Pricing", href: "/contact" },
    featured: false,
  },
  {
    tag: "Polyclinics & Networks",
    name: "Growth Network",
    desc: "For multi-doctor clinics, hospitals, regional distributors, and growing mid-market enterprises.",
    includesLabel: "Everything in Practice plus:",
    features: [
      "Multi-doctor / multi-department routing",
      "Multilingual voice (Hindi, Bengali, Tamil, Telugu, etc.)",
      "Web concierge widget with lead capture",
      "Outbound automated appointment reminders",
      "CRM & Custom ERP Webhook connectors",
      "Priority SLA & dedicated onboarding manager",
    ],
    cta: { label: "Schedule Growth Consultation", href: "/contact" },
    featured: true,
  },
  {
    tag: "Conglomerates & Large Groups",
    name: "Enterprise Layer",
    desc: "For diversified groups and enterprise brands running millions of interactions across subsidiary companies.",
    includesLabel: "Enterprise Suite:",
    features: [
      "Multi-brand isolated knowledge sandboxes",
      "Custom on-prem / private VPC deployments",
      "Group-wide role-based access control (RBAC)",
      "Custom AI voice cloning & tailored latency SLA",
      "SOC2, ISO & HIPAA compliant data handling",
      "Dedicated 24/7 technical account manager",
    ],
    cta: { label: "Talk to Enterprise Sales", href: "/contact" },
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
        {/* HERO */}
        <section className="pr-hero-pad">
          <div className="pr-container">
            <div className="pr-eyebrow">
              <span className="pr-eyebrow-dot" />
              TRANSPARENT VALUE
            </div>
            <h1 className="pr-headline">
              Predictable pricing designed for <span style={{ color: "var(--green)" }}>every business stage.</span>
            </h1>
            <p className="pr-desc">
              A combination of fixed platform access, assisted onboarding, and pay-as-you-go conversational usage.
            </p>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section className="pr-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="pr-container-wide">
            <div className="pr-grid">
              {TIERS.map((tier) => (
                <Card key={tier.name} className={`pr-tier-card ${tier.featured ? "is-featured" : ""}`}>
                  {tier.featured && <Badge className="pr-featured-badge">Most Popular</Badge>}
                  <CardContent className="flex flex-col justify-between h-full gap-6">
                    <div>
                      <Badge variant="secondary" className="pr-tier-tag">{tier.tag}</Badge>
                      <h3 className="pr-tier-name">{tier.name}</h3>
                      <p className="pr-tier-desc">{tier.desc}</p>

                      <div className="pr-features">
                        <div className="pr-features-label" style={{ color: tier.featured ? "var(--green)" : "var(--text-dim)" }}>
                          {tier.includesLabel}
                        </div>
                        {tier.features.map((f, i) => (
                          <div key={i} className="pr-feature-row">
                            <Check size={14} />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href={tier.cta.href} className={tier.featured ? "pr-btn-primary" : "pr-btn-secondary"}>
                      {tier.cta.label} {tier.featured && <ArrowRight size={15} />}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .pr-hero-pad { min-height: 60vh; padding: 150px 36px 50px; display: flex; align-items: center; justify-content: center; }
        .pr-container { max-width: 720px; margin: 0 auto; text-align: center; }
        .pr-container-wide { max-width: 1280px; margin: 0 auto; }

        .pr-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 18px;
        }
        .pr-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }

        .pr-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4vw, 50px);
          line-height: 1.15; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 18px;
        }
        .pr-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17px); line-height: 1.65; max-width: 560px; margin: 0 auto; }

        .pr-section-pad { padding: 80px 36px; }
        .pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: stretch; }
        .pr-tier-card { position: relative; }
        .pr-tier-card.is-featured { border-color: var(--border-green); box-shadow: 0 20px 50px -24px var(--green-glow-strong); }
        .pr-featured-badge {
          position: absolute !important; top: -12px; left: 50%; transform: translateX(-50%);
          background: var(--green) !important; color: #052015 !important;
          font-size: 11px !important; font-weight: 800 !important; text-transform: uppercase; letter-spacing: 0.06em;
          padding: 5px 14px !important; height: auto !important; z-index: 1;
        }

        .pr-tier-tag { background: var(--overlay-1) !important; color: var(--text-muted) !important; border: 1px solid var(--border) !important; font-size: 11px !important; margin-bottom: 14px; }
        .pr-tier-name { font-size: 25px; font-weight: 700; color: var(--text-ivory); margin: 0 0 8px; }
        .pr-tier-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin: 0 0 24px; }

        .pr-features { border-top: 1px solid var(--border); padding-top: 20px; }
        .pr-features-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px; }
        .pr-feature-row { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--text-muted); margin-top: 10px; }
        .pr-feature-row svg { color: var(--green); flex-shrink: 0; margin-top: 2px; }

        .pr-btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; box-sizing: border-box;
          padding: 14px 20px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14px; font-weight: 700; text-decoration: none;
          transition: transform 0.2s ease;
        }
        .pr-btn-primary:hover { transform: translateY(-2px); }
        .pr-btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; box-sizing: border-box;
          padding: 14px 20px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .pr-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        @media (max-width: 960px) {
          .pr-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .pr-hero-pad { padding: 110px 20px 40px; }
          .pr-section-pad { padding: 60px 20px; }
        }
      `}</style>
    </>
  );
}

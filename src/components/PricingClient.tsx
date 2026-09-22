"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import {
  Check,
  ArrowRight,
  Stethoscope,
  Building2,
  Landmark,
  ChevronDown,
  Sparkles,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

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

const PERSONAS = [
  { label: "Solo Doctor / Practice", icon: <Stethoscope size={15} /> },
  { label: "Growing Clinic Network", icon: <Building2 size={15} /> },
  { label: "Large Enterprise Group", icon: <Landmark size={15} /> },
];

const STATS = [
  { icon: <Clock size={16} />, value: 48, suffix: " hrs", label: "To go live" },
  { icon: <ShieldCheck size={16} />, value: 0, suffix: "", label: "Hidden fees" },
  { icon: <Zap size={16} />, value: 24, suffix: "/7", label: "Human escalation" },
];

const FAQS = [
  {
    q: "Is there a setup or onboarding fee?",
    a: "No hidden setup fees on any tier. Onboarding — connecting your calendar, EMR, and WhatsApp number — is included and typically completed within 48 hours.",
  },
  {
    q: "Can I switch plans as my clinic grows?",
    a: "Yes. Most practices start on Practice Edition and move to Growth Network once they add a second doctor or department — your conversation history and integrations carry over with no downtime.",
  },
  {
    q: "How does the pay-as-you-go usage work?",
    a: "Each plan includes a fixed platform fee plus metered conversational usage (voice minutes and chat sessions), so you only pay more as call volume actually grows — not a flat seat license.",
  },
  {
    q: "Do you offer a trial before committing?",
    a: "Yes — every plan starts with a live, guided demo against your own business knowledge on the Contact page, so you can hear exactly how it handles your real patient questions before signing anything.",
  },
  {
    q: "What if I need a custom or on-prem deployment?",
    a: "That's exactly what the Enterprise Layer covers — isolated knowledge sandboxes per brand, private VPC or on-prem hosting, and a dedicated technical account manager for compliance-heavy rollouts.",
  },
];

export default function PricingClient() {
  const [activePersona, setActivePersona] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handlePersonaClick = (idx: number) => {
    setActivePersona((prev) => (prev === idx ? null : idx));
    requestAnimationFrame(() => {
      cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <>
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

          <div className="pr-stats-row">
            {STATS.map((s, i) => (
              <div key={i} className="pr-stat">
                <span className="pr-stat-icon">{s.icon}</span>
                <span className="pr-stat-value">
                  <CountingNumber number={s.value} inView inViewOnce transition={{ stiffness: 90, damping: 40 }} />
                  {s.suffix}
                </span>
                <span className="pr-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONA SELECTOR */}
      <section className="pr-persona-section">
        <div className="pr-container">
          <div className="pr-persona-label">
            <Sparkles size={14} />
            Which one sounds like you?
          </div>
          <div className="pr-persona-row">
            {PERSONAS.map((p, i) => (
              <button
                key={i}
                type="button"
                className={`pr-persona-chip ${activePersona === i ? "is-active" : ""}`}
                onClick={() => handlePersonaClick(i)}
              >
                {p.icon}
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="pr-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="pr-container-wide">
          <div className="pr-grid">
            {TIERS.map((tier, idx) => {
              const isRecommended = activePersona === idx && !tier.featured;
              return (
                <motion.div
                  key={tier.name}
                  ref={(el: HTMLDivElement | null) => { cardRefs.current[idx] = el; }}
                  className="pr-card-wrap"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -8 }}
                >
                  {tier.featured && <div className="pr-featured-badge">Most Popular</div>}
                  <Card
                    className={`pr-tier-card ${tier.featured ? "is-featured" : ""} ${
                      activePersona === idx ? "is-active-persona" : ""
                    }`}
                  >
                    <CardContent className="flex flex-col justify-between h-full gap-6">
                      <div>
                        <div className="pr-tier-tag-row">
                          <Badge variant="secondary" className="pr-tier-tag">{tier.tag}</Badge>
                          <AnimatePresence>
                            {isRecommended && (
                              <motion.span
                                className="pr-recommended-chip"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Check size={11} /> Recommended for you
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pr-section-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div className="pr-container">
          <div className="pr-eyebrow" style={{ justifyContent: "center" }}>
            <span className="pr-eyebrow-dot" />
            COMMON QUESTIONS
          </div>
          <h2 className="pr-faq-heading">
            Everything else you&rsquo;d want to <span style={{ color: "var(--green)" }}>know.</span>
          </h2>

          <div className="pr-faq-list">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`pr-faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="pr-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    {item.q}
                    <ChevronDown size={18} className="pr-faq-chevron" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="pr-faq-answer">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="pr-closing-section">
        <div className="pr-container">
          <h2 className="pr-closing-heading">
            Still not sure which plan fits? <span style={{ color: "var(--green)" }}>Let&rsquo;s talk.</span>
          </h2>
          <p className="pr-desc" style={{ margin: "0 auto 28px" }}>
            Book a 15-minute call and we&rsquo;ll recommend the right tier for your call volume and workflows.
          </p>
          <Link href="/contact" className="pr-btn-primary" style={{ width: "auto", padding: "16px 32px" }}>
            Talk to Our Team <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <style>{`
        .pr-hero-pad { min-height: 55vh; padding: 150px 36px 30px; display: flex; align-items: center; justify-content: center; }
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

        .pr-stats-row { display: flex; align-items: stretch; justify-content: center; gap: 0; margin-top: 44px; }
        .pr-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 32px; position: relative; }
        .pr-stat:not(:last-child)::after {
          content: ""; position: absolute; right: 0; top: 4px; bottom: 4px; width: 1px; background: var(--border);
        }
        .pr-stat-icon { color: var(--green); margin-bottom: 4px; }
        .pr-stat-value { font-family: var(--font-sans); font-weight: 800; font-size: 26px; color: var(--text-ivory); }
        .pr-stat-label { font-size: 12px; color: var(--text-muted); }

        .pr-persona-section { padding: 8px 36px 56px; }
        .pr-persona-label {
          display: inline-flex; align-items: center; gap: 8px; justify-content: center; width: 100%;
          font-size: 12.5px; font-weight: 600; color: var(--text-dim); margin-bottom: 16px;
        }
        .pr-persona-label svg { color: var(--green); }
        .pr-persona-row { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .pr-persona-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 999px;
          border: 1px solid var(--border2); background: var(--surface);
          color: var(--text-body); font-size: 13.5px; font-weight: 600;
          cursor: pointer; transition: all 0.2s ease;
        }
        .pr-persona-chip svg { color: var(--text-dim); transition: color 0.2s ease; }
        .pr-persona-chip:hover { border-color: var(--border-green); background: var(--green-glow); }
        .pr-persona-chip.is-active {
          border-color: var(--green); background: var(--green); color: #052015;
        }
        .pr-persona-chip.is-active svg { color: #052015; }

        .pr-section-pad { padding: 80px 36px; }
        .pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: stretch; }
        .pr-card-wrap { position: relative; display: flex; }
        .pr-tier-card { position: relative; width: 100%; transition: box-shadow 0.3s ease, border-color 0.3s ease; }
        .pr-tier-card.is-featured { border-color: var(--border-green); box-shadow: 0 20px 50px -24px var(--green-glow-strong); }
        .pr-tier-card.is-active-persona { border-color: var(--green) !important; box-shadow: 0 0 0 3px var(--green-glow); }

        .pr-featured-badge {
          position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
          background: var(--green); color: #052015;
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em;
          padding: 6px 16px; border-radius: 999px; z-index: 2;
          box-shadow: 0 6px 16px -4px var(--green-glow-strong);
          white-space: nowrap;
        }

        .pr-tier-tag-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .pr-tier-tag { background: var(--overlay-1) !important; color: var(--text-muted) !important; border: 1px solid var(--border) !important; font-size: 11px !important; margin-bottom: 0 !important; }
        .pr-recommended-chip {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10.5px; font-weight: 700; color: var(--green);
          background: var(--green-glow); border: 1px solid var(--border-green);
          padding: 3px 9px; border-radius: 999px; white-space: nowrap;
        }
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

        .pr-faq-heading {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(24px, 3vw, 34px);
          color: var(--text-ivory); text-align: center; margin: 0 0 40px;
        }
        .pr-faq-list { display: flex; flex-direction: column; gap: 0; text-align: left; }
        .pr-faq-item { border-bottom: 1px solid var(--border); }
        .pr-faq-question {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
          background: none; border: none; cursor: pointer; text-align: left;
          padding: 20px 4px; font-size: 15.5px; font-weight: 600; color: var(--text-ivory);
        }
        .pr-faq-chevron { color: var(--text-dim); flex-shrink: 0; transition: transform 0.25s ease; }
        .pr-faq-item.is-open .pr-faq-chevron { transform: rotate(180deg); color: var(--green); }
        .pr-faq-answer { margin: 0 4px 20px; font-size: 14px; color: var(--text-muted); line-height: 1.7; }

        .pr-closing-section { padding: 90px 36px; text-align: center; background: var(--bg2); border-top: 1px solid var(--border); }
        .pr-closing-heading {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(24px, 3vw, 36px);
          color: var(--text-ivory); margin: 0 0 14px;
        }

        @media (max-width: 960px) {
          .pr-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .pr-hero-pad { padding: 110px 20px 24px; }
          .pr-section-pad { padding: 60px 20px; }
          .pr-persona-section { padding: 8px 20px 40px; }
          .pr-stats-row { gap: 0; }
          .pr-stat { padding: 0 16px; }
          .pr-closing-section { padding: 60px 20px; }
        }
      `}</style>
    </>
  );
}

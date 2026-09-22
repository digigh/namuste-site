"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  AlertTriangle,
  Database,
  ArrowRight,
  CheckCircle2,
  EyeOff,
  Server,
  Check,
  X,
} from "lucide-react";

const DOMAINS = [
  {
    icon: AlertTriangle,
    title: "Professional Boundaries",
    tag: "Deterministic Guardrails",
    accent: "coral",
    description:
      "Zero medical diagnosis, zero binding legal opinions, and zero speculative financial recommendations. Queries requiring clinical, statutory, or financial judgment transfer immediately to verified human specialists.",
    feature: "Instant Human Escalation Engine",
  },
  {
    icon: FileCheck,
    title: "Data & Consent Architecture",
    tag: "Explicit Consent",
    accent: "green",
    description:
      "Channel-specific disclosure before call recording or messaging. Clear opt-ins, purpose limitations, and transparent customer disclosure across Voice, WhatsApp, and Web channels.",
    feature: "DPDP & Telecom Compliance Aligned",
  },
  {
    icon: Lock,
    title: "Air-Gapped Multi-Tenant RBAC",
    tag: "Tenant Isolation",
    accent: "green",
    description:
      "Strict logical partitioning between corporate business units and independent practices. No cross-tenant data leakage, unauthorized cross-branch visibility, or shared prompt embeddings.",
    feature: "Granular Role-Based Access Controls",
  },
  {
    icon: EyeOff,
    title: "PII Redaction & Retention",
    tag: "Automated Masking",
    accent: "green",
    description:
      "Automated on-the-fly redaction of sensitive payment details, Aadhaar, PAN, and national IDs from call transcripts. Configurable data retention timers and one-click data deletion workflows.",
    feature: "Real-Time Acoustic & Text Masking",
  },
  {
    icon: Database,
    title: "Knowledge Versioning & Audit",
    tag: "Immutable Rules",
    accent: "green",
    description:
      "Every assistant answer cites an approved handbook rule with complete revision history. Responses cannot change unless a verified business administrator reviews and publishes an approved update.",
    feature: "Full Audit Trail & Version Control",
  },
  {
    icon: Server,
    title: "Enterprise Cloud Assurance",
    tag: "Indian Data Residency",
    accent: "green",
    description:
      "TLS 1.3 encryption in transit, AES-256 encryption at rest, SOC 2 Type II aligned infrastructure, dedicated VPC peering, and local India data-residency options for regulated banking and healthcare partners.",
    feature: "Dedicated VPC & Local India Hosting",
  },
];

export default function TrustPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden", paddingTop: "150px", paddingBottom: "120px" }}>
        <div className="tp-container">
          {/* HEADER */}
          <div className="tp-header">
            <Badge className="tp-badge">
              <ShieldCheck size={14} />
              <span>Trust, Governance & Boundaries</span>
            </Badge>

            <h1 className="tp-headline">
              Responsible operation with <span style={{ color: "var(--green)" }}>absolute truth boundaries.</span>
            </h1>

            <p className="tp-desc">
              Namuste is built for enterprises and practices where a single hallucinated answer is unacceptable. Every response is strictly grounded in verified business knowledge with deterministic guardrails.
            </p>
          </div>

          {/* TRUST DOMAINS GRID */}
          <div className="tp-grid">
            {DOMAINS.map((d, idx) => {
              const Icon = d.icon;
              const isCoral = d.accent === "coral";
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className={`tp-domain-card ${isCoral ? "is-coral" : ""}`}>
                    <CardContent className="flex flex-col justify-between h-full gap-5">
                      <div>
                        <div className="tp-domain-top">
                          <span className="tp-domain-icon" style={{ color: isCoral ? "var(--coral)" : "var(--green)", background: isCoral ? "var(--coral-bg)" : "var(--green-glow)", borderColor: isCoral ? "var(--border-coral)" : "var(--border-green)" }}>
                            <Icon size={20} />
                          </span>
                          <span className="tp-domain-tag">{d.tag}</span>
                        </div>
                        <h3 className="tp-domain-title">{d.title}</h3>
                        <p className="tp-domain-desc">{d.description}</p>
                      </div>

                      <div className="tp-domain-feature" style={{ color: isCoral ? "var(--coral)" : "var(--green)" }}>
                        <CheckCircle2 size={15} />
                        <span>{d.feature}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* COMPARISON PANEL */}
          <Card className="tp-compare-card">
            <CardContent className="flex flex-col gap-8">
              <div className="tp-compare-head">
                <div className="tp-eyebrow">ARCHITECTURAL DISTINCTION</div>
                <h3 className="tp-compare-title">Generic LLMs guess. Namuste executes verified protocol.</h3>
                <p className="tp-compare-sub">Compare what happens when a customer asks a high-risk or out-of-scope question.</p>
              </div>

              <div className="tp-compare-grid">
                <div className="tp-compare-box is-risk">
                  <div className="tp-compare-box-head is-risk"><X size={16} /> Generic Autonomous Chatbot</div>
                  <div className="tp-compare-label">Caller Enquiry:</div>
                  <div className="tp-compare-quote">&ldquo;Can you confirm if Dr. Mehta can prescribe Blood Thinners before my Saturday surgery?&rdquo;</div>
                  <div className="tp-compare-result is-risk"><strong>Risk:</strong> Speculates clinical advice based on general web data, creating catastrophic medical liability.</div>
                </div>

                <div className="tp-compare-box is-safe">
                  <div className="tp-compare-box-head is-safe"><Check size={16} strokeWidth={3} /> Namuste Grounded Engine</div>
                  <div className="tp-compare-label">Deterministic Action:</div>
                  <div className="tp-compare-quote">&ldquo;Pre-operative medications must be evaluated by Dr. Mehta directly. I have flagged your surgery date and routed your query to Duty Nurse Ananya right now.&rdquo;</div>
                  <div className="tp-compare-result is-safe"><strong>Protected:</strong> Triggers clinical boundary rule #MED-04, logs SLA ticket in HMS, zero medical speculation.</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CLOSING BANNER */}
          <div className="tp-banner">
            <div className="tp-banner-text">
              <h2 className="tp-banner-title">Our Commitment to Grounded Operation</h2>
              <p className="tp-banner-desc">
                Namuste uses large language intelligence strictly as an understanding and reasoning engine — never as an autonomous decision-maker outside your verified policies.
              </p>
            </div>
            <div className="tp-banner-actions">
              <Link href="/contact" className="tp-btn-primary">
                Request Security Whitepaper <ArrowRight size={14} />
              </Link>
              <Link href="/" className="tp-btn-secondary">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          .tp-container { max-width: 1360px; margin: 0 auto; padding: 0 40px; }
          .tp-header { max-width: 840px; margin-bottom: 64px; }
          .tp-badge {
            display: inline-flex !important; align-items: center; gap: 8px;
            background: var(--green-glow) !important; color: var(--green) !important;
            border: 1px solid var(--border-green) !important;
            font-size: 12px !important; font-weight: 700 !important; letter-spacing: 0.06em; text-transform: uppercase;
            padding: 7px 15px !important; height: auto !important; margin-bottom: 20px;
          }
          .tp-headline {
            font-family: var(--font-sans); font-weight: 800; font-size: clamp(34px, 4.6vw, 60px);
            line-height: 1.12; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 24px;
          }
          .tp-desc { font-size: clamp(15px, 1.3vw, 18px); color: var(--text-muted); line-height: 1.65; margin: 0; }

          .tp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px; margin-bottom: 72px; }
          .tp-domain-card { height: 100%; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
          .tp-domain-card:hover { border-color: var(--border-green); }
          .tp-domain-card.is-coral:hover { border-color: var(--border-coral); }
          .tp-domain-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
          .tp-domain-icon {
            width: 42px; height: 42px; border-radius: 12px; border: 1px solid;
            display: flex; align-items: center; justify-content: center;
          }
          .tp-domain-tag {
            font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
            padding: 4px 10px; border-radius: 999px;
            background: var(--overlay-1); border: 1px solid var(--border); color: var(--text-muted);
          }
          .tp-domain-title { font-size: 20px; font-weight: 700; color: var(--text-ivory); margin: 0 0 10px; letter-spacing: -0.005em; }
          .tp-domain-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin: 0; }
          .tp-domain-feature { padding-top: 16px; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; }

          .tp-compare-card { margin-bottom: 72px; border-color: var(--border-green); }
          .tp-compare-head { max-width: 700px; }
          .tp-eyebrow { font-family: 'SF Mono', 'Menlo', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--green); margin-bottom: 10px; }
          .tp-compare-title { font-size: 28px; font-weight: 700; color: var(--text-ivory); margin: 0 0 10px; letter-spacing: -0.01em; }
          .tp-compare-sub { font-size: 14.5px; color: var(--text-muted); margin: 0; line-height: 1.6; }

          .tp-compare-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
          .tp-compare-box { padding: 22px; border-radius: 16px; }
          .tp-compare-box.is-risk { background: var(--coral-bg); border: 1px solid var(--border-coral); }
          .tp-compare-box.is-safe { background: var(--green-glow); border: 1px solid var(--border-green); }
          .tp-compare-box-head { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
          .tp-compare-box-head.is-risk { color: var(--coral); }
          .tp-compare-box-head.is-safe { color: var(--green); }
          .tp-compare-label { font-size: 12.5px; color: var(--text-dim); margin-bottom: 8px; }
          .tp-compare-quote { font-size: 13.5px; color: var(--text-ivory); font-style: italic; margin-bottom: 14px; line-height: 1.5; }
          .tp-compare-result { padding: 12px 14px; border-radius: 10px; background: var(--overlay-1); font-size: 12.5px; line-height: 1.5; }
          .tp-compare-result.is-risk { color: var(--coral); border: 1px solid var(--border-coral); }
          .tp-compare-result.is-safe { color: var(--green); border: 1px solid var(--border-green); }

          .tp-banner {
            padding: 44px; border-radius: 24px;
            background: var(--green-glow); border: 1px solid var(--border-green);
            display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px;
          }
          .tp-banner-text { max-width: 640px; }
          .tp-banner-title { font-size: 26px; font-weight: 700; color: var(--text-ivory); margin: 0 0 10px; }
          .tp-banner-desc { font-size: 14.5px; color: var(--text-muted); line-height: 1.65; margin: 0; }
          .tp-banner-actions { display: flex; gap: 14px; flex-wrap: wrap; }
          .tp-btn-primary {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 13px 22px; border-radius: 999px;
            background: var(--text-ivory); color: var(--bg);
            font-size: 14px; font-weight: 700; text-decoration: none;
            transition: transform 0.2s ease;
          }
          .tp-btn-primary:hover { transform: translateY(-2px); }
          .tp-btn-secondary {
            display: inline-flex; align-items: center;
            padding: 13px 20px; border-radius: 999px;
            border: 1px solid var(--border2); color: var(--text-ivory);
            font-size: 14px; font-weight: 600; text-decoration: none;
          }
          .tp-btn-secondary:hover { border-color: var(--border-green); background: var(--surface2); }

          @media (max-width: 768px) {
            .tp-container { padding: 0 20px; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}

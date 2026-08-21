"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
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
  FileText,
  Check,
  X,
  Sparkles,
} from "lucide-react";

export default function TrustPage() {
  const [activeTab, setActiveTab] = useState<"guardrails" | "privacy" | "cloud">("guardrails");

  const domains = [
    {
      icon: AlertTriangle,
      title: "Professional Boundaries",
      tag: "Deterministic Guardrails",
      color: "#F87171",
      badgeBg: "rgba(248, 113, 113, 0.15)",
      badgeBorder: "rgba(248, 113, 113, 0.3)",
      description:
        "Zero medical diagnosis, zero binding legal opinions, and zero speculative financial recommendations. Queries requiring clinical, statutory, or financial judgment transfer immediately to verified human specialists.",
      feature: "Instant Human Escalation Engine",
    },
    {
      icon: FileCheck,
      title: "Data & Consent Architecture",
      tag: "Explicit Consent",
      color: "#9BEA16",
      badgeBg: "rgba(155, 234, 22, 0.12)",
      badgeBorder: "rgba(155, 234, 22, 0.25)",
      description:
        "Channel-specific disclosure before call recording or messaging. Clear opt-ins, purpose limitations, and transparent customer disclosure across Voice, WhatsApp, and Web channels.",
      feature: "DPDP & Telecom Compliance Aligned",
    },
    {
      icon: Lock,
      title: "Air-Gapped Multi-Tenant RBAC",
      tag: "Tenant Isolation",
      color: "#9BEA16",
      badgeBg: "rgba(155, 234, 22, 0.12)",
      badgeBorder: "rgba(155, 234, 22, 0.25)",
      description:
        "Strict logical partitioning between corporate business units and independent practices. No cross-tenant data leakage, unauthorized cross-branch visibility, or shared prompt embeddings.",
      feature: "Granular Role-Based Access Controls",
    },
    {
      icon: EyeOff,
      title: "PII Redaction & Retention",
      tag: "Automated Masking",
      color: "#9BEA16",
      badgeBg: "rgba(155, 234, 22, 0.12)",
      badgeBorder: "rgba(155, 234, 22, 0.25)",
      description:
        "Automated on-the-fly redaction of sensitive payment details, Aadhaar, PAN, and national IDs from call transcripts. Configurable data retention timers and one-click data deletion workflows.",
      feature: "Real-Time Acoustic & Text Masking",
    },
    {
      icon: Database,
      title: "Knowledge Versioning & Audit",
      tag: "Immutable Rules",
      color: "#9BEA16",
      badgeBg: "rgba(155, 234, 22, 0.12)",
      badgeBorder: "rgba(155, 234, 22, 0.25)",
      description:
        "Every assistant answer cites an approved handbook rule with complete revision history. Responses cannot change unless a verified business administrator reviews and publishes an approved update.",
      feature: "Full Audit Trail & Version Control",
    },
    {
      icon: Server,
      title: "Enterprise Cloud Assurance",
      tag: "Indian Data Residency",
      color: "#9BEA16",
      badgeBg: "rgba(155, 234, 22, 0.12)",
      badgeBorder: "rgba(155, 234, 22, 0.25)",
      description:
        "TLS 1.3 encryption in transit, AES-256 encryption at rest, SOC 2 Type II aligned infrastructure, dedicated VPC peering, and local India data-residency options for regulated banking and healthcare partners.",
      feature: "Dedicated VPC & Local India Hosting",
    },
  ];

  return (
    <>
      <Navbar />
      <main
        style={{
          background: "#000000",
          minHeight: "100vh",
          paddingTop: "140px",
          paddingBottom: "120px",
          overflowX: "hidden",
        }}
      >
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 40px" }}>
          {/* Header Section */}
          <div style={{ maxWidth: "840px", marginBottom: "64px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: "rgba(155, 234, 22, 0.12)",
                border: "1px solid rgba(155, 234, 22, 0.25)",
                color: "#9BEA16",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <ShieldCheck size={14} />
              <span>Trust, Governance & Boundaries</span>
            </div>

            <h1
              className="serif"
              style={{
                fontSize: "clamp(38px, 4.6vw, 68px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#F5F5F0",
                marginBottom: "24px",
              }}
            >
              Responsible operation with<br />
              <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
                absolute truth boundaries.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.3vw, 19px)",
                color: "#A1A1AA",
                lineHeight: 1.65,
                fontFamily: "var(--font-sans)",
              }}
            >
              Namuste is built for enterprises and practices where a single hallucinated answer is unacceptable. Every response is strictly grounded in verified business knowledge with deterministic guardrails.
            </p>
          </div>

          {/* 6 Core Trust Domains Grid (PRD Section 14) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "28px",
              marginBottom: "80px",
            }}
            className="trust-grid"
          >
            {domains.map((d, idx) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  style={{
                    padding: "32px",
                    borderRadius: "20px",
                    background: "rgba(10, 14, 10, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.09)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "300px",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(155, 234, 22, 0.35)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(155, 234, 22, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.8)";
                  }}
                >
                  <div>
                    {/* Icon & Category Tag Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: d.badgeBg,
                          border: `1px solid ${d.badgeBorder}`,
                          color: d.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={22} />
                      </div>

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#A1A1AA",
                        }}
                      >
                        {d.tag}
                      </span>
                    </div>

                    <h3
                      className="serif"
                      style={{
                        fontSize: "22px",
                        fontWeight: 400,
                        color: "#F5F5F0",
                        marginBottom: "12px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {d.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "#A1A1AA",
                        lineHeight: 1.65,
                        margin: "0 0 24px 0",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {d.description}
                    </p>
                  </div>

                  {/* Bottom Verification Feature Pill */}
                  <div
                    style={{
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.07)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: d.color,
                    }}
                  >
                    <CheckCircle2 size={15} />
                    <span>{d.feature}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Side-by-Side: Hallucination Risk vs Namuste Determinism */}
          <div
            style={{
              padding: "48px 40px",
              borderRadius: "24px",
              background: "rgba(10, 14, 10, 0.9)",
              border: "1px solid rgba(155, 234, 22, 0.25)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(155, 234, 22, 0.06)",
              marginBottom: "80px",
            }}
          >
            <div style={{ maxWidth: "700px", marginBottom: "36px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9BEA16", marginBottom: "8px" }}>
                Architectural Distinction
              </div>
              <h3 className="serif" style={{ fontSize: "30px", color: "#F5F5F0", fontWeight: 400, margin: "0 0 10px 0" }}>
                Generic LLMs guess. Namuste executes verified protocol.
              </h3>
              <p style={{ fontSize: "14.5px", color: "#A1A1AA", margin: 0, lineHeight: 1.6 }}>
                Compare what happens when a customer asks a high-risk or out-of-scope question.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Box 1: Generic LLM */}
              <div
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  background: "rgba(25, 10, 10, 0.6)",
                  border: "1px solid rgba(248, 113, 113, 0.25)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#F87171", fontWeight: 700, fontSize: "13px", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <X size={16} /> Generic Autonomous Chatbot
                </div>
                <div style={{ fontSize: "12.5px", color: "#8E8E93", marginBottom: "8px" }}>Caller Enquiry:</div>
                <div style={{ fontSize: "13.5px", color: "#F5F5F0", fontStyle: "italic", marginBottom: "14px" }}>
                  &ldquo;Can you confirm if Dr. Mehta can prescribe Blood Thinners before my Saturday surgery?&rdquo;
                </div>
                <div style={{ padding: "12px 14px", borderRadius: "10px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(248, 113, 113, 0.2)", fontSize: "12.5px", color: "#F87171", lineHeight: 1.5 }}>
                  <strong>Risk:</strong> Speculates clinical advice based on general web data, creating catastrophic medical liability.
                </div>
              </div>

              {/* Box 2: Namuste Deterministic Engine */}
              <div
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  background: "rgba(10, 25, 10, 0.6)",
                  border: "1px solid rgba(155, 234, 22, 0.35)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9BEA16", fontWeight: 700, fontSize: "13px", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <Check size={16} strokeWidth={3} /> Namuste Grounded Engine
                </div>
                <div style={{ fontSize: "12.5px", color: "#8E8E93", marginBottom: "8px" }}>Deterministic Action:</div>
                <div style={{ fontSize: "13.5px", color: "#F5F5F0", fontStyle: "italic", marginBottom: "14px" }}>
                  &ldquo;Pre-operative medications must be evaluated by Dr. Mehta directly. I have flagged your surgery date and routed your query to Duty Nurse Ananya right now.&rdquo;
                </div>
                <div style={{ padding: "12px 14px", borderRadius: "10px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(155, 234, 22, 0.25)", fontSize: "12.5px", color: "#9BEA16", lineHeight: 1.5 }}>
                  <strong>Protected:</strong> Triggers clinical boundary rule #MED-04, logs SLA ticket in HMS, zero medical speculation.
                </div>
              </div>
            </div>
          </div>

          {/* Statement & Action Banner */}
          <div
            style={{
              padding: "48px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(155, 234, 22, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)",
              border: "1px solid rgba(155, 234, 22, 0.3)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <h2 className="serif" style={{ fontSize: "28px", color: "#F5F5F0", margin: "0 0 10px 0", fontWeight: 400 }}>
                Our Commitment to Grounded Operation
              </h2>
              <p style={{ fontSize: "14.5px", color: "#A1A1AA", lineHeight: 1.65, margin: 0 }}>
                Namuste uses large language intelligence strictly as an understanding and reasoning engine—never as an autonomous decision-maker outside your verified policies.
              </p>
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn-primary"
                style={{ padding: "12px 24px", fontSize: "14px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span>Request Security Whitepaper</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/"
                className="btn-secondary"
                style={{ padding: "12px 22px", fontSize: "14px" }}
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 800px) {
            .trust-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}

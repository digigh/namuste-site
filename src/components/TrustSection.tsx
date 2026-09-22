"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, UserCheck, Palette } from "lucide-react";
import ConversationDemo from "./ConversationDemo";

const scenarios = [
  {
    id: "clarify",
    label: "Clarifies before guessing",
    messages: [
      { speaker: "customer" as const, text: "Can you guarantee delivery before Friday?" },
      { speaker: "assistant" as const, text: "Happy to check — is this for the Mumbai warehouse order or the Pune plant shipment?" },
      { speaker: "customer" as const, text: "Pune plant." },
      { speaker: "assistant" as const, text: "Pune plant ships Wednesday, arriving Thursday — a day ahead of your deadline." },
    ],
  },
  {
    id: "escalate",
    label: "Brings in a human",
    messages: [
      { speaker: "customer" as const, text: "I need an exception to our enterprise agreement terms." },
      { speaker: "assistant" as const, text: "Exceptions over 15% need Meera's approval as your Account Lead. Connecting you now — she'll already have this conversation." },
      { speaker: "customer" as const, text: "Great, thank you." },
      { speaker: "assistant" as const, text: "Transferring — no need to repeat yourself." },
    ],
  },
  {
    id: "tone",
    label: "Matches your brand voice",
    messages: [
      { speaker: "customer" as const, text: "Do you have anything for sensitive skin?" },
      { speaker: "assistant" as const, text: "Of course! Let's find something gentle that suits you perfectly 🌿" },
      { speaker: "customer" as const, text: "Perfect, thank you!" },
      { speaker: "assistant" as const, text: "Anytime — that's what we're here for." },
    ],
  },
];

const checklist = [
  { icon: HelpCircle, title: "Clarifies before guessing", desc: "A confident wrong answer is still wrong — Namuste checks approved business knowledge and asks when something is unclear." },
  { icon: UserCheck, title: "Brings in a human", desc: "Judgement, sensitivity or approval? Namuste hands off with the entire conversation already understood — no repeating, no restarting." },
  { icon: Palette, title: "Matches your brand voice", desc: "Warm, formal, playful, or precise — Namuste carries your business's tone into every conversation, consistently." },
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="ts-section-pad"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", position: "relative" }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        <div style={{ maxWidth: "760px", marginBottom: "48px" }}>
          <div style={{ fontFamily: "'SF Mono', 'Menlo', monospace", fontSize: "12px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "18px" }}>
            Judgment, Not Just Answers
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.14, letterSpacing: "-0.02em", color: "var(--text-ivory)", margin: 0 }}>
            A confident wrong answer is still wrong. <span style={{ color: "var(--green)" }}>Namuste knows when to ask, when to step aside, and how to sound like you.</span>
          </h2>
        </div>

        <div className="ts-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {checklist.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ display: "flex", gap: "16px" }}
                >
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(118,192,67,0.12)", border: "1px solid var(--border-green)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-ivory)", marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </motion.div>
              );
            })}

            <Link href="/trust" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--green)", fontSize: "14.5px", fontWeight: 600, textDecoration: "none", marginTop: "8px" }}>
              <span>See how Namuste checks</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <ConversationDemo scenarios={scenarios} />
          </motion.div>
        </div>
      </div>

      <style>{`
        .ts-section-pad { padding: 130px 40px 110px; }
        .ts-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 64px; align-items: start; }
        @media (max-width: 900px) {
          .ts-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 768px) {
          .ts-section-pad { padding: 56px 16px 40px !important; }
        }
      `}</style>
    </section>
  );
}

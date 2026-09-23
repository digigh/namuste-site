"use client";

import { motion } from "framer-motion";
import { IndustryFlow } from "@/data/industryFlows";
import AnimatedOrb from "./AnimatedOrb";

// Rendered in place of the live console for any industry flagged
// `comingSoon` in industryFlows.ts. Deliberately minimal — icon, badge,
// brand name, one line — no CTA, no form.
export function ComingSoonPanel({ industry }: { industry: IndustryFlow }) {
  return (
    <div
      style={{
        minHeight: "460px",
        maxWidth: "980px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "48px 32px",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: "'SF Mono', 'Menlo', monospace",
          fontSize: "12px",
          letterSpacing: "0.1em",
          color: "var(--text-muted)",
          marginBottom: "24px",
        }}
      >
        DIAL TONE · {industry.name.toUpperCase()} · NOT YET LIVE
      </div>

      {/* Real illustration — the same animated orb used site-wide, so a
          not-yet-live vertical still reads as part of the product, not a
          placeholder card. */}
      <div style={{ position: "relative", width: "112px", height: "112px", marginBottom: "26px" }}>
        <motion.div
          animate={{ scale: [1, 1.35, 1.7], opacity: [0.5, 0.15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid var(--border2)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.35, 1.7], opacity: [0.5, 0.15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid var(--border2)" }}
        />
        <div style={{ position: "relative", width: "100%", height: "100%", filter: "grayscale(0.6) opacity(0.8)" }}>
          <AnimatedOrb size={112} />
        </div>
      </div>

      <h3 style={{ fontSize: "clamp(22px, 2.4vw, 28px)", fontWeight: 700, color: "var(--text-ivory)", marginBottom: "10px", letterSpacing: "-0.01em" }}>
        {industry.brandName} is next on the line.
      </h3>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "420px", lineHeight: 1.6 }}>
        We&apos;re teaching Namuste to speak {industry.name}. Voice &amp; chat launching soon.
      </p>
    </div>
  );
}

export default ComingSoonPanel;

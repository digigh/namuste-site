"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, MessageSquare, User, Sparkles } from "lucide-react";

export default function ConversationMovesExact() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const nodes = [
    { num: "01", title: "Answer", sub: "Be present", x: 75, y: 150, desc: "Picks up within 1 ring without wait time." },
    { num: "02", title: "Understand", sub: "Get the context", x: 195, y: 150, desc: "Parses complex multilingual intent." },
    { num: "03", title: "Act", sub: "Create the next step", x: 315, y: 150, desc: "Locks slots & creates calendar actions." },
    { num: "04", title: "Follow up", sub: "Keep it moving", x: 435, y: 150, desc: "Dispatches WhatsApp confirmations." },
    { num: "05", title: "Learn", sub: "Improve the response", x: 555, y: 150, desc: "Audits edge cases with human sign-off." },
  ];

  return (
    <section
      id="conversation-moves"
      style={{
        minHeight: "90vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "130px 40px 110px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        {/* Top Eyebrow from Screenshot 3 */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#8E8E93",
            textTransform: "uppercase",
            marginBottom: "28px",
          }}
        >
          How a Conversation Moves
        </div>

        {/* 2-Column Grid: Headline & CTA Left, Interactive Trajectory Right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="moves-grid"
        >
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="serif"
              style={{
                fontSize: "clamp(38px, 4.5vw, 66px)",
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#F5F5F0",
                marginBottom: "24px",
              }}
            >
              From hello to<br />
              an <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>outcome.</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(16px, 1.3vw, 19px)",
                color: "#A1A1AA",
                lineHeight: 1.65,
                maxWidth: "460px",
                marginBottom: "38px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Your Digital Receptionist does more than answer. It keeps the conversation moving.
            </p>

            <a
              href="#interactive-demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 26px",
                borderRadius: "999px",
                border: "1px solid rgba(143, 216, 19, 0.4)",
                background: "rgba(143, 216, 19, 0.06)",
                color: "#9BEA16",
                fontSize: "14.5px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(143, 216, 19, 0.18)";
                e.currentTarget.style.borderColor = "#9BEA16";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(143, 216, 19, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(143, 216, 19, 0.06)";
                e.currentTarget.style.borderColor = "rgba(143, 216, 19, 0.4)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>Watch a conversation move</span>
              <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Right Column: Fluid Wavy SVG Thread with Interactive Nodes */}
          <div style={{ position: "relative", width: "100%", minHeight: "360px", display: "flex", alignItems: "center" }}>
            <svg
              viewBox="0 0 650 300"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="movesGradExact" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8FD813" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#8FD813" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#8FD813" stopOpacity="1" />
                  <stop offset="75%" stopColor="#8FD813" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8FD813" stopOpacity="0.7" />
                </linearGradient>

                <filter id="greenGlowExact" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Sine Wave Dotted Green Path */}
              <path
                d="M 15 150 C 35 20, 85 20, 115 150 C 145 280, 175 220, 235 150 C 295 80, 325 220, 375 150 C 425 80, 475 200, 525 150 C 565 110, 605 150, 640 150"
                fill="none"
                stroke="url(#movesGradExact)"
                strokeWidth="2.5"
                strokeDasharray="2 4"
                filter="url(#greenGlowExact)"
              />

              {/* Red branch from node 04 down to Bring in a human */}
              <path
                d="M 435 168 Q 445 210, 465 230"
                fill="none"
                stroke="#F87171"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Node 01: Answer */}
              <circle cx="75" cy="150" r="18" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <circle cx="75" cy="150" r="8" fill="rgba(143, 216, 19, 0.3)" />

              {/* Node 02: Understand */}
              <circle cx="195" cy="150" r="18" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <circle cx="195" cy="150" r="8" fill="rgba(143, 216, 19, 0.3)" />

              {/* Node 03: Act */}
              <circle cx="315" cy="150" r="18" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <circle cx="315" cy="150" r="8" fill="rgba(143, 216, 19, 0.3)" />

              {/* Node 04: Follow up */}
              <circle cx="435" cy="150" r="18" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <circle cx="435" cy="150" r="8" fill="rgba(143, 216, 19, 0.3)" />

              {/* Node 05: Learn with Concentric Radar Waves */}
              <circle cx="555" cy="150" r="42" fill="none" stroke="rgba(143, 216, 19, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="555" cy="150" r="32" fill="none" stroke="rgba(143, 216, 19, 0.25)" strokeWidth="1" />
              <circle cx="555" cy="150" r="22" fill="none" stroke="rgba(143, 216, 19, 0.45)" strokeWidth="1.5" />
              <circle cx="555" cy="150" r="14" fill="#000000" stroke="#8FD813" strokeWidth="2" />
              <path d="M 550 150 L 553 153 L 560 146" fill="none" stroke="#8FD813" strokeWidth="2" strokeLinecap="round" />

              {/* Branch Down End Node: Bring in a human */}
              <circle cx="465" cy="230" r="14" fill="#000000" stroke="#F87171" strokeWidth="2" />
            </svg>

            {/* Labels Exactly as Positioned in Screenshot 3 */}
            {/* 01 */}
            <div style={{ position: "absolute", left: "6%", top: "60%", textAlign: "center", width: "70px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#8E8E93", fontWeight: 700 }}>01</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F5F0" }}>Answer</div>
              <div style={{ fontSize: "11px", color: "#71717A" }}>Be present</div>
            </div>

            {/* 02 */}
            <div style={{ position: "absolute", left: "24%", top: "60%", textAlign: "center", width: "80px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#8E8E93", fontWeight: 700 }}>02</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F5F0" }}>Understand</div>
              <div style={{ fontSize: "11px", color: "#71717A" }}>Get the context</div>
            </div>

            {/* 03 */}
            <div style={{ position: "absolute", left: "43%", top: "60%", textAlign: "center", width: "80px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#8E8E93", fontWeight: 700 }}>03</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F5F0" }}>Act</div>
              <div style={{ fontSize: "11px", color: "#71717A" }}>Create the next step</div>
            </div>

            {/* 04 */}
            <div style={{ position: "absolute", left: "61%", top: "60%", textAlign: "center", width: "80px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#8E8E93", fontWeight: 700 }}>04</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F5F0" }}>Follow up</div>
              <div style={{ fontSize: "11px", color: "#71717A" }}>Keep it moving</div>
            </div>

            {/* Red branch text: Bring in a human */}
            <div style={{ position: "absolute", left: "64%", top: "88%", textAlign: "center", width: "110px" }}>
              <div style={{ fontSize: "12px", color: "#F87171", fontWeight: 500 }}>Bring in a human</div>
            </div>

            {/* 05 */}
            <div style={{ position: "absolute", left: "78%", top: "60%", textAlign: "center", width: "130px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#8E8E93", fontWeight: 700 }}>05</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#F5F5F0" }}>Learn</div>
              <div style={{ fontSize: "11px", color: "#71717A" }}>Improve the response</div>
              <div style={{ fontSize: "12px", color: "#9BEA16", fontFamily: "var(--font-serif)", fontStyle: "italic", marginTop: "4px" }}>
                Hello was only the beginning.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .moves-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

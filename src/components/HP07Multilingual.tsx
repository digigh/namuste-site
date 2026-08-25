"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AIVoiceChatbotEngine from "./AIVoiceChatbotEngine";

export default function HP07Multilingual() {
  return (
    <section
      id="voice-engine-demo"
      className="multilingual-section-pad"
      style={{
        minHeight: "95vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#8E8E93",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Speak Naturally.
        </div>

        {/* Headline */}
        <div style={{ maxWidth: "860px", marginBottom: "36px" }}>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(36px, 4.2vw, 62px)",
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#F5F5F0",
              marginBottom: "16px",
            }}
          >
            Your customers will not<br />
            always speak in one language.<br />
            <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
              Neither should your receptionist.
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "#A1A1AA",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: 0,
            }}
          >
            Namuste handles accents, context and code-switching across 8 business verticals — collecting customer details, answering domain questions, and dispatching live webhooks.
          </p>
        </div>

        {/* Multi-Industry AI Voice Calling & Chatbot Engine */}
        <div style={{ margin: "32px 0 44px" }}>
          <AIVoiceChatbotEngine />
        </div>

        {/* Primary CTA & Signature Footnote */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "28px",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 26px",
              borderRadius: "999px",
              background: "transparent",
              border: "1px solid rgba(155, 234, 22, 0.5)",
              color: "#9BEA16",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8FD813";
              e.currentTarget.style.color = "#000000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#9BEA16";
            }}
          >
            <span>Let Namuste listen</span>
            <ArrowRight size={14} />
          </Link>

          <p className="serif-italic" style={{ fontSize: "15px", color: "#D4D0C7", fontStyle: "italic", margin: 0 }}>
            Less &lsquo;press one&rsquo;. More &lsquo;haan, boliye&rsquo;.
          </p>
        </div>
      </div>

      <style>{`
        .multilingual-section-pad {
          padding: 110px 40px 100px;
        }
        @media (max-width: 768px) {
          .multilingual-section-pad {
            padding: 56px 16px 40px !important;
            scroll-margin-top: 60px;
          }
        }
      `}</style>
    </section>
  );
}

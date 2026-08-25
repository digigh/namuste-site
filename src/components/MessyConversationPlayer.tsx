"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, ShieldCheck, Sparkles, Zap, MessageSquare, CheckCircle } from "lucide-react";

export default function MessyConversationPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      time: "0:02",
      speaker: "Caller",
      role: "Inbound Customer",
      type: "caller",
      text: "Yeah hi... uh, I wanted to check if Dr. Mehta is available on Wednesday afternoon... wait, no, actually my mom said Thursday is better, around 5?",
      annotation: "Mid-sentence self-correction: Wednesday → Thursday 5:00 PM",
      badge: "Correction Handled",
      badgeColor: "#F59E0B",
    },
    {
      time: "0:07",
      speaker: "Namuste",
      role: "Digital Receptionist",
      type: "assistant",
      text: "Namuste. Thursday at 5:00 PM is open. Dr. Mehta has both 5:00 PM and 5:45 PM available. Which works best for her?",
      annotation: "Grasped corrected intent without confusion or repeating discarded date",
      badge: "Intent Understood",
      badgeColor: "#9BEA16",
    },
    {
      time: "0:12",
      speaker: "Caller",
      role: "Inbound Customer",
      type: "caller",
      text: "Wait, sorry—can you also check if her cardiac echo reports need to be brought along, or can we send them online?",
      annotation: "Mid-flow interruption & secondary clinical query parsed seamlessly",
      badge: "Interruption Parsed",
      badgeColor: "#F87171",
    },
    {
      time: "0:18",
      speaker: "Namuste",
      role: "Digital Receptionist",
      type: "assistant",
      text: "You can easily upload her echo reports to our secure WhatsApp link before the visit, or bring physical copies. I have locked Thursday, 5:00 PM for her. I am texting the upload link now.",
      annotation: "Resolved booking + document requirements in a single fluid turn",
      badge: "Multi-Intent Resolved",
      badgeColor: "#9BEA16",
    },
  ];

  // Auto-advancing playback simulation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 1.25;
          if (next < 25) setCurrentStepIndex(0);
          else if (next < 50) setCurrentStepIndex(1);
          else if (next < 75) setCurrentStepIndex(2);
          else setCurrentStepIndex(3);
          return next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setPlaybackProgress(0);
  };

  const handlePlayToggle = () => {
    if (playbackProgress >= 100) {
      setPlaybackProgress(0);
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        className="messy-player-card"
        style={{
          width: "100%",
          borderRadius: "20px",
          background: "rgba(10, 12, 11, 0.92)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(155, 234, 22, 0.04)",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Ambient Top Glow */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "80px",
            background: "radial-gradient(ellipse, rgba(155, 234, 22, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Compact Header with Live Playback Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
            paddingBottom: "18px",
            marginBottom: "20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16", boxShadow: "0 0 6px #9BEA16" }} />
              <span style={{ fontSize: "10.5px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.12em", color: "#9BEA16" }}>
                Acoustic Intelligence • Live Transcript
              </span>
            </div>
            <h4 className="serif" style={{ fontSize: "clamp(18px, 1.8vw, 22px)", color: "#F5F5F0", margin: 0, fontWeight: 300, letterSpacing: "-0.01em" }}>
              People pause. Interrupt. Change their mind.{" "}
              <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>
                Namuste keeps up.
              </span>
            </h4>
          </div>

          {/* Compact Audio Controls & Equalizer */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Animated Equalizer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2.5px",
                height: "26px",
                padding: "0 10px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Volume2 size={12} style={{ color: isPlaying ? "#9BEA16" : "#71717A", marginRight: "2px" }} />
              {[12, 18, 9, 22, 14, 16, 10, 20].map((h, i) => (
                <motion.span
                  key={i}
                  animate={
                    isPlaying
                      ? { height: [h * 0.35, h, h * 0.25], opacity: [0.6, 1, 0.6] }
                      : { height: 3, opacity: 0.3 }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 0.7 + (i % 4) * 0.15,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "2px",
                    borderRadius: "1px",
                    background: isPlaying ? "#9BEA16" : "#71717A",
                    display: "inline-block",
                  }}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayToggle}
              style={{
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
                padding: "7px 15px",
                borderRadius: "8px",
                background: isPlaying ? "#F5F5F0" : "#9BEA16",
                color: "#000000",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 0 20px rgba(155, 234, 22, 0.25)",
                transition: "all 0.2s ease",
              }}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause" : "Play Conversation"}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              style={{
                cursor: "pointer",
                fontSize: "12px",
                padding: "7px 10px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#D4D0C7",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title="Reset playback"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Progress Line */}
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "rgba(255, 255, 255, 0.06)",
            borderRadius: "999px",
            marginBottom: "20px",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              width: `${playbackProgress}%`,
              background: "linear-gradient(90deg, #9BEA16 0%, #F59E0B 100%)",
              boxShadow: "0 0 8px #9BEA16",
            }}
          />
        </div>

        {/* Transcript Timeline: Sleek, Aesthetic Compact Bubbles */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", position: "relative", zIndex: 10 }}>
          {steps.map((step, idx) => {
            const isAssistant = step.type === "assistant";
            const isActive = isPlaying && currentStepIndex === idx;

            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isActive ? 1.01 : 1,
                  borderColor: isActive
                    ? isAssistant
                      ? "rgba(155, 234, 22, 0.7)"
                      : "rgba(245, 158, 11, 0.7)"
                    : isAssistant
                    ? "rgba(155, 234, 22, 0.22)"
                    : "rgba(255, 255, 255, 0.08)",
                }}
                style={{
                  padding: "14px 18px",
                  borderRadius: isAssistant ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  border: isAssistant
                    ? "1px solid rgba(155, 234, 22, 0.2)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  background: isAssistant
                    ? "rgba(155, 234, 22, 0.04)"
                    : "rgba(18, 18, 22, 0.7)",
                  boxShadow: isActive
                    ? isAssistant
                      ? "0 0 25px rgba(155, 234, 22, 0.15)"
                      : "0 0 25px rgba(245, 158, 11, 0.15)"
                    : "0 4px 16px rgba(0,0,0,0.4)",
                  marginLeft: isAssistant ? "36px" : "0",
                  marginRight: isAssistant ? "0" : "36px",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Speaker Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        fontWeight: 800,
                        background: isAssistant ? "#9BEA16" : "rgba(255, 255, 255, 0.12)",
                        color: isAssistant ? "#000000" : "#F5F5F0",
                      }}
                    >
                      {isAssistant ? "N" : "C"}
                    </div>
                    <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#F5F5F0" }}>{step.speaker}</span>
                    <span style={{ fontSize: "10.5px", fontFamily: "monospace", color: "#8E8E93" }}>
                      {step.time}
                    </span>
                  </div>

                  {/* Badge */}
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "999px",
                      background: `${step.badgeColor}15`,
                      color: step.badgeColor,
                      border: `1px solid ${step.badgeColor}35`,
                    }}
                  >
                    {step.badge}
                  </span>
                </div>

                {/* Main Dialogue Text */}
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "#F5F5F0",
                    lineHeight: 1.55,
                    margin: "0 0 8px 0",
                    fontFamily: "var(--font-sans), sans-serif",
                  }}
                >
                  &ldquo;{step.text}&rdquo;
                </p>

                {/* Acoustic Annotation */}
                <div
                  style={{
                    fontSize: "11px",
                    color: "#A1A1AA",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    paddingTop: "6px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <Zap size={11} style={{ color: step.badgeColor, flexShrink: 0 }} />
                  <span>{step.annotation}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact Footnote */}
        <div
          style={{
            marginTop: "18px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            fontSize: "11.5px",
            color: "#8E8E93",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#9BEA16" }}>
            <CheckCircle size={14} />
            <span style={{ fontWeight: 600 }}>Acoustic cancellation • Natural barge-in • 180ms latency</span>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#71717A" }}>Sub-200ms Response</span>
        </div>
      </div>

      <style>{`
        .messy-player-card {
          padding: 26px 30px;
        }
        @media (max-width: 768px) {
          .messy-player-card {
            padding: 18px 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

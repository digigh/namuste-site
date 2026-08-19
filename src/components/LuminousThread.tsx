"use client";

import { useEffect, useState } from "react";

interface LuminousThreadProps {
  className?: string;
  height?: number;
  width?: number;
  glowIntensity?: "normal" | "high";
  showCheckmark?: boolean;
  outcomeText?: string;
}

export default function LuminousThread({
  className = "",
  height = 240,
  showCheckmark = true,
  outcomeText = "Every conversation gets a next step.",
}: LuminousThreadProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let start: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      setOffset((progress / 40) % 200);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className={`luminous-thread-container ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <defs>
          {/* Green Fiber Glow Filter */}
          <filter id="threadGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="18" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Linear Gradient for Thread */}
          <linearGradient id="threadGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F87171" stopOpacity="0.3" />
            <stop offset="35%" stopColor="#76C043" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#86EFAC" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#76C043" stopOpacity="1" />
          </linearGradient>

          {/* Flowing Pulse Gradient */}
          <linearGradient id="flowPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#86EFAC" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#76C043" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient background glow haze */}
        <path
          d="M 50 190 C 250 190, 450 160, 650 100 C 780 60, 850 75, 920 75"
          fill="none"
          stroke="rgba(118, 192, 67, 0.15)"
          strokeWidth="32"
          strokeLinecap="round"
          filter="url(#threadGlow)"
        />

        {/* Supporting subtle strands */}
        <path
          d="M 60 195 C 280 185, 470 150, 670 95 C 790 62, 860 75, 920 75"
          fill="none"
          stroke="rgba(118, 192, 67, 0.3)"
          strokeWidth="2.5"
          strokeDasharray="4 6"
        />
        <path
          d="M 40 185 C 240 195, 430 170, 630 105 C 770 58, 840 75, 920 75"
          fill="none"
          stroke="rgba(134, 239, 172, 0.35)"
          strokeWidth="1.8"
        />

        {/* Core Luminous Fiber-Optic Main Path */}
        <path
          d="M 50 190 C 250 190, 450 160, 650 100 C 780 60, 850 75, 920 75"
          fill="none"
          stroke="url(#threadGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#threadGlow)"
        />

        {/* Animated Flowing Particles Pulse */}
        <path
          d="M 50 190 C 250 190, 450 160, 650 100 C 780 60, 850 75, 920 75"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeDasharray="30 200"
          strokeDashoffset={-offset * 2}
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Glowing Terminal Node / Checkmark Ring */}
        {showCheckmark && (
          <g transform="translate(920, 75)">
            {/* Outer Halo */}
            <circle r="36" fill="rgba(118, 192, 67, 0.08)" />
            <circle r="26" fill="rgba(118, 192, 67, 0.18)" />
            <circle r="18" fill="#050505" stroke="var(--green)" strokeWidth="2.5" />
            <path
              d="M -6 0 L -1 5 L 7 -4"
              fill="none"
              stroke="var(--green-luminous)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>

      {/* Outcome text beside terminal node */}
      {showCheckmark && outcomeText && (
        <div
          style={{
            position: "absolute",
            right: "0px",
            top: "60px",
            transform: "translateY(-50%)",
            maxWidth: "180px",
            textAlign: "left",
            pointerEvents: "auto",
          }}
        >
          <span
            className="serif"
            style={{
              fontSize: "15px",
              color: "var(--text-ivory)",
              lineHeight: 1.4,
              display: "block",
            }}
          >
            Every conversation gets a <span className="serif-italic">next step.</span>
          </span>
        </div>
      )}
    </div>
  );
}

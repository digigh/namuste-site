"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// A real audio-style waveform — symmetric bars growing from a center line,
// like a live call's audio visualizer — instead of a decorative background
// that drifts regardless of what's happening. It only reacts to the actual
// speech state: flat and barely breathing at idle, and genuinely energetic
// (taller, faster, color-coded) the instant the AI or the caller is speaking.
// No horizontal motion at all — the reactivity IS the animation.
// Genuinely audio-reactive: reads real-time frequency data off whichever
// analyser is live for the current state (the mic's analyser while the user
// is speaking, the currently-playing TTS clip's analyser while the AI is)
// and drives each bar directly via refs in a requestAnimationFrame loop —
// not React state, so a 60fps visualizer doesn't force 60 renders/sec of the
// whole widget. Bars grow from a center baseline (scaleY, not height) for
// the familiar symmetric "audio waveform" look, with attack/decay smoothing
// so it reads as a real VU meter instead of jittering frame to frame. Falls
// back to a slow ambient breathing animation at idle, when there's nothing
// to visualize.
export function SpeechWaveform({
  state,
  userAnalyserRef,
  aiAnalyserRef,
  barCount = 48,
  barColor,
}: {
  state: "idle" | "ai" | "user";
  userAnalyserRef: React.RefObject<AnalyserNode | null>;
  aiAnalyserRef: React.RefObject<AnalyserNode | null>;
  barCount?: number;
  barColor?: string;
}) {
  const isActive = state !== "idle";
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const smoothedRef = useRef<number[]>(new Array(barCount).fill(0));

  const baseColor = state === "ai" ? "#8B5CF6" : state === "user" ? "#0EA5E9" : "#2F6E1A";
  const peakColor = barColor || (state === "ai" ? "#22D3EE" : state === "user" ? "#7DD3FC" : "#76C043");
  const gradient = barColor ? barColor : `linear-gradient(180deg, ${peakColor}, ${baseColor})`;

  const shapeFactor = useCallback(
    (i: number) => 0.4 + 0.6 * Math.pow(Math.sin((i / (barCount - 1)) * Math.PI), 1.2),
    [barCount]
  );

  useEffect(() => {
    if (!isActive) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      smoothedRef.current.fill(0);
      return;
    }

    let freqData: Uint8Array<ArrayBuffer> | null = null;
    let lastBinCount = 0;

    const tick = () => {
      const analyser = state === "ai" ? aiAnalyserRef.current : state === "user" ? userAnalyserRef.current : null;
      if (analyser) {
        if (!freqData || lastBinCount !== analyser.frequencyBinCount) {
          lastBinCount = analyser.frequencyBinCount;
          freqData = new Uint8Array(lastBinCount);
        }
        analyser.getByteFrequencyData(freqData);
        // Speech/voice energy lives almost entirely in the lower ~70% of the
        // spectrum — including the near-silent top end made every bar out
        // toward the edges look permanently dead regardless of how loud the
        // actual speech was.
        const usableBins = Math.max(1, Math.floor(lastBinCount * 0.7));
        for (let i = 0; i < barCount; i++) {
          const start = Math.floor((i / barCount) * usableBins);
          const end = Math.max(start + 1, Math.floor(((i + 1) / barCount) * usableBins));
          let sum = 0;
          for (let j = start; j < end; j++) sum += freqData[j];
          const avg = sum / (end - start) / 255;

          const prev = smoothedRef.current[i];
          // Fast attack, slower decay — a real VU-meter feel instead of
          // flickering with every frame's raw FFT noise.
          smoothedRef.current[i] = avg > prev ? prev + (avg - prev) * 0.65 : prev + (avg - prev) * 0.12;

          const el = barRefs.current[i];
          if (el) {
            const shape = shapeFactor(i);
            const level = smoothedRef.current[i];
            const scale = Math.max(0.05, shape * 0.12 + level * shape * 1.7);
            el.style.transform = `scaleY(${scale})`;
            el.style.opacity = String(Math.min(1, 0.4 + level * 1.3));
            el.style.boxShadow = level > 0.3 ? `0 0 ${5 + level * 16}px ${peakColor}` : "none";
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isActive, peakColor, shapeFactor]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "3px",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const shape = shapeFactor(i);
        const restScale = 0.045 + shape * 0.075;
        return (
          <motion.div
            key={i}
            ref={(el) => { barRefs.current[i] = el; }}
            animate={
              !isActive
                ? { scaleY: [restScale * 0.55, restScale, restScale * 0.55], opacity: [0.28, 0.5, 0.28] }
                : undefined
            }
            transition={
              !isActive
                ? { duration: 2.2 + (i % 5) * 0.25, repeat: Infinity, ease: "easeInOut", delay: i * 0.03 }
                : undefined
            }
            style={{
              width: "3px",
              height: "100%",
              borderRadius: "3px",
              background: gradient,
              transformOrigin: "center",
              transform: isActive ? `scaleY(${restScale})` : undefined,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}

export default SpeechWaveform;

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bell } from "lucide-react";
import AnimatedOrb from "./AnimatedOrb";

interface IndustryComingSoonProps {
  breadcrumbLabel: string;
  headline: string;
  headlineAccent: string;
  description: string;
  icon: React.ReactNode;
  chips: string[];
}

export default function IndustryComingSoon({
  breadcrumbLabel,
  headline,
  headlineAccent,
  description,
  icon,
  chips,
}: IndustryComingSoonProps) {
  return (
    <section className="ics-section">
      <div className="ics-glow-a" aria-hidden />
      <div className="ics-glow-b" aria-hidden />

      <div className="ics-inner">
        <div className="ics-breadcrumb">
          <Link href="/">Industries</Link>
          <span>/</span>
          <span className="is-current">{breadcrumbLabel}</span>
        </div>

        <div className="ics-badge">
          <motion.span
            className="ics-badge-dot"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          COMING SOON
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ics-headline"
        >
          {headline} <span style={{ color: "var(--green)" }}>{headlineAccent}</span>
        </motion.h1>
        <p className="ics-desc">{description}</p>

        <div className="ics-scene">
          <motion.div
            className="ics-scene-inner"
            animate={{ rotateY: [0, 10, 0, -10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="ics-orb-wrap" style={{ transform: "translateZ(20px)" }}>
              <motion.div
                className="ics-orb-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="ics-orb-ring ics-orb-ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              />
              <AnimatedOrb size={150} />
              <span className="ics-orb-icon">{icon}</span>
            </div>

            {chips.map((c, i) => {
              const angle = (i / chips.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 46;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius * 0.72;
              const z = i % 2 === 0 ? 46 : -34;
              return (
                <motion.div
                  key={c}
                  className="ics-chip"
                  style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) translateZ(${z}px)` }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.6 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                >
                  {c}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="ics-actions">
          <Link href="/contact" className="ics-btn-primary">
            <Bell size={15} /> Get notified when it launches
          </Link>
          <Link href="/industries/doctors-and-clinics" className="ics-btn-secondary">
            See it live for Doctors & Clinics <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        .ics-section {
          position: relative; overflow: hidden;
          min-height: 88vh; display: flex; flex-direction: column; justify-content: center;
          padding: 150px 36px 100px;
          background: var(--bg);
        }
        .ics-glow-a {
          position: absolute; top: -12%; left: -8%; width: 480px; height: 480px;
          background: radial-gradient(circle, var(--green-glow) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .ics-glow-b {
          position: absolute; bottom: -18%; right: -10%; width: 420px; height: 420px;
          background: radial-gradient(circle, var(--coral-bg) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none; opacity: 0.6;
        }
        .ics-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; width: 100%; text-align: center; }

        .ics-breadcrumb { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 12px; color: var(--text-muted); margin-bottom: 28px; }
        .ics-breadcrumb a { color: var(--text-muted); text-decoration: none; }
        .ics-breadcrumb .is-current { color: var(--green); }

        .ics-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 999px;
          background: var(--green-glow); border: 1px solid var(--border-green);
          color: var(--green); font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .ics-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }

        .ics-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(34px, 5vw, 62px);
          line-height: 1.1; letter-spacing: -0.02em; color: var(--text-ivory);
          margin: 0 auto 18px; max-width: 780px;
        }
        .ics-desc { font-size: 16.5px; color: var(--text-muted); line-height: 1.65; max-width: 560px; margin: 0 auto 48px; }

        .ics-scene { position: relative; height: 320px; margin: 0 auto 48px; max-width: 520px; perspective: 1200px; }
        .ics-scene-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; }
        .ics-orb-wrap {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          display: flex; align-items: center; justify-content: center;
        }
        .ics-orb-ring { position: absolute; width: 210px; height: 210px; border-radius: 50%; border: 1px dashed var(--border-green); }
        .ics-orb-ring-2 { width: 250px; height: 250px; border-color: var(--border2); }
        .ics-orb-icon {
          position: absolute; color: #fff; background: var(--green);
          width: 42px; height: 42px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 12px 26px -8px var(--green-glow-strong);
        }

        .ics-chip {
          position: absolute;
          padding: 9px 16px; border-radius: 999px;
          background: var(--surface); border: 1px solid var(--border);
          font-size: 12.5px; font-weight: 600; color: var(--text-ivory);
          box-shadow: 0 14px 30px -16px rgba(11, 15, 13, 0.35);
          white-space: nowrap;
        }

        .ics-actions { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .ics-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14.5px; font-weight: 700; text-decoration: none;
          box-shadow: 0 14px 28px -10px rgba(11, 15, 13, 0.4);
          transition: transform 0.2s ease;
        }
        .ics-btn-primary:hover { transform: translateY(-2px); }
        .ics-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          border: 1px solid var(--border2); color: var(--text-ivory);
          font-size: 14.5px; font-weight: 600; text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .ics-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        @media (max-width: 600px) {
          .ics-section { padding: 120px 20px 64px; min-height: auto; }
          .ics-scene { height: 260px; }
          .ics-chip { font-size: 11px; padding: 7px 12px; }
          .ics-actions { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </section>
  );
}

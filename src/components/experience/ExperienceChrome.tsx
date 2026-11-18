"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/experience" },
  { label: "Professionals", href: "/experience/professionals" },
  { label: "Enterprises", href: "/experience/enterprises" },
  { label: "How It Works", href: "/experience#exp-how" },
];

export function ExperienceNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`exp-nav ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
      <div className="exp-nav-inner">
        <Link href="/experience" className="exp-nav-logo">
          <img src="/logo.png" alt="Namusté" className="brand-logo" />
        </Link>
        <nav className="exp-nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="exp-nav-link">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="exp-nav-actions">
          <Link href="/contact" className="exp-nav-cta">
            Book a Demo
          </Link>
          <button
            type="button"
            className="exp-nav-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "CLOSE" : "MENU"}
            <span className="exp-nav-burger-lines">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="exp-nav-mobile">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="exp-nav-mobile-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="exp-nav-cta exp-nav-cta-mobile">
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  );
}

export function TiltCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  const glowX = useTransform(x, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["20%", "80%"]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`exp-tilt-card ${className ?? ""}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileHover={{ scale: 1.012 }}
    >
      <motion.div
        className="exp-tilt-glow"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, var(--green-glow-strong), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export function ExperienceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="exp-root dark">
      <ExperienceNav />
      {children}

      <style>{`
        .exp-root {
          background: var(--bg);
          color: var(--text-body);
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
        }

        /* ---------- NAV ---------- */
        .exp-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 18px 0;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease, padding 0.3s ease;
        }
        .exp-nav.is-scrolled {
          padding: 12px 0;
          background: var(--nav-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .exp-nav-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .exp-nav-logo { display: flex; align-items: center; }
        .exp-nav-logo img { height: 28px; width: auto; display: block; object-fit: contain; }
        .exp-nav-links { display: flex; gap: 30px; }
        .exp-nav-link {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .exp-nav-link:hover { color: var(--text-ivory); }
        .exp-nav-actions { display: flex; align-items: center; gap: 16px; }
        .exp-nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 999px;
          background: var(--text-ivory);
          color: var(--bg);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .exp-nav-cta:hover { opacity: 0.85; }
        .exp-nav-burger {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-ivory);
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 8px 4px;
          font-family: inherit;
        }
        .exp-nav-burger-lines { display: flex; flex-direction: column; gap: 3px; }
        .exp-nav-burger-lines span { width: 18px; height: 1.5px; background: var(--text-ivory); }
        .exp-nav-mobile { display: none; }

        @media (max-width: 860px) {
          .exp-nav-links { display: none; }
          .exp-nav-cta { display: none; }
          .exp-nav-mobile {
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 8px 24px 20px;
            background: var(--nav-panel);
            backdrop-filter: blur(20px);
          }
          .exp-nav-mobile-link {
            color: var(--text-body);
            text-decoration: none;
            padding: 14px 0;
            font-size: 15px;
            font-weight: 600;
            border-bottom: 1px solid var(--border);
          }
          .exp-nav-cta-mobile { display: inline-flex; justify-content: center; margin-top: 16px; }
        }

        /* ---------- HERO ---------- */
        .exp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--hero-bg-gradient);
          padding: 128px 0 64px;
        }
        .exp-hero-grid {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .exp-hero-grid { grid-template-columns: 1fr; gap: 40px; padding: 0 20px; }
        }
        .exp-hero-copy { text-align: left; }
        .exp-hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--green-luminous);
          background: var(--green-glow);
          border: 1px solid var(--border-green);
          padding: 7px 15px;
          border-radius: 999px;
          margin-bottom: 22px;
        }
        .exp-hero-kicker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green-luminous);
          box-shadow: 0 0 8px var(--green-luminous);
        }
        .exp-hero-headline {
          font-weight: 700;
          font-size: clamp(32px, 4.6vw, 56px);
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin: 0 0 22px;
          color: var(--text-ivory);
        }
        .exp-hero-headline em {
          font-family: 'Newsreader', 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 500;
          color: var(--green-luminous);
        }
        .exp-hero-sub {
          font-size: clamp(14.5px, 1.4vw, 17px);
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 480px;
          margin: 0 0 36px;
        }
        .exp-hero-sub strong { color: var(--text-ivory); font-weight: 600; }

        /* ---------- JOURNEY LIST (editorial menu, replaces cards) ---------- */
        .exp-journey-list {
          border-top: 1px solid var(--border2);
          max-width: 480px;
        }
        .exp-journey-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 2px;
          border-bottom: 1px solid var(--border2);
          text-decoration: none;
          color: inherit;
          transition: gap 0.25s ease;
        }
        .exp-journey-row:hover { gap: 22px; }
        .exp-journey-index {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 12px;
          font-weight: 700;
          color: var(--green-luminous);
          width: 22px;
          flex-shrink: 0;
        }
        .exp-journey-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--overlay-2);
          border: 1px solid var(--border2);
          color: var(--green-luminous);
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .exp-journey-row:hover .exp-journey-icon {
          background: var(--green-luminous);
          border-color: transparent;
          color: #05180D;
        }
        .exp-journey-text { flex: 1; min-width: 0; }
        .exp-journey-text h3 {
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 2px;
          color: var(--text-ivory);
        }
        .exp-journey-text p {
          font-size: 12.5px;
          margin: 0;
          color: var(--text-muted);
        }
        .exp-journey-arrow {
          color: var(--text-dim);
          flex-shrink: 0;
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .exp-journey-row:hover .exp-journey-arrow {
          color: var(--green-luminous);
          transform: translate(3px, -3px);
        }

        /* ---------- CHAT MOCK (hero visual) ---------- */
        .exp-hero-visual {
          display: flex;
          justify-content: center;
        }
        .exp-chatmock {
          width: 100%;
          max-width: 360px;
          border-radius: 22px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-subtle);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .exp-chatmock-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 18px;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-ivory);
        }
        .exp-chatmock-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green-luminous);
          box-shadow: 0 0 8px var(--green-luminous);
          flex-shrink: 0;
        }
        .exp-chatmock-status {
          margin-left: auto;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-dim);
        }
        .exp-chatmock-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 230px;
          justify-content: flex-end;
        }
        .exp-chatmock-bubble {
          max-width: 84%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.45;
        }
        .exp-chatmock-bubble-user {
          align-self: flex-end;
          background: var(--overlay-2);
          border: 1px solid var(--border2);
          color: var(--text-ivory);
          border-bottom-right-radius: 4px;
        }
        .exp-chatmock-bubble-ai {
          align-self: flex-start;
          background: linear-gradient(135deg, rgba(0,229,117,0.16), rgba(155,234,22,0.1));
          border: 1px solid var(--border-green);
          color: var(--text-ivory);
          border-bottom-left-radius: 4px;
        }
        .exp-chatmock-typing { display: flex; gap: 4px; padding: 13px 16px; }
        .exp-chatmock-typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--green-luminous);
          animation: expTypingBounce 1s infinite ease-in-out;
        }
        .exp-chatmock-typing span:nth-child(2) { animation-delay: 0.15s; }
        .exp-chatmock-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes expTypingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .exp-chatmock-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin: 0 14px 14px;
          padding: 11px 16px;
          border-radius: 999px;
          background: var(--overlay-1);
          border: 1px solid var(--border2);
          font-size: 12.5px;
          color: var(--text-dim);
        }
        .exp-chatmock-mic {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--green-luminous);
          color: #05180D;
          flex-shrink: 0;
        }

        /* ---------- MARQUEE ---------- */
        .exp-marquee {
          border-top: 1px solid var(--border2);
          border-bottom: 1px solid var(--border2);
          overflow: hidden;
          white-space: nowrap;
          background: var(--bg2);
        }
        .exp-marquee-track {
          display: inline-flex;
          width: max-content;
          animation: expMarquee 32s linear infinite;
        }
        .exp-marquee-group {
          display: inline-flex;
          flex-shrink: 0;
        }
        .exp-marquee-group a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 22px;
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .exp-marquee-group a::after { content: "·"; margin-left: 22px; color: var(--border-green); }
        .exp-marquee-group a:hover { color: var(--green-luminous); }
        @keyframes expMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-marquee-track { animation: none; }
        }

        .exp-btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 999px;
          background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%);
          color: #05180D;
          font-size: 14.5px;
          font-weight: 800;
          letter-spacing: -0.01em;
          text-decoration: none;
          border: none;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 0 32px rgba(0, 229, 117, 0.42), 0 10px 26px rgba(0, 0, 0, 0.3);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .exp-btn-primary:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 0 42px rgba(0, 229, 117, 0.6), 0 14px 32px rgba(0, 0, 0, 0.4);
        }
        .exp-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .exp-btn-primary-shine {
          position: absolute;
          top: 0;
          left: -120%;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg);
          animation: expBtnShine 3.2s infinite ease-in-out;
        }
        @keyframes expBtnShine {
          0% { left: -120%; }
          35%, 100% { left: 160%; }
        }
        .exp-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 26px;
          border-radius: 999px;
          background: var(--overlay-1);
          border: 1px solid var(--border2);
          color: var(--text-ivory);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .exp-btn-secondary:hover {
          background: var(--overlay-2);
          border-color: var(--border-green);
        }
        .exp-tilt-card {
          position: relative;
          padding: 44px 36px;
          border-radius: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-subtle);
          cursor: pointer;
          overflow: hidden;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
          transition: border-color 0.3s ease;
        }
        .exp-tilt-card:hover { border-color: var(--border-green); }
        .exp-card-anchor { position: absolute; top: -90px; left: 0; }
        .exp-tilt-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .exp-card-icon-row {
          width: 52px;
          height: 52px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00B853, #9BEA16);
          color: #05180D;
          margin-bottom: 24px;
          position: relative;
          box-shadow: 0 0 20px var(--green-glow-strong);
        }
        .exp-tilt-card h3 {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin: 0 0 14px;
          position: relative;
          color: var(--text-ivory);
        }
        .exp-tilt-card p {
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--text-muted);
          margin: 0 0 28px;
          position: relative;
          flex: 1;
        }
        .exp-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--green);
          position: relative;
        }

        /* ---------- GENERIC PICKER PAGE ---------- */
        .exp-picker-page {
          padding: 160px 24px 120px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .exp-picker-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--green);
          text-decoration: none;
          margin-bottom: 32px;
        }
        .exp-picker-head h1 {
          font-size: clamp(30px, 4.4vw, 48px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-ivory);
          margin: 0 0 14px;
        }
        .exp-picker-head p {
          color: var(--text-muted);
          font-size: 15.5px;
          max-width: 560px;
          margin: 0 0 48px;
        }
        .exp-picker-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 760px) {
          .exp-picker-grid { grid-template-columns: 1fr; }
        }

        /* ---------- SIMULATION ENGINE ---------- */
        .exp-sim-page { padding: 150px 24px 100px; max-width: 1180px; margin: 0 auto; }
        .exp-sim-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--green);
          text-decoration: none;
          margin-bottom: 28px;
        }
        .exp-sim-head { margin-bottom: 40px; }
        .exp-sim-head h1 {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-ivory);
          margin: 0 0 10px;
        }
        .exp-sim-head p { color: var(--text-muted); font-size: 15px; max-width: 560px; margin: 0; }
        .exp-sim-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .exp-sim-grid { grid-template-columns: 1fr; }
        }
        .exp-sim-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
        }
        .exp-sim-panel h2 {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin: 0 0 20px;
        }
        .exp-sim-messages {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 160px;
          margin-bottom: 20px;
        }
        .exp-sim-bubble {
          max-width: 86%;
          padding: 12px 16px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.55;
        }
        .exp-sim-bubble-ai {
          align-self: flex-start;
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--text-body);
          border-bottom-left-radius: 4px;
        }
        .exp-sim-bubble-ai b, .exp-sim-bubble-user b {
          display: block;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 4px;
          opacity: 0.75;
        }
        .exp-sim-bubble-user {
          align-self: flex-end;
          background: linear-gradient(135deg, #00B853, #9BEA16);
          color: #05180D;
          border-bottom-right-radius: 4px;
        }
        .exp-sim-actions { display: flex; flex-direction: column; gap: 10px; }
        .exp-sim-reply-btn {
          text-align: left;
          padding: 12px 16px;
          border-radius: 12px;
          background: var(--overlay-1);
          border: 1px solid var(--border2);
          color: var(--text-ivory);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .exp-sim-reply-btn:hover { border-color: var(--border-green); background: var(--green-glow); }
        .exp-sim-freeform { display: flex; gap: 8px; margin-top: 4px; }
        .exp-sim-freeform input {
          flex: 1;
          padding: 11px 14px;
          border-radius: 12px;
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--text-ivory);
          font-size: 13.5px;
          outline: none;
          font-family: inherit;
        }
        .exp-sim-freeform input:focus { border-color: var(--green); }
        .exp-sim-freeform button {
          padding: 11px 18px;
          border-radius: 12px;
          background: var(--text-ivory);
          color: var(--bg);
          border: none;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          font-family: inherit;
        }
        .exp-sim-fields { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
        .exp-sim-field {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .exp-sim-field dt { font-size: 12.5px; color: var(--text-muted); }
        .exp-sim-field dd {
          margin: 0;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-dim);
          text-align: right;
        }
        .exp-sim-field.is-filled dd { color: var(--green-luminous); }
        .exp-sim-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-dim);
          background: var(--surface2);
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .exp-sim-status-pill.is-done { color: var(--green-luminous); background: var(--green-glow); border-color: var(--border-green); }
        .exp-sim-status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
        .exp-sim-reset {
          width: 100%;
          padding: 11px;
          border-radius: 12px;
          background: none;
          border: 1px solid var(--border2);
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .exp-sim-reset:hover { color: var(--text-ivory); border-color: var(--border-green); }
        .exp-sim-note { margin-top: 24px; color: var(--text-dim); font-size: 12.5px; }
        .exp-sim-note a { color: var(--green); }
        .exp-sim-complete {
          margin-top: 16px;
          padding: 16px;
          border-radius: 14px;
          background: var(--green-glow);
          border: 1px solid var(--border-green);
        }
        .exp-sim-complete-label {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--green-luminous);
          margin-bottom: 6px;
        }
        .exp-sim-complete-ref { font-size: 15px; font-weight: 700; color: var(--text-ivory); }
        .exp-sim-complete-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }

        /* ---------- FOOTER NOTE ---------- */
        .exp-footer-note {
          padding: 56px 32px 120px;
          max-width: 980px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .exp-footer-tag {
          display: inline-block;
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--green-luminous);
        }
        .exp-footer-note p {
          color: var(--text-muted);
          font-size: 13.5px;
          line-height: 1.65;
          margin: 8px 0 0;
          max-width: 540px;
        }

        @media (prefers-reduced-motion: reduce) {
          .exp-root * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}

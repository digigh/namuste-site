"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Mic,
  Calendar,
  MessageSquare,
  Stethoscope,
  Building2,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const AICoreScene = dynamic(() => import("./AICoreScene"), {
  ssr: false,
  loading: () => <div className="exp-hero-canvas-fallback" />,
});

function useReducedMotionAndViewport() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setReducedMotion(motionQuery.matches);
      setIsMobile(widthQuery.matches);
    };
    update();
    motionQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      widthQuery.removeEventListener("change", update);
    };
  }, []);

  return { reducedMotion, isMobile };
}

function ExperienceNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#exp-hero" },
    { label: "Professionals", href: "#exp-professionals" },
    { label: "Enterprises", href: "#exp-enterprises" },
    { label: "How It Works", href: "#exp-how" },
  ];

  return (
    <header className={`exp-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="exp-nav-inner">
        <a href="#exp-hero" className="exp-nav-logo">
          namusté<span className="exp-nav-logo-dot">.</span>
        </a>
        <nav className="exp-nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="exp-nav-link">
              {l.label}
            </a>
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
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="exp-nav-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="exp-nav-mobile-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link href="/contact" className="exp-nav-cta exp-nav-cta-mobile">
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  );
}

function FloatingCard({
  className,
  delay,
  icon,
  label,
  sub,
}: {
  className: string;
  delay: number;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <motion.div
      className={`exp-float-card ${className}`}
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="exp-float-card-icon">{icon}</div>
      <div>
        <div className="exp-float-card-label">{label}</div>
        <div className="exp-float-card-sub">{sub}</div>
      </div>
    </motion.div>
  );
}

function ExperienceHero({ reducedMotion, isMobile }: { reducedMotion: boolean; isMobile: boolean }) {
  const particleCount = isMobile ? 220 : reducedMotion ? 180 : 650;

  return (
    <section id="exp-hero" className="exp-hero">
      <div className="exp-hero-canvas">
        <AICoreScene reducedMotion={reducedMotion} particleCount={particleCount} />
      </div>

      <div className="exp-hero-vignette" />

      <FloatingCard
        className="exp-float-card-a"
        delay={0.5}
        icon={<MessageSquare size={15} />}
        label="Patient enquiry received"
        sub="“Is Dr. Mehta available tomorrow?”"
      />
      <FloatingCard
        className="exp-float-card-b"
        delay={0.7}
        icon={<Calendar size={15} />}
        label="Appointment confirmed"
        sub="Slot booked · WhatsApp sent"
      />
      <FloatingCard
        className="exp-float-card-c"
        delay={0.9}
        icon={<Mic size={15} />}
        label="Voice call in progress"
        sub="Namuste AI · 00:42"
      />

      <div className="exp-hero-content">
        <motion.span
          className="exp-hero-kicker"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Sparkles size={13} /> NAMUSTÉ AI EXPERIENCE
        </motion.span>

        <motion.h1
          className="exp-hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Every Conversation.
          <br />
          <span className="exp-hero-title-accent">An Intelligent Possibility.</span>
        </motion.h1>

        <motion.p
          className="exp-hero-sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          Meet your AI-powered voice and chat workforce. From answering customer enquiries
          to completing business workflows, Namusté turns conversations into action.
        </motion.p>

        <motion.div
          className="exp-hero-ctas"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <a href="#exp-professionals" className="exp-btn-primary">
            Explore the Experience <ArrowRight size={16} />
          </a>
          <Link href="/contact" className="exp-btn-secondary">
            Book a Personalised Demo
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#exp-professionals"
        className="exp-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { delay: 1.2, duration: 1.8, repeat: Infinity } }}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </motion.a>
    </section>
  );
}

function TiltCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
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
      className={`exp-tilt-card ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
    >
      <motion.div
        className="exp-tilt-glow"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(56,221,245,0.25), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function WorkforceSplit() {
  return (
    <section className="exp-workforce">
      <div className="exp-section-head">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          One Intelligence. Multiple Possibilities.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Namusté adapts to different business environments.
        </motion.p>
      </div>

      <div className="exp-workforce-grid">
        <TiltCard className="exp-card-professionals" onClick={() => {
          document.getElementById("exp-professionals")?.scrollIntoView({ behavior: "smooth" });
        }}>
          <div id="exp-professionals" className="exp-card-anchor" />
          <div className="exp-card-icon-row">
            <Stethoscope size={22} />
          </div>
          <h3>Built for Professionals</h3>
          <p>
            Give your business an intelligent assistant that answers enquiries, manages
            appointments, and keeps your operations moving.
          </p>
          <span className="exp-card-cta">
            Explore Professionals <ArrowRight size={15} />
          </span>
        </TiltCard>

        <TiltCard className="exp-card-enterprises" onClick={() => {
          document.getElementById("exp-enterprises")?.scrollIntoView({ behavior: "smooth" });
        }}>
          <div id="exp-enterprises" className="exp-card-anchor" />
          <div className="exp-card-icon-row">
            <Building2 size={22} />
          </div>
          <h3>Engineered for Enterprises</h3>
          <p>
            Automate complex customer interactions, capture business opportunities, and
            connect conversations with operational workflows.
          </p>
          <span className="exp-card-cta">
            Explore Enterprises <ArrowRight size={15} />
          </span>
        </TiltCard>
      </div>
    </section>
  );
}

function RoadmapNote() {
  return (
    <section id="exp-how" className="exp-roadmap">
      <div className="exp-roadmap-card">
        <span className="exp-roadmap-tag">PREVIEW · PHASE 1</span>
        <h3>This is an early look.</h3>
        <p>
          You&apos;re seeing the hero experience and the Professionals / Enterprises split —
          the visual language the rest of the full build (profession simulations, the
          Voice AI Playground, the &quot;How It Works&quot; pipeline, and the industry pages)
          will follow. Nothing on this page is wired into the live Namusté site yet.
        </p>
        <Link href="/contact" className="exp-btn-secondary">
          Talk to us about this direction
        </Link>
      </div>
    </section>
  );
}

export default function ExperiencePage() {
  const { reducedMotion, isMobile } = useReducedMotionAndViewport();

  return (
    <div className="exp-root">
      <ExperienceNav />
      <ExperienceHero reducedMotion={reducedMotion} isMobile={isMobile} />
      <WorkforceSplit />
      <RoadmapNote />

      <style>{`
        .exp-root {
          --exp-bg: #080A18;
          --exp-bg2: #10132B;
          --exp-violet: #795CFF;
          --exp-cyan: #38DDF5;
          --exp-blue: #547BFF;
          --exp-white: #F7F8FF;
          --exp-muted: #A4A9C5;
          background: var(--exp-bg);
          color: var(--exp-white);
          font-family: 'Inter', 'Manrope', -apple-system, sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* ---------- NAV ---------- */
        .exp-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 20px 0;
          transition: all 0.35s ease;
        }
        .exp-nav.is-scrolled {
          padding: 12px 0;
          background: rgba(8, 10, 24, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .exp-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .exp-nav-logo {
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--exp-white);
          text-decoration: none;
        }
        .exp-nav-logo-dot { color: var(--exp-cyan); }
        .exp-nav-links {
          display: flex;
          gap: 30px;
        }
        .exp-nav-link {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--exp-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .exp-nav-link:hover { color: var(--exp-white); }
        .exp-nav-actions { display: flex; align-items: center; gap: 14px; }
        .exp-nav-cta {
          padding: 9px 18px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--exp-violet), var(--exp-blue));
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }
        .exp-nav-burger {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .exp-nav-burger span {
          width: 20px;
          height: 2px;
          background: var(--exp-white);
          border-radius: 2px;
        }
        .exp-nav-mobile {
          display: none;
        }

        @media (max-width: 860px) {
          .exp-nav-links { display: none; }
          .exp-nav-burger { display: flex; }
          .exp-nav-cta { display: none; }
          .exp-nav-mobile {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 12px 28px 20px;
            background: rgba(8, 10, 24, 0.95);
            backdrop-filter: blur(16px);
          }
          .exp-nav-mobile-link {
            color: var(--exp-muted);
            text-decoration: none;
            padding: 10px 0;
            font-size: 14px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .exp-nav-cta-mobile { display: block; text-align: center; margin-top: 12px; }
        }

        /* ---------- HERO ---------- */
        .exp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(ellipse at 50% 30%, var(--exp-bg2) 0%, var(--exp-bg) 65%);
        }
        .exp-hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .exp-hero-canvas-fallback {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(121,92,255,0.25), transparent 60%);
        }
        .exp-hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: radial-gradient(ellipse at 50% 100%, rgba(8,10,24,0.9) 0%, transparent 55%),
                      radial-gradient(ellipse 620px 420px at 50% 40%, rgba(8,10,24,0.55) 0%, transparent 70%),
                      linear-gradient(to bottom, rgba(8,10,24,0.1) 0%, rgba(8,10,24,0.85) 100%);
          pointer-events: none;
        }
        .exp-hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          max-width: 760px;
          padding: 0 24px;
        }
        .exp-hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--exp-cyan);
          background: rgba(56,221,245,0.1);
          border: 1px solid rgba(56,221,245,0.25);
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 24px;
        }
        .exp-hero-title {
          font-size: clamp(34px, 6vw, 68px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin: 0 0 22px;
          color: var(--exp-white);
          text-shadow: 0 2px 24px rgba(8,10,24,0.85), 0 8px 48px rgba(8,10,24,0.65);
        }
        .exp-hero-title-accent {
          background: linear-gradient(135deg, var(--exp-cyan), var(--exp-violet));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .exp-hero-sub {
          font-size: clamp(14.5px, 1.6vw, 17.5px);
          line-height: 1.6;
          color: var(--exp-muted);
          max-width: 560px;
          margin: 0 auto 36px;
        }
        .exp-hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .exp-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--exp-violet), var(--exp-cyan));
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 0 32px rgba(121,92,255,0.4);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .exp-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 44px rgba(121,92,255,0.55);
        }
        .exp-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          color: var(--exp-white);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .exp-btn-secondary:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.3);
        }
        .exp-scroll-indicator {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          color: var(--exp-muted);
          display: flex;
        }

        .exp-float-card {
          position: absolute;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 15px;
          border-radius: 14px;
          background: rgba(16, 19, 43, 0.55);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 12px 32px -8px rgba(0,0,0,0.5);
        }
        .exp-float-card-icon {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--exp-violet), var(--exp-cyan));
          color: #fff;
          flex-shrink: 0;
        }
        .exp-float-card-label { font-size: 12.5px; font-weight: 600; color: var(--exp-white); }
        .exp-float-card-sub { font-size: 11px; color: var(--exp-muted); margin-top: 1px; }
        .exp-float-card-a { top: 18%; left: 7%; }
        .exp-float-card-b { top: 24%; right: 6%; }
        .exp-float-card-c { bottom: 20%; left: 10%; }

        @media (max-width: 900px) {
          .exp-float-card { display: none; }
        }

        /* ---------- WORKFORCE SPLIT ---------- */
        .exp-workforce {
          position: relative;
          padding: 110px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .exp-section-head {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 56px;
        }
        .exp-section-head h2 {
          font-size: clamp(26px, 3.6vw, 42px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 14px;
          color: var(--exp-white);
        }
        .exp-section-head p {
          color: var(--exp-muted);
          font-size: 15.5px;
          margin: 0;
        }
        .exp-workforce-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 860px) {
          .exp-workforce-grid { grid-template-columns: 1fr; }
        }
        .exp-tilt-card {
          position: relative;
          padding: 44px 36px;
          border-radius: 26px;
          background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015));
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          overflow: hidden;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }
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
          background: linear-gradient(135deg, var(--exp-violet), var(--exp-blue));
          color: #fff;
          margin-bottom: 24px;
          position: relative;
        }
        .exp-card-enterprises .exp-card-icon-row {
          background: linear-gradient(135deg, var(--exp-cyan), var(--exp-blue));
        }
        .exp-tilt-card h3 {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin: 0 0 14px;
          position: relative;
          color: var(--exp-white);
        }
        .exp-tilt-card p {
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--exp-muted);
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
          color: var(--exp-cyan);
          position: relative;
        }

        /* ---------- ROADMAP ---------- */
        .exp-roadmap {
          padding: 40px 24px 140px;
          max-width: 760px;
          margin: 0 auto;
        }
        .exp-roadmap-card {
          padding: 38px 36px;
          border-radius: 22px;
          background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(255,255,255,0.18);
          text-align: center;
        }
        .exp-roadmap-tag {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--exp-cyan);
          background: rgba(56,221,245,0.1);
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .exp-roadmap-card h3 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 12px;
          color: var(--exp-white);
        }
        .exp-roadmap-card p {
          color: var(--exp-muted);
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 24px;
        }

        @media (prefers-reduced-motion: reduce) {
          .exp-root * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}

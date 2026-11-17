"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Mic,
  Calendar,
  MessageSquare,
  Stethoscope,
  Building2,
  ChevronDown,
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

const NAV_LINKS = [
  { label: "Home", href: "#exp-hero" },
  { label: "Professionals", href: "#exp-professionals" },
  { label: "Enterprises", href: "#exp-enterprises" },
  { label: "How It Works", href: "#exp-how" },
];

function ExperienceNav() {
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
        <a href="#exp-hero" className="exp-nav-logo">
          <img src="/logo.png" alt="Namusté" className="brand-logo" />
        </a>
        <nav className="exp-nav-links">
          {NAV_LINKS.map((l) => (
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
        sub="&ldquo;Is Dr. Mehta available tomorrow?&rdquo;"
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
          <span className="exp-hero-kicker-dot" />
          NAMUSTÉ AI EXPERIENCE
        </motion.span>

        <motion.h1
          className="exp-hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Every conversation.
          <br />
          An intelligent{" "}
          <span className="exp-hero-title-accent serif-italic">possibility.</span>
        </motion.h1>

        <motion.p
          className="exp-hero-sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          Meet your AI-powered voice and chat workforce. From answering customer enquiries
          to completing business workflows, Namusté turns conversations into{" "}
          <span className="exp-hero-sub-accent">action.</span>
        </motion.p>

        <motion.div
          className="exp-hero-ctas"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <a href="#exp-professionals" className="exp-btn-primary">
            <span className="exp-btn-primary-shine" />
            <span>Explore the Experience</span>
            <ArrowRight size={16} />
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

function WorkforceSplit() {
  return (
    <section className="exp-workforce">
      <div className="exp-section-head">
        <motion.span
          className="exp-section-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          WHO IT&apos;S FOR
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          One intelligence. Multiple possibilities.
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
        <TiltCard
          className="exp-card-professionals"
          onClick={() => document.getElementById("exp-professionals")?.scrollIntoView({ behavior: "smooth" })}
        >
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
            Explore Professionals <ArrowUpRight size={15} />
          </span>
        </TiltCard>

        <TiltCard
          className="exp-card-enterprises"
          onClick={() => document.getElementById("exp-enterprises")?.scrollIntoView({ behavior: "smooth" })}
        >
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
            Explore Enterprises <ArrowUpRight size={15} />
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
    <div className="exp-root dark">
      <ExperienceNav />
      <ExperienceHero reducedMotion={reducedMotion} isMobile={isMobile} />
      <WorkforceSplit />
      <RoadmapNote />

      <style>{`
        .exp-root {
          background: var(--bg);
          color: var(--text-body);
          overflow-x: hidden;
          position: relative;
        }

        /* ---------- NAV (mirrors the main site's Navbar: blurred glass bar,
           real wordmark, ivory pill CTA, MENU-label burger) ---------- */
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
          justify-content: center;
          overflow: hidden;
          background: var(--hero-bg-gradient);
        }
        .exp-hero-canvas { position: absolute; inset: 0; z-index: 1; }
        .exp-hero-canvas-fallback {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, var(--green-glow), transparent 60%);
        }
        .exp-hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: radial-gradient(ellipse at 50% 100%, var(--bg) 0%, transparent 55%),
                      radial-gradient(ellipse 640px 440px at 50% 40%, rgba(10, 13, 12, 0.6) 0%, transparent 72%),
                      linear-gradient(to bottom, rgba(10, 13, 12, 0.12) 0%, rgba(10, 13, 12, 0.88) 100%);
          pointer-events: none;
        }
        .exp-hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          max-width: 780px;
          padding: 0 24px;
        }
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
          margin-bottom: 26px;
        }
        .exp-hero-kicker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green-luminous);
          box-shadow: 0 0 8px var(--green-luminous);
        }
        .exp-hero-title {
          font-weight: 700;
          font-size: clamp(36px, 6.4vw, 76px);
          line-height: 1.04;
          letter-spacing: -0.035em;
          margin: 0 0 22px;
          color: var(--text-ivory);
          text-shadow: 0 2px 24px rgba(10,13,12,0.85), 0 8px 48px rgba(10,13,12,0.65);
        }
        .exp-hero-title .exp-hero-title-accent {
          color: var(--green-luminous);
          font-weight: 400;
        }
        .exp-hero-sub {
          font-size: clamp(14.5px, 1.6vw, 17.5px);
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 560px;
          margin: 0 auto 36px;
        }
        .exp-hero-sub-accent { color: var(--green); font-weight: 600; }
        .exp-hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Signature site CTA: lime/green gradient pill with a shine sweep —
           the same recipe as the homepage hero / pricing / trial modal. */
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
          box-shadow: 0 0 32px rgba(0, 229, 117, 0.42), 0 10px 26px rgba(0, 0, 0, 0.3);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .exp-btn-primary:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 0 42px rgba(0, 229, 117, 0.6), 0 14px 32px rgba(0, 0, 0, 0.4);
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
          transition: all 0.25s ease;
        }
        .exp-btn-secondary:hover {
          background: var(--overlay-2);
          border-color: var(--border-green);
        }
        .exp-scroll-indicator {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          color: var(--text-dim);
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
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          box-shadow: var(--shadow-subtle);
        }
        .exp-float-card-icon {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00B853, #9BEA16);
          color: #05180D;
          flex-shrink: 0;
        }
        .exp-float-card-label { font-size: 12.5px; font-weight: 600; color: var(--text-ivory); }
        .exp-float-card-sub { font-size: 11px; color: var(--text-muted); margin-top: 1px; }
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
        .exp-section-eyebrow {
          display: inline-block;
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--green);
          margin-bottom: 14px;
        }
        .exp-section-head h2 {
          font-size: clamp(26px, 3.6vw, 42px);
          font-weight: 700;
          letter-spacing: -0.025em;
          margin: 0 0 14px;
          color: var(--text-ivory);
        }
        .exp-section-head p {
          color: var(--text-muted);
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
          border-radius: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-subtle);
          cursor: pointer;
          overflow: hidden;
          min-height: 300px;
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

        /* ---------- ROADMAP ---------- */
        .exp-roadmap {
          padding: 40px 24px 140px;
          max-width: 760px;
          margin: 0 auto;
        }
        .exp-roadmap-card {
          padding: 38px 36px;
          border-radius: 22px;
          background: var(--surface);
          border: 1px dashed var(--border2);
          text-align: center;
        }
        .exp-roadmap-tag {
          display: inline-block;
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--green-luminous);
          background: var(--green-glow);
          border: 1px solid var(--border-green);
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .exp-roadmap-card h3 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 12px;
          color: var(--text-ivory);
        }
        .exp-roadmap-card p {
          color: var(--text-muted);
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

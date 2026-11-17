"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Stethoscope,
  Building2,
  ChevronDown,
} from "lucide-react";
import { ExperienceShell, TiltCard } from "./ExperienceChrome";

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
        icon={<img src="/experience-icons/chat-bubble.webp" alt="" width={22} height={22} />}
        label="Patient enquiry received"
        sub="&ldquo;Is Dr. Mehta available tomorrow?&rdquo;"
      />
      <FloatingCard
        className="exp-float-card-b"
        delay={0.7}
        icon={<img src="/experience-icons/calendar.webp" alt="" width={22} height={22} />}
        label="Appointment confirmed"
        sub="Slot booked · WhatsApp sent"
      />
      <FloatingCard
        className="exp-float-card-c"
        delay={0.9}
        icon={<img src="/experience-icons/mic.webp" alt="" width={22} height={22} />}
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
          <Link href="/experience/professionals" className="exp-btn-primary">
            <span className="exp-btn-primary-shine" />
            <span>Explore the Experience</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="exp-btn-secondary">
            Book a Personalised Demo
          </Link>
        </motion.div>

        <motion.div
          className="exp-hero-journeys"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="exp-section-eyebrow">WHO IT&apos;S FOR</span>
          <h2 className="exp-hero-journeys-title">One intelligence. Multiple possibilities.</h2>

          <div className="exp-workforce-grid">
            <Link href="/experience/professionals" style={{ textDecoration: "none" }}>
              <TiltCard className="exp-card-professionals">
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
            </Link>

            <Link href="/experience/enterprises" style={{ textDecoration: "none" }}>
              <TiltCard className="exp-card-enterprises">
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
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#exp-how"
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

function RoadmapNote() {
  return (
    <section id="exp-how" className="exp-roadmap">
      <div className="exp-roadmap-card">
        <span className="exp-roadmap-tag">PREVIEW · PHASE 2</span>
        <h3>All seven simulations are live.</h3>
        <p>
          Every Professionals and Enterprises card now opens a real, click-through simulation
          with a live-updating business panel. Still to come: the Voice AI Playground, the
          scroll-driven &quot;How It Works&quot; pipeline, and the features showcase. Nothing on
          this page is wired into the live Namusté site yet.
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
    <ExperienceShell>
      <ExperienceHero reducedMotion={reducedMotion} isMobile={isMobile} />
      <RoadmapNote />
    </ExperienceShell>
  );
}

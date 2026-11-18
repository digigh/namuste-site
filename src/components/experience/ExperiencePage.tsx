"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Stethoscope, Building2 } from "lucide-react";
import { ExperienceShell } from "./ExperienceChrome";
import ChatMock from "./ChatMock";
import { PROFESSIONS, INDUSTRIES } from "@/lib/experienceSimulations";

const JOURNEYS = [
  {
    index: "01",
    href: "/experience/professionals",
    icon: Stethoscope,
    title: "Professionals",
    desc: "Doctors, dentists, distributors, salon owners.",
  },
  {
    index: "02",
    href: "/experience/enterprises",
    icon: Building2,
    title: "Enterprises",
    desc: "Agribusiness, FMCG, pharmaceuticals.",
  },
];

function ExperienceHero() {
  return (
    <section className="exp-hero">
      <div className="exp-hero-grid">
        <motion.div
          className="exp-hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="exp-hero-kicker">
            <span className="exp-hero-kicker-dot" />
            NAMUSTÉ AI EXPERIENCE
          </span>

          <h1 className="exp-hero-headline">
            Conversations that <em>run</em> your business.
          </h1>

          <p className="exp-hero-sub">
            From the first hello to the booked appointment — Namusté&apos;s voice and chat AI
            handles it live, in your business&apos;s own words. <strong>No scripts. No hold music.</strong>
          </p>

          <nav className="exp-journey-list" aria-label="Choose an experience">
            {JOURNEYS.map((j) => (
              <Link key={j.href} href={j.href} className="exp-journey-row">
                <span className="exp-journey-index">{j.index}</span>
                <span className="exp-journey-icon">
                  <j.icon size={16} />
                </span>
                <span className="exp-journey-text">
                  <h3>{j.title}</h3>
                  <p>{j.desc}</p>
                </span>
                <ArrowUpRight size={18} className="exp-journey-arrow" />
              </Link>
            ))}
          </nav>
        </motion.div>

        <motion.div
          className="exp-hero-visual"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChatMock />
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceMarquee() {
  const items = [
    ...PROFESSIONS.map((p) => ({ label: p.title, href: `/experience/professionals/${p.slug}` })),
    ...INDUSTRIES.map((i) => ({ label: i.title, href: `/experience/enterprises/${i.slug}` })),
  ];
  const row = (key: string) => (
    <span className="exp-marquee-group" key={key}>
      {items.map((item) => (
        <Link key={`${key}-${item.href}`} href={item.href}>
          {item.label}
        </Link>
      ))}
    </span>
  );

  return (
    <div className="exp-marquee" aria-hidden="false">
      <div className="exp-marquee-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

function FooterNote() {
  return (
    <section id="exp-how" className="exp-footer-note">
      <div>
        <span className="exp-footer-tag">PREVIEW · PHASE 2</span>
        <p>
          All seven simulations are live and click-through. Still to come: the Voice AI
          Playground and a scroll-driven pipeline view. Nothing here is wired into the live
          Namusté site yet.
        </p>
      </div>
      <Link href="/contact" className="exp-btn-secondary">
        Talk to us about this direction
      </Link>
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <ExperienceShell>
      <ExperienceHero />
      <ExperienceMarquee />
      <FooterNote />
    </ExperienceShell>
  );
}

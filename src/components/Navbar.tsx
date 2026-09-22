"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const MENU: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  {
    label: "Product",
    href: "/product",
    children: [
      { label: "Platform Overview", href: "/platform" },
      { label: "Voice AI", href: "/product/voice-ai" },
      { label: "WhatsApp AI", href: "/product/whatsapp-ai" },
      { label: "Web Concierge", href: "/product/web-ai" },
    ],
  },
  {
    label: "Professions",
    href: "/industries/doctors-and-clinics",
    children: [
      { label: "Doctors & Clinics", href: "/industries/doctors-and-clinics" },
      { label: "Lawyers & Advocates", href: "/industries/professional-services" },
      { label: "Distribution & Field", href: "/industries/distribution" },
      { label: "Education & Admissions", href: "/industries/education" },
    ],
  },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Pricing", href: "/pricing" },
  { label: "Trust & Governance", href: "/trust" },
];

function useCallTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const callTime = useCallTimer();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: "18px 0",
          transition: "background 0.3s ease, border-color 0.3s ease",
          background: scrolled || menuOpen ? "var(--nav-glass)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", zIndex: 260 }}>
            <img src="/logo.png" alt="Namuste" className="brand-logo" style={{ height: "32px", width: "auto", display: "block", objectFit: "contain" }} />
          </Link>

          {/* Live call-timer readout — reinforces "always answering" instead of decorating with nothing */}
          <div
            className="nav-timer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'SF Mono', 'Menlo', monospace",
              fontSize: "12px",
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green-luminous)", boxShadow: "0 0 8px var(--green-luminous)" }} className="nav-timer-dot" />
            <span>CALL IN PROGRESS · {callTime}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", zIndex: 260 }}>
            <ThemeToggle />
            <Link
              href="/contact"
              className="nav-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 18px",
                borderRadius: "999px",
                background: "var(--text-ivory)",
                color: "var(--bg)",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Book a demo
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-ivory)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                padding: "8px 4px",
              }}
            >
              MENU
              <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ width: "18px", height: "1.5px", background: "var(--text-ivory)" }} />
                <span style={{ width: "18px", height: "1.5px", background: "var(--text-ivory)" }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen editorial menu — replaces both the horizontal dropdown nav and the mobile drawer with one pattern at every breakpoint */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 250,
              background: "var(--bg)",
              overflowY: "auto",
            }}
          >
            {/* giant faint background timestamp, echoes the call motif */}
            <div
              style={{
                position: "absolute",
                bottom: "-4vw",
                right: "-2vw",
                fontFamily: "'SF Mono', 'Menlo', monospace",
                fontSize: "min(38vw, 420px)",
                fontWeight: 700,
                color: "var(--text-ivory)",
                opacity: 0.035,
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {callTime}
            </div>

            <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
                <Link href="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                  <img src="/logo.png" alt="Namuste" className="brand-logo" style={{ height: "32px", width: "auto", objectFit: "contain" }} />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: "1px solid var(--border2)",
                    background: "var(--overlay-1)",
                    color: "var(--text-ivory)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <nav style={{ padding: "40px 0 60px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {MENU.map((item, i) => {
                  const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
                      style={{ borderBottom: "1px solid var(--border)", padding: "22px 0" }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", gap: "20px", flexWrap: "wrap" }}>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="menu-item-link"
                          style={{
                            fontSize: "clamp(30px, 5.2vw, 58px)",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            color: active ? "var(--green)" : "var(--text-ivory)",
                            textDecoration: "none",
                            lineHeight: 1,
                          }}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
                            {item.children.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                onClick={() => setMenuOpen(false)}
                                style={{ fontSize: "13.5px", color: "var(--text-muted)", textDecoration: "none", fontWeight: 500 }}
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </nav>

              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "20px", paddingBottom: "48px" }}>
                <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  <div style={{ marginBottom: "4px", fontWeight: 700, color: "var(--text-ivory)" }}>Talk to us</div>
                  <div>connect@namuste.com</div>
                </div>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    background: "var(--green-luminous)",
                    color: "#052015",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Book a demo <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes navTimerPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .nav-timer-dot { animation: navTimerPulse 1.6s ease-in-out infinite; }
        .menu-item-link { transition: color 0.2s ease; }
        .menu-item-link:hover { color: var(--green) !important; }
        @media (max-width: 720px) {
          .nav-timer { display: none !important; }
          .nav-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}

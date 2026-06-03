"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Icons";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Platform", path: "/platform" },
  { label: "Solutions", path: "/solutions" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      transition: "all .35s ease",
      padding: scrolled ? "10px 0" : "14px 0",
      background: scrolled ? "rgba(10, 17, 10, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
    }}>
      <div className="nav-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 44px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "padding .35s ease" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "var(--ink)", flexShrink: 0 }}>
          <Logo height={scrolled ? "var(--logo-height-scrolled)" : "var(--logo-height-normal)"} />
        </Link>

        {/* Desktop nav */}
        <nav className="d-nav" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {navLinks.map(l => {
            const active = pathname === l.path;
            return (
              <Link key={l.label} href={l.path} style={{
                color: active ? "var(--accent-green)" : "rgba(255,255,255,.55)",
                textDecoration: "none", fontSize: "14px", fontWeight: active ? 600 : 500, letterSpacing: "-0.1px", transition: "color .18s"
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
              >{l.label}</Link>
            );
          })}
        </nav>

        <div className="d-nav">
          <Link href="/contact" className="btn-green" style={{ padding: "10px 22px", fontSize: "13.5px" }}>Get Started</Link>
        </div>

        {/* Mobile hamburger */}
        <button className="m-btn" onClick={() => setOpen(!open)} style={{ background: "none", border: "1px solid var(--border2)", color: "#fff", cursor: "pointer", fontSize: 18, display: "none", width: 40, height: 40, borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(10, 17, 10, 0.98)", borderTop: "1px solid var(--border)", padding: "16px 20px 24px" }}>
          {navLinks.map(l => {
            const active = pathname === l.path;
            return (
              <Link key={l.label} href={l.path} onClick={() => setOpen(false)} style={{
                display: "block", color: active ? "var(--accent-green)" : "rgba(255,255,255,.7)",
                textDecoration: "none", padding: "12px 0", fontSize: 16, borderBottom: "1px solid var(--border)", fontWeight: active ? 600 : 500
              }}>{l.label}</Link>
            );
          })}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-green" style={{ marginTop: 16, width: "100%", justifyContent: "center", display: "flex", fontSize: 15 }}>Get Started</Link>
        </div>
      )}
      <style>{`
        @media(max-width:768px){
          .d-nav{display:none!important}
          .m-btn{display:flex!important}
          .nav-container{padding:0 20px!important}
        }
        @media(min-width:769px){.m-btn{display:none!important}}
      `}</style>
    </header>
  );
}

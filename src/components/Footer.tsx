"use client";
import Link from "next/link";
import { Logo } from "@/components/Icons";

const footerLinks = [
  {
    group: "Platform",
    links: [
      { label: "Platform Overview", path: "/platform" },
      { label: "How It Works", path: "/how-it-works" },
      { label: "Solutions & Verticals", path: "/solutions" },
    ]
  },
  {
    group: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Book a Demo", path: "/contact" },
    ]
  }
];

export default function Footer() {
  return (
    <footer>
      {/* CTA Banner */}
      <div style={{ background: "var(--bg2)", position: "relative", overflow: "hidden", borderTop: "1px solid var(--border)" }}>
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(82,204,79,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 44px", position: "relative", zIndex: 2, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
          <div>
            <h2 className="hf" style={{ fontWeight: 900, color: "var(--ink)", fontSize: "clamp(22px,3vw,38px)", lineHeight: 1.2, letterSpacing: "-.6px", marginBottom: 8 }}>
              Digitize your retail network <span className="gt">today.</span>
            </h2>
            <p style={{ color: "var(--ink2)", fontSize: "15px" }}>Apply for early partner access — limited cohorts running.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-green" style={{ fontSize: 14 }}>Apply for Early Access</Link>
            <Link href="/contact" className="btn-ghost" style={{ fontSize: 14 }}>Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "52px 0 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 44px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 36 }} className="fg">

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
                <Logo height={72} />
              </div>
              <p style={{ color: "var(--ink2)", fontSize: 13, lineHeight: 1.75, marginBottom: 18 }}>
                The operating system for retail counters. Starting at the counter — the first moment of trust.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.8" style={{ marginTop: 1, flexShrink: 0 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span style={{ color: "var(--ink2)", fontSize: 12 }}>connect@namuste.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="1.8" style={{ marginTop: 1, flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span style={{ color: "var(--ink2)", fontSize: 12, lineHeight: 1.5 }}>245 B/1, Raipur Road, Kolkata 700047<br />West Bengal, India</span>
                </div>
              </div>
            </div>

            {/* Nav columns */}
            {footerLinks.map(group => (
              <div key={group.group}>
                <h4 className="hf" style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13, marginBottom: 16 }}>{group.group}</h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {group.links.map(link => (
                    <li key={link.label}>
                      <Link href={link.path} style={{ color: "var(--ink2)", fontSize: 13, textDecoration: "none", transition: "color .18s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-green)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--ink2)")}
                      >{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--border)", maxWidth: 1280, margin: "0 auto", padding: "14px 44px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "var(--muted)", fontSize: 12 }}>
            Namuste Technologies Pvt. Ltd. · Kolkata, India
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent-green)", opacity: .5 }} />
            <span style={{ color: "var(--accent-green)", fontSize: 11, opacity: 0.6 }}>Building the future of rural retail</span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:860px){.fg{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.fg{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}

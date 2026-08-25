"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [professionsOpen, setProfessionsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  
  // Mobile accordions
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileProfessionsOpen, setMobileProfessionsOpen] = useState(false);
  const [mobileEnterpriseOpen, setMobileEnterpriseOpen] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: scrolled ? "12px 0" : "18px 0",
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(0, 0, 0, 0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
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
        {/* Official Brand Logo matching Footer */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="Namuste"
            style={{
              height: "36px",
              width: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
          }}
        >
          {/* Product */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: "#A1A1AA",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "8px 0",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
            >
              Product
              <span style={{ fontSize: "11px", opacity: 0.7 }}>⌵</span>
            </button>

            {productOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "-20px",
                  width: "280px",
                  background: "rgba(10, 10, 10, 0.98)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  padding: "12px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.9)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  zIndex: 250,
                }}
              >
                {[
                  { name: "Platform Overview", path: "/platform", desc: "Intelligence & Operating Loop" },
                  { name: "Voice AI", path: "/product/voice-ai", desc: "Sub-200ms spoken telephony" },
                  { name: "WhatsApp AI", path: "/product/whatsapp-ai", desc: "Interactive conversational messaging" },
                  { name: "Web Concierge", path: "/product/web-ai", desc: "Instant visitor qualification" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setProductOpen(false)}
                    style={{
                      textDecoration: "none",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      display: "block",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#F5F5F0" }}>{item.name}</div>
                    <div style={{ fontSize: "11.5px", color: "#8E8E93" }}>{item.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Professions Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setProfessionsOpen(true)}
            onMouseLeave={() => setProfessionsOpen(false)}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: "#A1A1AA",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "8px 0",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
            >
              Professions
              <span style={{ fontSize: "11px", opacity: 0.7 }}>⌵</span>
            </button>

            {professionsOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "-40px",
                  width: "320px",
                  background: "rgba(10, 10, 10, 0.98)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  padding: "12px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.9)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  zIndex: 250,
                }}
              >
                {[
                  { name: "Doctors & Clinics", path: "/industries/doctors-and-clinics", tag: "Priority 01" },
                  { name: "Lawyers & Advocates", path: "/industries/professional-services", tag: "Intake" },
                  { name: "Chartered Accountants", path: "/industries/professional-services", tag: "Tax" },
                  { name: "Architects & Designers", path: "/industries/professional-services", tag: "Studio" },
                  { name: "Real Estate & High-Ticket", path: "/industries/professional-services", tag: "Viewing" },
                  { name: "Consultants & Advisory", path: "/industries/professional-services", tag: "Discovery" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setProfessionsOpen(false)}
                    style={{
                      textDecoration: "none",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: "13.5px", fontWeight: 500, color: "#F5F5F0" }}>{item.name}</span>
                    <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "rgba(118, 192, 67, 0.15)", color: "var(--green)", fontWeight: 700 }}>
                      {item.tag}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Enterprise */}
          <Link
            href="/enterprise"
            style={{
              color: pathname === "/enterprise" ? "#9BEA16" : "#A1A1AA",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = pathname === "/enterprise" ? "#9BEA16" : "#A1A1AA")}
          >
            Enterprise
            <span style={{ fontSize: "11px", opacity: 0.7 }}>⌵</span>
          </Link>

          {/* Pricing */}
          <Link
            href="/pricing"
            style={{
              color: pathname === "/pricing" ? "#9BEA16" : "#A1A1AA",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = pathname === "/pricing" ? "#9BEA16" : "#A1A1AA")}
          >
            Pricing
          </Link>

          {/* Trust */}
          <Link
            href="/trust"
            style={{
              color: pathname === "/trust" ? "#9BEA16" : "#A1A1AA",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = pathname === "/trust" ? "#9BEA16" : "#A1A1AA")}
          >
            Trust & Governance
          </Link>
        </nav>

        {/* Action Button */}
        <div className="desktop-nav">
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 20px",
              borderRadius: "999px",
              background: "transparent",
              border: "1px solid rgba(143, 216, 19, 0.5)",
              color: "#9BEA16",
              fontSize: "13.5px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8FD813";
              e.currentTarget.style.color = "#000000";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(143, 216, 19, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#9BEA16";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span>Book a demo</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{
            background: mobileOpen ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.05)",
            border: `1px solid ${mobileOpen ? "rgba(155, 234, 22, 0.5)" : "rgba(255, 255, 255, 0.12)"}`,
            color: mobileOpen ? "#9BEA16" : "#F5F5F0",
            padding: "8px 10px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* App-Grade Mobile Glass Drawer: EXACT MATCH TO WEB NAV OPTIONS */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: scrolled ? "60px" : "72px",
              left: 0,
              right: 0,
              bottom: 0,
              height: scrolled ? "calc(100dvh - 60px)" : "calc(100dvh - 72px)",
              background: "rgba(5, 7, 5, 0.98)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "20px 20px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowY: "auto",
              zIndex: 199,
            }}
          >
            {/* 5 Web-Matching Navigation Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* 1. Product ⌵ */}
              <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "8px" }}>
                <button
                  onClick={() => setMobileProductOpen(!mobileProductOpen)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: mobileProductOpen ? "rgba(255, 255, 255, 0.04)" : "transparent",
                    border: "none",
                    color: mobileProductOpen ? "#9BEA16" : "#F5F5F0",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>Product</span>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: mobileProductOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      color: mobileProductOpen ? "#9BEA16" : "#8E8E93",
                    }}
                  />
                </button>

                {mobileProductOpen && (
                  <div style={{ padding: "6px 0 6px 14px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {[
                      { name: "Platform Overview", path: "/platform", desc: "Intelligence & Operating Loop" },
                      { name: "Voice AI", path: "/product/voice-ai", desc: "Sub-200ms spoken telephony" },
                      { name: "WhatsApp AI", path: "/product/whatsapp-ai", desc: "Conversational messaging" },
                      { name: "Web Concierge", path: "/product/web-ai", desc: "Instant qualification" },
                    ].map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.path}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          textDecoration: "none",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.02)",
                          display: "block",
                        }}
                      >
                        <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#F5F5F0" }}>{sub.name}</div>
                        <div style={{ fontSize: "11px", color: "#8E8E93" }}>{sub.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Professions ⌵ */}
              <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "8px" }}>
                <button
                  onClick={() => setMobileProfessionsOpen(!mobileProfessionsOpen)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: mobileProfessionsOpen ? "rgba(255, 255, 255, 0.04)" : "transparent",
                    border: "none",
                    color: mobileProfessionsOpen ? "#9BEA16" : "#F5F5F0",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>Professions</span>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: mobileProfessionsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      color: mobileProfessionsOpen ? "#9BEA16" : "#8E8E93",
                    }}
                  />
                </button>

                {mobileProfessionsOpen && (
                  <div style={{ padding: "6px 0 6px 14px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {[
                      { name: "Doctors & Clinics", path: "/industries/doctors-and-clinics", tag: "Priority 01" },
                      { name: "Lawyers & Advocates", path: "/industries/professional-services", tag: "Intake" },
                      { name: "Chartered Accountants", path: "/industries/professional-services", tag: "Tax" },
                      { name: "Architects & Designers", path: "/industries/professional-services", tag: "Studio" },
                      { name: "Real Estate & High-Ticket", path: "/industries/professional-services", tag: "Viewing" },
                      { name: "Consultants & Advisory", path: "/industries/professional-services", tag: "Discovery" },
                    ].map((prof, idx) => (
                      <Link
                        key={idx}
                        href={prof.path}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          textDecoration: "none",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: "rgba(255, 255, 255, 0.02)",
                        }}
                      >
                        <span style={{ fontSize: "13.5px", color: "#F5F5F0", fontWeight: 500 }}>{prof.name}</span>
                        <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "rgba(155, 234, 22, 0.15)", color: "#9BEA16", fontWeight: 700 }}>
                          {prof.tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Enterprise ⌵ */}
              <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "8px" }}>
                <button
                  onClick={() => setMobileEnterpriseOpen(!mobileEnterpriseOpen)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: mobileEnterpriseOpen ? "rgba(255, 255, 255, 0.04)" : "transparent",
                    border: "none",
                    color: mobileEnterpriseOpen ? "#9BEA16" : "#F5F5F0",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span>Enterprise</span>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: mobileEnterpriseOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      color: mobileEnterpriseOpen ? "#9BEA16" : "#8E8E93",
                    }}
                  />
                </button>

                {mobileEnterpriseOpen && (
                  <div style={{ padding: "6px 0 6px 14px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {[
                      { name: "Enterprise Architecture", path: "/enterprise", desc: "Dedicated instances & SLAs" },
                      { name: "Security & Guardrails", path: "/responsible-ai", desc: "Data isolation & zero leakage" },
                    ].map((ent, idx) => (
                      <Link
                        key={idx}
                        href={ent.path}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          textDecoration: "none",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.02)",
                          display: "block",
                        }}
                      >
                        <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#F5F5F0" }}>{ent.name}</div>
                        <div style={{ fontSize: "11px", color: "#8E8E93" }}>{ent.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Pricing */}
              <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "8px" }}>
                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: pathname === "/pricing" ? "#9BEA16" : "#F5F5F0",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  <span>Pricing</span>
                  <ArrowRight size={15} color="#8E8E93" />
                </Link>
              </div>

              {/* 5. Trust & Governance */}
              <div>
                <Link
                  href="/trust"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: pathname === "/trust" ? "#9BEA16" : "#F5F5F0",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  <span>Trust & Governance</span>
                  <ArrowRight size={15} color="#8E8E93" />
                </Link>
              </div>
            </div>

            {/* Bottom Action: Book a Demo */}
            <div style={{ marginTop: "24px" }}>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px",
                  borderRadius: "10px",
                  background: "#9BEA16",
                  color: "#000000",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 0 25px rgba(155, 234, 22, 0.4)",
                }}
              >
                <span>Book a demo</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

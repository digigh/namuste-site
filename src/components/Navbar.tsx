"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";

const industriesList = [
  { name: "Doctors & Clinics", path: "/industries/doctors-and-clinics", desc: "Priority 01 · Patient appointments & enquiry desk", isPriority: true },
  { name: "Professional Services", path: "/industries/professional-services", desc: "Priority 02 · Client intake for lawyers, accountants & consultants" },
  { name: "Distribution & Field", path: "/industries/distribution", desc: "Priority 03 · Retailer helplines & order tracking" },
  { name: "Agriculture & Rural", path: "/industries/agriculture", desc: "Priority 04 · Multilingual farmer & dealer support" },
  { name: "Education & Admissions", path: "/industries/education", desc: "Priority 05 · Student qualification & counselling bookings" },
  { name: "Research & Surveys", path: "/industries/research", desc: "Priority 06 · Structured multilingual voice interviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
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
        background: scrolled ? "rgba(5, 5, 5, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Official Brand Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src="/logo.png"
            alt="Namuste"
            style={{
              height: scrolled ? "36px" : "46px",
              width: "auto",
              display: "block",
              transition: "height 0.3s ease",
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
            gap: "32px",
          }}
        >
          <Link
            href="/product"
            style={{
              color: pathname === "/product" ? "var(--green)" : "var(--text-body)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            Product
          </Link>

          <Link
            href="/use-cases"
            style={{
              color: pathname.startsWith("/use-cases") ? "var(--green)" : "var(--text-body)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            Use Cases
          </Link>

          {/* Industries Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: pathname.startsWith("/industries") ? "var(--green)" : "var(--text-body)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "8px 0",
              }}
            >
              Industries
              <ChevronDown size={14} style={{ transform: industriesOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>

            {industriesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "-40px",
                  width: "360px",
                  background: "rgba(14, 14, 14, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  padding: "12px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  zIndex: 250,
                }}
              >
                {industriesList.map((ind) => (
                  <Link
                    key={ind.path}
                    href={ind.path}
                    onClick={() => setIndustriesOpen(false)}
                    style={{
                      textDecoration: "none",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: pathname === ind.path ? "rgba(118, 192, 67, 0.1)" : "transparent",
                      transition: "background 0.2s",
                      display: "block",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = pathname === ind.path ? "rgba(118, 192, 67, 0.1)" : "transparent")
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          fontSize: "13.5px",
                          fontWeight: ind.isPriority ? 700 : 500,
                          color: ind.isPriority ? "var(--green)" : "var(--text-ivory)",
                        }}
                      >
                        {ind.name}
                      </span>
                      {ind.isPriority && (
                        <span
                          style={{
                            fontSize: "10px",
                            textTransform: "uppercase",
                            padding: "2px 6px",
                            borderRadius: "999px",
                            background: "rgba(118, 192, 67, 0.15)",
                            color: "var(--green)",
                            fontWeight: 700,
                          }}
                        >
                          Flagship
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>{ind.desc}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/enterprise"
            style={{
              color: pathname === "/enterprise" ? "var(--green)" : "var(--text-body)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            Enterprise
          </Link>

          <Link
            href="/how-it-works"
            style={{
              color: pathname === "/how-it-works" ? "var(--green)" : "var(--text-body)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            How It Works
          </Link>

          <Link
            href="/about"
            style={{
              color: pathname === "/about" ? "var(--green)" : "var(--text-body)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            About
          </Link>
        </nav>

        {/* Action Button */}
        <div className="desktop-nav">
          <Link href="/contact" className="btn-primary" style={{ padding: "10px 20px", fontSize: "13.5px" }}>
            Book a Demo <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            color: "var(--text-ivory)",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "none",
          }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(8, 8, 8, 0.98)",
            borderBottom: "1px solid var(--border)",
            padding: "20px 24px 30px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <Link
            href="/product"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text-ivory)", textDecoration: "none", fontSize: "16px", padding: "8px 0" }}
          >
            Product
          </Link>
          <Link
            href="/use-cases"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text-ivory)", textDecoration: "none", fontSize: "16px", padding: "8px 0" }}
          >
            Use Cases
          </Link>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "10px" }}>
            <div style={{ fontSize: "12px", color: "var(--green)", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>
              Industries
            </div>
            {industriesList.map((ind) => (
              <Link
                key={ind.path}
                href={ind.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  color: ind.isPriority ? "var(--green)" : "var(--text-body)",
                  textDecoration: "none",
                  fontSize: "14.5px",
                  padding: "6px 0",
                  fontWeight: ind.isPriority ? 600 : 400,
                }}
              >
                {ind.name}
              </Link>
            ))}
          </div>
          <Link
            href="/enterprise"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text-ivory)", textDecoration: "none", fontSize: "16px", padding: "8px 0" }}
          >
            Enterprise
          </Link>
          <Link
            href="/how-it-works"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text-ivory)", textDecoration: "none", fontSize: "16px", padding: "8px 0" }}
          >
            How It Works
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--text-ivory)", textDecoration: "none", fontSize: "16px", padding: "8px 0" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary"
            style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}
          >
            Book a Demo <ArrowRight size={15} />
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function ProfessionsShowcaseExact() {
  const [activeTab, setActiveTab] = useState<string>("Doctors & Clinics");

  const tabs = [
    "Doctors & Clinics",
    "Lawyers",
    "Chartered Accountants",
    "Consultants",
    "Real Estate",
    "Education",
    "Distributors",
  ];

  const cards = [
    {
      img: "/hero-assets/doctor-card.jpg",
      title: "Doctors & Clinics",
      badgeText: "Appointment requested",
      badgeCount: 1,
      profession: "Healthcare Practice",
    },
    {
      img: "/hero-assets/lawyer-card.jpg",
      title: "Lawyers",
      badgeText: "Consultation qualified",
      badgeCount: 1,
      profession: "Legal Chambers",
    },
    {
      img: "/hero-assets/architect-card.jpg",
      title: "Architects & Designers",
      badgeText: "Project brief captured",
      badgeCount: 1,
      profession: "Design Studio",
    },
  ];

  return (
    <section
      id="professions-showcase"
      style={{
        minHeight: "95vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "130px 40px 110px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        {/* Editorial Headline from Screenshot 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: "800px", marginBottom: "40px" }}
        >
          <h2
            className="serif"
            style={{
              fontSize: "clamp(38px, 4.5vw, 66px)",
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#F5F5F0",
              marginBottom: "20px",
            }}
          >
            Different professions.<br />
            The same need for a <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>next step.</span>
          </h2>
        </motion.div>

        {/* Horizontal Tabs (Screenshot 4) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            paddingBottom: "16px",
            marginBottom: "48px",
            overflowX: "auto",
          }}
        >
          {tabs.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 0",
                  fontSize: "14.5px",
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? "#9BEA16" : "#8E8E93",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  position: "relative",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease",
                }}
              >
                {isSelected && (
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16", display: "inline-block" }} />
                )}
                <span>{tab}</span>
                {isSelected && (
                  <motion.div
                    layoutId="tabUnderline"
                    style={{
                      position: "absolute",
                      bottom: "-17px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#9BEA16",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 3 Cinematic Authentic Photographic Cards (Screenshot 4) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
          className="prof-exact-grid"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#080808",
                height: "460px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.9)",
                cursor: "pointer",
              }}
            >
              <img
                src={card.img}
                alt={card.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.92)",
                  transition: "transform 0.5s ease",
                }}
                className="prof-card-img"
              />

              {/* Gradient Scrim Overlay at Bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Floating Dark Glass Badge Tag (Exact from Screenshot 4) */}
              <div
                style={{
                  position: "absolute",
                  bottom: "28px",
                  right: "24px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  background: "rgba(10, 10, 10, 0.88)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: "1.5px solid #9BEA16",
                    color: "#9BEA16",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={11} strokeWidth={3} />
                </div>
                <span style={{ fontSize: "13px", color: "#F5F5F0", fontWeight: 500 }}>{card.badgeText}</span>
                <span style={{ width: "17px", height: "17px", borderRadius: "50%", background: "#F87171", color: "#000000", fontSize: "10.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {card.badgeCount}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Right Link (Screenshot 4) */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a
            href="#professions"
            style={{
              color: "#9BEA16",
              fontSize: "14.5px",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0px)")}
          >
            <span>Explore Every Profession</span>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid rgba(155, 234, 22, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowRight size={13} />
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .prof-exact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

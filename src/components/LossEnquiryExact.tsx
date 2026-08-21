"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function LossEnquiryExact() {
  const items = [
    {
      img: "/hero-assets/loss-phone.jpg",
      title: "Nobody",
      highlight: "answered.",
      delay: 0.1,
    },
    {
      img: "/hero-assets/loss-whatsapp.jpg",
      title: "Nobody",
      highlight: "understood.",
      delay: 0.25,
    },
    {
      img: "/hero-assets/loss-clock.jpg",
      title: "Nobody",
      highlight: "followed through.",
      delay: 0.4,
    },
  ];

  return (
    <section
      id="problem-loss"
      style={{
        minHeight: "85vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "130px 40px 110px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        {/* Editorial Headline from Screenshot 2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: "800px", marginBottom: "90px" }}
        >
          <h2
            className="serif"
            style={{
              fontSize: "clamp(36px, 4.4vw, 64px)",
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#F5F5F0",
              marginBottom: "20px",
            }}
          >
            The enquiry arrived.<br />
            The business did not respond.
          </h2>

          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 19px)",
              color: "#8E8E93",
              lineHeight: 1.6,
              fontFamily: "var(--font-sans)",
            }}
          >
            The loss happens in the space between interest and action.
          </p>
        </motion.div>

        {/* 3-Point Horizontal Progression Array with Connecting Dotted Line (Screenshot 2) */}
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px",
            alignItems: "flex-start",
            paddingTop: "20px",
          }}
          className="loss-grid"
        >
          {/* Subtle Horizontal Glowing Thread with Breathing Pulse */}
          <div
            style={{
              position: "absolute",
              top: "90px",
              left: "12%",
              right: "12%",
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(248, 113, 113, 0.5) 25%, rgba(248, 113, 113, 0.6) 50%, rgba(248, 113, 113, 0.5) 75%, transparent 100%)",
              boxShadow: "0 0 16px rgba(248, 113, 113, 0.3)",
              zIndex: 1,
            }}
          />

          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay }}
              whileHover={{ y: -6 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                zIndex: 2,
                cursor: "default",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "160px",
                  height: "160px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "28px",
                }}
              >
                {/* Ambient Backlight for 3D item */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(248, 113, 113, 0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <img
                  src={item.img}
                  alt={item.highlight}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "24px",
                    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                />

                {/* Coral Alert Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#F87171",
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 12px rgba(248, 113, 113, 0.8)",
                  }}
                >
                  <X size={13} strokeWidth={3} />
                </div>
              </div>

              <div style={{ fontSize: "16px", color: "#D4D0C7", fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}>
                {item.title} <span style={{ color: "#F87171", fontWeight: 600 }}>{item.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .loss-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
      `}</style>
    </section>
  );
}

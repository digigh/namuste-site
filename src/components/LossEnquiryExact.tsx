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
      className="loss-section-pad"
      style={{
        minHeight: "85vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
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

        {/* 3-Point Horizontal Progression Array with Connecting Line */}
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "flex-start",
            paddingTop: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
          className="loss-grid"
        >
          {/* Connecting Red Flow Line */}
          <div
            className="loss-connecting-line"
            style={{
              position: "absolute",
              top: "80px",
              left: "18%",
              right: "18%",
              height: "1.5px",
              background: "linear-gradient(90deg, rgba(248, 113, 113, 0.2) 0%, rgba(248, 113, 113, 0.7) 50%, rgba(248, 113, 113, 0.2) 100%)",
              zIndex: 1,
              pointerEvents: "none",
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
                width: "100%",
              }}
            >
              {/* 1. RINGING TELEPHONE ANIMATION */}
              {idx === 0 && (
                <div
                  className="loss-card-icon-wrap"
                  style={{
                    position: "relative",
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  {/* Acoustic Ring Shockwave Pulses */}
                  <motion.div
                    animate={{
                      scale: [0.95, 1.25, 1.4],
                      opacity: [0.6, 0.25, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                      repeatDelay: 0.6,
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "26px",
                      border: "2px solid rgba(248, 113, 113, 0.6)",
                      pointerEvents: "none",
                    }}
                  />
                  <motion.div
                    animate={{
                      scale: [0.95, 1.18, 1.3],
                      opacity: [0.5, 0.2, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.3,
                      repeatDelay: 0.6,
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "26px",
                      border: "1.5px solid rgba(248, 113, 113, 0.4)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Wobble / Vibration Ringing Motion on Telephone Image */}
                  <motion.div
                    animate={{
                      rotate: [0, -4, 4, -4, 4, -2, 2, 0, 0, 0, 0, 0],
                      scale: [1, 1.03, 0.98, 1.03, 1, 1, 1, 1, 1, 1, 1, 1],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      borderRadius: "22px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.highlight}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "22px",
                        boxShadow: "0 18px 40px rgba(0, 0, 0, 0.9)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    />
                  </motion.div>

                  {/* Coral Alert Tag with Pulse */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="loss-coral-x"
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
                      boxShadow: "0 0 14px rgba(248, 113, 113, 0.9)",
                      zIndex: 10,
                    }}
                  >
                    <X size={13} strokeWidth={3} />
                  </motion.div>
                </div>
              )}

              {/* 2. WHATSAPP POP-UP NOTIFICATION ANIMATION */}
              {idx === 1 && (
                <div
                  className="loss-card-icon-wrap"
                  style={{
                    position: "relative",
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  {/* Floating Notification Pop-up Motion */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0, -4, 0],
                      scale: [1, 1.05, 0.98, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      borderRadius: "22px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.highlight}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "22px",
                        boxShadow: "0 18px 40px rgba(0, 0, 0, 0.9)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    />
                    {/* Glowing WhatsApp Message Ping Radar */}
                    <motion.div
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.8, 1.15, 1.3],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.8,
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "22px",
                        background: "radial-gradient(circle, rgba(155, 234, 22, 0.25) 0%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                  </motion.div>

                  {/* Pop-up Unread Notification Badge */}
                  <motion.div
                    animate={{
                      scale: [0.8, 1.15, 1],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="loss-coral-x"
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
                      boxShadow: "0 0 14px rgba(248, 113, 113, 0.9)",
                      zIndex: 10,
                    }}
                  >
                    <X size={13} strokeWidth={3} />
                  </motion.div>
                </div>
              )}

              {/* 3. WORKING ROTATING CLOCK HANDS ANIMATION */}
              {idx === 2 && (
                <div
                  className="loss-card-icon-wrap"
                  style={{
                    position: "relative",
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.highlight}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "22px",
                      boxShadow: "0 18px 40px rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  />

                  {/* Working Moving Clock Hands HTML/CSS Engine */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "68px",
                      height: "68px",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  >
                    {/* Dark center dial mask over static photograph hands */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "2px",
                        borderRadius: "50%",
                        background: "#141416",
                        opacity: 0.95,
                      }}
                    />

                    {/* Hour Hand (24s cycle) */}
                    <div
                      className="clock-hand-hour"
                      style={{
                        position: "absolute",
                        bottom: "50%",
                        left: "calc(50% - 1.5px)",
                        width: "3px",
                        height: "17px",
                        background: "linear-gradient(to top, #C89D7C, #E8C3A4)",
                        borderRadius: "3px",
                        transformOrigin: "bottom center",
                        zIndex: 2,
                      }}
                    />

                    {/* Minute Hand (4s cycle) */}
                    <div
                      className="clock-hand-minute"
                      style={{
                        position: "absolute",
                        bottom: "50%",
                        left: "calc(50% - 1px)",
                        width: "2px",
                        height: "25px",
                        background: "linear-gradient(to top, #E8C3A4, #FFFFFF)",
                        borderRadius: "2px",
                        transformOrigin: "bottom center",
                        zIndex: 3,
                      }}
                    />

                    {/* Fast Sweeping Coral Second Hand (1.2s cycle) */}
                    <div
                      className="clock-hand-second"
                      style={{
                        position: "absolute",
                        bottom: "50%",
                        left: "calc(50% - 0.75px)",
                        width: "1.5px",
                        height: "29px",
                        background: "#F87171",
                        borderRadius: "1px",
                        transformOrigin: "bottom center",
                        zIndex: 4,
                        boxShadow: "0 0 4px rgba(248, 113, 113, 0.6)",
                      }}
                    />

                    {/* Central Anchored Bronze Pivot Pin */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#E8C3A4",
                        border: "1.5px solid #000000",
                        transform: "translate(-50%, -50%)",
                        zIndex: 5,
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.8)",
                      }}
                    />
                  </div>

                  {/* Coral Alert Tag */}
                  <div
                    className="loss-coral-x"
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
                      zIndex: 10,
                    }}
                  >
                    <X size={13} strokeWidth={3} />
                  </div>
                </div>
              )}

              <div
                className="loss-caption-text"
                style={{
                  fontSize: "15px",
                  color: "#D4D0C7",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.35,
                }}
              >
                {item.title}{" "}
                <span style={{ color: "#F87171", fontWeight: 600 }}>{item.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .loss-section-pad {
          padding: 130px 40px 110px;
        }

        @keyframes rotateClockHand {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .clock-hand-hour {
          animation: rotateClockHand 24s linear infinite;
        }

        .clock-hand-minute {
          animation: rotateClockHand 4s linear infinite;
        }

        .clock-hand-second {
          animation: rotateClockHand 1.2s linear infinite;
        }

        @media (max-width: 768px) {
          .loss-section-pad {
            padding: 56px 16px 40px !important;
          }
          .loss-section-pad h2 {
            font-size: 32px !important;
            margin-bottom: 12px !important;
          }
          .loss-grid {
            gap: 10px !important;
            padding-top: 10px !important;
          }
          .loss-connecting-line {
            top: 48px !important;
            left: 15% !important;
            right: 15% !important;
          }
          .loss-card-icon-wrap {
            width: 82px !important;
            height: 82px !important;
            margin-bottom: 12px !important;
          }
          .loss-card-icon-wrap img {
            border-radius: 16px !important;
          }
          .loss-coral-x {
            width: 17px !important;
            height: 17px !important;
            top: 5px !important;
            right: 5px !important;
          }
          .loss-coral-x svg {
            width: 10px !important;
            height: 10px !important;
          }
          .loss-caption-text {
            font-size: 11.5px !important;
          }
        }
        @media (max-width: 375px) {
          .loss-card-icon-wrap {
            width: 72px !important;
            height: 72px !important;
          }
          .loss-connecting-line {
            top: 42px !important;
          }
          .loss-caption-text {
            font-size: 10.5px !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, MessageSquare, Globe, Check, ChevronLeft, ChevronRight } from "lucide-react";

export default function HP04Professions() {
  const [selectedProf, setSelectedProf] = useState<string>("Doctors & Clinics");
  const [selectedChannel, setSelectedChannel] = useState<"voice" | "whatsapp" | "web">("voice");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const professions = [
    "Doctors & Clinics",
    "Lawyers",
    "Chartered Accountants",
    "Consultants",
    "Architects",
    "Real Estate",
    "Education",
    "Distributors",
  ];

  const cards = [
    {
      id: "Doctors & Clinics",
      title: "Doctors & Clinics",
      img: "/hero-assets/doctor-card.jpg",
      badge: "Appointment requested",
      count: 1,
      link: "/industries/doctors-and-clinics",
    },
    {
      id: "Lawyers",
      title: "Lawyers",
      img: "/hero-assets/lawyer-card.jpg",
      badge: "Consultation qualified",
      count: 1,
      link: "/industries/professional-services",
    },
    {
      id: "Architects",
      title: "Architects & Designers",
      img: "/hero-assets/architect-card.jpg",
      badge: "Project brief captured",
      count: 1,
      link: "/industries/professional-services",
    },
    {
      id: "Chartered Accountants",
      title: "Chartered Accountants",
      img: "/hero-assets/lawyer-card.jpg",
      badge: "Tax audit intake logged",
      count: 1,
      link: "/industries/professional-services",
    },
    {
      id: "Consultants",
      title: "Consultants & Advisory",
      img: "/hero-assets/lawyer-card.jpg",
      badge: "Advisory discovery locked",
      count: 1,
      link: "/industries/professional-services",
    },
    {
      id: "Real Estate",
      title: "Real Estate & Estates",
      img: "/hero-assets/architect-card.jpg",
      badge: "Private viewing reserved",
      count: 1,
      link: "/industries/professional-services",
    },
    {
      id: "Education",
      title: "Education & Academies",
      img: "/hero-assets/doctor-card.jpg",
      badge: "Campus tour confirmed",
      count: 1,
      link: "/industries/education",
    },
    {
      id: "Distributors",
      title: "Distributors & Supply",
      img: "/hero-assets/doctor-card.jpg",
      badge: "Commercial PO routed",
      count: 1,
      link: "/industries/distribution",
    },
  ];

  const professionData: Record<
    string,
    {
      img: string;
      badgeText: string;
      badgeCount: number;
      dialogue: { patient: string; namuste: string; outcome: string };
      link: string;
    }
  > = {
    "Doctors & Clinics": {
      img: "/hero-assets/doctor-card.jpg",
      badgeText: "Appointment requested",
      badgeCount: 1,
      dialogue: {
        patient: "Is Dr. Mehta available tomorrow evening around 5:30 PM for a cardiology follow-up?",
        namuste: "Namuste. Yes, Dr. Mehta has 5:30 PM available tomorrow. I have reserved this slot for you and sent your clinic instructions to WhatsApp.",
        outcome: "Appointment reserved • WhatsApp prep link dispatched",
      },
      link: "/industries/doctors-and-clinics",
    },
    "Lawyers": {
      img: "/hero-assets/lawyer-card.jpg",
      badgeText: "Consultation qualified",
      badgeCount: 1,
      dialogue: {
        patient: "I received a commercial lease termination notice and need to consult Senior Advocate Sharma.",
        namuste: "Advocate Sharma takes commercial property disputes on Thursday at 3:00 PM (Initial fee ₹3,500). May I lock this consultation for you?",
        outcome: "Legal intake captured • Document upload link sent",
      },
      link: "/industries/professional-services",
    },
    "Architects": {
      img: "/hero-assets/architect-card.jpg",
      badgeText: "Project brief captured",
      badgeCount: 1,
      dialogue: {
        patient: "We are developing a 4,500 sq ft villa in Alibaug and want to schedule a design briefing.",
        namuste: "Wonderful. Principal Architect Ananya conducts villa discovery reviews on Fridays at 4 PM. I have logged your plot dimensions.",
        outcome: "Site brief logged • Studio discovery session scheduled",
      },
      link: "/industries/professional-services",
    },
    "Chartered Accountants": {
      img: "/hero-assets/lawyer-card.jpg",
      badgeText: "Tax audit intake logged",
      badgeCount: 1,
      dialogue: {
        patient: "We need GST reconciliation and advance tax filing before the 15th.",
        namuste: "Senior Tax Partner Verma has a preliminary audit review open on Wednesday at 11:30 AM. I have sent our secure portal link.",
        outcome: "Audit window assigned • Ledger checklist dispatched",
      },
      link: "/industries/professional-services",
    },
    "Consultants": {
      img: "/hero-assets/lawyer-card.jpg",
      badgeText: "Advisory discovery locked",
      badgeCount: 1,
      dialogue: {
        patient: "We want a 3-month supply chain cost audit for our manufacturing line.",
        namuste: "Managing Partner Rohit conducts industrial operations discovery calls on Tuesdays. I have logged your company turnover details.",
        outcome: "NDA dispatched • Partner discovery meeting confirmed",
      },
      link: "/industries/professional-services",
    },
    "Real Estate": {
      img: "/hero-assets/architect-card.jpg",
      badgeText: "Private viewing reserved",
      badgeCount: 1,
      dialogue: {
        patient: "Are there 3BHK penthouses with sea view available for site visit this Saturday?",
        namuste: "Yes, Tower B Penthouse 1802 is open for private preview at 11:00 AM. Relationship Manager Kabir will receive you with parking access.",
        outcome: "Viewing pass generated • Sales RM alerted",
      },
      link: "/industries/professional-services",
    },
    "Education": {
      img: "/hero-assets/doctor-card.jpg",
      badgeText: "Campus tour confirmed",
      badgeCount: 1,
      dialogue: {
        patient: "What is the admissions deadline and fee structure for Grade 11 IB Diploma?",
        namuste: "Admissions for IB DP close on March 31st. I have scheduled your campus briefing with Admissions Head Meera for Saturday at 10 AM.",
        outcome: "Prospectus sent • Admissions tour booked",
      },
      link: "/industries/education",
    },
    "Distributors": {
      img: "/hero-assets/doctor-card.jpg",
      badgeText: "Commercial PO routed",
      badgeCount: 1,
      dialogue: {
        patient: "Need 40 metric tonnes of 0.8mm Galvanized Coil for dispatch to Pune Plant 2.",
        namuste: "Plant Line 2 has immediate stock. I have generated Commercial Quote #PO-8812 and notified Regional Sales Lead Alok for dispatch.",
        outcome: "SAP stock held • Invoice routed to dispatch desk",
      },
      link: "/industries/distribution",
    },
  };

  const current = professionData[selectedProf] || professionData["Doctors & Clinics"];

  const scrollToCard = (id: string) => {
    setSelectedProf(id);
    const index = cards.findIndex((c) => c.id === id);
    if (carouselRef.current && index !== -1) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const cardWidth = isMobile ? window.innerWidth * 0.82 + 16 : 380 + 24;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const offset = isMobile ? -window.innerWidth * 0.82 : -400;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const offset = isMobile ? window.innerWidth * 0.82 : 400;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const isMobile = window.innerWidth < 768;
          const step = isMobile ? window.innerWidth * 0.82 + 16 : 404;
          carouselRef.current.scrollBy({ left: step, behavior: "smooth" });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="hp-04"
      className="hp04-section-pad"
      style={{
        minHeight: "95vh",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#8E8E93",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          One Role. Many Professions.
        </div>

        <div style={{ maxWidth: "840px", marginBottom: "36px" }}>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(38px, 4.5vw, 66px)",
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#F5F5F0",
              marginBottom: "16px",
            }}
          >
            Different professions.<br />
            The same need for a <span className="serif-italic" style={{ color: "#9BEA16", fontWeight: 400 }}>next step.</span>
          </h2>
        </div>

        <div
          className="touch-scroll hp04-tabs-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            paddingBottom: "16px",
            marginBottom: "20px",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {professions.map((tab) => {
            const isSelected = selectedProf === tab;
            return (
              <button
                key={tab}
                onClick={() => scrollToCard(tab)}
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
                  flexShrink: 0,
                }}
              >
                {isSelected && (
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9BEA16", display: "inline-block" }} />
                )}
                <span>{tab}</span>
                {isSelected && (
                  <motion.div
                    layoutId="profTabUnderline"
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

        {/* 2. Channel Selector Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "#8E8E93", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>
              Choose a channel:
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { id: "voice" as const, label: "Voice", icon: PhoneCall },
                { id: "whatsapp" as const, label: "WhatsApp", icon: MessageSquare },
                { id: "web" as const, label: "Web", icon: Globe },
              ].map((ch) => {
                const Icon = ch.icon;
                const active = selectedChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background: active ? "rgba(155, 234, 22, 0.15)" : "rgba(255, 255, 255, 0.04)",
                      color: active ? "#9BEA16" : "#A1A1AA",
                      border: `1px solid ${active ? "rgba(155, 234, 22, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                    }}
                  >
                    <Icon size={12} />
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Arrows (Visible ONLY on Mobile) */}
          <div className="prof-mobile-arrows" style={{ alignItems: "center", gap: "8px" }}>
            <button
              onClick={scrollLeft}
              aria-label="Previous slide"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#F5F5F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next slide"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#F5F5F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 3A. DESKTOP VIEW: Authentic 3-Card Cinematic Visual Grid (Visible on >= 769px) */}
        <div
          className="prof-desktop-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {[
            {
              title: "Doctors & Clinics",
              img: "/hero-assets/doctor-card.jpg",
              badge: "Appointment requested",
              count: 1,
            },
            {
              title: "Lawyers",
              img: "/hero-assets/lawyer-card.jpg",
              badge: "Consultation qualified",
              count: 1,
            },
            {
              title: "Architects & Designers",
              img: "/hero-assets/architect-card.jpg",
              badge: "Project brief captured",
              count: 1,
            },
          ].map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#080808",
                height: "440px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
                cursor: "pointer",
              }}
              onClick={() => setSelectedProf(c.title === "Architects & Designers" ? "Architects" : c.title)}
            >
              <img
                src={c.img}
                alt={c.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.92)",
                }}
              />
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
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  right: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(10, 10, 10, 0.88)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  backdropFilter: "blur(16px)",
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
                <span style={{ fontSize: "12.5px", color: "#F5F5F0", fontWeight: 500 }}>{c.badge}</span>
                <span style={{ width: "17px", height: "17px", borderRadius: "50%", background: "#F87171", color: "#000000", fontSize: "10.5px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {c.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3B. MOBILE VIEW: Moving Touch Carousel (Visible ONLY on < 769px) */}
        <div
          ref={carouselRef}
          className="touch-scroll prof-mobile-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          style={{
            display: "none",
            gap: "18px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "16px",
            marginBottom: "32px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {cards.map((c, i) => {
            const isCardActive = selectedProf === c.id;
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#080808",
                  height: "380px",
                  width: "82vw",
                  minWidth: "82vw",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  border: `1px solid ${isCardActive ? "rgba(155, 234, 22, 0.5)" : "rgba(255, 255, 255, 0.08)"}`,
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
                onClick={() => setSelectedProf(c.id)}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.92)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "55%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "rgba(10, 10, 10, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(12px)",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    color: isCardActive ? "#9BEA16" : "#F5F5F0",
                  }}
                >
                  {c.title}
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 12px",
                    borderRadius: "10px",
                    background: "rgba(10, 10, 10, 0.88)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: "1.5px solid #9BEA16",
                      color: "#9BEA16",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: "11.5px", color: "#F5F5F0", fontWeight: 500 }}>{c.badge}</span>
                  <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#F87171", color: "#000000", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {c.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            href={current.link}
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
          >
            <span>Give Namuste a profession</span>
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
          </Link>
        </div>
      </div>

      <style>{`
        .hp04-section-pad {
          padding: 130px 40px 110px;
        }
        .prof-mobile-arrows {
          display: none;
        }
        .prof-desktop-grid {
          display: grid;
        }
        .prof-mobile-carousel {
          display: none;
        }
        .prof-mobile-carousel::-webkit-scrollbar {
          display: none;
        }
        .prof-mobile-carousel {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 768px) {
          .hp04-section-pad {
            padding: 56px 16px 40px !important;
          }
          .prof-desktop-grid {
            display: none !important;
          }
          .prof-mobile-carousel {
            display: flex !important;
          }
          .prof-mobile-arrows {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}

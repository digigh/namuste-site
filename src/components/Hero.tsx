"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconLeaf, IconBox, IconCoin, IconShield } from "./Icons";
import { MapPin, KeyRound, BrainCircuit, Briefcase, ShieldCheck, Store, Shield, QrCode } from "lucide-react";

// Floating stars array for visual background decoration
const stars = [
  { x: "5%", y: "9%", s: 2, d: 0 },
  { x: "14%", y: "5%", s: 1, d: 0.5 },
  { x: "24%", y: "13%", s: 2, d: 1.1 },
  { x: "76%", y: "10%", s: 2, d: 0.7 },
  { x: "86%", y: "4%", s: 1, d: 1.4 },
  { x: "94%", y: "12%", s: 2, d: 0.3 },
  { x: "3%", y: "38%", s: 1, d: 0.6 },
  { x: "97%", y: "35%", s: 2, d: 0.9 },
];

const slides = [
  {
    id: 0,
    subtitle: "Universal Channel Intelligence",
    titleGT: "The Offline-First Counter OS",
    titleRest: "for Rural Merchants.",
    desc: "A purpose-built offline-first device running custom Counter OS. Replaces paper ledgers with integrated scans, verified brand programs, and automatic inventory synchronization.",
    ctaText: "Book a Counter Demo",
    ctaLink: "/contact",
    stats: [
      { v: "10K+", l: "Devices Deployed" },
      { v: "99.8%", l: "Sync Uptime" },
      { v: "4.8★", l: "Play Store Rating" }
    ],
    accent: "var(--accent-green)",
    glow: "var(--green-glow)"
  },
  {
    id: 1,
    subtitle: "Brand Schemes & Campaigns",
    titleGT: "Zero Scheme Leakage,",
    titleRest: "100% Direct Payouts.",
    desc: "Launch volume-based B2B promotions directly to retail counters. Track budget utilization, simulate ROI, and verify campaign redemptions with cryptographic security.",
    ctaText: "Configure Brand Program",
    ctaLink: "/contact",
    stats: [
      { v: "₹12 Cr", l: "Leakage Saved" },
      { v: "<10s", l: "Verification Speed" },
      { v: "100%", l: "Fulfillment Safety" }
    ],
    accent: "var(--gold)",
    glow: "var(--gold-glow)"
  },
  {
    id: 2,
    subtitle: "B2B Wholesaler Distribution",
    titleGT: "OTP-Verified Delivery",
    titleRest: "and Wallet Cashbacks.",
    desc: "Eliminate shipping disputes. Distributors collect delivery OTPs, triggering instant wallet payouts, automated inventory updates, and retailer rewards directly at the counter.",
    ctaText: "Join Distributor Network",
    ctaLink: "/contact",
    stats: [
      { v: "₹48L", l: "Avg Route Turnaround" },
      { v: "0", l: "Disputed Deliveries" },
      { v: "2,400+", l: "Linked Wholesalers" }
    ],
    accent: "var(--gold)",
    glow: "var(--gold-glow)"
  },
  {
    id: 3,
    subtitle: "Enterprise Operations Control",
    titleGT: "Real-time Purchase Data",
    titleRest: "and Fraud Safeguards.",
    desc: "Monitor your entire network's sales velocity, village density, and product margins. Identify duplicates and claim abuse instantly using on-device AI engines.",
    ctaText: "Request Custom BI Demo",
    ctaLink: "/contact",
    stats: [
      { v: "4.2M", l: "Daily SKU Transactions" },
      { v: "142", l: "Active Territory Maps" },
      { v: "24/7", l: "Automated Fraud Scans" }
    ],
    accent: "var(--gold)",
    glow: "var(--gold-glow)"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Slide 1 (Simulator) State
  const [s1ActiveProduct, setS1ActiveProduct] = useState<"seeds" | "pharma" | "kirana" | null>(null);
  const [s1ScanState, setS1ScanState] = useState<"idle" | "scanning" | "success">("idle");
  const [s1Ledger, setS1Ledger] = useState<string[]>([
    "17:01:05 [POS] Ready for transaction...",
    "17:01:22 [POS] Cashier mode: offline-ledger loaded"
  ]);

  // Slide 2 (Brand Campaign Switchboard) State
  const [s2Geofence, setS2Geofence] = useState(false);
  const [s2Otp, setS2Otp] = useState(false);
  const [s2AiAudit, setS2AiAudit] = useState(false);

  // Slide 3 (OTP Keypad) State
  const [otpInput, setOtpInput] = useState("");
  const [otpStatus, setOtpStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [stockLevel, setStockLevel] = useState(420);

  // Slide 4 (HQ Analytics Map) State
  const [hqLogs, setHqLogs] = useState<string[]>([
    "17:10:05 [HQ] Central operations system connected",
    "17:10:14 [HQ] Burdwan node: SKU audit synced successfully",
    "17:10:28 [HQ] Raipur Chemist: B2B voucher claimed (Verified)"
  ]);

  // Auto-play slide transitions
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [autoPlay, currentSlide]);

  // Slides reveal automatically on mount via CSS animations.

  // Background activity feed simulation for Slide 4
  useEffect(() => {
    const locations = ["Hooghly", "Burdwan", "Raipur", "Siliguri", "Midnapore", "Kolkata"];
    const SKU = ["Crop Fertilizer", "FMCG Carton", "Zinc Multi-pack", "Herbicide Seed Case"];
    
    const interval = setInterval(() => {
      if (currentSlide === 3) {
        const randLoc = locations[Math.floor(Math.random() * locations.length)];
        const randSKU = SKU[Math.floor(Math.random() * SKU.length)];
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        
        setHqLogs((prev) => [
          `${timeStr} [HQ] ${randLoc} Counter: ${randSKU} sold. Margin verified.`,
          ...prev.slice(0, 7)
        ]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Click handler to trigger scans in Slide 1
  const triggerScan = (productType: "seeds" | "pharma" | "kirana") => {
    setS1ActiveProduct(productType);
    setS1ScanState("scanning");
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    
    setS1Ledger((prev) => [
      `${timeStr} [SCAN] Triggered scan for ${productType}...`,
      ...prev
    ]);

    setTimeout(() => {
      setS1ScanState("success");
      const payoutMap = { seeds: "₹150 (Crop Scheme)", pharma: "₹450 (Chemist Deal)", kirana: "₹85 (FMCG Margin)" };
      
      setS1Ledger((prev) => [
        `${timeStr} [SUCCESS] Reward unlocked: ${payoutMap[productType]}`,
        `${timeStr} [SYNC] Offline database entry committed`,
        ...prev
      ]);
    }, 1400);
  };

  // Keypad click handler for Slide 3
  const handleKeypadPress = (val: string) => {
    if (otpStatus === "success") return;
    setOtpStatus("idle");
    
    if (val === "C") {
      setOtpInput("");
    } else {
      if (otpInput.length < 4) {
        const nextVal = otpInput + val;
        setOtpInput(nextVal);
        
        // Auto-check if 4 digits
        if (nextVal === "4096") {
          setOtpStatus("verifying");
          setTimeout(() => {
            setOtpStatus("success");
            setStockLevel((prev) => prev + 100);
          }, 1200);
        } else if (nextVal.length === 4) {
          setOtpStatus("verifying");
          setTimeout(() => {
            setOtpStatus("error");
          }, 1000);
        }
      }
    }
  };

  // Fraud injector for Slide 4
  const injectFraud = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    setHqLogs((prev) => [
      `${timeStr} [WARN] CLAIM ABUSE: Duplicate redemption attempt in Hooghly!`,
      `${timeStr} [SECURITY] Threat blocked in 0.38s (256-bit hash mismatch)`,
      ...prev
    ]);
  };

  const currentAccent = slides[currentSlide].accent;

  // Slide 2 Dynamic Calculations
  const activeFiltersCount = (s2Geofence ? 1 : 0) + (s2Otp ? 1 : 0) + (s2AiAudit ? 1 : 0);
  let projectedROI = "1.15x";
  let leakageLosses = "₹4,95,000";
  let securityStatus = "VULNERABLE (HIGH RISK)";
  let safetyColor = "#f87171"; // red
  let safetyWidth = "15%";
  let safetyMsg = "Vulnerable to duplicate voucher claims and wholesale diversion.";

  if (activeFiltersCount === 1) {
    projectedROI = "1.60x";
    leakageLosses = "₹2,95,000";
    securityStatus = "MODERATE SECURITY";
    safetyColor = "var(--gold)";
    safetyWidth = "45%";
    safetyMsg = "Geographic or channel checks active. Minor leakages blocked.";
  } else if (activeFiltersCount === 2) {
    projectedROI = "2.10x";
    leakageLosses = "₹1,35,000";
    securityStatus = "HIGH SECURITY";
    safetyColor = "#60a5fa"; // blue
    safetyWidth = "75%";
    safetyMsg = "Dual verification rules active. Protection is strongly enhanced.";
  } else if (activeFiltersCount === 3) {
    projectedROI = "2.50x";
    leakageLosses = "₹0";
    securityStatus = "MAXIMUM SECURITY (SECURED)";
    safetyColor = "var(--accent-green)";
    safetyWidth = "100%";
    safetyMsg = "100% cryptographic coverage. No budget leakage detected.";
  }

  return (
    <section id="product" style={{
      minHeight: "95vh",
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      paddingTop: "150px",
      paddingBottom: "60px"
    }}>
      {/* Decorative radial glows */}
      <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "min(900px,100vw)", height: "600px", borderRadius: "50%", background: `radial-gradient(ellipse, ${slides[currentSlide].glow} 0%, transparent 70%)`, pointerEvents: "none", transition: "all 0.8s" }} />
      <div className="line-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.7 }} />
      
      {stars.map((s, i) => (
        <div key={i} className="aStar" style={{
          position: "absolute", left: s.x, top: s.y, width: s.s, height: s.s, borderRadius: "50%",
          background: i % 2 === 0 ? "var(--accent-green)" : "var(--gold)",
          animationDelay: `${s.d}s`, pointerEvents: "none"
        }} />
      ))}

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 10 }}>
        
        {/* Dynamic Carousel Slide Indicator Navigation */}
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px", marginBottom: "40px" }} className="slide-reveal">
          {slides.map((s) => (
            <button
              key={s.id}
              onClick={() => { setCurrentSlide(s.id); }}
              style={{
                background: currentSlide === s.id ? currentAccent : "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "8px 16px",
                fontSize: "11px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all .3s ease",
                color: currentSlide === s.id ? "var(--bg)" : "var(--ink2)",
                boxShadow: currentSlide === s.id ? `0 0 16px ${s.glow}` : "none",
              }}
            >
              {s.subtitle}
            </button>
          ))}
        </div>

        {/* -------------------------------------------------------------
            SLIDE 1 LAYOUT: Swapped (Simulator LEFT, Copy RIGHT)
            ------------------------------------------------------------- */}
        {currentSlide === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "60px", alignItems: "center" }} className="hero-grid">
            
            {/* LEFT COLUMN: Landscape Tablet POS Simulator */}
            <div className="slide-reveal-l" onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)} style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <div style={{
                width: "100%", maxWidth: "520px", height: "340px", borderRadius: "24px",
                background: "linear-gradient(135deg, var(--bg3) 0%, var(--surface) 100%)",
                border: "6px solid var(--border2)", padding: "16px", boxShadow: "var(--shadow)",
                position: "relative", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "12px"
              }}>
                {/* Tablet Camera sensor at the top bezel */}
                <div style={{
                  position: "absolute", top: "5px", left: "50%", transform: "translateX(-50%)",
                  width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.15)"
                }} />

                {/* LEFT GRID: Store Catalog */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "9px", color: "var(--ink2)", textTransform: "uppercase", fontWeight: "bold", display: "block", marginBottom: "2px" }}>Store Catalog</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {([
                      { id: "seeds", label: "Seed Bag", category: "Agri-input", img: "/prod-seeds.png" },
                      { id: "pharma", label: "Pharma", category: "Crop Medicine", img: "/prod-pharma.png" },
                      { id: "kirana", label: "FMCG Box", category: "Groceries", img: "/prod-fmcg.png" }
                    ] as const).map((p, idx) => (
                      <button 
                        key={p.id} 
                        onClick={() => triggerScan(p.id)} 
                        style={{
                          background: s1ActiveProduct === p.id ? "rgba(82,204,79,0.06)" : "var(--surface)",
                          border: s1ActiveProduct === p.id ? "1px solid var(--accent-green)" : "1px solid var(--border)",
                          borderRadius: "8px", padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", 
                          textAlign: "left", transition: "all 0.2s", position: "relative", overflow: "hidden",
                          animation: `slideRevealL 0.4s ease forwards ${idx * 0.1}s`, opacity: 0
                        }}
                      >
                        {/* Image Frame */}
                        <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", background: "#050905", border: "1px solid var(--border)", flexShrink: 0 }}>
                          <img src={p.img} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        {/* Text Frame */}
                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                          <span style={{ fontSize: "11px", fontWeight: "bold", color: "#fff" }}>{p.label}</span>
                          <span style={{ fontSize: "8.5px", color: "var(--ink2)" }}>{p.category}</span>
                        </div>
                        {/* Scan Action Text */}
                        <span style={{
                          fontSize: "8.5px", fontWeight: "bold",
                          color: s1ActiveProduct === p.id ? "var(--accent-green)" : "var(--ink2)",
                          background: s1ActiveProduct === p.id ? "rgba(82,204,79,0.12)" : "rgba(255,255,255,0.02)",
                          padding: "3px 6px", borderRadius: "4px", border: s1ActiveProduct === p.id ? "1px solid var(--accent-green)" : "1px solid var(--border)"
                        }}>
                          {s1ActiveProduct === p.id && s1ScanState === "success" ? "Audited ✓" : "Scan"}
                        </span>

                        {/* Local card sweep scan lines */}
                        {s1ActiveProduct === p.id && s1ScanState === "scanning" && (
                          <div style={{
                            position: "absolute", left: 0, right: 0, height: "2px",
                            background: "var(--accent-green)", boxShadow: "0 0 8px var(--accent-green)",
                            animation: "scan-line 0.8s ease-in-out infinite alternate"
                          }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT GRID: Tablet Scanner View & Printer Logs */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%", borderLeft: "1px solid var(--border)", paddingLeft: "12px" }}>
                  
                  {/* Scanner monitor screen */}
                  <div style={{
                    position: "relative", background: "var(--bg)", border: "1px solid var(--border)",
                    borderRadius: "12px", padding: "10px", flexGrow: 1, minHeight: "110px",
                    overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                  }}>
                    {/* Selected product background image */}
                    {s1ScanState !== "idle" && s1ActiveProduct && (
                      <img 
                        src={s1ActiveProduct === "seeds" ? "/prod-seeds.png" : s1ActiveProduct === "pharma" ? "/prod-pharma.png" : "/prod-fmcg.png"} 
                        alt="Product scan feed" 
                        style={{
                          position: "absolute", inset: 0, width: "100%", height: "100%", 
                          objectFit: "cover", opacity: 0.28, filter: "grayscale(25%) contrast(110%) brightness(40%)",
                          transition: "all 0.3s ease"
                        }}
                      />
                    )}

                    {s1ScanState === "scanning" && (
                      <div style={{
                        position: "absolute", left: 0, right: 0, height: "3px",
                        background: "var(--accent-green)", boxShadow: "0 0 12px var(--accent-green)",
                        animation: "scan-line 1.4s ease-in-out infinite alternate", zIndex: 6
                      }} />
                    )}

                    {s1ScanState === "idle" && (
                      <div style={{ textAlign: "center", zIndex: 5 }}>
                        <span style={{ fontSize: "20px", display: "block", marginBottom: "4px" }}>📷</span>
                        <p style={{ fontSize: "9px", fontWeight: "bold", color: "var(--ink2)", textTransform: "uppercase" }}>SELECT A PRODUCT CARD TO SCAN</p>
                      </div>
                    )}

                    {s1ScanState === "scanning" && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 5 }}>
                        <div style={{
                          border: "2px solid var(--accent-green)", padding: "8px", borderRadius: "8px",
                          background: "rgba(0,0,0,0.75)", boxShadow: "0 0 16px rgba(82,204,79,0.35)",
                          animation: "blink 1s infinite alternate"
                        }}>
                          <QrCode size={38} color="var(--accent-green)" />
                        </div>
                        <p style={{ fontSize: "9px", fontWeight: "bold", color: "var(--accent-green)", animation: "blink 0.8s infinite" }}>VERIFYING QR CODE...</p>
                      </div>
                    )}

                    {s1ScanState === "success" && (
                      <div style={{
                        zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                        background: "rgba(5,9,5,0.88)", border: "1px solid rgba(82,204,79,0.22)",
                        padding: "10px 14px", borderRadius: "12px", animation: "slideReveal 0.35s ease",
                        boxShadow: "var(--shadow)", textAlign: "center"
                      }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(82,204,79,0.15)", color: "var(--accent-green)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, marginBottom: 2, border: "1px solid var(--accent-green)" }}>✓</div>
                        <p style={{ fontSize: "11px", fontWeight: "bold", color: "var(--accent-green)" }}>SCHEME VERIFIED</p>
                        <p style={{ fontSize: "9.5px", color: "var(--gold)", fontWeight: "bold", marginTop: "2px" }}>
                          {s1ActiveProduct === "seeds" && "+₹150 Seeds Payout"}
                          {s1ActiveProduct === "pharma" && "+₹450 Chemist Scheme"}
                          {s1ActiveProduct === "kirana" && "+₹85 FMCG Margin"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Printer Ledger logs */}
                  <div style={{ height: "90px", background: "#000", borderRadius: "8px", padding: "6px", fontFamily: "monospace", fontSize: "7.5px", color: "#a5d6a7", display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
                    {s1Ledger.slice(0, 5).map((log, index) => (
                      <div key={index} style={{ opacity: Math.max(0.3, 1 - index * 0.18), whiteSpace: "nowrap" }}>{log}</div>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Copy details */}
            <div className="slide-reveal-r">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${currentAccent})` }} />
                <span style={{ color: currentAccent, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
                  {slides[currentSlide].subtitle}
                </span>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${currentAccent}, transparent)` }} />
              </div>

              <h1 className="hf" style={{ color: "var(--ink)", fontSize: "clamp(30px, 4.8vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1.2px", marginBottom: "20px" }}>
                The Offline-First <span className="gt">Counter OS</span> for Rural Trade.
              </h1>

              <p style={{ color: "var(--ink2)", fontSize: "14.5px", lineHeight: 1.75, marginBottom: "32px", maxWidth: "520px" }}>
                {slides[currentSlide].desc}
              </p>

              <div style={{ display: "flex", gap: 14, marginBottom: "48px" }} className="hero-actions">
                <Link href={slides[currentSlide].ctaLink} className="btn-green">
                  {slides[currentSlide].ctaText}
                </Link>
                <Link href="/platform" className="btn-ghost">Explore Modules →</Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
                {slides[currentSlide].stats.map((st) => (
                  <div key={st.l}>
                    <div className="hf" style={{ fontSize: "24px", fontWeight: 900, color: "var(--ink)", marginBottom: "4px" }}>{st.v}</div>
                    <div style={{ color: "var(--ink2)", fontSize: "11px", fontWeight: 500 }}>{st.l}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            SLIDE 2 LAYOUT: Centered Top-Bottom Stack
            ------------------------------------------------------------- */}
        {currentSlide === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "44px", alignItems: "center" }} className="slide-reveal">
            
            {/* TOP SECTION: Centered Copy & Stats */}
            <div style={{ textAlign: "center", maxWidth: "800px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${currentAccent})` }} />
                <span style={{ color: currentAccent, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
                  {slides[currentSlide].subtitle}
                </span>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${currentAccent}, transparent)` }} />
              </div>

              <h1 className="hf" style={{ color: "var(--ink)", fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "16px" }}>
                Launch B2B Schemes with <span style={{ background: "linear-gradient(90deg,var(--gold),#f5b800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Zero Leakage.</span>
              </h1>

              <p style={{ color: "var(--ink2)", fontSize: "14.5px", lineHeight: 1.7, marginBottom: "24px", maxWidth: "600px", margin: "0 auto 28px" }}>
                {slides[currentSlide].desc}
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: "28px" }}>
                <Link href={slides[currentSlide].ctaLink} className="btn-green" style={{ background: `linear-gradient(135deg, ${currentAccent}, var(--accent-green-deep))` }}>
                  {slides[currentSlide].ctaText}
                </Link>
                <Link href="/platform" className="btn-ghost">Explore Modules →</Link>
              </div>

              {/* Stats Row */}
              <div style={{ display: "flex", justifyContent: "center", gap: "60px", borderTop: "1px solid var(--border)", paddingTop: "20px", maxWidth: "540px", margin: "0 auto" }}>
                {slides[currentSlide].stats.map((st) => (
                  <div key={st.l} style={{ textAlign: "center" }}>
                    <div className="hf" style={{ fontSize: "24px", fontWeight: 900, color: "var(--gold)" }}>{st.v}</div>
                    <div style={{ color: "var(--ink2)", fontSize: "10.5px", fontWeight: 500 }}>{st.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM SECTION: Flat Wide Cockpit Console */}
            <div onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)} style={{ width: "100%", maxWidth: "900px" }}>
              <div style={{
                background: "var(--card-bg)", border: "1px solid var(--border2)",
                padding: "28px", borderRadius: "24px", boxShadow: "var(--shadow)",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center"
              }} className="hero-grid">
                
                {/* Cockpit Left: Rules Switchboard */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <h4 className="hf" style={{ fontSize: "14px", fontWeight: "bold", color: "#fff", marginBottom: "4px" }}>B2B Scheme Security Rules</h4>
                    <p style={{ fontSize: "11.5px", color: "var(--ink2)" }}>Toggle active verification guards to patch leakage routes and optimize ROI.</p>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {/* Toggle 1: Geofenced verification */}
                    <button 
                      onClick={() => setS2Geofence(!s2Geofence)}
                      style={{
                        background: s2Geofence ? "rgba(82,204,79,0.06)" : "var(--bg3)",
                        border: s2Geofence ? "1px solid var(--accent-green)" : "1px solid var(--border)",
                        borderRadius: "12px", padding: "12px 16px", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        transition: "all 0.25s"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <MapPin size={16} color={s2Geofence ? "var(--accent-green)" : "var(--ink2)"} />
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: "11px", fontWeight: "bold", color: s2Geofence ? "var(--accent-green)" : "#fff" }}>Geofenced Counter Match</div>
                          <div style={{ fontSize: "9px", color: "var(--ink2)" }}>Restricts payouts to verified retailer coordinates</div>
                        </div>
                      </div>
                      {/* Switch toggle pill */}
                      <div style={{
                        width: "36px", height: "20px", borderRadius: "10px",
                        background: s2Geofence ? "var(--accent-green-deep)" : "#333",
                        padding: "2px", position: "relative", display: "flex", alignItems: "center",
                        transition: "all 0.2s"
                      }}>
                        <div style={{
                          width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                          transform: s2Geofence ? "translateX(16px)" : "translateX(0)",
                          transition: "all 0.2s"
                        }} />
                      </div>
                    </button>

                    {/* Toggle 2: Cryptographic OTP */}
                    <button 
                      onClick={() => setS2Otp(!s2Otp)}
                      style={{
                        background: s2Otp ? "rgba(82,204,79,0.06)" : "var(--bg3)",
                        border: s2Otp ? "1px solid var(--accent-green)" : "1px solid var(--border)",
                        borderRadius: "12px", padding: "12px 16px", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        transition: "all 0.25s"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <KeyRound size={16} color={s2Otp ? "var(--accent-green)" : "var(--ink2)"} />
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: "11px", fontWeight: "bold", color: s2Otp ? "var(--accent-green)" : "#fff" }}>Cryptographic OTP Validation</div>
                          <div style={{ fontSize: "9px", color: "var(--ink2)" }}>Checks delivery OTP before releasing fund payouts</div>
                        </div>
                      </div>
                      <div style={{
                        width: "36px", height: "20px", borderRadius: "10px",
                        background: s2Otp ? "var(--accent-green-deep)" : "#333",
                        padding: "2px", position: "relative", display: "flex", alignItems: "center",
                        transition: "all 0.2s"
                      }}>
                        <div style={{
                          width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                          transform: s2Otp ? "translateX(16px)" : "translateX(0)",
                          transition: "all 0.2s"
                        }} />
                      </div>
                    </button>

                    {/* Toggle 3: AI Audit */}
                    <button 
                      onClick={() => setS2AiAudit(!s2AiAudit)}
                      style={{
                        background: s2AiAudit ? "rgba(82,204,79,0.06)" : "var(--bg3)",
                        border: s2AiAudit ? "1px solid var(--accent-green)" : "1px solid var(--border)",
                        borderRadius: "12px", padding: "12px 16px", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        transition: "all 0.25s"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <BrainCircuit size={16} color={s2AiAudit ? "var(--accent-green)" : "var(--ink2)"} />
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: "11px", fontWeight: "bold", color: s2AiAudit ? "var(--accent-green)" : "#fff" }}>AI Bill De-duplication</div>
                          <div style={{ fontSize: "9px", color: "var(--ink2)" }}>Scans bill duplicates and logs fraud flags instantly</div>
                        </div>
                      </div>
                      <div style={{
                        width: "36px", height: "20px", borderRadius: "10px",
                        background: s2AiAudit ? "var(--accent-green-deep)" : "#333",
                        padding: "2px", position: "relative", display: "flex", alignItems: "center",
                        transition: "all 0.2s"
                      }}>
                        <div style={{
                          width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                          transform: s2AiAudit ? "translateX(16px)" : "translateX(0)",
                          transition: "all 0.2s"
                        }} />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Cockpit Right: Payout Pipeline Visualizer & Metrics */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  
                  {/* Dynamic Pipeline diagram */}
                  <div style={{
                    background: "var(--bg)", border: "1px solid var(--border)",
                    borderRadius: "14px", padding: "12px 16px", position: "relative",
                    display: "flex", flexDirection: "column", gap: "8px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "9px", color: "var(--ink2)", fontWeight: "bold" }}>SCHEME PAYOUT FLOW</span>
                      <span style={{ fontSize: "9px", color: safetyColor, fontWeight: "bold" }}>{securityStatus}</span>
                    </div>

                    {/* Nodes row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", padding: "6px 0" }}>
                      {/* Connection Line */}
                      <div style={{
                        position: "absolute", left: "20px", right: "20px", height: "2px",
                        background: activeFiltersCount > 0 ? `linear-gradient(90deg, var(--gold) 0%, ${safetyColor} 100%)` : "#333",
                        top: "50%", transform: "translateY(-50%)", zIndex: 1
                      }}>
                        {/* Glow animation streak */}
                        {activeFiltersCount > 0 && (
                          <div style={{
                            width: "24px", height: "100%", background: "#fff",
                            boxShadow: "0 0 10px #fff", borderRadius: "50%",
                            animation: "pipeline-glow 1.5s linear infinite",
                            position: "absolute",
                            top: 0
                          }} />
                        )}
                      </div>

                      {/* Node 1: Brand Budget */}
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "var(--surface)", border: "2px solid var(--gold)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", zIndex: 2, position: "relative"
                      }}>
                        <Briefcase size={16} color="var(--gold)" />
                        <span style={{ position: "absolute", bottom: "-14px", fontSize: "7.5px", color: "var(--ink2)", whiteSpace: "nowrap" }}>Brand Fund</span>
                      </div>

                      {/* Node 2: Safety filter */}
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "var(--surface)", border: `2px solid ${safetyColor}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", zIndex: 2, position: "relative",
                        boxShadow: `0 0 12px ${safetyColor}44`, transition: "all 0.3s"
                      }}>
                        <ShieldCheck size={16} color={safetyColor} />
                        <span style={{ position: "absolute", bottom: "-14px", fontSize: "7.5px", color: "var(--ink2)", whiteSpace: "nowrap" }}>Safety Guard</span>
                      </div>

                      {/* Node 3: Retailer */}
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "var(--surface)", border: activeFiltersCount === 3 ? "2px solid var(--accent-green)" : "2px solid var(--border2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", zIndex: 2, position: "relative"
                      }}>
                        <Store size={16} color={activeFiltersCount === 3 ? "var(--accent-green)" : "var(--border2)"} />
                        <span style={{ position: "absolute", bottom: "-14px", fontSize: "7.5px", color: "var(--ink2)", whiteSpace: "nowrap" }}>Retail Desk</span>
                      </div>
                    </div>

                    {/* Safety visual progress bar */}
                    <div style={{ marginTop: "14px", background: "var(--surface)", height: "4px", borderRadius: "2px", width: "100%", overflow: "hidden" }}>
                      <div style={{ background: safetyColor, height: "100%", width: safetyWidth, transition: "width 0.4s ease" }} />
                    </div>
                  </div>

                  {/* Outputs */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px" }}>
                      <span style={{ fontSize: "10px", color: "var(--ink2)", display: "block" }}>Projected ROI</span>
                      <strong className="hf" style={{ fontSize: "18px", color: safetyColor }}>
                        {projectedROI}
                      </strong>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px" }}>
                      <span style={{ fontSize: "10px", color: "var(--ink2)", display: "block" }}>Leakage Losses</span>
                      <strong className="hf" style={{ fontSize: "18px", color: activeFiltersCount === 3 ? "var(--accent-green)" : "#f87171" }}>
                        {leakageLosses}
                      </strong>
                    </div>
                  </div>

                  {/* Warning message box */}
                  <div style={{
                    background: activeFiltersCount === 3 ? "rgba(82,204,79,0.05)" : activeFiltersCount > 0 ? "rgba(96,165,250,0.05)" : "rgba(248,113,113,0.05)",
                    border: activeFiltersCount === 3 ? "1px solid rgba(82,204,79,0.15)" : activeFiltersCount > 0 ? "1px solid rgba(96,165,250,0.15)" : "1px solid rgba(248,113,113,0.15)",
                    borderRadius: "10px", padding: "10px 14px", display: "flex", gap: "8px", alignItems: "center", transition: "all 0.3s"
                  }}>
                    <Shield size={14} color={safetyColor} />
                    <span style={{ fontSize: "10.5px", color: "var(--ink2)" }}>
                      {safetyMsg}
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            SLIDE 3 LAYOUT: Asymmetric Layered Overlap Card Deck
            ------------------------------------------------------------- */}
        {currentSlide === 2 && (
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "60px", alignItems: "center" }} className="hero-grid">
            
            {/* LEFT COLUMN: Copy & Stats */}
            <div className="slide-reveal-l">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${currentAccent})` }} />
                <span style={{ color: currentAccent, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
                  {slides[currentSlide].subtitle}
                </span>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${currentAccent}, transparent)` }} />
              </div>

              <h1 className="hf" style={{ color: "var(--ink)", fontSize: "clamp(30px, 4.8vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1.2px", marginBottom: "20px" }}>
                OTP-Verified Wholesaling & <span style={{ background: "linear-gradient(90deg,var(--gold),var(--gold-base))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Direct Payouts.</span>
              </h1>

              <p style={{ color: "var(--ink2)", fontSize: "14.5px", lineHeight: 1.75, marginBottom: "32px", maxWidth: "520px" }}>
                {slides[currentSlide].desc}
              </p>

              <div style={{ display: "flex", gap: 14, marginBottom: "48px" }} className="hero-actions">
                <Link href={slides[currentSlide].ctaLink} className="btn-green" style={{ background: `linear-gradient(135deg, ${currentAccent}, var(--accent-green-deep))` }}>
                  {slides[currentSlide].ctaText}
                </Link>
                <Link href="/platform" className="btn-ghost">Explore Modules →</Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
                {slides[currentSlide].stats.map((st) => (
                  <div key={st.l}>
                    <div className="hf" style={{ fontSize: "24px", fontWeight: 900, color: "var(--ink)" }}>{st.v}</div>
                    <div style={{ color: "var(--ink2)", fontSize: "11px", fontWeight: 500 }}>{st.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Asymmetric Keypad + Route Checklist overlapping */}
            <div className="slide-reveal-r" onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)} style={{ display: "flex", justifyContent: "center", position: "relative", width: "100%", height: "420px" }}>
              
              {/* Background Card: Route Checklist (Shifted slightly back & left) */}
              <div style={{
                position: "absolute", left: "0", top: "10px", width: "85%",
                background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: "16px", padding: "20px", opacity: 0.65, zIndex: 10,
                boxShadow: "var(--shadow)"
              }} className="quote-div">
                <span style={{ fontSize: "9px", color: "var(--gold)", fontWeight: "bold", textTransform: "uppercase" }}>Route Dispatch list</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "6px" }}>
                    <span style={{ fontSize: "11px", color: "var(--ink)" }}>Order #1402 (Cooperative)</span>
                    <span style={{ fontSize: "10px", color: "var(--gold)" }}>Pending OTP</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "6px" }}>
                    <span style={{ fontSize: "11px", color: "var(--ink2)" }}>Order #1398 (Chemist case)</span>
                    <span style={{ fontSize: "10px", color: "var(--accent-green)" }}>Delivered ✓</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", color: "var(--ink2)" }}>Order #1395 (FMCG bulk)</span>
                    <span style={{ fontSize: "10px", color: "var(--accent-green)" }}>Delivered ✓</span>
                  </div>
                </div>
              </div>

              {/* Foreground Card: Handheld Device Keypad (Offset on top of route list) */}
              <div style={{
                position: "absolute", right: "0", bottom: "10px", width: "80%",
                background: "var(--card-bg)", border: "1px solid var(--border2)",
                borderRadius: "20px", padding: "20px", zIndex: 20,
                boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", gap: "12px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                  <span style={{ fontSize: "9px", color: "var(--gold)", fontWeight: "bold" }}>OTP TERMINAL</span>
                  <span style={{ fontSize: "9px", color: "var(--ink2)", fontFamily: "monospace" }}>Stock: {stockLevel}</span>
                </div>

                <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                  {otpStatus !== "success" ? (
                    <>
                      <span style={{ fontSize: "8px", color: "var(--ink2)" }}>ENTER DELIVERY OTP (HINT: 4096)</span>
                      <div style={{ display: "flex", justifyContent: "center", gap: "6px", margin: "6px 0" }}>
                        {[0, 1, 2, 3].map((idx) => (
                          <div key={idx} style={{
                            width: "28px", height: "32px", borderRadius: "4px",
                            border: otpStatus === "error" ? "1px solid #f87171" : otpInput.length > idx ? "1px solid var(--gold)" : "1px solid var(--border2)",
                            background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "15px", fontWeight: "bold", color: "#fff"
                          }}>
                            {otpInput[idx] || ""}
                          </div>
                        ))}
                      </div>
                      {otpStatus === "verifying" && <span style={{ fontSize: "9px", color: "var(--gold)" }}>Authenticating...</span>}
                      {otpStatus === "error" && <span style={{ fontSize: "9px", color: "#f87171" }}>Invalid. Press C.</span>}
                    </>
                  ) : (
                    <div style={{ padding: "4px 0" }}>
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--gold)" }}>SHIPMENT VERIFIED</span>
                      <p style={{ fontSize: "9px", color: "var(--ink2)", marginTop: "2px" }}>Wallet Payout: +100 Bags Seeds</p>
                      <button onClick={() => { setOtpInput(""); setOtpStatus("idle"); }} style={{ marginTop: "6px", background: "var(--surface)", border: "1px solid var(--border)", color: "#fff", fontSize: "9px", padding: "2px 8px", borderRadius: "4px", cursor: "pointer" }}>Reset</button>
                    </div>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px", maxWidth: "160px", margin: "0 auto" }}>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0"].map((key) => (
                    <button 
                      key={key} 
                      onClick={() => handleKeypadPress(key)}
                      disabled={otpStatus === "verifying" || otpStatus === "success"}
                      style={{
                        background: "var(--surface)", border: "1px solid var(--border)",
                        borderRadius: "6px", padding: "6px 10px", color: key === "C" ? "#f87171" : "#fff",
                        fontSize: "12px", fontWeight: "bold", cursor: "pointer"
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            SLIDE 4 LAYOUT: Unified Operations Grid (HQ console left, map right)
            ------------------------------------------------------------- */}
        {currentSlide === 3 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "60px", alignItems: "center" }} className="hero-grid">
            
            {/* LEFT COLUMN: Operations Copy + Live console log feed */}
            <div className="slide-reveal-l" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${currentAccent})` }} />
                  <span style={{ color: currentAccent, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
                    {slides[currentSlide].subtitle}
                  </span>
                  <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${currentAccent}, transparent)` }} />
                </div>

                <h1 className="hf" style={{ color: "var(--ink)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "12px" }}>
                  Real-time Purchase Data & <span style={{ background: "linear-gradient(90deg,var(--gold),var(--gold-base))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Fraud Safeguards.</span>
                </h1>

                <p style={{ color: "var(--ink2)", fontSize: "14.5px", lineHeight: 1.7, marginBottom: "16px" }}>
                  {slides[currentSlide].desc}
                </p>
              </div>

              {/* HQ Console log feed */}
              <div onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "9px", color: "var(--ink2)", textTransform: "uppercase", fontWeight: "bold" }}>Real-time Operations Stream</span>
                  <span style={{ fontSize: "8px", color: "var(--accent-green)", fontFamily: "monospace" }}>Secure SSL Connected</span>
                </div>
                <div style={{ height: "130px", overflowY: "hidden", background: "rgba(0,0,0,0.3)", borderRadius: "10px", border: "1px solid var(--border)", padding: "10px", fontFamily: "monospace", fontSize: "9px", color: "#ffe082", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {hqLogs.map((log, index) => {
                    const isWarn = log.includes("[WARN]");
                    const isSec = log.includes("[SECURITY]");
                    let color = "#ffe082";
                    if (isWarn) color = "#f87171";
                    else if (isSec) color = "var(--accent-green)";
                    return (
                      <div key={index} style={{ color, opacity: Math.max(0.4, 1 - index * 0.18), whiteSpace: "nowrap" }}>
                        {log}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fraud Injector Button */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button 
                  onClick={injectFraud}
                  style={{
                    flex: 1, background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)",
                    borderRadius: "8px", padding: "10px", color: "#f87171", cursor: "pointer",
                    fontSize: "11px", fontWeight: "bold", textAlign: "center", transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(248,113,113,0.06)"; }}
                >
                  ⚠ INJECT MOCK FRAUD ATTEMPT
                </button>
                <Link href={slides[currentSlide].ctaLink} className="btn-green" style={{ background: `linear-gradient(135deg, ${currentAccent}, var(--accent-green-deep))`, padding: "10px 20px" }}>
                  Book Custom BI Demo
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Dashboard Preview Image + Animated Hotspots */}
            <div className="slide-reveal-r" onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)} style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: "100%", maxWidth: "440px", borderRadius: "20px",
                background: "var(--card-bg)", border: "1px solid var(--border2)",
                padding: "16px", boxShadow: "var(--shadow)", backdropFilter: "blur(12px)",
                display: "flex", flexDirection: "column", gap: "10px"
              }}>
                {/* Operations Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)", animation: "blink 2.2s infinite" }} />
                    <span style={{ fontSize: "10px", color: "var(--gold)", fontWeight: "bold", textTransform: "uppercase" }}>HQ INTELLIGENCE RADAR</span>
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--ink2)", fontFamily: "monospace" }}>4 Nodes Active</span>
                </div>

                {/* Dashboard Preview with overlays */}
                <div style={{
                  position: "relative", width: "100%", height: "230px",
                  borderRadius: "12px", overflow: "hidden", background: "#050905",
                  border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <img
                    src="/dashboard-preview.jpg"
                    alt="Counter OS Dashboard Analytics"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  />
                  {/* Grid visual overlay */}
                  <div className="line-grid" style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }} />

                  {/* Dynamic Scanner Beam sweep */}
                  <div style={{
                    position: "absolute", left: 0, right: 0, height: "3px",
                    background: "var(--gold)", boxShadow: "0 0 12px var(--gold)",
                    animation: "scan-line 3.2s ease-in-out infinite alternate"
                  }} />

                  {/* Pulsing Hotspots on top of the dashboard */}
                  {/* Hotspot 1: Active Retailers */}
                  <div style={{ position: "absolute", top: "18%", left: "24%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-green)" }} />
                      <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid var(--accent-green)", animation: "ping 1.8s infinite" }} />
                    </div>
                  </div>

                  {/* Hotspot 2: Scan activity heatmap */}
                  <div style={{ position: "absolute", top: "40%", left: "49%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)" }} />
                      <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid var(--gold)", animation: "ping 2.2s infinite" }} />
                    </div>
                  </div>

                  {/* Hotspot 3: Recommended Actions / AI Insights */}
                  <div style={{ position: "absolute", top: "35%", left: "88%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)" }} />
                      <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid var(--gold)", animation: "ping 2s infinite" }} />
                    </div>
                  </div>

                  {/* Hotspot 4: Alerts sidebar count (flashes red when fraud is injected) */}
                  <div style={{ 
                    position: "absolute", top: "76%", left: "8%", 
                    display: "flex", flexDirection: "column", alignItems: "center",
                    opacity: hqLogs[0]?.includes("[WARN]") ? 1 : 0.2,
                    transition: "all 0.3s"
                  }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ 
                        width: 10, height: 10, borderRadius: "50%", 
                        background: hqLogs[0]?.includes("[WARN]") ? "#f87171" : "var(--ink2)",
                        boxShadow: hqLogs[0]?.includes("[WARN]") ? "0 0 10px #f87171" : "none"
                      }} />
                      {hqLogs[0]?.includes("[WARN]") && (
                        <div style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "2px solid #f87171", animation: "ping 1s infinite" }} />
                      )}
                    </div>
                  </div>

                  {/* Simulated Security audit sweep overlay text */}
                  <div style={{
                    position: "absolute", bottom: "8px", left: "8px", right: "8px",
                    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", borderRadius: "4px",
                    padding: "4px 8px", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <span style={{ fontSize: "8px", color: "var(--gold)", fontWeight: "bold", fontFamily: "monospace", letterSpacing: "0.05em" }}>SYSTEM: CONTINUOUS AUDIT SCAN</span>
                    <span style={{ fontSize: "8px", color: "var(--accent-green)", fontWeight: "bold", fontFamily: "monospace" }}>99.8% TRUST SCORE</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
      <style>{`
        @keyframes scan-line {
          0% { top: 6%; }
          100% { top: 92%; }
        }
        @keyframes slideReveal {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRevealL {
          from { opacity: 0; transform: translateX(-28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRevealR {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pipeline-glow {
          0% { left: 0%; opacity: 0.1; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 90%; opacity: 0.1; }
        }
        .slide-reveal {
          animation: slideReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .slide-reveal-l {
          animation: slideRevealL 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .slide-reveal-r {
          animation: slideRevealR 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media(max-width:900px) {
          #product { padding-top: 120px !important; }
          .hero-grid { grid-template-columns: 1fr!important; gap: 40px!important; text-align: center!important; }
          .hero-actions { justify-content: center!important; }
          [style*="gridTemplateColumns: \"repeat(3, 1fr)\""] { justify-content: center!important; }
          .af2, .af3 { position: static!important; display: inline-flex!important; margin: 10px!important; }
          .slide-reveal-r { flex-direction: column!important; align-items: center!important; }
          .quote-div { display: none !important; }
          [style*="width: \"80%\""] { width: 100% !important; position: static !important; }
        }
        @media(max-width:480px) {
          .hero-actions { flex-direction: column!important; }
          [style*="height: \"340px\""] {
            height: auto !important;
            grid-template-columns: 1fr !important;
            border-width: 4px !important;
            padding: 10px !important;
          }
          [style*="borderLeft: \"1px solid var(--border)\""] {
            border-left: none !important;
            border-top: 1px solid var(--border) !important;
            padding-left: 0 !important;
            padding-top: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";
import { useState } from "react";

const faqItems = [
  {
    q: "What is Counter OS?",
    a: "Counter OS is a universal retail intelligence and sales growth platform for companies selling through distributed dealer, retailer, or distributor channels. It connects sales metrics, scan verifications, and trade incentives into a single live platform."
  },
  {
    q: "How does OTP-verified delivery work?",
    a: "When a distributor drops wholesale inventory off at a retail shop, the retailer shares a secure 4-digit delivery OTP. Entering this OTP instantly settles the distributor's payment, awards the retailer cashback, and updates inventory levels."
  },
  {
    q: "Does Counter OS function without internet?",
    a: "Yes. The platform uses an offline-first database that logs transactions, POS cart checkouts, and inventory entries locally. The moment a Wi-Fi or cellular connection is detected, data syncs in the background."
  },
  {
    q: "Which industries are supported?",
    a: "Counter OS is built with a universal data layer that supports FMCG, Pharmacy, Agri-inputs, Telecom recharge points, Electronics dealers, Auto parts distributors, and any multi-tier B2B2C channel network."
  },
  {
    q: "How does Counter OS eliminate trade scheme leakage?",
    a: "Trade promotions and QR schemes are validated in real time on the counter device. Because redemptions require live eligibility checks and OTP verifications, fraud, double-claims, and WhatsApp group schemes are completely eliminated."
  }
];

export default function Faq() {
  const [active, setActive] = useState<number | null>(null);

  const toggle = (i: number) => {
    setActive(active === i ? null : i);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {faqItems.map((item, i) => {
          const isOpen = active === i;
          return (
            <div key={i} className="card-solid" style={{ 
              background: "var(--surface)", 
              border: isOpen ? "1px solid var(--accent-green-mid)" : "1px solid var(--border)", 
              borderRadius: "14px", 
              overflow: "hidden", 
              transition: "all .3s" 
            }}>
              
              {/* Question Trigger */}
              <button onClick={() => toggle(i)} style={{
                width: "100%",
                background: "none",
                border: "none",
                textAlign: "left",
                padding: "24px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                outline: "none"
              }}>
                <span className="hf" style={{ 
                  fontWeight: 700, 
                  fontSize: "15px", 
                  color: isOpen ? "var(--accent-green)" : "var(--ink)",
                  transition: "color .2s"
                }}>{item.q}</span>
                <span style={{ 
                  color: isOpen ? "var(--accent-green)" : "var(--ink2)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .3s",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}>
                  ▾
                </span>
              </button>

              {/* Collapsible Answer */}
              <div style={{
                maxHeight: isOpen ? "200px" : "0px",
                opacity: isOpen ? 1 : 0,
                transition: "all .3s ease-in-out",
                overflow: "hidden"
              }}>
                <div style={{ padding: "0 28px 24px", color: "var(--ink2)", fontSize: "14px", lineHeight: 1.7 }}>
                  {item.a}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

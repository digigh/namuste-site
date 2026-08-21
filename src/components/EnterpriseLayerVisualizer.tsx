"use client";

import { useState } from "react";
import { ShoppingBag, HeartPulse, Package, Sprout, Network, ShieldCheck, Sparkles, Building2 } from "lucide-react";

const enterpriseNodes = [
  {
    id: "fmcg",
    title: "Consumer Brand",
    subtitle: "Customer Support & Re-orders",
    icon: <ShoppingBag size={18} />,
    desc: "24/7 product queries, warranty registrations, and complaint resolution across millions of consumers.",
    stat: "99.4% first-contact resolution",
  },
  {
    id: "healthcare",
    title: "Healthcare Network",
    subtitle: "Appointment & Diagnostic Desk",
    icon: <HeartPulse size={18} />,
    desc: "Doctor schedules, test preparation guidelines, and automated appointment reminders.",
    stat: "42% reduction in no-shows",
  },
  {
    id: "distribution",
    title: "Wholesale & Logistics",
    subtitle: "Distributor & Partner Helpline",
    icon: <Package size={18} />,
    desc: "Real-time delivery status, payment reconciliation, and dealer scheme updates.",
    stat: "<10s order tracking speed",
  },
  {
    id: "agri",
    title: "Agri-Business",
    subtitle: "Farmer Vernacular Assistance",
    icon: <Sprout size={18} />,
    desc: "Crop cycle advisories, regional sowing queries, and dealer stock availability.",
    stat: "12 regional languages supported",
  },
];

export default function EnterpriseLayerVisualizer() {
  const [selectedNode, setSelectedNode] = useState<string>("fmcg");
  const activeNode = enterpriseNodes.find((n) => n.id === selectedNode)!;

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "24px",
        background: "rgba(8, 10, 8, 0.9)",
        border: "1px solid var(--border)",
        padding: "40px",
        boxShadow: "0 24px 80px rgba(0, 0, 0, 0.9)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "48px",
          alignItems: "center",
        }}
        className="enterprise-grid"
      >
        {/* Left: Departmental / Brand Nodes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "4px" }}>
            Independent Operating Entities & Brands
          </div>

          {enterpriseNodes.map((node) => {
            const isSelected = node.id === selectedNode;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                style={{
                  background: isSelected ? "rgba(118, 192, 67, 0.12)" : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${isSelected ? "var(--green)" : "var(--border)"}`,
                  borderRadius: "14px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.06)",
                      color: isSelected ? "#050505" : "var(--text-ivory)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {node.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--text-ivory)" }}>
                      {node.title}
                    </div>
                    <div style={{ fontSize: "12.5px", color: isSelected ? "var(--green-luminous)" : "var(--text-muted)" }}>
                      {node.subtitle}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.2)",
                    boxShadow: isSelected ? "0 0 10px var(--green)" : "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Right: Central Namuste Enterprise Hub */}
        <div
          style={{
            background: "rgba(12, 20, 12, 0.95)",
            border: "1px solid rgba(118, 192, 67, 0.35)",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 16px 50px rgba(0, 0, 0, 0.8)",
          }}
        >
          {/* Central Hub Badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "var(--green)",
                  color: "#050505",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Network size={20} />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 800, letterSpacing: "0.08em", color: "var(--text-ivory)", textTransform: "uppercase" }}>
                  Namuste Enterprise
                </div>
                <div style={{ fontSize: "11px", color: "var(--green-luminous)" }}>Unified Governance & Data Layer</div>
              </div>
            </div>
          </div>

          {/* Active Node Detail */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
              Active Department Workflow: {activeNode.title}
            </div>
            <p style={{ fontSize: "13.5px", color: "var(--text-body)", lineHeight: 1.6, marginBottom: "14px" }}>
              {activeNode.desc}
            </p>
            <div style={{ background: "rgba(118, 192, 67, 0.08)", border: "1px solid rgba(118, 192, 67, 0.2)", borderRadius: "10px", padding: "10px 14px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--green-luminous)" }}>
                Benchmark Impact: {activeNode.stat}
              </span>
            </div>
          </div>

          {/* Enterprise Capabilities */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
              <ShieldCheck size={14} style={{ color: "var(--green)" }} />
              <span>Isolated Knowledge Bases per Legal Entity</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
              <Building2 size={14} style={{ color: "var(--green)" }} />
              <span>Group-wide Security, RBAC & SOC2 Compliance</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .enterprise-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

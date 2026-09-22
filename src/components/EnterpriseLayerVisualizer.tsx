"use client";

import { useState } from "react";
import { ShoppingBag, HeartPulse, Package, Sprout, Network, ShieldCheck, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="elv-card">
      <CardContent className="elv-grid">
        {/* Left: departmental / brand nodes */}
        <div className="elv-nodes">
          <div className="elv-nodes-label">Independent Operating Entities & Brands</div>

          {enterpriseNodes.map((node) => {
            const isSelected = node.id === selectedNode;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`elv-node ${isSelected ? "is-selected" : ""}`}
              >
                <div className="elv-node-main">
                  <span className="elv-node-icon">{node.icon}</span>
                  <div>
                    <div className="elv-node-title">{node.title}</div>
                    <div className="elv-node-subtitle">{node.subtitle}</div>
                  </div>
                </div>
                <span className="elv-node-dot" />
              </button>
            );
          })}
        </div>

        {/* Right: central Namuste enterprise hub */}
        <div className="elv-hub">
          <div className="elv-hub-head">
            <span className="elv-hub-icon"><Network size={20} /></span>
            <div>
              <div className="elv-hub-title">Namuste Enterprise</div>
              <div className="elv-hub-sub">Unified Governance & Data Layer</div>
            </div>
          </div>

          <div className="elv-active">
            <div className="elv-active-label">Active Department Workflow: {activeNode.title}</div>
            <p className="elv-active-desc">{activeNode.desc}</p>
            <div className="elv-active-stat">Benchmark Impact: {activeNode.stat}</div>
          </div>

          <div className="elv-caps">
            <div className="elv-cap-row"><ShieldCheck size={14} /><span>Isolated Knowledge Bases per Legal Entity</span></div>
            <div className="elv-cap-row"><Building2 size={14} /><span>Group-wide Security, RBAC & SOC2 Compliance</span></div>
          </div>
        </div>
      </CardContent>

      <style>{`
        .elv-card { border-radius: 24px; }
        .elv-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: center; }

        .elv-nodes { display: flex; flex-direction: column; gap: 12px; }
        .elv-nodes-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim); margin-bottom: 4px; }
        .elv-node {
          display: flex; align-items: center; justify-content: space-between;
          background: var(--overlay-1); border: 1px solid var(--border);
          border-radius: 14px; padding: 14px 18px; cursor: pointer;
          transition: all 0.2s ease; text-align: left; font: inherit;
        }
        .elv-node.is-selected { background: var(--green-glow); border-color: var(--border-green); }
        .elv-node-main { display: flex; align-items: center; gap: 14px; }
        .elv-node-icon {
          width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--overlay-2); color: var(--text-ivory);
        }
        .elv-node.is-selected .elv-node-icon { background: var(--green); color: #052015; }
        .elv-node-title { font-size: 14.5px; font-weight: 600; color: var(--text-ivory); }
        .elv-node-subtitle { font-size: 12.5px; color: var(--text-muted); }
        .elv-node.is-selected .elv-node-subtitle { color: var(--green); }
        .elv-node-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border2); flex-shrink: 0; }
        .elv-node.is-selected .elv-node-dot { background: var(--green); box-shadow: 0 0 10px var(--green-glow-strong); }

        .elv-hub { background: var(--bg2); border: 1px solid var(--border-green); border-radius: 20px; padding: 28px; }
        .elv-hub-head { display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 20px; }
        .elv-hub-icon {
          width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green); color: #052015;
        }
        .elv-hub-title { font-size: 14px; font-weight: 800; letter-spacing: 0.06em; color: var(--text-ivory); text-transform: uppercase; }
        .elv-hub-sub { font-size: 11px; color: var(--green); margin-top: 1px; }

        .elv-active { margin-bottom: 20px; }
        .elv-active-label { font-size: 11.5px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 6px; }
        .elv-active-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin: 0 0 14px; }
        .elv-active-stat {
          background: var(--green-glow); border: 1px solid var(--border-green);
          border-radius: 10px; padding: 10px 14px;
          font-size: 12.5px; font-weight: 600; color: var(--green);
        }

        .elv-caps { border-top: 1px solid var(--border); padding-top: 16px; display: flex; flex-direction: column; gap: 8px; }
        .elv-cap-row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); }
        .elv-cap-row svg { color: var(--green); flex-shrink: 0; }

        @media (max-width: 860px) {
          .elv-grid { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </Card>
  );
}

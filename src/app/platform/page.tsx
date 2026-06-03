import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconTarget, IconLayers, IconUsers, IconSmartphone, IconBarChart, IconShield, IconWifi, IconBadge } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Counter OS Platform Modules — Namuste Technologies",
  description: "Explore the Counter OS three sub-platforms: Command Centre dashboard, Retail Intelligence analytics suite (8 modules), and Sales & Rewards engine (6 modules) built for channel networks.",
};

const roles = [
  { name: "National / HQ Leadership", desc: "Monitors overall network sales, regional target performance, category-level growth, fraud exposure, and reward burn rates at a macro level." },
  { name: "Regional / Zone Head", desc: "Drills down to district-by-district performance, top/bottom regional stores, campaign effectiveness, and local fraud hotspots." },
  { name: "Area / Territory Manager", desc: "Reviews individual partner health profiles, credits/exposures, and gets automated dead-stock and account churn risk warnings." },
  { name: "Field Agent / Sales Rep", desc: "Sees daily prioritized partner lists to visit, targets, visit logs, and automated talking points for each shop counter." },
  { name: "Super Admin", desc: "Full control over configurations, role allocations, security parameters, system logs, and integration points." },
];

const intelligenceModules = [
  { title: "Network Overview", icon: <IconWifi />, desc: "Live geo-heatmap of your entire dealer network. Color-coded partner activity with real-time KPI card updates." },
  { title: "Partner Segmentation", icon: <IconUsers />, desc: "Dynamically maps accounts into High Performers, Growth, Stable, At Risk, and Churned segments for targeted win-back plans." },
  { title: "Partner Profiles", icon: <IconSmartphone />, desc: "A 360-degree digital profile of any store counter — transaction history, category mix, wallet balance, and trust status." },
  { title: "SKU Intelligence", icon: <IconLayers />, desc: "Track brand distribution velocity, cross-sell rates, fast-moving items, and flags dead stock before returns occur." },
  { title: "Geographic Coverage", icon: <IconTarget />, desc: "Density maps showing covered vs uncovered villages. The Opportunity Index flags high-value empty territories." },
  { title: "Partner Trust Score", icon: <IconShield />, desc: "A weighted 0-100 score built from payment discipline, order consistency, credit utilization, and transaction verification quality." },
  { title: "Behaviour Analytics", icon: <IconUsers />, desc: "Tracks order frequency, time of transactions, campaign response trends, and highlights loyalty-dependent stores." },
  { title: "Fraud & Verification", icon: <IconShield />, desc: "Real-time verification metrics and fraud alerts. Identifies duplicate claims, fake locations, and reward abuse instantly." },
];

const rewardsModules = [
  { title: "Sales Performance", icon: <IconBarChart />, desc: "Granular daily transaction trend comparison (current vs last period) filtered by region, territory, and product categories." },
  { title: "Incentive Programs", icon: <IconBadge />, desc: "Launch, monitor, and optimize volume-based or product-focused campaigns. Tracks budget utilization in real time." },
  { title: "Loyalty & Points", icon: <IconBadge />, desc: "Manages member acquisition, points issued/redeemed, and provides a 90-day points expiry forecast for active campaigns." },
  { title: "Leaderboards", icon: <IconTarget />, desc: "Generates healthy competition by ranking top-performing store reps, regional teams, and individual store locations." },
  { title: "ROI Simulator", icon: <IconLayers />, desc: "Model financial impact before launching campaigns. Simulates incremental revenue, net profits, and margins." },
];

export default function PlatformPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", paddingTop: "110px", overflowX: "hidden" }}>
        
        {/* Intro Hero Section */}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px", position: "relative" }}>
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
            <div className="pill" style={{ marginBottom: "20px" }}>The Core Architecture</div>
            <h1 className="hf" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: "24px", color: "var(--ink)" }}>
              Three Sub-Platforms. <span className="gt">One Data Layer.</span>
            </h1>
            <p style={{ color: "var(--ink2)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto" }}>
              Counter OS integrates role-based command modules, deep analytical retail insights, and precise incentive engines into a single synchronized system for distribution networks.
            </p>
          </div>
        </section>

        {/* 1. Command Centre (HQ Dashboard) */}
        <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="solutions-g">
              <div>
                <span className="pill" style={{ marginBottom: "16px" }}>Sub-Platform 01</span>
                <h2 className="hf" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, letterSpacing: "-0.8px", color: "var(--ink)", marginBottom: "16px" }}>
                  Command Centre: <span className="gt-green">HQ Dashboard</span>
                </h2>
                <p style={{ color: "var(--ink2)", fontSize: "15px", lineHeight: 1.8, marginBottom: "28px" }}>
                  Every role in your enterprise sees a dedicated, action-oriented version of the dashboard tailored specifically to their scope and responsibilities.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {roles.map((r, i) => (
                    <div key={r.name} className="card-solid" style={{ padding: "20px", display: "flex", gap: "16px", background: "var(--surface)" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "var(--accent-green)", flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="hf" style={{ fontWeight: 700, fontSize: "14px", color: "var(--ink)", marginBottom: "4px" }}>{r.name}</h4>
                        <p style={{ color: "var(--ink2)", fontSize: "13px", lineHeight: 1.6 }}>{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "40px 32px", boxShadow: "var(--shadow)" }}>
                <h3 className="hf" style={{ fontWeight: 800, color: "var(--ink)", fontSize: "20px", marginBottom: "20px" }}>Role-Based Distribution</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    { label: "HQ / National", value: "98% target efficiency", color: "var(--accent-green)" },
                    { label: "Regional State Leads", value: "24 regions reporting", color: "var(--accent-green-mid)" },
                    { label: "Territory Managers", value: "142 active routes", color: "var(--accent-green-deep)" },
                    { label: "Field Agents", value: "2,400+ daily visits logged", color: "var(--gold)" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "13px", color: "var(--ink2)" }}>{stat.label}</span>
                        <span className="hf" style={{ fontSize: "13px", fontWeight: "bold", color: stat.color }}>{stat.value}</span>
                      </div>
                      <div style={{ height: "4px", background: "var(--surface)", borderRadius: "2px" }}>
                        <div style={{ height: "100%", width: "75%", background: stat.color, borderRadius: "2px" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Retail Intelligence */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 60px" }}>
              <span className="pill" style={{ marginBottom: "16px" }}>Sub-Platform 02</span>
              <h2 className="hf" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, letterSpacing: "-0.8px", color: "var(--ink)", marginBottom: "16px" }}>
                Deep <span className="gt">Retail Intelligence</span>
              </h2>
              <p style={{ color: "var(--ink2)", fontSize: "15px", lineHeight: 1.8 }}>
                Eight specialized analytical modules operating in sync to track network density, partner loyalty, stock margins, and prevent system fraud.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {intelligenceModules.map((m) => (
                <div key={m.title} className="card" style={{ padding: "28px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(82,204,79,0.08)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)", marginBottom: "20px" }}>
                    {m.icon}
                  </div>
                  <h3 className="hf" style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", marginBottom: "10px" }}>{m.title}</h3>
                  <p style={{ color: "var(--ink2)", fontSize: "13px", lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Sales & Rewards */}
        <section style={{ background: "var(--bg3)", borderTop: "1px solid var(--border)", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="solutions-g">
              <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "40px 32px", boxShadow: "var(--shadow)" }}>
                <h3 className="hf" style={{ fontWeight: 800, color: "var(--ink)", fontSize: "18px", marginBottom: "16px" }}>ROI Sensitivity Slabs</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                      <th style={{ padding: "10px 0", fontSize: "12px", color: "var(--ink2)" }}>Scenario</th>
                      <th style={{ padding: "10px 0", fontSize: "12px", color: "var(--ink2)" }}>Budget</th>
                      <th style={{ padding: "10px 0", fontSize: "12px", color: "var(--ink2)" }}>Proj. Revenue</th>
                      <th style={{ padding: "10px 0", fontSize: "12px", color: "var(--ink2)" }}>Est. ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: "No Program", b: "₹0", r: "₹0", roi: "—" },
                      { s: "Conservative", b: "₹15 L", r: "₹1.32 Cr", roi: "1.76x" },
                      { s: "Recommended", b: "₹28.6 L", r: "₹3.24 Cr", roi: "2.27x", active: true },
                      { s: "Maximum", b: "₹50 L", r: "₹5.08 Cr", roi: "2.38x" },
                    ].map((row) => (
                      <tr key={row.s} style={{ borderBottom: "1px solid var(--border)", background: row.active ? "rgba(82,204,79,0.06)" : "transparent" }}>
                        <td style={{ padding: "12px 0", fontSize: "13px", fontWeight: row.active ? "bold" : "normal", color: "var(--ink)" }}>{row.s}</td>
                        <td style={{ padding: "12px 0", fontSize: "13px", color: "var(--ink2)" }}>{row.b}</td>
                        <td style={{ padding: "12px 0", fontSize: "13px", color: "var(--ink2)" }}>{row.r}</td>
                        <td style={{ padding: "12px 0", fontSize: "13px", fontWeight: "bold", color: "var(--accent-green)" }}>{row.roi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <span className="pill" style={{ marginBottom: "16px" }}>Sub-Platform 03</span>
                <h2 className="hf" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, letterSpacing: "-0.8px", color: "var(--ink)", marginBottom: "16px" }}>
                  Sales & <span className="gt-green">Incentive Engines</span>
                </h2>
                <p style={{ color: "var(--ink2)", fontSize: "15px", lineHeight: 1.8, marginBottom: "28px" }}>
                  Plan campaigns via the ROI Simulator before spending a single rupee, track real-time redemptions, and view dynamic partner leaderboards.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                  {rewardsModules.map((m) => (
                    <div key={m.title} className="card-solid" style={{ padding: "20px" }}>
                      <div style={{ color: "var(--accent-green)", marginBottom: "12px" }}>{m.icon}</div>
                      <h4 className="hf" style={{ fontWeight: 700, fontSize: "14px", color: "var(--ink)", marginBottom: "6px" }}>{m.title}</h4>
                      <p style={{ color: "var(--ink2)", fontSize: "12px", lineHeight: 1.5 }}>{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){.solutions-g{grid-template-columns:1fr!important;gap:40px!important}.form-row{grid-template-columns:1fr!important}}
      `}</style>
    </>
  );
}

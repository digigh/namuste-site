"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, ArrowLeft, Phone, MessageSquare, Globe, Sparkles } from "lucide-react";

const WEBHOOK_URL = "https://aiautomation.digicides.com/webhook/namuste-form";

const industries = [
  "Doctors & Clinics (Flagship)",
  "Professional Services (Law, Accounting, Advisory)",
  "Distribution & Wholesalers",
  "Agriculture & Rural Commerce",
  "Education & Admissions",
  "Research & Multilingual Surveys",
  "Enterprise & Multi-Brand Conglomerates",
  "Other Industry",
];

const volumes = [
  "Under 50 calls/messages per day",
  "50 – 250 calls/messages per day",
  "250 – 1,000 calls/messages per day",
  "1,000+ high-volume enterprise enquiries",
];

const languageOptions = [
  "English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Kannada", "Gujarati", "Malayalam", "Odia", "Punjabi", "Other Regional"
];

export default function DemoBookingWizard() {
  const [step, setStep] = useState<number>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    role: "",
    industry: "Doctors & Clinics (Flagship)",
    volume: "50 – 250 calls/messages per day",
    channels: ["Voice AI", "WhatsApp AI"],
    languages: ["English", "Hindi"],
    challenge: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleChannel = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strictly accept numbers only, maximum 10 digits
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: digits }));

    if (digits.length > 0 && !["6", "7", "8", "9"].includes(digits[0])) {
      setErrors((prev) => ({ ...prev, mobile: "Mobile number must start with 6, 7, 8, or 9" }));
    } else if (digits.length > 0 && digits.length < 10) {
      setErrors((prev) => ({ ...prev, mobile: `Enter remaining ${10 - digits.length} digits` }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.mobile;
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = "Please enter your name";
    if (!formData.email.trim() || !formData.email.includes("@")) err.email = "Please enter a valid email address";
    
    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (!cleanMobile) {
      err.mobile = "Please enter your 10-digit mobile number";
    } else if (!["6", "7", "8", "9"].includes(cleanMobile[0])) {
      err.mobile = "Mobile number must start with 6, 7, 8, or 9";
    } else if (cleanMobile.length !== 10) {
      err.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!formData.company.trim()) err.company = "Please enter your organization name";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
      return;
    }

    setStatus("submitting");

    // Push individual parsed fields to the webhook
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      company: formData.company.trim(),
      role: formData.role.trim() || "Not specified",
      industry: formData.industry,
      volume: formData.volume,
      channels: formData.channels.join(", "),
      channels_list: formData.channels,
      languages: formData.languages.join(", "),
      languages_list: formData.languages,
      challenge: formData.challenge.trim() || "None specified",
      submitted_at: new Date().toISOString(),
      source: "Namuste Website Demo Booking Wizard",
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // silent fallback
      }
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div
        className="glass-card"
        style={{
          padding: "48px 36px",
          textAlign: "center",
          borderRadius: "20px",
          border: "1px solid rgba(118, 192, 67, 0.3)",
          background: "rgba(10, 18, 10, 0.95)",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(118, 192, 67, 0.15)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--green-luminous)",
            marginBottom: "20px",
          }}
        >
          <CheckCircle2 size={32} />
        </div>
        <h3 className="serif" style={{ fontSize: "28px", color: "var(--text-ivory)", marginBottom: "12px" }}>
          Thank You, {formData.name}
        </h3>
        <p style={{ color: "var(--text-body)", fontSize: "15px", lineHeight: 1.6, maxWidth: "500px", margin: "0 auto 24px" }}>
          We have received your requirements for <strong style={{ color: "var(--green)" }}>{formData.industry}</strong>. A Namuste solution architect will reach out within 4 business hours with an interactive tailored walkthrough.
        </p>
        <div className="pill" style={{ display: "inline-flex" }}>
          <span className="pill-dot" /> Tailored Demo In Progress
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card"
      style={{
        padding: "36px",
        borderRadius: "20px",
        background: "rgba(12, 14, 12, 0.9)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
      }}
    >
      {/* Step Progress Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="pill">Step {step} of 2</span>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            {step === 1 ? "Contact & Practice Info" : "Workflows, Channels & Languages"}
          </span>
        </div>
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <ArrowLeft size={13} /> Back
          </button>
        )}
      </div>

      {step === 1 ? (
        /* STEP 1: Basic Information */
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }} className="form-two-col">
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "block", marginBottom: "6px" }}>
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. / Mr. / Ms. Full Name"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${errors.name ? "var(--coral)" : "var(--border)"}`,
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              {errors.name && <span style={{ fontSize: "11px", color: "var(--coral)", marginTop: "4px", display: "block" }}>{errors.name}</span>}
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "block", marginBottom: "6px" }}>
                Work Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${errors.email ? "var(--coral)" : "var(--border)"}`,
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              {errors.email && <span style={{ fontSize: "11px", color: "var(--coral)", marginTop: "4px", display: "block" }}>{errors.email}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }} className="form-two-col">
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span>Mobile Number *</span>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 400 }}>10 digits (starts with 6-9)</span>
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    color: "var(--text-muted)",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    pointerEvents: "none",
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleMobileChange}
                  placeholder="9876543210"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 48px",
                    borderRadius: "10px",
                    border: `1px solid ${errors.mobile ? "var(--coral)" : "var(--border)"}`,
                    background: "rgba(255, 255, 255, 0.03)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    letterSpacing: "0.04em",
                  }}
                />
              </div>
              {errors.mobile && <span style={{ fontSize: "11px", color: "var(--coral)", marginTop: "4px", display: "block" }}>{errors.mobile}</span>}
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "block", marginBottom: "6px" }}>
                Practice / Clinic / Company Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Apex Skin Clinic or Veritas Advisory"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${errors.company ? "var(--coral)" : "var(--border)"}`,
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              {errors.company && <span style={{ fontSize: "11px", color: "var(--coral)", marginTop: "4px", display: "block" }}>{errors.company}</span>}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "block", marginBottom: "6px" }}>
              Primary Industry Vertical
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "#151515",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
              }}
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", marginTop: "12px", padding: "14px" }}
          >
            Continue to Workflow Customization <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        /* STEP 2: Advanced Customization */
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Enquiry Volume */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "block", marginBottom: "8px" }}>
              Expected Daily Enquiry / Call Volume
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }} className="form-two-col">
              {volumes.map((v) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setFormData({ ...formData, volume: v })}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: `1px solid ${formData.volume === v ? "var(--green)" : "var(--border)"}`,
                    background: formData.volume === v ? "rgba(118, 192, 67, 0.1)" : "rgba(255, 255, 255, 0.02)",
                    color: formData.volume === v ? "var(--green-luminous)" : "var(--text-body)",
                    fontSize: "12.5px",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Channels Needed */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "block", marginBottom: "8px" }}>
              Channels Required
            </label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { name: "Voice AI (Inbound/Outbound)", icon: <Phone size={14} /> },
                { name: "WhatsApp AI (Official API)", icon: <MessageSquare size={14} /> },
                { name: "Web Concierge Widget", icon: <Globe size={14} /> },
              ].map((ch) => {
                const isSelected = formData.channels.includes(ch.name.split(" ")[0]);
                return (
                  <button
                    type="button"
                    key={ch.name}
                    onClick={() => toggleChannel(ch.name.split(" ")[0])}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "999px",
                      border: `1px solid ${isSelected ? "var(--green)" : "var(--border)"}`,
                      background: isSelected ? "rgba(118, 192, 67, 0.12)" : "rgba(255, 255, 255, 0.02)",
                      color: isSelected ? "var(--green-luminous)" : "var(--text-muted)",
                      fontSize: "12.5px",
                      cursor: "pointer",
                    }}
                  >
                    {ch.icon}
                    <span>{ch.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multilingual Selection */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "block", marginBottom: "8px" }}>
              Languages Needed
            </label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {languageOptions.map((lang) => {
                const isSelected = formData.languages.includes(lang);
                return (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "6px",
                      border: `1px solid ${isSelected ? "var(--green)" : "var(--border)"}`,
                      background: isSelected ? "rgba(118, 192, 67, 0.15)" : "transparent",
                      color: isSelected ? "var(--green-luminous)" : "var(--text-muted)",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Biggest Challenge / Objective */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-ivory)", display: "block", marginBottom: "6px" }}>
              Primary Goal or Current Communication Friction
            </label>
            <textarea
              rows={3}
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              placeholder="e.g. Front-desk misses calls during peak patient hours; need automated appointment booking and WhatsApp reminders."
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "rgba(255, 255, 255, 0.03)",
                color: "#fff",
                fontSize: "13.5px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary"
            style={{ width: "100%", padding: "14px" }}
          >
            {status === "submitting" ? "Submitting Customization..." : "Confirm & Schedule Live AI Demo"} <ArrowRight size={15} />
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

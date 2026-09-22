"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, ArrowLeft, Phone, MessageSquare, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <Card className="dbw-success-card">
        <CardContent className="flex flex-col items-center text-center">
          <div className="dbw-success-icon">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="dbw-success-title">Thank You, {formData.name}</h3>
          <p className="dbw-success-desc">
            We have received your requirements for <strong style={{ color: "var(--green)" }}>{formData.industry}</strong>. A Namuste solution architect will reach out within 4 business hours with an interactive tailored walkthrough.
          </p>
          <Badge className="dbw-success-badge">
            <span className="dbw-success-badge-dot" /> Tailored Demo In Progress
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="dbw-card">
        <CardContent className="flex flex-col gap-0">
          {/* Step Progress Bar */}
          <div className="dbw-progress-row">
            <div className="dbw-progress-left">
              <Badge variant="secondary" className="dbw-step-badge">Step {step} of 2</Badge>
              <span className="dbw-progress-label">
                {step === 1 ? "Contact & Practice Info" : "Workflows, Channels & Languages"}
              </span>
            </div>
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} className="dbw-back-btn">
                <ArrowLeft size={13} /> Back
              </button>
            )}
          </div>

          {step === 1 ? (
            /* STEP 1: Basic Information */
            <div className="dbw-step-body">
              <div className="dbw-two-col">
                <div>
                  <label className="dbw-label">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. / Mr. / Ms. Full Name"
                    className="dbw-input"
                    style={{ borderColor: errors.name ? "var(--coral)" : undefined }}
                  />
                  {errors.name && <span className="dbw-error">{errors.name}</span>}
                </div>

                <div>
                  <label className="dbw-label">Work Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="dbw-input"
                    style={{ borderColor: errors.email ? "var(--coral)" : undefined }}
                  />
                  {errors.email && <span className="dbw-error">{errors.email}</span>}
                </div>
              </div>

              <div className="dbw-two-col">
                <div>
                  <label className="dbw-label dbw-label-row">
                    <span>Mobile Number *</span>
                    <span className="dbw-label-hint">10 digits (starts with 6-9)</span>
                  </label>
                  <div className="dbw-mobile-wrap">
                    <span className="dbw-mobile-prefix">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleMobileChange}
                      placeholder="9876543210"
                      className="dbw-input dbw-input-mobile"
                      style={{ borderColor: errors.mobile ? "var(--coral)" : undefined }}
                    />
                  </div>
                  {errors.mobile && <span className="dbw-error">{errors.mobile}</span>}
                </div>

                <div>
                  <label className="dbw-label">Practice / Clinic / Company Name *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Skin Clinic or Veritas Advisory"
                    className="dbw-input"
                    style={{ borderColor: errors.company ? "var(--coral)" : undefined }}
                  />
                  {errors.company && <span className="dbw-error">{errors.company}</span>}
                </div>
              </div>

              <div>
                <label className="dbw-label">Primary Industry Vertical</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="dbw-input dbw-select"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="dbw-btn-primary">
                Continue to Workflow Customization <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            /* STEP 2: Advanced Customization */
            <div className="dbw-step-body">
              {/* Enquiry Volume */}
              <div>
                <label className="dbw-label">Expected Daily Enquiry / Call Volume</label>
                <div className="dbw-two-col">
                  {volumes.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setFormData({ ...formData, volume: v })}
                      className={`dbw-choice-btn ${formData.volume === v ? "is-selected" : ""}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channels Needed */}
              <div>
                <label className="dbw-label">Channels Required</label>
                <div className="dbw-pill-row">
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
                        className={`dbw-channel-pill ${isSelected ? "is-selected" : ""}`}
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
                <label className="dbw-label">Languages Needed</label>
                <div className="dbw-pill-row dbw-pill-row-tight">
                  {languageOptions.map((lang) => {
                    const isSelected = formData.languages.includes(lang);
                    return (
                      <button
                        type="button"
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`dbw-lang-pill ${isSelected ? "is-selected" : ""}`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Biggest Challenge / Objective */}
              <div>
                <label className="dbw-label">Primary Goal or Current Communication Friction</label>
                <textarea
                  rows={3}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="e.g. Front-desk misses calls during peak patient hours; need automated appointment booking and WhatsApp reminders."
                  className="dbw-input dbw-textarea"
                />
              </div>

              <button type="submit" disabled={status === "submitting"} className="dbw-btn-primary">
                {status === "submitting" ? "Submitting Customization..." : "Confirm & Schedule Live AI Demo"} <ArrowRight size={15} />
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <style>{`
          .dbw-card { border-radius: 20px; }
          .dbw-progress-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
          .dbw-progress-left { display: flex; align-items: center; gap: 10px; }
          .dbw-step-badge { background: var(--overlay-1) !important; color: var(--text-muted) !important; border: 1px solid var(--border) !important; }
          .dbw-progress-label { font-size: 13px; color: var(--text-muted); }
          .dbw-back-btn { background: none; border: none; color: var(--text-muted); font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px; }

          .dbw-step-body { display: flex; flex-direction: column; gap: 18px; }
          .dbw-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

          .dbw-label { font-size: 12px; font-weight: 600; color: var(--text-ivory); display: block; margin-bottom: 6px; }
          .dbw-label-row { display: flex; justify-content: space-between; align-items: baseline; }
          .dbw-label-hint { font-size: 11px; color: var(--text-muted); font-weight: 400; }

          .dbw-input {
            width: 100%; box-sizing: border-box;
            padding: 12px 14px; border-radius: 10px;
            border: 1px solid var(--border); background: var(--overlay-1);
            color: var(--text-ivory); font-size: 14px; outline: none;
          }
          .dbw-input:focus { border-color: var(--border-green); }
          .dbw-select { cursor: pointer; }
          .dbw-textarea { font-family: inherit; font-size: 13.5px; resize: vertical; }

          .dbw-mobile-wrap { position: relative; display: flex; align-items: center; }
          .dbw-mobile-prefix { position: absolute; left: 14px; color: var(--text-muted); font-size: 13.5px; font-weight: 600; pointer-events: none; }
          .dbw-input-mobile { padding-left: 48px; letter-spacing: 0.04em; }

          .dbw-error { font-size: 11px; color: var(--coral); margin-top: 4px; display: block; }

          .dbw-choice-btn {
            padding: 10px 14px; border-radius: 10px; text-align: left; cursor: pointer;
            border: 1px solid var(--border); background: var(--overlay-1); color: var(--text-muted);
            font-size: 12.5px; font: inherit;
          }
          .dbw-choice-btn.is-selected { border-color: var(--border-green); background: var(--green-glow); color: var(--green); }

          .dbw-pill-row { display: flex; gap: 10px; flex-wrap: wrap; }
          .dbw-pill-row-tight { gap: 6px; }
          .dbw-channel-pill {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 8px 16px; border-radius: 999px; cursor: pointer;
            border: 1px solid var(--border); background: var(--overlay-1); color: var(--text-muted);
            font-size: 12.5px; font: inherit;
          }
          .dbw-channel-pill.is-selected { border-color: var(--border-green); background: var(--green-glow); color: var(--green); }

          .dbw-lang-pill {
            padding: 5px 12px; border-radius: 6px; cursor: pointer;
            border: 1px solid var(--border); background: transparent; color: var(--text-muted);
            font-size: 12px; font: inherit;
          }
          .dbw-lang-pill.is-selected { border-color: var(--border-green); background: var(--green-glow); color: var(--green); }

          .dbw-btn-primary {
            width: 100%; box-sizing: border-box; margin-top: 4px;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            padding: 14px; border-radius: 999px; border: none; cursor: pointer;
            background: var(--text-ivory); color: var(--bg);
            font-size: 14.5px; font-weight: 700;
          }
          .dbw-btn-primary:disabled { opacity: 0.6; cursor: default; }

          .dbw-success-card { text-align: center; border-color: var(--border-green); }
          .dbw-success-icon {
            width: 60px; height: 60px; border-radius: 50%; margin-bottom: 20px;
            display: inline-flex; align-items: center; justify-content: center;
            background: var(--green-glow); color: var(--green);
          }
          .dbw-success-title { font-size: 26px; font-weight: 700; color: var(--text-ivory); margin: 0 0 12px; }
          .dbw-success-desc { color: var(--text-muted); font-size: 15px; line-height: 1.6; max-width: 460px; margin: 0 auto 24px; }
          .dbw-success-badge { background: var(--green-glow) !important; color: var(--green) !important; border: 1px solid var(--border-green) !important; height: auto !important; padding: 6px 14px !important; }
          .dbw-success-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); margin-right: 6px; }

          @media (max-width: 640px) {
            .dbw-two-col { grid-template-columns: 1fr; }
          }
        `}</style>
    </form>
  );
}

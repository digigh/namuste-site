"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Zap,
  ArrowRight,
  Check,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  User,
  ExternalLink,
} from "lucide-react";

const STORAGE_KEY = "namuste_trial_popup_v1";
const WEBHOOK_FALLBACK = "https://aiautomation.digicides.com/webhook/pop_up_data";

const INDUSTRIES = [
  "Doctors & Clinics (Flagship)",
  "Salons & Aesthetics",
  "Distribution & Wholesale",
  "Professional Services (Legal, CA, Consulting)",
  "Agriculture & Rural Helplines",
  "Enterprise & Conglomerates",
  "Other Practice / Business",
];

export default function LeadTrialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Ref to track last draft sent to prevent duplicate webhooks
  const lastSentHashRef = useRef<string>("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Trigger: 3-5s timer OR scroll > 150px
  useEffect(() => {
    let alreadyHandled = false;
    try {
      alreadyHandled = !!localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage disabled/restricted
    }

    let triggered = false;
    const triggerModal = () => {
      if (triggered) return;
      triggered = true;
      setIsOpen(true);
    };

    // Global event: any CTA button can dispatch 'open-lead-modal' to force-open
    const handleForceOpen = () => {
      triggered = false; // reset so it can open even if triggered before
      setIsOpen(true);
    };
    window.addEventListener("open-lead-modal", handleForceOpen);

    if (alreadyHandled) {
      // Still listen for forced opens from CTA buttons even if previously dismissed
      return () => {
        window.removeEventListener("open-lead-modal", handleForceOpen);
      };
    }

    // 4-second timeout trigger
    const timer = setTimeout(() => {
      triggerModal();
    }, 4000);

    // Scroll trigger (scroll > 150px)
    const handleScroll = () => {
      if (window.scrollY > 150) {
        triggerModal();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-lead-modal", handleForceOpen);
    };
  }, []);

  // Email validator helper
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Sanitize phone digits (handles leading +91, 91, or 0)
  const sanitizePhone = (val: string) => {
    let digits = val.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    return digits;
  };

  // Phone validator helper — exactly 10 digits, must start with 6, 7, 8, or 9
  const validatePhone = (val: string): string | null => {
    const raw = val.trim();
    if (!raw) return "Please enter your 10-digit mobile number.";
    const digits = sanitizePhone(raw);
    if (!["6", "7", "8", "9"].includes(digits[0])) {
      return "Mobile number must start with 6, 7, 8, or 9.";
    }
    if (digits.length !== 10) {
      return "Mobile number must be exactly 10 digits.";
    }
    return null;
  };

  const isValidPhone = (val: string) => {
    return validatePhone(val) === null;
  };

  // 2. Smart Data Dispatcher
  const dispatchWebhook = async (
    status: "draft" | "submitted" | "skipped",
    buttonClicked: boolean,
    action: string
  ) => {
    const cleanPhone = sanitizePhone(phone);
    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: cleanPhone || phone.trim(),
      mobileNumber: cleanPhone || phone.trim(),
      rawPhone: phone.trim(),
      industry,
      status,
      buttonClicked,
      action,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      timestamp: new Date().toISOString(),
    };

    // Prevent dispatching empty drafts
    if (status === "draft" && !payload.email && !payload.phone && !payload.fullName) {
      return;
    }

    // Hash check to avoid duplicate dispatches of the same data
    const currentHash = `${payload.fullName}|${payload.email}|${payload.phone}|${payload.industry}|${payload.status}|${payload.buttonClicked}`;
    if (currentHash === lastSentHashRef.current) {
      return;
    }
    lastSentHashRef.current = currentHash;

    const webhookUrl =
      process.env.NEXT_PUBLIC_POPUP_WEBHOOK_URL || WEBHOOK_FALLBACK;

    try {
      // Primary: Post to internal Next.js API route to guarantee server-to-server delivery without CORS blockers
      void fetch("/api/popup-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Fallback: direct browser dispatch if API route is unreachable
        void fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: "no-cors",
          keepalive: true,
        }).catch(() => {});
      });
    } catch {
      // Ignore background network errors
    }
  };

  // Smart Draft Capture on change with debounce
  useEffect(() => {
    if (!isOpen || isSuccess) return;

    // If user has entered at least a semi-valid email or phone or name
    if (fullName.trim().length > 1 || isValidEmail(email) || phone.trim().length >= 8) {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        void dispatchWebhook("draft", false, "auto_draft_captured");
      }, 1400);
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [fullName, email, phone, industry, isOpen, isSuccess]);

  // Handle Input Blur for instant field-level smart capture
  const handleBlur = (field: string) => {
    // Validate current field
    const newErrors = { ...errors };
    if (field === "email" && email.trim() && !isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (field === "email") {
      delete newErrors.email;
    }

    if (field === "phone") {
      const phoneErr = validatePhone(phone);
      if (phone.trim() && phoneErr) {
        newErrors.phone = phoneErr;
      } else {
        delete newErrors.phone;
      }
    }

    setErrors(newErrors);

    // Fire smart draft save on field blur if any field has value
    if (fullName.trim() || email.trim() || phone.trim()) {
      void dispatchWebhook("draft", false, `field_blur_${field}`);
    }
  };

  // Dismiss / Skip Action
  const handleSkip = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "skipped");
    } catch {}

    // Dispatch whatever was entered before closing
    void dispatchWebhook("skipped", false, "skipped_modal");
    setIsOpen(false);
  };

  // Submit / Activate Free Trial
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      validationErrors.fullName = "Please enter your full name.";
    }

    if (!email.trim()) {
      validationErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    const phoneErr = validatePhone(phone);
    if (phoneErr) {
      validationErrors.phone = phoneErr;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      localStorage.setItem(STORAGE_KEY, "submitted");
    } catch {}

    // Dispatch full submitted payload
    await dispatchWebhook("submitted", true, "activate_7_day_free_trial");

    setIsSubmitting(false);
    setIsSuccess(true);

    // After 1.4s, redirect to trial portal
    setTimeout(() => {
      window.location.href = "https://dos.namuste.com/";
    }, 1400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="lead-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lead-modal-backdrop"
            onClick={handleSkip}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="lead-modal-box"
          >
            {/* Top decorative glow */}
            <div className="lead-modal-glow" />

            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="lead-modal-close"
              aria-label="Close modal"
              type="button"
            >
              <X size={16} />
            </button>

            {isSuccess ? (
              <div className="lead-modal-success">
                <div className="lead-success-icon">
                  <Check size={28} strokeWidth={3} />
                </div>
                <h3 className="lead-success-title">Your 7-Day Free Trial is Activated!</h3>
                <p className="lead-success-desc">
                  Welcome to Namuste. We are redirecting you to your practice configuration dashboard with 100 free voice minutes...
                </p>
                <div className="lead-success-loader">
                  <span className="lead-success-dot" />
                  <span className="lead-success-dot" />
                  <span className="lead-success-dot" />
                </div>
              </div>
            ) : (
              <div className="lead-modal-content">
                {/* Header Badge */}
                <div className="lead-modal-chip-row">
                  <span className="lead-modal-chip">
                    <Zap size={11} strokeWidth={2.5} />
                    <span>SPECIAL LAUNCH OFFER</span>
                  </span>
                  <span className="lead-modal-tag">7 DAYS FREE TRIAL</span>
                </div>

                <h2 id="lead-modal-title" className="lead-modal-title">
                  Experience Namuste AI for Your Practice
                </h2>

                <form onSubmit={handleSubmit} className="lead-modal-form" noValidate>
                  {/* Full Name */}
                  <div className="lead-form-group">
                    <label className="lead-label" htmlFor="lead-name">
                      Full Name
                    </label>
                    <div className="lead-input-wrap">
                      <User size={15} className="lead-input-icon" />
                      <input
                        id="lead-name"
                        type="text"
                        placeholder="Dr. Arjun Mehta / Priya Rao"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => handleBlur("fullName")}
                        className={`lead-input ${errors.fullName ? "is-error" : ""}`}
                        required
                      />
                    </div>
                    {errors.fullName && <span className="lead-error-text">{errors.fullName}</span>}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="lead-grid-row">
                    <div className="lead-form-group">
                      <label className="lead-label" htmlFor="lead-email">
                        Work / Clinic Email
                      </label>
                      <div className="lead-input-wrap">
                        <Mail size={15} className="lead-input-icon" />
                        <input
                          id="lead-email"
                          type="email"
                          placeholder="doctor@clinic.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => handleBlur("email")}
                          className={`lead-input ${errors.email ? "is-error" : ""}`}
                          required
                        />
                      </div>
                      {errors.email && <span className="lead-error-text">{errors.email}</span>}
                    </div>

                    <div className="lead-form-group">
                      <label className="lead-label" htmlFor="lead-phone">
                        Mobile Number
                      </label>
                      <div className="lead-input-wrap">
                        <Phone size={15} className="lead-input-icon" />
                        <input
                          id="lead-phone"
                          type="tel"
                          placeholder="98765 43210 (10 digits)"
                          value={phone}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPhone(val);
                            if (errors.phone && validatePhone(val) === null) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.phone;
                                return next;
                              });
                            }
                          }}
                          onBlur={() => handleBlur("phone")}
                          className={`lead-input ${errors.phone ? "is-error" : ""}`}
                          required
                        />
                      </div>
                      {errors.phone && <span className="lead-error-text">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Industry Select */}
                  <div className="lead-form-group">
                    <label className="lead-label" htmlFor="lead-industry">
                      Industry / Practice Area
                    </label>
                    <div className="lead-input-wrap">
                      <Building2 size={15} className="lead-input-icon" />
                      <select
                        id="lead-industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="lead-select"
                      >
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Perk Checkmarks */}
                  <div className="lead-modal-perks">
                    <span className="lead-perk-item">
                      <Check size={12} strokeWidth={3} /> 100 Free Voice Minutes
                    </span>
                    <span className="lead-perk-item">
                      <Check size={12} strokeWidth={3} /> No Credit Card Needed
                    </span>
                    <span className="lead-perk-item">
                      <Check size={12} strokeWidth={3} /> 2-Min Activation
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="lead-modal-actions">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="lead-btn-submit"
                    >
                      {isSubmitting ? (
                        <span>Activating Trial…</span>
                      ) : (
                        <>
                          <Zap size={14} strokeWidth={2.5} />
                          <span>Claim 7-Day Free Trial</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleSkip}
                      className="lead-btn-skip"
                    >
                      Skip for now
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>

          <style>{`
            .lead-modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            .lead-modal-backdrop {
              position: absolute;
              inset: 0;
              background: rgba(0, 0, 0, 0.68);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
            }
            .lead-modal-box {
              position: relative;
              width: 100%;
              max-width: 540px;
              background: var(--surface);
              border: 1px solid var(--border-green);
              border-radius: 24px;
              box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.45), 0 0 32px -4px var(--green-glow);
              overflow: hidden;
              z-index: 10;
              color: var(--text-ivory);
            }
            .lead-modal-glow {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 320px;
              height: 120px;
              background: radial-gradient(ellipse at top, var(--green-glow) 0%, transparent 70%);
              pointer-events: none;
            }
            .lead-modal-close {
              position: absolute;
              top: 16px;
              right: 16px;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: var(--surface2);
              border: 1px solid var(--border);
              color: var(--text-muted);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
              z-index: 20;
            }
            .lead-modal-close:hover {
              color: var(--text-ivory);
              border-color: var(--border2);
              transform: scale(1.05);
            }
            .lead-modal-content {
              padding: 32px 32px 28px;
            }
            .lead-modal-chip-row {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 12px;
            }
            .lead-modal-chip {
              display: inline-flex;
              align-items: center;
              gap: 5px;
              padding: 3px 9px;
              border-radius: 999px;
              background: var(--green-glow);
              color: var(--green);
              border: 1px solid var(--border-green);
              font-size: 10.5px;
              font-weight: 800;
              letter-spacing: 0.05em;
            }
            .lead-modal-tag {
              font-family: 'SF Mono', 'Menlo', monospace;
              font-size: 10.5px;
              font-weight: 700;
              color: var(--green);
              letter-spacing: 0.06em;
              background: var(--green-glow);
              padding: 3px 9px;
              border-radius: 999px;
              border: 1px solid var(--border-green);
            }
            .lead-modal-title {
              font-size: 24px;
              font-weight: 800;
              letter-spacing: -0.02em;
              line-height: 1.2;
              color: var(--text-ivory);
              margin: 0 0 8px;
            }
            .lead-modal-subtitle {
              font-size: 13.5px;
              color: var(--text-muted);
              line-height: 1.5;
              margin: 0 0 20px;
            }
            .lead-modal-form {
              display: flex;
              flex-direction: column;
              gap: 14px;
            }
            .lead-grid-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }
            .lead-form-group {
              display: flex;
              flex-direction: column;
              gap: 5px;
            }
            .lead-label {
              font-size: 12px;
              font-weight: 600;
              color: var(--text-body);
              letter-spacing: 0.01em;
            }
            .lead-input-wrap {
              position: relative;
              display: flex;
              align-items: center;
            }
            .lead-input-icon {
              position: absolute;
              left: 12px;
              color: var(--text-dim);
              pointer-events: none;
            }
            .lead-input {
              width: 100%;
              padding: 9px 12px 9px 36px;
              border-radius: 10px;
              background: var(--surface2);
              border: 1px solid var(--border);
              color: var(--text-ivory);
              font-size: 13px;
              outline: none;
              transition: all 0.2s ease;
            }
            .lead-input:focus {
              border-color: var(--green);
              box-shadow: 0 0 0 3px var(--green-glow);
            }
            .lead-input.is-error {
              border-color: #ef4444;
              background: rgba(239, 68, 68, 0.05);
            }
            .lead-select {
              width: 100%;
              padding: 9px 12px 9px 36px;
              border-radius: 10px;
              background: var(--surface2);
              border: 1px solid var(--border);
              color: var(--text-ivory);
              font-size: 13px;
              outline: none;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .lead-select:focus {
              border-color: var(--green);
              box-shadow: 0 0 0 3px var(--green-glow);
            }
            .lead-select option {
              background: var(--surface, #111B15);
              color: var(--text-ivory, #F5F5F0);
              padding: 8px 12px;
            }
            .lead-error-text {
              font-size: 11px;
              color: #ef4444;
              font-weight: 500;
              margin-top: 2px;
            }
            .lead-modal-perks {
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 8px;
              padding: 10px 14px;
              background: var(--surface2);
              border-radius: 10px;
              border: 1px solid var(--border);
              font-size: 11.5px;
              font-weight: 600;
              color: var(--text-body);
              margin-top: 4px;
            }
            .lead-perk-item {
              display: inline-flex;
              align-items: center;
              gap: 5px;
              color: var(--text-body);
            }
            .lead-perk-item svg {
              color: var(--green);
            }
            .lead-modal-actions {
              display: flex;
              flex-direction: column;
              gap: 8px;
              margin-top: 8px;
            }
            .lead-btn-submit {
              position: relative;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 12px 20px;
              border-radius: 999px;
              background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%);
              color: #05180D;
              font-size: 13.5px;
              font-weight: 800;
              border: none;
              cursor: pointer;
              box-shadow: 0 0 24px rgba(0, 229, 117, 0.45), 0 4px 14px rgba(0, 0, 0, 0.25);
              transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
              overflow: hidden;
            }
            .lead-btn-submit:hover:not(:disabled) {
              transform: translateY(-1.5px);
              box-shadow: 0 0 32px rgba(0, 229, 117, 0.65), 0 6px 18px rgba(0, 0, 0, 0.35);
            }
            .lead-btn-submit:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }
            .lead-btn-skip {
              background: none;
              border: none;
              color: var(--text-muted);
              font-size: 12.5px;
              font-weight: 600;
              padding: 6px;
              cursor: pointer;
              transition: color 0.2s ease;
              text-align: center;
            }
            .lead-btn-skip:hover {
              color: var(--text-ivory);
            }
            .lead-modal-success {
              padding: 48px 32px;
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .lead-success-icon {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              background: var(--green-glow);
              border: 2px solid var(--green);
              color: var(--green);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              box-shadow: 0 0 30px var(--green-glow);
            }
            .lead-success-title {
              font-size: 22px;
              font-weight: 800;
              color: var(--text-ivory);
              margin: 0 0 10px;
            }
            .lead-success-desc {
              font-size: 14px;
              color: var(--text-muted);
              line-height: 1.55;
              max-width: 400px;
              margin: 0 0 24px;
            }
            .lead-success-loader {
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .lead-success-dot {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: var(--green);
              animation: leadDotPulse 1.2s infinite ease-in-out;
            }
            .lead-success-dot:nth-child(2) { animation-delay: 0.2s; }
            .lead-success-dot:nth-child(3) { animation-delay: 0.4s; }
            @keyframes leadDotPulse {
              0%, 100% { opacity: 0.3; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }

            @media (max-width: 580px) {
              .lead-modal-content {
                padding: 24px 20px 20px;
              }
              .lead-grid-row {
                grid-template-columns: 1fr;
              }
              .lead-modal-title {
                font-size: 20px;
              }
              .lead-modal-perks {
                flex-direction: column;
                align-items: flex-start;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}

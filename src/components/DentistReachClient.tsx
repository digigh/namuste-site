"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ClinicLiveAgent from "@/components/ClinicLiveAgent";
import {
  PhoneCall,
  PhoneMissed,
  PhoneForwarded,
  Clock,
  CalendarDays,
  CalendarClock,
  CalendarCheck,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  UserPlus,
  Building2,
  Stethoscope,
  Moon,
} from "lucide-react";

const WEBHOOK_URL = "https://aiautomation.digicides.com/webhook/namuste_dentist_reach";

const CITIES = [
  "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Other",
];

const PROBLEMS = [
  { icon: <PhoneMissed size={20} />, title: "Missed Patient Calls", desc: "Your staff can't pick up every call while managing the front desk." },
  { icon: <Clock size={20} />, title: "After-Hours Enquiries", desc: "Patients may call when your clinic is closed." },
  { icon: <CalendarDays size={20} />, title: "Appointment Requests", desc: "Your team spends time answering repetitive questions and handling appointment enquiries." },
];

const SOLUTIONS = [
  { icon: <PhoneCall size={20} />, title: "Answers Calls", desc: "Responds to incoming patient calls." },
  { icon: <HelpCircle size={20} />, title: "Handles FAQs", desc: "Provides information based on your clinic's instructions." },
  { icon: <CalendarCheck size={20} />, title: "Appointment Assistance", desc: "Helps patients with appointment-related requests." },
  { icon: <PhoneForwarded size={20} />, title: "Human Handover", desc: "Transfers calls to your team when required." },
];

const STEPS = [
  "Patient Calls",
  "AI Receptionist Answers",
  "Patient Gets Help",
  "Appointment Request / Human Transfer",
];

const USE_CASES = [
  { icon: <UserPlus size={20} />, title: "New Patient Enquiries", desc: "Handle enquiries from potential new patients." },
  { icon: <CalendarClock size={20} />, title: "Appointment Requests", desc: "Help patients with appointment-related conversations." },
  { icon: <Building2 size={20} />, title: "Clinic Information", desc: "Answer common questions about timings, location and services." },
  { icon: <Stethoscope size={20} />, title: "Treatment Enquiries", desc: "Provide information based on the responses you've configured." },
  { icon: <Moon size={20} />, title: "After-Hours Calls", desc: "Keep your phone line responsive beyond clinic hours." },
  { icon: <PhoneForwarded size={20} />, title: "Call Transfer", desc: "Connect patients with your team when necessary." },
];

function LeadForm({ onSuccess }: { onSuccess: (name: string) => void }) {
  const [formData, setFormData] = useState({ name: "", clinicName: "", phone: "", email: "", city: "", customCity: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digits }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = "Please enter your name";
    if (!formData.clinicName.trim()) err.clinicName = "Please enter your clinic name";

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone) {
      err.phone = "Please enter your 10-digit phone number";
    } else if (!["6", "7", "8", "9"].includes(cleanPhone[0])) {
      err.phone = "Phone number must start with 6, 7, 8, or 9";
    } else if (cleanPhone.length !== 10) {
      err.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.email.trim() || !formData.email.includes("@")) err.email = "Please enter a valid email address";
    if (!formData.city) {
      err.city = "Please select your city";
    } else if (formData.city === "Other" && !formData.customCity.trim()) {
      err.city = "Please enter your city";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const payload = {
      name: formData.name.trim(),
      clinic_name: formData.clinicName.trim(),
      phone: `+91 ${formData.phone.trim()}`,
      email: formData.email.trim(),
      city: formData.city === "Other" ? formData.customCity.trim() : formData.city,
      submitted_at: new Date().toISOString(),
      source: "Namuste Dentist Reach Landing Page",
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
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

    onSuccess(formData.name.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="dr-form-card">
        <CardContent className="flex flex-col gap-0">
          <h3 className="dr-form-title">See How AI Can Handle Your Patient Calls</h3>

          <div className="dr-field">
            <label className="dr-label">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="dr-input"
              style={{ borderColor: errors.name ? "var(--coral)" : undefined }}
            />
            {errors.name && <span className="dr-error">{errors.name}</span>}
          </div>

          <div className="dr-field">
            <label className="dr-label">Dental Clinic Name</label>
            <input
              type="text"
              value={formData.clinicName}
              onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
              placeholder="Enter clinic name"
              className="dr-input"
              style={{ borderColor: errors.clinicName ? "var(--coral)" : undefined }}
            />
            {errors.clinicName && <span className="dr-error">{errors.clinicName}</span>}
          </div>

          <div className="dr-field">
            <label className="dr-label">Phone Number</label>
            <div className="dr-phone-wrap">
              <span className="dr-phone-prefix">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="XXXXX XXXXX"
                className="dr-input dr-input-phone"
                style={{ borderColor: errors.phone ? "var(--coral)" : undefined }}
              />
            </div>
            {errors.phone && <span className="dr-error">{errors.phone}</span>}
          </div>

          <div className="dr-field">
            <label className="dr-label">Work Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="dr-input"
              style={{ borderColor: errors.email ? "var(--coral)" : undefined }}
            />
            {errors.email && <span className="dr-error">{errors.email}</span>}
          </div>

          <div className="dr-field">
            <label className="dr-label">City</label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="dr-input dr-select"
              style={{ borderColor: errors.city && !formData.customCity ? "var(--coral)" : undefined, color: formData.city ? "var(--text-ivory)" : "var(--text-muted)" }}
            >
              <option value="" disabled>Select city</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {formData.city === "Other" && (
              <input
                type="text"
                value={formData.customCity}
                onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                placeholder="Enter your city (and state)"
                className="dr-input"
                style={{ marginTop: "8px", borderColor: errors.city ? "var(--coral)" : undefined }}
                autoFocus
              />
            )}
            {errors.city && <span className="dr-error">{errors.city}</span>}
          </div>

          <button type="submit" disabled={status === "submitting"} className="dr-btn-primary">
            {status === "submitting" ? "Submitting..." : "GET MY FREE DEMO"}
          </button>
          <p className="dr-form-disclaimer">No commitment. See the AI receptionist in action.</p>
        </CardContent>
      </Card>

      <style>{`
        .dr-form-card { border-radius: 20px; }
        .dr-form-title { font-size: 19px; font-weight: 700; color: var(--text-ivory); margin: 0 0 20px; line-height: 1.35; }
        .dr-field { margin-bottom: 16px; }
        .dr-label { font-size: 12px; font-weight: 600; color: var(--text-ivory); display: block; margin-bottom: 6px; }
        .dr-input {
          width: 100%; box-sizing: border-box;
          padding: 12px 14px; border-radius: 10px;
          border: 1px solid var(--border); background: var(--overlay-1);
          color: var(--text-ivory); font-size: 14px; outline: none;
        }
        .dr-input:focus { border-color: var(--border-green); }
        .dr-select { cursor: pointer; }
        .dr-phone-wrap { position: relative; display: flex; align-items: center; }
        .dr-phone-prefix { position: absolute; left: 14px; color: var(--text-muted); font-size: 13.5px; font-weight: 600; pointer-events: none; }
        .dr-input-phone { padding-left: 48px; letter-spacing: 0.04em; }
        .dr-error { font-size: 11px; color: var(--coral); margin-top: 4px; display: block; }
        .dr-btn-primary {
          width: 100%; box-sizing: border-box; margin-top: 6px;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 15px; border-radius: 999px; border: none; cursor: pointer;
          background: var(--green); color: #052015;
          font-size: 14px; font-weight: 800; letter-spacing: 0.02em;
        }
        .dr-btn-primary:disabled { opacity: 0.6; cursor: default; }
        .dr-form-disclaimer { text-align: center; font-size: 12px; color: var(--text-muted); margin: 12px 0 0; }
      `}</style>
    </form>
  );
}

export default function DentistReachClient() {
  const [submitted, setSubmitted] = useState(false);
  const [leadName, setLeadName] = useState("");
  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const tryItRef = useRef<HTMLDivElement | null>(null);

  const handleSuccess = (name: string) => {
    setLeadName(name);
    setSubmitted(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        tryItRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    });
  };

  const handleCtaClick = () => {
    if (submitted) {
      tryItRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="dr-hero-pad">
        <div className="dr-container-wide">
          <div className="dr-hero-grid">
            <div>
              <div className="dr-eyebrow">
                <span className="dr-eyebrow-dot" />
                FOR DENTAL CLINICS
              </div>
              <h1 className="dr-headline">Never Miss Another Patient Call</h1>
              <p className="dr-subhead">Your AI Receptionist for Dental Clinics</p>
              <p className="dr-desc">
                Answer patient calls, handle common enquiries, and help book appointments 24/7, even when your team is busy.
              </p>
              <button type="button" className="dr-btn-secondary" onClick={handleCtaClick}>
                Book a Free Demo <ArrowDown size={15} />
              </button>
            </div>

            <div ref={formSectionRef}>
              {submitted ? (
                <Card className="dr-success-card">
                  <CardContent className="flex flex-col items-center text-center">
                    <div className="dr-success-icon"><CheckCircle2 size={30} /></div>
                    <h3 className="dr-success-title">Thank You, {leadName || "there"}!</h3>
                    <p className="dr-success-desc">
                      Your request has been received. Scroll down to talk to the AI receptionist yourself, right now.
                    </p>
                    <button type="button" className="dr-btn-secondary" onClick={() => tryItRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                      Try It Now <ArrowDown size={15} />
                    </button>
                  </CardContent>
                </Card>
              ) : (
                <LeadForm onSuccess={handleSuccess} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="dr-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="dr-container">
          <div className="dr-section-head">
            <h2 className="dr-h2">
              Your Receptionist Can&rsquo;t Answer Every Call. <span style={{ color: "var(--green)" }}>Your Patients Still Expect an Answer.</span>
            </h2>
            <p className="dr-section-desc">
              When your team is busy with patients, handling appointments, or the clinic is closed, calls can go unanswered. For a dental clinic, that can mean missed enquiries and missed appointment opportunities.
            </p>
          </div>

          <div className="dr-cards-grid dr-cards-grid-3">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="dr-simple-card">
                  <CardContent className="flex flex-col gap-3">
                    <span className="dr-card-icon is-coral">{p.icon}</span>
                    <h3 className="dr-card-title">{p.title}</h3>
                    <p className="dr-card-desc">{p.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SOLUTION */}
      <section className="dr-section-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div className="dr-container">
          <div className="dr-section-head">
            <h2 className="dr-h2">
              Meet Your Dental Clinic&rsquo;s <span style={{ color: "var(--green)" }}>AI Receptionist</span>
            </h2>
            <p className="dr-section-desc">
              A virtual receptionist designed to handle your incoming patient calls, answer common questions, assist with appointment requests, and transfer calls to your team when human assistance is needed.
            </p>
          </div>

          <div className="dr-cards-grid dr-cards-grid-4">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="dr-simple-card">
                  <CardContent className="flex flex-col gap-3">
                    <span className="dr-card-icon">{s.icon}</span>
                    <h3 className="dr-card-title">{s.title}</h3>
                    <p className="dr-card-desc">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: EXPERIENCE */}
      <section className="dr-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="dr-container">
          <div className="dr-section-head">
            <h2 className="dr-h2">
              What Happens When a <span style={{ color: "var(--green)" }}>Patient Calls?</span>
            </h2>
          </div>

          <div className="dr-steps-row">
            {STEPS.map((step, i) => (
              <div key={i} className="dr-step-item">
                <div className="dr-step-node">
                  <span className="dr-step-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="dr-step-text">{step}</span>
                </div>
                {i < STEPS.length - 1 && <span className="dr-step-arrow">→</span>}
              </div>
            ))}
          </div>

          <div className="dr-convo">
            <div className="dr-convo-row">
              <span className="dr-convo-label">Patient:</span>
              <div className="dr-convo-bubble">&ldquo;Hi, I&rsquo;d like to book a dental appointment.&rdquo;</div>
            </div>
            <div className="dr-convo-row is-ai">
              <span className="dr-convo-label is-ai">AI Receptionist:</span>
              <div className="dr-convo-bubble is-ai">&ldquo;Sure, I&rsquo;d be happy to help. What day would you prefer?&rdquo;</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: USE CASES */}
      <section className="dr-section-pad" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div className="dr-container-wide">
          <div className="dr-section-head">
            <h2 className="dr-h2">
              More Than Just <span style={{ color: "var(--green)" }}>Answering Calls</span>
            </h2>
          </div>

          <div className="dr-cards-grid dr-cards-grid-3">
            {USE_CASES.map((u, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="dr-simple-card">
                  <CardContent className="flex flex-col gap-3">
                    <span className="dr-card-icon">{u.icon}</span>
                    <h3 className="dr-card-title">{u.title}</h3>
                    <p className="dr-card-desc">{u.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRY IT LIVE — unlocked after form submission */}
      {submitted && (
        <section ref={tryItRef} className="dr-section-pad" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
          <div className="dr-container">
            <div className="dr-section-head">
              <div className="dr-eyebrow" style={{ justifyContent: "center" }}>
                <span className="dr-eyebrow-dot" />
                YOUR LIVE DEMO IS READY
              </div>
              <h2 className="dr-h2">
                Talk to Your <span style={{ color: "var(--green)" }}>AI Receptionist</span> Now
              </h2>
              <p className="dr-section-desc">
                This is the exact AI receptionist your patients would talk to. Try booking an appointment or asking a clinic question.
              </p>
            </div>

            <ClinicLiveAgent />
          </div>
        </section>
      )}

      {/* SECTION 6: CLOSING CTA */}
      <section className="dr-closing-section">
        <div className="dr-container">
          <h2 className="dr-h2">
            See How It Works for <span style={{ color: "var(--green)" }}>Your Dental Clinic</span>
          </h2>
          <p className="dr-section-desc" style={{ margin: "0 auto 28px" }}>
            Experience a live demo of an AI receptionist handling a patient call.
          </p>
          <button type="button" className="dr-btn-primary-cta" onClick={handleCtaClick}>
            Book My Free Demo <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <style>{`
        .dr-hero-pad { padding: 150px 36px 80px; }
        .dr-container { max-width: 900px; margin: 0 auto; }
        .dr-container-wide { max-width: 1280px; margin: 0 auto; }
        .dr-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; max-width: 1280px; margin: 0 auto; }

        .dr-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; letter-spacing: 0.1em;
          color: var(--text-muted); margin-bottom: 18px;
        }
        .dr-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

        .dr-headline {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(32px, 4vw, 50px);
          line-height: 1.12; letter-spacing: -0.02em; color: var(--text-ivory); margin: 0 0 12px;
        }
        .dr-subhead { font-size: clamp(17px, 1.8vw, 21px); font-weight: 700; color: var(--green); margin: 0 0 18px; }
        .dr-desc { color: var(--text-muted); font-size: clamp(15px, 1.3vw, 17px); line-height: 1.65; margin: 0 0 32px; max-width: 480px; }

        .dr-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 26px; border-radius: 999px;
          border: 1px solid var(--border2); background: transparent; color: var(--text-ivory);
          font-size: 14px; font-weight: 700; cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .dr-btn-secondary:hover { border-color: var(--border-green); background: var(--green-glow); }

        .dr-section-pad { padding: 90px 36px; }
        .dr-section-head { max-width: 700px; margin: 0 auto 48px; text-align: center; }
        .dr-h2 {
          font-family: var(--font-sans); font-weight: 800; font-size: clamp(26px, 3.4vw, 40px);
          line-height: 1.2; letter-spacing: -0.015em; color: var(--text-ivory); margin: 0 0 16px;
        }
        .dr-section-desc { color: var(--text-muted); font-size: 15px; line-height: 1.7; margin: 0; }

        .dr-cards-grid { display: grid; gap: 20px; }
        .dr-cards-grid-3 { grid-template-columns: repeat(3, 1fr); }
        .dr-cards-grid-4 { grid-template-columns: repeat(4, 1fr); }
        .dr-simple-card { height: 100%; }
        .dr-card-icon {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .dr-card-icon.is-coral { background: var(--coral-bg); color: var(--coral); }
        .dr-card-title { font-size: 17px; font-weight: 700; color: var(--text-ivory); margin: 0; }
        .dr-card-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin: 0; }

        .dr-steps-row { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; margin-bottom: 56px; }
        .dr-step-item { display: flex; align-items: center; gap: 8px; }
        .dr-step-node {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 18px 22px; border-radius: 16px;
          background: var(--surface); border: 1px solid var(--border);
          min-width: 140px; text-align: center;
        }
        .dr-step-number { font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; color: var(--green); font-weight: 700; }
        .dr-step-text { font-size: 13.5px; font-weight: 600; color: var(--text-ivory); }
        .dr-step-arrow { color: var(--border-green); font-size: 18px; }

        .dr-convo { max-width: 520px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
        .dr-convo-row { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
        .dr-convo-row.is-ai { align-items: flex-end; }
        .dr-convo-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); }
        .dr-convo-label.is-ai { color: var(--green); }
        .dr-convo-bubble {
          padding: 14px 18px; border-radius: 16px; border-bottom-left-radius: 4px;
          background: var(--surface); border: 1px solid var(--border);
          color: var(--text-ivory); font-size: 14.5px; line-height: 1.5; max-width: 90%;
        }
        .dr-convo-bubble.is-ai {
          border-bottom-left-radius: 16px; border-bottom-right-radius: 4px;
          background: var(--green-glow); border-color: var(--border-green);
        }

        .dr-success-card { text-align: center; border-color: var(--border-green); }
        .dr-success-icon {
          width: 56px; height: 56px; border-radius: 50%; margin-bottom: 18px;
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .dr-success-title { font-size: 23px; font-weight: 700; color: var(--text-ivory); margin: 0 0 10px; }
        .dr-success-desc { color: var(--text-muted); font-size: 14.5px; line-height: 1.6; margin: 0 0 22px; }

        .dr-closing-section { padding: 90px 36px; text-align: center; background: var(--bg); border-top: 1px solid var(--border); }
        .dr-btn-primary-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 999px; border: none; cursor: pointer;
          background: var(--text-ivory); color: var(--bg);
          font-size: 14.5px; font-weight: 700;
          transition: transform 0.2s ease;
        }
        .dr-btn-primary-cta:hover { transform: translateY(-2px); }

        @media (max-width: 960px) {
          .dr-hero-grid { grid-template-columns: 1fr; }
          .dr-cards-grid-3, .dr-cards-grid-4 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .dr-hero-pad { padding: 110px 20px 50px; }
          .dr-section-pad { padding: 56px 20px; }
          .dr-cards-grid-3, .dr-cards-grid-4 { grid-template-columns: 1fr; }
          .dr-step-node { min-width: 120px; }
          .dr-closing-section { padding: 56px 20px; }
        }
      `}</style>
    </>
  );
}

"use client";

import { useState } from "react";
import { Stethoscope, Calendar, Clock, User, Phone, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

interface SpecialtyOption {
  id: string;
  name: string;
  doctor: string;
  query: string;
  assistantReply: string;
  patientChoice: string;
  outcome: string;
  prepAdvice: string;
}

const specialties: SpecialtyOption[] = [
  {
    id: "dermatology",
    name: "Dermatology & Skin",
    doctor: "Dr. Ananya Sen, MD (Dermatology)",
    query: "Is Dr. Sen available tomorrow evening for an acne consultation?",
    assistantReply: "Hello! Dr. Sen is in clinic tomorrow from 5:00 PM to 8:00 PM. We have slots open at 5:30 PM and 7:15 PM. Which time works best for you?",
    patientChoice: "7:15 PM please.",
    outcome: "Appointment booked for Tomorrow @ 7:15 PM · Calendar updated · WhatsApp confirmation & clinic GPS sent to patient.",
    prepAdvice: "Please avoid applying makeup or topical ointments for 2 hours before the consultation.",
  },
  {
    id: "dental",
    name: "Dental Care",
    doctor: "Dr. Rajesh Varma, MDS (Orthodontics)",
    query: "Do you have an emergency slot for tooth pain and root canal checkup today?",
    assistantReply: "We understand severe pain is difficult. Dr. Varma has an urgent priority buffer slot today at 4:30 PM. Shall I reserve this for you?",
    patientChoice: "Yes, 4:30 PM is perfect.",
    outcome: "Urgent slot confirmed for Today @ 4:30 PM · Front-desk alerted with emergency tag · Digital intake form dispatched.",
    prepAdvice: "Please bring any prior dental X-rays or prescription notes if available.",
  },
  {
    id: "paediatrics",
    name: "Paediatrics & Child Health",
    doctor: "Dr. Meera Nambiar, MD (Paediatrics)",
    query: "I need to schedule my 6-month baby's vaccination visit this Saturday morning.",
    assistantReply: "Good morning! Dr. Nambiar conducts vaccination clinics on Saturday between 9:30 AM and 1:00 PM. Would 10:30 AM be convenient?",
    patientChoice: "Yes, 10:30 AM works well.",
    outcome: "Vaccination slot scheduled for Saturday @ 10:30 AM · Child growth chart record tagged · Vaccine stock pre-allocated.",
    prepAdvice: "Please carry the baby's vaccination booklet and ensure the baby is well-hydrated.",
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics & Joint",
    doctor: "Dr. Vikram Sethi, MS (Orthopaedics)",
    query: "What are Dr. Sethi's consultation days for knee pain evaluation?",
    assistantReply: "Dr. Sethi is available on Mondays, Wednesdays, and Fridays from 10:00 AM to 2:00 PM. Next available slot is this Wednesday at 11:00 AM.",
    patientChoice: "Wednesday at 11:00 AM.",
    outcome: "Slot confirmed for Wednesday @ 11:00 AM · Wheelchair assistance pre-notified to clinic reception.",
    prepAdvice: "If you have recent knee X-rays or MRI reports, please bring them along.",
  },
];

export default function ClinicAssistantDemo() {
  const [selectedId, setSelectedId] = useState<string>("dermatology");
  const current = specialties.find((s) => s.id === selectedId)!;

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "24px",
        background: "rgba(10, 14, 10, 0.85)",
        border: "1px solid var(--border)",
        padding: "36px",
        boxShadow: "0 24px 80px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Specialty Selector Tabs */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "12px" }}>
          Select Specialty Demonstration
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {specialties.map((s) => {
            const isActive = s.id === selectedId;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                style={{
                  background: isActive ? "rgba(118, 192, 67, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${isActive ? "var(--green)" : "var(--border)"}`,
                  color: isActive ? "var(--green-luminous)" : "var(--text-body)",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulated Live Dialogue Progression */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "32px",
          alignItems: "start",
        }}
        className="clinic-demo-grid"
      >
        {/* Left: Chat progression */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
            <Stethoscope size={14} style={{ color: "var(--green)" }} />
            <span>Consulting Physician: <strong style={{ color: "var(--text-ivory)" }}>{current.doctor}</strong></span>
          </div>

          {/* 1. Patient Query */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "16px 20px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--coral)", textTransform: "uppercase", marginBottom: "4px" }}>
              Patient Inbound Query
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.5 }}>
              &ldquo;{current.query}&rdquo;
            </div>
          </div>

          {/* 2. Namuste Response */}
          <div
            style={{
              background: "rgba(118, 192, 67, 0.08)",
              border: "1px solid rgba(118, 192, 67, 0.25)",
              borderRadius: "14px",
              padding: "16px 20px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", marginBottom: "4px" }}>
              Namuste Clinic Assistant
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.5 }}>
              {current.assistantReply}
            </div>
          </div>

          {/* 3. Patient Choice */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "13.5px", color: "var(--text-body)" }}>Patient Selection:</span>
            <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--green-luminous)" }}>&ldquo;{current.patientChoice}&rdquo;</span>
          </div>
        </div>

        {/* Right: Front-Desk EMR Outcome Card */}
        <div
          style={{
            background: "rgba(8, 16, 8, 0.95)",
            border: "1px solid rgba(118, 192, 67, 0.35)",
            borderRadius: "18px",
            padding: "26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Sparkles size={16} style={{ color: "var(--green)" }} />
            <h4 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--green)" }}>
              Automated Clinic Desk Action
            </h4>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "20px" }}>
            <CheckCircle2 size={18} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.55 }}>
              {current.outcome}
            </p>
          </div>

          {/* Preparation Advice */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "14px",
              marginBottom: "18px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
              Automated Patient Pre-Visit Guidance
            </div>
            <div style={{ fontSize: "12.5px", color: "var(--text-body)", lineHeight: 1.5 }}>
              {current.prepAdvice}
            </div>
          </div>

          {/* Safety Boundary Note */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "11.5px", color: "var(--text-muted)" }}>
            <ShieldAlert size={14} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
            <span>Strictly handles appointments & clinic FAQs. Zero medical diagnosis or prescription advice.</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .clinic-demo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

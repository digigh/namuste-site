"use client";

import React, { useState } from "react";
import { PhoneCall, MessageSquare, Globe, Languages, CheckCircle2, ShieldCheck } from "lucide-react";

const LANGUAGES = [
  { id: "en", name: "English", script: "Hello, I want to reschedule my appointment with Dr. Mehta to Friday 4 PM.", reply: "Certainly. I have shifted your appointment to Friday, 4:00 PM. A calendar update has been sent to your WhatsApp." },
  { id: "hi", name: "हिन्दी (Hindi)", script: "नमस्ते, क्या मैं अपना अपॉइंटमेंट शुक्रवार शाम 4 बजे के लिए बदल सकता हूँ?", reply: "जी बिल्कुल। आपका अपॉइंटमेंट शुक्रवार शाम 4:00 बजे के लिए रीशेड्यूल कर दिया गया है। कन्फर्मेशन आपके व्हाट्सएप पर भेज दिया है।" },
  { id: "hinglish", name: "Hinglish", script: "Bhaiya mera appointment Friday 4 baje shift ho sakta hai kya Dr. Mehta ke sath?", reply: "Bilkul, Dr. Mehta ka Friday 4:00 PM ka slot confirm kar diya hai. Details WhatsApp pe bhej di hain." },
  { id: "mr", name: "मराठी (Marathi)", script: "नमस्कार, माझी अपॉइंटमेंट शुक्रवार दुपारी ४ वाजता होऊ शकते का?", reply: "हो नक्कीच. तुमची अपॉइंटमेंट शुक्रवार दुपारी ४:०० वाजता निश्चित केली आहे. तपशील व्हॉट्सअॅपवर पाठवले आहेत." },
  { id: "ta", name: "தமிழ் (Tamil)", script: "வணக்கம், எனது அப்பாயிண்ட்மென்ட்டை வெள்ளிக்கிழமை மாலை 4 மணிக்கு மாற்ற முடியுமா?", reply: "நிச்சயமாக. உங்கள் முன்பதிவு வெள்ளிக்கிழமை மாலை 4:00 மணிக்கு மாற்றப்பட்டது. விவரங்கள் வாட்ஸ்அப்பில் அனுப்பப்பட்டுள்ளன." },
  { id: "te", name: "తెలుగు (Telugu)", script: "నమస్తే, నా అపాయింట్‌మెంట్‌ను శుక్రవారం సాయంత్రం 4 గంటలకు మార్చవచ్చా?", reply: "తప్పకుండా. మీ అపాయింట్‌మెంట్ శుక్రవారం సాయంత్రం 4:00 గంటలకు రీషెడ్యూల్ చేయబడింది." },
  { id: "bn", name: "বাংলা (Bengali)", script: "নমস্কার, আমার অ্যাপয়েন্টমেন্ট শুক্রবার বিকেল ৪টেয় পরিবর্তন করা যাবে?", reply: "অবশ্যই। আপনার অ্যাপয়েন্টমেন্ট শুক্রবার বিকেল ৪:০০ টায় নির্ধারিত করা হয়েছে।" },
  { id: "gu", name: "ગુજરાતી (Gujarati)", script: "નમસ્તે, શું મારી એપોઇન્ટમેન્ટ શુક્રવારે સાંજે 4 વાગ્યે શિફ્ટ થઈ શકે?", reply: "ચોક્કસ. તમારી એપોઇન્ટમેન્ટ શુક્રવારે સાંજે 4:00 વાગ્યે કન્ફર્મ થઈ ગઈ છે." },
];

export default function CrossChannelContinuity() {
  const [activeLang, setActiveLang] = useState<string>("en");
  const currentLang = LANGUAGES.find((l) => l.id === activeLang) || LANGUAGES[0];

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* 1. Cross-Channel Continuum Flow (HP-06) */}
      <div
        className="glass-card"
        style={{
          padding: "36px",
          borderRadius: "22px",
          background: "rgba(11, 14, 11, 0.85)",
          border: "1px solid rgba(118, 192, 67, 0.2)",
          boxShadow: "0 16px 50px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "24px", marginBottom: "32px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", marginBottom: "6px" }}>
              HP-06 • Cross-Channel Context Persistence
            </div>
            <h3 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", margin: 0, fontWeight: 400 }}>
              One unbroken conversation across Voice, WhatsApp & Web.
            </h3>
          </div>
          <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "11.5px", fontWeight: 700, background: "rgba(118, 192, 67, 0.15)", color: "var(--green)", border: "1px solid rgba(118, 192, 67, 0.3)" }}>
            Zero Context Loss
          </span>
        </div>

        {/* 3 Step Channel Continuum Graphic */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Step 1: Voice */}
          <div style={{ padding: "24px", borderRadius: "16px", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(118, 192, 67, 0.15)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhoneCall size={18} />
                </div>
                <span style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase", padding: "3px 8px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-muted)" }}>
                  10:14 AM • Voice
                </span>
              </div>
              <div style={{ fontSize: "11.5px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "6px" }}>Customer speaks on phone call:</div>
              <p style={{ fontSize: "13.5px", color: "var(--text-ivory)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "14px" }}>
                &ldquo;I need to book a root canal consultation for tomorrow morning with Dr. Rao.&rdquo;
              </p>
            </div>
            <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "12px", color: "var(--green)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={13} />
              <span>Voice verified • Intent captured</span>
            </div>
          </div>

          {/* Step 2: WhatsApp */}
          <div style={{ padding: "24px", borderRadius: "16px", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(118, 192, 67, 0.3)", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 0 25px rgba(118, 192, 67, 0.08)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(118, 192, 67, 0.15)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageSquare size={18} />
                </div>
                <span style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase", padding: "3px 8px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-muted)" }}>
                  10:15 AM • WhatsApp
                </span>
              </div>
              <div style={{ fontSize: "11.5px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "6px" }}>Instant follow-up message:</div>
              <p style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.6, marginBottom: "14px" }}>
                &ldquo;Namuste! Dr. Rao has held 10:30 AM tomorrow for your root canal. Please confirm or pick another slot.&rdquo;
              </p>
            </div>
            <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "12px", color: "var(--green)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={13} />
              <span>Interactive slot button tapped</span>
            </div>
          </div>

          {/* Step 3: Web / Calendar Portal */}
          <div style={{ padding: "24px", borderRadius: "16px", background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(118, 192, 67, 0.15)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Globe size={18} />
                </div>
                <span style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase", padding: "3px 8px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-muted)" }}>
                  10:16 AM • Web Portal
                </span>
              </div>
              <div style={{ fontSize: "11.5px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "6px" }}>Clinic Portal & Calendar Sync:</div>
              <p style={{ fontSize: "13.5px", color: "var(--text-ivory)", lineHeight: 1.6, marginBottom: "14px" }}>
                &ldquo;Appointment confirmed on Clinic EMR. Medical history intake link pre-filled with caller details.&rdquo;
              </p>
            </div>
            <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "12px", color: "var(--green)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={13} />
              <span>EMR, Calendar & SMS Synchronized</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Multilingual Seamless Context (HP-07) */}
      <div
        className="glass-card"
        style={{
          padding: "36px",
          borderRadius: "22px",
          background: "rgba(11, 14, 11, 0.85)",
          border: "1px solid rgba(118, 192, 67, 0.2)",
          boxShadow: "0 16px 50px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingBottom: "20px", marginBottom: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", marginBottom: "6px" }}>
              HP-07 • Vernacular & Real-Time Language Fluidity
            </div>
            <h3 className="serif" style={{ fontSize: "24px", color: "var(--text-ivory)", margin: 0, fontWeight: 400 }}>
              Switch languages mid-conversation. Namuste never loses the thread.
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "var(--text-muted)" }}>
            <Languages size={15} style={{ color: "var(--green)" }} />
            <span>8+ Indian Languages Supported</span>
          </div>
        </div>

        {/* Language Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {LANGUAGES.map((lang) => {
            const isSelected = activeLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "12.5px",
                  fontWeight: isSelected ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.04)",
                  color: isSelected ? "#050505" : "var(--text-body)",
                  border: `1px solid ${isSelected ? "var(--green)" : "rgba(255, 255, 255, 0.08)"}`,
                  boxShadow: isSelected ? "0 0 14px rgba(118, 192, 67, 0.35)" : "none",
                }}
              >
                {lang.name}
              </button>
            );
          })}
        </div>

        {/* Live Multilingual Dialogue Box */}
        <div style={{ padding: "24px", borderRadius: "18px", background: "rgba(0, 0, 0, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* User speech */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", color: "var(--text-ivory)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>
              C
            </div>
            <div style={{ padding: "14px 18px", borderRadius: "14px", borderTopLeftRadius: "2px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.6, maxWidth: "85%" }}>
              <span style={{ fontSize: "10.5px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                Customer ({currentLang.name})
              </span>
              &ldquo;{currentLang.script}&rdquo;
            </div>
          </div>

          {/* Namuste Reply */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", justifyContent: "flex-end" }}>
            <div style={{ padding: "16px 20px", borderRadius: "16px", borderTopRightRadius: "2px", background: "rgba(118, 192, 67, 0.09)", border: "1px solid rgba(118, 192, 67, 0.3)", fontSize: "14px", color: "var(--text-ivory)", lineHeight: 1.65, maxWidth: "85%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", marginBottom: "4px" }}>
                <ShieldCheck size={14} /> Namuste Multilingual Response
              </div>
              <p style={{ margin: 0 }}>&ldquo;{currentLang.reply}&rdquo;</p>
            </div>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--green)", color: "#050505", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, flexShrink: 0, marginTop: "2px" }}>
              N
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

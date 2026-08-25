import { NextResponse } from "next/server";

// Clean and normalize text specifically for natural human pronunciation in Sarvam AI
function normalizeSpeechText(text: string): string {
  if (!text) return "";

  return text
    // Expand abbreviations
    .replace(/\bDr\.\s*/gi, "Doctor ")
    .replace(/\bOPD\b/gi, "O P D")
    .replace(/\bENT\b/gi, "E N T")
    .replace(/\bEMR\b/gi, "E M R")
    .replace(/\bCRM\b/gi, "C R M")
    .replace(/\bERP\b/gi, "E R P")
    .replace(/\bTPA\b/gi, "T P A")
    .replace(/\bGST\b/gi, "G S T")
    .replace(/\bITR\b/gi, "I T R")
    .replace(/\bBHK\b/gi, "B H K")
    .replace(/\bJEE\b/gi, "J E E")
    .replace(/\bNEET\b/gi, "N E E T")
    .replace(/₹\s*(\d+)/g, "$1 rupees")
    .replace(/#(\d+)/g, "number $1")
    .replace(/\b(\d+)\s*Cr\b/gi, "$1 crore")
    .replace(/\bNo\.\s*/gi, "Number ")
    .replace(/\b10-digit\b/gi, "ten digit")
    // Remove markdown and stray punctuation
    .replace(/[*#_~`[\]()•|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}

// Smart language detector for Indian neural models
function detectAppropriateLanguage(text: string, requestedLang = "en-IN"): string {
  // Check for Devanagari script or common Hindi phonetic tokens
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  const hasTamil = /[\u0B80-\u0BFF]/.test(text);
  const hasBengali = /[\u0980-\u09FF]/.test(text);
  const hasTelugu = /[\u0C00-\u0C7F]/.test(text);

  if (hasDevanagari) return "hi-IN";
  if (hasTamil) return "ta-IN";
  if (hasBengali) return "bn-IN";
  if (hasTelugu) return "te-IN";

  // Check Hinglish keywords
  const hinglishWords = /\b(namaste|aapka|kripya|dhanyawaad|kaise|madad|bataiye|subah|shaam|hai|hain|bhi|aur|kaunsa|chahiye|mil|sakte|hoga)\b/i;
  if (hinglishWords.test(text)) {
    return "hi-IN";
  }

  if (requestedLang.includes("hi")) return "hi-IN";
  if (requestedLang.includes("ta")) return "ta-IN";
  if (requestedLang.includes("bn")) return "bn-IN";
  if (requestedLang.includes("te")) return "te-IN";
  if (requestedLang.includes("mr")) return "mr-IN";

  return "en-IN";
}

export async function POST(req: Request) {
  try {
    const sarvamKey = process.env.SARVAM_API_KEY;
    const body = await req.json();
    const { action = "tts", text = "", languageCode = "en-IN", speaker = "anushka", audioBase64 = "" } = body;

    if (!sarvamKey || sarvamKey.trim() === "") {
      return NextResponse.json({
        success: false,
        source: "fallback",
        message: "SARVAM_API_KEY is not configured in .env.local; fallback to browser audio.",
      });
    }

    // 1. Text to Speech via Sarvam AI
    if (action === "tts") {
      if (!text || text.trim() === "") {
        return NextResponse.json({ error: "Text is required for TTS" }, { status: 400 });
      }

      const cleanSpeechText = normalizeSpeechText(text);
      const targetLang = detectAppropriateLanguage(text, languageCode);

      const ttsRes = await fetch("https://api.sarvam.ai/text-to-speech", {
        method: "POST",
        headers: {
          "api-subscription-key": sarvamKey.trim(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: [cleanSpeechText],
          target_language_code: targetLang,
          speaker: speaker || "anushka",
          pitch: 0,
          pace: 1.0,
          loudness: 1.2,
          speech_sample_rate: 24000,
          enable_preprocessing: true,
          model: "bulbul:v2",
        }),
      });

      if (ttsRes.ok) {
        const data = await ttsRes.json();
        if (data.audios && data.audios[0]) {
          return NextResponse.json({
            success: true,
            source: "sarvam-tts",
            detectedLang: targetLang,
            cleanedText: cleanSpeechText,
            audioBase64: data.audios[0],
          });
        }
      }

      const errorText = await ttsRes.text();
      console.warn("[Sarvam TTS Error]:", ttsRes.status, errorText);
      return NextResponse.json({
        success: false,
        source: "sarvam-error",
        status: ttsRes.status,
        error: errorText,
      });
    }

    // 2. Speech to Text via Sarvam AI
    if (action === "stt") {
      if (!audioBase64) {
        return NextResponse.json({ error: "Audio base64 is required for STT" }, { status: 400 });
      }

      const buffer = Buffer.from(audioBase64, "base64");
      const blob = new Blob([buffer], { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", blob, "audio.wav");
      formData.append("model", "saaras:v2.5");
      formData.append("language_code", languageCode || "unknown");

      const sttRes = await fetch("https://api.sarvam.ai/speech-to-text", {
        method: "POST",
        headers: {
          "api-subscription-key": sarvamKey.trim(),
        },
        body: formData,
      });

      if (sttRes.ok) {
        const data = await sttRes.json();
        return NextResponse.json({
          success: true,
          source: "sarvam-stt",
          transcript: data.transcript || "",
          languageCode: data.language_code,
        });
      }

      const errorText = await sttRes.text();
      console.warn("[Sarvam STT Error]:", sttRes.status, errorText);
      return NextResponse.json({
        success: false,
        source: "sarvam-error",
        status: sttRes.status,
        error: errorText,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("AI Demo Speech Endpoint Exception:", error);
    return NextResponse.json({ error: "Speech service exception" }, { status: 500 });
  }
}

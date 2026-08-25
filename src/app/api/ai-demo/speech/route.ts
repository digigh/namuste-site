import { NextResponse } from "next/server";

// Clean and normalize text specifically for natural human pronunciation in Sarvam AI
function normalizeSpeechText(text: string): string {
  if (!text) return "";

  return text
    // Expand titles & abbreviations with phonetic spacing
    .replace(/\bDr\.\s*/gi, "Doctor ")
    .replace(/\bDr\b/gi, "Doctor")
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
    .replace(/\bCA\b/gi, "C A")
    .replace(/\bDOB\b/gi, "Date of Birth")
    .replace(/₹\s*(\d+)/g, "$1 rupees")
    .replace(/#(\d+)/g, "number $1")
    .replace(/\b(\d+)\s*Cr\b/gi, "$1 crore")
    .replace(/\bNo\.\s*/gi, "Number ")
    .replace(/\b10-digit\b/gi, "ten digit")
    // Natural time pronunciation
    .replace(/10:30\s*AM/gi, "10:30 A M")
    .replace(/11:45\s*AM/gi, "11:45 A M")
    .replace(/4:30\s*PM/gi, "4:30 P M")
    // Remove markdown symbols and bullets
    .replace(/[*#_~`[\]()•|]/g, " ")
    // Clean multiple spaces
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);
}

// Smart language detector for Indian neural models
function detectAppropriateLanguage(text: string, requestedLang = "en-IN"): string {
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";
  if (/[\u0980-\u09FF]/.test(text)) return "bn-IN";
  if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";
  if (/[\u0A00-\u0A7F]/.test(text)) return "pa-IN";
  if (/[\u0D00-\u0D7F]/.test(text)) return "ml-IN";
  if (/[\u0C80-\u0CFF]/.test(text)) return "kn-IN";
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu-IN";

  const hinglishWords = /\b(namaste|aapka|kripya|dhanyawaad|dhanyavad|kaise|madad|bataiye|subah|shaam|hai|hain|bhi|aur|kaunsa|chahiye|mil|sakte|hoga|shukriya|bilkul|theek|badhiya)\b/i;
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
    const sarvamKey = process.env.SARVAM_API_KEY?.trim() || "";
    const openaiKey = process.env.OPENAI_API_KEY?.trim() || "";
    const body = await req.json();
    const {
      action = "tts",
      text = "",
      languageCode = "en-IN",
      speaker = "ritu",
      audioBase64 = "",
    } = body;

    // ── 1. Text to Speech via Sarvam bulbul:v3 ──────────────────────────────────
    if (action === "tts") {
      if (!text || text.trim() === "") {
        return NextResponse.json({ error: "Text is required for TTS" }, { status: 400 });
      }

      const cleanSpeechText = normalizeSpeechText(text);
      const targetLang = detectAppropriateLanguage(text, languageCode);
      const chosenSpeaker = speaker || "ritu";

      if (sarvamKey) {
        try {
          const v3Res = await fetch("https://api.sarvam.ai/text-to-speech", {
            method: "POST",
            headers: {
              "api-subscription-key": sarvamKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: [cleanSpeechText],
              target_language_code: targetLang,
              speaker: chosenSpeaker,
              model: "bulbul:v3",
            }),
          });

          if (v3Res.ok) {
            const data = await v3Res.json();
            if (data.audios && data.audios[0]) {
              return NextResponse.json({
                success: true,
                source: "sarvam-bulbul-v3",
                speaker: chosenSpeaker,
                detectedLang: targetLang,
                cleanedText: cleanSpeechText,
                audioBase64: data.audios[0],
              });
            }
          }
        } catch (v3Err) {
          console.warn("[Sarvam bulbul:v3 warn]:", v3Err);
        }
      }

      // If Sarvam is unavailable, fallback to browser speech synthesis
      return NextResponse.json({
        success: false,
        source: "fallback",
        message: "Fallback to browser audio.",
      });
    }

    // ── 2. Speech to Text (OpenAI Whisper + Sarvam Saaras) ────────────────────
    if (action === "stt") {
      if (!audioBase64) {
        return NextResponse.json({ error: "Audio base64 is required for STT" }, { status: 400 });
      }

      const buffer = Buffer.from(audioBase64, "base64");

      // Try OpenAI Whisper first (gold standard accuracy across Indian accents & languages)
      if (openaiKey) {
        try {
          const formData = new FormData();
          const audioBlob = new Blob([buffer], { type: "audio/webm" });
          formData.append("file", audioBlob, "speech.webm");
          formData.append("model", "whisper-1");
          formData.append("language", languageCode?.startsWith("hi") ? "hi" : "en");
          formData.append("prompt", "Indian English, Hindi, Hinglish, Customer appointment intake");

          const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${openaiKey}`,
            },
            body: formData,
          });

          if (whisperRes.ok) {
            const data = await whisperRes.json();
            if (data.text && data.text.trim().length > 0) {
              return NextResponse.json({
                success: true,
                source: "openai-whisper",
                transcript: data.text.trim(),
                language_code: languageCode || "en-IN",
              });
            }
          }
        } catch (whisperErr) {
          console.warn("[Whisper STT warn, trying Sarvam]:", whisperErr);
        }
      }

      // Fallback to Sarvam AI saaras:v2.5
      if (sarvamKey) {
        try {
          const blob = new Blob([buffer], { type: "audio/wav" });
          const formData = new FormData();
          formData.append("file", blob, "audio.wav");
          formData.append("model", "saaras:v2.5");
          formData.append("language_code", languageCode || "unknown");

          const sttRes = await fetch("https://api.sarvam.ai/speech-to-text", {
            method: "POST",
            headers: {
              "api-subscription-key": sarvamKey,
            },
            body: formData,
          });

          if (sttRes.ok) {
            const data = await sttRes.json();
            return NextResponse.json({
              success: true,
              source: "sarvam-stt",
              transcript: data.transcript || "",
              language_code: data.language_code || "en-IN",
            });
          }
        } catch (sarvamErr) {
          console.warn("[Sarvam STT warn]:", sarvamErr);
        }
      }

      return NextResponse.json({
        success: false,
        error: "Speech transcription failed on all providers",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Speech route error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

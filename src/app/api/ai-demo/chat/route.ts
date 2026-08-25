import { NextResponse } from "next/server";
import { INDUSTRY_FLOWS } from "@/data/industryFlows";

// ─── Language Detection ───────────────────────────────────────────────────────
function detectLanguage(text: string): string {
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";        // Devanagari (Hindi/Marathi)
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";        // Tamil
  if (/[\u0980-\u09FF]/.test(text)) return "bn-IN";        // Bengali
  if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";        // Telugu
  if (/[\u0A00-\u0A7F]/.test(text)) return "pa-IN";        // Punjabi
  const hinglish = /\b(mera|naam|hai|hain|kya|aur|bhi|nahi|hoga|chahiye|batao|bataiye|kripya|dhanyawaad|namaste|subah|shaam|kal|aaj|theek|bahut|achha|bilkul|naa|haan|ji|baje|doctor|appointment|book|slot|fee)\b/i;
  if (hinglish.test(text)) return "hi-IN";
  return "en-IN";
}

// ─── Named Entity Extraction (never loses data across turns) ─────────────────
function extractEntities(text: string, current: Record<string, string> = {}): Record<string, string> {
  const result: Record<string, string> = { ...current };

  // Phone number (10-digit Indian)
  const phoneMatch = text.match(/\b([6-9]\d{9})\b/);
  if (phoneMatch) result.mobile = phoneMatch[1];

  // Name (English + Hindi pattern)
  const nameMatch = text.match(
    /(?:my name is|i am|name is|mera naam|naam hai|this is|myself|naam)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)??)(?=\s*(?:hai|he|and|,|\.|\d|phone|mobile|number|contact|$))/i
  );
  if (nameMatch?.[1]) {
    const n = nameMatch[1].trim();
    if (!["hello", "hi", "hey", "namaste", "and", "hai"].includes(n.toLowerCase())) {
      result.name = n.split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
  }

  // DOB / Age
  const dobPatterns = [
    /\b(\d{1,2}\s+(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{2,4})\b/i,
    /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/,
    /(?:age|umar)\s*(?:is|:)?\s*(\d{1,3})/i,
    /\b(\d{1,3})\s+(?:years?|yrs?|saal)/i,
  ];
  for (const pat of dobPatterns) {
    const m = text.match(pat);
    if (m?.[1] && !result.dob) { result.dob = m[1].trim(); break; }
  }

  // Department
  if (/cardio|heart|dil\b/i.test(text)) result.department = "Cardiology";
  else if (/\bent\b|ear|nose|throat|kaan|naak|gala/i.test(text)) result.department = "ENT";
  else if (/ortho|bone|joint|haddi|ghutna|knee/i.test(text)) result.department = "Orthopedics";
  else if (/pediatric|child|bacche|baby|infant/i.test(text)) result.department = "Pediatrics";
  else if (/general|fever|cough|cold|bukhar|khansi|medicine|physician/i.test(text)) result.department = "General Medicine";

  // Slot time requested
  const slotMatch = text.match(/\b(\d{1,2}(?::\d{2})?\s*(?:am|pm|baje))\b/i);
  if (slotMatch) result.slotRequested = slotMatch[1];

  // Specific confirmed slots
  if (/(?:11:?45|11\.45)/i.test(text)) result.confirmedSlot = "Tomorrow 11:45 AM";
  if (/4:?30\s*(?:pm)?/i.test(text) && /pm|afternoon|shaam|dopahar/i.test(text)) result.confirmedSlot = "Tomorrow 4:30 PM";

  return result;
}

// ─── OpenAI Chat Handler ──────────────────────────────────────────────────────
async function callOpenAI(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  apiKey: string
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

  let res: Response;
  try {
    res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 400,
      }),
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty OpenAI response");
  return JSON.parse(raw);
}

// ─── Main POST Handler ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      industryId = "doctors-clinics",
      messages = [],
      userMessage = "",
      currentExtracted = {},
    } = body;

    const industry = INDUSTRY_FLOWS[industryId] || INDUSTRY_FLOWS["doctors-clinics"];
    const openaiKey = process.env.OPENAI_API_KEY?.trim() || "";

    // Always run heuristic extractor first (works without any API)
    const extracted = extractEntities(userMessage, currentExtracted);
    const detectedLang = detectLanguage(userMessage);

    const name = extracted.name || "";
    const mobile = extracted.mobile || "";
    const dob = extracted.dob || "";
    const dept = extracted.department || currentExtracted.department || "Cardiology";
    const isHindi = detectedLang === "hi-IN";
    const lower = userMessage.toLowerCase();

    // ── Try OpenAI first ────────────────────────────────────────────────────
    if (openaiKey) {
      try {
        const systemPrompt = `You are Namuste, the professional AI Voice & Chat Receptionist for "${industry.brandName}".

## CURRENT PATIENT DATA (DO NOT ASK FOR THESE AGAIN IF ALREADY KNOWN)
- Name: "${name || "NOT PROVIDED"}"
- Mobile: "${mobile || "NOT PROVIDED"}"
- Date of Birth: "${dob || "NOT PROVIDED"}"
- Department Interest: "${dept}"
- Slot Requested: "${extracted.slotRequested || "not yet"}"

## CLINIC KNOWLEDGE BASE
- Departments: Cardiology (Dr. R.K. Sharma), ENT (Dr. Mehta), Orthopedics (Dr. Rao), General Medicine (Dr. Ananya), Pediatrics (Dr. Verma)
- OPD Timings: Monday to Saturday, 9:00 AM to 8:00 PM (Closed Sunday)
- Consultation Fee: 600 rupees for OPD
- Cashless Insurance: Star Health, HDFC Ergo, ICICI Lombard, Max Bupa, Care Health
- Location: 100 Feet Road, Indiranagar, Bangalore

## CONVERSATION STAGE RULES (advance forward, never repeat)
Stage 1 → If Name OR Mobile is missing: Ask for both name and mobile in one question.
Stage 2 → If Name + Mobile known but DOB unknown: Ask only for date of birth / age.
Stage 3 → If Name + Mobile + DOB all known: Present the assistance menu (appointments, departments, fees, insurance, location).
Stage 4 → If user asks about services / departments / fees / timings / location: Answer clearly and ask if they'd like to book an appointment.
Stage 5a → If user asks to book with slot "10:30 AM": That slot is ALREADY BOOKED. Offer 11:45 AM or 4:30 PM instead.
Stage 5b → If user selects 11:45 AM or 4:30 PM: Confirm with token CCH-014 and set isComplete true.

## LANGUAGE RULE
- Detect the language from the user's message.
- If Hindi/Hinglish → reply fully in Hindi/Hinglish (natural spoken, not formal/bookish).
- If Tamil → reply in Tamil.
- If Bengali → reply in Bengali.
- If English → reply in professional English.
- Never mix language in a way that feels unnatural.
- Keep reply SHORT: 1–2 sentences max, conversational and spoken (no bullet points, no markdown).

## RESPONSE FORMAT (respond with ONLY this JSON, no extra text):
{
  "reply": "Short spoken response to the customer",
  "languageCode": "en-IN or hi-IN or ta-IN or bn-IN or te-IN or mr-IN",
  "step": "intake_name_mobile | intake_dob | service_menu | inquiry_resolution | confirmation_complete",
  "isComplete": false,
  "isOffTopic": false
}`;

        // Build OpenAI message history
        const openaiMessages: { role: "user" | "assistant"; content: string }[] = [];
        for (const msg of messages) {
          openaiMessages.push({
            role: msg.speaker === "ai" ? "assistant" : "user",
            content: msg.text || "",
          });
        }
        // Ensure latest user message is at the end
        if (
          openaiMessages.length === 0 ||
          openaiMessages[openaiMessages.length - 1].role !== "user"
        ) {
          openaiMessages.push({ role: "user", content: userMessage });
        } else {
          openaiMessages[openaiMessages.length - 1].content = userMessage;
        }

        const parsed = await callOpenAI(systemPrompt, openaiMessages, openaiKey);

        const mergedExtracted = {
          name: extracted.name || currentExtracted.name || "",
          mobile: extracted.mobile || currentExtracted.mobile || "",
          dob: extracted.dob || currentExtracted.dob || "",
          department: extracted.department || currentExtracted.department || "",
          doctor: currentExtracted.doctor || "",
          slot: extracted.confirmedSlot || currentExtracted.slot || "",
          intent: currentExtracted.intent || "Appointment / Inquiry",
          summary: (parsed.reply || "").slice(0, 80),
        };

        // Auto-populate doctor if slot confirmed
        if (mergedExtracted.slot && !mergedExtracted.doctor) {
          const d = mergedExtracted.department;
          mergedExtracted.doctor =
            d === "ENT" ? "Dr. Mehta" : d === "Orthopedics" ? "Dr. Rao" : d === "Pediatrics" ? "Dr. Verma" : "Dr. Sharma";
          mergedExtracted.intent = "Doctor OPD Appointment";
        }

        return NextResponse.json({
          success: true,
          source: "openai-gpt4o-mini",
          reply: parsed.reply || "",
          languageCode: parsed.languageCode || detectedLang,
          step: parsed.step || "intake_name_mobile",
          extracted: mergedExtracted,
          isComplete: parsed.isComplete || false,
          isOffTopic: parsed.isOffTopic || false,
        });
      } catch (openaiErr: any) {
        console.warn("[OpenAI warn — falling to state machine]:", openaiErr?.message || openaiErr);
      }
    }

    // ── State Machine Fallback (deterministic, bilingual, always works) ──────
    let reply = "";
    let step = "intake_name_mobile";
    let isComplete = false;

    if (!name || !mobile) {
      if (name && !mobile) {
        reply = isHindi
          ? `Shukriya, ${name} ji. Kripya apna 10-digit mobile number batayein?`
          : `Thank you, ${name}! May I have your 10-digit mobile number for appointment updates?`;
      } else if (!name && mobile) {
        reply = isHindi
          ? `Shukriya. Kripya apna poora naam batayein?`
          : `Got your number, thank you! May I know your full name please?`;
      } else {
        reply = isHindi
          ? `Namaste! Main Namuste hoon, aapka digital receptionist. Kripya apna naam aur mobile number batayein?`
          : `Hello and welcome to ${industry.brandName}. I am Namuste, your AI receptionist. May I have your name and mobile number to assist you?`;
      }
    } else if (industry.requiresDob && !dob) {
      reply = isHindi
        ? `Shukriya, ${name} ji! Kripya apni date of birth ya umar batayein patient record ke liye?`
        : `Thank you, ${name}! Could you please share your date of birth or age for your medical record?`;
      step = "intake_dob";
    } else if (extracted.confirmedSlot) {
      const doctor = dept === "ENT" ? "Dr. Mehta" : dept === "Orthopedics" ? "Dr. Rao" : "Dr. Sharma";
      extracted.doctor = doctor;
      extracted.slot = extracted.confirmedSlot;
      extracted.intent = "Doctor OPD Appointment";
      reply = isHindi
        ? `Bahut badhiya! ${name} ji, aapka appointment ${doctor} ke saath ${dept} ke liye ${extracted.confirmedSlot} par confirm ho gaya. Token CCH-014. Dhanyawaad!`
        : `Excellent! ${name}, your appointment with ${doctor} for ${dept} is confirmed for ${extracted.confirmedSlot}. Token: CCH-014. We look forward to seeing you!`;
      step = "confirmation_complete";
      isComplete = true;
    } else if (extracted.slotRequested?.includes("10:30") || lower.includes("10:30")) {
      reply = isHindi
        ? `Maafi, 10:30 AM ka slot ${dept} ke liye pehle se booked hai. Kal 11:45 AM ya 4:30 PM available hai — kaun sa time theek rahega?`
        : `I'm sorry, the 10:30 AM slot for ${dept} is already taken. We have 11:45 AM and 4:30 PM available tomorrow. Which do you prefer?`;
      step = "inquiry_resolution";
    } else if (lower.includes("book") || lower.includes("appointment") || lower.includes("slot") || lower.includes("baje") || lower.includes("kal")) {
      reply = isHindi
        ? `Bilkul ${name} ji. ${dept} ke liye kal 11:45 AM aur 4:30 PM available hain. Aap kaunsa time prefer karenge?`
        : `Of course, ${name}! For ${dept}, we have availability tomorrow at 11:45 AM and 4:30 PM. Which time suits you?`;
      step = "inquiry_resolution";
    } else if (lower.includes("service") || lower.includes("department") || lower.includes("fee") || lower.includes("insurance") || lower.includes("timing") || lower.includes("location") || lower.includes("address")) {
      reply = isHindi
        ? `Hum Cardiology, ENT, Orthopedics, aur General Medicine offer karte hain. OPD Monday se Saturday, 9 AM se 8 PM tak. Fees 600 rupaye. Cashless insurance bhi accept hoti hai. Appointment book karna hai?`
        : `We offer Cardiology, ENT, Orthopedics, and General Medicine. OPD is Mon–Sat, 9 AM to 8 PM, fee is 600 rupees with cashless insurance. Would you like to book an appointment?`;
      step = "inquiry_resolution";
    } else {
      reply = isHindi
        ? `Shukriya ${name} ji! Main aapki kaise madad kar sakta hoon? Appointments, doctor specialties, fees, insurance ya location — kisi bhi cheez mein help kar sakta hoon.`
        : `Thank you, ${name}! How may I assist you today? I can help with appointment bookings, OPD hours, specialties like ENT and Cardiology, fees, insurance, and clinic location.`;
      step = "service_menu";
    }

    return NextResponse.json({
      success: true,
      source: "state-machine",
      reply,
      languageCode: detectedLang,
      step,
      extracted: {
        name: extracted.name || currentExtracted.name || "",
        mobile: extracted.mobile || currentExtracted.mobile || "",
        dob: extracted.dob || currentExtracted.dob || "",
        department: extracted.department || currentExtracted.department || "",
        doctor: extracted.doctor || currentExtracted.doctor || "",
        slot: extracted.confirmedSlot || extracted.slot || currentExtracted.slot || "",
        intent: extracted.intent || currentExtracted.intent || "Appointment / Inquiry",
        summary: reply.slice(0, 80),
      },
      isComplete,
      isOffTopic: false,
    });
  } catch (error) {
    console.error("Chat engine error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

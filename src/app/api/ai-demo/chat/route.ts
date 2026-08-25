import { NextResponse } from "next/server";
import { INDUSTRY_FLOWS, IndustryFlow } from "@/data/industryFlows";

// ─── Language Detection ───────────────────────────────────────────────────────
function detectLanguage(text: string): string {
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";        // Devanagari (Hindi/Marathi)
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";        // Tamil
  if (/[\u0980-\u09FF]/.test(text)) return "bn-IN";        // Bengali
  if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";        // Telugu
  if (/[\u0A00-\u0A7F]/.test(text)) return "pa-IN";        // Punjabi
  const hinglish = /\b(mera|naam|hai|hain|kya|aur|bhi|nahi|hoga|chahiye|batao|bataiye|kripya|dhanyawaad|namaste|subah|shaam|kal|aaj|theek|bahut|achha|bilkul|naa|haan|ji|baje|slot|fee|kitna|kaunsa)\b/i;
  if (hinglish.test(text)) return "hi-IN";
  return "en-IN";
}

// ─── Robust Named Entity Extraction (Regex Heuristic) ─────────────────────────
function extractEntities(text: string, current: Record<string, string> = {}, industryId = "doctors-clinics"): Record<string, string> {
  const result: Record<string, string> = { ...current };
  const lower = text.toLowerCase();

  // Phone number (handles 10 digits with spaces, dashes, +91, etc.)
  const phoneMatch = text.match(/(?:\+91[\-\s]?)?([6-9]\d{4}[\s\-]?\d{5}|[6-9]\d{9})/);
  if (phoneMatch?.[1]) {
    result.mobile = phoneMatch[1].replace(/[\s\-]/g, "");
  }

  // Name extraction (English + Hindi patterns)
  const nameMatch = text.match(
    /(?:my name is|i am|name is|mera naam|naam hai|this is|myself|naam)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)??)(?=\s*(?:hai|he|and|,|\.|\d|phone|mobile|number|contact|$))/i
  );
  if (nameMatch?.[1]) {
    const n = nameMatch[1].trim();
    if (!["hello", "hi", "hey", "namaste", "and", "hai", "looking", "need", "please", "confirm"].includes(n.toLowerCase())) {
      result.name = n.split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
  }

  // Direct Name if text starts with name pattern like "Ankush Sharma, 98765..."
  const leadNameMatch = text.match(/^([a-zA-Z]+(?:\s+[a-zA-Z]+)?)(?:,|\s+)(?:\+91|\d{10})/i);
  if (leadNameMatch?.[1] && !result.name) {
    const n = leadNameMatch[1].trim();
    if (!["hello", "hi", "hey", "namaste", "i am", "my name"].includes(n.toLowerCase())) {
      result.name = n.split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
  }

  // DOB / Age extraction
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

  // Industry-specific Domain extraction
  if (industryId === "doctors-clinics") {
    if (/cardio|heart|dil\b/i.test(lower)) result.department = "Cardiology";
    else if (/\bent\b|ear|nose|throat|kaan|naak|gala/i.test(lower)) result.department = "ENT";
    else if (/ortho|bone|joint|haddi|ghutna|knee/i.test(lower)) result.department = "Orthopedics";
    else if (/pediatric|child|bacche|baby|infant/i.test(lower)) result.department = "Pediatrics";
    else if (/general|fever|cough|cold|bukhar|khansi|physician/i.test(lower)) result.department = "General Medicine";
  } else if (industryId === "lawyers") {
    if (/property|land|boundary|real estate|plot/i.test(lower)) result.department = "Property Law";
    else if (/corporate|company|contract|startup|nda/i.test(lower)) result.department = "Corporate Law";
    else if (/family|divorce|custody|marriage/i.test(lower)) result.department = "Family Law";
    else if (/civil|criminal|litigation|court/i.test(lower)) result.department = "Civil Litigation";
  } else if (industryId === "chartered-accountants") {
    if (/gst|return|quarterly/i.test(lower)) result.department = "GST Compliance";
    else if (/itr|income tax|tax filing/i.test(lower)) result.department = "Income Tax (ITR)";
    else if (/audit|corporate audit|balance sheet/i.test(lower)) result.department = "Corporate Tax Audit";
    else if (/pvt ltd|company incorporation|roc/i.test(lower)) result.department = "Pvt Ltd Incorporation & ROC";
  } else if (industryId === "consultants") {
    if (/gtm|go to market|growth|marketing/i.test(lower)) result.department = "B2B SaaS GTM Strategy";
    else if (/scale|scaling|fundraise|expansion/i.test(lower)) result.department = "Business Scaling & Operations";
    else if (/product|strategy|roadmap/i.test(lower)) result.department = "Product & Market Strategy";
  } else if (industryId === "architects") {
    if (/3bhk|3 bhk|apartment/i.test(lower)) result.department = "3BHK Luxury Renovation";
    else if (/villa|bungalow|residence|home/i.test(lower)) result.department = "Villa Architecture & Design";
    else if (/commercial|office|interior/i.test(lower)) result.department = "Commercial Interior Design";
  } else if (industryId === "real-estate") {
    if (/3\s*bhk/i.test(lower)) result.department = "3 BHK Luxury Flat";
    else if (/2\s*bhk/i.test(lower)) result.department = "2 BHK Premium Flat";
    else if (/villa|penthouse/i.test(lower)) result.department = "Luxury Penthouse / Villa";
  } else if (industryId === "education") {
    if (/jee|iit/i.test(lower)) result.department = "JEE 2-Year Target Course";
    else if (/neet|medical/i.test(lower)) result.department = "NEET Medical Target Course";
    else if (/grade\s*11|11th/i.test(lower)) result.department = "Grade 11 Foundation";
    else if (/grade\s*12|12th/i.test(lower)) result.department = "Grade 12 Target Batch";
  } else if (industryId === "distributors") {
    if (/sku|fittings|electrical|boxes|units/i.test(lower)) result.department = "Wholesale Stock Reserve (SKU-8420)";
    else if (/bulk|dealer|distribut/i.test(lower)) result.department = "Bulk Wholesale Supply";
  }

  // Time & Slot matching (Catches any time: 10:00 AM, 10:00 baje, Tomorrow 10 AM, Sunday 11:30 AM, etc.)
  const timeMatch = text.match(/\b(?:(kal|aaj|tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\s+)?(?:(subah|dopahar|shaam|morning|afternoon|evening)\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm|baje))\b/i);
  if (timeMatch) {
    result.slotRequested = timeMatch[0].trim();
    result.confirmedSlot = timeMatch[0].trim();
  }

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
        max_tokens: 450,
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

    const industry: IndustryFlow = INDUSTRY_FLOWS[industryId] || INDUSTRY_FLOWS["doctors-clinics"];
    const openaiKey = process.env.OPENAI_API_KEY?.trim() || "";

    // Always run heuristic extractor
    const extracted = extractEntities(userMessage, currentExtracted, industryId);
    const detectedLang = detectLanguage(userMessage);

    const name = extracted.name || currentExtracted.name || "";
    const mobile = extracted.mobile || currentExtracted.mobile || "";
    const dob = extracted.dob || currentExtracted.dob || "";
    const dept = extracted.department || currentExtracted.department || "";
    const slot = extracted.confirmedSlot || extracted.slotRequested || currentExtracted.slot || "";
    const isHindi = detectedLang === "hi-IN";
    const lower = userMessage.toLowerCase();

    // ── Try OpenAI first with Structured Entity Extraction ───────────────────
    if (openaiKey) {
      try {
        const systemPrompt = `You are Namuste, the professional AI Voice & Chat Receptionist for "${industry.brandName}".
Industry Vertical: ${industry.name}
Tagline: ${industry.tagline}

## BUSINESS BACKGROUND & SCOPE
${industry.systemPrompt}

## CURRENT INTAKE DATA (DO NOT ASK FOR THESE AGAIN IF ALREADY COLLECTED)
- Customer Name: "${name || "NOT PROVIDED"}"
- Contact Mobile: "${mobile || "NOT PROVIDED"}"
${industry.requiresDob ? `- Date of Birth / Age: "${dob || "NOT PROVIDED"}"` : "- DOB: Not required for this vertical"}
- Service / Department Interest: "${dept || "Pending"}"
- Slot Requested: "${slot || "None"}"

## CONVERSATION FLOW RULES
1. If Customer Name OR Mobile is missing: Greet warmly and ask for their name and 10-digit mobile number.
${industry.requiresDob ? "2. If Name and Mobile are provided but DOB/Age is missing: Ask only for date of birth or age." : ""}
3. When contact details are collected: Present available services, consultation options, or timings for ${industry.name}.
4. If customer asks about services, fees, pricing, or locations: Provide concise, professional answers and offer to schedule/confirm their session.
5. If customer selects or agrees to a time slot (e.g. "kal subah 10:00 baje", "Tomorrow 11:45 AM", "Sunday 11:30 AM"): Confirm the booking, set isComplete: true, and put the confirmed slot in extracted.slot!

## ENTITY EXTRACTION MANDATE
You MUST extract and update all customer entities (name, mobile, dob, department/config, slot) in the "extracted" JSON object. If previously known, preserve them. If user mentions a phone number anywhere (even with spaces or words), extract it into "mobile".

## LANGUAGE RULES
- Detect user language. If user speaks in Hindi or Hinglish → reply in natural, spoken Hindi/Hinglish.
- If user speaks in English → reply in crisp, professional English.
- Keep reply SHORT (1–2 spoken sentences max). No markdown, no bullet points.

## JSON RESPONSE FORMAT (Respond with ONLY this JSON):
{
  "reply": "Spoken sentence to the user",
  "languageCode": "en-IN or hi-IN or ta-IN or bn-IN",
  "step": "intake_name_mobile | intake_dob | service_menu | inquiry_resolution | confirmation_complete",
  "extracted": {
    "name": "Customer Name",
    "mobile": "10-digit phone number without spaces",
    "dob": "DOB or age if applicable",
    "department": "Selected Service / Specialty / Flat Config",
    "slot": "Confirmed or requested appointment time (e.g. Tomorrow 10:00 AM)",
    "intent": "Intent summary"
  },
  "isComplete": false,
  "isOffTopic": false
}`;

        const openaiMessages: { role: "user" | "assistant"; content: string }[] = [];
        for (const msg of messages) {
          openaiMessages.push({
            role: msg.speaker === "ai" ? "assistant" : "user",
            content: msg.text || "",
          });
        }
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
          name: parsed.extracted?.name || extracted.name || currentExtracted.name || "",
          mobile: parsed.extracted?.mobile || extracted.mobile || currentExtracted.mobile || "",
          dob: parsed.extracted?.dob || extracted.dob || currentExtracted.dob || "",
          department: parsed.extracted?.department || extracted.department || currentExtracted.department || industry.name,
          doctor: parsed.extracted?.doctor || currentExtracted.doctor || (industry.id === "doctors-clinics" ? "Dr. Sharma" : "Assigned Representative"),
          slot: parsed.extracted?.slot || extracted.confirmedSlot || extracted.slotRequested || currentExtracted.slot || "",
          intent: parsed.extracted?.intent || currentExtracted.intent || `${industry.name} Consultation / Inquiry`,
          summary: (parsed.reply || "").slice(0, 80),
        };

        // If the reply explicitly confirmed a slot (e.g. "confirm ho gaya"), ensure slot is set
        if (!mergedExtracted.slot && (parsed.reply?.includes("confirm") || parsed.isComplete)) {
          const matchedSlot = parsed.reply.match(/\b(?:(kal|aaj|tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\s+)?(?:(subah|dopahar|shaam|morning|afternoon|evening)\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm|baje))\b/i);
          if (matchedSlot) mergedExtracted.slot = matchedSlot[0];
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
        console.warn("[OpenAI warn — falling to dynamic state machine]:", openaiErr?.message || openaiErr);
      }
    }

    // ── Dynamic State Machine Fallback ─────────────────────────────────────────
    let reply = "";
    let step = "intake_name_mobile";
    let isComplete = false;

    if (!name || !mobile) {
      if (name && !mobile) {
        reply = isHindi
          ? `Shukriya, ${name} ji. Kripya apna 10-digit mobile number batayein?`
          : `Thank you, ${name}! May I have your 10-digit mobile number to proceed?`;
      } else if (!name && mobile) {
        reply = isHindi
          ? `Shukriya. Kripya apna poora naam batayein?`
          : `Got your number, thank you! May I know your full name please?`;
      } else {
        reply = isHindi
          ? `Namaste! Main ${industry.brandName} ka digital assistant hoon. Kripya apna naam aur mobile number batayein?`
          : `Hello and welcome to ${industry.brandName}. I am Namuste. May I have your name and mobile number to assist you?`;
      }
    } else if (industry.requiresDob && !dob) {
      reply = isHindi
        ? `Shukriya, ${name} ji! Kripya record ke liye apni date of birth ya umar batayein?`
        : `Thank you, ${name}! Could you please share your date of birth or age for our records?`;
      step = "intake_dob";
    } else if (extracted.confirmedSlot || lower.includes("confirm") || lower.includes("reserve") || lower.includes("book")) {
      const confirmedTime = extracted.confirmedSlot || "Tomorrow 10:00 AM";
      extracted.slot = confirmedTime;
      extracted.intent = `${industry.name} Consultation`;
      reply = isHindi
        ? `Bahut badhiya! ${name} ji, aapka ${industry.name} appointment ${confirmedTime} ke liye confirm ho gaya hai. Details WhatsApp par bhej di gayi hain. Dhanyawaad!`
        : `Excellent, ${name}! Your consultation with ${industry.brandName} is confirmed for ${confirmedTime}. Details have been sent to your WhatsApp. Thank you!`;
      step = "confirmation_complete";
      isComplete = true;
    } else if (lower.includes("service") || lower.includes("fee") || lower.includes("timing") || lower.includes("price") || lower.includes("cost") || lower.includes("flat") || lower.includes("bhk")) {
      if (industryId === "real-estate") {
        reply = isHindi
          ? `Hamare paas luxury 2BHK aur 3BHK residences available hain ₹1.5 Cr budget mein. VIP Model flat tour kal subah 10:00 AM par available hai. Kya confirm karein?`
          : `We offer luxury 2BHK and 3BHK residences starting at ₹1.5 Cr. A private model apartment VIP tour is available tomorrow at 10:00 AM. Shall I confirm your visit?`;
      } else if (industryId === "lawyers") {
        reply = isHindi
          ? `Hum Property Law, Corporate, Civil aur Family Law matters handle karte hain. Senior Advocate consultation Thursday 4:00 PM par available hai. Kya slot book karein?`
          : `We handle Property Law, Corporate Contracts, Civil Disputes, and Family Law. Video consultation with Senior Counsel is available this Thursday at 4:00 PM. Would you like to reserve it?`;
      } else {
        reply = isHindi
          ? `Hum ${industry.name} services offer karte hain. Kya aap consultation appointment book karna chahenge?`
          : `We provide complete ${industry.name} services. Would you like to schedule a consultation?`;
      }
      step = "inquiry_resolution";
    } else {
      reply = isHindi
        ? `Shukriya ${name} ji! Main ${industry.brandName} mein aapki kaise madad kar sakta hoon? Aap services, pricing, ya appointment consultation ke baare mein pooch sakte hain.`
        : `Thank you, ${name}! How may I assist you at ${industry.brandName} today? I can help with our services, consultation timings, or scheduling your session.`;
      step = "service_menu";
    }

    return NextResponse.json({
      success: true,
      source: "state-machine-dynamic",
      reply,
      languageCode: detectedLang,
      step,
      extracted: {
        name: extracted.name || currentExtracted.name || "",
        mobile: extracted.mobile || currentExtracted.mobile || "",
        dob: extracted.dob || currentExtracted.dob || "",
        department: extracted.department || currentExtracted.department || industry.name,
        doctor: extracted.doctor || currentExtracted.doctor || "",
        slot: extracted.confirmedSlot || extracted.slotRequested || currentExtracted.slot || "",
        intent: extracted.intent || currentExtracted.intent || `${industry.name} Intake`,
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

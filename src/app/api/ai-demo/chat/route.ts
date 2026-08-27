import { NextResponse } from "next/server";
import { INDUSTRY_FLOWS, IndustryFlow, FlowStep } from "@/data/industryFlows";
import { generateSarvamTTS } from "@/app/api/ai-demo/speech/route";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import {
  ClinicLang,
  CLINIC_SUPPORTED_LANGS,
  CLINIC_TEMPLATES,
  CLINIC_KB,
  DOCTOR_ROSTER,
  CLINIC_OPEN_DAYS,
  CLINIC_OPEN_HOUR,
  CLINIC_CLOSE_HOUR,
  fillTemplate,
  formatHourRange,
  formatDaysList,
} from "@/data/clinicTemplates";

// ─── Deterministic Intake FSM ────────────────────────────────────────────────
// Code decides which step is active — never the model. The model's only job
// per turn is to extract the field(s) for the CURRENT step and phrase the
// fixed ask in the right language. This replaced a design where the model was
// handed the entire flow + full clinic knowledge base every turn and asked to
// freely decide "what step are we on", which was unreliable outside the one
// vertical (doctors-clinics) whose instructions were actually hardcoded in —
// every other industry was silently running through clinic-shaped prompt text.
function getFlowSteps(industry: IndustryFlow): FlowStep[] {
  if (industry.steps && industry.steps.length > 0) return industry.steps;

  // doctors-clinics sources its ask text from CLINIC_TEMPLATES — the SAME
  // bank the deterministic fast path uses — instead of a separate hardcoded
  // copy here. Two places defining "the same" question is exactly what
  // caused this to drift out of sync: this generic version was missing the
  // department options list that CLINIC_TEMPLATES had, so any turn that fell
  // through to GPT (deterministic extraction failed) asked a worse, options-
  // free question than the templated fast path did. Single source of truth
  // now — whichever path answers, the question is identical.
  if (industry.id === "doctors-clinics") {
    const en = CLINIC_TEMPLATES["en-IN"];
    return [
      { id: "name", field: "name", askEnglish: en.couldNotUnderstand, askHindi: CLINIC_TEMPLATES["hi-IN"].couldNotUnderstand },
      { id: "mobile", field: "mobile", askEnglish: en.askMobile.replace("{name}", "there"), askHindi: CLINIC_TEMPLATES["hi-IN"].askMobile },
      { id: "dob", field: "dob", askEnglish: en.askDob.replace("{name}", "there"), askHindi: CLINIC_TEMPLATES["hi-IN"].askDob },
      { id: "department", field: "department", askEnglish: en.askDepartment, askHindi: CLINIC_TEMPLATES["hi-IN"].askDepartment },
      { id: "slot", field: "slot", askEnglish: en.askSlot, askHindi: CLINIC_TEMPLATES["hi-IN"].askSlot },
    ];
  }

  const steps: FlowStep[] = [
    { id: "name", field: "name", askEnglish: "May I know your name?", askHindi: "Kripya apna naam bataiye?" },
    { id: "mobile", field: "mobile", askEnglish: "Could you please provide your 10-digit mobile number?", askHindi: "Kripya apna 10-digit mobile number bataiye?" },
  ];
  if (industry.requiresDob) {
    steps.push({ id: "dob", field: "dob", askEnglish: "Could you please share your date of birth or age?", askHindi: "Kripya apni date of birth ya umar bataiye?" });
  }
  steps.push({ id: "department", field: "department", askEnglish: `How can I help you today at ${industry.brandName}?`, askHindi: `Main aapki ${industry.brandName} mein kaise madad kar sakta hoon?` });
  steps.push({ id: "slot", field: "slot", askEnglish: "When would you like to schedule this?", askHindi: "Aap kab schedule karna chahenge?" });
  return steps;
}

function getCurrentStep(industry: IndustryFlow, fields: Record<string, string>): { step: FlowStep | null; isReadyToConfirm: boolean } {
  const steps = getFlowSteps(industry);
  const nextUnfilled = steps.find((s) => !fields[s.field]);
  return { step: nextUnfilled || null, isReadyToConfirm: !nextUnfilled };
}

// Generate a reference ID in the same shape as the industry's own template
// (e.g. "ABC-88421", "MAT-409") instead of the model inventing or reusing a
// hardcoded placeholder — this was previously hardcoded to "ABC-88421" for
// every industry regardless of vertical.
function generateActionId(industry: IndustryFlow): { idField: string; idValue: string } {
  const idEntry = Object.entries(industry.systemActionPayloadTemplate).find(([k]) => k.endsWith("_id"));
  const idField = idEntry?.[0] || "reference_id";
  const templateValue = idEntry?.[1] || `${industry.id.slice(0, 3).toUpperCase()}-0000`;
  const prefix = templateValue.split("-")[0] || industry.id.slice(0, 3).toUpperCase();
  const suffix = Math.floor(10000 + Math.random() * 89999);
  return { idField, idValue: `${prefix}-${suffix}` };
}

// ─── Clinic knowledge-base FAQ matching (deterministic) ─────────────────────
// Keyword rules are English/Hinglish for now — the strongest coverage, since
// that's the majority of real questions seen so far. A question in another
// supported language that doesn't match falls through to the existing GPT
// path below, which already answers correctly from the same knowledge base
// text, just without the guaranteed-identical-wording property. Known,
// acceptable gap for this first pass, not a regression.
function matchClinicFaq(text: string, lang: ClinicLang): string | null {
  const t = text.toLowerCase();
  const kb = CLINIC_KB[lang];

  if (/\b(fee|fees|cost|price|charge|charges|kitna|paisa|rupaye)\b/i.test(t)) return kb.consultationFee;
  if (/\b(lab|blood test|x-?ray|ecg|pathology|diagnostic)\b/i.test(t)) return kb.labServices;
  if (/\b(where|location|address|parking|floor)\b/i.test(t)) return kb.location;
  if (/\b(payment|pay|cash|card|upi|insurance|tpa)\b/i.test(t)) return kb.paymentMethods;
  if (/\b(specialt(y|ies)|department|departments|which doctors?)\b/i.test(t)) return kb.specialtyList;

  // Doctor-specific lookup: "who handles cardiology" / "cardiology doctor"
  for (const entry of Object.values(DOCTOR_ROSTER)) {
    const key = entry.specialtyEn.toLowerCase();
    if (t.includes(key) && /\b(who|doctor|available|timing|hours|when)\b/i.test(t)) {
      return fillTemplate(kb.doctorInfo, {
        doctor: entry.doctor,
        specialty: entry.specialtyEn,
        days: formatDaysList(entry.days, lang),
        hours: formatHourRange(entry.startHour, entry.endHour),
      });
    }
  }
  return null;
}

// ─── Deterministic day/hour resolution for slot validation ──────────────────
// Only resolves the patterns the existing regex extractor already recognizes
// (kal/tomorrow/aaj/today, English weekday names, an explicit hour). Anything
// else (an explicit calendar date, a relative phrase in another language)
// returns null and the turn falls through to the existing GPT-based date
// resolution, unchanged — this only adds validation for the cases it can
// confidently resolve, it never blocks a booking it can't parse.
function resolveDayAndHour(rawSlotText: string, nowIST: Date): { dayOfWeek: number; hour: number } | null {
  const text = (rawSlotText || "").toLowerCase();
  const weekdayMap: Record<string, number> = {
    sunday: 0, sun: 0, monday: 1, mon: 1, tuesday: 2, tue: 2,
    wednesday: 3, wed: 3, thursday: 4, thu: 4, friday: 5, fri: 5, saturday: 6, sat: 6,
  };

  let dayOfWeek: number | null = null;
  if (/\b(kal|tomorrow)\b/.test(text)) {
    const t = new Date(nowIST);
    t.setDate(t.getDate() + 1);
    dayOfWeek = t.getDay();
  } else if (/\b(aaj|today)\b/.test(text)) {
    dayOfWeek = nowIST.getDay();
  } else {
    for (const [word, dow] of Object.entries(weekdayMap)) {
      if (new RegExp(`\\b${word}\\b`).test(text)) {
        dayOfWeek = dow;
        break;
      }
    }
  }
  if (dayOfWeek === null) return null;

  const timeMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
  if (!timeMatch) return null;
  let hour = parseInt(timeMatch[1], 10);
  const isPM = timeMatch[3] === "pm";
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return { dayOfWeek, hour };
}

// Turns a relative slot phrase ("tomorrow 11am", "kal 4 baje", "Sunday at
// 3pm") into an absolute calendar date-time string ("28 August 2026, 11:00
// AM") — this is what actually gets stored as the slot and sent to the n8n
// webhook. Without this, the literal word "tomorrow" was what ended up in
// the booking record and the WhatsApp/webhook payload, which is meaningless
// once read outside the conversation it was said in. Returns null (never
// blocks the flow) when it can't confidently resolve both a day AND a time —
// callers fall back to the original raw text in that case.
function resolveAbsoluteSlotString(rawSlotText: string, nowIST: Date): string | null {
  const text = (rawSlotText || "").toLowerCase();
  const weekdayMap: Record<string, number> = {
    sunday: 0, sun: 0, monday: 1, mon: 1, tuesday: 2, tue: 2,
    wednesday: 3, wed: 3, thursday: 4, thu: 4, friday: 5, fri: 5, saturday: 6, sat: 6,
  };

  let targetDate: Date | null = null;
  if (/\b(parso|day after tomorrow)\b/.test(text)) {
    targetDate = new Date(nowIST);
    targetDate.setDate(targetDate.getDate() + 2);
  } else if (/\b(kal|tomorrow)\b/.test(text)) {
    targetDate = new Date(nowIST);
    targetDate.setDate(targetDate.getDate() + 1);
  } else if (/\b(aaj|today)\b/.test(text)) {
    targetDate = new Date(nowIST);
  } else {
    for (const [word, dow] of Object.entries(weekdayMap)) {
      if (new RegExp(`\\b${word}\\b`).test(text)) {
        const d = new Date(nowIST);
        const delta = (dow - d.getDay() + 7) % 7; // next occurrence — today if named weekday IS today
        d.setDate(d.getDate() + delta);
        targetDate = d;
        break;
      }
    }
  }
  if (!targetDate) return null; // an explicit calendar date, or nothing recognizable — leave to caller's fallback

  const timeMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm|baje)/);
  if (!timeMatch) return null;
  let hour = parseInt(timeMatch[1], 10);
  const minute = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
  if (timeMatch[3] === "pm" && hour !== 12) hour += 12;
  if (timeMatch[3] === "am" && hour === 12) hour = 0;

  targetDate.setHours(hour, minute, 0, 0);

  const dateStr = targetDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = targetDate.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  return `${dateStr}, ${timeStr}`;
}

// Caller mentioned a day/date ("tomorrow", "kal", "Sunday", "20/08") with NO
// time attached — the full timeMatch extractor in extractEntities() requires
// an explicit am/pm/baje and won't match this at all, so without this the
// slot step just silently stayed unfilled and re-asked the same generic
// question. This lets the fast path instead acknowledge the date and ask
// specifically for the time.
function extractDateOnlyMention(text: string): string | null {
  const relative = text.match(/\b(parso|day after tomorrow|kal|tomorrow|aaj|today)\b/i);
  if (relative) return relative[0];
  const weekday = text.match(/\b(sunday|sun|monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat)\b/i);
  if (weekday) return weekday[0];
  const numericDate = text.match(/\b(\d{1,2}[\/\-]\d{1,2}(?:[\/\-]\d{2,4})?)\b/);
  if (numericDate) return numericDate[0];
  const monthDate = text.match(/\b(\d{1,2}\s+(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?))\b/i);
  if (monthDate) return monthDate[0];
  return null;
}

// Scripts this app has no support for at all — Arabic/Urdu, Hebrew, CJK,
// Cyrillic, Thai, Greek. Text matching these is treated as a likely STT
// hallucination, never as a legitimate language switch.
function hasUnsupportedScript(text: string): boolean {
  return /[؀-ۿ֐-׿一-鿿぀-ヿ가-힯Ѐ-ӿ฀-๿Ͱ-Ͽ]/.test(text);
}

// Does this text carry ANY independent evidence of what language it's in —
// a non-Latin script character, or a matched Hinglish keyword? Pure digits,
// punctuation, or a bare number ("9876543210") carry no signal either way.
// detectLanguage() returns "en-IN" both when text is genuinely English AND
// when it has no signal at all — those two cases are NOT the same thing, and
// conflating them was the bug: a caller mid-Hindi-conversation who answers
// "9876543210" (giving their phone number) would have that pure-digit
// non-signal wrongly treated as counter-evidence against the STT's correct
// hi-IN claim, flipping the reply to English on one of the most common turn
// types in the entire app.
function hasConcreteLanguageSignal(text: string): boolean {
  if (/[ऀ-ൿ઀-૿]/.test(text)) return true; // any Indic script
  const hinglishGrammar = /\b(mera|meri|mere|mujhe|hamara|humein|aapka|aapki|aapke|kripya|shukriya|dhanyawad|namaste|theek|achha|bilkul|haan|nahin|nahi|batao|bataiye|chahiye|karein|karunga|milega|milenge|ayenge|hoga|hogi|subah|shaam|dopahar|baje|kal|aaj|parso|umar|saal|takleef|dard|bukhar|khansi|dawai|ilaaj|dikhana|dijiye|dejiye|karwana|seedha|thoda|bahut|zyada|abhi|jaldi|phir|warna|toh|yahan|wahan|kab|kitna|kaunsa|kaise|kahan|kidhar|kyunki|isliye|samajh|pata|boliye|suniye|rukiye|aaiye)\b/i;
  return hinglishGrammar.test(text);
}

// ─── Language Stickiness ──────────────────────────────────────────────────
// Bengali speakers reported the AI randomly flipping to Hindi or English
// mid-conversation while they kept speaking Bengali the whole time. Root
// cause: language was decided fresh, independently, every single turn, with
// no memory of what language the conversation was actually being held in —
// so one short, phonetically ambiguous utterance with lower STT confidence
// (a one-word "yes", a name that sounds similar across languages) was enough
// to flip the whole conversation. Anchor to the language the conversation
// has actually been happening in, and only let it change with real evidence.
function establishedLanguageFromHistory(messages: { speaker: string; text: string }[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].speaker === "ai") return detectLanguage(messages[i].text);
  }
  return "en-IN"; // no AI turn yet — first message of the call, nothing to anchor to
}

// ─── Smart Language Detection (Unicode Script + Hinglish Heuristic) ─────────
// Returns BCP-47 language codes for all major Indian languages
function detectLanguage(text: string): string {
  if (!text || text.trim().length === 0) return "en-IN";

  // ── Step 1: Definitive Unicode script detection ──
  // U+0964 (।) and U+0965 (॥) — the danda/double-danda sentence
  // punctuation — are excluded below. They are pan-Indic: shared by Bengali,
  // Gujarati, Odia, Punjabi and others, not exclusive to Hindi. Matching on
  // them alone was misdetecting genuine Bengali/other-language sentences as
  // Hindi purely because the sentence ended in that punctuation mark —
  // nothing to do with the actual letters. This broke language stickiness
  // at the root.
  if (/[\u0900-\u0963\u0966-\u097F]/.test(text)) return "hi-IN";   // Devanagari letters/vowel signs -> Hindi/Marathi
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";   // Tamil
  if (/[\u0980-\u09FF]/.test(text)) return "bn-IN";   // Bengali
  if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";   // Telugu
  if (/[\u0A00-\u0A7F]/.test(text)) return "pa-IN";   // Punjabi/Gurmukhi
  if (/[\u0D00-\u0D7F]/.test(text)) return "ml-IN";   // Malayalam
  if (/[\u0C80-\u0CFF]/.test(text)) return "kn-IN";   // Kannada
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu-IN";   // Gujarati
  if (/[\u0B00-\u0B7F]/.test(text)) return "or-IN";   // Odia
  if (/[\u0A00-\u0A7F]/.test(text)) return "pa-IN";   // Punjabi

  // ── Step 2: Hinglish romanized detection (Hindi spoken in English letters) ──
  // Only match unambiguous grammatical Hindi words — NOT single-letter or ultra-short common words
  const hinglishGrammar = /\b(mera|meri|mere|mujhe|hamara|humein|aapka|aapki|aapke|kripya|shukriya|dhanyawad|namaste|theek|achha|bilkul|haan|nahin|nahi|batao|bataiye|chahiye|karein|karunga|milega|milenge|ayenge|hoga|hogi|subah|shaam|dopahar|baje|kal|aaj|parso|umar|saal|takleef|dard|bukhar|khansi|dawai|ilaaj|dikhana|dijiye|dejiye|karwana|seedha|thoda|bahut|zyada|abhi|jaldi|phir|warna|toh|yahan|wahan|kab|kitna|kaunsa|kaise|kahan|kidhar|kyunki|isliye|samajh|pata|boliye|suniye|rukiye|aaiye)\b/i;

  if (hinglishGrammar.test(text)) return "hi-IN";

  // ── Step 2b: Unsupported script → treat as noisy/garbled STT, not a real language switch ──
  // Whisper occasionally hallucinates text in a completely unrelated script
  // from unclear or noisy audio (a documented failure mode, not specific to
  // this app). None of Arabic/Urdu, Hebrew, CJK, Cyrillic, Thai, or Greek are
  // supported languages here — if any of them show up, it's far more likely
  // to be a transcription artifact than the user actually speaking that
  // language, so it must NOT be allowed to drive a language switch.
  if (hasUnsupportedScript(text)) return "en-IN";

  // ── Step 3: Default to Indian English ──
  return "en-IN";
}

// ─── Universal Spoken & Written Phone Number Parser ─────────────────────────
function parsePhoneNumber(rawText: string): string | null {
  if (!rawText) return null;

  let text = rawText.toLowerCase();

  // Word-to-digit replacement for spoken English, Hindi, and Devanagari numerals
  const wordDigits: Record<string, string> = {
    zero: "0", one: "1", two: "2", three: "3", four: "4",
    five: "5", six: "6", seven: "7", eight: "8", nine: "9",
    shunya: "0", ek: "1", do: "2", teen: "3", chaar: "4",
    paanch: "5", chhe: "6", saat: "7", aath: "8", nau: "9",
    "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
    "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
  };

  for (const [word, digit] of Object.entries(wordDigits)) {
    text = text.replace(new RegExp(`\\b${word}\\b`, "gi"), digit);
  }

  // Extract all contiguous or space-separated digits
  const digitsOnly = text.replace(/\D/g, "");

  // If there are 10 or more digits, extract the 10-digit Indian mobile number
  if (digitsOnly.length >= 10) {
    if (digitsOnly.startsWith("91") && digitsOnly.length === 12) return digitsOnly.slice(2);
    if (digitsOnly.startsWith("0") && digitsOnly.length === 11) return digitsOnly.slice(1);
    const match = digitsOnly.match(/[6-9]\d{9}/);
    if (match) return match[0];
    return digitsOnly.slice(-10);
  }

  return null;
}

// ─── Robust Named Entity Extraction (Regex Heuristic) ─────────────────────────
function extractEntities(text: string, current: Record<string, string> = {}, industryId = "doctors-clinics"): Record<string, string> {
  const result: Record<string, string> = { ...current };
  const lower = text.toLowerCase();

  // Robust Phone Number Parsing (Handles all space/dash/spoken groupings)
  const parsedPhone = parsePhoneNumber(text);
  if (parsedPhone) {
    result.mobile = parsedPhone;
  }

  // Name extraction (English + Hindi + Devanagari patterns)
  const nameMatch = text.match(
    /(?:my name is|i am|name is|mera naam|naam hai|this is|myself|naam|माय नेम इस|माय नेम|मेरा नाम|नाम है)\s+([a-zA-Z\u0900-\u097F]+(?:\s+[a-zA-Z\u0900-\u097F]+)??)(?=\s*(?:hai|he|and|है|हैं|हूं|एंड|,|\.|\d|phone|mobile|number|contact|नंबर|$))/i
  );
  if (nameMatch?.[1]) {
    const n = nameMatch[1].trim();
    if (!["hello", "hi", "hey", "namaste", "and", "hai", "looking", "need", "please", "confirm", "हेलो", "हाइ", "इस", "एंड"].includes(n.toLowerCase())) {
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
    /(?:age|umar|saal|years?|yrs?|age is|umar hai)\s*(?:is|:)?\s*(\d{1,3})/i,
    /\b(\d{1,3})\s*(?:years?|yrs?|saal|year old)\b/i,
    // Native-script "age" words across the 9 supported languages, both
    // orderings ("\u0909\u092e\u094d\u0930 28", "28 \u0938\u093e\u0932", etc). Previously only romanized
    // "umar"/"saal"/"age" were recognized, so a caller answering the DOB
    // question in their own script (\u0909\u092e\u094d\u0930, \u0935\u092f\u0924\u0941, \u0935\u092f\u0938\u094d\u0938\u0941, \u09ac\u09df\u09b8, \u0d35\u0d2f\u0d38\u0d4d\u0d38\u0d4d, \u0cb5\u0caf\u0cb8\u0ccd\u0cb8\u0cc1,
    // \u0a09\u0a2e\u0a30, \u0a89\u0a82\u0aae\u0ab0, \u0b2c\u0b5f\u0b38) never got detected deterministically, silently falling
    // through to GPT's own (looser) judgment instead.
    // Number-then-word ("28 साल", "28 வயது", "28 సంవత్సరాలు", "28 বছর"...)
    /(\d{1,3})\s*(?:\u0938\u093e\u0932|\u0935\u0930\u094d\u0937|\u0bb5\u0baf\u0ba4\u0bc1|\u0c35\u0c2f\u0c38\u0c4d\u0c38\u0c41|\u0c38\u0c02\u0c35\u0c24\u0c4d\u0c38\u0c30\u0c3e\u0c32\u0c41|\u09ac\u099b\u09b0|\u0d35\u0d2f\u0d38\u0d4d\u0d38\u0d4d|\u0cb5\u0caf\u0cb8\u0ccd\u0cb8\u0cc1)/,
    // Word-then-number ("मेरी उम्र 28 है", "ਮੇਰੀ ਉਮਰ 28", "ਮੇਰੀ ઉંમર 28", "ମୋର ବୟସ 28"...)
    /(?:\u0909\u092e\u094d\u0930|\u09ac\u09af\u09bc\u09b8|\u0a09\u0a2e\u0a30|\u0a89\u0a82\u0aae\u0ab0|\u0b2c\u0b5f\u0b38)[^\d]{0,15}(\d{1,3})/,
    /^(?:age\s*)?(\d{1,2})$/i,
  ];
  for (const pat of dobPatterns) {
    const m = text.match(pat);
    if (m?.[1] && !result.dob) {
      result.dob = m[1].trim() + (m[1].length <= 2 ? " Yrs" : "");
      break;
    }
  }

  // Industry-specific Domain extraction
  // Industry-specific Domain extraction
  if (industryId === "doctors-clinics") {
    // Every alternative here MUST be word-bounded (\b...\b). Without it,
    // "ear" (no boundary) matched inside "years" — so simply answering the
    // DOB question with "30 years old" silently set department to ENT and
    // skipped the actual department question on every single call. Same
    // risk with "test" inside "fastest/latest", "lab" inside "label", "hair"
    // inside "repair", etc. — bounding every word closes all of these.
    if (/\bcardio\w*\b|\bheart\b|\bdil\b|\bchest\b/i.test(lower)) {
      result.department = "Cardiology";
      result.doctor = "Dr. R. K. Sharma";
    } else if (/\bent\b|\bear\b|\bnose\b|\bthroat\b|\bkaan\b|\bnaak\b|\bgala\b|\bsinus\b/i.test(lower)) {
      result.department = "ENT";
      result.doctor = "Dr. Vikram Malhotra";
    } else if (/\bortho\w*\b|\bbone\b|\bjoint\b|\bhaddi\b|\bghutna\b|\bknee\b|\bback pain\b/i.test(lower)) {
      result.department = "Orthopedics";
      result.doctor = "Dr. Rajiv Verma";
    } else if (/\bderma\w*\b|\bskin\b|\bacne\b|\bhair\b|\btwacha\b|\bdaag\b/i.test(lower)) {
      result.department = "Dermatology";
      result.doctor = "Dr. Pooja Gupta";
    } else if (/\bpediatric\w*\b|\bchild\b|\bbacche\b|\bbaby\b|\binfant\b|\bshishu\b/i.test(lower)) {
      result.department = "Pediatrics";
      result.doctor = "Dr. Meera Rao";
    } else if (/\bgynec\w*\b|\bgynae\w*\b|\bwomen\b|\bpregnant\b|\bpregnancy\b|\bmahila\b/i.test(lower)) {
      result.department = "Gynecology";
      result.doctor = "Dr. Sunita Kapoor";
    } else if (/\bdental\b|\bteeth\b|\btooth\b|\bdaant\b|\bdentist\b/i.test(lower)) {
      result.department = "Dental Care";
      result.doctor = "Dr. Aman Joshi";
    } else if (/\beye\b|\baankh\b|\bvision\b|\bophthal\w*\b/i.test(lower)) {
      result.department = "Ophthalmology";
      result.doctor = "Dr. Alok Nath";
    } else if (/\blab\b|\bblood\b|\btest\b|\bsugar\b|\bpathology\b/i.test(lower)) {
      result.department = "Diagnostics & Pathology";
      result.doctor = "Central Pathology Desk";
    } else if (/\bgeneral\b|\bfever\b|\bcough\b|\bcold\b|\bbukhar\b|\bkhansi\b|\bphysician\b/i.test(lower)) {
      result.department = "General Medicine";
      result.doctor = "Dr. Ananya Sen";
    }
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
  } else if (industryId === "agriculture") {
    if (/fertilizer|khad|urea|dhan|paddy/i.test(lower)) result.department = "Crop Agronomy & Fertilizer Schedule";
    else if (/dealer|mandi|bhandar/i.test(lower)) result.department = "Dealer Stock & Supply Inquiry";
  } else if (industryId === "research") {
    if (/cardio|cohort|clinical|trial/i.test(lower)) result.department = "Cardiology Cohort Study (C-104)";
    else if (/survey|participant/i.test(lower)) result.department = "General Study Screening";
  }

  // Time & Slot matching (Catches any time: 10:00 AM, 10:00 baje, Tomorrow 10 AM, Sunday 11:30 AM, etc.)
  // The [\s,]*(?:at|ko|pe)?[\s,]* connector between the day word and the time
  // is deliberate — without it, "tomorrow at 10am" failed to match the day
  // group at all (only "at 10am" isn't a valid gap), so timeMatch[0] silently
  // became just "10am" and the date was lost entirely, not merely unresolved.
  const timeMatch = text.match(/\b(?:(kal|aaj|parso|tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)[\s,]*(?:at|ko|pe)?[\s,]*)?(?:(subah|dopahar|shaam|morning|afternoon|evening)[\s,]*(?:at|ko|pe)?[\s,]*)?(\d{1,2}(?::\d{2})?\s*(?:am|pm|baje))\b/i);
  if (timeMatch) {
    // No day/date word in THIS message (timeMatch[1] undefined) but the
    // previous turn already got one ("tomorrow") and asked for the time — the
    // caller's now-bare "3pm" answer completes that earlier date, so combine
    // them into one slot string instead of losing the date.
    if (!timeMatch[1] && current.pendingDate) {
      result.slotRequested = `${current.pendingDate} ${timeMatch[0].trim()}`;
      result.confirmedSlot = `${current.pendingDate} ${timeMatch[0].trim()}`;
    } else {
      result.slotRequested = timeMatch[0].trim();
      result.confirmedSlot = timeMatch[0].trim();
    }
    result.pendingDate = ""; // consumed (or superseded by an explicit date+time)
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
  const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

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
        max_tokens: 350,
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
    const clientKey = getClientKey(req);
    // One turn of a live conversation = one call here — 30/min covers a fast
    // back-and-forth while blocking scripted abuse that would run up the bill.
    const { allowed } = checkRateLimit(`chat:${clientKey}`, 30, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: "Rate limit exceeded. Please slow down." }, { status: 429 });
    }

    const body = await req.json();
    const {
      industryId = "doctors-clinics",
      messages = [],
      userMessage = "",
      currentExtracted = {},
      generateAudio = false,
      speaker = "ritu",
      sarvamLanguageCode = "", // Authoritative language from STT (overrides local regex)
      sttLanguageProbability = null, // Sarvam STT's own confidence in that language claim (0-1)
    } = body;

    const industry: IndustryFlow = INDUSTRY_FLOWS[industryId] || INDUSTRY_FLOWS["doctors-clinics"];
    const openaiKey = process.env.OPENAI_API_KEY?.trim() || "";

    // Always run heuristic extractor
    const extracted = extractEntities(userMessage, currentExtracted, industryId);

    // Whisper's own language-detection field is occasionally unreliable on
    // short or noisy audio (background noise, a stray cough, a half-second
    // clip) — it's known to sometimes hallucinate a completely unrelated
    // language for ambiguous input. Whisper always transcribes INTO whatever
    // language it thinks it heard, so a genuine detection should produce text
    // in that language's script. If it claims e.g. Tamil but the actual
    // transcript contains no Tamil characters at all, that's a strong signal
    // the detection was wrong — fall back to script-based detection on the
    // real transcript text instead of trusting the claim blindly. This is
    // what caused replies to randomly jump to a language the user never
    // spoke or asked for.
    const textBasedLang = detectLanguage(userMessage);
    const sttClaimIsPlausible =
      !sarvamLanguageCode ||
      sarvamLanguageCode === "en-IN" ||
      sarvamLanguageCode === textBasedLang ||
      // Devanagari-script claims (hi-IN) also cover Hinglish written in Latin
      // script, which the Unicode-only textBasedLang check can't see directly
      // but detectLanguage() already handles via its Hinglish keyword list.
      (sarvamLanguageCode === "hi-IN" && textBasedLang === "hi-IN") ||
      // The text itself carries no independent signal at all (pure digits —
      // a phone number, a DOB, an OTP) — nothing to disagree with the STT's
      // claim, so there's no basis to override it. Without this, providing a
      // mobile number mid-Hindi-conversation flipped the reply to English.
      !hasConcreteLanguageSignal(userMessage);

    const rawDetectedLang = sttClaimIsPlausible ? (sarvamLanguageCode || textBasedLang) : textBasedLang;

    // Stickiness: once the conversation is established in a non-English
    // language, don't let a single lower-confidence per-turn guess flip it
    // away — require the STT to be genuinely confident (>=75%) about the new
    // language before honoring a switch. A missing/low confidence score
    // (e.g. from the Whisper fallback path, which doesn't provide one) means
    // "not confident enough" and stays anchored, which is the safer default.
    const establishedLang = establishedLanguageFromHistory(messages);
    const CONFIDENT_SWITCH_THRESHOLD = 0.75;
    const isConfidentLanguageSwitch =
      typeof sttLanguageProbability === "number" && sttLanguageProbability >= CONFIDENT_SWITCH_THRESHOLD;

    const detectedLang =
      establishedLang !== "en-IN" && rawDetectedLang !== establishedLang && !isConfidentLanguageSwitch
        ? establishedLang
        : rawDetectedLang;

    const name = extracted.name || currentExtracted.name || "";
    const mobile = extracted.mobile || currentExtracted.mobile || "";
    const dob = extracted.dob || currentExtracted.dob || "";
    const dept = extracted.department || currentExtracted.department || "";
    const slot = extracted.confirmedSlot || extracted.slotRequested || currentExtracted.slot || "";
    const isHindi = detectedLang === "hi-IN";
    const lower = userMessage.toLowerCase();

    const { step: currentStep, isReadyToConfirm } = getCurrentStep(industry, { name, mobile, dob, department: dept, slot });

    let finalReply = "";
    let finalSpokenText = "";
    let finalLangCode = detectedLang;
    let finalStep = "intake_name_mobile";
    let finalExtracted: any = {};
    let finalIsComplete = false;
    let finalIsOffTopic = false;
    let responseSource = "state-machine-dynamic";
    // Drives Sarvam TTS pace/expressiveness (see TONE_PRESETS in speech/route.ts) —
    // a cheap way to make routine vs. apologetic vs. celebratory turns *sound*
    // different without a real emotion-conditioned voice model.
    let toneHint: "neutral" | "greeting" | "empathetic" | "confirmed" | "urgent" = "neutral";
    // Tells the frontend to hang up right after speaking finalReply — no more
    // listening, no waiting on the post-booking auto-hangup timer. Kept
    // separate from finalIsComplete so a farewell never triggers the
    // booking-webhook dispatch, which is keyed off isComplete/slot.
    let finalCallEnded = false;

    // ── -1. Farewell Interceptor ─────────────────────────────────────────────
    // Caller signals they're done (bye/goodbye/hang up/end call) at ANY point
    // in the conversation — not just after a completed booking. Deliberately
    // narrow (no "that's all"/"nothing else") to avoid misfiring on routine
    // replies during intake or FAQ answers.
    const isFarewell = /\b(bye+|good\s*bye|hang\s*up|end\s*(the\s*)?call|alvida)\b/i.test(userMessage);

    if (isFarewell) {
      finalReply =
        industryId === "doctors-clinics" && CLINIC_SUPPORTED_LANGS.includes(detectedLang as ClinicLang)
          ? CLINIC_TEMPLATES[detectedLang as ClinicLang].farewell
          : isHindi
            ? "कॉल करने के लिए धन्यवाद। आपका दिन शुभ हो!"
            : "Thank you for calling. Have a great day!";
      finalStep = "call_ended";
      finalExtracted = { ...currentExtracted, summary: finalReply.slice(0, 80) };
      responseSource = industryId === "doctors-clinics" ? "clinic-template" : "state-machine-dynamic";
      toneHint = "greeting";
      finalCallEnded = true;
    }

    // ── 0. Instant Emergency Medical Guardrail Interceptor ──────────────────────
    const isEmergency = !finalCallEnded && /\b(emergency|severe chest pain|chest pain|difficulty breathing|shortness of breath|unconscious|heavy bleeding|bleeding heavily|heart attack|stroke|serious accident|severe allergic|dil ka daura|saans lene|chhati mein dard|behosh)\b/i.test(userMessage);

    if (isEmergency && industryId === "doctors-clinics") {
      finalReply = isHindi
        ? `Yeh urgent medical emergency lag rahi hai. Kripya turant 112 par call karein ya nearest emergency department jayein. Clinic ka emergency unit 24 ghante open hai.`
        : `This sounds like it may require urgent medical attention. Our emergency services are available 24 hours a day. If this is a life-threatening emergency, please call 112 or go to the nearest emergency department immediately.`;
      finalSpokenText = isHindi
        ? `यह अर्जेंट मेडिकल इमरजेंसी लग रही है। कृपया तुरंत 112 पर कॉल करें या नजदीकी इमरजेंसी विभाग जाएं।`
        : "";
      finalStep = "emergency_triage";
      finalExtracted = {
        name: name || currentExtracted.name || "Emergency Patient",
        mobile: mobile || currentExtracted.mobile || "",
        dob: dob || currentExtracted.dob || "",
        department: "Emergency Care (24/7)",
        doctor: "On-Duty Emergency Triage Officer",
        slot: "Immediate Triage",
        intent: "CRITICAL EMERGENCY TRIAGE",
        appointment_id: "EMERGENCY-911",
        confirmed: true,
      };
      finalIsComplete = true;
      toneHint = "urgent";
    }

    // ── 0.5. Clinic Deterministic Fast Path (Level 1 hybrid) ─────────────────────
    // For doctors-clinics, in a supported language: routine turns are resolved
    // entirely from predefined templates + structured data — no GPT call,
    // guaranteed identical wording every time. This only ever sets finalReply
    // when it is CONFIDENT (the caller's message advanced the current step, or
    // matched a known FAQ). Anything genuinely ambiguous or off-script leaves
    // finalReply unset, and the proven GPT path below runs exactly as it did
    // before this existed — this is additive, not a replacement.
    if (!finalReply && industryId === "doctors-clinics" && CLINIC_SUPPORTED_LANGS.includes(detectedLang as ClinicLang)) {
      const lang = detectedLang as ClinicLang;
      const tpl = CLINIC_TEMPLATES[lang];
      const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const doctorForDept = DOCTOR_ROSTER[dept]?.doctor || currentExtracted.doctor || "";
      // Resolve "tomorrow 11am" etc. to an absolute calendar date-time — this
      // is what gets shown back to the caller, stored in extracted.slot, and
      // ultimately sent to the n8n webhook. Falls back to the raw text when
      // it can't confidently resolve (e.g. an explicit date GPT already
      // normalized upstream).
      const resolvedSlot = slot ? (resolveAbsoluteSlotString(slot, nowIST) || slot) : slot;
      const vars = { name, mobile, department: dept, doctor: doctorForDept, date_time: resolvedSlot };
      const faqAnswer = matchClinicFaq(userMessage, lang);

      // Caller gave a day/date but no time ("tomorrow", "kal", "Sunday") while
      // we're on the slot step — acknowledge the date and ask specifically
      // for the time, instead of silently re-asking the generic "when would
      // you like to schedule this" question again.
      const dateOnlyMention =
        currentStep?.id === "slot" && !extracted.confirmedSlot && !slot && !faqAnswer
          ? extractDateOnlyMention(userMessage)
          : null;
      if (dateOnlyMention) {
        finalReply = fillTemplate(tpl.askTime, { ...vars, date: dateOnlyMention });
        finalStep = "intake_name_mobile";
        finalExtracted = {
          name, mobile, dob, department: dept, doctor: doctorForDept, slot: "",
          intent: currentExtracted.intent || (dept ? `${dept} Consultation` : ""),
          summary: finalReply.slice(0, 80),
          pendingDate: dateOnlyMention,
        };
        responseSource = "clinic-template";
      }

      // Hard gate: a freshly-extracted slot is validated against clinic AND
      // doctor hours before it's allowed to count as "filled" — independent
      // of whatever step logic follows. An invalid slot never gets accepted.
      let slotRejected = false;
      if (!finalReply && slot && slot !== currentExtracted.slot) {
        const resolved = resolveDayAndHour(slot, nowIST);
        if (resolved) {
          const clinicOk = CLINIC_OPEN_DAYS.includes(resolved.dayOfWeek) && resolved.hour >= CLINIC_OPEN_HOUR && resolved.hour < CLINIC_CLOSE_HOUR;
          const doctorEntry = DOCTOR_ROSTER[dept];
          const doctorOk = !doctorEntry || (doctorEntry.days.includes(resolved.dayOfWeek) && resolved.hour >= doctorEntry.startHour && resolved.hour < doctorEntry.endHour);

          if (!clinicOk) {
            finalReply = tpl.outOfHours;
            slotRejected = true;
          } else if (!doctorOk && doctorEntry) {
            finalReply = fillTemplate(tpl.doctorDayMismatch, {
              doctor: doctorEntry.doctor,
              days: formatDaysList(doctorEntry.days, lang),
              hours: formatHourRange(doctorEntry.startHour, doctorEntry.endHour),
            });
            slotRejected = true;
          }
          if (slotRejected) {
            finalStep = "inquiry_resolution";
            finalExtracted = {
              name, mobile, dob, department: dept, doctor: doctorForDept, slot: "",
              intent: currentExtracted.intent || (dept ? `${dept} Consultation` : ""),
              summary: finalReply.slice(0, 80),
            };
            responseSource = "clinic-template";
            toneHint = "empathetic";
          }
        }
        // resolved === null: can't validate this phrasing deterministically —
        // don't reject, let the existing GPT date resolution handle it below.
      }

      if (!finalReply && !slotRejected) {
        const { step: stepBeforeThisTurn } = getCurrentStep(industry, {
          name: currentExtracted.name || "",
          mobile: currentExtracted.mobile || "",
          dob: currentExtracted.dob || "",
          department: currentExtracted.department || "",
          slot: currentExtracted.slot || "",
        });
        const advancedThisTurn = stepBeforeThisTurn?.id !== currentStep?.id || isReadyToConfirm;

        if (advancedThisTurn || faqAnswer) {
          if (isReadyToConfirm) {
            const affirmative = /\b(yes|yeah|yep|correct|confirm|book\s*it|okay|ok|haan|theek|sahi|சரி|ஆம்|అవును|హా|হ্যাঁ|ঠিক|ਹਾਂ|ਠੀਕ|હા|બરાબર|ହଁ|ଠିକ)\b/i.test(userMessage);

            if (affirmative) {
              const generated = generateActionId(industry);
              finalReply = fillTemplate(tpl.confirmed, { id: generated.idValue });
              finalStep = "confirmation_complete";
              finalIsComplete = true;
              finalExtracted = {
                name, mobile, dob, department: dept, doctor: doctorForDept, slot: resolvedSlot,
                intent: currentExtracted.intent || (dept ? `${dept} Consultation` : ""),
                appointment_id: generated.idValue,
                confirmed: true,
                appointment_status: "CONFIRMED",
                summary: finalReply.slice(0, 80),
              };
              toneHint = "confirmed";
            } else {
              const confirmationLine = fillTemplate(tpl.confirmation, vars);
              finalReply = faqAnswer ? `${faqAnswer} ${confirmationLine}` : confirmationLine;
              finalStep = "confirmation_summary";
              finalExtracted = {
                name, mobile, dob, department: dept, doctor: doctorForDept, slot: resolvedSlot,
                intent: currentExtracted.intent || (dept ? `${dept} Consultation` : ""),
                summary: finalReply.slice(0, 80),
              };
            }
          } else if (currentStep) {
            const askTemplates: Record<string, string> = {
              name: tpl.couldNotUnderstand,
              mobile: tpl.askMobile,
              dob: tpl.askDob,
              department: tpl.askDepartment,
              slot: tpl.askSlot,
            };
            const askLine = fillTemplate(askTemplates[currentStep.id] || tpl.couldNotUnderstand, vars);
            finalReply = faqAnswer ? `${faqAnswer} ${askLine}` : askLine;
            finalStep = "intake_name_mobile";
            finalExtracted = {
              name, mobile, dob, department: dept, doctor: doctorForDept, slot: resolvedSlot,
              intent: currentExtracted.intent || (dept ? `${dept} Consultation` : ""),
              summary: finalReply.slice(0, 80),
            };
          }
          if (finalReply) responseSource = "clinic-template";
        }
        // else: genuinely unclear input, no progress, no FAQ match — leave
        // finalReply unset, fall through to the GPT path exactly as before.
      }
    }

    // ── 1. Try OpenAI first with Structured Entity Extraction ───────────────────
    if (!finalReply && openaiKey) {
      try {
        // Compute real current date in IST for GPT to resolve relative terms like "tomorrow"
        const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        const todayStr = nowIST.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        const tomorrowIST = new Date(nowIST); tomorrowIST.setDate(tomorrowIST.getDate() + 1);
        const tomorrowStr = tomorrowIST.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        const dayAfterIST = new Date(nowIST); dayAfterIST.setDate(dayAfterIST.getDate() + 2);
        const dayAfterStr = dayAfterIST.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

        const fieldStatusLines = [
          `- Customer Name: "${name ? name + ' (ALREADY COLLECTED)' : 'NOT PROVIDED'}"`,
          `- Contact Mobile: "${mobile ? mobile + ' (VERIFIED 10-DIGIT MOBILE ALREADY COLLECTED - DO NOT REJECT OR ASK AGAIN!)' : 'NOT PROVIDED'}"`,
          industry.requiresDob
            ? `- Date of Birth / Age: "${dob ? dob + ' (ALREADY COLLECTED)' : 'NOT PROVIDED'}"`
            : "- DOB: Not required for this vertical",
          `- Service / Interest: "${dept || "Pending"}"`,
          `- Slot Requested: "${slot || "None"}"`,
        ].join("\n");

        const currentStepInstruction = isReadyToConfirm
          ? `All required information has been collected. In ONE sentence, summarize everything known (name, mobile${industry.requiresDob ? ", age/DOB" : ""}, service/interest, and date & time if given) and explicitly ask the customer to confirm — e.g. "Is that correct?" / Hindi: "Kya yeh sahi hai?". Do NOT set isComplete or invent an appointment_id yet; wait for their explicit yes.
- If the customer's LAST message is an explicit confirmation ("yes", "correct", "haan", "theek hai", "confirm", "book it"): thank them, say details have been sent to their WhatsApp, set isComplete: true and appointment_status: "CONFIRMED". Leave appointment_id BLANK — the system assigns the real reference ID, never invent one.`
          : `Ask exactly this one question next (translate/adapt naturally to the detected language below, keep it warm and short): "${currentStep?.askEnglish}"
- Do not ask about anything else this turn. Do not skip ahead to later steps.`;

        const systemPrompt = `You are Namuste, the expert professional AI Voice & Chat Receptionist for "${industry.brandName}".
Industry Vertical: ${industry.name}
Tagline: ${industry.tagline}

## REAL-TIME DATE CONTEXT (Use this to resolve ALL relative date expressions — NEVER guess dates):
- TODAY is: ${todayStr}
- TOMORROW is: ${tomorrowStr}
- DAY AFTER TOMORROW is: ${dayAfterStr}
- When the customer says "tomorrow" or "kal", use EXACTLY: ${tomorrowStr}
- When the customer says "aaj" or "today", use EXACTLY: ${todayStr}
- Always store preferred_date as a human-readable date string like "Wednesday, 27 August 2026", NOT as YYYY-MM-DD.

## BUSINESS BACKGROUND & KNOWLEDGE BASE
${industry.systemPrompt}

## CURRENT INTAKE DATA (DO NOT ASK FOR THESE AGAIN IF ALREADY COLLECTED)
${fieldStatusLines}

## CURRENT STEP — this is the ONLY thing to do this turn
${currentStepInstruction}
- Never ask for information already marked "(ALREADY COLLECTED)" above.
- Never invent facts, people, prices, or availability not present in BUSINESS BACKGROUND above.
## DYNAMIC TURN-BY-TURN LANGUAGE DETECTION & NATIVE RESPONSE:
- Detected Script/Language for THIS TURN: ${detectedLang} (${
  detectedLang === "hi-IN" ? "Hindi / Hinglish" :
  detectedLang === "ta-IN" ? "Tamil" :
  detectedLang === "te-IN" ? "Telugu" :
  detectedLang === "bn-IN" ? "Bengali" :
  detectedLang === "ml-IN" ? "Malayalam" :
  detectedLang === "kn-IN" ? "Kannada" :
  detectedLang === "pa-IN" ? "Punjabi" :
  detectedLang === "gu-IN" ? "Gujarati" :
  detectedLang === "or-IN" ? "Odia" : "English"
})
- MANDATE: You MUST reply in the SAME language as the user just spoke. Do NOT stay in a previous language.
- STANDING CAPABILITY (always true, not just this turn): You are fully fluent and ALWAYS able to converse in ALL of these languages: English, Hindi/Hinglish, Tamil, Telugu, Bengali, Malayalam, Kannada, Punjabi, Gujarati, and Odia. If the caller directly asks whether you can speak any of these — including Punjabi — the answer is always YES, and you should immediately demonstrate it by replying in that language. NEVER claim you can only speak Hindi and English, or that any language on this list is unsupported — that is false.
- HARD CONSTRAINT: The ONLY languages you may EVER reply in are the ones listed above. Never reply in Urdu, Arabic, any other script, or any language not in this list — even if the caller's transcribed message appears to be in such a script. That almost always means the speech-to-text mis-transcribed unclear audio, not that the caller actually spoke that language. In that case, reply in English and politely ask them to repeat themselves.
  • English → Reply in natural Indian English. Set languageCode: "en-IN", spokenDevanagari: "".
  • Hindi/Hinglish → Reply in warm Hinglish (Roman for "reply"), AND write the SAME reply in natural Devanagari script for "spokenDevanagari" for studio-quality voice. Set languageCode: "hi-IN".
  • Tamil → Reply in Tamil. Set languageCode: "ta-IN", spokenDevanagari: "".
  • Telugu → Reply in Telugu. Set languageCode: "te-IN", spokenDevanagari: "".
  • Bengali → Reply in Bengali. Set languageCode: "bn-IN", spokenDevanagari: "".
  • Malayalam → Reply in Malayalam. Set languageCode: "ml-IN", spokenDevanagari: "".
  • Kannada → Reply in Kannada. Set languageCode: "kn-IN", spokenDevanagari: "".
  • Punjabi → Reply in Punjabi. Set languageCode: "pa-IN", spokenDevanagari: "".
  • Gujarati → Reply in Gujarati. Set languageCode: "gu-IN", spokenDevanagari: "".
- VOICE REPLY LENGTH: Keep "reply" to MAX 20 WORDS. This is a voice call — short, natural, spoken sentences only. Never use bullet points, markdown, or lists.

## JSON RESPONSE FORMAT (Respond with ONLY this JSON):
{
  "reply": "Max 20-word spoken sentence in the user's language",
  "spokenDevanagari": "Only for Hindi — write full reply in Devanagari script for TTS; blank for all other languages",
  "languageCode": "${detectedLang}",
  "step": "intake_name_mobile | intake_dob | service_menu | inquiry_resolution | confirmation_summary | confirmation_complete | emergency_triage",
  "extracted": {
    "patient_name": "Full Name",
    "mobile_number": "10-digit mobile number",
    "age": "Age or DOB",
    "intent": "Intent summary",
    "appointment_type": "Doctor Appointment | Diagnostic Lab | Follow-up | General Info",
    "department": "Specialty Department",
    "doctor": "Doctor Name",
    "preferred_date": "Preferred Date",
    "preferred_time": "Preferred Time",
    "confirmed": false,
    "appointment_status": "PENDING_INTAKE | AWAITING_CONFIRMATION | CONFIRMED | EMERGENCY_TRIAGE",
    "appointment_id": ""
  },
  "isComplete": false,
  "isOffTopic": false
}`;

        // If the transcript itself contains an unsupported script, don't hand
        // GPT the raw garbled text at all — it tends to mirror whatever
        // script it sees directly in the conversation regardless of the
        // "detected language" instruction elsewhere in the prompt. Replacing
        // it with a plain-English placeholder removes the temptation
        // entirely instead of relying on the model to resist it.
        const safeUserMessage = hasUnsupportedScript(userMessage)
          ? "[Caller's audio was unclear/garbled and could not be transcribed reliably. Ask them politely, in English, to repeat what they said.]"
          : userMessage;

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
          openaiMessages.push({ role: "user", content: safeUserMessage });
        } else {
          openaiMessages[openaiMessages.length - 1].content = safeUserMessage;
        }

        const parsed = await callOpenAI(systemPrompt, openaiMessages, openaiKey);

        finalReply = parsed.reply || "";
        finalSpokenText = parsed.spokenDevanagari || "";
        // Use OUR computed (and now sticky) detectedLang, not the model's own
        // self-reported languageCode field — just proved unreliable: GPT can
        // write a perfectly correct Bengali reply while mislabeling its own
        // languageCode as hi-IN. We already told it exactly which language to
        // use; trust that instruction over its inconsistent echo of it.
        finalLangCode = detectedLang;
        finalStep = parsed.step || "intake_name_mobile";
        finalIsComplete = parsed.isComplete || false;
        finalIsOffTopic = parsed.isOffTopic || false;
        responseSource = "openai-gpt4o-mini";
        if (finalIsComplete || finalStep === "confirmation_complete") toneHint = "confirmed";

        // Only carry forward fields that are ACTUALLY provided — no hardcoded defaults that pre-fill the dashboard
        const resolvedDept = parsed.extracted?.department || extracted.department || currentExtracted.department || "";
        const resolvedDoctor = parsed.extracted?.doctor || extracted.doctor || currentExtracted.doctor || "";
        const resolvedSlot = parsed.extracted?.preferred_time
          ? `${parsed.extracted.preferred_date || ""} ${parsed.extracted.preferred_time}`.trim()
          : (parsed.extracted?.slot || extracted.confirmedSlot || extracted.slotRequested || currentExtracted.slot || "");

        const generatedId = finalIsComplete ? generateActionId(industry) : null;

        finalExtracted = {
          name: parsed.extracted?.patient_name || parsed.extracted?.name || extracted.name || currentExtracted.name || "",
          mobile: parsed.extracted?.mobile_number || parsed.extracted?.mobile || extracted.mobile || currentExtracted.mobile || "",
          dob: parsed.extracted?.age || parsed.extracted?.dob || extracted.dob || currentExtracted.dob || "",
          department: resolvedDept,
          doctor: resolvedDoctor,
          slot: resolvedSlot,
          intent: parsed.extracted?.intent || currentExtracted.intent || `${industry.name} Consultation / Inquiry`,
          appointment_id: generatedId?.idValue || currentExtracted.appointment_id || "",
          confirmed: parsed.extracted?.confirmed || finalIsComplete,
          appointment_status: parsed.extracted?.appointment_status || (finalIsComplete ? "CONFIRMED" : "IN_PROGRESS"),
          summary: (parsed.reply || "").slice(0, 80),
        };

        // The model was told not to invent a specific ID — splice the real
        // system-generated one into the spoken reply if it confirmed without one.
        if (finalIsComplete && generatedId && !finalReply.includes(generatedId.idValue)) {
          finalReply = `${finalReply} Your reference ID is ${generatedId.idValue}.`.trim();
          if (finalSpokenText) {
            finalSpokenText = `${finalSpokenText} Aapka reference ID hai ${generatedId.idValue}.`.trim();
          }
        }

        // If the reply explicitly confirmed a slot, ensure slot is set
        if (!finalExtracted.slot && (finalReply.toLowerCase().includes("confirm") || finalIsComplete)) {
          const matchedSlot = finalReply.match(/\b(?:(kal|aaj|tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\s+)?(?:(subah|dopahar|shaam|morning|afternoon|evening)\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm|baje))\b/i);
          if (matchedSlot) finalExtracted.slot = matchedSlot[0];
        }
      } catch (openaiErr: any) {
        console.warn("[OpenAI warn — falling to dynamic state machine]:", openaiErr?.message || openaiErr);
      }
    }

    // ── 2. Dynamic State Machine Fallback ───────────────────────────────────────
    if (!finalReply) {
      if (!name || !mobile) {
        if (name && !mobile) {
          finalReply = isHindi
            ? `Shukriya, ${name} ji. Kripya apna 10-digit mobile number batayein?`
            : `Thank you, ${name}! May I have your 10-digit mobile number to proceed?`;
        } else if (!name && mobile) {
          finalReply = isHindi
            ? `Shukriya. Kripya apna poora naam batayein?`
            : `Got your number, thank you! May I know your full name please?`;
        } else {
          finalReply = isHindi
            ? `Namaste! Main ${industry.brandName} ka digital assistant hoon. Kripya apna naam aur mobile number batayein?`
            : `Hello and welcome to ${industry.brandName}. I am Namuste. May I have your name and mobile number to assist you?`;
        }
      } else if (industry.requiresDob && !dob) {
        finalReply = isHindi
          ? `Shukriya, ${name} ji! Kripya record ke liye apni date of birth ya umar batayein?`
          : `Thank you, ${name}! Could you please share your date of birth or age for our records?`;
        finalStep = "intake_dob";
      } else if (extracted.confirmedSlot || lower.includes("confirm") || lower.includes("reserve") || lower.includes("book")) {
        const confirmedTime = extracted.confirmedSlot || "Tomorrow 10:00 AM";
        const fallbackId = generateActionId(industry);
        finalExtracted.slot = confirmedTime;
        finalExtracted.intent = `${industry.name} Consultation`;
        finalExtracted.appointment_id = fallbackId.idValue;
        finalReply = isHindi
          ? `Bahut badhiya! ${name} ji, aapka ${industry.name} appointment ${confirmedTime} ke liye confirm ho gaya hai. Reference ID hai ${fallbackId.idValue}. Details WhatsApp par bhej di gayi hain. Dhanyawaad!`
          : `Excellent, ${name}! Your consultation with ${industry.brandName} is confirmed for ${confirmedTime}. Your reference ID is ${fallbackId.idValue}. Details have been sent to your WhatsApp. Thank you!`;
        finalStep = "confirmation_complete";
        finalIsComplete = true;
      } else if (lower.includes("service") || lower.includes("fee") || lower.includes("timing") || lower.includes("price") || lower.includes("cost") || lower.includes("flat") || lower.includes("bhk")) {
        if (industryId === "real-estate") {
          finalReply = isHindi
            ? `Hamare paas luxury 2BHK aur 3BHK residences available hain ₹1.5 Cr budget mein. VIP Model flat tour kal subah 10:00 AM par available hai. Kya confirm karein?`
            : `We offer luxury 2BHK and 3BHK residences starting at ₹1.5 Cr. A private model apartment VIP tour is available tomorrow at 10:00 AM. Shall I confirm your visit?`;
        } else if (industryId === "lawyers") {
          finalReply = isHindi
            ? `Hum Property Law, Corporate, Civil aur Family Law matters handle karte hain. Senior Advocate consultation Thursday 4:00 PM par available hai. Kya slot book karein?`
            : `We handle Property Law, Corporate Contracts, Civil Disputes, and Family Law. Video consultation with Senior Counsel is available this Thursday at 4:00 PM. Would you like to reserve it?`;
        } else {
          finalReply = isHindi
            ? `Hum ${industry.name} services offer karte hain. Kya aap consultation appointment book karna chahenge?`
            : `We provide complete ${industry.name} services. Would you like to schedule a consultation?`;
        }
        finalStep = "inquiry_resolution";
      } else {
        finalReply = isHindi
          ? `Shukriya ${name} ji! Main ${industry.brandName} mein aapki kaise madad kar sakta hoon? Aap services, pricing, ya appointment ke baare mein pooch sakte hain.`
          : `Thank you, ${name}! How may I assist you at ${industry.brandName} today? I can help with our services, consultation timings, or scheduling your session.`;
        finalStep = "service_menu";
      }

      finalExtracted = {
        name: extracted.name || currentExtracted.name || "",
        mobile: extracted.mobile || currentExtracted.mobile || "",
        dob: extracted.dob || currentExtracted.dob || "",
        department: extracted.department || currentExtracted.department || "",   // Never pre-fill
        doctor: extracted.doctor || currentExtracted.doctor || "",               // Never pre-fill
        slot: extracted.confirmedSlot || extracted.slotRequested || currentExtracted.slot || "",
        intent: extracted.intent || currentExtracted.intent || "",
        summary: finalReply.slice(0, 80),
      };
    }

    // ── 3. High-Speed Server-Side TTS Generation (With Native Accent Routing) ──
    let audioBase64: string | null = null;
    if (generateAudio && finalReply) {
      try {
        const ttsText = finalSpokenText || finalReply;
        const ttsResult = await generateSarvamTTS(ttsText, speaker, finalLangCode, toneHint);
        audioBase64 = ttsResult.audioBase64;
      } catch (ttsErr) {
        console.warn("[Unified TTS generation warn]:", ttsErr);
      }
    }

    return NextResponse.json({
      success: true,
      source: responseSource,
      reply: finalReply,
      languageCode: finalLangCode,
      step: finalStep,
      tone: toneHint,
      callEnded: finalCallEnded,
      extracted: finalExtracted,
      isComplete: finalIsComplete,
      isOffTopic: finalIsOffTopic,
      audioBase64,
    });
  } catch (error) {
    console.error("Chat engine error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

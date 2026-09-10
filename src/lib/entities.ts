import { ClinicLang } from "@/data/clinicTemplates";
import { parseSlotWithChrono } from "@/lib/dateEngine";

// A real Indian mobile number: exactly 10 digits, starting 6-9. Exported so
// every place a mobile number can enter the system — GPT's own extraction,
// a value carried forward from a previous turn, the final confirm-time
// guard — can reject one that only LOOKS plausible. Necessary because a
// real caller's speech can get mis-transcribed (a dropped digit is a
// documented, verified failure mode of the STT here, not hypothetical) and
// nothing before this guard existed enforced the format at all once GPT's
// own looser extraction was in play.
export function isValidIndianMobile(value: string): boolean {
  const digits = (value || "").replace(/\D/g, "");
  return digits.length === 10 && /^[6-9]/.test(digits);
}

// ─── Universal Spoken & Written Phone Number Parser ─────────────────────────
export function parsePhoneNumber(rawText: string): string | null {
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
    // Last-resort fallback (extra digits with no clean 6-9-leading match
    // anywhere) — only accept it if it actually looks like a real mobile
    // number; a raw last-10-digits slice with no format check let clearly
    // wrong sequences (starting 0-5, or a run of the same digit) through.
    const tail = digitsOnly.slice(-10);
    return isValidIndianMobile(tail) ? tail : null;
  }

  return null;
}

// ─── Robust Named Entity Extraction (Regex Heuristic) ─────────────────────────
export function extractEntities(text: string, current: Record<string, string> = {}, industryId = "doctors-clinics"): Record<string, string> {
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

  // Bare short reply on what's almost certainly the name step — no name has
  // been collected in any prior turn, neither pattern above matched (both
  // require a trigger phrase like "my name is" or a trailing phone number),
  // and the whole message is just 1-3 plain words with no digits. A caller
  // who's just been asked their name and answers with only "Ankush" (no
  // "my name is" prefix) was previously invisible to extraction entirely —
  // silently falling through to the far less reliable GPT fallback layer for
  // one of the single most common turns in the whole flow.
  if (!result.name && !current.name) {
    const trimmed = text.trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const isBareShortName =
      words.length >= 1 && words.length <= 3 &&
      /^[a-zA-Z\u0900-\u097F\s.]+$/.test(trimmed) &&
      !/\b(hello|hi|hey|namaste|yes|no|ok|okay|haan|nahi|nahin|please|thanks|thank you|hii|hlo|bye|namaskar)\b/i.test(trimmed);
    if (isBareShortName) {
      result.name = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
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
    } else if (/\bdental\b|\bteeth\b|\btooth\b|\bdaant\w*\b|\bdant\w*\b|\bdentist\b|\btoothache\b|\bcavity\b|\broot\s*canal\b|\bmasud\w*\b|\bjaad\b/i.test(lower)) {
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

  // Time & Slot matching via chrono-node (see parseSlotWithChrono above) —
  // actually parses date/time grammar instead of matching a fixed vocabulary
  // of day-words, so it covers far more real phrasing ("in 3 days", "next
  // Friday", "29th August", explicit dates) without hand-maintaining a regex
  // list that breaks on the next phrase nobody thought to add.
  //
  // If THIS message has no date on its own but a previous turn already
  // captured one ("tomorrow") and asked for the time, the caller's now-bare
  // "3pm" answer completes that earlier date — parse the combination as one
  // phrase instead of losing the date.
  const nowISTForSlot = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const combinedForSlotParsing = current.pendingDate ? `${current.pendingDate} ${text}` : text;
  const parsedSlot = parseSlotWithChrono(combinedForSlotParsing, nowISTForSlot);
  if (parsedSlot && parsedSlot.hasTime) {
    // Store the RAW combined text, not a pre-resolved string — resolveAbsoluteSlotString
    // (called downstream once the slot passes hours validation) does the
    // actual resolution to an absolute date; this only decides "yes, a real
    // date+time was given this turn" and hands the raw text forward.
    const combined = combinedForSlotParsing.trim();
    result.slotRequested = combined;
    result.confirmedSlot = combined;
    result.pendingDate = ""; // consumed (or superseded by an explicit date+time)
  }

  return result;
}


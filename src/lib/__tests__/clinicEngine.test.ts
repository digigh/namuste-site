import { describe, it, expect } from "vitest";
import { checkFarewell } from "@/lib/clinicEngine";

// Confirmed live: a Hindi caller saying "thank you" after a confirmed
// booking gets transcribed by STT in Devanagari script ("थैंक यू",
// "धन्यवाद"), not romanized text — checkFarewell must recognize those the
// same way it recognizes the Latin-script phrasings, or the call keeps
// repeating the booking confirmation instead of saying goodbye.
describe("checkFarewell — Hindi (Devanagari) gratitude after confirmation", () => {
  const baseParams = {
    industryId: "doctors-clinics",
    detectedLang: "hi",
    isHindi: true,
    currentExtracted: { confirmed: true },
  };

  it.each([
    "थैंक यू",
    "थैंक्यू",
    "धन्यवाद",
    "शुक्रिया",
  ])("treats %s as a farewell once the booking is confirmed", (userMessage) => {
    const result = checkFarewell({ ...baseParams, userMessage });
    expect(result).not.toBeNull();
  });

  it("still falls through to normal handling when Devanagari gratitude has real extra content", () => {
    const result = checkFarewell({
      ...baseParams,
      userMessage: "धन्यवाद, मेरा नाम अंकुश है",
    });
    expect(result).toBeNull();
  });

  it("does not treat romanized thank you as farewell before confirmation", () => {
    const result = checkFarewell({
      ...baseParams,
      currentExtracted: {},
      userMessage: "thank you",
    });
    expect(result).toBeNull();
  });
});

// The clinic flow supports 10 languages (CLINIC_SUPPORTED_LANGS) — the
// Devanagari fix above only covered Hindi, so verify every other supported
// language's native "thank you" is recognized too, or the exact same bug
// just resurfaces call-by-call as each language gets tested live.
describe("checkFarewell — gratitude in every clinic-supported language", () => {
  const confirmed = { confirmed: true };

  it.each([
    ["ta", "நன்றி"],
    ["te", "ధన్యవాదాలు"],
    ["bn", "ধন্যবাদ"],
    ["ml", "നന്ദി"],
    ["kn", "ಧನ್ಯವಾದಗಳು"],
    ["pa", "ਧੰਨਵਾਦ"],
    ["gu", "આભાર"],
    ["or", "ଧନ୍ୟବାଦ"],
  ])("recognizes %s gratitude phrase %s once confirmed", (detectedLang, userMessage) => {
    const result = checkFarewell({
      userMessage,
      industryId: "doctors-clinics",
      detectedLang,
      isHindi: false,
      currentExtracted: confirmed,
    });
    expect(result).not.toBeNull();
  });
});

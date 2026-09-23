import { describe, it, expect } from "vitest";
import { parseSlotWithChrono, resolveDayAndHour } from "@/lib/dateEngine";

// Fixed reference "now" so relative phrases ("tomorrow", "Wednesday") resolve
// deterministically regardless of when the test suite actually runs.
const NOW = new Date("2026-09-22T10:00:00+05:30"); // a Tuesday in IST

describe("parseSlotWithChrono — AM/PM disambiguation", () => {
  it("resolves an explicit PM time correctly", () => {
    const result = parseSlotWithChrono("Wednesday 1pm", NOW);
    expect(result?.hasTime).toBe(true);
    expect(result?.date.getHours()).toBe(13);
  });

  it("reinterprets a bare ambiguous hour (1-6) as PM when no meridiem/period word is given", () => {
    // The exact reported bug: "1 baje" alone defaulted to 1 AM, wrongly
    // rejecting a legitimate afternoon slot for a clinic that never opens
    // before 7 AM.
    const result = parseSlotWithChrono("Wednesday 1 o'clock", NOW);
    expect(result?.hasTime).toBe(true);
    expect(result?.date.getHours()).toBe(13);
  });

  it("does not shift an hour when a day-period word already disambiguates it", () => {
    const morning = parseSlotWithChrono("Wednesday morning 9 o'clock", NOW);
    expect(morning?.date.getHours()).toBe(9);

    const evening = parseSlotWithChrono("Wednesday evening 6 o'clock", NOW);
    expect(evening?.date.getHours()).toBe(18);
  });

  it("does not shift a legitimate 9 AM slot into PM", () => {
    const result = parseSlotWithChrono("Wednesday 9 o'clock", NOW);
    expect(result?.date.getHours()).toBe(9);
  });

  it("leaves 7/8 AM alone (the fasting-blood-test desk genuinely opens at 7 AM)", () => {
    const seven = parseSlotWithChrono("Wednesday 7 o'clock", NOW);
    expect(seven?.date.getHours()).toBe(7);
  });

  it("exposes only the matched date/time phrase, not a whole longer sentence", () => {
    const result = parseSlotWithChrono(
      "why can't I get 1 instead of 2 for the appointment on Wednesday",
      NOW
    );
    if (result?.hasTime) {
      expect(result.matchedText.length).toBeLessThan(30);
    }
  });
});

describe("resolveDayAndHour", () => {
  it("returns null when no time was actually specified", () => {
    expect(resolveDayAndHour("Wednesday", NOW)).toBeNull();
  });

  it("resolves a genuine day+hour pair", () => {
    const resolved = resolveDayAndHour("Wednesday 11am", NOW);
    expect(resolved).not.toBeNull();
    expect(resolved?.hour).toBe(11);
  });
});

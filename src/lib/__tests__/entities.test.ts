import { describe, it, expect } from "vitest";
import { extractEntities, isValidIndianMobile } from "@/lib/entities";

describe("extractEntities — slot extraction", () => {
  it("captures a genuine short slot answer (date + time)", () => {
    const result = extractEntities("kal subah 10 baje", {}, "doctors-clinics");
    expect(result.confirmedSlot).toBeTruthy();
    expect(result.confirmedSlot!.length).toBeLessThanOrEqual(60);
  });

  it("does NOT treat a bare time-only rebuttal (no date) as a new slot", () => {
    // The exact reported bug: a caller pushing back on a rejected slot
    // mentions real time words ("2", "1") without providing a new date+time.
    const result = extractEntities(
      "आपने ही तो बताया 2 बजे तक डॉक्टर आता है तो 1 बजे क्यों नहीं मिल सकता वह।",
      { department: "Orthopedics" },
      "doctors-clinics"
    );
    expect(result.slotRequested).toBeFalsy();
    expect(result.confirmedSlot).toBeFalsy();
  });

  it("never stores more than the matched date/time phrase, even for a long message", () => {
    const longMessage =
      "So basically what I meant to say earlier when we were talking about the appointment is that I would prefer tomorrow 3pm if that works for everyone involved in this decision";
    const result = extractEntities(longMessage, {}, "doctors-clinics");
    if (result.confirmedSlot) {
      expect(result.confirmedSlot.length).toBeLessThanOrEqual(60);
      expect(result.confirmedSlot).not.toBe(longMessage);
    }
  });

  it("combines a pending date from an earlier turn with a bare time this turn", () => {
    const result = extractEntities("3pm", { pendingDate: "tomorrow" }, "doctors-clinics");
    expect(result.confirmedSlot).toBeTruthy();
  });
});

describe("isValidIndianMobile", () => {
  it("accepts a genuine 10-digit number starting 6-9", () => {
    expect(isValidIndianMobile("9876543210")).toBe(true);
  });

  it("rejects a 9-digit number (a dropped-digit STT mis-transcription)", () => {
    expect(isValidIndianMobile("987654321")).toBe(false);
  });

  it("rejects a number not starting with 6-9", () => {
    expect(isValidIndianMobile("5876543210")).toBe(false);
  });
});

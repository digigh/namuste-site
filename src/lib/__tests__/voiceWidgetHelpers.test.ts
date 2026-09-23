import { describe, it, expect } from "vitest";
import { formatDuration, splitSlot } from "@/lib/voiceWidgetHelpers";

describe("formatDuration", () => {
  it("formats zero seconds", () => {
    expect(formatDuration(0)).toBe("00:00");
  });

  it("formats under a minute", () => {
    expect(formatDuration(59)).toBe("00:59");
  });

  it("rolls over into minutes at exactly 60s", () => {
    expect(formatDuration(60)).toBe("01:00");
  });

  it("formats a long duration correctly", () => {
    expect(formatDuration(3599)).toBe("59:59");
  });
});

describe("splitSlot", () => {
  it("splits a normal 'date time' string", () => {
    expect(splitSlot("Thursday, 25 September 2026, 11:00 AM")).toEqual({
      date: "Thursday, 25 September 2026",
      time: "11:00 AM",
    });
  });

  it("returns the whole string as the date when no time is present", () => {
    expect(splitSlot("Thursday, 25 September 2026")).toEqual({
      date: "Thursday, 25 September 2026",
      time: "—",
    });
  });

  it("returns placeholders for an empty/undefined slot", () => {
    expect(splitSlot("")).toEqual({ date: "—", time: "—" });
    expect(splitSlot(undefined)).toEqual({ date: "—", time: "—" });
  });
});

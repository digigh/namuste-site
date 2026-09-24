import { describe, expect, it } from "vitest";
import { formatDuration, languageName, parseAgentEvent, upsertLine, type TranscriptLine } from "@/lib/agentTranscript";

describe("transcript", () => {
  it("grows a streaming line in place and keeps order", () => {
    let lines: TranscriptLine[] = [];
    lines = upsertLine(lines, { id: "a", speaker: "ai", text: "Namaste", final: false, at: 1 });
    lines = upsertLine(lines, { id: "u", speaker: "user", text: "hi", final: true, at: 2 });
    lines = upsertLine(lines, { id: "a", speaker: "ai", text: "Namaste! Welcome", final: true, at: 3 });
    expect(lines.map((l) => [l.id, l.text, l.final, l.at])).toEqual([
      ["a", "Namaste! Welcome", true, 1],
      ["u", "hi", true, 2],
    ]);
  });

  it("ignores empty new lines and never blanks an existing one", () => {
    expect(upsertLine([], { id: "x", speaker: "user", text: "  ", final: false, at: 1 })).toEqual([]);
    const one = upsertLine([], { id: "x", speaker: "user", text: "hello", final: false, at: 1 });
    expect(upsertLine(one, { id: "x", speaker: "user", text: "", final: true, at: 2 })[0].text).toBe("hello");
  });
});

describe("agent events", () => {
  it("parses the three kinds and rejects junk", () => {
    expect(parseAgentEvent('{"type":"tool","name":"find_slots","label":"Checked doctor availability","ok":true}')).toEqual({
      type: "tool",
      name: "find_slots",
      label: "Checked doctor availability",
      ok: true,
    });
    const b = parseAgentEvent(
      '{"type":"booking","reference":"SUN-1","patient":"A","department":"Dental","doctor":"Dr X","date":"Friday 25 September 2026","time":"6:00 PM"}',
    );
    expect(b && b.type === "booking" && b.reference).toBe("SUN-1");
    expect(parseAgentEvent('{"type":"language","code":"hi-IN"}')).toEqual({ type: "language", code: "hi-IN" });
    for (const junk of ["", "nope", "[]", "null", '{"type":"tool"}', '{"type":"booking"}', '{"type":"other"}'])
      expect(parseAgentEvent(junk)).toBeNull();
  });

  it("formats helpers", () => {
    expect(languageName("od-IN")).toBe("Odia");
    expect(languageName("xx")).toBe("English");
    expect(formatDuration(75)).toBe("01:15");
  });
});

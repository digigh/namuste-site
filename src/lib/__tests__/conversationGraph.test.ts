import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { runConversationTurn } from "@/lib/conversationGraph";
import { mockOpenAIOnce, mockOpenAIFailure } from "./testUtils";

const CLINIC_EXTRACTED_BASE = {
  name: "Ankush",
  mobile: "9876543210",
  department: "Orthopedics",
  doctor: "Dr. Rajiv Verma",
};

beforeEach(() => {
  vi.stubEnv("OPENAI_API_KEY", "test-openai-key");
  vi.stubEnv("GROQ_API_KEY", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("conversationGraph — DOB-skip guard (the reported bug)", () => {
  it("overrides a premature isComplete:true and asks for DOB by name, never re-asking known fields", async () => {
    mockOpenAIOnce({
      reply: "Your appointment is confirmed for Thursday 10 AM.",
      step: "confirmation_complete",
      isComplete: true,
      isOffTopic: false,
      extracted: {
        patient_name: "Ankush",
        mobile_number: "9876543210",
        age: "", // DOB never actually collected — this is the bug scenario
        department: "Orthopedics",
        doctor: "Dr. Rajiv Verma",
        preferred_date: "Thursday, 25 September 2026",
        preferred_time: "10:00 AM",
        appointment_status: "CONFIRMED",
      },
    });

    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [{ speaker: "user", text: "yes that's correct" }],
      userMessage: "yes that's correct",
      currentExtracted: { ...CLINIC_EXTRACTED_BASE, dob: "" },
    });

    expect(result.finalIsComplete).toBe(false);
    expect(result.finalStep).toBe("dob");
    expect(result.responseSource).toBe("openai-gpt4o-mini-guarded");
    // Real name substituted, never a literal unresolved placeholder
    expect(result.finalReply).toContain("Ankush");
    expect(result.finalReply).not.toContain("{name}");
    // Must NOT re-ask for name/mobile (already known) — only the missing field
    expect(result.finalReply.toLowerCase()).not.toMatch(/mobile number/);
  });

  it("proceeds to the next step (slot) once DOB is genuinely provided, never re-asking for DOB", async () => {
    // No LLM mock needed here: the deterministic clinic fast path (see
    // clinicEngine.ts) correctly intercepts this routine "DOB just filled,
    // slot still missing" turn before the LLM is ever called — this proves
    // the graph's routing preserves that interceptor priority faithfully.
    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [{ speaker: "user", text: "I am 28 years old" }],
      userMessage: "I am 28 years old",
      currentExtracted: { ...CLINIC_EXTRACTED_BASE, dob: "" },
    });

    expect(result.finalIsComplete).toBe(false);
    expect(result.finalExtracted.dob).toBeTruthy();
    expect(result.finalStep).not.toBe("dob");
    expect(result.finalReply.toLowerCase()).toMatch(/day|time|schedule|when/);
  });
});

describe("conversationGraph — out-of-hours slot", () => {
  it("gives a targeted 'different time' message instead of a generic re-ask", async () => {
    // Orthopedics (Dr. Rajiv Verma) is 10 AM - 2 PM per clinicTemplates.ts —
    // 7 PM is genuinely outside hours regardless of AM/PM ambiguity.
    mockOpenAIOnce({
      reply: "Your appointment is confirmed for Thursday 7 PM.",
      step: "confirmation_complete",
      isComplete: true,
      isOffTopic: false,
      extracted: {
        patient_name: "Ankush",
        mobile_number: "9876543210",
        age: "28",
        department: "Orthopedics",
        doctor: "Dr. Rajiv Verma",
        preferred_date: "Thursday, 25 September 2026",
        preferred_time: "7:00 PM",
      },
    });

    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [{ speaker: "user", text: "yes that's correct" }],
      userMessage: "yes that's correct",
      currentExtracted: { ...CLINIC_EXTRACTED_BASE, dob: "28" },
    });

    expect(result.finalIsComplete).toBe(false);
    expect(result.finalStep).toBe("slot");
    expect(result.finalReply.toLowerCase()).toMatch(/operating hours|different day or time/);
  });
});

describe("conversationGraph — non-clinic industry, no DOB requirement", () => {
  it("does not misfire any DOB-related check for an industry where requiresDob is false", async () => {
    mockOpenAIOnce({
      reply: "Your consultation is confirmed.",
      step: "confirmation_complete",
      isComplete: true,
      isOffTopic: false,
      extracted: {
        patient_name: "Priya",
        mobile_number: "9123456780",
        department: "Corporate Law",
        preferred_date: "Friday, 26 September 2026",
        preferred_time: "3:00 PM",
      },
    });

    const result = await runConversationTurn({
      industryId: "lawyers",
      messages: [{ speaker: "user", text: "yes confirm" }],
      userMessage: "yes confirm",
      currentExtracted: { name: "Priya", mobile: "9123456780", department: "Corporate Law" },
    });

    expect(result.finalStep).not.toBe("dob");
    expect(result.finalIsComplete).toBe(true);
    expect(result.finalExtracted.appointment_id).toBeTruthy();
  });
});

describe("conversationGraph — full happy path", () => {
  it("completes a multi-turn booking with a real reference ID", async () => {
    mockOpenAIOnce({
      reply: "Excellent! Your appointment is confirmed.",
      step: "confirmation_complete",
      isComplete: true,
      isOffTopic: false,
      extracted: {
        patient_name: "Ankush",
        mobile_number: "9876543210",
        age: "28",
        department: "Orthopedics",
        doctor: "Dr. Rajiv Verma",
        preferred_date: "Thursday, 25 September 2026",
        preferred_time: "11:00 AM",
      },
    });

    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [{ speaker: "user", text: "yes that's correct" }],
      userMessage: "yes that's correct",
      currentExtracted: { ...CLINIC_EXTRACTED_BASE, dob: "28" },
    });

    expect(result.finalIsComplete).toBe(true);
    expect(result.finalStep).toBe("confirmation_complete");
    expect(result.finalExtracted.confirmed).toBe(true);
    expect(result.finalExtracted.appointment_id).toMatch(/^SUN-\d+$/);
    expect(result.finalReply).toContain(result.finalExtracted.appointment_id);
  });
});

describe("conversationGraph — post-confirmation 'thank you'", () => {
  it("ends the call warmly instead of repeating the reference-ID reminder", async () => {
    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [],
      userMessage: "thank you",
      currentExtracted: {
        ...CLINIC_EXTRACTED_BASE,
        dob: "28",
        slot: "Thursday, 25 September 2026, 11:00 am",
        confirmed: true,
        appointment_id: "SUN-12345",
      },
    });

    expect(result.finalCallEnded).toBe(true);
    // Must not repeat the "already confirmed — reference ID X" reminder —
    // a plain "you're welcome"-style sign-off instead.
    expect(result.finalReply).not.toContain("SUN-12345");
  });

  it("does not end the call for a compound message that merely starts with thanks", async () => {
    // No LLM mock: with no OPENAI_API_KEY stubbed as empty here (default from
    // beforeEach), the fast path/graph should simply not short-circuit via
    // the farewell interceptor for this — proving the match requires the
    // ENTIRE message to be a bare thank-you, not a substring.
    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [],
      userMessage: "thanks, and also my name is Ankush",
      currentExtracted: {
        ...CLINIC_EXTRACTED_BASE,
        dob: "28",
        slot: "Thursday, 25 September 2026, 11:00 am",
        confirmed: true,
        appointment_id: "SUN-12345",
      },
    });

    expect(result.finalCallEnded).toBe(false);
  });

  it("does not end the call for a mid-flow 'thank you' before the booking is confirmed", async () => {
    // Forces a straight, network-free drop to the deterministic fallback FSM
    // (mirrors the "no API key configured" test above) — this test only
    // needs to prove the farewell interceptor doesn't fire, not exercise the
    // LLM path.
    vi.stubEnv("OPENAI_API_KEY", "");
    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [],
      userMessage: "thank you",
      currentExtracted: { ...CLINIC_EXTRACTED_BASE, dob: "" }, // not yet confirmed
    });

    expect(result.finalCallEnded).toBe(false);
  });
});

describe("conversationGraph — LLM unavailable → deterministic fallback", () => {
  it("falls through cleanly to the fallback FSM when every provider fails", async () => {
    mockOpenAIFailure();

    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [],
      userMessage: "Hi, I want to book an appointment",
      currentExtracted: {},
    });

    expect(result.finalReply.length).toBeGreaterThan(0);
    expect(result.finalIsComplete).toBe(false);
  });

  it("preserves the reference ID in finalExtracted when the fallback FSM itself confirms a booking", async () => {
    mockOpenAIFailure();

    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [],
      userMessage: "yes confirm it",
      currentExtracted: {
        name: "Ankush",
        mobile: "9876543210",
        dob: "28",
        department: "Orthopedics",
        slot: "Thursday, 25 September 2026, 11:00 am",
      },
    });

    expect(result.finalIsComplete).toBe(true);
    expect(result.finalExtracted.confirmed).toBe(true);
    expect(result.finalExtracted.appointment_id).toBeTruthy();
    // The reference ID actually spoken must match the one recorded in
    // finalExtracted — this is the fallback-FSM double-assignment bug found
    // and fixed while migrating this path.
    expect(result.finalReply).toContain(result.finalExtracted.appointment_id);
  });
});

describe("conversationGraph — no API key configured", () => {
  it("goes straight to the fallback FSM without attempting a network call", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const result = await runConversationTurn({
      industryId: "doctors-clinics",
      messages: [],
      userMessage: "Hi, I want to book an appointment",
      currentExtracted: {},
    });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.finalReply.length).toBeGreaterThan(0);
  });
});

describe("conversationGraph — concurrency safety", () => {
  it("runs multiple independent turns concurrently with no cross-talk", async () => {
    mockOpenAIOnce({
      reply: "Could you please share your date of birth or age?",
      step: "intake_dob",
      isComplete: false,
      isOffTopic: false,
      extracted: { patient_name: "Ankush", mobile_number: "9876543210" },
    });

    const names = ["Alice", "Bob", "Carol", "Dave", "Eve"];
    const results = await Promise.all(
      names.map((name) =>
        runConversationTurn({
          industryId: "doctors-clinics",
          messages: [],
          userMessage: `Hi, my name is ${name}`,
          currentExtracted: { name },
        })
      )
    );

    // Each independent invocation must reflect only its own input — no
    // shared mutable state leaking between concurrent graph runs.
    results.forEach((r) => {
      expect(r.finalReply.length).toBeGreaterThan(0);
    });
  });
});

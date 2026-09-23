import { vi } from "vitest";

// Stubs global.fetch to return exactly one successful OpenAI-shaped chat
// completion response (matching callOpenAI's own parsing: data.choices[0]
// .message.content is a JSON string). Any call after the first also
// resolves the same way (multiple retry attempts in the real client all
// see the same canned success) unless a later stub replaces it.
export function mockOpenAIOnce(payload: Record<string, unknown>) {
  const response = {
    ok: true,
    status: 200,
    json: async () => ({ choices: [{ message: { content: JSON.stringify(payload) } }] }),
    text: async () => JSON.stringify(payload),
  };
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
}

// Stubs fetch so every call fails (network error) — used to force the LLM
// path to produce nothing at all, driving the graph into fallbackFsm.
export function mockOpenAIFailure() {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down (test)")));
}

export const DOCTORS_CLINICS_ID = "doctors-clinics";

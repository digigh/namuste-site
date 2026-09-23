// A weaker model like gpt-4o-mini doesn't always distinguish "context I was
// given" from "values I should write" — it can echo the prompt's own status
// vocabulary ("PENDING_INTAKE") or its own JSON-schema example text
// ("Specialty Department", "Doctor Name") back as if those were real
// extracted values, instead of leaving a field blank when it doesn't
// actually know it yet. Filters those out at the one place all of GPT's
// structured output passes through, so no caller has to remember to.
const PLACEHOLDER_FIELD_VALUES = new Set([
  "pending", "n/a", "na", "none", "tbd", "unknown", "null", "undefined", "-", "—",
  "specialty department", "doctor name", "preferred date", "preferred time",
  "full name", "10-digit mobile number", "age or doctor", "age or dob", "intent summary",
]);

// Returns the value unchanged if it looks like real data, or "" if it's one
// of GPT's own placeholder/schema-echo strings — callers can then fall back
// to whatever they already had, exactly as if GPT had returned "" itself.
export function sanitizeLlmField(raw: unknown): string {
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value) return "";
  if (PLACEHOLDER_FIELD_VALUES.has(value.toLowerCase())) return "";
  return value;
}

// ─── OpenAI Chat Handler ──────────────────────────────────────────────────────
// Industry-agnostic — takes a fully-built system prompt and message history,
// returns parsed JSON. No clinic-specific knowledge here.
export async function callOpenAI(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  apiKey: string
) {
  const attempt = async (timeoutMs: number): Promise<Response> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch("https://api.openai.com/v1/chat/completions", {
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
  };

  // One short retry on a plausibly-transient failure (network error, timeout,
  // 5xx, or rate limit) — previously any single hiccup dropped straight to
  // the much weaker generic fallback (loses language, loses structured
  // extraction). A 4xx (bad request/auth) is never retried since it will
  // just fail identically again. Total worst case ~9s, still bounded for a
  // live voice call, and this fallback already has its own fallback behind it.
  let res: Response | null = null;
  try {
    res = await attempt(5000);
    if (!res.ok && (res.status >= 500 || res.status === 429)) {
      res = await attempt(3000);
    }
  } catch {
    res = await attempt(3000).catch(() => null);
  }

  const groqKey = process.env.GROQ_API_KEY?.trim() || "";

  if (!res || !res.ok) {
    // If OpenAI fails (e.g. 401 auth, rate limit, quota, network) and a Groq
    // API key is available, seamlessly fall back to Groq's Llama 3.3 70B
    // with zero downtime — Groq over Gemini specifically for its far higher
    // free-tier rate limits, which matter for a live demo taking back-to-back
    // turns from multiple concurrent conversations.
    if (groqKey) {
      try {
        return await callGroq(systemPrompt, messages, groqKey);
      } catch (groqErr: any) {
        console.warn("[Groq fallback warn]:", groqErr?.message || groqErr);
      }
    }
    const errText = res ? await res.text().catch(() => "") : "network error";
    throw new Error(`OpenAI ${res ? res.status : "failed"}: ${errText}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) {
    if (groqKey) {
      return await callGroq(systemPrompt, messages, groqKey);
    }
    throw new Error("Empty OpenAI response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    if (groqKey) {
      return await callGroq(systemPrompt, messages, groqKey);
    }
    throw new Error("OpenAI returned malformed JSON");
  }

  if (typeof parsed !== "object" || parsed === null || typeof (parsed as { reply?: unknown }).reply !== "string") {
    if (groqKey) {
      return await callGroq(systemPrompt, messages, groqKey);
    }
    throw new Error("OpenAI response missing required 'reply' field");
  }

  return parsed as Record<string, any>;
}

// Scans a growing buffer of raw (possibly-incomplete) JSON text for a given
// top-level string field and returns its decoded value the INSTANT it's
// syntactically complete (an unescaped closing quote found) — before the
// rest of the JSON object has necessarily finished. Returns null if the
// field hasn't appeared yet, isn't a string, or hasn't closed yet; callers
// should keep calling this as more of the stream arrives. Not a general JSON
// parser — deliberately narrow, since the exact schema (reply is always the
// first field) is known ahead of time.
function extractCompletedJsonStringField(buffer: string, fieldName: string): string | null {
  const keyPattern = `"${fieldName}"`;
  const keyIdx = buffer.indexOf(keyPattern);
  if (keyIdx === -1) return null;

  let i = keyIdx + keyPattern.length;
  while (i < buffer.length && /\s/.test(buffer[i])) i++;
  if (buffer[i] !== ":") return null;
  i++;
  while (i < buffer.length && /\s/.test(buffer[i])) i++;
  if (buffer[i] !== '"') return null;

  const valueStart = i;
  let j = valueStart + 1;
  while (j < buffer.length) {
    if (buffer[j] === "\\") { j += 2; continue; }
    if (buffer[j] === '"') {
      const literal = buffer.slice(valueStart, j + 1);
      try {
        return JSON.parse(literal);
      } catch {
        return null;
      }
    }
    j++;
  }
  return null; // not closed yet — more of the stream still to arrive
}

// ─── OpenAI Chat Handler — streaming variant ─────────────────────────────────
// Same request/response contract as callOpenAI() — extracted/isComplete etc.
// go through the exact same complete, fully-parsed JSON at the end, so
// nothing about validation changes. The only difference: since the schema
// always writes "reply" first, onReplyReady fires with the caller's spoken
// reply text (and the language it was generated for) the moment that one
// field closes — typically well before the rest of the JSON (extracted,
// isComplete, etc.) finishes streaming — so a caller can start synthesizing
// speech for it immediately instead of waiting for the whole turn to
// resolve. On any failure (network, non-OK, malformed JSON), this throws;
// callers are expected to fall back to the non-streaming callOpenAI(), which
// keeps its own retry + Groq fallback chain unchanged as the safety net.
export async function callOpenAIStreaming(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  apiKey: string,
  onReplyReady?: (replyText: string) => void
): Promise<Record<string, any>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
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
        stream: true,
      }),
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OpenAI streaming ${res.status}: ${errText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let sseBuffer = "";
  let contentBuffer = "";
  let replyFired = false;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    sseBuffer += decoder.decode(value, { stream: true });

    let newlineIdx;
    while ((newlineIdx = sseBuffer.indexOf("\n")) >= 0) {
      const line = sseBuffer.slice(0, newlineIdx).trim();
      sseBuffer = sseBuffer.slice(newlineIdx + 1);
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const evt = JSON.parse(payload);
        const delta = evt.choices?.[0]?.delta?.content;
        if (typeof delta === "string") {
          contentBuffer += delta;
          if (!replyFired && onReplyReady) {
            const reply = extractCompletedJsonStringField(contentBuffer, "reply");
            if (reply !== null) {
              replyFired = true;
              onReplyReady(reply);
            }
          }
        }
      } catch {
        // Partial/malformed SSE chunk boundary — the next chunk completes it.
      }
    }
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(contentBuffer);
  } catch {
    throw new Error("OpenAI streaming returned malformed JSON");
  }
  if (typeof parsed !== "object" || parsed === null || typeof (parsed as { reply?: unknown }).reply !== "string") {
    throw new Error("OpenAI streaming response missing required 'reply' field");
  }
  return parsed as Record<string, any>;
}

// Groq's API is OpenAI-compatible (same chat-completions request/response
// shape), so this mirrors callOpenAI's single-attempt request almost
// exactly — just a different endpoint/model/key. Chosen over Gemini
// specifically for Groq's much higher free-tier rate limits, which matter
// here since every fallback turn across every concurrent live demo hits
// this same key. NOTE: unlike OpenAI, this model's `response_format:
// json_object` mode on Groq rejects perfectly valid completions outright
// (verified directly against the API) — omitted here, relying instead on
// the prompt's own "respond with ONLY this JSON" instruction, which the
// model follows reliably in practice.
export async function callGroq(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  apiKey: string
): Promise<Record<string, any>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.2,
        // gpt-oss is a reasoning model — it spends completion tokens on a
        // hidden "reasoning" pass before ever writing the visible JSON
        // reply, and against this app's real (long) system prompt that pass
        // can consume the entire token budget by itself, leaving the actual
        // reply empty (verified directly: ~276 reasoning tokens on a typical
        // turn at default effort, entirely crowding out a 450-token budget).
        // "low" cuts that to ~25 tokens with no observed quality loss on
        // this task, and the larger budget below is headroom in case a more
        // complex turn still needs more.
        reasoning_effort: "low",
        max_tokens: 700,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Groq ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content;
    if (!rawContent) throw new Error("Empty Groq response");

    // No enforced JSON mode (see note above) — the model occasionally wraps
    // its otherwise-correct JSON in a markdown code fence despite being told
    // not to; strip one if present before parsing.
    const raw = rawContent.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || typeof (parsed as { reply?: unknown }).reply !== "string") {
      throw new Error("Groq response missing required 'reply' field");
    }
    return parsed;
  } finally {
    clearTimeout(timeout);
  }
}

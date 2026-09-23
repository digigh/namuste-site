// Structured event logging across the 5 layers a real-time voice agent is
// built from (audio capture, transcription, reasoning, synthesis, playback)
// — the exact diagnostic model production voice-agent guides recommend for
// narrowing down "it didn't work" reports to a specific layer instead of
// guessing. Every call logs a single line to the console with a consistent,
// greppable prefix and a timestamp relative to when the call started, and
// also appends to an in-memory ring buffer exposed on
// window.__voiceTrace so a user hitting a real bug can copy the whole
// trace (via the browser console) without needing to screenshot scrollback.
//
// This is intentionally just console logging + a buffer — no network calls,
// no new dependencies, safe to leave in permanently.

export type VoiceLayer = "capture" | "transcription" | "reasoning" | "synthesis" | "playback";

interface VoiceTraceEntry {
  t: number; // ms since trace start
  layer: VoiceLayer;
  event: string;
  detail?: Record<string, unknown>;
}

let traceStart = 0;
const MAX_TRACE_ENTRIES = 300;

function getBuffer(): VoiceTraceEntry[] {
  if (typeof window === "undefined") return [];
  const w = window as unknown as { __voiceTrace?: VoiceTraceEntry[] };
  if (!w.__voiceTrace) w.__voiceTrace = [];
  return w.__voiceTrace;
}

// Call once when a call starts (or a chat session begins) so subsequent
// timestamps read as "ms since call start" instead of ms-since-page-load,
// which is what actually matters when diagnosing "it took too long."
export function resetVoiceTrace() {
  traceStart = Date.now();
  if (typeof window !== "undefined") {
    (window as unknown as { __voiceTrace?: VoiceTraceEntry[] }).__voiceTrace = [];
  }
}

export function logVoiceEvent(layer: VoiceLayer, event: string, detail?: Record<string, unknown>) {
  if (!traceStart) traceStart = Date.now();
  const t = Date.now() - traceStart;
  const entry: VoiceTraceEntry = { t, layer, event, detail };

  const buffer = getBuffer();
  buffer.push(entry);
  if (buffer.length > MAX_TRACE_ENTRIES) buffer.shift();

  console.log(
    `%c[voice:${layer}] +${t}ms ${event}`,
    "color:#2F6E1A;font-weight:bold",
    detail || ""
  );
}

// Prints the full trace as a readable table — call
// window.dumpVoiceTrace() from the browser console after a bad turn to get
// a copy-pasteable summary of exactly what happened and when.
if (typeof window !== "undefined") {
  (window as unknown as { dumpVoiceTrace?: () => void }).dumpVoiceTrace = () => {
    const buffer = getBuffer();
    console.table(
      buffer.map((e) => ({
        "+ms": e.t,
        layer: e.layer,
        event: e.event,
        detail: e.detail ? JSON.stringify(e.detail) : "",
      }))
    );
  };
}

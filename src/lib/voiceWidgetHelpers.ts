import { IndustryFlow } from "@/data/industryFlows";

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = (reader.result as string) || "";
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Reads a newline-delimited JSON response body (used by the streaming chat
// reply path — /api/ai-demo/chat responds this way only for doctors-clinics
// voice/audio turns) and invokes onLine for each parsed object, in arrival
// order. A malformed line is skipped rather than aborting the whole stream,
// but an error thrown by onLine itself is NOT swallowed here — it propagates
// to the caller so a bug in turn handling surfaces as a visible failure
// instead of silent dead air (the caller already has real recovery logic
// for that: see the outer try/catch in processConversationTurn).
export async function readNdjsonLines(res: Response, onLine: (obj: any) => void): Promise<void> {
  const reader = res.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let buffer = "";

  const parseLine = (raw: string): unknown | undefined => {
    try {
      return JSON.parse(raw);
    } catch {
      return undefined; // malformed line: skip
    }
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let newlineIndex;
    while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      if (!line) continue;
      const parsed = parseLine(line);
      if (parsed !== undefined) onLine(parsed);
    }
  }
  const rest = buffer.trim();
  if (rest) {
    const parsed = parseLine(rest);
    if (parsed !== undefined) onLine(parsed);
  }
}

export function stampTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Short, natural trigger phrases for the "Need to try something?" panel —
// these read the way a real caller would actually ask, and feed the exact
// same processConversationTurn pipeline on click.
export function getQuickPrompts(ind: IndustryFlow): string[] {
  switch (ind.id) {
    case "doctors-clinics":
      return [
        "Book an appointment",
        "Check doctor availability",
        "Tell me about your services",
        "What are your timings?",
        "Share clinic location",
      ];
    default:
      return [
        "Book an appointment",
        "Tell me about your services",
        "What are your timings?",
      ];
  }
}

// The backend only ever hands the frontend one combined `slot` string
// (e.g. "Tomorrow 10:30 AM") — never separate date/time fields — so the
// dashboard's Date/Time rows split it presentationally instead of the
// component inventing data the backend doesn't track.
export function splitSlot(slot?: string): { date: string; time: string } {
  if (!slot) return { date: "—", time: "—" };
  const timeMatch = slot.match(/\d{1,2}(:\d{2})?\s*(AM|PM|am|pm)/);
  if (!timeMatch) return { date: slot, time: "—" };
  const time = timeMatch[0];
  const date = slot.replace(time, "").trim().replace(/,$/, "") || "Today";
  return { date, time };
}

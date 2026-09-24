// Pure helpers for the live assistant widget: building the transcript from
// LiveKit transcription streams, and reading the agent's activity events.

export type Speaker = "user" | "ai";

export interface TranscriptLine {
  id: string;
  speaker: Speaker;
  text: string;
  final: boolean;
  at: number; // ms timestamp of when the line first appeared
}

/** Insert a new line, or update the text of an existing one (same id) in place. */
export function upsertLine(
  lines: TranscriptLine[],
  next: { id: string; speaker: Speaker; text: string; final: boolean; at: number },
): TranscriptLine[] {
  const text = next.text.trim();
  const index = lines.findIndex((l) => l.id === next.id);
  if (index === -1) {
    if (!text) return lines;
    return [...lines, { ...next, text }];
  }
  const current = lines[index];
  if (current.text === text && current.final === next.final) return lines;
  const copy = lines.slice();
  copy[index] = { ...current, text: text || current.text, final: next.final || current.final };
  return copy;
}

export interface ToolEvent {
  type: "tool";
  name: string;
  label: string;
  ok: boolean;
}

export interface BookingEvent {
  type: "booking";
  reference: string;
  patient: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
}

export interface LanguageEvent {
  type: "language";
  code: string;
}

export type AgentEvent = ToolEvent | BookingEvent | LanguageEvent;

const str = (v: unknown): v is string => typeof v === "string" && v.length > 0;

/** Parse one message from the agent's `clinic.events` topic; anything unexpected is ignored. */
export function parseAgentEvent(raw: string): AgentEvent | null {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if (d.type === "tool" && str(d.name)) {
    return { type: "tool", name: d.name, label: str(d.label) ? d.label : d.name, ok: d.ok === true };
  }
  if (d.type === "booking" && str(d.reference)) {
    return {
      type: "booking",
      reference: d.reference,
      patient: str(d.patient) ? d.patient : "",
      department: str(d.department) ? d.department : "",
      doctor: str(d.doctor) ? d.doctor : "",
      date: str(d.date) ? d.date : "",
      time: str(d.time) ? d.time : "",
    };
  }
  if (d.type === "language" && str(d.code)) return { type: "language", code: d.code };
  return null;
}

export const LANGUAGE_NAMES: Record<string, string> = {
  "en-IN": "English",
  "hi-IN": "Hindi",
  "ta-IN": "Tamil",
  "te-IN": "Telugu",
  "bn-IN": "Bengali",
  "ml-IN": "Malayalam",
  "kn-IN": "Kannada",
  "pa-IN": "Punjabi",
  "gu-IN": "Gujarati",
  "od-IN": "Odia",
};

export function languageName(code: string): string {
  return LANGUAGE_NAMES[code] || "English";
}

export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

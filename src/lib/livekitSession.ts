// Server-only: creates the short-lived pass a visitor's browser uses to join a
// LiveKit room with the clinic receptionist agent. The LiveKit API secret never
// leaves the server.
import { AccessToken, RoomAgentDispatch, RoomConfiguration, TrackSource } from "livekit-server-sdk";

export type SessionMode = "voice" | "chat";

export interface LiveKitEnv {
  url: string;
  apiKey: string;
  apiSecret: string;
  agentName: string;
}

export interface SessionPass {
  serverUrl: string;
  token: string;
  roomName: string;
  identity: string;
  mode: SessionMode;
}

export function readLiveKitEnv(env: Record<string, string | undefined> = process.env): LiveKitEnv | null {
  const url = env.LIVEKIT_URL?.trim();
  const apiKey = env.LIVEKIT_API_KEY?.trim();
  const apiSecret = env.LIVEKIT_API_SECRET?.trim();
  if (!url || !apiKey || !apiSecret) return null;
  return { url, apiKey, apiSecret, agentName: env.LIVEKIT_AGENT_NAME?.trim() || "clinic-agent" };
}

export function parseMode(body: unknown): SessionMode | null {
  if (!body || typeof body !== "object") return null;
  const mode = (body as { mode?: unknown }).mode;
  return mode === "voice" || mode === "chat" ? mode : null;
}

function randomId(length: number): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, length);
}

export async function createSessionPass(env: LiveKitEnv, mode: SessionMode): Promise<SessionPass> {
  const roomName = `web-${mode}-${randomId(12)}`;
  const identity = `visitor-${randomId(10)}`;

  const at = new AccessToken(env.apiKey, env.apiSecret, {
    identity,
    name: "Website visitor",
    ttl: "10m", // only needs to be valid long enough to join
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canSubscribe: true,
    canPublishData: true, // typed chat messages
    // Voice: microphone only (no camera or screen share). Chat: no media at all.
    canPublish: mode === "voice",
    canPublishSources: mode === "voice" ? [TrackSource.MICROPHONE] : [],
  });
  // Joining this brand-new room automatically sends in the receptionist agent.
  at.roomConfig = new RoomConfiguration({
    agents: [new RoomAgentDispatch({ agentName: env.agentName, metadata: JSON.stringify({ mode }) })],
    maxParticipants: 3,
    emptyTimeout: 60,
    departureTimeout: 10,
  });

  return { serverUrl: env.url, token: await at.toJwt(), roomName, identity, mode };
}

// Only this site may ask for a pass: the browser's Origin must match the host it
// is talking to (or be listed in ALLOWED_ORIGINS, comma-separated).
export function isAllowedOrigin(
  origin: string | null,
  host: string | null,
  extraAllowed: string | undefined = process.env.ALLOWED_ORIGINS,
): boolean {
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  if (host && originHost === host) return true;
  const allowed = (extraAllowed || "")
    .split(",")
    .map((s) => s.trim().replace(/\/$/, ""))
    .filter(Boolean);
  return allowed.includes(origin.replace(/\/$/, ""));
}

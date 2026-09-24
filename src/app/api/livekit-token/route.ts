import { NextResponse } from "next/server";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { createSessionPass, isAllowedOrigin, parseMode, readLiveKitEnv } from "@/lib/livekitSession";

// Hands a website visitor a short-lived pass to talk to the clinic receptionist
// (voice call or text chat). The agent itself runs on LiveKit Cloud, not here.
export async function POST(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!isAllowedOrigin(req.headers.get("origin"), host)) {
    return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  }

  const client = getClientKey(req);
  // Each call costs money: at most 5 new sessions per visitor per 10 minutes,
  // and a per-server-instance ceiling as a backstop.
  if (
    !checkRateLimit(`lk:${client}`, 5, 10 * 60_000).allowed ||
    !checkRateLimit("lk:all", 120, 10 * 60_000).allowed
  ) {
    return NextResponse.json(
      { error: "Too many sessions started. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const env = readLiveKitEnv();
  if (!env) {
    return NextResponse.json(
      { error: "The live assistant isn't configured on this site yet." },
      { status: 503 },
    );
  }

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    // fall through to validation
  }
  const mode = parseMode(body);
  if (!mode) {
    return NextResponse.json({ error: "Choose voice or chat." }, { status: 400 });
  }

  try {
    const pass = await createSessionPass(env, mode);
    return NextResponse.json(pass, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[livekit-token] could not create session", err);
    return NextResponse.json({ error: "Could not start the session. Please try again." }, { status: 500 });
  }
}

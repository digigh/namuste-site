import { NextResponse } from "next/server";
import { createSessionPass, isAllowedOrigin, parseMode, readLiveKitEnv } from "@/lib/livekitSession";

// Hands a website visitor a short-lived pass to talk to the receptionist
// across Clinic, Salon, or Agri assistants (voice call or text chat).
export async function POST(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!isAllowedOrigin(req.headers.get("origin"), host)) {
    return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  }

  let body: { mode?: unknown; industry?: unknown } = {};
  try {
    body = (await req.json()) || {};
  } catch {
    // fall through to validation
  }

  const mode = parseMode(body);
  if (!mode) {
    return NextResponse.json({ error: "Choose voice or chat." }, { status: 400 });
  }

  const industry = typeof body.industry === "string" ? body.industry.toLowerCase() : "clinic";

  // 1. Salon Assistant (Headlocks Luxury Salon - Riya)
  if (industry === "salon") {
    try {
      const salonRes = await fetch("https://headlock-salon-delta.vercel.app/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, roomName: `salon-${Date.now()}` }),
      });
      const data = await salonRes.json();
      const token = data.token || data.participantToken;
      if (!salonRes.ok || !token || !data.serverUrl) {
        throw new Error(data.error || "Salon service did not return a valid session token");
      }
      return NextResponse.json(
        { serverUrl: data.serverUrl, token, mode, roomName: data.roomName },
        { headers: { "Cache-Control": "no-store" } },
      );
    } catch (err) {
      console.error("[session-token] salon connection error", err);
      return NextResponse.json(
        { error: "Could not connect to Headlocks Salon assistant. Please try again shortly." },
        { status: 502 },
      );
    }
  }

  // 2. Agri Assistant (Kisan Sathi Agri Inputs - Priya)
  if (industry === "agri") {
    try {
      const agriRes = await fetch("https://namuste-agri-glide.vercel.app/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, roomName: `agri-${Date.now()}` }),
      });
      const data = await agriRes.json();
      const token = data.token || data.participantToken;
      if (!agriRes.ok || !token || !data.serverUrl) {
        throw new Error(data.error || "Agri service did not return a valid session token");
      }
      return NextResponse.json(
        { serverUrl: data.serverUrl, token, mode, roomName: data.roomName },
        { headers: { "Cache-Control": "no-store" } },
      );
    } catch (err) {
      console.error("[session-token] agri connection error", err);
      return NextResponse.json(
        { error: "Could not connect to Kisan Sathi Agri assistant. Please try again shortly." },
        { status: 502 },
      );
    }
  }

  // 3. Clinic Assistant (Sunrise Multi-Specialty Clinic - Ritu)
  const env = readLiveKitEnv();
  if (!env) {
    return NextResponse.json(
      { error: "The live assistant isn't configured on this site yet." },
      { status: 503 },
    );
  }

  try {
    const pass = await createSessionPass(env, mode);
    return NextResponse.json(pass, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[session-token] could not create session", err);
    return NextResponse.json({ error: "Could not start the session. Please try again." }, { status: 500 });
  }
}

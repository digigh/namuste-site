import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { composeSalonEvent, toWhatsAppNumber } from "@/lib/whatsapp";

// Receives salon's own webhook (Admin -> Webhook & WhatsApp), verifies the
// HMAC signature exactly as salon's own docs describe, composes the
// message, and relays it to an n8n webhook instead of calling Meta's
// Cloud API directly — the n8n flow owns the actual send (and whichever
// WhatsApp node/credentials it's configured with) from a clean, already-
// composed {to, template, name, headline, details} payload, so it never
// needs to parse salon's native webhook shape or pick content per event.
// Salon needs zero code changes for this — just point its webhook URL
// here and turn on the events.
export async function POST(req: Request) {
  const secret = process.env.SALON_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SALON_WEBHOOK_SECRET not configured" }, { status: 503 });
  }

  const raw = await req.text();
  const expected = "sha256=" + createHmac("sha256", secret).update(raw).digest("hex");
  const got = req.headers.get("x-headlocks-signature") || "";
  const a = Buffer.from(expected);
  const b = Buffer.from(got);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: { event?: unknown; data?: unknown };
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = typeof payload.event === "string" ? payload.event : "";
  const data = (payload.data && typeof payload.data === "object" ? payload.data : {}) as {
    customer?: { name?: string; whatsapp_number?: string; phone?: string };
    [key: string]: unknown;
  };

  const to = data.customer?.whatsapp_number || data.customer?.phone;
  const msg = composeSalonEvent(event, data);

  if (!msg || !to) {
    // Always 200 — salon's webhook log treats non-2xx as a delivery
    // failure and will retry; an unmapped event or missing number isn't
    // an error on their end.
    return NextResponse.json({ sent: false, reason: !msg ? "unmapped event" : "no recipient number" });
  }

  const n8nUrl = process.env.N8N_SALON_WEBHOOK_URL;
  if (!n8nUrl) {
    return NextResponse.json({ error: "N8N_SALON_WEBHOOK_URL not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: toWhatsAppNumber(to),
        template: msg.template,
        name: msg.name,
        headline: msg.headline,
        details: msg.details,
        event,
      }),
    });
    if (!res.ok) {
      throw new Error(`n8n webhook responded ${res.status}`);
    }
    return NextResponse.json({ relayed: true });
  } catch (err) {
    console.error("[salon-webhook] relay to n8n failed", err);
    return NextResponse.json({ error: "relay failed" }, { status: 502 });
  }
}

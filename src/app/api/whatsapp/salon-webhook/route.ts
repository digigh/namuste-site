import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { composeSalonEvent, sendWhatsAppTemplate, toWhatsAppNumber } from "@/lib/whatsapp";

// Receives salon's own webhook (Admin -> Webhook & WhatsApp), verifies the
// HMAC signature exactly as salon's own docs describe, and sends the
// matching WhatsApp template. Salon needs zero code changes for this —
// just point its webhook URL here and turn on the events.
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

  try {
    await sendWhatsAppTemplate(toWhatsAppNumber(to), msg);
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("[salon-webhook] whatsapp send failed", err);
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }
}

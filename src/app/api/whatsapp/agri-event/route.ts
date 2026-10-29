import { NextResponse } from "next/server";
import { composeAgriEvent, sendWhatsAppTemplate } from "@/lib/whatsapp";

// Receives "immediate" events directly from the agri agent (agent.py) the
// instant something happens in a live call — order placed, order
// cancelled, a crop advisory given, or an escalation. Scheduled events
// (restock, payment-due, advisory follow-up) come from the cron route
// instead, since nothing in a conversation triggers those.
export async function POST(req: Request) {
  const secret = process.env.AGRI_NOTIFY_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "AGRI_NOTIFY_SECRET not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization") || "";
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { event?: unknown; role?: unknown; to?: unknown; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = typeof body.event === "string" ? body.event : "";
  const role = typeof body.role === "string" ? body.role : undefined;
  const to = typeof body.to === "string" ? body.to : "";
  const data = (body.data && typeof body.data === "object" ? body.data : {}) as Record<string, unknown>;

  if (!event || !to) {
    return NextResponse.json({ error: "event and to are required" }, { status: 400 });
  }

  const msg = composeAgriEvent(event, role as "farmer" | "retailer" | "distributor" | undefined, data);
  if (!msg) {
    // Not an event we WhatsApp for — not an error, just a no-op.
    return NextResponse.json({ sent: false, reason: "unmapped event" });
  }

  try {
    await sendWhatsAppTemplate(to, msg);
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("[agri-event] whatsapp send failed", err);
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }
}

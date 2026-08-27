import { NextResponse } from "next/server";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

// Fixed destinations for confirmed clinic bookings — real, external automation
// endpoints, not the generic (currently unconfigured) AI_DEMO_WEBHOOK_URL used
// for the rest of the demo. Deliberately hardcoded here rather than accepted
// from the request body, same reasoning as the generic webhook below: never
// let a caller choose where PII gets sent. Every confirmed booking is sent to
// BOTH — the live production endpoint and the n8n test endpoint — so nothing
// depends on picking the "right" one; whichever one it needs to reach, it does.
const CLINIC_BOOKING_WEBHOOK_URLS = [
  "https://aiautomation.digicides.com/webhook/clinic_booking",
  "https://aiautomation.digicides.com/webhook-test/clinic_booking",
];

// Default recipient for the automation's own internal notification — separate
// from the caller's own mobile number, which is what the WhatsApp message goes to.
const CLINIC_NOTIFICATION_EMAIL = "dean@digicides.com";

// "9876543210" / "+91 98765 43210" / "91-9876543210" → "919876543210"
function normalizePhoneForWebhook(raw: string): string {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  return digits;
}

// "Thursday, 27 August 2026 10:30 AM" → "27 August 2026, 10:30 AM"
// Strips a leading weekday (the model includes one; the target format
// doesn't want it) and inserts the comma the target format expects between
// the date and the time, without assuming an exact upstream date format.
function normalizeDateTimeForWebhook(raw: string): string {
  if (!raw) return raw;
  let s = raw.trim();
  s = s.replace(/^[A-Za-z]+day,\s*/, "");
  s = s.replace(/(\d{4})\s+(?=\d{1,2}:\d{2}\s*[AaPp][Mm])/, "$1, ");
  return s;
}

// Splits a combined slot string into its date and time parts separately.
// Handles both an absolute resolved date ("27 August 2026, 10:30 AM") and
// the clinic fast path's raw relative phrasing ("tomorrow 11am") — the time
// token (am/pm/baje) is always last, so whatever precedes it is the date.
function splitDateTimeForWebhook(raw: string): { date: string; time: string } {
  const s = normalizeDateTimeForWebhook(raw || "");
  const timeMatch = s.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm|baje))\s*$/);
  if (timeMatch && typeof timeMatch.index === "number") {
    const time = timeMatch[1].trim();
    const date = s.slice(0, timeMatch.index).replace(/,\s*$/, "").trim();
    return { date, time };
  }
  return { date: s, time: "" };
}

// "Cardiology" + name → "Cardiology appointment booking" — a short, fixed-shape
// summary for the automation/notification side, never longer than ~5 words.
function buildBookingSummary(department: string): string {
  const dept = (department || "General Consultation").trim();
  return `${dept} appointment booking`;
}

// "R. K. Sharma" → "Dr. R. K. Sharma"; "Dr Sharma" → "Dr. Sharma" (normalizes
// the period, doesn't duplicate the title if it's already there).
function normalizeDoctorNameForWebhook(raw: string): string {
  const name = (raw || "").trim();
  if (!name) return name;
  const withoutTitle = name.replace(/^Dr\.?\s*/i, "").trim();
  return `Dr. ${withoutTitle}`;
}

export async function POST(req: Request) {
  try {
    const clientKey = getClientKey(req);
    const { allowed } = checkRateLimit(`webhook:${clientKey}`, 20, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: "Rate limit exceeded. Please slow down." }, { status: 429 });
    }

    const body = await req.json();
    // NOTE: the destination URL is intentionally NEVER taken from the request
    // body — accepting a client-supplied webhook URL would let any caller
    // direct this server to POST lead data (including PII) to an arbitrary
    // (including internal) URL. It is server-config-only, by design.
    const webhookUrl = process.env.AI_DEMO_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;

    const payload = {
      event: "ai_demo_intake_completed",
      source: "Namuste Multi-Industry Interactive AI Demo",
      industryId: body.industryId,
      industryName: body.industryName,
      channel: body.channel || "web_voice_call",
      lead: {
        name: body.lead?.name || "Anonymous Visitor",
        mobile: body.lead?.mobile || "Not provided",
        dob: body.lead?.dob || null,
        ...body.lead?.customFields,
      },
      intent: body.intent || "General Business Inquiry",
      summary: body.summary || "Intake successfully completed",
      systemAction: body.systemAction || {},
      transcript: body.transcript || [],
      timestamp: new Date().toISOString(),
    };

    console.log("[Namuste AI Demo Webhook Intake Payload]:", JSON.stringify(payload, null, 2));

    // ── Clinic booking → fixed external automation webhook ──────────────────
    // The client's payload nests the industry id under `industry.id`, not
    // `industryId` — matching what's actually sent (see triggerWebhookDispatch
    // in AIVoiceChatbotEngine.tsx) rather than the top-level field the generic
    // payload above reads (which is always undefined for that reason).
    const industryId = body.industry?.id || body.industryId;
    let clinicWebhookDelivered: boolean | null = null;
    let clinicWebhookResults: { url: string; delivered: boolean }[] = [];
    if (industryId === "doctors-clinics") {
      const { date, time } = splitDateTimeForWebhook(body.lead?.confirmedSlot || "");
      const clinicPayload = {
        name: body.lead?.name || "",
        phone_number: normalizePhoneForWebhook(body.lead?.mobile || ""),
        date_time: normalizeDateTimeForWebhook(body.lead?.confirmedSlot || ""),
        date,
        time,
        doctor_name: normalizeDoctorNameForWebhook(body.lead?.assignedDoctorOrLead || ""),
        dob: body.lead?.dob || "",
        reference_id: body.lead?.referenceId || "",
        email: CLINIC_NOTIFICATION_EMAIL,
        booking_summary: buildBookingSummary(body.lead?.department || ""),
      };

      // Fire to every configured clinic endpoint in parallel — one being down
      // or slow never blocks or skips the other.
      const dispatches = await Promise.allSettled(
        CLINIC_BOOKING_WEBHOOK_URLS.map((url) =>
          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clinicPayload),
          })
        )
      );

      clinicWebhookResults = dispatches.map((result, i) => {
        const url = CLINIC_BOOKING_WEBHOOK_URLS[i];
        if (result.status === "fulfilled") {
          console.log("[Clinic Booking Webhook]:", url, result.value.status, JSON.stringify(clinicPayload));
          return { url, delivered: result.value.ok };
        }
        console.warn("[Clinic Booking Webhook Error]:", url, result.reason);
        return { url, delivered: false };
      });
      clinicWebhookDelivered = clinicWebhookResults.every((r) => r.delivered);
    }

    if (webhookUrl && webhookUrl.trim() !== "" && webhookUrl.startsWith("http")) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Namuste-AI-Demo-Engine/1.0",
          },
          body: JSON.stringify(payload),
        });

        return NextResponse.json({
          success: true,
          delivered: response.ok,
          status: response.status,
          webhookUrlConfigured: true,
          clinicWebhookDelivered,
          clinicWebhookResults,
          payload,
        });
      } catch (postError) {
        console.error("Webhook Dispatch Network Error:", postError);
        return NextResponse.json({
          success: true,
          delivered: false,
          error: "Failed to reach remote webhook destination",
          clinicWebhookDelivered,
          clinicWebhookResults,
          payload,
        });
      }
    }

    return NextResponse.json({
      success: true,
      delivered: false,
      webhookUrlConfigured: false,
      clinicWebhookDelivered,
      clinicWebhookResults,
      message: "Payload recorded locally. Webhook URL will receive data once configured.",
      payload,
    });
  } catch (error) {
    console.error("Webhook route error:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}

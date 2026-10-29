// Shared WhatsApp sender for salon + agri notifications. Both approved
// templates share one shell — only {{1}} (name), {{2}} (headline) and
// {{3}} (details, single line — Meta rejects newlines inside a variable
// value) ever change. See the template bodies below for reference.
//
//   namuste_notification (Utility):
//     Hi {{1}}, this is an update on your recent request with us.
//     {{2}}
//     {{3}}
//     If you need any help, just reply to this message or call us on 9090909090.
//
//   namuste_update (Marketing): identical body, Marketing category.

const GRAPH_VERSION = "v21.0";

export type TemplateName = "namuste_notification" | "namuste_update";

export interface ComposedMessage {
  template: TemplateName;
  name: string;
  headline: string;
  details: string;
}

/** 10-digit Indian mobile -> the "91XXXXXXXXXX" format Meta expects. No +. */
export function toWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
}

/** Collapse to one line and trim — Meta's variable rules: no newlines/tabs,
 * no 4+ consecutive spaces, 1024 char max. */
function oneLine(s: string): string {
  return s.replace(/[\n\t]+/g, " ").replace(/ {2,}/g, " ").trim().slice(0, 1024);
}

export async function sendWhatsAppTemplate(to: string, msg: ComposedMessage): Promise<void> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    throw new Error("WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID not configured");
  }

  const body = {
    messaging_product: "whatsapp",
    to: toWhatsAppNumber(to),
    type: "template",
    template: {
      name: msg.template,
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: oneLine(msg.name) },
            { type: "text", text: oneLine(msg.headline) },
            { type: "text", text: oneLine(msg.details) },
          ],
        },
      ],
    },
  };

  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`WhatsApp send failed (${res.status}): ${detail.slice(0, 500)}`);
  }
}

// ---------------------------------------------------------------- salon

interface SalonBookingData {
  customer?: { name?: string };
  date_text?: string;
  time_text?: string;
  services_text?: string;
  stylist?: string;
  reference?: string;
  previous_date_text?: string;
  previous_time_text?: string;
  service?: string;
  lead_type?: string;
}

/** Maps one of salon's own documented webhook events to a composed message,
 * or null for events we deliberately don't WhatsApp (e.g. call.ended, which
 * is internal analytics only). */
export function composeSalonEvent(event: string, data: SalonBookingData): ComposedMessage | null {
  const name = data.customer?.name || "there";
  switch (event) {
    case "appointment.booked":
      return {
        template: "namuste_notification",
        name,
        headline: "Your appointment at Headlocks Luxury Salon is confirmed ✅",
        details: `📅 ${data.date_text} at ${data.time_text} · 💇 ${data.services_text} with ${data.stylist} · 🔖 ${data.reference}`,
      };
    case "appointment.rescheduled":
      return {
        template: "namuste_notification",
        name,
        headline: "Your appointment has been moved ✅",
        details: `New time: ${data.date_text} at ${data.time_text} · 🔖 ${data.reference}`,
      };
    case "appointment.cancelled":
      return {
        template: "namuste_notification",
        name,
        headline: `Your appointment on ${data.date_text} has been cancelled`,
        details: `🔖 ${data.reference} · Reply here anytime to rebook`,
      };
    case "appointment.reminder":
      return {
        template: "namuste_notification",
        name,
        headline: "Reminder: your appointment is today",
        details: `⏰ ${data.time_text} for ${data.services_text} with ${data.stylist} · 🔖 ${data.reference}`,
      };
    case "callback.requested":
      return {
        template: "namuste_notification",
        name,
        headline: `Thanks for contacting Headlocks Luxury Salon about ${data.service || data.lead_type || "your request"}`,
        details: "Our team will call you back shortly",
      };
    case "appointment.completed":
      return {
        template: "namuste_update",
        name,
        headline: "Thank you for visiting Headlocks Luxury Salon today! ✨",
        details: `How was your ${data.services_text} with ${data.stylist}? Reply with a rating from 1 to 5`,
      };
    default:
      return null; // e.g. call.ended — no customer-facing message for this one
  }
}

// ---------------------------------------------------------------- agri

// `data` arrives as untyped JSON (from the agent over HTTP, or built by the
// cron job) — read every field defensively rather than trusting a shape.
const PAYMENT_MODE_LABEL: Record<string, string> = { cod: "Cash on delivery", credit: "Credit", online: "Paid online" };

function str(v: unknown, fallback = ""): string {
  if (v === null || v === undefined || v === "") return fallback;
  return String(v);
}

export function composeAgriEvent(
  event: string,
  role: "farmer" | "retailer" | "distributor" | undefined,
  data: Record<string, unknown>,
): ComposedMessage | null {
  const name = str(data.customer_name, "there");
  const isTrade = role === "retailer" || role === "distributor";
  const orderNumber = str(data.order_number);
  const total = str(data.total);
  const paymentMode = str(data.payment_mode);

  switch (event) {
    case "order_confirmed": {
      const deliveryEstimate = str(data.delivery_estimate, "soon");
      return isTrade
        ? {
            template: "namuste_notification",
            name,
            headline: "Your Kisan Sathi order is confirmed",
            details: `🧾 ${orderNumber}${data.invoice_number ? ` · Invoice ${str(data.invoice_number)}` : ""} · 💰 ₹${total} · ${str(data.credit_terms) || PAYMENT_MODE_LABEL[paymentMode] || paymentMode} · 🚚 ${deliveryEstimate}`,
          }
        : {
            template: "namuste_notification",
            name,
            headline: "Your order is confirmed ✅",
            details: `🧾 ${orderNumber} · 🌾 ${str(data.items_text)} · 💰 ₹${total} (${PAYMENT_MODE_LABEL[paymentMode] || paymentMode}) · 🚚 ${deliveryEstimate}`,
          };
    }

    case "order_cancelled":
      return {
        template: "namuste_notification",
        name,
        headline: `Order ${orderNumber} has been cancelled as requested`,
        details: `Any amount paid will be refunded within ${str(data.refund_window, "7 days")}`,
      };

    case "order_dispatched":
      return {
        template: "namuste_notification",
        name,
        headline: `Good news — order ${orderNumber} is on its way 🚚`,
        details: `Expected by ${str(data.eta, "soon")}${data.tracking ? ` · ${str(data.tracking)}` : ""}`,
      };

    case "restock_alert":
      return {
        template: "namuste_notification",
        name,
        headline: `Good news — ${str(data.product_name)} is back in stock!`,
        details: `💰 ₹${str(data.price)} per ${str(data.unit)} · Reply here to order`,
      };

    case "payment_due_reminder":
      return {
        template: "namuste_notification",
        name,
        headline: `Payment reminder for order ${orderNumber}`,
        details: `₹${str(data.amount_due)} due by ${str(data.due_date)} · Reply here for help`,
      };

    case "advisory_given":
      return {
        template: "namuste_notification",
        name,
        headline: `Here's your crop advisory for ${str(data.crop)} ✅`,
        details: `🌾 ${str(data.issue_or_symptom, "Advice given")} · 💊 ${str(data.product)} · 📏 ${str(data.total_needed)} for ${str(data.acres)} acres${data.packs ? ` · 📦 ${str(data.packs)}` : ""}`,
      };

    case "advisory_followup":
      return {
        template: "namuste_notification",
        name,
        headline: `It's been ${str(data.days_since)} days since we talked about your ${str(data.crop)}`,
        details: str(data.followup_text, "Reply here if you need any help with it"),
      };

    case "callback_received":
      return {
        template: "namuste_notification",
        name,
        headline: `Thanks for contacting us about ${str(data.reason, "your request")}`,
        details: "Our team will call you back shortly",
      };

    default:
      return null;
  }
}

import { NextResponse } from "next/server";
import { composeAgriEvent, sendWhatsAppTemplate } from "@/lib/whatsapp";

// The "smart" half of agri's WhatsApp notifications — nothing in a
// conversation triggers these, so a periodic check does: a restocked SKU
// matching an open request, an order sitting in "dispatched" that hasn't
// been announced yet, and a crop advisory old enough for a follow-up.
// Configured as a Vercel Cron (see vercel.json), once daily — Vercel's
// Hobby plan caps cron frequency at once per day; a tighter schedule
// needs the Pro plan. Each branch marks what it sent so it never repeats
// regardless of how often this actually runs.

const FOLLOWUP_AFTER_DAYS = 14;

function pgHeaders() {
  const key = process.env.AGRI_SUPABASE_SERVICE_KEY;
  if (!key) throw new Error("AGRI_SUPABASE_SERVICE_KEY not configured");
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

function pgUrl(): string {
  const url = process.env.AGRI_SUPABASE_URL;
  if (!url) throw new Error("AGRI_SUPABASE_URL not configured");
  return url.replace(/\/$/, "");
}

async function pgGet<T>(table: string, query: string): Promise<T[]> {
  const res = await fetch(`${pgUrl()}/rest/v1/${table}?${query}`, { headers: pgHeaders(), cache: "no-store" });
  if (!res.ok) throw new Error(`Supabase GET ${table} failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

async function pgPatch(table: string, idFilter: string, body: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${pgUrl()}/rest/v1/${table}?${idFilter}`, {
    method: "PATCH",
    headers: pgHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Supabase PATCH ${table} failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
}

interface CustomerRef {
  mobile: string | null;
  name: string | null;
}

async function sendIfPossible(customer: CustomerRef | null, event: string, role: string | undefined, data: Record<string, unknown>) {
  if (!customer?.mobile) return false;
  const msg = composeAgriEvent(event, role as "farmer" | "retailer" | "distributor" | undefined, { ...data, customer_name: customer.name });
  if (!msg) return false;
  await sendWhatsAppTemplate(customer.mobile, msg);
  return true;
}

async function checkRestock(): Promise<number> {
  const open = await pgGet<{
    id: string;
    sku_id: string;
    customers: CustomerRef | null;
    skus: { pack_unit: string; mrp: number | null; products: { name: string } | null } | null;
  }>(
    "restock_requests",
    "status=eq.open&select=id,sku_id,customers(mobile,name),skus(pack_unit,mrp,products(name))",
  );
  if (open.length === 0) return 0;

  const inStock = await pgGet<{ sku_id: string }>("inventory", "qty_available=gt.0&select=sku_id");
  const inStockSkus = new Set(inStock.map((r) => r.sku_id));

  let sent = 0;
  for (const row of open) {
    if (!inStockSkus.has(row.sku_id)) continue;
    const ok = await sendIfPossible(row.customers, "restock_alert", undefined, {
      product_name: row.skus?.products?.name || "Your requested product",
      price: row.skus?.mrp ?? "",
      unit: row.skus?.pack_unit || "pack",
    });
    if (ok) sent++;
    await pgPatch("restock_requests", `id=eq.${row.id}`, { status: "notified", notified_at: new Date().toISOString() });
  }
  return sent;
}

async function checkDispatched(): Promise<number> {
  const rows = await pgGet<{ id: string; order_number: string; customers: CustomerRef | null }>(
    "orders",
    "status=eq.dispatched&dispatched_notified_at=is.null&select=id,order_number,customers(mobile,name)",
  );
  let sent = 0;
  for (const row of rows) {
    const ok = await sendIfPossible(row.customers, "order_dispatched", undefined, { order_number: row.order_number });
    if (ok) sent++;
    await pgPatch("orders", `id=eq.${row.id}`, { dispatched_notified_at: new Date().toISOString() });
  }
  return sent;
}

async function checkAdvisoryFollowup(): Promise<number> {
  const cutoff = new Date(Date.now() - FOLLOWUP_AFTER_DAYS * 86_400_000).toISOString();
  const rows = await pgGet<{
    id: string;
    crop: string;
    created_at: string;
    recommendation: { product?: string } | null;
    customers: CustomerRef | null;
  }>(
    "advisories",
    `followup_sent_at=is.null&created_at=lt.${encodeURIComponent(cutoff)}&select=id,crop,created_at,recommendation,customers(mobile,name)`,
  );
  let sent = 0;
  const now = Date.now();
  for (const row of rows) {
    const daysSince = Math.floor((now - new Date(row.created_at).getTime()) / 86_400_000);
    const product = row.recommendation?.product;
    const ok = await sendIfPossible(row.customers, "advisory_followup", "farmer", {
      crop: row.crop,
      days_since: daysSince,
      followup_text: product
        ? `Time for the next dose of ${product}, or reply if the issue hasn't cleared`
        : "Reply here if you need any help with it",
    });
    if (ok) sent++;
    await pgPatch("advisories", `id=eq.${row.id}`, { followup_sent_at: new Date().toISOString() });
  }
  return sent;
}

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization") || "";
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const [restock, dispatched, advisory] = await Promise.all([checkRestock(), checkDispatched(), checkAdvisoryFollowup()]);
    return NextResponse.json({ restock, dispatched, advisory });
  } catch (err) {
    console.error("[cron/agri-whatsapp] failed", err);
    return NextResponse.json({ error: "cron run failed" }, { status: 500 });
  }
}

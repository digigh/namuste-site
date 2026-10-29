import { NextResponse } from "next/server";

// Supabase pauses free projects after 7 days without activity. Vercel Cron calls this
// once a day (see vercel.json) so the clinic database never looks idle.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Not allowed." }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) {
    return NextResponse.json({ error: "Keep-alive is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(`${url}/rest/v1/rpc/keepalive`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: "{}",
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[keepalive] Supabase answered", res.status, await res.text());
      return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
    }
    return NextResponse.json({ ok: true, clinics: await res.json() });
  } catch (err) {
    console.error("[keepalive] could not reach Supabase", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

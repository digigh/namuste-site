import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const webhookUrl =
      process.env.POPUP_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_POPUP_WEBHOOK_URL ||
      "https://aiautomation.digicides.com/webhook/pop_up_data";

    const payload = {
      ...body,
      ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
      receivedAt: new Date().toISOString(),
    };

    // Forward to remote webhook
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text().catch(() => "");

      return NextResponse.json({
        success: true,
        status: response.status,
        forwardedTo: webhookUrl,
        upstreamResponse: responseText,
      });
    } catch (fetchError: any) {
      console.warn("[popup-lead] Webhook fetch warning:", fetchError?.message || fetchError);
      // Return 200 so the client modal doesn't break even if upstream webhook is offline
      return NextResponse.json({
        success: true,
        warning: "Webhook forwarded with error",
        error: fetchError?.message || "Failed to reach webhook",
      });
    }
  } catch (error: any) {
    console.error("[popup-lead] Handler error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Invalid payload" },
      { status: 400 }
    );
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const webhookUrl =
      body.webhookUrlOverride ||
      process.env.AI_DEMO_WEBHOOK_URL ||
      process.env.LEAD_WEBHOOK_URL;

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
          payload,
        });
      } catch (postError) {
        console.error("Webhook Dispatch Network Error:", postError);
        return NextResponse.json({
          success: true,
          delivered: false,
          error: "Failed to reach remote webhook destination",
          payload,
        });
      }
    }

    return NextResponse.json({
      success: true,
      delivered: false,
      webhookUrlConfigured: false,
      message: "Payload recorded locally. Webhook URL will receive data once configured.",
      payload,
    });
  } catch (error) {
    console.error("Webhook route error:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}

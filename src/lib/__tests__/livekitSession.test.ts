import { describe, expect, it } from "vitest";
import { jwtVerify } from "jose";
import { createSessionPass, isAllowedOrigin, parseMode, readLiveKitEnv } from "@/lib/livekitSession";

const env = { url: "wss://example.livekit.cloud", apiKey: "APIkey", apiSecret: "s".repeat(40), agentName: "clinic-agent" };

describe("livekit session pass", () => {
  it("needs all three LiveKit settings", () => {
    expect(readLiveKitEnv({})).toBeNull();
    expect(readLiveKitEnv({ LIVEKIT_URL: "wss://x", LIVEKIT_API_KEY: "k" })).toBeNull();
    expect(readLiveKitEnv({ LIVEKIT_URL: "wss://x", LIVEKIT_API_KEY: "k", LIVEKIT_API_SECRET: "s" })?.agentName).toBe(
      "clinic-agent",
    );
  });

  it("only accepts voice or chat", () => {
    expect(parseMode({ mode: "voice" })).toBe("voice");
    expect(parseMode({ mode: "chat" })).toBe("chat");
    for (const bad of [null, "voice", {}, { mode: "video" }, { mode: 1 }]) expect(parseMode(bad)).toBeNull();
  });

  it("voice pass: one fresh room, mic only, sends in the clinic agent with the mode", async () => {
    const a = await createSessionPass(env, "voice");
    const b = await createSessionPass(env, "voice");
    expect(a.roomName).not.toBe(b.roomName);
    const { payload } = await jwtVerify(a.token, new TextEncoder().encode(env.apiSecret));
    const video = payload.video as Record<string, unknown>;
    expect(video.room).toBe(a.roomName);
    expect(video.roomJoin).toBe(true);
    expect(video.canPublish).toBe(true);
    expect(video.canPublishSources).toEqual(["microphone"]);
    const cfg = payload.roomConfig as { agents: { agentName: string; metadata: string }[] };
    expect(cfg.agents[0].agentName).toBe("clinic-agent");
    expect(JSON.parse(cfg.agents[0].metadata)).toEqual({ mode: "voice" });
    expect((payload.exp as number) - (payload.nbf as number ?? payload.iat as number)).toBeLessThanOrEqual(600);
  });

  it("chat pass cannot publish audio", async () => {
    const pass = await createSessionPass(env, "chat");
    const { payload } = await jwtVerify(pass.token, new TextEncoder().encode(env.apiSecret));
    const video = payload.video as Record<string, unknown>;
    expect(video.canPublish).toBe(false);
    expect(video.canPublishData).toBe(true);
    const cfg = payload.roomConfig as { agents: { metadata: string }[] };
    expect(JSON.parse(cfg.agents[0].metadata)).toEqual({ mode: "chat" });
  });

  it("only this site may ask for a pass", () => {
    expect(isAllowedOrigin("https://namuste.com", "namuste.com", "")).toBe(true);
    expect(isAllowedOrigin("https://evil.com", "namuste.com", "")).toBe(false);
    expect(isAllowedOrigin(null, "namuste.com", "")).toBe(false);
    expect(isAllowedOrigin("garbage", "namuste.com", "")).toBe(false);
    expect(isAllowedOrigin("https://www.namuste.com/", "namuste.com", "https://www.namuste.com")).toBe(true);
  });
});

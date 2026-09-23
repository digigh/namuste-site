import { NextResponse } from "next/server";
import { generateSarvamTTS } from "@/app/api/ai-demo/speech/route";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { runConversationTurn } from "@/lib/conversationGraph";
export type { ProcessChatTurnParams, ProcessChatTurnResult } from "@/lib/conversationGraph";

// A live voice call's worst-case fallback chain (a failed streaming attempt,
// then Groq, then a full OpenAI retry) is sequential and can approach
// Vercel's default function timeout, which would kill the request before any
// fallback gets to answer — dropping the caller with no response at all
// rather than a graceful degradation. No explicit duration was set before
// this; 60s gives every fallback layer real room without masking a genuine
// hang (adjust if the current Vercel plan's actual ceiling differs).
export const maxDuration = 60;

// Races a promise against a hard, unconditional timeout. Used as a defensive
// backstop around every TTS call in this file, independent of whatever
// timeout generateSarvamTTS enforces internally — verified live in
// production that a TTS call can occasionally stall indefinitely (never
// reproduced locally) in a way that outlasted its own internal timeout, and
// since these calls are awaited sequentially, one stuck promise blocks every
// later chunk (or the whole non-streaming response) from ever being sent.
function withHardTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

// Splits a reply into sentence-like chunks so TTS can be generated and
// streamed one clip at a time instead of waiting for the whole reply to
// synthesize as one blob. Falls back to the whole string as a single
// "sentence" when no sentence-ending punctuation is found — most voice
// replies here are already one short sentence (the prompt caps replies at
// 20 words), so this is often a no-op split of length 1; the benefit is
// still real for longer deterministic template replies (confirmations, FAQ
// facts) which are frequently multi-sentence.
function splitIntoSentences(text: string): string[] {
  const trimmed = (text || "").trim();
  if (!trimmed) return [];
  const parts = trimmed
    .split(/(?<=[.!?।])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [trimmed];
}

// processChatTurn is now a thin re-export — all turn-processing logic lives
// in the LangGraph-based engine (see conversationGraph.ts) so it can be
// unit-tested directly without going through HTTP. Re-exported under its
// original name/signature so nothing else (including a future Plivo
// phone-call route, per the original design intent here) needs to change.
export const processChatTurn = runConversationTurn;


// ─── Main POST Handler ────────────────────────────────────────────────────────
// Thin HTTP wrapper around processChatTurn(): parses the request, runs the
// turn, then shapes the response (streamed NDJSON for doctors-clinics voice
// turns, plain JSON otherwise) — the same response-shaping logic as before
// this file was split, unchanged.
export async function POST(req: Request) {
  try {
    const clientKey = getClientKey(req);
    // One turn of a live conversation = one call here — 30/min covers a fast
    // back-and-forth while blocking scripted abuse that would run up the bill.
    const { allowed } = checkRateLimit(`chat:${clientKey}`, 30, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: "Rate limit exceeded. Please slow down." }, { status: 429 });
    }

    const body = await req.json();
    const {
      industryId = "doctors-clinics",
      messages = [],
      userMessage = "",
      currentExtracted = {},
      generateAudio = false,
      speaker = "ritu",
      sarvamLanguageCode = "",
      sttLanguageProbability = null,
    } = body;

    // Pre-warms TTS for the reply's first sentence the instant the LLM's
    // streamed output makes it known — usually well before the rest of the
    // turn (extracted fields, isComplete) finishes validating — so by the
    // time the fully-guarded result below is ready, that clip may already be
    // synthesizing or done. English only for now: for Hindi turns the actual
    // TTS text prefers spokenDevanagari (a separate field that streams in
    // AFTER reply), so pre-warming off the English/Hinglish "reply" text
    // alone would risk synthesizing the wrong script — deferred rather than
    // risk a mismatch. This never affects what gets trusted: extracted/
    // isComplete always come from the complete, fully-validated JSON exactly
    // as the non-streaming path always has; this only changes when the
    // (never safety-gated) reply's audio starts generating.
    let earlyTtsPromise: Promise<{ audioBase64: string | null }> | null = null;
    let earlyTtsSentenceText: string | null = null;

    const {
      finalReply,
      finalSpokenText,
      finalLangCode,
      finalStep,
      finalExtracted,
      finalIsComplete,
      finalIsOffTopic,
      responseSource,
      toneHint,
      finalCallEnded,
    } = await processChatTurn({
      industryId, messages, userMessage, currentExtracted, sarvamLanguageCode, sttLanguageProbability,
      onEarlyReplyText: (industryId === "doctors-clinics" && generateAudio)
        ? (replyText, langCode) => {
            if (langCode !== "en-IN") return;
            const firstSentence = splitIntoSentences(replyText)[0];
            if (!firstSentence) return;
            earlyTtsSentenceText = firstSentence;
            earlyTtsPromise = generateSarvamTTS(firstSentence, speaker, langCode, "neutral").catch(() => ({ audioBase64: null, detectedLang: langCode }));
          }
        : undefined,
    });

    // ── High-Speed Server-Side TTS Generation (With Native Accent Routing) ──
    // Doctors-clinics voice/audio turns stream: the reply text/CRM data goes
    // out immediately as one NDJSON line, then each sentence's audio streams
    // out as its own line the moment it's synthesized, so the frontend can
    // start playing the first sentence while later ones are still being
    // generated — instead of waiting for one combined JSON+audio response.
    // Every other case (other industries, or no audio requested) is
    // completely unchanged below — same single JSON response as always.
    if (generateAudio && finalReply && industryId === "doctors-clinics") {
      const ttsText = finalSpokenText || finalReply;
      const sentences = splitIntoSentences(ttsText);
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const textEvent = {
            type: "text",
            success: true,
            source: responseSource,
            reply: finalReply,
            languageCode: finalLangCode,
            step: finalStep,
            tone: toneHint,
            callEnded: finalCallEnded,
            extracted: finalExtracted,
            isComplete: finalIsComplete,
            isOffTopic: finalIsOffTopic,
          };
          controller.enqueue(encoder.encode(JSON.stringify(textEvent) + "\n"));

          // Kick off every sentence's TTS generation concurrently instead of
          // one at a time — a multi-sentence reply (very common here, since
          // a confirmed booking's reply always has a reference-ID sentence
          // appended) used to pay each clip's synthesis latency back-to-back,
          // compounding real-world round-trip delay into a multi-second wait
          // per turn. Order is still preserved on the wire: each promise is
          // awaited in its original sentence order before its chunk is
          // emitted, even though a later sentence may finish generating first.
          //
          // Each awaited promise is ALSO raced against a hard outer timeout,
          // independent of generateSarvamTTS's own internal one. Verified
          // live in production: this stream intermittently stalled forever
          // after the first audio chunk (reproduced directly — 1 hang in 6
          // real requests, an indefinite hang each time, never resolving on
          // its own even after 90s) despite that inner timeout, which never
          // reproduced locally. Whatever the exact cause (a Vercel-specific
          // edge case in how AbortController/fetch interact under load, a
          // cold-start-adjacent slowdown, or something else entirely), a
          // stalled `await` at this specific point — sequential, one per
          // sentence — is exactly what blocks every later chunk and "done"
          // from ever being sent, which is indistinguishable from the app
          // being completely broken from the caller's side. This outer race
          // guarantees the loop always advances within a bounded time
          // regardless of why any single attempt didn't resolve.
          const ttsPromises = sentences.map((sentence, i) =>
            withHardTimeout(
              (i === 0 && earlyTtsPromise && earlyTtsSentenceText === sentences[0]
                ? earlyTtsPromise
                : generateSarvamTTS(sentence, speaker, finalLangCode, toneHint)
              ).catch((ttsErr) => {
                console.warn("[Streamed TTS chunk warn]:", ttsErr);
                return { audioBase64: null };
              }),
              6000,
              { audioBase64: null }
            )
          );

          for (let i = 0; i < ttsPromises.length; i++) {
            const ttsResult = await ttsPromises[i];
            if (ttsResult.audioBase64) {
              controller.enqueue(
                encoder.encode(JSON.stringify({ type: "audio_chunk", index: i, audioBase64: ttsResult.audioBase64 }) + "\n")
              );
            }
          }

          controller.enqueue(encoder.encode(JSON.stringify({ type: "done" }) + "\n"));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
      });
    }

    let audioBase64: string | null = null;
    if (generateAudio && finalReply) {
      try {
        const ttsText = finalSpokenText || finalReply;
        const ttsResult = await withHardTimeout(
          generateSarvamTTS(ttsText, speaker, finalLangCode, toneHint),
          6000,
          { audioBase64: null, detectedLang: finalLangCode }
        );
        audioBase64 = ttsResult.audioBase64;
      } catch (ttsErr) {
        console.warn("[Unified TTS generation warn]:", ttsErr);
      }
    }

    return NextResponse.json({
      success: true,
      source: responseSource,
      reply: finalReply,
      languageCode: finalLangCode,
      step: finalStep,
      tone: toneHint,
      callEnded: finalCallEnded,
      extracted: finalExtracted,
      isComplete: finalIsComplete,
      isOffTopic: finalIsOffTopic,
      audioBase64,
    });
  } catch (error) {
    console.error("Chat engine error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

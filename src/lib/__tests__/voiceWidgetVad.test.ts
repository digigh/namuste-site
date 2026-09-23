import { describe, it, expect } from "vitest";
import {
  evaluateVadFrame,
  SPEECH_RMS_THRESHOLD,
  REQUIRED_CONSECUTIVE_SPEECH_FRAMES,
} from "@/lib/voiceWidgetVad";

const LOUD = SPEECH_RMS_THRESHOLD + 0.02;
const QUIET = SPEECH_RMS_THRESHOLD - 0.02;

// Runs a sequence of RMS values through evaluateVadFrame, threading the
// counters/detected-flag exactly the way the real vadTick loop does, and
// returns the frame index (0-based) where justStarted first fired, or -1.
function runSequence(rmsSequence: number[]): { justStartedAt: number; finalConsecutive: number } {
  let consecutiveSpeechFrames = 0;
  let speechAlreadyDetected = false;
  let justStartedAt = -1;

  rmsSequence.forEach((rms, i) => {
    const result = evaluateVadFrame({ rms, consecutiveSpeechFrames, speechAlreadyDetected });
    consecutiveSpeechFrames = result.consecutiveSpeechFrames;
    if (result.justStarted) {
      speechAlreadyDetected = true;
      if (justStartedAt === -1) justStartedAt = i;
    }
  });

  return { justStartedAt, finalConsecutive: consecutiveSpeechFrames };
}

describe("evaluateVadFrame — sustained speech onset", () => {
  it("fires justStarted exactly at the required-consecutive-frames threshold, not before", () => {
    const loudFrames = new Array(REQUIRED_CONSECUTIVE_SPEECH_FRAMES + 3).fill(LOUD);
    const { justStartedAt } = runSequence(loudFrames);
    // 0-indexed: the Nth required frame is index N-1
    expect(justStartedAt).toBe(REQUIRED_CONSECUTIVE_SPEECH_FRAMES - 1);
  });

  it("never fires justStarted again once speech is already detected", () => {
    const loudFrames = new Array(REQUIRED_CONSECUTIVE_SPEECH_FRAMES + 10).fill(LOUD);
    let consecutiveSpeechFrames = 0;
    let speechAlreadyDetected = false;
    let justStartedCount = 0;
    for (const rms of loudFrames) {
      const result = evaluateVadFrame({ rms, consecutiveSpeechFrames, speechAlreadyDetected });
      consecutiveSpeechFrames = result.consecutiveSpeechFrames;
      if (result.justStarted) {
        justStartedCount++;
        speechAlreadyDetected = true;
      }
    }
    expect(justStartedCount).toBe(1);
  });
});

describe("evaluateVadFrame — background noise rejection", () => {
  it("does not treat a brief loud blip (shorter than the required run) as speech onset", () => {
    // A door slam or cough: loud for a few frames, well under the
    // sustained-frames requirement, then silence.
    const blip = [
      ...new Array(3).fill(LOUD),
      ...new Array(5).fill(QUIET),
    ];
    const { justStartedAt } = runSequence(blip);
    expect(justStartedAt).toBe(-1);
  });

  it("resets the consecutive-frame counter after a blip instead of accumulating across gaps", () => {
    // Two short blips that would sum to >= the threshold count if the
    // counter didn't reset between them — must still never trigger.
    const half = Math.floor(REQUIRED_CONSECUTIVE_SPEECH_FRAMES / 2);
    const sequence = [
      ...new Array(half).fill(LOUD),
      ...new Array(3).fill(QUIET),
      ...new Array(half).fill(LOUD),
    ];
    const { justStartedAt } = runSequence(sequence);
    expect(justStartedAt).toBe(-1);
  });
});

describe("evaluateVadFrame — silence detection", () => {
  it("reports isSilentNow the instant rms drops back below threshold after sustained speech", () => {
    const sequence = [...new Array(REQUIRED_CONSECUTIVE_SPEECH_FRAMES).fill(LOUD), QUIET];
    let consecutiveSpeechFrames = 0;
    let speechAlreadyDetected = false;
    let lastResult;
    for (const rms of sequence) {
      lastResult = evaluateVadFrame({ rms, consecutiveSpeechFrames, speechAlreadyDetected });
      consecutiveSpeechFrames = lastResult.consecutiveSpeechFrames;
      if (lastResult.justStarted) speechAlreadyDetected = true;
    }
    expect(lastResult!.isSilentNow).toBe(true);
  });

  it("reports isSilentNow false while genuinely above threshold", () => {
    const result = evaluateVadFrame({ rms: LOUD, consecutiveSpeechFrames: 0, speechAlreadyDetected: false });
    expect(result.isSilentNow).toBe(false);
  });
});

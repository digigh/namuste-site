// Pure decision logic for the mic-capture voice-activity-detection tick
// (see useMicCapture's vadTick). Deliberately has zero dependency on
// AnalyserNode/MediaRecorder/the DOM — it only ever sees an already-computed
// RMS number and the running counters, so it can be unit tested directly
// against synthetic RMS sequences instead of only ever being exercised by a
// real microphone. This is exactly the kind of threshold/timing logic that
// caused real bugs this session (background noise false-triggering a
// "turn", echo bleed during a since-reverted barge-in attempt) and had
// never been testable in isolation before.

// Raised from 0.02, and paired with a sustained-frames requirement below —
// a single loud frame (a door, a cough, distant noise) used to be enough to
// start capturing a "turn" and send it to STT as if the caller had spoken,
// which is exactly what was corrupting the conversation with background
// noise.
export const SPEECH_RMS_THRESHOLD = 0.028;
// Require ~150ms of continuous energy above threshold before treating it as
// the caller actually starting to talk, not just a brief blip.
export const REQUIRED_CONSECUTIVE_SPEECH_FRAMES = 9;
// Raised from 700ms — that was cutting people off during completely normal
// mid-sentence pauses (recalling a number, a breath, an "umm"). The silence
// timer this feeds already correctly cancels and lets recording continue
// the instant speech resumes, so this only controls how long a genuine
// pause has to last before it's treated as "done talking" — 1100ms gives
// real breathing room while still being far snappier than the original
// fixed 2200ms wait.
export const SILENCE_MS = 1100;
export const MAX_RECORDING_MS = 20000;

export interface VadFrameInput {
  rms: number;
  consecutiveSpeechFrames: number;
  speechAlreadyDetected: boolean;
}

export interface VadFrameResult {
  consecutiveSpeechFrames: number;
  // True only on the exact frame where sustained speech onset is confirmed
  // (speechAlreadyDetected was false and the threshold was just reached) —
  // never fires again for the same utterance even while the caller keeps
  // talking, since the caller is expected to latch this into its own
  // "detected" ref/state once and pass speechAlreadyDetected: true after.
  justStarted: boolean;
  isSilentNow: boolean;
}

export function evaluateVadFrame({ rms, consecutiveSpeechFrames, speechAlreadyDetected }: VadFrameInput): VadFrameResult {
  const isSilentNow = !(rms > SPEECH_RMS_THRESHOLD);

  if (isSilentNow) {
    // Energy dropped — a blip that didn't sustain long enough resets the
    // counter instead of slowly accumulating across noise gaps.
    return { consecutiveSpeechFrames: 0, justStarted: false, isSilentNow: true };
  }

  const nextConsecutive = consecutiveSpeechFrames + 1;
  const justStarted = !speechAlreadyDetected && nextConsecutive >= REQUIRED_CONSECUTIVE_SPEECH_FRAMES;
  return { consecutiveSpeechFrames: nextConsecutive, justStarted, isSilentNow: false };
}

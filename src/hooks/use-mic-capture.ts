"use client";

import { useRef, useState, useCallback } from "react";
import { blobToBase64 } from "@/lib/voiceWidgetHelpers";
import { evaluateVadFrame, SILENCE_MS, MAX_RECORDING_MS } from "@/lib/voiceWidgetVad";

export interface UseMicCaptureParams {
  isCallActiveRef: React.RefObject<boolean>;
  isMutedRef: React.RefObject<boolean>;
  // "" = auto-detect language every turn; "hi-IN"/"en-IN" = user manually
  // forced it via the language toggle.
  manualLanguageHintRef: React.RefObject<string>;
  currentLanguageCodeRef: React.RefObject<string>;
  // Fires the instant sustained speech is detected — lets the caller cancel
  // its own auto-hangup timer (a call-lifecycle concern, not a mic-capture
  // one) without this hook needing to know that timer exists.
  onSpeechResumed?: () => void;
  // recorder.onstop used to call processConversationTurn(...) directly by
  // closure reference — inverted here so this hook has zero dependency on
  // turn-processing/orchestration; it only ever reports what it heard.
  onTranscriptReady: (transcript: string, detectedLanguageCode: string, languageProbability: number | null) => void;
  setSpeechStatusText: (text: string) => void;
}

// Owns mic acquisition, voice-activity detection, and recording — captures
// one caller utterance at a time and reports the transcribed result upward
// via onTranscriptReady. Split out of the original monolith component
// verbatim (no logic changes) so it can be reasoned about and changed in
// isolation; see evaluateVadFrame (src/lib/voiceWidgetVad.ts) for the
// threshold/timing decision logic this drives.
export function useMicCapture({
  isCallActiveRef,
  isMutedRef,
  manualLanguageHintRef,
  currentLanguageCodeRef,
  onSpeechResumed,
  onTranscriptReady,
  setSpeechStatusText,
}: UseMicCaptureParams) {
  const [isUserSpeaking, setIsUserSpeaking] = useState<boolean>(false);
  const [liveUserTranscript, setLiveUserTranscript] = useState<string>("");

  // MediaRecorder + amplitude-VAD mic capture (replaces browser SpeechRecognition)
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const vadRafRef = useRef<number | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const speechDetectedRef = useRef<boolean>(false);
  const pendingFinalizeRef = useRef<boolean>(false);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stops any in-progress capture and DISCARDS it (does not transcribe/send).
  // Used whenever we need to cut the mic immediately — e.g. before the AI
  // starts speaking, or when the call ends. The VAD-triggered finalize path
  // (see startLiveListening) sets pendingFinalizeRef itself before calling
  // recorder.stop(), so a plain stopLiveListening() here never accidentally
  // sends a still-buffering recording.
  const stopLiveListening = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (vadRafRef.current) {
      cancelAnimationFrame(vadRafRef.current);
      vadRafRef.current = null;
    }
    pendingFinalizeRef.current = false;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try { mediaRecorderRef.current.stop(); } catch (_) {}
    }
    mediaRecorderRef.current = null;
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (_) {}
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    recordedChunksRef.current = [];
    speechDetectedRef.current = false;
    setIsUserSpeaking(false);
  }, []);

  // Mic capture via MediaRecorder + amplitude-based voice activity detection (VAD).
  // Replaces the browser's native SpeechRecognition, which (a) only supports
  // whatever language/dialect quality the OS engine ships with — poor for
  // Hindi/regional languages — and (b) locked recognition.lang to *last
  // turn's* detected language, so a mid-call language switch was always one
  // turn late. Recording is sent to /api/ai-demo/speech (Whisper STT) once
  // the VAD detects ~700ms of silence after speech, and Whisper's own
  // detected language becomes the authoritative signal reported upward via
  // onTranscriptReady — closing both gaps at once.
  const startLiveListening = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setSpeechStatusText("Error: Microphone capture not supported in this browser. Use chat mode.");
      return;
    }

    // Discard any stale in-progress capture before starting a fresh one.
    stopLiveListening();

    try {
      // getUserMedia can hang indefinitely — neither resolving nor rejecting —
      // if the OS mic device hasn't fully released from a just-ended recording
      // session. Without a hard timeout, that hang is completely invisible:
      // no error, mic just never comes back. Race it against a timeout so a
      // stuck acquisition always surfaces as a real, catchable error instead.
      const stream = await Promise.race([
        navigator.mediaDevices.getUserMedia({
          // Browser/OS-level noise suppression, echo cancellation, and gain
          // normalization — these are standard, well-supported constraints
          // that meaningfully cut background noise before it ever reaches
          // the VAD or STT, rather than trying to filter it after the fact.
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("getUserMedia timed out after 6s — mic device may be stuck busy from the previous turn")), 6000)
        ),
      ]);
      mediaStreamRef.current = stream;

      const AudioContextCtor = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioContext: AudioContext = new AudioContextCtor();
      audioContextRef.current = audioContext;
      if (audioContext.state === "suspended") {
        try { await audioContext.resume(); } catch (_) {}
      }
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;
      recordedChunksRef.current = [];
      speechDetectedRef.current = false;
      pendingFinalizeRef.current = false;

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const shouldFinalize = pendingFinalizeRef.current;
        pendingFinalizeRef.current = false;
        const chunks = recordedChunksRef.current;
        recordedChunksRef.current = [];

        stream.getTracks().forEach((t) => t.stop());
        if (mediaStreamRef.current === stream) mediaStreamRef.current = null;
        if (audioContextRef.current === audioContext) {
          try { await audioContext.close(); } catch (_) {}
          audioContextRef.current = null;
        }

        if (!shouldFinalize || chunks.length === 0) return;

        const blob = new Blob(chunks, { type: mimeType || "audio/webm" });
        if (blob.size < 2000) {
          // Too short to be meaningful speech (VAD false-positive on noise) — just resume listening
          if (isCallActiveRef.current && !isMutedRef.current) startLiveListening();
          return;
        }

        setSpeechStatusText("Transcribing...");
        try {
          const base64Audio = await blobToBase64(blob);
          const res = await fetch("/api/ai-demo/speech", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "stt",
              audioBase64: base64Audio,
              // In Auto mode (no manual override), hint Sarvam with whatever
              // language is already established rather than "unknown" —
              // narrows what it's listening for instead of blind-guessing
              // fresh on every single turn.
              languageCode: manualLanguageHintRef.current || currentLanguageCodeRef.current,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.transcript && data.transcript.trim()) {
              setLiveUserTranscript(data.transcript.trim());
              onTranscriptReady(
                data.transcript.trim(),
                data.detectedLanguageCode || "",
                typeof data.languageProbability === "number" ? data.languageProbability : null
              );
              return;
            }
          }
        } catch (err) {
          console.warn("STT request failed:", err);
        }

        // No usable transcript came back — resume listening rather than hanging silently
        if (isCallActiveRef.current && !isMutedRef.current) {
          setSpeechStatusText("Didn't catch that — listening again...");
          startLiveListening();
        }
      };

      recorder.start(250); // flush chunks every 250ms so short utterances still have data on stop()

      setIsUserSpeaking(false);
      setSpeechStatusText("Listening to you... (Speak naturally)");

      const dataArray = new Uint8Array(analyser.fftSize);
      const startedAt = Date.now();
      let consecutiveSpeechFrames = 0;

      const vadTick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(dataArray);

        let sumSquares = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const normalized = (dataArray[i] - 128) / 128;
          sumSquares += normalized * normalized;
        }
        const rms = Math.sqrt(sumSquares / dataArray.length);

        const result = evaluateVadFrame({
          rms,
          consecutiveSpeechFrames,
          speechAlreadyDetected: speechDetectedRef.current,
        });
        consecutiveSpeechFrames = result.consecutiveSpeechFrames;

        if (result.justStarted) {
          speechDetectedRef.current = true;
          setIsUserSpeaking(true);
          // Caller is speaking again after a confirmed booking — they get
          // to finish, not get cut off by the auto-hangup timer.
          if (onSpeechResumed) onSpeechResumed();
        }
        if (!result.isSilentNow && silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }

        if (result.isSilentNow && speechDetectedRef.current && !silenceTimeoutRef.current) {
          silenceTimeoutRef.current = setTimeout(() => {
            pendingFinalizeRef.current = true;
            setIsUserSpeaking(false);
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
              try { mediaRecorderRef.current.stop(); } catch (_) {}
            }
          }, SILENCE_MS);
        }

        if (Date.now() - startedAt > MAX_RECORDING_MS) {
          pendingFinalizeRef.current = speechDetectedRef.current;
          if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            try { mediaRecorderRef.current.stop(); } catch (_) {}
          }
          return;
        }

        vadRafRef.current = requestAnimationFrame(vadTick);
      };
      vadRafRef.current = requestAnimationFrame(vadTick);
    } catch (err: any) {
      console.warn("Could not start microphone capture:", err);
      // Surface the ACTUAL error instead of a hardcoded guess — a previous
      // version always said "permission denied" here even when the real cause
      // was something else entirely (e.g. a stuck device, or the new 6s
      // timeout above), which actively hid what was really happening.
      const name = err?.name || "";
      const friendly =
        name === "NotAllowedError" ? "Microphone permission denied. Use chat mode instead."
        : name === "NotFoundError" ? "No microphone found on this device."
        : name === "NotReadableError" ? "Microphone is busy or unavailable (may be in use by another app/tab)."
        : err?.message?.includes("timed out") ? "Microphone didn't respond in time — device may still be busy from the previous turn. Retrying..."
        : `Microphone error: ${err?.message || name || "unknown"}.`;
      setSpeechStatusText(`Error: ${friendly}`);
      setIsUserSpeaking(false);

      // A stuck/busy device is often transient — retry once automatically
      // instead of leaving the call permanently dead on a timeout.
      if (err?.message?.includes("timed out") && isCallActiveRef.current && !isMutedRef.current) {
        setTimeout(() => {
          if (isCallActiveRef.current && !isMutedRef.current) startLiveListening();
        }, 1000);
      }
    }
  }, [onTranscriptReady, stopLiveListening]);

  return {
    isUserSpeaking,
    liveUserTranscript,
    setLiveUserTranscript,
    analyserRef,
    startLiveListening,
    stopLiveListening,
  };
}

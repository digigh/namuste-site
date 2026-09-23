"use client";

import { useRef, useState, useCallback } from "react";

export interface UseAudioPlaybackParams {
  isSpeakerOn: boolean;
  selectedSpeaker: string;
  selectedSpeakerRef: React.RefObject<string>;
  // AI speech playback and mic capture are mutually exclusive — speaking
  // needs to shut the mic off first. Passed in rather than imported from a
  // mic hook directly, so this hook has no dependency on how mic capture is
  // implemented.
  stopLiveListening: () => void;
  setSpeechStatusText: (text: string) => void;
}

// Owns everything about playing the AI's voice back to the caller — a
// single fetched TTS clip, a queue of streamed per-sentence clips, or the
// browser-speech-synthesis fallback when Sarvam TTS is unavailable. Split
// out of the original monolith component verbatim (no logic changes) so it
// can be reasoned about and changed in isolation.
export function useAudioPlayback({
  isSpeakerOn,
  selectedSpeaker,
  selectedSpeakerRef,
  stopLiveListening,
  setSpeechStatusText,
}: UseAudioPlaybackParams) {
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);

  // References for live async callbacks
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  // Real-time frequency analysis of whichever AI audio clip is currently
  // playing, feeding the waveform visualizer with the ACTUAL audio instead
  // of a synthetic animation. One AudioContext is created lazily and reused
  // for every clip; each new <audio> element gets its own source node (the
  // Web Audio API only allows one per element) wired through an analyser and
  // back out to the speakers — skipping the reconnect-to-destination step
  // would silently mute playback, so every attach site must do both.
  const aiAudioCtxRef = useRef<AudioContext | null>(null);
  const aiAnalyserRef = useRef<AnalyserNode | null>(null);

  const stopCurrentAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsAiSpeaking(false);
  }, []);

  // Wires a freshly-created AI speech <audio> element through a Web Audio
  // analyser so the waveform can visualize the REAL clip instead of a
  // canned animation — called once per new Audio() at every playback site.
  // createMediaElementSource() only works once per element (a second call on
  // the same element throws), which is fine here since each TTS response
  // creates a brand-new element anyway. Must reconnect the analyser to the
  // context's destination, or the element's audio is silently captured into
  // the graph and never reaches the speakers.
  const attachAiAnalyser = useCallback((audioEl: HTMLAudioElement) => {
    try {
      if (!aiAudioCtxRef.current) {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        aiAudioCtxRef.current = new Ctx();
      }
      const ctx = aiAudioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      const source = ctx.createMediaElementSource(audioEl);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.5;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      aiAnalyserRef.current = analyser;
    } catch (e) {
      // Visualization-only failure — playback itself doesn't depend on this,
      // so the waveform just falls back to its idle animation for this turn.
      console.warn("AI audio analyser attach failed:", e);
    }
  }, []);

  // ─── AI-speech watchdog ──────────────────────────────────────────────────
  // The mic is meant to auto-resume the instant AI audio finishes (via the
  // audio/utterance "ended" event). In practice that event occasionally never
  // fires — a decode hiccup, a browser TTS voice-loading quirk, etc. — which
  // silently strands the call: no error, just a mic that never comes back on
  // until the user manually hits the "Speak" button. This watchdog guarantees
  // the resume callback fires exactly once no matter what the audio/browser
  // does, closing that gap without needing to diagnose every possible failure
  // mode individually.
  const aiSpeechWatchdogRef = useRef<NodeJS.Timeout | null>(null);
  const aiSpeechResolvedRef = useRef<boolean>(true);

  const armAiSpeechWatchdog = useCallback((onDone: () => void, ms = 12000) => {
    aiSpeechResolvedRef.current = false;
    if (aiSpeechWatchdogRef.current) clearTimeout(aiSpeechWatchdogRef.current);
    aiSpeechWatchdogRef.current = setTimeout(() => {
      if (!aiSpeechResolvedRef.current) {
        aiSpeechResolvedRef.current = true;
        console.warn("AI speech watchdog fired — 'ended' event never arrived, forcing mic resume.");
        onDone();
      }
    }, ms);
  }, []);

  const resolveAiSpeech = useCallback((onDone: () => void) => {
    if (aiSpeechResolvedRef.current) return; // already resolved (watchdog or a duplicate event) — don't double-fire
    aiSpeechResolvedRef.current = true;
    if (aiSpeechWatchdogRef.current) {
      clearTimeout(aiSpeechWatchdogRef.current);
      aiSpeechWatchdogRef.current = null;
    }
    onDone();
  }, []);

  // Web Speech Fallback
  const fallbackBrowserSpeech = useCallback((text: string, langCode = "en-IN", onEndedCallback?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEndedCallback) onEndedCallback();
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~`[\]()•]/g, " ").replace(/\s+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode || "en-IN";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsAiSpeaking(true);
      setSpeechStatusText("AI speaking...");
      armAiSpeechWatchdog(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
        setIsAiSpeaking(false);
        setSpeechStatusText("Listening to you...");
        if (onEndedCallback) onEndedCallback();
      });
    };
    utterance.onend = () => {
      resolveAiSpeech(() => {
        setIsAiSpeaking(false);
        setSpeechStatusText("Listening to you...");
        if (onEndedCallback) onEndedCallback();
      });
    };
    utterance.onerror = () => {
      resolveAiSpeech(() => {
        setIsAiSpeaking(false);
        if (onEndedCallback) onEndedCallback();
      });
    };
    window.speechSynthesis.speak(utterance);
  }, [armAiSpeechWatchdog, resolveAiSpeech, setSpeechStatusText]);

  // Audible Speech Engine (Sarvam bulbul:v3 with fallback)
  const speakTextAudible = useCallback(async (text: string, langCode = "en-IN", onEndedCallback?: () => void, tone: string = "neutral") => {
    if (!isSpeakerOn) {
      if (onEndedCallback) onEndedCallback();
      return;
    }

    stopCurrentAudio();
    stopLiveListening();
    setIsAiSpeaking(true);
    setSpeechStatusText("AI speaking...");

    try {
      const res = await fetch("/api/ai-demo/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "tts",
          text,
          languageCode: langCode || "en-IN",
          speaker: selectedSpeakerRef.current || selectedSpeaker || "ritu",
          tone,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          attachAiAnalyser(audio);
          currentAudioRef.current = audio;
          const resumeAfterAudio = () => {
            stopCurrentAudio();
            setIsAiSpeaking(false);
            setSpeechStatusText("Listening to you...");
            if (onEndedCallback) onEndedCallback();
          };
          audio.onended = () => resolveAiSpeech(resumeAfterAudio);
          audio.onerror = () => {
            resolveAiSpeech(() => fallbackBrowserSpeech(text, langCode, onEndedCallback));
          };
          audio.onloadedmetadata = () => {
            // Once the real duration is known, stop guessing — the watchdog
            // only needs to outlive actual playback by a small buffer, not a
            // blind worst-case timeout.
            if (isFinite(audio.duration) && audio.duration > 0) {
              armAiSpeechWatchdog(resumeAfterAudio, audio.duration * 1000 + 800);
            }
          };
          armAiSpeechWatchdog(resumeAfterAudio); // coarse ceiling until duration is known
          await audio.play();
          return;
        }
      }
    } catch (e) {
      console.warn("Sarvam TTS error fallback:", e);
    }

    fallbackBrowserSpeech(text, langCode, onEndedCallback);
  }, [armAiSpeechWatchdog, attachAiAnalyser, fallbackBrowserSpeech, isSpeakerOn, resolveAiSpeech, selectedSpeaker, selectedSpeakerRef, setSpeechStatusText, stopCurrentAudio, stopLiveListening]);

  // ─── Streamed reply audio: sequential chunk player ──────────────────────
  // The streaming chat response (doctors-clinics voice turns) delivers TTS
  // audio as a queue of per-sentence clips instead of one complete blob, so
  // the first sentence can start playing while later ones are still being
  // synthesized. This plays them back-to-back in order, reusing the same
  // watchdog/resolve pattern as the single-clip player above so a dropped
  // "ended" event still can't strand the mic.
  const audioChunkQueueRef = useRef<string[]>([]);
  const audioChunkStreamDoneRef = useRef<boolean>(false);
  const isChunkPlayingRef = useRef<boolean>(false);
  const onAllAudioChunksDoneRef = useRef<(() => void) | null>(null);

  const resetAudioStreamState = useCallback(() => {
    audioChunkQueueRef.current = [];
    audioChunkStreamDoneRef.current = false;
    onAllAudioChunksDoneRef.current = null;
    isChunkPlayingRef.current = false;
  }, []);

  const playNextQueuedChunk = useCallback(() => {
    if (isChunkPlayingRef.current) return;
    const next = audioChunkQueueRef.current.shift();
    if (!next) {
      if (audioChunkStreamDoneRef.current) {
        const cb = onAllAudioChunksDoneRef.current;
        onAllAudioChunksDoneRef.current = null;
        if (cb) cb();
      }
      return;
    }
    isChunkPlayingRef.current = true;
    stopCurrentAudio();
    setIsAiSpeaking(true);
    setSpeechStatusText("AI speaking...");
    try {
      const audio = new Audio(`data:audio/wav;base64,${next}`);
      attachAiAnalyser(audio);
      currentAudioRef.current = audio;
      const advance = () => {
        isChunkPlayingRef.current = false;
        playNextQueuedChunk();
      };
      audio.onended = () => resolveAiSpeech(advance);
      audio.onerror = () => resolveAiSpeech(advance); // skip a bad chunk, keep the sequence going
      audio.onloadedmetadata = () => {
        if (isFinite(audio.duration) && audio.duration > 0) {
          armAiSpeechWatchdog(advance, audio.duration * 1000 + 800);
        }
      };
      armAiSpeechWatchdog(advance);
      audio.play().catch(() => resolveAiSpeech(advance));
    } catch {
      isChunkPlayingRef.current = false;
      playNextQueuedChunk();
    }
  }, [armAiSpeechWatchdog, attachAiAnalyser, resolveAiSpeech, setSpeechStatusText, stopCurrentAudio]);

  const enqueueAudioChunk = useCallback((audioBase64: string) => {
    audioChunkQueueRef.current.push(audioBase64);
    playNextQueuedChunk();
  }, [playNextQueuedChunk]);

  // Call once the "done" event arrives — runs onAllDone immediately if every
  // queued chunk has already finished playing, otherwise defers it until the
  // last one does.
  const finishAudioStream = useCallback((onAllDone: () => void) => {
    audioChunkStreamDoneRef.current = true;
    if (audioChunkQueueRef.current.length === 0 && !isChunkPlayingRef.current) {
      onAllDone();
    } else {
      onAllAudioChunksDoneRef.current = onAllDone;
    }
  }, []);

  return {
    isAiSpeaking,
    setIsAiSpeaking,
    aiAnalyserRef,
    currentAudioRef,
    stopCurrentAudio,
    attachAiAnalyser,
    armAiSpeechWatchdog,
    resolveAiSpeech,
    fallbackBrowserSpeech,
    speakTextAudible,
    resetAudioStreamState,
    enqueueAudioChunk,
    finishAudioStream,
  };
}

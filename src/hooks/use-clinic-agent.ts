"use client";

// Connects the browser to the clinic receptionist (a LiveKit agent running on
// LiveKit Cloud) for a voice call or a text chat, and exposes everything the
// widget shows: transcript, agent state, live activity, booking, audio levels.

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConnectionState,
  Room,
  RoomEvent,
  Track,
  type Participant,
  type RemoteParticipant,
  type RemoteTrack,
  type TextStreamReader,
} from "livekit-client";
import {
  parseAgentEvent,
  upsertLine,
  type BookingEvent,
  type TranscriptLine,
} from "@/lib/agentTranscript";

export type SessionMode = "voice" | "chat";
export type SessionStatus = "idle" | "connecting" | "connected" | "ended" | "error";
export type AgentState = "initializing" | "listening" | "thinking" | "speaking";

export interface ActivityItem {
  id: number;
  label: string;
  ok: boolean;
  time: string;
}

const EVENTS_TOPIC = "clinic.events";
const TRANSCRIPTION_TOPIC = "lk.transcription";
const CHAT_TOPIC = "lk.chat";
const AGENT_JOIN_TIMEOUT_MS = 20_000;
const MAX_SESSION_MS = 11 * 60_000; // the agent ends sessions at 10 min; this is a backstop

const isAgent = (p: Participant) => p.isAgent || p.identity.startsWith("agent-");

function clock(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function friendlyError(err: unknown): string {
  const name = err instanceof Error ? err.name : "";
  if (name === "NotAllowedError" || name === "SecurityError") {
    return "Microphone access was blocked. Allow the microphone in your browser and try again, or use chat.";
  }
  if (name === "NotFoundError") return "No microphone was found on this device. You can use chat instead.";
  return err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.";
}

export function useClinicAgent() {
  const [mode, setMode] = useState<SessionMode>("voice");
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [agentState, setAgentState] = useState<AgentState>("initializing");
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [booking, setBooking] = useState<BookingEvent | null>(null);
  const [language, setLanguage] = useState("en-IN");
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [emergency, setEmergency] = useState(false);

  const roomRef = useRef<Room | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioElsRef = useRef<HTMLMediaElement[]>([]);
  const userAnalyserRef = useRef<AnalyserNode | null>(null);
  const aiAnalyserRef = useRef<AnalyserNode | null>(null);
  const timersRef = useRef<number[]>([]);
  const agentReadyRef = useRef<Promise<void> | null>(null);
  const activityIdRef = useRef(0);
  const localLineIdRef = useRef(0);

  const makeAnalyser = useCallback((mediaTrack: MediaStreamTrack) => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current ?? new Ctx();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") void ctx.resume();
      const source = ctx.createMediaStreamSource(new MediaStream([mediaTrack]));
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.6;
      source.connect(analyser); // analysis only; playback goes through the <audio> element
      return analyser;
    } catch {
      return null;
    }
  }, []);

  const cleanup = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    audioElsRef.current.forEach((el) => el.remove());
    audioElsRef.current = [];
    userAnalyserRef.current = null;
    aiAnalyserRef.current = null;
    if (audioCtxRef.current) {
      void audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    agentReadyRef.current = null;
    setUserSpeaking(false);
  }, []);

  const stop = useCallback(async () => {
    const room = roomRef.current;
    roomRef.current = null;
    if (room) await room.disconnect();
    cleanup();
    setStatus((s) => (s === "error" ? s : s === "idle" ? "idle" : "ended"));
  }, [cleanup]);

  const reset = useCallback(async () => {
    await stop();
    setStatus("idle");
    setLines([]);
    setActivity([]);
    setBooking(null);
    setLanguage("en-IN");
    setError(null);
    setElapsed(0);
    setEmergency(false);
    setAgentState("initializing");
    setMuted(false);
  }, [stop]);

  const addLocalLine = useCallback((text: string) => {
    localLineIdRef.current += 1;
    const id = `typed-${localLineIdRef.current}`;
    setLines((ls) => upsertLine(ls, { id, speaker: "user", text, final: true, at: Date.now() }));
  }, []);

  const start = useCallback(
    async (nextMode: SessionMode) => {
      if (roomRef.current) await stop();
      setMode(nextMode);
      setStatus("connecting");
      setError(null);
      setLines([]);
      setActivity([]);
      setBooking(null);
      setEmergency(false);
      setLanguage("en-IN");
      setAgentState("initializing");
      setElapsed(0);
      setMuted(false);

      try {
        const res = await fetch("/api/livekit-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: nextMode }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.token) {
          throw new Error(data.error || "The assistant is unavailable right now. Please try again shortly.");
        }

        const room = new Room({
          adaptiveStream: false,
          dynacast: false,
          audioCaptureDefaults: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        });
        roomRef.current = room;

        let resolveAgent: () => void = () => {};
        agentReadyRef.current = new Promise<void>((r) => (resolveAgent = r));

        room.registerTextStreamHandler(TRANSCRIPTION_TOPIC, async (reader: TextStreamReader, from) => {
          const attrs = reader.info.attributes || {};
          const id = attrs["lk.segment_id"] || reader.info.id;
          const speaker = from.identity === room.localParticipant.identity ? "user" : "ai";
          const at = Date.now();
          let text = "";
          try {
            for await (const chunk of reader) {
              text += chunk;
              setLines((ls) => upsertLine(ls, { id, speaker, text, final: false, at }));
            }
          } catch {
            // stream cut off (e.g. interruption); keep what arrived
          }
          if (speaker === "ai") resolveAgent();
          setLines((ls) =>
            upsertLine(ls, { id, speaker, text, final: attrs["lk.transcription_final"] !== "false", at }),
          );
        });

        room.registerTextStreamHandler(EVENTS_TOPIC, async (reader: TextStreamReader) => {
          const ev = parseAgentEvent(await reader.readAll());
          if (!ev) return;
          if (ev.type === "tool") {
            activityIdRef.current += 1;
            const item = { id: activityIdRef.current, label: ev.label, ok: ev.ok, time: clock() };
            setActivity((a) => [...a, item].slice(-20));
            if (ev.name === "report_emergency") setEmergency(true);
          } else if (ev.type === "booking") {
            setBooking(ev);
          } else if (ev.type === "language") {
            setLanguage(ev.code);
          }
        });

        room
          .on(RoomEvent.TrackSubscribed, (track: RemoteTrack, _pub, participant: RemoteParticipant) => {
            if (track.kind !== Track.Kind.Audio || !isAgent(participant)) return;
            const el = track.attach();
            el.style.display = "none";
            document.body.appendChild(el);
            audioElsRef.current.push(el);
            aiAnalyserRef.current = makeAnalyser(track.mediaStreamTrack);
          })
          .on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
            track.detach().forEach((el) => {
              el.remove();
              audioElsRef.current = audioElsRef.current.filter((x) => x !== el);
            });
          })
          .on(RoomEvent.ParticipantAttributesChanged, (_changed, participant: Participant) => {
            const state = participant.attributes["lk.agent.state"];
            if (isAgent(participant) && state) setAgentState(state as AgentState);
          })
          .on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
            if (!isAgent(participant)) return;
            const state = participant.attributes["lk.agent.state"];
            if (state) setAgentState(state as AgentState);
          })
          .on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
            if (isAgent(participant) && roomRef.current === room) void stop();
          })
          .on(RoomEvent.ActiveSpeakersChanged, (speakers: Participant[]) => {
            setUserSpeaking(speakers.some((s) => s.isLocal));
          })
          .on(RoomEvent.Disconnected, () => {
            if (roomRef.current === room) {
              roomRef.current = null;
              cleanup();
              setStatus((s) => (s === "error" ? s : "ended"));
            }
          });

        await room.connect(data.serverUrl, data.token);

        if (nextMode === "voice") {
          await room.localParticipant.setMicrophoneEnabled(true);
          const mic = room.localParticipant.getTrackPublication(Track.Source.Microphone)?.track;
          if (mic?.mediaStreamTrack) userAnalyserRef.current = makeAnalyser(mic.mediaStreamTrack);
          await room.startAudio();
        }

        const agentAlreadyHere = Array.from(room.remoteParticipants.values()).some(isAgent);
        const agentJoined = agentAlreadyHere
          ? Promise.resolve(true)
          : new Promise<boolean>((resolve) => {
              const onJoin = (p: RemoteParticipant) => {
                if (isAgent(p)) {
                  room.off(RoomEvent.ParticipantConnected, onJoin);
                  resolve(true);
                }
              };
              room.on(RoomEvent.ParticipantConnected, onJoin);
              timersRef.current.push(window.setTimeout(() => resolve(false), AGENT_JOIN_TIMEOUT_MS));
            });
        if (!(await agentJoined)) {
          throw new Error("The receptionist didn't pick up. Please try again in a minute.");
        }
        if (roomRef.current !== room) return; // stopped meanwhile

        setStatus("connected");
        const startedAt = Date.now();
        const tick = () => {
          if (roomRef.current !== room) return;
          const secs = Math.floor((Date.now() - startedAt) / 1000);
          setElapsed(secs);
          if (Date.now() - startedAt > MAX_SESSION_MS) {
            void stop();
            return;
          }
          timersRef.current.push(window.setTimeout(tick, 1000));
        };
        tick();
      } catch (err) {
        const room = roomRef.current;
        roomRef.current = null;
        if (room) await room.disconnect();
        cleanup();
        setError(friendlyError(err));
        setStatus("error");
      }
    },
    [cleanup, makeAnalyser, stop],
  );

  /** Send a typed message. In chat mode the first message starts the session. */
  const sendText = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, 500);
      if (!text) return;
      if (!roomRef.current) {
        await start("chat");
      }
      const room = roomRef.current;
      if (!room || room.state !== ConnectionState.Connected) return;
      // Let the greeting arrive first so the conversation reads in order.
      if (agentReadyRef.current) {
        await Promise.race([agentReadyRef.current, new Promise((r) => setTimeout(r, 6000))]);
      }
      addLocalLine(text);
      try {
        await room.localParticipant.sendText(text, { topic: CHAT_TOPIC });
      } catch {
        setError("Your message couldn't be sent. Please try again.");
      }
    },
    [addLocalLine, start],
  );

  const toggleMute = useCallback(async () => {
    const room = roomRef.current;
    if (!room) return;
    const next = !muted;
    await room.localParticipant.setMicrophoneEnabled(!next);
    setMuted(next);
  }, [muted]);

  useEffect(() => {
    return () => {
      const room = roomRef.current;
      roomRef.current = null;
      if (room) void room.disconnect();
      cleanup();
    };
  }, [cleanup]);

  return {
    mode,
    status,
    agentState,
    lines,
    activity,
    booking,
    language,
    error,
    muted,
    userSpeaking,
    elapsed,
    emergency,
    userAnalyserRef,
    aiAnalyserRef,
    start,
    stop,
    reset,
    sendText,
    toggleMute,
    setMode,
  };
}

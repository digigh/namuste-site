"use client";

// /agent-live — "Agent Live": a full-screen, high-energy hero experience for
// event booths. Reuses the exact same backend plumbing as ClinicLiveAgent
// (useClinicAgent() + /api/livekit-token's clinic/salon/agri industry
// branching) but presents it as a character-first, futuristic showcase
// instead of a 3-panel dashboard. Deliberately a separate component/page —
// doctors-and-clinics, the homepage, and dentist_reach keep using
// ClinicLiveAgent untouched.
//
// The idle/attract state is a free-roam playground, not a static page: Namo
// (one mounted character, reused — see src/components/namo/) flies between
// random spots on the WHOLE screen in a small positioned box driven by
// framer-motion, leaving a portal-ring flash + comet trail behind it, and
// — while "landed" between flights — uses its own native walk/run/jump/
// point/emote API for local flavor. Each "discover" beat spawns a floating
// hologram card near wherever it's currently standing, instead of fixed
// always-on corner cards, so the showcase reads as something Namo is doing
// rather than UI chrome sitting on top of it. The moment someone taps the
// mic, Namo docks to a stable stage spot and everything becomes the real,
// working voice/chat agent underneath (unchanged).

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Stethoscope, Scissors, Sprout, Mic, MicOff, PhoneOff, Send, ChevronDown, Tag,
  Languages, CalendarCheck, Clock, ShieldAlert, Sparkles, Users, Headset,
  Radio, Activity, CheckCircle2, XCircle, MessageSquare, X,
} from "lucide-react";
import Namo from "@/components/namo/Namo";
import type { NamoEmote, NamoInstance, NamoMood, NamoState } from "@/components/namo/namo.d";
import { useClinicAgent } from "@/hooks/use-clinic-agent";
import { formatDuration, languageName } from "@/lib/agentTranscript";
import { NAMO_EXPERIENCE_CSS } from "@/components/namoExperienceStyles";
import ThemeToggle from "@/components/ThemeToggle";

type IndustryId = "clinic" | "salon" | "agri";
type Point = { x: number; y: number };

const INDUSTRIES: Record<IndustryId, { label: string; receptionist: string; icon: React.ReactNode; placeholder: string }> = {
  clinic: { label: "Clinic", receptionist: "Ritu", icon: <Stethoscope size={14} />, placeholder: "Ask about an appointment…" },
  salon: { label: "Salon", receptionist: "Riya", icon: <Scissors size={14} />, placeholder: "Ask about a booking…" },
  agri: { label: "Agri", receptionist: "Priya", icon: <Sprout size={14} />, placeholder: "Ask about a crop or order…" },
};

const STATUS_LABEL: Record<string, string> = {
  idle: "Tap to talk",
  connecting: "Connecting…",
  connected: "",
  ended: "Call ended",
  error: "Something went wrong",
};

// What Namo "discovers" and shows off while roaming — one flattened pool,
// picked at random so the floating holograms never repeat predictably.
type CapFact = { icon: React.ReactNode; title: string; sub: string };
const CAPABILITY_FACTS: CapFact[] = [
  { icon: <Languages size={16} />, title: "10+ languages", sub: "Hindi, Tamil, Telugu, Bengali & more" },
  { icon: <Sparkles size={16} />, title: "Switches instantly", sub: "Follows the caller, mid-sentence" },
  { icon: <CalendarCheck size={16} />, title: "Real bookings", sub: "Checks live availability, in real time" },
  { icon: <Users size={16} />, title: "Never double-books", sub: "Reads every detail back before confirming" },
  { icon: <Clock size={16} />, title: "Always on", sub: "24×7, no hold music, ever" },
  { icon: <Headset size={16} />, title: "Voice or chat", sub: "Same brain, either channel" },
  { icon: <ShieldAlert size={16} />, title: "Safety first", sub: "Flags real emergencies immediately" },
  { icon: <ShieldAlert size={16} />, title: "Never guesses", sub: "No diagnosis, no prescriptions" },
];

// Salon sends a BCP-47 code (same convention clinic uses); agri sends an
// already-human-readable name. Only run the code->name lookup when it looks
// like a code, so agri's "Hindi" doesn't get mangled.
function resolveLanguageLabel(liveFields: Record<string, string>, fallbackCode: string): string {
  const raw = liveFields.language;
  if (!raw) return languageName(fallbackCode);
  return /^[a-z]{2,3}-[A-Z]{2}$/.test(raw) ? languageName(raw) : raw;
}

// "order_number" -> "Order number", "quoteTotal" -> "Quote total"
function prettyFieldLabel(key: string): string {
  const spaced = key.replace(/_/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

// Keys already shown elsewhere in the panel (language row, mode/channel
// badge) or too internal to surface (raw status strings duplicate the
// caption/status line above).
const LIVE_FIELD_SKIP_KEYS = new Set(["language", "channel", "mode", "status", "agent"]);

function toNamoState(status: string, agentState: string): NamoState {
  if (status === "error") return "error";
  if (status === "idle" || status === "ended") return "idle";
  if (agentState === "listening") return "listening";
  if (agentState === "speaking") return "speaking";
  return "thinking";
}

// Local-flavor moves while landed between flights, and the feeling/body-
// language emotes mixed in with them — real namo.js locomotion, not CSS.
const CARD_EMOTES: readonly NamoEmote[] = ["info", "calendar", "pin", "clock", "search", "chart", "chat"];
const FEEL_EMOTES: readonly NamoEmote[] = ["wave", "namaste", "dance", "cheer", "love", "shy", "zap", "stretch"];
const BODY_EMOTES: readonly NamoEmote[] = ["nod", "shake", "shrug", "clap"];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

// Keep Namo's flight spots clear of the HUD bar/pills (top), and the
// floating controls/panels (bottom) — a generous safe band in the middle.
function pickRoamTarget(): Point {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return { x: w * (0.12 + Math.random() * 0.76), y: h * (0.22 + Math.random() * 0.46) };
}

let portalSeq = 0;
let holoSeq = 0;

export default function NamoExperience() {
  const [industry, setIndustry] = useState<IndustryId>("clinic");
  const [showTranscript, setShowTranscript] = useState(false);
  const [draft, setDraft] = useState("");
  const [panelClosed, setPanelClosed] = useState(false);

  const agent = useClinicAgent();
  const {
    mode, status, agentState, lines, activity, booking, language, liveFields, error,
    muted, userSpeaking, elapsed, emergency, aiAnalyserRef,
    start, stop, sendText, toggleMute, setMode,
  } = agent;

  const namoApi = useRef<NamoInstance | null>(null);
  const lastHoverReactRef = useRef(0);
  const levelRafRef = useRef<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const [target, setTarget] = useState<Point | null>(null);
  const targetRef = useRef<Point | null>(null);
  const [flying, setFlying] = useState(false);
  const [portals, setPortals] = useState<{ id: number; x: number; y: number }[]>([]);
  const [holograms, setHolograms] = useState<{ id: number; x: number; y: number; fact: CapFact }[]>([]);

  const applyTarget = (t: Point) => {
    targetRef.current = t;
    setTarget(t);
  };

  const spawnPortal = (x: number, y: number) => {
    portalSeq += 1;
    const id = portalSeq;
    setPortals((p) => [...p.slice(-3), { id, x, y }]);
    window.setTimeout(() => setPortals((p) => p.filter((b) => b.id !== id)), 750);
  };

  const spawnHologram = (x: number, y: number) => {
    holoSeq += 1;
    const id = holoSeq;
    const fact = pick(CAPABILITY_FACTS);
    const w = window.innerWidth;
    const h = window.innerHeight;
    const offX = (Math.random() < 0.5 ? -1 : 1) * (90 + Math.random() * 50);
    const cx = Math.min(Math.max(x + offX, 115), w - 115);
    const cy = Math.min(Math.max(y - 90, 90), h - 140);
    setHolograms((hs) => [...hs.slice(-2), { id, x: cx, y: cy, fact }]);
    window.setTimeout(() => setHolograms((hs) => hs.filter((hh) => hh.id !== id)), 4200);
  };

  // Drive Namo's state from the agent state, imperatively — avoids a React
  // re-render every animation frame for the loudness level below.
  useEffect(() => {
    namoApi.current?.setState(toNamoState(status, agentState));
  }, [status, agentState]);

  // Loudness -> mouth/glow, read straight from the hook's own analyser
  // (same AnalyserNode the rest of the widget already sets up — no second
  // audio graph). Mirrors the pattern in namo-kit's livekit-example.jsx.
  useEffect(() => {
    const tick = () => {
      const analyser = aiAnalyserRef.current;
      if (analyser && agentState === "speaking") {
        const buf = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (const v of buf) sum += (v - 128) ** 2;
        namoApi.current?.setLevel(Math.min(1, Math.sqrt(sum / buf.length) / 40));
      } else {
        namoApi.current?.setLevel(0);
      }
      levelRafRef.current = requestAnimationFrame(tick);
    };
    levelRafRef.current = requestAnimationFrame(tick);
    return () => {
      if (levelRafRef.current) cancelAnimationFrame(levelRafRef.current);
    };
  }, [aiAnalyserRef, agentState]);

  // Chat mode has no live audio to drive the mouth from — fall back to
  // Namo's own text lip-sync (say()) for each new AI line.
  const lastSaidIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (mode !== "chat") return;
    const lastAi = [...lines].reverse().find((l) => l.speaker === "ai");
    if (lastAi && lastAi.id !== lastSaidIdRef.current) {
      lastSaidIdRef.current = lastAi.id;
      namoApi.current?.say(lastAi.text, { mood: "friendly" });
    }
  }, [lines, mode]);

  // Call lifecycle beats — a greeting when connected, a wave when it ends,
  // a "processing" ring while dialing. A fresh call also reopens the data
  // panel even if it was closed from a previous one.
  const prevStatusRef = useRef(status);
  useEffect(() => {
    if (prevStatusRef.current !== status) {
      if (status === "connecting") {
        namoApi.current?.emote("process");
        window.setTimeout(() => setPanelClosed(false), 0);
      }
      if (status === "connected") namoApi.current?.emote("namaste");
      if (status === "ended") namoApi.current?.emote("wave");
    }
    prevStatusRef.current = status;
  }, [status]);

  // The caller is actively talking — give Namo an attentive nod.
  useEffect(() => {
    if (userSpeaking) namoApi.current?.emote("nod");
  }, [userSpeaking]);

  // Every live "captured" event (tool call) gets an instant reaction on
  // Namo's face, not just a line in the side panel.
  const lastActivityIdRef = useRef<number | null>(null);
  useEffect(() => {
    const latest = activity[activity.length - 1];
    if (latest && latest.id !== lastActivityIdRef.current) {
      lastActivityIdRef.current = latest.id;
      namoApi.current?.emote(latest.ok ? "check" : "sorry");
    }
  }, [activity]);

  // A booking just landed — show it on Namo's own face/props, not just in a
  // card: the calendar prop, then a beat later the done checkmark.
  const lastBookingRef = useRef<string | null>(null);
  useEffect(() => {
    if (booking && booking.reference !== lastBookingRef.current) {
      lastBookingRef.current = booking.reference;
      namoApi.current?.emote("calendar");
      window.setTimeout(() => namoApi.current?.emote("check"), 900);
    }
  }, [booking]);

  // A real emergency was flagged — one sharp reaction, not repeated on
  // every re-render while it stays true.
  const emergencyFiredRef = useRef(false);
  useEffect(() => {
    if (emergency && !emergencyFiredRef.current) {
      emergencyFiredRef.current = true;
      namoApi.current?.emote("shake");
    }
    if (!emergency) emergencyFiredRef.current = false;
  }, [emergency]);

  const lastAiLine = [...lines].reverse().find((l) => l.speaker === "ai");
  const connected = status === "connected";
  const busy = status === "connecting";
  const roaming = status === "idle" || status === "ended";
  const mood: NamoMood = emergency ? "caring" : connected ? "confident" : "friendly";

  const dockTarget = (): Point => {
    const r = dockRef.current?.getBoundingClientRect();
    if (!r) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  // Dock Namo over the stage spacer the instant a real conversation starts
  // (and keep it centred there across a resize) — mirrors the free-roam
  // targeting so docking is just "stop picking new spots."
  useEffect(() => {
    if (roaming) return;
    const sync = () => applyTarget(dockTarget());
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [roaming]);

  // The free-roam playground loop: land somewhere, do a couple of real
  // namo.js moves/emotes (and occasionally pop a hologram of what it can
  // do), then fly — portal flash, comet trail, relocate, portal flash,
  // landing jump — to a brand new spot on the whole screen. Only while
  // idle/attract; stops the instant a call starts.
  useEffect(() => {
    if (!roaming) {
      namoApi.current?.stopWalk();
      namoApi.current?.walkTo(0);
      window.setTimeout(() => setFlying(false), 0);
      return;
    }

    let cancelled = false;
    const loop = async () => {
      if (!targetRef.current) applyTarget(pickRoamTarget());
      while (!cancelled) {
        const api = namoApi.current;
        if (!api) {
          await wait(300);
          continue;
        }

        const beats = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < beats && !cancelled; i++) {
          const roll = Math.random();
          try {
            if (roll < 0.3) {
              const x = -45 + Math.random() * 90;
              if (Math.random() < 0.5) await api.run(x);
              else await api.walkTo(x);
              if (cancelled) break;
              api.jump(Math.random() < 0.3);
            } else if (roll < 0.45) {
              api.point(Math.random() < 0.5 ? "left" : "right");
            } else if (roll < 0.8) {
              api.emote(pick(CARD_EMOTES));
              if (targetRef.current) spawnHologram(targetRef.current.x, targetRef.current.y);
            } else {
              api.emote(pick(Math.random() < 0.5 ? FEEL_EMOTES : BODY_EMOTES));
            }
          } catch {
            // Namo may be mid-destroy on a fast state flip — just skip this beat.
          }
          if (cancelled) break;
          await wait(500 + Math.random() * 500);
        }
        if (cancelled) break;

        // Flight: portal out, relocate across the whole screen, portal in.
        const from = targetRef.current ?? pickRoamTarget();
        spawnPortal(from.x, from.y);
        api.emote("zap");
        setFlying(true);
        await wait(140);
        if (cancelled) break;
        const to = pickRoamTarget();
        applyTarget(to);
        await wait(650);
        setFlying(false);
        if (cancelled) break;
        spawnPortal(to.x, to.y);
        api.jump(true);
        spawnHologram(to.x, to.y);
        await wait(700 + Math.random() * 500);
      }
    };
    const kickoff = window.setTimeout(loop, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(kickoff);
    };
  }, [roaming]);

  const switchIndustry = async (next: IndustryId) => {
    if (next === industry) return;
    if (status !== "idle" && status !== "ended") await stop();
    setIndustry(next);
    namoApi.current?.emote("wave");
  };

  const onStartCall = () => {
    namoApi.current?.emote("zap");
    void start("voice", industry);
  };

  const onSend = async () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    await sendText(text, industry);
  };

  const voiceLabel = userSpeaking
    ? "You're speaking"
    : agentState === "speaking"
      ? `${INDUSTRIES[industry].receptionist} is speaking`
      : agentState === "listening"
        ? "Listening…"
        : "Thinking…";

  const liveFieldEntries = Object.entries(liveFields).filter(([key]) => !LIVE_FIELD_SKIP_KEYS.has(key));
  const hasCaptured = activity.length > 0 || !!booking || liveFieldEntries.length > 0;
  // Stays up after the call ends (so the recap doesn't vanish mid-glance) —
  // only a fresh call or the close button clears it.
  const showPanel = !panelClosed && (connected || busy || (status === "ended" && hasCaptured));

  return (
    <div className="namo-kiosk">
      <style>{NAMO_EXPERIENCE_CSS}</style>

      <div className="namo-bg-fx">
        <div className="namo-bg-blob namo-bg-blob-a" />
        <div className="namo-bg-blob namo-bg-blob-b" />
        <div className="namo-bg-grid" />
      </div>
      <Starfield />

      <div className="namo-hud-bar">
        <img src="/logo.png" alt="Namuste" className="brand-logo" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
        <span className="namo-live-badge">
          <span className="namo-live-dot" />
          Agent Live · event demo
        </span>
      </div>

      <FeatureTicker active={!connected} />

      <div className="namo-theme-toggle">
        <ThemeToggle />
      </div>

      {/* Namo's one mounted character — framer-motion flies the whole box
          to a new screen position between flavor beats; namo.js drives the
          actual walk/run/jump/emote animation while it's landed. */}
      {target && (
        <motion.div
          className={`namo-floor-wrap${roaming ? " is-interactive" : ""}${flying ? " is-flying" : ""}`}
          animate={{ left: target.x, top: target.y }}
          transition={flying ? { type: "spring", stiffness: 95, damping: 11 } : { type: "spring", stiffness: 140, damping: 18 }}
          onClick={() => {
            if (!roaming) return;
            namoApi.current?.react(pick(["surprised", "happy", "laugh"] as const));
            if (targetRef.current) spawnHologram(targetRef.current.x, targetRef.current.y);
          }}
          onHoverStart={() => {
            if (!roaming) return;
            const now = Date.now();
            if (now - lastHoverReactRef.current < 1200) return;
            lastHoverReactRef.current = now;
            namoApi.current?.emote(pick(["wave", "shy", "nod"] as const));
          }}
        >
          <div className="namo-trail">
            <span className="namo-trail-dot" />
            <span className="namo-trail-dot" />
            <span className="namo-trail-dot" />
            <span className="namo-trail-dot" />
          </div>
          <div className="namo-floor-ring" />
          <Namo
            className="namo-floor"
            mood={mood}
            options={{ tapToWalk: roaming, interactive: true, followPointer: true }}
            onReady={(api) => {
              namoApi.current = api;
            }}
          />
        </motion.div>
      )}

      {/* Portal-ring flashes at every departure/arrival point. */}
      <AnimatePresence>
        {portals.map((p) => (
          <motion.div
            key={p.id}
            className="namo-portal"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1.3, 1.7] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Floating capability holograms — spawned wherever Namo is
          currently standing, not pinned to fixed corners. */}
      <div className="namo-holo-layer">
        <AnimatePresence>
          {holograms.map((h) => (
            <motion.div
              key={h.id}
              className="namo-cap-card namo-holo-card"
              style={{ left: h.x, top: h.y }}
              initial={{ opacity: 0, scale: 0.3, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -6, 0] }}
              exit={{ opacity: 0, scale: 0.4, y: -14 }}
              transition={{
                opacity: { type: "spring", stiffness: 280, damping: 20 },
                scale: { type: "spring", stiffness: 280, damping: 20 },
                rotate: { type: "spring", stiffness: 280, damping: 20 },
                y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <span className="namo-cap-live-dot" />
              <span className="namo-cap-icon">{h.fact.icon}</span>
              <div>
                <div className="namo-cap-title">{h.fact.title}</div>
                <div className="namo-cap-sub">{h.fact.sub}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="namo-page">
        <div className="namo-industry-pills">
          {(Object.keys(INDUSTRIES) as IndustryId[]).map((id) => (
            <button
              key={id}
              className={`namo-pill${id === industry ? " is-active" : ""}`}
              disabled={busy}
              onClick={() => switchIndustry(id)}
            >
              {INDUSTRIES[id].icon}
              {INDUSTRIES[id].label}
            </button>
          ))}
        </div>

        {/* Empty spacer — this is what Namo docks over once a real call
            starts; its measured centre is the dock target above. */}
        <div className="namo-stage-spacer" ref={dockRef} />

        <AnimatePresence mode="wait">
          <motion.p
            key={lastAiLine?.id || "placeholder"}
            className="namo-caption"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {connected ? lastAiLine?.text || "" : `Talk to ${INDUSTRIES[industry].receptionist}, our ${INDUSTRIES[industry].label.toLowerCase()} AI receptionist.`}
          </motion.p>
        </AnimatePresence>

        <p className="namo-status">{connected ? "" : STATUS_LABEL[status]}</p>

        {error && <p className="namo-error">{error}</p>}

        <AnimatePresence>
          {booking && (
            <motion.div
              className="namo-booking-card"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="namo-booking-head">
                <Tag size={14} /> Booking confirmed
              </div>
              <div className="namo-booking-row"><span>Reference</span><b>{booking.reference}</b></div>
              {booking.date && <div className="namo-booking-row"><span>When</span><b>{booking.date}, {booking.time}</b></div>}
            </motion.div>
          )}
        </AnimatePresence>

        {connected && (
          <div className="namo-mode-switch">
            <button className={`namo-mode-btn${mode === "voice" ? " is-active" : ""}`} onClick={() => setMode("voice")}>
              Voice
            </button>
            <button className={`namo-mode-btn${mode === "chat" ? " is-active" : ""}`} onClick={() => setMode("chat")}>
              Chat
            </button>
          </div>
        )}

        {connected && mode === "chat" && (
          <div className="namo-chat-row">
            <input
              className="namo-chat-input"
              placeholder={INDUSTRIES[industry].placeholder}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void onSend();
              }}
            />
            <button className="namo-chat-send" aria-label="Send" onClick={() => void onSend()}>
              <Send size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Smart, always-reachable controls — a floating HUD dock, never
          buried under the roam animation or pushed around by page content. */}
      <div className="namo-hud-controls">
        {!connected && !busy && (
          <div className="namo-sonar-wrap">
            <span className="namo-sonar-ring" />
            <span className="namo-sonar-ring" />
            <span className="namo-sonar-ring" />
            <button className="namo-btn-round namo-btn-cta" aria-label="Start talking" onClick={onStartCall}>
              <Mic size={26} />
            </button>
          </div>
        )}

        {connected && mode === "voice" && (
          <>
            <button
              className={`namo-btn-round namo-btn-mute${muted ? " is-muted" : ""}`}
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
            >
              {muted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button className="namo-btn-round namo-btn-end" aria-label="End call" onClick={() => stop()}>
              <PhoneOff size={20} />
            </button>
          </>
        )}

        {connected && mode === "chat" && (
          <button className="namo-btn-round namo-btn-end" aria-label="End chat" onClick={() => stop()}>
            <PhoneOff size={20} />
          </button>
        )}
      </div>

      {/* Floating transcript drawer — bottom-left, mirrors the data panel
          on the right instead of pushing the centre column around. */}
      {lines.length > 0 && (
        <div className="namo-transcript-wrap">
          <AnimatePresence>
            {showTranscript && (
              <motion.div
                className="namo-transcript-drawer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="namo-transcript-list">
                  {lines.map((l) => (
                    <p key={l.id} className={`namo-transcript-line is-${l.speaker}`}>
                      <b>{l.speaker === "user" ? "you" : INDUSTRIES[industry].receptionist}</b>
                      {l.text}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button className="namo-transcript-fab" onClick={() => setShowTranscript((v) => !v)}>
            <MessageSquare size={14} />
            {showTranscript ? "Hide transcript" : "Transcript"}
            <motion.span animate={{ rotate: showTranscript ? 180 : 0 }} style={{ display: "flex" }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>
        </div>
      )}

      {/* Real-time data panel — what the agent has actually captured so
          far, live: language, channel, latest tool activity, and the
          booking as it fills in. Stays up after the call ends (so the
          recap doesn't vanish mid-glance) until closed or a new call
          starts. */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            className="namo-panel-wrap"
            initial={{ opacity: 0, x: 32, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 32, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="namo-panel">
              <div className="namo-panel-head">
                <span className="namo-panel-title"><Radio size={12} /> Live session data</span>
                <div className="namo-panel-head-right">
                  {status === "ended" ? (
                    <span className="namo-panel-ended-tag">Ended</span>
                  ) : (
                    <span className="namo-panel-timer">{formatDuration(elapsed)}</span>
                  )}
                  <button className="namo-panel-close" aria-label="Close" onClick={() => setPanelClosed(true)}>
                    <X size={12} />
                  </button>
                </div>
              </div>

              <div className="namo-panel-section">
                <div className="namo-panel-row">
                  <span>Receptionist</span>
                  <span className="namo-panel-chip">{INDUSTRIES[industry].icon}{INDUSTRIES[industry].receptionist}</span>
                </div>
                <div className="namo-panel-row">
                  <span>Channel</span>
                  <span className="namo-panel-chip">
                    {mode === "voice" ? <Mic size={11} /> : <MessageSquare size={11} />}
                    {mode === "voice" ? "Voice" : "Chat"}
                  </span>
                </div>
                <div className="namo-panel-row">
                  <span>Language</span>
                  <span className="namo-panel-chip"><Languages size={11} /> {resolveLanguageLabel(liveFields, language)}</span>
                </div>
                {connected && (
                  <div className="namo-panel-row">
                    <span>{voiceLabel}</span>
                    <span className="namo-panel-wave"><span /><span /><span /><span /></span>
                  </div>
                )}
              </div>

              <hr className="namo-panel-divider" />

              <div className="namo-panel-section">
                <span className="namo-panel-title" style={{ color: "var(--text-muted)" }}>
                  <Activity size={12} /> Captured live
                </span>
                {activity.length === 0 ? (
                  <p className="namo-panel-empty">Nothing captured yet — ask away.</p>
                ) : (
                  <div className="namo-panel-feed">
                    <AnimatePresence initial={false}>
                      {[...activity].reverse().slice(0, 6).map((item) => (
                        <motion.div
                          key={item.id}
                          className="namo-panel-feed-item"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          {item.ok ? <CheckCircle2 size={13} className="namo-panel-feed-ok" /> : <XCircle size={13} className="namo-panel-feed-bad" />}
                          <b>{item.label}</b>
                          <span>{item.time}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {booking && (
                  <motion.div
                    className="namo-panel-booking"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="namo-panel-row"><span><Tag size={12} /> Booking</span><b>{booking.reference}</b></div>
                    {booking.patient && <div className="namo-panel-row"><span>Patient</span><b>{booking.patient}</b></div>}
                    {booking.department && <div className="namo-panel-row"><span>Dept</span><b>{booking.department}</b></div>}
                    {booking.doctor && <div className="namo-panel-row"><span>With</span><b>{booking.doctor}</b></div>}
                    {booking.date && <div className="namo-panel-row"><span>When</span><b>{booking.date}, {booking.time}</b></div>}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Salon/agri's own captured fields (reference, stylist, crop,
                  order number, ...) — generic because each agent's own
                  schema differs; clinic keeps using the booking card above
                  instead, so this stays empty there. */}
              <AnimatePresence>
                {liveFieldEntries.length > 0 && (
                  <motion.div
                    className="namo-panel-booking"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="namo-panel-row"><span><Activity size={12} /> Captured details</span></div>
                    {liveFieldEntries.map(([key, value]) => (
                      <div className="namo-panel-row" key={key}>
                        <span>{prettyFieldLabel(key)}</span>
                        <b>{value}</b>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {emergency && (
                <div className="namo-panel-emergency">
                  <ShieldAlert size={14} /> Emergency flagged — escalating
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// A continuously-cycling slide-in banner — guarantees visible, legible
// motion on the page every few seconds regardless of how the roam dice
// rolls, independent of where Namo currently is.
function FeatureTicker({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setIndex((i) => i + 1), 3000);
    return () => window.clearInterval(id);
  }, [active]);
  if (!active) return null;
  const fact = CAPABILITY_FACTS[index % CAPABILITY_FACTS.length];
  return (
    <div className="namo-ticker-wrap">
      <AnimatePresence mode="wait">
        <motion.div
          key={index % CAPABILITY_FACTS.length}
          className="namo-ticker"
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -70, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <span className="namo-ticker-icon">{fact.icon}</span>
          <span className="namo-ticker-title">{fact.title}</span>
          <span className="namo-ticker-sub">{fact.sub}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// A handful of twinkling dots, scattered once per mount (not per render) so
// the "magical" ambience doesn't resample itself on every state change.
function Starfield() {
  // Empty on the server and on the very first client render (so SSR output
  // matches hydration exactly), filled in right after mount — avoids a
  // hydration mismatch from Math.random() differing between server/client.
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);
  useEffect(() => {
    const id = window.setTimeout(() => {
      setStars(
        Array.from({ length: 22 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 1.5 + Math.random() * 2,
          delay: Math.random() * 3.2,
          duration: 2.6 + Math.random() * 2,
        })),
      );
    }, 0);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="namo-stars">
      {stars.map((s) => (
        <span
          key={s.id}
          className="namo-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

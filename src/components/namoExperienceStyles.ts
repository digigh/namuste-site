// Scoped styles for /agent-live. Self-contained — does not touch aiDashStyles.ts
// (the existing dashboard pages' styling) so this page can be iterated on
// without any risk to doctors-and-clinics / the homepage / dentist_reach.
export const NAMO_EXPERIENCE_CSS = `
  @property --namo-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  @keyframes namoGlowPulse {
    0%, 100% { box-shadow: var(--shadow-subtle), 0 0 0 0 var(--green-glow); }
    50% { box-shadow: var(--shadow-subtle), 0 0 32px 6px var(--green-glow-strong); }
  }
  @keyframes namoLiveDot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: .45; }
  }
  @keyframes namoCtaGlow {
    0%, 100% { box-shadow: 0 10px 30px var(--green-glow-strong); }
    50% { box-shadow: 0 14px 48px 8px var(--green-glow-strong); }
  }
  @keyframes namoSonar {
    0% { transform: scale(.75); opacity: .55; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes namoBlobFloatA {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(50px, 60px) scale(1.15); }
  }
  @keyframes namoBlobFloatB {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-40px, -50px) scale(1.1); }
  }
  @keyframes namoCardSpin {
    to { --namo-angle: 360deg; }
  }
  @keyframes namoWaveBar {
    0%, 100% { height: 4px; }
    50% { height: 14px; }
  }
  @keyframes namoTwinkle {
    0%, 100% { opacity: .12; transform: scale(.6); }
    50% { opacity: .9; transform: scale(1); }
  }
  @keyframes namoTrailFade {
    0% { opacity: .65; transform: scale(1); }
    100% { opacity: 0; transform: scale(.2); }
  }

  .namo-kiosk {
    position: relative; min-height: 100vh; overflow: hidden;
    display: flex; flex-direction: column; align-items: center;
    background: var(--hero-bg-gradient);
  }

  /* ---------- ambient futuristic background: a living world, not a backdrop ---------- */
  .namo-bg-fx { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
  .namo-bg-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: .5; }
  .namo-bg-blob-a { width: 520px; height: 520px; left: -130px; top: -110px; background: radial-gradient(circle, var(--green-glow-strong), transparent 70%); animation: namoBlobFloatA 19s ease-in-out infinite; }
  .namo-bg-blob-b { width: 460px; height: 460px; right: -150px; bottom: -120px; background: radial-gradient(circle, var(--coral-bg), transparent 70%); animation: namoBlobFloatB 23s ease-in-out infinite; }
  .namo-bg-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 44px 44px; opacity: .14;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 35%, transparent 85%);
    -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 35%, transparent 85%);
  }
  .namo-stars { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .namo-star { position: absolute; border-radius: 50%; background: var(--green-luminous); animation: namoTwinkle 3.2s ease-in-out infinite; }

  /* ---------- HUD header ---------- */
  .namo-hud-bar { position: relative; z-index: 5; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 26px 0 0; }
  .namo-theme-toggle { position: fixed; top: 24px; right: 24px; z-index: 8; }
  .namo-live-badge {
    display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px 5px 9px; border-radius: 999px;
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
    font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--green);
  }
  .namo-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-luminous); box-shadow: 0 0 6px var(--green-luminous); animation: namoLiveDot 1.6s ease-in-out infinite; }

  /* ---------- Namo's free-roam character + its magic ---------- */
  .namo-floor-wrap { position: fixed; left: 0; top: 0; width: 230px; height: 230px; transform: translate(-50%, -50%); z-index: 3; pointer-events: none; }
  .namo-floor-wrap.is-interactive { pointer-events: auto; cursor: pointer; }

  /* ---------- continuously-cycling feature ticker ---------- */
  .namo-ticker-wrap { position: relative; z-index: 5; height: 0; width: 100%; max-width: 480px; display: flex; justify-content: center; overflow: visible; }
  .namo-ticker {
    position: absolute; top: 4px; display: flex; align-items: center; gap: 9px;
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
    border-radius: 999px; padding: 8px 18px 8px 10px; box-shadow: var(--shadow-subtle), 0 0 18px var(--green-glow);
    white-space: nowrap;
  }
  .namo-ticker-icon {
    flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--green-luminous), var(--green)); color: #fff;
  }
  .namo-ticker-title { font-size: 13px; font-weight: 700; color: var(--text-ivory); }
  .namo-ticker-sub { font-size: 12px; color: var(--text-muted); }
  @media (max-width: 640px) {
    .namo-ticker-sub { display: none; }
    .namo-ticker { padding: 7px 14px 7px 8px; }
  }
  .namo-floor-ring {
    position: absolute; left: 50%; bottom: 18px; width: 170px; height: 36px; transform: translateX(-50%);
    border-radius: 50%; background: radial-gradient(ellipse, var(--green-glow-strong), transparent 70%);
    filter: blur(2px); opacity: .8; transition: opacity .3s;
  }
  .namo-floor { width: 100%; height: 100%; position: relative; z-index: 1; }

  .namo-trail { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .2s; }
  .namo-floor-wrap.is-flying .namo-trail { opacity: 1; }
  .namo-trail-dot {
    position: absolute; left: 50%; top: 70%; width: 16px; height: 16px; margin: -8px 0 0 -8px;
    border-radius: 50%; background: radial-gradient(circle, var(--green-luminous), transparent 72%);
    animation: namoTrailFade .8s ease-out infinite;
  }
  .namo-trail-dot:nth-child(1) { animation-delay: 0s; }
  .namo-trail-dot:nth-child(2) { animation-delay: .12s; transform: scale(.85); }
  .namo-trail-dot:nth-child(3) { animation-delay: .24s; transform: scale(.65); }
  .namo-trail-dot:nth-child(4) { animation-delay: .36s; transform: scale(.45); }

  /* One-shot portal burst at departure/arrival points */
  .namo-portal {
    position: fixed; width: 150px; height: 150px; border-radius: 50%;
    transform: translate(-50%, -50%); pointer-events: none; z-index: 2;
    border: 3px solid var(--green-luminous);
    box-shadow: 0 0 46px 12px var(--green-glow-strong), inset 0 0 36px var(--green-glow-strong);
  }

  /* ---------- floating hologram capability cards (spawned where Namo stands) ---------- */
  .namo-holo-layer { position: fixed; inset: 0; z-index: 4; pointer-events: none; }
  .namo-cap-card {
    position: absolute; display: flex; align-items: center; gap: 12px;
    max-width: 200px; background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
    border-radius: 18px; padding: 12px 14px; overflow: hidden;
    animation: namoGlowPulse 3.4s ease-in-out infinite;
  }
  .namo-cap-card::before {
    content: ""; position: absolute; inset: -1px; border-radius: 18px; padding: 1px;
    background: conic-gradient(from var(--namo-angle), var(--green-luminous), transparent 28%, transparent 72%, var(--green-luminous));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    animation: namoCardSpin 5s linear infinite; opacity: .55; pointer-events: none;
  }
  .namo-holo-card { transform: translate(-50%, -100%); }
  .namo-cap-live-dot {
    position: absolute; top: 10px; right: 10px; width: 6px; height: 6px; border-radius: 50%;
    background: var(--green-luminous); box-shadow: 0 0 6px var(--green-luminous);
    animation: namoLiveDot 1.8s ease-in-out infinite;
  }
  .namo-cap-icon {
    flex-shrink: 0; width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    background: linear-gradient(135deg, var(--green-luminous), var(--green));
    color: #fff;
  }
  .namo-cap-title { font-size: 13px; font-weight: 600; color: var(--text-ivory); }
  .namo-cap-sub { font-size: 11px; color: var(--text-muted); line-height: 1.4; margin-top: 2px; }

  .namo-page { position: relative; z-index: 2; max-width: 480px; margin: 0 auto; padding: 8px 20px 160px; display: flex; flex-direction: column; align-items: center; gap: 24px; }

  .namo-industry-pills { position: relative; z-index: 5; display: flex; gap: 8px; }
  .namo-pill {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 999px;
    border: 1px solid var(--border); background: var(--surface);
    font-size: 13px; font-weight: 500; color: var(--text-muted);
    cursor: pointer; transition: border-color .15s, color .15s, background .15s;
  }
  .namo-pill.is-active { border-color: var(--border-green); color: var(--green); background: var(--green-glow); }
  .namo-pill:disabled { opacity: .5; cursor: not-allowed; }

  .namo-stage-spacer { width: 100%; height: 230px; }
  @media (max-width: 640px) { .namo-stage-spacer { height: 190px; } }

  .namo-caption {
    min-height: 44px; text-align: center; font-size: 16px; font-weight: 500; color: var(--text-ivory);
    max-width: 380px; line-height: 1.5;
  }
  .namo-status { font-size: 13px; color: var(--text-muted); text-align: center; }

  .namo-booking-card {
    width: 100%; background: var(--surface); border: 1px solid var(--border-green);
    border-radius: 16px; padding: 16px 18px; display: flex; flex-direction: column; gap: 8px;
  }
  .namo-booking-head { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--green); }
  .namo-booking-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); }
  .namo-booking-row b { color: var(--text-ivory); font-weight: 500; }

  /* ---------- smart floating controls: always reachable, never buried ---------- */
  .namo-hud-controls { position: fixed; left: 50%; bottom: 26px; transform: translateX(-50%); z-index: 9; display: flex; align-items: center; gap: 14px; }
  .namo-btn-round {
    width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .1s; box-shadow: 0 6px 20px rgba(0,0,0,.25);
  }
  .namo-btn-round:active { transform: scale(0.94); }
  .namo-btn-end { background: var(--coral); color: #fff; }
  .namo-btn-mute { background: var(--surface2); color: var(--text-ivory); border: 1px solid var(--border); width: 46px; height: 46px; }
  .namo-btn-mute.is-muted { background: var(--coral-bg); color: var(--coral); }

  .namo-sonar-wrap { position: relative; display: inline-flex; align-items: center; justify-content: center; }
  .namo-sonar-ring { position: absolute; inset: 0; margin: auto; width: 72px; height: 72px; border-radius: 50%; border: 2px solid var(--green); opacity: 0; animation: namoSonar 2.6s ease-out infinite; pointer-events: none; }
  .namo-sonar-ring:nth-child(2) { animation-delay: .85s; }
  .namo-sonar-ring:nth-child(3) { animation-delay: 1.7s; }
  .namo-btn-cta {
    position: relative; width: 72px; height: 72px;
    background: linear-gradient(135deg, var(--green-luminous), var(--green)); color: #06130b;
    animation: namoCtaGlow 2.1s ease-in-out infinite; z-index: 1;
  }

  .namo-mode-switch { display: flex; gap: 4px; background: var(--surface2); border-radius: 999px; padding: 3px; }
  .namo-mode-btn { border: none; background: transparent; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 500; color: var(--text-muted); cursor: pointer; }
  .namo-mode-btn.is-active { background: var(--surface); color: var(--text-ivory); }

  .namo-chat-row { display: flex; gap: 8px; width: 100%; }
  .namo-chat-input {
    flex: 1; border-radius: 999px; border: 1px solid var(--border); background: var(--surface);
    padding: 10px 16px; font-size: 14px; color: var(--text-ivory); outline: none;
  }
  .namo-chat-input:focus { border-color: var(--border-green); }
  .namo-chat-send { border: none; background: var(--green); color: #fff; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }

  .namo-error { font-size: 13px; color: var(--coral); text-align: center; max-width: 360px; }

  /* ---------- floating transcript drawer (bottom-left, mirrors the data panel) ---------- */
  .namo-transcript-wrap { position: fixed; left: 18px; bottom: 18px; z-index: 6; width: min(92vw, 300px); display: flex; flex-direction: column-reverse; gap: 10px; }
  .namo-transcript-fab {
    align-self: flex-start; display: flex; align-items: center; gap: 7px;
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
    border-radius: 999px; padding: 9px 14px; font-size: 12.5px; font-weight: 600; color: var(--text-ivory);
    cursor: pointer; box-shadow: var(--shadow-subtle);
  }
  .namo-transcript-drawer {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
    border-radius: 18px; padding: 12px 14px; box-shadow: var(--shadow-subtle), 0 0 24px var(--green-glow);
    overflow: hidden;
  }
  .namo-transcript-list { display: flex; flex-direction: column; gap: 8px; max-height: 42vh; overflow-y: auto; }
  .namo-transcript-line { font-size: 13px; line-height: 1.5; }
  .namo-transcript-line.is-user { color: var(--text-ivory); }
  .namo-transcript-line.is-ai { color: var(--text-muted); }
  .namo-transcript-line b { font-weight: 600; color: var(--green); margin-right: 4px; }
  @media (max-width: 640px) { .namo-transcript-wrap { left: 12px; bottom: 100px; width: min(94vw, 250px); } }

  /* ---------- real-time data panel (bottom-right) ---------- */
  .namo-panel-wrap { position: fixed; right: 18px; bottom: 18px; z-index: 6; width: min(92vw, 320px); max-height: 70vh; }
  .namo-panel {
    display: flex; flex-direction: column; gap: 12px;
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
    border-radius: 20px; padding: 16px 16px 14px;
    box-shadow: var(--shadow-subtle), 0 0 30px var(--green-glow);
    max-height: 70vh; overflow-y: auto;
  }
  .namo-panel-head { display: flex; align-items: center; justify-content: space-between; }
  .namo-panel-head-right { display: flex; align-items: center; gap: 9px; }
  .namo-panel-title { display: flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--green); }
  .namo-panel-timer { font-variant-numeric: tabular-nums; font-size: 12px; color: var(--text-muted); }
  .namo-panel-close {
    width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface2);
    color: var(--text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
    transition: color .15s, border-color .15s;
  }
  .namo-panel-close:hover { color: var(--text-ivory); border-color: var(--border2, var(--border)); }
  .namo-panel-section { display: flex; flex-direction: column; gap: 7px; }
  .namo-panel-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 12.5px; color: var(--text-muted); }
  .namo-panel-row b { color: var(--text-ivory); font-weight: 600; }
  .namo-panel-chip { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px; background: var(--surface2); font-size: 11px; font-weight: 600; color: var(--text-ivory); white-space: nowrap; }
  .namo-panel-divider { height: 1px; border: none; background: var(--border); margin: 0; }
  .namo-panel-feed { display: flex; flex-direction: column; gap: 6px; max-height: 150px; overflow-y: auto; padding-right: 2px; }
  .namo-panel-feed-item { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--text-muted); }
  .namo-panel-feed-item b { color: var(--text-ivory); font-weight: 500; flex: 1; }
  .namo-panel-feed-ok { color: var(--green); flex-shrink: 0; }
  .namo-panel-feed-bad { color: var(--coral); flex-shrink: 0; }
  .namo-panel-empty { font-size: 11.5px; color: var(--text-muted); opacity: .7; text-align: center; padding: 4px 0; }
  .namo-panel-booking { border: 1px solid var(--border-green); border-radius: 14px; padding: 10px 12px; display: flex; flex-direction: column; gap: 5px; background: var(--green-glow); }
  .namo-panel-emergency { display: flex; align-items: center; gap: 8px; border-radius: 12px; padding: 8px 10px; background: var(--coral-bg); color: var(--coral); font-size: 12px; font-weight: 600; animation: namoGlowPulse 1.6s ease-in-out infinite; }
  .namo-panel-ended-tag { font-size: 10.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--text-muted); background: var(--surface2); padding: 2px 8px; border-radius: 999px; }

  .namo-panel-wave { display: flex; align-items: flex-end; gap: 2px; height: 14px; }
  .namo-panel-wave span { width: 3px; background: var(--green); border-radius: 2px; animation: namoWaveBar .9s ease-in-out infinite; }
  .namo-panel-wave span:nth-child(2) { animation-delay: .15s; }
  .namo-panel-wave span:nth-child(3) { animation-delay: .3s; }
  .namo-panel-wave span:nth-child(4) { animation-delay: .45s; }
  @media (max-width: 640px) { .namo-panel-wrap { right: 12px; bottom: 100px; width: min(94vw, 250px); } }
`;

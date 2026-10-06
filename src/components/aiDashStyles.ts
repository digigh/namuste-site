// Shared look for the website's assistant dashboards (three panels: agent, live
// conversation, live actions). Extracted from AIVoiceChatbotEngine so the
// receptionist ClinicLiveAgent looks identical.
export const AI_DASH_CSS = `
        .ai-dash { position: relative; display: flex; flex-direction: column; gap: 20px; }

        .ai-dash-topbar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          padding: 14px 18px; border-radius: 16px;
          background: var(--surface); border: 1px solid var(--border);
          box-shadow: 0 1px 0 var(--overlay-1);
        }
        .ai-dash-fields { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .ai-dash-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .ai-dash-field { display: flex; align-items: center; gap: 10px; }
        .ai-field-label-group { display: flex; flex-direction: column; gap: 2px; }
        .ai-dash-field-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); white-space: nowrap; }
        .ai-live-pill-tag {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
          padding: 2px 7px; border-radius: 999px;
          background: rgba(34, 197, 94, 0.12); color: var(--green);
          border: 1px solid rgba(34, 197, 94, 0.28);
          white-space: nowrap;
        }
        .ai-live-dot-mini {
          width: 5px; height: 5px; border-radius: 50%; background: var(--green);
          box-shadow: 0 0 6px var(--green);
          animation: aiPulse 1.6s ease-in-out infinite;
        }

        .ai-industry-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 12px 6px 8px; border-radius: 12px;
          background: var(--surface2); border: 1.5px solid var(--border);
          color: var(--text-ivory); cursor: pointer; text-align: left;
          transition: all 0.18s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          position: relative;
        }
        .ai-industry-btn:hover {
          border-color: var(--border-green);
          background: rgba(34, 197, 94, 0.05);
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.14);
          transform: translateY(-1px);
        }
        .ai-industry-btn-open {
          border-color: var(--green);
          background: rgba(34, 197, 94, 0.08);
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
        }
        .ai-industry-icon-box {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
          border: 1px solid rgba(34, 197, 94, 0.25);
        }
        .ai-industry-info { display: flex; flex-direction: column; min-width: 0; }
        .ai-industry-name { font-size: 12.5px; font-weight: 700; color: var(--text-ivory); white-space: nowrap; }
        .ai-industry-hint { font-size: 10.5px; color: var(--text-muted); white-space: nowrap; }
        .ai-industry-switch-pill {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 4px 9px; border-radius: 999px;
          background: var(--overlay-2); border: 1px solid var(--border);
          color: var(--green); font-size: 11px; font-weight: 700;
          margin-left: 4px; flex-shrink: 0; transition: all 0.15s ease;
        }
        .ai-industry-btn:hover .ai-industry-switch-pill {
          background: var(--green); color: #052015; border-color: var(--green);
        }

        .ai-industry-dropdown-menu {
          position: absolute; top: calc(100% + 8px); left: 0; z-index: 80;
          width: 380px; max-width: calc(100vw - 32px);
          padding: 12px; border-radius: 16px;
          background: var(--surface); border: 1px solid var(--border2);
          box-shadow: 0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
          display: flex; flex-direction: column; gap: 6px;
          animation: aiDropdownIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes aiDropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ai-industry-dropdown-header {
          padding: 4px 6px 10px; border-bottom: 1px solid var(--border); margin-bottom: 4px;
        }
        .ai-industry-dropdown-title {
          font-size: 12.5px; font-weight: 700; color: var(--text-ivory);
          display: flex; align-items: center; justify-content: space-between;
        }
        .ai-industry-dropdown-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
        .ai-industry-card-list { display: flex; flex-direction: column; gap: 6px; }
        .ai-industry-card-item {
          display: flex; align-items: flex-start; gap: 11px;
          padding: 10px 12px; border-radius: 12px;
          background: var(--surface2); border: 1.5px solid var(--border);
          cursor: pointer; text-align: left; width: 100%; box-sizing: border-box;
          transition: all 0.15s ease;
        }
        .ai-industry-card-item:hover {
          border-color: var(--border-green); background: var(--overlay-2);
          transform: translateY(-1px);
        }
        .ai-industry-card-item.is-active {
          border-color: var(--green); background: rgba(34, 197, 94, 0.08);
        }
        .ai-industry-card-icon {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
          border: 1px solid rgba(34, 197, 94, 0.2);
          margin-top: 1px;
        }
        .ai-industry-card-body { flex: 1; min-width: 0; }
        .ai-industry-card-title {
          font-size: 12.5px; font-weight: 700; color: var(--text-ivory);
          display: flex; align-items: center; justify-content: space-between;
        }
        .ai-selected-badge {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 10px; font-weight: 700; color: var(--green);
          background: rgba(34, 197, 94, 0.15); padding: 2px 7px; border-radius: 999px;
        }
        .ai-industry-card-agent {
          font-size: 11px; font-weight: 600; color: var(--green); margin-top: 2px;
        }
        .ai-industry-card-desc {
          font-size: 10.5px; color: var(--text-dim); margin-top: 2px; line-height: 1.35;
        }
        .ai-industry-dropdown-footer {
          padding: 8px 6px 2px; font-size: 10.5px; color: var(--text-dim);
          text-align: center; border-top: 1px solid var(--border); margin-top: 4px;
        }

        .ai-quick-industry-box {
          padding: 10px 12px; border-radius: 12px;
          background: var(--overlay-1); border: 1px solid var(--border);
          display: flex; flex-direction: column; gap: 7px;
        }
        .ai-quick-industry-title {
          font-size: 10px; font-weight: 700; color: var(--text-dim);
          text-transform: uppercase; letter-spacing: 0.05em;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ai-quick-industry-pills {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
        }
        .ai-quick-industry-pill {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          padding: 7px 4px; border-radius: 8px; border: 1px solid var(--border);
          background: var(--surface2); color: var(--text-muted);
          font-size: 11px; font-weight: 600; cursor: pointer;
          transition: all 0.15s ease; white-space: nowrap;
        }
        .ai-quick-industry-pill:hover {
          border-color: var(--border-green); color: var(--text-ivory); background: var(--green-glow);
        }
        .ai-quick-industry-pill.is-active {
          border-color: #00E575;
          color: #05180D !important;
          background: linear-gradient(135deg, #00E575 0%, #00B853 100%) !important;
          font-weight: 800;
          box-shadow: 0 2px 12px rgba(0, 229, 117, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35);
        }
        .ai-quick-industry-pill.is-active .ai-quick-pill-icon {
          color: #05180D !important;
        }
        .ai-quick-industry-pill.is-active svg {
          stroke: #05180D !important;
        }
        .ai-quick-pill-icon { display: flex; flex-shrink: 0; }

        .ai-dash-select {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 14px; border-radius: 10px;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--text-ivory); font-size: 12.5px; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .ai-dash-select:hover { border-color: var(--border-green); background: var(--green-glow); }
        .ai-dash-select-static { cursor: default; opacity: 0.85; }
        .ai-dash-select-static:hover { border-color: var(--border); background: var(--surface2); }
        .ai-dash-select-icon { color: var(--green); display: flex; }
        .ai-dash-reset {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 14px; border-radius: 10px;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--text-muted); font-size: 12px; font-weight: 600; cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .ai-dash-reset:hover { border-color: var(--border2); color: var(--text-ivory); }
        .ai-dash-trial-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #00E575 0%, #00B853 45%, #9BEA16 100%);
          color: #05180D !important;
          text-decoration: none;
          font-size: 11.5px;
          font-weight: 800;
          border: none;
          outline: none;
          font-family: inherit;
          box-shadow: 0 0 20px rgba(0, 229, 117, 0.4), 0 4px 14px rgba(0, 0, 0, 0.3);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          cursor: pointer;
          overflow: hidden;
        }
        .ai-dash-trial-cta::before {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          transform: skewX(-20deg);
          animation: aiTrialShine 3s infinite ease-in-out;
        }
        .ai-dash-trial-cta:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 28px rgba(0, 229, 117, 0.65), 0 6px 18px rgba(0, 0, 0, 0.4);
        }
        .ai-trial-tag-text {
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .ai-trial-cta-arrow {
          transition: transform 0.2s ease;
        }
        .ai-dash-trial-cta:hover .ai-trial-cta-arrow {
          transform: translate(2.5px, -2.5px);
        }
        @keyframes aiTrialShine {
          0% { left: -120%; }
          35%, 100% { left: 160%; }
        }
        .ai-dropdown-wrapper { position: relative; }

        .ai-dash-grid { display: grid; grid-template-columns: 0.85fr 1.3fr 0.95fr; gap: 16px; align-items: stretch; }
        .ai-panel { height: 100%; }
        .ai-panel-body { display: flex; flex-direction: column; gap: 14px; height: 100%; }
        .ai-panel-center { display: flex; }
        .ai-center-body { flex: 1; }

        .ai-panel-head { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 700; color: var(--text-ivory); flex-wrap: wrap; }
        .ai-live-title { display: inline-flex; align-items: center; gap: 7px; }
        .ai-live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); flex-shrink: 0; animation: aiPulse 1.6s ease-in-out infinite; }
        @keyframes aiPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        .ai-badge-active { background: var(--green-glow); color: var(--green); margin-left: auto; }
        .ai-badge-processing { background: var(--coral-bg); color: var(--coral); margin-left: auto; display: inline-flex; align-items: center; gap: 4px; }
        .ai-timer { font-family: 'SF Mono', 'Menlo', monospace; font-size: 12px; color: var(--text-dim); margin-left: auto; }
        .ai-detected-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; }
        .ai-spin { animation: aiSpin 0.9s linear infinite; }
        @keyframes aiSpin { to { transform: rotate(360deg); } }

        .ai-agent-card {
          display: flex; align-items: center; gap: 12px;
          padding: 12px; border-radius: 12px;
          background: var(--surface2); border: 1px solid var(--border);
          text-align: left; cursor: default; width: 100%; box-sizing: border-box;
        }
        .ai-persona-card { cursor: pointer; transition: border-color 0.15s ease; }
        .ai-persona-card:hover { border-color: var(--border-green); }
        .ai-agent-icon {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .ai-persona-avatar { width: 36px; height: 36px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
        .ai-persona-initial {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-luminous); color: #052015; font-size: 12px; font-weight: 700;
        }
        .ai-persona-wave { width: 34px; height: 16px; position: relative; flex-shrink: 0; }
        .ai-agent-name { font-size: 14px; font-weight: 700; color: var(--text-ivory); }
        .ai-agent-role { font-size: 11.5px; color: var(--text-muted); margin-top: 1px; }
        .ai-agent-sub { font-size: 10.5px; color: var(--text-dim); margin-top: 2px; }

        .ai-panel-subhead {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.02em; color: var(--text-ivory);
          margin-top: 2px;
        }
        .ai-panel-subhead-row { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
        .ai-panel-subhead-row span { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: var(--text-ivory); }
        .ai-see-all { display: inline-flex; align-items: center; gap: 2px; background: none; border: none; color: var(--green); font-size: 10.5px; font-weight: 600; cursor: pointer; }

        .ai-lang-pills { display: flex; flex-wrap: wrap; gap: 6px; }
        .ai-lang-pill {
          padding: 5px 11px; border-radius: 999px; font-size: 11px; font-weight: 600;
          background: var(--overlay-1); border: 1px solid var(--border); color: var(--text-muted);
        }

        .ai-try-cta {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: 12px;
          background: linear-gradient(135deg, var(--green-glow), var(--green-glow-strong));
          border: 1px solid var(--border-green);
          cursor: pointer; width: 100%; box-sizing: border-box; text-align: left;
          font: inherit; transition: transform 0.15s ease;
          animation: aiTryPulse 2.6s ease-in-out infinite;
        }
        @keyframes aiTryPulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--green-glow); }
          50% { box-shadow: 0 10px 22px -6px var(--green-glow-strong); }
        }
        .ai-try-cta:hover { transform: translateY(-1px); }
        .ai-try-cta-icon {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green); color: #052015;
        }
        .ai-try-cta-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
        .ai-try-cta-title { font-size: 13px; font-weight: 700; color: var(--text-ivory); }
        .ai-try-cta-sub { font-size: 10.5px; color: var(--text-muted); }
        .ai-try-cta-arrow { color: var(--green); flex-shrink: 0; transition: transform 0.15s ease; }
        .ai-try-cta:hover .ai-try-cta-arrow { transform: translateX(2px); }

        .ai-tip-box {
          display: flex; align-items: flex-start; gap: 9px;
          padding: 12px 13px; border-radius: 12px; margin-top: auto;
          background: var(--green-glow); border: 1px solid var(--border-green);
          font-size: 11.5px; color: var(--text-muted); line-height: 1.45;
        }
        .ai-tip-box svg { color: var(--green); flex-shrink: 0; margin-top: 1px; }
        .ai-tip-box-accent { background: var(--overlay-1); border-color: var(--border); }
        .ai-tip-box-accent svg { color: var(--text-muted); }
        .ai-tip-title { font-size: 12px; font-weight: 700; color: var(--text-ivory); margin-bottom: 8px; }
        .ai-quick-prompts { display: flex; flex-direction: column; gap: 6px; }
        .ai-quick-prompts button {
          text-align: left; background: var(--surface); border: 1px solid var(--border);
          border-radius: 9px; padding: 7px 10px; font-size: 11.5px; color: var(--text-ivory);
          cursor: pointer; font-style: italic;
        }
        .ai-quick-prompts button:hover { border-color: var(--border-green); }

        .ai-transcript {
          flex: 1; min-height: 220px; max-height: 420px; overflow-y: auto;
          display: flex; flex-direction: column; gap: 12px;
          padding: 4px 4px 4px 0;
        }
        .ai-transcript-empty {
          position: relative;
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; color: var(--text-dim); text-align: center; padding: 40px 20px;
          border-radius: 18px; overflow: hidden;
          background: radial-gradient(circle at 50% 32%, rgba(118, 192, 67, 0.18), rgba(34, 211, 238, 0.09) 42%, transparent 70%);
        }
        .ai-empty-orb-wrap { position: relative; width: 112px; height: 112px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .ai-empty-orb-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--green); }
        .ai-empty-orbit { position: absolute; inset: -6px; }
        .ai-empty-orbit-dot { position: absolute; top: 0; left: 50%; width: 7px; height: 7px; border-radius: 50%; margin-left: -3.5px; }
        .ai-empty-orbit-dot-b { top: auto; bottom: 0; }
        .ai-empty-title {
          position: relative; font-size: 18px; font-weight: 800; margin: 0; letter-spacing: -0.01em;
          background: linear-gradient(90deg, var(--text-ivory) 30%, var(--green));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .ai-empty-sub { position: relative; font-size: 13px; color: var(--text-muted); margin: 4px 0 0; }
        .ai-empty-nudge { position: relative; color: var(--green); margin-top: 10px; display: inline-flex; }
        .ai-msg { display: flex; gap: 8px; align-items: flex-start; }
        .ai-msg.is-user { flex-direction: row-reverse; }
        .ai-msg-avatar {
          width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .ai-msg.is-user .ai-msg-avatar { background: var(--overlay-2); color: var(--text-muted); }
        .ai-msg-bubble {
          max-width: 78%; padding: 9px 13px; border-radius: 13px;
          background: var(--surface2); border: 1px solid var(--border);
        }
        .ai-msg.is-user .ai-msg-bubble { background: var(--overlay-1); }
        .ai-msg-bubble p { margin: 2px 0 0; font-size: 13.5px; color: var(--text-ivory); line-height: 1.5; }
        .ai-msg-from { font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--green); }
        .ai-msg.is-user .ai-msg-from { color: var(--text-dim); }
        .ai-msg-time { display: block; font-family: 'SF Mono', 'Menlo', monospace; font-size: 9px; color: var(--text-dim); margin-top: 4px; }
        .ai-msg-live .ai-msg-from { color: #0EA5E9; }
        .ai-typing { display: flex; align-items: center; gap: 6px; }
        .ai-typing-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--text-dim); animation: aiTyping 1.2s ease-in-out infinite; }
        .ai-typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .ai-typing-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes aiTyping { 0%, 60%, 100% { opacity: 0.3; } 30% { opacity: 1; } }
        .ai-typing-text { font-size: 11.5px; color: var(--text-muted); margin-left: 4px; }

        .ai-call-bar {
          display: flex; align-items: center; gap: 12px;
          border-top: 1px solid var(--border); padding-top: 16px; margin-top: 4px;
        }
        .ai-call-cta-wrap { position: relative; flex: 1; display: flex; }
        .ai-call-pulse-ring {
          position: absolute; inset: -4px; border-radius: 16px;
          border: 2.5px solid var(--green-luminous); pointer-events: none;
        }
        .ai-call-start {
          position: relative; overflow: hidden;
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          padding: 16px; border-radius: 13px;
          background: linear-gradient(135deg, var(--green), var(--green-luminous));
          color: #052015;
          font-size: 14.5px; font-weight: 800; border: none; cursor: pointer;
          box-shadow: 0 14px 30px -10px var(--green-glow-strong);
        }
        .ai-call-start-shine {
          position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: aiShine 2.6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes aiShine {
          0% { left: -60%; }
          50% { left: 130%; }
          100% { left: 130%; }
        }
        .ai-ctrl-btn {
          display: inline-flex; flex-direction: column; align-items: center; gap: 4px;
          background: none; border: none; color: var(--text-muted); font-size: 10.5px; font-weight: 600; cursor: pointer;
        }
        .ai-ctrl-btn svg { width: 34px; height: 34px; padding: 9px; border-radius: 50%; background: var(--overlay-2); box-sizing: border-box; color: var(--text-ivory); }
        .ai-ctrl-end svg { background: var(--coral); color: #fff; }
        .ai-call-wave { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 0; }
        .ai-call-wave > div { width: 100%; height: 28px; position: relative; }
        .ai-call-wave-label { font-size: 11px; color: var(--text-muted); font-weight: 600; }
        .ai-call-wave-label.is-error { color: var(--coral); }

        .ai-chat-form {
          display: flex; gap: 10px; align-items: center;
          border-top: 1px solid var(--border); padding-top: 14px; margin-top: 4px;
        }
        .ai-chat-form input {
          flex: 1; padding: 10px 14px; border-radius: 999px;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--text-ivory); font-size: 13.5px; outline: none; box-sizing: border-box;
        }
        .ai-chat-form button {
          width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
          background: var(--green-luminous); color: #052015; border: none; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .ai-chat-form button:disabled { opacity: 0.5; }

        /* WhatsApp-style skin for chat mode — visual only, reuses the same
           conversationHistory/state as voice mode. Real WhatsApp colors on
           purpose (not the site's green brand tokens) since the point is to
           read as the actual app, in both light and dark theme. */
        .is-whatsapp {
          --wa-header-bg: #075E54; --wa-header-text: #E9EDEF;
          --wa-chat-bg: #ECE5DD; --wa-incoming-bg: #FFFFFF; --wa-outgoing-bg: #D9FDD3;
          --wa-text: #111B21; --wa-meta: #667781; --wa-check-blue: #53BDEB;
          --wa-input-bg: #F0F2F5; --wa-accent: #00A884;
        }
        .dark .is-whatsapp {
          --wa-header-bg: #202C33; --wa-header-text: #E9EDEF;
          --wa-chat-bg: #0B141A; --wa-incoming-bg: #202C33; --wa-outgoing-bg: #005C4B;
          --wa-text: #E9EDEF; --wa-meta: #8696A0; --wa-check-blue: #53BDEB;
          --wa-input-bg: #202C33; --wa-accent: #00A884;
        }
        .is-whatsapp .ai-panel-body { gap: 0; }

        .ai-wa-header {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px; margin: calc(-1 * var(--card-spacing, 1rem)) calc(-1 * var(--card-spacing, 1rem)) 0;
          background: var(--wa-header-bg);
        }
        .ai-wa-avatar {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255, 255, 255, 0.16); color: #fff;
        }
        .ai-wa-header-text { display: flex; flex-direction: column; min-width: 0; flex: 1; }
        .ai-wa-name { font-size: 14px; font-weight: 600; color: var(--wa-header-text); }
        .ai-wa-status { font-size: 11.5px; color: rgba(255, 255, 255, 0.72); }
        .ai-wa-detected {
          background: rgba(255, 255, 255, 0.16) !important; color: #fff !important;
          border: none !important; font-size: 10px !important;
          display: inline-flex; align-items: center; gap: 5px;
        }

        .is-whatsapp .ai-transcript {
          margin: 0 calc(-1 * var(--card-spacing, 1rem));
          padding: 14px 16px;
          background-color: var(--wa-chat-bg);
          background-image: url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.035'%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='55' cy='35' r='2'/%3E%3Ccircle cx='35' cy='65' r='2'/%3E%3Ccircle cx='75' cy='75' r='2'/%3E%3C/g%3E%3C/svg%3E");
        }
        .dark .is-whatsapp .ai-transcript {
          background-image: url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.035'%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='55' cy='35' r='2'/%3E%3Ccircle cx='35' cy='65' r='2'/%3E%3Ccircle cx='75' cy='75' r='2'/%3E%3C/g%3E%3C/svg%3E");
        }
        .is-whatsapp .ai-msg-avatar, .is-whatsapp .ai-msg-from { display: none; }
        .is-whatsapp .ai-msg { gap: 0; }
        .is-whatsapp .ai-msg-bubble {
          position: relative; max-width: 75%;
          padding: 7px 9px 8px; border-radius: 2px 8px 8px 8px;
          background: var(--wa-incoming-bg); border: none;
          box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
        }
        .is-whatsapp .ai-msg-bubble::before {
          content: ""; position: absolute; top: 0; left: -7px; width: 0; height: 0;
          border-top: 8px solid var(--wa-incoming-bg); border-left: 8px solid transparent;
        }
        .is-whatsapp .ai-msg.is-user .ai-msg-bubble {
          background: var(--wa-outgoing-bg); border-radius: 8px 2px 8px 8px; margin-left: auto;
        }
        .is-whatsapp .ai-msg.is-user .ai-msg-bubble::before {
          left: auto; right: -7px;
          border-top: 8px solid var(--wa-outgoing-bg); border-left: none; border-right: 8px solid transparent;
        }
        .is-whatsapp .ai-msg-bubble p { margin: 0; font-size: 14px; color: var(--wa-text); line-height: 1.4; }
        .is-whatsapp .ai-msg-time {
          display: flex; align-items: center; justify-content: flex-end; gap: 3px;
          font-family: inherit; font-size: 10.5px; color: var(--wa-meta); margin-top: 3px;
        }
        .is-whatsapp .ai-wa-check { color: var(--wa-check-blue); flex-shrink: 0; }
        .is-whatsapp .ai-msg-bubble.ai-typing { flex-direction: row; align-items: center; gap: 6px; }
        .is-whatsapp .ai-typing-text { color: var(--wa-meta); }

        .is-whatsapp .ai-chat-form {
          margin: 0 calc(-1 * var(--card-spacing, 1rem)) calc(-1 * var(--card-spacing, 1rem));
          padding: 10px 16px; background: var(--wa-input-bg); border-top: none;
        }
        .ai-wa-input-icon { display: inline-flex; align-items: center; justify-content: center; color: var(--wa-meta, var(--text-dim)); flex-shrink: 0; }
        .is-whatsapp .ai-chat-form input {
          background: var(--wa-incoming-bg); border: none; color: var(--wa-text);
        }
        .is-whatsapp .ai-chat-form input::placeholder { color: var(--wa-meta); }
        .is-whatsapp .ai-chat-form button { background: var(--wa-accent); color: #fff; }

        .ai-actions-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .ai-actions-list li { display: flex; align-items: center; gap: 10px; }
        .ai-action-icon {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--green-glow); color: var(--green);
        }
        .ai-action-label { font-size: 10px; font-weight: 600; letter-spacing: 0.03em; color: var(--text-dim); text-transform: uppercase; }
        .ai-action-value { font-size: 13px; font-weight: 600; color: var(--text-ivory); margin-top: 1px; }

        .ai-activity-list { display: flex; flex-direction: column; gap: 8px; }
        .ai-activity-empty { font-size: 11.5px; color: var(--text-dim); padding: 8px 0; }
        .ai-activity-row { display: flex; align-items: center; gap: 9px; padding: 8px 0; border-bottom: 1px solid var(--border); }
        .ai-activity-row:last-child { border-bottom: none; }
        .ai-activity-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; background: var(--text-dim); }
        .ai-activity-dot.completed { background: var(--green); }
        .ai-activity-dot.processing { background: #F59E0B; }
        .ai-activity-label { font-family: 'SF Mono', 'Menlo', monospace; font-size: 11px; color: var(--text-ivory); }
        .ai-activity-time { font-family: 'SF Mono', 'Menlo', monospace; font-size: 9.5px; color: var(--text-dim); margin-top: 1px; }
        .ai-activity-status {
          display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;
          font-size: 9.5px; font-weight: 700; padding: 3px 8px; border-radius: 999px;
          background: var(--overlay-1); color: var(--text-dim);
        }
        .ai-activity-status.completed { background: var(--green-glow); color: var(--green); }
        .ai-activity-status.processing { background: rgba(245, 158, 11, 0.12); color: #F59E0B; }

        .ai-dev-toggle { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .ai-dev-toggle > button {
          background: transparent; border: none; color: var(--text-dim);
          font-family: 'SF Mono', 'Menlo', monospace; font-size: 10.5px; font-weight: 600; cursor: pointer;
          display: inline-flex; align-items: center; gap: 4px; padding: 0;
        }
        .ai-dev-copy { color: var(--text-dim); }
        .ai-dev-toggle pre {
          width: 100%; margin: 0; background: var(--overlay-1); border: 1px solid var(--border2);
          padding: 12px 14px; border-radius: 12px; font-size: 10.5px; color: var(--text-muted);
          max-height: 130px; overflow-y: auto; box-sizing: border-box; font-family: 'SF Mono', 'Menlo', monospace;
        }

        /* Connecting / In-flight Calling State */
        .ai-connecting-stage {
          position: relative;
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 6px; color: var(--text-dim); text-align: center; padding: 28px 20px;
          border-radius: 18px; overflow: hidden;
          background: radial-gradient(circle at 50% 30%, rgba(155, 234, 22, 0.15), rgba(34, 211, 238, 0.08) 45%, transparent 70%);
        }
        .ai-connecting-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 12px; border-radius: 999px;
          background: var(--green-glow); border: 1px solid var(--border-green);
          color: var(--green); font-size: 11px; font-weight: 700;
          margin-bottom: 6px;
        }
        .ai-connecting-title {
          font-size: 17px; font-weight: 800; color: var(--text-ivory); margin: 0;
          letter-spacing: -0.01em;
        }
        .ai-connecting-sub {
          font-size: 12.5px; color: var(--text-muted); margin: 2px 0 12px; max-width: 380px; line-height: 1.45;
        }
        .ai-connecting-steps {
          display: flex; align-items: center; gap: 8px; margin: 6px 0 14px;
        }
        .ai-cstep {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 600; color: var(--text-dim);
          padding: 3px 8px; border-radius: 6px; background: var(--overlay-1);
          transition: all 0.2s ease;
        }
        .ai-cstep-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--border2);
        }
        .ai-cstep.is-active {
          color: var(--green); background: var(--green-glow); border: 1px solid var(--border-green);
        }
        .ai-cstep.is-active .ai-cstep-dot {
          background: var(--green-luminous); box-shadow: 0 0 6px var(--green-luminous);
          animation: aiPulse 1.2s infinite;
        }
        .ai-cstep.is-done {
          color: var(--text-ivory);
        }
        .ai-cstep.is-done .ai-cstep-dot {
          background: var(--green);
        }
        .ai-cstep-line {
          width: 14px; height: 1px; background: var(--border2);
        }
        .ai-connecting-hint {
          display: flex; align-items: center; gap: 7px;
          max-width: 400px; padding: 7px 12px; border-radius: 9px;
          background: var(--overlay-1); border: 1px solid var(--border);
          font-size: 11px; color: var(--text-muted); line-height: 1.4;
          margin-bottom: 12px; text-align: left;
        }
        .ai-connecting-cancel-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent; border: 1px solid var(--border2);
          color: var(--text-muted); padding: 6px 14px; border-radius: 999px;
          font-size: 11.5px; font-weight: 600; cursor: pointer;
          transition: all 0.15s ease;
        }
        .ai-connecting-cancel-btn:hover {
          border-color: var(--coral); color: var(--coral); background: var(--coral-bg);
        }

        /* Connecting call bar */
        .ai-call-connecting-bar {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          border-top: 1px solid var(--border); padding-top: 14px; margin-top: 4px;
          width: 100%;
        }
        .ai-call-connecting-info {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: var(--text-ivory);
        }

        /* Error Stage & Quick Recovery */
        .ai-error-stage {
          position: relative;
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; text-align: center; padding: 28px 20px;
          border-radius: 18px;
          background: radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.12), transparent 70%);
          border: 1px solid rgba(239, 68, 68, 0.25);
        }
        .ai-error-icon-wrap {
          width: 54px; height: 54px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3);
          margin-bottom: 4px;
        }
        .ai-error-title {
          font-size: 16px; font-weight: 800; color: var(--text-ivory); margin: 0;
        }
        .ai-error-description {
          font-size: 12.5px; color: var(--text-muted); max-width: 420px; margin: 0 0 10px;
          line-height: 1.5;
        }
        .ai-error-actions {
          display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;
          margin-top: 4px;
        }
        .ai-error-retry-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 10px 18px; border-radius: 999px;
          background: var(--green); color: #052015;
          font-size: 12.5px; font-weight: 700; border: none; cursor: pointer;
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .ai-error-retry-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
        .ai-error-chat-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 16px; border-radius: 999px;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--text-ivory); font-size: 12.5px; font-weight: 600; cursor: pointer;
          transition: border-color 0.15s ease;
        }
        .ai-error-chat-btn:hover { border-color: var(--border-green); }
        .ai-error-dismiss-btn {
          background: none; border: none; color: var(--text-dim);
          font-size: 11.5px; cursor: pointer; padding: 8px 10px;
        }
        .ai-error-dismiss-btn:hover { color: var(--text-ivory); }

        /* MINIMALIST TRANSIENT MEDALLION (Positioned at top of live conversation card, rings removed) */
        .ai-minimal-wave-overlay {
          position: absolute;
          top: 56px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: auto;
        }

        /* Sleek theme-synced glass medallion */
        .ai-minimal-medallion {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 16px 7px 8px;
          border-radius: 999px;
          background: var(--surface);
          border: 1.5px solid var(--border-green);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16), 0 0 20px var(--border-green);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          white-space: nowrap;
        }

        .ai-min-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface2);
          border: 1px solid var(--border-green);
          flex-shrink: 0;
        }

        .ai-min-icon-salon svg {
          color: var(--green);
          animation: minScissorSnip 0.45s ease-in-out infinite alternate;
        }
        @keyframes minScissorSnip {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-22deg) scale(1.05); }
        }

        .ai-min-icon-agri svg {
          color: #10B981;
          animation: minSproutSway 0.7s ease-in-out infinite alternate;
        }
        @keyframes minSproutSway {
          0% { transform: rotate(-8deg) scale(0.95); }
          100% { transform: rotate(8deg) scale(1.05); }
        }

        .ai-min-icon-clinic svg {
          color: var(--green);
          animation: minPulseHeart 0.7s ease-in-out infinite;
        }
        @keyframes minPulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.22); }
        }

        .ai-min-content {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .ai-min-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-ivory);
          letter-spacing: -0.01em;
        }

        .ai-min-sub {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 1100px) {
          .ai-dash-grid { grid-template-columns: 1fr 1fr; }
          .ai-panel-center { grid-column: span 2; }
        }
        @media (max-width: 760px) {
          .ai-dash-grid { grid-template-columns: 1fr; }
          .ai-panel-center { grid-column: auto; }
          .ai-dash-topbar { flex-direction: column; align-items: stretch; }
          .ai-dash-fields { justify-content: space-between; }
          .ai-dash-actions { justify-content: space-between; }
          .ai-transient-desc { display: none; }
        }
`;

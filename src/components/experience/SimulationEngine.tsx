"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";
import type { SimConfig } from "@/lib/experienceSimulations";

type Message = { from: "ai" | "user"; text: string };

const STOPWORDS = new Set(["the", "a", "an", "is", "are", "do", "does", "i", "my", "to", "for", "on", "at", "can", "you", "me", "please"]);

function significantWords(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function looksLikeMatch(input: string, expected: string) {
  const inputWords = new Set(significantWords(input));
  const expectedWords = significantWords(expected);
  if (inputWords.size === 0 || expectedWords.length === 0) return false;
  const overlap = expectedWords.filter((w) => inputWords.has(w)).length;
  return overlap >= Math.min(2, expectedWords.length);
}

export default function SimulationEngine({ config }: { config: SimConfig }) {
  const [messages, setMessages] = useState<Message[]>([{ from: "ai", text: config.greeting }]);
  const [step, setStep] = useState(0);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("Ready");
  const [freeText, setFreeText] = useState("");
  const [hint, setHint] = useState<string | null>(null);

  const done = step >= config.steps.length;
  const backHref = config.group === "professionals" ? "/experience/professionals" : "/experience/enterprises";

  function advance() {
    const next = config.steps[step];
    if (!next) return;
    setMessages((m) => [...m, { from: "user", text: next.userText }, { from: "ai", text: next.aiText }]);
    setFieldValues((f) => ({ ...f, ...next.fieldUpdates }));
    setStatus(next.status);
    setStep((s) => s + 1);
    setHint(null);
  }

  function handleFreeText(e: React.FormEvent) {
    e.preventDefault();
    const text = freeText.trim();
    if (!text) return;
    const next = config.steps[step];
    if (next && looksLikeMatch(text, next.userText)) {
      setMessages((m) => [...m, { from: "user", text }, { from: "ai", text: next.aiText }]);
      setFieldValues((f) => ({ ...f, ...next.fieldUpdates }));
      setStatus(next.status);
      setStep((s) => s + 1);
      setHint(null);
    } else if (next) {
      setHint(`I can help with that kind of request — try something like "${next.userText}", or use the suggested reply below.`);
    }
    setFreeText("");
  }

  function reset() {
    setMessages([{ from: "ai", text: config.greeting }]);
    setStep(0);
    setFieldValues({});
    setStatus("Ready");
    setHint(null);
    setFreeText("");
  }

  return (
    <section className="exp-sim-page">
      <Link href={backHref} className="exp-sim-back">
        <ArrowLeft size={14} /> Back to {config.group === "professionals" ? "Professionals" : "Enterprises"}
      </Link>

      <div className="exp-sim-head">
        <h1>{config.name}{config.group === "professionals" ? ` — ${config.title}` : ""}</h1>
        <p>{config.tagline}</p>
      </div>

      <div className="exp-sim-grid">
        <div className="exp-sim-panel">
          <h2>Sample Conversation</h2>
          <div className="exp-sim-messages">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`exp-sim-bubble ${m.from === "ai" ? "exp-sim-bubble-ai" : "exp-sim-bubble-user"}`}
              >
                <b>{m.from === "ai" ? "Namusté" : "You"}</b>
                {m.text}
              </motion.div>
            ))}
          </div>

          {!done ? (
            <div className="exp-sim-actions">
              <button type="button" className="exp-sim-reply-btn" onClick={advance}>
                {config.steps[step].userText}
              </button>
              <form className="exp-sim-freeform" onSubmit={handleFreeText}>
                <input
                  type="text"
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  placeholder="Or type your own message…"
                />
                <button type="submit" aria-label="Send">
                  <ArrowRight size={15} />
                </button>
              </form>
              {hint && <p className="exp-sim-note">{hint}</p>}
            </div>
          ) : (
            <Link href={backHref} className="exp-btn-secondary">
              Explore Another Experience
            </Link>
          )}
        </div>

        <div className="exp-sim-panel">
          <h2>What Namusté Captured</h2>
          <span className={`exp-sim-status-pill ${done ? "is-done" : ""}`}>
            <span className="exp-sim-status-dot" />
            {status}
          </span>
          <dl className="exp-sim-fields">
            {config.fields.map((f) => (
              <div key={f.key} className={`exp-sim-field ${fieldValues[f.key] ? "is-filled" : ""}`}>
                <dt>{f.label}</dt>
                <dd>{fieldValues[f.key] ?? "—"}</dd>
              </div>
            ))}
          </dl>

          {done && (
            <motion.div
              className="exp-sim-complete"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="exp-sim-complete-label">
                <CheckCircle2 size={13} style={{ display: "inline", marginRight: 5, verticalAlign: -2 }} />
                {config.completionLabel.toUpperCase()}
              </div>
              <div className="exp-sim-complete-ref">Reference: {config.reference} (sample, illustrative only)</div>
            </motion.div>
          )}

          <button type="button" className="exp-sim-reset" onClick={reset} style={{ marginTop: 16 }}>
            <RotateCcw size={13} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />
            Restart Simulation
          </button>
        </div>
      </div>

      <div className="exp-sim-complete-actions">
        <Link href="/contact" className="exp-btn-primary">
          <span className="exp-btn-primary-shine" />
          <span>Book a Tailored Demo</span>
          <ArrowRight size={15} />
        </Link>
        <a href="https://www.namuste.com/#voice-engine-demo" className="exp-btn-secondary">
          Try the Live Voice &amp; Chat Playground
        </a>
      </div>

      <p className="exp-sim-note" style={{ marginTop: 24 }}>
        Guided simulation using sample data. No real booking, order, or ticket is created in any
        external system.
      </p>
    </section>
  );
}

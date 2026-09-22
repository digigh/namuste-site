"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedOrb from "./AnimatedOrb";

interface Message {
  speaker: "customer" | "assistant";
  text: string;
}

interface Scenario {
  id: string;
  label: string;
  messages: Message[];
}

/**
 * A tabbed conversation transcript that types itself out message-by-message
 * when a scenario is selected, with a live cursor on the message currently
 * being typed. Modeled on x.ai/voice's interactive demo panels — the point
 * is that the illustration is a real interaction, not a static screenshot.
 */
export default function ConversationDemo({ scenarios }: { scenarios: Scenario[] }) {
  const [activeId, setActiveId] = useState(scenarios[0]?.id);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typedText, setTypedText] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];

  useEffect(() => {
    setVisibleCount(0);
    setTypedText("");
  }, [activeId]);

  useEffect(() => {
    if (!active) return;
    if (visibleCount >= active.messages.length) return;

    const msg = active.messages[visibleCount];
    let charIndex = 0;
    const speed = msg.speaker === "assistant" ? 16 : 22;

    const typeNext = () => {
      charIndex += 1;
      setTypedText(msg.text.slice(0, charIndex));
      if (charIndex < msg.text.length) {
        timeoutRef.current = setTimeout(typeNext, speed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setVisibleCount((c) => c + 1);
          setTypedText("");
        }, 500);
      }
    };

    timeoutRef.current = setTimeout(typeNext, 300);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, visibleCount]);

  if (!active) return null;
  const isTyping = visibleCount < active.messages.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div
        style={{
          borderRadius: "20px",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(18px)",
          boxShadow: "var(--shadow-subtle)",
          padding: "22px",
          minHeight: "220px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          justifyContent: "flex-end",
        }}
      >
        {active.messages.slice(0, visibleCount).map((m, i) => (
          <ChatBubble key={i} message={m} />
        ))}
        {isTyping && (
          <ChatBubble
            message={{ speaker: active.messages[visibleCount].speaker, text: typedText }}
            typing
          />
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {scenarios.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              style={{
                padding: "7px 16px",
                borderRadius: "999px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                background: isActive ? "rgba(118, 192, 67, 0.15)" : "var(--overlay-1)",
                color: isActive ? "var(--green)" : "var(--text-muted)",
                border: `1px solid ${isActive ? "var(--border-green)" : "var(--border)"}`,
                transition: "all 0.2s ease",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatBubble({ message, typing }: { message: Message; typing?: boolean }) {
  const isAssistant = message.speaker === "assistant";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        justifyContent: isAssistant ? "flex-start" : "flex-end",
      }}
    >
      {isAssistant && <AnimatedOrb size={26} style={{ flexShrink: 0 }} />}
      <div
        style={{
          maxWidth: "78%",
          padding: "10px 14px",
          borderRadius: isAssistant ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
          background: isAssistant ? "var(--surface2)" : "rgba(118, 192, 67, 0.14)",
          border: isAssistant ? "1px solid var(--border)" : "1px solid var(--border-green)",
          fontSize: "13px",
          lineHeight: 1.5,
          color: "var(--text-ivory)",
        }}
      >
        {message.text}
        {typing && (
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "12px",
              background: "var(--green)",
              marginLeft: "2px",
              animation: "cdBlink 0.9s step-start infinite",
              verticalAlign: "middle",
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes cdBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic } from "lucide-react";

type Bubble = { from: "user" | "ai"; text: string };

const SCRIPT: Bubble[] = [
  { from: "user", text: "Is Dr. Mehta available tomorrow?" },
  { from: "ai", text: "Yes — 11:00 AM is open. Shall I book it for you?" },
  { from: "user", text: "Yes, please." },
  { from: "ai", text: "Booked ✓ Confirmation sent on WhatsApp." },
];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ChatMock() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (!cancelled) {
        for (let i = 0; i < SCRIPT.length; i++) {
          const bubble = SCRIPT[i];
          if (bubble.from === "ai") {
            setTyping(true);
            await wait(1000);
            if (cancelled) return;
            setTyping(false);
          } else {
            await wait(700);
          }
          if (cancelled) return;
          setVisible(i + 1);
          await wait(bubble.from === "ai" ? 1500 : 450);
        }
        await wait(2200);
        if (cancelled) return;
        setVisible(0);
        await wait(500);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="exp-chatmock">
      <div className="exp-chatmock-head">
        <span className="exp-chatmock-dot" />
        <span>Namusté AI</span>
        <span className="exp-chatmock-status">Online</span>
      </div>
      <div className="exp-chatmock-body">
        <AnimatePresence initial={false}>
          {SCRIPT.slice(0, visible).map((bubble, idx) => (
            <motion.div
              key={idx}
              className={`exp-chatmock-bubble exp-chatmock-bubble-${bubble.from}`}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {bubble.text}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              className="exp-chatmock-bubble exp-chatmock-bubble-ai exp-chatmock-typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span />
              <span />
              <span />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="exp-chatmock-input">
        <span>Message Namusté AI…</span>
        <span className="exp-chatmock-mic">
          <Mic size={13} />
        </span>
      </div>
    </div>
  );
}

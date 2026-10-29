"use client";

// React/TS wrapper around namo.js (vanilla, no dependencies). Mirrors the
// vendor's Namo.jsx exactly, just typed against namo.d.ts.
import { useEffect, useRef } from "react";
// @ts-ignore -- namo.js is vendored plain JS; namo.d.ts supplies the types below.
// (ts-ignore, not ts-expect-error: whether TS resolves namo.d.ts for this
// .js import on its own varies by environment/build-cache state, and
// ts-expect-error fails the build if it turns out to be unneeded there.)
import { createNamo } from "./namo.js";
import type { NamoInstance, NamoMood, NamoOptions, NamoState } from "./namo.d";

export interface NamoProps {
  state?: NamoState;
  level?: number;
  mood?: NamoMood;
  options?: NamoOptions;
  onReady?: (api: NamoInstance) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function Namo({
  state = "idle",
  level = 0,
  mood = "friendly",
  options,
  onReady,
  ...rest
}: NamoProps) {
  const box = useRef<HTMLDivElement>(null);
  const api = useRef<NamoInstance | null>(null);

  useEffect(() => {
    if (!box.current) return;
    const instance: NamoInstance = createNamo(box.current, { mood, ...options });
    api.current = instance;
    onReady?.(instance);
    return () => {
      api.current?.destroy();
      api.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    api.current?.setState(state);
  }, [state]);
  useEffect(() => {
    api.current?.setMood(mood);
  }, [mood]);
  // Keep calling with the live level for smooth lip-sync; Namo holds the last value ~250ms.
  useEffect(() => {
    api.current?.setLevel(level);
  }, [level]);

  return <div ref={box} {...rest} />;
}

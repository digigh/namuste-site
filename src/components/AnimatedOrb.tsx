"use client";

import { useEffect, useRef } from "react";

interface AnimatedOrbProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Base hue tones for the nebula clouds, as CSS color strings */
  colors?: [string, string, string];
  speed?: number;
}

/**
 * A continuously-animated "galaxy sphere" rendered on a 2D canvas: drifting
 * nebula clouds, a twinkling star field, a fixed specular highlight and a
 * faint rim light. Approximates the live-rendered orb material seen on
 * sites like x.ai/voice, tuned to the brand's green palette instead of
 * blue/purple. Deliberately 2D-canvas rather than WebGL — this is a small
 * decorative sphere repeated many times on a page, not a hero centerpiece
 * scene, so a cheap draw loop matters more than physically-based shading.
 */
export default function AnimatedOrb({
  size = 160,
  className,
  style,
  colors = ["#76C043", "#22D3EE", "#9BEA16"],
  speed = 1,
}: AnimatedOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const stars = Array.from({ length: 46 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * (size * 0.46),
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
    }));

    let raf = 0;
    let t = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      t += 0.006 * speed;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const r = size / 2;

      // base sphere: dark glass body
      const base = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      base.addColorStop(0, "#0f1512");
      base.addColorStop(0.7, "#0a0d0c");
      base.addColorStop(1, "#050706");
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.globalCompositeOperation = "lighter";

      // drifting nebula clouds
      colors.forEach((color, i) => {
        const angle = t * (0.5 + i * 0.15) + i * ((Math.PI * 2) / colors.length);
        const dist = r * (0.28 + i * 0.08);
        const nx = cx + Math.cos(angle) * dist;
        const ny = cy + Math.sin(angle * 0.7) * dist * 0.8;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 0.7);
        grad.addColorStop(0, color + "66");
        grad.addColorStop(0.5, color + "26");
        grad.addColorStop(1, color + "00");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      // twinkling star field, slowly orbiting the center
      stars.forEach((s) => {
        const a = s.angle + t * 0.15;
        const x = cx + Math.cos(a) * s.radius;
        const y = cy + Math.sin(a) * s.radius;
        const twinkle = reduceMotion ? 0.7 : 0.4 + Math.sin(t * s.speed * 3 + s.phase) * 0.35 + 0.35;
        ctx.globalAlpha = Math.max(0, Math.min(1, twinkle));
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.restore();

      // specular highlight, fixed light source top-left
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      const hi = ctx.createRadialGradient(cx - r * 0.36, cy - r * 0.4, 0, cx - r * 0.36, cy - r * 0.4, r * 0.5);
      hi.addColorStop(0, "rgba(255,255,255,0.55)");
      hi.addColorStop(0.25, "rgba(255,255,255,0.12)");
      hi.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = hi;
      ctx.fillRect(0, 0, size, size);

      // inner shadow for glass depth
      const inner = ctx.createRadialGradient(cx, cy, r * 0.55, cx, cy, r);
      inner.addColorStop(0, "rgba(0,0,0,0)");
      inner.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = inner;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();

      // faint chromatic rim light
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 0.75, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = colors[0] + "40";
      ctx.stroke();
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "block",
        ...style,
      }}
      className={className}
    />
  );
}

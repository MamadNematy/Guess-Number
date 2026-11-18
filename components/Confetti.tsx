"use client";
import { useMemo } from "react";

const COLORS = ["#6aa9ff", "#6ee7a0", "#f5b04c", "#e8eaee"];

export default function Confetti() {
  const bits = useMemo(
    () => Array.from({ length: 36 }, (_, i) => ({
      left: Math.random() * 100, delay: Math.random() * 0.6, dur: 1.8 + Math.random() * 1.4,
      size: 6 + Math.random() * 6, color: COLORS[i % COLORS.length],
    })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bits.map((b, i) => (
        <span key={i} className="absolute top-0 block rounded-sm"
          style={{ left: `${b.left}%`, width: b.size, height: b.size * 1.6, background: b.color, animation: `confetti ${b.dur}s ${b.delay}s ease-in both` }} />
      ))}
    </div>
  );
}

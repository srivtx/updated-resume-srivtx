"use client";

// Small signatures for two product names — each one does, in miniature,
// what its product does. Both only move on hover, and only once.
//
// Tulip Labs: a pixel tulip that grows from seed to bloom, tile by tile,
// the way a chapter's flower grows in the learner's garden.
// Morphotype: the letters of the name morph into a serif and back, in a
// wave from left to right, the way the app blends one typeface into another.

import { useEffect, useRef, useState } from "react";

const TULIP = [
  "P.P.P",
  "PPPPP",
  "PPPPP",
  ".PPP.",
  "..G..",
  "G.G.G",
  ".GGG.",
  "..G..",
];

export function TulipMark({ active }: { active: boolean }) {
  const T = 2.6;
  const tiles: { x: number; y: number; c: string; order: number }[] = [];
  TULIP.forEach((row, r) =>
    row.split("").forEach((ch, c) => {
      if (ch === ".") return;
      // grows from the bottom of the stem upward
      tiles.push({ x: c * T, y: r * T, c: ch, order: TULIP.length - 1 - r });
    }),
  );
  return (
    <svg
      viewBox={`0 0 ${5 * T} ${8 * T}`}
      width={5 * T}
      height={8 * T}
      aria-hidden
      className="inline-block shrink-0 -mb-[1px]"
    >
      {tiles.map((t, i) => (
        <rect
          key={i}
          x={t.x}
          y={t.y}
          width={T - 0.35}
          height={T - 0.35}
          fill={t.c === "P" ? "#e8476a" : "#3f9b4f"}
          style={{
            opacity: active ? 1 : 0.16,
            transition: `opacity 0.25s ease ${active ? t.order * 70 + (i % 3) * 18 : 0}ms`,
          }}
        />
      ))}
    </svg>
  );
}

export function MorphName({ name, active }: { name: string; active: boolean }) {
  const [step, setStep] = useState(-1);
  const timer = useRef<number>();
  const letters = name.split("");
  const span = letters.length + 6;

  useEffect(() => {
    window.clearInterval(timer.current);
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(-1);
      return;
    }
    let s = 0;
    timer.current = window.setInterval(() => {
      s += 1;
      setStep(s);
      if (s > span * 2) window.clearInterval(timer.current);
    }, 45);
    return () => window.clearInterval(timer.current);
  }, [active, span]);

  return (
    <span aria-label={name}>
      {letters.map((ch, i) => {
        // first wave turns each letter serif, the second turns it back
        const serif = step - i >= 0 && step - i < span;
        return (
          <span
            key={i}
            aria-hidden
            className={serif ? "font-serif italic" : ""}
            style={serif ? { fontSize: "1.12em", lineHeight: 1 } : undefined}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

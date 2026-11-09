"use client";

// The intro sentence, with a selection that answers back. Selecting it
// paints the words in one of the news-card colour pairs (Tulip pink on
// plum, sky blue, amber, green — the next pair each time), and when you let
// go, pixel embers in that colour drip off the selected words and fade.
// The text itself is never touched, so copying works as normal. With
// reduced motion, only the colour changes.

import { useEffect, useRef, type ReactNode } from "react";

const PAIRS = [
  { bg: "#ff6fb5", fg: "#3a0f25" }, // tulip
  { bg: "#1f8fe0", fg: "#ffffff" }, // sky blue
  { bg: "#e6a21c", fg: "#3d2604" }, // amber
  { bg: "#3cad4f", fg: "#0f3017" }, // green
];

export function EmberText({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let i = 0;
    let last = "";
    const set = () => {
      el.style.setProperty("--sel-bg", PAIRS[i].bg);
      el.style.setProperty("--sel-fg", PAIRS[i].fg);
    };
    set();

    const burn = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        last = "";
        return;
      }
      const range = sel.getRangeAt(0);
      if (!el.contains(range.commonAncestorContainer) && !range.intersectsNode(el)) return;
      const text = sel.toString().trim();
      if (!text || text === last) return;
      last = text;

      const colour = PAIRS[i];
      // the next selection gets the next pair
      i = (i + 1) % PAIRS.length;
      window.setTimeout(set, 1400);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const box = el.getBoundingClientRect();
      const layer = document.createElement("div");
      layer.setAttribute("aria-hidden", "true");
      layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:45;overflow:hidden";
      document.body.appendChild(layer);

      let count = 0;
      for (const r of Array.from(range.getClientRects())) {
        // only the parts of the selection that sit on the intro
        const left = Math.max(r.left, box.left);
        const right = Math.min(r.right, box.right);
        const top = Math.max(r.top, box.top);
        const bottom = Math.min(r.bottom, box.bottom);
        if (right - left < 2 || bottom - top < 2) continue;
        const n = Math.min(40, Math.round((right - left) / 9));
        for (let k = 0; k < n && count < 140; k++, count++) {
          const s = Math.random() < 0.3 ? 5 : Math.random() < 0.6 ? 4 : 3;
          const x = left + Math.random() * (right - left);
          const y = top + (0.35 + Math.random() * 0.65) * (bottom - top);
          const p = document.createElement("span");
          p.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${
            Math.random() < 0.5 ? colour.bg : colour.fg
          }`;
          layer.appendChild(p);
          const fall = 26 + Math.random() * 60;
          const drift = (Math.random() - 0.5) * 14;
          p.animate(
            [
              { transform: "translate(0, 0)", opacity: 0 },
              { transform: `translate(${drift * 0.2}px, ${fall * 0.08}px)`, opacity: 1, offset: 0.12 },
              { transform: `translate(${drift}px, ${fall}px)`, opacity: 0 },
            ],
            {
              duration: 800 + Math.random() * 700,
              delay: Math.random() * 260,
              easing: "cubic-bezier(0.4, 0, 0.7, 1)",
              fill: "both",
            },
          );
        }
      }
      window.setTimeout(() => layer.remove(), 2000);
    };

    const onUp = () => window.setTimeout(burn, 0);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("keyup", onUp);
    return () => {
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("keyup", onUp);
    };
  }, []);

  return (
    <p ref={ref} className={`ember-text ${className ?? ""}`}>
      {children}
    </p>
  );
}

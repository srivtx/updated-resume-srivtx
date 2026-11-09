"use client";

// Temporary: lets the owner compare variants on the real page.
// Shows only with ?variants in the url.
//   ?ink=rose|blue|graphite   the figures' one colour
//   ?motion=once|scroll       figures move once, or follow the scroll
// Remove once both are chosen.

import { useEffect, useRef, useState } from "react";

const CHOICES = {
  ink: ["rose", "blue", "graphite"],
  motion: ["once", "scroll"],
} as const;

type Key = keyof typeof CHOICES;

export function InkSwitch() {
  const ref = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);
  const [picked, setPicked] = useState<Record<Key, string>>({ ink: "rose", motion: "once" });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setShow(q.has("variants"));
    const next = { ink: "rose", motion: "once" } as Record<Key, string>;
    (Object.keys(CHOICES) as Key[]).forEach((k) => {
      const v = q.get(k);
      if (v && (CHOICES[k] as readonly string[]).includes(v)) next[k] = v;
    });
    setPicked(next);
  }, []);

  useEffect(() => {
    const article = ref.current?.closest("article");
    article?.setAttribute("data-ink", picked.ink);
    article?.setAttribute("data-motion", picked.motion);
    if (!show) return;
    const q = new URLSearchParams(window.location.search);
    q.set("ink", picked.ink);
    q.set("motion", picked.motion);
    window.history.replaceState(null, "", `?${q.toString()}`);
    window.dispatchEvent(new Event("scroll"));
  }, [picked, show]);

  return (
    <span
      ref={ref}
      className={
        show
          ? "fixed bottom-4 left-4 z-50 font-mono text-[11px] leading-6 text-black/55 dark:text-white/50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1.5 border border-black/10 dark:border-white/10"
          : "hidden"
      }
    >
      {show &&
        (Object.keys(CHOICES) as Key[]).map((k) => (
          <span key={k} className="block">
            {k}:
            {CHOICES[k].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setPicked((p) => ({ ...p, [k]: v }))}
                className={`ml-2 underline-offset-4 ${v === picked[k] ? "text-black dark:text-white underline" : "hover:text-black dark:hover:text-white"}`}
              >
                {v}
              </button>
            ))}
          </span>
        ))}
    </span>
  );
}

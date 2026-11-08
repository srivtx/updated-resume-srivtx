"use client";

// Temporary: lets the owner compare the figure ink on the real page.
// Shows only with ?variants in the url; ?ink=rose|blue|graphite picks one.
// Remove once an ink is chosen.

import { useEffect, useRef, useState } from "react";

const INKS = ["rose", "blue", "graphite"] as const;

export function InkSwitch() {
  const ref = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);
  const [ink, setInk] = useState<string>("rose");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const chosen = q.get("ink");
    setShow(q.has("variants"));
    if (chosen && (INKS as readonly string[]).includes(chosen)) setInk(chosen);
  }, []);

  useEffect(() => {
    const article = ref.current?.closest("article");
    article?.setAttribute("data-ink", ink);
    if (!show) return;
    const q = new URLSearchParams(window.location.search);
    q.set("ink", ink);
    window.history.replaceState(null, "", `?${q.toString()}`);
  }, [ink, show]);

  return (
    <span ref={ref} className={show ? "fixed bottom-4 left-4 z-50 font-mono text-[11px] text-black/50 dark:text-white/50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-2 border border-black/10 dark:border-white/10" : "hidden"}>
      {show && (
        <>
          ink:
          {INKS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setInk(k)}
              className={`ml-2 underline-offset-4 ${k === ink ? "text-black dark:text-white underline" : "hover:text-black dark:hover:text-white"}`}
            >
              {k}
            </button>
          ))}
        </>
      )}
    </span>
  );
}

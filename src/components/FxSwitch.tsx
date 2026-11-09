"use client";

// Temporary: compare the theme-switch effects on the real site.
// Shows only with ?variants in the url; the pick is remembered in this
// browser (localStorage "theme-fx-pin"). Remove once one is chosen.

import { useEffect, useState } from "react";
import { FX, prefetchYear } from "@/components/themeReveal";


export function FxSwitch() {
  const [show, setShow] = useState(false);
  const [fx, setFx] = useState<string>("mix");

  useEffect(() => {
    setShow(new URLSearchParams(window.location.search).has("variants"));
    try {
      setFx(localStorage.getItem("theme-fx-pin") || "mix");
    } catch {}
  }, []);

  if (!show) return null;
  const pick = (v: string) => {
    setFx(v);
    if (v === "year") prefetchYear();
    try {
      localStorage.setItem("theme-fx-pin", v);
    } catch {}
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-[11px] leading-6 text-black/60 dark:text-white/60 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1.5 border border-black/10 dark:border-white/10">
      theme switch:
      {["mix", ...FX].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => pick(v)}
          className={`ml-2 underline-offset-4 ${v === fx ? "text-black dark:text-white underline" : "hover:text-black dark:hover:text-white"}`}
        >
          {v}
        </button>
      ))}
      <span className="ml-2 text-black/40 dark:text-white/40">→ then press the tulip</span>
    </div>
  );
}

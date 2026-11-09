"use client";

// Theme toggle — a pixel tulip that closes at night and opens by day, the
// way real tulips do. Switching reveals the new theme cell by cell through
// the View Transitions API (the old page is a still picture, the new one
// shows through a mask; see themeReveal.ts). Default is DUSK: night falls
// from the top in an ordered (Bayer) dither, morning rises from the bottom.
// Other effects can be compared with ?variants. Without view transitions, or with reduced
// motion, the theme simply switches. Initial state is set inline in
// layout, so no flash.

import { useEffect, useRef, useState } from "react";
import { SLAB } from "@/components/NeuButton";
import { runReveal, currentFx, prefetchYear } from "@/components/themeReveal";

// While the theme flips, every colour transition on the page is switched
// off, so the page's own colour fades never run inside the reveal.
function quietly(flip: () => void) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  flip();
  return () =>
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
}

/* ---------- the tulip ---------- */

const OPEN = [".#.#.#.", "###.###", "##...##", ".##.##.", "#..#..#", "##.#.##", ".#####."]; // Tulip Labs' own
// the same flower with its petals folded shut
const BUD = ["..###..", ".#####.", ".#####.", "..###..", "#..#..#", "##.#.##", ".#####."];

function Tulip({ dark, moved }: { dark: boolean; moved: boolean }) {
  const cells: { x: number; y: number; open: boolean; bud: boolean }[] = [];
  for (let y = 0; y < 7; y++)
    for (let x = 0; x < 7; x++) {
      const open = OPEN[y][x] === "#";
      const bud = BUD[y][x] === "#";
      if (open || bud) cells.push({ x, y, open, bud });
    }
  return (
    <svg key={String(dark)} viewBox="0 0 7 7" width={14} height={14} shapeRendering="crispEdges" fill="currentColor" aria-hidden>
      {cells.map((c) => {
        const on = dark ? c.bud : c.open;
        const changed = c.open !== c.bud;
        return (
          <rect
            key={`${c.x}-${c.y}`}
            x={c.x}
            y={c.y}
            width={1.02}
            height={1.02}
            className={moved && changed ? (on ? "tl-in" : "tl-out") : undefined}
            style={{ opacity: on ? 1 : 0, animationDelay: `${(dark ? c.y : 3 - c.y) * 45}ms` }}
          />
        );
      })}
    </svg>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const moved = useRef(false);

  // The page starts in the device's theme. Until someone picks one here,
  // it keeps following the device, even when that changes while open.
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {}
      if (saved) return;
      quietly(() => document.documentElement.classList.toggle("dark", mq.matches))();
      moved.current = true;
      setDark(mq.matches);
    };
    mq.addEventListener("change", follow);
    if (currentFx() === "year") prefetchYear();
    return () => mq.removeEventListener("change", follow);
  }, []);

  // Picking the same theme as the device forgets the choice, so the page
  // goes back to following the device; picking the other one remembers it.
  const apply = (next: boolean) => {
    document.documentElement.classList.toggle("dark", next);
    moved.current = true;
    setDark(next);
    try {
      const device = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (next === device) localStorage.removeItem("theme");
      else localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — ignore */
    }
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !dark;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      quietly(() => apply(next))();
      return;
    }
    runReveal(
      currentFx(),
      next,
      e.currentTarget.getBoundingClientRect(),
      (cb) => doc.startViewTransition!(cb),
      () => quietly(() => apply(next)),
    );
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "switch to light" : "switch to dark"}
      title={dark ? "morning" : "night"}
      type="button"
      className={`touch-manipulation active:opacity-75 flex items-center justify-center w-8 h-8 shrink-0 ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className={SLAB}>
        <div className="p-0 flex items-center justify-center w-8 h-8 rounded-full text-black/75 dark:text-white/80">
          <Tulip dark={dark} moved={moved.current} />
        </div>
      </div>
    </button>
  );
}

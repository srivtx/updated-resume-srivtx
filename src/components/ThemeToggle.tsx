"use client";

// Theme toggle — a pixel tulip that closes at night and opens by day, the
// way real tulips do. Switching runs a DITHERED DUSK: night falls from
// the top of the screen in an ordered (Bayer) dither pattern, and morning
// rises from the bottom. It uses the View Transitions API: the old page is
// a still picture, the new one is revealed through a mask that sweeps the
// screen as 16 pixel patterns, one per dither level, so it stays crisp at
// any size. Without view transitions, or with reduced motion, the theme
// simply switches. Initial state is set inline in layout, so no flash.

import { useEffect, useRef, useState } from "react";
import { SLAB } from "@/components/NeuButton";

// While the theme flips, every colour transition on the page is switched
// off, so the page's own colour fades never run inside the reveal.
function quietly(flip: () => void) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  flip();
  return () =>
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
}

/* ---------- the dither ---------- */

const CELL = 8; // css px per dither pixel
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const DURATION = 1050;
const FRAMES = 64; // one mask per screen refresh (~60 a second), so the sweep glides
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

// One mask image per frame. A cell is revealed once the sweep has passed
// its row, nudged by its Bayer level, which is what makes the edge dither.
function duskMasks(w: number, h: number, fromTop: boolean): string[] {
  const tile = CELL * 4;
  let defs = "";
  for (let k = 0; k < 16; k++) {
    let cells = "";
    BAYER.forEach((row, y) =>
      row.forEach((v, x) => {
        if (v === k) cells += `<rect x="${x * CELL}" y="${y * CELL}" width="${CELL}" height="${CELL}"/>`;
      }),
    );
    defs += `<pattern id="d${k}" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse">${cells}</pattern>`;
  }
  const frames: string[] = [];
  for (let i = 0; i < FRAMES; i++) {
    const p = ease(i / (FRAMES - 1));
    let rects = "";
    for (let k = 0; k < 16; k++) {
      const reach = Math.min(1, Math.max(0, (p - k / 64) / 0.75));
      const hk = Math.min(h, Math.ceil((reach * h) / CELL) * CELL);
      if (hk <= 0) continue;
      rects += `<rect x="0" y="${fromTop ? 0 : h - hk}" width="${w}" height="${hk}" fill="url(#d${k})"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges"><defs>${defs}</defs>${rects}</svg>`;
    frames.push(`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
  }
  return frames;
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

  const toggle = () => {
    const next = !dark;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      quietly(() => apply(next))();
      return;
    }

    // night falls from the top; morning rises from the bottom
    const masks = duskMasks(window.innerWidth, window.innerHeight, next);

    let done = () => {};
    const transition = doc.startViewTransition(() => {
      done = quietly(() => apply(next));
    });
    transition.finished.then(() => done(), () => done());

    transition.ready.then(() => {
      document.documentElement.animate({ maskImage: masks, WebkitMaskImage: masks } as unknown as PropertyIndexedKeyframes, {
        duration: DURATION,
        easing: "linear",
        fill: "both",
        pseudoElement: "::view-transition-new(root)",
      });
    });
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

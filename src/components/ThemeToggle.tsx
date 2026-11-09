"use client";

// Theme toggle — a pixel tulip that closes at night and opens by day, the
// way real tulips do. Switching reveals the new theme cell by cell through
// the View Transitions API (the old page is a still picture, the new one
// shows through a mask). Default is DUSK: night falls from the top in an
// ordered (Bayer) dither, morning rises from the bottom. WAVE and BURN can
// be compared with ?variants. Without view transitions, or with reduced
// motion, the theme simply switches. Initial state is set inline in
// layout, so no flash.

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

/* ---------- the reveal ---------- */

// Every frame, a small pixel map (2×2 dots per 8px cell of the screen) says
// which cells already show the new theme; the browser scales it up with
// crisp edges and uses it as the mask over the new page. Each effect is
// only a different order in which the cells turn over.
export type Fx = "dusk" | "wave" | "burn";
const FX: Fx[] = ["dusk", "wave", "burn"];
const CELL = 8; // the first dusk's pixel size
const DOTS = 2; // map dots per cell side: the browser only enlarges 4×, so cells stay sharp even where it smooths
const DURATION = 1900; // slow enough to watch
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
// a gentle sine curve: it starts and lands softly without rushing the middle
const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const noise = (x: number, y: number) => {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
};

// when (0..1) each cell turns over
function schedule(fx: Fx, cols: number, rows: number, toDark: boolean, bx: number, by: number) {
  const t = new Float32Array(cols * rows);
  const far = Math.max(bx, cols - bx, by, rows - by);
  const farR = Math.hypot(Math.max(bx, cols - bx), Math.max(by, rows - by) * 1.4);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      let v: number;
      if (fx === "dusk") {
        // night falls from the top, morning rises from the bottom, dithered
        const row = toDark ? y / rows : (rows - 1 - y) / rows;
        v = row * 0.75 + (BAYER[y % 4][x % 4] / 16) * 0.25;
      } else if (fx === "wave") {
        // square rings out of the button, like the Deriva mark lighting up
        v = (Math.max(Math.abs(x - bx), Math.abs(y - by)) / far) * 0.92 + (BAYER[y % 4][x % 4] / 16) * 0.08;
      } else {
        // a ragged front burning out from the button
        v = (Math.hypot(x - bx, (y - by) * 1.4) / farR) * 0.82 + noise(x, y) * 0.18;
      }
      t[y * cols + x] = v;
    }
  return t;
}

// ember colours as RGB, written straight into pixels
const EMBER = [
  [255, 111, 181],
  [230, 162, 28],
  [242, 88, 42],
];

function runReveal(fx: Fx, toDark: boolean, button: DOMRect, startView: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> }, flip: () => () => void) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const cols = Math.ceil(W / CELL);
  const rows = Math.ceil(H / CELL);
  const bx = Math.round((button.left + button.width / 2) / CELL);
  const by = Math.round((button.top + button.height / 2) / CELL);
  const when = schedule(fx, cols, rows, toDark, bx, by);

  const mask = document.createElement("canvas");
  mask.width = cols * DOTS;
  mask.height = rows * DOTS;
  const mctx = mask.getContext("2d")!;
  const img = mctx.createImageData(cols * DOTS, rows * DOTS);
  const stride = cols * DOTS;
  const size = `${cols * CELL}px ${rows * CELL}px`;
  const keyframe = (url: string) => ({ maskImage: url, WebkitMaskImage: url, maskSize: size, WebkitMaskSize: size });
  // draws the map; returns how many cells have turned, so frames where
  // nothing changed can be skipped
  const draw = (p: number) => {
    const d = img.data;
    let n = 0;
    for (let i = 0; i < when.length; i++) {
      const on = when[i] <= p;
      const a = on ? 255 : 0;
      if (on) n++;
      const x0 = (i % cols) * DOTS;
      const y0 = Math.floor(i / cols) * DOTS;
      for (let dy = 0; dy < DOTS; dy++)
        for (let dx = 0; dx < DOTS; dx++) d[((y0 + dy) * stride + x0 + dx) * 4 + 3] = a;
    }
    mctx.putImageData(img, 0, 0);
    return n;
  };

  // burn: the front glows in ember colours as it passes (drawn in the new
  // page, so it only shows where the new theme has just arrived)
  let embers: HTMLCanvasElement | null = null;
  let ectx: CanvasRenderingContext2D | null = null;
  let eimg: ImageData | null = null;

  let done = () => {};
  const transition = startView(() => {
    done = flip();
    if (fx === "burn") {
      embers = document.createElement("canvas");
      embers.width = cols;
      embers.height = rows;
      embers.setAttribute("aria-hidden", "true");
      embers.style.cssText = `position:fixed;left:0;top:0;width:${cols * CELL}px;height:${rows * CELL}px;image-rendering:pixelated;pointer-events:none;z-index:2147483647`;
      document.body.appendChild(embers);
      ectx = embers.getContext("2d");
      eimg = ectx!.createImageData(cols, rows);
    }
  });
  let lastUrl = "";
  const end = () => {
    done();
    embers?.remove();
    if (lastUrl) URL.revokeObjectURL(lastUrl);
  };
  transition.finished.then(end, end);

  transition.ready.then(() => {
    draw(0);
    const first = keyframe(`url(${mask.toDataURL()})`);
    const anim = document.documentElement.animate([first, first], {
      duration: DURATION,
      fill: "both",
      pseudoElement: "::view-transition-new(root)",
    });
    const t0 = performance.now();
    let shown = 0;
    let busy = false;
    const step = (now: number) => {
      const p = ease(Math.min(1, (now - t0) / DURATION));
      // the image is encoded off the main thread; while one is on its way
      // the next frame waits, and frames with no new cells are skipped
      if (!busy) {
        const n = draw(p);
        if (n !== shown || p >= 1) {
          shown = n;
          busy = true;
          mask.toBlob((blob) => {
            busy = false;
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const f = keyframe(`url(${url})`);
            (anim.effect as KeyframeEffect).setKeyframes([f, f]);
            const old = lastUrl;
            lastUrl = url;
            if (old) setTimeout(() => URL.revokeObjectURL(old), 200);
          });
        }
      }
      if (ectx && eimg) {
        const d = eimg.data;
        for (let i = 0; i < when.length; i++) {
          const age = p - when[i];
          const o = i * 4;
          if (age >= 0 && age < 0.05) {
            const c = EMBER[i % 3];
            d[o] = c[0];
            d[o + 1] = c[1];
            d[o + 2] = c[2];
            d[o + 3] = 255;
          } else d[o + 3] = 0;
        }
        ectx.putImageData(eimg, 0, 0);
      }
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// which effect runs: dusk, unless the comparison switcher picked another
function currentFx(): Fx {
  try {
    const v = localStorage.getItem("theme-fx") as Fx | null;
    if (v && FX.includes(v)) return v;
  } catch {}
  return "dusk";
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

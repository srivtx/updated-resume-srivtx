"use client";

// Drawn covers for the products and the essay, in place of website
// screenshots. A bright panel holds a white pixel mark; a deep panel of
// the same hue holds the name in serif. Each mark does, in miniature,
// what its product does — once per hover (or once when scrolled into
// view on a touch screen), always coming to rest on the same picture.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { TULIP, A_SANS, A_SERIF, EYE, RINGS, ANVIL, CHECK } from "@/lib/glyphs";

export type CoverId =
  | "tulip"
  | "morphotype"
  | "bionic"
  | "deriva"
  | "deepforge"
  | "customs"
  | "reduction";

export const HUES: Record<CoverId, { bright: string; deep: string }> = {
  tulip: { bright: "#ff6fb5", deep: "#3a0f25" }, // tulip labs' own pair
  morphotype: { bright: "#5b22ff", deep: "#21145c" },
  bionic: { bright: "#e6a21c", deep: "#523406" },
  deriva: { bright: "#3cad4f", deep: "#15401e" },
  deepforge: { bright: "#f2582a", deep: "#4a1507" },
  customs: { bright: "#1f8fe0", deep: "#0b2c47" },
  reduction: { bright: "#d63e5f", deep: "#36101b" },
};

/* ---------- replay: hover on a mouse, first sight on touch ---------- */

export function useReplay<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun((r) => r + 1);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, run, replay: () => setRun((r) => r + 1) };
}

/* ---------- pixel helpers ---------- */

type Cell = { x: number; y: number; ch: string };
function cells(rows: string[]): Cell[] {
  const out: Cell[] = [];
  rows.forEach((row, y) =>
    row.split("").forEach((ch, x) => {
      if (ch !== ".") out.push({ x, y, ch });
    }),
  );
  return out;
}

const G = 1.02; // solid pixel shapes; a hair of overlap hides antialias seams

function Px({ c, cls, d, style }: { c: { x: number; y: number }; cls?: string; d?: number; style?: CSSProperties }) {
  return (
    <rect
      x={c.x + (1 - G) / 2}
      y={c.y + (1 - G) / 2}
      width={G}
      height={G}
      className={cls}
      style={{ ...(d !== undefined ? ({ "--d": `${d}ms` } as CSSProperties) : {}), ...style }}
    />
  );
}

function Svg({ w, h, run, children }: { w: number; h: number; run: number; children: ReactNode }) {
  return (
    <svg
      key={run}
      viewBox={`0 0 ${w} ${h}`}
      className={`h-full w-auto overflow-visible fill-white ${run ? "mk-run" : ""}`}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/* ---------- the marks ---------- */

// Tulip Labs — the lab's own pixel tulip, the exact 7×7 glyph from its
// news cards (tuliplabs/learn/news.js). On hover it grows again, row by
// row from the bottom, the way a finished chapter grows a flower.
function Tulip({ run }: { run: number }) {
  const cs = cells(TULIP);
  return (
    <Svg w={7} h={7} run={run}>
      {cs.map((c, i) => (
        <Px key={i} c={c} cls="mk-grow" d={(6 - c.y) * 90 + Math.abs(3 - c.x) * 25} />
      ))}
    </Svg>
  );
}

// Morphotype — a bold sans A blends into a thin serif A and back,
// in a wave from the top-left corner
function Morph({ run }: { run: number }) {
  const on = (rows: string[], x: number, y: number) => rows[y][x] !== ".";
  const out: ReactNode[] = [];
  for (let y = 0; y < 7; y++)
    for (let x = 0; x < 7; x++) {
      const a = on(A_SANS, x, y);
      const b = on(A_SERIF, x, y);
      if (!a && !b) continue;
      const d = (x + y) * 45;
      const cls = a && b ? undefined : a ? "mk-out" : "mk-in";
      out.push(<Px key={`${x}-${y}`} c={{ x, y }} cls={cls} d={d} style={!a ? { opacity: 0 } : undefined} />);
    }
  return (
    <Svg w={7} h={7} run={run}>
      {out}
    </Svg>
  );
}

// The four below share the tulip's 7×7 grid, so the row reads as one family.

// Bionic Page — an eye, reading: the pupil runs along a line, then a blink
function Bionic({ run }: { run: number }) {
  const cs = cells(EYE);
  return (
    <Svg w={7} h={7} run={run}>
      <g className="mk-blink">
        {cs.map((c, i) => (
          <Px key={i} c={c} cls={c.ch === "P" ? "mk-glance" : undefined} />
        ))}
      </g>
    </Svg>
  );
}

// Deriva — apps inside apps: the rings light from the centre out
function Deriva({ run }: { run: number }) {
  const cs = cells(RINGS);
  return (
    <Svg w={7} h={7} run={run}>
      {cs.map((c, i) => (
        <Px key={i} c={c} cls="mk-grow" d={Math.max(Math.abs(3 - c.x), Math.abs(3 - c.y)) * 160 + ((c.x + c.y) % 3) * 20} />
      ))}
    </Svg>
  );
}

// DeepForge — an anvil; a strike, and the sparks fly
function DeepForge({ run }: { run: number }) {
  const cs = cells(ANVIL);
  return (
    <Svg w={7} h={7} run={run}>
      <g className="mk-strike">
        {cs
          .filter((c) => c.ch === "#")
          .map((c, i) => (
            <Px key={i} c={c} />
          ))}
      </g>
      {cs
        .filter((c) => c.ch === "S")
        .map((c, i) => (
          <Px key={`s${i}`} c={c} cls="mk-spark" d={220 + i * 70} />
        ))}
    </Svg>
  );
}

// Customs — a check, stamped down like a passport
function Customs({ run }: { run: number }) {
  const cs = cells(CHECK);
  return (
    <Svg w={7} h={7} run={run}>
      <g className="mk-stamp">
        {cs.map((c, i) => (
          <Px key={i} c={c} />
        ))}
      </g>
    </Svg>
  );
}

// The State of Reduction — sixteen traits, then only the measured
// column stays lit
function Reduction({ run }: { run: number }) {
  const out: ReactNode[] = [];
  for (let y = 0; y < 4; y++)
    for (let x = 0; x < 4; x++) {
      const kept = x === 1;
      out.push(
        <rect
          key={`${x}-${y}`}
          x={x * 1.5}
          y={y * 1.5}
          width={1.16}
          height={1.16}
          className={kept ? undefined : "mk-fade"}
          style={kept ? undefined : ({ "--d": `${250 + (x + y * 4) * 35}ms`, opacity: 0.22 } as CSSProperties)}
        />,
      );
    }
  return (
    <Svg w={5.66} h={5.66} run={run}>
      {out}
    </Svg>
  );
}

const MARKS: Record<CoverId, (p: { run: number }) => JSX.Element> = {
  tulip: Tulip,
  morphotype: Morph,
  bionic: Bionic,
  deriva: Deriva,
  deepforge: DeepForge,
  customs: Customs,
  reduction: Reduction,
};

/* ---------- the cover ---------- */

export function Cover({
  id,
  title,
  run,
  corner,
  large = false,
}: {
  id: CoverId;
  title: string;
  run: number;
  corner?: ReactNode;
  large?: boolean;
}) {
  const hue = HUES[id];
  const Mark = MARKS[id];
  return (
    <div
      className={`relative flex w-full overflow-hidden rounded-[8px] ${large ? "aspect-[16/9] sm:aspect-[2.35/1]" : "aspect-[1.9/1]"}`}
      style={{ background: hue.deep }}
    >
      <div className="relative flex w-[42%] shrink-0 items-center justify-center" style={{ background: hue.bright }}>
        <div className={id !== "reduction" ? "h-[37%]" : large ? "h-[36%]" : "h-[40%]"}>
          <Mark run={run} />
        </div>
      </div>
      <div className="relative flex min-w-0 flex-1 items-center px-[7%]">
        <span
          className={`font-serif text-white leading-[1.02] tracking-[-0.005em] ${
            large ? "text-[30px] sm:text-[46px]" : "text-[25px] sm:text-[26px]"
          }`}
        >
          {title}
        </span>
        {corner && <span className="absolute right-3 top-3 text-white/45 transition-colors duration-300 group-hover/item:text-white">{corner}</span>}
      </div>
    </div>
  );
}

/* ---------- a small tile: just the bright panel and its mark ---------- */

export function MarkTile({ id, run, className = "" }: { id: CoverId; run: number; className?: string }) {
  const Mark = MARKS[id];
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-[6px] ${className}`}
      style={{ background: HUES[id].bright }}
    >
      <div className="h-[44%]">
        <Mark run={run} />
      </div>
    </div>
  );
}

"use client";

// Drawn covers for the products and the essay, in place of website
// screenshots. A bright panel holds a white pixel mark; a deep panel of
// the same hue holds the name in serif. Each mark does, in miniature,
// what its product does — once per hover (or once when scrolled into
// view on a touch screen), always coming to rest on the same picture.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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
const TULIP = [".#.#.#.", "###.###", "##...##", ".##.##.", "#..#..#", "##.#.##", ".#####."];
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
const A_SANS = ["..PPP..", ".PP.PP.", "PP...PP", "PP...PP", "PPPPPPP", "PP...PP", "PP...PP"];
const A_SERIF = ["...P...", "..P.P..", "..P.P..", ".P...P.", ".PPPPP.", ".P...P.", "PPP.PPP"];
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

// Bionic Page — lines of words; the start of each word turns bold,
// in reading order
const LINES = [
  [3, 2, 4],
  [4, 3],
  [2, 5, 1],
  [3, 4],
];
function Bionic({ run }: { run: number }) {
  const out: ReactNode[] = [];
  let order = 0;
  LINES.forEach((words, row) => {
    let x = 0;
    words.forEach((len) => {
      const bold = Math.ceil(len / 2);
      for (let k = 0; k < len; k++) {
        const isBold = k < bold;
        out.push(
          <rect
            key={`${row}-${x}`}
            x={x + 0.08}
            y={row * 2 + (isBold ? 0.1 : 0.3)}
            width={0.84}
            height={isBold ? 1.15 : 0.75}
            className={isBold ? "mk-bold" : undefined}
            style={isBold ? ({ "--d": `${order * 70}ms` } as CSSProperties) : { opacity: 0.45 }}
          />,
        );
        x += 1;
      }
      order += 1;
      x += 1;
    });
  });
  return (
    <Svg w={10} h={7.4} run={run}>
      {out}
    </Svg>
  );
}

// Deriva — a shuffled row of bars sorts itself, one bar at a time
const BARS = [2, 3, 4, 5, 6, 7];
const SHUFFLED = [3, 0, 5, 1, 4, 2]; // where each sorted bar starts
function Deriva({ run }: { run: number }) {
  return (
    <Svg w={11} h={7} run={run}>
      {BARS.map((h, i) => (
        <rect
          key={i}
          x={i * 2}
          y={7 - h}
          width={1.2}
          height={h}
          className="mk-settle"
          style={{ "--dx": `${(SHUFFLED[i] - i) * 2}px`, "--d": `${120 + i * 110}ms` } as CSSProperties}
        />
      ))}
    </Svg>
  );
}

// DeepForge — a small network lights up, layer by layer
const LAYERS = [
  { x: 0.5, ys: [1.5, 4, 6.5] },
  { x: 4, ys: [0.5, 2.8, 5.2, 7.5] },
  { x: 7.5, ys: [2.5, 5.5] },
];
function DeepForge({ run }: { run: number }) {
  const edges: ReactNode[] = [];
  LAYERS.slice(0, -1).forEach((L, li) => {
    const N = LAYERS[li + 1];
    L.ys.forEach((y1) =>
      N.ys.forEach((y2) =>
        edges.push(
          <line
            key={`${li}-${y1}-${y2}`}
            x1={L.x + 0.5}
            y1={y1 + 0.5}
            x2={N.x + 0.5}
            y2={y2 + 0.5}
            stroke="white"
            strokeWidth={0.14}
            className="mk-edge"
            style={{ "--d": `${li * 220 + 110}ms` } as CSSProperties}
          />,
        ),
      ),
    );
  });
  return (
    <Svg w={9} h={9} run={run}>
      {edges}
      {LAYERS.map((L, li) =>
        L.ys.map((y) => <Px key={`${li}-${y}`} c={{ x: L.x, y }} cls="mk-grow" d={li * 220} />),
      )}
    </Svg>
  );
}

// Customs — a hash-chained ledger: blocks are signed and linked in
// order, and the last one gets its check
function Customs({ run }: { run: number }) {
  const blocks = [0, 4, 8];
  return (
    <Svg w={10} h={8} run={run}>
      {blocks.map((x, i) => (
        <g key={x}>
          {i > 0 && (
            <rect x={x - 2} y={3.65} width={2} height={0.7} className="mk-link" style={{ "--d": `${i * 260 - 80}ms` } as CSSProperties} />
          )}
          <rect x={x} y={2.5} width={2} height={3} className="mk-pop" style={{ "--d": `${i * 260}ms` } as CSSProperties} />
        </g>
      ))}
      {/* the check, drawn in pixels above the last block */}
      {[
        { x: 7.2, y: 0.6 },
        { x: 7.9, y: 1.3 },
        { x: 8.6, y: 0.6 },
        { x: 9.3, y: -0.1 },
      ].map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={0.7} height={0.7} className="mk-pop" style={{ "--d": `${820 + i * 60}ms` } as CSSProperties} />
      ))}
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
        <div className={id === "tulip" ? "h-[37%]" : large ? "h-[36%]" : "h-[40%]"}>
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

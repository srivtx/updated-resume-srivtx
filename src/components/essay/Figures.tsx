"use client";

// Figures for "the state of reduction" — drawn in code, one idea each.
// Visual language: graph-paper dots, hairlines in the text colour, square
// tiles as people, one ink (var(--ink)) for whatever the figure is about.
// Motion is quiet and happens once, when the figure is read: tiles drop
// into place, lines draw themselves. Reduced motion shows the end state.

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { FigureId } from "@/lib/writing";

/* ---------- shared ---------- */


// in view once → after `hold` ms flips to "after". replay() runs it again.
function useStaged(hold = 1100) {
  const ref = useRef<HTMLElement>(null);
  const [after, setAfter] = useState(false);
  const [instant, setInstant] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setAfter(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          timer.current = window.setTimeout(() => setAfter(true), hold);
          io.disconnect();
        }
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer.current);
    };
  }, [hold]);

  const replay = useCallback(() => {
    window.clearTimeout(timer.current);
    setAfter(false);
    timer.current = window.setTimeout(() => setAfter(true), hold);
  }, [hold]);

  return { ref, after, instant, replay };
}

function Frame({
  n,
  title,
  children,
  caption,
  staged,
}: {
  n: number;
  title: string;
  children: ReactNode;
  caption: ReactNode;
  staged: ReturnType<typeof useStaged>;
}) {
  return (
    <figure
      ref={staged.ref}
      className={`essay-fig ${staged.after ? "is-after" : ""} ${staged.instant ? "is-instant" : ""}`}
      aria-label={`Figure ${n}: ${title}`}
    >
      <div className="essay-fig-art">{children}</div>
      <figcaption>
        <span className="essay-fig-n">fig. {n}</span>
        <span className="essay-fig-text">
          <em>{title}.</em> {caption}
        </span>
        {!staged.instant && (
          <button type="button" onClick={staged.replay} className="essay-fig-replay" aria-label={`Replay figure ${n}`}>
            again
          </button>
        )}
      </figcaption>
    </figure>
  );
}

// faint graph-paper dots behind every drawing
function Paper({ w, h, id }: { w: number; h: number; id: string }) {
  return (
    <>
      <defs>
        <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="currentColor" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={w} height={h} fill={`url(#dots-${id})`} opacity="0.09" />
    </>
  );
}

const label = "font-mono text-[10px] fill-current";

/* ---------- people as tiles (shared by fig 1 and fig 3) ---------- */

// seven people, sixteen traits each — a 4×4 grid, read row by row.
// column 1 is the one trait that gets measured.
const PEOPLE = [
  ["1101", "0110", "1111", "1010"],
  ["0010", "1001", "1101", "0111"],
  ["1111", "1110", "0100", "1101"],
  ["0001", "1101", "1011", "0010"],
  ["1110", "0010", "1101", "1111"],
  ["0011", "1010", "1100", "0001"],
  ["1101", "1011", "0010", "1010"],
].map((rows) => rows.map((r) => r.split("").map((c) => c === "1")));

const MEASURED = 1;

/* ---------- fig 1: reduction ---------- */

function Reduction({ n }: { n: number }) {
  const s = useStaged(1300);
  const W = 640;
  const H = 300;
  const T = 12; // tile
  const STEP = 15;
  const top = 58;
  const x0 = 46;
  const dx = 82;
  const base = 262; // the ruler

  return (
    <Frame
      n={n}
      title="Reduction"
      staged={s}
      caption={
        <>
          Seven people, sixteen traits each. We keep the one column we are good at measuring and
          stack it on a ruler; everything else fades into the other side of the equation.
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-hidden className="text-black dark:text-white">
        <Paper w={W} h={H} id="f1" />

        {/* what's measured — a bracket over the measured column of the first person */}
        <g className="fig-fade-out">
          <text x={x0 + MEASURED * STEP + T / 2} y={top - 22} textAnchor="middle" className={label} opacity="0.55">
            measured
          </text>
          <path
            d={`M${x0 + MEASURED * STEP - 1} ${top - 9} v-4 h${T + 2} v4`}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.25"
          />
        </g>
        <text x={W - 24} y={top - 22} textAnchor="end" className={`${label} fig-fade-out`} fillOpacity="0.45">
          sixteen traits each
        </text>
        <text
          x={W - 24}
          y={top - 22}
          textAnchor="end"
          className={`${label} fig-fade-in`}
          fillOpacity="0.45"
          style={{ transitionDelay: s.after ? "900ms" : "0ms" }}
        >
          one number each
        </text>

        {PEOPLE.map((grid, p) => {
          // the measured tiles drop, bottom first, into a stack on the ruler
          let k = grid.filter((row) => row[MEASURED]).length;
          return (
            <g key={p}>
              {grid.map((row, r) =>
                row.map((on, c) => {
                  const x = x0 + p * dx + c * STEP;
                  const y = top + r * STEP;
                  const measured = c === MEASURED && on;
                  if (measured) {
                    k -= 1;
                    const ty = base - (k + 1) * STEP + (STEP - T) - y;
                    return (
                      <rect
                        key={`${r}${c}`}
                        x={x}
                        y={y}
                        width={T}
                        height={T}
                        fill="var(--ink)"
                        className="fig-drop"
                        style={{
                          transform: s.after ? `translateY(${ty}px)` : "none",
                          transitionDelay: s.after ? `${p * 70 + (3 - r) * 45}ms` : "0ms",
                        }}
                      />
                    );
                  }
                  return on ? (
                    <rect
                      key={`${r}${c}`}
                      x={x}
                      y={y}
                      width={T}
                      height={T}
                      fill="currentColor"
                      className="fig-dim"
                      style={{ opacity: s.after ? 0.08 : 0.72 }}
                    />
                  ) : (
                    <rect
                      key={`${r}${c}`}
                      x={x + 0.5}
                      y={y + 0.5}
                      width={T - 1}
                      height={T - 1}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="fig-dim"
                      style={{ opacity: s.after ? 0.05 : 0.18 }}
                    />
                  );
                }),
              )}
              {/* the number each person becomes */}
              <text
                x={x0 + p * dx + MEASURED * STEP + T / 2}
                y={base + 18}
                textAnchor="middle"
                className={`${label} fig-fade-in`}
                style={{ transitionDelay: s.after ? `${600 + p * 70}ms` : "0ms" }}
              >
                {grid.filter((row) => row[MEASURED]).length}
              </text>
            </g>
          );
        })}

        {/* the ruler */}
        <line x1="24" x2={W - 24} y1={base + 0.5} y2={base + 0.5} stroke="currentColor" strokeOpacity="0.35" />
      </svg>
    </Frame>
  );
}

/* ---------- fig 2: two directions ---------- */

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (x2 - x1) * 0.5;
  return `M${x1} ${y1} C${x1 + m} ${y1} ${x2 - m} ${y2} ${x2} ${y2}`;
};

function TwoDirections({ n }: { n: number }) {
  const s = useStaged(500);
  const W = 640;
  const H = 320;
  const fork = { x: 176, y: 160 };

  // first direction: the many small, drifting into one large owner
  const sink = { x: 586, y: 72 };
  const small = [
    [318, 58], [344, 96], [372, 70], [402, 104], [430, 54],
    [456, 88], [488, 62], [512, 100], [540, 80], [366, 118], [470, 42],
  ];

  // second direction: an idea that keeps branching
  const levels: { x: number; ys: number[] }[] = [
    { x: 300, ys: [228] },
    { x: 392, ys: [200, 258] },
    { x: 484, ys: [184, 216, 244, 274] },
    { x: 576, ys: [176, 192, 208, 224, 238, 254, 268, 284] },
  ];
  const links: { d: string; level: number }[] = [{ d: curve(fork.x, fork.y, 300, 228), level: 0 }];
  for (let l = 1; l < levels.length; l++) {
    levels[l].ys.forEach((y, i) => {
      const py = levels[l - 1].ys[Math.floor(i / 2)];
      links.push({ d: curve(levels[l - 1].x, py, levels[l].x, y), level: l });
    });
  }

  return (
    <Frame
      n={n}
      title="Two directions from here"
      staged={s}
      caption={
        <>
          Above, the repetitive work is modelled away and the many small drift into a few very large
          ones. Below, people are hired to experiment, and every idea branches into more.
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-hidden className="text-black dark:text-white">
        <Paper w={W} h={H} id="f2" />

        {/* where we are */}
        <line x1="28" y1={fork.y} x2={fork.x} y2={fork.y} stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.25" />
        <rect x="24" y={fork.y - 4} width="8" height="8" fill="currentColor" />
        <text x="28" y={fork.y + 22} className={label} opacity="0.55">
          now
        </text>
        <circle cx={fork.x} cy={fork.y} r="3.5" fill="var(--bg-fig)" stroke="currentColor" strokeWidth="1.25" />

        {/* first direction */}
        <path
          d={curve(fork.x, fork.y, 300, 82) + ` L${sink.x - 18} 82`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.25"
          pathLength={1}
          className="fig-draw"
        />
        {small.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="currentColor"
            className="fig-drift"
            style={{
              transform: s.after ? `translate(${sink.x - x}px, ${sink.y + 10 - y}px)` : "none",
              opacity: s.after ? 0 : 0.6,
              transitionDelay: s.after ? `${700 + i * 90}ms` : "0ms",
            }}
          />
        ))}
        <circle
          cx={sink.x}
          cy={sink.y + 10}
          r="20"
          fill="currentColor"
          fillOpacity="0.85"
          className="fig-grow"
          style={{ transform: s.after ? "scale(1)" : "scale(0.12)", transitionDelay: s.after ? "900ms" : "0ms" }}
        />
        <text x="300" y="22" className={label} opacity="0.75">
          first direction
        </text>
        <text x="300" y="36" className={label} opacity="0.4">
          routine automated, a few grow large
        </text>

        {/* second direction */}
        {links.map((k, i) => (
          <path
            key={i}
            d={k.d}
            fill="none"
            stroke={k.level === 0 ? "currentColor" : "var(--ink)"}
            strokeOpacity={k.level === 0 ? 0.5 : 0.9}
            strokeWidth="1.25"
            pathLength={1}
            className="fig-draw"
            style={{ transitionDelay: s.after ? `${300 + k.level * 420}ms` : "0ms" }}
          />
        ))}
        {levels[levels.length - 1].ys.map((y, i) => (
          <rect
            key={i}
            x={levels[levels.length - 1].x + 3}
            y={y - 3}
            width="6"
            height="6"
            fill="var(--ink)"
            className="fig-fade-in"
            style={{ transitionDelay: s.after ? `${1600 + i * 60}ms` : "0ms" }}
          />
        ))}
        <text x="28" y={H - 26} className={label} opacity="0.75">
          second direction
        </text>
        <text x="28" y={H - 12} className={label} opacity="0.4">
          hire to experiment, ideas branch
        </text>
      </svg>
    </Frame>
  );
}

/* ---------- fig 3: the gap closes ---------- */

function Gap({ n }: { n: number }) {
  const s = useStaged(1200);
  const W = 640;
  const H = 260;
  const left = 64;
  const own = [176, 338, 112, 430, 248, 196, 292];
  const reach = [536, 544, 530, 548, 534, 540, 532];
  const rowY = (i: number) => 52 + i * 26;

  const ends = s.after ? reach : own;
  const lo = Math.min(...ends);
  const hi = Math.max(...ends);

  return (
    <Frame
      n={n}
      title="The gap closes"
      staged={s}
      caption={
        <>
          The same seven people on common, repetitive tasks. With ai, everyone&rsquo;s reach moves
          toward the same line, and the spread that set them apart narrows. The state of reduction,
          applied to all of us.
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-hidden className="text-black dark:text-white">
        <Paper w={W} h={H} id="f3" />

        {/* the gap, measured across the bar ends */}
        <g className="fig-slide" style={{ transform: `translateX(${left + lo}px)` }}>
          <line x1="0" x2="0" y1="28" y2={rowY(6) + 10} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 3" />
        </g>
        <g className="fig-slide" style={{ transform: `translateX(${left + hi}px)` }}>
          <line x1="0" x2="0" y1="28" y2={rowY(6) + 10} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 3" />
        </g>
        <line
          x1="0"
          x2="1"
          y1="30"
          y2="30"
          stroke="currentColor"
          strokeOpacity="0.55"
          className="fig-slide"
          style={{ transform: `translateX(${left + lo}px) scaleX(${hi - lo})` }}
        />
        <text
          x="0"
          y="22"
          textAnchor="middle"
          className={`${label} fig-slide`}
          fillOpacity="0.55"
          style={{ transform: `translateX(${left + (lo + hi) / 2}px)` }}
        >
          the gap
        </text>

        {PEOPLE.map((grid, i) => (
          <g key={i}>
            {/* each person, as their tiles from figure 1, very small */}
            {grid.map((row, r) =>
              row.map((on, c) =>
                on ? (
                  <rect
                    key={`${r}${c}`}
                    x={24 + c * 4}
                    y={rowY(i) - 8 + r * 4}
                    width="3"
                    height="3"
                    fill={c === MEASURED ? "var(--ink)" : "currentColor"}
                    opacity={c === MEASURED ? 0.9 : 0.5}
                  />
                ) : null,
              ),
            )}
            <rect x={left} y={rowY(i) - 3} width={own[i]} height="6" fill="currentColor" opacity="0.62" />
            <rect
              x={left + own[i]}
              y={rowY(i) - 3}
              width={reach[i] - own[i]}
              height="6"
              fill="var(--ink)"
              className="fig-extend"
              style={{
                transform: s.after ? "scaleX(1)" : "scaleX(0)",
                transitionDelay: s.after ? `${i * 80}ms` : "0ms",
              }}
            />
          </g>
        ))}

        <g transform={`translate(${left} ${H - 20})`}>
          <rect y="-6" width="10" height="6" fill="currentColor" opacity="0.62" />
          <text x="16" y="0" className={label} opacity="0.5">
            on their own
          </text>
          <rect x="112" y="-6" width="10" height="6" fill="var(--ink)" className="fig-fade-in" />
          <text x="128" y="0" className={`${label} fig-fade-in`} fillOpacity="0.5">
            with ai
          </text>
        </g>
      </svg>
    </Frame>
  );
}

/* ---------- fig 4: lateral ---------- */

// four fields of ideas; dots placed by a small fixed hash so they never move
function field(cx: number, cy: number, seed: number, count = 14, r = 50) {
  const pts: [number, number][] = [];
  let a = seed * 9301 + 49297;
  const rnd = () => ((a = (a * 9301 + 49297) % 233280) / 233280);
  while (pts.length < count) {
    const t = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * r;
    const p: [number, number] = [cx + Math.cos(t) * d * 1.25, cy + Math.sin(t) * d * 0.8];
    if (pts.every(([x, y]) => Math.hypot(x - p[0], y - p[1]) > 14)) pts.push(p);
  }
  return pts;
}

function Lateral({ n }: { n: number }) {
  const s = useStaged(500);
  const W = 640;
  const H = 300;
  const centres: [number, number][] = [[118, 104], [312, 214], [474, 86], [562, 226]];
  const fields = centres.map(([x, y], i) => field(x, y, [3, 7, 11, 5][i], i === 3 ? 10 : 14, i === 3 ? 40 : 50));

  // depth: a walk from the leftmost idea to its nearest unvisited neighbour, six steps
  const a = fields[0];
  const deep: [number, number][] = [a.reduce((m, p) => (p[0] < m[0] ? p : m))];
  while (deep.length < 7) {
    const [lx, ly] = deep[deep.length - 1];
    const next = a
      .filter((p) => !deep.includes(p))
      .reduce((m, p) => (Math.hypot(p[0] - lx, p[1] - ly) < Math.hypot(m[0] - lx, m[1] - ly) ? p : m));
    deep.push(next);
  }
  const deepD = "M" + deep.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L");

  // lateral: jumps between fields, joining ideas that were never neighbours
  const far = (pts: [number, number][], toward: [number, number]) =>
    pts.reduce((m, p) => (Math.hypot(p[0] - toward[0], p[1] - toward[1]) < Math.hypot(m[0] - toward[0], m[1] - toward[1]) ? p : m));
  const from = a.filter((p) => !deep.includes(p)).reduce((m, p) => (p[0] > m[0] ? p : m));
  const hops: [number, number][] = [from, far(fields[2], [474, 60]), far(fields[1], [312, 196]), far(fields[3], [580, 220])];
  const arc = (p: [number, number], q: [number, number]) => {
    const mx = (p[0] + q[0]) / 2;
    const my = (p[1] + q[1]) / 2 - Math.abs(q[0] - p[0]) * 0.28 - 18;
    return `M${p[0].toFixed(1)} ${p[1].toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  };

  return (
    <Frame
      n={n}
      title="Lateral links"
      staged={s}
      caption={
        <>
          Inside each field, ideas sit close together, and a careful path walks from one neighbour to the
          next. A divergent path jumps between fields and connects ideas that were never neighbours.
        </>
      }
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-hidden className="text-black dark:text-white">
        <Paper w={W} h={H} id="f4" />

        {centres.map(([x, y], f) => (
          <ellipse
            key={f}
            cx={x}
            cy={y}
            rx={f === 3 ? 66 : 80}
            ry={f === 3 ? 46 : 56}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeDasharray="2 4"
          />
        ))}
        {fields.map((pts, f) =>
          pts.map(([x, y], i) => <circle key={`${f}-${i}`} cx={x} cy={y} r="2.6" fill="currentColor" opacity="0.4" />),
        )}

        <path d={deepD} fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.25" pathLength={1} className="fig-draw" />
        {deep.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.2" fill="currentColor" />
        ))}
        <text x={centres[0][0]} y={centres[0][1] + 78} textAnchor="middle" className={label} opacity="0.55">
          deep, inside one field
        </text>

        {hops.slice(1).map((q, i) => (
          <path
            key={i}
            d={arc(hops[i], q)}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.4"
            pathLength={1}
            className="fig-draw"
            style={{ transitionDelay: s.after ? `${500 + i * 650}ms` : "0ms" }}
          />
        ))}
        {hops.map(([x, y], i) => (
          <rect
            key={i}
            x={x - 4}
            y={y - 4}
            width="8"
            height="8"
            fill="var(--ink)"
            className="fig-fade-in"
            style={{ transitionDelay: s.after ? `${300 + i * 650}ms` : "0ms" }}
          />
        ))}
        <text x={W - 24} y={H - 14} textAnchor="end" className={`${label} fig-fade-in`} fillOpacity="0.7" style={{ transitionDelay: s.after ? "2200ms" : "0ms" }}>
          lateral, across fields
        </text>
      </svg>
    </Frame>
  );
}

/* ---------- dispatcher ---------- */

export function EssayFigure({ id, n }: { id: FigureId; n: number }) {
  if (id === "reduction") return <Reduction n={n} />;
  if (id === "two-directions") return <TwoDirections n={n} />;
  if (id === "gap") return <Gap n={n} />;
  return <Lateral n={n} />;
}

// Hand-drawn diagram. SVG paths drawn with a stroke-dasharray reveal that
// fires when the element enters the viewport. Text labels fade in after
// their lines are drawn — like a person sketching and then writing.
//
// The "hand-drawn" feel comes from:
//   1. Each line is a polyline with several mid-points that wobble
//      independently. Not a single quadratic curve.
//   2. Stroke overshoots at the endpoints. Real pen lines go past the target.
//   3. The wobble amplitude is randomized per segment, not constant.
//   4. Nodes are tiny dashes or small irregular shapes, not perfect circles.
//   5. Labels are in Caveat (the hand font), not JetBrains Mono.

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Point = [number, number];

// Mulberry32 PRNG — deterministic per seed, so the same diagram always
// draws the same way on every visit. Looks hand-drawn, is consistent.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A hand-drawn path between two points. Splits the line into 3–5 segments
// and offsets each interior point by a small random perpendicular distance.
function handPath(from: Point, to: Point, seed: number, amp = 1.6): string {
  const rand = rng(seed);
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  // 3 segments for short lines, more for longer
  const segments = Math.max(3, Math.min(6, Math.round(len / 28)));
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  // overshoot — extend the start and end by a few px
  const overshoot = 2 + rand() * 2;
  const sx = x1 - ux * overshoot;
  const sy = y1 - uy * overshoot;
  const ex = x2 + ux * overshoot;
  const ey = y2 + uy * overshoot;
  let d = `M ${sx.toFixed(2)} ${sy.toFixed(2)}`;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    // base point along the line
    const bx = sx + (ex - sx) * t;
    const by = sy + (ey - sy) * t;
    // perpendicular offset, alternating direction, randomized amplitude
    const sign = i % 2 === 0 ? -1 : 1;
    const a = amp * (0.4 + rand() * 0.9) * sign;
    const ox = bx + px * a;
    const oy = by + py * a;
    // quadratic with control point at the previous interior
    d += ` Q ${ox.toFixed(2)} ${oy.toFixed(2)} ${(sx + (ex - sx) * t).toFixed(2)} ${(sy + (ey - sy) * t).toFixed(2)}`;
  }
  return d;
}

// A small, irregular node marker. A short dash + a tiny dot — what you
// get when someone dots an intersection in a notebook.
function NodeMark({ x, y, delay = 0, inView, seed = 1 }: { x: number; y: number; delay?: number; inView: boolean; seed?: number }) {
  const rand = rng(seed * 31);
  const dx = (rand() - 0.5) * 1.2;
  const dy = (rand() - 0.5) * 1.2;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.18, delay, ease: "easeOut" }}
    >
      <motion.path
        d={handPath([x - 3.5 + dx, y + dy], [x + 3.5 + dx, y + dy], seed * 7, 0.6)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.22, delay, ease: "easeOut" }}
      />
      <motion.path
        d={handPath([x + dx, y - 3.5 + dy], [x + dx, y + 3.5 + dy], seed * 11, 0.6)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.22, delay, ease: "easeOut" }}
      />
    </motion.g>
  );
}

// A label in Caveat (the hand font) — not mono. Looks like someone wrote
// the word, not like it was typed.
function Label({ x, y, children, delay = 0, inView, align = "start", size = 13 }: { x: number; y: number; children: React.ReactNode; delay?: number; inView: boolean; align?: "start" | "middle" | "end"; size?: number }) {
  return (
    <motion.text
      x={x}
      y={y}
      fontFamily="var(--font-hand), 'Caveat', cursive"
      fontSize={size}
      fill="currentColor"
      textAnchor={align}
      style={{ fontStyle: "italic" }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.text>
  );
}

// A connecting line with a wobble and an arrow head at the end. The line
// draws in over `lineDuration`; the arrow head appears just after.
function Connector({
  from,
  to,
  inView,
  seed,
  delay = 0,
  lineDuration = 0.55,
  arrow = true,
  arrowSize = 7,
}: {
  from: Point;
  to: Point;
  inView: boolean;
  seed: number;
  delay?: number;
  lineDuration?: number;
  arrow?: boolean;
  arrowSize?: number;
}) {
  const d = handPath(from, to, seed, 1.6);
  // arrow head — two short strokes from the tip back at angles, slightly crooked
  const [fx, fy] = from;
  const [tx, ty] = to;
  const dx = tx - fx;
  const dy = ty - fy;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  // back from the tip by arrowSize along the line
  const bx = tx - ux * arrowSize;
  const by = ty - uy * arrowSize;
  // then offset perpendicular by arrowSize/2 for each side
  const lx = bx + px * (arrowSize * 0.55);
  const ly = by + py * (arrowSize * 0.55);
  const rx = bx - px * (arrowSize * 0.55);
  const ry = by - py * (arrowSize * 0.55);
  // a small bit of randomness so the arrowhead doesn't look mechanical
  const j = (s: number) => s + (rng(seed * 13)() - 0.5) * 0.8;
  const leftD = `M ${j(lx).toFixed(2)} ${j(ly).toFixed(2)} L ${j(tx).toFixed(2)} ${j(ty).toFixed(2)}`;
  const rightD = `M ${j(rx).toFixed(2)} ${j(ry).toFixed(2)} L ${j(tx).toFixed(2)} ${j(ty).toFixed(2)}`;

  return (
    <>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: lineDuration, delay, ease: "easeInOut" }}
      />
      {arrow && (
        <>
          <motion.path
            d={leftD}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.18, delay: delay + lineDuration - 0.05, ease: "easeOut" }}
          />
          <motion.path
            d={rightD}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.18, delay: delay + lineDuration - 0.05, ease: "easeOut" }}
          />
        </>
      )}
    </>
  );
}

// Container that watches viewport. Returns true on mount (amount: 0
// fires the intersection observer immediately on first render).
function useSketchInView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  return { ref, inView };
}

// ── nnn: the agent loop ─────────────────────────────────────────────
export function NnnSketch() {
  const { ref, inView } = useSketchInView();
  const you: Point = [80, 16];
  const arch: Point = [80, 70];
  const dev: Point = [180, 100];
  const bug: Point = [300, 100];
  const res: Point = [180, 160];
  const back: Point = [80, 200];

  return (
    <div ref={ref} className="mt-6">
      <svg viewBox="0 0 380 240" className="w-full max-w-[420px] h-auto text-ink" role="img" aria-label="nnn agent loop">
        {/* lines */}
        <Connector from={you}  to={arch} inView={inView} seed={11} delay={0.1}  />
        <Connector from={arch} to={dev}  inView={inView} seed={12} delay={0.45} />
        <Connector from={dev}  to={bug}  inView={inView} seed={13} delay={0.85} />
        <Connector from={dev}  to={res}  inView={inView} seed={14} delay={1.0}  arrow={false} />
        <Connector from={res}  to={back} inView={inView} seed={15} delay={1.4}  />
        <Connector from={bug}  to={res}  inView={inView} seed={16} delay={1.55} arrow={false} />
        <Connector from={back} to={you}  inView={inView} seed={17} delay={1.95} arrow={false} />

        {/* node marks — small crosses, not circles */}
        <NodeMark x={you[0]}  y={you[1]}  inView={inView} delay={0.0}  seed={21} />
        <NodeMark x={arch[0]} y={arch[1]} inView={inView} delay={0.35} seed={22} />
        <NodeMark x={dev[0]}  y={dev[1]}  inView={inView} delay={0.75} seed={23} />
        <NodeMark x={bug[0]}  y={bug[1]}  inView={inView} delay={1.15} seed={24} />
        <NodeMark x={res[0]}  y={res[1]}  inView={inView} delay={1.3}  seed={25} />

        {/* labels — in the hand font, fading in after the lines */}
        <Label x={you[0]}  y={you[1] - 8}  inView={inView} delay={0.05} align="middle" size={14}>you</Label>
        <Label x={arch[0]} y={arch[1] - 8} inView={inView} delay={0.3}  align="middle" size={14}>architect</Label>
        <Label x={dev[0]}  y={dev[1] - 8}  inView={inView} delay={0.7}  align="middle" size={14}>developer</Label>
        <Label x={bug[0]}  y={bug[1] - 8}  inView={inView} delay={1.1}  align="middle" size={14}>bugfixer</Label>
        <Label x={res[0]}  y={res[1] - 8}  inView={inView} delay={1.25} align="middle" size={14}>researcher</Label>
        <Label x={res[0] + 36} y={res[1] - 8}  inView={inView} delay={1.3}  align="start"  size={14}>websearcher</Label>
        <Label x={back[0]} y={back[1] + 18} inView={inView} delay={2.05} align="middle" size={14}>back to you</Label>

        {/* tiny inline annotations on the connectors */}
        <Label x={arch[0] + 22} y={(arch[1] + dev[1]) / 2 - 2} inView={inView} delay={0.65} align="start" size={12}>plan</Label>
        <Label x={dev[0] + 30} y={dev[1] + 14} inView={inView} delay={1.0} align="start" size={12}>code</Label>
        <Label x={bug[0] - 4} y={bug[1] + 14} inView={inView} delay={1.6} align="end" size={12}>run</Label>
      </svg>
    </div>
  );
}

// ── img-to-3d: photo → coarse → refined ─────────────────────────────
export function ImgTo3DSketch() {
  const { ref, inView } = useSketchInView();
  const photo: Point = [60, 22];
  const mesh: Point = [180, 80];
  const coarse: Point = [320, 60];
  const refine: Point = [320, 130];

  return (
    <div ref={ref} className="mt-5">
      <svg viewBox="0 0 380 170" className="w-full max-w-[420px] h-auto text-ink" role="img" aria-label="img-to-3d pipeline">
        <Connector from={photo} to={mesh}   inView={inView} seed={31} delay={0.1}  arrow={false} />
        <Connector from={mesh}  to={coarse} inView={inView} seed={32} delay={0.5}  />
        <Connector from={mesh}  to={refine} inView={inView} seed={33} delay={0.9}  />

        <NodeMark x={photo[0]}  y={photo[1]}  inView={inView} delay={0.0} seed={41} />
        <NodeMark x={mesh[0]}   y={mesh[1]}   inView={inView} delay={0.4} seed={42} />
        <NodeMark x={coarse[0]} y={coarse[1]} inView={inView} delay={0.8} seed={43} />
        <NodeMark x={refine[0]} y={refine[1]} inView={inView} delay={1.2} seed={44} />

        <Label x={photo[0]}  y={photo[1] - 10}  inView={inView} delay={0.05} align="middle" size={14}>photo</Label>
        <Label x={mesh[0]}   y={mesh[1] + 18}   inView={inView} delay={0.45} align="middle" size={14}>InstantMesh</Label>
        <Label x={coarse[0]} y={coarse[1] - 10} inView={inView} delay={0.85} align="middle" size={14}>coarse GLB</Label>
        <Label x={coarse[0] + 6} y={coarse[1] + 4}  inView={inView} delay={0.95} align="start" size={11}>~30s</Label>
        <Label x={refine[0]} y={refine[1] + 18} inView={inView} delay={1.25} align="middle" size={14}>refined GLB</Label>
        <Label x={refine[0] + 6} y={refine[1] + 4}  inView={inView} delay={1.35} align="start" size={11}>async</Label>
      </svg>
    </div>
  );
}

// ── lsp-server: src → lex → parse → ast → analyze → symbols → interp ─
export function LspSketch() {
  const { ref, inView } = useSketchInView();
  const points: Point[] = [
    [20,  50], [80,  50], [150, 50], [220, 50],
    [290, 50], [355, 50], [420, 50],
  ];
  return (
    <div ref={ref} className="mt-5">
      <svg viewBox="0 0 450 100" className="w-full max-w-[460px] h-auto text-ink" role="img" aria-label="lsp-server pipeline">
        {points.slice(0, -1).map((p, i) => (
          <Connector
            key={i}
            from={p}
            to={points[i + 1]}
            inView={inView}
            seed={50 + i}
            delay={0.1 + i * 0.18}
          />
        ))}
        {points.map((p, i) => (
          <NodeMark key={i} x={p[0]} y={p[1]} inView={inView} delay={0.05 + i * 0.18} seed={60 + i} />
        ))}
        {["src", "lex", "parse", "ast", "analyze", "symbols", "interp"].map((t, i) => (
          <Label
            key={t}
            x={points[i][0]}
            y={points[i][1] + 22}
            inView={inView}
            delay={0.15 + i * 0.18}
            align="middle"
            size={13}
          >{t}</Label>
        ))}
      </svg>
    </div>
  );
}

// ── nnn rough: a small loose "what's actually on disk" sketch ─────
// The polished NnnSketch above shows the agent flow. This is a different
// diagram — a napkin-style drawing of the actual mechanism: each agent
// reads the workspace directory, edits files, hands off to the next.
export function NnnRoughSketch() {
  const { ref, inView } = useSketchInView();
  // workspace in the middle, agents around it writing files
  return (
    <div ref={ref} className="mt-2">
      <svg viewBox="0 0 220 180" className="w-full max-w-[200px] h-auto text-ink" role="img" aria-label="nnn workspace">
        {/* workspace box in the center */}
        <motion.path
          d={handPath([30, 75], [190, 75], 701, 1.2)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        />
        <motion.path
          d={handPath([190, 75], [190, 130], 702, 1.2)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        />
        <motion.path
          d={handPath([190, 130], [30, 130], 703, 1.2)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        />
        <motion.path
          d={handPath([30, 130], [30, 75], 704, 1.2)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        />
        <Label x={110} y={108} inView={inView} delay={0.5} align="middle" size={13}>workspace/</Label>

        {/* file marks inside the box */}
        <motion.path
          d={handPath([45, 88], [80, 88], 711, 0.4)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        />
        <motion.path
          d={handPath([45, 100], [70, 100], 712, 0.4)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        />
        <motion.path
          d={handPath([130, 88], [175, 88], 713, 0.4)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        />
        <motion.path
          d={handPath([130, 100], [165, 100], 714, 0.4)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.3, delay: 1.0 }}
        />

        {/* agents as small labels around the box */}
        <Label x={110} y={36}  inView={inView} delay={0.55} align="middle" size={14}>architect</Label>
        <Label x={110} y={170} inView={inView} delay={0.6}  align="middle" size={14}>developer</Label>
        <Label x={205} y={48}  inView={inView} delay={0.65} align="start"   size={14}>bugfixer</Label>

        {/* a small "passes the dir" arrow at the bottom */}
        <Connector
          from={[60, 152]}
          to={[160, 152]}
          inView={inView}
          seed={721}
          delay={1.1}
          arrow
          arrowSize={5}
        />
        <Label x={110} y={162} inView={inView} delay={1.6} align="middle" size={11}>pass the dir</Label>
      </svg>
    </div>
  );
}



// A small "today timeline" — a hand-drawn horizontal strip with
// 4 time-of-day marks (morning / afternoon / evening / night) and
// tiny activity labels above each. Like a time log at the top of a
// notebook page.
export function TodayTimeline() {
  const slots = [
    { x: 28,  label: "morning",  what: "nnn" },
    { x: 120, label: "afternoon", what: "lockr" },
    { x: 212, label: "evening",  what: "support" },
    { x: 304, label: "night",    what: "lsp" },
  ];
  return (
    <div className="mt-5">
      <svg viewBox="0 0 360 60" className="w-full max-w-[420px] h-auto text-ink-soft" role="img" aria-label="today timeline">
        {/* main horizontal line */}
        <path
          d={handPath([16, 36], [344, 36], 901, 0.6)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
        {/* tick marks + tiny circles + labels */}
        {slots.map((s, i) => (
          <g key={i}>
            <path
              d={handPath([s.x, 30], [s.x, 42], 911 + i, 0.3)}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
            <circle cx={s.x} cy={36} r={2.4} fill="none" stroke="currentColor" strokeWidth={1.2} />
            <text
              x={s.x}
              y={20}
              fontFamily="var(--font-hand), \'Caveat\', cursive"
              fontSize={14}
              fill="currentColor"
              textAnchor="middle"
              style={{ fontStyle: "italic" }}
            >
              {s.label}
            </text>
            <text
              x={s.x}
              y={56}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontSize={9}
              fill="currentColor"
              opacity={0.7}
              textAnchor="middle"
            >
              {s.what}
            </text>
          </g>
        ))}
        {/* a small arrow at the end */}
        <path
          d={handPath([344, 36], [354, 36], 922, 0.3)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
        <path
          d="M 348 32 L 354 36 L 348 40"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

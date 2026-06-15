// Substantial hand-drawn 3D/2D illustration for each project that
// doesn't already have a diagram. Replaces the small icon-like Doodle.
// Each piece is a real drawing (200-300px wide, multi-element), in
// the same wobble language as the larger sketches. Strokes draw in
// with the same pathLength animation as the bigger diagrams.

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

function wob(from: [number, number], to: [number, number], seed: number, amp = 0.7): string {
  const rand = rng(seed);
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const segments = Math.max(2, Math.min(5, Math.round(len / 14)));
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  let d = `M ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const bx = x1 + dx * t;
    const by = y1 + dy * t;
    const sign = i % 2 === 0 ? -1 : 1;
    const a = amp * (0.4 + rand() * 0.9) * sign;
    d += ` L ${(bx + px * a).toFixed(2)} ${(by + py * a).toFixed(2)}`;
  }
  d += ` L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  return d;
}

// A 3D hand-drawn padlock with a Solana diamond inside. Open shackle.
function Padlock3D({ inView }: { inView: boolean }) {
  return (
    <g>
      {/* shackle — opens to the left, slightly raised */}
      <motion.path
        d={wob([55, 30], [55, 18], 1001, 0.4) + " " +
            wob([55, 18], [62, 8],  1002, 0.4) + " " +
            wob([62, 8],  [82, 8],  1003, 0.4) + " " +
            wob([82, 8],  [89, 18], 1004, 0.4) + " " +
            wob([89, 18], [89, 30], 1005, 0.4)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* body — front face */}
      <motion.path
        d={wob([50, 30], [50, 78], 1010, 0.3) + " " +
            wob([50, 78], [108, 78], 1011, 0.3) + " " +
            wob([108, 78], [108, 30], 1012, 0.3) + " " +
            wob([108, 30], [50, 30], 1013, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      />
      {/* 3d side panel */}
      <motion.path
        d={wob([108, 30], [124, 22], 1020, 0.3) + " " +
            wob([124, 22], [124, 70], 1021, 0.3) + " " +
            wob([124, 70], [108, 78], 1022, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
      />
      <motion.path
        d={wob([50, 30], [66, 22], 1025, 0.3) + " " +
            wob([66, 22], [124, 22], 1026, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.4, delay: 0.85, ease: "easeOut" }}
      />
      {/* Solana diamond on the front */}
      <motion.path
        d={wob([79, 50], [89, 40], 1030, 0.3) + " " +
            wob([89, 40], [99, 50], 1031, 0.3) + " " +
            wob([99, 50], [89, 60], 1032, 0.3) + " " +
            wob([89, 60], [79, 50], 1033, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.35, delay: 1.0, ease: "easeOut" }}
      />
      <motion.text
        x={89} y={54} fontFamily="var(--font-mono)" fontSize={9} fill="currentColor" textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >$</motion.text>
    </g>
  );
}

// Three side-by-side compare panels. The middle one is slightly larger.
function CompareCanvas({ inView }: { inView: boolean }) {
  const panels = [
    { x: 18,  w: 50, h: 56, y: 22 },
    { x: 78,  w: 56, h: 64, y: 18 },
    { x: 142, w: 50, h: 56, y: 22 },
  ];
  return (
    <g>
      {panels.map((p, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, pathLength: 0 }}
          animate={inView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          transition={{ duration: 0.4, delay: 0.15 * i, ease: "easeOut" }}
        >
          {/* panel border */}
          <path
            d={wob([p.x, p.y], [p.x + p.w, p.y], 1100 + i, 0.3) + " " +
                wob([p.x + p.w, p.y], [p.x + p.w, p.y + p.h], 1105 + i, 0.3) + " " +
                wob([p.x + p.w, p.y + p.h], [p.x, p.y + p.h], 1110 + i, 0.3) + " " +
                wob([p.x, p.y + p.h], [p.x, p.y], 1115 + i, 0.3)}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          {/* avatar circle */}
          <ellipse
            cx={p.x + p.w / 2}
            cy={p.y + 14}
            rx={6}
            ry={6}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.1}
            transform={`rotate(${rng(1120 + i)() * 6 - 3} ${p.x + p.w / 2} ${p.y + 14})`}
          />
          {/* 2-3 name lines */}
          <path d={wob([p.x + 6, p.y + 26], [p.x + p.w - 6, p.y + 26], 1125 + i, 0.2)} fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" />
          <path d={wob([p.x + 6, p.y + 32], [p.x + p.w - 12, p.y + 32], 1130 + i, 0.2)} fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" opacity={0.6} />
          <path d={wob([p.x + 6, p.y + 38], [p.x + p.w - 18, p.y + 38], 1135 + i, 0.2)} fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" opacity={0.6} />
          <path d={wob([p.x + 6, p.y + 44], [p.x + p.w - 9, p.y + 44], 1140 + i, 0.2)} fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" opacity={0.6} />
        </motion.g>
      ))}
      {/* a small "↔" between the panels */}
      <motion.text x={71} y={56} fontFamily="var(--font-hand)" fontSize={16} fill="currentColor" textAnchor="middle" fontStyle="italic" opacity={0.6}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.6 } : { opacity: 0 }} transition={{ duration: 0.3, delay: 0.7 }}
      >↔</motion.text>
      <motion.text x={136} y={56} fontFamily="var(--font-hand)" fontSize={16} fill="currentColor" textAnchor="middle" fontStyle="italic" opacity={0.6}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.6 } : { opacity: 0 }} transition={{ duration: 0.3, delay: 0.8 }}
      >↔</motion.text>
    </g>
  );
}

// A 2D terminal window with a small rendered card beside it.
function TerminalAndCard({ inView }: { inView: boolean }) {
  return (
    <g>
      {/* terminal window */}
      <motion.path
        d={wob([14, 18], [108, 18], 1200, 0.3) + " " +
            wob([108, 18], [108, 70], 1201, 0.3) + " " +
            wob([108, 70], [14, 70], 1202, 0.3) + " " +
            wob([14, 70], [14, 18], 1203, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* title bar separator */}
      <motion.path
        d={wob([14, 26], [108, 26], 1205, 0.2)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      />
      {/* traffic lights */}
      {[20, 25, 30].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx} cy={22} r={1.4} fill="none" stroke="currentColor" strokeWidth={0.9}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.4 + i * 0.05 }}
        />
      ))}
      {/* prompt */}
      <motion.text x={20} y={36} fontFamily="var(--font-mono)" fontSize={8} fill="currentColor"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.3, delay: 0.55 }}
      >&gt; snip</motion.text>
      <motion.text x={20} y={48} fontFamily="var(--font-mono)" fontSize={8} fill="currentColor" opacity={0.7}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.7 } : { opacity: 0 }} transition={{ duration: 0.3, delay: 0.7 }}
      >  --style=card</motion.text>
      <motion.text x={20} y={60} fontFamily="var(--font-mono)" fontSize={8} fill="currentColor" opacity={0.5}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.5 } : { opacity: 0 }} transition={{ duration: 0.3, delay: 0.85 }}
      >  → out.png</motion.text>
      {/* cursor */}
      <motion.path d={wob([58, 56], [62, 56], 1210, 0.2)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 0.2, delay: 0.95, ease: "easeOut" }}
      />

      {/* output card on the right */}
      <motion.path
        d={wob([128, 18], [188, 18], 1215, 0.3) + " " +
            wob([188, 18], [188, 70], 1216, 0.3) + " " +
            wob([188, 70], [128, 70], 1217, 0.3) + " " +
            wob([128, 70], [128, 18], 1218, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      />
      {/* card top — a small gradient strip */}
      {[28, 34, 40, 46, 52, 58].map((y, i) => (
        <motion.path
          key={y}
          d={wob([134, y], [182 - i * 2, y], 1220 + i, 0.2)}
          fill="none"
          stroke="currentColor"
          strokeWidth={y === 28 ? 1.2 : 0.9}
          strokeLinecap="round"
          opacity={y === 28 ? 1 : 0.5}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.25, delay: 0.9 + i * 0.06, ease: "easeOut" }}
        />
      ))}
    </g>
  );
}

// A 3d-ish mycelium network — a central node with 5-6 branching tendrils.
function MyceliumNet({ inView }: { inView: boolean }) {
  const cx = 110;
  const cy = 48;
  const nodes: [number, number, number][] = [
    [50, 18, 10], [50, 38, 12], [50, 60, 8],
    [160, 24, 9], [160, 56, 11],
    [110, 14, 10],
  ];
  return (
    <g>
      {/* tendrils from center to nodes */}
      {nodes.map(([x, y], i) => {
        const rand = rng(1310 + i);
        const mx = (cx + x) / 2 + (rand() - 0.5) * 8;
        const my = (cy + y) / 2 + (rand() - 0.5) * 8;
        const sx = mx + (rand() - 0.5) * 18;
        const sy = my + (rand() - 0.5) * 18;
        return (
          <g key={i}>
            <motion.path
              d={wob([cx, cy], [x, y], 1300 + i, 1.2)}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.1}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.5, delay: 0.12 * i, ease: "easeOut" }}
            />
            <motion.path
              d={wob([mx, my], [sx, sy], 1315 + i, 0.6)}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.8}
              strokeLinecap="round"
              opacity={0.6}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + 0.12 * i, ease: "easeOut" }}
            />
          </g>
        );
      })}
      {/* end nodes — small irregular circles */}
      {nodes.map(([x, y], i) => (
        <motion.ellipse
          key={`n${i}`}
          cx={x}
          cy={y}
          rx={3.2 + rng(1320 + i)() * 1.2}
          ry={3.2 + rng(1325 + i)() * 1.2}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.1}
          transform={`rotate(${rng(1330 + i)() * 30 - 15} ${x} ${y})`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.25, delay: 0.55 + 0.1 * i, ease: "easeOut" }}
        />
      ))}
      {/* center node — bigger */}
      <motion.ellipse cx={cx} cy={cy} rx={5} ry={5} fill="none" stroke="currentColor" strokeWidth={1.2}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
        transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
      />
    </g>
  );
}

// A 2D mesh grid — 6x4 small squares, some filled with diagonal hatching.
function MeshGrid({ inView }: { inView: boolean }) {
  const cellW = 18;
  const cellH = 14;
  const cols = 6;
  const rows = 4;
  const ox = 30;
  const oy = 12;
  const rand = rng(1400);
  return (
    <g>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const filled = rand() > 0.55;
          const x = ox + c * cellW;
          const y = oy + r * cellH;
          const delay = (r * cols + c) * 0.03 + 0.1;
          return (
            <g key={`${r}-${c}`}>
              <motion.path
                d={wob([x, y], [x + cellW, y], 1410 + r * cols + c, 0.15) + " " +
                    wob([x + cellW, y], [x + cellW, y + cellH], 1420 + r * cols + c, 0.15) + " " +
                    wob([x + cellW, y + cellH], [x, y + cellH], 1430 + r * cols + c, 0.15) + " " +
                    wob([x, y + cellH], [x, y], 1440 + r * cols + c, 0.15)}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                opacity={filled ? 1 : 0.45}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.3, delay, ease: "easeOut" }}
              />
              {filled && (
                <motion.path
                  d={wob([x + 2, y + cellH - 2], [x + cellW - 2, y + 2], 1450 + r * cols + c, 0.2)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.9}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.25, delay: delay + 0.15, ease: "easeOut" }}
                />
              )}
            </g>
          );
        })
      )}
    </g>
  );
}

// A 2D leaf with a stem and a curl.
function LeafVine({ inView }: { inView: boolean }) {
  return (
    <g>
      {/* main leaf shape */}
      <motion.path
        d={wob([80, 18], [120, 30], 1500, 0.4) + " " +
            wob([120, 30], [132, 56], 1501, 0.4) + " " +
            wob([132, 56], [110, 76], 1502, 0.4) + " " +
            wob([110, 76], [74, 68], 1503, 0.4) + " " +
            wob([74, 68], [56, 44], 1504, 0.4) + " " +
            wob([56, 44], [80, 18], 1505, 0.4)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {/* central vein */}
      <motion.path
        d={wob([80, 18], [110, 76], 1510, 0.4)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      />
      {/* side veins */}
      {[
        [82, 30, 100, 28],
        [86, 42, 110, 42],
        [88, 54, 114, 54],
        [92, 64, 110, 64],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.path
          key={i}
          d={wob([x1, y1], [x2, y2], 1520 + i, 0.3)}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.9}
          strokeLinecap="round"
          opacity={0.6}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.25, delay: 0.65 + i * 0.06, ease: "easeOut" }}
        />
      ))}
      {/* a curl at the bottom */}
      <motion.path
        d={wob([110, 76], [124, 78], 1530, 0.4) + " " +
            wob([124, 78], [128, 70], 1531, 0.4) + " " +
            wob([128, 70], [122, 66], 1532, 0.4)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.35, delay: 1.0, ease: "easeOut" }}
      />
    </g>
  );
}

// A 2D document with text lines and a small cursor.
function Doc({ inView }: { inView: boolean }) {
  return (
    <g>
      {/* doc border */}
      <motion.path
        d={wob([30, 14], [140, 14], 1600, 0.3) + " " +
            wob([140, 14], [150, 24], 1601, 0.3) + " " +
            wob([150, 24], [150, 88], 1602, 0.3) + " " +
            wob([150, 88], [40, 88], 1603, 0.3) + " " +
            wob([40, 88], [30, 78], 1604, 0.3) + " " +
            wob([30, 78], [30, 14], 1605, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {/* corner fold */}
      <motion.path
        d={wob([140, 14], [140, 24], 1610, 0.3) + " " +
            wob([140, 24], [150, 24], 1611, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
      />
      {/* h1 line */}
      <motion.path
        d={wob([42, 30], [108, 30], 1620, 0.2)}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
      />
      {/* text lines */}
      {[
        [42, 42, 134],
        [42, 50, 124],
        [42, 58, 138],
        [42, 66, 118],
        [42, 74, 130],
        [42, 82, 110],
      ].map(([x, y, w], i) => (
        <motion.path
          key={i}
          d={wob([x, y], [w, y], 1630 + i, 0.2)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.6}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.3, delay: 0.85 + i * 0.05, ease: "easeOut" }}
        />
      ))}
    </g>
  );
}

// A 2D brain with a knot — two rounded lobes with a small knot inside.
function BrainKnot({ inView }: { inView: boolean }) {
  return (
    <g>
      {/* left lobe */}
      <motion.path
        d={wob([42, 30], [38, 50], 1700, 0.5) + " " +
            wob([38, 50], [44, 70], 1701, 0.5) + " " +
            wob([44, 70], [70, 78], 1702, 0.5) + " " +
            wob([70, 78], [86, 60], 1703, 0.5) + " " +
            wob([86, 60], [82, 40], 1704, 0.5) + " " +
            wob([82, 40], [62, 30], 1705, 0.5) + " " +
            wob([62, 30], [42, 30], 1706, 0.5)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {/* right lobe */}
      <motion.path
        d={wob([82, 40], [108, 30], 1710, 0.5) + " " +
            wob([108, 30], [138, 40], 1711, 0.5) + " " +
            wob([138, 40], [142, 60], 1712, 0.5) + " " +
            wob([142, 60], [128, 80], 1713, 0.5) + " " +
            wob([128, 80], [102, 82], 1714, 0.5) + " " +
            wob([102, 82], [86, 60], 1715, 0.5)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      />
      {/* center divide */}
      <motion.path
        d={wob([82, 40], [86, 60], 1720, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={0.7}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.25, delay: 0.95, ease: "easeOut" }}
      />
      {/* the knot — a small self-crossing curve in the middle */}
      <motion.path
        d={wob([74, 50], [94, 50], 1730, 0.3) + " " +
            wob([74, 50], [78, 56], 1731, 0.3) + " " +
            wob([94, 50], [90, 56], 1732, 0.3) + " " +
            wob([78, 56], [90, 56], 1733, 0.3)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
      />
    </g>
  );
}

// The container — picks the right drawing for the project name and
// animates the strokes when the card scrolls into view.
export function ProjectArt({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="mt-4 mb-3 -mx-1">
      <svg
        viewBox="0 0 180 110"
        className="w-full h-auto text-ink"
        style={{ filter: "drop-shadow(0 0 1px rgba(31, 41, 55, 0.05))" }}
        aria-label={`${name} — hand-drawn illustration`}
      >
        {name === "lockr"             && <Padlock3D inView={inView} />}
        {name === "tdc-matchmaker-2"  && <CompareCanvas inView={inView} />}
        {name === "snip"              && <TerminalAndCard inView={inView} />}
        {name === "mycelium"          && <MyceliumNet inView={inView} />}
        {name === "shader-labs"       && <MeshGrid inView={inView} />}
        {name === "tomato-css"        && <LeafVine inView={inView} />}
        {name === "serve-md"          && <Doc inView={inView} />}
        {name === "neuro-2e"          && <BrainKnot inView={inView} />}
      </svg>
    </div>
  );
}

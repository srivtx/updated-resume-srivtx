// A small hand-drawn mark in the corner of a card. Each project gets
// its own thematic doodle — a notebook margin scribble, not a stamp.
// Same wobble language as the larger sketches.

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Mulberry32 — deterministic per seed, so the doodle is the same on
// every visit. Each doodle is a "drawing" the user might have made
// once in the margin of their notebook.
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

// A wobbly segment — two endpoints, a perpendicular offset for the
// control point. Used for every line in every doodle.
function wob(from: [number, number], to: [number, number], seed: number, amp = 1.0): string {
  const rand = rng(seed);
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const segments = Math.max(2, Math.min(4, Math.round(len / 14)));
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const overshoot = 1 + rand() * 1.5;
  const sx = x1 - ux * overshoot;
  const sy = y1 - uy * overshoot;
  const ex = x2 + ux * overshoot;
  const ey = y2 + uy * overshoot;
  let d = `M ${sx.toFixed(2)} ${sy.toFixed(2)}`;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const bx = sx + (ex - sx) * t;
    const by = sy + (ey - sy) * t;
    const sign = i % 2 === 0 ? -1 : 1;
    const a = amp * (0.4 + rand() * 0.8) * sign;
    const ox = bx + px * a;
    const oy = by + py * a;
    d += ` Q ${ox.toFixed(2)} ${oy.toFixed(2)} ${(sx + (ex - sx) * t).toFixed(2)} ${(sy + (ey - sy) * t).toFixed(2)}`;
  }
  return d;
}

// A tiny + mark, the kind you put next to a note in the margin.
function Cross({ cx, cy, r = 2.5, seed }: { cx: number; cy: number; r?: number; seed: number }) {
  return (
    <g>
      <path d={wob([cx - r, cy], [cx + r, cy], seed * 7, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([cx, cy - r], [cx, cy + r], seed * 11, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

// A small open loop — what you draw around something to call it out.
function Loop({ cx, cy, r = 4, seed = 1, tilt = 0 }: { cx: number; cy: number; r?: number; seed?: number; tilt?: number }) {
  // a slightly squashed circle with a starting point that doesn't quite
  // meet the end point — like a hand-drawn loop, not a perfect circle
  const points: [number, number][] = [];
  for (let i = 0; i <= 18; i++) {
    const a = (i / 18) * Math.PI * 2 + tilt;
    const rr = r * (0.95 + (rng(seed * 31 + i)() - 0.5) * 0.15);
    points.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    d += ` L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  }
  return (
    <path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeDasharray="0.5 0"
    />
  );
}

// A small leaf/sprig — three ovoids on a stem, like a stylized twig.
function Sprig({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const r = size;
  // stem — short vertical-ish line going up
  return (
    <g>
      <path d={wob([x, y], [x + 1, y - r * 0.7], seed * 13, 0.5)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      {/* left leaf */}
      <ellipse cx={x - r * 0.35} cy={y - r * 0.45} rx={r * 0.25} ry={r * 0.12} transform={`rotate(-30 ${x - r * 0.35} ${y - r * 0.45})`} fill="none" stroke="currentColor" strokeWidth={1.1} />
      {/* right leaf */}
      <ellipse cx={x + r * 0.35} cy={y - r * 0.6} rx={r * 0.25} ry={r * 0.12} transform={`rotate(30 ${x + r * 0.35} ${y - r * 0.6})`} fill="none" stroke="currentColor" strokeWidth={1.1} />
      {/* top leaf */}
      <ellipse cx={x + r * 0.05} cy={y - r * 0.85} rx={r * 0.18} ry={r * 0.1} fill="none" stroke="currentColor" strokeWidth={1.1} />
    </g>
  );
}

// A small flower — 5 petals around a center dot. Hand-drawn.
function Flower({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const r = size;
  const cx = x;
  const cy = y;
  const petalR = r * 0.28;
  const dist = r * 0.32;
  // 5 petals
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const px = cx + Math.cos(a) * dist;
        const py = cy + Math.sin(a) * dist;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={petalR}
            ry={petalR * 0.85}
            transform={`rotate(${(a * 180) / Math.PI + 90} ${px} ${py})`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.1}
          />
        );
      })}
      {/* center dot — small wobbly circle */}
      <Loop cx={cx} cy={cy} r={r * 0.12} seed={seed * 17} />
    </g>
  );
}

// A tiny terminal cursor — `> _` — three short strokes.
function TerminalCursor({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  return (
    <g>
      <path d={wob([x - size * 0.3, y + size * 0.1], [x - size * 0.05, y - size * 0.1], seed, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
      <path d={wob([x - size * 0.05, y - size * 0.1], [x + size * 0.1, y + size * 0.1], seed * 3, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
      {/* underscore */}
      <path d={wob([x + size * 0.15, y + size * 0.15], [x + size * 0.4, y + size * 0.15], seed * 5, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

// A small 3D cube wireframe — three overlapping parallelograms.
function Cube3D({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const s = size;
  // front face corners
  const fl: [number, number] = [x - s * 0.4, y - s * 0.2];
  const fr: [number, number] = [x + s * 0.05, y - s * 0.2];
  const fbr: [number, number] = [x + s * 0.05, y + s * 0.3];
  const fbl: [number, number] = [x - s * 0.4, y + s * 0.3];
  // back face offset up-right
  const bl: [number, number] = [x - s * 0.2, y - s * 0.45];
  const br: [number, number] = [x + s * 0.25, y - s * 0.45];
  return (
    <g>
      <path d={wob(fl, fr, seed, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob(fr, fbr, seed + 1, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob(fbr, fbl, seed + 2, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob(fbl, fl, seed + 3, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob(fl, bl, seed + 4, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob(fr, br, seed + 5, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob(bl, br, seed + 6, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

// A small lock — body + arch.
function Lock({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const s = size;
  // body — rounded rect (just a wobble for the body)
  const body = [x - s * 0.4, y + s * 0.1, s * 0.8, s * 0.55];
  // arch above
  return (
    <g>
      <path d={wob([body[0], body[1]], [body[0] + body[2], body[1]], seed, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([body[0] + body[2], body[1]], [body[0] + body[2], body[1] + body[3]], seed + 1, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([body[0] + body[2], body[1] + body[3]], [body[0], body[1] + body[3]], seed + 2, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([body[0], body[1] + body[3]], [body[0], body[1]], seed + 3, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      {/* arch — U shape */}
      <path d={wob([x - s * 0.3, y + s * 0.1], [x - s * 0.3, y - s * 0.1], seed + 4, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x - s * 0.3, y - s * 0.1], [x, y - s * 0.35], seed + 5, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x, y - s * 0.35], [x + s * 0.3, y - s * 0.1], seed + 6, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x + s * 0.3, y - s * 0.1], [x + s * 0.3, y + s * 0.1], seed + 7, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

// A small mesh grid — 3x3 squares.
function Mesh({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const s = size;
  const left = x - s * 0.4;
  const top = y - s * 0.4;
  return (
    <g>
      {/* 2 horizontal + 2 vertical lines, wobbly */}
      <path d={wob([left, top + s * 0.0], [left + s * 0.8, top + s * 0.0], seed, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d={wob([left, top + s * 0.27], [left + s * 0.8, top + s * 0.27], seed + 1, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d={wob([left, top + s * 0.53], [left + s * 0.8, top + s * 0.53], seed + 2, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d={wob([left, top + s * 0.8], [left + s * 0.8, top + s * 0.8], seed + 3, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d={wob([left + s * 0.0, top], [left + s * 0.0, top + s * 0.8], seed + 4, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d={wob([left + s * 0.27, top], [left + s * 0.27, top + s * 0.8], seed + 5, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d={wob([left + s * 0.53, top], [left + s * 0.53, top + s * 0.8], seed + 6, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.1} />
      <path d={wob([left + s * 0.8, top], [left + s * 0.8, top + s * 0.8], seed + 7, 0.3)} fill="none" stroke="currentColor" strokeWidth={1.1} />
    </g>
  );
}

// Two small interlocking circles.
function LinkedCircles({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const r = size * 0.32;
  return (
    <g>
      <Loop cx={x - r * 0.55} cy={y} r={r} seed={seed} />
      <Loop cx={x + r * 0.55} cy={y} r={r} seed={seed + 7} />
    </g>
  );
}

// A small mycelium network — a node with branching lines.
function MyceliumNet({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const r = size;
  return (
    <g>
      {/* main node */}
      <Loop cx={x} cy={y} r={r * 0.12} seed={seed} />
      {/* 3 branches */}
      <path d={wob([x, y - r * 0.1], [x - r * 0.4, y - r * 0.4], seed + 1, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" />
      <path d={wob([x, y - r * 0.1], [x + r * 0.4, y - r * 0.2], seed + 2, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" />
      <path d={wob([x, y + r * 0.1], [x - r * 0.1, y + r * 0.4], seed + 3, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" />
      <path d={wob([x, y + r * 0.1], [x + r * 0.3, y + r * 0.45], seed + 4, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" />
      {/* small dots at branch ends */}
      <Cross cx={x - r * 0.4} cy={y - r * 0.4} seed={seed + 5} />
      <Cross cx={x + r * 0.4} cy={y - r * 0.2} seed={seed + 6} />
      <Cross cx={x - r * 0.1} cy={y + r * 0.4} seed={seed + 7} />
      <Cross cx={x + r * 0.3} cy={y + r * 0.45} seed={seed + 8} />
    </g>
  );
}

// Curly braces — { } — for lsp-server.
function Braces({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const s = size;
  return (
    <g>
      {/* left brace */}
      <path d={wob([x - s * 0.4, y - s * 0.4], [x - s * 0.5, y - s * 0.15], seed, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x - s * 0.5, y - s * 0.15], [x - s * 0.25, y], seed + 1, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x - s * 0.25, y], [x - s * 0.5, y + s * 0.15], seed + 2, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x - s * 0.5, y + s * 0.15], [x - s * 0.4, y + s * 0.4], seed + 3, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      {/* right brace */}
      <path d={wob([x + s * 0.4, y - s * 0.4], [x + s * 0.5, y - s * 0.15], seed + 4, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x + s * 0.5, y - s * 0.15], [x + s * 0.25, y], seed + 5, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x + s * 0.25, y], [x + s * 0.5, y + s * 0.15], seed + 6, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x + s * 0.5, y + s * 0.15], [x + s * 0.4, y + s * 0.4], seed + 7, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

// A small markdown doc — rectangle with a tab.
function Doc({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const s = size;
  return (
    <g>
      <path d={wob([x - s * 0.3, y - s * 0.4], [x + s * 0.3, y - s * 0.4], seed, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x + s * 0.3, y - s * 0.4], [x + s * 0.3, y + s * 0.4], seed + 1, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x + s * 0.3, y + s * 0.4], [x - s * 0.3, y + s * 0.4], seed + 2, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <path d={wob([x - s * 0.3, y + s * 0.4], [x - s * 0.3, y - s * 0.4], seed + 3, 0.4)} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      {/* corner fold */}
      <path d={wob([x + s * 0.1, y - s * 0.4], [x + s * 0.1, y - s * 0.2], seed + 4, 0.3)} fill="none" stroke="currentColor" strokeWidth={1} />
      <path d={wob([x + s * 0.1, y - s * 0.2], [x + s * 0.3, y - s * 0.2], seed + 5, 0.3)} fill="none" stroke="currentColor" strokeWidth={1} />
      {/* three text-line marks inside */}
      <path d={wob([x - s * 0.18, y - s * 0.05], [x + s * 0.18, y - s * 0.05], seed + 6, 0.2)} fill="none" stroke="currentColor" strokeWidth={1} />
      <path d={wob([x - s * 0.18, y + s * 0.08], [x + s * 0.1, y + s * 0.08], seed + 7, 0.2)} fill="none" stroke="currentColor" strokeWidth={1} />
      <path d={wob([x - s * 0.18, y + s * 0.21], [x + s * 0.05, y + s * 0.21], seed + 8, 0.2)} fill="none" stroke="currentColor" strokeWidth={1} />
    </g>
  );
}

// A small knot — two loops crossed. For neuro-2e.
function Knot({ x, y, seed = 1, size = 22 }: { x: number; y: number; seed?: number; size?: number }) {
  const r = size * 0.3;
  return (
    <g>
      <Loop cx={x - r * 0.4} cy={y - r * 0.3} r={r} seed={seed} tilt={0.4} />
      <Loop cx={x + r * 0.4} cy={y + r * 0.3} r={r} seed={seed + 7} tilt={0.4} />
    </g>
  );
}

// The Doodle component. Picks a doodle by `name` (matching the project
// name in the supporting array) and animates it in when the card scrolls
// into view.
export function Doodle({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const cx = 22;
  const cy = 22;

  return (
    <div ref={ref} className="absolute top-4 right-4 text-ink-faint pointer-events-none">
      <motion.svg
        viewBox="0 0 44 44"
        width={56}
        height={56}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-hidden
      >
        {name === "nnn" && (
          <>
            <Cross cx={cx - 8} cy={cy - 4} seed={101} />
            <Cross cx={cx}     cy={cy - 4} seed={102} />
            <Cross cx={cx + 8} cy={cy - 4} seed={103} />
            <Cross cx={cx - 8} cy={cy + 8} seed={104} />
            <Cross cx={cx}     cy={cy + 8} seed={105} />
          </>
        )}
        {name === "img-to-3d" && <Cube3D x={cx} y={cy} seed={201} />}
        {name === "lsp-server" && <Braces x={cx} y={cy} seed={301} />}
        {name === "mycelium" && <MyceliumNet x={cx} y={cy + 4} seed={401} />}
        {name === "lockr" && <Lock x={cx} y={cy + 2} seed={501} />}
        {name === "tdc-matchmaker-2" && <LinkedCircles x={cx} y={cy} seed={601} />}
        {name === "shader-labs" && <Mesh x={cx} y={cy} seed={701} />}
        {name === "snip" && <TerminalCursor x={cx} y={cy} seed={801} />}
        {name === "tomato-css" && <Sprig x={cx} y={cy + 8} seed={901} />}
        {name === "serve-md" && <Doc x={cx} y={cy} seed={1001} />}
        {name === "neuro-2e" && <Knot x={cx} y={cy} seed={1101} />}
        {/* generic fallback — a small flower, in case a project slips through */}
        {!["nnn", "img-to-3d", "lsp-server", "mycelium", "lockr", "tdc-matchmaker-2", "shader-labs", "snip", "tomato-css", "serve-md", "neuro-2e"].includes(name) && (
          <Flower x={cx} y={cy} seed={99001} />
        )}
      </motion.svg>
    </div>
  );
}

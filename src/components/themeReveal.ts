// The theme-switch reveal. The View Transitions API holds the old page as
// a still picture and shows the new one through a mask. Every frame, a
// small pixel map (2×2 dots per 8px cell of the screen) says which cells
// already show the new theme; the browser scales it up with crisp edges.
//
// On top, on a layer of its own that the mask never clips, the moving
// edge is painted: each cell glows in its effect's colours for a moment
// as it turns over, with a soft halo, and fades. Sky also has stars, a
// shooting star and a rising sun.
//
//   dusk    night falls from the top through a sunset band; dawn rises
//   garden  Tulip Labs pixel tulips sprout in petal colours and grow
//   read    a sky-blue highlighter reads the words on screen, in order
//   year    the real GitHub year paints the page in contribution greens
//   sky     twilight, stars pricking out, a shooting star; by day, a sunrise

export type Fx = "dusk" | "garden" | "read" | "year" | "sky";
export const FX: Fx[] = ["dusk", "garden", "read", "year", "sky"];

const CELL = 8; // css px per cell
const DOTS = 2; // map dots per cell side: the browser only enlarges 4×, so cells stay sharp
const SUB = 4; // dots per cell side on the colour layer: each coloured cell is 3×3 of 4, a 6px square with a 2px gap (the mosaic look)
const DURATION = 2600; // slow enough to follow
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const OPEN = [".#.#.#.", "###.###", "##...##", ".##.##.", "#..#..#", "##.#.##", ".#####."];
const BUD = ["..###..", ".#####.", ".#####.", "..###..", "#..#..#", "##.#.##", ".#####."];

// a gentle sine curve: it starts and lands softly without rushing the middle
const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const hash = (x: number, y: number, s = 0) => {
  const h = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
  return h - Math.floor(h);
};
const bayer = (x: number, y: number) => BAYER[y % 4][x % 4] / 16;
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// a pixel as one number, the way canvas image data stores it (RGBA bytes)
const pack = (r: number, g: number, b: number, a: number) =>
  ((Math.round(a * 255) << 24) | (b << 16) | (g << 8) | r) >>> 0;
// a palette is the colours a cell passes through after it turns, freshest first
const ramp = (colours: string[], alphas: number[]) =>
  colours.map((c, i) => {
    const n = parseInt(c.slice(1), 16);
    return pack((n >> 16) & 255, (n >> 8) & 255, n & 255, alphas[i] ?? alphas[alphas.length - 1]);
  });
const hold = (c: string) => ramp([c, c, c, c, c, c], [1, 1, 0.95, 0.75, 0.45, 0.2]);

/* ---------- the real GitHub year, fetched once and kept ---------- */

// each day's place in the year, 0 = the busiest day, 1 = the quietest
// (ranked by count, so a year of mostly quiet days still spreads evenly)
let year: number[] | null = null;
export function prefetchYear() {
  if (year) return;
  fetch("/year.json")
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      const counts: number[] = d && Array.isArray(d.counts) ? d.counts : [];
      if (!counts.length) return;
      const order = counts.map((c, i) => [c, i]).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
      const rank = new Array(counts.length);
      order.forEach(([, i], r) => (rank[i] = r / Math.max(1, counts.length - 1)));
      year = rank;
    })
    .catch(() => {});
}

/* ---------- the effects ---------- */

type Grid = { cols: number; rows: number; bx: number; by: number };
// when: 0..1, the moment each cell turns over
// kind: which palette its edge glows in (0 = none)
// window: how long (in 0..1 of the sweep) the glow lasts
type Plan = { when: Float32Array; kind: Uint8Array; palettes: number[][]; window: number };

function dusk(g: Grid, toDark: boolean): Plan {
  const { cols, rows } = g;
  const when = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const row = toDark ? y / rows : (rows - 1 - y) / rows;
      when[y * cols + x] = row * 0.78 + bayer(x, y) * 0.22;
    }
  return {
    when,
    kind: new Uint8Array(cols * rows).fill(1),
    window: 0.16,
    palettes: [
      toDark
        ? // sunset: gold, orange, rose, violet, then night
          ramp(["#ffe08a", "#ffb35c", "#ff7a59", "#ff6fb5", "#9b6bff", "#3b2f8f"], [0.95, 0.95, 0.9, 0.8, 0.55, 0.25])
        : // dawn: indigo, violet, rose, peach, gold, then day
          ramp(["#3b2f8f", "#9b6bff", "#ff6fb5", "#ff9a6b", "#ffc970", "#fff1b8"], [0.6, 0.8, 0.9, 0.9, 0.7, 0.3]),
    ],
  };
}

// tulips: each seed grows the 7×7 glyph larger and larger; a cell turns
// over at the first size where a petal or leaf covers it, and glows in
// that flower's petal colour or in leaf green
function garden(g: Grid, toDark: boolean): Plan {
  const { cols, rows } = g;
  const when = new Float32Array(cols * rows).fill(2);
  const kind = new Uint8Array(cols * rows);
  const glyph = toDark ? BUD : OPEN;
  const seeds: [number, number][] = [[g.bx, g.by + 4]];
  for (let i = 0; i < 9; i++) seeds.push([Math.floor(hash(i, 1, 3) * cols), Math.floor(hash(i, 2, 5) * rows)]);
  const maxK = Math.ceil(Math.max(cols, rows) / 9);
  seeds.forEach(([sx, sy], si) => {
    const start = si === 0 ? 0 : 0.04 + hash(si, 7) * 0.22;
    const petal = 1 + (si % 4); // four petal colours
    for (let k = 1; k <= maxK; k++) {
      const t = start + (k / maxK) * 0.62;
      for (let gy = 0; gy < 7; gy++)
        for (let gx = 0; gx < 7; gx++) {
          if (glyph[gy][gx] !== "#") continue;
          const x0 = Math.floor(sx + (gx - 3.5) * k);
          const y0 = Math.floor(sy + (gy - 3.5) * k);
          for (let y = Math.max(0, y0); y < Math.min(rows, y0 + k); y++)
            for (let x = Math.max(0, x0); x < Math.min(cols, x0 + k); x++) {
              const i = y * cols + x;
              if (t < when[i]) {
                when[i] = t;
                kind[i] = gy < 4 ? petal : 5;
              }
            }
        }
    }
  });
  // whatever the flowers missed fills in last, dithered, without colour
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const fill = 0.62 + bayer(x, y) * 0.38;
      if (fill < when[i]) {
        when[i] = fill;
        kind[i] = 0;
      }
    }
  return {
    when,
    kind,
    window: 0.2,
    palettes: [hold("#ff6fb5"), hold("#ff4d6d"), hold("#ffb347"), hold("#b07cff"), hold("#3cad4f")],
  };
}

// a highlighter reads the words on screen, line by line, in reading order
function read(g: Grid): Plan {
  const { cols, rows } = g;
  const when = new Float32Array(cols * rows).fill(-1);
  const kind = new Uint8Array(cols * rows);
  const lines: DOMRect[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (!n.textContent || !n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || el.closest("[aria-hidden='true'],script,style")) continue;
    range.selectNodeContents(n);
    for (const r of Array.from(range.getClientRects())) {
      if (r.width < 2 || r.bottom < 0 || r.top > rows * CELL || r.right < 0 || r.left > cols * CELL) continue;
      lines.push(r);
    }
  }
  const n = Math.max(1, lines.length);
  lines.forEach((r, li) => {
    const x0 = Math.max(0, Math.floor(r.left / CELL));
    const x1 = Math.min(cols - 1, Math.floor(r.right / CELL));
    const y0 = Math.max(0, Math.floor(r.top / CELL));
    const y1 = Math.min(rows - 1, Math.floor((r.bottom - 1) / CELL));
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        const v = ((li + (x - x0) / Math.max(1, x1 - x0 + 1)) / n) * 0.6;
        const i = y * cols + x;
        if (when[i] < 0 || v < when[i]) {
          when[i] = v;
          kind[i] = 1;
        }
      }
  });
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      if (when[i] < 0) when[i] = 0.62 + (y / rows) * 0.26 + bayer(x, y) * 0.12;
    }
  return {
    when,
    kind,
    window: 0.14,
    palettes: [ramp(["#1f8fe0", "#1f8fe0", "#4aa8ef", "#7cc0f5", "#a9d6f9", "#d3eafc"], [0.85, 0.85, 0.75, 0.55, 0.35, 0.15])],
  };
}

// the contribution graph laid over the screen: busiest days first, each
// glowing in its own contribution green
function yearPlan(g: Grid): Plan {
  const { cols, rows } = g;
  const when = new Float32Array(cols * rows);
  const kind = new Uint8Array(cols * rows);
  const ranks = year;
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const week = Math.floor((x / cols) * 53);
      const day = Math.floor((y / rows) * 7);
      // until the real year has loaded, a made-up one stands in
      const r = ranks ? ranks[Math.min(ranks.length - 1, week * 7 + day)] ?? 1 : hash(week, day, 3);
      const i = y * cols + x;
      when[i] = r * 0.8 + hash(x, y) * 0.2;
      kind[i] = r < 0.12 ? 1 : r < 0.35 ? 2 : r < 0.65 ? 3 : 4;
    }
  return {
    when,
    kind,
    window: 0.14,
    palettes: [hold("#39d353"), hold("#26a641"), hold("#1b7a35"), ramp(["#0e4429"], [0.55, 0.5, 0.4, 0.3, 0.2, 0.1])],
  };
}

const STAR = 0.03; // share of cells that are stars
const isStar = (x: number, y: number) => hash(x, y, 9) < STAR;

function skyPlan(g: Grid, toDark: boolean): Plan {
  const { cols, rows } = g;
  const when = new Float32Array(cols * rows);
  const sx = cols / 2;
  const sy = rows + 8;
  const far = Math.hypot(cols / 2, (rows + 8) * 1.3);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      let v: number;
      // stars come out just ahead of the twilight, the first lights of evening
      if (toDark) v = 0.12 + (y / rows) * 0.66 + bayer(x, y) * 0.2 - (isStar(x, y) ? 0.07 + hash(x, y, 5) * 0.05 : 0);
      else v = (Math.hypot(x - sx, (y - sy) * 1.3) / far) * 0.85 + bayer(x, y) * 0.15;
      when[y * cols + x] = clamp(v);
    }
  const kind = new Uint8Array(cols * rows).fill(1);
  if (toDark) for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (isStar(x, y)) kind[y * cols + x] = 0;
  return {
    when,
    kind,
    window: 0.16,
    palettes: [
      toDark
        ? // twilight blues closing in
          ramp(["#5b7bff", "#3a5bd9", "#2b3fa8", "#23307a", "#1c2457", "#161a3a"], [0.75, 0.7, 0.6, 0.45, 0.3, 0.15])
        : // sunrise: pale gold, gold, orange, rose
          ramp(["#fff1b8", "#ffd27a", "#ffb35c", "#ff8a5c", "#ff6fb5", "#ffc9e3"], [0.95, 0.95, 0.85, 0.65, 0.4, 0.2]),
    ],
  };
}

function plan(fx: Fx, g: Grid, toDark: boolean): Plan {
  if (fx === "garden") return garden(g, toDark);
  if (fx === "read") return read(g);
  if (fx === "year") return yearPlan(g);
  if (fx === "sky") return skyPlan(g, toDark);
  return dusk(g, toDark);
}

/* ---------- running it ---------- */

type StartView = (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };

export function runReveal(fx: Fx, toDark: boolean, button: DOMRect, startView: StartView, flip: () => () => void) {
  const cols = Math.ceil(window.innerWidth / CELL);
  const rows = Math.ceil(window.innerHeight / CELL);
  const g: Grid = {
    cols,
    rows,
    bx: Math.round((button.left + button.width / 2) / CELL),
    by: Math.round((button.top + button.height / 2) / CELL),
  };
  // read the words while the old page is still the live one
  const { when, kind, palettes, window: glow } = plan(fx, g, toDark);
  const steps = palettes[0].length;

  /* the mask */
  const mask = document.createElement("canvas");
  mask.width = cols * DOTS;
  mask.height = rows * DOTS;
  const mctx = mask.getContext("2d")!;
  const img = mctx.createImageData(cols * DOTS, rows * DOTS);
  const stride = cols * DOTS;
  const size = `${cols * CELL}px ${rows * CELL}px`;
  const keyframe = (url: string) => ({ maskImage: url, WebkitMaskImage: url, maskSize: size, WebkitMaskSize: size });
  // draws the map; returns how many cells have turned, so frames where
  // nothing changed can skip encoding a new mask
  const draw = (p: number) => {
    const d = img.data;
    let n = 0;
    for (let i = 0; i < when.length; i++) {
      const on = when[i] <= p;
      const a = on ? 255 : 0;
      if (on) n++;
      const x0 = (i % cols) * DOTS;
      const y0 = Math.floor(i / cols) * DOTS;
      for (let dy = 0; dy < DOTS; dy++) for (let dx = 0; dx < DOTS; dx++) d[((y0 + dy) * stride + x0 + dx) * 4 + 3] = a;
    }
    mctx.putImageData(img, 0, 0);
    return n;
  };

  /* the colour layer: crisp pixels over a soft halo (the same picture at
     half resolution, smoothed as the browser enlarges it) */
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.className = "theme-fx-layer";
  const crisp = document.createElement("canvas");
  crisp.width = cols * SUB;
  crisp.height = rows * SUB;
  const halo = document.createElement("canvas");
  halo.width = Math.ceil(cols / 2);
  halo.height = Math.ceil(rows / 2);
  const box = `position:absolute;left:0;top:0;width:${cols * CELL}px;height:${rows * CELL}px;`;
  // 0.4: the same glow strength as when the halo was shrunk from the
  // gapped picture (which covered about 56% of each cell)
  halo.style.cssText = box + "opacity:0.4;";
  crisp.style.cssText = box + "image-rendering:pixelated;";
  layer.append(halo, crisp);
  const cctx = crisp.getContext("2d")!;
  const hctx = halo.getContext("2d")!;
  hctx.imageSmoothingEnabled = true;
  // every frame is written straight into one pixel buffer, then drawn once
  const W = crisp.width;
  const H = crisp.height;
  const cimg = cctx.createImageData(W, H);
  const px = new Uint32Array(cimg.data.buffer);
  // the glow is its own tiny picture (one dot per 2×2 cells), written
  // alongside, and smoothed by the browser as it is enlarged
  const HW = halo.width;
  const HH = halo.height;
  const himg = hctx.createImageData(HW, HH);
  const hpx = new Uint32Array(himg.data.buffer);
  // only the area that changed is cleared and sent each frame
  let bx0 = cols, by0 = rows, bx1 = -1, by1 = -1; // cells touched this frame
  let px0 = cols, py0 = rows, px1 = -1, py1 = -1; // cells touched last frame
  const cell = (cx: number, cy: number, c: number) => {
    if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return;
    if (cx < bx0) bx0 = cx;
    if (cx > bx1) bx1 = cx;
    if (cy < by0) by0 = cy;
    if (cy > by1) by1 = cy;
    const x0 = cx * SUB;
    const y0 = cy * SUB;
    for (let dy = 0; dy < SUB - 1; dy++) {
      const row = (y0 + dy) * W + x0;
      for (let dx = 0; dx < SUB - 1; dx++) px[row + dx] = c;
    }
    hpx[(cy >> 1) * HW + (cx >> 1)] = c;
  };

  const stars: [number, number, number][] = [];
  if (fx === "sky" && toDark)
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (isStar(x, y)) stars.push([x, y, when[y * cols + x]]);

  const paint = (p: number, now: number) => {
    // clear what was drawn last frame
    if (px1 >= 0) {
      for (let y = py0 * SUB; y < (py1 + 1) * SUB; y++) px.fill(0, y * W + px0 * SUB, y * W + (px1 + 1) * SUB);
      hpx.fill(0);
    }
    bx0 = cols;
    by0 = rows;
    bx1 = -1;
    by1 = -1;
    // the moving edge
    for (let i = 0; i < when.length; i++) {
      const k = kind[i];
      if (!k) continue;
      const age = p - when[i];
      if (age < 0 || age >= glow) continue;
      cell(i % cols, Math.floor(i / cols), palettes[k - 1][Math.floor((age / glow) * steps)]);
    }
    if (fx === "sky") {
      const out = p > 0.82 ? 1 - (p - 0.82) / 0.18 : 1;
      if (toDark) {
        // stars, twinkling, once night has reached them
        for (const [x, y, w] of stars) {
          if (p < w) continue;
          const tw = (0.65 + 0.35 * Math.sin(now / 160 + x * 1.7 + y)) * out;
          const warm = hash(x, y, 2) < 0.3;
          cell(x, y, pack(255, warm ? 236 : 255, warm ? 180 : 255, tw));
        }
        // a shooting star crosses the top of the sky
        const sp = (p - 0.32) / 0.3;
        if (sp > 0 && sp < 1) {
          const hx = cols * (0.12 + 0.6 * sp);
          const hy = rows * (0.1 + 0.25 * sp);
          for (let k = 0; k < 14; k++) cell(Math.round(hx - k * 1.1), Math.round(hy - k * 0.45), pack(255, 246, 194, (1 - k / 14) * out));
        }
      } else {
        // the sun rises from below the page and fades as day settles
        const r = Math.max(5, Math.round(rows * 0.07));
        const cy = rows + r - (rows * 0.45 + r) * Math.min(1, p / 0.7);
        const cx = cols / 2;
        const sun = pack(255, 210, 122, out);
        for (let y = Math.floor(cy - r); y <= cy + r; y++)
          for (let x = Math.floor(cx - r); x <= cx + r; x++) if (Math.hypot(x - cx, y - cy) <= r) cell(x, y, sun);
      }
    }
    // send only the region drawn this frame or last
    const ux0 = Math.min(bx0, px0), uy0 = Math.min(by0, py0);
    const ux1 = Math.max(bx1, px1), uy1 = Math.max(by1, py1);
    if (ux1 >= 0) {
      cctx.putImageData(cimg, 0, 0, ux0 * SUB, uy0 * SUB, (ux1 - ux0 + 1) * SUB, (uy1 - uy0 + 1) * SUB);
      hctx.putImageData(himg, 0, 0);
    }
    px0 = bx0;
    py0 = by0;
    px1 = bx1;
    py1 = by1;
  };

  let done = () => {};
  const transition = startView(() => {
    done = flip();
    document.body.appendChild(layer);
  });
  let lastUrl = "";
  const end = () => {
    done();
    layer.remove();
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
      // the mask image is encoded off the main thread; while one is on its
      // way the next waits, and frames with no new cells are skipped
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
      paint(p, now);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// Which effect runs next. The owner's mix: garden for two rounds, then
// year, read and sky for one round each; a round is a night and the
// morning after (two switches). The first loop keeps that order; every
// loop after is the same mix in a shuffled order. The place in the loop
// is kept in this browser, so it carries on across pages and visits.
// The ?variants switcher can pin one effect instead ("mix" = the loop).
const ROUND: Fx[] = ["garden", "garden", "year", "read", "sky"];
const KEY = "theme-fx-loop";

const shuffle = (list: Fx[]) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function nextFx(): Fx {
  try {
    const pinned = localStorage.getItem("theme-fx") as Fx | "mix" | null;
    if (pinned && pinned !== "mix" && FX.includes(pinned)) return pinned;
    let state: { queue: Fx[]; pos: number; loops: number } | null = null;
    try {
      state = JSON.parse(localStorage.getItem(KEY) || "null");
    } catch {}
    if (!state || !Array.isArray(state.queue) || state.pos >= state.queue.length) {
      const loops = state ? state.loops + 1 : 0;
      let order = loops === 0 ? ROUND : shuffle(ROUND);
      // a new loop never starts with the effect the last one ended on
      const last = state?.queue[state.queue.length - 1];
      for (let tries = 0; loops > 0 && order[0] === last && tries < 8; tries++) order = shuffle(ROUND);
      state = { queue: order.flatMap((f) => [f, f]), pos: 0, loops };
    }
    const fx = state.queue[state.pos];
    state.pos += 1;
    localStorage.setItem(KEY, JSON.stringify(state));
    return fx;
  } catch {
    return "garden";
  }
}

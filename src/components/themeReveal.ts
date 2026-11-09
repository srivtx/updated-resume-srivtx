// The theme-switch reveal. The View Transitions API holds the old page as
// a still picture and shows the new one through a mask. Every frame, a
// small pixel map (2×2 dots per 8px cell of the screen) says which cells
// already show the new theme; the browser scales it up with crisp edges.
// Each effect is only a different order in which the cells turn over,
// plus, for some, a few marks drawn on the new page as they arrive.
//
//   dusk    night falls from the top in a dither; morning rises from below
//   garden  Tulip Labs pixel tulips sprout and grow until they cover the page
//   read    the new theme follows the words on screen in reading order first
//   year    the page turns over in the order of the real GitHub year
//   sky     stars prick out, then night closes in; by day a sun rises

export type Fx = "dusk" | "garden" | "read" | "year" | "sky";
export const FX: Fx[] = ["dusk", "garden", "read", "year", "sky"];

const CELL = 8; // css px per cell
const DOTS = 2; // map dots per cell side: the browser only enlarges 4×, so cells stay sharp
const DURATION = 1900; // slow enough to watch
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

/* ---------- when each cell turns over (0..1) ---------- */

type Grid = { cols: number; rows: number; bx: number; by: number };

function dusk(g: Grid, toDark: boolean) {
  const t = new Float32Array(g.cols * g.rows);
  for (let y = 0; y < g.rows; y++)
    for (let x = 0; x < g.cols; x++) {
      const row = toDark ? y / g.rows : (g.rows - 1 - y) / g.rows;
      t[y * g.cols + x] = row * 0.75 + bayer(x, y) * 0.25;
    }
  return t;
}

// tulips: each seed grows the 7×7 glyph larger and larger; a cell turns
// over at the first size where a petal or leaf covers it
function garden(g: Grid, toDark: boolean) {
  const { cols, rows } = g;
  const t = new Float32Array(cols * rows).fill(2);
  const glyph = toDark ? BUD : OPEN;
  const seeds: [number, number][] = [[g.bx, g.by + 4]];
  for (let i = 0; i < 9; i++) seeds.push([Math.floor(hash(i, 1, 3) * cols), Math.floor(hash(i, 2, 5) * rows)]);
  const maxK = Math.ceil(Math.max(cols, rows) / 9);
  seeds.forEach(([sx, sy], si) => {
    const start = si === 0 ? 0 : 0.04 + hash(si, 7) * 0.22;
    for (let k = 1; k <= maxK; k++) {
      const when = start + (k / maxK) * 0.62;
      for (let gy = 0; gy < 7; gy++)
        for (let gx = 0; gx < 7; gx++) {
          if (glyph[gy][gx] !== "#") continue;
          const x0 = Math.floor(sx + (gx - 3.5) * k);
          const y0 = Math.floor(sy + (gy - 3.5) * k);
          for (let y = Math.max(0, y0); y < Math.min(rows, y0 + k); y++)
            for (let x = Math.max(0, x0); x < Math.min(cols, x0 + k); x++) {
              const i = y * cols + x;
              if (when < t[i]) t[i] = when;
            }
        }
    }
  });
  // whatever the flowers missed fills in last, dithered
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      t[i] = Math.min(t[i], 0.62 + bayer(x, y) * 0.38);
    }
  return t;
}

// the words on screen, line by line, in the order you would read them
function read(g: Grid) {
  const { cols, rows } = g;
  const t = new Float32Array(cols * rows).fill(-1);
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
        const v = ((li + (x - x0) / Math.max(1, x1 - x0 + 1)) / n) * 0.55;
        const i = y * cols + x;
        if (t[i] < 0 || v < t[i]) t[i] = v;
      }
  });
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      if (t[i] < 0) t[i] = 0.58 + (y / rows) * 0.3 + bayer(x, y) * 0.12;
    }
  return t;
}

// the contribution graph laid over the screen: busiest days first
function yearOrder(g: Grid) {
  const { cols, rows } = g;
  const t = new Float32Array(cols * rows);
  const ranks = year;
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const week = Math.floor((x / cols) * 53);
      const day = Math.floor((y / rows) * 7);
      // until the real year has loaded, a made-up one stands in
      const r = ranks ? ranks[Math.min(ranks.length - 1, week * 7 + day)] ?? 1 : hash(week, day, 3);
      t[y * cols + x] = r * 0.8 + hash(x, y) * 0.2;
    }
  return t;
}

const STAR = 0.035; // share of cells that are stars
const isStar = (x: number, y: number) => hash(x, y, 9) < STAR;

function sky(g: Grid, toDark: boolean) {
  const { cols, rows } = g;
  const t = new Float32Array(cols * rows);
  const sx = cols / 2;
  const sy = rows + 8;
  const far = Math.hypot(cols / 2, (rows + 8) * 1.3);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      let v: number;
      if (toDark) v = isStar(x, y) ? hash(x, y, 5) * 0.3 : 0.3 + (y / rows) * 0.5 + bayer(x, y) * 0.2;
      else v = (Math.hypot(x - sx, (y - sy) * 1.3) / far) * 0.85 + bayer(x, y) * 0.15;
      t[y * cols + x] = clamp(v);
    }
  return t;
}

function schedule(fx: Fx, g: Grid, toDark: boolean) {
  if (fx === "garden") return garden(g, toDark);
  if (fx === "read") return read(g);
  if (fx === "year") return yearOrder(g);
  if (fx === "sky") return sky(g, toDark);
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
  const when = schedule(fx, g, toDark);

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
      for (let dy = 0; dy < DOTS; dy++) for (let dx = 0; dx < DOTS; dx++) d[((y0 + dy) * stride + x0 + dx) * 4 + 3] = a;
    }
    mctx.putImageData(img, 0, 0);
    return n;
  };

  // stars: a small point of light in each star cell once night reaches it,
  // drawn on the new page, fading as the sky finishes
  let marks: HTMLCanvasElement | null = null;
  let kctx: CanvasRenderingContext2D | null = null;
  const stars: [number, number, number][] = [];
  if (fx === "sky" && toDark)
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (isStar(x, y)) stars.push([x, y, when[y * cols + x]]);

  let done = () => {};
  const transition = startView(() => {
    done = flip();
    if (stars.length) {
      marks = document.createElement("canvas");
      marks.width = cols * 4;
      marks.height = rows * 4;
      marks.setAttribute("aria-hidden", "true");
      marks.style.cssText = `position:fixed;left:0;top:0;width:${cols * CELL}px;height:${rows * CELL}px;image-rendering:pixelated;pointer-events:none;z-index:2147483647`;
      document.body.appendChild(marks);
      kctx = marks.getContext("2d");
    }
  });
  let lastUrl = "";
  const end = () => {
    done();
    marks?.remove();
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
      if (kctx) {
        kctx.clearRect(0, 0, cols * 4, rows * 4);
        const fade = p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1;
        kctx.fillStyle = `rgba(255,255,255,${fade})`;
        for (const [x, y, w] of stars) if (p >= w) kctx.fillRect(x * 4 + 1, y * 4 + 1, 2, 2);
      }
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// which effect runs: dusk, unless the comparison switcher picked another
export function currentFx(): Fx {
  try {
    const v = localStorage.getItem("theme-fx") as Fx | null;
    if (v && FX.includes(v)) return v;
  } catch {}
  return "dusk";
}

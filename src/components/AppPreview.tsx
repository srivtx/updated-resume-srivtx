// Animated product previews — the "proof of work" images, but alive.
// Each product card renders a mock browser window: gradient canvas,
// window chrome, and a choreographed CSS loop that looks like someone
// is actually using the app. No JS, no video — just keyframes.

import type { Build } from "@/lib/data";

function WindowChrome({ url }: { url: string }) {
  return (
    <div className="relative z-10 flex items-center gap-1.5 h-7 px-2.5 bg-white/85 dark:bg-zinc-900/85 backdrop-blur border-b border-black/10 dark:border-white/10">
      <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20" />
      <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20" />
      <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20" />
      <span className="mx-auto rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[9px] leading-[14px] text-black/40 dark:text-white/40 px-2.5 font-medium truncate max-w-[60%]">
        {url}
      </span>
    </div>
  );
}

/* ---------- Deriva: apps inside apps ---------- */

function DerivaScene() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400">
      {/* left rail — four app icons, one active at a time */}
      <div className="absolute left-2 top-10 flex flex-col gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="ap-rail h-6 w-6 rounded-md bg-white/25"
            style={{ animationDelay: `${i * 2.5}s` }}
          />
        ))}
      </div>
      {/* main — an app tile pops into a nested mini-window */}
      <div className="absolute left-11 right-2 top-10 bottom-9 rounded-md bg-white/15 border border-white/20 p-1.5">
        <div className="ap-window h-4 rounded-[4px] bg-white/40 mb-1" />
        <div className="grid grid-cols-3 gap-1">
          <span className="ap-app1 col-span-2 h-8 rounded-[4px] bg-white/30" />
          <span className="ap-app2 h-8 rounded-[4px] bg-white/20" />
        </div>
        <div className="ap-appcard mt-1 h-6 rounded-[4px] bg-white/60 shadow-sm" />
      </div>
      {/* progress rail — the learning path filling */}
      <div className="absolute left-11 right-2 bottom-2.5 h-1.5 rounded-full bg-white/25 overflow-hidden">
        <span className="ap-progress block h-full rounded-full bg-white" />
      </div>
    </div>
  );
}

/* ---------- DeepForge: type code, run python, pass ---------- */

function DeepForgeScene() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500">
      {/* editor pane */}
      <div className="absolute left-2 right-14 top-10 bottom-2.5 rounded-md bg-zinc-900/80 p-1.5 flex flex-col gap-1">
        <span className="ap-code1 block h-1.5 rounded-sm bg-sky-300/90 origin-left" />
        <span className="ap-code2 block h-1.5 rounded-sm bg-amber-200/80 origin-left" />
        <span className="ap-code3 block h-1.5 w-3/4 rounded-sm bg-sky-300/70 origin-left" />
        <span className="ap-code4 block h-1.5 w-2/3 rounded-sm bg-white/40 origin-left" />
        <span className="mt-1 flex items-center gap-1">
          <span className="ap-check inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 text-[8px] leading-[14px] text-center text-emerald-950 font-bold">
            ✓
          </span>
          <span className="ap-passed text-[8px] font-medium text-emerald-300">
            passed
          </span>
        </span>
      </div>
      {/* problem grid lighting up */}
      <div className="absolute right-2 top-10 w-10 grid grid-cols-3 gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="ap-tile h-2.5 w-2.5 rounded-[3px] bg-white/70"
            style={{ animationDelay: `${(i % 6) * 0.5}s` }}
          />
        ))}
      </div>
      {/* counter */}
      <span className="ap-counter absolute right-2 bottom-2.5 rounded-full bg-zinc-900/80 text-white text-[9px] font-semibold px-2 py-0.5">
        5,730+
      </span>
    </div>
  );
}

/* ---------- Customs: mandate slides in, signs, chains ---------- */

function CustomsScene() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      {/* mandate card */}
      <div className="ap-mandate absolute left-2 top-9 w-[62%] rounded-md bg-white/90 p-2 shadow-sm">
        <div className="h-1.5 w-1/2 rounded-sm bg-zinc-400/60 mb-1.5" />
        <div className="h-1 w-3/4 rounded-sm bg-zinc-300 mb-1" />
        {/* signature drawing itself */}
        <svg viewBox="0 0 80 16" className="h-4 w-full text-zinc-800">
          <path
            className="ap-sign"
            pathLength={100}
            d="M6 10 C 4 6 10 3 14 6 C 18 9 16 14 22 12 C 28 10 30 5 36 6 C 41 7 40 12 46 11 C 52 10 54 6 60 7 C 65 8 66 11 72 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <div className="ap-sigline h-px w-full bg-zinc-300" />
        <div className="ap-signedchip mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[8px] font-semibold text-emerald-800">
            mandate signed
          </span>
        </div>
      </div>
      {/* hash chain */}
      <div className="absolute right-2 top-10 flex flex-col items-end gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="ap-hash h-5 w-20 rounded-[4px] bg-white/25 border border-white/30"
            style={{ animationDelay: `${3.6 + i * 0.45}s` }}
          />
        ))}
        <span className="ap-chainlink text-[9px] font-medium text-white/80" style={{ animationDelay: "5s" }}>
          ledger chained ↗
        </span>
      </div>
      {/* amount pill */}
      <span className="ap-amount absolute left-2 bottom-2.5 rounded-full bg-zinc-900/85 text-white text-[9px] font-semibold px-2 py-0.5">
        ₹ payment authorized
      </span>
    </div>
  );
}

export function ProductPreview({
  kind,
  aspect = "std",
}: {
  kind: "deriva" | "deepforge" | "customs";
  aspect?: "std" | "wide";
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-md bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5 ${
        aspect === "wide" ? "aspect-[16/10]" : "aspect-[4/3]"
      }`}
    >
      {kind === "deriva" && (
        <>
          <DerivaScene />
          <WindowChrome url="deriva.srivtx.xyz" />
        </>
      )}
      {kind === "deepforge" && (
        <>
          <DeepForgeScene />
          <WindowChrome url="deepforge.srivtx.xyz" />
        </>
      )}
      {kind === "customs" && (
        <>
          <CustomsScene />
          <WindowChrome url="customs.srivtx.xyz" />
        </>
      )}
    </div>
  );
}

/* ---------- Mini previews for the open-source builds ---------- */

function BuildGlyph({ glyph }: { glyph: Build["glyph"] }) {
  switch (glyph) {
    case "pulse": // nnn — an agent thinking
      return (
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="ap-ping absolute h-5 w-5 rounded-full bg-white/50" />
          <span className="ap-ping absolute h-5 w-5 rounded-full bg-white/40" style={{ animationDelay: "0.7s" }} />
          <span className="relative h-2 w-2 rounded-full bg-white" />
        </span>
      );
    case "scan": // sortie — scanning a stack trace
      return (
        <span className="relative flex h-6 w-14 flex-col gap-1">
          <span className="h-1 w-full rounded-sm bg-white/40" />
          <span className="h-1 w-4/5 rounded-sm bg-white/30" />
          <span className="h-1 w-3/5 rounded-sm bg-white/30" />
          <span className="ap-scan absolute inset-x-0 h-1 rounded-sm bg-white" />
        </span>
      );
    case "grid": // mycelium — cells spreading
      return (
        <span className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="ap-cell h-1.5 w-1.5 rounded-[2px] bg-white" style={{ animationDelay: `${i * 0.45}s` }} />
          ))}
        </span>
      );
    case "wave": // shader-labs — a shader breathing
      return (
        <svg viewBox="0 0 80 20" className="h-5 w-20 text-white/90">
          <path
            className="ap-wave"
            d="M0 10 Q 10 0 20 10 T 40 10 T 60 10 T 80 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "type": // bionic-docs — bionic reading
      return (
        <span className="flex h-6 w-16 flex-col gap-1">
          <span className="ap-bars flex h-1.5 overflow-hidden rounded-sm">
            <span className="h-full w-2/5 bg-white" />
            <span className="h-full w-3/5 bg-white/30" />
          </span>
          <span className="ap-bars flex h-1.5 overflow-hidden rounded-sm" style={{ animationDelay: "0.8s" }}>
            <span className="h-full w-1/4 bg-white" />
            <span className="h-full w-3/4 bg-white/30" />
          </span>
          <span className="ap-bars flex h-1.5 overflow-hidden rounded-sm" style={{ animationDelay: "1.6s" }}>
            <span className="h-full w-1/3 bg-white" />
            <span className="h-full w-2/3 bg-white/30" />
          </span>
        </span>
      );
    case "lock": // keepsake — locking memory
      return (
        <span className="relative flex h-6 w-6 items-end justify-center">
          <span className="absolute -top-0.5 h-3 w-4 rounded-t-full border-[1.5px] border-white/80 border-b-0" />
          <span className="ap-shackle absolute top-[-3px] h-3 w-4 rounded-t-full border-[1.5px] border-white/80 border-b-0 bg-transparent" />
          <span className="h-3.5 w-6 rounded-[3px] bg-white/80" />
        </span>
      );
  }
}

export function BuildPreview({ tone, glyph }: { tone: string; glyph: Build["glyph"] }) {
  return (
    <div className={`relative w-full aspect-[5/3] overflow-hidden rounded-md bg-gradient-to-br ${tone} flex items-center justify-center`}>
      <BuildGlyph glyph={glyph} />
      {/* sheen sweep — the "live" gloss */}
      <span className="ap-sheen absolute inset-y-0 w-1/4 bg-white/15 -skew-x-12" />
    </div>
  );
}

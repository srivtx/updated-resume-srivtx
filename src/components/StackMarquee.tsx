// The stack ticker — an infinite marquee of the tools, in mono, with a
// small ✳ separator between them. Slow (70s a lap), pauses on hover.
// Pure CSS animation; the row is rendered twice for a seamless loop.

import type { CSSProperties } from "react";

const TOOLS = [
  "typescript", "rust", "zig", "python", "solana", "next.js",
  "react", "tailwind", "bun", "node", "postgres", "webgl",
  "framer-motion", "mcp", "ed25519", "wacz", "llvm",
];

export function StackMarquee() {
  const row = [...TOOLS, ...TOOLS];
  return (
    <div className="border-y border-rule-soft py-3 marquee-paused overflow-hidden select-none">
      <div
        className="marquee-track flex w-max items-center gap-6 whitespace-nowrap font-mono text-[11px] uppercase tracking-wide2 text-ink-mute"
        style={{ "--marquee-duration": "70s" } as CSSProperties}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="hover:text-ink transition-colors">{t}</span>
            <span className="text-ink-faint text-[9px]">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

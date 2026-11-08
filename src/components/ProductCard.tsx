"use client";

// Proof-of-work card: a drawn cover (bright panel with a pixel mark,
// deep panel with the name), then a mono byline and a one-line headline.
// Hovering plays the mark once — it does what the product does.

import type { Product } from "@/lib/data";
import { ArrowUpRight } from "@/components/NeuButton";
import { Cover, useReplay } from "@/components/Covers";

export function ProductCard({ p, detail = false }: { p: Product; detail?: boolean }) {
  const { ref, run, replay } = useReplay<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={replay}
      className="dim-item group/item block w-full touch-manipulation"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="transition-transform duration-300 ease-out group-hover/item:-translate-y-[2px]">
        <Cover id={p.cover} title={p.name} run={run} corner={<ArrowUpRight className="h-4 w-4" />} />
      </div>
      <p className="mt-3 font-mono text-[11px] lowercase text-black/45 dark:text-white/40">
        {p.chips.map((c, i) => (
          <span key={c}>
            {i > 0 && <span className="mx-1.5 text-black/20 dark:text-white/20">·</span>}
            {c}
          </span>
        ))}
      </p>
      <h3 className="mt-1 text-[15px] sm:text-[16px] leading-snug font-medium text-black/85 dark:text-white/85">
        {p.line}
      </h3>
      {detail && (
        <>
          <p className="mt-1.5 text-xs leading-relaxed text-black/50 dark:text-white/50 max-w-[52ch]">{p.one}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-black/35 dark:text-white/35">{p.note}</p>
        </>
      )}
    </a>
  );
}

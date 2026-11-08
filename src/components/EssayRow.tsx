"use client";

// One essay as a row: a small tile whose mark plays the essay's argument
// on hover (sixteen traits fade until only the measured column is left),
// then the title, a line about it, and when and how long.

import Link from "next/link";
import type { Essay } from "@/lib/writing";
import { formatDate, readingTime } from "@/lib/writing";
import { MarkTile, useReplay } from "@/components/Covers";

export function EssayRow({ e }: { e: Essay }) {
  const { ref, run, replay } = useReplay<HTMLAnchorElement>();
  const figures = e.blocks.filter((b) => b.kind === "figure").length;

  return (
    <Link
      ref={ref}
      href={`/writing/${e.slug}`}
      onMouseEnter={replay}
      className="dim-item group/item flex w-full items-start gap-4 sm:gap-5 py-4 border-b border-neutral-200 dark:border-neutral-800 touch-manipulation"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <MarkTile id="reduction" run={run} className="h-[72px] w-[72px] sm:h-[84px] sm:w-[84px] shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[16px] sm:text-[17px] leading-snug font-medium text-black/85 dark:text-white/85">
            {e.title}
          </h3>
          <span className="sarrow shrink-0 text-black/25 dark:text-white/25 group-hover/item:text-black dark:group-hover/item:text-white" aria-hidden />
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-black/50 dark:text-white/45 max-w-[60ch]">{e.dek}</p>
        <p className="mt-1.5 font-mono text-[11px] text-black/35 dark:text-white/35">
          <time dateTime={e.date}>{formatDate(e.date)}</time> · {readingTime(e)}
          {figures > 0 && <> · {figures} figures</>}
        </p>
      </div>
    </Link>
  );
}

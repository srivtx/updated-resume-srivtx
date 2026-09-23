// "Now watching" — the quiet sibling of the Spotify card: what's on the
// screen this week, in the same card chrome. The tile is a generated
// pixel-art CRT glowing with a green portal (the Rick and Morty bit),
// a pulsing dot like a "live" indicator, and a link out to the show.
// Deliberately plain — a status, not a CTA.

import Image from "next/image";
import { nowWatching } from "@/lib/data";
import { ArrowUpRight } from "@/components/NeuButton";

export function NowWatching() {
  return (
    <a
      href={nowWatching.href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full group/card block"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] transition-shadow duration-300 hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-black/30">
        {/* pixel CRT with the portal on its screen — sized to match the
            spotify art tile so both cards sit at the same natural height */}
        <span className="shrink-0 relative h-16 w-16 rounded-lg overflow-hidden bg-zinc-900 ring-1 ring-black/10 dark:ring-white/15 shadow-sm">
          <Image
            src="/images/now-watching.webp"
            alt="pixel-art CRT television showing a swirling green portal"
            fill
            sizes="64px"
            className="object-cover transition-transform duration-500 group-hover/card:scale-110"
          />
        </span>

        {/* what's on */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            {/* pulsing "on air" dot */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#97CE4C] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#97CE4C]" />
            </span>
            <span className="text-[11px] font-medium tracking-wide text-black/45 dark:text-white/40">
              {nowWatching.label}
            </span>
          </div>
          <p className="truncate text-sm font-semibold text-black/85 dark:text-white/85">
            {nowWatching.show}
          </p>
          <p className="truncate text-xs text-black/45 dark:text-white/40">
            {nowWatching.detail}
          </p>
        </div>

        <span className="shrink-0 text-black/25 group-hover/card:text-black dark:text-white/25 dark:group-hover/card:text-white transition-colors">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

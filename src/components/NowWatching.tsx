// "Now watching" — the quiet sibling of the Spotify card: what's on the
// screen this week, in the same card chrome. A little CRT glyph on a
// dark tile (portal-green tint, to rhyme with the banner), a pulsing
// dot like a "live" indicator, and a link out to the show. Deliberately
// plain — a status, not a CTA.

import { nowWatching } from "@/lib/data";
import { ArrowUpRight } from "@/components/NeuButton";

function TvGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* antennas */}
      <path d="M8.5 3.2 11 6.5M15.5 3.2 13 6.5" />
      {/* body */}
      <rect x="3.5" y="6.5" width="17" height="13" rx="2" />
      {/* play */}
      <path d="M10.2 10.4l4.4 2.6-4.4 2.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function NowWatching() {
  return (
    <a
      href={nowWatching.href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full group/card block h-full"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="flex items-center gap-3.5 p-3.5 sm:p-4 h-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] transition-shadow duration-300 hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-black/30">
        {/* tv glyph on a dark tile — portal-green wash */}
        <span className="shrink-0 relative h-12 w-12 sm:h-14 sm:w-14 rounded-lg overflow-hidden bg-zinc-900 ring-1 ring-black/10 dark:ring-white/15 flex items-center justify-center shadow-sm">
          <span className="absolute inset-0 bg-gradient-to-br from-[#97CE4C]/30 via-transparent to-transparent" />
          <TvGlyph className="relative h-6 w-6 sm:h-7 sm:w-7 text-white/90 transition-transform duration-500 group-hover/card:scale-110" />
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

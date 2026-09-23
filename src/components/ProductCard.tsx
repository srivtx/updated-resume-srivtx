"use client";

// Proof-of-work card — the exact technique bharathships.me uses:
// a REAL screenshot of the live product as the poster, and on hover the
// card plays a REAL screen-recording of the app being used. No mockups,
// no fake UI — the actual shipped product, doing its thing.

import Image from "next/image";
import { useRef, useState } from "react";
import type { Product } from "@/lib/data";
import { ArrowUpRight } from "@/components/NeuButton";

const TONES: Record<string, string> = {
  Deriva: "from-indigo-100 via-white to-emerald-50 dark:from-indigo-950 dark:via-zinc-900 dark:to-emerald-950",
  DeepForge: "from-orange-100 via-white to-rose-50 dark:from-orange-950 dark:via-zinc-900 dark:to-rose-950",
  Customs: "from-sky-100 via-white to-violet-50 dark:from-sky-950 dark:via-zinc-900 dark:to-violet-950",
};

export function ProductCard({
  p,
  featured = false,
}: {
  p: Product;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    setHovered(true);
    vidRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    setHovered(false);
    if (vidRef.current) {
      vidRef.current.pause();
      vidRef.current.currentTime = 0;
    }
  };

  const media = (
    <div
      className={`relative overflow-hidden rounded-md w-full ${
        featured ? "aspect-[16/10] sm:aspect-[16/10]" : "aspect-[4/3]"
      } bg-gradient-to-br ${TONES[p.name] ?? "from-neutral-100 to-neutral-50 dark:from-zinc-800 dark:to-zinc-900"} border border-black/5 dark:border-white/5 transition-all duration-300 group-hover/item:border-black/10 dark:group-hover/item:border-white/10`}
    >
      {/* real screenshot poster */}
      <Image
        src={p.poster}
        alt={`${p.name} — live product screenshot`}
        fill
        sizes="(max-width: 640px) 100vw, 560px"
        className={`object-cover object-top transition-transform duration-300 group-hover/item:scale-[1.03] ${hovered ? "opacity-0" : "opacity-100"}`}
      />
      {/* real screen-recording, plays on hover like his cards */}
      <video
        ref={vidRef}
        src={p.video}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
      />
      {/* play hint */}
      <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-full bg-black/55 dark:bg-black/65 backdrop-blur-sm px-2 py-0.5 text-[9px] font-medium tracking-wide text-white/90 uppercase">
        <span className="inline-block h-1 w-1 rounded-full bg-emerald-400" />
        {hovered ? "live" : "hover to play"}
      </div>
    </div>
  );

  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="dim-item group/item block w-full touch-manipulation"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div
        className={`flex flex-col ${featured ? "sm:flex-row" : ""} w-full h-full p-1 bg-white dark:bg-white/10 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100 group-has-hover:group-hover/item:border-black/20 group-has-hover:group-hover/item:scale-[1.01] group-has-hover:group-hover/item:shadow-lg group-has-hover:group-hover/item:shadow-black/5 dark:group-has-hover:group-hover/item:shadow-black/20`}
      >
        <div className={featured ? "sm:w-[58%]" : ""}>{media}</div>
        <div className="flex-1 px-3 pt-2.5 pb-2 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <span className="text-left text-[16px] sm:text-[17px] leading-snug text-black/80 dark:text-white/80 font-medium truncate">
              {p.name}
            </span>
            <span className="shrink-0 mt-0.5 inline-flex rounded-full text-black/30 group-hover/item:text-black dark:text-white/30 dark:group-hover/item:text-white transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className="text-xs leading-relaxed text-black/50 dark:text-white/30 max-w-[52ch]">
            {p.one}
          </p>
          <p className="text-[11px] text-black/35 dark:text-white/25 leading-relaxed">
            {p.note}
          </p>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {p.chips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-md border text-[11px] font-medium h-5 px-2 border-black/10 dark:border-white/10 text-black/50 dark:text-white/50"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

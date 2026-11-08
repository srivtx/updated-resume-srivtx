"use client";

// Proof-of-work card — the exact technique bharathships.me uses:
// a REAL screenshot of the live product as the poster, and on hover the
// card plays a REAL screen-recording of the app being used. No mockups,
// no fake UI — the actual shipped product, doing its thing.

import Image from "next/image";
import { useRef, useState } from "react";
import type { Product } from "@/lib/data";
import { ArrowUpRight } from "@/components/NeuButton";
import { MorphName, TulipMark } from "@/components/ProductMarks";

const TONES: Record<string, string> = {
  "Tulip Labs": "from-rose-100 via-white to-pink-50 dark:from-rose-950 dark:via-zinc-900 dark:to-pink-950",
  Morphotype: "from-violet-100 via-white to-amber-50 dark:from-violet-950 dark:via-zinc-900 dark:to-amber-950",
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
  const barRef = useRef<HTMLSpanElement>(null);

  // a hairline that draws across the bottom of the clip as it plays
  const onTime = () => {
    const v = vidRef.current;
    if (v && barRef.current && v.duration) {
      barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
    }
  };

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
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
  };

  const media = (
    <div
      className={`relative overflow-hidden rounded-md w-full ${
        featured ? "aspect-[16/10] sm:aspect-[16/10]" : "aspect-[4/3]"
      } bg-gradient-to-br ${TONES[p.name] ?? "from-neutral-100 to-neutral-50 dark:from-zinc-800 dark:to-zinc-900"} border border-black/5 dark:border-white/5 transition-all duration-300 group-hover/item:border-black/10 dark:group-hover/item:border-white/10`}
    >
      {/* real screenshot poster — zooms on hover, like the reference */}
      <Image
        src={p.poster}
        alt={`${p.name} — live product screenshot`}
        fill
        sizes="(max-width: 640px) 100vw, 560px"
        className={`object-cover object-top transition-transform duration-500 ease-out group-hover/item:scale-[1.05] ${hovered ? "opacity-0" : "opacity-100"}`}
      />
      {/* real screen-recording, plays on hover — and keeps zooming
          so the bg never snaps back to scale 1 mid-hover */}
      <video
        ref={vidRef}
        src={p.video}
        muted
        loop
        playsInline
        preload="none"
        onTimeUpdate={onTime}
        className={`absolute inset-0 h-full w-full object-cover object-top scale-[1.05] transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
      />
      {/* play hint — small and quiet; says "playing" once it runs */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-[4px] bg-black/50 dark:bg-black/60 backdrop-blur-sm px-1.5 py-[3px] font-mono text-[9.5px] leading-none text-white/85">
        <span className={`inline-block h-[5px] w-[5px] ${hovered ? "bg-emerald-400 animate-pulse" : "bg-white/70"}`} />
        {hovered ? "playing" : "hover to play"}
      </div>
      {/* playback hairline */}
      <span
        ref={barRef}
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-[2px] bg-black/60 dark:bg-white/70 origin-left transition-transform duration-300 ease-linear"
        style={{ transform: "scaleX(0)" }}
      />
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
            <span className="flex items-end gap-1.5 min-w-0 text-left text-[16px] sm:text-[17px] leading-snug text-black/80 dark:text-white/80 font-medium">
              <span className="truncate">
                {p.name === "Morphotype" ? <MorphName name={p.name} active={hovered} /> : p.name}
              </span>
              {p.name === "Tulip Labs" && (
                <span className="mb-[5px]">
                  <TulipMark active={hovered} />
                </span>
              )}
            </span>
            <span className="shrink-0 mt-0.5 inline-flex rounded-full text-black/30 group-hover/item:text-black dark:text-white/30 dark:group-hover/item:text-white transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className="text-xs leading-relaxed text-black/55 dark:text-white/55 max-w-[52ch]">
            {p.one}
          </p>
          <p className="text-[11px] text-black/40 dark:text-white/35 leading-relaxed">
            {p.note}
          </p>
          {/* plain-word tags, set like a byline */}
          <p className="pt-1 font-mono text-[10.5px] lowercase text-black/40 dark:text-white/35">
            {p.chips.map((c, i) => (
              <span key={c}>
                {i > 0 && <span className="mx-1.5 text-black/20 dark:text-white/20">·</span>}
                {c}
              </span>
            ))}
          </p>
        </div>
      </div>
    </a>
  );
}

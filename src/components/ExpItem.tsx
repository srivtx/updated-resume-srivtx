"use client";

// Experience timeline — LinkedIn-style rows: logo tile, role, org, period,
// collapsible bullets. Same accordion feel as bharathships.me, with the
// org logo doing the visual heavy-lifting.

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "@/components/NeuButton";

export type Exp = {
  role: string;
  org: string;
  period: string;
  logo?: string;
  points: string[];
};

function ExpCard({
  item,
  open,
  onToggle,
}: {
  item: Exp;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3.5 sm:gap-4 px-3.5 sm:px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        {/* org logo tile */}
        {item.logo && (
          <span className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-md overflow-hidden ring-1 ring-black/10 dark:ring-white/15 bg-white">
            <Image
              src={item.logo}
              alt={`${item.org} logo`}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-[15px] font-medium text-black/80 dark:text-white/80 truncate">
            {item.role}
            <span className="mx-1.5 text-black/30 dark:text-white/30">·</span>
            <span className="font-normal">{item.org}</span>
          </h3>
          <p className="mt-0.5 text-xs text-black/40 dark:text-white/40">{item.period}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-black/40 dark:text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <ul className="px-4 py-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5 text-xs sm:text-sm text-black/60 dark:text-white/60">
            {item.points.map((p) => (
              <li key={p} className="flex gap-2.5">
                <span className="text-[#006FEE] dark:text-[#4d9fff] shrink-0 mt-[3px]">•</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Experience({ items }: { items: Exp[] }) {
  // all collapsed by default — the page reads as a timeline at a glance,
  // bullets only on demand
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <ExpCard
          key={item.org}
          item={item}
          open={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? null : i)}
        />
      ))}
    </div>
  );
}

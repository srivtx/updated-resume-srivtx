"use client";

// Experience accordion — collapsible role cards. The chevron rotates,
// bullets slide in. One card open by default.

import { useState } from "react";
import { ChevronDown } from "@/components/NeuButton";

export type Exp = {
  role: string;
  org: string;
  period: string;
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
        className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0">
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
          <ul className="px-4 pb-4 pt-1 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5 text-xs sm:text-sm text-black/60 dark:text-white/60">
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
  const [openIdx, setOpenIdx] = useState<number | null>(0);
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

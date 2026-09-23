"use client";

// The contribution heatmap — @srivtx's last year of git, in neutral
// ink cells. Data from the public jogruber mirror of the GitHub
// calendar (no token). If the fetch fails, the frame renders with a
// quiet skeleton — the graph says "offline", not "broken".

import { useEffect, useMemo, useState } from "react";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// neutral ink density — light mode black, dark mode white
const LEVEL_OPACITY = [0.06, 0.2, 0.4, 0.62, 0.9];

export function Contributions() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [offline, setOffline] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/srivtx?y=last");
        if (!res.ok) throw new Error("bad status");
        const data = await res.json();
        if (cancelled || !Array.isArray(data?.contributions)) throw new Error("bad shape");
        setDays(data.contributions as Day[]);
        setTotal(data.total ?? 0);
      } catch {
        if (!cancelled) setOffline(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Build 53 columns × 7 rows, ordered by week.
  const weeks = useMemo(() => {
    if (!days) return [];
    const cols: (Day | null)[][] = [];
    let col: (Day | null)[] = [];
    const start = new Date(days[0]?.date ?? Date.now());
    const startDow = (start.getUTCDay() + 6) % 7; // monday = 0
    for (let i = 0; i < startDow; i++) col.push(null);
    for (const d of days) {
      const dow = (new Date(d.date + "T00:00:00Z").getUTCDay() + 6) % 7;
      col.push(d);
      if (dow === 6) {
        cols.push(col);
        col = [];
      }
    }
    if (col.length) cols.push(col);
    return cols;
  }, [days]);

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h2 className="text-sm sm:text-[15px] font-medium text-black/80 dark:text-white/80">
          GitHub Contributions
          <span className="text-black/40 dark:text-white/40"> · @srivtx</span>
        </h2>
        <p className="text-xs text-black/40 dark:text-white/40">
          {offline ? (
            <span className="text-black/30 dark:text-white/30">graph loads live in your browser</span>
          ) : (
            total > 0 && (
              <>
                <span className="text-black/70 dark:text-white/70">{total}</span> in the last year
              </>
            )
          )}
        </p>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px] w-max min-w-full">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }, (_, di) => {
                const d = week[di] ?? null;
                const op = d ? LEVEL_OPACITY[d.level] : 0;
                return (
                  <div
                    key={di}
                    title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} · ${d.date}` : undefined}
                    className="h-[10px] w-[10px] rounded-[2px] bg-black dark:bg-white"
                    style={{ opacity: op }}
                  />
                );
              })}
            </div>
          ))}
          {weeks.length === 0 &&
            Array.from({ length: 26 }, (_, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }, (_, di) => (
                  <div key={di} className="h-[10px] w-[10px] rounded-[2px] bg-black dark:bg-white opacity-[0.05]" />
                ))}
              </div>
            ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-[10px] uppercase tracking-wide text-black/30 dark:text-white/30">
          {days && days.length > 0 && `${MONTHS[new Date(days[0].date + "T00:00:00Z").getUTCMonth()]} → ${MONTHS[new Date(days[days.length - 1].date + "T00:00:00Z").getUTCMonth()]}`}
        </p>
        <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-black/30 dark:text-white/30">
          less
          {LEVEL_OPACITY.map((o) => (
            <span key={o} className="h-[8px] w-[8px] rounded-[2px] bg-black dark:bg-white" style={{ opacity: o }} />
          ))}
          more
        </p>
      </div>
    </div>
  );
}

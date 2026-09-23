"use client";

// The contribution heatmap — a year of git ink, rendered as the lab
// journal would: small rounded swatches in pencil density. Data from
// the public jogruber mirror of the GitHub calendar (no token). If the
// fetch fails (offline, rate limit, sandboxed preview), the frame still
// renders with empty cells — the graph says "offline", not "broken".

import { useEffect, useMemo, useState } from "react";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// Pencil density per level — the cells read as graphite pressure.
const LEVEL_OPACITY = [0.07, 0.22, 0.42, 0.65, 0.92];

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
    // pad the first column so the first day lands on its weekday
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
    <div className="border border-rule-soft bg-paper/40 backdrop-blur-md p-4 sm:p-6">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute">
          ↳ proof of work · @srivtx
        </p>
        <p className="font-mono text-[10px] text-ink-mute">
          {offline ? (
            <span className="text-ink-faint">graph offline — loads live in your browser</span>
          ) : (
            total > 0 && (
              <>
                <span className="text-ink">{total}</span> contributions · last 12 months
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
                    className="h-[10px] w-[10px] rounded-[2px] bg-ink"
                    style={{
                      opacity: op,
                      transform: d && d.count > 0 ? `rotate(${(d.date.charCodeAt(9) % 5) - 2}deg)` : undefined,
                    }}
                  />
                );
              })}
            </div>
          ))}
          {weeks.length === 0 &&
            Array.from({ length: 26 }, (_, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }, (_, di) => (
                  <div key={di} className="h-[10px] w-[10px] rounded-[2px] bg-ink opacity-[0.06]" />
                ))}
              </div>
            ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="font-mono text-[9px] uppercase tracking-wide2 text-ink-faint">
          {days && days.length > 0 && `${MONTHS[new Date(days[0].date + "T00:00:00Z").getUTCMonth()]} → ${MONTHS[new Date(days[days.length - 1].date + "T00:00:00Z").getUTCMonth()]}`}
        </p>
        <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wide2 text-ink-faint">
          less
          {LEVEL_OPACITY.map((o) => (
            <span key={o} className="h-[8px] w-[8px] rounded-[2px] bg-ink" style={{ opacity: o }} />
          ))}
          more
        </p>
      </div>
    </div>
  );
}

// Live GitHub numbers as a plain byline. The numbers come from the
// server (src/lib/github.ts, refreshed hourly); if GitHub said no, the
// line keeps its height and stays empty, so nothing below it jumps.

import type { Stats } from "@/lib/github";

export function GitHubStats({ stats }: { stats: Stats | null }) {
  const items: [string, number][] = stats
    ? [
        ["repositories", stats.repos],
        ["stars", stats.stars],
        ["followers", stats.followers],
      ]
    : [];

  return (
    <p
      className={`mt-5 h-5 font-mono text-[11px] text-black/55 dark:text-white/50`}
    >
      {items.map(([label, n], i) => (
        <span key={label}>
          {i > 0 && <span className="mx-2 text-black/20 dark:text-white/20">·</span>}
          <span className="text-black/75 dark:text-white/75">{n}</span> {label}
        </span>
      ))}
    </p>
  );
}

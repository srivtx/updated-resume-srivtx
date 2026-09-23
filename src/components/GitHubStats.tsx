"use client";

// Live GitHub numbers — fetched client-side from the public API (no
// token in the page, ever). Fails quietly: if the network or the rate
// limit says no, the chips simply don't render.

import { useEffect, useState } from "react";

type Stats = { repos: number; stars: number; followers: number };

export function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetch("https://api.github.com/users/srivtx").then((x) => x.json()),
          fetch("https://api.github.com/users/srivtx/repos?per_page=100").then((x) => x.json()),
        ]);
        if (cancelled || !u || u.message || !Array.isArray(r)) return;
        const stars = r.reduce((s: number, x: { stargazers_count?: number }) => s + (x.stargazers_count ?? 0), 0);
        setStats({ repos: u.public_repos ?? 0, stars, followers: u.followers ?? 0 });
      } catch {
        /* offline or rate-limited — render nothing */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) return null;

  const chips: [string, number][] = [
    ["repositories", stats.repos],
    ["stars", stats.stars],
    ["followers", stats.followers],
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {chips.map(([label, n]) => (
        <span
          key={label}
          className="inline-flex items-center rounded-md border border-black/10 dark:border-white/10 text-[11px] font-medium h-6 px-2.5 text-black/50 dark:text-white/50 bg-white dark:bg-white/[0.04]"
        >
          <span className="text-black/80 dark:text-white/80 font-semibold mr-1">{n}</span>
          {label}
        </span>
      ))}
    </div>
  );
}

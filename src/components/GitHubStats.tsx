"use client";

// Live GitHub numbers — fetched client-side from the public API (no
// token in the page, ever). Fails quietly: if the network or the rate
// limit says no, the line simply stays empty.

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

  const items: [string, number][] = stats
    ? [
        ["repositories", stats.repos],
        ["stars", stats.stars],
        ["followers", stats.followers],
      ]
    : [];

  // a plain byline, not a row of boxes; the line keeps its height while
  // the numbers load, so nothing below it jumps
  return (
    <p
      className={`mt-5 h-5 font-mono text-[11px] text-black/40 dark:text-white/35 transition-opacity duration-500 ${stats ? "opacity-100" : "opacity-0"}`}
      aria-live="polite"
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

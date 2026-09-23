"use client";

// Live GitHub numbers — fetched client-side from the public API (no
// token in the page, ever). Fails quietly: if the network or the rate
// limit says no, the chips simply don't render and the page loses
// nothing.

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
    ["repos", stats.repos],
    ["stars", stats.stars],
    ["followers", stats.followers],
  ];

  return (
    <p className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-ink-mute">
      {chips.map(([label, n]) => (
        <span key={label} className="border border-rule-soft bg-paper/50 px-2 py-1">
          <span className="text-ink">{n}</span> {label}
        </span>
      ))}
      <span className="text-ink-faint">· live from github</span>
    </p>
  );
}

// GitHub numbers, fetched on the server and kept for an hour, so a
// visitor's browser never asks GitHub (and never hits its rate limit).
// A GITHUB_TOKEN env var, if set in the host, only raises the limit; it
// is read here on the server and never reaches the page.

export type Stats = { repos: number; stars: number; followers: number };
export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const HOUR = 3600;
const gh = (path: string) =>
  fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    next: { revalidate: HOUR },
  });

export async function getStats(): Promise<Stats | null> {
  try {
    const [u, r] = await Promise.all([gh("/users/srivtx"), gh("/users/srivtx/repos?per_page=100")]);
    if (!u.ok || !r.ok) return null;
    const user = await u.json();
    const repos = await r.json();
    if (!Array.isArray(repos)) return null;
    const stars = repos.reduce((s: number, x: { stargazers_count?: number }) => s + (x.stargazers_count ?? 0), 0);
    return { repos: user.public_repos ?? 0, stars, followers: user.followers ?? 0 };
  } catch {
    return null;
  }
}

export async function getContributions(): Promise<{ days: Day[]; total: number } | null> {
  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/srivtx?y=last", {
      next: { revalidate: HOUR },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data?.contributions)) return null;
    const days = data.contributions as Day[];
    // the service reports totals per year as an object; add the days up instead
    return { days, total: days.reduce((n, d) => n + d.count, 0) };
  } catch {
    return null;
  }
}

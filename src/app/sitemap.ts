// Every page and essay, so search engines find all of it.

import type { MetadataRoute } from "next";
import { essays } from "@/lib/writing";

const SITE = "https://www.srivtx.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = essays.reduce((d, e) => (e.date > d ? e.date : d), "2026-01-01");
  return [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/writing`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    ...essays.map((e) => ({ url: `${SITE}/writing/${e.slug}`, lastModified: e.date, changeFrequency: "yearly" as const, priority: 0.8 })),
    { url: `${SITE}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blogs`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/inventions`, changeFrequency: "monthly", priority: 0.6 },
  ];
}

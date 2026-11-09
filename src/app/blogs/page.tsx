import type { Metadata } from "next";
import { BlogsPageClient } from "./page-client";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "/blogs",
  "Notes",
  "Engineering notes by Sribatsha Dash from building Deriva, DeepForge and Customs — the how, not the hype.",
);

export default function BlogsPage() {
  return <BlogsPageClient />;
}

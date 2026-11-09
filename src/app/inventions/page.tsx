import type { Metadata } from "next";
import { InventionsPageClient } from "./page-client";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "/inventions",
  "Papers",
  "Research papers by Sribatsha Dash from the DeepForge lab — reproducibility, verification and cache auditing, each with a short brief.",
);

export default function InventionsPage() {
  return <InventionsPageClient />;
}

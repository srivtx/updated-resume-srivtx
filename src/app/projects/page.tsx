import type { Metadata } from "next";
import { ProjectsPageClient } from "./page-client";
import { pageMeta, JsonLd, workLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "/projects",
  "Work",
  "Tulip Labs, Morphotype, Bionic Page, Deriva, DeepForge and Customs — six live products — plus open-source tools and fixes merged upstream, by Sribatsha Dash.",
);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={workLd} />
      <ProjectsPageClient />
    </>
  );
}

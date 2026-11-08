import type { Metadata } from "next";
import { ProjectsPageClient } from "./page-client";

export const metadata: Metadata = {
  title: "Proof of Work | srivtx",
  description: "Tulip Labs, Morphotype and the other live products, open-source builds and merged upstream work of srivtx.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

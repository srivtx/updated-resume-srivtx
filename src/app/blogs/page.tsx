import type { Metadata } from "next";
import { BlogsPageClient } from "./page-client";

export const metadata: Metadata = {
  title: "Technical Blogs | srivtx",
  description: "Engineering notes from building Deriva, DeepForge and Customs — plus long-form articles.",
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}

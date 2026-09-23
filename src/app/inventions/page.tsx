import type { Metadata } from "next";
import { InventionsPageClient } from "./page-client";

export const metadata: Metadata = {
  title: "Research Papers | srivtx",
  description: "Publications from the DeepForge research lab — reproducibility, verification and cache auditing.",
};

export default function InventionsPage() {
  return <InventionsPageClient />;
}

// X reads its own image tag; it gets the same card as everyone else.
import OG from "./opengraph-image";
import { essays } from "@/lib/writing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "essay by sribatsha dash";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export default OG;

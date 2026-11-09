// The last year of GitHub contributions, one count per day, for the "year"
// theme switch. Cached on the server for an hour.

import { getContributions } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  const c = await getContributions();
  return Response.json({ counts: c ? c.days.map((d) => d.count) : [] });
}

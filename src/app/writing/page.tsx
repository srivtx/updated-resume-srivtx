import type { Metadata } from "next";
import Link from "next/link";
import { essays } from "@/lib/writing";
import { SubPageShell } from "@/components/SubPageShell";
import { EssayRow } from "@/components/EssayRow";

export const metadata: Metadata = {
  title: "Writing | srivtx",
  description: "Essays by Sribatsha Dash on how things work, the frontier, and the state of thinking.",
};

export default function WritingPage() {
  return (
    <SubPageShell title="Writing" sub="essays, slower than the code. written here, in my own words.">
      <div className="dim-group border-t border-neutral-200 dark:border-neutral-800">
        {essays.map((e) => (
          <EssayRow key={e.slug} e={e} />
        ))}
      </div>
      <p className="mt-8 text-xs text-black/55 dark:text-white/50">
        follow new essays with the{" "}
        <a href="/writing/rss.xml" className="underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
          rss feed
        </a>
        . engineering notes from the products are under{" "}
        <Link href="/blogs" className="underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
          notes
        </Link>
        .
      </p>
    </SubPageShell>
  );
}

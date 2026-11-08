import type { Metadata } from "next";
import Link from "next/link";
import { essays, formatDate, readingTime } from "@/lib/writing";
import { SubPageShell } from "@/components/SubPageShell";
import { Reveal } from "@/components/Reveal";
import { reading } from "./fonts";

export const metadata: Metadata = {
  title: "Writing | srivtx",
  description: "Essays by Sribatsha Dash: slower thoughts on intelligence, ai and what is left for humans.",
};

export default function WritingPage() {
  return (
    <SubPageShell title="writing" sub="essays, slower than the code. written here, in my own words.">
      <div className={`${reading.variable} dim-group`}>
        {essays.map((e, i) => (
          <Reveal key={e.slug} delay={0.05 + i * 0.05}>
            <Link
              href={`/writing/${e.slug}`}
              className="dim-item group/item block w-full touch-manipulation"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <article className="py-6 sm:py-7 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-serif text-[26px] sm:text-[30px] leading-[1.1] text-neutral-900 dark:text-neutral-100">
                    {e.title}
                  </h2>
                  <span className="sarrow shrink-0 text-black/30 dark:text-white/30 group-hover/item:text-black dark:group-hover/item:text-white" aria-hidden />
                </div>
                <p className="mt-2 font-reading text-[16px] sm:text-[17px] leading-snug text-neutral-500 dark:text-neutral-400 max-w-[46ch]">
                  {e.dek}
                </p>
                <p className="mt-3 font-mono text-[11px] text-black/40 dark:text-white/35">
                  <time dateTime={e.date}>{formatDate(e.date)}</time>
                  <span className="mx-2 text-black/20 dark:text-white/20">·</span>
                  {readingTime(e)}
                </p>
              </article>
            </Link>
          </Reveal>
        ))}

        <Reveal delay={0.2}>
          <p className="mt-8 text-xs text-black/40 dark:text-white/40">
            engineering notes from the products live under{" "}
            <Link href="/blogs" className="underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
              technical blogs
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </SubPageShell>
  );
}

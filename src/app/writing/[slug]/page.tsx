import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { essays, formatDate, getEssay, readingTime } from "@/lib/writing";
import { SubPageShell } from "@/components/SubPageShell";
import { EssayFigure } from "@/components/essay/Figures";
import { InkSwitch } from "@/components/essay/InkSwitch";
import { reading } from "../fonts";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getEssay(params.slug);
  if (!e) return {};
  return {
    title: `${e.title} | srivtx`,
    description: e.dek,
    openGraph: { title: e.title, description: e.dek, type: "article", publishedTime: e.date },
    twitter: { card: "summary_large_image", title: e.title, description: e.dek },
  };
}

// ==phrase== → the author's own highlight, drawn in as a soft underline
function Text({ text }: { text: string }) {
  const parts = text.split(/==(.+?)==/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <mark key={i} className="essay-mark">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function EssayPage({ params }: { params: { slug: string } }) {
  const e = getEssay(params.slug);
  if (!e) notFound();
  let fig = 0;

  return (
    <SubPageShell>
      <article className={`${reading.variable} essay`} data-ink="rose">
        <header className="pt-2 sm:pt-4 pb-8 sm:pb-10 border-b border-neutral-200 dark:border-neutral-800">
          <p className="font-mono text-[11px] text-black/40 dark:text-white/40">
            <Link href="/writing" className="hover:text-black dark:hover:text-white transition-colors">
              writing
            </Link>
            <span className="mx-2 text-black/20 dark:text-white/20">/</span>
            <time dateTime={e.date}>{formatDate(e.date)}</time>
            <span className="mx-2 text-black/20 dark:text-white/20">·</span>
            {readingTime(e)}
          </p>
          <h1 className="mt-5 font-serif text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.01em] text-neutral-900 dark:text-neutral-50">
            {e.title}
          </h1>
          <p className="mt-4 font-reading italic text-[18px] sm:text-[21px] leading-snug text-neutral-500 dark:text-neutral-400 max-w-[34em]">
            {e.dek}
          </p>
        </header>

        <div className="essay-body pt-8 sm:pt-10">
          {e.blocks.map((b, i) =>
            b.kind === "p" ? (
              <p key={i}>
                <Text text={b.text} />
              </p>
            ) : (
              <EssayFigure key={i} id={b.id} n={++fig} />
            ),
          )}

          {e.signature && <p className="essay-signature">{e.signature}</p>}
        </div>

        <footer className="mt-12 pt-5 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[11px] text-black/40 dark:text-white/40">
          <Link href="/writing" className="hover:text-black dark:hover:text-white transition-colors">
            ← all writing
          </Link>
          {e.original && (
            <a href={e.original} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
              first written on notion ↗
            </a>
          )}
        </footer>
        <InkSwitch />
      </article>
    </SubPageShell>
  );
}

// srivtx — home, redesigned as an index rather than a long scroll.
//
//   intro     who I am, in two plain sentences that link to the work and the writing
//   writing   the latest essay, first
//   work      the products, as drawn covers
//   experience
//   index     open source · papers · notes, side by side, titles only
//   lately    what's playing, what's on, what I've committed, what I use
//
// The scenery moved to the bottom of every page (see Site.tsx), so the
// first screen is the person and the work, not a picture.

import Image from "next/image";
import Link from "next/link";
import { profile, socials, experience, products, builds, posts, papers } from "@/lib/data";
import { NeuIconLink, GithubIcon, XIcon, LinkedInIcon, MailIcon } from "@/components/NeuButton";
import { Experience } from "@/components/ExpItem";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { GitHubStats } from "@/components/GitHubStats";
import { Contributions } from "@/components/Contributions";
import { StackMarquee } from "@/components/StackMarquee";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { NowWatching } from "@/components/NowWatching";
import { EssayRow } from "@/components/EssayRow";
import { SiteShell, SectionHead } from "@/components/Site";
import { COL } from "@/lib/layout";
import { essays } from "@/lib/writing";
import { getStats, getContributions, type Stats } from "@/lib/github";

/* ---------- small building blocks ---------- */

function Rule() {
  return <div className="border-b border-dashed border-black/[0.08] dark:border-white/[0.07]" />;
}

function Section({
  title,
  sub,
  href,
  more,
  id,
  children,
}: {
  title: string;
  sub?: string;
  href?: string;
  more?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section id={id} className={`${COL} py-10 sm:py-12 scroll-mt-14`}>
        <SectionHead title={title} sub={sub} href={href} more={more} />
        {children}
      </section>
    </Reveal>
  );
}

const inline =
  "text-black dark:text-white underline decoration-black/20 dark:decoration-white/25 underline-offset-[5px] decoration-[1.5px] hover:decoration-black dark:hover:decoration-white transition-colors";

/* ---------- intro ---------- */

function Intro({ stats }: { stats: Stats | null }) {
  return (
    <Reveal>
      <section className={`${COL} pt-12 sm:pt-16 pb-10 sm:pb-12`}>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10">
            <Image alt={profile.name} src="/pfp.jpg" fill priority sizes="72px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <h1 className="font-serif italic text-[30px] sm:text-[36px] leading-none tracking-[0.005em]">{profile.name}</h1>
            <p className="mt-2 text-[13px] sm:text-sm text-black/55 dark:text-white/50">{profile.tagline.join(" · ")}</p>
          </div>
        </div>

        <p className="mt-8 text-[19px] sm:text-[23px] leading-[1.45] tracking-[-0.012em] text-black/70 dark:text-white/70 max-w-[29em]">
          I like to understand systems in detail, then{" "}
          <Link href="/projects" className={inline}>
            build things
          </Link>{" "}
          with what I learn. I{" "}
          <Link href="/writing" className={inline}>
            write
          </Link>{" "}
          about how things work, the frontier, and the state of thinking.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {socials.map((s) => (
              <NeuIconLink key={s.name} href={s.href} label={s.name}>
                {s.icon === "github" && <GithubIcon className="h-4 w-4" />}
                {s.icon === "x" && <XIcon className="h-4 w-4" />}
                {s.icon === "linkedin" && <LinkedInIcon className="h-4 w-4" />}
                {s.icon === "mail" && <MailIcon className="h-4 w-4" />}
              </NeuIconLink>
            ))}
          </div>
          <div className="sm:-mt-5">
            <GitHubStats stats={stats} />
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* ---------- the index: three short lists side by side ---------- */

type Item = { title: string; meta: string; href: string; external?: boolean };

function IndexList({ title, href, items }: { title: string; href: string; items: Item[] }) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3 pb-2.5 border-b border-black/80 dark:border-white/70">
        <h3 className="text-[14px] font-medium text-black/85 dark:text-white/85">{title}</h3>
        <Link
          href={href}
          className="group/more inline-flex items-center gap-2 font-mono text-[11px] text-black/55 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          all
          <span className="sarrow" aria-hidden />
        </Link>
      </div>
      <ul className="dim-group">
        {items.map((it) => {
          const inner = (
            <>
              <span className="text-[13.5px] leading-snug text-black/80 dark:text-white/80 line-clamp-2">{it.title}</span>
              <span className="mt-1 text-[12px] leading-snug text-black/55 dark:text-white/50 line-clamp-2">{it.meta}</span>
            </>
          );
          const cls = "dim-item block py-3 border-b border-neutral-200 dark:border-neutral-800";
          return (
            <li key={it.title}>
              {it.external ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link href={it.href} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- the page ---------- */

export default async function Page() {
  const [stats, contributions] = await Promise.all([getStats(), getContributions()]);
  const openSource: Item[] = builds.slice(0, 4).map((b) => ({ title: b.name, meta: b.one, href: b.href, external: true }));
  const paperItems: Item[] = papers.slice(0, 4).map((p) => ({ title: p.title, meta: p.sub, href: "/inventions" }));
  const noteItems: Item[] = posts.slice(0, 4).map((p) => ({
    title: p.title,
    meta: `${p.when} · ${p.meta.toLowerCase()}`,
    href: p.href,
    external: true,
  }));

  return (
    <SiteShell>
      <Intro stats={stats} />
      <Rule />

      <Section title="Writing" sub="essays, slower than the code" href="/writing" more="all writing">
        <div className="dim-group -mt-4">
          {essays.slice(0, 3).map((e) => (
            <EssayRow key={e.slug} e={e} />
          ))}
        </div>
      </Section>

      <Rule />

      <Section id="work" title="Work" sub="live and free to use — hover a cover to see what each one does" href="/projects" more="all work">
        <div className="dim-group grid grid-cols-1 gap-y-9 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-2">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </Section>

      <Rule />

      <Section title="Experience">
        <Experience items={experience} />
      </Section>

      <Rule />

      <Section title="Also" sub="smaller tools, research papers, and engineering notes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
          <IndexList title="Open source" href="/projects#open-source" items={openSource} />
          <IndexList title="Papers" href="/inventions" items={paperItems} />
          <IndexList title="Notes" href="/blogs" items={noteItems} />
        </div>
      </Section>

      <Rule />

      <Section title="Lately" sub="playing, watching, committing">
        <SpotifyPlayer>
          <NowWatching />
        </SpotifyPlayer>
        <div className="mt-10">
          <Contributions data={contributions} />
        </div>
        <div className="mt-10">
          <p className="mb-3 font-mono text-[11px] text-black/55 dark:text-white/50">what I build with</p>
          <StackMarquee />
        </div>
      </Section>
    </SiteShell>
  );
}

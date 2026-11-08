// srivtx — home. One frame with the rest of the site (header, footer, the
// cat). Order: who I am → how I think (writing) → what I ship → where I've
// worked → open source → papers → engineering notes → the numbers → stack.
// Every section names itself in plain words and, when there is more,
// links to its full page from the same row.

import Image from "next/image";
import { profile, socials, experience, products, builds, posts, papers, upstream, moreOnGithub } from "@/lib/data";
import { NeuIconLink, GithubIcon, XIcon, LinkedInIcon, MailIcon, ArrowUpRight } from "@/components/NeuButton";
import { Experience } from "@/components/ExpItem";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { GitHubStats } from "@/components/GitHubStats";
import { Contributions } from "@/components/Contributions";
import { StackMarquee } from "@/components/StackMarquee";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { NowWatching } from "@/components/NowWatching";
import { BuildLogo } from "@/components/BuildLogos";
import { EssayRow } from "@/components/EssayRow";
import { SiteShell, SectionHead } from "@/components/Site";
import { COL } from "@/lib/layout";
import { essays } from "@/lib/writing";
import Link from "next/link";

/* ---------- small building blocks ---------- */

function Rule() {
  return <div className="border-b border-dashed border-black/[0.08] dark:border-white/[0.07]" />;
}

function Section({
  title,
  sub,
  href,
  more,
  children,
}: {
  title: string;
  sub?: string;
  href?: string;
  more?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className={`${COL} py-9 sm:py-11`}>
        <SectionHead title={title} sub={sub} href={href} more={more} />
        {children}
      </section>
    </Reveal>
  );
}

/* ---------- intro ---------- */

function Intro() {
  return (
    <>
      {/* banner — pixel dusk landscape; zooms on hover */}
      <Reveal>
        <div className="relative overflow-hidden group/banner">
          <Image
            alt="pixel dusk landscape"
            src="/pixel-banner.png"
            width={1344}
            height={768}
            priority
            className="w-full h-[140px] sm:h-[190px] object-cover transition-transform duration-700 ease-out group-hover/banner:scale-[1.06]"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <p className="text-white text-base sm:text-lg italic font-serif text-center drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
              {profile.bannerQuote}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className={`${COL} -mt-9 relative z-10`}>
          <div className="w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] relative rounded-full overflow-hidden ring-[3px] ring-white dark:ring-zinc-900">
            <Image alt={profile.name} src="/pfp.jpg" fill priority sizes="88px" className="object-cover" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className={`${COL} mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3`}>
          <div>
            <h1 className="font-serif italic text-[28px] sm:text-[34px] leading-none tracking-[0.005em]">
              {profile.first} Dash
            </h1>
            <p className="mt-2 text-[13px] sm:text-sm text-black/50 dark:text-white/45">
              {profile.tagline.join(" · ")}
            </p>
          </div>
          <div className="flex gap-1 sm:gap-2 items-center">
            {socials.map((s) => (
              <NeuIconLink key={s.name} href={s.href} label={s.name}>
                {s.icon === "github" && <GithubIcon className="h-4 w-4" />}
                {s.icon === "x" && <XIcon className="h-4 w-4" />}
                {s.icon === "linkedin" && <LinkedInIcon className="h-4 w-4" />}
                {s.icon === "mail" && <MailIcon className="h-4 w-4" />}
              </NeuIconLink>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className={COL}>
          <GitHubStats />
        </div>
      </Reveal>

      {/* status strip — last played + now watching */}
      <Reveal delay={0.2}>
        <div className={`${COL} mt-4 pb-9 sm:pb-11`}>
          <SpotifyPlayer>
            <NowWatching />
          </SpotifyPlayer>
        </div>
      </Reveal>
    </>
  );
}

/* ---------- open-source build rows ---------- */

function BuildRow({ b }: { b: (typeof builds)[number] }) {
  return (
    <a
      href={b.href}
      target="_blank"
      rel="noopener noreferrer"
      className="dim-item group/item block w-full"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="flex items-center gap-3 sm:gap-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
        <span
          className={`shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-gradient-to-br ${b.toneLight} dark:bg-gradient-to-br ${b.tone} ring-1 ring-black/10 dark:ring-white/10 flex items-center justify-center text-black/70 dark:text-white/95 shadow-sm transition-transform duration-300 group-hover/item:scale-110`}
        >
          <BuildLogo name={b.name} />
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-sm font-medium text-black/80 dark:text-white/80 truncate block">{b.name}</span>
          <span className="text-xs text-black/45 dark:text-white/40 leading-relaxed line-clamp-2 block mt-0.5">{b.one}</span>
        </div>
        <span className="shrink-0 text-black/25 group-hover/item:text-black dark:text-white/25 dark:group-hover/item:text-white transition-colors">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

/* ---------- the page ---------- */

export default function Page() {
  return (
    <SiteShell>
      <Intro />
      <Rule />

      <Section title="Writing" sub="essays, slower than the code" href="/writing" more="all writing">
        <div className="dim-group -mt-4">
          {essays.slice(0, 3).map((e) => (
            <EssayRow key={e.slug} e={e} />
          ))}
        </div>
      </Section>

      <Rule />

      <Section title="Work" sub="live and free to use — hover a cover to see what each one does" href="/projects" more="all work">
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

      <Section title="Open source" sub="smaller tools, and fixes merged upstream" href="/projects#open-source" more="on the work page">
        <div className="dim-group group">
          {builds.map((b) => (
            <BuildRow key={b.name} b={b} />
          ))}
        </div>
        <p className="mt-8 mb-2 font-mono text-[11px] text-black/35 dark:text-white/35">merged upstream</p>
        <ul>
          {upstream.map((u) => (
            <li key={u.name} className="py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-baseline justify-between gap-4">
              <a
                href={u.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors min-w-0"
              >
                <span className="font-medium">{u.name}</span>
                <span className="text-black/40 dark:text-white/40"> — {u.what}</span>
              </a>
              <span className="font-mono text-[10.5px] text-black/40 dark:text-white/40 whitespace-nowrap flex items-center gap-1.5 shrink-0">
                <span className="h-[5px] w-[5px] bg-emerald-500" />
                {u.state} {u.pr}
              </span>
            </li>
          ))}
        </ul>
        <a
          href={moreOnGithub}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
        >
          everything else lives on github ↗
        </a>
      </Section>

      <Rule />

      <Section title="Papers" sub="inventions from the deepforge lab, each with a short brief" href="/inventions" more="all papers">
        <div className="dim-group -mt-4">
          {papers.slice(0, 3).map((paper) => (
            <Link key={paper.title} href="/inventions" className="dim-item group/item block w-full">
              <div className="flex items-center justify-between gap-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-[15px] leading-6 text-black/80 dark:text-white/80 font-medium">{paper.title}</h3>
                  <p className="mt-0.5 text-xs text-black/45 dark:text-white/40 leading-relaxed">{paper.sub}</p>
                </div>
                <span className="sarrow shrink-0 text-black/25 dark:text-white/25 group-hover/item:text-black dark:group-hover/item:text-white" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Rule />

      <Section title="Notes" sub="engineering notes from building the products" href="/blogs" more="all notes">
        <div className="dim-group -mt-4">
          {posts.slice(0, 4).map((post) => (
            <a key={post.title} href={post.href} target="_blank" rel="noopener noreferrer" className="dim-item group/item block w-full">
              <div className="flex items-center justify-between gap-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-[15px] leading-6 text-black/80 dark:text-white/80 font-medium">{post.title}</h3>
                  <p className="mt-0.5 font-mono text-[11px] text-black/35 dark:text-white/35">
                    {post.when} · {post.meta.toLowerCase()}
                  </p>
                </div>
                <span className="shrink-0 text-black/25 group-hover/item:text-black dark:text-white/25 dark:group-hover/item:text-white transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Rule />

      <Reveal>
        <section className={`${COL} py-9 sm:py-11`}>
          <Contributions />
        </section>
      </Reveal>

      <Rule />

      <Section title="Stack" sub="what I build with">
        <StackMarquee />
      </Section>
    </SiteShell>
  );
}

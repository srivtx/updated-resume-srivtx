// Left-aligned single column, no sidebar. The chaos field sits behind
// the page as a faint Jungian texture. Logo and nav live in a clean
// top bar — Mitchell-style restraint, but the voice stays left-ragged.

import { meta, bio, contact, feature, supporting, moreOnGithub, upstream, practiceLine, job, school } from "@/lib/data";
import { NnnSketch, NnnRoughSketch, ImgTo3DSketch, LspSketch } from "@/components/Sketch";
import { Doodle } from "@/components/Doodle";
import { ProjectArt } from "@/components/ProjectArt";
import { Logo } from "@/components/Logo";
import { ChaosBackground } from "@/components/ChaosBackground";

type SupportingCardData = {
  name: string;
  kicker: string;
  one: string;
  body: string;
  href: string;
  sketch?: "img-to-3d" | "lsp-server";
  featured?: boolean;
};

function SupportingCard({ c }: { c: SupportingCardData }) {
  const isFeatured = c.featured === true;
  const hasDiagram = c.sketch === "img-to-3d" || c.sketch === "lsp-server";
  return (
    <article
      className={
        "relative col-span-12 sm:col-span-6 border border-rule-soft bg-paper/40 backdrop-blur-md p-5 sm:p-6 pr-16 hover:border-ink-mute transition-colors " +
        (isFeatured ? "sm:py-8" : "")
      }
    >
      <Doodle name={c.name} />
      <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-2">
        {c.kicker}
      </p>
      {isFeatured && (
        <p className="font-serif text-[14px] text-sepia -mt-1 mb-2 italic">
          live · in the world
        </p>
      )}
      <h3 className="font-serif text-[24px] sm:text-[26px] leading-[1.05] tracking-tightest text-ink">
        <a href={c.href} target="_blank" rel="noreferrer" className="hover:text-graphite">
          {c.name}
          <span className="text-ink-faint">.</span>
        </a>
      </h3>
      <p className="mt-1.5 font-serif italic text-[14.5px] text-ink-soft leading-snug">
        {c.one}
      </p>
      <p className="mt-3 font-serif text-[13.5px] leading-[1.65] text-ink-soft text-pretty">
        {c.body}
      </p>
      {!hasDiagram && <ProjectArt name={c.name} />}
      {c.sketch === "img-to-3d" && <ImgTo3DSketch />}
      {c.sketch === "lsp-server" && <LspSketch />}
    </article>
  );
}

export default function Page() {
  return (
    <>
      <ChaosBackground />
      <main className="relative mx-auto max-w-[980px] px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-24">
        {/* ====== TOP NAV ====== */}
        <header className="flex items-center justify-between mb-16 sm:mb-20">
          <a href="/" className="group" aria-label="Sribatsha Dash — home">
            <Logo className="text-ink group-hover:text-graphite transition-colors" size={32} />
          </a>
          <nav className="flex items-center gap-5 sm:gap-7">
            {contact.map((c) => (
              <a
                key={c.kind}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="font-mono text-[11px] uppercase tracking-wide2 text-ink-mute hover:text-ink transition-colors"
              >
                {c.kind}
              </a>
            ))}
          </nav>
        </header>

        {/* ====== HERO ====== */}
        <header className="pb-20">
          <h1 className="flex flex-col font-normal text-ink leading-[0.95]">
            <span className="block font-display font-extrabold text-[clamp(32px,5vw,56px)] uppercase tracking-[0.04em]">
              Sribatsha
            </span>
            <span className="block font-display font-extrabold text-[clamp(32px,5vw,56px)] uppercase text-ink-soft tracking-[0.04em]">
              Dash<span className="text-ink-faint">.</span>
            </span>
          </h1>

          <p className="mt-6 font-serif text-[17px] sm:text-[19px] text-ink-soft leading-[1.4] max-w-[42ch]">
            Today:{" "}
            <span className="pencil-double-underline">
              Building nnn in the mornings. Lockr support tickets in the evenings. Sleep is a hypothesis, not a fact.
            </span>
          </p>

          <p className="mt-10 font-serif text-[17px] leading-[1.8] text-ink-soft text-pretty max-w-[65ch] dropcap">
            {bio.map((seg, i) =>
              typeof seg === "string" ? (
                <span key={i}>{seg}</span>
              ) : seg.em ? (
                <em key={i} className="font-serif">{seg.em}</em>
              ) : null
            )}
          </p>
        </header>

        {/* ====== PAGE BREAK ====== */}
        <div className="mt-24 sm:mt-32 mb-12">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 200 6" className="flex-1 h-1.5 text-ink-mute" aria-hidden>
              <path d="M 2 3 C 30 1 70 2 110 3 C 140 4 170 4 198 3" fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[9px] uppercase tracking-broad text-ink-faint">
              ↳ on the bench · {meta.date.toLowerCase()}
            </span>
            <svg viewBox="0 0 200 6" className="flex-1 h-1.5 text-ink-mute" aria-hidden>
              <path d="M 2 3 C 30 1 70 2 110 3 C 140 4 170 4 198 3" fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* ====== FEATURE ====== */}
        <section className="mt-10 sm:mt-12">
          <article className="relative bg-paper/40 backdrop-blur-md border border-rule p-6 sm:p-8 pr-20">
            <Doodle name="nnn" />
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-2">
              ↳ {feature.kicker}
            </p>
            <h2 className="font-serif text-[44px] sm:text-[60px] leading-[0.95] tracking-tightest text-ink">
              <a href={feature.href} target="_blank" rel="noreferrer" className="hover:text-graphite">
                {feature.name}
                <span className="text-ink-faint">.</span>
              </a>
            </h2>
            <p className="mt-3 font-serif italic text-[19px] sm:text-[21px] text-ink-soft leading-snug">
              {feature.one}
            </p>
            <div className="mt-6 space-y-4 font-serif text-[15.5px] leading-[1.75] text-ink-soft max-w-[60ch] text-pretty">
              {feature.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 md:gap-10 items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-3">
                  ↳ the loop
                </p>
                <NnnSketch />
              </div>
              <aside className="md:pl-6 md:border-l md:border-rule-soft md:pt-0 pt-2">
                <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-3">
                  ↳ on disk
                </p>
                <NnnRoughSketch />
                <p className="mt-4 font-serif text-[17px] text-ink-soft leading-snug">
                  the agents share a scratch directory. they pass files, not messages. read the readme on github for what each one actually does.
                </p>
              </aside>
            </div>

            <p className="mt-6 font-serif text-[18px]">
              <a
                href={feature.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:text-graphite border-b border-rule hover:border-ink-mute transition-colors"
              >
                github.com/srivtx/nnn ↗
              </a>
            </p>
          </article>
        </section>

        {/* ====== SUPPORTING WORK ====== */}
        <section className="mt-20 sm:mt-24">
          <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-4">
            ↳ more on the bench
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
            {supporting.map((c) => (
              <SupportingCard key={c.name} c={c} />
            ))}
          </div>
          <p className="mt-6 font-serif text-[19px] text-ink-soft">
            + a dozen more repos on{" "}
            <a href={moreOnGithub} target="_blank" rel="noreferrer" className="text-ink hover:text-graphite border-b border-rule hover:border-ink-mute transition-colors">
              github / srivtx
            </a>
            .
          </p>
        </section>

        {/* ====== UPSTREAM ====== */}
        <section className="mt-20 sm:mt-24">
          <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-4">
            ↳ merged upstream
          </p>
          <ul className="space-y-0">
            {upstream.map((u) => (
              <li
                key={u.name}
                className="py-3.5 border-b border-rule-soft grid grid-cols-[1fr_auto] gap-4 items-baseline"
              >
                <div className="min-w-0">
                  <a
                    href={u.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif text-[18px] sm:text-[20px] text-ink hover:text-graphite"
                  >
                    {u.name}
                    <span className="text-ink-faint">.</span>
                  </a>
                  <span className="ml-2 font-serif text-[17px] text-ink-soft">
                    {u.what}
                  </span>
                  <p className="mt-1 font-serif text-[13.5px] text-ink-soft leading-[1.55] max-w-[60ch]">
                    {u.detail}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wide2 text-ink-mute self-start pt-1.5 whitespace-nowrap flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--moss)" }} />
                  {u.state} <span className="text-ink-faint">{u.pr}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ====== PRACTICE / JOB / SCHOOL ====== */}
        <section className="mt-12 sm:mt-14">
          <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-1.5">
            ↳ practice
          </p>
          <p className="font-serif text-[20px] text-ink leading-[1.3]">
            {practiceLine}
          </p>
        </section>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-1">
              ↳ the job
            </p>
            <p className="font-serif text-[15px] text-ink">
              {job.role}, <span className="italic">{job.where.toLowerCase()}</span>{" "}
              <span className="text-ink-mute font-mono text-[12px]">· {job.period}</span>
            </p>
            <p className="mt-1.5 font-serif text-[13px] text-ink-soft max-w-[48ch] leading-[1.55]">
              {job.detail}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-1">
              ↳ the school
            </p>
            <p className="font-serif text-[15px] text-ink">
              {school.where}{" "}
              <span className="text-ink-mute font-mono text-[12px]">· {school.period}</span>
            </p>
            <p className="mt-1.5 font-serif text-[13px] text-ink-soft max-w-[48ch] leading-[1.55]">
              {school.detail}
            </p>
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="mt-24 pt-8 border-t border-rule">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute">
                ↳ signed
              </p>
              <p className="mt-1 font-serif text-[20px] text-ink-soft">
                sribatsha dash, bhubaneswar
              </p>
              <p className="mt-0.5 font-serif text-[15px] text-ink-faint italic">
                hand-built · <span className="not-italic font-mono text-[10px] tracking-wide2 uppercase">next.js</span> · saira · caveat · instrument serif · inter · jb mono
              </p>
            </div>
            <div className="text-right">
              <svg
                viewBox="0 0 200 70"
                width={140}
                height={49}
                className="text-ink ml-auto"
                role="img"
                aria-label="S.D. — hand-drawn signature"
                style={{ transform: "rotate(-3deg)" }}
              >
                <path
                  d="M 30 38 C 24 38 18 32 22 24 C 26 18 38 18 44 24 C 48 30 44 38 36 40 C 42 38 50 36 56 32 C 60 28 60 22 56 20 C 52 18 48 22 48 28 C 50 36 60 42 70 40 C 80 38 86 32 86 24 C 86 18 80 14 74 18 C 78 18 84 22 90 24 C 98 28 106 28 112 24 C 118 20 124 18 130 20 C 138 22 144 30 144 38 C 144 46 138 50 132 48 C 126 46 122 40 124 32 C 126 26 132 24 138 28 C 144 32 150 38 156 42 C 162 46 168 46 170 42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={172} cy={42} r={1.3} fill="currentColor" />
              </svg>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-broad text-ink-faint">
                sribatsha dash · {meta.date.toLowerCase()}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

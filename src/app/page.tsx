// One page. One feature. A grid of supporting work. The meta.
// Three visual registers, in that order. Margin scrawls on the right.

import { meta, today, bio, contact, marginNotes, feature, supporting, moreOnGithub, upstream, practiceLine, job, school } from "@/lib/data";
import { LiveTime } from "@/components/LiveTime";
import { NnnSketch, NnnRoughSketch, ImgTo3DSketch, LspSketch } from "@/components/Sketch";
import { Doodle } from "@/components/Doodle";
import { ProjectArt } from "@/components/ProjectArt";

// One supporting-work card. Same shape for all 10. Diagram optional.

type SupportingCardData = {
  name: string;
  kicker: string;
  one: string;
  body: string;
  href: string;
  sketch?: "img-to-3d" | "lsp-server";
  featured?: boolean;
  todo?: string;
};

function SupportingCard({ c }: { c: SupportingCardData }) {
  const isFeatured = c.featured === true;
  const hasDiagram = c.sketch === "img-to-3d" || c.sketch === "lsp-server";
  return (
    <article
      className={
        "relative col-span-12 sm:col-span-6 border border-rule-soft bg-paper-soft p-5 sm:p-6 pr-16 hover:border-graphite transition-colors " +
        (isFeatured ? "sm:py-8" : "")
      }
    >
      <Doodle name={c.name} />
      <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-2">
        ↳ {c.kicker}
      </p>
      {isFeatured && (
        <p className="font-hand text-[15px] text-sepia -mt-1 mb-2 italic">
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
      {/* Hand-drawn 3D/2D illustration — only on cards that don't have a diagram. */}
      {!hasDiagram && <ProjectArt name={c.name} />}
      {c.sketch === "img-to-3d" && <ImgTo3DSketch />}
      {c.sketch === "lsp-server" && <LspSketch />}
    </article>
  );
}

// The sticky margin column. Scrawled notes on top, reach at the bottom.

function MarginColumn() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 pt-2">
        <p className="font-hand text-[15px] text-ink-mute mb-3">
          ↳ margin
        </p>
        <ul className="space-y-4">
          {marginNotes.map((n) => (
            <li
              key={n.id}
              className={`font-hand text-[17px] leading-[1.3] ${
                n.kind === "warn"
                  ? "text-rust"
                  : n.kind === "todo"
                    ? "text-sepia"
                    : n.kind === "q"
                      ? "text-graphite"
                      : n.kind === "lesson"
                        ? "text-ink"
                        : "text-ink-soft"
              }`}
            >
              {n.kind === "todo" && "□ "}
              {n.kind === "warn" && "⚠ "}
              {n.kind === "q" && "? "}
              {n.kind === "lesson" && "△ "}
              {n.text}
            </li>
          ))}
        </ul>

        <hr className="my-7 border-rule-soft" />

        <p className="font-hand text-[15px] text-ink-mute mb-2">↳ reach</p>
        <ul className="font-mono text-[10.5px] leading-[1.8] text-ink-soft space-y-1">
          {contact.map((c) => (
            <li key={c.kind}>
              <a
                href={c.href}
                target={c.kind === "email" ? undefined : "_blank"}
                rel={c.kind === "email" ? undefined : "noreferrer"}
                className="hover:text-ink"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default function Page() {
  return (
    <main className="relative mx-auto max-w-page px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-20">
      <div className="flex items-baseline justify-between font-hand text-[20px] text-ink-soft mb-6">
        <span>{meta.date}</span>
        <span className="font-mono text-[11px] text-ink-mute tabular-nums">
          <LiveTime /> · in your window
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-x-10">
        {/* ====== LEFT — the page proper ====== */}
        <div className="min-w-0">

          {/* HERO */}
          <header>
            <h1 className="font-hand font-normal text-ink leading-[0.95] tracking-tight">
              <span className="block text-[clamp(64px,12vw,128px)]">
                Sribatsha
              </span>
              <span className="block text-[clamp(64px,12vw,128px)] italic text-ink-soft pl-[0.18em]">
                Dash<span className="text-ink-faint">.</span>
              </span>
            </h1>

            <p className="mt-5 font-hand text-[24px] sm:text-[28px] text-ink-soft leading-[1.2] max-w-[34ch]">
              Today:{" "}
              <span className="pencil-double-underline">
                Building nnn in the mornings. Lockr support tickets in the evenings. Sleep is a hypothesis, not a fact.
              </span>
            </p>

            <p className="mt-8 font-serif text-[16.5px] leading-[1.75] text-ink-soft text-pretty max-w-body dropcap">
              {bio.map((seg, i) =>
                typeof seg === "string" ? (
                  <span key={i}>{seg}</span>
                ) : seg.em ? (
                  <em key={i} className="font-serif">{seg.em}</em>
                ) : null
              )}
            </p>
          </header>

          {/* THE FEATURE — nnn, full width, the loudest thing */}
          <section className="mt-16 sm:mt-20">
            <article className="relative bg-paper-soft border border-rule p-6 sm:p-8 pr-20">
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

              {/* Diagram on the left, a real margin scrawl on the right. Fills the card. */}
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
                  <p className="mt-4 font-hand text-[17px] text-ink-soft leading-snug">
                    the agents share a scratch directory. they pass files, not messages. read the readme on github for what each one actually does.
                  </p>
                </aside>
              </div>

              <p className="mt-6 font-hand text-[18px]">
                <a
                  href={feature.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  github.com/srivtx/nnn ↗
                </a>
              </p>
            </article>
          </section>

          {/* SUPPORTING WORK — one coherent 2-col grid. Same visual system. */}
          <section className="mt-14 sm:mt-16">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-4">
              ↳ more on the bench
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
              {supporting.map((c) => (
                <SupportingCard key={c.name} c={c} />
              ))}
            </div>
            <p className="mt-6 font-hand text-[19px] text-ink-soft">
              + a dozen more repos on{" "}
              <a href={moreOnGithub} target="_blank" rel="noreferrer" className="link-underline">
                github / srivtx
              </a>
              .
            </p>
          </section>

          {/* UPSTREAM — the things that got merged into other people's codebases */}
          <section className="mt-14">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-4">
              ↳ upstream · a stranger decided the patch was worth merging
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
                      className="font-serif text-[18px] sm:text-[20px] text-ink link-underline"
                    >
                      {u.name}
                      <span className="text-ink-faint">.</span>
                    </a>
                    <span className="ml-2 font-hand text-[17px] text-ink-soft">
                      {u.what}
                    </span>
                    <p className="mt-1 font-serif text-[13.5px] text-ink-soft leading-[1.55] max-w-[60ch]">
                      {u.detail}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide2 text-mute self-start pt-1.5 whitespace-nowrap flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--moss)" }} />
                    {u.state} <span className="text-ink-faint">{u.pr}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* PRACTICE — one handwritten line */}
          <section className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-1.5">
              ↳ practice
            </p>
            <p className="font-hand text-[20px] text-ink leading-[1.3]">
              {practiceLine}
            </p>
          </section>

          {/* JOB + SCHOOL */}
          <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
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

          {/* FOOTER — the page signature. Contact lives in the right margin. */}
          <div className="mt-16 pt-6 border-t border-rule">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute">
              hand-built · next.js · caveat · instrument serif · inter · jb mono
            </p>
            <p className="mt-2 font-hand text-[20px] text-ink-soft">— srivtx</p>
          </div>
        </div>

        {/* ====== RIGHT — sticky margin ====== */}
        <MarginColumn />
      </div>
    </main>
  );
}

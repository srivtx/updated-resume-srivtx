import Link from "next/link";
import { SiteShell } from "@/components/Site";
import { COL } from "@/lib/layout";

export default function NotFound() {
  return (
    <SiteShell>
      <section className={`${COL} pt-16 sm:pt-24 pb-16`}>
        <p className="font-mono text-[11px] text-black/55 dark:text-white/50">404</p>
        <h1 className="mt-3 text-[28px] sm:text-[34px] leading-[1.1] font-medium tracking-[-0.02em]">
          Nothing lives at this address.
        </h1>
        <p className="mt-3 text-[15px] text-neutral-500 dark:text-neutral-400 max-w-[52ch]">
          It may have moved when the site was reorganised. These are the places that exist:
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {[
            ["/", "Home"],
            ["/projects", "Work"],
            ["/writing", "Writing"],
            ["/blogs", "Notes"],
            ["/inventions", "Papers"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="underline decoration-black/20 dark:decoration-white/25 underline-offset-[5px] decoration-[1.5px] hover:decoration-black dark:hover:decoration-white transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}

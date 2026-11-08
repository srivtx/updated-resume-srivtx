// A sub-page: the site frame, then the page's own title and one line
// about what is on it.

import type { ReactNode } from "react";
import { SiteShell } from "@/components/Site";
import { COL } from "@/lib/layout";

export function SubPageShell({
  title,
  sub,
  children,
}: {
  title?: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      {title && (
        <div className={`${COL} pt-10 sm:pt-14 pb-6 sm:pb-8`}>
          <h1 className="text-[28px] sm:text-[34px] leading-[1.1] font-medium tracking-[-0.02em] text-neutral-900 dark:text-neutral-100">
            {title}
          </h1>
          {sub && <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400 max-w-[60ch]">{sub}</p>}
        </div>
      )}
      <div className={`${COL} ${title ? "" : "pt-8 sm:pt-10"} pb-6`}>{children}</div>
    </SiteShell>
  );
}

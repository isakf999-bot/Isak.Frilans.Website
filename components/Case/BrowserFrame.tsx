/**
 * Webbläsarram för case-skärmdumpar — mörkblå toppbar, lås och domän i
 * adressfältet. Byggd för att stå på en bg-night-scen: kanten är en tunn
 * ljus linje och skuggan (shadow-window) bär det blå skenet.
 */
import type { ReactNode } from "react";
import { Lock } from "lucide-react";

export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-night-raised shadow-window ring-1 ring-white/15 ${className}`}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3"
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md bg-white/[0.07] px-3 py-1.5 sm:mx-auto sm:max-w-md">
          <Lock className="h-3 w-3 shrink-0 text-brand-glow" />
          <span className="truncate font-mono text-[0.6875rem] leading-none text-white/80 sm:text-xs">
            {url}
          </span>
        </div>
        {/* Väger upp prickarna så adressfältet hamnar optiskt i mitten */}
        <div className="hidden w-11 shrink-0 sm:block" />
      </div>
      <div className="relative bg-night">{children}</div>
    </div>
  );
}

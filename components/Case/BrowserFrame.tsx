/**
 * Webbläsarram i Generation-stil — mörk toppbar, låsikon och domän i
 * adressfältet. Ger case-skärmdumpar känslan av en riktig sajt i Chrome.
 */
import type { ReactNode } from "react";

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
      className={`overflow-hidden rounded-xl border border-[#6e737d]/80 bg-[#0e1116] shadow-lift ${className}`}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-3 border-b border-white/5 px-3 py-2.5 sm:px-3.5"
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6057]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffc32f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#26ca40]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-pill bg-[#2a2d32] px-3 py-1">
          <LockIcon />
          <span className="truncate text-[11px] leading-none text-[#b9bec5] sm:text-xs">
            {url}
          </span>
        </div>
      </div>
      <div className="relative bg-mist">{children}</div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="h-3 w-3 shrink-0 text-[#8b9099]"
      fill="currentColor"
    >
      <path d="M9.5 5H9V3.5a3 3 0 0 0-6 0V5h-.5A1.5 1.5 0 0 0 1 6.5v3A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5ZM4.2 3.5a1.8 1.8 0 0 1 3.6 0V5H4.2V3.5Z" />
    </svg>
  );
}

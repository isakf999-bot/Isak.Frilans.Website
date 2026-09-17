"use client";

import type { ReactNode } from "react";

/**
 * Diskret sektionsmarkör. `tone="dark"` när sektionen har mörk botten så
 * att texten hålls läslig och pricken lyser tydligare mot dunklet.
 */
export function SectionLabel({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const wrapperClass =
    tone === "dark"
      ? "text-eyebrow font-medium tracking-[0.14em] text-white/65 uppercase"
      : "text-eyebrow font-medium tracking-[0.14em] text-muted uppercase";

  const dotClass =
    tone === "dark"
      ? "h-1 w-1 shrink-0 rounded-full bg-brand-glow"
      : "h-1 w-1 shrink-0 rounded-full bg-brand";

  return (
    <p className={`inline-flex items-center gap-2 ${wrapperClass}`}>
      <span aria-hidden="true" className={dotClass} />
      {children}
    </p>
  );
}

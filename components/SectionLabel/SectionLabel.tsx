import type { ReactNode } from "react";

/**
 * Sektionsetikett: ett kort streck i varumärkesblått + sektionens namn.
 * `tone="dark"` när sektionen har mörk botten.
 */
export function SectionLabel({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-medium ${
        tone === "dark" ? "text-brand-glow" : "text-brand"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-8 shrink-0 ${
          tone === "dark" ? "bg-brand-glow" : "bg-brand"
        }`}
      />
      {children}
    </p>
  );
}

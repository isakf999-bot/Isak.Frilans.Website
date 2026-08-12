"use client";

import { useEffect, useState } from "react";

export const PROCESS_SECTIONS = [
  { id: "processen", label: "Processen" },
  { id: "kommunikation", label: "Kommunikation" },
  { id: "praktiskt", label: "Betalning & överlämning" },
  { id: "pris", label: "Priser" },
] as const;

/**
 * Mini-navigation för Pris & process-sidan.
 * Visar att det finns mer under och låter dig hoppa till rätt sektion.
 */
export function ProcessPageNav() {
  const [active, setActive] = useState<string>(PROCESS_SECTIONS[0].id);

  useEffect(() => {
    const els = PROCESS_SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="På den här sidan">
      <p className="text-eyebrow font-medium text-muted uppercase">På sidan</p>
      <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        {PROCESS_SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm transition-colors duration-150 lg:w-full ${
                  isActive
                    ? "bg-brand text-white"
                    : "border border-line bg-surface text-muted hover:border-ink/20 hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    isActive ? "bg-white" : "bg-brand/50"
                  }`}
                />
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

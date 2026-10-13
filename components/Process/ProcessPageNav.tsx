"use client";

import { useEffect, useState } from "react";

export const PROCESS_SECTIONS = [
  { id: "processen", label: "Processen" },
  { id: "kommunikation", label: "Kommunikation" },
  { id: "praktiskt", label: "Betalning & överlämning" },
] as const;

/**
 * Mini-navigation för process-sidan.
 * Visar att det finns mer under och låter dig hoppa till rätt sektion.
 * Rad som bryter på mobil, lodrät lista med markör i kanten från lg.
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
      <p className="text-sm font-medium text-muted">På sidan</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 lg:flex-col lg:gap-0 lg:border-l lg:border-line-cool">
        {PROCESS_SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block border-b-2 py-2 text-sm font-medium transition-colors duration-150 ease-out lg:-ml-px lg:border-b-0 lg:border-l-2 lg:py-2.5 lg:pl-4 ${
                  isActive
                    ? "border-brand text-ink"
                    : "border-transparent text-muted hover:border-line-cool hover:text-ink"
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

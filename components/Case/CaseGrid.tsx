"use client";

import { useMemo, useState } from "react";
import { CaseCard } from "@/components/Case/CaseCard";
import type { CaseStudy } from "@/lib/cases";

const ALL = "Alla branscher";

/**
 * Filterchips + grid — samma språk som The Generation /kundcase:
 * branschfilter ovanför, stora case-kort under.
 */
export function CaseGrid({
  cases,
  industries,
}: {
  cases: CaseStudy[];
  industries: string[];
}) {
  const [active, setActive] = useState(ALL);

  const filtered = useMemo(() => {
    if (active === ALL) return cases;
    return cases.filter((c) => c.industry === active);
  }, [active, cases]);

  const chips = [ALL, ...industries.filter((i) => i !== ALL)];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filtrera efter bransch"
        className="flex flex-wrap gap-2"
      >
        {chips.map((chip) => {
          const isActive = active === chip;
          return (
            <button
              key={chip}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(chip)}
              className={`rounded-pill border px-4 py-2 text-sm font-medium transition-all duration-200 ease-out ${
                isActive
                  ? "border-brand bg-brand text-white shadow-brand"
                  : "border-line bg-surface text-muted hover:border-brand/30 hover:bg-brand-tint hover:text-brand"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-muted">
          Inga case i den här branschen ännu.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {filtered.map((study, i) => (
            <CaseCard key={study.slug} study={study} priority={i < 2} />
          ))}
        </div>
      )}
    </div>
  );
}

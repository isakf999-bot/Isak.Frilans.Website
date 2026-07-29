"use client";

import { useMemo, useState } from "react";
import { CaseCard } from "@/components/Case/CaseCard";
import type { CaseStudy } from "@/lib/cases";

const ALL = "Alla branscher";

/**
 * Sök + branschfilter + grid — samma språk som The Generation /kundcase:
 * sökfält, "Rensa filtrering" och branschchips ovanför, stora case-kort under.
 */
export function CaseGrid({
  cases,
  industries,
}: {
  cases: CaseStudy[];
  industries: string[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return cases.filter((c) => {
      if (active !== ALL && c.industry !== active) return false;
      if (!q) return true;

      const haystack = [
        c.domain,
        c.client,
        c.industry,
        c.teaser,
        c.intro,
        ...c.services,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [active, cases, query]);

  const chips = [ALL, ...industries.filter((i) => i !== ALL)];
  const hasFilter = query.trim().length > 0 || active !== ALL;

  function clearFilters() {
    setQuery("");
    setActive(ALL);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="case-search"
            className="block text-sm font-medium text-ink"
          >
            Sök
          </label>
          <input
            id="case-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Fyll i din sökning här..."
            autoComplete="off"
            className="mt-2 w-full rounded-lg border-2 border-line bg-surface px-4 py-3 text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-brand"
          />
        </div>

        <button
          type="button"
          onClick={clearFilters}
          disabled={!hasFilter}
          className={`shine inline-flex shrink-0 items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-medium text-white shadow-brand transition-all duration-200 ease-out sm:mb-0.5 ${
            hasFilter
              ? "bg-brand hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
              : "cursor-default bg-brand/40 shadow-none"
          }`}
        >
          <ClearIcon />
          Rensa filtrering
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Filtrera efter bransch"
        className="mt-6 flex flex-wrap gap-2"
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
          Inga case matchade filtreringen.
          {hasFilter ? (
            <>
              {" "}
              <button
                type="button"
                onClick={clearFilters}
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                Rensa filtrering
              </button>
            </>
          ) : null}
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

function ClearIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M3 3l6 6M9 3L3 9" />
    </svg>
  );
}

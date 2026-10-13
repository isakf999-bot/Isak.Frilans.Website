"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { CaseFeature } from "@/components/Case/CaseFeature";
import { btn } from "@/components/ui/buttonStyles";
import type { CaseStudy } from "@/lib/cases";

const ALL = "Alla branscher";

/**
 * Sök + branschfilter ovanför, stora case-rader under. Raderna växlar sida
 * så att listan håller för både ett, två och många case.
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
  const hasQuery = query.trim().length > 0;
  const hasFilter = hasQuery || active !== ALL;

  function clearFilters() {
    setQuery("");
    setActive(ALL);
  }

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-5">
          <label
            htmlFor="case-search"
            className="block text-sm font-medium text-ink"
          >
            Sök bland casen
          </label>
          <div className="relative mt-2">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <input
              id="case-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && hasQuery) setQuery("");
              }}
              placeholder="Kund, bransch eller tjänst"
              autoComplete="off"
              className="w-full rounded-md border border-line-cool bg-surface py-3 pr-12 pl-11 text-ink outline-none transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-muted hover:border-brand/40 focus:border-brand focus:shadow-[0_0_0_3px_var(--color-brand-tint)] [&::-webkit-search-cancel-button]:appearance-none"
            />
            {hasQuery ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Töm sökfältet"
                className="absolute top-1/2 right-2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-brand-tint hover:text-ink active:bg-surface-soft"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div
          role="group"
          aria-labelledby="case-industry-label"
          className="lg:col-span-7"
        >
          <p
            id="case-industry-label"
            className="text-sm font-medium text-ink"
          >
            Bransch
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {chips.map((chip) => {
              const isActive = active === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(chip)}
                  className={`${btn.chip} ${
                    isActive ? btn.chipActive : btn.chipIdle
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex min-h-10 flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p role="status" className="font-mono text-sm text-muted">
          Visar {filtered.length} av {cases.length} case
        </p>
        {hasFilter ? (
          <button type="button" onClick={clearFilters} className={btn.ghost}>
            <X aria-hidden="true" className="h-4 w-4" />
            Rensa filtrering
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 border-t border-ink pt-10 lg:pt-12">
          <SearchX aria-hidden="true" className="h-5 w-5 text-brand" />
          <h2 className="mt-4 text-h3 break-words">
            {hasQuery
              ? `Inga case matchar ”${query.trim()}”.`
              : "Inga case i den här branschen."}
          </h2>
          <p className="mt-3 max-w-md text-muted">
            Prova ett annat sökord eller välj en annan bransch, så visas
            casen igen.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className={`mt-8 ${btn.secondary}`}
          >
            Visa alla case
          </button>
        </div>
      ) : (
        <ul className="mt-6 space-y-16 lg:space-y-24">
          {filtered.map((study, i) => (
            <li key={study.slug}>
              <CaseFeature study={study} flip={i % 2 === 1} priority={i === 0} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

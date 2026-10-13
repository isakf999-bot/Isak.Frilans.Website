"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { SeoFaq } from "@/lib/seoLandings";

/** Frågor som linjerade rader. Svaren ligger alltid kvar i HTML:en. */
export function SeoLandingFaq({ items }: { items: SeoFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul className="border-b border-ink">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-t border-ink">
            <h3 className="text-lg leading-snug tracking-tight">
              <button
                type="button"
                id={`${id}-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left font-semibold text-ink transition-colors duration-150 ease-out hover:text-brand"
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
              >
                <span className="min-w-0 break-words hyphens-auto">{item.q}</span>
                <Plus
                  aria-hidden="true"
                  className={`mt-1 h-5 w-5 shrink-0 text-brand transition-transform duration-200 ease-out ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={`${id}-a-${i}`}
              role="region"
              aria-labelledby={`${id}-q-${i}`}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pr-10 pb-6 text-muted">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

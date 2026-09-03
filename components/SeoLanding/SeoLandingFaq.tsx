"use client";

import { useState } from "react";
import type { SeoFaq } from "@/lib/seoLandings";

export function SeoLandingFaq({ items }: { items: SeoFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="mt-8 divide-y divide-line rounded-lg border border-line glass">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-white/[0.03]"
              aria-expanded={isOpen}
            >
              <span className="font-semibold tracking-tight text-ink">{item.q}</span>
              <span
                aria-hidden="true"
                className={`mt-0.5 text-brand transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

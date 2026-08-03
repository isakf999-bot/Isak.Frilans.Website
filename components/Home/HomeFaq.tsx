"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { homeFaq } from "@/lib/faq";

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface">
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 text-h2">Vanliga frågor</h2>
          <p className="mt-4 text-lead text-muted">
            Kort och rakt. Hittar du inte svaret — fråga i kontaktformuläret.
          </p>
        </Reveal>

        <ul className="mt-10 divide-y divide-line rounded-2xl border border-line bg-canvas shadow-card">
          {homeFaq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-brand-tint/40"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold tracking-tight text-ink">
                    {item.q}
                  </span>
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

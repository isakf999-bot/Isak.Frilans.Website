"use client";

import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { homeFaq } from "@/lib/faq";

/**
 * Vanliga frågor som dragspel. `asPage` gör rubriken till sidans h1
 * (på /faq); annars är blocket en sektion med h2.
 */
export function HomeFaq({ asPage = false }: { asPage?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  const Heading = asPage ? "h1" : "h2";
  const QuestionHeading = asPage ? "h2" : "h3";

  return (
    <section id="faq" aria-labelledby={`${baseId}-rubrik`}>
      <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-12 px-6 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>FAQ</SectionLabel>
          <Heading id={`${baseId}-rubrik`} className="mt-6 text-h1">
            Vanliga frågor
          </Heading>
          <p className="mt-6 max-w-sm text-lead text-muted">
            Kort och rakt. Hittar du inte svaret?{" "}
            <Link href="/kontakt" className="link">
              Fråga i kontaktformuläret
            </Link>
            .
          </p>
        </div>

        <ul className="border-t border-ink">
          {homeFaq.map((item, i) => {
            const isOpen = open === i;
            const buttonId = `${baseId}-fraga-${i}`;
            const panelId = `${baseId}-svar-${i}`;
            const Icon = isOpen ? Minus : Plus;
            return (
              <li key={item.q} className="border-b border-line-cool">
                <QuestionHeading className="text-[1.25rem] leading-snug tracking-[-0.02em]">
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`break-words transition-colors duration-150 ease-out group-hover:text-brand ${
                        isOpen ? "text-brand" : "text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors duration-150 ease-out ${
                        isOpen
                          ? "bg-brand text-white"
                          : "bg-brand-tint text-brand group-hover:bg-brand group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  </button>
                </QuestionHeading>
                {/* Höjden animeras via grid-rader (0fr → 1fr). Stängt svar är
                    `inert` så att det varken läses upp eller tar fokus. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pr-14 pb-8 text-muted">
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

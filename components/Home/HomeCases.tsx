import Link from "next/link";
import { CaseCard } from "@/components/Case/CaseCard";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { publishedCases } from "@/lib/cases";

/**
 * Case-sektion på mörk botten. Layouten är Bravo-inspirerad — laptop-
 * mockups sida vid sida med rubrik + länk under — men bakgrunden är
 * medvetet vår egen (varm ink + två diskreta brons-glows), inte deras
 * svarta zigzag-mönster.
 */
export function HomeCases() {
  const cases = publishedCases.slice(0, 2);

  return (
    <section
      id="kundcase-hem"
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      {/* Egen atmosfär — INTE Bravos zigzag. Två diskreta brons-glows
          i motsatta hörn ger djup utan att skrika. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(196,165,116,0.55) 0%, rgba(28,25,23,0) 65%)",
          }}
        />
        <div
          className="absolute -right-52 -bottom-40 h-[38rem] w-[38rem] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(196,165,116,0.6) 0%, rgba(28,25,23,0) 65%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel tone="dark">Kundcase</SectionLabel>
            <h2 className="mt-4 text-h2 text-white">
              Ett par sajter jag nyligen byggt.
            </h2>
            <p className="mt-4 text-lead text-white/70">
              Riktiga projekt — inte mockups från en mallbutik. Klicka in och
              se hur de känns i webbläsaren.
            </p>
          </div>
          <Link
            href="/case"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-glow transition-opacity hover:opacity-80"
          >
            Alla kundcase
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <ul className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {cases.map((study, i) => (
            <li key={study.slug}>
              <Reveal delay={i * 80}>
                <CaseCard study={study} priority={i === 0} tone="dark" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

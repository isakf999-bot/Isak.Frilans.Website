import Link from "next/link";
import { CaseCard } from "@/components/Case/CaseCard";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { publishedCases } from "@/lib/cases";

/**
 * Case-sektion på mörk botten — Bravo-mönstret: efter den vita "Vad jag
 * hjälper till med"-blocken kommer ett djupt band som lyfter bevisen. Kort-
 * korten själva är fortfarande ljusa (glass), så bilder och text läses bra.
 */
export function HomeCases() {
  const cases = publishedCases.slice(0, 2);

  return (
    <section id="kundcase-hem" className="bg-ink text-white">
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

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {cases.map((study, i) => (
            <li key={study.slug}>
              <Reveal delay={i * 80}>
                <CaseCard study={study} priority={i === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

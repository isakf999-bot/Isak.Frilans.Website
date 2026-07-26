import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { services } from "@/lib/services";

/**
 * Tjänsterna som kort i ett 2×2-rutnät.
 *
 * De valfria fälten i Service-typen (image, price, caseStudy) renderas redan
 * här men syns bara när data finns i lib/services.ts — att bygga ut med bild,
 * pris eller case kräver alltså ingen ändring i den här filen.
 */
export function Services() {
  return (
    <section
      id="vad-jag-bygger"
      className="scroll-mt-24 border-t border-line bg-canvas"
      aria-labelledby="tjanster-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <SectionLabel>Vad jag bygger</SectionLabel>
          <h2 id="tjanster-rubrik" className="mt-6 text-h2">
            Fyra sätt jag kan hjälpa dig.
          </h2>
          <p className="mt-5 text-lead text-muted">
            Osäker på vilket som passar? Beskriv läget i formuläret så säger jag
            vad jag hade gjort — även om svaret är att du inte behöver mig.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <ul className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Proof-band: orden ovanför blir trovärdiga först när de går att
            kontrollera. Här är den kontrollen — en knapp rakt till riktiga
            kunder och vad de faktiskt fick ut av jobbet. */}
        <Reveal
          className="mt-12 overflow-hidden rounded-xl border border-brand-glow bg-brand-tint"
          delay={80}
        >
          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div className="max-w-xl">
              <h3 className="text-h3">Inte bara ord — se vad kunderna fick.</h3>
              <p className="mt-3 text-muted">
                Riktiga företag som hade en sajt som drog ner intrycket. Se hur
                den såg ut före, vad de fick i stället och vad de själva säger om
                resultatet — så vet du precis vilken nivå du får innan du hör av
                dig.
              </p>
            </div>

            <Link
              href="/case"
              className="shine group inline-flex shrink-0 items-center gap-2.5 rounded-pill bg-brand px-6 py-3.5 font-medium whitespace-nowrap text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
            >
              Se mina kundcase
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

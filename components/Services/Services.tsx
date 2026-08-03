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
            Tjänster byggda för tillväxt.
          </h2>
          <p className="mt-5 text-lead text-muted">
            Från landningssida till e-handel — varje leverans är skräddarsydd,
            mätbar och snabb. Osäker på vad du behöver? Beskriv läget så säger
            jag rakt vad som är värt att bygga.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

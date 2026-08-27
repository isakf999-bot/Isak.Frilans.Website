import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { services } from "@/lib/services";

export function Services() {
  return (
    <section
      id="vad-jag-bygger"
      className="scroll-mt-24 border-t border-line bg-transparent"
      aria-labelledby="tjanster-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <SectionLabel>Vad jag bygger</SectionLabel>
          <h2 id="tjanster-rubrik" className="mt-6 text-h2 text-ink">
            Det jag bygger åt dig.
          </h2>
          <p className="mt-5 text-lead text-muted">
            Landningssida, företagssajt eller e-handel — alltid med fokus på vad
            sajten ska åstadkomma för er. Osäker på vad ni behöver? Beskriv
            läget. Jag säger rakt vad som är värt att bygga, och vad ni kan
            skippa.
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

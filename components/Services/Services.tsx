import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { serviceGroups } from "@/components/Services/serviceGroups";
import { serviceIcons } from "@/components/Services/serviceIcons";

/**
 * Alla tjänster, grupperade som i menyn. Varje grupp är en rubrik till
 * vänster och en lista med linjerade rader till höger — en rad per tjänst,
 * hela raden är länken till tjänstens sida.
 */
export function Services() {
  return (
    <section
      id="vad-jag-bygger"
      className="scroll-mt-24 bg-canvas"
      aria-labelledby="tjanster-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <SectionLabel>Vad jag bygger</SectionLabel>
          <h2 id="tjanster-rubrik" className="mt-6 text-h2 text-ink">
            Det jag bygger åt dig.
          </h2>
          <p className="mt-5 text-lead text-muted">
            <Link href="/landningssida" className="link">
              Landningssida
            </Link>
            ,{" "}
            <Link href="/hemsida-foretag" className="link">
              företagssajt
            </Link>{" "}
            eller{" "}
            <Link href="/webbshop" className="link">
              e-handel
            </Link>{" "}
            — alltid med fokus på vad sajten ska åstadkomma för er. Osäker på
            vad ni behöver? Beskriv läget. Jag säger rakt vad som är värt att
            bygga, och vad ni kan skippa.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-20">
          {serviceGroups.map((group) => (
            <Reveal
              key={group.heading}
              className="grid gap-x-12 gap-y-6 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <h3 className="text-h3 text-ink">{group.heading}</h3>
                <p className="mt-3 max-w-sm text-muted">{group.summary}</p>
              </div>

              <ul className="border-t border-ink lg:col-span-8">
                {group.services.map((service) => (
                  <li key={service.slug} className="border-b border-line-cool">
                    <Link
                      href={`/tjanster/${service.slug}`}
                      className="group flex items-start gap-4 px-2 py-5 transition-colors duration-150 ease-out hover:bg-surface sm:gap-5 sm:px-4"
                    >
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-tint text-brand">
                        {serviceIcons[service.slug]}
                      </span>
                      <span className="min-w-0 grow">
                        <span className="block text-lg leading-snug font-semibold tracking-tight break-words hyphens-auto text-ink transition-colors duration-150 group-hover:text-brand">
                          {service.title}
                        </span>
                        <span className="mt-1 block text-muted">
                          {service.description}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-3 h-4 w-4 shrink-0 text-muted transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-brand"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LaptopFrame } from "@/components/Case/LaptopFrame";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";
import { publishedCases } from "@/lib/cases";

/**
 * Kundcase på startsidan: ett case per rad, stor förhandsvisning i en laptop
 * på ena sidan och vad uppdraget gällde på den andra. Raderna växlar sida så
 * att sektionen läses som ett portfolio-uppslag, inte som ett kortgaller.
 *
 * Ljus sektion — den ligger mellan två mörka (gratis utkast och kontakt).
 */
export function HomeCases() {
  const cases = publishedCases.slice(0, 2);

  if (cases.length === 0) return null;

  return (
    <section
      id="kundcase-hem"
      className="bg-mist"
      aria-labelledby="kundcase-hem-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-2xl">
            <SectionLabel>Kundcase</SectionLabel>
            <h2 id="kundcase-hem-rubrik" className="mt-4 text-h2">
              Ett par sajter jag nyligen byggt.
            </h2>
            <p className="mt-4 text-lead text-muted">
              Riktiga projekt — inte mockups från en mallbutik. Klicka in och
              se hur de känns i webbläsaren.
            </p>
          </div>
          <Link href="/case" className={`group ${btn.ghost}`}>
            Alla kundcase
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>

        <ul className="mt-14 lg:mt-20">
          {cases.map((study, i) => (
            <li key={study.slug} className="border-t border-ink py-12 lg:py-16">
              <Reveal>
                <article
                  className={`grid items-center gap-x-16 gap-y-10 ${
                    i % 2 === 1
                      ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
                      : "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
                  }`}
                >
                  <Link
                    href={`/case/${study.slug}`}
                    aria-label={`${study.client} — läs caset`}
                    className={`group block px-3 sm:px-6 lg:px-4 ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <LaptopFrame className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                      <Image
                        src={study.heroImage}
                        alt={study.heroAlt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 620px"
                        className="object-cover object-top"
                      />
                    </LaptopFrame>
                  </Link>

                  <div>
                    <p className="text-sm font-medium text-muted">
                      {study.industry}
                    </p>
                    <h3 className="mt-3 text-h2 break-words">{study.client}</h3>
                    <p className="mt-5 text-lead text-muted">{study.teaser}</p>

                    <dl className="mt-8 text-sm">
                      <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-t border-line-cool py-3">
                        <dt className="text-muted">Uppdrag</dt>
                        <dd className="text-ink">
                          {study.services.join(", ")}
                        </dd>
                      </div>
                      <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 border-y border-line-cool py-3">
                        <dt className="text-muted">Lanserad</dt>
                        <dd className="font-mono text-ink">{study.launched}</dd>
                      </div>
                    </dl>

                    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                      <Link
                        href={`/case/${study.slug}`}
                        className={`group ${btn.secondary}`}
                      >
                        Läs caset
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                        />
                      </Link>
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Besök ${study.domain} live (öppnas i ny flik)`}
                        className="link inline-flex items-center gap-1 font-mono text-sm"
                      >
                        {study.domain}
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

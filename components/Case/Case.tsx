import Link from "next/link";
import { DeviceShowcase } from "@/components/Case/DeviceShowcase";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import type { CaseStudy } from "@/lib/cases";

export function Case({ study }: { study: CaseStudy }) {
  return (
    <article>
      {/* Header + enhets-showcase */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-glow opacity-25 blur-[130px]"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-20">
          <Link
            href="/#vad-jag-bygger"
            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 ease-out hover:text-brand"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Alla tjänster
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel>Kundcase</SectionLabel>
              <span className="text-sm font-medium text-muted">
                {study.industry}
              </span>
            </div>
            <h1 className="mt-6 text-h1">{study.title}</h1>
            <p className="mt-5 text-lead text-muted">{study.intro}</p>
          </div>

          <div className="mt-14">
            <DeviceShowcase study={study} />
          </div>
        </div>
      </section>

      {/* Utmaningen + Vad jag gjorde */}
      <section className="border-t border-line bg-canvas">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-24">
          <Reveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionLabel>Utmaningen</SectionLabel>
              <h2 className="mt-6 text-h2">Sajten drog ner intrycket.</h2>
              <p className="mt-5 text-lead text-muted">{study.challenge}</p>
            </div>

            <div>
              <SectionLabel>Vad jag gjorde</SectionLabel>
              <h2 className="mt-6 text-h2">Byggd om från grunden.</h2>
              <ul className="mt-8 space-y-4">
                {study.work.map((item) => (
                  <li
                    key={item.title}
                    className="card-glow group relative isolate overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white to-[#f5f6fc] p-6 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-glow hover:shadow-lift"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-6 -left-6 -z-10 h-24 w-24 rounded-full bg-brand-glow opacity-40 blur-2xl"
                    />
                    <h3 className="flex items-start gap-3 text-base font-semibold tracking-normal text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-brand-glow/60 bg-brand-tint text-[11px] text-brand shadow-sm"
                      >
                        ✓
                      </span>
                      {item.title}
                    </h3>
                    <p className="mt-2.5 pl-9 text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Resultat */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-24">
          <Reveal className="max-w-2xl">
            <SectionLabel>Resultat</SectionLabel>
            <h2 className="mt-6 text-h2">
              En sida som känns lika seriös som verksamheten.
            </h2>
          </Reveal>

          <Reveal
            className="mt-10 grid gap-5 sm:grid-cols-3"
            delay={80}
          >
            {study.results.map((result) => (
              <div
                key={result.label}
                className="relative overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white to-[#f5f6fc] p-7 shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -left-6 -z-10 h-24 w-24 rounded-full bg-brand-glow opacity-40 blur-2xl"
                />
                <p className="text-4xl font-semibold tracking-tight text-ink">
                  {result.value}
                </p>
                <p className="mt-2 text-sm text-muted">{result.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Citat */}
      {study.quote && (
        <section className="border-t border-line-cool bg-mist">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8 lg:py-24">
            <Reveal>
              <span
                aria-hidden="true"
                className="font-display text-6xl leading-none text-brand/30"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 text-2xl leading-snug font-medium tracking-tight text-ink sm:text-3xl">
                {study.quote.text}
              </blockquote>
              <p className="mt-6 text-sm font-medium text-muted">
                — {study.quote.author}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8 lg:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-h2">
              Har du en sajt som förtjänar samma lyft?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lead text-muted">
              Berätta var du står, så säger jag rakt vad jag hade gjort.
            </p>
            <Link
              href="/#kontakt"
              className="shine group mt-9 inline-flex items-center gap-2.5 rounded-pill bg-brand px-7 py-4 font-medium text-white shadow-brand transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lift active:translate-y-0"
            >
              Boka ett samtal
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

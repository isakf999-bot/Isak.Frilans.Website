import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { BrowserFrame } from "@/components/Case/BrowserFrame";
import { CaseCard } from "@/components/Case/CaseCard";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";
import { getCaseBySlug, publishedCases } from "@/lib/cases";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return publishedCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) return { title: "Case hittades inte — Isak Web" };
  return {
    title: `Kundcase: ${study.domain} — Isak Web`,
    description: study.teaser,
    alternates: { canonical: absoluteUrl(`/case/${slug}`) },
    openGraph: {
      title: `Kundcase: ${study.domain}`,
      description: study.teaser,
      images: [{ url: study.heroImage }],
    },
  };
}

/**
 * Detaljsida för ett enskilt kundcase: domänrubrik + intro, skärmdumpen på
 * en mörkblå scen, Uppdraget (med projektfakta), Resultatet, fler case, CTA.
 */
export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) notFound();

  const related = publishedCases
    .filter((c) => c.slug !== study.slug)
    .slice(0, 2);

  const facts = [
    { term: "Lanserad", value: study.launched },
    { term: "Plattform", value: study.platform },
    { term: "Kund", value: study.client },
    { term: "Bransch", value: study.industry },
  ];

  return (
    <>
      <Nav />
      <main>
        {/* Rubrik + intro */}
        <section>
          <div className="mx-auto max-w-6xl px-6 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-24">
            <Reveal>
              <Link
                href="/case"
                className="link inline-flex items-center gap-2 text-sm"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Alla kundcase
              </Link>

              <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="min-w-0 lg:col-span-7">
                  <SectionLabel>
                    {study.client} · {study.industry}
                  </SectionLabel>
                  <h1 className="mt-6 text-h1 break-words">{study.domain}</h1>
                </div>

                <div className="lg:col-span-5 lg:pt-11">
                  <p className="text-lead text-muted">{study.intro}</p>

                  <ul
                    aria-label="Tjänster i projektet"
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {study.services.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line-cool bg-surface px-3 py-1.5 font-mono text-xs text-ink"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btn.primary}
                    >
                      Besök sajten
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      <span className="sr-only">(öppnas i ny flik)</span>
                    </a>
                    <Link href="/kontakt" className={btn.ghost}>
                      Starta liknande projekt
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Scenen: skärmdumpen i webbläsarram. Ramen kliver upp över kanten
            mellan den ljusa rubrikdelen och den mörka scenen. */}
        <section className="relative bg-linear-to-b from-night-raised to-night text-white">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-12 bg-canvas lg:h-20"
          />
          <figure className="relative mx-auto max-w-6xl px-6 pb-16 lg:px-8 lg:pb-24">
            <BrowserFrame url={study.domain}>
              <div className="relative aspect-[16/10]">
                <Image
                  src={study.heroImage}
                  alt={study.heroAlt}
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1152px) 100vw, 1104px"
                  className="object-cover object-top"
                />
              </div>
            </BrowserFrame>
            <figcaption className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-sm text-white/70">
              <span>{study.heroAlt}</span>
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-on-dark inline-flex items-center gap-1.5 font-mono"
              >
                {study.domain}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(öppnas i ny flik)</span>
              </a>
            </figcaption>
          </figure>
        </section>

        {/* Uppdraget + projektfakta */}
        <section>
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
            <Reveal className="lg:col-span-5">
              <SectionLabel>Uppdraget</SectionLabel>
              <h2 className="mt-5 text-h2">Vad som behövdes</h2>
              <p className="mt-6 text-lead text-muted">{study.challenge}</p>

              <dl className="mt-10 border-t border-ink">
                {facts.map((fact) => (
                  <div
                    key={fact.term}
                    className="flex items-baseline justify-between gap-6 border-b border-line-cool py-3.5"
                  >
                    <dt className="text-sm text-muted">{fact.term}</dt>
                    <dd className="text-right font-mono text-sm text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={80}>
              <h3 className="text-sm font-medium text-muted">
                Det här gjorde jag
              </h3>
              <ul className="mt-4">
                {study.work.map((item) => (
                  <li
                    key={item.title}
                    className="grid gap-2 border-t border-ink py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8 lg:py-8"
                  >
                    <h4 className="text-xl leading-snug font-semibold tracking-tight break-words text-ink">
                      {item.title}
                    </h4>
                    <p className="text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Resultatet */}
        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionLabel>Resultatet</SectionLabel>
                <h2 className="mt-5 text-h2">Vad det blev</h2>
              </div>
              <p className="text-lead text-ink lg:col-span-7 lg:pt-11">
                {study.outcome}
              </p>
            </Reveal>

            <Reveal className="mt-12 lg:mt-16" delay={60}>
              <ul className="grid border-t border-ink sm:grid-cols-3 sm:gap-8">
                {study.results.map((r) => (
                  <li
                    key={r.label}
                    className="border-b border-line-cool py-5 sm:border-b-0 sm:py-6"
                  >
                    <p className="text-h3 font-semibold tracking-tight text-ink">
                      {r.value}
                    </p>
                    <p className="mt-1 text-muted">{r.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            {study.quote && (
              <Reveal className="mt-12 lg:mt-16" delay={100}>
                <figure className="max-w-3xl border-l-2 border-brand pl-6 lg:pl-8">
                  <blockquote className="text-h3 font-medium tracking-tight text-ink">
                    <p>&rdquo;{study.quote.text}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-muted">
                    <span className="font-semibold text-ink">
                      {study.quote.author}
                    </span>
                    {study.quote.role ? `, ${study.quote.role}` : null}
                  </figcaption>
                </figure>
              </Reveal>
            )}
          </div>
        </section>

        {/* Fler case */}
        {related.length > 0 && (
          <section>
            <div
              className={`mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:px-8 lg:py-28 ${
                related.length === 1
                  ? "lg:grid-cols-12 lg:items-start lg:gap-16"
                  : "lg:gap-12"
              }`}
            >
              <Reveal className={related.length === 1 ? "lg:col-span-5" : ""}>
                <SectionLabel>Fler projekt</SectionLabel>
                <h2 className="mt-5 text-h2">Relaterade webbprojekt</h2>
                <Link href="/case" className={`group mt-8 ${btn.ghost}`}>
                  Alla kundcase
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                  />
                </Link>
              </Reveal>
              <ul
                className={
                  related.length === 1
                    ? "lg:col-span-7"
                    : "grid gap-12 sm:grid-cols-2 lg:gap-16"
                }
              >
                {related.map((c) => (
                  <li key={c.slug}>
                    <Reveal>
                      <CaseCard study={c} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}

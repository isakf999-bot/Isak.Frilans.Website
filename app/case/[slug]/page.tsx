import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/Case/CaseCard";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { getCaseBySlug, publishedCases } from "@/lib/cases";

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
    openGraph: {
      title: `Kundcase: ${study.domain}`,
      description: study.teaser,
      images: [{ url: study.heroImage }],
    },
  };
}

/**
 * Detaljsida för ett enskilt kundcase — Generation-struktur:
 * domänrubrik, tjänstetaggar, hero, Uppdraget / Resultatet, CTA.
 */
export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseBySlug(slug);
  if (!study) notFound();

  const related = publishedCases
    .filter((c) => c.slug !== study.slug)
    .slice(0, 2);

  return (
    <>
      <Nav />
      <main>
        {/* Hero-header */}
        <section className="relative overflow-hidden border-b border-line">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[520px] rounded-full bg-brand-glow opacity-20 blur-[120px]"
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6 pt-14 pb-10 lg:px-8 lg:pt-16 lg:pb-12">
            <Reveal>
              <Link
                href="/case"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-brand"
              >
                <span aria-hidden="true">←</span>
                Alla kundcase
              </Link>

              <p className="mt-8 text-sm font-medium tracking-wide text-brand uppercase">
                {study.client} · {study.industry}
              </p>
              <h1 className="mt-3 text-h1 tracking-tight">{study.domain}</h1>
              <p className="mt-5 max-w-2xl text-lead text-muted">{study.intro}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {study.services.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-pill border border-line bg-surface px-3.5 py-1.5 text-sm text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine group inline-flex items-center gap-2.5 rounded-pill bg-brand px-6 py-3.5 font-medium text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
                >
                  Besök sajten
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-6 py-3.5 font-medium text-ink transition-all duration-200 ease-out hover:border-brand/30 hover:bg-brand-tint hover:text-brand"
                >
                  Starta liknande projekt
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Full-bleed hero image */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-mist shadow-lift">
                <Image
                  src={study.heroImage}
                  alt={study.heroAlt}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1120px"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Uppdraget + meta */}
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16 lg:px-8 lg:py-24">
            <Reveal>
              <SectionLabel>Uppdraget</SectionLabel>
              <h2 className="mt-5 text-h2">Vad som behövdes</h2>
              <p className="mt-5 text-lead text-muted">{study.challenge}</p>

              <ul className="mt-10 space-y-8">
                {study.work.map((item) => (
                  <li key={item.title} className="border-l-2 border-brand/40 pl-5">
                    <h3 className="text-h3 text-[1.25rem]">{item.title}</h3>
                    <p className="mt-2 text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <aside className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-7">
                <h3 className="text-sm font-semibold tracking-wide text-ink uppercase">
                  Projektinfo
                </h3>
                <dl className="mt-5 space-y-4">
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                    <dt className="text-sm text-muted">Lanserad</dt>
                    <dd className="font-medium text-ink">{study.launched}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                    <dt className="text-sm text-muted">Plattform</dt>
                    <dd className="text-right font-medium text-ink">
                      {study.platform}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                    <dt className="text-sm text-muted">Kund</dt>
                    <dd className="text-right font-medium text-ink">
                      {study.client}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-muted">Bransch</dt>
                    <dd className="text-right font-medium text-ink">
                      {study.industry}
                    </dd>
                  </div>
                </dl>

                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-pill border border-line bg-canvas px-4 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:border-brand/30 hover:bg-brand-tint hover:text-brand"
                >
                  Öppna {study.domain}
                  <span aria-hidden="true">↗</span>
                </a>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* Resultatet */}
        <section className="border-t border-line bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
            <Reveal className="max-w-3xl">
              <SectionLabel>Resultatet</SectionLabel>
              <h2 className="mt-5 text-h2">Vad det blev</h2>
              <p className="mt-5 text-lead text-muted">{study.outcome}</p>
            </Reveal>

            <Reveal className="mt-12" delay={60}>
              <ul className="grid gap-4 sm:grid-cols-3">
                {study.results.map((r) => (
                  <li
                    key={r.label}
                    className="rounded-2xl border border-line-cool bg-surface px-6 py-7 shadow-card"
                  >
                    <p className="text-3xl font-semibold tracking-tight text-brand">
                      {r.value}
                    </p>
                    <p className="mt-2 text-sm text-muted">{r.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            {study.quote && (
              <Reveal className="mt-12" delay={100}>
                <blockquote className="max-w-3xl rounded-2xl border border-line-cool bg-surface px-7 py-8 shadow-card">
                  <p className="text-lead text-ink">
                    &ldquo;{study.quote.text}&rdquo;
                  </p>
                  <footer className="mt-5 text-sm text-muted">
                    <span className="font-semibold text-ink">
                      {study.quote.author}
                    </span>
                    {study.quote.role ? ` — ${study.quote.role}` : null}
                  </footer>
                </blockquote>
              </Reveal>
            )}
          </div>
        </section>

        {/* Relaterade / fler case */}
        {related.length > 0 && (
          <section className="border-t border-line">
            <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
              <Reveal>
                <SectionLabel>Fler projekt</SectionLabel>
                <h2 className="mt-5 text-h3">Relaterade webbprojekt</h2>
              </Reveal>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-10">
                {related.map((c) => (
                  <Reveal key={c.slug}>
                    <CaseCard study={c} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

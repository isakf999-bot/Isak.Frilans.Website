import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { ServiceVisual } from "@/components/Services/ServiceVisual";
import { getServiceGroup } from "@/components/Services/serviceGroups";
import { serviceIcons } from "@/components/Services/serviceIcons";
import { btn } from "@/components/ui/buttonStyles";
import { getServiceBySlug, services } from "@/lib/services";
import { seoLandingsForRelatedHref } from "@/lib/seoLandings";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Tjänst hittades inte — IsakWeb" };
  return {
    title: `${service.title} — IsakWeb`,
    description: service.description,
    alternates: { canonical: absoluteUrl(`/tjanster/${slug}`) },
  };
}

/** Titeln mitt i en mening: "landningssidor", men "SEO" och "API-…" behåller versalerna. */
function inSentence(title: string) {
  return /^[A-ZÅÄÖ]{2}/.test(title)
    ? title
    : title.charAt(0).toLowerCase() + title.slice(1);
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const name = inSentence(service.title);
  const prefill = `Jag är intresserad av ${name}`;
  const group = getServiceGroup(service.slug);
  // Andra tjänster: först de i samma grupp, sedan resten.
  const others = services.filter((s) => s.slug !== service.slug);
  const related = [
    ...others.filter((s) => group?.services.includes(s)),
    ...others.filter((s) => !group?.services.includes(s)),
  ].slice(0, 3);
  const relatedLandings = seoLandingsForRelatedHref(
    `/tjanster/${service.slug}`,
  ).slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 lg:px-8 lg:pt-16 lg:pb-28">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-brand"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Till startsidan
            </Link>

            <div className="mt-10 grid items-center gap-x-12 gap-y-12 lg:mt-12 lg:grid-cols-12">
              <Reveal className="min-w-0 lg:col-span-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                    {serviceIcons[service.slug]}
                  </span>
                  <SectionLabel>{group ? group.heading : "Tjänst"}</SectionLabel>
                </div>

                <h1 className="mt-6 text-h1 break-words hyphens-auto text-ink">
                  {service.title}
                </h1>
                <p className="mt-6 max-w-xl text-lead text-muted">
                  {service.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link
                    href={`/kontakt?meddelande=${encodeURIComponent(prefill)}`}
                    className={`group max-w-full text-center !leading-[1.15] ${btn.primary}`}
                  >
                    Hör av dig om {name}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                    />
                  </Link>
                  <Link href="/process" className={btn.ghost}>
                    Så går det till
                  </Link>
                </div>

                {relatedLandings.length > 0 ? (
                  <p className="mt-10 flex max-w-xl flex-wrap gap-x-5 gap-y-2 border-t border-line-cool pt-5 text-sm text-muted">
                    <span>Läs mer:</span>
                    {relatedLandings.map((landing) => (
                      <Link key={landing.slug} href={`/${landing.slug}`} className="link">
                        {landing.navLabel}
                      </Link>
                    ))}
                  </p>
                ) : null}
              </Reveal>

              <Reveal className="min-w-0 lg:col-span-5" delay={80}>
                <ServiceVisual slug={service.slug} />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
            <Reveal className="lg:col-span-4">
              <SectionLabel>Bakgrund</SectionLabel>
              <h2 className="mt-6 text-h2 text-ink">Vad det handlar om</h2>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={60}>
              <p className="text-h3 font-medium tracking-tight text-ink">
                {service.intro}
              </p>
              <div className="mt-10 grid gap-x-8 gap-y-2 border-t border-ink pt-5 sm:grid-cols-[10rem_1fr]">
                <h3 className="text-base font-semibold tracking-normal text-ink">
                  Passar för
                </h3>
                <p className="text-muted">{service.who}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-night text-white">
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
            <Reveal className="lg:col-span-5">
              <SectionLabel tone="dark">Fördelar</SectionLabel>
              <h2 className="mt-6 text-h2 text-white">Det här får ni ut av det</h2>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={60}>
              <ul className="border-b border-white/15">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-4 border-t border-white/15 py-5 text-xl leading-snug font-medium tracking-tight text-white"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 shrink-0 text-brand-glow"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="bg-canvas">
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-12 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Leverans</SectionLabel>
              <h2 className="mt-6 text-h2 text-ink">Ingår</h2>
              <ul className="mt-10 border-b border-ink">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="border-t border-ink py-5 text-h3 font-semibold tracking-tight break-words hyphens-auto text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-5 lg:self-end" delay={60}>
              <div className="rounded-xl bg-brand p-8 text-white">
                <h2 className="flex items-center gap-3 text-base font-semibold tracking-normal">
                  <Clock aria-hidden="true" className="h-5 w-5 text-white/80" />
                  Tidslinje
                </h2>
                <p className="mt-6 font-mono text-lg leading-snug">
                  {service.timeline}
                </p>
                <Link
                  href="/process"
                  className="link-on-dark mt-8 inline-block focus-visible:outline-white"
                >
                  Se hela processen
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="text-h2 text-ink">Andra tjänster</h2>
              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((s) => (
                  <li key={s.slug}>
                    <ServiceCard service={s} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

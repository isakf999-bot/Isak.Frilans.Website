import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { serviceIcons } from "@/components/Services/serviceIcons";
import {
  formatServicePrice,
  getServiceBySlug,
  services,
} from "@/lib/services";

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
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const prefill = `Jag är intresserad av ${service.title.toLowerCase()}`;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-line bg-canvas">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-glow/30 blur-3xl"
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16 lg:px-8 lg:pt-32 lg:pb-20">
            <Reveal>
              <Link
                href="/tjanster"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand"
              >
                <span aria-hidden="true">←</span>
                Alla tjänster
              </Link>

              <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-glow/60 bg-brand-tint text-brand">
                {serviceIcons[service.slug]}
              </div>

              <div className="mt-8">
                <SectionLabel>Tjänst</SectionLabel>
              </div>
              <h1 className="mt-4 text-h1 tracking-tight">{service.title}</h1>
              <p className="mt-5 max-w-2xl text-lead text-muted">{service.intro}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <p className="text-lg font-semibold text-ink">
                  {formatServicePrice(service)}
                </p>
                {service.price?.note ? (
                  <p className="text-sm text-muted">{service.price.note}</p>
                ) : null}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/kontakt?meddelande=${encodeURIComponent(prefill)}`}
                  className="inline-flex items-center gap-2 rounded-pill bg-brand px-7 py-3.5 font-medium text-white shadow-brand transition-all duration-200 hover:bg-brand-dark"
                >
                  Hör av dig om {service.title.toLowerCase()}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/paket"
                  className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-7 py-3.5 font-medium text-ink transition-all duration-200 hover:border-brand hover:text-brand"
                >
                  Se paket
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-3 lg:px-8 lg:py-20">
            <Reveal>
              <h2 className="text-h3 tracking-tight">Fördelar</h2>
              <ul className="mt-5 space-y-3 text-muted">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-h3 tracking-tight">För vem</h2>
              <p className="mt-5 text-muted">{service.who}</p>
              <h2 className="mt-8 text-h3 tracking-tight">Tidslinje</h2>
              <p className="mt-5 text-muted">{service.timeline}</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="text-h3 tracking-tight">Ingår</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="rounded-pill border border-line bg-canvas px-3.5 py-1.5 text-sm text-muted"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="bg-canvas">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <Reveal>
              <h2 className="text-h2 tracking-tight">Andra tjänster</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/tjanster/${s.slug}`}
                      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tint text-brand">
                        {serviceIcons[s.slug]}
                      </span>
                      <span className="mt-4 font-semibold text-ink">{s.title}</span>
                      <span className="mt-2 text-sm text-muted line-clamp-2">
                        {s.description}
                      </span>
                    </Link>
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

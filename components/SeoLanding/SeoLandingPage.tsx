import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { SeoLandingFaq } from "@/components/SeoLanding/SeoLandingFaq";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { btn } from "@/components/ui/buttonStyles";
import { otherSeoLandings, type SeoLanding } from "@/lib/seoLandings";
import { getServiceBySlug } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export function SeoLandingPage({ landing }: { landing: SeoLanding }) {
  const related = otherSeoLandings(landing.slug);
  const contactHref = `/kontakt?meddelande=${encodeURIComponent(landing.contactPrefill)}`;
  const pageUrl = `${SITE_URL}/${landing.slug}`;
  // Pekar sidan på en tjänst visas tjänsten som kort, annars som textlänk.
  const relatedService = landing.relatedServiceHref.startsWith("/tjanster/")
    ? getServiceBySlug(landing.relatedServiceHref.replace("/tjanster/", ""))
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hem", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: landing.navLabel, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: landing.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        {/* Copper Shadow: behållaren får ingen egen bakgrund och ligger inte i <Reveal>. */}
        <section className="bg-night text-white">
          <div className="aura-stage">
            <div className="aura-stage__layer-1" aria-hidden="true" />
            <div className="aura-stage__layer-2" aria-hidden="true" />
            <div className="aura-stage__layer-3" aria-hidden="true" />
            <div className="aura-stage__layer-4" aria-hidden="true" />
            <div className="aura-stage__content mx-auto max-w-6xl px-6 pt-20 pb-20 lg:px-8 lg:pt-28 lg:pb-28">
              <div className="max-w-4xl">
                <SectionLabel tone="dark">{landing.eyebrow}</SectionLabel>
                <h1 className="mt-6 text-h1 break-words hyphens-auto text-white">
                  {landing.h1}
                </h1>
                <p className="mt-6 max-w-2xl text-lead text-white/80">{landing.lead}</p>
                <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
                  <Link href={contactHref} className={`group ${btn.onBrand}`}>
                    Berätta om projektet
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                    />
                  </Link>
                  <Link href="/process" className={btn.ghostOnDark}>
                    Så går det till
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-x-12 gap-y-12 lg:grid-cols-2">
              {landing.sections.map((section, i) => (
                <Reveal
                  key={section.heading}
                  delay={i * 50}
                  className="border-t border-ink pt-6"
                >
                  <h2 className="text-h3 text-ink">{section.heading}</h2>
                  <p className="mt-4 max-w-xl text-muted">{section.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 pb-20 lg:px-8 lg:pb-28">
            <Reveal className="rounded-xl bg-night px-6 py-10 text-white sm:px-10 lg:px-12 lg:py-14">
              <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
                <h2 className="text-h2 text-white lg:col-span-4">Så tar jag det</h2>
                <ul className="border-b border-white/15 lg:col-span-8">
                  {landing.points.map((point) => (
                    <li
                      key={point.title}
                      className="grid gap-x-8 gap-y-2 border-t border-white/15 py-6 sm:grid-cols-[13rem_1fr]"
                    >
                      <h3 className="text-lg leading-snug font-semibold tracking-tight break-words hyphens-auto text-white">
                        {point.title}
                      </h3>
                      <p className="text-white/75">{point.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line bg-canvas">
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
            <Reveal className="lg:col-span-4">
              <h2 className="text-h2 text-ink">Vanliga frågor</h2>
              <p className="mt-5 text-muted">
                Kort och rakt. Annars{" "}
                <Link href="/kontakt" className="link">
                  hör av dig
                </Link>
                .
              </p>
            </Reveal>
            <div className="lg:col-span-8">
              <SeoLandingFaq items={landing.faqs} />
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <Reveal>
              <h2 className="text-h2 text-ink">Mer i samma riktning</h2>
            </Reveal>
            <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <Reveal className="self-start lg:col-span-4">
                {relatedService ? (
                  <>
                    <ServiceCard service={relatedService} />
                    <p className="mt-6">
                      <Link href="/process" className="link">
                        Process
                      </Link>
                    </p>
                  </>
                ) : (
                  <p className="flex flex-wrap gap-x-6 gap-y-2">
                    <Link
                      href={
                        landing.relatedServiceHref === "/paket"
                          ? "/kontakt"
                          : landing.relatedServiceHref
                      }
                      className="link"
                    >
                      {landing.relatedServiceHref === "/paket"
                        ? "Hör av dig"
                        : landing.relatedServiceLabel}
                    </Link>
                    <Link href="/process" className="link">
                      Process
                    </Link>
                  </p>
                )}
              </Reveal>

              <ul className="border-t border-ink sm:columns-2 sm:gap-x-12 lg:col-span-8">
                {related.map((item) => (
                  <li
                    key={item.slug}
                    className="break-inside-avoid border-b border-line-cool"
                  >
                    <Link
                      href={`/${item.slug}`}
                      className="group flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="min-w-0 font-medium break-words text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-150 group-hover:text-brand group-hover:decoration-brand">
                        {item.navLabel}
                      </span>
                      <span className="shrink-0 text-sm text-muted">{item.eyebrow}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

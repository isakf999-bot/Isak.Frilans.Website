import Link from "next/link";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { SeoLandingFaq } from "@/components/SeoLanding/SeoLandingFaq";
import { btn } from "@/components/ui/buttonStyles";
import { otherSeoLandings, type SeoLanding } from "@/lib/seoLandings";
import { SITE_URL } from "@/lib/site";

export function SeoLandingPage({ landing }: { landing: SeoLanding }) {
  const related = otherSeoLandings(landing.slug);
  const contactHref = `/kontakt?meddelande=${encodeURIComponent(landing.contactPrefill)}`;
  const pageUrl = `${SITE_URL}/${landing.slug}`;

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
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 lg:px-8 lg:pt-32 lg:pb-20">
            <Reveal className="max-w-3xl">
              <SectionLabel>{landing.eyebrow}</SectionLabel>
              <h1 className="mt-4 text-h1 tracking-tight">{landing.h1}</h1>
              <p className="mt-5 text-lead text-muted">{landing.lead}</p>
              <p className="mt-4 text-sm font-medium text-brand">{landing.priceNote}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={contactHref} className={btn.primary}>
                  Berätta om projektet
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/paket" className={btn.ghostOnDark}>
                  Se paket och priser
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2">
              {landing.sections.map((section, i) => (
                <Reveal key={section.heading} delay={i * 50}>
                  <h2 className="text-h3 tracking-tight">{section.heading}</h2>
                  <p className="mt-4 leading-relaxed text-muted">{section.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <Reveal>
              <h2 className="text-h2 tracking-tight">Så tar jag det</h2>
            </Reveal>
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {landing.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 40}>
                  <li className="h-full rounded-lg border border-line glass p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{point.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
            <Reveal>
              <h2 className="text-h2 tracking-tight">Vanliga frågor</h2>
              <p className="mt-4 text-muted">
                Kort och rakt. Annars{" "}
                <Link href="/kontakt" className="font-medium text-brand hover:opacity-70">
                  hör av dig
                </Link>
                .
              </p>
            </Reveal>
            <SeoLandingFaq items={landing.faqs} />
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <Reveal>
              <h2 className="text-h2 tracking-tight">Mer i samma riktning</h2>
              <p className="mt-3 max-w-2xl text-muted">
                <Link
                  href={landing.relatedServiceHref}
                  className="font-medium text-brand hover:opacity-70"
                >
                  {landing.relatedServiceLabel}
                </Link>
                {" · "}
                <Link href="/process" className="font-medium text-brand hover:opacity-70">
                  Process
                </Link>
                {" · "}
                <Link href="/paket" className="font-medium text-brand hover:opacity-70">
                  Paket
                </Link>
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className="flex h-full flex-col rounded-lg border border-line glass p-5 transition-[border-color] duration-150 hover:border-ink/20"
                    >
                      <span className="text-xs font-medium tracking-wide text-muted uppercase">
                        {item.eyebrow}
                      </span>
                      <span className="mt-2 font-semibold text-ink">{item.navLabel}</span>
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

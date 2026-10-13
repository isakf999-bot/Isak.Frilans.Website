import type { Metadata } from "next";
import Link from "next/link";
import { CaseGrid } from "@/components/Case/CaseGrid";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";
import { industries, publishedCases } from "@/lib/cases";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kundcase — Isak Web",
  description:
    "Företag jag har byggt webbplatser åt. Se uppdrag, resultat och hur sajterna blev.",
  alternates: { canonical: absoluteUrl("/case") },
};

/**
 * Kundcase-listan: rubrik, sök + branschfilter och stora case-rader där
 * sajten själv (i laptopen) är det som säljer.
 */
export default function CasePage() {
  return (
    <>
      <Nav />
      <main>
        <section>
          <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:px-8 lg:pt-24 lg:pb-16">
            <Reveal>
              <SectionLabel>Kundcase</SectionLabel>
              <h1 className="mt-6 max-w-4xl text-h1">
                Företag jag har byggt webbplatser åt
              </h1>
              <p className="mt-6 max-w-2xl text-lead text-muted">
                Här samlar jag projekten jag har levererat — från uppdrag till
                färdig sajt. Klicka in på ett case för att se mer.
              </p>
            </Reveal>
          </div>
        </section>

        <section aria-label="Alla kundcase">
          <div className="mx-auto max-w-6xl px-6 pb-20 lg:px-8 lg:pb-28">
            {publishedCases.length > 0 ? (
              <CaseGrid cases={publishedCases} industries={industries} />
            ) : (
              <div className="border-t border-ink pt-10 lg:pt-12">
                <h2 className="text-h2">Casen är på väg.</h2>
                <p className="mt-5 max-w-md text-lead text-muted">
                  Här visar jag snart projekten jag har levererat. Hör av dig
                  om du vill bli ett av dem.
                </p>
                <Link href="/kontakt" className={`mt-8 ${btn.primary}`}>
                  Hör av dig
                </Link>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

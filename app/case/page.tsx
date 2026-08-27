import type { Metadata } from "next";
import { CaseGrid } from "@/components/Case/CaseGrid";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { industries, publishedCases } from "@/lib/cases";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kundcase — Isak Web",
  description:
    "Företag jag har byggt webbplatser åt. Se uppdrag, resultat och hur sajterna blev.",
  alternates: { canonical: absoluteUrl("/case") },
};

/**
 * Kundcase-listan — inspirerad av thegeneration.se/kundcase:
 * stor rubrik, sök, branschfilter, stora hero-kort med "Utforska caset".
 */
export default function CasePage() {
  return (
    <>
      <Nav />
      <main>
        <section>
          <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:px-8 lg:pt-20 lg:pb-14">
            <Reveal>
              <SectionLabel>Kundcase</SectionLabel>
              <h1 className="mt-6 max-w-3xl text-h1">
                Företag jag har byggt webbplatser åt
              </h1>
              <p className="mt-5 max-w-2xl text-lead text-muted">
                Här samlar jag projekten jag har levererat — från uppdrag till
                färdig sajt. Klicka in på ett case för att se mer.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
            <Reveal>
              {publishedCases.length > 0 ? (
                <CaseGrid cases={publishedCases} industries={industries} />
              ) : (
                <div className="mx-auto max-w-lg rounded-lg border border-line glass px-8 py-14 text-center">
                  <h2 className="text-h3">Casen är på väg.</h2>
                  <p className="mx-auto mt-3 max-w-sm text-muted">
                    Här visar jag snart projekten jag har levererat. Hör av dig
                    om du vill bli ett av dem.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

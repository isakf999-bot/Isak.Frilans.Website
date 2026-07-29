import type { Metadata } from "next";
import { CaseGrid } from "@/components/Case/CaseGrid";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { industries, publishedCases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Kundcase — Isak Web",
  description:
    "Alla företag jag har byggt webbplats åt. Se uppdrag, resultat och hur sajterna blev.",
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
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-glow opacity-25 blur-[130px]"
          />
          <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-12 lg:px-8 lg:pt-20 lg:pb-14">
            <Reveal>
              <SectionLabel>Kundcase</SectionLabel>
              <h1 className="mt-6 max-w-3xl text-h1">
                Företag jag har byggt webbplats åt
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
                <div className="mx-auto max-w-lg rounded-2xl border border-line bg-gradient-to-b from-white to-[#f5f6fc] px-8 py-14 text-center shadow-card">
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

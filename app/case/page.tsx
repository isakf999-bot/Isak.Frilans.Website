import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

export const metadata: Metadata = {
  title: "Tidigare kunder — Isak Web",
  description:
    "Kundcase på väg. Snart visar jag riktiga projekt: hur en föråldrad sajt blev en modern, snabb och mobilanpassad upplevelse.",
};

/**
 * "Tidigare kunder" — behålls som skal medan case-vyn byggs om från grunden.
 * Den gamla laptop-showcasen och Mats Svensson-casen är borttagna; här står
 * ett rent, avsiktligt tomläge tills de nya casen är klara.
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
          <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-14 text-center lg:px-8 lg:pt-20">
            <Reveal>
              <div className="flex justify-center">
                <SectionLabel>Tidigare kunder</SectionLabel>
              </div>
              <h1 className="mx-auto mt-6 max-w-2xl text-h1">
                Riktiga projekt, riktiga resultat.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lead text-muted">
                Ett urval av verksamheter som fått en sajt som faktiskt speglar
                det de gör.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-28">
            <Reveal className="mx-auto max-w-lg">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-white to-[#f5f6fc] px-8 py-14 text-center shadow-card">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-8 -left-8 -z-10 h-32 w-32 rounded-full bg-brand-glow opacity-40 blur-2xl"
                />
                <span
                  aria-hidden="true"
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-glow/60 bg-brand-tint text-brand shadow-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8M12 16v4" />
                  </svg>
                </span>
                <h2 className="mt-6 text-h3">De första casen är på väg.</h2>
                <p className="mx-auto mt-3 max-w-sm text-muted">
                  Jag bygger just nu om hur mina kundprojekt visas upp här — med
                  före/efter och riktiga resultat. Vill du bli ett av de första
                  casen?
                </p>
                <Link
                  href="/kontakt"
                  className="shine group mt-8 inline-flex items-center gap-2.5 rounded-pill bg-brand px-6 py-3.5 font-medium whitespace-nowrap text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
                >
                  Starta ett projekt
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

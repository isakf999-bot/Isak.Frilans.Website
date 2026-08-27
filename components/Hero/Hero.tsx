import Image from "next/image";
import Link from "next/link";
import { publishedCases } from "@/lib/cases";
import { btn } from "@/components/ui/buttonStyles";

const PROOF = [
  { value: "3–10 dagar", label: "Typisk leverans" },
  { value: "Fast pris", label: "Klart innan start" },
  { value: "Du äger allt", label: "Kod, sajt, kontroll" },
];

/**
 * Hero med kundcase i botten av första vyn — synligt utan scroll.
 */
export function Hero() {
  const cases = publishedCases;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-transparent text-white"
    >
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-stage__fade" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-6 pt-28 pb-10 lg:px-8 lg:pt-32 lg:pb-12">
          <div className="max-w-3xl">
            <p className="rise text-eyebrow font-medium tracking-[0.16em] text-muted uppercase">
              Isak Web · Helsingborg
            </p>

            <h1 className="rise rise-2 mt-5 text-h1 text-white lg:mt-6 lg:text-display">
              En hemsida som jobbar för ditt företag.
            </h1>

            <p className="rise rise-3 mt-5 max-w-xl text-lead text-muted lg:mt-6">
              Du får en sajt som presenterar er rätt, är snabb att använda och
              byggd för att ta in kunder — med fast pris, tydlig leverans och dig
              som ägare från dag ett. Jag bygger. Du pratar alltid med mig.
            </p>

            <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
              <Link href="/kontakt" className={btn.primary}>
                Boka ett samtal
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/#vad-du-far" className={btn.ghostOnDark}>
                Vad du får
              </Link>
            </div>

            <div className="rise rise-4 mt-10 flex max-w-xl flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-7 lg:mt-12">
              {PROOF.map((p) => (
                <div key={p.label}>
                  <p className="text-base font-semibold tracking-tight text-white">
                    {p.value}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kundcase — fast i botten av första viewporten */}
        <div
          className="rise rise-4 border-t border-white/10"
          aria-label="Kundcase"
        >
          <div className="mx-auto max-w-6xl px-6 py-5 lg:px-8 lg:py-6">
            <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
              Kundcase
            </p>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <ul className="flex min-w-0 flex-wrap items-center gap-3">
                {cases.map((study) => (
                  <li key={study.slug}>
                    <Link
                      href={`/case/${study.slug}`}
                      className="group flex items-center gap-3 rounded-md border border-line glass px-3 py-2 transition-[border-color] duration-150 hover:border-white/25"
                    >
                      <span className="relative h-9 w-12 shrink-0 overflow-hidden rounded border border-line bg-mist">
                        <Image
                          src={study.heroImage}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover object-top opacity-80 transition-opacity group-hover:opacity-100"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium tracking-tight text-white">
                          {study.domain}
                        </span>
                        <span className="block truncate text-xs text-muted">
                          {study.client}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/case"
                className="shrink-0 text-sm text-muted transition-colors hover:text-white"
              >
                Se alla →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

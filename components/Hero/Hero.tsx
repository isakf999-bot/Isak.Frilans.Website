import Link from "next/link";
import { btn } from "@/components/ui/buttonStyles";
import { HeroVideo } from "./HeroVideo";

const PROOF = [
  { value: "3–10 dagar", label: "Typisk leverans" },
  { value: "Direkt", label: "Du pratar med mig" },
  { value: "Fast pris", label: "Innan vi börjar" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden text-white"
    >
      <HeroVideo />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20 lg:px-8 lg:pt-36 lg:pb-28">
        <div className="max-w-2xl">
          <p className="rise inline-flex items-center gap-2 border border-white/20 bg-black/25 px-3 py-1.5 text-eyebrow font-medium tracking-[0.14em] text-white/90 uppercase">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            IsakWeb · Helsingborg
          </p>

          <h1 className="rise rise-2 mt-6 max-w-[18ch] text-h1 text-white lg:text-display">
            Hemsidor åt svenska företag.
          </h1>

          <p className="rise rise-3 mt-6 max-w-lg text-lead text-white/80">
            Landningssidor, företagssajter och e-handel — byggda snabbt, med
            tydligt pris och dig i kontakt med den som skriver koden.
          </p>

          <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
            <Link href="/kontakt" className={btn.primary}>
              Boka ett samtal
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/paket" className={btn.ghostOnDark}>
              Se paket
            </Link>
          </div>

          <div className="rise rise-4 mt-12 flex max-w-xl flex-wrap gap-x-8 gap-y-5 border-t border-white/20 pt-8">
            {PROOF.map((p) => (
              <div key={p.label}>
                <p className="text-lg font-semibold tracking-tight text-white">
                  {p.value}
                </p>
                <p className="mt-0.5 text-sm text-white/70">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

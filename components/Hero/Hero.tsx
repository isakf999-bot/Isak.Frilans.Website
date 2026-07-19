import { HeroCarousel } from "./HeroCarousel";

const PROOF = [
  { value: "1–3 v", label: "Från start till live" },
  { value: "100%", label: "Du pratar med mig" },
  { value: "Fast pris", label: "Innan vi börjar" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Aurora — det lugna, drivande centrumelementet bakom hero:n. Tre mjuka
          färgfält som rör sig sakta. Ren atmosfär, aldrig i vägen för innehåll. */}
      <div className="aurora" aria-hidden="true">
        <span className="aurora__blob aurora__blob--1" />
        <span className="aurora__blob aurora__blob--2" />
        <span className="aurora__blob aurora__blob--3" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-pill border border-brand-glow bg-brand-tint px-3.5 py-1.5 text-eyebrow font-medium text-brand uppercase">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-brand"
              />
              Frilansande webbutvecklare
            </p>

            <h1 className="rise rise-2 mt-6 text-h1 lg:text-display">
              Hemsidor som gör{" "}
              <em className="shimmer not-italic">mer</em> än att se bra ut.
            </h1>

            <p className="rise rise-3 mt-6 max-w-lg text-lead text-muted">
              Jag heter Isak och bygger landningssidor, e-handel och
              företagssajter åt små företag. Du pratar med den som faktiskt
              bygger sajten inte en säljare, inte en projektledare.
            </p>

            <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#kontakt"
                className="shine group inline-flex items-center gap-2.5 rounded-pill bg-brand px-7 py-4 font-medium text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
              >
                Boka ett samtal
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="#vad-jag-bygger"
                className="group inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface px-7 py-4 font-medium text-ink shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint hover:text-brand hover:shadow-lift active:translate-y-0"
              >
                Se vad jag bygger
                <span
                  aria-hidden="true"
                  className="text-muted transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-brand"
                >
                  →
                </span>
              </a>
            </div>

            <dl className="rise rise-4 mt-12 grid max-w-md grid-cols-3 border-t border-line pt-8">
              {PROOF.map((item, i) => (
                <div
                  key={item.label}
                  className={i > 0 ? "border-l border-line pl-5" : "pr-5"}
                >
                  <dt className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
                    {item.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rise rise-3 relative">
            {/* Bildspel av riktiga, live-satta projekt — byter var 3:e sekund
                och går att klicka sig igenom. Ersätter porträttet: det säger
                mer om vad jag bygger, och går att verifiera på riktigt. */}
            <HeroCarousel />

            {/* Litet flytande kort — ger djup och säger något konkret. */}
            <div className="absolute -top-5 -left-5 z-30 hidden items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-lift sm:flex">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-emerald-500"
              />
              <span className="text-sm font-medium">
                Tar emot projekt just nu
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

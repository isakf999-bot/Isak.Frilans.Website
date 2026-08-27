import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

const POINTS = [
  {
    title: "Ingen byrå-overhead",
    body: "Du betalar för arbetet i sajten — inte för account managers, lagermöten och påslag. Byrånivå i resultatet, frilans i priset.",
  },
  {
    title: "Skräddarsytt, inte mall",
    body: "Inga generiska teman med er logga inklistrad. Sajten ska kännas som ert bolag och vara byggd för hur ni faktiskt säljer.",
  },
  {
    title: "Teknik som håller",
    body: "Modern stack när det lönar sig (t.ex. Next.js). Snabba sidor, ren kod och en grund ni kan bygga vidare på — utan omskrivning om ett år.",
  },
  {
    title: "Synlig och snabb",
    body: "Prestanda, mobilvy och sökbar struktur ingår. En långsam eller osynlig sajt kostar er kunder — det löser vi från början.",
  },
  {
    title: "Beslut utan mellanhänder",
    body: "Fråga → svar → ändring. Du slipper telefonkedjor. Det sparar tid och gör att sajten blir rätt snabbare.",
  },
  {
    title: "Efter live: ni står inte ensamma",
    body: "Ni får en sajt ni förstår och äger, plus stöd i starten så publicering, domän och småjusteringar inte blir ett nytt projekt.",
  },
];

export function HomeTrust() {
  return (
    <section id="varfor" className="border-t border-line bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <SectionLabel>Varför Isak Web</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-h2">
            Därför väljer företag mig framför en byrå — eller en billig mall.
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            Byråer tar ofta för mycket för samma slutresultat. Mallar tar för
            lite ansvar. Mitt jobb är mitten: skarpt resultat, rimligt pris,
            och en sajt ni faktiskt får värde av.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 50}>
              <li className="h-full rounded-lg border border-line glass p-6 transition-[border-color] duration-150 hover:border-ink/20">
                <div
                  aria-hidden="true"
                  className="mb-4 h-1 w-10 rounded-pill bg-brand"
                />
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

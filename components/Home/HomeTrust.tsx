import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

const POINTS = [
  {
    title: "Personlig kontakt",
    body: "Ingen account manager. Du pratar med mig — samma person som designar och kodar.",
  },
  {
    title: "Modern stack",
    body: "React, TypeScript och Next.js när det lönar sig. Snabba sajter som går att bygga vidare på.",
  },
  {
    title: "Prestanda & SEO",
    body: "Lighthouse, Core Web Vitals och sökbar struktur ingår i hur jag bygger — inte som ett tillägg i efterhand.",
  },
  {
    title: "Tillgänglighet",
    body: "Tydlig fokusarki, tangentbordsfokus och respekt för reduced motion. Sajter fler kan använda.",
  },
  {
    title: "Egen kod, ingen mall",
    body: "Inga generiska teman. Du får något som känns som ert bolag — och som ni äger helt.",
  },
  {
    title: "Framtidssäkrat",
    body: "Skalbar struktur, rena komponenter och dokumentation så nästa steg inte blir en omskrivning.",
  },
];

export function HomeTrust() {
  return (
    <section id="varfor" className="border-t border-line bg-mist/60">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <SectionLabel>Varför IsakWeb</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-h2">
            Byråkänsla. Frilansansvar.
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            Du får precisionen hos en modern produktstudio — utan lagret av
            projektledare, fakturapåslag och mallsidor.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 50}>
              <li className="h-full rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/35 hover:shadow-lift">
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

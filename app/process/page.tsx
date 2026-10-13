import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { ProcessPageNav } from "@/components/Process/ProcessPageNav";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { practicalTerms, principles, processSteps } from "@/lib/process";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process — Isak Web",
  description:
    "Så går ett projekt till, hur jag kommunicerar och vad som händer efter lansering.",
  alternates: { canonical: absoluteUrl("/process") },
};

/** Rubrikblocket som inleder varje sektion på sidan. */
function SectionIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="max-w-2xl">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-5 text-h2">{title}</h2>
      <p className="mt-5 text-lead text-muted">{children}</p>
    </Reveal>
  );
}

export default function ProcessPage() {
  const lastStep = processSteps.length - 1;

  return (
    <>
      <Nav />
      <main>
        {/* Copper Shadow: behållaren får ingen egen bakgrund, se globals.css. */}
        <section className="bg-night text-white">
          <div className="aura-stage aura-stage--drift">
            <div className="aura-stage__layer-1" aria-hidden="true" />
            <div className="aura-stage__layer-2" aria-hidden="true" />
            <div className="aura-stage__layer-3" aria-hidden="true" />
            <div className="aura-stage__layer-4" aria-hidden="true" />

            <div className="aura-stage__content mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
              <SectionLabel tone="dark">Process</SectionLabel>
              <h1 className="mt-6 max-w-3xl text-display text-white">
                Så går det till
              </h1>
              <p className="mt-8 max-w-2xl text-lead text-white/80">
                Inga överraskningar. Här ser du hur vi jobbar tillsammans, hur
                jag håller dig uppdaterad och vad som händer efter lansering —
                innan du hör av dig.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-16 lg:px-8">
          <div className="pt-10 lg:pt-28">
            <div className="lg:sticky lg:top-28">
              <ProcessPageNav />
            </div>
          </div>

          <div>
            <section id="processen" className="scroll-mt-28 py-16 lg:py-28">
              <SectionIntro
                label="Processen"
                title="Från första mejlet till lansering"
              >
                Sex tydliga steg. Du vet alltid var vi är och vad som händer
                härnäst.
              </SectionIntro>

              {/* Tidslinje: stegen är en verklig följd, därför numrerade och
                  sammanbundna. Sista steget (lansering) är ifyllt. */}
              <ol className="mt-14">
                {processSteps.map((step, i) => (
                  <li
                    key={step.number}
                    className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 sm:gap-x-8"
                  >
                    {i < lastStep && (
                      <span
                        aria-hidden="true"
                        className="absolute top-10 bottom-0 left-5 w-px -translate-x-1/2 bg-brand/25"
                      />
                    )}
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-md font-mono text-sm font-semibold ${
                        i === lastStep
                          ? "bg-brand text-white"
                          : "bg-surface text-brand shadow-card"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="pt-1.5 lg:grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-x-10">
                      <h3 className="text-[1.25rem] leading-snug break-words hyphens-auto">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[60ch] text-muted lg:mt-0">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section
              id="kommunikation"
              className="scroll-mt-28 border-t border-ink py-16 lg:py-28"
            >
              <SectionIntro label="Kommunikation" title="Hur jag jobbar med dig">
                Småföretag har sällan tid för tunga processer. Därför håller jag
                det enkelt, direkt och förutsägbart.
              </SectionIntro>

              <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                {principles.map((item) => (
                  <li key={item.title} className="border-t border-line-cool pt-6">
                    <h3 className="text-[1.25rem] leading-snug break-words hyphens-auto">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              id="praktiskt"
              className="scroll-mt-28 border-t border-ink py-16 lg:py-28"
            >
              <SectionIntro
                label="Praktiskt"
                title="Betalning, överlämning och efter lansering"
              >
                Det här brukar folk vilja veta innan de startar — så det står
                svart på vitt.
              </SectionIntro>

              <dl className="mt-14 border-b border-line-cool">
                {practicalTerms.map((item) => (
                  <div
                    key={item.title}
                    className="border-t border-line-cool py-8 md:grid md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-x-10"
                  >
                    <dt className="text-[1.25rem] leading-snug font-semibold tracking-[-0.025em] break-words hyphens-auto">
                      {item.title}
                    </dt>
                    <dd className="mt-3 max-w-[62ch] text-muted md:mt-0">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-10 max-w-2xl text-muted">
                Osäker på om jag är rätt för jobbet?{" "}
                <Link href="/kontakt" className="link">
                  Hör av dig
                </Link>{" "}
                — jag säger rakt vad jag hade gjort, även om svaret är att du
                inte behöver mig. Du kan också se{" "}
                <Link href="/case" className="link">
                  kundcase
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

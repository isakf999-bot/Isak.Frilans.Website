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

function SectionShell({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24 lg:pr-72 xl:pr-80">
        {children}
      </div>
    </section>
  );
}

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
          <div className="sticky top-28 ml-auto mr-5 w-[200px] pt-[7.5rem] xl:mr-10 xl:w-[220px]">
            <div className="pointer-events-auto">
              <ProcessPageNav />
            </div>
          </div>
        </div>

        <section>
          <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:px-8 lg:pt-20 lg:pb-14 lg:pr-72 xl:pr-80">
            <Reveal>
              <SectionLabel>Process</SectionLabel>
              <h1 className="mt-6 max-w-3xl text-h1">Så går det till</h1>
              <p className="mt-5 max-w-2xl text-lead text-muted">
                Inga överraskningar. Här ser du hur vi jobbar tillsammans, hur
                jag håller dig uppdaterad och vad som händer efter lansering —
                innan du hör av dig.
              </p>
            </Reveal>

            <Reveal className="mt-8 lg:hidden" delay={60}>
              <ProcessPageNav />
            </Reveal>
          </div>
        </section>

        <SectionShell id="processen" className="border-t border-line">
          <Reveal className="max-w-2xl">
            <SectionLabel>Processen</SectionLabel>
            <h2 className="mt-5 text-h2">Från första mejlet till lansering</h2>
            <p className="mt-4 text-lead text-muted">
              Sex tydliga steg. Du vet alltid var vi är och vad som händer
              härnäst.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 40} className="h-full">
                <li className="flex h-full flex-col rounded-2xl border border-line glass p-6 shadow-card sm:p-7">
                  <span className="font-mono text-sm font-semibold tracking-wide text-brand">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-h3 text-[1.25rem]">{step.title}</h3>
                  <p className="mt-3 flex-1 text-muted">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </SectionShell>

        <SectionShell id="kommunikation" className="border-t border-line">
          <Reveal className="max-w-2xl">
            <SectionLabel>Kommunikation</SectionLabel>
            <h2 className="mt-5 text-h2">Hur jag jobbar med dig</h2>
            <p className="mt-4 text-lead text-muted">
              Småföretag har sällan tid för tunga processer. Därför håller jag
              det enkelt, direkt och förutsägbart.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 40} className="h-full">
                <li className="flex h-full flex-col rounded-2xl border border-line-cool glass p-6 shadow-card sm:p-7">
                  <h3 className="text-h3 text-[1.25rem]">{item.title}</h3>
                  <p className="mt-3 flex-1 text-muted">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </SectionShell>

        <SectionShell id="praktiskt" className="border-t border-line">
          <Reveal className="max-w-2xl">
            <SectionLabel>Praktiskt</SectionLabel>
            <h2 className="mt-5 text-h2">
              Betalning, överlämning och efter lansering
            </h2>
            <p className="mt-4 text-lead text-muted">
              Det här brukar folk vilja veta innan de startar — så det står svart
              på vitt.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-5">
            {practicalTerms.map((item, i) => (
              <Reveal key={item.title} delay={i * 40}>
                <li className="rounded-2xl border border-line glass p-6 shadow-card sm:grid sm:grid-cols-[minmax(12rem,0.9fr)_1.4fr] sm:gap-8 sm:p-8">
                  <h3 className="text-h3 text-[1.25rem] sm:text-[1.375rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-muted sm:mt-0 sm:pt-1">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10" delay={60}>
            <p className="max-w-2xl text-sm text-muted">
              Osäker på om jag är rätt för jobbet?{" "}
              <Link
                href="/kontakt"
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                Hör av dig
              </Link>
              — jag säger rakt vad jag hade gjort, även om svaret är att du inte
              behöver mig. Du kan också se{" "}
              <Link
                href="/case"
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                kundcase
              </Link>
              .
            </p>
          </Reveal>
        </SectionShell>
      </main>
      <Footer />
    </>
  );
}

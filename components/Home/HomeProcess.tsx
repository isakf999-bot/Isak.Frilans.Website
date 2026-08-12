import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { processSteps } from "@/lib/process";

export function HomeProcess() {
  return (
    <section id="processen" className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-h2">Från samtal till live — utan dimma.</h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            Du vet alltid vad som händer härnäst. Inga överraskningsfakturor, ingen
            svart låda.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <li className="relative rounded-lg border border-line bg-surface p-6 transition-[border-color] duration-150 hover:border-ink/20">
                <span className="font-mono text-sm font-semibold text-brand">
                  {step.number}
                </span>
                <h3 className="mt-3 text-h3 tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <Link
            href="/process"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-opacity hover:opacity-70"
          >
            Full process & prisdetaljer
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

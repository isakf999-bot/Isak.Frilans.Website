import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";
import { processSteps } from "@/lib/process";

export function HomeProcess() {
  return (
    <section id="processen" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-h2">
            Från samtal till live — utan krångel.
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            Du vet alltid vad som händer härnäst, vad som ingår och när ni kan
            förvänta er en färdig sajt. Inga överraskningsfakturor.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <li className="border-t border-ink pt-6">
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
            className={`mt-10 ${btn.ghost}`}
          >
            Läs hela processen
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

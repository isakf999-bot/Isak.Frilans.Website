import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FreePreviewBackdrop } from "@/components/Home/FreePreviewBackdrop";
import Magnet from "@/components/reactbits/Magnet";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";

/**
 * "Se din hemsida innan du bestämmer dig" — unika säljargumentet.
 *
 * Mörk sektion mellan HomeHelp och HomeCases, med en höjdkarta i blått
 * bakom (FreePreviewBackdrop). Vänster: löftet och handlingen. Höger: de tre
 * stegen i erbjudandet — de är numrerade eftersom de faktiskt sker i den
 * ordningen.
 */

const PREFILL_MESSAGE =
  "Hej Isak, jag vill gärna se ett gratis förslag på hur en ny sajt skulle kunna se ut för oss. Vår logga skickar jag på mejl.";

const CONTACT_HREF = `/kontakt?meddelande=${encodeURIComponent(PREFILL_MESSAGE)}`;

const STEPS = [
  {
    title: "Du skickar logga och en kort beskrivning",
    body: "Skriv några rader i formuläret och skicka loggan på mejl.",
  },
  {
    title: "Jag gör ett första utkast",
    body: "Färger, typografi och hero — den första vyn på startsidan. Ett utkast, inte en färdig sajt, och helt kostnadsfritt.",
  },
  {
    title: "Du bestämmer",
    body: "Först när du har sett utkastet avgör du om vi går vidare.",
  },
];

const TERMS = [
  "Ingen bindning",
  "Inga dolda kostnader",
  "Utkastet är ert att behålla oavsett",
];

export function HomeFreePreview() {
  return (
    <section
      id="gratis-forslag"
      className="relative bg-night text-white"
      aria-labelledby="gratis-forslag-rubrik"
    >
      <FreePreviewBackdrop />

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <Reveal>
            <SectionLabel tone="dark">Gratis förhandsvisning</SectionLabel>
            <h2 id="gratis-forslag-rubrik" className="mt-4 text-h2 text-white">
              Se din nya hemsida{" "}
              <span className="text-brand-glow">
                — innan du bestämmer dig.
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-lead text-white/80">
              Skicka din logga och en kort beskrivning. Jag gör ett första
              utkast — färger, typografi, hero — helt kostnadsfritt. Först då
              bestämmer du om vi ska gå vidare.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
              {/* Magnet (React Bits): knappen dras en aning mot pekaren. */}
              <Magnet padding={48} magnetStrength={5}>
                <Link href={CONTACT_HREF} className={`group ${btn.onBrand}`}>
                  Få mitt gratis utkast
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                  />
                </Link>
              </Magnet>
              <Link href="/process" className={btn.ghostOnDark}>
                Så jobbar jag
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ol>
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-white/15 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)]"
                >
                  <span
                    aria-hidden="true"
                    className="pt-1 font-mono text-sm text-brand-glow"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-white/75">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm text-white/80">
              {TERMS.map((term) => (
                <li key={term} className="flex items-center gap-2">
                  <Check
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-brand-glow"
                  />
                  {term}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

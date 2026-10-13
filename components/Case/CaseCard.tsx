import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LaptopFrame } from "@/components/Case/LaptopFrame";
import type { CaseStudy } from "@/lib/cases";

/**
 * Case-kort — laptop-mockup på en mörkblå scen, med domän, kund och bransch
 * under. Hela kortet är en enda länk (rubrikens länk sträcks över kortet).
 *
 * Scenen är kortets egen yta, så samma kort fungerar på både ljus och mörk
 * botten. `tone` styr bara textfärgerna och scenens kant.
 */
export function CaseCard({
  study,
  priority = false,
  tone = "light",
}: {
  study: CaseStudy;
  priority?: boolean;
  /** "dark" = kortet står på mörk bakgrund (HomeCases), "light" = ljus (default) */
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";

  return (
    <article className="group relative flex h-full flex-col">
      <div
        className={`rounded-xl bg-linear-to-b overflow-hidden from-night-raised to-night px-8 pt-8 sm:px-12 sm:pt-12 ${
          dark ? "ring-1 ring-white/10" : ""
        }`}
      >
        <LaptopFrame className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          <Image
            src={study.heroImage}
            alt={study.heroAlt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 90vw, 520px"
            className="object-cover object-top"
          />
        </LaptopFrame>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="min-w-0">
          <p
            className={`font-mono text-sm break-words ${
              dark ? "text-brand-glow" : "text-brand"
            }`}
          >
            {study.domain}
          </p>
          <h3 className={`mt-2 text-h3 ${dark ? "text-white" : "text-ink"}`}>
            <Link
              href={`/case/${study.slug}`}
              className={`outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-offset-4 ${
                dark
                  ? "focus-visible:after:outline-brand-glow"
                  : "focus-visible:after:outline-brand"
              }`}
            >
              {study.client}
            </Link>
          </h3>
          <p className={`mt-1 text-sm ${dark ? "text-white/70" : "text-muted"}`}>
            {study.industry}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`inline-flex shrink-0 items-center gap-2 border-b-2 pb-1.5 text-[0.9375rem] font-medium transition-colors duration-150 ease-out ${
            dark
              ? "border-brand-glow/60 text-white group-hover:border-white"
              : "border-brand/40 text-ink group-hover:border-brand"
          }`}
        >
          Se caset
          <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

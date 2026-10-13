import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LaptopFrame } from "@/components/Case/LaptopFrame";
import type { CaseStudy } from "@/lib/cases";

/**
 * Stor redaktionell case-rad för /case: scenen med laptopen på ena sidan,
 * kund, bransch, domän och ingress på den andra. `flip` byter sida på bred
 * skärm så att raderna växlar. Hela raden är en länk till caset.
 */
export function CaseFeature({
  study,
  flip = false,
  priority = false,
}: {
  study: CaseStudy;
  flip?: boolean;
  priority?: boolean;
}) {
  return (
    <article className="group relative grid items-center gap-8 border-t border-ink pt-8 lg:grid-cols-12 lg:gap-16 lg:pt-12">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div className="rounded-xl bg-linear-to-b overflow-hidden from-night-raised to-night px-8 pt-8 sm:px-14 sm:pt-14 lg:px-16 lg:pt-16">
          <LaptopFrame className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
            <Image
              src={study.heroImage}
              alt={study.heroAlt}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover object-top"
            />
          </LaptopFrame>
        </div>
      </div>

      <div className="min-w-0 lg:col-span-5">
        <p className="font-mono text-sm break-words text-brand">
          {study.domain}
        </p>
        <h2 className="mt-4 text-h2 break-words">
          <Link
            href={`/case/${study.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-brand"
          >
            {study.client}
          </Link>
        </h2>
        <p className="mt-3 text-sm font-medium text-ink">{study.industry}</p>
        <p className="mt-5 max-w-md text-lead text-muted">{study.teaser}</p>

        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted">
          {study.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>

        <span
          aria-hidden="true"
          className="mt-8 inline-flex items-center gap-2 border-b-2 border-brand/40 pb-1.5 text-[0.9375rem] font-medium text-ink transition-colors duration-150 ease-out group-hover:border-brand"
        >
          Läs caset
          <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";

/**
 * Kundcase-kort i Generation-stil: stor hero-bild, domän som rubrik,
 * kort teaser och "Utforska caset".
 */
export function CaseCard({
  study,
  priority = false,
}: {
  study: CaseStudy;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/case/${study.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-lift"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-mist">
          <Image
            src={study.heroImage}
            alt={study.heroAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"
          />
          <span className="absolute top-3 left-3 rounded-pill border border-white/20 bg-ink/55 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
            {study.industry}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7">
          <h2 className="text-h3 tracking-tight text-ink transition-colors duration-200 group-hover:text-brand">
            {study.domain}
          </h2>
          <p className="mt-3 flex-1 text-muted">{study.teaser}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Utforska caset
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

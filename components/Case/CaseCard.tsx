import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/Case/BrowserFrame";
import type { CaseStudy } from "@/lib/cases";

/**
 * Kundcase-kort i Generation-stil: webbläsarram med domän, hero-bild,
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
        className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-[border-color] duration-150 hover:border-ink/20"
      >
        <div
          className="relative p-4 sm:p-5"
          style={{ background: study.accentColor ?? "#eef0fb" }}
        >
          <BrowserFrame url={study.domain}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={study.heroImage}
                alt={study.heroAlt}
                fill
                priority={priority}
                quality={90}
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top transition-opacity duration-300 group-hover:opacity-95"
              />
            </div>
          </BrowserFrame>
        </div>

        <div className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7">
          <p className="text-[11px] font-medium tracking-wide text-muted uppercase">
            {study.industry}
          </p>
          <h2 className="mt-2 text-h3 tracking-tight text-ink transition-colors duration-200 group-hover:text-brand">
            {study.domain}
          </h2>
          <p className="mt-3 flex-1 text-muted">{study.teaser}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Utforska caset
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

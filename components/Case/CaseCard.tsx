import Image from "next/image";
import Link from "next/link";
import { LaptopFrame } from "@/components/Case/LaptopFrame";
import type { CaseStudy } from "@/lib/cases";

/**
 * Case-kort — laptop-mockup som visar sajten, med titel och länk under
 * (samma textmönster som Bravo: kortnamn + "Ta en närmare titt »").
 *
 * Laptop-framen är alltid MacBook-stilad. Bakgrunden är sektionens ansvar,
 * inte kortets, så samma kort ligger snyggt på både ljus och mörk botten.
 */
export function CaseCard({
  study,
  priority = false,
  tone = "light",
}: {
  study: CaseStudy;
  priority?: boolean;
  /** "dark" = case-korten står på mörk bakgrund (HomeCases), "light" = ljus (case-listan, default) */
  tone?: "dark" | "light";
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const linkColor =
    tone === "dark"
      ? "text-brand-glow hover:text-white"
      : "text-brand hover:opacity-80";
  const focusRingOffset =
    tone === "dark" ? "focus-visible:ring-offset-ink" : "focus-visible:ring-offset-surface";

  return (
    <article className="group flex flex-col">
      <Link
        href={`/case/${study.slug}`}
        aria-label={`${study.client} — utforska caset`}
        className={`block outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-4 ${focusRingOffset}`}
      >
        <LaptopFrame className="transition-transform duration-500 group-hover:-translate-y-1">
          <Image
            src={study.heroImage}
            alt={study.heroAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover object-top"
          />
        </LaptopFrame>
      </Link>

      <div className="mt-6 text-center">
        <h3 className={`text-h3 tracking-tight ${titleColor}`}>
          {study.client}
        </h3>
        <Link
          href={`/case/${study.slug}`}
          className={`mt-2 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 transition-colors hover:underline ${linkColor}`}
        >
          Ta en närmare titt <span aria-hidden="true">»</span>
        </Link>
      </div>
    </article>
  );
}

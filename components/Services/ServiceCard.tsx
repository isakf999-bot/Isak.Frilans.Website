"use client";

import Link from "next/link";
import type { Service } from "@/lib/services";
import { serviceIcons } from "@/components/Services/serviceIcons";

/**
 * Ett klickbart tjänstekort.
 *
 * Hela kortet leder till tjänstesidan via "stretched link"-mönstret.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface p-7 transition-[border-color,background-color] duration-150 ease-out hover:border-ink/20 hover:bg-surface-soft has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-canvas text-brand">
          {serviceIcons[service.slug]}
        </span>
        <span
          aria-hidden="true"
          className="mt-1 text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          →
        </span>
      </div>

      <h3 className="mt-5 text-h3">
        <Link
          href={`/tjanster/${service.slug}`}
          aria-label={`${service.title} — läs mer`}
          className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
        >
          {service.title}
        </Link>
      </h3>

      <p className="mt-3 grow text-muted">{service.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-1.5 border border-line bg-canvas px-2.5 py-1 text-sm text-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      {service.caseStudy && (
        <a
          href={service.caseStudy.href}
          className="relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 font-medium text-brand transition-opacity duration-150 hover:opacity-70"
        >
          {service.caseStudy.label}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}

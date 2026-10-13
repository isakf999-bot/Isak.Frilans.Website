"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import type { Service } from "@/lib/services";
import { serviceIcons } from "@/components/Services/serviceIcons";

/** Kort för en tjänst — används där tjänsten visas som ett eget objekt. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    // SpotlightCard (React Bits): ett sandfärgat ljus följer pekaren över
    // kortet och fångar kanten. Färg och styrka sätts med props.
    <SpotlightCard
      theme="light"
      spotlightColor="var(--color-brand)"
      intensity={0.16}
      spotlightSize={280}
      borderGlow={1}
      className="group flex h-full flex-col !rounded-lg !p-6 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand">
          {serviceIcons[service.slug]}
        </span>
        <ArrowRight
          aria-hidden="true"
          className="mt-1 h-4 w-4 text-muted transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-brand"
        />
      </div>

      <h3 className="mt-6 text-h3 break-words hyphens-auto text-ink">
        <Link
          href={`/tjanster/${service.slug}`}
          className="after:absolute after:inset-0 after:z-[2] after:content-[''] focus:outline-none"
        >
          {service.title}
        </Link>
      </h3>

      <p className="mt-3 grow text-muted">{service.description}</p>

      {service.caseStudy && (
        <a href={service.caseStudy.href} className="link relative z-10 mt-5 w-fit">
          {service.caseStudy.label}
        </a>
      )}
    </SpotlightCard>
  );
}

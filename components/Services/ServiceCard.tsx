"use client";

import type { Service } from "@/lib/services";
import { serviceIcons } from "@/components/Services/serviceIcons";

/**
 * Ett klickbart tjänstekort.
 *
 * Hela kortet leder till kontaktformuläret och förifyller meddelandet med
 * "Jag är intresserad av …". Det byggs med "stretched link"-mönstret: en riktig
 * <a href="#kontakt"> vars ::after täcker hela kortet. Fördelar:
 *  - Fungerar UTAN javascript — klicket scrollar ändå till formuläret via hashen,
 *    prefill:en är bara en förbättring ovanpå.
 *  - Bryter inte HTML-semantiken. Ett pris eller en case-länk kan läggas i kortet
 *    senare och ligga ovanpå (z-10) utan att bli en olaglig nästlad länk.
 */
export function ServiceCard({ service }: { service: Service }) {
  const prefill = `Jag är intresserad av ${service.title.toLowerCase()}`;

  const handleClick = () => {
    // Berätta för kontaktformuläret vad som ska stå i meddelandet. Själva
    // scrollningen sköts av länkens vanliga hash-navigering (#kontakt).
    window.dispatchEvent(new CustomEvent("prefill-contact", { detail: prefill }));
  };

  // Flytta skenet dit muspekaren är. Rent dekorativt — sätter bara CSS-variabler.
  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--my",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <article
      onMouseMove={handleMove}
      className="card-glow group relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white to-[#f5f6fc] p-7 shadow-card transition-all duration-200 ease-out hover:-translate-y-1 hover:border-brand-glow hover:shadow-lift has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand"
    >
      {/* Permanent accentlinje i toppen (svag i vila, tänds vid hover). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-40 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />
      {/* Mjukt statiskt sken bakom ikonen — syns utan hover. -z-10 håller det
          bakom texten (kortet är en isolate-kontext). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -left-6 -z-10 h-28 w-28 rounded-full bg-brand-glow opacity-40 blur-2xl"
      />
      <div className="flex items-start justify-between gap-4">
        {/* Egendesignat ikon-emblem — ger varje kort en egen identitet. */}
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-glow/60 bg-brand-tint text-brand shadow-sm transition-all duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand group-hover:text-white">
          {serviceIcons[service.slug]}
        </span>
        <span
          aria-hidden="true"
          className="mt-1 flex h-8 w-8 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-canvas text-muted opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:bg-brand group-hover:text-white group-hover:opacity-100"
        >
          →
        </span>
      </div>

      <h3 className="mt-5 text-h3">
        <a
          href="#kontakt"
          onClick={handleClick}
          aria-label={`${service.title} — hör av dig om det här`}
          className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
        >
          {service.title}
        </a>
      </h3>

      <p className="mt-3 grow text-muted">{service.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-canvas px-3 py-1 text-sm text-muted transition-colors duration-200 ease-out group-hover:border-brand-glow"
          >
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-brand-glow"
            />
            {item}
          </li>
        ))}
      </ul>

      {service.price && (
        <p className="relative z-10 mt-5 font-medium text-ink">
          Från {service.price.from.toLocaleString("sv-SE")} kr
          {service.price.note && (
            <span className="font-normal text-muted"> · {service.price.note}</span>
          )}
        </p>
      )}

      {service.caseStudy && (
        <a
          href={service.caseStudy.href}
          className="relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 font-medium text-brand transition-opacity duration-200 hover:opacity-70"
        >
          {service.caseStudy.label}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}

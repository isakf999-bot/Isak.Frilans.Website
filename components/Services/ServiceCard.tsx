"use client";

import type { Service } from "@/lib/services";

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

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-7 shadow-card transition-all duration-200 ease-out hover:-translate-y-1 hover:border-brand-glow hover:shadow-lift has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-h3">
          <a
            href="#kontakt"
            onClick={handleClick}
            aria-label={`${service.title} — hör av dig om det här`}
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
          >
            {service.title}
          </a>
        </h3>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas text-muted transition-all duration-200 ease-out group-hover:bg-brand group-hover:text-white"
        >
          →
        </span>
      </div>

      <p className="mt-3 grow text-muted">{service.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="rounded-pill bg-canvas px-3 py-1 text-sm text-muted"
          >
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

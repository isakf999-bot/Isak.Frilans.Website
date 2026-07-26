import type { ReactNode } from "react";
import Link from "next/link";
import { Logo, logoLinkClass } from "@/components/Logo/Logo";

const YEAR = new Date().getFullYear();

const EMAIL = "info@isakweb.se";
/** Visas läsbart, men tel:-länken måste vara i internationellt format för att
 *  ringa rätt direkt från mobilen. */
const PHONE_DISPLAY = "076-251 41 21";
const PHONE_HREF = "tel:+46762514121";

const LINKS = [
  { label: "Portfolio", href: "https://isakforsberg.se/", external: true },
];

/**
 * Sociala länkar. URL:erna är hämtade från portfolion (isakforsberg.se) — Isaks
 * riktiga profiler. LinkedIn saknas där och läggs till när URL:en är känd.
 */
type Social = { name: string; href: string; icon: ReactNode };

const SOCIALS: Social[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/isakforsberg11",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    name: "X",
    href: "https://x.com/FoppaCS",
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/isak.forsberg.31",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
];

/** Ikon-emblem framför mejl/telefon — samma språk som de sociala ikonerna. */
const ICON_BOX =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-cool bg-surface text-brand shadow-card transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:shadow-lift";

export function Footer({ hideCta = false }: { hideCta?: boolean }) {
  return (
    <footer className="relative border-t border-line-cool bg-mist">
      {/* Synlig accentlinje längs överkanten. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        {/* CTA överst — döljs på kontaktsidan där formuläret redan är huvudhandlingen. */}
        {!hideCta && (
          <div className="flex flex-col gap-6 border-b border-line-cool pb-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-h3">Redo att sätta igång?</h2>
              <p className="mt-2 max-w-md text-muted">
                Berätta var du står, så säger jag rakt vad jag hade gjort — även om
                svaret är att du inte behöver mig.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="shine group inline-flex shrink-0 items-center gap-2.5 rounded-pill bg-brand px-6 py-3.5 font-medium whitespace-nowrap text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.97]"
            >
              Starta ditt projekt
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        )}

        <div
          className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] ${
            hideCta ? "" : "mt-12"
          }`}
        >
          {/* Varumärke + lokal förankring */}
          <div>
            {/* Klickbar logga till toppen — samma hover som i navbaren
                (se logoLinkClass i Logo.tsx). */}
            <a
              href="/#top"
              aria-label="Isak Web — till toppen"
              className={logoLinkClass}
            >
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Frilansande webbutvecklare i Helsingborg. Landningssidor, e-handel
              och företagssajter åt små företag.
            </p>
            {/* Enskild firma — org.nr är personnumret, så de sista fyra
                siffrorna visas medvetet inte. */}
            <p className="mt-5 text-sm text-muted">
              Org.nr <span className="font-medium text-ink">050704-XXXX</span>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-pill border border-line-cool bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-card">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-brand"
              >
                <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Helsingborg — jobbar i hela Sverige
            </p>
          </div>

          {/* Kontakta mig */}
          <div>
            <h2 className="text-eyebrow font-medium text-muted uppercase">
              Kontakta mig
            </h2>
            <address className="mt-4 space-y-3 not-italic">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3"
              >
                <span aria-hidden="true" className={ICON_BOX}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                    <path d="m3.5 7.5 8.5 5.5 8.5-5.5" />
                  </svg>
                </span>
                <span className="font-medium text-ink transition-colors duration-200 ease-out group-hover:text-brand">
                  {EMAIL}
                </span>
              </a>
              <a href={PHONE_HREF} className="group flex items-center gap-3">
                <span aria-hidden="true" className={ICON_BOX}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
                  </svg>
                </span>
                <span className="font-medium text-ink transition-colors duration-200 ease-out group-hover:text-brand">
                  {PHONE_DISPLAY}
                </span>
              </a>
            </address>
            <div className="mt-4 space-y-1 text-sm text-muted">
              <p>Svarar inom två arbetsdagar.</p>
              <p>Telefontid alla dagar 10–22.</p>
            </div>
          </div>

          {/* Hittar mig även här */}
          <nav aria-label="Länkar">
            <h2 className="text-eyebrow font-medium text-muted uppercase">
              Hittar mig även här
            </h2>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-1.5 font-medium text-ink transition-colors duration-200 ease-out hover:text-brand"
                  >
                    {link.label}
                    {link.external && (
                      <span
                        aria-hidden="true"
                        className="text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      >
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-cool bg-surface text-muted shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-lift active:translate-y-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-[18px] w-[18px]"
                    >
                      {social.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-line-cool pt-6 text-sm text-muted">
          © {YEAR} Isak Web · Isak Forsberg · Webbutvecklare i Helsingborg
        </p>
      </div>
    </footer>
  );
}

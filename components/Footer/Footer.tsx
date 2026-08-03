import type { ReactNode } from "react";
import Link from "next/link";
import { HomeFinalCta } from "@/components/Home/HomeFinalCta";
import { Logo, logoLinkClass } from "@/components/Logo/Logo";

const YEAR = new Date().getFullYear();

const EMAIL = "info@isakweb.se";
const PHONE_DISPLAY = "076-251 41 21";
const PHONE_HREF = "tel:+46762514121";

const NAV_LINKS = [
  { label: "Paket", href: "/paket" },
  { label: "Tjänster", href: "/tjanster" },
  { label: "Process", href: "/process" },
  { label: "Kundcase", href: "/case" },
  { label: "FAQ", href: "/faq" },
  { label: "Om mig", href: "/om" },
  { label: "Kontakt", href: "/kontakt" },
];

const EXTERNAL_LINKS = [
  {
    label: "Portfolio",
    href: "https://isakforsberg.se/",
  },
];

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

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px] shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-3.5 w-3.5">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

const contactIconClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-brand transition-all duration-200 ease-out group-hover:border-brand group-hover:bg-brand group-hover:text-white";

const linkClass =
  "text-sm text-muted transition-colors duration-200 ease-out hover:text-brand";

export function Footer({ hideCta = false }: { hideCta?: boolean }) {
  return (
    <>
      {!hideCta && <HomeFinalCta />}
      <footer className="relative border-t border-line bg-mist">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />

        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 lg:px-8 lg:pt-20 lg:pb-12">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            <div className="sm:col-span-2 lg:col-span-4">
              <Link
                href="/#top"
                aria-label="Isak Web — till startsidan"
                className={logoLinkClass}
              >
                <Logo />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                Webbplatser för svenska företag — snabba, tydliga och byggda för
                att konvertera. Baserad i Helsingborg, tillgänglig i hela
                Sverige.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
                <span className="text-brand">
                  <IconMapPin />
                </span>
                Helsingborg
              </p>
              <p className="mt-3 text-xs text-muted">
                Org.nr{" "}
                <span className="font-medium tracking-wide text-ink/70">
                  050704-XXXX
                </span>
              </p>
            </div>

            <nav aria-label="Sidor" className="lg:col-span-2">
              <h2 className="text-eyebrow font-semibold tracking-[0.12em] text-ink uppercase">
                Utforska
              </h2>
              <ul className="mt-5 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h2 className="text-eyebrow font-semibold tracking-[0.12em] text-ink uppercase">
                Kontakt
              </h2>
              <address className="mt-5 space-y-3 not-italic">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-3"
                >
                  <span className={contactIconClass}>
                    <IconMail />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">E-post</span>
                    <span className="block truncate text-sm font-medium text-ink transition-colors duration-200 group-hover:text-brand">
                      {EMAIL}
                    </span>
                  </span>
                </a>
                <a href={PHONE_HREF} className="group flex items-center gap-3">
                  <span className={contactIconClass}>
                    <IconPhone />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">Telefon</span>
                    <span className="block text-sm font-medium text-ink transition-colors duration-200 group-hover:text-brand">
                      {PHONE_DISPLAY}
                    </span>
                  </span>
                </a>
              </address>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-brand">
                    <IconClock />
                  </span>
                  <span>
                    Svarar inom{" "}
                    <span className="font-medium text-ink">2 arbetsdagar</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 pl-6">
                  Telefontid alla dagar 10–22
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-eyebrow font-semibold tracking-[0.12em] text-ink uppercase">
                Följ med
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Projekt, processer och det jag bygger — på webben och i sociala
                medier.
              </p>
              <ul className="mt-5 space-y-2.5">
                {EXTERNAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:text-brand"
                    >
                      {link.label}
                      <span className="text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand">
                        <IconArrowUpRight />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex items-center gap-2.5">
                {SOCIALS.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink/75 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-card active:translate-y-0"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                        className="h-5 w-5"
                      >
                        {social.icon}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              © {YEAR} Isak Web · Isak Forsberg
            </p>
            <p className="text-sm text-muted">
              Webbutveckling · Helsingborg &amp; Sverige
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

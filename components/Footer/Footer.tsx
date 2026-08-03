import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
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

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/isakforsberg11",
    Icon: InstagramLogo,
  },
  {
    name: "X",
    href: "https://x.com/FoppaCS",
    Icon: XLogo,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/isak.forsberg.31",
    Icon: FacebookLogo,
  },
] as const;

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
            {/* Brand */}
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
                <MapPin
                  weight="duotone"
                  className="h-[18px] w-[18px] text-brand"
                  aria-hidden
                />
                Helsingborg
              </p>
              {/* Enskild firma — org.nr är personnumret, så de sista fyra
                  siffrorna visas medvetet inte. */}
              <p className="mt-3 text-xs text-muted">
                Org.nr{" "}
                <span className="font-medium tracking-wide text-ink/70">
                  050704-XXXX
                </span>
              </p>
            </div>

            {/* Utforska */}
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

            {/* Kontakt */}
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
                    <EnvelopeSimple weight="duotone" className="h-5 w-5" aria-hidden />
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
                    <Phone weight="duotone" className="h-5 w-5" aria-hidden />
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
                  <Clock
                    weight="duotone"
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand"
                    aria-hidden
                  />
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

            {/* Socialt */}
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
                      <ArrowUpRight
                        weight="bold"
                        className="h-3.5 w-3.5 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex items-center gap-2.5">
                {SOCIALS.map(({ name, href, Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink/75 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-card active:translate-y-0"
                    >
                      <Icon weight="fill" className="h-5 w-5" aria-hidden />
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

import { FooterWordmark } from "@/components/Footer/FooterWordmark";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { HomeFinalCta } from "@/components/Home/HomeFinalCta";
import { Logo, logoLinkClass } from "@/components/Logo/Logo";
import { serviceNavGroups } from "@/lib/nav";
import { seoLandings } from "@/lib/seoLandings";

const YEAR = new Date().getFullYear();

const EMAIL = "info@isakweb.se";
const PHONE_DISPLAY = "076-251 41 21";
const PHONE_HREF = "tel:+46762514121";

const NAV_LINKS = [
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

// Länk i en footerlista: understrykningen finns där hela tiden men är
// genomskinlig, och tänds i sand vid hover (samma idé som .link-on-dark).
const linkBase =
  "underline decoration-transparent decoration-2 underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-out hover:text-white hover:decoration-brand-glow";
const linkClass = `${linkBase} text-[0.9375rem] text-white/70`;

const headingClass = "text-eyebrow font-semibold text-brand-glow uppercase";

// En rad i kontaktlistan: etikett till vänster, värdet stort, hård linje över.
const contactRowClass =
  "grid grid-cols-[1.25rem_1fr_auto] items-center gap-x-4 border-t border-white/15 py-5 sm:grid-cols-[1.25rem_6rem_1fr_auto]";

const contactLabelClass =
  "text-eyebrow font-semibold text-white/60 uppercase max-sm:hidden";

const contactValueClass =
  "underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-150 ease-out group-hover:decoration-brand-glow";

const contactArrowClass =
  "h-5 w-5 text-white/50 transition-[color,transform] duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-glow";

export function Footer({ hideCta = false }: { hideCta?: boolean }) {
  return (
    <>
      {!hideCta && <HomeFinalCta />}
      <footer className="border-t border-white/10 bg-night text-white">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-8 lg:px-8 lg:pt-28">
          {/* Avsändare + kontakt. Kontaktraderna är footerns tyngdpunkt. */}
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link
                href="/#top"
                aria-label="Isak Web — till startsidan"
                className={logoLinkClass}
              >
                <Logo onDark />
              </Link>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
                Webbplatser för svenska företag — tydliga, snabba och byggda
                tillsammans med den som skriver koden. Jag sitter i Helsingborg
                och tar uppdrag i hela Sverige.
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm font-medium text-white">
                <MapPin aria-hidden="true" className="h-4 w-4 text-brand-glow" />
                Helsingborg
              </p>
              <p className="mt-2 text-sm text-white/60">
                Org.nr{" "}
                <span className="font-mono text-white/80">050704-XXXX</span>
              </p>
            </div>

            <div className="lg:col-span-8">
              <h2 className={headingClass}>Kontakt</h2>
              <address className="mt-5 border-b border-white/15 not-italic">
                <a href={`mailto:${EMAIL}`} className={`group ${contactRowClass}`}>
                  <Mail aria-hidden="true" className="h-5 w-5 text-brand-glow" />
                  <span className={contactLabelClass}>E-post</span>
                  <span
                    className={`min-w-0 text-[clamp(1.375rem,0.9rem+2.2vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] break-words text-white ${contactValueClass}`}
                  >
                    {EMAIL}
                  </span>
                  <ArrowUpRight aria-hidden="true" className={contactArrowClass} />
                </a>
                <a href={PHONE_HREF} className={`group ${contactRowClass}`}>
                  <Phone aria-hidden="true" className="h-5 w-5 text-brand-glow" />
                  <span className={contactLabelClass}>Telefon</span>
                  <span className="min-w-0">
                    <span
                      className={`block font-mono text-[clamp(1.25rem,0.9rem+1.6vw,1.75rem)] leading-tight font-medium text-white ${contactValueClass}`}
                    >
                      {PHONE_DISPLAY}
                    </span>
                    <span className="mt-1 block text-sm text-white/60">
                      Telefontid alla dagar 10–22
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className={contactArrowClass} />
                </a>
                <p className={contactRowClass}>
                  <Clock aria-hidden="true" className="h-5 w-5 text-brand-glow" />
                  <span className={contactLabelClass}>Svarstid</span>
                  <span className="text-[0.9375rem] text-white/70">
                    Svarar inom{" "}
                    <span className="font-semibold text-white">2 arbetsdagar</span>
                  </span>
                </p>
              </address>
            </div>
          </div>

          {/* Länkar: tjänsterna i sina tre grupper, sidorna och det som ligger
              utanför sajten. */}
          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12">
            <nav
              aria-label="Tjänster"
              className="grid grid-cols-2 gap-x-8 gap-y-10 sm:col-span-2 lg:col-span-6"
            >
              <h2 className="sr-only">Tjänster</h2>
              <FooterGroup
                heading={serviceNavGroups[0].heading}
                links={serviceNavGroups[0].items}
              />
              <div className="space-y-10">
                {serviceNavGroups.slice(1).map((group) => (
                  <FooterGroup
                    key={group.heading}
                    heading={group.heading}
                    links={group.items}
                  />
                ))}
              </div>
            </nav>

            <nav aria-label="Sidor" className="lg:col-span-3">
              <h2 className={headingClass}>Utforska</h2>
              <ul className="mt-4 space-y-2.5">
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
              <h2 className={headingClass}>Följ mig</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/70">
                Projekt och det jag bygger — på webben och i sociala medier.
              </p>
              <ul className="mt-4 space-y-2.5">
                {EXTERNAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group link-on-dark inline-flex items-center gap-1.5 text-[0.9375rem]"
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-brand-glow transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex items-center gap-2">
                {SOCIALS.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/75 transition-[background-color,border-color,color,transform] duration-150 ease-out hover:-translate-y-px hover:border-brand-glow hover:bg-night-raised hover:text-white active:translate-y-px"
                    >
                      {/* Varumärkesikoner finns inte i Lucide — egna paths. */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        {social.icon}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/*
            SEO-landningar. Behövs för att söket ska hitta orten/tjänsten, men
            ska inte konkurrera med den riktiga navigationen ovanför — därför
            en egen, lugn spaltlista i stället för en rad nyckelord.
          */}
          <nav
            aria-label="Hemsidor och sök"
            className="mt-16 grid gap-x-8 gap-y-5 border-t border-white/15 pt-8 lg:mt-20 lg:grid-cols-12"
          >
            <h2 className={`lg:col-span-3 ${headingClass}`}>Fler ingångar</h2>
            <ul className="columns-2 gap-x-8 sm:columns-3 lg:col-span-9">
              {seoLandings.map((landing) => (
                <li key={landing.slug} className="break-inside-avoid py-1">
                  <Link
                    href={`/${landing.slug}`}
                    className={`${linkBase} text-sm text-white/60`}
                  >
                    {landing.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Avslutet: ordbilden, animerad med EchoText (se FooterWordmark). */}
          <FooterWordmark />

          <div className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {YEAR} Isak Web · Isak Forsberg</p>
            <p>Webbutveckling · Helsingborg &amp; Sverige</p>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterGroup({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className={headingClass}>{heading}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

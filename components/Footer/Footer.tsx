import { Logo } from "@/components/Logo/Logo";

const YEAR = new Date().getFullYear();

/**
 * Linktree är medvetet inte med ännu — den är inte publicerad. Hellre ingen
 * länk än en död länk. Lägg till här när den finns:
 *   { label: "Linktree", href: "…", external: true }
 */
const LINKS = [
  { label: "Portfolio", href: "https://isakforsberg.se/", external: true },
  { label: "isakf999@gmail.com", href: "mailto:isakf999@gmail.com", external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-line-cool bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Frilansande webbutvecklare. Landningssidor, e-handel och
              företagssajter åt små företag.
            </p>
          </div>

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
          </nav>
        </div>

        <p className="mt-12 border-t border-line-cool pt-6 text-sm text-muted">
          © {YEAR} Isak Web · Isak Forsberg
        </p>
      </div>
    </footer>
  );
}

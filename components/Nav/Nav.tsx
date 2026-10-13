"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo, logoLinkClass } from "@/components/Logo/Logo";
import { NavServicesMenu } from "@/components/Nav/NavServicesMenu";
import { btn } from "@/components/ui/buttonStyles";
import { menuPageLinks, primaryNav, serviceNavGroups } from "@/lib/nav";

// Länk i listen: en linje under ordet. Den ritas ut vid hover och ligger
// kvar i sand på aktuell sida — markören är alltså inte bara färg.
const barLink = (active: boolean) =>
  `relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-200 after:ease-out ${
    active
      ? "text-ink after:scale-x-100 after:bg-brand"
      : "text-muted after:scale-x-0 after:bg-line-cool hover:text-ink hover:after:scale-x-100"
  }`;

// Rad i mobilmenyn. Aktuell sida får en sandstapel i vänsterkanten.
const panelLink = (active: boolean) =>
  `relative block rounded-md py-2.5 pr-2 text-base transition-colors duration-150 ease-out hover:bg-mist hover:text-ink active:bg-surface-soft ${
    active
      ? "pl-4 font-semibold text-ink before:absolute before:top-2.5 before:bottom-2.5 before:left-1 before:w-0.5 before:rounded-full before:bg-brand"
      : "pl-2 font-medium text-ink/80"
  }`;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Stäng menyn vid route-byte.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Mobilmenyn: Escape stänger, Tab hålls kvar inom listen + panelen och
  // sidan bakom låses. Scroll-låset återställs till det värde som gällde
  // innan (chatten kan ha satt sitt eget).
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [],
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Panelen finns bara under lg — stäng om fönstret blir bredare.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => desktop.matches && setOpen(false);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    toggle?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Överst är listen en del av sidan. När man scrollat släpper den taget och
  // blir en fristående, frostad platta som fungerar över både ljusa och
  // mörka sektioner.
  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 6);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  const floating = scrolled && !open;

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled ? "true" : "false"}
      className={`pointer-events-none sticky top-0 z-50 h-[4.5rem] border-b transition-[background-color,border-color] duration-300 ease-out ${
        floating ? "border-transparent bg-transparent" : "border-line bg-surface"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center px-3 lg:px-4">
        <div
          className={`pointer-events-auto relative flex h-14 w-full items-center justify-between rounded-lg border px-3 transition-[background-color,border-color,box-shadow] duration-300 ease-out lg:px-4 ${
            floating
              ? "border-line bg-surface/90 shadow-lift backdrop-blur-md"
              : "border-transparent"
          }`}
        >
          <Link
            href="/#top"
            aria-label="Isak Web — till toppen"
            className={logoLinkClass}
          >
            <Logo />
          </Link>

          <nav
            aria-label="Huvudmeny"
            className="hidden items-center gap-1 self-stretch lg:flex"
          >
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={barLink(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
            <NavServicesMenu triggerClass={barLink} />
            <Link
              href="/kontakt"
              aria-current={pathname === "/kontakt" ? "page" : undefined}
              className={`${btn.primary} ml-4 px-4! py-2.5! text-sm!`}
            >
              Hör av dig
            </Link>
          </nav>

          {/* Hamburger är bara för mobil/tablet (< lg). På desktop ligger
              alla länkar direkt i listen. */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-ink transition-[background-color,border-color,transform] duration-150 ease-out hover:border-line-cool hover:bg-mist active:translate-y-px lg:hidden"
          >
            <span className="sr-only">{open ? "Stäng meny" : "Öppna meny"}</span>
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobilmenyn ligger alltid i DOM:en så att den kan tona in; `inert`
          och `invisible` gör den stängda panelen oåtkomlig för Tab och
          skärmläsare. */}
      <div
        id={menuId}
        inert={!open}
        className={`pointer-events-auto fixed inset-x-0 top-[4.5rem] bottom-0 flex flex-col overflow-y-auto overscroll-contain bg-surface transition-[opacity,transform,visibility] duration-200 ease-out lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Alla sidor" className="mx-auto w-full max-w-6xl flex-1 px-6 pt-8 pb-6">
          <ul className="border-b border-ink">
            {menuPageLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="border-t border-ink">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-center justify-between gap-4 py-4 text-h3 font-semibold tracking-[-0.03em] text-ink transition-colors duration-150 ease-out hover:text-brand"
                  >
                    <span className="flex items-center gap-3">
                      {active ? (
                        <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-brand" />
                      ) : null}
                      {link.label}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-muted transition-[color,transform] duration-150 ease-out group-hover:translate-x-1 group-hover:text-brand"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-eyebrow font-semibold text-brand uppercase">Tjänster</p>
          <div className="mt-5 grid gap-x-8 gap-y-8 sm:grid-cols-3">
            {serviceNavGroups.map((group) => (
              <div key={group.heading}>
                <p className="border-b border-line pb-2 text-eyebrow font-semibold text-muted uppercase">
                  {group.heading}
                </p>
                <ul className="mt-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={panelLink(pathname === item.href)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Högermarginalen lämnar plats åt chattknappen som ligger fast i hörnet. */}
        <div className="sticky bottom-0 flex border-t border-line bg-surface pt-4 pr-24 pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-6">
          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className={`${btn.primary} w-full max-w-md`}
          >
            Hör av dig
          </Link>
        </div>
      </div>
    </header>
  );
}

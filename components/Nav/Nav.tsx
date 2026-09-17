"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo, logoLinkClass } from "@/components/Logo/Logo";
import { NavServicesMenu } from "@/components/Nav/NavServicesMenu";
import { btn } from "@/components/ui/buttonStyles";
import { menuPageLinks, primaryNav, serviceNavGroups } from "@/lib/nav";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const linkClass = (href: string) =>
    `rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
      pathname === href || pathname.startsWith(`${href}/`)
        ? "text-ink"
        : "text-muted hover:text-ink"
    }`;

  // Stäng menyn vid route-byte.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape + scroll-lock för hamburger-drawern.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Subtil skugga när sidan är scrollad (Bravo-mönster: white bar med lyft).
  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 6);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={`sticky top-0 z-50 border-b bg-surface transition-[border-color,box-shadow] duration-200 ${
        scrolled
          ? "border-line/80 shadow-[0_10px_24px_-14px_rgba(28,25,23,0.18)]"
          : "border-line"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/#top"
          aria-label="Isak Web — till toppen"
          className={logoLinkClass}
        >
          <Logo onDark={false} />
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Huvudmeny" className="hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            <NavServicesMenu />
            <Link href="/kontakt" className={`${btn.primary} ml-3 px-4 py-2 text-sm`}>
              Hör av dig
            </Link>
          </nav>

          {/*
            Hamburger är bara för mobil/tablet (< lg). På desktop har vi alla
            länkar i den vita listen — Process, FAQ, Kundcase, Om mig och
            Tjänster ▾ — så en hamburger bredvid "Hör av dig" blir bara brus.
          */}
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "Stäng meny" : "Öppna meny"}</span>
            {open ? (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                <path
                  d="M2 4h12M2 8h12M2 12h12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Stäng meny"
          className="fixed inset-0 top-[4.25rem] z-40 bg-ink/25"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        id={menuId}
        className={`fixed top-[4.25rem] right-0 bottom-0 z-50 w-full max-w-md flex-col overflow-y-auto border-l border-line bg-surface shadow-[0_24px_60px_rgba(28,25,23,0.12)] ${
          open ? "flex" : "hidden"
        }`}
      >
        <nav aria-label="Alla sidor" className="flex flex-1 flex-col px-6 py-6 lg:px-8">
          <p className="text-eyebrow font-medium tracking-[0.14em] text-muted uppercase">
            Tjänster
          </p>
          <div className="mt-5 space-y-7">
            {serviceNavGroups.map((group) => (
              <div key={group.heading}>
                <p className="text-xs font-semibold tracking-[0.08em] text-ink/70 uppercase">
                  {group.heading}
                </p>
                <ul className="mt-2.5 space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-md px-1 py-2 text-[1.05rem] transition-colors ${
                          pathname === item.href
                            ? "font-medium text-ink"
                            : "text-muted hover:text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-eyebrow font-medium tracking-[0.14em] text-muted uppercase">
            Sidor
          </p>
          <ul className="mt-3 space-y-0.5">
            {menuPageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-1 py-2 text-[1.05rem] transition-colors ${
                    pathname === link.href || pathname.startsWith(`${link.href}/`)
                      ? "font-medium text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className={`${btn.primary} mt-8 w-full py-3.5 text-center`}
          >
            Hör av dig
          </Link>
        </nav>
      </div>
    </header>
  );
}

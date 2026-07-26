"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo, logoLinkClass } from "@/components/Logo/Logo";

/**
 * "Om mig" är en sektion på startsidan ("/#om-mig") — fungerar från vilken
 * sida som helst. "Vad jag bygger", "Pris & process" och "Kundcase" är egna sidor.
 */
const LINKS = [
  { href: "/#om-mig", label: "Om mig" },
  { href: "/tjanster", label: "Vad jag bygger" },
  { href: "/process", label: "Pris & process" },
];

/** Renderas som blå knappar (samma stil), inte vanliga textlänkar. */
const CASE_LINK = { href: "/case", label: "Kundcase" };
const CONTACT_LINK = { href: "/kontakt", label: "Starta ett projekt" };

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ease-out ${
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-lg"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/#top"
          aria-label="Isak Web — till toppen"
          className={logoLinkClass}
        >
          <Logo />
        </Link>

        <nav aria-label="Huvudmeny" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-pill px-4 py-2 text-sm text-muted transition-all duration-200 ease-out hover:scale-105 hover:bg-brand-tint hover:text-brand active:scale-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={CASE_LINK.href}
            className="shine ml-3 rounded-pill bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-brand transition-all duration-200 ease-out hover:scale-105 hover:bg-brand-dark hover:shadow-lift active:scale-100"
          >
            {CASE_LINK.label}
          </Link>
          <Link
            href={CONTACT_LINK.href}
            className="shine ml-2 rounded-pill bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-brand transition-all duration-200 ease-out hover:scale-105 hover:bg-brand-dark hover:shadow-lift active:scale-100"
          >
            {CONTACT_LINK.label}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobilmeny"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-line bg-surface md:hidden"
        >
          <span className="sr-only">{open ? "Stäng meny" : "Öppna meny"}</span>
          <span
            aria-hidden="true"
            className={`h-0.5 w-4 rounded-pill bg-ink transition-transform duration-200 ease-out ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`h-0.5 w-4 rounded-pill bg-ink transition-transform duration-200 ease-out ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobilmeny"
        className={`grid overflow-hidden bg-canvas transition-all duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr] border-t border-line" : "grid-rows-[0fr]"
        }`}
      >
        <nav aria-label="Mobilmeny" className="min-h-0">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {[
              ...LINKS,
              CASE_LINK,
              { href: "/kontakt", label: "Kontakt" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="block rounded-lg px-3 py-3 text-lg transition-colors duration-200 ease-out hover:bg-brand-tint hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

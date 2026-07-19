"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo/Logo";

/**
 * Länkarna pekar på "/#..." så de fungerar från vilken sida som helst — från
 * case-sidan tar de dig hem till rätt sektion, på startsidan skrollar de dit.
 */
const LINKS = [
  { href: "/#om-mig", label: "Om mig" },
  { href: "/#vad-jag-bygger", label: "Vad jag bygger" },
  { href: "/case", label: "Case" },
];

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
          className="origin-left transition-transform duration-200 ease-out hover:scale-105 active:scale-100"
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
            href="/#kontakt"
            className="shine ml-3 rounded-pill bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-brand transition-all duration-200 ease-out hover:scale-105 hover:bg-brand-dark hover:shadow-lift active:scale-100"
          >
            Starta ett projekt
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
            {[...LINKS, { href: "/#kontakt", label: "Kontakt" }].map((link) => (
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

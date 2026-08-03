"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo, logoLinkClass } from "@/components/Logo/Logo";

const LINKS = [
  { href: "/paket", label: "Paket" },
  { href: "/tjanster", label: "Tjänster" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/case", label: "Kundcase" },
  { href: "/kontakt", label: "Starta ett projekt" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";
  /** Transparent över ocean-hero; vit så fort man scrollar (eller på andra sidor). */
  const overHero = onHome && !scrolled && !open;

  const linkClass = overHero
    ? "rounded-pill px-4 py-2 text-sm text-white/85 transition-all duration-200 ease-out hover:text-white active:scale-100"
    : "rounded-pill px-4 py-2 text-sm text-muted transition-all duration-200 ease-out hover:text-brand active:scale-100";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/#top"
          aria-label="Isak Web — till toppen"
          className={logoLinkClass}
        >
          <Logo onDark={overHero} />
        </Link>

        <nav aria-label="Huvudmeny" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobilmeny"
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border transition-colors duration-200 ${
              overHero
                ? "border-white/40 text-white"
                : "border-line text-ink"
            }`}
          >
            <span className="sr-only">{open ? "Stäng meny" : "Öppna meny"}</span>
            <span
              aria-hidden="true"
              className={`h-0.5 w-4 rounded-pill transition-transform duration-200 ease-out ${
                overHero ? "bg-white" : "bg-ink"
              } ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              aria-hidden="true"
              className={`h-0.5 w-4 rounded-pill transition-transform duration-200 ease-out ${
                overHero ? "bg-white" : "bg-ink"
              } ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobilmeny"
        className={`grid overflow-hidden transition-all duration-300 ease-out md:hidden ${
          open
            ? "grid-rows-[1fr] border-t border-line bg-white"
            : "grid-rows-[0fr]"
        }`}
      >
        <nav aria-label="Mobilmeny" className="min-h-0">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="block rounded-lg px-3 py-3 text-lg text-ink transition-colors duration-200 ease-out hover:text-brand"
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

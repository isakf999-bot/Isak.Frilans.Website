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
  { href: "/om", label: "Om mig" },
  { href: "/case", label: "Kundcase" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";
  const overHero = onHome && !scrolled && !open;

  const linkClass =
    "rounded-md px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-white";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
          : "border-b border-line bg-black/80 backdrop-blur-xl"
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

        <nav aria-label="Huvudmeny" className="hidden items-center gap-0.5 md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="ml-3 inline-flex items-center rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-85"
          >
            Starta ett projekt
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobilmeny"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-line-cool text-white"
          >
            <span className="sr-only">{open ? "Stäng meny" : "Öppna meny"}</span>
            <span
              aria-hidden="true"
              className={`h-0.5 w-4 rounded-pill bg-white transition-transform duration-200 ease-out ${
                open ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`h-0.5 w-4 rounded-pill bg-white transition-transform duration-200 ease-out ${
                open ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobilmeny"
        className={`grid overflow-hidden transition-all duration-300 ease-out md:hidden ${
          open
            ? "grid-rows-[1fr] border-t border-line bg-black"
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
                  className="block rounded-lg px-3 py-3 text-lg text-ink transition-colors duration-200 ease-out hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block rounded-md bg-white px-3 py-3 text-center text-lg font-semibold text-black"
              >
                Starta ett projekt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { serviceNavGroups } from "@/lib/nav";

/**
 * Desktop-menyn för Tjänster.
 *
 * Öppnas på hover, focus eller klick. Stängs på Escape, klick utanför,
 * focus utanför eller när route ändras. Mobile använder hamburgermenyn i
 * `Nav.tsx` — den här komponenten renderas bara på `lg`-uppåt.
 *
 * Panelen är lika bred som själva listen: den positioneras mot närmaste
 * `relative`-förälder (listen i `Nav.tsx`), inte mot knappen, så att den
 * aldrig hamnar utanför skärmen på smalare desktop-bredder.
 */
export function NavServicesMenu({ triggerClass }: { triggerClass: (active: boolean) => string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  // När focus just öppnade menyn ska klicket som följer inte stänga den igen
  // (touch och tangentbord: focus kommer före click).
  const focusOpenedAt = useRef(0);

  const isServiceActive = pathname.startsWith("/tjanster");

  const clearTimers = () => {
    if (openTimer.current != null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleOpen = () => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), 90);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  const openNow = () => {
    clearTimers();
    setOpen(true);
  };

  const closeNow = () => {
    clearTimers();
    setOpen(false);
  };

  // Stäng vid route-byte.
  useEffect(() => {
    closeNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape + klick utanför.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    const onDown = (e: MouseEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) closeNow();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  // Städa timers vid unmount.
  useEffect(() => () => clearTimers(), []);

  return (
    <div
      ref={rootRef}
      className="flex items-center self-stretch"
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocusCapture={() => {
        if (!open) focusOpenedAt.current = performance.now();
        openNow();
      }}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!next || !rootRef.current?.contains(next)) scheduleClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => {
          const justOpenedByFocus = performance.now() - focusOpenedAt.current < 400;
          if (open && !justOpenedByFocus) closeNow();
          else openNow();
        }}
        className={`inline-flex items-center gap-1.5 ${triggerClass(isServiceActive || open)}`}
      >
        Tjänster
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-200 ease-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Alltid i DOM:en så att öppningen kan animeras; `inert` + `invisible`
          håller den stängda panelen borta från tabbordning och skärmläsare.
          before-elementet är en osynlig brygga över glipan mellan list och
          panel, så att menyn inte stängs när pekaren är på väg ner. */}
      <div
        id={menuId}
        role="menu"
        aria-label="Tjänster"
        inert={!open}
        className={`absolute inset-x-0 top-full z-40 mt-2 rounded-lg border border-line bg-surface p-2 shadow-lift transition-[opacity,transform,visibility] duration-200 ease-out before:absolute before:inset-x-0 before:-top-4 before:h-4 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="grid grid-cols-[1.15fr_1.15fr_1fr_1.3fr]">
          {serviceNavGroups.map((group) => (
            <div key={group.heading} className="px-4 py-5">
              <p className="border-b border-line pb-3 text-eyebrow font-semibold text-muted uppercase">
                {group.heading}
              </p>
              <ul className="mt-3">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        role="menuitem"
                        href={item.href}
                        onClick={closeNow}
                        aria-current={active ? "page" : undefined}
                        className={`group relative -mx-2 flex items-center justify-between gap-3 rounded-md px-2 py-2 text-[0.9375rem] transition-colors duration-150 ease-out hover:bg-mist hover:text-ink ${
                          active
                            ? "pl-4 font-semibold text-ink before:absolute before:top-2 before:bottom-2 before:left-1.5 before:w-0.5 before:rounded-full before:bg-brand"
                            : "font-medium text-ink/80"
                        }`}
                      >
                        {item.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 -translate-x-1 text-brand opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="flex flex-col justify-between rounded-md bg-night p-5 text-white">
            <div>
              <p className="text-lg leading-snug font-semibold tracking-[-0.02em]">
                Osäker på vad som passar?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Beskriv läget, så föreslår jag ett upplägg.
              </p>
            </div>
            <Link
              role="menuitem"
              href="/kontakt"
              onClick={closeNow}
              className="group link-on-dark mt-6 inline-flex items-center gap-2 self-start text-sm"
            >
              Hör av dig
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

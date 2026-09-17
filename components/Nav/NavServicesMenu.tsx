"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { serviceNavGroups } from "@/lib/nav";

/**
 * Desktop-menyn för Tjänster.
 *
 * Öppnas på hover, focus eller klick. Stängs på Escape, klick utanför,
 * focus utanför eller när route ändras. Mobile använder hamburgermenyn i
 * `Nav.tsx` — den här komponenten renderas bara på `md`-uppåt.
 *
 * Design-mässigt: kort öppnings-animation, ingen bakgrunds-overlay,
 * återanvänder projektets tokens (`bg-surface`, `border-line`, `text-ink`).
 */
export function NavServicesMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

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
      className="relative"
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocusCapture={openNow}
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
        onClick={() => (open ? closeNow() : openNow())}
        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
          isServiceActive || open
            ? "text-ink"
            : "text-muted hover:text-ink"
        }`}
      >
        Tjänster
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M2 4.5 6 8.5 10 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={menuId}
        role="menu"
        aria-label="Tjänster"
        hidden={!open}
        className="absolute top-full left-1/2 z-40 mt-2 w-[min(52rem,90vw)] -translate-x-1/2 rounded-xl border border-line bg-surface p-6 shadow-[0_24px_60px_rgba(28,25,23,0.12)]"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {serviceNavGroups.map((group) => (
            <div key={group.heading}>
              <p className="text-eyebrow font-semibold tracking-[0.12em] text-ink/70 uppercase">
                {group.heading}
              </p>
              <ul className="mt-3 space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        role="menuitem"
                        href={item.href}
                        onClick={closeNow}
                        className={`group -mx-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                          active
                            ? "font-medium text-ink"
                            : "text-muted hover:bg-mist hover:text-ink"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="text-brand transition-transform duration-150 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

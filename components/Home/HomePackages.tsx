"use client";

import Link from "next/link";
import { useState } from "react";
import { packageAddons, packages, type PackageId } from "@/lib/packages";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

export function HomePackages() {
  const [openId, setOpenId] = useState<PackageId | null>("business");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <section id="paket" className="relative bg-surface">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        <Reveal>
          <SectionLabel>Paket</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-h2">
            Välj nivå. Bygg vidare med tillägg.
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            Tydliga paket utan byråpåslag. Du ser vad som ingår — och kan addera
            det som faktiskt behövs för just ditt bolag.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {packages.map((pkg, i) => {
            const open = openId === pkg.id;
            return (
              <Reveal key={pkg.id} delay={i * 60}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-canvas p-6 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift ${
                    pkg.recommended
                      ? "border-brand ring-2 ring-brand/20"
                      : "border-line hover:border-brand/40"
                  }`}
                >
                  {pkg.recommended ? (
                    <span className="absolute top-4 right-4 rounded-pill bg-brand px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
                      Rekommenderad
                    </span>
                  ) : null}
                  <p className="text-eyebrow font-medium tracking-[0.12em] text-brand uppercase">
                    {pkg.name}
                  </p>
                  <h3 className="mt-3 text-h3 tracking-tight">{pkg.tagline}</h3>
                  <p className="mt-3 text-sm text-muted">{pkg.who}</p>
                  <p className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                    {pkg.priceLabel}
                  </p>
                  {pkg.priceNote ? (
                    <p className="mt-1 text-xs text-muted">{pkg.priceNote}</p>
                  ) : null}
                  <p className="mt-4 text-sm font-medium text-ink">
                    {pkg.pages}
                  </p>

                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : pkg.id)}
                    className="mt-5 text-left text-sm font-semibold text-brand transition-opacity hover:opacity-70"
                    aria-expanded={open}
                  >
                    {open ? "Dölj innehåll ↑" : "Visa innehåll ↓"}
                  </button>

                  <ul
                    className={`mt-3 space-y-2 overflow-hidden text-sm text-muted transition-all duration-300 ease-out ${
                      open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span aria-hidden="true" className="text-brand">
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/kontakt?paket=${pkg.id}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-medium text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark active:scale-[0.98]"
                  >
                    Välj {pkg.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-16">
            <h3 className="text-h3 tracking-tight">Tillägg</h3>
            <p className="mt-2 max-w-xl text-muted">
              Bocka det du är nyfiken på — vi raffinerar scope i samtalet.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {packageAddons.map((addon) => {
                const on = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 ${
                      on
                        ? "border-brand bg-brand-tint shadow-card"
                        : "border-line bg-canvas hover:border-brand/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-ink">{addon.name}</p>
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                          on
                            ? "border-brand bg-brand text-white"
                            : "border-line text-transparent"
                        }`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{addon.description}</p>
                    <p className="mt-3 text-sm font-medium text-brand">
                      {addon.priceLabel}
                    </p>
                  </button>
                );
              })}
            </div>
            {selectedAddons.length > 0 ? (
              <p className="mt-4 text-sm text-muted">
                {selectedAddons.length} tillägg markerade — ta med dem i
                kontaktformuläret.
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

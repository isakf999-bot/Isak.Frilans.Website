"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  packageAddons,
  packages,
  type PackageId,
} from "@/lib/packages";
import { formatSek, PRICES } from "@/lib/pricing";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

const PAGE_MIN = 1;
const PAGE_MAX = 30;

const featureAddons = packageAddons.filter((a) => a.billing !== "perPage");
const extraPagePrice = PRICES.addons.extraPage;

function defaultPagesFor(id: PackageId): number {
  if (id === "starter") return 5;
  if (id === "business") return 10;
  if (id === "premium") return 15;
  return 10;
}

export function HomePackages() {
  const [selectedId, setSelectedId] = useState<PackageId>("business");
  const [openId, setOpenId] = useState<PackageId | null>("business");
  const [pageCount, setPageCount] = useState(defaultPagesFor("business"));
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const selectedPackage = packages.find((p) => p.id === selectedId)!;

  const selectPackage = (id: PackageId) => {
    setSelectedId(id);
    setPageCount(defaultPagesFor(id));
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const includedPages = selectedPackage.includedPages;
  const extraPages =
    includedPages == null ? 0 : Math.max(0, pageCount - includedPages);
  const pagesCost = extraPages * extraPagePrice;

  const summary = useMemo(() => {
    const lines: { label: string; amount: number | null; note?: string }[] = [];

    lines.push({
      label: `Paket ${selectedPackage.name}`,
      amount: selectedPackage.priceFrom,
      note: selectedPackage.priceFrom == null ? "Offert" : undefined,
    });

    if (extraPages > 0) {
      lines.push({
        label: `Extra sidor × ${extraPages}`,
        amount: pagesCost,
      });
    }

    let monthly = 0;
    for (const addon of featureAddons) {
      if (!selectedAddons.includes(addon.id)) continue;
      if (addon.billing === "monthly") {
        monthly += addon.price;
        lines.push({ label: addon.name, amount: addon.price, note: "/mån" });
      } else {
        lines.push({ label: addon.name, amount: addon.price });
      }
    }

    const oneTime = lines.reduce((sum, line) => {
      if (line.note === "/mån") return sum;
      if (line.amount == null) return sum;
      return sum + line.amount;
    }, 0);

    const hasOffert = selectedPackage.priceFrom == null;
    const extrasOnly = oneTime - (selectedPackage.priceFrom ?? 0);

    let low: number | null = null;
    let high: number | null = null;

    if (!hasOffert) {
      const extras = Math.max(0, extrasOnly);
      if (selectedPackage.id === "starter") {
        low = PRICES.packages.starter + extras;
        high = PRICES.packages.starterHigh + extras;
      } else if (selectedPackage.id === "business") {
        low = PRICES.packages.business + extras;
        high = PRICES.packages.businessHigh + extras;
      } else if (selectedPackage.id === "premium") {
        low = PRICES.packages.premium + extras;
        high = PRICES.packages.premiumHigh + extras;
      } else {
        low = Math.max(0, Math.round(oneTime * 0.88));
        high = Math.round(oneTime * 1.12);
      }
    }

    return { lines, oneTime, monthly, hasOffert, low, high };
  }, [selectedPackage, selectedAddons, extraPages, pagesCost]);

  const contactHref = useMemo(() => {
    const parts: string[] = [
      "Hej! Jag har använt priskalkylatorn på paket-sidan:",
    ];

    parts.push(
      selectedPackage.priceFrom != null
        ? `• Paket: ${selectedPackage.name} (${formatSek(selectedPackage.priceFrom)} kr)`
        : `• Paket: ${selectedPackage.name} (offert)`,
    );
    parts.push(`• Antal sidor: ${pageCount}`);
    if (extraPages > 0) {
      parts.push(
        `• Extra sidor utöver paketet: ${extraPages} × ${formatSek(extraPagePrice)} kr`,
      );
    }
    for (const id of selectedAddons) {
      const addon = featureAddons.find((a) => a.id === id);
      if (!addon) continue;
      parts.push(`• ${addon.name}: ${addon.priceLabel}`);
    }

    if (summary.hasOffert) {
      parts.push(
        `Uppskattat tillägg: ${formatSek(summary.oneTime)} kr${summary.monthly > 0 ? ` + ${formatSek(summary.monthly)} kr/mån` : ""} (paket enligt offert).`,
      );
    } else if (summary.low != null && summary.high != null) {
      parts.push(
        `Uppskattat intervall: ${formatSek(summary.low)}–${formatSek(summary.high)} kr${summary.monthly > 0 ? ` + ${formatSek(summary.monthly)} kr/mån` : ""}.`,
      );
    }

    parts.push("Hör gärna av dig så raffinerar vi scope.");
    return `/kontakt?meddelande=${encodeURIComponent(parts.join("\n"))}`;
  }, [
    selectedPackage,
    pageCount,
    extraPages,
    selectedAddons,
    summary.hasOffert,
    summary.oneTime,
    summary.monthly,
    summary.low,
    summary.high,
  ]);

  const pageHint =
    includedPages == null
      ? "Obegränsat antal sidor ingår i Full Service / Enterprise."
      : pageCount <= includedPages
        ? `${includedPages} sidor ingår i ${selectedPackage.name}.`
        : `${extraPages} sidor utöver paketet × ${formatSek(extraPagePrice)} kr.`;

  return (
    <section id="paket" className="relative bg-surface">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        <Reveal>
          <SectionLabel>Paket</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-h2">
            Fast pris innan vi börjar.
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            Välj paket nedan — eller använd kalkylatorn för att se hur sidor och
            tillägg påverkar priset.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {packages.map((pkg, i) => {
            const open = openId === pkg.id;
            const selected = selectedId === pkg.id;
            return (
              <Reveal key={pkg.id} delay={i * 60}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-lg border bg-canvas p-6 transition-[border-color] duration-150 ${
                    selected
                      ? "border-brand"
                      : pkg.recommended
                        ? "border-brand/40"
                        : "border-line hover:border-ink/20"
                  }`}
                >
                  {pkg.recommended ? (
                    <span className="absolute top-4 right-4 rounded-md bg-brand px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
                      Vanligast
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
                  <p className="mt-4 text-sm font-medium text-ink">{pkg.pages}</p>

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

                  <button
                    type="button"
                    onClick={() => selectPackage(pkg.id)}
                    aria-pressed={selected}
                    className={`mt-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-150 ${
                      selected
                        ? "bg-brand text-white hover:bg-brand-dark"
                        : "border border-line bg-surface font-medium text-ink hover:border-ink/25"
                    }`}
                  >
                    {selected ? (
                      <>
                        Vald
                        <span aria-hidden="true">✓</span>
                      </>
                    ) : (
                      <>
                        Välj {pkg.name}
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Priskalkylator — webbdev-stil */}
        <Reveal>
          <div
            id="priskalkylator"
            className="mt-20 scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-canvas shadow-card"
          >
            <div className="border-b border-line bg-mist/60 px-6 py-8 lg:px-10">
              <p className="text-eyebrow font-semibold tracking-[0.12em] text-brand uppercase">
                Priskalkylator
              </p>
              <h3 className="mt-3 text-h2 tracking-tight">
                Vad kostar din hemsida?
              </h3>
              <p className="mt-3 max-w-2xl text-muted">
                Dra i sidantalet och bocka tillägg — så får du ett ungefärligt
                intervall på några sekunder.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1.35fr_1fr]">
              <div className="space-y-10 p-6 lg:p-10">
                <div>
                  <p className="text-sm font-semibold text-ink">Typ av sida</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {(
                      [
                        {
                          id: "starter" as const,
                          label: "Landningssida",
                          hint: "En sida som säljer",
                        },
                        {
                          id: "business" as const,
                          label: "Företagssida",
                          hint: "Flera sidor, presenterar verksamheten",
                        },
                        {
                          id: "premium" as const,
                          label: "Webbshop",
                          hint: "Sälj produkter online",
                        },
                      ] as const
                    ).map((type) => {
                      const on = selectedId === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => selectPackage(type.id)}
                          className={`rounded-2xl border p-4 text-left transition-all duration-200 ease-out ${
                            on
                              ? "border-brand bg-brand-tint shadow-card"
                              : "border-line bg-surface hover:border-brand/40"
                          }`}
                        >
                          <p className="font-semibold text-ink">{type.label}</p>
                          <p className="mt-1 text-sm text-muted">{type.hint}</p>
                        </button>
                      );
                    })}
                  </div>
                  {selectedId === "enterprise" ? (
                    <p className="mt-3 text-sm text-muted">
                      Enterprise valt ovan — pris enligt offert. Du kan fortfarande
                      lägga till funktioner som riktlinje.
                    </p>
                  ) : null}
                </div>

                <div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm font-semibold text-ink">Antal sidor</p>
                    <p className="text-lg font-semibold tabular-nums text-brand">
                      {pageCount} {pageCount === 1 ? "sida" : "sidor"}
                    </p>
                  </div>
                  <input
                    type="range"
                    min={PAGE_MIN}
                    max={PAGE_MAX}
                    value={pageCount}
                    onChange={(e) => setPageCount(Number(e.target.value))}
                    className="mt-4 w-full accent-brand"
                    aria-label="Antal sidor"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted">
                    <span>{PAGE_MIN}</span>
                    <span>{PAGE_MAX}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted">{pageHint}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Extra funktioner
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {featureAddons.map((addon) => {
                      const on = selectedAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          aria-pressed={on}
                          className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                            on
                              ? "border-brand bg-brand text-white"
                              : "border-line bg-surface text-ink hover:border-ink/20"
                          }`}
                        >
                          <span aria-hidden="true">{on ? "✓" : "+"}</span>
                          {addon.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <aside className="flex flex-col justify-between border-t border-line bg-mist/40 p-6 lg:border-t-0 lg:border-l lg:p-10">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Uppskattat pris
                  </p>
                  {summary.hasOffert ? (
                    <p className="mt-4 text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
                      Offert
                      {summary.oneTime > 0 || summary.monthly > 0 ? (
                        <span className="mt-2 block text-lg font-medium text-muted">
                          + {formatSek(summary.oneTime)} kr
                          {summary.monthly > 0
                            ? ` + ${formatSek(summary.monthly)} kr/mån`
                            : ""}
                        </span>
                      ) : null}
                    </p>
                  ) : (
                    <p className="mt-4 text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
                      {formatSek(summary.low!)}–
                      <span className="whitespace-nowrap">
                        {formatSek(summary.high!)} kr
                      </span>
                      {summary.monthly > 0 ? (
                        <span className="mt-2 block text-lg font-medium text-muted">
                          + {formatSek(summary.monthly)} kr/mån
                        </span>
                      ) : null}
                    </p>
                  )}

                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {summary.lines.map((line) => (
                      <li
                        key={line.label}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <span className="text-muted">{line.label}</span>
                        <span className="shrink-0 font-medium tabular-nums text-ink">
                          {line.amount == null
                            ? (line.note ?? "Offert")
                            : `${formatSek(line.amount)} kr${line.note === "/mån" ? "/mån" : ""}`}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-sm text-muted">
                    Ungefärligt intervall — exakt pris får du i offerten.
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href={contactHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-dark"
                  >
                    Få exakt offert
                    <span aria-hidden="true">→</span>
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted">
                    Inget köptvång · Svar inom två arbetsdagar
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

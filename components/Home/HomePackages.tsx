"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  packageAddons,
  packages,
  type PackageId,
} from "@/lib/packages";
import { formatSek } from "@/lib/pricing";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";

export function HomePackages() {
  const [selectedId, setSelectedId] = useState<PackageId | null>("business");
  const [openId, setOpenId] = useState<PackageId | null>("business");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [extraPages, setExtraPages] = useState(0);

  const selectedPackage = packages.find((p) => p.id === selectedId) ?? null;

  const toggleAddon = (id: string) => {
    if (id === "extra-pages") return;
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const setExtraPageCount = (next: number) => {
    const value = Math.max(0, next);
    setExtraPages(value);
  };

  const summary = useMemo(() => {
    const lines: { label: string; amount: number | null; note?: string }[] = [];

    if (selectedPackage) {
      lines.push({
        label: `Paket ${selectedPackage.name}`,
        amount: selectedPackage.priceFrom,
        note: selectedPackage.priceFrom == null ? "Offert" : undefined,
      });
    }

    const extraPagesAddon = packageAddons.find((a) => a.id === "extra-pages");
    if (extraPages > 0 && extraPagesAddon) {
      lines.push({
        label: `Extra sidor × ${extraPages}`,
        amount: extraPages * extraPagesAddon.price,
      });
    }

    let monthly = 0;
    for (const addon of packageAddons) {
      if (addon.billing === "perPage") continue;
      if (!selectedAddons.includes(addon.id)) continue;
      if (addon.billing === "monthly") {
        monthly += addon.price;
        lines.push({
          label: addon.name,
          amount: addon.price,
          note: "/mån",
        });
      } else {
        lines.push({
          label: addon.name,
          amount: addon.price,
        });
      }
    }

    const oneTime = lines.reduce((sum, line) => {
      if (line.note === "/mån") return sum;
      if (line.amount == null) return sum;
      return sum + line.amount;
    }, 0);

    const hasOffert = selectedPackage?.priceFrom == null;

    return { lines, oneTime, monthly, hasOffert };
  }, [selectedPackage, selectedAddons, extraPages]);

  const hasSelection =
    selectedPackage != null ||
    selectedAddons.length > 0 ||
    extraPages > 0;

  const contactHref = useMemo(() => {
    if (!hasSelection) return "/kontakt";

    const parts: string[] = ["Hej! Jag har satt ihop följande på paket-sidan:"];

    if (selectedPackage) {
      parts.push(
        selectedPackage.priceFrom != null
          ? `• Paket: ${selectedPackage.name} (${formatSek(selectedPackage.priceFrom)} kr)`
          : `• Paket: ${selectedPackage.name} (offert)`,
      );
    }
    if (extraPages > 0) {
      parts.push(
        `• Extra sidor: ${extraPages} × ${formatSek(packageAddons.find((a) => a.id === "extra-pages")!.price)} kr`,
      );
    }
    for (const id of selectedAddons) {
      const addon = packageAddons.find((a) => a.id === id);
      if (!addon) continue;
      parts.push(`• ${addon.name}: ${addon.priceLabel}`);
    }

    if (summary.hasOffert) {
      parts.push(
        `Uppskattat tillägg: ${formatSek(summary.oneTime)} kr${summary.monthly > 0 ? ` + ${formatSek(summary.monthly)} kr/mån` : ""} (paket enligt offert).`,
      );
    } else if (summary.oneTime > 0 || summary.monthly > 0) {
      parts.push(
        `Uppskattat totalt: ${formatSek(summary.oneTime)} kr${summary.monthly > 0 ? ` + ${formatSek(summary.monthly)} kr/mån` : ""}.`,
      );
    }

    parts.push("Hör gärna av dig så raffinerar vi scope.");
    return `/kontakt?meddelande=${encodeURIComponent(parts.join("\n"))}`;
  }, [
    hasSelection,
    selectedPackage,
    selectedAddons,
    extraPages,
    summary.hasOffert,
    summary.oneTime,
    summary.monthly,
  ]);

  return (
    <section id="paket" className="relative bg-surface">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        <Reveal>
          <SectionLabel>Paket</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-h2">
            Välj nivå. Bygg vidare med tillägg.
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            Välj ett paket och de tillägg du behöver — så ser du ett uppskattat
            slutpris direkt. Vi raffinerar scope i samtalet.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {packages.map((pkg, i) => {
            const open = openId === pkg.id;
            const selected = selectedId === pkg.id;
            return (
              <Reveal key={pkg.id} delay={i * 60}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-canvas p-6 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift ${
                    selected
                      ? "border-brand ring-2 ring-brand/25"
                      : pkg.recommended
                        ? "border-brand/50"
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
                    onClick={() =>
                      setSelectedId((prev) => (prev === pkg.id ? null : pkg.id))
                    }
                    aria-pressed={selected}
                    className={`mt-auto inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-medium transition-all duration-200 ease-out active:scale-[0.98] ${
                      selected
                        ? "bg-brand text-white shadow-brand hover:bg-brand-dark"
                        : "border border-line bg-surface text-ink hover:border-brand hover:text-brand"
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

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
          <Reveal>
            <div>
              <h3 className="text-h3 tracking-tight">Tillägg</h3>
              <p className="mt-2 max-w-xl text-muted">
                Bocka det du behöver. Extra sidor lägger du till med plus och
                minus.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {packageAddons.map((addon) => {
                  if (addon.billing === "perPage") {
                    const on = extraPages > 0;
                    return (
                      <div
                        key={addon.id}
                        className={`rounded-xl border p-4 transition-all duration-200 ease-out ${
                          on
                            ? "border-brand bg-brand-tint shadow-card"
                            : "border-line bg-canvas"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-ink">{addon.name}</p>
                            <p className="mt-1 text-sm text-muted">
                              {addon.description}
                            </p>
                            <p className="mt-3 text-sm font-medium text-brand">
                              {addon.priceLabel}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setExtraPageCount(extraPages - 1)}
                            disabled={extraPages === 0}
                            aria-label="Ta bort en sida"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-lg font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            −
                          </button>
                          <span
                            className="min-w-10 text-center text-lg font-semibold tabular-nums text-ink"
                            aria-live="polite"
                          >
                            {extraPages}
                          </span>
                          <button
                            type="button"
                            onClick={() => setExtraPageCount(extraPages + 1)}
                            aria-label="Lägg till en sida"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-lg font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                          >
                            +
                          </button>
                          {extraPages > 0 ? (
                            <span className="text-sm text-muted">
                              = {formatSek(extraPages * addon.price)} kr
                            </span>
                          ) : null}
                        </div>
                      </div>
                    );
                  }

                  const on = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      aria-pressed={on}
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
                      <p className="mt-1 text-sm text-muted">
                        {addon.description}
                      </p>
                      <p className="mt-3 text-sm font-medium text-brand">
                        {addon.priceLabel}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <aside className="sticky top-28 rounded-2xl border border-line bg-canvas p-6 shadow-card">
              <h3 className="text-eyebrow font-semibold tracking-[0.12em] text-ink uppercase">
                Din sammanställning
              </h3>

              {!hasSelection ? (
                <p className="mt-4 text-sm text-muted">
                  Välj ett paket och eventuella tillägg — då dyker slutpriset upp
                  här.
                </p>
              ) : (
                <>
                  <ul className="mt-5 space-y-3 border-b border-line pb-5">
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

                  <div className="mt-5">
                    <p className="text-sm text-muted">Uppskattat totalt</p>
                    {summary.hasOffert ? (
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                        Offert
                        {summary.oneTime > 0 || summary.monthly > 0 ? (
                          <span className="mt-1 block text-base font-medium text-muted">
                            + {formatSek(summary.oneTime)} kr
                            {summary.monthly > 0
                              ? ` + ${formatSek(summary.monthly)} kr/mån`
                              : ""}{" "}
                            i tillägg
                          </span>
                        ) : null}
                      </p>
                    ) : (
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                        {formatSek(summary.oneTime)} kr
                        {summary.monthly > 0 ? (
                          <span className="mt-1 block text-base font-medium text-muted">
                            + {formatSek(summary.monthly)} kr/mån
                          </span>
                        ) : null}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted">
                      Ungefärligt pris innan vi raffinerar scope tillsammans.
                    </p>
                  </div>
                </>
              )}

              <Link
                href={contactHref}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-brand px-5 py-3.5 text-sm font-medium text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark active:scale-[0.98]"
              >
                Starta med detta
                <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

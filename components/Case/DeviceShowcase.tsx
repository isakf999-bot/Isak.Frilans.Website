"use client";

import { useEffect, useState } from "react";
import type { CaseStudy } from "@/lib/cases";

/**
 * Enhets-showcase: den nya sajten i en laptop + en mobil bredvid varandra, och
 * den gamla sajten som liten "före"-thumbnail i hörnet.
 *
 * Skärmdumparna är fullsides-bilder som GÅR ATT SCROLLA inuti ramarna — man kan
 * alltså bläddra igenom hela sajten direkt i laptopen och mobilen. Klick på
 * "före"-bilden öppnar den i större format som också går att scrolla.
 */
export function DeviceShowcase({ study }: { study: CaseStudy }) {
  const { images } = study;
  const [beforeOpen, setBeforeOpen] = useState(false);

  return (
    <div>
      <div className="relative mx-auto max-w-4xl px-2 pt-10 sm:pt-6">
        {/* Laptop — scrollbar */}
        <div className="mx-auto w-[86%] sm:w-[82%]">
          <Laptop>
            <ScrollShot
              src={images.afterDesktop}
              alt={`${study.client} — nya sajten`}
            />
          </Laptop>
        </div>

        {/* Mobil — scrollbar dold så bilden fyller full bredd (ingen vit rad) */}
        <div className="absolute right-1 -bottom-4 w-[24%] max-w-[140px] sm:-bottom-2 sm:right-6">
          <Phone>
            <ScrollShot
              src={images.afterMobile}
              alt={`${study.client} — nya sajten i mobil`}
              bare
            />
          </Phone>
        </div>

        {/* "Före"-thumbnail — klickbar, öppnas större */}
        <figure className="absolute -top-1 left-0 w-[27%] max-w-[160px] -rotate-3 sm:left-2">
          <button
            type="button"
            onClick={() => setBeforeOpen(true)}
            className="group block w-full overflow-hidden rounded-md border border-line bg-surface text-left shadow-lift transition-transform duration-200 ease-out hover:-rotate-1 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <div className="flex items-center justify-between bg-ink px-2 py-1">
              <span className="text-[9px] font-semibold tracking-wide text-white/80 uppercase">
                Före
              </span>
              <span className="text-[9px] text-white/60 transition-colors group-hover:text-white">
                förstora ⤢
              </span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              {images.before ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images.before}
                  alt={`${study.client} — gamla sajten`}
                  className="block w-full"
                />
              ) : (
                <div className="grid h-full place-items-center bg-canvas text-[9px] text-muted">
                  före
                </div>
              )}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </button>
        </figure>
      </div>

      <p className="mt-9 text-center text-sm text-muted">
        <span aria-hidden="true">↕</span> Skärmdumparna går att scrolla — bläddra
        igenom hela sajten
      </p>

      {beforeOpen && images.before && (
        <BeforeModal
          src={images.before}
          client={study.client}
          onClose={() => setBeforeOpen(false)}
        />
      )}
    </div>
  );
}

/**
 * Fullsides-skärmdump i en scrollbar behållare som fyller ramens skärm.
 * `bare` döljer scrollbaren helt (för mobilen — så bilden fyller full bredd och
 * det inte blir en vit rad längs kanten).
 */
function ScrollShot({
  src,
  alt,
  bare = false,
}: {
  src?: string;
  alt: string;
  bare?: boolean;
}) {
  if (!src) {
    return (
      <div className="grid h-full w-full place-items-center bg-canvas text-xs text-muted">
        Skärmdump saknas
      </div>
    );
  }
  return (
    <div
      className={`absolute inset-0 overflow-y-auto overscroll-contain ${
        bare
          ? "[&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          : "scroll-shot"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

function Laptop({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="rounded-[12px] border border-white/10 bg-gradient-to-b from-[#2b2d36] to-[#16171d] p-[5px] shadow-lift sm:rounded-[16px] sm:p-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-canvas sm:rounded-[11px]">
          {children}
        </div>
      </div>
      <div className="relative mx-auto h-2.5 w-[110%] -translate-x-[4.5%] rounded-b-[10px] bg-gradient-to-b from-[#cbcdd4] to-[#a6a8b1] sm:h-3.5">
        <div className="absolute top-0 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-b-lg bg-black/15 sm:w-24" />
      </div>
    </div>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-[1.4rem] border border-white/10 bg-gradient-to-b from-[#2b2d36] to-[#16171d] p-[3px] shadow-lift sm:rounded-[1.8rem] sm:p-1.5">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.15rem] bg-canvas sm:rounded-[1.5rem]">
        <div className="absolute top-1.5 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/30" />
        {children}
      </div>
    </div>
  );
}

/** Förstorad, scrollbar vy av den gamla sajten. */
function BeforeModal({
  src,
  client,
  onClose,
}: {
  src: string;
  client: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gamla sajten för ${client}`}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-lift"
      >
        <div className="flex items-center justify-between border-b border-line bg-canvas px-4 py-3">
          <span className="text-sm font-semibold">
            Före
            <span className="ml-2 font-normal text-muted">
              gamla sajten — scrolla igenom
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Stäng"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition-colors duration-200 ease-out hover:border-ink hover:text-ink"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${client} — gamla sajten, hela sidan`}
            className="block w-full"
          />
        </div>
      </div>
    </div>
  );
}

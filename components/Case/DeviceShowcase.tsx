import Image from "next/image";
import type { CaseStudy } from "@/lib/cases";

/**
 * Enhets-showcase: sajten inramad i en laptop + en mobil bredvid varandra
 * (kommunicerar "modern och responsiv" på en gång), en liten "före"-thumbnail
 * i hörnet och en knapp till den live-satta sajten.
 *
 * Finns riktiga skärmdumpar i case.images visas de i ramarna — annars visas
 * snygga stand-in-mockuper så layouten är komplett direkt.
 */
export function DeviceShowcase({ study }: { study: CaseStudy }) {
  const { images, liveUrl } = study;
  const hasLive = liveUrl && liveUrl !== "#";

  return (
    <div>
      <div className="relative mx-auto max-w-4xl px-2 pt-10 sm:pt-6">
        {/* Laptop */}
        <div className="mx-auto w-[86%] sm:w-[82%]">
          <Laptop>
            {images.afterDesktop ? (
              <Image
                src={images.afterDesktop}
                alt={`${study.client} — ny sajt, desktop`}
                fill
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-cover object-top"
              />
            ) : (
              <AdvisorMock />
            )}
          </Laptop>
        </div>

        {/* Mobil — överlappar nedre högra hörnet */}
        <div className="absolute -bottom-4 right-1 w-[24%] max-w-[140px] sm:right-6 sm:-bottom-2">
          <Phone>
            {images.afterMobile ? (
              <Image
                src={images.afterMobile}
                alt={`${study.client} — ny sajt, mobil`}
                fill
                sizes="140px"
                className="object-cover object-top"
              />
            ) : (
              <AdvisorMock compact />
            )}
          </Phone>
        </div>

        {/* "Före"-thumbnail — liten, lätt lutad, uppe till vänster */}
        <figure className="absolute -top-1 left-0 w-[26%] max-w-[150px] -rotate-3 sm:left-2">
          <div className="overflow-hidden rounded-md border border-line bg-surface shadow-lift">
            <div className="flex items-center justify-between bg-ink px-2 py-1">
              <span className="text-[9px] font-semibold tracking-wide text-white/80 uppercase">
                Före
              </span>
            </div>
            <div className="aspect-[4/3]">
              {images.before ? (
                <div className="relative h-full w-full">
                  <Image
                    src={images.before}
                    alt={`${study.client} — gamla sajten`}
                    fill
                    sizes="150px"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <BeforeMock />
              )}
            </div>
          </div>
        </figure>
      </div>

      {/* Live-knapp */}
      <div className="mt-10 flex justify-center">
        <a
          href={hasLive ? liveUrl : undefined}
          {...(hasLive
            ? { target: "_blank", rel: "noopener noreferrer" }
            : { "aria-disabled": true })}
          className={`shine group inline-flex items-center gap-2.5 rounded-pill bg-brand px-7 py-4 font-medium text-white shadow-brand transition-all duration-200 ease-out ${
            hasLive
              ? "hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lift active:translate-y-0"
              : "cursor-not-allowed opacity-60"
          }`}
        >
          {hasLive ? "Besök sajten live" : "Live-länk läggs till"}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      </div>
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
      {/* Bas / gångjärn */}
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

/** Stand-in för en modern rådgivar-sajt. Byts mot riktig skärmdump. */
function AdvisorMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-white to-canvas p-3 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold tracking-tight sm:text-sm">
          Rådgivning
        </span>
        <span className="rounded-pill bg-ink px-2 py-0.5 text-[7px] text-white sm:text-[10px]">
          Boka möte
        </span>
      </div>

      <div className="mt-auto">
        <p className="text-[7px] font-medium tracking-wide text-brand uppercase sm:text-[10px]">
          PPM · ISK
        </p>
        <h4 className="mt-1 text-[13px] leading-[1.1] font-semibold tracking-tight text-ink sm:text-2xl">
          Trygg rådgivning
          <br />
          för ditt sparande.
        </h4>
        {!compact && (
          <p className="mt-2 hidden text-[10px] text-muted sm:block">
            Oberoende vägledning för PPM och ISK — långsiktigt och tydligt.
          </p>
        )}
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="rounded-pill bg-brand px-2.5 py-1 text-[8px] font-medium text-white sm:px-3 sm:py-1.5 sm:text-xs">
          Kom igång →
        </span>
        <svg
          viewBox="0 0 120 40"
          aria-hidden="true"
          className={`h-8 w-20 text-brand sm:h-10 sm:w-28 ${compact ? "hidden" : ""}`}
        >
          <polyline
            points="0,34 20,27 40,30 60,17 80,21 100,8 118,11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/** Stand-in för den gamla WordPress-sajten. Byts mot riktig "före"-skärmdump. */
function BeforeMock() {
  return (
    <div className="h-full w-full bg-[#d9d7cd] p-1.5 font-['Times_New_Roman',_serif] text-[#222]">
      <div className="bg-[#2e3a86] px-1 py-0.5 text-[6px] font-bold text-white">
        RÅDGIVNING AB
      </div>
      <p className="mt-1 text-center text-[7px] font-bold text-[#aa0000] underline">
        Välkommen!
      </p>
      <p className="mt-1 text-center text-[5px] text-[#555]">
        Senast uppdaterad 2013
      </p>
    </div>
  );
}

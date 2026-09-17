import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { HomeCases } from "@/components/Home/HomeCases";
import { Contact } from "@/components/Contact/Contact";
import { HomeFreePreview } from "@/components/Home/HomeFreePreview";
import { HomeHelp } from "@/components/Home/HomeHelp";
import { Nav } from "@/components/Nav/Nav";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function Home() {
  return (
    <>
      <Nav />
      {/*
        Startsidan: Hero → Vad jag hjälper till med → Gratis förslag
        (unikt säljargument) → Case → Kontakt. Process och FAQ har egna
        sidor (`/process`, `/faq`) och ingångar via footern och menyn.
      */}
      <main>
        <Hero />
        <HomeHelp />
        <HomeFreePreview />
        <HomeCases />
        <Contact asSection />
      </main>
      <Footer hideCta />
    </>
  );
}

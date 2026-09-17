import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { HomeCases } from "@/components/Home/HomeCases";
import { Contact } from "@/components/Contact/Contact";
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
        Startsidan följer Bravo-flödet: Hero → Vad jag hjälper till med → Case
        → Kontakt. Process och FAQ har egna sidor (`/process`, `/faq`) och
        kompletta ingångar via footern och menyn — de behöver inte upprepas
        här.
      */}
      <main>
        <Hero />
        <HomeHelp />
        <HomeCases />
        <Contact asSection />
      </main>
      <Footer hideCta />
    </>
  );
}

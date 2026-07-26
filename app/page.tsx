import { About } from "@/components/About/About";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { Nav } from "@/components/Nav/Nav";

// <BeforeAfter /> är byggd och sparad i components/BeforeAfter/ men dold tills
// det finns riktiga case att visa. Lägg tillbaka den i <main> för att aktivera.
//
// "Vad jag bygger" och "Kontakt" är egna sidor (/tjanster, /kontakt) istället
// för sektioner här — se app/tjanster/page.tsx och app/kontakt/page.tsx.

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
}

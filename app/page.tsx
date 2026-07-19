import { About } from "@/components/About/About";
import { BeforeAfter } from "@/components/BeforeAfter/BeforeAfter";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { Nav } from "@/components/Nav/Nav";
import { Services } from "@/components/Services/Services";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <BeforeAfter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { About } from "@/components/About/About";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om mig — IsakWeb",
  description:
    "Frilansande webbutvecklare i Helsingborg. Du pratar alltid med den som skriver koden.",
  alternates: { canonical: absoluteUrl("/om") },
};

export default function OmPage() {
  return (
    <>
      <Nav />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { About } from "@/components/About/About";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";

export const metadata: Metadata = {
  title: "Om mig — IsakWeb",
  description:
    "Frilansande webbutvecklare i Helsingborg. Du pratar alltid med den som skriver koden.",
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

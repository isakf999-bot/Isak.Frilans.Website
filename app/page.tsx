import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { Nav } from "@/components/Nav/Nav";
import { Services } from "@/components/Services/Services";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import { HomeFaq } from "@/components/Home/HomeFaq";
import { HomePackages } from "@/components/Home/HomePackages";
import { HomeProcess } from "@/components/Home/HomeProcess";
import { HomeTrust } from "@/components/Home/HomeTrust";
import { HomeValue } from "@/components/Home/HomeValue";
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
        <HomeValue />
        <Services />
        <HomeTrust />
        <HomeProcess />
        <HomePackages />
        <HomeFaq />
      </main>
      <Footer />
    </>
  );
}

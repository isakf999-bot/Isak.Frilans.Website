import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Chatbot } from "@/components/Chatbot/Chatbot";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "IsakWeb",
      description:
        "Frilansande fullstack-utvecklare i Helsingborg. Snabba, moderna hemsidor åt svenska företag.",
      inLanguage: "sv-SE",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Isak Forsberg",
      url: SITE_URL,
      email: "info@isakweb.se",
      telephone: "+46762514121",
      jobTitle: "Webbutvecklare",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Helsingborg",
        addressCountry: "SE",
      },
      sameAs: [
        "https://isakforsberg.se/",
        "https://instagram.com/isakforsberg11",
        "https://x.com/FoppaCS",
        "https://www.facebook.com/isak.forsberg.31",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "IsakWeb",
      url: SITE_URL,
      image: `${SITE_URL}/og.jpg`,
      description:
        "Webbutveckling, landningssidor, e-handel och skräddarsydda system för svenska företag.",
      areaServed: "SE",
      priceRange: "$$",
      founder: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IsakWeb — Webbplatser som får företag att växa",
    template: "%s | IsakWeb",
  },
  description:
    "Frilansande fullstack-utvecklare i Helsingborg. Jag bygger snabba, moderna hemsidor, e-handel och system åt svenska företag — med fast pris och direktkontakt.",
  keywords: [
    "IsakWeb",
    "Isak Web",
    "webbutvecklare",
    "frilans",
    "hemsida",
    "e-handel",
    "landningssida",
    "företagssajt",
    "Helsingborg",
    "Sverige",
  ],
  authors: [{ name: "Isak Forsberg", url: "https://isakforsberg.se/" }],
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: SITE_URL,
    siteName: "IsakWeb",
    title: "IsakWeb — Webbplatser som får företag att växa",
    description:
      "Snabba, moderna sajter åt svenska företag. Du pratar med den som bygger — inte en projektledare.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "IsakWeb — webbplatser som får företag att växa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IsakWeb — Webbplatser som får företag att växa",
    description:
      "Snabba, moderna sajter åt svenska företag. Du pratar med den som bygger.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${geistMono.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{document.documentElement.classList.remove('dark');localStorage.removeItem('theme')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Chatbot />
        <div className="grain" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}

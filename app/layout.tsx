import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import "./globals.css";

/** Körs innan paint så dark mode inte blinkar ljust vid sidladdning. */
const THEME_BOOT =
  "(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://isak-frilans.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Isak Web — Frilansande webbutvecklare",
  description:
    "Jag bygger landningssidor, e-handel och företagssajter åt små företag. Enskild firma, direktkontakt, inga mellanhänder. Hör av dig så tar vi ett samtal.",
  keywords: [
    "Isak Web",
    "webbutvecklare",
    "frilans",
    "hemsida",
    "e-handel",
    "landningssida",
    "företagssajt",
    "Sverige",
  ],
  authors: [{ name: "Isak Forsberg", url: "https://isakforsberg.se/" }],
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: SITE_URL,
    siteName: "Isak Web",
    title: "Isak Web — Frilansande webbutvecklare",
    description:
      "Landningssidor, e-handel och företagssajter åt små företag. Du pratar med den som bygger sajten — inte en projektledare.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isak Web — Frilansande webbutvecklare",
    description:
      "Landningssidor, e-handel och företagssajter åt små företag. Du pratar med den som bygger sajten.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Tema först (undviker flash), sedan .js för scroll-reveal. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <ThemeProvider>
          {children}
          {/* Hårfin film-grain över hela sidan — tar bort den platta digitala
              känslan. Statisk, låg opacitet, fångar aldrig klick. */}
          <div className="grain" aria-hidden="true" />
        </ThemeProvider>
        {/* Vercel Web Analytics — anonym besöksstatistik, laddas efter
            innehållet och påverkar inte layouten. */}
        <Analytics />
      </body>
    </html>
  );
}

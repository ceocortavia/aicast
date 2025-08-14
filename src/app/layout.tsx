import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import GradientBackground from "@/components/GradientBackground";
import ThemeToggle from "@/components/ThemeToggle";
import PlayerProvider from "@/components/player/PlayerProvider";
import MiniPlayer from "@/components/player/MiniPlayer";
import JsonLd from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AICAST – Podkast om KI",
  description:
    "Vi snakker med dem som bygger og bruker KI – fra utvikling og forskning til ledelse – og viser konkret hvordan problemer løses med KI.",
  keywords: [
    "AICAST",
    "podkast",
    "kunstlig intelligens",
    "KI",
    "AI",
    "maskinlæring",
    "teknologi",
    "samfunn",
  ],
  authors: [{ name: "AICAST" }],
  creator: "AICAST",
  publisher: "AICAST",
  openGraph: {
    title: "AICAST – Podkast om KI",
    description:
      "Vi snakker med dem som bygger og bruker KI – fra utvikling og forskning til ledelse – og viser konkret hvordan problemer løses med KI.",
    url: "/",
    siteName: "AICAST",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AICAST – Podkast om KI",
    description:
      "Vi snakker med dem som bygger og bruker KI – fra utvikling og forskning til ledelse – og viser konkret hvordan problemer løses med KI.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GradientBackground />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "PodcastSeries",
            name: "AICAST – Podkast om KI",
            url: siteUrl,
            description:
              "Vi snakker med dem som bygger og bruker KI – fra utvikling og forskning til ledelse – og viser konkret hvordan problemer løses med KI.",
            inLanguage: "no",
            sameAs: [
              "https://open.spotify.com/show/your-show-id",
              "https://podcasts.apple.com/your-show-id",
            ],
          }}
        />
        <header className="border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              AICAST
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/episodes" className="hover:underline">
                Episoder
              </Link>
              <Link href="/about" className="hover:underline">
                Om
              </Link>
              <Link href="/contact" className="hover:underline">
                Kontakt
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <PlayerProvider>
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
          <MiniPlayer />
        </PlayerProvider>
        <footer className="border-t border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} AICAST. Alle rettigheter forbeholdt.</p>
            <div className="flex items-center gap-4">
              <a className="hover:underline" href="/rss.xml">
                RSS
              </a>
              <a className="hover:underline" href="/sitemap.xml">
                Sitemap
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

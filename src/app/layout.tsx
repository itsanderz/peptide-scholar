import type { Metadata } from "next";
import { headers } from "next/headers";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { scientificTheme } from "@/lib/theme";
import { Footer } from "@/components";
import { type Locale } from "@/lib/i18n";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-libre-franklin",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-serif-4",
});

const siteTheme = {
  ...scientificTheme,
  name: "PeptideScholar",
  domain: "https://peptidescholar.com",
  tagline: "The Evidence-Based Peptide Reference",
  description:
    "Comprehensive, research-backed guide to peptides — mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
};

export const metadata: Metadata = {
  title: {
    default: "PeptideScholar | The Evidence-Based Peptide Reference",
    template: "%s | PeptideScholar",
  },
  description: siteTheme.description,
  metadataBase: new URL(siteTheme.domain),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "PeptideScholar",
    locale: "en_US",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "PeptideScholar" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"],
  },
  verification: {
    google: "NTlRiN9ONICqNTkKYBaaJxDhDpTL5wpL2-DtT8Q0Y80",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") || "en") as Locale;

  return (
    <html lang={locale}>
      <body className={`${libreFranklin.variable} ${sourceSerif4.variable} ${sourceSerif4.className} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "PeptideScholar",
          url: "https://peptidescholar.com",
          description: "Comprehensive, research-backed guide to peptides — mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
        }) }} />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          defer
          data-domain="peptidescholar.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <ThemeProvider theme={siteTheme}>
          {/* Header */}
          <header
            className="sticky top-0 z-50 border-b-2"
            style={{
              backgroundColor: "#1A3A5C",
              borderBottomColor: "#D4553A",
            }}
          >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: "#3B7A9E", color: "#FFFFFF" }}
                >
                  PS
                </div>
                <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-libre-franklin)" }}>
                  PeptideScholar
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/guide"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Guide
                </Link>
                <Link
                  href="/peptides"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Peptides
                </Link>
                <Link
                  href="/compare"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Compare
                </Link>
                <Link
                  href="/legal"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Legal Status
                </Link>
                <Link
                  href="/tools"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Free Tools
                </Link>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="min-h-[70vh]">{children}</main>

          {/* Footer */}
          <Footer
            siteName="PeptideScholar"
            links={[
              { label: "Home", href: "/" },
              { label: "Browse Peptides", href: "/peptides" },
              { label: "Compare", href: "/compare" },
              { label: "Legal", href: "/legal" },
              { label: "Tools", href: "/tools" },
              { label: "Glossary", href: "/glossary" },
              { label: "About", href: "/about" },
              { label: "Disclaimer", href: "/disclaimer" },
            ]}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { Footer, MarketSelector } from "@/components";
import { Navbar } from "@/components/Navbar";
import { buildNavConfig } from "@/lib/nav-config";
import { type Locale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import { getRequestSite } from "@/lib/request-site";
import { Analytics } from "@vercel/analytics/next";
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

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getRequestSite();

  return {
    title: {
      default: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    metadataBase: new URL(site.domain),
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
    verification: {
      google: "NTlRiN9ONICqNTkKYBaaJxDhDpTL5wpL2-DtT8Q0Y80",
    },
    robots: site.noindexByDefault
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") || "en") as Locale;
  const market = await getRequestMarket();
  const site = await getRequestSite();
  const plausibleDomain = new URL(site.domain).hostname;
  const mainSite = "https://peptidescholar.com";
  const navConfig = buildNavConfig(site.capabilities.showMainNavigation, mainSite);
  const footerColumns = site.capabilities.showMainNavigation
    ? [
        {
          heading: "Treatments",
          links: [
            { label: "All Treatments", href: "/treatments" },
            { label: "Browse Peptides", href: "/peptides" },
            { label: "Compare", href: "/compare" },
            { label: "Costs", href: "/costs" },
          ],
        },
        {
          heading: "Tools",
          links: [
            { label: "All Tools", href: "/tools" },
            { label: "Legal Status", href: "/legal" },
            { label: "Find Providers", href: "/providers" },
          ],
        },
        {
          heading: "Learn",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "Glossary", href: "/glossary" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ]
    : undefined;

  const footerLegalLinks = site.capabilities.showMainNavigation
    ? [
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Contact", href: "/contact" },
      ]
    : [
        { label: "Main Site", href: mainSite },
        { label: "Contact", href: `${mainSite}/contact` },
        { label: "Disclaimer", href: `${mainSite}/disclaimer` },
      ];

  return (
    <html lang={locale}>
      <body className={`${libreFranklin.variable} ${sourceSerif4.variable} ${sourceSerif4.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.domain,
              description: site.description,
            }),
          }}
        />
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        {site.capabilities.showAds && process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`}
          </Script>
        )}
        <ThemeProvider theme={site.theme}>
          <header
            className="sticky top-0 z-50 border-b-2"
            style={{
              backgroundColor: site.theme.colors.primary,
              borderBottomColor: site.theme.colors.accent,
            }}
          >
            <Navbar
              config={navConfig}
              accentColor={site.theme.colors.accent}
              logo={
                <Link href="/" className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: site.theme.colors.secondary, color: "#FFFFFF" }}
                  >
                    {site.shortName}
                  </div>
                  <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-libre-franklin)" }}>
                    {site.name}
                  </span>
                </Link>
              }
            >
              {site.capabilities.showMarketSelector && (
                <>
                  <span
                    className="hidden xl:inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.82)",
                      border: "1px solid rgba(255,255,255,0.14)",
                    }}
                  >
                    {market.name}
                  </span>
                  <MarketSelector currentMarket={market.code} />
                </>
              )}
            </Navbar>
          </header>

          {site.launchState !== "live" && site.betaMessage && (
            <section
              className="border-b px-4 py-3"
              style={{
                backgroundColor: "#FFFBEB",
                borderColor: "#FCD34D",
                color: "#92400E",
              }}
            >
              <div className="max-w-6xl mx-auto text-sm leading-relaxed">
                <strong className="font-semibold">Planned Site Variant:</strong> {site.betaMessage}
              </div>
            </section>
          )}

          <main className="min-h-[70vh]">{children}</main>

          <Footer
            siteName={site.name}
            columns={footerColumns}
            legalLinks={footerLegalLinks}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

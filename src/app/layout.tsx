import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter_Tight, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
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

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter-tight",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
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
  const initialPathname = headersList.get("x-pathname") || "/";
  const mainSite = "https://peptidescholar.com";
  const navConfig = buildNavConfig(site.capabilities.showMainNavigation, mainSite);
  const footerColumns = site.capabilities.showMainNavigation
    ? [
        {
          heading: "Browse",
          links: [
            { label: "All Peptides", href: "/peptides" },
            { label: "Comparisons", href: "/compare" },
            { label: "Research Blog", href: "/blog" },
            { label: "Tools", href: "/tools" },
          ],
        },
        {
          heading: "Care Paths",
          links: [
            { label: "Treatments", href: "/treatments" },
            { label: "Costs", href: "/costs" },
            { label: "Providers", href: "/providers" },
          ],
        },
        {
          heading: "Learn",
          links: [
            { label: "About", href: "/about" },
            { label: "Methodology", href: "/methodology" },
            { label: "Guide", href: "/guide" },
            { label: "Glossary", href: "/glossary" },
          ],
        },
        {
          heading: "Specialty",
          links: [
            { label: "Legal Status", href: "/legal" },
            { label: "Pets", href: "/pets" },
            { label: "Labs", href: "/labs" },
            { label: "Stack", href: "/stack" },
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
      <body className={`${interTight.variable} ${ibmPlexMono.variable} ${sourceSerif4.variable} antialiased`}>
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
          <header className="nb-header">
            <Navbar
              config={navConfig}
              accentColor={site.theme.colors.accent}
              initialPathname={initialPathname}
              logo={
                <Link href="/" className="nb-logo">
                  <div className="nb-logo-mark">
                    <span className="font-bold text-[10px]" style={{ color: "#050505" }}>
                      {site.shortName}
                    </span>
                  </div>
                  <span className="nb-logo-text text-[#edeae3]">{site.name}</span>
                </Link>
              }
            >
              {site.capabilities.showMarketSelector && (
                <div className="nb-header-utilities">
                  <span className="nb-header-market-pill hidden xl:inline-flex">
                    {market.name}
                  </span>
                  <MarketSelector currentMarket={market.code} className="nb-header-utility-control" />
                </div>
              )}
            </Navbar>
          </header>

          {site.launchState !== "live" && site.betaMessage && (
            <section className="border-b px-4 py-3" style={{ backgroundColor: "#FFFBEB", borderColor: "#FCD34D", color: "#92400E" }}>
              <div className="max-w-6xl mx-auto font-mono text-xs leading-relaxed">
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

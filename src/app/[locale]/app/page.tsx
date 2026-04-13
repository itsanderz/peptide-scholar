import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, JsonLd, MedicalDisclaimer, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { getGeneratedAppHref, getGeneratedAppLandingSummaries } from "@/lib/generated-content";
import { isValidLocale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return generateSEO({
    title: "Tracker Waitlists | PeptideScholar",
    description:
      "PeptideScholar tracker waitlists for semaglutide and tirzepatide workflows, built to validate adherence, reminder, and export demand before full app launch.",
    canonical: `${siteConfig.domain}/app`,
    siteName: siteConfig.name,
  });
}

export default async function AppIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();
  const market = await getRequestMarket();
  const pages = getGeneratedAppLandingSummaries("us");

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{ page_family: "app_index", page_slug: "app", market: market.code }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Tracker Waitlists",
          description:
            "PeptideScholar tracker waitlists for semaglutide and tirzepatide workflows.",
          url: `${siteConfig.domain}/app`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "App", href: "/app" },
          ]}
        />

        <div className="mt-6 mb-10">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F8FAFC", borderColor: "#D0D7E2", color: "#334155" }}
          >
            <span>Active market:</span>
            <span style={{ color: "#1A3A5C" }}>{market.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Tracker Waitlists
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            These pages are the first app-intent surfaces in the schema-driven content system. They are designed to
            validate real demand before the full PWA build, not to overpromise a finished app.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pages.map((page) => (
            <Link
              key={page.meta.id}
              href={getGeneratedAppHref(page.meta.slug)}
              className="rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-[0.16em] mb-3"
                style={{ color: "#3B7A9E" }}
              >
                {page.title}
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "#1A3A5C" }}>
                {page.summary}
              </h2>
              <ul className="space-y-2 text-sm mb-4" style={{ color: "#5A6577" }}>
                {page.supportedFeatures.slice(0, 3).map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <span className="font-semibold" style={{ color: "#3B7A9E" }}>
                Open tracker landing &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, JsonLd, MedicalDisclaimer, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { getGeneratedTreatmentHubSummaries, getGeneratedTreatmentHref } from "@/lib/generated-content";
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
    title: "Treatment Hubs | PeptideScholar",
    description:
      "US-first treatment hubs for approved GLP-1 pathways. Covers approved product paths, cost friction, provider routing, and tracker next steps for semaglutide and tirzepatide.",
    canonical: `${siteConfig.domain}/treatments`,
    siteName: siteConfig.name,
  });
}

export default async function TreatmentsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();
  const market = await getRequestMarket();
  const hubs = getGeneratedTreatmentHubSummaries("us");

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{ page_family: "treatment_index", page_slug: "treatments", market: market.code }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Treatment Hubs",
          description:
            "US-first treatment hubs for approved GLP-1 pathways including approved product paths, cost, provider routing, and tracker next steps.",
          url: `${siteConfig.domain}/treatments`,
        }}
      />

      <div className="treatment-index-page max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments", href: "/treatments" },
          ]}
        />

        <div className="treatment-index-hero mt-6 mb-10">
          <div className="treatment-index-market">
            <span>Active market:</span>
            <strong>{market.name}</strong>
          </div>
          <h1 className="treatment-index-title">
            Approved Treatment Hubs
          </h1>
          <p className="treatment-index-copy">
            These treatment hubs are built for US approved-treatment decision flows. Each hub covers
            the official product landscape, cost friction, provider routing, and tracker next steps
            in one structured, source-backed page.
          </p>
        </div>

        {market.code !== "us" && (
          <div className="treatment-index-note">
            <div className="treatment-index-note-label">
              Market Note
            </div>
            <div className="treatment-index-note-copy">
              {market.name} is selected. These hubs are currently US-first and reflect US approval
              and coverage logic. Use them as a reference while localized treatment pathways remain
              staged.
            </div>
          </div>
        )}

        <div className="treatment-index-grid">
          {hubs.map((hub) => (
            <Link
              key={hub.meta.id}
              href={getGeneratedTreatmentHref(hub.meta.slug)}
              className="treatment-index-card"
            >
              <div className="treatment-index-card-kicker">
                {hub.treatmentName}
              </div>
              <h2 className="treatment-index-card-title">
                {hub.seo.title}
              </h2>
              <p className="treatment-index-card-copy">
                {hub.marketSummary}
              </p>
              <div className="treatment-index-card-meta">
                <div>
                  <strong>Approved products:</strong>{" "}
                  <span>
                    {hub.approvedProducts.map((p) => p.name).join(", ")}
                  </span>
                </div>
                <div>
                  <strong>Routes:</strong>{" "}
                  <span>{hub.routes.join(", ")}</span>
                </div>
              </div>
              <span className="treatment-index-card-link">
                Open treatment hub &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="treatment-index-disclaimer mt-10">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}

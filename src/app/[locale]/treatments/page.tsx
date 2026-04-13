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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments", href: "/treatments" },
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
            Approved Treatment Hubs
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            These treatment hubs are built for US approved-treatment decision flows. Each hub covers
            the official product landscape, cost friction, provider routing, and tracker next steps
            in one structured, source-backed page.
          </p>
        </div>

        {market.code !== "us" && (
          <div
            className="rounded-xl p-4 mb-8"
            style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C] mb-2">
              Market Note
            </div>
            <div className="text-sm md:text-base text-[#9A3412]">
              {market.name} is selected. These hubs are currently US-first and reflect US approval
              and coverage logic. Use them as a reference while localized treatment pathways remain
              staged.
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {hubs.map((hub) => (
            <Link
              key={hub.meta.id}
              href={getGeneratedTreatmentHref(hub.meta.slug)}
              className="rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: "#3B7A9E" }}>
                {hub.treatmentName}
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "#1A3A5C" }}>
                {hub.seo.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A6577" }}>
                {hub.marketSummary}
              </p>
              <div className="grid gap-3 text-sm mb-4">
                <div>
                  <strong style={{ color: "#1C2028" }}>Approved products:</strong>{" "}
                  <span style={{ color: "#5A6577" }}>
                    {hub.approvedProducts.map((p) => p.name).join(", ")}
                  </span>
                </div>
                <div>
                  <strong style={{ color: "#1C2028" }}>Routes:</strong>{" "}
                  <span style={{ color: "#5A6577" }}>{hub.routes.join(", ")}</span>
                </div>
              </div>
              <span className="font-semibold" style={{ color: "#3B7A9E" }}>
                Open treatment hub &rarr;
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

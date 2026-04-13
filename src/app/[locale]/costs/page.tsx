import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, JsonLd, MedicalDisclaimer, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { getGeneratedCostSummaries, getGeneratedCostHref } from "@/lib/generated-content";
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
    title: "Treatment Cost Guides | PeptideScholar",
    description:
      "US-first treatment cost guides for high-intent GLP-1 pathways, including official savings, insurance friction, and provider-routing next steps.",
    canonical: `${siteConfig.domain}/costs`,
    siteName: siteConfig.name,
  });
}

export default async function CostsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();
  const market = await getRequestMarket();
  const pages = getGeneratedCostSummaries("us");

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "cost_index", page_slug: "costs", market: market.code }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Treatment Cost Guides",
          description:
            "US-first treatment cost guides covering official savings, insurance friction, and provider-routing next steps.",
          url: `${siteConfig.domain}/costs`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Costs", href: "/costs" },
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
            Treatment Cost Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            These first cost pages are built for US treatment intent and only use structured, reviewed content. They
            are meant to help users evaluate pricing friction, insurance realities, and the safest next step before
            entering a provider flow.
          </p>
        </div>

        <div
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B45309] mb-2">
            Validation Note
          </div>
          <div className="text-sm md:text-base text-[#92400E]">
            These pages summarize official savings and regulatory sources, but real out-of-pocket cost still depends on
            brand, dose, insurance design, prescribing path, and pharmacy fulfillment.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pages.map((page) => (
            <Link
              key={page.meta.id}
              href={getGeneratedCostHref(page.meta.slug)}
              className="rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: "#3B7A9E" }}>
                {page.treatmentName}
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "#1A3A5C" }}>
                {page.seo.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A6577" }}>
                {page.marketSummary}
              </p>
              <div className="grid gap-3 text-sm mb-4">
                <div>
                  <strong style={{ color: "#1C2028" }}>Coverage:</strong>{" "}
                  <span style={{ color: "#5A6577" }}>{page.insuranceSummary}</span>
                </div>
                <div>
                  <strong style={{ color: "#1C2028" }}>Savings:</strong>{" "}
                  <span style={{ color: "#5A6577" }}>{page.couponSummary}</span>
                </div>
              </div>
              <span className="font-semibold" style={{ color: "#3B7A9E" }}>
                Open cost guide &rarr;
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

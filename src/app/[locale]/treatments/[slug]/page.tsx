import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BreadcrumbNav,
  FAQ,
  JsonLd,
  MedicalDisclaimer,
  PageTracker,
  ProviderIntentCard,
  SourceCitationList,
  TreatmentMoneyLinks,
  AffiliateProductGrid,
} from "@/components";
import { affiliateCatalog } from "@/data/affiliate-products";
import { generateSEO } from "@/components/SEOHead";
import { EditorialTreatmentView } from "@/components/editorial/EditorialTreatmentView";
import {
  getGeneratedTreatmentHubContent,
  getGeneratedTreatmentHubSlugs,
} from "@/lib/generated-content";
import { isValidLocale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

const EDITORIAL_PILOT_SLUGS = new Set(["semaglutide"]);

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getGeneratedTreatmentHubSlugs("us").map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || locale !== "en") return {};
  const hub = getGeneratedTreatmentHubContent(slug, "us");
  if (!hub) return {};

  return generateSEO({
    title: hub.seo.title,
    description: hub.seo.description,
    canonical: `${siteConfig.domain}${hub.seo.canonicalPath}`,
    siteName: siteConfig.name,
  });
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();

  const hub = getGeneratedTreatmentHubContent(slug, "us");
  if (!hub) notFound();

  const market = await getRequestMarket();
  const useEditorial = EDITORIAL_PILOT_SLUGS.has(slug);

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{
          page_family: "treatment_detail",
          page_slug: slug,
          market: market.code,
          design_variant: useEditorial ? "editorial" : "standard",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: hub.seo.title,
          description: hub.seo.description,
          url: `${siteConfig.domain}${hub.seo.canonicalPath}`,
          about: {
            "@type": "Drug",
            name: hub.treatmentName,
          },
        }}
      />

      {useEditorial ? (
        <EditorialTreatmentView hub={hub} market={market} />
      ) : (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments", href: "/treatments" },
            { label: hub.treatmentName, href: hub.seo.canonicalPath },
          ]}
        />

        {/* Header */}
        <div className="mt-6 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F8FAFC", borderColor: "#D0D7E2", color: "#334155" }}
          >
            <span>Treatment hub</span>
            <span style={{ color: "#1A3A5C" }}>{hub.fdaStatus === "approved" ? "FDA Approved" : hub.fdaStatus}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            {hub.seo.title}
          </h1>
          <p className="text-lg leading-relaxed max-w-4xl" style={{ color: "#5A6577" }}>
            {hub.marketSummary}
          </p>
        </div>

        {/* Market notice for non-US */}
        {market.code !== "us" && (
          <div
            className="rounded-xl p-4 mb-8"
            style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C] mb-2">
              Market Note
            </div>
            <div className="text-sm md:text-base text-[#9A3412]">
              {market.name} is selected. This treatment hub reflects US approval logic, approved
              product landscape, and US-first cost and provider resources. Use it as a reference
              while localized pathways remain staged.
            </div>
          </div>
        )}

        {/* Overview */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
            Overview
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
            {hub.overview}
          </p>
        </div>

        {/* Approved products */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Approved Product Paths
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {hub.approvedProducts.map((product) => (
              <div
                key={product.slug}
                className="rounded-xl p-5"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
                  {product.name}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#5A6577" }}>
                  {product.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits and side effects */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: "#15803D" }}>
              Benefits
            </div>
            <ul className="space-y-2">
              {hub.benefits.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#166534" }}>
                  <span className="mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: "#C2410C" }}>
              Side Effects &amp; Friction
            </div>
            <ul className="space-y-2">
              {hub.sideEffects.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#9A3412" }}>
                  <span className="mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Routes and cost/provider summaries */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Administration Routes
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
              {hub.routes.join(" · ")}
            </div>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Cost Reality
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
              {hub.costSummary}
            </div>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Provider Path
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
              {hub.providerSummary}
            </div>
          </div>
        </div>

        {/* Primary CTA: provider matcher */}
        <ProviderIntentCard
          marketCode={market.code}
          location={`treatment_detail_${hub.treatmentSlug}`}
          treatmentSlug={hub.treatmentSlug}
          headline={`Ready to find a ${hub.treatmentName.toLowerCase()} provider?`}
          description="Use the provider matcher to compare treatment paths by state, coverage, budget, urgency, and intake mode before committing to a prescribing workflow."
          buttonText={market.code === "us" ? hub.cta.primaryLabel : "Join provider rollout"}
        />

        {/* Cost + tracker next steps */}
        <div className="mt-8">
          <TreatmentMoneyLinks treatmentSlug={hub.treatmentSlug} marketCode={market.code} />
        </div>

        {/* App/tracker summary */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
            Tracker &amp; Retention
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#1C2028" }}>
            {hub.appSummary}
          </p>
          <Link
            href={`/app/${hub.treatmentSlug}-tracker`}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: "#1A3A5C", color: "#FFFFFF" }}
          >
            View tracker landing &rarr;
          </Link>
        </div>

        {/* Affiliate: GLP-1 support essentials */}
        <AffiliateProductGrid
          heading="GLP-1 Support Essentials"
          subheading="Products to help manage common side effects and optimize outcomes during semaglutide or tirzepatide treatment."
          products={affiliateCatalog["glp1-support"]}
        />

        {/* Affiliate: Progress tracking tools */}
        <AffiliateProductGrid
          heading="Progress Tracking Tools"
          subheading="Monitor weight, body composition, and nutrition to stay on track and maximize results."
          products={affiliateCatalog["nutrition"]}
        />

        {/* Trust block */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
            Trust Summary
          </div>
          <div className="text-sm leading-relaxed mb-2" style={{ color: "#1C2028" }}>
            Reviewed {hub.trust.reviewedAt}
            {hub.trust.reviewedBy ? ` by ${hub.trust.reviewedBy}` : ""}. This hub currently cites{" "}
            {hub.trust.sourceCount} official source{hub.trust.sourceCount === 1 ? "" : "s"}.
          </div>
          <div className="text-sm leading-relaxed" style={{ color: "#5A6577" }}>
            {hub.trust.disclaimer}
          </div>
        </div>

        <FAQ items={hub.faqs} title={`${hub.treatmentName} FAQ`} />
        <SourceCitationList sources={hub.sources} />

        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
      )}
    </>
  );
}

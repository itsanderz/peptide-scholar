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
} from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { getGeneratedCostContent, getGeneratedCostSlugs } from "@/lib/generated-content";
import { isValidLocale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getGeneratedCostSlugs("us").map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || locale !== "en") return {};
  const page = getGeneratedCostContent(slug, "us");
  if (!page) return {};

  return generateSEO({
    title: page.seo.title,
    description: page.seo.description,
    canonical: `${siteConfig.domain}${page.seo.canonicalPath}`,
    siteName: siteConfig.name,
  });
}

export default async function CostDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();

  const page = getGeneratedCostContent(slug, "us");
  if (!page) notFound();

  const market = await getRequestMarket();

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{ page_family: "cost_detail", page_slug: slug, market: market.code }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.seo.title,
          description: page.seo.description,
          url: `${siteConfig.domain}${page.seo.canonicalPath}`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Costs", href: "/costs" },
            { label: page.treatmentName, href: page.seo.canonicalPath },
          ]}
        />

        <div className="mt-6 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F8FAFC", borderColor: "#D0D7E2", color: "#334155" }}
          >
            <span>Structured page family:</span>
            <span style={{ color: "#1A3A5C" }}>Cost guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            {page.seo.title}
          </h1>
          <p className="text-lg leading-relaxed max-w-4xl" style={{ color: "#5A6577" }}>
            {page.marketSummary}
          </p>
        </div>

        <div
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: market.code === "us" ? "#F0F9FF" : "#FFF7ED", border: `1px solid ${market.code === "us" ? "#BAE6FD" : "#FDBA74"}` }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: market.code === "us" ? "#0369A1" : "#C2410C" }}>
            Active Market
          </div>
          <div className="text-sm md:text-base" style={{ color: market.code === "us" ? "#0C4A6E" : "#9A3412" }}>
            {market.code === "us"
              ? "This page is designed for US treatment decisions and uses US-first pricing and savings sources."
              : `${market.name} is selected, but this specific page is still a US-first cost workflow. Use it as a reference while localized cost pathways remain staged.`}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            ["Official pricing", page.listPrice],
            ["Cash-pay reality", page.cashPayRange],
            ["Insurance coverage", page.insuranceSummary],
            ["Savings and coupons", page.couponSummary],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
                {label}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
            Prior Authorization
          </div>
          <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
            {page.priorAuthSummary}
          </div>
        </div>

        <ProviderIntentCard
          marketCode={market.code}
          location={`cost_detail_${page.treatmentSlug}`}
          treatmentSlug={page.treatmentSlug}
          headline={`Need help comparing ${page.treatmentName.toLowerCase()} paths?`}
          description="Use the provider matcher to package treatment interest, insurance, budget, urgency, and state context before you commit to a prescribing path."
          buttonText={market.code === "us" ? page.cta.primaryLabel : "Join provider rollout"}
        />

        <div className="grid md:grid-cols-2 gap-4 mt-8 mb-8">
          <Link
            href={page.cta.secondaryHref ?? "/tools/cost-calculator"}
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Next Step
            </div>
            <div className="text-lg font-bold mb-2" style={{ color: "#1A3A5C" }}>
              {page.cta.secondaryLabel}
            </div>
            <div className="text-sm leading-relaxed mb-3" style={{ color: "#5A6577" }}>
              {page.cta.notes}
            </div>
            <span className="font-semibold" style={{ color: "#3B7A9E" }}>
              Open tool &rarr;
            </span>
          </Link>
          <Link
            href={`/app/${page.treatmentSlug}-tracker`}
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Retention Path
            </div>
            <div className="text-lg font-bold mb-2" style={{ color: "#1A3A5C" }}>
              Join the {page.treatmentName} tracker waitlist
            </div>
            <div className="text-sm leading-relaxed mb-3" style={{ color: "#5A6577" }}>
              Capture refill timing, weekly dose history, and symptom notes in one planned workflow.
            </div>
            <span className="font-semibold" style={{ color: "#3B7A9E" }}>
              View tracker landing &rarr;
            </span>
          </Link>
        </div>

        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
            Trust Summary
          </div>
          <div className="text-sm leading-relaxed mb-2" style={{ color: "#1C2028" }}>
            Reviewed {page.trust.reviewedAt} by {page.trust.reviewedBy}. This page currently cites {page.trust.sourceCount} official source{page.trust.sourceCount === 1 ? "" : "s"}.
          </div>
          <div className="text-sm leading-relaxed" style={{ color: "#5A6577" }}>
            {page.trust.disclaimer}
          </div>
        </div>

        <FAQ items={page.faqs} title={`${page.treatmentName} Cost FAQ`} />
        <SourceCitationList sources={page.sources} />

        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}

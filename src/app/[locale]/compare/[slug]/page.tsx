import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPeptideBySlug } from "@/data/peptides";
import { getComparisonBySlug, getAllComparisonSlugs } from "@/data/comparisons";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, FAQ, AdSlot, ComparisonGrid, EvidenceBadge, MedicalDisclaimer, ReviewedBadge, EmailCapture, ProviderIntentCard, ApprovedComparisonRouteCard, TreatmentMoneyLinks } from "@/components";
import { PageTracker } from "@/components/PageTracker";
import { isValidLocale } from "@/lib/i18n";
import { withLocaleParams, localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { getGeneratedTreatmentHubSlugs } from "@/lib/generated-content";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return withLocaleParams(getAllComparisonSlugs().map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};
  const market = await getRequestMarket();

  const alt = localeAlternates("https://peptidescholar.com", `/compare/${slug}`, locale);
  return {
    ...generateSEO({
      title: `${comparison.peptideAName} vs ${comparison.peptideBName}: Differences & Which Is Better (${new Date().getFullYear()})`,
      description: `${comparison.summary.slice(0, 110)}... ${market.code === "us" ? "US-first guidance." : `${market.name} rollout context.`}`,
      canonical: alt.canonical,
      siteName: "PeptideScholar",
    }),
    alternates: alt,
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();

  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const peptideA = getPeptideBySlug(comparison.peptideA);
  const peptideB = getPeptideBySlug(comparison.peptideB);
  if (!peptideA || !peptideB) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
    { label: `${comparison.peptideAName} vs ${comparison.peptideBName}`, href: `/compare/${slug}` },
  ];

  const faqItems = [
    {
      question: `What is the main difference between ${comparison.peptideAName} and ${comparison.peptideBName}?`,
      answer: `${comparison.peptideAName} and ${comparison.peptideBName} differ primarily in their mechanisms of action. ${peptideA.name} works by ${peptideA.mechanism.toLowerCase().slice(0, 120)}, while ${peptideB.name} works by ${peptideB.mechanism.toLowerCase().slice(0, 120)}. Both are researched for different therapeutic applications.`,
    },
    {
      question: `Can ${comparison.peptideAName} and ${comparison.peptideBName} be used together?`,
      answer: `Some research protocols have explored combining ${comparison.peptideAName} and ${comparison.peptideBName} due to their complementary mechanisms. However, there is limited clinical data on combination use. Always consult a qualified healthcare provider before considering any peptide protocol.`,
    },
    {
      question: `Which has more evidence — ${comparison.peptideAName} or ${comparison.peptideBName}?`,
      answer: `${peptideA.name} has an evidence level of ${peptideA.evidenceLevel} (${peptideA.evidenceLevel === "A" ? "FDA Approved" : peptideA.evidenceLevel === "B" ? "Human Studies" : peptideA.evidenceLevel === "C" ? "Preclinical" : "Limited Data"}), while ${peptideB.name} has an evidence level of ${peptideB.evidenceLevel} (${peptideB.evidenceLevel === "A" ? "FDA Approved" : peptideB.evidenceLevel === "B" ? "Human Studies" : peptideB.evidenceLevel === "C" ? "Preclinical" : "Limited Data"}). Evidence levels indicate the quality and quantity of available research, not necessarily effectiveness.`,
    },
    {
      question: `Are ${comparison.peptideAName} and ${comparison.peptideBName} FDA approved?`,
      answer: `${peptideA.name} is ${peptideA.fdaStatus === "approved" ? `FDA approved${peptideA.fdaApprovedFor ? ` for ${peptideA.fdaApprovedFor}` : ""}` : "not FDA approved and is available for research purposes only"}. ${peptideB.name} is ${peptideB.fdaStatus === "approved" ? `FDA approved${peptideB.fdaApprovedFor ? ` for ${peptideB.fdaApprovedFor}` : ""}` : "not FDA approved and is available for research purposes only"}.`,
    },
  ];
  const approvedPeptides = [peptideA, peptideB].filter((peptide) => peptide.fdaStatus === "approved");
  const providerTreatmentSlug = approvedPeptides.length === 1 ? approvedPeptides[0].slug : "general";

  return (
    <>
      <PageTracker event="comparison_view" params={{ comparison_slug: slug, market: market.code }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${comparison.peptideAName} vs ${comparison.peptideBName}: Head-to-Head Comparison`,
          description: comparison.summary,
          url: `https://peptidescholar.com/compare/${slug}`,
          isPartOf: {
            "@type": "WebSite",
            name: "PeptideScholar",
            url: "https://peptidescholar.com",
          },
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav crumbs={crumbs} />
        <ReviewedBadge compact />

        <div
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
            Active Market
          </div>
          <div className="text-sm md:text-base text-[#1C2028]">
            {market.code === "us"
              ? "This comparison can feed directly into US-first legal, provider, and cost workflows."
              : `${market.name} is selected. The evidence comparison is still valid, but provider availability, legal positioning, and cost assumptions may still be staged for later rollout.`}
          </div>
        </div>

        {/* ── Title ──────────────────────────────────────────────────── */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            color: "var(--color-primary, #1A3A5C)",
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          {comparison.peptideAName} vs {comparison.peptideBName}: Head-to-Head Comparison
        </h1>

        {/* ── Summary ────────────────────────────────────────────────── */}
        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8 max-w-3xl">
          {comparison.summary}
        </p>

        {/* ── Comparison Grid ────────────────────────────────────────── */}
        {approvedPeptides.length > 0 && (
          <ApprovedComparisonRouteCard
            options={approvedPeptides.map((peptide) => ({
              name: peptide.name,
              slug: peptide.slug,
              fdaApprovedFor: peptide.fdaApprovedFor,
              brandNames: peptide.brandNames,
            }))}
            marketCode={market.code}
          />
        )}

        {approvedPeptides.length > 0 && (
          <div className="mb-8">
            <ProviderIntentCard
              marketCode={market.code}
              location="comparison_detail"
              treatmentSlug={providerTreatmentSlug}
              headline={
                approvedPeptides.length === 1
                  ? `Want to discuss ${approvedPeptides[0].name} with a provider?`
                  : "Need help choosing between prescribing paths?"
              }
              description={
                approvedPeptides.length === 1
                  ? `${approvedPeptides[0].name} is currently modeled on this site as an approved treatment path. Use the provider matcher to narrow fit by state, insurance, budget, and urgency.`
                  : "One or more options in this comparison are currently modeled on this site as approved treatment paths. Use the provider matcher to narrow the best next step based on your budget, insurance, and timeline."
              }
              buttonText={market.code === "us" ? "Find a provider" : "Join provider rollout"}
            />
          </div>
        )}

        {approvedPeptides.length === 1 && (
          <TreatmentMoneyLinks
            treatmentSlug={approvedPeptides[0].slug}
            marketCode={market.code}
            compact
          />
        )}

        {slug === "semaglutide-vs-tirzepatide" && (
          <>
            <TreatmentMoneyLinks treatmentSlug="semaglutide" marketCode={market.code} compact />
            <TreatmentMoneyLinks treatmentSlug="tirzepatide" marketCode={market.code} compact />
          </>
        )}

        {(() => {
          const hubSlugs = getGeneratedTreatmentHubSlugs("us");
          const hubPeptides = approvedPeptides.filter((p) => hubSlugs.includes(p.slug));
          if (hubPeptides.length === 0) return null;
          return (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {hubPeptides.map((p) => (
                <Link
                  key={p.slug}
                  href={`/treatments/${p.slug}`}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD" }}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#0369A1" }}>
                    Treatment Hub
                  </div>
                  <div className="text-lg font-bold mb-2" style={{ color: "#1A3A5C" }}>
                    {p.name} Treatment Guide
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#5A6577" }}>
                    Approved product paths, cost friction, provider routing, and tracker next steps in one source-backed hub.
                  </p>
                  <span className="font-semibold" style={{ color: "#0369A1" }}>
                    Open treatment hub &rarr;
                  </span>
                </Link>
              ))}
            </div>
          );
        })()}

        <section className="mb-10">
          <h2
            className="text-xl md:text-2xl font-bold mb-4"
            style={{
              color: "var(--color-primary, #1A3A5C)",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Side-by-Side Comparison
          </h2>
          <ComparisonGrid
            peptideAName={comparison.peptideAName}
            peptideBName={comparison.peptideBName}
            dimensions={comparison.dimensions}
          />
        </section>

        {/* ── Two-Column Peptide Overviews ────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-xl md:text-2xl font-bold mb-6"
            style={{
              color: "var(--color-primary, #1A3A5C)",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Peptide Overviews
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Peptide A */}
            <div
              className="rounded-xl p-6"
              style={{
                border: "1px solid var(--color-border, #e5e7eb)",
                backgroundColor: "var(--color-surface, #ffffff)",
              }}
            >
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h3
                  className="text-lg font-bold"
                  style={{
                    color: "var(--color-primary, #1A3A5C)",
                    fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  }}
                >
                  {peptideA.name}
                </h3>
                <EvidenceBadge level={peptideA.evidenceLevel} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {peptideA.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-surface, #f1f5f9)",
                    color: "var(--color-secondary, #3B7A9E)",
                    border: "1px solid var(--color-border, #e2e8f0)",
                  }}
                >
                  {peptideA.categoryName}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: peptideA.fdaStatus === "approved" ? "#dcfce7" : "#fef3c7",
                    color: peptideA.fdaStatus === "approved" ? "#15803d" : "#92400e",
                    border: `1px solid ${peptideA.fdaStatus === "approved" ? "#bbf7d0" : "#fde68a"}`,
                  }}
                >
                  {peptideA.fdaStatus === "approved" ? "FDA Approved" : peptideA.fdaStatus === "cosmetic" ? "Cosmetic" : "Not Approved"}
                </span>
              </div>
              <Link
                href={`/peptides/${peptideA.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: "var(--color-secondary, #3B7A9E)" }}
              >
                View full {peptideA.name} profile &rarr;
              </Link>
            </div>

            {/* Peptide B */}
            <div
              className="rounded-xl p-6"
              style={{
                border: "1px solid var(--color-border, #e5e7eb)",
                backgroundColor: "var(--color-surface, #ffffff)",
              }}
            >
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h3
                  className="text-lg font-bold"
                  style={{
                    color: "var(--color-primary, #1A3A5C)",
                    fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  }}
                >
                  {peptideB.name}
                </h3>
                <EvidenceBadge level={peptideB.evidenceLevel} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {peptideB.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-surface, #f1f5f9)",
                    color: "var(--color-secondary, #3B7A9E)",
                    border: "1px solid var(--color-border, #e2e8f0)",
                  }}
                >
                  {peptideB.categoryName}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: peptideB.fdaStatus === "approved" ? "#dcfce7" : "#fef3c7",
                    color: peptideB.fdaStatus === "approved" ? "#15803d" : "#92400e",
                    border: `1px solid ${peptideB.fdaStatus === "approved" ? "#bbf7d0" : "#fde68a"}`,
                  }}
                >
                  {peptideB.fdaStatus === "approved" ? "FDA Approved" : peptideB.fdaStatus === "cosmetic" ? "Cosmetic" : "Not Approved"}
                </span>
              </div>
              <Link
                href={`/peptides/${peptideB.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: "var(--color-secondary, #3B7A9E)" }}
              >
                View full {peptideB.name} profile &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ── Ad Slot ────────────────────────────────────────────────── */}
        <AdSlot className="mb-8" />

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <FAQ items={faqItems} title={`${comparison.peptideAName} vs ${comparison.peptideBName}: FAQ`} />

        {/* ── Email Capture ──────────────────────────────────────────── */}
        <div className="mt-8">
          <EmailCapture
            headline={market.code === "us" ? "Stay informed on peptide comparisons" : `Join the ${market.name} comparison waitlist`}
            description={
              market.code === "us"
                ? "Get weekly comparison updates, new study alerts, and regulatory changes."
                : `We will notify you when ${market.name}-specific legal, pricing, provider, and tracker flows are available for comparison pages.`
            }
            buttonText="Subscribe Free"
            signupLocation="comparison_detail"
            marketCode={market.code}
            offerSlug={market.code === "us" ? `comparison_${slug}` : "market_comparison_waitlist"}
          />
        </div>

        {/* ── Medical Disclaimer ──────────────────────────────────────── */}
        <MedicalDisclaimer />
      </div>
    </>
  );
}

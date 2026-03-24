import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPeptideBySlug } from "@/data/peptides";
import { getComparisonBySlug, getAllComparisonSlugs } from "@/data/comparisons";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, FAQ, AdSlot, ComparisonGrid, EvidenceBadge, MedicalDisclaimer, ReviewedBadge, EmailCapture } from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { withLocaleParams, localeAlternates } from "@/lib/locale-params";

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

  return {
    ...generateSEO({
      title: `${comparison.peptideAName} vs ${comparison.peptideBName}: Differences & Which Is Better (${new Date().getFullYear()})`,
      description: comparison.summary.slice(0, 155) + "...",
      canonical: `https://peptidescholar.com/compare/${slug}`,
      siteName: "PeptideScholar",
    }),
    alternates: localeAlternates("https://peptidescholar.com", `/compare/${slug}`, locale),
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

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

  return (
    <>
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
            headline="Stay Informed on Peptide Research"
            description="Get weekly comparison updates, new study alerts, and regulatory changes."
            buttonText="Subscribe Free"
          />
        </div>

        {/* ── Medical Disclaimer ──────────────────────────────────────── */}
        <MedicalDisclaimer />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BreadcrumbNav,
  JsonLd,
  MedicalDisclaimer,
  PageTracker,
} from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { getTreatmentComparison, getAllTreatmentComparisonSlugs } from "@/data/treatment-comparisons";
import { getEnrichedTreatment } from "@/data/treatment-enrichment";
import { getAuthorById } from "@/data/content-authors";
import { MedicalReviewBadge } from "@/components/MedicalReviewBadge";
import { isValidLocale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllTreatmentComparisonSlugs().map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || locale !== "en") return {};
  const comp = getTreatmentComparison(slug);
  if (!comp) return {};

  return generateSEO({
    title: `${comp.title}: ${comp.subtitle}`,
    description: comp.summary.slice(0, 160),
    canonical: `${siteConfig.domain}/treatments/compare/${slug}`,
    siteName: siteConfig.name,
  });
}

export default async function TreatmentComparisonPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();

  const comp = getTreatmentComparison(slug);
  if (!comp) notFound();

  const market = await getRequestMarket();
  const reviewer = getAuthorById(comp.reviewerId);

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{ page_family: "treatment_comparison", page_slug: slug, market: market.code }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: comp.title,
          description: comp.summary,
          url: `${siteConfig.domain}/treatments/compare/${slug}`,
          reviewedBy: reviewer
            ? { "@type": "Person", name: reviewer.name, description: reviewer.credentials }
            : undefined,
          dateModified: comp.lastReviewed,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments", href: "/treatments" },
            { label: "Comparisons", href: "/treatments/compare" },
            { label: comp.title, href: `/treatments/compare/${slug}` },
          ]}
        />

        {/* Header */}
        <div className="mt-6 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F0F9FF", borderColor: "#BAE6FD", color: "#0369A1" }}
          >
            <span>Deep-dive comparison</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            {comp.title}
          </h1>
          <p className="text-lg leading-relaxed max-w-4xl" style={{ color: "#5A6577" }}>
            {comp.subtitle}
          </p>
          <div className="mt-4">
            <MedicalReviewBadge
              reviewerName={reviewer?.name ?? "Editorial Team"}
              reviewerCredentials={reviewer?.credentials ?? ""}
              reviewedAt={comp.lastReviewed}
            />
          </div>
        </div>

        {/* Summary */}
        <div
          className="rounded-xl p-5 mb-10"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
            Bottom Line
          </div>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#1C2028" }}>
            {comp.summary}
          </p>
        </div>

        {/* Verdict */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Verdict
          </h2>
          <div
            className="rounded-xl p-5 space-y-3"
            style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
          >
            {Object.entries(comp.verdict)
              .filter(([key]) => key !== "explanation" && key !== "overallWinner")
              .map(([key, value]) => {
                if (!value) return null;
                const label = key
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/^./, (c) => c.toUpperCase());
                return (
                  <div key={key} className="text-sm" style={{ color: "#166534" }}>
                    <span className="font-bold">{label}:</span> {value}
                  </div>
                );
              })}
            {comp.verdict.overallWinner && (
              <div className="text-sm font-bold" style={{ color: "#166534" }}>
                Overall: {comp.verdict.overallWinner}
              </div>
            )}
            <p className="text-sm leading-relaxed" style={{ color: "#166534" }}>
              {comp.verdict.explanation}
            </p>
          </div>
        </section>

        {/* Dimension Comparisons */}
        {comp.dimensionComparisons.map((dim, idx) => (
          <section key={idx} className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
              {dim.dimension}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "#D0D7E2" }}>
                    <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Treatment</th>
                    <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dim.rows.map((row, i) => {
                    const treatment = getEnrichedTreatment(row.treatmentSlug);
                    return (
                      <tr
                        key={i}
                        className="border-b"
                        style={{
                          borderColor: "#E2E8F0",
                          backgroundColor: row.highlight ? "#F0FDF4" : undefined,
                        }}
                      >
                        <td className="py-2 px-3 font-medium" style={{ color: "#1C2028" }}>
                          {treatment ? treatment.slug.charAt(0).toUpperCase() + treatment.slug.slice(1) : row.treatmentSlug}
                        </td>
                        <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {dim.winner && (
              <div className="text-sm mt-2 font-medium" style={{ color: "#166534" }}>
                Winner: {dim.winner}
              </div>
            )}
            {dim.notes && (
              <div className="text-sm mt-1" style={{ color: "#5A6577" }}>
                {dim.notes}
              </div>
            )}
          </section>
        ))}

        {/* Cost Comparison */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Cost Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "#D0D7E2" }}>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Treatment</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>List Price</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>With Savings Card</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Insurance Coverage</th>
                </tr>
              </thead>
              <tbody>
                {comp.costComparison.rows.map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: "#E2E8F0" }}>
                    <td className="py-2 px-3 font-medium" style={{ color: "#1C2028" }}>
                      {row.treatmentSlug.charAt(0).toUpperCase() + row.treatmentSlug.slice(1)}
                    </td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.listPrice}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.withSavingsCard}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.insuranceCoverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Side Effect Comparison */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Side Effect Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "#D0D7E2" }}>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Treatment</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Most Common</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Discontinuation Rate</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Unique Risks</th>
                </tr>
              </thead>
              <tbody>
                {comp.sideEffectComparison.rows.map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: "#E2E8F0" }}>
                    <td className="py-2 px-3 font-medium" style={{ color: "#1C2028" }}>
                      {row.treatmentSlug.charAt(0).toUpperCase() + row.treatmentSlug.slice(1)}
                    </td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.mostCommon}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.discontinuationRate}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.uniqueRisks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Evidence Summary */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Key Trial Evidence
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "#D0D7E2" }}>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Treatment</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Trial</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>N</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Outcome</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {comp.evidenceSummary.rows.map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: "#E2E8F0" }}>
                    <td className="py-2 px-3 font-medium" style={{ color: "#1C2028" }}>
                      {row.treatmentSlug.charAt(0).toUpperCase() + row.treatmentSlug.slice(1)}
                    </td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.keyTrial}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.n}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.primaryOutcome}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Patient Selection */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Which One Is Right for You?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: "#15803D" }}>
                Ideal Candidates
              </div>
              {comp.patientSelectionGuide.idealFor.map((item, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-sm font-bold mb-1" style={{ color: "#166534" }}>
                    {item.treatmentSlug.charAt(0).toUpperCase() + item.treatmentSlug.slice(1)}
                  </div>
                  <ul className="space-y-1">
                    {item.candidates.map((c, j) => (
                      <li key={j} className="text-sm flex gap-2" style={{ color: "#166534" }}>
                        <span className="shrink-0">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74" }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: "#C2410C" }}>
                Avoid If
              </div>
              {comp.patientSelectionGuide.avoidIf.map((item, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-sm font-bold mb-1" style={{ color: "#9A3412" }}>
                    {item.treatmentSlug.charAt(0).toUpperCase() + item.treatmentSlug.slice(1)}
                  </div>
                  <ul className="space-y-1">
                    {item.contraindications.map((c, j) => (
                      <li key={j} className="text-sm flex gap-2" style={{ color: "#9A3412" }}>
                        <span className="shrink-0">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dosing Convenience */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Dosing and Convenience
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "#D0D7E2" }}>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Treatment</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Frequency</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Route</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Titration</th>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Device</th>
                </tr>
              </thead>
              <tbody>
                {comp.dosingConvenience.rows.map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: "#E2E8F0" }}>
                    <td className="py-2 px-3 font-medium" style={{ color: "#1C2028" }}>
                      {row.treatmentSlug.charAt(0).toUpperCase() + row.treatmentSlug.slice(1)}
                    </td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.frequency}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.route}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.titrationComplexity}</td>
                    <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.injectionDevice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}

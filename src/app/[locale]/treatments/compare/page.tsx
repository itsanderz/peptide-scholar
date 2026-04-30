import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { treatmentComparisons } from "@/data/treatment-comparisons";
import { isValidLocale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale) || locale !== "en") return {};
  return generateSEO({
    title: "Treatment Comparisons: Evidence-Based Head-to-Head Analyses",
    description:
      "Deep-dive treatment comparisons for high-intent peptide and medication queries. Compare efficacy, side effects, cost, and evidence quality with board-certified medical review.",
    canonical: `${siteConfig.domain}/treatments/compare`,
    siteName: siteConfig.name,
  });
}

export default async function TreatmentCompareIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();
  const market = await getRequestMarket();

  const comparisons = Object.values(treatmentComparisons);

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{ page_family: "treatment_comparison_index", market: market.code }}
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments", href: "/treatments" },
            { label: "Comparisons", href: "/treatments/compare" },
          ]}
        />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Treatment Comparisons
          </h1>
          <p className="text-lg leading-relaxed max-w-4xl" style={{ color: "#5A6577" }}>
            Evidence-based head-to-head analyses for the most clinically significant peptide therapies.
            Each comparison includes trial data, cost breakdowns, side effect profiles, and patient
            selection guidance — medically reviewed by board-certified specialists.
          </p>
        </div>

        <div className="space-y-4">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/treatments/compare/${comp.slug}`}
              className="block rounded-xl p-5 transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold mb-1" style={{ color: "#1A3A5C" }}>
                    {comp.title}
                  </h2>
                  <p className="text-sm mb-2" style={{ color: "#5A6577" }}>
                    {comp.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
                    {comp.summary.slice(0, 200)}...
                  </p>
                </div>
                <span
                  className="shrink-0 text-xl font-bold"
                  style={{ color: "#3B7A9E" }}
                >
                  &rarr;
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {comp.treatments.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#F0F9FF", color: "#0369A1" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

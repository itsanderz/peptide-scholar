import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllComparisons } from "@/data/comparisons";
import { getPeptideBySlug } from "@/data/peptides";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot, EmailCapture, PageTracker } from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string }>;
}

const CATEGORY_LABELS: Record<string, string> = {
  "healing-recovery": "Healing & Recovery",
  "growth-hormone": "Growth Hormone Secretagogues",
  "weight-loss": "Weight Loss",
  "sexual-health": "Sexual Health",
  "sleep-stress": "Sleep & Stress",
  cognitive: "Cognitive Enhancement",
  "anti-aging": "Anti-Aging & Longevity",
  "immune-support": "Immune Support",
  "anti-inflammatory": "Anti-Inflammatory",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const market = await getRequestMarket();

  const alt = localeAlternates(siteConfig.domain, "/compare", locale);
  const descriptor = market.code === "us" ? "for the United States" : `for ${market.name}`;

  return {
    ...generateSEO({
      title: "Peptide Comparisons: 35+ Head-to-Head Analyses",
      description:
        `35+ evidence-based peptide comparisons ${descriptor}. Compare evidence, mechanisms, side effects, cost, and treatment fit with market-aware guidance.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: alt,
  };
}

function classifyComparison(
  catA: string | undefined,
  catB: string | undefined
): string {
  if (!catA || !catB) return "Other Comparisons";
  if (catA === catB) return CATEGORY_LABELS[catA] || catA;
  return "Cross-Category Comparisons";
}

function truncateSummary(summary: string) {
  return summary.length > 190 ? `${summary.slice(0, 190)}...` : summary;
}

export default async function CompareIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();

  const comparisons = getAllComparisons();
  const enriched = comparisons.map((comparison) => {
    const peptideA = getPeptideBySlug(comparison.peptideA);
    const peptideB = getPeptideBySlug(comparison.peptideB);

    return {
      ...comparison,
      evidenceLevelA: peptideA?.evidenceLevel ?? "D",
      evidenceLevelB: peptideB?.evidenceLevel ?? "D",
      categoryA: peptideA?.category,
      categoryB: peptideB?.category,
    };
  });

  const grouped = new Map<string, typeof enriched>();
  for (const comparison of enriched) {
    const group = classifyComparison(comparison.categoryA, comparison.categoryB);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group)!.push(comparison);
  }

  const orderedGroups = [...grouped.entries()].sort(([a], [b]) => {
    if (a === "Cross-Category Comparisons") return 1;
    if (b === "Cross-Category Comparisons") return -1;
    if (a === "Other Comparisons") return 1;
    if (b === "Other Comparisons") return -1;
    return a.localeCompare(b);
  });

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
  ];

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "compare-index", page_slug: "compare", market: market.code }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Peptide Comparisons",
          description:
            "35+ evidence-based head-to-head peptide comparisons covering mechanisms, side effects, evidence levels, and cost.",
          url: `${siteConfig.domain}/compare`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: comparisons.length,
            itemListElement: comparisons.map((comparison, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${comparison.peptideAName} vs ${comparison.peptideBName}`,
              url: `${siteConfig.domain}/compare/${comparison.slug}`,
            })),
          },
        }}
      />

      <section className="ci-hero">
        <div className="container">
          <div className="ci-market">
            <span>Active market</span>
            <strong>{market.name}</strong>
          </div>
          <h1>Head-to-Head Peptide Comparisons</h1>
          <p>
            {comparisons.length}+ evidence-based comparisons. See how peptides stack up on evidence,
            mechanisms, side effects, treatment fit, and cost context.
          </p>
        </div>
      </section>

      <section className="ci-stats" aria-label="Comparison library statistics">
        <div className="container">
          <div className="ci-stats-grid">
            {[
              { value: `${comparisons.length}+`, label: "Comparisons" },
              { value: orderedGroups.length.toString(), label: "Categories" },
              { value: "7", label: "Dimensions Each" },
            ].map((stat) => (
              <div key={stat.label} className="ci-stat">
                <span className="ci-stat-value">{stat.value}</span>
                <span className="ci-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container ci-shell">
        <BreadcrumbNav crumbs={crumbs} />

        <div className="pd-desc-box">
          <div className="pd-side-lbl">Active Market</div>
          <p>
            {market.code === "us"
              ? "These comparisons are paired with US-first legality, provider, and cost assumptions where relevant."
              : `${market.name} is selected. Evidence comparison remains global, while legal, pricing, and routing assumptions may still use US-first defaults until ${market.name} rollout is complete.`}
          </p>
        </div>

        <p className="ci-copy">
          Each comparison covers evidence level, FDA status, mechanism of action, primary uses, side
          effects, ease of use, and cost. All claims cite peer-reviewed sources.
        </p>

        <div className="ci-groups">
          {orderedGroups.map(([groupName, groupComparisons]) => (
            <section key={groupName} aria-labelledby={`compare-group-${groupName.replace(/\W+/g, "-").toLowerCase()}`}>
              <div className="ci-group-head">
                <h2 id={`compare-group-${groupName.replace(/\W+/g, "-").toLowerCase()}`} className="section-title">
                  {groupName}
                </h2>
                <span className="legal-badge is-warn">{groupComparisons.length}</span>
              </div>

              <div className="ci-grid">
                {groupComparisons.map((comparison) => (
                  <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="ci-card">
                    <div className="ci-card-top">
                      <div className="ci-side">
                        <span className="ci-name">{comparison.peptideAName}</span>
                        <span className={`ci-grade ${comparison.evidenceLevelA.toLowerCase()}`}>
                          {comparison.evidenceLevelA}
                        </span>
                      </div>
                      <span className="ci-vs">VS</span>
                      <div className="ci-side">
                        <span className="ci-name">{comparison.peptideBName}</span>
                        <span className={`ci-grade ${comparison.evidenceLevelB.toLowerCase()}`}>
                          {comparison.evidenceLevelB}
                        </span>
                      </div>
                    </div>

                    <p className="ci-summary">{truncateSummary(comparison.summary)}</p>

                    <div className="ci-card-footer">
                      <span>View full comparison</span>
                      <span>-&gt;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <AdSlot className="my-8" />
        <EmailCapture
          headline={market.code === "us" ? "Get new peptide comparisons and treatment updates" : `Join the ${market.name} comparison waitlist`}
          description={
            market.code === "us"
              ? "Get notified when new head-to-head comparisons, legal updates, and provider flows go live."
              : `We will notify you when ${market.name}-specific legality, pricing, and provider guidance are added to comparison pages.`
          }
          signupLocation="compare_index"
          marketCode={market.code}
          offerSlug={market.code === "us" ? "compare_updates" : "market_compare_waitlist"}
        />
        <MedicalDisclaimer />
      </main>
    </>
  );
}

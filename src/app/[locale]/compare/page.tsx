import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllComparisons } from "@/data/comparisons";
import { getPeptideBySlug } from "@/data/peptides";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot, EmailCapture, PageTracker } from "@/components";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string }>;
}

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

/** Determine which group a comparison belongs to based on peptide categories */
function classifyComparison(
  catA: string | undefined,
  catB: string | undefined
): string {
  if (!catA || !catB) return "Other Comparisons";
  if (catA === catB) {
    // Same category
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
    return CATEGORY_LABELS[catA] || catA;
  }
  return "Cross-Category Comparisons";
}

export default async function CompareIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();

  const comparisons = getAllComparisons();

  // Enrich comparisons with evidence levels and categories
  const enriched = comparisons.map((c) => {
    const pA = getPeptideBySlug(c.peptideA);
    const pB = getPeptideBySlug(c.peptideB);
    return {
      ...c,
      evidenceLevelA: pA?.evidenceLevel ?? "D",
      evidenceLevelB: pB?.evidenceLevel ?? "D",
      categoryA: pA?.category,
      categoryB: pB?.category,
    };
  });

  // Group by classification
  const grouped = new Map<string, typeof enriched>();
  for (const comp of enriched) {
    const group = classifyComparison(comp.categoryA, comp.categoryB);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group)!.push(comp);
  }

  // Order groups: named categories first (alphabetical), cross-category last
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
            itemListElement: comparisons.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${c.peptideAName} vs ${c.peptideBName}`,
              url: `${siteConfig.domain}/compare/${c.slug}`,
            })),
          },
        }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="relative py-14 md:py-20 text-center text-white overflow-hidden"
        style={{ backgroundColor: "#1A3A5C" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #D4553A 1px, transparent 1px), radial-gradient(circle at 70% 60%, #3B7A9E 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.82)" }}>
            <span>Active market:</span>
            <span style={{ color: "#FFFFFF" }}>{market.name}</span>
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Head-to-Head Peptide Comparisons
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-0">
            {comparisons.length}+ evidence-based comparisons. See how peptides stack up on evidence, mechanisms,
            side effects, and more.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────── */}
      <section className="py-6" style={{ backgroundColor: "#F0F3F7" }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: comparisons.length.toString() + "+", label: "Comparisons" },
              { value: orderedGroups.length.toString(), label: "Categories" },
              { value: "7", label: "Dimensions Each" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-3 px-2 rounded-lg"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
              >
                <div className="text-xl md:text-2xl font-bold" style={{ color: "#1A3A5C" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pt-10 pb-4">
        <BreadcrumbNav crumbs={crumbs} />

        <div
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
            Active Market
          </div>
          <div className="text-sm md:text-base text-[#1C2028]">
            {market.code === "us"
              ? "These comparisons are paired with US-first legality, provider, and cost assumptions where relevant."
              : `${market.name} is selected. The evidence comparison remains global, while legal, pricing, and routing assumptions may still use US-first defaults until ${market.name} rollout is complete.`}
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-8" style={{ color: "#5A6577" }}>
          Each comparison covers evidence level, FDA status, mechanism of action, primary uses, side effects, ease
          of use, and cost. All claims cite peer-reviewed sources.
        </p>
      </section>

      {/* ── Grouped Comparisons ───────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-6">
        {orderedGroups.map(([groupName, comps]) => (
          <div key={groupName} className="mb-10">
            <h2
              className="text-xl md:text-2xl font-bold mb-4 pb-2"
              style={{
                color: "#1A3A5C",
                borderBottom: "2px solid #D0D7E2",
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
              }}
            >
              {groupName}
              <span
                className="ml-2 text-sm font-normal px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "#F0F3F7",
                  color: "#5A6577",
                  verticalAlign: "middle",
                }}
              >
                {comps.length}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comps.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="comparison-card block rounded-xl p-5 transition-all"
                  style={{
                    border: "1px solid #D0D7E2",
                    backgroundColor: "#FFFFFF",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {/* VS Header */}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-bold text-base"
                        style={{
                          color: "#1A3A5C",
                          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                        }}
                      >
                        {comp.peptideAName}
                      </span>
                      <EvidenceBadge
                        level={comp.evidenceLevelA as "A" | "B" | "C" | "D"}
                        showLabel={false}
                      />
                    </div>

                    <span
                      className="inline-flex items-center justify-center rounded-full shrink-0 text-xs font-bold"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        backgroundColor: "#D4553A",
                        color: "#FFFFFF",
                      }}
                    >
                      VS
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        className="font-bold text-base"
                        style={{
                          color: "#1A3A5C",
                          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                        }}
                      >
                        {comp.peptideBName}
                      </span>
                      <EvidenceBadge
                        level={comp.evidenceLevelB as "A" | "B" | "C" | "D"}
                        showLabel={false}
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm leading-relaxed m-0" style={{ color: "#5A6577" }}>
                    {comp.summary.length > 180 ? comp.summary.slice(0, 180) + "..." : comp.summary}
                  </p>

                  {/* CTA */}
                  <div className="mt-3">
                    <span
                      className="text-sm font-semibold inline-flex items-center gap-1"
                      style={{ color: "#D4553A" }}
                    >
                      View full comparison
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Ad + Disclaimer ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <AdSlot className="mb-6" />
        <div className="mb-6">
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
        </div>
        <MedicalDisclaimer />
      </section>

      <style>{`
        .comparison-card:hover {
          box-shadow: 0 4px 16px rgba(26, 58, 92, 0.12);
          border-color: #D4553A !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}

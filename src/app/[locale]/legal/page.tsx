import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStatesLegal } from "@/data/states-legal";
import { getAllPeptides } from "@/data/peptides";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot, FAQ, EmailCapture, PageTracker, ProviderIntentCard } from "@/components";
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

  const alt = localeAlternates(siteConfig.domain, "/legal", locale);

  return {
    ...generateSEO({
      title:
        market.code === "us"
          ? "Peptide Legal Status by State — 50 State Guide (2026)"
          : `Peptide Legal Status by State — US Guide for ${market.name} Users (2026)`,
      description:
        market.code === "us"
          ? "Are peptides legal in your state? See the legal status of peptides across all 50 US states — compounding pharmacy rules, FDA classification, and state-by-state stance for 2026."
          : `US peptide legality guide for users in ${market.name}. Review all 50 US states, compounding rules, and FDA status while ${market.name}-specific regulatory guidance is still being built.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: alt,
  };
}

const STANCE_STYLES = {
  permissive: {
    bg: "#dcfce7",
    border: "#16a34a",
    color: "#15803d",
    label: "Permissive",
    cardBorder: "#bbf7d0",
  },
  moderate: {
    bg: "#fef3c7",
    border: "#d97706",
    color: "#92400e",
    label: "Moderate",
    cardBorder: "#fde68a",
  },
  restrictive: {
    bg: "#fee2e2",
    border: "#dc2626",
    color: "#b91c1c",
    label: "Restrictive",
    cardBorder: "#fecaca",
  },
} as const;

const LEGAL_FAQS = [
  {
    question: "Are peptides legal to buy in the United States?",
    answer:
      "The legality of peptides depends on the specific peptide, its intended use, and your state. FDA-approved peptides (like semaglutide and bremelanotide) are legal with a prescription. Many non-approved peptides are sold as \"research chemicals\" which occupies a legal gray area. Compounding pharmacies can prepare certain peptides with a valid prescription, subject to state and federal regulations.",
  },
  {
    question: "What did the FDA Category 2 ruling change for peptides?",
    answer:
      "In 2024, the FDA placed several previously compounded peptides on the Category 2 list, which means compounding pharmacies can no longer produce them as bulk drug substances. This affected popular peptides including BPC-157 and certain GHRPs. Peptides on this list can only be obtained if they have FDA approval for a specific indication. States may vary in their enforcement of these federal rules.",
  },
  {
    question: "Can I get peptides from a compounding pharmacy?",
    answer:
      "Yes, in states that allow compounding, a licensed compounding pharmacy can prepare peptides that are not on the FDA's Category 2 prohibited list, provided you have a valid prescription from a licensed healthcare provider. The availability varies significantly by state — permissive states have broad compounding access while restrictive states impose additional requirements, testing standards, or outright limitations on certain compounds.",
  },
];

export default async function LegalIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();

  const states = getAllStatesLegal();
  const allPeptides = getAllPeptides();

  // Sort alphabetically
  const sortedStates = [...states].sort((a, b) => a.stateName.localeCompare(b.stateName));

  // Count by stance
  const permissiveCount = states.filter((s) => s.stance === "permissive").length;
  const moderateCount = states.filter((s) => s.stance === "moderate").length;
  const restrictiveCount = states.filter((s) => s.stance === "restrictive").length;

  const fdaApprovedCount = allPeptides.filter((p) => p.fdaStatus === "approved").length;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Legal Status", href: "/legal" },
  ];

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "legal-index", page_slug: "legal", market: market.code }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Peptide Legal Status by State",
          description:
            "Legal status of peptides across all 50 US states including compounding pharmacy rules and regulatory stance.",
          url: `${siteConfig.domain}/legal`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: states.length,
            itemListElement: sortedStates.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `Peptide Legal Status in ${s.stateName}`,
              url: `${siteConfig.domain}/legal/${s.stateSlug}`,
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
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #3B7A9E 0, #3B7A9E 1px, transparent 1px, transparent 20px)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Peptide Legal Status by State
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-0">
            A comprehensive 50-state guide to peptide legality, compounding pharmacy access, and regulatory stance
            — updated for 2026.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────── */}
      <section className="py-6" style={{ backgroundColor: "#F0F3F7" }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                value: permissiveCount.toString(),
                label: "Permissive",
                color: STANCE_STYLES.permissive.color,
              },
              {
                value: moderateCount.toString(),
                label: "Moderate",
                color: STANCE_STYLES.moderate.color,
              },
              {
                value: restrictiveCount.toString(),
                label: "Restrictive",
                color: STANCE_STYLES.restrictive.color,
              },
              {
                value: fdaApprovedCount.toString(),
                label: "FDA-Approved Peptides",
                color: "#1A3A5C",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-3 px-2 rounded-lg"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
              >
                <div className="text-xl md:text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-4">
        <BreadcrumbNav crumbs={crumbs} />

        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#3B7A9E" }}>
                Active Market
              </p>
              <h2
                className="text-lg font-bold mb-1"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                {market.code === "us"
                  ? "US legal coverage is primary"
                  : `This section currently covers the United States, not ${market.name}`}
              </h2>
              <p className="text-sm text-gray-600 max-w-3xl">
                {market.code === "us"
                  ? "State-by-state legal coverage, compounding context, and treatment pathways are currently strongest in the US."
                  : `${market.name} is selected as your market, but this legal section is still US-only. Use the tools and waitlist flows while country-specific legality pages are being prepared.`}
              </p>
            </div>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "#EEF2FF", color: "#4338CA", border: "1px solid #C7D2FE" }}
            >
              {market.name}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <ProviderIntentCard
            marketCode={market.code}
            location="legal_index"
            headline={market.code === "us" ? "Need a legal prescribing path?" : `Need treatment routing guidance for ${market.name}?`}
            description={
              market.code === "us"
                ? "Use the provider matcher to narrow approved-treatment pathways by state, insurance, budget, and timing."
                : `Save your treatment preferences now and join the rollout list while ${market.name} provider routing is still being prepared.`
            }
            buttonText={market.code === "us" ? "Find a provider" : "Join provider rollout"}
          />
        </div>

        {/* Legend */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <h2
            className="text-base font-bold mb-3"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Color Legend
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(["permissive", "moderate", "restrictive"] as const).map((stance) => {
              const style = STANCE_STYLES[stance];
              return (
                <div key={stance} className="flex items-start gap-2.5">
                  <span
                    className="inline-block rounded-full shrink-0 mt-0.5"
                    style={{
                      width: "1rem",
                      height: "1rem",
                      backgroundColor: style.border,
                    }}
                  />
                  <div>
                    <span className="text-sm font-bold" style={{ color: style.color }}>
                      {style.label}
                    </span>
                    <p className="text-xs m-0 mt-0.5" style={{ color: "#5A6577" }}>
                      {stance === "permissive" &&
                        "Minimal restrictions beyond federal guidelines. Compounding broadly allowed."}
                      {stance === "moderate" &&
                        "Standard federal compliance with typical state pharmacy board oversight."}
                      {stance === "restrictive" &&
                        "Additional state restrictions on compounding, prescribing, or distribution."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── State Grid ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {sortedStates.map((state) => {
            const style = STANCE_STYLES[state.stance];
            return (
              <Link
                key={state.stateSlug}
                href={`/legal/${state.stateSlug}`}
                className="state-card block rounded-lg p-4 transition-all"
                style={{
                  border: `1.5px solid ${style.cardBorder}`,
                  backgroundColor: "#FFFFFF",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <h3
                  className="text-sm font-bold mb-2 m-0"
                  style={{
                    color: "#1A3A5C",
                    fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  }}
                >
                  {state.stateName}
                </h3>

                {/* Stance pill */}
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
                  style={{
                    backgroundColor: style.bg,
                    color: style.color,
                    border: `1px solid ${style.border}`,
                  }}
                >
                  {style.label}
                </span>

                {/* Compounding */}
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "#5A6577" }}>
                  <span
                    className="inline-block rounded-full"
                    style={{
                      width: "0.5rem",
                      height: "0.5rem",
                      backgroundColor: state.compoundingAllowed ? "#16a34a" : "#dc2626",
                    }}
                  />
                  Compounding: {state.compoundingAllowed ? "Yes" : "No"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Explainer Section ─────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div
          className="rounded-xl p-6 md:p-8"
          style={{ backgroundColor: "#F0F3F7", border: "1px solid #D0D7E2" }}
        >
          <h2
            className="text-xl md:text-2xl font-bold mb-4"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            What Does This Mean? Understanding Peptide Regulation
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#3B4554" }}>
            <p>
              Peptide legality in the United States is determined by a combination of{" "}
              <strong>federal FDA regulation</strong> and <strong>state pharmacy board rules</strong>. At the
              federal level, the FDA classifies peptides as drugs, dietary supplements, or cosmetic ingredients
              depending on their intended use. Only peptides with approved New Drug Applications (NDAs) can be
              marketed as drugs for specific conditions.
            </p>
            <p>
              <strong>Compounding pharmacies</strong> play a crucial role in peptide access. Under the{" "}
              <strong>Drug Quality and Security Act (DQSA)</strong>, compounding pharmacies can prepare customized
              peptide formulations using bulk drug substances — but only if those substances are not on the FDA&apos;s{" "}
              <strong>Category 2 withdrawal list</strong>. In 2024, the FDA moved several popular research peptides
              to Category 2, effectively ending their legal compounding.
            </p>
            <p>
              State laws add another layer. <strong>Permissive states</strong> generally follow federal guidelines
              without adding restrictions, meaning compounding pharmacies operate freely for non-Category-2
              peptides. <strong>Restrictive states</strong> impose additional requirements: stricter compounding
              oversight, enhanced testing, limits on telemedicine prescribing, or additional consumer protection
              rules that can limit access.
            </p>
            <p>
              <strong>Important:</strong> This guide reflects the regulatory landscape as of 2026. Laws change
              frequently. Always verify current regulations with your state pharmacy board and consult a licensed
              healthcare provider before obtaining or using any peptide therapy.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <AdSlot className="mb-6" />
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <FAQ
          items={LEGAL_FAQS.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))}
        />
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-8">
        <EmailCapture
          headline={market.code === "us" ? "Get US legal and provider updates" : `Get notified when ${market.name} legal guidance launches`}
          description={
            market.code === "us"
              ? "Get updates when state legal pages, routing guidance, and safety guidance change."
              : `Join the waitlist for ${market.name}-specific legality, provider, and treatment guidance while the US section remains the primary legal reference.`
          }
          buttonText={market.code === "us" ? "Get Updates" : "Join Waitlist"}
          signupLocation="legal_index"
          marketCode={market.code}
          offerSlug={market.code === "us" ? "us_legal_updates" : "market_legal_waitlist"}
        />
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <MedicalDisclaimer />
      </section>

      <style>{`
        .state-card:hover {
          box-shadow: 0 4px 12px rgba(26, 58, 92, 0.1);
          transform: translateY(-2px);
          border-color: #3B7A9E !important;
        }
      `}</style>
    </>
  );
}

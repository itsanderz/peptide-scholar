import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BreadcrumbNav,
  MedicalDisclaimer,
  PageTracker,
  ProviderDirectoryFilters,
  ProviderMatcher,
  ProviderPartnerCard,
} from "@/components";
import {
  getAllProviderGoalSlugs,
  getAllProviderInsuranceSlugs,
  getAllProviderIntakeModes,
  getAllProviderTreatmentSlugs,
  getFilteredProviderPartners,
  type ProviderBudgetBand,
  type ProviderInsurancePreference,
  type ProviderIntakeMode,
  type ProviderUrgencyBand,
} from "@/data/provider-partners";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { canShowProviderReferrals } from "@/lib/market";
import {
  formatProviderSlug,
  PROVIDER_BUDGET_OPTIONS,
  PROVIDER_GOAL_OPTIONS,
  PROVIDER_INTAKE_MODE_OPTIONS,
  PROVIDER_INSURANCE_OPTIONS,
  PROVIDER_TREATMENT_OPTIONS,
  PROVIDER_URGENCY_OPTIONS,
  humanizeProviderInsurance,
  humanizeProviderIntakeMode,
} from "@/lib/provider-options";
import { getProviderMatches } from "@/lib/provider-routing";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    treatment?: string;
    goal?: string;
    insurance?: string;
    budget?: string;
    urgency?: string;
    mode?: string;
  }>;
}

function normalizeSearchValue(value: string | undefined, allowed: readonly string[], fallback = "all") {
  return typeof value === "string" && allowed.includes(value) ? value : fallback;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const market = await getRequestMarket();

  const alt = localeAlternates(siteConfig.domain, "/providers", locale);

  return {
    ...generateSEO({
      title: "Find a Peptide Provider",
      description:
        market.code === "us"
          ? "Use the provider matcher to narrow the right prescribing pathway for approved peptide treatments in the United States."
          : `Join the ${market.name} provider rollout list and save your treatment preferences while provider routing is still being prepared.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

export default async function ProvidersPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();
  const { treatment, goal, insurance, budget, urgency, mode } = await searchParams;
  const treatmentDirectoryFilter = normalizeSearchValue(
    treatment,
    PROVIDER_TREATMENT_OPTIONS.filter((option) => option.value !== "general").map((option) => option.value),
    "all"
  );
  const goalDirectoryFilter = normalizeSearchValue(
    goal,
    PROVIDER_GOAL_OPTIONS.filter((option) => option.value !== "education-first").map((option) => option.value),
    "all"
  );
  const insuranceDirectoryFilter = normalizeSearchValue(
    insurance,
    PROVIDER_INSURANCE_OPTIONS.map((option) => option.value),
    "all"
  );
  const budgetDirectoryFilter = normalizeSearchValue(
    budget,
    PROVIDER_BUDGET_OPTIONS.map((option) => option.value),
    "all"
  );
  const urgencyDirectoryFilter = normalizeSearchValue(
    urgency,
    PROVIDER_URGENCY_OPTIONS.map((option) => option.value),
    "all"
  );
  const intakeModeDirectoryFilter = normalizeSearchValue(
    mode,
    PROVIDER_INTAKE_MODE_OPTIONS.map((option) => option.value),
    "all"
  );
  const initialTreatment =
    typeof treatment === "string" &&
    PROVIDER_TREATMENT_OPTIONS.some((option) => option.value === treatment)
      ? treatment
      : "general";
  const defaultGoal =
    initialTreatment === "tesamorelin" || initialTreatment === "sermorelin"
      ? "hormone-support"
      : initialTreatment === "bremelanotide"
        ? "sexual-health"
        : "weight-management";
  const featuredMatches = getProviderMatches({
    marketCode: market.code,
    treatmentSlug: initialTreatment,
    goal: defaultGoal,
    state: "",
    insuranceStatus: "either",
    budgetBand: "unsure",
    urgency: "researching",
  }).matches;
  const providerEnabled = canShowProviderReferrals(market.code);
  const directoryProfiles = providerEnabled
    ? getFilteredProviderPartners({
        marketCode: market.code,
        treatment: treatmentDirectoryFilter,
        goal: goalDirectoryFilter,
        insurancePreference: insuranceDirectoryFilter as ProviderInsurancePreference | "all",
        budgetBand: budgetDirectoryFilter as ProviderBudgetBand | "all",
        urgencyBand: urgencyDirectoryFilter as ProviderUrgencyBand | "all",
        intakeMode: intakeModeDirectoryFilter as ProviderIntakeMode | "all",
        activeOnly: true,
      })
    : getFilteredProviderPartners({
        treatment: treatmentDirectoryFilter,
        goal: goalDirectoryFilter,
        insurancePreference: insuranceDirectoryFilter as ProviderInsurancePreference | "all",
        budgetBand: budgetDirectoryFilter as ProviderBudgetBand | "all",
        urgencyBand: urgencyDirectoryFilter as ProviderUrgencyBand | "all",
        intakeMode: intakeModeDirectoryFilter as ProviderIntakeMode | "all",
      });
  const hasDirectoryFilters =
    treatmentDirectoryFilter !== "all" ||
    goalDirectoryFilter !== "all" ||
    insuranceDirectoryFilter !== "all" ||
    budgetDirectoryFilter !== "all" ||
    urgencyDirectoryFilter !== "all" ||
    intakeModeDirectoryFilter !== "all";
  const featuredTreatmentSlugs = getAllProviderTreatmentSlugs().slice(0, 4);
  const featuredGoalSlugs = getAllProviderGoalSlugs().slice(0, 4);
  const featuredInsuranceSlugs = getAllProviderInsuranceSlugs();
  const featuredIntakeModes = getAllProviderIntakeModes();

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "providers", page_slug: "providers", market: market.code }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Find a Peptide Provider",
          description: "Provider matcher for peptide and GLP-1 treatment pathways.",
          url: `${siteConfig.domain}/providers`,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Providers", href: "/providers" },
          ]}
        />

        <div className="mt-6 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4" style={{ backgroundColor: "#F8FAFC", borderColor: "#D0D7E2", color: "#334155" }}>
            <span>Active market:</span>
            <span style={{ color: "#1A3A5C" }}>{market.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A3A5C" }}>
            Find a Provider
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
            {market.code === "us"
              ? "Use the matcher to narrow the right telehealth or prescribing path for approved peptide treatments."
              : `Provider matching is not fully live in ${market.name} yet, but you can still save your treatment preferences and join the rollout list.`}
          </p>
        </div>

        <div
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
            How This Works
          </div>
          <div className="text-sm md:text-base text-[#1C2028]">
            {market.code === "us"
              ? "We use your treatment, state, budget, insurance, and timing preferences to package the most relevant next step."
              : "We save your market, treatment, and budget preferences now so the rollout can prioritize the right routing profiles later."}
          </div>
        </div>

        <section className="mb-8 grid md:grid-cols-2 gap-4">
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "#1A3A5C" }}>
              Browse By Treatment
            </h2>
            <div className="flex flex-wrap gap-2">
              {featuredTreatmentSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/providers/treatment/${slug}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "#F8FAFC",
                    color: "#1A3A5C",
                    border: "1px solid #D0D7E2",
                    textDecoration: "none",
                  }}
                >
                  {formatProviderSlug(slug)}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "#1A3A5C" }}>
              Browse By Goal
            </h2>
            <div className="flex flex-wrap gap-2">
              {featuredGoalSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/providers/goal/${slug}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "#F8FAFC",
                    color: "#1A3A5C",
                    border: "1px solid #D0D7E2",
                    textDecoration: "none",
                  }}
                >
                  {formatProviderSlug(slug)}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4 md:col-span-2"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "#1A3A5C" }}>
              Browse By State Guidance
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#5A6577" }}>
              These state pages reflect PeptideScholar&apos;s internal routing guidance based on the current legal-state model. They are not verified provider directories.
            </p>
            <div className="flex flex-wrap gap-2">
              {["california", "florida", "new-york", "texas"].map((slug) => (
                <Link
                  key={slug}
                  href={`/providers/state/${slug}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "#F8FAFC",
                    color: "#1A3A5C",
                    border: "1px solid #D0D7E2",
                    textDecoration: "none",
                  }}
                >
                  {formatProviderSlug(slug)}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "#1A3A5C" }}>
              Browse By Insurance Style
            </h2>
            <div className="flex flex-wrap gap-2">
              {featuredInsuranceSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/providers/insurance/${slug}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "#F8FAFC",
                    color: "#1A3A5C",
                    border: "1px solid #D0D7E2",
                    textDecoration: "none",
                  }}
                >
                  {humanizeProviderInsurance(slug)}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "#1A3A5C" }}>
              Browse By Intake Mode
            </h2>
            <div className="flex flex-wrap gap-2">
              {featuredIntakeModes.map((slug) => (
                <Link
                  key={slug}
                  href={`/providers/intake/${slug}`}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "#F8FAFC",
                    color: "#1A3A5C",
                    border: "1px solid #D0D7E2",
                    textDecoration: "none",
                  }}
                >
                  {humanizeProviderIntakeMode(slug)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ProviderDirectoryFilters
          marketCode={market.code}
          currentTreatment={treatmentDirectoryFilter}
          currentGoal={goalDirectoryFilter}
          currentInsurance={insuranceDirectoryFilter}
          currentBudget={budgetDirectoryFilter}
          currentUrgency={urgencyDirectoryFilter}
          currentIntakeMode={intakeModeDirectoryFilter}
        />

        <section className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#1A3A5C" }}>
                {providerEnabled ? "Routing Profile Directory" : "Framework Routing Directory"}
              </h2>
              <p className="text-sm leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
                {providerEnabled
                  ? "These results reflect active routing profiles in the current market, filtered from PeptideScholar's internal provider-routing dataset."
                  : `These results reflect the current PeptideScholar routing framework, not active provider availability in ${market.name}. Use them to understand how rollout is being structured while matching is staged.`}
              </p>
            </div>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "#F8FAFC", color: "#1A3A5C", border: "1px solid #D0D7E2" }}
            >
              {directoryProfiles.length} result{directoryProfiles.length === 1 ? "" : "s"}
            </span>
          </div>

          <div
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Validation Note
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
              Directory results are generated from PeptideScholar&apos;s internal routing-profile model. They should not be read as verified claims about specific external clinic rosters, service levels, or local scheduling.
            </div>
          </div>

          {directoryProfiles.length > 0 ? (
            <div className="grid gap-3">
              {directoryProfiles.map((partner) => (
                <ProviderPartnerCard
                  key={partner.slug}
                  partner={partner}
                  location={providerEnabled ? "providers_directory_active" : "providers_directory_reference"}
                  marketCode={market.code}
                />
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <h3 className="text-lg font-bold mb-2" style={{ color: "#1A3A5C" }}>
                No routing profiles match every selected filter
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A6577" }}>
                Clear one or two filters to widen the current routing view, or use the matcher below to package your situation directly.
              </p>
              <div className="flex flex-wrap gap-3">
                {hasDirectoryFilters && (
                  <Link
                    href="/providers"
                    className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
                    style={{ backgroundColor: "#FFFFFF", color: "#1A3A5C", border: "1px solid #D0D7E2", textDecoration: "none" }}
                  >
                    Clear filters
                  </Link>
                )}
                <Link
                  href={initialTreatment !== "general" ? `/providers?treatment=${encodeURIComponent(initialTreatment)}` : "/providers"}
                  className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
                  style={{ backgroundColor: "#1A3A5C", color: "#FFFFFF", textDecoration: "none" }}
                >
                  Use provider matcher
                </Link>
              </div>
            </div>
          )}
        </section>

        {!hasDirectoryFilters && providerEnabled && featuredMatches.length > 0 && (
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2" style={{ color: "#1A3A5C" }}>
                Featured Routing Paths
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5A6577" }}>
                These are the strongest starting points based on the current treatment context. The matcher below narrows them further by state, budget, insurance, and urgency.
              </p>
            </div>
            <div className="grid gap-3">
              {featuredMatches.map((partner) => (
                <ProviderPartnerCard
                  key={partner.slug}
                  partner={partner}
                  location="providers_page_featured"
                  marketCode={market.code}
                />
              ))}
            </div>
          </section>
        )}

        <ProviderMatcher marketCode={market.code} initialTreatment={initialTreatment} />

        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}

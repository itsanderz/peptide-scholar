import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BreadcrumbNav,
  MedicalDisclaimer,
  PageTracker,
  ProviderIntentCard,
  ProviderPartnerCard,
} from "@/components";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { getAllStatesLegal, getStateBySlug } from "@/data/states-legal";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates, withLocaleParams } from "@/lib/locale-params";
import { canShowProviderReferrals } from "@/lib/market";
import { getProviderMatches, getProviderStateGuidance } from "@/lib/provider-routing";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return withLocaleParams(getAllStatesLegal().map((state) => ({ slug: state.stateSlug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const state = getStateBySlug(slug);
  if (!state) return {};
  const market = await getRequestMarket();
  const alt = localeAlternates(siteConfig.domain, `/providers/state/${slug}`, locale);

  return {
    ...generateSEO({
      title: `${state.stateName} Provider Routing Guide`,
      description:
        market.code === "us"
          ? `Review PeptideScholar's internal provider-routing guidance for ${state.stateName}, based on the site's current legal-state model.`
          : `See how PeptideScholar is staging provider-routing guidance for ${state.stateName} as market rollout expands.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

export default async function ProviderStatePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const state = getStateBySlug(slug);
  if (!state) notFound();

  const market = await getRequestMarket();
  const providerEnabled = canShowProviderReferrals(market.code);
  const stateGuidance = getProviderStateGuidance(slug);
  const matches = getProviderMatches({
    marketCode: market.code,
    treatmentSlug: "general",
    goal: "education-first",
    state: state.stateName,
    insuranceStatus: state.stance === "restrictive" ? "insured" : "either",
    budgetBand: "unsure",
    urgency: "researching",
  }).matches;

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{
          page_family: "provider_state",
          page_slug: slug,
          market: market.code,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${state.stateName} Provider Routing Guide`,
          description: `Internal routing guidance for ${state.stateName} based on PeptideScholar's legal-state model.`,
          url: `${siteConfig.domain}/providers/state/${slug}`,
        }}
      />

      <div className="container py-8 legacy-index-page">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Providers", href: "/providers" },
            { label: state.stateName, href: `/providers/state/${slug}` },
          ]}
        />

        <div className="mt-6 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F8FAFC", borderColor: "#D0D7E2", color: "#334155" }}
          >
            <span>Active market:</span>
            <span style={{ color: "#1A3A5C" }}>{market.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A3A5C" }}>
            {state.stateName} Provider Routing Guide
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
            This page reflects PeptideScholar&apos;s internal routing guidance for {state.stateName}, derived from the current legal-state model and used to shape matcher prioritization.
          </p>
        </div>

        <div
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B45309] mb-2">
            Validation Note
          </div>
          <div className="text-sm md:text-base text-[#92400E]">
            This is not a claim that any specific provider is licensed, available, or operational in {state.stateName}. It is internal routing guidance based on the site&apos;s current state model.
          </div>
        </div>

        {stateGuidance && (
          <section className="mb-8 grid gap-4">
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
            >
              <h2 className="text-xl font-bold mb-2" style={{ color: "#1A3A5C" }}>
                {stateGuidance.headline}
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#1C2028" }}>
                {stateGuidance.summary}
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#1C2028" }}>
                {stateGuidance.emphasis}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#92400E" }}>
                {stateGuidance.caution}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
                  State Stance
                </div>
                <div className="text-sm font-semibold capitalize" style={{ color: "#1C2028" }}>
                  {state.stance}
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
                  Compounding
                </div>
                <div className="text-sm font-semibold" style={{ color: "#1C2028" }}>
                  {state.compoundingAllowed ? "Allowed in current state model" : "Restricted in current state model"}
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
                  Age Restrictions
                </div>
                <div className="text-sm font-semibold" style={{ color: "#1C2028" }}>
                  {state.ageRestrictions ? "Additional caution" : "Standard clinical caution"}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1A3A5C" }}>
            Routing Profiles For {state.stateName}
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#5A6577" }}>
            These routing profiles are the current best-fit internal options for this state context. They are not verified state-specific provider rosters.
          </p>
          <div className="grid gap-3">
            {matches.map((partner) => (
              <ProviderPartnerCard
                key={partner.slug}
                partner={partner}
                location="provider_state_page"
                marketCode={market.code}
              />
            ))}
          </div>
        </section>

        <ProviderIntentCard
          marketCode={market.code}
          location="provider_state"
          treatmentSlug="general"
          headline={providerEnabled ? `Need to narrow the right path in ${state.stateName}?` : `Want rollout updates for ${state.stateName}?`}
          description={
            providerEnabled
              ? "Use the provider matcher to combine this state context with treatment, budget, insurance, and urgency."
              : `Save your preferences now and we will notify you when provider-routing support expands for ${state.stateName}.`
          }
          buttonText={providerEnabled ? "Use provider matcher" : "Join provider rollout"}
        />

        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}

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
import {
  getAllProviderGoalSlugs,
  getProviderPartnersByGoal,
} from "@/data/provider-partners";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates, withLocaleParams } from "@/lib/locale-params";
import { canShowProviderReferrals } from "@/lib/market";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

function formatGoalLabel(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  return withLocaleParams(
    getAllProviderGoalSlugs().map((slug) => ({ slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const partners = getProviderPartnersByGoal(slug);
  if (partners.length === 0) return {};
  const market = await getRequestMarket();
  const goalName = formatGoalLabel(slug);
  const alt = localeAlternates(siteConfig.domain, `/providers/goal/${slug}`, locale);

  return {
    ...generateSEO({
      title: `${goalName} Provider Paths`,
      description:
        market.code === "us"
          ? `Review curated routing profiles for ${goalName.toLowerCase()}, including fit, intake style, and next-step guidance.`
          : `See how PeptideScholar is structuring ${goalName.toLowerCase()} routing profiles for ${market.name}.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

export default async function ProviderGoalPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const partners = getProviderPartnersByGoal(slug);
  if (partners.length === 0) notFound();

  const market = await getRequestMarket();
  const providerEnabled = canShowProviderReferrals(market.code);
  const goalName = formatGoalLabel(slug);

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{
          page_family: "provider_goal",
          page_slug: slug,
          market: market.code,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${goalName} Provider Paths`,
          description: `Curated routing profiles for ${goalName.toLowerCase()}.`,
          url: `${siteConfig.domain}/providers/goal/${slug}`,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Providers", href: "/providers" },
            { label: goalName, href: `/providers/goal/${slug}` },
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
            {goalName} Provider Paths
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
            {providerEnabled
              ? `These routing-profile options are the strongest current fit for ${goalName.toLowerCase()} goals.`
              : `These routing-profile concepts help shape future ${goalName.toLowerCase()} routing in ${market.name}.`}
          </p>
        </div>

        <div className="grid gap-3 mb-8">
          {partners.map((partner) => (
            <ProviderPartnerCard
              key={partner.slug}
              partner={partner}
              location="provider_goal_page"
              marketCode={market.code}
            />
          ))}
        </div>

        <ProviderIntentCard
          marketCode={market.code}
          location="provider_goal"
          treatmentSlug="general"
          headline={providerEnabled ? `Need help narrowing the right ${goalName.toLowerCase()} route?` : `Want ${goalName.toLowerCase()} rollout updates?`}
          description={
            providerEnabled
              ? "Use the provider matcher to narrow by treatment, insurance, urgency, and budget."
              : `Save your preferences now and we will notify you when ${goalName.toLowerCase()} provider routing opens in ${market.name}.`
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

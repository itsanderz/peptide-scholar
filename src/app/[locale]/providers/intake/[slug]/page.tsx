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
  getAllProviderIntakeModes,
  getProviderPartnersByIntakeMode,
  type ProviderIntakeMode,
} from "@/data/provider-partners";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates, withLocaleParams } from "@/lib/locale-params";
import { canShowProviderReferrals } from "@/lib/market";
import { humanizeProviderIntakeMode } from "@/lib/provider-options";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

function isProviderIntakeMode(value: string): value is ProviderIntakeMode {
  return ["telehealth", "hybrid"].includes(value);
}

export async function generateStaticParams() {
  return withLocaleParams(getAllProviderIntakeModes().map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || !isProviderIntakeMode(slug)) return {};
  const partners = getProviderPartnersByIntakeMode(slug);
  if (partners.length === 0) return {};
  const market = await getRequestMarket();
  const intakeLabel = humanizeProviderIntakeMode(slug);
  const alt = localeAlternates(siteConfig.domain, `/providers/intake/${slug}`, locale);

  return {
    ...generateSEO({
      title: `${intakeLabel} Routing Profiles`,
      description:
        market.code === "us"
          ? `Review curated routing profiles for ${intakeLabel.toLowerCase()} pathways, including treatment focus, fit, and next-step guidance.`
          : `See how PeptideScholar is structuring ${intakeLabel.toLowerCase()} routing profiles for ${market.name}.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

export default async function ProviderIntakePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || !isProviderIntakeMode(slug)) notFound();

  const partners = getProviderPartnersByIntakeMode(slug);
  if (partners.length === 0) notFound();

  const market = await getRequestMarket();
  const providerEnabled = canShowProviderReferrals(market.code);
  const intakeLabel = humanizeProviderIntakeMode(slug);

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{
          page_family: "provider_intake",
          page_slug: slug,
          market: market.code,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${intakeLabel} Routing Profiles`,
          description: `Curated routing profiles for ${intakeLabel.toLowerCase()} pathways.`,
          url: `${siteConfig.domain}/providers/intake/${slug}`,
        }}
      />

      <div className="container py-8 legacy-index-page">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Providers", href: "/providers" },
            { label: intakeLabel, href: `/providers/intake/${slug}` },
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
            {intakeLabel} Routing Profiles
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
            {providerEnabled
              ? `These are the strongest routing-profile options we currently map for ${intakeLabel.toLowerCase()} pathways.`
              : `These routing-profile concepts help shape future ${intakeLabel.toLowerCase()} routing in ${market.name}. Active matching may still be staged.`}
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
            This page reflects PeptideScholar&apos;s internal routing model for intake style, not verified information about any external clinic&apos;s staffing model, visit format, or scheduling workflow.
          </div>
        </div>

        <div className="grid gap-3 mb-8">
          {partners.map((partner) => (
            <ProviderPartnerCard
              key={partner.slug}
              partner={partner}
              location="provider_intake_page"
              marketCode={market.code}
            />
          ))}
        </div>

        <ProviderIntentCard
          marketCode={market.code}
          location="provider_intake"
          treatmentSlug="general"
          headline={providerEnabled ? `Need help narrowing the right ${intakeLabel.toLowerCase()} route?` : `Want ${intakeLabel.toLowerCase()} rollout updates?`}
          description={
            providerEnabled
              ? "Use the provider matcher to combine intake style with treatment, insurance, budget, urgency, and state context."
              : `Save your preferences now and we will notify you when ${intakeLabel.toLowerCase()} routing opens in ${market.name}.`
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

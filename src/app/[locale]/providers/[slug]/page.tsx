import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BreadcrumbNav,
  MedicalDisclaimer,
  PageTracker,
  ProviderIntentCard,
} from "@/components";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { getAllProviderPartners, getProviderPartnerBySlug } from "@/data/provider-partners";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates, withLocaleParams } from "@/lib/locale-params";
import { canShowProviderReferrals } from "@/lib/market";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

function formatTreatmentLabel(slug: string) {
  if (slug === "general") return "General guidance";
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  return withLocaleParams(getAllProviderPartners().map((partner) => ({ slug: partner.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const partner = getProviderPartnerBySlug(slug);
  if (!partner) return {};
  const market = await getRequestMarket();
  const alt = localeAlternates(siteConfig.domain, `/providers/${slug}`, locale);

  return {
    ...generateSEO({
      title: `${partner.name}: Routing Profile Overview`,
      description:
        market.code === "us"
          ? `${partner.name} is a curated routing profile for ${partner.bestFit.toLowerCase()}. Review fit, treatment focus, and next-step guidance.`
          : `${partner.name} is part of PeptideScholar's routing-profile framework. Review fit and join rollout updates for ${market.name}.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

export default async function ProviderPartnerPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const partner = getProviderPartnerBySlug(slug);
  if (!partner) notFound();

  const market = await getRequestMarket();
  const providerEnabled = canShowProviderReferrals(market.code);
  const isMarketReady = partner.markets.includes(market.code);

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{
          page_family: "provider_detail",
          page_slug: slug,
          market: market.code,
        }}
      />
      <PageTracker
        event="provider_partner_view"
        params={{
          partner_slug: slug,
          market: market.code,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: partner.name,
          description: partner.description,
          url: `${siteConfig.domain}/providers/${slug}`,
        }}
      />

      <div className="container py-8 legacy-index-page">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Providers", href: "/providers" },
            { label: partner.name, href: `/providers/${partner.slug}` },
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
            {partner.name}
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
            {partner.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Best Fit
            </div>
            <div className="text-sm font-semibold" style={{ color: "#1C2028" }}>
              {partner.bestFit}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Intake Mode
            </div>
            <div className="text-sm font-semibold capitalize" style={{ color: "#1C2028" }}>
              {partner.intakeMode}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
              Turnaround
            </div>
            <div className="text-sm font-semibold" style={{ color: "#1C2028" }}>
              {partner.turnaroundLabel}
            </div>
          </div>
        </div>

        <div
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B45309] mb-2">
            Validation Note
          </div>
          <div className="text-sm md:text-base text-[#92400E]">
            This page describes PeptideScholar&apos;s internal routing profile, not a verified claim about a specific clinic&apos;s service levels, scheduling, or outcomes.
          </div>
        </div>

        {partner.verificationSummary && (
          <div
            className="rounded-xl p-4 mb-8"
            style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0369A1] mb-2">
              Internal Verification
            </div>
            <div className="text-sm md:text-base text-[#0C4A6E]">
              {partner.verificationSummary}
            </div>
            {partner.proofSignals && partner.proofSignals.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {partner.proofSignals.map((signal) => (
                  <span
                    key={signal}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#0C4A6E",
                      border: "1px solid #BAE6FD",
                    }}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
            Market Readiness
          </div>
          <div className="text-sm md:text-base text-[#1C2028]">
            {providerEnabled && isMarketReady
              ? "This routing profile is available for active routing in the selected market."
              : `This routing profile is part of PeptideScholar's framework, but active routing may still be staged for ${market.name}.`}
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1A3A5C" }}>
            Treatment Focus
          </h2>
          <div className="flex flex-wrap gap-2">
            {partner.treatments.map((treatment) => (
              <span
                key={treatment}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "#F8FAFC",
                  color: "#1A3A5C",
                  border: "1px solid #D0D7E2",
                }}
              >
                {formatTreatmentLabel(treatment)}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "#1A3A5C" }}>
            Best For
          </h2>
          <ul className="grid gap-3">
            {partner.goals.map((goal) => (
              <li
                key={goal}
                className="rounded-xl p-4 text-sm"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2", color: "#1C2028" }}
              >
                {formatTreatmentLabel(goal)}
              </li>
            ))}
          </ul>
        </section>

        {partner.partnerStatus === "live-partner" && partner.externalUrl ? (
          <div
            className="rounded-xl p-6 mb-8"
            style={{ backgroundColor: "#ECFDF5", border: "2px solid #5EEAD4" }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: "#065F46" }}>
              Start Your Visit at {partner.name}
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#047857" }}>
              {partner.description}
            </p>
            <a
              href={partner.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              style={{ backgroundColor: "#0D9488", color: "#FFFFFF", textDecoration: "none" }}
            >
              {partner.nextStepLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <p className="text-[11px] mt-3" style={{ color: "#6B7280" }}>
              PeptideScholar may receive compensation from provider referrals. This does not influence our editorial content.
            </p>
          </div>
        ) : (
          <ProviderIntentCard
            marketCode={market.code}
            location="provider_detail"
            treatmentSlug={partner.treatments.find((value) => value !== "general") ?? "general"}
            headline={providerEnabled ? "Want this route prioritized?" : `Want rollout updates for ${market.name}?`}
            description={
              providerEnabled
                ? "Use the provider matcher to package your state, budget, insurance, and urgency details so this routing profile can be prioritized correctly."
                : `Save your treatment preferences and we will notify you when this routing profile becomes active in ${market.name}.`
            }
            buttonText={providerEnabled ? "Use provider matcher" : "Join provider rollout"}
          />
        )}

        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}

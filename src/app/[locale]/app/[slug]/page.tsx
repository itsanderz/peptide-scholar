import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BreadcrumbNav,
  EmailCapture,
  FAQ,
  JsonLd,
  MedicalDisclaimer,
  PageTracker,
  SourceCitationList,
} from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { getGeneratedAppLandingContent, getGeneratedAppLandingSlugs } from "@/lib/generated-content";
import { isValidLocale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getGeneratedAppLandingSlugs("us").map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || locale !== "en") return {};
  const page = getGeneratedAppLandingContent(slug, "us");
  if (!page) return {};

  return generateSEO({
    title: page.seo.title,
    description: page.seo.description,
    canonical: `${siteConfig.domain}${page.seo.canonicalPath}`,
    siteName: siteConfig.name,
  });
}

export default async function AppLandingDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();

  const page = getGeneratedAppLandingContent(slug, "us");
  if (!page) notFound();

  const market = await getRequestMarket();

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{ page_family: "app_landing", page_slug: slug, market: market.code }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.seo.title,
          description: page.seo.description,
          url: `${siteConfig.domain}${page.seo.canonicalPath}`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "App", href: "/app" },
            { label: page.title, href: page.seo.canonicalPath },
          ]}
        />

        <div className="mt-6 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F8FAFC", borderColor: "#D0D7E2", color: "#334155" }}
          >
            <span>Structured page family:</span>
            <span style={{ color: "#1A3A5C" }}>App landing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            {page.title}
          </h1>
          <p className="text-lg leading-relaxed max-w-4xl" style={{ color: "#5A6577" }}>
            {page.summary}
          </p>
        </div>

        <div
          className="rounded-xl p-4 mb-8"
          style={{
            backgroundColor: market.code === "us" ? "#ECFDF5" : "#FFF7ED",
            border: `1px solid ${market.code === "us" ? "#A7F3D0" : "#FDBA74"}`,
          }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
            style={{ color: market.code === "us" ? "#047857" : "#C2410C" }}
          >
            Launch State
          </div>
          <div
            className="text-sm md:text-base"
            style={{ color: market.code === "us" ? "#065F46" : "#9A3412" }}
          >
            {market.code === "us"
              ? page.availabilitySummary
              : `${market.name} is selected, but this landing page currently validates US-first demand for the tracker workflow.`}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-[0.16em] mb-2"
              style={{ color: "#3B7A9E" }}
            >
              Planned Features
            </div>
            <ul className="space-y-2 text-sm" style={{ color: "#1C2028" }}>
              {page.supportedFeatures.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-[0.16em] mb-2"
              style={{ color: "#3B7A9E" }}
            >
              Privacy and Scope
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#1C2028" }}>
              {page.privacySummary}
            </p>
            <Link
              href={`/costs/${page.supportedTreatments[0]}`}
              className="font-semibold"
              style={{ color: "#3B7A9E" }}
            >
              Compare cost and provider paths &rarr;
            </Link>
          </div>
        </div>

        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-[0.16em] mb-2"
            style={{ color: "#3B7A9E" }}
          >
            Trust Summary
          </div>
          <div className="text-sm leading-relaxed mb-2" style={{ color: "#1C2028" }}>
            Reviewed {page.trust.reviewedAt} by {page.trust.reviewedBy}. This page currently cites{" "}
            {page.trust.sourceCount} official source{page.trust.sourceCount === 1 ? "" : "s"}.
          </div>
          <div className="text-sm leading-relaxed" style={{ color: "#5A6577" }}>
            {page.trust.disclaimer}
          </div>
        </div>

        <EmailCapture
          headline={page.cta.primaryLabel}
          description={page.availabilitySummary}
          buttonText="Join tracker waitlist"
          signupLocation={`app_landing_${page.appUseCaseSlug}`}
          marketCode={market.code}
          offerSlug={page.appUseCaseSlug}
          appUseCase={page.appUseCaseSlug}
          platformInterest="web-first"
        />

        <FAQ items={page.faqs} title={`${page.title} FAQ`} />
        <SourceCitationList sources={page.sources} />

        <div className="mt-8">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO } from "@/components/SEOHead";
import { BreadcrumbNav, PageTracker, ProviderIntentCard, TrackedMailtoLink } from "@/components";
import { getProviderPartnerBySlug } from "@/data/provider-partners";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/contact", locale);

  return {
    ...generateSEO({
      title: "Contact PeptideScholar",
      description:
        "Contact the PeptideScholar team with questions, corrections, or partnership inquiries. We are committed to accuracy and welcome feedback on our evidence-based peptide reference.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string; partner?: string; treatment?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();
  const { topic, partner, treatment } = await searchParams;
  const providerPartner = typeof partner === "string" ? getProviderPartnerBySlug(partner) : undefined;
  const providerTopic = topic === "provider-match" && providerPartner;

  const prefix = locale === "en" ? "" : `/${locale}`;
  const providerEmailHref = `mailto:info@peptidescholar.com?subject=${encodeURIComponent(
    providerTopic
      ? `Provider Match Follow-Up: ${providerPartner.name}${typeof treatment === "string" ? ` (${treatment})` : ""}`
      : "PeptideScholar Inquiry"
  )}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageTracker
        event="market_page_view"
        params={{
          page_family: providerTopic ? "provider_contact" : "contact",
          page_slug: providerTopic ? providerPartner.slug : "contact",
          market: market.code,
        }}
      />
      {providerTopic && (
        <PageTracker
          event="provider_partner_contact_view"
          params={{
            partner_slug: providerPartner.slug,
            market: market.code,
          }}
        />
      )}
      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Contact", href: `${prefix}/contact` },
        ]}
      />

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1A3A5C] mb-4 mt-6"
        style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
      >
        Contact Us
      </h1>

      <p className="text-lg text-[#5A6577] mb-8 leading-relaxed" style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>
        We welcome corrections, questions, and feedback. Accuracy is our priority — if you find an error in any of our evidence summaries or citations, please let us know.
      </p>

      {providerTopic && (
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
            Provider Match Follow-Up
          </div>
          <h2
            className="text-xl font-bold text-[#1A3A5C] mb-2"
            style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
          >
            {providerPartner.name}
          </h2>
          <p className="text-sm text-[#5A6577] leading-relaxed mb-3">
            You came in through a routing-profile recommendation for <strong>{providerPartner.bestFit}</strong>.
            {typeof treatment === "string" ? ` Treatment context: ${treatment}.` : ""}
            {" "}Use the contact route below for manual follow-up, coordination, or routing questions that should not wait for the matcher queue.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: "#FFFFFF", color: "#1A3A5C", border: "1px solid #D0D7E2" }}
            >
              {providerPartner.turnaroundLabel}
            </span>
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium capitalize"
              style={{ backgroundColor: "#FFFFFF", color: "#1A3A5C", border: "1px solid #D0D7E2" }}
            >
              {providerPartner.intakeMode}
            </span>
          </div>
          <TrackedMailtoLink
            href={providerEmailHref}
            marketCode={market.code}
            partnerSlug={providerPartner.slug}
            treatmentSlug={typeof treatment === "string" ? treatment : undefined}
            className="inline-flex items-center text-sm font-semibold"
            style={{ color: "#1A3A5C" }}
          >
            Email this provider follow-up &rarr;
          </TrackedMailtoLink>
        </div>
      )}

      {/* Contact Cards */}
      <div className="space-y-4 mb-10">
        <div
          className="flex items-start gap-4 p-5 rounded-xl bg-white"
          style={{ border: "1px solid #D0D7E2" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#EBF5FF" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B7A9E" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-[#1A3A5C] mb-1" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
              General Inquiries
            </div>
            <p className="text-sm text-[#5A6577] mb-2">
              Questions about our content, evidence grading methodology, or site features.
            </p>
            <a
              href={providerTopic ? providerEmailHref : "mailto:info@peptidescholar.com"}
              className="text-sm font-semibold"
              style={{ color: "#3B7A9E" }}
            >
              info@peptidescholar.com
            </a>
          </div>
        </div>

        <div
          className="flex items-start gap-4 p-5 rounded-xl bg-white"
          style={{ border: "1px solid #D0D7E2" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#F0FFF4" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-[#1A3A5C] mb-1" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
              Content Corrections
            </div>
            <p className="text-sm text-[#5A6577] mb-2">
              Found an error in a citation, evidence level, or factual claim? We take accuracy seriously and prioritize corrections.
            </p>
            <a
              href="mailto:info@peptidescholar.com?subject=Content Correction"
              className="text-sm font-semibold"
              style={{ color: "#2B8A5E" }}
            >
              Submit a correction
            </a>
          </div>
        </div>

        <div
          className="flex items-start gap-4 p-5 rounded-xl bg-white"
          style={{ border: "1px solid #D0D7E2" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#FFF8EB" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4912A" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-[#1A3A5C] mb-1" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
              Partnership &amp; Media Inquiries
            </div>
            <p className="text-sm text-[#5A6577] mb-2">
              Press, partnership, or research collaboration inquiries.
            </p>
            <a
              href={providerTopic ? providerEmailHref : "mailto:info@peptidescholar.com?subject=Partnership Inquiry"}
              className="text-sm font-semibold"
              style={{ color: "#D4912A" }}
            >
              info@peptidescholar.com
            </a>
          </div>
        </div>
      </div>

      {/* Important Disclaimer */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}
      >
        <div className="flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div>
            <p className="font-bold text-[#92400E] text-sm mb-1">We Cannot Provide Medical Advice</p>
            <p className="text-sm text-[#92400E] leading-relaxed">
              PeptideScholar is an educational reference, not a medical service. We cannot respond to personal health questions, dosing inquiries, or requests for medical recommendations. Please consult a licensed healthcare provider for any medical questions.
            </p>
          </div>
        </div>
      </div>

      {/* Response time note */}
      <div
        className="rounded-xl p-5"
        style={{ backgroundColor: "#F0F3F7", border: "1px solid #D0D7E2" }}
      >
        <h2
          className="font-bold text-[#1A3A5C] mb-2"
          style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
        >
          Response Times
        </h2>
        <p className="text-sm text-[#5A6577] leading-relaxed">
          We respond to correction reports within 48 hours and general inquiries within 3-5 business days.
          Content corrections that are verified against primary literature are prioritized and corrected as quickly as possible.
        </p>
      </div>

      {providerTopic && (
        <div className="mt-8">
          <ProviderIntentCard
            marketCode={market.code}
            location="contact_provider_followup"
            treatmentSlug={typeof treatment === "string" ? treatment : "general"}
            headline="Need to tighten the match first?"
            description="If you are not ready for manual follow-up yet, go back through the provider matcher and refine treatment, budget, insurance, and urgency details."
            buttonText="Return to provider matcher"
          />
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, FAQ, JsonLd, MedicalDisclaimer, PageTracker, SourceCitationList } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import {
  getGeneratedMarketTreatmentContent,
  getGeneratedMarketTreatmentSlugs,
  getMarketCodesWithTreatmentContent,
} from "@/lib/generated-content";
import { getMarketByCode } from "@/data/markets";
import { siteConfig } from "@/lib/siteConfig";
import type { MarketCode } from "@/types/market";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  warning: "#D4912A",
  danger: "#D4553A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

interface Props {
  params: Promise<{ marketCode: string; slug: string }>;
}

/* ── Static params ─────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const codes = getMarketCodesWithTreatmentContent();
  return codes.flatMap((marketCode) =>
    getGeneratedMarketTreatmentSlugs(marketCode).map((slug) => ({
      marketCode,
      slug,
    }))
  );
}

/* ── Metadata ──────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marketCode, slug } = await params;
  const hub = getGeneratedMarketTreatmentContent(slug, marketCode as MarketCode);
  if (!hub) return {};

  return generateSEO({
    title: hub.seo.title,
    description: hub.seo.description,
    canonical: `${siteConfig.domain}${hub.seo.canonicalPath}`,
    siteName: siteConfig.name,
  });
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function MarketTreatmentPage({ params }: Props) {
  const { marketCode, slug } = await params;

  const hub = getGeneratedMarketTreatmentContent(slug, marketCode as MarketCode);
  if (!hub) notFound();

  const market = getMarketByCode(marketCode);
  if (!market) notFound();

  const approvalBadge =
    hub.approvalStatus === "approved"
      ? { label: "Approved", color: C.success, bg: "#F0FDF4", border: "#BBF7D0" }
      : hub.approvalStatus === "restricted"
      ? { label: "Restricted", color: C.warning, bg: "#FFFBEB", border: "#FDE68A" }
      : { label: "Not approved", color: C.danger, bg: "#FEF2F2", border: "#FECACA" };

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{
          page_family: "market_treatment",
          page_slug: slug,
          market: marketCode,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: hub.seo.title,
          description: hub.seo.description,
          url: `${siteConfig.domain}${hub.seo.canonicalPath}`,
          about: { "@type": "Drug", name: hub.treatmentName },
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Markets", href: "/markets" },
            { label: market.name, href: `/markets/${marketCode}` },
            { label: "Treatments", href: `/markets/${marketCode}/treatments` },
            { label: hub.treatmentName, href: hub.seo.canonicalPath },
          ]}
        />

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "#F0F9FF", color: C.teal, border: "1px solid #BAE6FD" }}
            >
              {market.name}
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: approvalBadge.bg,
                color: approvalBadge.color,
                border: `1px solid ${approvalBadge.border}`,
              }}
            >
              {approvalBadge.label} — {market.regulator}
            </span>
            {hub.approvalScope && (
              <span className="text-xs text-gray-500">{hub.approvalScope}</span>
            )}
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            {hub.treatmentName} in {market.name}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            {hub.marketSummary}
          </p>
        </div>

        {/* ── Trust bar ───────────────────────────────────────────────── */}
        <div
          className="rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4 text-xs text-gray-500"
          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
        >
          <span>
            <strong className="text-gray-700">Regulator:</strong> {market.regulator}
          </span>
          <span>
            <strong className="text-gray-700">Reviewed:</strong> {hub.trust.reviewedAt}
          </span>
          <span>
            <strong className="text-gray-700">Sources:</strong> {hub.trust.sourceCount}
          </span>
          {hub.trust.evidenceLevel && (
            <span>
              <strong className="text-gray-700">Evidence:</strong> Grade {hub.trust.evidenceLevel}
            </span>
          )}
        </div>

        {/* ── Overview ────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Overview
          </h2>
          <p className="text-gray-700 leading-relaxed">{hub.marketSummary}</p>
        </section>

        {/* ── Approved products ───────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            {hub.approvalStatus === "approved" ? "Approved Products" : "Available Products"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {hub.approvedProducts.map((product) => (
              <div
                key={product.slug}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <h3 className="font-bold mb-1.5" style={{ color: C.navy }}>
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{product.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Cost summary ────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Cost in {market.name}
          </h2>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <p className="text-gray-700 leading-relaxed">{hub.costSummary}</p>
          </div>
        </section>

        {/* ── Provider pathway ────────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            How to Access {hub.treatmentName} in {market.name}
          </h2>
          <div
            className="rounded-xl p-5 mb-4"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <p className="text-gray-700 leading-relaxed">{hub.providerPathway}</p>
          </div>
          {hub.onlinePharmacyNotes && (
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: C.teal }}>
                Online prescribing
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{hub.onlinePharmacyNotes}</p>
            </div>
          )}
        </section>

        {/* ── Legal notes ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Legal &amp; Regulatory Notes
          </h2>
          <ul className="space-y-3">
            {hub.legalNotes.map((note, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={C.teal}
                  strokeWidth="2"
                  className="flex-shrink-0 mt-0.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="text-sm text-gray-700 leading-relaxed">{note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
            style={{ backgroundColor: C.navy }}
          >
            <div className="flex-1">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: "#93C5FD" }}
              >
                {market.monetizationState === "full-stack"
                  ? "Find a provider"
                  : "Stay updated"}
              </p>
              <h3
                className="text-xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                {hub.cta.primaryLabel}
              </h3>
              {hub.cta.notes && (
                <p className="text-sm text-blue-200 leading-relaxed">{hub.cta.notes}</p>
              )}
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href={hub.cta.primaryHref}
                className="rounded-xl px-5 py-3 text-sm font-bold"
                style={{ backgroundColor: C.teal, color: "#FFFFFF" }}
              >
                {hub.cta.primaryLabel}
              </Link>
              {hub.cta.secondaryHref && hub.cta.secondaryLabel && (
                <Link
                  href={hub.cta.secondaryHref}
                  className="rounded-xl px-5 py-3 text-sm font-semibold border"
                  style={{ borderColor: "#93C5FD", color: "#93C5FD" }}
                >
                  {hub.cta.secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Frequently Asked Questions
          </h2>
          <FAQ items={hub.faqs} />
        </section>

        {/* ── Disclaimer ──────────────────────────────────────────────── */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A" }}
        >
          <p className="text-xs text-yellow-800 leading-relaxed">{hub.trust.disclaimer}</p>
        </div>

        {/* ── Sources ─────────────────────────────────────────────────── */}
        <section className="mb-8">
          <SourceCitationList sources={hub.sources} />
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

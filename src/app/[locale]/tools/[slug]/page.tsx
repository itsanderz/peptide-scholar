import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, FAQ, JsonLd, MedicalDisclaimer, PageTracker, SourceCitationList } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import {
  getGeneratedToolLandingContent,
  getGeneratedToolLandingSlugs,
} from "@/lib/generated-content";
import { siteConfig } from "@/lib/siteConfig";
import { isValidLocale } from "@/lib/i18n";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

/* ── Static params ─────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = getGeneratedToolLandingSlugs("us");
  return slugs.map((slug) => ({ slug }));
}

/* ── Metadata ──────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGeneratedToolLandingContent(slug);
  if (!page) return {};

  return generateSEO({
    title: page.seo.title,
    description: page.seo.description,
    canonical: `${siteConfig.domain}${page.seo.canonicalPath}`,
    siteName: siteConfig.name,
  });
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function ToolLandingPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const page = getGeneratedToolLandingContent(slug);
  if (!page) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <PageTracker
        event="tool_landing_view"
        params={{
          page_family: "tool_landing",
          page_slug: slug,
          tool_slug: page.toolSlug,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: page.toolName,
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: page.seo.description,
          url: `${siteConfig.domain}${page.seo.canonicalPath}`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: page.toolName, href: `${prefix}/tools/${page.toolSlug}` },
            { label: page.seo.title.split("—")[0].trim(), href: page.seo.canonicalPath },
          ]}
        />

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "#F0F9FF", color: C.teal, border: "1px solid #BAE6FD" }}
            >
              Free Tool
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "#F0FDF4", color: "#2B8A5E", border: "1px solid #BBF7D0" }}
            >
              Runs in browser
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            {page.seo.title.split("—")[0].trim()}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">{page.summary}</p>
        </div>

        {/* ── Primary CTA ─────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ backgroundColor: C.navy }}
        >
          <div className="flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: "#93C5FD" }}
            >
              Interactive tool
            </p>
            <h2
              className="text-xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              {page.toolName}
            </h2>
            {page.cta.notes && (
              <p className="text-sm text-blue-200 leading-relaxed">{page.cta.notes}</p>
            )}
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href={`${prefix}/tools/${page.toolSlug}`}
              className="rounded-xl px-5 py-3 text-sm font-bold"
              style={{ backgroundColor: C.teal, color: "#FFFFFF" }}
            >
              {page.cta.primaryLabel}
            </Link>
            {page.cta.secondaryHref && page.cta.secondaryLabel && (
              <Link
                href={page.cta.secondaryHref}
                className="rounded-xl px-5 py-3 text-sm font-semibold border"
                style={{ borderColor: "#93C5FD", color: "#93C5FD" }}
              >
                {page.cta.secondaryLabel}
              </Link>
            )}
          </div>
        </div>

        {/* ── What you need + what you get ────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <section>
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              What You Enter
            </h2>
            <ul className="space-y-2">
              {page.requiredInputs.map((input, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
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
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span className="text-sm text-gray-700 leading-relaxed">{input}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              What You Get
            </h2>
            <ul className="space-y-2">
              {page.exampleOutputs.map((output, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2B8A5E"
                    strokeWidth="2"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm text-gray-700 leading-relaxed">{output}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Trust bar ───────────────────────────────────────────────── */}
        <div
          className="rounded-xl p-4 mb-10 flex flex-wrap items-center gap-4 text-xs text-gray-500"
          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
        >
          <span>
            <strong className="text-gray-700">Reviewed:</strong> {page.trust.reviewedAt}
          </span>
          <span>
            <strong className="text-gray-700">Sources:</strong> {page.trust.sourceCount}
          </span>
          {page.trust.evidenceLevel && (
            <span>
              <strong className="text-gray-700">Evidence:</strong> Grade {page.trust.evidenceLevel}
            </span>
          )}
          <span>
            <strong className="text-gray-700">Treatment:</strong>{" "}
            {page.supportedTreatments.join(", ")}
          </span>
        </div>

        {/* ── App handoff ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: C.teal }}>
              From calculator to tracker
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{page.appHandoffSummary}</p>
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
          <FAQ items={page.faqs} />
        </section>

        {/* ── Disclaimer ──────────────────────────────────────────────── */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A" }}
        >
          <p className="text-xs text-yellow-800 leading-relaxed">{page.trust.disclaimer}</p>
        </div>

        {/* ── Sources ─────────────────────────────────────────────────── */}
        <section className="mb-8">
          <SourceCitationList sources={page.sources} />
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

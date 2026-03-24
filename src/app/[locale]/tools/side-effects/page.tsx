import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import SideEffectsClient from "./SideEffectsClient";
import { sideEffectProfiles } from "@/data/clinical-data";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

/* ── SEO ───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/tools/side-effects", locale);

  return {
    ...generateSEO({
      title: "GLP-1 Side Effect Probability Visualizer — Drug vs Placebo",
      description:
        "Compare GLP-1 medication side effect rates vs placebo from FDA clinical trial data. Visualize nausea, diarrhea, vomiting rates for Wegovy, Ozempic, Mounjaro, Zepbound, and Saxenda. Based on STEP, SURPASS, and SCALE trial data.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function SideEffectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  /* Serialize profile data for client component */
  const profileData = sideEffectProfiles.map((p) => ({
    slug: p.slug,
    brandName: p.brandName,
    genericName: p.genericName,
    dose: p.dose,
    trialName: p.trialName,
    sideEffects: p.sideEffects,
    discontinuationRate: p.discontinuationRate,
    source: p.source,
    sourceUrl: p.sourceUrl,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Side Effect Probability Visualizer",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Visualize GLP-1 medication side effect rates compared to placebo from FDA clinical trial data. Based on STEP, SURPASS, and SCALE trials.",
          url: `${siteConfig.domain}/tools/side-effects`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Side Effect Visualizer", href: `${prefix}/tools/side-effects` },
          ]}
        />

        {/* ── Title ─────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Side Effect Probability Visualizer
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Compare side effect rates for GLP-1 medications against placebo, sourced directly
            from FDA clinical trial data. Select one or more medications to compare.
          </p>
        </div>

        {/* ── Side Effects Tool ───────────────────────────────────────── */}
        <SideEffectsClient profiles={profileData} />

        <AdSlot className="my-8" />

        {/* ── About This Data ────────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            About This Data
          </h2>
          <div
            className="rounded-xl p-6 space-y-4 text-sm text-gray-700 leading-relaxed"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <p>
              All percentages are derived from the adverse event tables in each medication&apos;s
              FDA prescribing information, which in turn reflect pooled data from pivotal Phase 3
              clinical trials. Side effects shown are those occurring in &ge;3% of participants
              and at a higher rate than placebo.
            </p>
            <p>
              <strong>Drug %</strong> is the percentage of participants in the active treatment
              arm who reported the side effect. <strong>Placebo %</strong> is the percentage in
              the placebo arm. The difference represents the attributable rate — how much the
              medication likely adds beyond baseline.
            </p>
            <p>
              <strong>Discontinuation rate</strong> reflects the percentage of participants who
              stopped the medication due to adverse events in each arm of the trial. A higher
              discontinuation rate with drug vs placebo reflects medication tolerability.
            </p>
            <p>
              Individual experience varies. These are population-level statistics from controlled
              trial conditions and may not reflect real-world use, especially with dose
              modifications.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

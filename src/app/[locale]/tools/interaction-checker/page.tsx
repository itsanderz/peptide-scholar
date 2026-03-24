import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import InteractionCheckerClient from "./InteractionCheckerClient";
import { peptideInteractions } from "@/data/clinical-data";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/interaction-checker", locale);

  return {
    ...generateSEO({
      title: "Peptide Interaction Checker — Check Drug Combinations",
      description:
        "Free peptide and GLP-1 drug interaction checker. Check combinations of semaglutide, tirzepatide, liraglutide, BPC-157, TB-500, ipamorelin, and more. Severity-coded results with evidence levels from FDA prescribing information.",
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
export default async function InteractionCheckerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  /* Serialize interaction data for client component */
  const interactionData = peptideInteractions.map((i) => ({
    peptideA: i.peptideA,
    peptideB: i.peptideB,
    severity: i.severity,
    evidence: i.evidence,
    description: i.description,
    recommendation: i.recommendation,
    source: i.source,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Peptide Interaction Checker",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Free peptide and GLP-1 medication interaction checker. Check known interactions between peptides with severity ratings and evidence levels from FDA prescribing information.",
          url: `${siteConfig.domain}/tools/interaction-checker`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Interaction Checker", href: `${prefix}/tools/interaction-checker` },
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
            Peptide Interaction Checker
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Check known interactions between peptides and GLP-1 medications. Results are
            severity-coded and sourced from FDA prescribing labels and published literature.
          </p>
        </div>

        {/* ── Critical disclaimer before tool ────────────────────────── */}
        <div
          className="rounded-xl p-4 mb-8 flex gap-3"
          style={{
            backgroundColor: "#FEF3C7",
            border: "1px solid #F59E0B",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B45309"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0 mt-0.5"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <p className="text-sm" style={{ color: "#92400E" }}>
            <strong>Important:</strong> This tool checks known interactions only. Absence of
            data does not mean a combination is safe. Many peptide combinations have not been
            studied in clinical trials. Always consult your healthcare provider before combining
            any medications.
          </p>
        </div>

        {/* ── Interaction Checker Tool ─────────────────────────────────── */}
        <InteractionCheckerClient interactions={interactionData} />

        <AdSlot className="my-8" />

        {/* ── Understanding Interaction Severity ─────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Understanding Severity Ratings
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                label: "Avoid",
                color: "#DC2626",
                bg: "#FEF2F2",
                border: "#FCA5A5",
                desc: "Contraindicated combination. FDA labeling or established clinical evidence prohibits concurrent use.",
              },
              {
                label: "Caution",
                color: "#D97706",
                bg: "#FFFBEB",
                border: "#FCD34D",
                desc: "Combination is possible but requires dose adjustment or monitoring. Clinical data documents meaningful risk.",
              },
              {
                label: "Monitor",
                color: "#2563EB",
                bg: "#EFF6FF",
                border: "#93C5FD",
                desc: "Clinically relevant interaction exists but is manageable with appropriate monitoring and timing.",
              },
              {
                label: "Likely Safe",
                color: "#059669",
                bg: "#F0FDF4",
                border: "#86EFAC",
                desc: "No known clinically significant interaction. No specific precautions identified in available data.",
              },
              {
                label: "No Data",
                color: "#6B7280",
                bg: "#F9FAFB",
                border: "#D1D5DB",
                desc: "No published clinical interaction data exists for this combination. Cannot be assumed safe or unsafe.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4"
                style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
              >
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2"
                  style={{ backgroundColor: item.color, color: "#fff" }}
                >
                  {item.label}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Data Limitations ───────────────────────────────────────── */}
        <section className="mb-8">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <h2
              className="text-lg font-bold mb-2"
              style={{
                color: C.navy,
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
              }}
            >
              Database Limitations
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This database covers interactions documented in FDA prescribing labels and major
              published clinical studies. It does not cover all possible drug-peptide combinations.
              For non-FDA-approved peptides, clinical interaction data is extremely limited or
              nonexistent. The absence of an entry in this tool does not indicate the combination
              has been studied or declared safe. This tool is updated periodically as new data
              becomes available but may not reflect the most recent literature.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

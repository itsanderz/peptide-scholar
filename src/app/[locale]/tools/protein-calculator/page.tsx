import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import ProteinCalculatorClient from "./ProteinCalculatorClient";
import { proteinGuidelines } from "@/data/side-effect-timeline";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  accent: "#D4553A",
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

  const alt = localeAlternates(siteConfig.domain, "/tools/protein-calculator", locale);

  return {
    ...generateSEO({
      title: "GLP-1 Protein Calculator — Daily Target for Muscle Preservation | PeptideScholar",
      description:
        "Calculate your daily protein target while on GLP-1 medications like Wegovy or Zepbound. Based on a 2025 joint advisory from ACLM, ASN, OMA, and the Obesity Society. Helps preserve lean mass during weight loss.",
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
export default async function ProteinCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "GLP-1 Protein Calculator",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Calculates daily protein intake targets for people on GLP-1 medications to preserve lean muscle mass, based on a 2025 joint advisory from ACLM, ASN, OMA, and the Obesity Society.",
          url: `${siteConfig.domain}/tools/protein-calculator`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Protein Calculator", href: `${prefix}/tools/protein-calculator` },
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
            GLP-1 Protein Calculator
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Adequate protein intake is critical while on GLP-1 medications. Clinical data shows
            approximately 40% of weight lost on semaglutide comes from lean mass (Endocrine Society
            ENDO 2025). Calculate your personalized daily target based on the 2025 joint advisory from
            leading obesity medicine societies.
          </p>
        </div>

        {/* ── Evidence Banner ──────────────────────────────────────── */}
        <div
          className="rounded-xl p-4 mb-6 flex gap-3 items-start"
          style={{ backgroundColor: "#F0FDF4", border: `1px solid #BBF7D0` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p className="text-sm leading-relaxed" style={{ color: "#166534" }}>
            <strong>Evidence-based:</strong> Targets derived from the{" "}
            <a
              href={proteinGuidelines.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {proteinGuidelines.source}
            </a>
            . The advisory recommends 1.0–1.5 g/kg/day with a minimum of{" "}
            {proteinGuidelines.recommendations.absoluteTarget.min}–
            {proteinGuidelines.recommendations.absoluteTarget.max}g/day for adults on
            GLP-1 weight loss medications.
          </p>
        </div>

        {/* ── Calculator ───────────────────────────────────────────── */}
        <ProteinCalculatorClient guidelines={proteinGuidelines} />

        <AdSlot className="my-8" />

        {/* ── Per-Meal Protein Guide ────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Hitting Your Target: Practical Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Protein First at Every Meal",
                desc: "Eat your protein source before vegetables and carbohydrates. This helps meet targets even when appetite is significantly reduced on GLP-1 medications.",
              },
              {
                title: "Aim for 25–40g Per Meal",
                desc: `The joint advisory recommends ${proteinGuidelines.recommendations.perMeal.min}–${proteinGuidelines.recommendations.perMeal.max}g of protein per meal to maximize muscle protein synthesis. Below ~20g, the muscle-building signal is reduced.`,
              },
              {
                title: "High-Quality Sources",
                desc: "Prioritize complete protein sources: chicken, fish, eggs, Greek yogurt, cottage cheese, lean beef, tofu, and legumes. These provide all essential amino acids.",
              },
              {
                title: "Older Adults: Aim Higher",
                desc: `Adults 65+ are advised to target ${proteinGuidelines.recommendations.olderAdults.min}–${proteinGuidelines.recommendations.olderAdults.max} g/kg/day to offset age-related muscle loss (sarcopenia), which is accelerated during any caloric deficit.`,
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <h3 className="font-bold text-sm mb-2" style={{ color: C.navy }}>
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related links ─────────────────────────────────────────── */}
        <section className="mb-8">
          <h2
            className="text-xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Related Resources
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/guide/glp1-nutrition`}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: C.navy, color: "#FFFFFF" }}
            >
              GLP-1 Nutrition Guide
            </Link>
            <Link
              href={`${prefix}/tools/symptom-checker`}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: C.teal, color: "#FFFFFF" }}
            >
              Side Effect Timeline Tool
            </Link>
            <Link
              href={`${prefix}/tools/titration-planner`}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, color: C.navy }}
            >
              Titration Planner
            </Link>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

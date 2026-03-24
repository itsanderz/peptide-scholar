import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPeptides } from "@/data/peptides";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import PeptideFinder from "@/components/PeptideFinder";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/peptide-finder", locale);

  return {
    ...generateSEO({
      title: "Peptide Finder — Personalized Research Guide",
      description:
        "Answer 4 quick questions to find the right peptides for your research. Filter by category, evidence level, and preferences. Free guided peptide discovery tool — no signup required.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

/* ── How It Works Steps ────────────────────────────────────────────────── */
const howItWorks = [
  {
    num: "1",
    title: "Select Interests",
    desc: "Choose one or more research areas that interest you, from healing and recovery to cognitive enhancement.",
  },
  {
    num: "2",
    title: "Choose Evidence Level",
    desc: "Decide how much scientific evidence you want behind your results — from FDA-approved only to all peptides.",
  },
  {
    num: "3",
    title: "Set Preferences",
    desc: "Optionally filter by WADA status, administration route, or FDA approval to narrow your results.",
  },
  {
    num: "4",
    title: "Get Results",
    desc: "Receive a personalized list of peptides ranked by evidence level, with links to detailed profiles and legal info.",
  },
];

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function PeptideFinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  /* Serialize peptide data for client component */
  const allPeptides = getAllPeptides();
  const peptideData = allPeptides.map((p) => ({
    name: p.name,
    slug: p.slug,
    category: p.category,
    categoryName: p.categoryName,
    evidenceLevel: p.evidenceLevel,
    description: p.description,
    fdaStatus: p.fdaStatus,
    wadaBanned: p.wadaBanned,
    benefits: p.benefits,
    type: p.type,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Peptide Finder",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Free guided peptide discovery tool. Answer 4 questions to get personalized, evidence-based peptide research recommendations.",
          url: `${siteConfig.domain}/tools/peptide-finder`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Peptide Finder", href: `${prefix}/tools/peptide-finder` },
          ]}
        />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Find the Right Peptide for Your Research
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Answer 4 quick questions to get personalized, evidence-based peptide
            recommendations. No signup. No tracking. 100% free.
          </p>
        </div>

        {/* ── Peptide Finder Tool ──────────────────────────────────────── */}
        <PeptideFinder peptides={peptideData} />

        {/* ── Ad Slot ─────────────────────────────────────────────────── */}
        <AdSlot className="my-8" />

        {/* ── How It Works ────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howItWorks.map((item) => (
              <div
                key={item.num}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: C.teal,
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                  }}
                >
                  {item.num}
                </div>
                <h3
                  className="text-sm font-bold mb-1"
                  style={{
                    color: C.navy,
                    fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Educational Disclaimer ──────────────────────────────────── */}
        <section className="mb-12">
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
              Educational Tool Disclaimer
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This tool provides educational information only. Results are based on
              published research classifications and do not constitute medical
              recommendations. The Peptide Finder categorizes peptides by their
              publicly available evidence level, FDA approval status, and WADA
              classification. No personal health data is collected, stored, or
              analyzed. Always consult a qualified healthcare professional before
              making any decisions related to peptides.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

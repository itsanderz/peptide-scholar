import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPeptides } from "@/data/peptides";
import { getAllCategories } from "@/data/categories";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import PeptideSearch from "@/components/PeptideSearch";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/peptides", locale);

  return {
    ...generateSEO({
      title: "Browse All 22 Peptides — Evidence Grades & Research",
      description:
        "Explore all 22 peptides with evidence grades (A-D), FDA status, mechanisms, and research data. Filter by category, evidence level, and FDA approval. Every claim cited from PubMed.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: alt,
  };
}

export default async function PeptidesIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const allPeptides = getAllPeptides();
  const categories = getAllCategories();

  const fdaApprovedCount = allPeptides.filter((p) => p.fdaStatus === "approved").length;
  const comparisonCount = 35;

  // Serialize for client component
  const peptideData = allPeptides.map((p) => ({
    name: p.name,
    slug: p.slug,
    category: p.category,
    categoryName: p.categoryName,
    evidenceLevel: p.evidenceLevel,
    description: p.description,
    fdaStatus: p.fdaStatus,
  }));

  const categoryData = categories.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Peptides", href: "/peptides" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Browse All Peptides",
          description:
            "Comprehensive directory of 22 research peptides with evidence grades, FDA status, and mechanisms of action.",
          url: `${siteConfig.domain}/peptides`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: allPeptides.length,
            itemListElement: allPeptides.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `${siteConfig.domain}/peptides/${p.slug}`,
            })),
          },
        }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="relative py-14 md:py-20 text-center text-white overflow-hidden"
        style={{ backgroundColor: "#1A3A5C" }}
      >
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #3B7A9E 1px, transparent 1px), radial-gradient(circle at 80% 50%, #3B7A9E 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Browse All Peptides
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-0">
            Every peptide graded A through D for evidence strength. Search, filter, and compare — with every claim
            backed by PubMed citations.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────── */}
      <section className="py-6" style={{ backgroundColor: "#F0F3F7" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: allPeptides.length.toString(), label: "Peptides" },
              { value: fdaApprovedCount.toString(), label: "FDA-Approved" },
              { value: categories.length.toString(), label: "Categories" },
              { value: `${comparisonCount}+`, label: "Comparisons" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-3 px-2 rounded-lg"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
              >
                <div className="text-xl md:text-2xl font-bold" style={{ color: "#1A3A5C" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Evidence Grading Explainer ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pt-10 pb-4">
        <BreadcrumbNav crumbs={crumbs} />

        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <h2
            className="text-base font-bold mb-3"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Understanding Evidence Grades
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { grade: "A", color: "#2B8A5E", bg: "#dcfce7", desc: "FDA-approved with robust clinical evidence" },
              { grade: "B", color: "#3B7A9E", bg: "#dbeafe", desc: "Supported by human clinical studies" },
              { grade: "C", color: "#D4912A", bg: "#fef3c7", desc: "Preclinical (animal/in vitro) evidence only" },
              { grade: "D", color: "#5A6577", bg: "#f3f4f6", desc: "Very limited or no published evidence" },
            ].map((item) => (
              <div key={item.grade} className="flex items-start gap-2">
                <span
                  className="inline-flex items-center justify-center rounded-full shrink-0 mt-0.5"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: item.color,
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                  }}
                >
                  {item.grade}
                </span>
                <p className="text-xs leading-snug m-0" style={{ color: "#5A6577" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search & Results ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <PeptideSearch peptides={peptideData} categories={categoryData} />
      </section>

      {/* ── Ad + Disclaimer ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <AdSlot className="mb-6" />
        <MedicalDisclaimer />
      </section>
    </>
  );
}

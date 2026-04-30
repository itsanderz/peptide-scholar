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
      title: "Browse All Peptides — Evidence Grades & Research",
      description:
        "Explore all peptides with evidence grades (A-D), FDA status, mechanisms, and research data. Filter by category, evidence level, and FDA approval. Every claim cited from PubMed.",
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
            "Comprehensive directory of research peptides with evidence grades, FDA status, and mechanisms of action.",
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
      <section className="pi-hero">
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #3B7A9E 1px, transparent 1px), radial-gradient(circle at 80% 50%, #3B7A9E 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container">
          <h1>
            Browse All Peptides
          </h1>
          <p>
            Every peptide graded A through D for evidence strength. Search, filter, and compare — with every claim
            backed by PubMed citations.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────── */}
      <section className="pi-stats">
        <div className="mx-auto max-w-[1400px]">
          <div className="pi-stats-grid">
            {[
              { value: allPeptides.length.toString(), label: "Peptides" },
              { value: fdaApprovedCount.toString(), label: "FDA-Approved" },
              { value: categories.length.toString(), label: "Categories" },
              { value: `${comparisonCount}+`, label: "Comparisons" },
            ].map((stat) => (
              <div key={stat.label} className="pi-stat">
                <div className="pi-stat-val">{stat.value}</div>
                <div className="pi-stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Evidence Grading Explainer ────────────────────────────────── */}
      <section className="pi-grade-row">
        <div className="container">
        <BreadcrumbNav crumbs={crumbs} />

        <div>
          <h2 className="section-title">
            Understanding Evidence Grades
          </h2>
          <div className="pi-grade-grid">
            {[
              { grade: "A", className: "a", desc: "FDA-approved with robust clinical evidence" },
              { grade: "B", className: "b", desc: "Supported by human clinical studies" },
              { grade: "C", className: "c", desc: "Preclinical evidence only" },
              { grade: "D", className: "d", desc: "Very limited or no published evidence" },
            ].map((item) => (
              <div key={item.grade} className="pi-grade">
                <span className={`pi-grade-ltr ${item.className}`}>{item.grade}</span>
                <p className="pi-grade-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ── Search & Results ──────────────────────────────────────────── */}
      <section className="pi-filters">
        <div className="container">
          <PeptideSearch peptides={peptideData} categories={categoryData} />
        </div>
      </section>

      {/* ── Ad + Disclaimer ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <AdSlot className="mb-6" />
        <MedicalDisclaimer />
      </section>
    </>
  );
}

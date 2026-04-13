import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPeptidesByCategory } from "@/data/peptides";
import { getCategoryBySlug, getAllCategories } from "@/data/categories";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import {
  BreadcrumbNav,
  AdSlot,
  PeptideCard,
  MedicalDisclaimer,
  CategoryNav,
  FAQ,
  ApprovedCategoryRouteCard,
} from "@/components";
import { PageTracker } from "@/components/PageTracker";
import { isValidLocale } from "@/lib/i18n";
import { withLocaleParams, localeAlternates } from "@/lib/locale-params";
import { getRequestMarketCode } from "@/lib/request-market";

interface Props {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateStaticParams() {
  return withLocaleParams(getAllCategories().map((c) => ({ category: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  const peptides = getPeptidesByCategory(category);

  const alt = localeAlternates("https://peptidescholar.com", `/best-for/${category}`, locale);
  return {
    ...generateSEO({
      title: `Best Peptides for ${cat.name} (${new Date().getFullYear()}) — ${peptides.length} Compared`,
      description: `${cat.description} Compare ${peptides.length} peptides with evidence grades, mechanisms, and side effects.`,
      canonical: alt.canonical,
      siteName: "PeptideScholar",
    }),
    alternates: alt,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) notFound();
  const marketCode = await getRequestMarketCode();

  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const peptides = getPeptidesByCategory(category);
  if (peptides.length === 0) notFound();

  const allCategories = getAllCategories();
  const categoriesWithCount = allCategories.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: getPeptidesByCategory(c.slug).length,
  }));

  // Evidence level breakdown
  const evidenceBreakdown = {
    A: peptides.filter((p) => p.evidenceLevel === "A").length,
    B: peptides.filter((p) => p.evidenceLevel === "B").length,
    C: peptides.filter((p) => p.evidenceLevel === "C").length,
    D: peptides.filter((p) => p.evidenceLevel === "D").length,
  };
  const approvedPeptides = peptides.filter((p) => p.fdaStatus === "approved");

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Best For", href: "/best-for" },
    { label: cat.name, href: `/best-for/${category}` },
  ];

  const faqItems = [
    {
      question: `What are the best peptides for ${cat.name.toLowerCase()}?`,
      answer: `Based on current research, the top peptides for ${cat.name.toLowerCase()} include ${peptides.slice(0, 3).map((p) => p.name).join(", ")}${peptides.length > 3 ? ` and ${peptides.length - 3} more` : ""}. Each has a different evidence level and mechanism of action. Check individual peptide profiles for detailed research citations.`,
    },
    {
      question: `Are any ${cat.name.toLowerCase()} peptides FDA approved?`,
      answer: evidenceBreakdown.A > 0
        ? `Yes, ${evidenceBreakdown.A} peptide${evidenceBreakdown.A > 1 ? "s" : ""} in the ${cat.name.toLowerCase()} category ${evidenceBreakdown.A > 1 ? "are" : "is"} FDA approved: ${peptides.filter((p) => p.evidenceLevel === "A").map((p) => p.name).join(", ")}. The remaining peptides have varying levels of preclinical or clinical evidence.`
        : `Currently, no peptides in the ${cat.name.toLowerCase()} category are FDA approved for this specific indication. All peptides listed are based on preclinical or early clinical research. Always consult a healthcare provider before considering any peptide.`,
    },
    {
      question: `How are peptide evidence levels determined?`,
      answer: `PeptideScholar uses a four-tier evidence grading system: Level A (FDA Approved) indicates robust clinical evidence and regulatory approval. Level B (Human Studies) means human clinical data exists but the peptide is not FDA approved for this indication. Level C (Preclinical) means only animal or in vitro studies are available. Level D (Limited Data) means very limited or no published evidence exists.`,
    },
  ];

  return (
    <>
      <PageTracker event="category_view" params={{ category_name: category }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Best Peptides for ${cat.name}`,
          description: cat.description,
          url: `https://peptidescholar.com/best-for/${category}`,
          isPartOf: {
            "@type": "WebSite",
            name: "PeptideScholar",
            url: "https://peptidescholar.com",
          },
          numberOfItems: peptides.length,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <BreadcrumbNav crumbs={crumbs} />

        {/* ── Title ──────────────────────────────────────────────────── */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            color: "var(--color-primary, #1A3A5C)",
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Best Peptides for {cat.name}
        </h1>

        {/* ── Category Description ───────────────────────────────────── */}
        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8 max-w-3xl">
          {cat.description}
        </p>

        {/* ── Stats ──────────────────────────────────────────────────── */}
        {approvedPeptides.length > 0 && (
          <ApprovedCategoryRouteCard
            categoryName={cat.name}
            options={approvedPeptides.map((peptide) => ({
              name: peptide.name,
              slug: peptide.slug,
              fdaApprovedFor: peptide.fdaApprovedFor,
              brandNames: peptide.brandNames,
            }))}
            marketCode={marketCode}
          />
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <div
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div className="text-2xl md:text-3xl font-bold" style={{ color: "#1A3A5C" }}>
              {peptides.length}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Peptides
            </div>
          </div>
          {evidenceBreakdown.A > 0 && (
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "#dcfce7", border: "1px solid #bbf7d0" }}
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#15803d" }}>
                {evidenceBreakdown.A}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                FDA Approved
              </div>
            </div>
          )}
          {evidenceBreakdown.B > 0 && (
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "#dbeafe", border: "1px solid #bfdbfe" }}
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#1d4ed8" }}>
                {evidenceBreakdown.B}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                Human Studies
              </div>
            </div>
          )}
          {evidenceBreakdown.C > 0 && (
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "#fef3c7", border: "1px solid #fde68a" }}
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#b45309" }}>
                {evidenceBreakdown.C}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                Preclinical
              </div>
            </div>
          )}
          {evidenceBreakdown.D > 0 && (
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca" }}
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#b91c1c" }}>
                {evidenceBreakdown.D}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                Limited Data
              </div>
            </div>
          )}
        </div>

        {/* ── Main Content: Grid + Sidebar ───────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Peptide Grid */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              {peptides.map((peptide) => (
                <PeptideCard
                  key={peptide.slug}
                  name={peptide.name}
                  slug={peptide.slug}
                  category={peptide.categoryName}
                  evidenceLevel={peptide.evidenceLevel}
                  description={peptide.description.slice(0, 140) + "..."}
                  fdaStatus={
                    peptide.fdaStatus === "approved"
                      ? "FDA Approved"
                      : peptide.fdaStatus === "cosmetic"
                        ? "Cosmetic"
                        : "Not Approved"
                  }
                />
              ))}
            </div>

            <AdSlot className="mt-8" />
          </div>

          {/* Category Sidebar */}
          <aside className="hidden lg:block">
            <div
              className="sticky top-8 rounded-xl p-5"
              style={{
                border: "1px solid var(--color-border, #e5e7eb)",
                backgroundColor: "var(--color-surface, #ffffff)",
              }}
            >
              <CategoryNav categories={categoriesWithCount} currentSlug={category} />
            </div>
          </aside>
        </div>

        {/* Mobile Category Nav */}
        <div className="lg:hidden mt-10">
          <div
            className="rounded-xl p-5"
            style={{
              border: "1px solid var(--color-border, #e5e7eb)",
              backgroundColor: "var(--color-surface, #ffffff)",
            }}
          >
            <CategoryNav categories={categoriesWithCount} currentSlug={category} />
          </div>
        </div>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <FAQ items={faqItems} title={`${cat.name} Peptides: FAQ`} />

        {/* ── Medical Disclaimer ──────────────────────────────────────── */}
        <MedicalDisclaimer />
      </div>
    </>
  );
}

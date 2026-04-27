import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateProductGrid, BreadcrumbNav, MedicalDisclaimer, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { affiliateCatalog } from "@/data/affiliate-products";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { getRequestMarketCode } from "@/lib/request-market";

interface Props {
  params: Promise<{ locale: string }>;
}

const productSections = [
  {
    heading: "GLP-1 Support Essentials",
    subheading: "Products to help manage common side effects and support nutrition during treatment.",
    products: affiliateCatalog["glp1-support"],
  },
  {
    heading: "Progress Tracking Tools",
    subheading: "Monitor weight, body composition, and nutrition over time.",
    products: affiliateCatalog.nutrition,
  },
  {
    heading: "Recovery Support Products",
    subheading: "Tools and supplements commonly used alongside recovery-focused research protocols.",
    products: affiliateCatalog.recovery,
  },
  {
    heading: "Research Supplies",
    subheading: "Equipment for responsible research-grade peptide handling and administration.",
    products: affiliateCatalog.reconstitution,
  },
  {
    heading: "Recommended Skincare Products",
    subheading: "Peptide-based topical products aligned with cosmetic peptide mechanisms.",
    products: affiliateCatalog.skincare,
  },
  {
    heading: "Recommended Reading",
    subheading: "Books covering peptide science, longevity research, and biohacking frameworks.",
    products: affiliateCatalog.books,
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alt = localeAlternates("https://peptidescholar.com", "/resources", locale);

  return {
    ...generateSEO({
      title: "Recommended Peptide Resources and Supplies",
      description:
        "PeptideScholar's recommended books, GLP-1 support products, tracking tools, skincare products, and research supplies.",
      canonical: alt.canonical,
      siteName: "PeptideScholar",
    }),
    alternates: alt,
  };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const marketCode = await getRequestMarketCode();

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "resources", page_slug: "resources", market: marketCode }} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
          ]}
        />

        <header className="mt-6 mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
            Recommended Products
          </p>
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
          >
            Peptide Resources and Supplies
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            Product categories that support the educational workflows covered across PeptideScholar, from GLP-1 nutrition support to research handling basics.
          </p>
        </header>

        {productSections.map((section) => (
          <AffiliateProductGrid
            key={section.heading}
            heading={section.heading}
            subheading={section.subheading}
            products={section.products}
          />
        ))}

        <MedicalDisclaimer />
      </div>
    </>
  );
}

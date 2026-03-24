import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import CostCalculatorClient from "./CostCalculatorClient";
import { costData } from "@/data/clinical-data";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/cost-calculator", locale);

  return {
    ...generateSEO({
      title: "GLP-1 Cost Calculator — Wegovy, Ozempic, Mounjaro, Zepbound Prices",
      description:
        "Compare GLP-1 medication costs: list price, insurance copay range, discount programs (GoodRx, LillyDirect), and compounded alternatives. Monthly and yearly cost breakdowns for Wegovy, Ozempic, Mounjaro, Zepbound, and Saxenda.",
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
export default async function CostCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  /* Serialize cost data for client component */
  const costs = costData.map((c) => ({
    slug: c.slug,
    brandName: c.brandName,
    genericName: c.genericName,
    frequency: c.frequency,
    listPriceMonthly: c.listPriceMonthly,
    withInsuranceLow: c.withInsuranceLow,
    withInsuranceHigh: c.withInsuranceHigh,
    discountProgramPrice: c.discountProgramPrice,
    discountProgramName: c.discountProgramName,
    compoundedLow: c.compoundedLow,
    compoundedHigh: c.compoundedHigh,
    lastVerified: c.lastVerified,
    source: c.source,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "GLP-1 Cost Calculator",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Compare GLP-1 medication costs including list price, insurance copay ranges, manufacturer discount programs, and compounded alternatives.",
          url: `${siteConfig.domain}/tools/cost-calculator`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Cost Calculator", href: `${prefix}/tools/cost-calculator` },
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
            GLP-1 Cost Calculator
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Compare medication costs across list price, insurance, discount programs, and
            compounded options. Monthly and yearly breakdowns based on verified pricing data.
          </p>
        </div>

        {/* ── Cost Calculator Tool ─────────────────────────────────────── */}
        <CostCalculatorClient costs={costs} />

        <AdSlot className="my-8" />

        {/* ── Understanding Your Options ────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Understanding Your Cost Options
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "List Price",
                desc: "The manufacturer&rsquo;s published price before any discounts or insurance. Almost nobody pays this. It serves as the baseline from which all other prices are discounted.",
              },
              {
                title: "With Insurance",
                desc: "Range reflects what patients with commercial insurance typically pay as a copay. Wide variation exists depending on your specific plan, formulary tier, and deductible status.",
              },
              {
                title: "Discount Programs",
                desc: "Manufacturer savings programs (like LillyDirect) or third-party discount cards (like GoodRx) can significantly reduce out-of-pocket costs for uninsured or under-insured patients.",
              },
              {
                title: "Compounded",
                desc: "Where FDA rules allow, licensed compounding pharmacies may prepare peptides at lower cost. Compounded versions are not FDA-approved and quality varies by pharmacy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <h3
                  className="font-bold mb-2 text-sm"
                  style={{
                    color: C.navy,
                    fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Price disclaimer ───────────────────────────────────────── */}
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
              Prices Change Frequently
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Drug prices change frequently. List prices may be updated by manufacturers,
              discount program terms may change, and insurance coverage varies by plan and year.
              The prices shown reflect verified data from the date indicated on each card.
              Always verify current prices with your pharmacy, insurance plan, or the
              manufacturer&apos;s website before making financial decisions.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import ReconstitutionCalc from "@/components/ReconstitutionCalc";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/calculator", locale);

  return {
    ...generateSEO({
      title: "Peptide Reconstitution Calculator — Free Tool",
      description:
        "Free peptide reconstitution calculator. Enter vial size and water volume to instantly calculate syringe units, dose volume, and doses per vial. Works with BPC-157, semaglutide, ipamorelin, and all peptides.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

/* ── Example Data ──────────────────────────────────────────────────────── */
const examples = [
  {
    peptide: "BPC-157",
    vialMg: 5,
    waterMl: 2,
    doseMcg: 250,
    resultUnits: 10,
    description: "Standard healing protocol",
  },
  {
    peptide: "Semaglutide",
    vialMg: 2,
    waterMl: 1,
    doseMg: 0.25,
    resultUnits: 12.5,
    description: "Starting dose for weight management",
  },
  {
    peptide: "Ipamorelin",
    vialMg: 5,
    waterMl: 2.5,
    doseMcg: 200,
    resultUnits: 10,
    description: "Common growth hormone secretagogue dose",
  },
];

/* ── FAQs ──────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "How do I reconstitute a peptide vial?",
    a: "Draw your desired amount of bacteriostatic water (BAC water) into a syringe. Insert the needle into the rubber stopper of the peptide vial, angling toward the glass wall. Slowly inject the water, letting it run down the side of the vial. Do not shake — gently swirl or let it sit until fully dissolved.",
  },
  {
    q: "What does 'units' mean on an insulin syringe?",
    a: "Insulin syringes are calibrated in 'units' where 100 units equals 1 mL. So 10 units = 0.1 mL, 50 units = 0.5 mL, etc. This is the U-100 standard used worldwide for insulin and commonly used for peptide injections.",
  },
  {
    q: "Does the amount of water change the potency?",
    a: "No. The total peptide in the vial stays the same regardless of how much water you add. More water means a more dilute solution (lower concentration), so you draw a larger volume per dose. Less water means a more concentrated solution and a smaller volume per dose. The dose in mcg or mg stays the same.",
  },
  {
    q: "How long does reconstituted peptide last?",
    a: "Most reconstituted peptides should be used within 3-4 weeks when stored in the refrigerator (2-8 C / 36-46 F). Never freeze reconstituted peptides. Bacteriostatic water contains a preservative (benzyl alcohol) that helps prevent bacterial growth. Always check the specific peptide's storage instructions.",
  },
];

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function CalculatorPage({
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
          name: "Peptide Reconstitution Calculator",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Free online calculator for peptide reconstitution. Enter vial size, water volume, and desired dose to calculate syringe units and concentration.",
          url: `${siteConfig.domain}/tools/calculator`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Calculator", href: `${prefix}/tools/calculator` },
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
            Peptide Reconstitution Calculator
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Calculate how much bacteriostatic water to add and how many units to draw on your
            syringe. Free, instant, no signup.
          </p>
        </div>

        {/* ── Calculator ────────────────────────────────────────────── */}
        <ReconstitutionCalc />

        {/* ── Ad Slot ───────────────────────────────────────────────── */}
        <AdSlot className="my-8" />

        {/* ── How to Use ────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            How to Use This Calculator
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                title: "Enter Peptide Amount",
                desc: "Find the total mg on your vial label (e.g. 5mg, 10mg) and enter it.",
              },
              {
                step: "2",
                title: "Enter Water Volume",
                desc: "Choose how much bacteriostatic water you will add to reconstitute the vial.",
              },
              {
                step: "3",
                title: "Enter Desired Dose",
                desc: "Enter the dose you want per injection in mcg or mg and select the unit.",
              },
              {
                step: "4",
                title: "Read Your Results",
                desc: "The calculator instantly shows concentration, syringe units, and doses per vial.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mb-3"
                  style={{ backgroundColor: C.teal }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: C.navy }}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Common Examples ───────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Common Reconstitution Examples
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {examples.map((ex) => (
              <div
                key={ex.peptide}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
              >
                <h3 className="font-bold mb-1" style={{ color: C.navy }}>
                  {ex.peptide}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{ex.description}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vial:</span>
                    <span className="font-semibold" style={{ color: C.navy }}>{ex.vialMg}mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">BAC Water:</span>
                    <span className="font-semibold" style={{ color: C.navy }}>{ex.waterMl}mL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dose:</span>
                    <span className="font-semibold" style={{ color: C.navy }}>
                      {"doseMcg" in ex ? `${ex.doseMcg}mcg` : `${ex.doseMg}mg`}
                    </span>
                  </div>
                  <div
                    className="flex justify-between pt-2 mt-2"
                    style={{ borderTop: `1px solid ${C.border}` }}
                  >
                    <span className="text-gray-600">Draw:</span>
                    <span className="font-bold" style={{ color: C.teal }}>
                      {ex.resultUnits} units
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl overflow-hidden"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <summary
                  className="cursor-pointer px-5 py-4 flex items-center justify-between text-sm font-semibold list-none"
                  style={{ color: C.navy }}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={C.navy}
                    strokeWidth="2"
                    className="flex-shrink-0 ml-2 transition-transform group-open:rotate-180"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

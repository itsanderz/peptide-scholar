import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot, BreadcrumbNav, MedicalDisclaimer } from "@/components";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import ReconstitutionCalc from "@/components/ReconstitutionCalc";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

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
      title: "Peptide Reconstitution Calculator - Free Tool",
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

const examples = [
  {
    peptide: "BPC-157",
    vialMg: 5,
    waterMl: 2,
    doseLabel: "250mcg",
    resultUnits: 10,
    description: "Standard healing protocol",
  },
  {
    peptide: "Semaglutide",
    vialMg: 2,
    waterMl: 1,
    doseLabel: "0.25mg",
    resultUnits: 12.5,
    description: "Starting dose for weight management",
  },
  {
    peptide: "Ipamorelin",
    vialMg: 5,
    waterMl: 2.5,
    doseLabel: "200mcg",
    resultUnits: 10,
    description: "Common growth hormone secretagogue dose",
  },
];

const faqs = [
  {
    q: "How do I reconstitute a peptide vial?",
    a: "Draw your desired amount of bacteriostatic water into a syringe. Insert the needle into the rubber stopper, angle toward the glass wall, and slowly inject the water down the side of the vial. Do not shake the vial. Let it dissolve or swirl gently.",
  },
  {
    q: "What does 'units' mean on an insulin syringe?",
    a: "Insulin syringes are calibrated in units where 100 units equals 1mL. That means 10 units is 0.1mL and 50 units is 0.5mL. This is the U-100 standard commonly used for peptide injections.",
  },
  {
    q: "Does the amount of water change the potency?",
    a: "No. The total peptide in the vial stays the same regardless of how much water you add. More water makes the solution more dilute, so you draw more volume per dose. Less water makes the solution more concentrated, so you draw less volume per dose.",
  },
  {
    q: "How long does reconstituted peptide last?",
    a: "Most reconstituted peptides should be used within 3 to 4 weeks when stored in the refrigerator at 2 to 8C or 36 to 46F. Do not freeze reconstituted peptides, and always check the specific storage guidance for the compound you are using.",
  },
];

const steps = [
  {
    step: "1",
    title: "Enter peptide amount",
    desc: "Use the total milligrams printed on the vial label.",
  },
  {
    step: "2",
    title: "Enter water volume",
    desc: "Choose the amount of bacteriostatic water added during reconstitution.",
  },
  {
    step: "3",
    title: "Enter desired dose",
    desc: "Add the dose per injection and switch between mcg and mg as needed.",
  },
  {
    step: "4",
    title: "Read the result",
    desc: "The calculator returns concentration, syringe units, and doses per vial.",
  },
];

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

      <div className="calc-route-page">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Calculator", href: `${prefix}/tools/calculator` },
          ]}
        />

        <div className="calc-route-hero">
          <h1>Peptide Reconstitution Calculator</h1>
          <p>
            Calculate how much bacteriostatic water to add and how many units to draw on your syringe.
            The calculator stays the primary tool, and the surrounding guidance now uses the same page
            shell as the rest of the reference site.
          </p>
        </div>

        <ReconstitutionCalc />
        <AdSlot className="my-8" />

        <section className="calc-route-section">
          <h2>How to Use This Calculator</h2>
          <div className="calc-route-steps">
            {steps.map((item) => (
              <div key={item.step} className="calc-route-step">
                <div className="calc-route-step-num">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="calc-route-section">
          <h2>Common Reconstitution Examples</h2>
          <div className="calc-route-examples">
            {examples.map((example) => (
              <div key={example.peptide} className="calc-route-example">
                <h3>{example.peptide}</h3>
                <p>{example.description}</p>
                <dl>
                  <div className="calc-route-example-row">
                    <dt>Vial</dt>
                    <dd>{example.vialMg}mg</dd>
                  </div>
                  <div className="calc-route-example-row">
                    <dt>BAC Water</dt>
                    <dd>{example.waterMl}mL</dd>
                  </div>
                  <div className="calc-route-example-row">
                    <dt>Dose</dt>
                    <dd>{example.doseLabel}</dd>
                  </div>
                  <div className="calc-route-example-row is-result">
                    <dt>Draw</dt>
                    <dd>{example.resultUnits} units</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="calc-route-section">
          <h2>Frequently Asked Questions</h2>
          <div className="calc-route-faq">
            {faqs.map((faq) => (
              <details key={faq.q} className="calc-route-faq-item">
                <summary className="calc-route-faq-q">
                  <span>{faq.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div className="calc-route-faq-a">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}

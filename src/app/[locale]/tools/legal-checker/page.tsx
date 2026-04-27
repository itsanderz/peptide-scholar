import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPeptides } from "@/data/peptides";
import { getAllStatesLegal } from "@/data/states-legal";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import LegalChecker from "@/components/LegalChecker";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/legal-checker", locale);

  return {
    ...generateSEO({
      title: "Peptide Legal Status Checker — Is It Legal in Your State?",
      description:
        "Free tool to check if a peptide is legal in your state. Covers FDA approval status, compounding pharmacy rules, state regulations, and WADA banned status for all peptides across 50 states.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

/* ── FAQs ──────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Are peptides legal to buy in the United States?",
    a: "It depends on the specific peptide and your state. FDA-approved peptides like semaglutide and tesamorelin are legal by prescription nationwide. Non-FDA-approved peptides occupy a gray area — some are available as \"research chemicals\" while others face restrictions. State laws vary significantly, with some states being more permissive than others regarding compounding pharmacies and peptide access.",
  },
  {
    q: "What is the difference between FDA-approved and non-FDA-approved peptides?",
    a: "FDA-approved peptides have undergone rigorous clinical trials and received formal approval for specific medical uses. They can be prescribed by any licensed physician. Non-FDA-approved peptides have not completed this process. They may be available through compounding pharmacies (where legal), research chemical suppliers, or clinical trials, but their sale for human use is technically not authorized by the FDA.",
  },
  {
    q: "Can a doctor prescribe non-FDA-approved peptides?",
    a: "In many states, physicians can prescribe compounded peptides through licensed compounding pharmacies, even if the peptide is not FDA-approved. This falls under the practice of compounding, which is regulated at both the federal and state level. However, the FDA has been increasing oversight of compounded peptides, and some peptides have been specifically targeted. State medical boards may also have their own policies. Always verify with your healthcare provider and a licensed pharmacy.",
  },
];

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function LegalCheckerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  /* Serialize peptide data for client component (only fields needed) */
  const allPeptides = getAllPeptides();
  const peptideData = allPeptides.map((p) => ({
    name: p.name,
    slug: p.slug,
    fdaStatus: p.fdaStatus,
    prescriptionRequired: p.prescriptionRequired,
    wadaBanned: p.wadaBanned,
    controlledSubstance: p.controlledSubstance,
  }));

  /* Serialize state data for client component */
  const allStates = getAllStatesLegal();
  const stateData = allStates.map((s) => ({
    stateName: s.stateName,
    stateSlug: s.stateSlug,
    stance: s.stance,
    compoundingAllowed: s.compoundingAllowed,
    ageRestrictions: s.ageRestrictions,
    notes: s.notes,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Peptide Legal Status Checker",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Free tool to check peptide legality by state. Covers FDA approval, compounding rules, WADA banned status, and state-specific regulations for all peptides across 50 US states.",
          url: `${siteConfig.domain}/tools/legal-checker`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Legal Checker", href: `${prefix}/tools/legal-checker` },
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
            Is This Peptide Legal in Your State?
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Select a peptide and your state to instantly check FDA status, compounding rules, and
            regulations.
          </p>
        </div>

        {/* ── Checker Tool ──────────────────────────────────────────── */}
        <LegalChecker peptides={peptideData} states={stateData} />

        {/* ── Ad Slot ───────────────────────────────────────────────── */}
        <AdSlot className="my-8" />

        {/* ── Understanding Peptide Legality ─────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Understanding Peptide Legality
          </h2>
          <div
            className="rounded-xl p-6 space-y-4 text-sm text-gray-700 leading-relaxed"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <p>
              Peptide regulation in the United States operates on two levels: <strong>federal</strong> and{" "}
              <strong>state</strong>. At the federal level, the FDA determines which peptides are approved as
              drugs, which can be compounded by pharmacies, and which are restricted. The DEA schedules controlled
              substances. At the state level, individual state pharmacy boards and legislatures can impose
              additional restrictions or, in some cases, adopt more permissive stances.
            </p>
            <p>
              <strong>FDA-approved peptides</strong> (like semaglutide, tesamorelin, and sermorelin) are legal
              by prescription in all 50 states. They have gone through full clinical trials and received formal
              approval for specific medical indications.
            </p>
            <p>
              <strong>Non-FDA-approved peptides</strong> (like BPC-157, ipamorelin, and TB-500) exist in a
              regulatory gray area. Many are available through compounding pharmacies where state law permits,
              or sold as &ldquo;research chemicals&rdquo; not intended for human use. The FDA has been
              increasingly scrutinizing compounded peptides, and regulations can change rapidly.
            </p>
            <p>
              <strong>State variation matters.</strong> Some states (like Florida, Texas, and Arizona) have
              permissive stances toward peptide access and compounding pharmacies. Others (like New York,
              California, and Massachusetts) impose stricter oversight. This checker helps you understand where
              your state falls on that spectrum.
            </p>
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

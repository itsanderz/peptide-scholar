import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import { PageTracker } from "@/components/PageTracker";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  accent: "#D4553A",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#F0F3F7",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  text: "#1C2028",
  muted: "#5A6577",
} as const;

const TOC = [
  { id: "what-is-coa", label: "What Is a COA?" },
  { id: "key-components", label: "Key Components Explained" },
  { id: "spot-fake", label: "How to Spot a Fake COA" },
  { id: "third-party", label: "Third-Party vs In-House Testing" },
  { id: "independent-testing", label: "Independent Testing Options" },
  { id: "purity-levels", label: "What Purity Levels Mean" },
];

/* ── SEO ───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/guide/reading-coa", locale);

  return {
    ...generateSEO({
      title: "How to Read a Peptide COA: Purity Testing Guide (2026) | PeptideScholar",
      description:
        "Learn how to read a Certificate of Analysis (COA) for research peptides. Covers HPLC purity, mass spectrometry, endotoxin testing, red flags for fake COAs, and what purity percentages mean.",
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
export default async function ReadingCOAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;
  const publishDate = "2026-03-24";

  return (
    <>
      <PageTracker event="guide_view" params={{ guide_slug: "reading-coa" }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Read a Peptide COA: Purity Testing Guide (2026)",
          description:
            "Educational guide to understanding Certificates of Analysis for research peptides: HPLC, mass spectrometry, endotoxin, purity levels, and how to identify fake COAs.",
          datePublished: publishDate,
          dateModified: publishDate,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.domain,
          },
          url: `${siteConfig.domain}/guide/reading-coa`,
          mainEntityOfPage: `${siteConfig.domain}/guide/reading-coa`,
        }}
      />

      <div className="guide-article-page max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Guide", href: `${prefix}/guide` },
            { label: "How to Read a COA", href: `${prefix}/guide/reading-coa` },
          ]}
        />

        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">
          <article>
            <header className="mb-8">
              <h1
                className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                How to Read a Peptide Certificate of Analysis (COA)
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                A Certificate of Analysis is the primary quality document for research peptides. This
                guide explains what each section means, what acceptable results look like, and how to
                identify documents that have been fabricated or altered.
              </p>
              <p className="text-sm text-gray-400 mt-3">Updated: March 2026</p>
            </header>

            {/* ── What Is a COA ─────────────────────────────────── */}
            <section id="what-is-coa" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                What Is a Certificate of Analysis?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A Certificate of Analysis (COA) is a document issued by an analytical testing
                laboratory that reports the results of quality and purity tests performed on a specific
                batch of a chemical compound. For research peptides, a COA typically reports:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "The chemical identity of the peptide (confirming it is what it claims to be)",
                  "Purity percentage (how much of the product is the intended compound vs. impurities)",
                  "Analytical methods used to determine these results",
                  "Batch or lot number linking the document to a specific production run",
                  "Date of analysis and laboratory name",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: C.teal }}>&#8250;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">
                A COA does not guarantee a product is safe to use, does not constitute pharmaceutical
                testing, and does not mean the product has been approved or reviewed by any regulatory
                body. It is a statement from the testing lab about what was measured on a given sample.
              </p>
            </section>

            {/* ── Key Components ────────────────────────────────── */}
            <section id="key-components" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Key Components Explained
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "HPLC Purity (High-Performance Liquid Chromatography)",
                    color: C.teal,
                    bg: "#EFF6FF",
                    border: "#BFDBFE",
                    content: [
                      "HPLC is the most common method for measuring peptide purity. The peptide sample is passed through a column under high pressure, separating components by their chemical properties.",
                      "The output is a chromatogram — a graph showing peaks for each detected compound. The main peak represents your target peptide; other peaks represent impurities (truncated sequences, oxidized forms, reagent residues).",
                      "Purity is calculated as: (area of target peak) ÷ (total area of all peaks) × 100.",
                      "A legitimate HPLC report should include the actual chromatogram image, not just a number.",
                    ],
                  },
                  {
                    title: "Mass Spectrometry (MS) — Identity Confirmation",
                    color: C.success,
                    bg: "#F0FDF4",
                    border: "#BBF7D0",
                    content: [
                      "Mass spectrometry measures the molecular weight of compounds in the sample. This confirms whether the correct peptide is present.",
                      "Each peptide has a known theoretical molecular weight. If the measured mass matches the expected mass within acceptable tolerance, identity is confirmed.",
                      "MS alone does not measure purity — it only confirms identity. A sample could contain 50% of the correct peptide and pass MS identity testing.",
                      "Both HPLC purity AND MS identity should be present on a complete COA. One without the other is incomplete.",
                    ],
                  },
                  {
                    title: "Endotoxin Testing (LAL or Recombinant Factor C)",
                    color: C.warning,
                    bg: "#FFFBEB",
                    border: "#FDE68A",
                    content: [
                      "Endotoxins are lipopolysaccharides from gram-negative bacteria cell walls — a common contamination in peptides produced via bacterial synthesis.",
                      "Even at very small amounts, endotoxins cause fever, inflammation, and in severe cases, septic shock when injected.",
                      "Endotoxin level is measured in Endotoxin Units per milligram (EU/mg) or EU/mL.",
                      "Not all vendors provide endotoxin testing. Its absence on a COA is a significant concern for any injectable use.",
                    ],
                  },
                  {
                    title: "Sterility Testing",
                    color: C.navy,
                    bg: C.bg,
                    border: C.border,
                    content: [
                      "Sterility testing confirms the product does not contain viable bacteria, yeast, or fungi.",
                      "This is distinct from endotoxin testing — endotoxins can be present even in a sample with no living bacteria.",
                      "Sterility testing is rarely performed for research-use peptides and is primarily relevant for pharmaceutical-grade preparations.",
                      "Most research peptide vendors do not provide sterility testing; this is another reason these products are classified as research-use only.",
                    ],
                  },
                ].map((section) => (
                  <div
                    key={section.title}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: section.bg, border: `1px solid ${section.border}` }}
                  >
                    <h3
                      className="font-bold text-sm mb-3"
                      style={{ color: section.color }}
                    >
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.content.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="flex-shrink-0 mt-0.5" style={{ color: section.color }}>
                            &#8250;
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Spot a Fake ───────────────────────────────────── */}
            <section id="spot-fake" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                How to Spot a Fake or Inadequate COA
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                Fabricated or misleading COAs are a known problem in the research chemical industry.
                Red flags to look for:
              </p>
              <div className="space-y-3">
                {[
                  {
                    flag: "No chromatogram image",
                    detail: "A legitimate HPLC report includes the actual chromatogram graph. A COA showing only a purity number (e.g., &ldquo;99.2%&rdquo;) without the underlying chromatogram cannot be verified.",
                  },
                  {
                    flag: "Suspiciously round numbers",
                    detail: "Real HPLC analyses produce results like 97.3% or 98.6%. Purity values of exactly 99%, 98%, or 100% with no decimal places are a red flag.",
                  },
                  {
                    flag: "No laboratory name or contact information",
                    detail: "Legitimate testing labs put their name, address, and contact details on their reports. Anonymous COAs are unverifiable.",
                  },
                  {
                    flag: "No date of analysis or expiration",
                    detail: "Purity can change over time (especially if stored improperly). A COA without a testing date cannot be evaluated for relevance to the current product.",
                  },
                  {
                    flag: "No batch/lot number",
                    detail: "The COA should be linkable to the specific production batch you received. A generic COA applied to multiple batches is not batch-specific testing.",
                  },
                  {
                    flag: "Only one test method reported",
                    detail: "Reputable vendors provide both HPLC purity AND MS identity. A COA with only one method is incomplete.",
                  },
                  {
                    flag: "Lab name is unverifiable",
                    detail: "Search the testing laboratory name. If it does not have a public website, business registration, or verifiable contact information, the COA may be fabricated.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 flex gap-3"
                    style={{ backgroundColor: "#FEF2F2", border: `1px solid #FECACA` }}
                  >
                    <span className="flex-shrink-0 mt-0.5 text-red-500">&#9888;</span>
                    <div>
                      <strong className="text-sm" style={{ color: "#991B1B" }}>{item.flag}: </strong>
                      <span
                        className="text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: item.detail }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Third-Party vs In-House ───────────────────────── */}
            <section id="third-party" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Third-Party Testing vs. In-House Testing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                Not all COAs are equivalent. The credibility of a COA depends significantly on who
                performed the testing:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#F0FDF4", border: `1px solid #BBF7D0` }}
                >
                  <h3 className="font-bold text-sm mb-3" style={{ color: C.success }}>
                    Third-Party Testing (Preferred)
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Testing performed by an independent laboratory with no financial relationship to the vendor",
                      "Results cannot be selectively reported or adjusted",
                      "Lab can be independently verified and contacted",
                      "Provides genuine quality assurance, not marketing",
                      "Some vendors list the lab name and allow customers to verify results directly",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-500 flex-shrink-0 mt-0.5">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#FFFBEB", border: `1px solid #FDE68A` }}
                >
                  <h3 className="font-bold text-sm mb-3" style={{ color: C.warning }}>
                    In-House Testing (Lower Assurance)
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Testing performed by the vendor&apos;s own laboratory",
                      "Conflict of interest: vendor has financial incentive to report favorable results",
                      "No independent verification possible",
                      "Equipment calibration and technician competency are unverified",
                      "Not necessarily fraudulent — some vendors invest in quality equipment — but cannot be independently confirmed",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: `<span style="color:#D4912A;flex-shrink:0;margin-top:2px">&#9888;</span><span>${item}</span>`,
                        }}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Independent Testing ───────────────────────────── */}
            <section id="independent-testing" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Where to Get Independent Testing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you want to verify a peptide product independently, contract testing laboratories
                accept samples from individuals. The following are examples of laboratories known to
                offer analytical testing services — this is educational information only, not an
                endorsement or affiliate recommendation:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    name: "Janoshik Analytical",
                    detail: "Czech Republic-based laboratory frequently used by the research chemical community. Offers HPLC and MS testing. Results are publicly posted for community submissions.",
                    url: "https://janoshik.com",
                  },
                  {
                    name: "ACS Laboratory Testing",
                    detail: "US-based contract laboratory offering HPLC, MS, and other analytical services. Accepts samples for third-party testing.",
                    url: null,
                  },
                ].map((lab) => (
                  <div
                    key={lab.name}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <strong className="text-sm" style={{ color: C.navy }}>{lab.name}</strong>
                      {lab.url && (
                        <a
                          href={lab.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs underline"
                          style={{ color: C.teal }}
                        >
                          {lab.url}
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{lab.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Listing of testing laboratories is for educational reference only. PeptideScholar has
                no financial relationship with any laboratory mentioned.
              </p>
            </section>

            {/* ── Purity Levels ─────────────────────────────────── */}
            <section id="purity-levels" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                What Purity Levels Mean
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                HPLC purity by area percentage is the standard measure for research peptides. Here is
                a general interpretation framework used in the research community:
              </p>
              <div className="space-y-3">
                {[
                  {
                    range: "Below 90%",
                    label: "Concerning",
                    detail: "Significant impurities present. Impurities may include truncated peptide sequences, oxidized forms, or synthetic byproducts. Not suitable for any use. A reputable vendor should not sell below this threshold.",
                    color: "#991B1B",
                    bg: "#FEF2F2",
                    border: "#FECACA",
                  },
                  {
                    range: "90–95%",
                    label: "Low / Marginal",
                    detail: "Below standard for the research peptide industry. Acceptable for some basic in vitro cell culture experiments where high purity is not critical, but below what most serious researchers require.",
                    color: C.warning,
                    bg: "#FFFBEB",
                    border: "#FDE68A",
                  },
                  {
                    range: "95–98%",
                    label: "Acceptable for Research",
                    detail: "Standard range for research-grade peptides. Most reputable vendors target this range. Suitable for research use as described by the vendor.",
                    color: C.teal,
                    bg: "#EFF6FF",
                    border: "#BFDBFE",
                  },
                  {
                    range: "Above 98%",
                    label: "Gold Standard",
                    detail: "High-purity research grade. Some vendors describe this as &ldquo;pharmaceutical grade&rdquo; — note this term is informal and does not imply FDA review. Impurities are minimal by HPLC measurement.",
                    color: C.success,
                    bg: "#F0FDF4",
                    border: "#BBF7D0",
                  },
                ].map((tier) => (
                  <div
                    key={tier.range}
                    className="rounded-xl p-4 flex gap-4 items-start"
                    style={{ backgroundColor: tier.bg, border: `1px solid ${tier.border}` }}
                  >
                    <div
                      className="flex-shrink-0 rounded-lg px-3 py-2 text-center min-w-[80px]"
                      style={{ backgroundColor: tier.color, color: "#FFFFFF" }}
                    >
                      <div className="text-sm font-black">{tier.range}%</div>
                      <div className="text-xs opacity-90">{tier.label}</div>
                    </div>
                    <p
                      className="text-sm text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: tier.detail }}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Note: HPLC purity by area is the most widely reported metric but has limitations. It
                measures relative peak areas, not absolute mass. Water content and counterion salts are
                typically not captured. No single purity number fully characterizes a product&apos;s
                suitability for any specific use.
              </p>
            </section>

            <MedicalDisclaimer />
          </article>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div
              className="rounded-xl p-5 sticky top-6"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
                Contents
              </h3>
              <nav>
                <ul className="space-y-1.5">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-xs hover:underline block"
                        style={{ color: C.muted }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
                <p className="text-xs font-semibold mb-2" style={{ color: C.navy }}>
                  Quick Reference
                </p>
                <ul className="space-y-1.5">
                  {[
                    { label: "HPLC", value: "Purity measurement" },
                    { label: "MS", value: "Identity confirmation" },
                    { label: "Endotoxin", value: "Bacterial contamination" },
                    { label: "&lt;90% purity", value: "Concerning" },
                    { label: "95–98%", value: "Research standard" },
                    { label: "&gt;98%", value: "Gold standard" },
                  ].map((fact) => (
                    <li key={fact.label} className="flex justify-between gap-2">
                      <span
                        className="text-xs"
                        style={{ color: C.muted }}
                        dangerouslySetInnerHTML={{ __html: fact.label }}
                      />
                      <span className="text-xs font-semibold text-right" style={{ color: C.text }}>
                        {fact.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <AdSlot className="mt-4" />
          </aside>
        </div>
      </div>
    </>
  );
}

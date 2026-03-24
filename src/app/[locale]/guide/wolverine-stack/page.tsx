import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
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
  { id: "what-is", label: "What Is the Wolverine Stack?" },
  { id: "mechanism", label: "Mechanism of Action" },
  { id: "evidence", label: "Evidence Level" },
  { id: "human-evidence", label: "Human Evidence" },
  { id: "combination-evidence", label: "Combination Evidence" },
  { id: "legal-status", label: "FDA & Legal Status" },
  { id: "safety", label: "Safety Concerns" },
];

/* ── SEO ───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/guide/wolverine-stack", locale);

  return {
    ...generateSEO({
      title: "Wolverine Stack (BPC-157 + TB-500): Evidence, Risks & What Research Shows (2026) | PeptideScholar",
      description:
        "Comprehensive review of the BPC-157 + TB-500 'Wolverine Stack'. Covers mechanisms, preclinical evidence, human study limitations (only 3 human trials on BPC-157 as of 2026), FDA Category 2 ban from compounding, and safety concerns.",
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
export default async function WolverineStackPage({
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Wolverine Stack (BPC-157 + TB-500): Evidence, Risks & What Research Shows (2026)",
          description:
            "Review of the BPC-157 and TB-500 peptide combination: mechanisms, evidence quality, FDA legal status, and safety.",
          datePublished: publishDate,
          dateModified: publishDate,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.domain,
          },
          url: `${siteConfig.domain}/guide/wolverine-stack`,
          mainEntityOfPage: `${siteConfig.domain}/guide/wolverine-stack`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Guide", href: `${prefix}/guide` },
            { label: "Wolverine Stack", href: `${prefix}/guide/wolverine-stack` },
          ]}
        />

        {/* ── RED WARNING BANNER ────────────────────────────────────── */}
        <div
          role="alert"
          className="rounded-xl p-5 mb-6"
          style={{ backgroundColor: "#FEF2F2", border: `2px solid #FECACA` }}
        >
          <div className="flex gap-3 items-start">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <p className="font-bold text-base mb-1" style={{ color: "#991B1B" }}>
                Neither BPC-157 nor TB-500 is FDA-approved.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#7F1D1D" }}>
                No clinical trials have studied this combination in humans. Both peptides were placed
                in FDA Category 2 (Bulk Drug Substances That Raise Significant Safety Concerns) in
                2023–2024, prohibiting their use in compounded medications in the United States.
                This article is for educational purposes only.
              </p>
            </div>
          </div>
        </div>

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
                Wolverine Stack (BPC-157 + TB-500): What the Research Actually Shows
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                The &ldquo;Wolverine Stack&rdquo; combines two research peptides promoted online for
                accelerated healing and recovery. This page reviews the preclinical evidence, the
                significant limitations of human data, and the current legal status.
              </p>
              <p className="text-sm text-gray-400 mt-3">Updated: March 2026</p>
            </header>

            {/* ── What Is ───────────────────────────────────────── */}
            <section id="what-is" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                What Is the Wolverine Stack?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The &ldquo;Wolverine Stack&rdquo; is a popular term in online bodybuilding and
                biohacking communities referring to the combination of two synthetic peptides: BPC-157
                (Body Protection Compound-157) and TB-500 (Thymosin Beta-4 fragment). The name is
                derived from the Marvel character known for rapid healing.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Proponents claim the combination produces synergistic effects on tissue repair,
                tendon and ligament healing, and recovery from injury. However, these claims are based
                primarily on extrapolation from separate preclinical studies, not on research into the
                combination itself.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <h3 className="font-bold text-sm mb-2" style={{ color: C.navy }}>BPC-157</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Synthetic peptide derived from a protein found in gastric juice</li>
                    <li>15 amino acids in length</li>
                    <li>Studied primarily in rodent models of wound healing, tendon repair, and gut inflammation</li>
                    <li>Also called &ldquo;Body Protection Compound&rdquo;</li>
                  </ul>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <h3 className="font-bold text-sm mb-2" style={{ color: C.navy }}>TB-500</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Synthetic fragment of Thymosin Beta-4 (TB4), a naturally occurring protein</li>
                    <li>43 amino acids in length</li>
                    <li>Studied in animal models for wound healing and angiogenesis</li>
                    <li>Not identical to the naturally occurring full-length protein</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Mechanism ─────────────────────────────────────── */}
            <section id="mechanism" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Proposed Mechanism of Action
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following mechanisms are proposed based on preclinical research. They have{" "}
                <strong>not been confirmed in human clinical trials</strong>.
              </p>
              <div className="space-y-4">
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#EFF6FF", border: `1px solid #BFDBFE` }}
                >
                  <h3 className="font-bold text-sm mb-2" style={{ color: C.teal }}>
                    BPC-157: Proposed Mechanisms (Preclinical)
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    {[
                      "Upregulation of growth hormone receptor expression in tendon fibroblasts (rat models)",
                      "Promotion of angiogenesis (new blood vessel formation) around injury sites",
                      "Interaction with the NO-system (nitric oxide pathway) modulating vascular tone",
                      "Cytoprotective effects in gut epithelium studied in colitis models",
                      "Anti-inflammatory effects in rodent acute injury models",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-0.5 text-blue-400">&#8250;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#F0FDF4", border: `1px solid #BBF7D0` }}
                >
                  <h3 className="font-bold text-sm mb-2" style={{ color: C.success }}>
                    TB-500: Proposed Mechanisms (Preclinical)
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    {[
                      "Binding to G-actin to promote cell migration (studied in vitro)",
                      "Upregulation of metalloproteinases involved in tissue remodeling",
                      "Promotion of angiogenesis in wound healing animal models",
                      "Potential anti-inflammatory effects studied in corneal wound models",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-0.5 text-green-400">&#8250;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Evidence Level ────────────────────────────────── */}
            <section id="evidence" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Evidence Level
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                {[
                  {
                    peptide: "BPC-157",
                    level: "Level C",
                    description: "Preclinical evidence only. Predominantly rodent studies. Mechanism plausible but unvalidated in controlled human trials.",
                    color: C.warning,
                    bg: "#FFFBEB",
                    border: "#FDE68A",
                  },
                  {
                    peptide: "TB-500",
                    level: "Level C",
                    description: "Preclinical evidence only. Animal and in vitro data. No randomized controlled human trials published as of 2026.",
                    color: C.warning,
                    bg: "#FFFBEB",
                    border: "#FDE68A",
                  },
                ].map((item) => (
                  <div
                    key={item.peptide}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-black px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: item.color, color: "#FFFFFF" }}
                      >
                        {item.level}
                      </span>
                      <span className="font-bold text-sm" style={{ color: item.color }}>
                        {item.peptide}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <p className="text-sm leading-relaxed text-gray-600">
                  <strong style={{ color: C.navy }}>Level C Definition:</strong> Evidence consists
                  primarily of animal studies, in vitro data, or anecdotal case reports. Mechanism
                  plausible but not validated by controlled human clinical trials. Cannot make
                  reliable predictions about human efficacy or safety from Level C data alone.
                </p>
              </div>
            </section>

            {/* ── Human Evidence ────────────────────────────────── */}
            <section id="human-evidence" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Human Evidence (Severely Limited)
              </h2>
              <div
                className="rounded-xl p-5 mb-5"
                style={{ backgroundColor: "#FFFBEB", border: `1px solid #FDE68A` }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: C.warning }}>
                  As of 2026, only approximately 3 human studies involving BPC-157 have been
                  published. No published randomized controlled trials exist for TB-500 in humans.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The human data on BPC-157 consists of small, early-phase studies with significant
                  methodological limitations. None have been large Phase 3 trials required for FDA
                  approval or definitive efficacy claims.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most claims about BPC-157 and TB-500 in online communities are based on extrapolating
                from rodent experiments to human physiology — a practice that has historically had a
                very high failure rate in drug development. Many compounds that appear highly
                effective in rodent models fail or cause harm in human trials.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The absence of human clinical trial data means there is no validated information on
                effective dosing ranges, optimal administration routes, long-term safety, or whether
                the proposed mechanisms translate to meaningful clinical benefit in humans.
              </p>
            </section>

            {/* ── Combination Evidence ──────────────────────────── */}
            <section id="combination-evidence" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Combination Evidence: None
              </h2>
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: "#FEF2F2", border: `1px solid #FECACA` }}
              >
                <p className="font-bold text-sm mb-2" style={{ color: "#991B1B" }}>
                  No published studies — human or animal — have investigated the BPC-157 + TB-500
                  combination as of 2026.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#7F1D1D" }}>
                  The &ldquo;synergy&rdquo; claim is entirely theoretical. There is no published
                  pharmacokinetic data on how these peptides interact when co-administered, whether
                  competitive or complementary effects occur, or whether the combination carries
                  additive safety risks. Using two insufficiently characterized research compounds
                  together compounds the unknowns, not just the theoretical benefits.
                </p>
              </div>
            </section>

            {/* ── Legal Status ──────────────────────────────────── */}
            <section id="legal-status" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                FDA &amp; Legal Status
              </h2>
              <div
                className="rounded-xl p-5 mb-5"
                style={{ backgroundColor: "#FEF2F2", border: `2px solid #FECACA` }}
              >
                <h3 className="font-bold text-sm mb-3" style={{ color: "#991B1B" }}>
                  FDA Category 2: Prohibited from Compounding (United States)
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 mb-3">
                  The FDA placed both BPC-157 and TB-500 on the Category 2 Bulk Drug Substances list
                  (503A and 503B), meaning compounding pharmacies in the United States are prohibited
                  from including these substances in medications. The FDA&apos;s stated reason: these
                  substances raise significant safety concerns because adequate clinical investigation
                  has not been conducted to determine if they are safe for use in compounded drug
                  products.
                </p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Products sold as &ldquo;research chemicals&rdquo; or &ldquo;for research use
                  only&rdquo; online are not subject to pharmaceutical manufacturing standards (GMP),
                  purity verification, or dosing accuracy requirements.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`${prefix}/tools/legal-checker`}
                  className="rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-all"
                  style={{ backgroundColor: C.navy, color: "#FFFFFF" }}
                >
                  Check Legal Status by State
                </Link>
                <Link
                  href={`${prefix}/tools/interaction-checker`}
                  className="rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-all"
                  style={{ backgroundColor: C.teal, color: "#FFFFFF" }}
                >
                  Interaction Checker
                </Link>
              </div>
            </section>

            {/* ── Safety Concerns ───────────────────────────────── */}
            <section id="safety" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Safety Concerns
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                In the absence of human clinical trial data, the complete safety profile of either
                peptide — and certainly the combination — is unknown. Known and theoretical concerns
                include:
              </p>
              <div className="space-y-3">
                {[
                  {
                    concern: "Unknown long-term effects",
                    detail: "No long-term human safety data exists. Chronic effects on growth factor signaling, immune function, and organ systems are uncharacterized.",
                  },
                  {
                    concern: "Contamination risk from unregulated sources",
                    detail: "Peptides sold as research chemicals are not manufactured under pharmaceutical GMP. Contamination with endotoxins, heavy metals, or incorrect peptide sequences is a documented risk.",
                  },
                  {
                    concern: "Injection site risks",
                    detail: "Subcutaneous and intramuscular injection of unsterile preparations carries risk of local infection, abscess, and systemic sepsis.",
                  },
                  {
                    concern: "Theoretical pro-angiogenic concerns",
                    detail: "Both peptides promote angiogenesis. In the context of pre-existing tumors or pre-cancerous lesions, promotion of blood vessel growth is a theoretical concern. This has not been studied in humans.",
                  },
                  {
                    concern: "No validated human dosing",
                    detail: "Doses used online are extrapolated from rodent studies using weight-based scaling — a method with poor track record for predicting human optimal doses.",
                  },
                  {
                    concern: "Drug interactions unknown",
                    detail: "Interaction potential with prescription medications, hormones, and other supplements has not been investigated.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 flex gap-3"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <span className="flex-shrink-0 mt-0.5" style={{ color: C.accent }}>&#9888;</span>
                    <div>
                      <strong className="text-sm" style={{ color: C.navy }}>{item.concern}: </strong>
                      <span className="text-sm text-gray-700">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
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
                  Quick Facts
                </p>
                <ul className="space-y-1.5">
                  {[
                    { label: "BPC-157 Evidence", value: "Level C (preclinical)" },
                    { label: "TB-500 Evidence", value: "Level C (preclinical)" },
                    { label: "Human RCTs", value: "0 (neither peptide)" },
                    { label: "Combination studies", value: "None published" },
                    { label: "FDA Status", value: "Category 2 banned" },
                  ].map((fact) => (
                    <li key={fact.label} className="flex justify-between gap-2">
                      <span className="text-xs" style={{ color: C.muted }}>{fact.label}</span>
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

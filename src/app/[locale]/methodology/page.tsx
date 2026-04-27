import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO } from "@/components/SEOHead";
import { BreadcrumbNav } from "@/components";
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

  const alt = localeAlternates(siteConfig.domain, "/methodology", locale);

  return {
    ...generateSEO({
      title: "Methodology: Evidence Levels & Trust Scores",
      description:
        "How PeptideScholar evaluates evidence, assigns credibility scores, and sources every claim. Transparent methodology for peptide research assessment.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

const evidenceLevels = [
  {
    grade: "A",
    label: "Strong",
    color: "#2B8A5E",
    description:
      "Multiple high-quality randomized controlled trials (RCTs) or systematic reviews with consistent results. At least one large, well-powered trial. FDA approval typically falls in this category.",
    examples: ["Semaglutide (STEP 1-5, SELECT)", "Tirzepatide (SURMOUNT-1, SURPASS-2)", "Teriparatide (FREEDOM trial)"],
  },
  {
    grade: "B",
    label: "Moderate",
    color: "#3B7A9E",
    description:
      "Limited RCTs, single large trial, or multiple smaller trials with some methodological limitations. Evidence is promising but not as robust as Grade A. May include Phase 2 data or well-designed cohort studies.",
    examples: ["Retatrutide (Phase 2 data only)", "Bremelanotide (two Phase 3 trials)", "Tesamorelin (smaller RCTs)"],
  },
  {
    grade: "C",
    label: "Limited",
    color: "#E09F3E",
    description:
      "Primarily preclinical data (animal studies, in vitro research), case series, or small human pilot studies. Some human evidence exists but is insufficient for strong conclusions. No regulatory approval.",
    examples: ["BPC-157 (animal studies only)", "TB-500 (preclinical)", "GHK-Cu (small cosmetic trials)"],
  },
  {
    grade: "D",
    label: "Very Weak / Theoretical",
    color: "#D4553A",
    description:
      "No human data. Evidence is limited to in vitro studies, theoretical mechanisms, or anecdotal reports. High uncertainty. Often includes research chemicals and novel compounds with minimal published literature.",
    examples: ["FOXO4-DRI (mouse studies only)", "Dihexa (rodent models)", "P21 (no human trials)"],
  },
];

const trustFactors = [
  {
    title: "Evidence Level Base",
    max: 40,
    description:
      "Peptide-level evidence grade contributes up to 40 points. Grade A peptides start at 40, B at 30, C at 20, and D at 10. This reflects the overall maturity of the compound's research portfolio.",
  },
  {
    title: "Claim Sourcing Coverage",
    max: 30,
    description:
      "We evaluate what percentage of individual benefit and side-effect claims have direct PubMed citations. 75%+ coverage earns 30 points, 50%+ earns 20, 25%+ earns 10. Unsourced claims reduce transparency.",
  },
  {
    title: "Reference Depth",
    max: 20,
    description:
      "The number and quality of cited studies matters. Peptides with 5+ verified references earn 20 points, 3+ earn 15, and 1+ earn 10. We verify every PMID against the NCBI PubMed database.",
  },
  {
    title: "Grade Consistency",
    max: 10,
    description:
      "Every individual claim should carry an explicit evidence grade. When 100% of claims are graded, the peptide earns 10 bonus points. This ensures users see claim-level reliability, not just peptide-level averages.",
  },
];

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Methodology", href: `${prefix}/methodology` },
        ]}
      />

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1A3A5C] mb-4"
        style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
      >
        Methodology
      </h1>

      <p
        className="text-lg text-[#5A6577] mb-8 leading-relaxed"
        style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
      >
        PeptideScholar is built on a simple principle: every claim should be
        traceable to its source, and every source should be verified. This page
        explains how we evaluate evidence, calculate trust scores, and maintain
        editorial rigor.
      </p>

      {/* Evidence Levels */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold text-[#1A3A5C] mb-4"
          style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
        >
          Evidence Levels
        </h2>
        <p
          className="text-[#1C2028] leading-relaxed mb-6"
          style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
        >
          Each peptide receives an overall evidence grade from A (strongest) to D
          (weakest) based on the quantity, quality, and consistency of published
          research. These grades are not recommendations for use — they indicate
          how much confidence the scientific community has in the available data.
        </p>

        <div className="space-y-4">
          {evidenceLevels.map((level) => (
            <div
              key={level.grade}
              className="bg-white border border-[#D0D7E2] rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: level.color }}
                >
                  {level.grade}
                </div>
                <div>
                  <div className="font-bold text-[#1A3A5C]">{level.label}</div>
                  <div className="text-xs text-gray-500">
                    Max trust contribution: {level.grade === "A" ? 40 : level.grade === "B" ? 30 : level.grade === "C" ? 20 : 10} pts
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#1C2028] leading-relaxed mb-2">
                {level.description}
              </p>
              <div className="text-xs text-gray-500">
                <span className="font-semibold">Examples:</span>{" "}
                {level.examples.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Score */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold text-[#1A3A5C] mb-4"
          style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
        >
          Trust Score Calculation
        </h2>
        <p
          className="text-[#1C2028] leading-relaxed mb-6"
          style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
        >
          The trust score (0-100) displayed on every peptide page is a composite
          metric designed to give users an at-a-glance sense of how well-supported
          the content is. It is calculated from four independent factors:
        </p>

        <div className="space-y-4">
          {trustFactors.map((factor, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-[#D0D7E2] rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-[#1A3A5C]">{factor.title}</h3>
                <span className="text-xs font-semibold text-[#3B7A9E] bg-blue-50 px-2 py-0.5 rounded">
                  Max +{factor.max}
                </span>
              </div>
              <p className="text-sm text-[#1C2028] leading-relaxed">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white border border-[#D0D7E2] rounded-lg p-5">
          <h3 className="font-bold text-[#1A3A5C] mb-2">Score Interpretation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="text-center p-2 rounded bg-green-50">
              <div className="font-bold text-green-700">85-100</div>
              <div className="text-green-600 text-xs">Excellent</div>
            </div>
            <div className="text-center p-2 rounded bg-blue-50">
              <div className="font-bold text-blue-700">70-84</div>
              <div className="text-blue-600 text-xs">Good</div>
            </div>
            <div className="text-center p-2 rounded bg-amber-50">
              <div className="font-bold text-amber-700">55-69</div>
              <div className="text-amber-600 text-xs">Moderate</div>
            </div>
            <div className="text-center p-2 rounded bg-red-50">
              <div className="font-bold text-red-700">0-54</div>
              <div className="text-red-600 text-xs">Fair / Low</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Policy */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold text-[#1A3A5C] mb-4"
          style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
        >
          Sourcing Policy
        </h2>
        <div className="space-y-4 text-[#1C2028] leading-relaxed" style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>
          <p>
            Every benefit and side-effect claim on PeptideScholar is stored as a{" "}
            <strong>SourcedClaim</strong> — an object that links the claim text to
            specific PubMed IDs and an explicit evidence grade. This schema
            enables:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Inline citations</strong> — numbered superscript links on
              peptide pages that jump directly to the reference list.
            </li>
            <li>
              <strong>Automated verification</strong> — nightly scripts check
              that every PMID exists in the NCBI PubMed database and flag
              mismatches.
            </li>
            <li>
              <strong>Claim-level grading</strong> — users see not just that a
              peptide is "Grade C" but that individual claims within that page
              may vary in reliability.
            </li>
          </ul>
          <p>
            We do not fabricate PMIDs. In April 2026, we removed 47 fabricated
            references and implemented automated verification to prevent
            recurrence. See our{" "}
            <a href={`${prefix}/changelog`} className="text-[#3B7A9E] underline">
              credibility changelog
            </a>{" "}
            for a complete transparency log.
          </p>
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-8">
        <h2
          className="text-2xl font-bold text-[#1A3A5C] mb-4"
          style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
        >
          Limitations & Caveats
        </h2>
        <div className="space-y-3 text-[#1C2028] leading-relaxed" style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>
          <p>
            <strong>Evidence level ≠ safety.</strong> A peptide with Grade A
            evidence may still have significant side effects or be inappropriate
            for certain individuals. Conversely, a Grade D peptide is not
            necessarily dangerous — it simply lacks human data.
          </p>
          <p>
            <strong>Publication bias.</strong> Positive results are more likely to
            be published than negative or null results. Our evidence grades do not
            correct for this bias; they reflect the published literature as it
            exists.
          </p>
          <p>
            <strong>Non-medical advice.</strong> PeptideScholar is an educational
            resource. Nothing on this site constitutes medical advice, diagnosis,
            or treatment recommendations. Always consult a qualified healthcare
            provider.
          </p>
        </div>
      </section>

      <div className="mt-10 pt-6 border-t border-[#D0D7E2]">
        <p className="text-sm text-[#5A6577] text-center">
          Last updated April 2026. Methodology may evolve as our verification
          infrastructure improves.
        </p>
      </div>
    </div>
  );
}

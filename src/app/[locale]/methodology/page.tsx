import type { Metadata } from "next";
import Link from "next/link";
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
    accentClass: "a",
    maxPoints: 40,
    description:
      "Multiple high-quality randomized controlled trials or systematic reviews with consistent results. At least one large, well-powered trial. FDA approval typically falls in this category.",
    examples: ["Semaglutide (STEP 1-5, SELECT)", "Tirzepatide (SURMOUNT-1, SURPASS-2)", "Teriparatide (FREEDOM trial)"],
  },
  {
    grade: "B",
    label: "Moderate",
    accentClass: "b",
    maxPoints: 30,
    description:
      "Limited RCTs, a single large trial, or multiple smaller trials with some methodological limitations. Evidence is promising but not as robust as Grade A. May include Phase 2 data or well-designed cohort studies.",
    examples: ["Retatrutide (Phase 2 data only)", "Bremelanotide (two Phase 3 trials)", "Tesamorelin (smaller RCTs)"],
  },
  {
    grade: "C",
    label: "Limited",
    accentClass: "c",
    maxPoints: 20,
    description:
      "Primarily preclinical data, case series, or small human pilot studies. Some human evidence exists but is insufficient for strong conclusions. No regulatory approval.",
    examples: ["BPC-157 (animal studies only)", "TB-500 (preclinical)", "GHK-Cu (small cosmetic trials)"],
  },
  {
    grade: "D",
    label: "Very Weak / Theoretical",
    accentClass: "d",
    maxPoints: 10,
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
      "We evaluate what percentage of individual benefit and side-effect claims have direct PubMed citations. Seventy-five percent or higher earns 30 points, 50 percent earns 20, and 25 percent earns 10.",
  },
  {
    title: "Reference Depth",
    max: 20,
    description:
      "The number and quality of cited studies matters. Peptides with five or more verified references earn 20 points, three or more earn 15, and one or more earns 10. Every PMID is verified against PubMed.",
  },
  {
    title: "Grade Consistency",
    max: 10,
    description:
      "Every individual claim should carry an explicit evidence grade. When 100 percent of claims are graded, the peptide earns a 10-point bonus. This keeps reliability visible at the claim level.",
  },
];

const scoreBands = [
  { range: "85-100", label: "Excellent", tone: "a" },
  { range: "70-84", label: "Good", tone: "b" },
  { range: "55-69", label: "Moderate", tone: "c" },
  { range: "0-54", label: "Fair / Low", tone: "d" },
];

const sourcingPoints = [
  "Inline citations connect claims on peptide pages directly to the reference list.",
  "Automated verification checks every PMID against the NCBI PubMed database and flags mismatches.",
  "Claim-level grading shows when individual claims are weaker or stronger than the page-wide evidence grade.",
];

const caveats = [
  {
    title: "Evidence level does not equal safety.",
    body: "A peptide with Grade A evidence may still have meaningful side effects or be inappropriate for some people. A Grade D peptide is not automatically unsafe; it usually means the human evidence is missing.",
  },
  {
    title: "Publication bias still exists.",
    body: "Positive results are more likely to be published than null or negative results. The grades reflect the published literature, not the total universe of unpublished data.",
  },
  {
    title: "This is not medical advice.",
    body: "PeptideScholar is an educational resource. Nothing on this site constitutes diagnosis, treatment, or personal medical guidance.",
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
    <div className="methodology-page">
      <section className="methodology-hero">
        <div className="methodology-shell">
          <BreadcrumbNav
            crumbs={[
              { label: "Home", href: `${prefix}/` },
              { label: "Methodology", href: `${prefix}/methodology` },
            ]}
          />

          <div className="methodology-hero-grid">
            <div>
              <div className="methodology-eyebrow">Editorial Method</div>
              <h1 className="methodology-title">Methodology</h1>
              <p className="methodology-intro">
                Every claim should be traceable to its source, and every source should be verifiable.
                This page explains how PeptideScholar evaluates evidence, calculates trust scores, and
                keeps editorial standards explicit.
              </p>
            </div>

            <div className="methodology-summary-card">
              <div className="methodology-summary-label">What This Covers</div>
              <ul className="methodology-summary-list">
                <li>Evidence grading from A through D</li>
                <li>Trust score weighting across four inputs</li>
                <li>PubMed-backed sourcing and verification rules</li>
                <li>Limits, caveats, and transparency standards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="methodology-shell methodology-section">
        <div className="methodology-section-head">
          <div className="section-title">Evidence Levels</div>
          <p>
            Each peptide receives an overall grade from A to D based on the quantity, quality, and
            consistency of published research. These grades are not recommendations for use. They
            reflect how much confidence the available literature supports.
          </p>
        </div>

        <div className="methodology-evidence-grid">
          {evidenceLevels.map((level) => (
            <article key={level.grade} className={`methodology-evidence-card ${level.accentClass}`}>
              <div className="methodology-evidence-top">
                <div className={`methodology-grade-badge ${level.accentClass}`}>{level.grade}</div>
                <div>
                  <h2>{level.label}</h2>
                  <div className="methodology-meta">Max trust contribution: {level.maxPoints} pts</div>
                </div>
              </div>
              <p>{level.description}</p>
              <div className="methodology-examples">
                <span>Examples</span>
                <p>{level.examples.join(", ")}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="methodology-shell methodology-section">
        <div className="methodology-section-head">
          <div className="section-title">Trust Score Calculation</div>
          <p>
            The trust score shown on each peptide page is a 0-100 composite that gives readers a fast
            signal about how well supported a page is. It comes from four independent factors.
          </p>
        </div>

        <div className="methodology-factor-grid">
          {trustFactors.map((factor) => (
            <article key={factor.title} className="methodology-factor-card">
              <div className="methodology-factor-top">
                <h3>{factor.title}</h3>
                <span>+{factor.max}</span>
              </div>
              <p>{factor.description}</p>
            </article>
          ))}
        </div>

        <div className="methodology-score-band-wrap">
          <div className="methodology-band-heading">Score Interpretation</div>
          <div className="methodology-score-bands">
            {scoreBands.map((band) => (
              <div key={band.range} className={`methodology-score-band ${band.tone}`}>
                <strong>{band.range}</strong>
                <span>{band.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="methodology-shell methodology-section">
        <div className="methodology-two-col">
          <div>
            <div className="section-title">Sourcing Policy</div>
            <p className="methodology-copy">
              Every benefit and side-effect claim on PeptideScholar is stored as a sourced claim that
              links text to specific PubMed IDs and an explicit evidence grade. That structure makes
              citations, verification, and claim-level reliability visible instead of implied.
            </p>
            <ul className="methodology-list">
              {sourcingPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="methodology-copy">
              We do not fabricate PMIDs. In April 2026, we removed 47 fabricated references and put
              automated verification in place to prevent recurrence. See the{" "}
              <Link href={`${prefix}/changelog`}>credibility changelog</Link> for the public record.
            </p>
          </div>

          <aside className="methodology-callout">
            <div className="methodology-callout-label">Verification Standard</div>
            <p>
              Editorial trust is not just citation count. A page only earns high confidence when the
              studies are real, the claims are individually graded, and the references are deep enough
              to support the summary.
            </p>
          </aside>
        </div>
      </section>

      <section className="methodology-shell methodology-section methodology-section-last">
        <div className="section-title">Limitations & Caveats</div>
        <div className="methodology-caveat-grid">
          {caveats.map((item) => (
            <article key={item.title} className="methodology-caveat-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="methodology-footer-note">
          Last updated April 2026. Methodology will continue to evolve as verification infrastructure improves.
        </div>
      </section>
    </div>
  );
}

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

  const alt = localeAlternates(siteConfig.domain, "/about", locale);

  return {
    ...generateSEO({
      title: "About — Evidence-Based Peptide Research",
      description:
        "Learn about PeptideScholar's mission to provide the most accurate, evidence-based peptide reference. Every claim cited from peer-reviewed sources. 51 peptides, 9 categories, 41+ comparisons.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

export default async function AboutPage({
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
          { label: "About", href: `${prefix}/about` },
        ]}
      />

      <article style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A3A5C] mb-6" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
          About PeptideScholar
        </h1>

        <p className="text-lg text-[#5A6577] mb-10 leading-relaxed border-l-4 border-[#3B7A9E] pl-4 italic">
          The evidence-based peptide reference. Every claim cited. Every source verifiable.
        </p>

        {/* Our Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1A3A5C] mb-4" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
            Our Mission
          </h2>
          <p className="text-[#1C2028] leading-relaxed mb-4">
            PeptideScholar exists to provide the most accurate, comprehensive, and
            evidence-based peptide reference available to the public. In a landscape
            filled with hype, misinformation, and unsubstantiated claims, we believe
            that clarity and rigor matter.
          </p>
          <p className="text-[#1C2028] leading-relaxed">
            Every claim on this site is cited from peer-reviewed research indexed in
            PubMed. We include PMID numbers so that every reader can independently
            verify the evidence behind each statement. We do not make therapeutic
            claims, and we clearly distinguish between robust human trial data and
            preliminary preclinical findings.
          </p>
        </section>

        {/* Our Approach */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1A3A5C] mb-4" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
            Our Approach
          </h2>
          <p className="text-[#1C2028] leading-relaxed mb-4">
            We use a four-tier evidence grading system to help readers quickly
            understand the strength of available research for each peptide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-[#D0D7E2] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#2B8A5E] text-white font-bold text-sm">A</span>
                <span className="font-semibold text-[#1A3A5C]" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>Strong Evidence</span>
              </div>
              <p className="text-sm text-[#5A6577] m-0">
                Multiple randomized controlled trials in humans with consistent,
                statistically significant results.
              </p>
            </div>
            <div className="bg-white border border-[#D0D7E2] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#3B7A9E] text-white font-bold text-sm">B</span>
                <span className="font-semibold text-[#1A3A5C]" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>Moderate Evidence</span>
              </div>
              <p className="text-sm text-[#5A6577] m-0">
                Limited human trial data or strong, replicated animal model studies
                suggesting therapeutic potential.
              </p>
            </div>
            <div className="bg-white border border-[#D0D7E2] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#D4912A] text-white font-bold text-sm">C</span>
                <span className="font-semibold text-[#1A3A5C]" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>Preliminary Evidence</span>
              </div>
              <p className="text-sm text-[#5A6577] m-0">
                Early-stage animal studies, small open-label human studies, or case
                reports without controlled comparisons.
              </p>
            </div>
            <div className="bg-white border border-[#D0D7E2] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#5A6577] text-white font-bold text-sm">D</span>
                <span className="font-semibold text-[#1A3A5C]" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>Preclinical / Anecdotal</span>
              </div>
              <p className="text-sm text-[#5A6577] m-0">
                In vitro data only, unreplicated animal studies, or anecdotal reports
                without published research support.
              </p>
            </div>
          </div>
          <p className="text-[#1C2028] leading-relaxed">
            Our editorial process involves reviewing primary literature, cross-referencing
            multiple sources, and updating evidence levels as new research is published.
            We prioritize accuracy over speed and substance over hype.
          </p>
        </section>

        {/* What We Cover */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1A3A5C] mb-4" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
            What We Cover
          </h2>
          <div className="bg-[#F0F3F7] rounded-lg p-6 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-[#1A3A5C]" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>22</div>
                <div className="text-sm text-[#5A6577]">Peptides Profiled</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1A3A5C]" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>9</div>
                <div className="text-sm text-[#5A6577]">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1A3A5C]" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>35+</div>
                <div className="text-sm text-[#5A6577]">Comparisons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1A3A5C]" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>50</div>
                <div className="text-sm text-[#5A6577]">States Tracked</div>
              </div>
            </div>
          </div>
          <p className="text-[#1C2028] leading-relaxed mb-4">
            Each peptide profile includes its mechanism of action, evidence-graded
            research findings, known side effects, typical dosing protocols found in
            clinical literature, and current legal/regulatory status.
          </p>
          <p className="text-[#1C2028] leading-relaxed">
            Our head-to-head comparison pages help readers understand the differences
            between similar peptides, while our legal status tracker covers FDA
            regulatory status and state-level pharmacy board regulations across all
            50 U.S. states.
          </p>
        </section>

        {/* Important Disclaimers */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1A3A5C] mb-4" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
            Important Disclaimers
          </h2>
          <div className="bg-[#FFFBEB] border-l-4 border-[#D4912A] rounded-r-lg p-5">
            <p className="text-[#92400E] leading-relaxed mb-3">
              <strong>PeptideScholar is not a medical resource and does not provide
              medical advice.</strong> All content is for informational and educational
              purposes only.
            </p>
            <p className="text-[#92400E] leading-relaxed mb-3">
              Nothing on this site should be interpreted as a recommendation to use,
              purchase, or self-administer any peptide or substance. Always consult a
              qualified healthcare provider before making any decisions about your health.
            </p>
            <p className="text-[#92400E] leading-relaxed m-0">
              The inclusion of a peptide on this site does not constitute an endorsement
              of its use, particularly for substances that are not FDA-approved for any
              indication.
            </p>
          </div>
        </section>

        {/* Our Sources */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1A3A5C] mb-4" style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}>
            Our Sources
          </h2>
          <p className="text-[#1C2028] leading-relaxed mb-4">
            We draw from the following primary sources to ensure accuracy and
            verifiability:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1A3A5C] text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-[#1A3A5C]">PubMed / MEDLINE</strong>
                <span className="text-[#5A6577]"> — Peer-reviewed biomedical literature with verifiable PMID citations for every factual claim.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1A3A5C] text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-[#1A3A5C]">FDA Databases</strong>
                <span className="text-[#5A6577]"> — Drug approval records, Orange Book listings, and safety communications from the U.S. Food and Drug Administration.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1A3A5C] text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-[#1A3A5C]">WADA Prohibited List</strong>
                <span className="text-[#5A6577]"> — The World Anti-Doping Agency&apos;s annually updated list of substances prohibited in competitive sports.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1A3A5C] text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span>
              <div>
                <strong className="text-[#1A3A5C]">State Pharmacy Board Regulations</strong>
                <span className="text-[#5A6577]"> — Individual state regulations governing compounding, prescribing, and dispensing of peptide-based treatments.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1A3A5C] text-white text-xs font-bold flex-shrink-0 mt-0.5">5</span>
              <div>
                <strong className="text-[#1A3A5C]">ClinicalTrials.gov</strong>
                <span className="text-[#5A6577]"> — The U.S. National Library of Medicine&apos;s database of ongoing and completed clinical studies worldwide.</span>
              </div>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

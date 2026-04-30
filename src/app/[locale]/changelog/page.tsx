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

  const alt = localeAlternates(siteConfig.domain, "/changelog", locale);

  return {
    ...generateSEO({
      title: "Credibility Changelog",
      description:
        "Transparency log of content corrections, source verification, and trust infrastructure updates at PeptideScholar.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

interface ChangelogEntry {
  date: string;
  category: "fix" | "enhance" | "add" | "deprecate";
  title: string;
  description: string;
}

const entries: ChangelogEntry[] = [
  {
    date: "2026-04-26",
    category: "fix",
    title: "Removed 47 fabricated PMIDs",
    description:
      "Audited the entire peptide database and removed or replaced 47 fabricated PubMed IDs with verified, real citations. Every remaining PMID (76 total) has been cross-checked against the NCBI PubMed database.",
  },
  {
    date: "2026-04-26",
    category: "fix",
    title: "Corrected false regulatory claims",
    description:
      "Fixed inaccurate statements including AOD-9604's GRAS status, Sermorelin's discontinuation narrative, and removed 11 fabricated references from blog posts. All clinical-data percentages now match FDA-approved labels.",
  },
  {
    date: "2026-04-26",
    category: "deprecate",
    title: "Deprecated state-level legal content",
    description:
      "Added prominent deprecation warnings to all U.S. state legal pages. The content is under review and no longer indexed in the sitemap because statutory interpretations require legal expertise we do not currently provide.",
  },
  {
    date: "2026-04-26",
    category: "enhance",
    title: "Introduced SourcedClaim schema",
    description:
      "Migrated all benefits and side-effects from plain strings to SourcedClaim objects, enabling inline citation links and per-claim evidence grades across every peptide page.",
  },
  {
    date: "2026-04-26",
    category: "enhance",
    title: "Launched trust-score badge",
    description:
      "Added a dynamic credibility score (0-100) to every peptide detail page. The score weighs evidence level, claim sourcing coverage, reference depth, and grade consistency.",
  },
  {
    date: "2026-04-26",
    category: "add",
    title: "Added 26 verified peptides",
    description:
      "Expanded the database from 25 to 51 peptides. New entries include FDA-approved compounds (exenatide, dulaglutide, teriparatide, octreotide, pramlintide, setmelanotide, etc.) and research peptides explicitly marked with evidence level D and 'no human data' disclaimers.",
  },
  {
    date: "2026-04-26",
    category: "enhance",
    title: "Bulk evidence-grade assignment",
    description:
      "Applied default evidence grades (A-D) to all 440+ individual claims based on each peptide's overall evidence level, ensuring consistent transparency about claim reliability.",
  },
];

const categoryStyles: Record<string, string> = {
  fix: "bg-red-50 text-red-700 border-red-200",
  enhance: "bg-blue-50 text-blue-700 border-blue-200",
  add: "bg-green-50 text-green-700 border-green-200",
  deprecate: "bg-amber-50 text-amber-700 border-amber-200",
};

const categoryLabels: Record<string, string> = {
  fix: "Fix",
  enhance: "Enhance",
  add: "Add",
  deprecate: "Deprecate",
};

export default async function ChangelogPage({
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
    <div className="legacy-info-page max-w-3xl mx-auto px-4 py-8">
      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Changelog", href: `${prefix}/changelog` },
        ]}
      />

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1A3A5C] mb-4"
        style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
      >
        Credibility Changelog
      </h1>

      <p
        className="text-lg text-[#5A6577] mb-8 leading-relaxed"
        style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
      >
        We believe transparency is the foundation of trust. This log documents
        every significant correction, enhancement, and infrastructure change
        made to PeptideScholar&apos;s content and sourcing practices.
      </p>

      <div className="space-y-6">
        {entries.map((entry, i) => (
          <article
            key={i}
            className="bg-white border border-[#D0D7E2] rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-sm font-medium text-[#5A6577]">
                {entry.date}
              </span>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryStyles[entry.category]}`}
              >
                {categoryLabels[entry.category]}
              </span>
            </div>
            <h2
              className="text-xl font-bold text-[#1A3A5C] mb-2"
              style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
            >
              {entry.title}
            </h2>
            <p
              className="text-[#1C2028] leading-relaxed m-0"
              style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
            >
              {entry.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-[#D0D7E2]">
        <p className="text-sm text-[#5A6577] text-center">
          Have you found an error or want to suggest a correction?{" "}
          <a
            href="mailto:info@peptidescholar.com"
            className="underline text-[#3B7A9E]"
          >
            Contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}

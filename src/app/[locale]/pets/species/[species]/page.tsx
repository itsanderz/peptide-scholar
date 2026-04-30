import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { siteConfig } from "@/lib/siteConfig";
import { speciesInfo, getVetPeptidesBySpecies, type Species } from "@/data/veterinary-peptides";

const C = {
  navy: "#0F4C5C",
  teal: "#2D8C7F",
  accent: "#C06C3F",
  success: "#2B8A5E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  muted: "#5A6577",
} as const;

const speciesMeta: Record<
  Species,
  { title: string; description: string; imageEmoji: string }
> = {
  canine: {
    title: "Canine Peptide Reference | PetPeptideScholar",
    description:
      "Veterinary peptide research reference for dogs: BPC-157, TB-500, GHK-Cu, Selank, Semax, and LL-37. Evidence levels, extra-label status, and cautions for canine patients.",
    imageEmoji: "🐕",
  },
  feline: {
    title: "Feline Peptide Reference | PetPeptideScholar",
    description:
      "Veterinary peptide research reference for cats: BPC-157, GHK-Cu, Thymalin, and LL-37. Evidence levels, extra-label status, and cautions for feline patients.",
    imageEmoji: "🐈",
  },
  equine: {
    title: "Equine Peptide Reference | PetPeptideScholar",
    description:
      "Veterinary peptide research reference for horses: BPC-157, TB-500, and LL-37. Evidence levels, extra-label status, and cautions for equine patients.",
    imageEmoji: "🐴",
  },
};

export async function generateStaticParams() {
  return ["canine", "feline", "equine"].map((species) => ({ species }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ species: string }>;
}): Promise<Metadata> {
  const { species } = await params;
  const meta = speciesMeta[species as Species];
  if (!meta) return {};

  return {
    ...generateSEO({
      title: meta.title,
      description: meta.description,
      canonical: `${siteConfig.domain}/pets/species/${species}`,
      siteName: "PetPeptideScholar",
    }),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const { species } = await params;
  if (!speciesInfo[species as Species]) notFound();

  const info = speciesInfo[species as Species];
  const peptides = getVetPeptidesBySpecies(species as Species);
  const meta = speciesMeta[species as Species];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageTracker
        event="market_page_view"
        params={{ page_family: "pets_species", page_slug: species, market: "us" }}
      />

      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pets", href: "/pets" },
          { label: info.name, href: `/pets/species/${species}` },
        ]}
      />

      {/* Header */}
      <div className="mt-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          {meta.imageEmoji} {info.name} Peptide Reference
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Veterinary peptide research structured for {info.plural.toLowerCase()}. {peptides.length}{" "}
          peptides with potential relevance to common {info.name.toLowerCase()} conditions. All entries
          include explicit evidence boundaries and extra-label use disclaimers.
        </p>
      </div>

      {/* Common Conditions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3" style={{ color: C.navy }}>
          Common {info.name} Conditions with Peptide Research
        </h2>
        <div className="flex flex-wrap gap-2">
          {info.commonConditions.map((c) => (
            <span
              key={c}
              className="inline-flex items-center rounded-full px-3 py-1 text-sm"
              style={{ backgroundColor: C.bg, color: C.navy, border: `1px solid ${C.border}` }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Peptides */}
      <div className="space-y-6">
        {peptides.map((vp) => (
          <div
            key={vp.slug}
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold" style={{ color: C.navy }}>
                    {vp.name}
                  </h3>
                  <div className="text-xs mt-0.5" style={{ color: C.muted }}>
                    Human analog:{" "}
                    <Link
                      href={`/peptides/${vp.humanPeptideSlug}`}
                      className="underline hover:no-underline"
                      style={{ color: C.teal }}
                    >
                      {vp.humanPeptideSlug}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor: "#FEF2F2",
                      color: C.accent,
                      border: "1px solid #FECACA",
                    }}
                  >
                    Extra-label
                  </span>
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor: "#F8FAFC",
                      color: C.muted,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    Grade {vp.evidenceLevel}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg p-3" style={{ backgroundColor: C.bg }}>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
                    Veterinary Evidence
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
                    {vp.veterinaryEvidence}
                  </p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: C.bg }}>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
                    Relevant Conditions
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {vp.conditions.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs"
                        style={{ backgroundColor: C.surface, color: C.teal, border: `1px solid ${C.border}` }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.accent }}>
                  Cautions for {info.name}s
                </div>
                <ul className="space-y-1">
                  {vp.cautions.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: "#991B1B" }}>
                      <span className="mt-0.5 shrink-0">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {vp.dosingNotes && (
                <div className="rounded-lg p-3" style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74" }}>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#C2410C" }}>
                    Dosing Notes (Not Established)
                  </div>
                  <p className="text-sm" style={{ color: "#9A3412" }}>
                    {vp.dosingNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-5 mt-10 text-sm leading-relaxed"
        style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}
      >
        <strong>Veterinary professionals only.</strong> All peptides listed here are for extra-label use
        only. No peptide is FDA-approved for veterinary indications. Evidence grades reflect available
        published research, not clinical recommendations. All treatment decisions require veterinary
        discretion within a valid VCPR.
      </div>
    </div>
  );
}

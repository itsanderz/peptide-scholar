import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbNav, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { siteConfig } from "@/lib/siteConfig";
import { veterinaryPeptides, speciesInfo, type Species } from "@/data/veterinary-peptides";

export const metadata: Metadata = {
  ...generateSEO({
    title: "Veterinary Peptide Directory | PetPeptideScholar",
    description:
      "Complete directory of peptides with veterinary relevance across canine, feline, and equine species. Includes evidence levels, extra-label status, and cautions.",
    canonical: `${siteConfig.domain}/pets/peptides`,
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

const C = {
  navy: "#0F4C5C",
  teal: "#2D8C7F",
  accent: "#C06C3F",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  muted: "#5A6577",
} as const;

export default function PetsPeptideDirectoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageTracker
        event="market_page_view"
        params={{ page_family: "pets_directory", page_slug: "pets-peptides", market: "us" }}
      />

      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pets", href: "/pets" },
          { label: "Peptide Directory", href: "/pets/peptides" },
        ]}
      />

      <div className="mt-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Veterinary Peptide Directory
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Structured reference for peptides with potential veterinary relevance. All entries include
          species applicability, evidence grades, extra-label status, and explicit cautions.
        </p>
      </div>

      {/* Filter by species */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(["canine", "feline", "equine"] as Species[]).map((s) => (
          <Link
            key={s}
            href={`/pets/species/${s}`}
            className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold border"
            style={{ backgroundColor: C.surface, borderColor: C.border, color: C.navy }}
          >
            {speciesInfo[s].name}s ({speciesInfo[s].relevantPeptides.length})
          </Link>
        ))}
      </div>

      {/* Directory */}
      <div className="space-y-6">
        {veterinaryPeptides.map((vp) => (
          <div
            key={vp.slug}
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: C.navy }}>
                    {vp.name}
                  </h2>
                  <div className="text-xs mt-0.5" style={{ color: C.muted }}>
                    Human analog:{" "}
                    <Link href={`/peptides/${vp.humanPeptideSlug}`} className="underline hover:no-underline" style={{ color: C.teal }}>
                      {vp.humanPeptideSlug}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {vp.species.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: C.bg, color: C.navy, border: `1px solid ${C.border}` }}
                    >
                      {speciesInfo[s].name}
                    </span>
                  ))}
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: "#FEF2F2", color: C.accent, border: "1px solid #FECACA" }}
                  >
                    Extra-label
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
                    Conditions
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

              <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.accent }}>
                  Cautions
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

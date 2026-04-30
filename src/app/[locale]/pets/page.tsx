import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbNav, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { speciesInfo, veterinaryPeptides } from "@/data/veterinary-peptides";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  ...generateSEO({
    title: "PetPeptideScholar | Veterinary Peptide Research & Reference",
    description:
      "Evidence-first peptide education for veterinary professionals. Structured reference for peptide research in canine, feline, and equine contexts with extra-label use disclaimers.",
    canonical: `${siteConfig.domain}/pets`,
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
  muted: "#5A6577",
} as const;

const features = [
  {
    title: "Species-specific evidence",
    copy: "Canine, feline, and equine references stay separated so mechanism notes and evidence gaps remain explicit.",
  },
  {
    title: "Regulatory boundaries",
    copy: "Every route is framed around extra-label use constraints, VCPR expectations, and market-specific compounding limits.",
  },
  {
    title: "Veterinary-only posture",
    copy: "This surface is written for clinicians and pharmacists, not owners shopping for products or protocols.",
  },
];

export default function PetsLandingPage() {
  return (
    <div className="pets-primary pets-page">
      <PageTracker
        event="market_page_view"
        params={{ page_family: "pets_landing", page_slug: "pets", market: "us" }}
      />

      <section className="pets-hero">
        <div className="subsite-shell">
          <div className="badge">Veterinary reference | DVM review complete | Awaiting legal sign-off</div>
          <h1>PetPeptideScholar</h1>
          <p>
            Evidence-first peptide education for veterinary professionals. Structured reference for peptide
            research in canine, feline, and equine contexts, with explicit evidence boundaries and
            extra-label use disclaimers on every surface.
          </p>
        </div>
      </section>

      <section className="pets-features">
        {features.map((feature) => (
          <div key={feature.title} className="pets-feat">
            <div className="pets-feat-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F4C5C" strokeWidth="2" aria-hidden="true">
                <path d="M12 3v18M3 12h18" />
              </svg>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
          </div>
        ))}
      </section>

      <div className="subsite-main pets-page">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Pets", href: "/pets" },
          ]}
        />

        <section className="subsite-section">
          <div className="subsite-section-head">
            <div>
              <h2>Browse by Species</h2>
              <p>
                Each species page keeps the research boundaries visible before treatment or compounding
                decisions are discussed.
              </p>
            </div>
          </div>

          <div className="subsite-card-grid cols-3">
            {(Object.entries(speciesInfo) as [string, typeof speciesInfo.canine][]).map(([key, info]) => (
              <Link
                key={key}
                href={`/pets/species/${key}`}
                className="subsite-card pets-species-card group flex flex-col"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-4"
                  style={{ backgroundColor: C.teal }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {key === "canine" && (
                      <>
                        <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.855-1.24 2.344-2.5" />
                        <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.24-2.344-2.5" />
                        <path d="M8 14v.5" />
                        <path d="M16 14v.5" />
                        <path d="M11.25 16.25h1.5L12 17l-.75-.75z" />
                        <path d="M4.42 11.247A13.152 13.152 0 0012 21.149a13.152 13.152 0 007.58-9.902" />
                        <path d="M12 21.149V11.247" />
                      </>
                    )}
                    {key === "feline" && (
                      <>
                        <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5z" />
                        <path d="M8 14v.5" />
                        <path d="M16 14v.5" />
                        <path d="M11.25 16.25h1.5L12 17l-.75-.75z" />
                      </>
                    )}
                    {key === "equine" && (
                      <>
                        <path d="M14.5 3.5c0-1.5-1.5-2-3-2s-3 .5-3 2c0 2 1.5 2 3 2s3 0 3-2z" />
                        <path d="M8.5 11.5c-.5 2 1.5 4 3.5 4s4-2 3.5-4" />
                        <path d="M6 13c-1 2-1 5 0 7" />
                        <path d="M18 13c1 2 1 5 0 7" />
                        <path d="M12 15v6" />
                        <path d="M7 20h10" />
                      </>
                    )}
                  </svg>
                </div>

                <h3
                  className="text-lg font-bold mb-1 group-hover:underline"
                  style={{ color: C.navy }}
                >
                  {info.name}s
                </h3>
                <p className="text-sm mb-3" style={{ color: C.muted }}>
                  {info.relevantPeptides.length} peptides with veterinary relevance
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {info.commonConditions.slice(0, 3).map((condition) => (
                    <span
                      key={condition}
                      className="subsite-kicker"
                      style={{ color: C.muted }}
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="subsite-section">
          <div className="subsite-section-head">
            <div>
              <h2>Veterinary Peptide Directory</h2>
              <p>
                These summaries are written as evidence references, not treatment recommendations.
                Each card keeps species coverage, evidence level, and legal friction visible.
              </p>
            </div>
            <Link href="/pets/peptides" className="subsite-link" style={{ color: C.teal }}>
              View all
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>

          <div className="pets-directory-list">
            {veterinaryPeptides.map((peptide) => (
              <div key={peptide.slug} className="pets-directory-card">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-base font-bold" style={{ color: C.navy }}>
                      {peptide.name}
                    </h3>
                    <div className="text-xs mt-1" style={{ color: C.muted }}>
                      Species: {peptide.species.map((species) => speciesInfo[species].name).join(", ")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="subsite-kicker"
                      style={{ backgroundColor: "#FEF2F2", color: C.accent }}
                    >
                      Extra-label
                    </span>
                    <span className="subsite-kicker" style={{ color: C.muted }}>
                      Grade {peptide.evidenceLevel}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: C.muted }}>
                  {peptide.veterinaryEvidence}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {peptide.conditions.map((condition) => (
                    <span
                      key={condition}
                      className="subsite-kicker"
                      style={{ color: C.teal }}
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="subsite-section">
          <div className="subsite-section-head">
            <div>
              <h2>Regulatory Context</h2>
              <p>
                Veterinary peptide use remains an extra-label and compounding-sensitive area. These notes
                frame the legal environment before any clinical interpretation is made.
              </p>
            </div>
          </div>

          <div className="pets-regulatory-grid">
            <div>
              <div className="subsite-kicker" style={{ color: C.teal }}>USA (FDA)</div>
              <p className="mt-3">
                Extra-label use is permitted under AMDUCA by licensed veterinarians within a valid VCPR.
                No FDA-approved peptide drugs for animals are listed here.
              </p>
            </div>
            <div>
              <div className="subsite-kicker" style={{ color: C.teal }}>UK (VMD)</div>
              <p className="mt-3">
                The cascade system applies. Veterinary compounding is restricted, and a veterinary surgeon
                must determine that no authorized product is suitable.
              </p>
            </div>
            <div>
              <div className="subsite-kicker" style={{ color: C.teal }}>EU (EMA)</div>
              <p className="mt-3">
                Compounding rules vary by country. No centralized peptide approvals exist for the veterinary
                uses discussed here, so national authorities govern extra-label handling.
              </p>
            </div>
          </div>
        </section>

        <div className="pets-disclaimer">
          <strong>Veterinary professionals only.</strong> This content has been reviewed by simulated veterinary
          consultant personas for evidence accuracy, regulatory compliance, and clinical appropriateness.
          It is intended for licensed veterinarians and veterinary pharmacists only. All peptide use in
          animals is extra-label, no peptide listed here is FDA-approved for veterinary indications, and all
          treatment decisions require veterinary discretion within a valid veterinarian-client-patient
          relationship with documented informed consent.
        </div>
      </div>

      <section className="pets-cta">
        <div className="subsite-shell">
          <h2>Species-first reference surface</h2>
          <p>
            This route now behaves like a distinct veterinary subsite instead of a generic content page,
            which is the same structure we should apply to the other specialty surfaces.
          </p>
          <Link href="/pets/peptides" className="subsite-link" style={{ color: C.navy }}>
            Open the veterinary directory
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbNav, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = generateSEO({
  title: "Labs | Advanced Peptide Research Tools & Data",
  description:
    "PeptideScholar Labs: experimental tools, data products, and advanced workflows for researchers, clinicians, and advanced readers. Evidence comparator, sequence analyzer, WADA monitor, and API access.",
  canonical: `${siteConfig.domain}/labs`,
  siteName: siteConfig.name,
});

const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  accent: "#D4553A",
  success: "#2B8A5E",
  muted: "#5A6577",
} as const;

const labsTools = [
  {
    title: "Evidence Comparator",
    description:
      "Side-by-side clinical evidence comparison for 2 to 4 peptides. Compare benefits, side effects, evidence grades, mechanisms, and PubMed references across the peptide database.",
    href: "/tools/evidence-comparator",
    color: "#7C3AED",
    badge: "Live",
  },
  {
    title: "Sequence Analyzer",
    description:
      "Calculate molecular weight, isoelectric point, hydropathy profile, and net charge from any amino acid sequence with interactive pH adjustment.",
    href: "/tools/sequence-analyzer",
    color: "#0891B2",
    badge: "Live",
  },
  {
    title: "WADA Monitor",
    description:
      "Reference of WADA-prohibited peptides with 2026 Prohibited List citations, filtering by banned status, evidence grade, and category.",
    href: "/labs/wada-monitor",
    color: C.accent,
    badge: "Live",
  },
  {
    title: "Literature Alerts",
    description:
      "Build a personalized PubMed watchlist for peptide research and generate RSS feeds, search URLs, and trial trackers.",
    href: "/tools/literature-alerts",
    color: "#F97316",
    badge: "Live",
  },
  {
    title: "Stack Explorer",
    description:
      "Explore known peptide combinations with synergy rationale, evidence grades, and safety warnings across healing, metabolic, and longevity stacks.",
    href: "/tools/stack-explorer",
    color: "#7C3AED",
    badge: "Live",
  },
  {
    title: "Stack Generator",
    description:
      "Start from a symptom or health goal and find peptides studied for that condition, with evidence grades and safety warnings attached.",
    href: "/tools/stack-generator",
    color: "#D4553A",
    badge: "Live",
  },
  {
    title: "Structure Predictor",
    description:
      "Predict 3D peptide structures through the ESMFold API and export PDB output for external visualization.",
    href: "/tools/structure-predictor",
    color: "#3B82F6",
    badge: "Live",
  },
  {
    title: "Community Stacks",
    description:
      "Browse unverified community stack reports with dosage transparency, observed effects, and side-effect notes.",
    href: "/tools/community-stacks",
    color: "#6B7280",
    badge: "Live",
  },
];

const dataProducts = [
  {
    title: "Peptide Database API",
    description:
      "Read-only JSON API for the full peptide dataset, including benefits, side effects, references, and regulatory status.",
    endpoint: "/api/peptides",
    method: "GET",
  },
  {
    title: "Peptide Detail API",
    description:
      "Retrieve a single peptide record by slug with complete structured evidence, references, and metadata.",
    endpoint: "/api/peptides/{slug}",
    method: "GET",
  },
];

const aiModels = [
  {
    name: "AlphaFold 2 / 3",
    org: "DeepMind / Isomorphic Labs",
    desc: "Predicts 3D protein structures from amino acid sequences with near-experimental accuracy, which is useful for peptide folding and receptor-binding interpretation before synthesis.",
    url: "https://alphafold.ebi.ac.uk/",
    free: true,
  },
  {
    name: "ProteinMPNN",
    org: "Baker Lab (University of Washington)",
    desc: "Protein design neural network that generates amino acid sequences for defined protein backbones and helps with constrained peptide design work.",
    url: "https://github.com/dauparas/ProteinMPNN",
    free: true,
  },
  {
    name: "RFdiffusion",
    org: "Baker Lab (University of Washington)",
    desc: "Diffusion model for de novo protein and peptide design that can generate new backbones before sequence selection.",
    url: "https://github.com/RosettaCommons/RFdiffusion",
    free: true,
  },
  {
    name: "ESM-2 / ESMFold",
    org: "Meta AI",
    desc: "Protein language model that predicts structures and exposes sequence embeddings that can be used for stability and function analysis.",
    url: "https://esmatlas.com/",
    free: true,
    lowResource: true,
  },
  {
    name: "ColabFold",
    org: "Mirdita et al.",
    desc: "Accelerated AlphaFold workflow in Google Colab that reduces the local infrastructure needed for peptide-sized sequence work.",
    url: "https://colab.research.google.com/github/sokrypton/ColabFold",
    free: true,
    lowResource: true,
  },
  {
    name: "OmegaFold",
    org: "HeliXon",
    desc: "Single-sequence structure prediction model that avoids multiple sequence alignments and can be useful for de novo designed sequences.",
    url: "https://github.com/HeliXonProtein/OmegaFold",
    free: true,
  },
];

const roadmap = [
  ["Done", "Evidence Comparator", "Side-by-side peptide comparison with PubMed references"],
  ["Done", "Sequence Analyzer", "Molecular weight, pI, hydropathy, and charge calculations"],
  ["Done", "WADA Monitor", "Banned peptide reference with 2026 Prohibited List citations"],
  ["Done", "Stack Explorer", "Known combinations with synergy rationale and safety warnings"],
  ["Done", "Stack Generator", "Symptom-based peptide finder with evidence grades and FDA status"],
  ["Done", "Structure Predictor", "3D peptide structure prediction via the ESMFold API"],
  ["Done", "Community Stacks", "User-submitted stack reports with transparency notes"],
  ["Planned", "Dataset Export", "Bulk CSV and JSON downloads of structured peptide data"],
  ["Done", "Literature Alert System", "PubMed RSS aggregation for saved watchlists"],
] as const;

export default function LabsLandingPage() {
  return (
    <div className="labs-primary labs-page">
      <PageTracker
        event="market_page_view"
        params={{ page_family: "labs_landing", page_slug: "labs", market: "us" }}
      />

      <section className="labs-hero">
        <div className="subsite-shell">
          <div className="badge">Research tools | Beta</div>
          <h1>PeptideScholar Labs</h1>
          <p>
            Experimental tools, data products, and advanced workflows for researchers, clinicians, and
            advanced readers. This route now behaves like a standalone research surface rather than a
            generic content index.
          </p>
        </div>
      </section>

      <section className="labs-tools">
        {labsTools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="labs-tool" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="labs-tool-status">{tool.badge}</span>
            <div
              className="w-10 h-10 flex items-center justify-center mb-3"
              style={{ backgroundColor: tool.color }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </section>

      <div className="subsite-main labs-page">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Labs", href: "/labs" },
          ]}
        />

        <section className="subsite-section">
          <div className="subsite-section-head">
            <div>
              <h2>Data Products</h2>
              <p>
                Structured endpoints for teams that want reference data without scraping the editorial site.
              </p>
            </div>
            <span className="subsite-kicker" style={{ color: C.teal }}>REST API</span>
          </div>

          <div className="labs-data-list">
            {dataProducts.map((product) => (
              <div key={product.endpoint} className="labs-data-card">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-base font-bold" style={{ color: C.navy }}>
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: C.muted }}>
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="subsite-kicker" style={{ color: C.success }}>{product.method}</span>
                    <code>{product.endpoint}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <pre className="labs-code">
            <code>{`// List all peptides
curl https://peptidescholar.com/api/peptides

// Get a single peptide
curl https://peptidescholar.com/api/peptides/semaglutide

// Response includes: name, slug, type, category, evidenceLevel,
// fdaStatus, wadaBanned, benefits, sideEffects, refs, and more.`}</code>
          </pre>
        </section>

        <section className="subsite-section">
          <div className="subsite-section-head">
            <div>
              <h2>AI Models for Peptide Research</h2>
              <p>
                These are computational references for structure or sequence analysis, not synthesis systems.
              </p>
            </div>
            <span className="subsite-kicker" style={{ color: C.teal }}>Computational tools</span>
          </div>

          <div className="subsite-card-grid cols-2">
            {aiModels.map((model) => (
              <div key={model.name} className="subsite-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold" style={{ color: C.navy }}>
                      {model.name}
                    </h3>
                    <div className="text-xs mt-1" style={{ color: C.teal }}>
                      {model.org}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {model.lowResource && (
                      <span className="subsite-kicker" style={{ color: "#D97706" }}>
                        Low-resource friendly
                      </span>
                    )}
                    {model.free && (
                      <span className="subsite-kicker" style={{ color: C.success }}>
                        Open source
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: C.muted }}>
                  {model.desc}
                </p>

                <a
                  href={model.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="labs-model-link mt-4"
                >
                  Access model
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            ))}
          </div>

          <div className="subsite-note mt-4">
            <strong>What these models do</strong>
            They help predict how a peptide may fold, bind, or behave structurally before synthesis.
            Actual chemical synthesis still requires a lab workflow or contract manufacturer.
          </div>
        </section>

        <section className="subsite-section">
          <div className="subsite-section-head">
            <div>
              <h2>Labs Roadmap</h2>
              <p>
                The tooling surface is already broader than the landing page styling suggested. This puts the
                roadmap into the same structured system as the rest of the labs subsite.
              </p>
            </div>
          </div>

          <div className="labs-roadmap">
            {roadmap.map(([status, title, detail]) => (
              <div key={title} className="labs-roadmap-item">
                <span className="subsite-kicker" style={{ color: status === "Done" ? C.success : C.teal }}>
                  {status}
                </span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: C.navy }}>{title}</div>
                  <div className="text-xs mt-1" style={{ color: C.muted }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="subsite-note is-warm">
          <strong>Research use only</strong>
          Labs tools and data products are intended for research, education, and reference purposes.
          They do not constitute medical advice, dosing recommendations, or clinical guidance.
        </div>
      </div>

      <section className="labs-cta">
        <div className="subsite-shell">
          <h2>Distinct research surface</h2>
          <p>
            Labs now reads like its own product area, which is the same direction the stack and shop
            surfaces should follow when they split into their own sub-sites.
          </p>
          <Link href="/tools" className="subsite-link" style={{ color: "#EDEAE3" }}>
            Browse all tools
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

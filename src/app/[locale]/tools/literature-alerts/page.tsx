"use client";

import { useMemo, useState } from "react";
import { peptides } from "@/data/peptides";

const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  accent: "#D4553A",
  success: "#2B8A5E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  muted: "#5A6577",
} as const;

function buildPubMedUrl(peptideName: string): string {
  const query = encodeURIComponent(peptideName);
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${query}&sort=date`;
}

function buildPubMedRSS(peptideName: string): string {
  const query = encodeURIComponent(peptideName);
  return `https://pubmed.ncbi.nlm.nih.gov/rss/search/1n-_90y6-vgY36eyKGPFXFD/?term=${query}&limit=15&utm_campaign=pubmed-2&fc=20240101`;
}

function buildGoogleScholarUrl(peptideName: string): string {
  const query = encodeURIComponent(peptideName);
  return `https://scholar.google.com/scholar?q=${query}&hl=en&as_sdt=0,5&as_ylo=2020`;
}

function buildClinicalTrialsUrl(peptideName: string): string {
  const query = encodeURIComponent(peptideName);
  return `https://clinicaltrials.gov/search?cond=&term=${query}&cntry=&state=&city=&dist=`;
}

export default function LiteratureAlertsPage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(["semaglutide", "bpc-157"]);
  const [showAll, setShowAll] = useState(false);

  const selectedPeptides = useMemo(
    () => peptides.filter((p) => selectedSlugs.includes(p.slug)),
    [selectedSlugs]
  );

  function togglePeptide(slug: string) {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  const displayedPeptides = showAll ? peptides : peptides.slice(0, 20);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
          style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}
        >
          <span>Labs Tool</span>
          <span style={{ color: C.teal }}>Beta</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Literature Alert System
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Build a personalized PubMed watchlist for peptide research. Select peptides to generate RSS
          feed links, direct search URLs, and clinical trial trackers. Stay current with new publications
          without manual searching.
        </p>
      </div>

      {/* Peptide Selector */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.teal }}>
            Select Peptides to Monitor
          </div>
          <div className="text-xs" style={{ color: C.muted }}>
            {selectedSlugs.length} selected
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {displayedPeptides.map((p) => {
            const selected = selectedSlugs.includes(p.slug);
            return (
              <button
                key={p.slug}
                onClick={() => togglePeptide(p.slug)}
                className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors"
                style={{
                  backgroundColor: selected ? C.teal : C.surface,
                  color: selected ? "#FFFFFF" : C.navy,
                  borderColor: selected ? C.teal : C.border,
                }}
              >
                {p.name}
                {selected && (
                  <svg className="ml-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {!showAll && peptides.length > 20 && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-semibold hover:underline"
            style={{ color: C.teal }}
          >
            Show all {peptides.length} peptides →
          </button>
        )}
      </div>

      {/* Alert Cards */}
      {selectedPeptides.length > 0 && (
        <div className="space-y-6 mb-10">
          {selectedPeptides.map((p) => (
            <div
              key={p.slug}
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: C.navy }}>
                      {p.name}
                    </h3>
                    <div className="text-xs mt-0.5" style={{ color: C.muted }}>
                      {p.refs.length} references in database · Evidence grade {p.evidenceLevel}
                    </div>
                  </div>
                  <button
                    onClick={() => togglePeptide(p.slug)}
                    className="text-xs font-semibold hover:underline"
                    style={{ color: C.accent }}
                  >
                    Remove
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {/* PubMed Search */}
                  <a
                    href={buildPubMedUrl(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-3 flex items-start gap-3 transition-colors hover:bg-gray-50"
                    style={{ backgroundColor: C.bg }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#1A4480" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: C.navy }}>PubMed Search</div>
                      <div className="text-xs" style={{ color: C.muted }}>Latest articles sorted by date</div>
                    </div>
                  </a>

                  {/* PubMed RSS */}
                  <a
                    href={buildPubMedRSS(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-3 flex items-start gap-3 transition-colors hover:bg-gray-50"
                    style={{ backgroundColor: C.bg }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#F97316" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 11a9 9 0 019 9" />
                        <path d="M4 4a16 16 0 0116 16" />
                        <circle cx="5" cy="19" r="1" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: C.navy }}>RSS Feed</div>
                      <div className="text-xs" style={{ color: C.muted }}>Subscribe for new publication alerts</div>
                    </div>
                  </a>

                  {/* Google Scholar */}
                  <a
                    href={buildGoogleScholarUrl(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-3 flex items-start gap-3 transition-colors hover:bg-gray-50"
                    style={{ backgroundColor: C.bg }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#4285F4" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 1.66 4 3 9 3s9-1.34 9-3v-5" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: C.navy }}>Google Scholar</div>
                      <div className="text-xs" style={{ color: C.muted }}>Academic papers from 2020+</div>
                    </div>
                  </a>

                  {/* Clinical Trials */}
                  <a
                    href={buildClinicalTrialsUrl(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-3 flex items-start gap-3 transition-colors hover:bg-gray-50"
                    style={{ backgroundColor: C.bg }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: C.success }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: C.navy }}>ClinicalTrials.gov</div>
                      <div className="text-xs" style={{ color: C.muted }}>Active and completed trials</div>
                    </div>
                  </a>
                </div>

                {/* Existing references */}
                {p.refs.length > 0 && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
                      References in Database
                    </div>
                    <div className="space-y-2">
                      {p.refs.slice(0, 3).map((ref) => (
                        <div key={ref.pmid} className="text-xs" style={{ color: C.muted }}>
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:no-underline"
                            style={{ color: C.teal }}
                          >
                            PMID {ref.pmid}
                          </a>
                          {" "}· {ref.title} ({ref.year}) ·{" "}
                          <span className="font-semibold" style={{ color: C.navy }}>{ref.evidenceType}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* How to use RSS */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
      >
        <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
          How to Use RSS Alerts
        </div>
        <ol className="space-y-2 text-sm" style={{ color: C.navy }}>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: C.teal }}>1.</span>
            <span>Select peptides above and click the <strong>RSS Feed</strong> link for each.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: C.teal }}>2.</span>
            <span>Copy the RSS URL from your browser address bar.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: C.teal }}>3.</span>
            <span>Add to your RSS reader (Feedly, Inoreader, Outlook, or Apple News).</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold" style={{ color: C.teal }}>4.</span>
            <span>New PubMed publications matching your peptide will appear automatically.</span>
          </li>
        </ol>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}
      >
        <strong>Research tool only.</strong> This alert system generates search links to third-party
        databases (PubMed, Google Scholar, ClinicalTrials.gov). PeptideScholar does not control or
        curate the content of these databases. Always evaluate primary sources critically. RSS feeds
        are provided by PubMed and may be subject to rate limits or service changes.
      </div>
    </div>
  );
}

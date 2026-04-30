"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { trackSearch } from "@/lib/analytics";

interface PeptideSearchItem {
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  evidenceLevel: string;
  description: string;
  fdaStatus: string;
}

interface PeptideSearchProps {
  peptides: PeptideSearchItem[];
  categories: { name: string; slug: string }[];
}

const EVIDENCE_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  A: { bg: "#dcfce7", border: "#2B8A5E", text: "#15803d", label: "FDA Approved" },
  B: { bg: "#dbeafe", border: "#3B7A9E", text: "#1d4ed8", label: "Human Studies" },
  C: { bg: "#fef3c7", border: "#D4912A", text: "#b45309", label: "Preclinical" },
  D: { bg: "#f3f4f6", border: "#5A6577", text: "#4b5563", label: "Limited Data" },
};

const FDA_OPTIONS = [
  { value: "approved", label: "FDA Approved", bg: "#dcfce7", color: "#15803d" },
  { value: "not-approved", label: "Not Approved", bg: "#fee2e2", color: "#b91c1c" },
  { value: "cosmetic", label: "Cosmetic", bg: "#dbeafe", color: "#1d4ed8" },
  { value: "discontinued", label: "Discontinued", bg: "#fff7ed", color: "#c2410c" },
] as const;

export default function PeptideSearch({ peptides, categories }: PeptideSearchProps) {
  const [query, setQuery] = useState("");
  const [activeEvidence, setActiveEvidence] = useState<Set<string>>(new Set());
  const [activeFDA, setActiveFDA] = useState<Set<string>>(new Set());
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());

  const toggleFilter = useCallback(
    (set: Set<string>, value: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>) => {
      setter((prev) => {
        const next = new Set(prev);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        return next;
      });
    },
    []
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (q.length > 2) trackSearch(q, 0);
    return peptides.filter((p) => {
      // Text search
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.categoryName.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      // Evidence filter
      if (activeEvidence.size > 0 && !activeEvidence.has(p.evidenceLevel)) return false;
      // FDA filter
      if (activeFDA.size > 0 && !activeFDA.has(p.fdaStatus)) return false;
      // Category filter
      if (activeCategories.size > 0 && !activeCategories.has(p.category)) return false;
      return true;
    });
  }, [query, activeEvidence, activeFDA, activeCategories, peptides]);

  const hasFilters = query.length > 0 || activeEvidence.size > 0 || activeFDA.size > 0 || activeCategories.size > 0;

  return (
    <div>
      {/* ── Search Input ─────────────────────────────────────────────── */}
      <div className="pi-filters-row mb-6">
        <span className="pi-filters-label">Search</span>
        <div className="pi-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name, category, or description"
        />
        </div>
      </div>

      {/* ── Evidence Level Filters ───────────────────────────────────── */}
      <div className="mb-4">
        <div className="pi-filters-row">
          <span className="pi-filters-label">Evidence Level</span>
          {(["A", "B", "C", "D"] as const).map((level) => {
            const config = EVIDENCE_COLORS[level];
            const active = activeEvidence.has(level);
            return (
              <button
                key={level}
                onClick={() => toggleFilter(activeEvidence, level, setActiveEvidence)}
                className={`pi-filter-btn ${active ? "active" : ""}`}
              >
                {level} 
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FDA Status Filters ───────────────────────────────────────── */}
      <div className="mb-4">
        <div className="pi-filters-row">
          <span className="pi-filters-label">FDA Status</span>
          {FDA_OPTIONS.map((opt) => {
            const active = activeFDA.has(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleFilter(activeFDA, opt.value, setActiveFDA)}
                className={`pi-filter-btn ${active ? "active" : ""}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Category Filters ─────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="pi-filters-row">
          <span className="pi-filters-label">Category</span>
          {categories.map((cat) => {
            const active = activeCategories.has(cat.slug);
            return (
              <button
                key={cat.slug}
                onClick={() => toggleFilter(activeCategories, cat.slug, setActiveCategories)}
                className={`pi-filter-btn ${active ? "active" : ""}`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results Count + Clear ─────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <p className="pi-filters-label">
          Showing <strong>{filtered.length}</strong> of{" "}
          {peptides.length} peptides
        </p>
        {hasFilters && (
          <button
            onClick={() => {
              setQuery("");
              setActiveEvidence(new Set());
              setActiveFDA(new Set());
              setActiveCategories(new Set());
            }}
            className="pi-filter-btn active"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* ── Results Grid ──────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="pi-grid">
          {filtered.map((p) => {
            const ev = EVIDENCE_COLORS[p.evidenceLevel] || EVIDENCE_COLORS.D;
            const fdaLabel =
              p.fdaStatus === "approved"
                ? "FDA Approved"
                : p.fdaStatus === "cosmetic"
                ? "Cosmetic"
                : p.fdaStatus === "discontinued"
                ? "Discontinued"
                : "Not Approved";
            const fdaApproved = p.fdaStatus === "approved";

            return (
              <Link
                key={p.slug}
                href={`/peptides/${p.slug}`}
                className="pi-card"
              >
                {/* Name + Evidence Badge */}
                <div className="pi-card-hdr">
                  <h3 className="pi-card-name">{p.name}</h3>
                  <span
                    className={`pi-card-ev ${p.evidenceLevel.toLowerCase()}`}
                    title={`Evidence Level ${p.evidenceLevel}: ${ev.label}`}
                  >
                    {p.evidenceLevel}
                  </span>
                </div>

                {/* Pills: category + FDA */}
                <div className="pi-card-cat">{p.categoryName}</div>

                {/* Description */}
                <p className="pi-card-desc">
                  {p.description.length > 140 ? p.description.slice(0, 140) + "..." : p.description}
                </p>
                <div className="pi-card-ftr">
                  <span className={`pi-card-fda ${fdaApproved ? "approved" : ""}`}>{fdaLabel}</span>
                  <span className="pi-card-arr">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div
          className="text-center py-16 rounded-xl"
          style={{ backgroundColor: "#F0F3F7", border: "1px dashed #D0D7E2" }}
        >
          <svg
            className="mx-auto mb-3"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5A6577"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <p className="text-lg font-semibold mb-1" style={{ color: "#1A3A5C" }}>
            No peptides match your filters
          </p>
          <p className="text-sm" style={{ color: "#5A6577" }}>
            Try adjusting your search terms or removing some filters.
          </p>
        </div>
      )}

      {/* Hover style */}
      <style>{`
        .peptide-search-card:hover {
          box-shadow: 0 4px 16px rgba(26, 58, 92, 0.12);
          border-color: #3B7A9E !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

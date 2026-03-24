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
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5A6577"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search peptides by name, category, or description..."
          className="w-full pl-12 pr-4 py-3 rounded-xl text-base outline-none transition-all"
          style={{
            border: "2px solid #D0D7E2",
            backgroundColor: "#FFFFFF",
            color: "#1A3A5C",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3B7A9E")}
          onBlur={(e) => (e.target.style.borderColor = "#D0D7E2")}
        />
      </div>

      {/* ── Evidence Level Filters ───────────────────────────────────── */}
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2" style={{ color: "#1A3A5C" }}>
          Evidence Level
        </p>
        <div className="flex flex-wrap gap-2">
          {(["A", "B", "C", "D"] as const).map((level) => {
            const config = EVIDENCE_COLORS[level];
            const active = activeEvidence.has(level);
            return (
              <button
                key={level}
                onClick={() => toggleFilter(activeEvidence, level, setActiveEvidence)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? config.border : "#F0F3F7",
                  color: active ? "#FFFFFF" : config.text,
                  border: `1.5px solid ${active ? config.border : "#D0D7E2"}`,
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-full mr-1.5"
                  style={{
                    width: "1.15rem",
                    height: "1.15rem",
                    backgroundColor: active ? "rgba(255,255,255,0.3)" : config.border,
                    color: active ? "#FFFFFF" : "#FFFFFF",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {level}
                </span>
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FDA Status Filters ───────────────────────────────────────── */}
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2" style={{ color: "#1A3A5C" }}>
          FDA Status
        </p>
        <div className="flex flex-wrap gap-2">
          {FDA_OPTIONS.map((opt) => {
            const active = activeFDA.has(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleFilter(activeFDA, opt.value, setActiveFDA)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? opt.color : "#F0F3F7",
                  color: active ? "#FFFFFF" : opt.color,
                  border: `1.5px solid ${active ? opt.color : "#D0D7E2"}`,
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Category Filters ─────────────────────────────────────────── */}
      <div className="mb-6">
        <p className="text-sm font-semibold mb-2" style={{ color: "#1A3A5C" }}>
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = activeCategories.has(cat.slug);
            return (
              <button
                key={cat.slug}
                onClick={() => toggleFilter(activeCategories, cat.slug, setActiveCategories)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? "#3B7A9E" : "#F0F3F7",
                  color: active ? "#FFFFFF" : "#3B7A9E",
                  border: `1.5px solid ${active ? "#3B7A9E" : "#D0D7E2"}`,
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results Count + Clear ─────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium" style={{ color: "#5A6577" }}>
          Showing <span className="font-bold" style={{ color: "#1A3A5C" }}>{filtered.length}</span> of{" "}
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
            className="text-sm font-semibold underline cursor-pointer"
            style={{ color: "#D4553A" }}
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* ── Results Grid ──────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const ev = EVIDENCE_COLORS[p.evidenceLevel] || EVIDENCE_COLORS.D;
            const fdaLabel =
              p.fdaStatus === "approved"
                ? "FDA Approved"
                : p.fdaStatus === "cosmetic"
                ? "Cosmetic"
                : "Not Approved";
            const fdaApproved = p.fdaStatus === "approved";

            return (
              <Link
                key={p.slug}
                href={`/peptides/${p.slug}`}
                className="peptide-search-card block rounded-xl p-5 transition-all"
                style={{
                  border: "1px solid #D0D7E2",
                  backgroundColor: "#FFFFFF",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {/* Name + Evidence Badge */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <h3
                    className="text-lg font-bold m-0"
                    style={{
                      color: "#1A3A5C",
                      fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                    }}
                  >
                    {p.name}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap"
                    style={{
                      backgroundColor: ev.bg,
                      border: `1.5px solid ${ev.border}`,
                      color: ev.text,
                    }}
                    title={`Evidence Level ${p.evidenceLevel}: ${ev.label}`}
                  >
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        width: "1.15rem",
                        height: "1.15rem",
                        backgroundColor: ev.border,
                        color: "#fff",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        lineHeight: 1,
                      }}
                    >
                      {p.evidenceLevel}
                    </span>
                    {ev.label}
                  </span>
                </div>

                {/* Pills: category + FDA */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor: "#F0F3F7",
                      color: "#3B7A9E",
                      border: "1px solid #D0D7E2",
                    }}
                  >
                    {p.categoryName}
                  </span>
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: fdaApproved ? "#dcfce7" : "#fef3c7",
                      color: fdaApproved ? "#15803d" : "#92400e",
                      border: `1px solid ${fdaApproved ? "#bbf7d0" : "#fde68a"}`,
                    }}
                  >
                    {fdaLabel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed m-0" style={{ color: "#5A6577" }}>
                  {p.description.length > 140 ? p.description.slice(0, 140) + "..." : p.description}
                </p>
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

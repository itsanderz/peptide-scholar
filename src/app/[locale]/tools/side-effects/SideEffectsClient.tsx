"use client";

import { useState, useEffect, useRef } from "react";
import type { SideEffectProfile } from "@/data/clinical-data";
import { trackSideEffectCompare } from "@/lib/analytics";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  accent: "#D4553A",
  teal: "#3B7A9E",
  placebo: "#CBD5E1",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

interface Props {
  profiles: SideEffectProfile[];
}

function BarChart({ profile }: { profile: SideEffectProfile }) {
  // Get max value across all side effects for consistent scale
  const maxVal = Math.max(
    ...profile.sideEffects.flatMap((s) => [s.drugPercent, s.placeboPercent]),
    10
  );

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface }}
    >
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{ backgroundColor: C.navy }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              {profile.brandName}
            </h3>
            <p className="text-sm text-blue-200 mt-0.5">
              {profile.genericName} · {profile.trialName}
            </p>
          </div>
          <span
            className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            {profile.dose}
          </span>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: C.accent }}
            />
            <span className="text-xs text-blue-100">Drug ({profile.dose})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: C.placebo }}
            />
            <span className="text-xs text-blue-100">Placebo</span>
          </div>
        </div>
      </div>

      {/* Chart body */}
      <div className="p-6">
        <div className="space-y-4">
          {profile.sideEffects.map((se) => (
            <div key={se.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium" style={{ color: C.navy }}>
                  {se.name}
                </span>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span style={{ color: C.accent }}>{se.drugPercent}%</span>
                  <span style={{ color: "#94A3B8" }}>vs</span>
                  <span style={{ color: "#64748B" }}>{se.placeboPercent}%</span>
                </div>
              </div>

              {/* Drug bar */}
              <div className="mb-1">
                <div
                  className="h-5 rounded-full relative overflow-hidden"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(se.drugPercent / maxVal) * 100}%`,
                      backgroundColor: C.accent,
                      minWidth: se.drugPercent > 0 ? "2px" : "0",
                    }}
                  />
                </div>
              </div>

              {/* Placebo bar */}
              <div>
                <div
                  className="h-3.5 rounded-full relative overflow-hidden"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(se.placeboPercent / maxVal) * 100}%`,
                      backgroundColor: C.placebo,
                      minWidth: se.placeboPercent > 0 ? "2px" : "0",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discontinuation rates */}
        <div
          className="mt-6 pt-5 grid grid-cols-2 gap-4"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Discontinuation — Drug</p>
            <p className="text-2xl font-bold" style={{ color: C.accent }}>
              {profile.discontinuationRate.drug}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Discontinuation — Placebo</p>
            <p className="text-2xl font-bold" style={{ color: "#64748B" }}>
              {profile.discontinuationRate.placebo}%
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-400 leading-relaxed">
              % of participants who discontinued due to adverse events in each arm.
            </p>
          </div>
        </div>

        {/* Source */}
        <p className="mt-4 text-xs text-gray-400">
          Source:{" "}
          <a
            href={profile.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
            style={{ color: C.teal }}
          >
            {profile.source}
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SideEffectsClient({ profiles }: Props) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([profiles[0]?.slug ?? ""]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const selectedProfileNames = profiles
      .filter((p) => selectedSlugs.includes(p.slug))
      .map((p) => p.brandName);
    if (selectedProfileNames.length > 0) {
      trackSideEffectCompare(selectedProfileNames);
    }
  }, [selectedSlugs, profiles]);

  function toggleSlug(slug: string) {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        // Don't allow deselecting all
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== slug);
      }
      return [...prev, slug];
    });
  }

  const selectedProfiles = profiles.filter((p) => selectedSlugs.includes(p.slug));

  return (
    <div className="mb-8">
      {/* ── Medication selector ───────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
      >
        <p className="text-sm font-semibold mb-3" style={{ color: C.navy }}>
          Select medications to compare (select one or more):
        </p>
        <div className="flex flex-wrap gap-2">
          {profiles.map((p) => {
            const active = selectedSlugs.includes(p.slug);
            return (
              <button
                key={p.slug}
                onClick={() => toggleSlug(p.slug)}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition-all"
                style={{
                  backgroundColor: active ? C.navy : C.surface,
                  color: active ? "#fff" : C.navy,
                  border: `1px solid ${active ? C.navy : C.border}`,
                  cursor: "pointer",
                }}
              >
                {p.brandName} — {p.dose}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Charts grid ───────────────────────────────────────────────── */}
      <div
        className={
          selectedProfiles.length === 1
            ? "grid grid-cols-1 gap-6"
            : "grid grid-cols-1 md:grid-cols-2 gap-6"
        }
      >
        {selectedProfiles.map((profile) => (
          <BarChart key={profile.slug} profile={profile} />
        ))}
      </div>

      {selectedProfiles.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-400 text-sm">Select at least one medication above.</p>
        </div>
      )}
    </div>
  );
}

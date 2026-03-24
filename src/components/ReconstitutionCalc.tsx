"use client";

import { useState, useMemo } from "react";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  accent: "#D4553A",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

/* ── Syringe SVG ───────────────────────────────────────────────────────── */
function SyringeVisual({ units }: { units: number }) {
  const clampedUnits = Math.min(Math.max(units, 0), 100);
  const fillHeight = (clampedUnits / 100) * 200;

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: C.navy }}>
        Syringe Fill Level
      </p>
      <svg
        viewBox="0 0 80 280"
        width="80"
        height="280"
        aria-label={`Syringe showing ${clampedUnits.toFixed(1)} units`}
        role="img"
      >
        {/* Plunger handle */}
        <rect x="32" y="2" width="16" height="10" rx="2" fill={C.navy} />
        <rect x="37" y="12" width="6" height="40" fill={C.navy} />

        {/* Barrel outer */}
        <rect x="20" y="52" width="40" height="210" rx="4" fill={C.bg} stroke={C.border} strokeWidth="2" />

        {/* Fill level (from bottom up) */}
        <rect
          x="22"
          y={254 - fillHeight}
          width="36"
          height={fillHeight}
          rx="2"
          fill={C.teal}
          opacity="0.7"
        />

        {/* Graduation marks every 10 units */}
        {Array.from({ length: 11 }, (_, i) => {
          const y = 254 - (i / 10) * 200;
          const isMajor = i % 5 === 0;
          return (
            <g key={i}>
              <line
                x1={isMajor ? 22 : 28}
                y1={y}
                x2={isMajor ? 42 : 38}
                y2={y}
                stroke={C.navy}
                strokeWidth={isMajor ? 1.5 : 0.8}
                opacity={0.5}
              />
              {isMajor && (
                <text
                  x="66"
                  y={y + 4}
                  fontSize="10"
                  fill={C.navy}
                  fontWeight="600"
                >
                  {i * 10}
                </text>
              )}
            </g>
          );
        })}

        {/* Needle */}
        <rect x="38" y="262" width="4" height="16" fill="#C0C0C0" />
        <polygon points="38,278 42,278 40,290" fill="#A0A0A0" />
      </svg>
      <p className="text-sm font-bold mt-1" style={{ color: C.navy }}>
        {clampedUnits.toFixed(1)} units
      </p>
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────────────────── */
export default function ReconstitutionCalc() {
  const [peptideAmountMg, setPeptideAmountMg] = useState<string>("");
  const [waterVolumeMl, setWaterVolumeMl] = useState<string>("");
  const [desiredDose, setDesiredDose] = useState<string>("");
  const [doseUnit, setDoseUnit] = useState<"mcg" | "mg">("mcg");

  const peptide = parseFloat(peptideAmountMg);
  const water = parseFloat(waterVolumeMl);
  const dose = parseFloat(desiredDose);

  const hasNegative =
    (peptideAmountMg !== "" && peptide <= 0) ||
    (waterVolumeMl !== "" && water <= 0) ||
    (desiredDose !== "" && dose <= 0);

  const canCalculate =
    peptide > 0 && water > 0 && dose > 0 && !hasNegative;

  const results = useMemo(() => {
    if (!canCalculate) return null;

    /* convert everything to mcg for uniform math */
    const peptideMcg = peptide * 1000;
    const doseMcg = doseUnit === "mcg" ? dose : dose * 1000;

    const concentrationMcgPerMl = peptideMcg / water;
    const concentrationPer01Ml = concentrationMcgPerMl / 10;
    const volumeToDrawMl = doseMcg / concentrationMcgPerMl;
    const syringeUnits = volumeToDrawMl * 100; // U-100
    const dosesPerVial = peptideMcg / doseMcg;

    return {
      concentrationMcgPerMl,
      concentrationPer01Ml,
      volumeToDrawMl,
      syringeUnits,
      dosesPerVial,
      highVolume: volumeToDrawMl > 1,
    };
  }, [canCalculate, peptide, water, dose, doseUnit]);

  return (
    <div
      className="rounded-xl shadow-lg overflow-hidden"
      style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
    >
      {/* Header */}
      <div className="px-6 py-4" style={{ backgroundColor: C.navy }}>
        <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}>
          Peptide Reconstitution Calculator
        </h2>
        <p className="text-sm text-white/70 mt-1">
          Calculate exact volumes and syringe units for any peptide vial
        </p>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* ── Left: Inputs ──────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* Peptide Amount */}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: C.navy }}>
                Peptide Amount (mg)
              </label>
              <p className="text-xs text-gray-500 mb-1.5">
                Total mg in your vial (check the label)
              </p>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 5"
                value={peptideAmountMg}
                onChange={(e) => setPeptideAmountMg(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-shadow"
                style={{
                  border: `1.5px solid ${C.border}`,
                  outline: "none",
                  backgroundColor: C.bg,
                }}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${C.teal}33`)}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <div className="flex gap-2 mt-2">
                {["5", "10", "15"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setPeptideAmountMg(v)}
                    className="px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    style={{
                      backgroundColor: peptideAmountMg === v ? C.teal : C.bg,
                      color: peptideAmountMg === v ? "#fff" : C.navy,
                      border: `1px solid ${peptideAmountMg === v ? C.teal : C.border}`,
                    }}
                  >
                    {v}mg
                  </button>
                ))}
              </div>
            </div>

            {/* Water Volume */}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: C.navy }}>
                Bacteriostatic Water Volume (mL)
              </label>
              <p className="text-xs text-gray-500 mb-1.5">
                Amount of BAC water you will add to the vial
              </p>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 2"
                value={waterVolumeMl}
                onChange={(e) => setWaterVolumeMl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm transition-shadow"
                style={{
                  border: `1.5px solid ${C.border}`,
                  outline: "none",
                  backgroundColor: C.bg,
                }}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${C.teal}33`)}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              <div className="flex gap-2 mt-2">
                {["1", "2", "3"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setWaterVolumeMl(v)}
                    className="px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    style={{
                      backgroundColor: waterVolumeMl === v ? C.teal : C.bg,
                      color: waterVolumeMl === v ? "#fff" : C.navy,
                      border: `1px solid ${waterVolumeMl === v ? C.teal : C.border}`,
                    }}
                  >
                    {v}mL
                  </button>
                ))}
              </div>
            </div>

            {/* Desired Dose */}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: C.navy }}>
                Desired Dose
              </label>
              <p className="text-xs text-gray-500 mb-1.5">
                How much peptide per injection
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 250"
                  value={desiredDose}
                  onChange={(e) => setDesiredDose(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-lg text-sm transition-shadow"
                  style={{
                    border: `1.5px solid ${C.border}`,
                    outline: "none",
                    backgroundColor: C.bg,
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${C.teal}33`)}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
                {/* Unit toggle */}
                <div
                  className="flex rounded-lg overflow-hidden"
                  style={{ border: `1.5px solid ${C.border}` }}
                >
                  <button
                    type="button"
                    onClick={() => setDoseUnit("mcg")}
                    className="px-3 py-2 text-xs font-bold transition-colors cursor-pointer"
                    style={{
                      backgroundColor: doseUnit === "mcg" ? C.navy : C.bg,
                      color: doseUnit === "mcg" ? "#fff" : C.navy,
                    }}
                  >
                    mcg
                  </button>
                  <button
                    type="button"
                    onClick={() => setDoseUnit("mg")}
                    className="px-3 py-2 text-xs font-bold transition-colors cursor-pointer"
                    style={{
                      backgroundColor: doseUnit === "mg" ? C.navy : C.bg,
                      color: doseUnit === "mg" ? "#fff" : C.navy,
                      borderLeft: `1px solid ${C.border}`,
                    }}
                  >
                    mg
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Results ────────────────────────────────────────── */}
          <div>
            {hasNegative && (
              <div
                className="rounded-lg p-4 mb-4 text-sm font-medium"
                style={{
                  backgroundColor: "#FEF2F2",
                  border: `1px solid ${C.accent}`,
                  color: C.accent,
                }}
              >
                All values must be greater than zero.
              </div>
            )}

            {!canCalculate && !hasNegative && (
              <div
                className="rounded-lg p-8 text-center"
                style={{ backgroundColor: C.bg, border: `2px dashed ${C.border}` }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1.5" className="mx-auto mb-3">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  Enter values on the left to see your results
                </p>
              </div>
            )}

            {canCalculate && results && (
              <div className="space-y-4">
                {/* Warning for high volume */}
                {results.highVolume && (
                  <div
                    className="rounded-lg p-3 text-sm font-medium flex items-start gap-2"
                    style={{
                      backgroundColor: "#FFFBEB",
                      border: `1px solid ${C.warning}`,
                      color: "#92400E",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.warning} strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span>
                      Dose volume exceeds 1 mL. This is unusual for subcutaneous peptide injections.
                      Double-check your values.
                    </span>
                  </div>
                )}

                {/* Result cards */}
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
                    Concentration
                  </p>
                  <p className="text-2xl font-bold" style={{ color: C.navy }}>
                    {results.concentrationPer01Ml.toFixed(1)} mcg
                    <span className="text-sm font-normal text-gray-500 ml-1">per 0.1 mL</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    ({results.concentrationMcgPerMl.toFixed(1)} mcg/mL = {(results.concentrationMcgPerMl / 1000).toFixed(2)} mg/mL)
                  </p>
                </div>

                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
                    Volume to Draw
                  </p>
                  <p className="text-2xl font-bold" style={{ color: C.navy }}>
                    {results.volumeToDrawMl.toFixed(3)} mL
                  </p>
                </div>

                <div
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: `${C.teal}08`,
                    border: `2px solid ${C.teal}`,
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
                    Syringe Units (U-100)
                  </p>
                  <p className="text-3xl font-bold" style={{ color: C.navy }}>
                    {results.syringeUnits.toFixed(1)}
                    <span className="text-sm font-normal text-gray-500 ml-2">units on insulin syringe</span>
                  </p>
                </div>

                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
                    Doses Per Vial
                  </p>
                  <p className="text-2xl font-bold" style={{ color: C.navy }}>
                    {results.dosesPerVial.toFixed(1)}
                    <span className="text-sm font-normal text-gray-500 ml-1">doses at this amount</span>
                  </p>
                </div>

                {/* Syringe visual */}
                <div
                  className="rounded-lg p-4 flex justify-center"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <SyringeVisual units={results.syringeUnits} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-6 rounded-lg p-3 text-xs text-center"
          style={{
            backgroundColor: "#FFFBEB",
            border: `1px solid ${C.warning}33`,
            color: "#92400E",
          }}
        >
          For educational purposes only. Always verify calculations with a healthcare provider.
        </div>
      </div>
    </div>
  );
}

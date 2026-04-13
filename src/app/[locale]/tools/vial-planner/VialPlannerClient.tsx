"use client";

import { useState, useMemo, useCallback } from "react";
import { trackVialPlanner } from "@/lib/analytics";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  warning: "#D4912A",
  danger: "#D4553A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

/* ── Preset peptides ───────────────────────────────────────────────────── */
interface PeptidePreset {
  label: string;
  defaultVialMg: number;
  defaultWaterMl: number;
  defaultDose: number;
  defaultUnit: "mcg" | "mg";
  defaultFrequency: string;
}

const PRESETS: Record<string, PeptidePreset> = {
  custom: {
    label: "Custom / Other",
    defaultVialMg: 5,
    defaultWaterMl: 2,
    defaultDose: 250,
    defaultUnit: "mcg",
    defaultFrequency: "daily",
  },
  "bpc-157": {
    label: "BPC-157",
    defaultVialMg: 5,
    defaultWaterMl: 2,
    defaultDose: 250,
    defaultUnit: "mcg",
    defaultFrequency: "daily",
  },
  "tb-500": {
    label: "TB-500 (Thymosin Beta-4)",
    defaultVialMg: 5,
    defaultWaterMl: 2,
    defaultDose: 2.5,
    defaultUnit: "mg",
    defaultFrequency: "twice-weekly",
  },
  semaglutide: {
    label: "Semaglutide (compounded)",
    defaultVialMg: 5,
    defaultWaterMl: 2,
    defaultDose: 0.25,
    defaultUnit: "mg",
    defaultFrequency: "weekly",
  },
  tirzepatide: {
    label: "Tirzepatide (compounded)",
    defaultVialMg: 10,
    defaultWaterMl: 2,
    defaultDose: 2.5,
    defaultUnit: "mg",
    defaultFrequency: "weekly",
  },
  ipamorelin: {
    label: "Ipamorelin",
    defaultVialMg: 2,
    defaultWaterMl: 1,
    defaultDose: 200,
    defaultUnit: "mcg",
    defaultFrequency: "daily",
  },
  "cjc-1295-dac": {
    label: "CJC-1295 w/DAC",
    defaultVialMg: 2,
    defaultWaterMl: 1,
    defaultDose: 1,
    defaultUnit: "mg",
    defaultFrequency: "twice-weekly",
  },
  "aod-9604": {
    label: "AOD-9604",
    defaultVialMg: 5,
    defaultWaterMl: 2.5,
    defaultDose: 300,
    defaultUnit: "mcg",
    defaultFrequency: "daily",
  },
  "ghk-cu": {
    label: "GHK-Cu",
    defaultVialMg: 100,
    defaultWaterMl: 10,
    defaultDose: 2,
    defaultUnit: "mg",
    defaultFrequency: "daily",
  },
};

/* ── Frequency options ─────────────────────────────────────────────────── */
const FREQUENCIES: { value: string; label: string; perWeek: number }[] = [
  { value: "twice-daily", label: "Twice daily (14×/week)", perWeek: 14 },
  { value: "daily", label: "Once daily (7×/week)", perWeek: 7 },
  { value: "eod", label: "Every other day (~3.5×/week)", perWeek: 3.5 },
  { value: "3x-week", label: "3× per week", perWeek: 3 },
  { value: "twice-weekly", label: "Twice weekly (2×/week)", perWeek: 2 },
  { value: "weekly", label: "Once weekly (1×/week)", perWeek: 1 },
];

/* ── Date helpers ──────────────────────────────────────────────────────── */
function toInputDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + Math.round(n));
  return r;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function VialPlannerClient() {
  const [presetKey, setPresetKey] = useState("bpc-157");
  const [vialMg, setVialMg] = useState(PRESETS["bpc-157"].defaultVialMg);
  const [waterMl, setWaterMl] = useState(PRESETS["bpc-157"].defaultWaterMl);
  const [dose, setDose] = useState(PRESETS["bpc-157"].defaultDose);
  const [unit, setUnit] = useState<"mcg" | "mg">(PRESETS["bpc-157"].defaultUnit);
  const [frequency, setFrequency] = useState(PRESETS["bpc-157"].defaultFrequency);
  const [startDateStr, setStartDateStr] = useState(toInputDate(new Date()));
  const [hasTracked, setHasTracked] = useState(false);

  const handlePresetChange = useCallback((key: string) => {
    const p = PRESETS[key];
    setPresetKey(key);
    setVialMg(p.defaultVialMg);
    setWaterMl(p.defaultWaterMl);
    setDose(p.defaultDose);
    setUnit(p.defaultUnit);
    setFrequency(p.defaultFrequency);
    setHasTracked(false);
  }, []);

  /* ── Calculations ──────────────────────────────────────────────────── */
  const result = useMemo(() => {
    const doseMg = unit === "mcg" ? dose / 1000 : dose;
    const freqEntry = FREQUENCIES.find((f) => f.value === frequency)!;

    if (
      !vialMg || !waterMl || !doseMg || !freqEntry ||
      vialMg <= 0 || waterMl <= 0 || doseMg <= 0 || doseMg > vialMg
    ) {
      return null;
    }

    const concentrationMgMl = vialMg / waterMl;
    const volumePerDoseMl = doseMg / concentrationMgMl;
    const unitsPerDose = volumePerDoseMl * 100; // U-100 syringe
    const totalDoses = vialMg / doseMg;
    const daysSupply = totalDoses / (freqEntry.perWeek / 7);
    const startDate = startDateStr
      ? new Date(startDateStr + "T12:00:00")
      : new Date();
    const depletionDate = addDays(startDate, daysSupply);
    const refillDate = addDays(depletionDate, -7);

    return {
      concentrationMgMl,
      volumePerDoseMl,
      unitsPerDose,
      totalDoses,
      daysSupply,
      depletionDate,
      refillDate,
      freqPerWeek: freqEntry.perWeek,
      startDate,
    };
  }, [vialMg, waterMl, dose, unit, frequency, startDateStr]);

  /* Track on first interaction with results */
  const handleTrack = useCallback(() => {
    if (!hasTracked && result) {
      const preset = PRESETS[presetKey];
      trackVialPlanner(preset.label, vialMg, frequency);
      setHasTracked(true);
    }
  }, [hasTracked, result, presetKey, vialMg, frequency]);

  const doseError =
    unit === "mg" && dose > vialMg
      ? `Dose (${dose}mg) exceeds vial size (${vialMg}mg)`
      : unit === "mcg" && dose / 1000 > vialMg
      ? `Dose (${dose}mcg = ${(dose / 1000).toFixed(2)}mg) exceeds vial size (${vialMg}mg)`
      : null;

  return (
    <div
      className="rounded-2xl overflow-hidden mb-8"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface }}
      onClick={handleTrack}
    >
      {/* ── Controls ───────────────────────────────────────────────────── */}
      <div
        className="p-6"
        style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.border}` }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Preset */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Peptide / Medication
            </label>
            <select
              value={presetKey}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            >
              {Object.entries(PRESETS).map(([key, p]) => (
                <option key={key} value={key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Vial size */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Vial size (mg)
            </label>
            <input
              type="number"
              min={0.1}
              step={0.1}
              value={vialMg}
              onChange={(e) => setVialMg(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            />
          </div>

          {/* BAC water */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Bacteriostatic water (mL)
            </label>
            <input
              type="number"
              min={0.1}
              step={0.1}
              value={waterMl}
              onChange={(e) => setWaterMl(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            />
          </div>

          {/* Dose + unit */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Dose per injection
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min={0.01}
                step={unit === "mcg" ? 1 : 0.01}
                value={dose}
                onChange={(e) => setDose(parseFloat(e.target.value) || 0)}
                className="flex-1 rounded-lg px-3 py-2.5 text-sm"
                style={{
                  border: `1px solid ${doseError ? C.danger : C.border}`,
                  backgroundColor: C.surface,
                  color: C.navy,
                  outline: "none",
                }}
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as "mcg" | "mg")}
                className="rounded-lg px-2 py-2.5 text-sm font-semibold"
                style={{
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.surface,
                  color: C.teal,
                  outline: "none",
                }}
              >
                <option value="mcg">mcg</option>
                <option value="mg">mg</option>
              </select>
            </div>
            {doseError && (
              <p className="text-xs mt-1" style={{ color: C.danger }}>
                {doseError}
              </p>
            )}
          </div>

          {/* Frequency */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Injection frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            >
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Start date */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              First injection date
            </label>
            <input
              type="date"
              value={startDateStr}
              onChange={(e) => setStartDateStr(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────────────────── */}
      {result && !doseError ? (
        <div className="p-6">
          <h3
            className="text-lg font-bold mb-5"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Your Vial Supply Plan
          </h3>

          {/* Key stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total doses",
                value: result.totalDoses % 1 === 0
                  ? result.totalDoses.toString()
                  : result.totalDoses.toFixed(1),
                sub: "per vial",
                color: C.teal,
              },
              {
                label: "Days supply",
                value: Math.round(result.daysSupply).toString(),
                sub: "days per vial",
                color: C.success,
              },
              {
                label: "Draw per dose",
                value: result.unitsPerDose < 1
                  ? result.unitsPerDose.toFixed(2)
                  : result.unitsPerDose.toFixed(1),
                sub: "units (U-100 syringe)",
                color: C.navy,
              },
              {
                label: "Concentration",
                value: result.concentrationMgMl.toFixed(2),
                sub: "mg/mL",
                color: C.navy,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-gray-500">
                  {stat.label}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                label: "First injection",
                value: formatDate(result.startDate),
                bg: C.teal,
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
                label: "Recommended reorder by",
                value: formatDate(result.refillDate),
                sub: "7 days before depletion — allows shipping time",
                bg: C.warning,
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                ),
                label: "Estimated vial depletion",
                value: formatDate(result.depletionDate),
                sub: `Last dose from this vial`,
                bg: C.danger,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.bg }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold" style={{ color: C.navy }}>
                    {item.value}
                  </p>
                  {item.sub && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Volume breakdown */}
          <div
            className="mt-5 rounded-xl p-4"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <p
              className="text-sm font-semibold mb-3"
              style={{ color: C.navy }}
            >
              Volume Breakdown
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                {
                  label: "Concentration",
                  value: `${result.concentrationMgMl.toFixed(2)} mg/mL`,
                },
                {
                  label: "Volume per dose",
                  value: `${result.volumePerDoseMl.toFixed(3)} mL`,
                },
                {
                  label: "Draw on syringe",
                  value: `${result.unitsPerDose.toFixed(1)} units`,
                },
                {
                  label: "Injections / week",
                  value: result.freqPerWeek % 1 === 0
                    ? `${result.freqPerWeek}×`
                    : `${result.freqPerWeek}×`,
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                  <p className="font-semibold" style={{ color: C.navy }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : !doseError ? (
        <div className="p-12 text-center">
          <p className="text-gray-400 text-sm">
            Fill in the fields above to see your supply plan.
          </p>
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm font-semibold" style={{ color: C.danger }}>
            Please correct the dose error above.
          </p>
        </div>
      )}
    </div>
  );
}

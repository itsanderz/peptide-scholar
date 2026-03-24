"use client";

import { useState, useMemo } from "react";
import type { proteinGuidelines as ProteinGuidelinesType } from "@/data/side-effect-timeline";

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
  text: "#1C2028",
  muted: "#5A6577",
} as const;

type AgeRange = "under65" | "65plus";
type ActivityLevel = "sedentary" | "moderate" | "active";
type WeightUnit = "lbs" | "kg";

interface Props {
  guidelines: typeof ProteinGuidelinesType;
}

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little/no exercise)",
  moderate: "Moderate (exercise 2-4x/week)",
  active: "Active (exercise 5+x/week)",
};

const AGE_LABELS: Record<AgeRange, string> = {
  under65: "Under 65",
  "65plus": "65 or older",
};

function calcProtein(
  weightKg: number,
  age: AgeRange,
  activity: ActivityLevel
): { factor: number; daily: number; perMeal3: number; perMeal3plus1: number } {
  let factor: number;
  // Joint advisory: 1.0–1.5 g/kg/day; older adults 1.2–1.5 g/kg/day
  if (age === "65plus") {
    // Minimum 1.2 for older adults regardless of activity
    factor = activity === "sedentary" ? 1.2 : activity === "moderate" ? 1.3 : 1.5;
  } else {
    factor = activity === "sedentary" ? 1.0 : activity === "moderate" ? 1.2 : 1.5;
  }

  const raw = weightKg * factor;
  // Clamp to absolute target range per guidelines (80-120g floor/ceiling for reference)
  const daily = Math.round(Math.max(80, Math.min(220, raw)));
  const perMeal3 = Math.round(daily / 3);
  const perMeal3plus1 = Math.round(daily / 4);
  return { factor, daily, perMeal3, perMeal3plus1 };
}

export default function ProteinCalculatorClient({ guidelines }: Props) {
  const [weightInput, setWeightInput] = useState<string>("");
  const [unit, setUnit] = useState<WeightUnit>("lbs");
  const [age, setAge] = useState<AgeRange>("under65");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");

  const weightKg = useMemo(() => {
    const n = parseFloat(weightInput);
    if (isNaN(n) || n <= 0) return null;
    return unit === "lbs" ? n / 2.2046 : n;
  }, [weightInput, unit]);

  const result = useMemo(() => {
    if (weightKg === null) return null;
    return calcProtein(weightKg, age, activity);
  }, [weightKg, age, activity]);

  const isValid = weightKg !== null && weightKg > 20 && weightKg < 400;

  return (
    <div>
      {/* ── Input Form ──────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
      >
        <h2
          className="text-xl font-bold mb-5"
          style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          Enter Your Details
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Weight */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: C.text }}>
              Body Weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="999"
                step="0.1"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder={unit === "lbs" ? "e.g. 180" : "e.g. 82"}
                className="flex-1 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{
                  border: `1.5px solid ${C.border}`,
                  color: C.text,
                  backgroundColor: C.bg,
                  // @ts-expect-error ring color custom
                  "--tw-ring-color": C.teal,
                }}
              />
              <div className="flex rounded-lg overflow-hidden" style={{ border: `1.5px solid ${C.border}` }}>
                {(["lbs", "kg"] as WeightUnit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className="px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: unit === u ? C.navy : C.bg,
                      color: unit === u ? "#FFFFFF" : C.muted,
                    }}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            {weightKg !== null && !isValid && (
              <p className="text-xs mt-1" style={{ color: C.accent }}>
                Please enter a weight between {unit === "lbs" ? "44–882 lbs" : "20–400 kg"}.
              </p>
            )}
          </div>

          {/* Age range */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: C.text }}>
              Age Range
            </label>
            <div className="flex gap-2">
              {(Object.entries(AGE_LABELS) as [AgeRange, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setAge(val)}
                  className="flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: age === val ? C.navy : C.bg,
                    border: `1.5px solid ${age === val ? C.navy : C.border}`,
                    color: age === val ? "#FFFFFF" : C.text,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity level */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-2" style={{ color: C.text }}>
              Activity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(ACTIVITY_LABELS) as [ActivityLevel, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setActivity(val)}
                  className="rounded-lg p-3 text-sm text-left transition-all"
                  style={{
                    backgroundColor: activity === val ? C.teal : C.bg,
                    border: `1.5px solid ${activity === val ? C.teal : C.border}`,
                    color: activity === val ? "#FFFFFF" : C.text,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      {isValid && result ? (
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
        >
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Your Protein Targets
          </h2>
          <p className="text-sm mb-5" style={{ color: C.muted }}>
            Based on {result.factor} g/kg/day — {guidelines.source}
          </p>

          {/* Main result card */}
          <div
            className="rounded-xl p-5 mb-5 text-center"
            style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.teal} 100%)` }}
          >
            <div className="text-5xl font-black text-white mb-1">{result.daily}g</div>
            <div className="text-white/80 text-sm">Daily protein target</div>
          </div>

          {/* Breakdown grid */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <div className="text-3xl font-black mb-1" style={{ color: C.accent }}>
                {result.perMeal3}g
              </div>
              <div className="text-xs" style={{ color: C.muted }}>per meal (3 meals)</div>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <div className="text-3xl font-black mb-1" style={{ color: C.teal }}>
                {result.perMeal3plus1}g
              </div>
              <div className="text-xs" style={{ color: C.muted }}>per meal + 1 snack (4 total)</div>
            </div>
          </div>

          {/* Guideline context */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#F0FDF4", border: `1px solid #BBF7D0` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "#166534" }}>
              <strong>Guideline range for your weight:</strong>{" "}
              {Math.round((weightKg ?? 0) * guidelines.recommendations.generalRange.min)}g–
              {Math.round((weightKg ?? 0) * guidelines.recommendations.generalRange.max)}g/day.
              {age === "65plus" && (
                <> Older adults are advised to target the higher end of this range to offset age-related muscle loss.</>
              )}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: C.bg, border: `1px dashed ${C.border}` }}
        >
          <p className="text-sm" style={{ color: C.muted }}>
            Enter your weight above to calculate your protein target.
          </p>
        </div>
      )}

      {/* ── Key Facts ───────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
      >
        <h2
          className="text-lg font-bold mb-4"
          style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          Why Protein Matters on GLP-1s
        </h2>
        <div className="space-y-3">
          {guidelines.keyFacts.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-xl p-4"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                style={{ backgroundColor: C.teal }}
              >
                {i + 1}
              </div>
              <div>
                <p className="text-sm leading-relaxed" style={{ color: C.text }}>
                  {item.fact}
                </p>
                <p className="text-xs mt-1" style={{ color: C.muted }}>
                  Source: {item.source}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: C.muted }}>
          Full guidelines:{" "}
          <a
            href={guidelines.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-700"
            style={{ color: C.teal }}
          >
            {guidelines.source}
          </a>
        </p>
      </div>
    </div>
  );
}

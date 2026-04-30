"use client";

import { useState } from "react";
import { peptideStacks } from "@/data/peptide-stacks";
import { getAllSymptoms } from "@/data/symptom-stacks";

const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  accent: "#D4553A",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  muted: "#5A6577",
} as const;

// Approximate monthly costs based on typical dosing (research purposes only)
const peptideCosts: Record<string, { low: number; high: number; unit: string }> = {
  "BPC-157": { low: 45, high: 90, unit: "month" },
  "TB-500": { low: 60, high: 120, unit: "month" },
  "GHK-Cu": { low: 30, high: 70, unit: "month" },
  "CJC-1295": { low: 50, high: 100, unit: "month" },
  "Ipamorelin": { low: 40, high: 80, unit: "month" },
  "GHRP-2": { low: 35, high: 75, unit: "month" },
  "Sermorelin": { low: 150, high: 300, unit: "month" },
  "Semax": { low: 40, high: 90, unit: "month" },
  "Selank": { low: 35, high: 80, unit: "month" },
  "Epithalon": { low: 60, high: 120, unit: "month" },
  "Thymalin": { low: 50, high: 100, unit: "month" },
  "Semaglutide": { low: 900, high: 1350, unit: "month" },
  "Tirzepatide": { low: 1000, high: 1500, unit: "month" },
  "Liraglutide": { low: 1200, high: 1500, unit: "month" },
  "Tesamorelin": { low: 800, high: 1200, unit: "month" },
  "Bremelanotide": { low: 600, high: 900, unit: "month" },
  "Gonadorelin": { low: 100, high: 250, unit: "month" },
  "Kisspeptin-10": { low: 150, high: 300, unit: "month" },
  "Cerebrolysin": { low: 300, high: 600, unit: "month" },
  "Collagen peptides": { low: 20, high: 50, unit: "month" },
  "AOD9604": { low: 80, high: 150, unit: "month" },
};

export default function StackCostCalculatorPage() {
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const symptoms = getAllSymptoms();

  const currentStack = selectedStack
    ? peptideStacks.find((s) => s.slug === selectedStack)
    : null;

  const currentSymptom = selectedSymptom
    ? symptoms.find((s) => s.symptomId === selectedSymptom)
    : null;

  const stack = selectedStack ? peptideStacks.find((s) => s.slug === selectedStack) : null;
  const symptom = selectedSymptom ? symptoms.find((s) => s.symptomId === selectedSymptom) : null;

  const items: { name: string; low: number; high: number }[] = [];
  let totalLow = 0;
  let totalHigh = 0;

  if (stack) {
    stack.peptides.forEach((p) => {
      const cost = peptideCosts[p.name] || peptideCosts[p.name.split(" ")[0]];
      if (cost) {
        items.push({ name: p.name, low: cost.low, high: cost.high });
        totalLow += cost.low;
        totalHigh += cost.high;
      }
    });
  } else if (symptom) {
    symptom.peptides.forEach((p) => {
      const cost = peptideCosts[p.name] || peptideCosts[p.name.split(" ")[0]];
      if (cost) {
        items.push({ name: p.name, low: cost.low, high: cost.high });
        totalLow += cost.low;
        totalHigh += cost.high;
      }
    });
  }

  const costBreakdown = { items, totalLow, totalHigh };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4" style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}>
          <span>Tool</span>
          <span style={{ color: C.teal }}>Beta</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Stack Cost Calculator
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Estimate monthly costs for peptide stacks based on typical dosing ranges. 
          Prices are approximate and vary by supplier, location, and insurance coverage. 
          FDA-approved medications may be partially covered; research peptides are typically out-of-pocket.
        </p>
      </div>

      {/* Source Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setSelectedStack(null); setSelectedSymptom(null); }}
          className="rounded-lg px-4 py-2 text-sm font-semibold border transition-colors"
          style={{
            backgroundColor: !selectedStack && !selectedSymptom ? C.teal : C.surface,
            color: !selectedStack && !selectedSymptom ? "#fff" : C.navy,
            borderColor: !selectedStack && !selectedSymptom ? C.teal : C.border,
          }}
        >
          Select a Stack
        </button>
        <button
          onClick={() => { setSelectedStack(null); setSelectedSymptom("weight-loss"); }}
          className="rounded-lg px-4 py-2 text-sm font-semibold border transition-colors"
          style={{
            backgroundColor: selectedSymptom ? C.teal : C.surface,
            color: selectedSymptom ? "#fff" : C.navy,
            borderColor: selectedSymptom ? C.teal : C.border,
          }}
        >
          By Symptom
        </button>
      </div>

      {/* Stack Selector */}
      {!selectedSymptom && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {peptideStacks.map((stack) => (
            <button
              key={stack.slug}
              onClick={() => { setSelectedStack(stack.slug); setSelectedSymptom(null); }}
              className="rounded-xl border p-4 text-left transition-all hover:shadow-md"
              style={{
                backgroundColor: selectedStack === stack.slug ? "#F0F9FF" : C.surface,
                borderColor: selectedStack === stack.slug ? C.teal : C.border,
              }}
            >
              <div className="text-sm font-bold mb-1" style={{ color: C.navy }}>{stack.name}</div>
              <div className="text-xs" style={{ color: C.muted }}>
                {stack.peptides.map((p) => p.name).join(" + ")}
              </div>
              {stack.type === "community" && (
                <span className="mt-2 inline-block rounded px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>
                  Community Stack
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Symptom Selector */}
      {selectedSymptom !== null && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {symptoms.map((s) => (
            <button
              key={s.symptomId}
              onClick={() => { setSelectedSymptom(s.symptomId); setSelectedStack(null); }}
              className="rounded-xl border p-4 text-left transition-all hover:shadow-md"
              style={{
                backgroundColor: selectedSymptom === s.symptomId ? "#F0F9FF" : C.surface,
                borderColor: selectedSymptom === s.symptomId ? C.teal : C.border,
              }}
            >
              <div className="text-sm font-bold mb-1" style={{ color: C.navy }}>{s.symptom}</div>
              <div className="text-xs" style={{ color: C.muted }}>
                {s.peptides.length} peptides mapped
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Cost Breakdown */}
      {(currentStack || currentSymptom) && costBreakdown.items.length > 0 && (
        <div className="rounded-xl border p-5 mb-8" style={{ backgroundColor: C.surface, borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: C.navy }}>
            Estimated Monthly Cost
            {currentStack && ` — ${currentStack.name}`}
            {currentSymptom && ` — ${currentSymptom.symptom}`}
          </h3>

          <div className="space-y-3 mb-6">
            {costBreakdown.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: C.bg }}>
                <span className="text-sm font-medium" style={{ color: C.navy }}>{item.name}</span>
                <span className="text-sm font-semibold" style={{ color: C.teal }}>
                  ${item.low}–${item.high}/mo
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold" style={{ color: C.navy }}>Total Estimated Monthly Cost</span>
              <span className="text-xl font-bold" style={{ color: C.success }}>
                ${costBreakdown.totalLow}–${costBreakdown.totalHigh}
              </span>
            </div>
          </div>

          {/* Annual projection */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.muted }}>3-Month Course</div>
              <div className="text-lg font-bold" style={{ color: C.navy }}>
                ${costBreakdown.totalLow * 3}–${costBreakdown.totalHigh * 3}
              </div>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.muted }}>6-Month Course</div>
              <div className="text-lg font-bold" style={{ color: C.navy }}>
                ${costBreakdown.totalLow * 6}–${costBreakdown.totalHigh * 6}
              </div>
            </div>
          </div>

          {/* Insurance note */}
          {costBreakdown.items.some((i) => ["Semaglutide", "Tirzepatide", "Liraglutide", "Tesamorelin", "Bremelanotide", "Gonadorelin"].some((name) => i.name.includes(name))) && (
            <div className="rounded-lg p-3 text-sm" style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD", color: "#075985" }}>
              <strong>Insurance may apply:</strong> Some FDA-approved peptides in this stack (e.g., semaglutide, tirzepatide, tesamorelin) may be partially covered by insurance depending on your indication and plan. Research peptides (BPC-157, TB-500, etc.) are not covered.
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}>
        <strong>Cost estimates are for research planning only.</strong> Actual prices vary by pharmacy, 
        compounding facility, insurance coverage, and geographic location. These estimates do not include 
        consultation fees, bloodwork, syringes, or shipping. Research peptide pricing is highly variable 
        and quality-dependent. Always verify current pricing with your provider or pharmacy.
      </div>
    </div>
  );
}

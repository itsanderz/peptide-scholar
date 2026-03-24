"use client";

import { useState } from "react";
import type { CostEntry } from "@/data/clinical-data";
import { trackCostLookup } from "@/lib/analytics";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  accent: "#D4553A",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function CostCard({
  title,
  subtitle,
  monthly,
  yearly,
  colorAccent,
  colorBg,
  colorBorder,
  lastVerified,
  note,
}: {
  title: string;
  subtitle?: string;
  monthly: number | string;
  yearly: number | string;
  colorAccent: string;
  colorBg: string;
  colorBorder: string;
  lastVerified: string;
  note?: string;
}) {
  const monthlyDisplay =
    typeof monthly === "number" ? formatCurrency(monthly) : monthly;
  const yearlyDisplay =
    typeof yearly === "number" ? formatCurrency(yearly) : yearly;

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ backgroundColor: colorBg, border: `1px solid ${colorBorder}` }}
    >
      {/* Card header */}
      <div
        className="px-5 py-3"
        style={{ backgroundColor: colorAccent }}
      >
        <p
          className="text-white font-bold text-sm"
          style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-white/80 text-xs mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Card body */}
      <div className="px-5 py-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Monthly */}
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Monthly cost</p>
            <p className="text-3xl font-bold" style={{ color: colorAccent }}>
              {monthlyDisplay}
            </p>
          </div>

          {/* Yearly */}
          <div
            className="pt-3"
            style={{ borderTop: `1px solid ${colorBorder}` }}
          >
            <p className="text-xs text-gray-500 mb-0.5">Annual cost</p>
            <p className="text-xl font-bold" style={{ color: C.navy }}>
              {yearlyDisplay}
            </p>
          </div>

          {/* Note */}
          {note && (
            <p className="text-xs text-gray-500 leading-relaxed italic">
              {note}
            </p>
          )}
        </div>

        {/* Last verified */}
        <p className="text-xs text-gray-400 mt-4">
          Last verified:{" "}
          {new Date(lastVerified + "T12:00:00").toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

interface Props {
  costs: CostEntry[];
}

export default function CostCalculatorClient({ costs }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string>(costs[0]?.slug ?? "");

  const entry = costs.find((c) => c.slug === selectedSlug) ?? null;

  return (
    <div
      className="rounded-2xl overflow-hidden mb-8"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface }}
    >
      {/* ── Medication selector ─────────────────────────────────────── */}
      <div
        className="p-6"
        style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.border}` }}
      >
        <label
          className="block text-sm font-semibold mb-1.5"
          style={{ color: C.navy }}
        >
          Select Medication
        </label>
        <select
          value={selectedSlug}
          onChange={(e) => {
            setSelectedSlug(e.target.value);
            const chosen = costs.find((c) => c.slug === e.target.value);
            if (chosen) trackCostLookup(chosen.brandName);
          }}
          className="w-full sm:w-auto rounded-lg px-3 py-2.5 text-sm"
          style={{
            border: `1px solid ${C.border}`,
            backgroundColor: C.surface,
            color: C.navy,
            outline: "none",
            minWidth: "280px",
          }}
        >
          {costs.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.brandName} ({c.genericName}) — {c.frequency}
            </option>
          ))}
        </select>

        {entry && (
          <p className="mt-3 text-xs text-gray-500">
            Source: {entry.source}
          </p>
        )}
      </div>

      {/* ── Cost cards ──────────────────────────────────────────────── */}
      {entry && (
        <div className="p-6">
          <div
            className={`grid gap-4 ${
              entry.compoundedLow != null
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {/* List Price */}
            <CostCard
              title="List Price"
              subtitle="Before any discounts"
              monthly={entry.listPriceMonthly}
              yearly={entry.listPriceMonthly * 12}
              colorAccent="#64748B"
              colorBg="#F8FAFC"
              colorBorder="#CBD5E1"
              lastVerified={entry.lastVerified}
              note="Almost nobody pays list price. Shown for reference."
            />

            {/* With Insurance */}
            <CostCard
              title="With Insurance"
              subtitle="Commercial insurance copay range"
              monthly={`${formatCurrency(entry.withInsuranceLow)}–${formatCurrency(entry.withInsuranceHigh)}`}
              yearly={`${formatCurrency(entry.withInsuranceLow * 12)}–${formatCurrency(entry.withInsuranceHigh * 12)}`}
              colorAccent={C.teal}
              colorBg="#F0F9FF"
              colorBorder="#BAE6FD"
              lastVerified={entry.lastVerified}
              note="Depends heavily on your specific insurance plan and formulary tier."
            />

            {/* Discount Program */}
            {entry.discountProgramPrice != null && entry.discountProgramName && (
              <CostCard
                title={entry.discountProgramName}
                subtitle="Discount program / savings card"
                monthly={entry.discountProgramPrice}
                yearly={entry.discountProgramPrice * 12}
                colorAccent={C.success}
                colorBg="#F0FDF4"
                colorBorder="#86EFAC"
                lastVerified={entry.lastVerified}
                note="Eligibility and terms vary. May not be available to patients with government insurance."
              />
            )}

            {/* No discount program placeholder */}
            {entry.discountProgramPrice == null && (
              <div
                className="rounded-xl p-5 flex items-center justify-center text-center"
                style={{
                  backgroundColor: "#F9FAFB",
                  border: `1px dashed ${C.border}`,
                }}
              >
                <p className="text-xs text-gray-400 leading-relaxed">
                  No manufacturer discount program currently verified for this medication.
                </p>
              </div>
            )}

            {/* Compounded */}
            {entry.compoundedLow != null && entry.compoundedHigh != null && (
              <CostCard
                title="Compounded"
                subtitle="Licensed compounding pharmacy"
                monthly={`${formatCurrency(entry.compoundedLow)}–${formatCurrency(entry.compoundedHigh)}`}
                yearly={`${formatCurrency(entry.compoundedLow * 12)}–${formatCurrency(entry.compoundedHigh * 12)}`}
                colorAccent={C.accent}
                colorBg="#FFF7F5"
                colorBorder="#FECDB9"
                lastVerified={entry.lastVerified}
                note="Compounded versions are not FDA-approved. Availability and pricing vary by pharmacy."
              />
            )}
          </div>

          {/* Summary bar — savings vs list price */}
          {entry.discountProgramPrice != null && (
            <div
              className="mt-6 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              style={{ backgroundColor: "#F0FDF4", border: "1px solid #86EFAC" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.success}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <p className="text-sm text-green-800">
                <strong>Potential savings:</strong> The discount program price (
                {formatCurrency(entry.discountProgramPrice)}/mo) saves{" "}
                <strong>
                  {formatCurrency(entry.listPriceMonthly - entry.discountProgramPrice)}/month
                </strong>{" "}
                vs list price — up to{" "}
                <strong>
                  {formatCurrency((entry.listPriceMonthly - entry.discountProgramPrice) * 12)}/year
                </strong>.
              </p>
            </div>
          )}

          {/* Price change disclaimer */}
          <div
            className="mt-4 rounded-xl p-4 flex gap-3"
            style={{
              backgroundColor: "#FFFBEB",
              border: "1px solid #FCD34D",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D97706"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-xs text-amber-800 leading-relaxed">
              Prices change frequently. Always verify current pricing with your pharmacy,
              insurance plan, or the manufacturer&apos;s website before making financial
              decisions. Data last verified: {entry.lastVerified}.
            </p>
          </div>
        </div>
      )}

      {!entry && (
        <div className="p-12 text-center">
          <p className="text-gray-400 text-sm">Select a medication to view cost data.</p>
        </div>
      )}
    </div>
  );
}

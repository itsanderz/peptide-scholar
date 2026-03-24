"use client";

import { useState, useCallback } from "react";
import type { TitrationSchedule } from "@/data/clinical-data";
import { trackTitrationPlan } from "@/lib/analytics";

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

/* Dose-level colors — scale from light to intense as dose increases */
const STEP_COLORS = [
  { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF" }, // step 1 — lightest blue
  { bg: "#F0FDF4", border: "#BBF7D0", text: "#166534" }, // step 2
  { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E" }, // step 3
  { bg: "#FEF3C7", border: "#FCD34D", text: "#B45309" }, // step 4
  { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B" }, // step 5 (max)
  { bg: "#FDF4FF", border: "#E9D5FF", text: "#6B21A8" }, // step 6+ (overflow)
];

interface ScheduleRow {
  stepIndex: number;
  doseMg: number;
  frequency: string;
  isMaintenanceDose: boolean;
  startDate: Date;
  endDate: Date | null; // null = ongoing
  durationWeeks: number;
  weekLabel: string;
}

function buildSchedule(
  schedule: TitrationSchedule,
  startDate: Date
): ScheduleRow[] {
  const rows: ScheduleRow[] = [];

  for (let i = 0; i < schedule.steps.length; i++) {
    const step = schedule.steps[i];
    const prevWeeksOffset = schedule.steps
      .slice(0, i)
      .reduce((sum, s) => sum + (s.durationWeeks || 0), 0);

    const rowStart = new Date(startDate);
    rowStart.setDate(rowStart.getDate() + prevWeeksOffset * 7);

    // Determine end date
    let endDate: Date | null = null;
    if (step.durationWeeks > 0) {
      endDate = new Date(rowStart);
      endDate.setDate(endDate.getDate() + step.durationWeeks * 7 - 1);
    }

    // Week label
    const weekStart = prevWeeksOffset + 1;
    const weekEnd =
      step.durationWeeks > 0
        ? prevWeeksOffset + step.durationWeeks
        : prevWeeksOffset + 1;
    const weekLabel =
      step.durationWeeks === 0
        ? `Week ${weekStart}+`
        : weekStart === weekEnd
        ? `Week ${weekStart}`
        : `Weeks ${weekStart}–${weekEnd}`;

    rows.push({
      stepIndex: i,
      doseMg: step.doseMg,
      frequency: step.frequency,
      isMaintenanceDose: step.isMaintenanceDose,
      startDate: rowStart,
      endDate,
      durationWeeks: step.durationWeeks,
      weekLabel,
    });
  }

  return rows;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toInputDateValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

interface Props {
  schedules: TitrationSchedule[];
}

export default function TitrationPlannerClient({ schedules }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string>(schedules[0]?.slug ?? "");
  const [startDateStr, setStartDateStr] = useState<string>(
    toInputDateValue(new Date())
  );

  const selectedSchedule = schedules.find((s) => s.slug === selectedSlug) ?? null;

  const startDate = startDateStr ? new Date(startDateStr + "T12:00:00") : new Date();

  const rows = selectedSchedule ? buildSchedule(selectedSchedule, startDate) : [];

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden mb-8"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface }}
    >
      {/* ── Controls ─────────────────────────────────────────────────── */}
      <div
        className="p-6"
        style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.border}` }}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Medication select */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Medication
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => {
                setSelectedSlug(e.target.value);
                const chosen = schedules.find((s) => s.slug === e.target.value);
                if (chosen) trackTitrationPlan(chosen.brandName);
              }}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            >
              {schedules.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.brandName} ({s.genericName}) — {s.indication}
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
              First Injection Date
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

        {/* Medication info row */}
        {selectedSchedule && (
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "Route", value: selectedSchedule.route },
              { label: "Max Dose", value: `${selectedSchedule.maxDoseMg}mg` },
              { label: "Indication", value: selectedSchedule.indication },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                style={{
                  backgroundColor: "#EFF6FF",
                  color: C.navy,
                  border: "1px solid #BFDBFE",
                }}
              >
                <span className="font-semibold">{item.label}:</span> {item.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      {selectedSchedule && rows.length > 0 && (
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-lg font-bold"
              style={{
                color: C.navy,
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
              }}
            >
              Your Titration Schedule
            </h2>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold print:hidden"
              style={{
                backgroundColor: C.navy,
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print Schedule
            </button>
          </div>

          {/* Timeline rows */}
          <div className="space-y-3">
            {rows.map((row, idx) => {
              const colorSet = STEP_COLORS[Math.min(idx, STEP_COLORS.length - 1)];
              return (
                <div
                  key={row.stepIndex}
                  className="rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                  style={{
                    backgroundColor: colorSet.bg,
                    border: `1px solid ${colorSet.border}`,
                  }}
                >
                  {/* Step indicator */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: colorSet.border, color: colorSet.text }}
                  >
                    {idx + 1}
                  </div>

                  {/* Dose info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <span
                        className="text-xl font-bold"
                        style={{ color: colorSet.text }}
                      >
                        {row.doseMg}mg
                      </span>
                      <span className="text-sm text-gray-500">{row.frequency}</span>
                      {row.isMaintenanceDose && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: C.success,
                            color: "#fff",
                          }}
                        >
                          Maintenance Dose
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium" style={{ color: colorSet.text }}>
                      {row.weekLabel}
                    </p>
                  </div>

                  {/* Date range */}
                  <div className="text-right sm:text-right flex-shrink-0">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: C.navy }}
                    >
                      {formatDate(row.startDate)}
                    </p>
                    {row.endDate ? (
                      <p className="text-xs text-gray-500">
                        through {formatDate(row.endDate)}
                      </p>
                    ) : (
                      <p className="text-xs" style={{ color: C.success }}>
                        Ongoing maintenance
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notes */}
          {selectedSchedule.notes && (
            <div
              className="mt-5 rounded-xl p-4 flex gap-3"
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
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Note:</strong> {selectedSchedule.notes}
              </p>
            </div>
          )}

          {/* Source citation */}
          <p className="mt-4 text-xs text-gray-400">
            Schedule based on:{" "}
            <a
              href={selectedSchedule.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
              style={{ color: C.teal }}
            >
              {selectedSchedule.source}
            </a>
          </p>
        </div>
      )}

      {!selectedSchedule && (
        <div className="p-12 text-center">
          <p className="text-gray-400 text-sm">Select a medication to view your schedule.</p>
        </div>
      )}
    </div>
  );
}

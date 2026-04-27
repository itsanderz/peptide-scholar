"use client";

import { useState, useMemo, useCallback } from "react";
import { trackCyclePlanner } from "@/lib/analytics";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ── Data ──────────────────────────────────────────────────────────────── */
interface CompoundPreset {
  key: string;
  label: string;
  defaultFreq: string;
  defaultOnWeeks: number;
  defaultOffWeeks: string;
}

const COMPOUNDS: CompoundPreset[] = [
  { key: "bpc-157", label: "BPC-157", defaultFreq: "daily", defaultOnWeeks: 8, defaultOffWeeks: "4" },
  { key: "tb-500", label: "TB-500 (Thymosin Beta-4)", defaultFreq: "twice-weekly", defaultOnWeeks: 4, defaultOffWeeks: "4" },
  { key: "ipamorelin", label: "Ipamorelin", defaultFreq: "daily", defaultOnWeeks: 12, defaultOffWeeks: "4" },
  { key: "cjc-1295-dac", label: "CJC-1295 w/DAC", defaultFreq: "twice-weekly", defaultOnWeeks: 16, defaultOffWeeks: "8" },
  { key: "semaglutide", label: "Semaglutide", defaultFreq: "weekly", defaultOnWeeks: 12, defaultOffWeeks: "0" },
  { key: "tirzepatide", label: "Tirzepatide", defaultFreq: "weekly", defaultOnWeeks: 12, defaultOffWeeks: "0" },
  { key: "ghk-cu", label: "GHK-Cu", defaultFreq: "daily", defaultOnWeeks: 4, defaultOffWeeks: "equal" },
  { key: "aod-9604", label: "AOD-9604", defaultFreq: "daily", defaultOnWeeks: 12, defaultOffWeeks: "4" },
  { key: "custom", label: "Custom / Other", defaultFreq: "daily", defaultOnWeeks: 8, defaultOffWeeks: "4" },
];

interface FreqOption {
  value: string;
  label: string;
  injectsPerWeek: number;
  days: number[] | null;
  isEOD: boolean;
  isDaily: boolean;
  timesPerActiveDay: number;
}

const FREQUENCIES: FreqOption[] = [
  { value: "twice-daily", label: "Twice daily", injectsPerWeek: 14, days: null, isEOD: false, isDaily: true, timesPerActiveDay: 2 },
  { value: "daily", label: "Once daily", injectsPerWeek: 7, days: null, isEOD: false, isDaily: true, timesPerActiveDay: 1 },
  { value: "eod", label: "Every other day", injectsPerWeek: 3.5, days: null, isEOD: true, isDaily: false, timesPerActiveDay: 1 },
  { value: "3x-week", label: "3× per week (Mon/Wed/Fri)", injectsPerWeek: 3, days: [0, 2, 4], isEOD: false, isDaily: false, timesPerActiveDay: 1 },
  { value: "twice-weekly", label: "Twice weekly (Mon/Thu)", injectsPerWeek: 2, days: [0, 3], isEOD: false, isDaily: false, timesPerActiveDay: 1 },
  { value: "weekly", label: "Once weekly (Monday)", injectsPerWeek: 1, days: [0], isEOD: false, isDaily: false, timesPerActiveDay: 1 },
];

const CYCLE_ON_OPTIONS = [4, 6, 8, 10, 12, 16, 20, 24];

const CYCLE_OFF_OPTIONS = [
  { value: "0", label: "None — continuous" },
  { value: "2", label: "2 weeks off" },
  { value: "4", label: "4 weeks off" },
  { value: "6", label: "6 weeks off" },
  { value: "8", label: "8 weeks off" },
  { value: "equal", label: "Equal to on-cycle" },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */
function toInputDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + Math.round(n));
  return r;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getDayCount(weekIdx: number, dayOfWeek: number, freq: FreqOption, onWeeks: number): number {
  if (weekIdx >= onWeeks) return 0;
  const absoluteDay = weekIdx * 7 + dayOfWeek;
  if (freq.isDaily) return freq.timesPerActiveDay;
  if (freq.isEOD) return absoluteDay % 2 === 0 ? 1 : 0;
  if (freq.days) return freq.days.includes(dayOfWeek) ? freq.timesPerActiveDay : 0;
  return 0;
}

function getWeekInjections(weekIdx: number, freq: FreqOption, onWeeks: number): number {
  if (weekIdx >= onWeeks) return 0;
  let count = 0;
  for (let d = 0; d < 7; d++) count += getDayCount(weekIdx, d, freq, onWeeks);
  return count;
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function CyclePlannerClient() {
  const [compoundKey, setCompoundKey] = useState("bpc-157");
  const [frequency, setFrequency] = useState("daily");
  const [onWeeks, setOnWeeks] = useState(8);
  const [offWeeksValue, setOffWeeksValue] = useState("4");
  const [startDateStr, setStartDateStr] = useState(toInputDate(new Date()));
  const [hasTracked, setHasTracked] = useState(false);

  const freqOption = FREQUENCIES.find((f) => f.value === frequency)!;
  const offWeeks = offWeeksValue === "equal" ? onWeeks : parseInt(offWeeksValue, 10);
  const totalWeeks = onWeeks + offWeeks;
  const displayWeeks = Math.min(totalWeeks, 24);

  const handleCompoundChange = useCallback((key: string) => {
    const preset = COMPOUNDS.find((c) => c.key === key)!;
    setCompoundKey(key);
    setFrequency(preset.defaultFreq);
    setOnWeeks(preset.defaultOnWeeks);
    setOffWeeksValue(preset.defaultOffWeeks);
    setHasTracked(false);
  }, []);

  const startDate = useMemo(() => {
    return startDateStr ? new Date(startDateStr + "T12:00:00") : new Date();
  }, [startDateStr]);

  const stats = useMemo(() => {
    const totalInjections = onWeeks * freqOption.injectsPerWeek;
    const cycleEndDate = addDays(startDate, onWeeks * 7);
    const nextCycleStart = offWeeks > 0 ? addDays(cycleEndDate, offWeeks * 7) : null;
    return { totalInjections, cycleEndDate, nextCycleStart };
  }, [onWeeks, offWeeks, freqOption, startDate]);

  const calendarRows = useMemo(() => {
    return Array.from({ length: displayWeeks }, (_, w) => {
      const weekStart = addDays(startDate, w * 7);
      const isOnCycle = w < onWeeks;
      const days = Array.from({ length: 7 }, (_, d) => ({
        count: getDayCount(w, d, freqOption, onWeeks),
      }));
      const weekInjects = getWeekInjections(w, freqOption, onWeeks);
      return { weekIndex: w, weekStart, isOnCycle, days, weekInjects };
    });
  }, [displayWeeks, startDate, onWeeks, freqOption]);

  const handleTrack = useCallback(() => {
    if (!hasTracked) {
      const compound = COMPOUNDS.find((c) => c.key === compoundKey)!;
      trackCyclePlanner(compound.label, onWeeks, frequency);
      setHasTracked(true);
    }
  }, [hasTracked, compoundKey, onWeeks, frequency]);

  return (
    <div
      className="rounded-2xl overflow-hidden mb-8"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface }}
    >
      {/* ── Controls ───────────────────────────────────────────────────── */}
      <div
        className="p-6"
        style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.border}` }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Compound */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: C.navy }}>
              Compound / Medication
            </label>
            <select
              value={compoundKey}
              onChange={(e) => handleCompoundChange(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface, color: C.navy, outline: "none" }}
            >
              {COMPOUNDS.map((c) => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: C.navy }}>
              Injection frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => { setFrequency(e.target.value); setHasTracked(false); }}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface, color: C.navy, outline: "none" }}
            >
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* Start date */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: C.navy }}>
              Cycle start date
            </label>
            <input
              type="date"
              value={startDateStr}
              onChange={(e) => { setStartDateStr(e.target.value); setHasTracked(false); }}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface, color: C.navy, outline: "none" }}
            />
          </div>

          {/* On weeks */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: C.navy }}>
              On-cycle duration
            </label>
            <select
              value={onWeeks}
              onChange={(e) => { setOnWeeks(parseInt(e.target.value)); setHasTracked(false); }}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface, color: C.navy, outline: "none" }}
            >
              {CYCLE_ON_OPTIONS.map((w) => (
                <option key={w} value={w}>{w} weeks</option>
              ))}
            </select>
          </div>

          {/* Off weeks */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: C.navy }}>
              Off-cycle break
            </label>
            <select
              value={offWeeksValue}
              onChange={(e) => { setOffWeeksValue(e.target.value); setHasTracked(false); }}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface, color: C.navy, outline: "none" }}
            >
              {CYCLE_OFF_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Summary stats ──────────────────────────────────────────────── */}
      <div className="px-6 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Total injections",
              value: stats.totalInjections % 1 === 0
                ? stats.totalInjections.toString()
                : `~${Math.round(stats.totalInjections)}`,
              sub: `over ${onWeeks} weeks`,
            },
            {
              label: "On-cycle ends",
              value: formatDate(stats.cycleEndDate),
              sub: `week ${onWeeks} complete`,
            },
            {
              label: "Off-cycle ends",
              value: offWeeks > 0 && stats.nextCycleStart
                ? formatDate(stats.nextCycleStart)
                : "—",
              sub: offWeeks > 0 ? `${offWeeks} wk break` : "Continuous protocol",
            },
            {
              label: "Next cycle",
              value: stats.nextCycleStart ? formatDate(stats.nextCycleStart) : "Continuous",
              sub: stats.nextCycleStart ? "if repeating cycle" : "—",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 text-center"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-gray-500">{s.label}</p>
              <p className="text-base font-bold leading-tight" style={{ color: C.navy }}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Calendar ───────────────────────────────────────────────────── */}
      <div className="p-6" onClick={handleTrack}>
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-lg font-bold"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Injection Schedule
          </h3>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded flex-shrink-0 inline-block" style={{ backgroundColor: C.teal }} />
              Injection
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded flex-shrink-0 inline-block bg-gray-200" />
              Off-cycle
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ minWidth: "520px" }}>
            <thead>
              <tr>
                <th
                  className="text-left py-2 pr-3 font-semibold"
                  style={{ color: C.navy, width: "90px" }}
                >
                  Week
                </th>
                {DAY_LABELS.map((d) => (
                  <th
                    key={d}
                    className="text-center py-2 font-semibold"
                    style={{ color: C.navy, width: "44px" }}
                  >
                    {d}
                  </th>
                ))}
                <th className="text-right py-2 pl-3 font-semibold" style={{ color: C.navy }}>
                  Inj.
                </th>
              </tr>
            </thead>
            <tbody>
              {calendarRows.map((row) => (
                <tr key={row.weekIndex} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td className="py-1.5 pr-3">
                    <div
                      className="font-semibold leading-tight"
                      style={{ color: row.isOnCycle ? C.navy : "#9CA3AF" }}
                    >
                      Wk {row.weekIndex + 1}
                    </div>
                    <div className="text-gray-400" style={{ fontSize: "10px" }}>
                      {row.weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </td>
                  {row.days.map((day, d) => (
                    <td key={d} className="text-center py-1.5">
                      {row.isOnCycle && day.count > 0 ? (
                        <span
                          className="inline-flex items-center justify-center rounded w-7 h-7 font-bold"
                          style={{ backgroundColor: C.teal, color: "#FFFFFF", fontSize: "11px" }}
                        >
                          {day.count > 1 ? `${day.count}×` : "●"}
                        </span>
                      ) : row.isOnCycle ? (
                        <span className="inline-block w-7 h-7" />
                      ) : (
                        <span
                          className="inline-flex items-center justify-center rounded w-7 h-7 text-gray-300"
                          style={{ backgroundColor: "#F3F4F6" }}
                        >
                          —
                        </span>
                      )}
                    </td>
                  ))}
                  <td
                    className="text-right py-1.5 pl-3 font-bold"
                    style={{ color: row.weekInjects > 0 ? C.teal : "#D1D5DB" }}
                  >
                    {row.weekInjects > 0 ? row.weekInjects : row.isOnCycle ? "0" : "—"}
                  </td>
                </tr>
              ))}
              {totalWeeks > 24 && (
                <tr style={{ borderTop: `1px solid ${C.border}` }}>
                  <td colSpan={9} className="py-3 text-center text-xs text-gray-400">
                    Showing first 24 weeks. Your full cycle continues to week {totalWeeks}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

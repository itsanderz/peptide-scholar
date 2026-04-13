"use client";

import { useState, useMemo, useCallback } from "react";
import { trackHalfLifeCalc } from "@/lib/analytics";

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

/* ── Data ──────────────────────────────────────────────────────────────── */
interface Medication {
  slug: string;
  name: string;
  halfLifeHours: number;
  dosingIntervalHours: number;
  source: string;
  sourceUrl: string;
}

const MEDICATIONS: Medication[] = [
  {
    slug: "semaglutide",
    name: "Semaglutide (Wegovy / Ozempic)",
    halfLifeHours: 168,
    dosingIntervalHours: 168,
    source: "FDA Wegovy Prescribing Information §12.3",
    sourceUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide (Zepbound / Mounjaro)",
    halfLifeHours: 116,
    dosingIntervalHours: 168,
    source: "FDA Zepbound Prescribing Information §12.3",
    sourceUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s031lbl.pdf",
  },
  {
    slug: "liraglutide",
    name: "Liraglutide (Saxenda / Victoza)",
    halfLifeHours: 13,
    dosingIntervalHours: 24,
    source: "FDA Saxenda Prescribing Information §12.3",
    sourceUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206321s020lbl.pdf",
  },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */
function calcConcentrationPct(tHours: number, halfLifeHours: number): number {
  return 100 * Math.pow(2, -tHours / halfLifeHours);
}

function getZone(pct: number): { label: string; color: string } {
  if (pct > 75) return { label: "Peak range — most active", color: C.success };
  if (pct > 50) return { label: "High range — active", color: C.success };
  if (pct > 25) return { label: "Declining — next dose approaching", color: C.warning };
  if (pct > 10) return { label: "Low range — due for next dose soon", color: C.warning };
  return { label: "Near washout — minimal activity expected", color: C.danger };
}

/* ── Chart dimensions ──────────────────────────────────────────────────── */
const VW = 560;
const VH = 185;
const PAD = { left: 52, right: 16, top: 16, bottom: 44 };
const CW = VW - PAD.left - PAD.right;
const CH = VH - PAD.top - PAD.bottom;

/* ── Component ─────────────────────────────────────────────────────────── */
export default function HalfLifeClient() {
  const [selectedSlug, setSelectedSlug] = useState("semaglutide");
  const [daysSince, setDaysSince] = useState(3);
  const [hasTracked, setHasTracked] = useState(false);

  const med = MEDICATIONS.find((m) => m.slug === selectedSlug)!;

  /* Extract stable primitives for memoization */
  const halfLifeHours = med.halfLifeHours;
  const medName = med.name;

  /* Chart shows 3 half-lives; slider goes to 4 half-lives */
  const maxDaysChart = Math.ceil((3 * halfLifeHours) / 24);
  const maxDaysSlider = Math.ceil((4 * halfLifeHours) / 24);
  const clampedDays = Math.min(daysSince, maxDaysChart);

  const concentrationNow = calcConcentrationPct(daysSince * 24, halfLifeHours);
  const zone = getZone(concentrationNow);

  /* SVG curve path (static for given medication) */
  const { pathD, areaD } = useMemo(() => {
    const STEPS = 160;
    const pts: string[] = [];
    for (let i = 0; i <= STEPS; i++) {
      const tHours = (i / STEPS) * maxDaysChart * 24;
      const c = calcConcentrationPct(tHours, halfLifeHours);
      const x = PAD.left + (tHours / (maxDaysChart * 24)) * CW;
      const y = PAD.top + (1 - c / 100) * CH;
      pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const curve = pts.join(" ");
    const lastX = PAD.left + CW;
    const bottomY = PAD.top + CH;
    return {
      pathD: curve,
      areaD: `${curve} L${lastX},${bottomY} L${PAD.left},${bottomY} Z`,
    };
  }, [halfLifeHours, maxDaysChart]);

  /* Marker position */
  const markerX = PAD.left + (clampedDays / maxDaysChart) * CW;
  const markerY =
    PAD.top + (1 - Math.max(0, Math.min(100, concentrationNow)) / 100) * CH;

  /* Y-axis grid */
  const yGridLines = [100, 75, 50, 25, 10];

  /* X-axis ticks: one per half-life */
  const halfLifeDays = halfLifeHours / 24;
  const numTicks = Math.floor(maxDaysChart / halfLifeDays);
  const xTicks = Array.from({ length: numTicks + 1 }, (_, i) => i);

  const handleMedChange = useCallback(
    (slug: string) => {
      setSelectedSlug(slug);
      setHasTracked(false);
      const next = MEDICATIONS.find((m) => m.slug === slug)!;
      setDaysSince(Math.round(next.halfLifeHours / 24 / 2));
    },
    []
  );

  const handleDaysChange = useCallback(
    (val: number) => {
      setDaysSince(val);
      if (!hasTracked) {
        trackHalfLifeCalc(medName, val);
        setHasTracked(true);
      }
    },
    [hasTracked, medName]
  );

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
        <div className="grid sm:grid-cols-2 gap-5">
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
              onChange={(e) => handleMedChange(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            >
              {MEDICATIONS.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1.5">
              t½ ={" "}
              {med.halfLifeHours >= 24
                ? `${(med.halfLifeHours / 24).toFixed(0)} days`
                : `${med.halfLifeHours} hours`}{" "}
              &mdash; dosing every{" "}
              {med.dosingIntervalHours >= 24
                ? `${med.dosingIntervalHours / 24} days`
                : `${med.dosingIntervalHours}h`}
            </p>
          </div>

          {/* Days slider */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Days since last injection:{" "}
              <span style={{ color: C.teal }}>{daysSince}</span>
            </label>
            <input
              type="range"
              min={0}
              max={maxDaysSlider}
              value={daysSince}
              onChange={(e) => handleDaysChange(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: C.teal }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Day 0</span>
              <span>Day {Math.ceil(maxDaysSlider / 2)}</span>
              <span>Day {maxDaysSlider}</span>
            </div>
          </div>
        </div>

        {/* Concentration readout */}
        <div
          className="mt-5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
        >
          <div className="flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: C.navy }}
            >
              Estimated Serum Level — Day {daysSince}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold" style={{ color: zone.color }}>
                {concentrationNow < 0.5 ? "<1" : concentrationNow.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500">of peak dose</span>
            </div>
          </div>
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              backgroundColor: zone.color + "18",
              color: zone.color,
              border: `1px solid ${zone.color}40`,
            }}
          >
            {zone.label}
          </span>
        </div>
      </div>

      {/* ── Chart ──────────────────────────────────────────────────────── */}
      <div className="p-6">
        <h3
          className="text-lg font-bold mb-4"
          style={{
            color: C.navy,
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Concentration Decay Curve
        </h3>

        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="w-full"
          style={{ maxHeight: "240px" }}
          aria-label="Drug concentration decay curve over time"
          role="img"
        >
          {/* Background zone fills */}
          <rect
            x={PAD.left}
            y={PAD.top}
            width={CW}
            height={CH * 0.5}
            fill="#F0FDF4"
            opacity={0.55}
          />
          <rect
            x={PAD.left}
            y={PAD.top + CH * 0.5}
            width={CW}
            height={CH * 0.4}
            fill="#FFFBEB"
            opacity={0.65}
          />
          <rect
            x={PAD.left}
            y={PAD.top + CH * 0.9}
            width={CW}
            height={CH * 0.1}
            fill="#FEF2F2"
            opacity={0.75}
          />

          {/* Y-axis grid lines */}
          {yGridLines.map((pct) => {
            const y = PAD.top + (1 - pct / 100) * CH;
            return (
              <g key={pct}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2={PAD.left + CW}
                  y2={y}
                  stroke={C.border}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={PAD.left - 6}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94A3B8"
                >
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* X-axis ticks — one per half-life */}
          {xTicks.map((i) => {
            const tHours = i * med.halfLifeHours;
            const days = tHours / 24;
            if (days > maxDaysChart + 0.5) return null;
            const x = PAD.left + (tHours / (maxDaysChart * 24)) * CW;
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={PAD.top}
                  x2={x}
                  y2={PAD.top + CH}
                  stroke={C.border}
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                />
                <text
                  x={x}
                  y={PAD.top + CH + 14}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#94A3B8"
                >
                  Day {Math.round(days)}
                </text>
                {i > 0 && (
                  <text
                    x={x}
                    y={PAD.top + CH + 27}
                    textAnchor="middle"
                    fontSize="9"
                    fill={C.teal}
                  >
                    t½×{i}
                  </text>
                )}
              </g>
            );
          })}

          {/* Area fill under curve */}
          <path d={areaD} fill={C.teal} opacity={0.07} />

          {/* Decay curve */}
          <path
            d={pathD}
            fill="none"
            stroke={C.teal}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current position marker */}
          {clampedDays <= maxDaysChart && (
            <g>
              <line
                x1={markerX}
                y1={PAD.top}
                x2={markerX}
                y2={PAD.top + CH}
                stroke={zone.color}
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <circle cx={markerX} cy={markerY} r={5} fill={zone.color} />
              <circle
                cx={markerX}
                cy={markerY}
                r={9}
                fill="none"
                stroke={zone.color}
                strokeWidth="1.5"
                opacity={0.35}
              />
            </g>
          )}

          {/* Axes */}
          <line
            x1={PAD.left}
            y1={PAD.top}
            x2={PAD.left}
            y2={PAD.top + CH}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <line
            x1={PAD.left}
            y1={PAD.top + CH}
            x2={PAD.left + CW}
            y2={PAD.top + CH}
            stroke={C.border}
            strokeWidth="1.5"
          />
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-3">
          {[
            { color: C.success, label: ">50% — Active range" },
            { color: C.warning, label: "10–50% — Declining" },
            { color: C.danger, label: "<10% — Near washout" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-xs text-gray-500"
            >
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.color, opacity: 0.7 }}
              />
              {item.label}
            </div>
          ))}
        </div>

        {/* Source citation */}
        <p className="mt-3 text-xs text-gray-400">
          Half-life data source:{" "}
          <a
            href={med.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
            style={{ color: C.teal }}
          >
            {med.source}
          </a>
        </p>
      </div>
    </div>
  );
}

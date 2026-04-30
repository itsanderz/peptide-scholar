"use client";

import { useMemo, useState } from "react";

/* ── Amino Acid Data ───────────────────────────────────────────────────── */
interface AminoAcid {
  code: string;
  name: string;
  mw: number; // g/mol
  pKa1: number;
  pKa2: number;
  pKR?: number;
  charge: number; // at pH 7
  hydropathy: number; // Kyte-Doolittle scale
}

const AMINO_ACIDS: Record<string, AminoAcid> = {
  A: { code: "A", name: "Alanine", mw: 89.09, pKa1: 2.34, pKa2: 9.69, charge: 0, hydropathy: 1.8 },
  R: { code: "R", name: "Arginine", mw: 174.2, pKa1: 2.17, pKa2: 9.04, pKR: 12.48, charge: 1, hydropathy: -4.5 },
  N: { code: "N", name: "Asparagine", mw: 132.12, pKa1: 2.02, pKa2: 8.8, charge: 0, hydropathy: -3.5 },
  D: { code: "D", name: "Aspartic Acid", mw: 133.1, pKa1: 1.88, pKa2: 9.6, pKR: 3.65, charge: -1, hydropathy: -3.5 },
  C: { code: "C", name: "Cysteine", mw: 121.16, pKa1: 1.96, pKa2: 10.28, pKR: 8.18, charge: 0, hydropathy: 2.5 },
  E: { code: "E", name: "Glutamic Acid", mw: 147.13, pKa1: 2.19, pKa2: 9.67, pKR: 4.25, charge: -1, hydropathy: -3.5 },
  Q: { code: "Q", name: "Glutamine", mw: 146.15, pKa1: 2.17, pKa2: 9.13, charge: 0, hydropathy: -3.5 },
  G: { code: "G", name: "Glycine", mw: 75.07, pKa1: 2.34, pKa2: 9.6, charge: 0, hydropathy: -0.4 },
  H: { code: "H", name: "Histidine", mw: 155.16, pKa1: 1.82, pKa2: 9.17, pKR: 6.0, charge: 0.5, hydropathy: -3.2 },
  I: { code: "I", name: "Isoleucine", mw: 131.17, pKa1: 2.36, pKa2: 9.6, charge: 0, hydropathy: 4.5 },
  L: { code: "L", name: "Leucine", mw: 131.17, pKa1: 2.36, pKa2: 9.6, charge: 0, hydropathy: 3.8 },
  K: { code: "K", name: "Lysine", mw: 146.19, pKa1: 2.18, pKa2: 8.95, pKR: 10.53, charge: 1, hydropathy: -3.9 },
  M: { code: "M", name: "Methionine", mw: 149.21, pKa1: 2.28, pKa2: 9.21, charge: 0, hydropathy: 1.9 },
  F: { code: "F", name: "Phenylalanine", mw: 165.19, pKa1: 1.83, pKa2: 9.13, charge: 0, hydropathy: 2.8 },
  P: { code: "P", name: "Proline", mw: 115.13, pKa1: 1.99, pKa2: 10.6, charge: 0, hydropathy: -1.6 },
  S: { code: "S", name: "Serine", mw: 105.09, pKa1: 2.21, pKa2: 9.15, charge: 0, hydropathy: -0.8 },
  T: { code: "T", name: "Threonine", mw: 119.12, pKa1: 2.09, pKa2: 9.1, charge: 0, hydropathy: -0.7 },
  W: { code: "W", name: "Tryptophan", mw: 204.23, pKa1: 2.83, pKa2: 9.39, charge: 0, hydropathy: -0.9 },
  Y: { code: "Y", name: "Tyrosine", mw: 181.19, pKa1: 2.2, pKa2: 9.11, pKR: 10.07, charge: 0, hydropathy: -1.3 },
  V: { code: "V", name: "Valine", mw: 117.15, pKa1: 2.32, pKa2: 9.62, charge: 0, hydropathy: 4.2 },
};

const WATER_MW = 18.015;

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  accent: "#D4553A",
  success: "#2B8A5E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  muted: "#5A6577",
} as const;

/* ── Calculation Helpers ───────────────────────────────────────────────── */
function parseSequence(raw: string): { valid: string[]; invalid: string[] } {
  const chars = raw.toUpperCase().replace(/\s/g, "").split("");
  const valid: string[] = [];
  const invalid: string[] = [];
  for (const ch of chars) {
    if (AMINO_ACIDS[ch]) valid.push(ch);
    else if (/[A-Z]/.test(ch)) invalid.push(ch);
  }
  return { valid, invalid };
}

function calculateMW(aas: string[]): number {
  let total = 0;
  for (const aa of aas) total += AMINO_ACIDS[aa].mw;
  return total - (aas.length - 1) * WATER_MW;
}

function calculatepI(aas: string[]): number {
  // Simplified pI calculation: average of pKa values
  // A more accurate approach would use iterative charge neutralization
  const nTerm = AMINO_ACIDS[aas[0]]?.pKa1 ?? 2.3;
  const cTerm = AMINO_ACIDS[aas[aas.length - 1]]?.pKa2 ?? 9.6;
  const pKRValues: number[] = [];
  for (const aa of aas) {
    const a = AMINO_ACIDS[aa];
    if (a.pKR) pKRValues.push(a.pKR);
  }
  const all = [nTerm, cTerm, ...pKRValues].sort((a, b) => a - b);
  if (all.length % 2 === 0) {
    const mid = all.length / 2;
    return (all[mid - 1] + all[mid]) / 2;
  }
  return all[Math.floor(all.length / 2)];
}

function calculateHydropathy(aas: string[]): { avg: number; profile: number[] } {
  const profile = aas.map((aa) => AMINO_ACIDS[aa].hydropathy);
  const avg = profile.reduce((a, b) => a + b, 0) / profile.length;
  return { avg, profile };
}

function chargeAtpH(aas: string[], pH: number): number {
  let charge = 0;
  // N-terminus
  const nTerm = AMINO_ACIDS[aas[0]];
  if (nTerm) charge += 1 / (1 + 10 ** (pH - nTerm.pKa1));
  // C-terminus
  const cTerm = AMINO_ACIDS[aas[aas.length - 1]];
  if (cTerm) charge += -1 / (1 + 10 ** (cTerm.pKa2 - pH));
  // Side chains
  for (const aa of aas) {
    const a = AMINO_ACIDS[aa];
    if (a.pKR) {
      if (a.code === "K" || a.code === "R" || a.code === "H") {
        charge += 1 / (1 + 10 ** (pH - a.pKR));
      } else {
        charge += -1 / (1 + 10 ** (a.pKR - pH));
      }
    }
  }
  return charge;
}

function composition(aas: string[]): { aa: string; count: number; pct: number }[] {
  const counts: Record<string, number> = {};
  for (const aa of aas) counts[aa] = (counts[aa] || 0) + 1;
  return Object.entries(counts)
    .map(([code, count]) => ({
      aa: code,
      count,
      pct: (count / aas.length) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

/* ── Components ────────────────────────────────────────────────────────── */
function StatCard({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
        {label}
      </div>
      <div className="text-2xl font-bold" style={{ color: C.navy }}>
        {value}
      </div>
      {unit && <div className="text-xs mt-0.5" style={{ color: C.muted }}>{unit}</div>}
    </div>
  );
}

function HydropathyBar({ value }: { value: number }) {
  const pct = ((value + 4.5) / 9) * 100; // scale -4.5 to +4.5
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-12 text-right" style={{ color: C.muted }}>Hydrophobic</span>
      <div className="flex-1 h-2 rounded-full relative" style={{ backgroundColor: "#E2E8F0" }}>
        <div
          className="absolute top-0 w-1.5 h-2 rounded-full"
          style={{ left: `${Math.max(0, Math.min(100, pct))}%`, backgroundColor: C.teal }}
        />
      </div>
      <span className="w-12" style={{ color: C.muted }}>Hydrophilic</span>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────────── */
export default function SequenceAnalyzerPage() {
  const [input, setInput] = useState("");
  const [pH, setpH] = useState(7.4);

  const { valid, invalid } = useMemo(() => parseSequence(input), [input]);
  const mw = useMemo(() => (valid.length ? calculateMW(valid) : 0), [valid]);
  const pI = useMemo(() => (valid.length ? calculatepI(valid) : 0), [valid]);
  const hydropathy = useMemo(() => (valid.length ? calculateHydropathy(valid) : { avg: 0, profile: [] }), [valid]);
  const netCharge = useMemo(() => (valid.length ? chargeAtpH(valid, pH) : 0), [valid, pH]);
  const aaComp = useMemo(() => (valid.length ? composition(valid) : []), [valid]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
          style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}
        >
          <span>Labs Tool</span>
          <span style={{ color: C.teal }}>Beta</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Peptide Sequence Analyzer
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Enter an amino acid sequence using single-letter codes to calculate molecular weight, isoelectric
          point, hydropathy profile, and net charge at physiological pH. Supports all 20 standard amino acids.
        </p>
      </div>

      {/* Input */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
      >
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
          Amino Acid Sequence
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., MKWVTFISLLLLFSSAYSRGVFRRDAHKSEVAHRFKDLGEENFKALVLIAFAQYLQQCPFEDHVKLVNEVTEFAKTCVADESAENCDKSLHTLFGDKLCTVATLRETYGEMADCCAKQEPERNECFLQHKDDNPNLPRLVRPEVDVMCTAFHDNEETFLKKYLYEIARRHPYFYAPELLYYANKYNGVFQECCQAEDKGACLLPKIETMREKVLASSARQRLRCASIQKFGERALKAWSVARLSQKFPKAEFVEVTKLVTDLTKVHKECCHGDLLECADDRADLAKYICENQDSISSKLKECCEKPLLEKSHCIAEVENDEMPADLPSLAADFVESKDVCKNYAEAKDVFLGMFLYEYARRHPDYSVVLLLRLAKTYETTLEKCCAAADPHECYAKVFDEFKPLVEEPQNLIKQNCELFEQLGEYKFQNALLVRYTKKVPQVSTPTLVEVSRNLGKVGSKCCKHPEAKRMPCAEDYLSVVLNQLCVLHEKTPVSDRVTKCCTESLVNRRPCFSALTPDETYVPKAFDEKLFTFHADICTLPDTEKQIKKQTALVELLKHKPKATEEQLKTVMENFVAFVDKCCAADDKEACFAVEGPKLVVSTQTALA"
          className="w-full rounded-lg border p-3 text-sm font-mono"
          style={{ borderColor: C.border, backgroundColor: C.bg, color: C.navy, minHeight: 120 }}
        />
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
          <div className="text-xs" style={{ color: C.muted }}>
            {valid.length} residues · {invalid.length > 0 && (
              <span style={{ color: C.accent }}>{invalid.length} invalid character(s): {invalid.join(", ")}</span>
            )}
          </div>
          <button
            onClick={() => setInput("")}
            className="text-xs font-semibold hover:underline"
            style={{ color: C.teal }}
          >
            Clear
          </button>
        </div>
      </div>

      {valid.length > 0 && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Length" value={String(valid.length)} unit="residues" />
            <StatCard label="Molecular Weight" value={mw.toFixed(2)} unit="Da (g/mol)" />
            <StatCard label="Isoelectric Point (pI)" value={pI.toFixed(2)} unit="pH units" />
            <StatCard label="Net Charge @ pH 7.4" value={netCharge.toFixed(2)} unit="proton equivalents" />
          </div>

          {/* pH Slider */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.teal }}>
                pH Adjustment
              </div>
              <div className="text-sm font-bold" style={{ color: C.navy }}>
                pH {pH.toFixed(1)}
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={14}
              step={0.1}
              value={pH}
              onChange={(e) => setpH(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: C.muted }}>
              <span>Acidic (1)</span>
              <span>Physiological (7.4)</span>
              <span>Basic (14)</span>
            </div>
            <div className="mt-3 text-sm" style={{ color: C.navy }}>
              Net charge at pH {pH.toFixed(1)}: <strong>{chargeAtpH(valid, pH).toFixed(2)}</strong>
            </div>
          </div>

          {/* Hydropathy */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
              Hydropathy Profile
            </div>
            <div className="mb-3">
              <HydropathyBar value={hydropathy.avg} />
            </div>
            <div className="text-sm mb-3" style={{ color: C.navy }}>
              Average hydropathy index: <strong>{hydropathy.avg.toFixed(2)}</strong> (Kyte-Doolittle scale)
            </div>
            <div className="flex flex-wrap gap-1">
              {hydropathy.profile.map((v, i) => (
                <div
                  key={i}
                  className="w-1.5 h-6 rounded-sm"
                  style={{
                    backgroundColor:
                      v > 0 ? `rgba(43, 138, 94, ${Math.min(1, v / 4.5)})` : `rgba(212, 85, 58, ${Math.min(1, -v / 4.5)})`,
                  }}
                  title={`${i + 1}: ${AMINO_ACIDS[valid[i]]?.name} (${v.toFixed(1)})`}
                />
              ))}
            </div>
            <div className="text-xs mt-2" style={{ color: C.muted }}>
              Green = hydrophobic · Red = hydrophilic · Hover for residue details
            </div>
          </div>

          {/* Composition */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
              Amino Acid Composition
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {aaComp.map(({ aa, count, pct }) => (
                <div key={aa} className="flex items-center justify-between rounded-lg p-2" style={{ backgroundColor: C.bg }}>
                  <div>
                    <span className="text-sm font-bold" style={{ color: C.navy }}>{aa}</span>
                    <span className="text-xs ml-1" style={{ color: C.muted }}>{AMINO_ACIDS[aa]?.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={{ color: C.navy }}>{count}</div>
                    <div className="text-xs" style={{ color: C.muted }}>{pct.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sequence Map */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
              Sequence Map
            </div>
            <div className="font-mono text-sm leading-relaxed break-all" style={{ color: C.navy }}>
              {valid.map((aa, i) => (
                <span key={i} className="inline-block text-center w-5" title={`${i + 1}: ${AMINO_ACIDS[aa]?.name}`}>
                  {aa}
                </span>
              ))}
            </div>
            <div className="text-xs mt-2" style={{ color: C.muted }}>
              Position numbers shown on hover
            </div>
          </div>
        </>
      )}

      {/* Disclaimer */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}
      >
        <strong>Research use only.</strong> These calculations use standard biochemical parameters and
        provide estimates only. Actual molecular weight may vary due to post-translational modifications,
        disulfide bonds, or non-standard amino acids. pI calculation uses a simplified approach; precise
        values require experimental determination or advanced algorithms. Not for clinical or dosing decisions.
      </div>
    </div>
  );
}

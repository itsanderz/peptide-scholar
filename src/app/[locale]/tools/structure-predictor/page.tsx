"use client";

import { useState } from "react";

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

export default function StructurePredictorPage() {
  const [sequence, setSequence] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdbContent, setPdbContent] = useState<string | null>(null);
  const [history, setHistory] = useState<{ seq: string; date: string }[]>([]);

  async function predictStructure() {
    if (!sequence.trim()) return;
    const clean = sequence.trim().toUpperCase().replace(/[^A-Z]/g, "");
    if (clean.length < 5) {
      setError("Sequence must be at least 5 amino acids.");
      return;
    }
    if (clean.length > 400) {
      setError("ESMFold free API limit is ~400 amino acids.");
      return;
    }
    setLoading(true);
    setError(null);
    setPdbContent(null);
    try {
      const res = await fetch("https://api.esmatlas.com/foldSequence/v1/pdb/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: clean,
      });
      if (!res.ok) throw new Error(`ESMFold API error: ${res.status}`);
      const pdb = await res.text();
      setPdbContent(pdb);
      setHistory((h) => [{ seq: clean, date: new Date().toLocaleTimeString() }, ...h].slice(0, 10));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to predict structure.");
    } finally {
      setLoading(false);
    }
  }

  function downloadPDB() {
    if (!pdbContent) return;
    const blob = new Blob([pdbContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `predicted_structure_${sequence.slice(0, 10)}.pdb`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4" style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}>
          <span>Labs Tool</span>
          <span style={{ color: C.teal }}>Beta</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Peptide Structure Predictor
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Predict the 3D structure of any peptide sequence using the ESMFold API (Meta AI). 
          This is a <strong>computational prediction</strong> tool — it does NOT synthesize peptides. 
          Results are provided as PDB files for visualization in molecular viewers.
        </p>
      </div>

      {/* Clarification box */}
      <div className="rounded-xl p-4 mb-8 text-sm leading-relaxed" style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD", color: "#075985" }}>
        <strong>What this tool does:</strong> It predicts how your peptide sequence would fold in 3D space, 
        using Meta AI&apos;s ESMFold model. This helps researchers understand potential receptor binding 
        and structural properties <em>before</em> synthesis. For actual chemical synthesis, you still need 
        a lab or contract manufacturer (solid-phase peptide synthesis, SPPS).
      </div>

      {/* Input */}
      <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
        <label className="block text-sm font-semibold mb-2" style={{ color: C.navy }}>
          Amino Acid Sequence
        </label>
        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter amino acid sequence using single-letter codes (e.g., GEPPPGKPADDAGLV for BPC-157)..."
          className="w-full rounded-lg border p-3 text-sm font-mono min-h-[100px] resize-y"
          style={{ borderColor: C.border, backgroundColor: C.bg, color: C.navy }}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="text-xs" style={{ color: C.muted }}>
            {sequence.replace(/[^A-Za-z]/g, "").length} amino acids
            {sequence.replace(/[^A-Za-z]/g, "").length > 400 && (
              <span className="ml-2 font-semibold" style={{ color: C.accent }}> exceeds 400 aa limit</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSequence("")}
              className="rounded-lg px-4 py-2 text-sm font-semibold border transition-colors"
              style={{ borderColor: C.border, color: C.muted, backgroundColor: C.surface }}
            >
              Clear
            </button>
            <button
              onClick={predictStructure}
              disabled={loading || sequence.replace(/[^A-Za-z]/g, "").length < 5}
              className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: C.teal }}
            >
              {loading ? "Predicting..." : "Predict Structure"}
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-3 rounded-lg p-3 text-sm" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}>
            {error}
          </div>
        )}
      </div>

      {/* Result */}
      {pdbContent && (
        <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold" style={{ color: C.navy }}>
              Predicted Structure (PDB)
            </h3>
            <button
              onClick={downloadPDB}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors"
              style={{ backgroundColor: C.success }}
            >
              Download .pdb
            </button>
          </div>
          <pre className="text-xs font-mono p-3 rounded-lg overflow-x-auto max-h-[300px]" style={{ backgroundColor: "#1C2028", color: "#E2E8F0" }}>
            {pdbContent.slice(0, 2000)}{pdbContent.length > 2000 && "\n... (truncated)"}
          </pre>
          <p className="mt-2 text-xs" style={{ color: C.muted }}>
            View this PDB file in{' '}
            <a href="https://molstar.org/viewer/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: C.teal }}>MolStar</a>
            {' '}or{' '}
            <a href="https://www.rcsb.org/3d-view" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: C.teal }}>RCSB 3D Viewer</a>.
          </p>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: C.navy }}>Recent Predictions</h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between text-xs rounded-lg p-2" style={{ backgroundColor: C.bg }}>
                <code className="font-mono truncate max-w-[200px]" style={{ color: C.navy }}>{h.seq}</code>
                <span style={{ color: C.muted }}>{h.seq.length} aa · {h.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl p-4 mt-8 text-sm leading-relaxed" style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}>
        <strong>Research use only.</strong> ESMFold predictions are computational models with inherent 
        uncertainty. Predicted structures should be validated experimentally (X-ray crystallography, 
        cryo-EM, or NMR) before making binding or functional claims. This tool uses the public ESMFold 
        API; availability and limits are subject to Meta AI&apos;s terms.
      </div>
    </div>
  );
}

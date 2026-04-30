"use client";

import { useMemo, useState } from "react";
import { trackToolUse } from "@/lib/analytics";

function SyringeVisual({ units }: { units: number }) {
  const clampedUnits = Math.min(Math.max(units, 0), 100);
  const fillHeight = (clampedUnits / 100) * 200;

  return (
    <div>
      <p className="calc-syringe-label">Syringe fill level</p>
      <svg
        viewBox="0 0 80 280"
        width="80"
        height="280"
        aria-label={`Syringe showing ${clampedUnits.toFixed(1)} units`}
        role="img"
      >
        <rect x="32" y="2" width="16" height="10" rx="1" fill="var(--black)" />
        <rect x="37" y="12" width="6" height="40" fill="var(--black)" />
        <rect x="20" y="52" width="40" height="210" rx="2" fill="var(--bone)" stroke="var(--black)" strokeWidth="2" />
        <rect
          x="22"
          y={254 - fillHeight}
          width="36"
          height={fillHeight}
          rx="1"
          fill="var(--blue)"
          opacity="0.82"
        />
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
                stroke="var(--black)"
                strokeWidth={isMajor ? 1.5 : 0.8}
                opacity={0.55}
              />
              {isMajor && (
                <text x="66" y={y + 4} fontSize="10" fill="var(--black)" fontWeight="700">
                  {i * 10}
                </text>
              )}
            </g>
          );
        })}
        <rect x="38" y="262" width="4" height="16" fill="var(--black)" opacity="0.45" />
        <polygon points="38,278 42,278 40,290" fill="var(--black)" opacity="0.45" />
      </svg>
      <p className="calc-syringe-value">{clampedUnits.toFixed(1)} units</p>
    </div>
  );
}

export default function ReconstitutionCalc() {
  const [peptideAmountMg, setPeptideAmountMg] = useState("");
  const [waterVolumeMl, setWaterVolumeMl] = useState("");
  const [desiredDose, setDesiredDose] = useState("");
  const [doseUnit, setDoseUnit] = useState<"mcg" | "mg">("mcg");

  const peptide = parseFloat(peptideAmountMg);
  const water = parseFloat(waterVolumeMl);
  const dose = parseFloat(desiredDose);

  const hasNegative =
    (peptideAmountMg !== "" && peptide <= 0) ||
    (waterVolumeMl !== "" && water <= 0) ||
    (desiredDose !== "" && dose <= 0);

  const canCalculate = peptide > 0 && water > 0 && dose > 0 && !hasNegative;

  const results = useMemo(() => {
    if (!canCalculate) return null;
    trackToolUse("reconstitution_calculator", "calculate");

    const peptideMcg = peptide * 1000;
    const doseMcg = doseUnit === "mcg" ? dose : dose * 1000;
    const concentrationMcgPerMl = peptideMcg / water;
    const concentrationPer01Ml = concentrationMcgPerMl / 10;
    const volumeToDrawMl = doseMcg / concentrationMcgPerMl;
    const syringeUnits = volumeToDrawMl * 100;
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
    <div className="calc-shell">
      <div className="calc-head">
        <h2>Peptide Reconstitution Calculator</h2>
        <p>Calculate exact volumes and syringe units for any peptide vial.</p>
      </div>

      <div className="calc-body">
        <div className="calc-grid">
          <div className="calc-fields">
            <div className="calc-field">
              <label htmlFor="peptide-amount">Peptide Amount (mg)</label>
              <p className="calc-help">Total mg in your vial.</p>
              <input
                id="peptide-amount"
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 5"
                value={peptideAmountMg}
                onChange={(event) => setPeptideAmountMg(event.target.value)}
              />
              <div className="calc-presets">
                {["5", "10", "15"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPeptideAmountMg(value)}
                    className={`calc-pill${peptideAmountMg === value ? " is-active" : ""}`}
                  >
                    {value}mg
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor="water-volume">Bacteriostatic Water Volume (mL)</label>
              <p className="calc-help">Amount of BAC water added to the vial.</p>
              <input
                id="water-volume"
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 2"
                value={waterVolumeMl}
                onChange={(event) => setWaterVolumeMl(event.target.value)}
              />
              <div className="calc-presets">
                {["1", "2", "3"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setWaterVolumeMl(value)}
                    className={`calc-pill${waterVolumeMl === value ? " is-active" : ""}`}
                  >
                    {value}mL
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor="desired-dose">Desired Dose</label>
              <p className="calc-help">How much peptide per injection.</p>
              <div className="calc-input-row">
                <input
                  id="desired-dose"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 250"
                  value={desiredDose}
                  onChange={(event) => setDesiredDose(event.target.value)}
                />
                <div className="calc-segment" aria-label="Dose unit">
                  <button
                    type="button"
                    onClick={() => setDoseUnit("mcg")}
                    className={doseUnit === "mcg" ? "is-active" : undefined}
                  >
                    mcg
                  </button>
                  <button
                    type="button"
                    onClick={() => setDoseUnit("mg")}
                    className={doseUnit === "mg" ? "is-active" : undefined}
                  >
                    mg
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {hasNegative && (
              <div className="calc-error">All values must be greater than zero.</div>
            )}

            {!canCalculate && !hasNegative && (
              <div className="calc-panel calc-empty">
                <div>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p>Enter values to see your results.</p>
                </div>
              </div>
            )}

            {canCalculate && results && (
              <div className="calc-results">
                {results.highVolume && (
                  <div className="calc-warning">
                    Dose volume exceeds 1 mL. This is unusual for subcutaneous peptide injections.
                    Double-check your values.
                  </div>
                )}

                <div className="calc-result">
                  <p className="calc-result-label">Concentration</p>
                  <p className="calc-result-value">{results.concentrationPer01Ml.toFixed(1)} mcg</p>
                  <p className="calc-result-sub">
                    per 0.1 mL ({results.concentrationMcgPerMl.toFixed(1)} mcg/mL = {(results.concentrationMcgPerMl / 1000).toFixed(2)} mg/mL)
                  </p>
                </div>

                <div className="calc-result">
                  <p className="calc-result-label">Volume to Draw</p>
                  <p className="calc-result-value">{results.volumeToDrawMl.toFixed(3)} mL</p>
                </div>

                <div className="calc-result is-primary">
                  <p className="calc-result-label">Syringe Units (U-100)</p>
                  <p className="calc-result-value">{results.syringeUnits.toFixed(1)}</p>
                  <p className="calc-result-sub">units on insulin syringe</p>
                </div>

                <div className="calc-result">
                  <p className="calc-result-label">Doses Per Vial</p>
                  <p className="calc-result-value">{results.dosesPerVial.toFixed(1)}</p>
                  <p className="calc-result-sub">doses at this amount</p>
                </div>

                <div className="calc-syringe">
                  <SyringeVisual units={results.syringeUnits} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="calc-disclaimer">
          For educational purposes only. Always verify calculations with a healthcare provider.
        </div>
      </div>
    </div>
  );
}

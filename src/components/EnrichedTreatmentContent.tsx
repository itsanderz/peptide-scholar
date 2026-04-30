import React from "react";
import type { EnrichedTreatmentContent as EnrichedTreatmentData } from "@/data/treatment-enrichment";

interface EnrichedContentProps {
  content: EnrichedTreatmentData;
  treatmentName: string;
}

export const EnrichedTreatmentContent: React.FC<EnrichedContentProps> = ({
  content,
  treatmentName,
}) => {
  return (
    <div className="space-y-10 enriched-content treatment-enriched">
      {/* Mechanism of Action */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          How {treatmentName} Works
        </h2>
        <div
          className="rounded-xl p-5 mb-4"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <p className="text-sm leading-relaxed font-medium" style={{ color: "#1C2028" }}>
            {content.mechanismOfAction.summary}
          </p>
        </div>
        <div className="space-y-3">
          {content.mechanismOfAction.detailed.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: "#5A6577" }}>
              {para}
            </p>
          ))}
        </div>
        {content.mechanismOfAction.receptorTargets && (
          <div className="mt-4 flex flex-wrap gap-2">
            {content.mechanismOfAction.receptorTargets.map((target) => (
              <span
                key={target}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#EBF4FF", color: "#1A3A5C" }}
              >
                {target}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Clinical Trials */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Clinical Trial Evidence
        </h2>
        <div className="space-y-4">
          {content.clinicalTrials.map((trial, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold" style={{ color: "#1A3A5C" }}>
                  {trial.trialName}
                </h3>
                {trial.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${trial.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold"
                    style={{ color: "#3B7A9E" }}
                  >
                    PMID: {trial.pmid}
                  </a>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
                <div>
                  <span className="font-semibold" style={{ color: "#5A6577" }}>Population:</span>{" "}
                  <span style={{ color: "#1C2028" }}>{trial.population}</span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#5A6577" }}>N=</span>{" "}
                  <span style={{ color: "#1C2028" }}>{trial.n.toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#5A6577" }}>Duration:</span>{" "}
                  <span style={{ color: "#1C2028" }}>{trial.duration}</span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#5A6577" }}>Endpoint:</span>{" "}
                  <span style={{ color: "#1C2028" }}>{trial.primaryOutcome}</span>
                </div>
              </div>
              <ul className="space-y-1.5">
                {trial.keyResults.map((result, ri) => (
                  <li key={ri} className="flex items-start gap-2 text-sm" style={{ color: "#1C2028" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Dosing */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Dosing &amp; Administration
        </h2>
        <div className="space-y-4">
          {content.dosing.map((dose, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "#EBF4FF", color: "#1A3A5C" }}
                >
                  {dose.indication}
                </span>
                <span className="text-xs" style={{ color: "#5A6577" }}>
                  {dose.route} · {dose.frequency}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-semibold" style={{ color: "#5A6577" }}>Starting:</span>{" "}
                  <span style={{ color: "#1C2028" }}>{dose.startingDose}</span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#5A6577" }}>Titration:</span>{" "}
                  <span style={{ color: "#1C2028" }}>{dose.titrationSchedule}</span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#5A6577" }}>Maintenance:</span>{" "}
                  <span style={{ color: "#1C2028" }}>{dose.maintenanceDose}</span>
                </div>
                <div>
                  <span className="font-semibold" style={{ color: "#5A6577" }}>Maximum:</span>{" "}
                  <span style={{ color: "#1C2028" }}>{dose.maxDose}</span>
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                {dose.administrationNotes.map((note, ni) => (
                  <li key={ni} className="flex items-start gap-2 text-xs" style={{ color: "#5A6577" }}>
                    <span className="mt-0.5 shrink-0">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Side Effects */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Side Effect Profile
        </h2>
        <div className="space-y-4">
          {content.sideEffects.map((category, i) => (
            <div key={i}>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#5A6577" }}>
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.effects.map((effect, ei) => (
                  <div
                    key={ei}
                    className="rounded-lg p-3 flex items-start gap-3"
                    style={{
                      backgroundColor:
                        effect.severity === "severe"
                          ? "#FEF2F2"
                          : effect.severity === "moderate"
                          ? "#FFFBEB"
                          : "#F0FDF4",
                      border: `1px solid ${
                        effect.severity === "severe"
                          ? "#FECACA"
                          : effect.severity === "moderate"
                          ? "#FCD34D"
                          : "#BBF7D0"
                      }`,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold" style={{ color: "#1C2028" }}>
                          {effect.name}
                        </span>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor:
                              effect.severity === "severe"
                                ? "#FECACA"
                                : effect.severity === "moderate"
                                ? "#FCD34D"
                                : "#BBF7D0",
                            color:
                              effect.severity === "severe"
                                ? "#991B1B"
                                : effect.severity === "moderate"
                                ? "#92400E"
                                : "#166534",
                          }}
                        >
                          {effect.severity}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: "#3B7A9E" }}>
                          {effect.incidence}
                        </span>
                      </div>
                      {effect.notes && (
                        <p className="text-xs mt-1" style={{ color: "#5A6577" }}>
                          {effect.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contraindications & Warnings */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Contraindications &amp; Warnings
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#991B1B" }}>
              Do Not Use
            </h3>
            <ul className="space-y-2">
              {content.contraindications.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#7F1D1D" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#92400E" }}>
              Important Warnings
            </h3>
            <ul className="space-y-2">
              {content.warnings.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#78350F" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Drug Interactions */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Drug Interactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ backgroundColor: "#F8FAFC" }}>
                <th className="text-left p-3 rounded-tl-lg font-semibold" style={{ color: "#1A3A5C", border: "1px solid #D0D7E2", borderRight: "none", borderBottom: "none" }}>Drug</th>
                <th className="text-left p-3 font-semibold" style={{ color: "#1A3A5C", border: "1px solid #D0D7E2", borderRight: "none", borderBottom: "none" }}>Interaction</th>
                <th className="text-left p-3 font-semibold" style={{ color: "#1A3A5C", border: "1px solid #D0D7E2", borderRight: "none", borderBottom: "none" }}>Severity</th>
                <th className="text-left p-3 rounded-tr-lg font-semibold" style={{ color: "#1A3A5C", border: "1px solid #D0D7E2", borderBottom: "none" }}>Mechanism</th>
              </tr>
            </thead>
            <tbody>
              {content.drugInteractions.map((interaction, i) => (
                <tr key={i}>
                  <td
                    className="p-3 font-medium"
                    style={{
                      color: "#1C2028",
                      border: "1px solid #D0D7E2",
                      borderRight: "none",
                      borderTop: "none",
                      ...(i === content.drugInteractions.length - 1 ? { borderBottomLeftRadius: 8 } : {}),
                    }}
                  >
                    {interaction.drug}
                  </td>
                  <td
                    className="p-3"
                    style={{
                      color: "#5A6577",
                      border: "1px solid #D0D7E2",
                      borderRight: "none",
                      borderTop: "none",
                    }}
                  >
                    {interaction.interaction}
                  </td>
                  <td
                    className="p-3"
                    style={{
                      border: "1px solid #D0D7E2",
                      borderRight: "none",
                      borderTop: "none",
                    }}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{
                        backgroundColor:
                          interaction.severity === "major"
                            ? "#FECACA"
                            : interaction.severity === "moderate"
                            ? "#FCD34D"
                            : "#BBF7D0",
                        color:
                          interaction.severity === "major"
                            ? "#991B1B"
                            : interaction.severity === "moderate"
                            ? "#92400E"
                            : "#166534",
                      }}
                    >
                      {interaction.severity}
                    </span>
                  </td>
                  <td
                    className="p-3"
                    style={{
                      color: "#5A6577",
                      border: "1px solid #D0D7E2",
                      borderTop: "none",
                      ...(i === content.drugInteractions.length - 1 ? { borderBottomRightRadius: 8 } : {}),
                    }}
                  >
                    {interaction.mechanism}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Monitoring */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Monitoring Requirements
        </h2>
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <ul className="space-y-2">
            {content.monitoring.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#1C2028" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B7A9E" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparisons */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          How {treatmentName} Compares
        </h2>
        <div className="space-y-3">
          {content.comparisons.map((comp, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#5A6577" }}>
                  {comp.dimension}
                </span>
                {comp.winner && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: comp.winner === "this" ? "#DCFCE7" : "#F0F3F7",
                      color: comp.winner === "this" ? "#166534" : "#5A6577",
                    }}
                  >
                    {comp.winner === "this" ? `${treatmentName} advantage` : `${comp.vs} advantage`}
                  </span>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-semibold" style={{ color: "#1A3A5C" }}>{treatmentName}:</span>{" "}
                  <span className="text-sm" style={{ color: "#1C2028" }}>{comp.thisDrug}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold" style={{ color: "#3B7A9E" }}>{comp.vs}:</span>{" "}
                  <span className="text-sm" style={{ color: "#1C2028" }}>{comp.otherDrug}</span>
                </div>
              </div>
              {comp.notes && (
                <p className="text-xs mt-2" style={{ color: "#5A6577" }}>
                  {comp.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Evidence Quality */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Evidence Quality Assessment
        </h2>
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: "#166534", color: "#FFFFFF" }}
            >
              {content.evidenceQuality.overall}
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: "#166534" }}>
                Overall Evidence Grade: {content.evidenceQuality.overall}
              </div>
              <div className="text-xs" style={{ color: "#5A6577" }}>
                A = Strong evidence from multiple large RCTs
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold" style={{ color: "#5A6577" }}>Human RCTs:</span>{" "}
              <span style={{ color: "#1C2028" }}>{content.evidenceQuality.humanRcts}</span>
            </div>
            <div>
              <span className="font-semibold" style={{ color: "#5A6577" }}>Long-term data:</span>{" "}
              <span style={{ color: "#1C2028" }}>{content.evidenceQuality.longTermData}</span>
            </div>
            <div>
              <span className="font-semibold" style={{ color: "#5A6577" }}>Real-world evidence:</span>{" "}
              <span style={{ color: "#1C2028" }}>{content.evidenceQuality.realWorldEvidence}</span>
            </div>
            <div>
              <span className="font-semibold" style={{ color: "#5A6577" }}>Regulatory status:</span>{" "}
              <span style={{ color: "#1C2028" }}>{content.evidenceQuality.regulatoryStatus}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Selection */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Is {treatmentName} Right for You?
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#166534" }}>
              Ideal Candidates
            </h3>
            <ul className="space-y-2">
              {content.patientSelection.idealCandidates.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#166534" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#991B1B" }}>
              Avoid
            </h3>
            <ul className="space-y-2">
              {content.patientSelection.poorCandidates.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#991B1B" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#92400E" }}>
              Use With Caution
            </h3>
            <ul className="space-y-2">
              {content.patientSelection.requiresCaution.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#92400E" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cost Deep Dive */}
      <section>
        <h2
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: "#1A3A5C" }}
        >
          Cost &amp; Insurance Deep Dive
        </h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#5A6577" }}>
                List Price (Monthly)
              </div>
              <div className="text-sm" style={{ color: "#1C2028" }}>{content.costDeepDive.listPriceMonthly}</div>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#5A6577" }}>
                Cash-Pay Range
              </div>
              <div className="text-sm" style={{ color: "#1C2028" }}>{content.costDeepDive.cashPayRange}</div>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#5A6577" }}>
                Insurance Coverage Rate
              </div>
              <div className="text-sm" style={{ color: "#1C2028" }}>{content.costDeepDive.insuranceCoverageRate}</div>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#5A6577" }}>
                Prior Auth Likelihood
              </div>
              <div className="text-sm" style={{ color: "#1C2028" }}>{content.costDeepDive.priorAuthLikelihood}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#5A6577" }}>
              Savings Programs
            </h3>
            <div className="space-y-3">
              {content.costDeepDive.savingsPrograms.map((program, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold" style={{ color: "#1A3A5C" }}>{program.name}</span>
                    <span className="text-xs font-semibold" style={{ color: "#166534" }}>{program.savings}</span>
                  </div>
                  <div className="text-xs" style={{ color: "#5A6577" }}>
                    <span className="font-semibold">Eligibility:</span> {program.eligibility}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#94A3B8" }}>
                    {program.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#F0F7FF", border: "1px solid #BDD8F0" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "#1A3A5C" }}>
              Cost-Effectiveness Notes
            </h3>
            <ul className="space-y-1">
              {content.costDeepDive.costEffectivenessNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "#1C2028" }}>
                  <span className="mt-0.5 shrink-0">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

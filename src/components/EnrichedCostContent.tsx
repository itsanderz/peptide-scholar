import type { EnrichedCostContent } from "@/data/cost-enrichment";

interface Props {
  content: EnrichedCostContent;
  treatmentName: string;
}

export function EnrichedCostContentRenderer({ content, treatmentName: _treatmentName }: Props) {
  void _treatmentName;

  return (
    <div className="space-y-10 enriched-content cost-enriched">
      {/* Price Breakdown */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Price Breakdown
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["List price (monthly)", content.priceBreakdown.listPricePerMonth],
            ["Average wholesale price", content.priceBreakdown.averageWholesalePrice],
            ["Pharmacy acquisition estimate", content.priceBreakdown.pharmacyAcquisitionEstimate],
            ["Typical negotiated rate", content.priceBreakdown.typicalNegotiatedRate],
            ["Price per dose", content.priceBreakdown.pricePerDose],
            ["Annual cost at list price", content.priceBreakdown.annualCostAtListPrice],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl p-4"
              style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: "#3B7A9E" }}>
                {label}
              </div>
              <div className="text-sm font-medium" style={{ color: "#1C2028" }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pharmacy Comparison */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Pharmacy Price Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#D0D7E2" }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Pharmacy</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Price Range</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {content.pharmacyPriceComparison.map((row, i) => (
                <tr key={i} className="border-b" style={{ borderColor: "#E2E8F0" }}>
                  <td className="py-2 px-3 font-medium" style={{ color: "#1C2028" }}>{row.pharmacy}</td>
                  <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.priceRange}</td>
                  <td className="py-2 px-3" style={{ color: "#5A6577" }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Insurance Landscape */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Insurance Coverage Landscape
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["Commercial plans", content.insuranceLandscape.commercialCoverageRate],
            ["Medicare Part D", content.insuranceLandscape.medicarePartD],
            ["Medicaid", content.insuranceLandscape.medicaid],
            ["VA coverage", content.insuranceLandscape.vaCoverage],
            ["TRICARE", content.insuranceLandscape.tricare],
            ["Employer plan typical tier", content.insuranceLandscape.employerPlanTypicalTier],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl p-4"
              style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: "#3B7A9E" }}>
                {label}
              </div>
              <div className="text-sm" style={{ color: "#1C2028" }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Prior Auth Guide */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Prior Authorization Guide
        </h2>
        <div
          className="rounded-xl p-5 space-y-4"
          style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD" }}
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#0369A1" }}>
              Required Documentation
            </div>
            <ul className="space-y-1">
              {content.priorAuthGuide.requiredDocumentation.map((item, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: "#0C4A6E" }}>
                  <span className="shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#0369A1" }}>
              Common Denial Reasons
            </div>
            <ul className="space-y-1">
              {content.priorAuthGuide.typicalDenialReasons.map((item, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: "#0C4A6E" }}>
                  <span className="shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#0369A1" }}>
              Appeal Template Points
            </div>
            <ul className="space-y-1">
              {content.priorAuthGuide.appealTemplatePoints.map((item, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: "#0C4A6E" }}>
                  <span className="shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm font-medium" style={{ color: "#0369A1" }}>
            Expected timeline: {content.priorAuthGuide.expectedTimeline}
          </div>
        </div>
      </section>

      {/* Savings Programs */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Savings Programs and Patient Assistance
        </h2>
        <div className="space-y-4">
          {content.savingsPrograms.map((program, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold" style={{ color: "#1A3A5C" }}>{program.name}</div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    backgroundColor:
                      program.type === "manufacturer" ? "#DBEAFE" :
                      program.type === "foundation" ? "#F3E8FF" :
                      program.type === "pharmacy" ? "#DCFCE7" : "#FEF3C7",
                    color:
                      program.type === "manufacturer" ? "#1E40AF" :
                      program.type === "foundation" ? "#6B21A8" :
                      program.type === "pharmacy" ? "#166534" : "#92400E",
                  }}
                >
                  {program.type}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div><span className="font-medium" style={{ color: "#5A6577" }}>Eligibility:</span> <span style={{ color: "#1C2028" }}>{program.eligibility}</span></div>
                <div><span className="font-medium" style={{ color: "#5A6577" }}>Savings:</span> <span style={{ color: "#1C2028" }}>{program.savings}</span></div>
                {program.incomeLimit && (
                  <div><span className="font-medium" style={{ color: "#5A6577" }}>Income limit:</span> <span style={{ color: "#1C2028" }}>{program.incomeLimit}</span></div>
                )}
                <div><span className="font-medium" style={{ color: "#5A6577" }}>Enrollment:</span> <span style={{ color: "#1C2028" }}>{program.enrollmentComplexity}</span></div>
              </div>
              <div className="text-sm mt-2" style={{ color: "#5A6577" }}>{program.notes}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Generic/Biosimilar Status */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Generic and Biosimilar Status
        </h2>
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: content.genericBiosimilarStatus.hasGeneric ? "#F0FDF4" : "#FFF7ED", border: `1px solid ${content.genericBiosimilarStatus.hasGeneric ? "#BBF7D0" : "#FDBA74"}` }}
        >
          <div className="text-sm font-medium mb-2" style={{ color: content.genericBiosimilarStatus.hasGeneric ? "#166534" : "#9A3412" }}>
            {content.genericBiosimilarStatus.hasGeneric ? "Generic available" : "No generic currently available"}
          </div>
          {content.genericBiosimilarStatus.genericPriceRange && (
            <div className="text-sm mb-1" style={{ color: "#1C2028" }}>
              Generic price range: {content.genericBiosimilarStatus.genericPriceRange}
            </div>
          )}
          {content.genericBiosimilarStatus.expectedGenericDate && (
            <div className="text-sm mb-1" style={{ color: "#1C2028" }}>
              Expected: {content.genericBiosimilarStatus.expectedGenericDate}
            </div>
          )}
          {content.genericBiosimilarStatus.biosimilarStatus && (
            <div className="text-sm" style={{ color: "#1C2028" }}>
              {content.genericBiosimilarStatus.biosimilarStatus}
            </div>
          )}
        </div>
      </section>

      {/* Compounded Alternative */}
      {content.compoundedAlternative && (
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Compounded Alternative
          </h2>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: content.compoundedAlternative.available ? "#FFF7ED" : "#F8FAFC", border: `1px solid ${content.compoundedAlternative.available ? "#FDBA74" : "#D0D7E2"}` }}
          >
            <div className="text-sm font-medium mb-2" style={{ color: content.compoundedAlternative.available ? "#9A3412" : "#5A6577" }}>
              {content.compoundedAlternative.available ? "Compounded versions exist" : "No compounded alternative available"}
            </div>
            {content.compoundedAlternative.available && (
              <>
                <div className="text-sm mb-2" style={{ color: "#1C2028" }}>
                  Price range: {content.compoundedAlternative.priceRange}
                </div>
                <div className="text-sm mb-2" style={{ color: "#1C2028" }}>
                  Legal status: {content.compoundedAlternative.legalStatus}
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: "#C2410C" }}>Quality concerns</div>
                <ul className="space-y-1">
                  {content.compoundedAlternative.qualityConcerns.map((item, i) => (
                    <li key={i} className="text-sm flex gap-2" style={{ color: "#9A3412" }}>
                      <span className="shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      {/* Dosing Cost Impact */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Cost by Dose
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#D0D7E2" }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Dose/Regimen</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Monthly</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Annual</th>
              </tr>
            </thead>
            <tbody>
              {content.dosingCostImpact.map((row, i) => (
                <tr key={i} className="border-b" style={{ borderColor: "#E2E8F0" }}>
                  <td className="py-2 px-3 font-medium" style={{ color: "#1C2028" }}>{row.dose}</td>
                  <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.monthlyCost}</td>
                  <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.annualCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Annual Cost Projection */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Annual Cost Projection
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {[
            ["Year 1", content.annualCostProjection.year1],
            ["Year 2", content.annualCostProjection.year2],
            ["Year 3", content.annualCostProjection.year3],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl p-4"
              style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: "#3B7A9E" }}>
                {label}
              </div>
              <div className="text-sm font-medium" style={{ color: "#1C2028" }}>{value}</div>
            </div>
          ))}
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>Assumptions</div>
        <ul className="space-y-1">
          {content.annualCostProjection.assumptions.map((item, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: "#5A6577" }}>
              <span className="shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cost-Saving Strategies */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          Cost-Saving Strategies
        </h2>
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
        >
          <ul className="space-y-2">
            {content.costSavingStrategies.map((item, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: "#166534" }}>
                <span className="shrink-0 font-bold">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* International Comparison */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
          International Price Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#D0D7E2" }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Country</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Price Range</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: "#3B7A9E" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {content.internationalPriceComparison.map((row, i) => (
                <tr key={i} className="border-b" style={{ borderColor: "#E2E8F0" }}>
                  <td className="py-2 px-3 font-medium" style={{ color: "#1C2028" }}>{row.country}</td>
                  <td className="py-2 px-3" style={{ color: "#1C2028" }}>{row.priceRange}</td>
                  <td className="py-2 px-3" style={{ color: "#5A6577" }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

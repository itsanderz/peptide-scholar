"use client";

import { useState, use } from "react";
import Link from "next/link";
import { MedicalDisclaimer, BreadcrumbNav } from "@/components";

/* ── Theme ─────────────────────────────────────────────────────────────── */
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

/* ── Data ──────────────────────────────────────────────────────────────── */
const REQUIRED_ITEMS = [
  {
    id: "compound_identity",
    label: "Compound identity",
    detail: "Peptide name, sequence, molecular formula, and molecular weight",
    tooltip:
      "A legitimate COA must unambiguously identify the compound. Cross-check the molecular weight against known values.",
  },
  {
    id: "lot_number",
    label: "Lot / batch number",
    detail: "Traceable to a specific manufacturing batch",
    tooltip:
      "The lot number ties the COA to one production run. Generic or missing lot numbers suggest a template, not real testing.",
  },
  {
    id: "purity_hplc",
    label: "Purity by HPLC",
    detail: "≥98% for research grade (≥95% minimum acceptable)",
    tooltip:
      "High-performance liquid chromatography (HPLC) is the gold standard for purity. Research-grade peptides should be ≥98%; anything below 95% is a major red flag.",
  },
  {
    id: "mass_spec",
    label: "Mass spectrometry (MS)",
    detail: "Confirming molecular weight matches expected compound",
    tooltip:
      "MS verifies that the actual molecular weight matches the theoretical weight. Without it, you cannot confirm you received the correct peptide.",
  },
  {
    id: "endotoxin",
    label: "Endotoxin testing",
    detail: "Result in EU/mg (≤5 EU/mg research, ≤0.5 clinical)",
    tooltip:
      "Endotoxins are bacterial cell-wall components that can cause fever and inflammation. Research use should be ≤5 EU/mg; clinical-grade demands ≤0.5 EU/mg.",
  },
  {
    id: "test_date",
    label: "Test date",
    detail: "Reflects recent batch testing, not an archived template",
    tooltip:
      "The test date should be recent (ideally within the last few months). Dates older than 18 months may indicate a recycled template rather than current testing.",
  },
  {
    id: "testing_lab",
    label: "Testing laboratory",
    detail: "Name and accreditation of the lab that performed testing",
    tooltip:
      "The lab should be independently named and verifiable. Self-issued COAs (tested by the seller) carry inherent conflict-of-interest risk.",
  },
];

const RED_FLAGS = [
  {
    id: "no_lot",
    label: "No lot number",
    detail: "Generic template, not batch-specific",
    tooltip: "A missing lot number is one of the strongest indicators of a copy-paste or fake COA.",
  },
  {
    id: "no_ms",
    label: "No mass spectrometry data",
    detail: "Cannot verify molecular identity",
    tooltip: "Without MS, there is no analytical proof that the vial contains the claimed peptide.",
  },
  {
    id: "no_endotoxin",
    label: "No endotoxin test",
    detail: "Safety risk for injection",
    tooltip: "Endotoxin testing is essential for any injectable peptide. Absence means unknown safety profile.",
  },
  {
    id: "purity_low",
    label: "Purity below 95%",
    detail: "Below minimum acceptable threshold",
    tooltip: "<95% purity means significant contaminants. Research-grade peptides should be ≥98%.",
  },
  {
    id: "self_issued",
    label: "COA issued by seller",
    detail: "Not independent — conflict of interest",
    tooltip: "When the vendor tests their own product, there is no independent verification. Always prefer third-party testing.",
  },
  {
    id: "round_numbers",
    label: "Exactly round numbers",
    detail: "e.g., exactly 99.0% — may be fabricated",
    tooltip: "Real analytical results rarely land on perfect round numbers. Suspiciously clean values suggest fabrication.",
  },
  {
    id: "old_date",
    label: "No test date or date >18 months old",
    detail: "Stale or missing testing timeline",
    tooltip: "Missing or very old dates imply the COA is a template reused across batches without new testing.",
  },
  {
    id: "missing_lab",
    label: "Laboratory name missing or unverifiable",
    detail: "Cannot confirm testing actually occurred",
    tooltip: "If the lab cannot be found online or does not appear to exist, the COA is effectively worthless.",
  },
];

const EDUCATION_CARDS = [
  {
    title: "What is HPLC and why does purity matter?",
    body: "High-performance liquid chromatography separates a peptide mixture into individual components. The largest peak represents your target peptide; smaller peaks are impurities (truncated sequences, side products, or contaminants). For research, ≥98% purity is the standard because even small impurities can confound experimental results or cause unwanted biological effects.",
  },
  {
    title: "How to read a mass spec result",
    body: "Mass spectrometry reports the mass-to-charge ratio (m/z) of ions. For a peptide COA, look for a major peak corresponding to the expected molecular weight (often reported as [M+H]+). The observed mass should be within ~1 Da of the theoretical mass. If the report shows multiple unexplained peaks or a mass that does not match, the sample may be incorrect or degraded.",
  },
  {
    title: "Why endotoxin testing is safety-critical",
    body: "Endotoxins (lipopolysaccharides from Gram-negative bacteria) can trigger severe immune reactions, including fever, hypotension, and septic shock. The Limulus Amebocyte Lysate (LAL) test measures endotoxin in Endotoxin Units per milligram (EU/mg). Injectable peptides should be ≤5 EU/mg for research; clinical use demands ≤0.5 EU/mg. Never inject a peptide without confirmed endotoxin data.",
  },
  {
    title: "Third-party vs. self-issued COAs",
    body: "A third-party COA is issued by an independent analytical laboratory with no financial stake in the sale. A self-issued COA is produced by the vendor itself. Self-issued documents carry inherent conflict of interest: the seller has every incentive to report favorable results. Always prioritize COAs from accredited, named independent labs (e.g., ISO 17025 accredited facilities).",
  },
  {
    title: "How to verify a testing laboratory",
    body: "1) Search the lab name online — it should have a professional website, address, and contact information. 2) Look for ISO 17025 or equivalent accreditation. 3) Call or email the lab and ask them to confirm they performed the specific test on the specific lot number. 4) Cross-check the reported methods (HPLC, MS, LAL) against the lab's stated capabilities. If any step fails, treat the COA as unverified.",
  },
];

const PEPTIDE_NOTES = [
  {
    name: "BPC-157",
    note: "Expected MW ~1419.7 Da. Look for the acetate or arginine salt form on the COA.",
  },
  {
    name: "TB-500",
    note: "Expected MW ~4963 Da (Thymosin β4 fragment 17-23). Verify sequence Ac-SDKP or full TB-500.",
  },
  {
    name: "GHK-Cu",
    note: "Should show copper content (typically ~8-9% by weight) in addition to peptide identity.",
  },
  {
    name: "Semaglutide",
    note: "Should show correct salt form (usually acetate or free base) and confirm amidated C-terminus by MS.",
  },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */
function getResultTier(score: number) {
  if (score >= 60) {
    return {
      label: "Excellent COA — High Confidence",
      color: C.success,
      bg: "#E6F4F1",
      border: "#BFE3D5",
    };
  }
  if (score >= 40) {
    return {
      label: "Acceptable COA — Proceed with Caution",
      color: C.warning,
      bg: "#FFF8E6",
      border: "#F5D89A",
    };
  }
  if (score >= 20) {
    return {
      label: "Poor COA — Consider Alternative Supplier",
      color: "#E8590C",
      bg: "#FFF0E6",
      border: "#F5C09A",
    };
  }
  return {
    label: "Reject — Do Not Use This Product",
    color: C.accent,
    bg: "#FDECE8",
    border: "#F5C0B5",
  };
}

function getRecommendations(score: number, uncheckedRequired: string[], checkedRedFlags: string[]) {
  const recs: { text: string; href?: string; external?: boolean }[] = [];

  if (score >= 60) {
    recs.push({ text: "Retain this COA for your research records." });
    recs.push({ text: "If this is a long-term project, consider sending a retention sample for independent confirmation." });
  }

  if (score < 60) {
    recs.push({ text: "Send a sample for independent third-party testing.", href: "https://www.google.com/search?q=peptide+third+party+testing+lab", external: true });
  }

  if (uncheckedRequired.includes("compound_identity") || uncheckedRequired.includes("mass_spec")) {
    recs.push({ text: "Request mass spectrometry data and molecular weight confirmation from the supplier." });
  }

  if (uncheckedRequired.includes("purity_hplc") || checkedRedFlags.includes("purity_low")) {
    recs.push({ text: "Compare the HPLC chromatogram to the expected single-peak profile." });
  }

  if (uncheckedRequired.includes("testing_lab") || checkedRedFlags.includes("missing_lab") || checkedRedFlags.includes("self_issued")) {
    recs.push({ text: "Check if the testing laboratory actually exists and is ISO 17025 accredited." });
  }

  if (uncheckedRequired.includes("endotoxin") || checkedRedFlags.includes("no_endotoxin")) {
    recs.push({ text: "Demand endotoxin results before any injection." });
  }

  if (uncheckedRequired.includes("lot_number") || checkedRedFlags.includes("no_lot")) {
    recs.push({ text: "Request a lot-specific COA — generic templates are not valid proof of quality." });
  }

  if (checkedRedFlags.includes("round_numbers") || checkedRedFlags.includes("old_date")) {
    recs.push({ text: "Question the supplier about the suspiciously clean values or outdated dates." });
  }

  return recs;
}

/* ── Tooltip ───────────────────────────────────────────────────────────── */
function Tooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="relative inline-block ml-1 align-middle"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-help">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      {visible && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg px-3 py-2 text-xs leading-relaxed shadow-lg z-10"
          style={{ backgroundColor: C.navy, color: "#fff" }}
        >
          {text}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-1"
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `6px solid ${C.navy}`,
            }}
          />
        </span>
      )}
    </span>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function CoaVerifierPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const [required, setRequired] = useState<Record<string, boolean>>({});
  const [redFlags, setRedFlags] = useState<Record<string, boolean>>({});

  const requiredCount = REQUIRED_ITEMS.filter((r) => required[r.id]).length;
  const redFlagCount = RED_FLAGS.filter((r) => redFlags[r.id]).length;
  const score = Math.max(0, Math.min(70, requiredCount * 10 - redFlagCount * 15));
  const tier = getResultTier(score);
  const uncheckedRequired = REQUIRED_ITEMS.filter((r) => !required[r.id]).map((r) => r.id);
  const checkedRedFlags = RED_FLAGS.filter((r) => redFlags[r.id]).map((r) => r.id);
  const recommendations = getRecommendations(score, uncheckedRequired, checkedRedFlags);

  function toggleRequired(id: string) {
    setRequired((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleRedFlag(id: string) {
    setRedFlags((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
    setRequired({});
    setRedFlags({});
  }

  const barPercent = Math.min(100, Math.max(0, (score / 70) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Tools", href: `${prefix}/tools` },
          { label: "COA Verifier", href: `${prefix}/tools/coa-verifier` },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          COA Quality Verifier
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
          A Certificate of Analysis (COA) is the most important document for verifying peptide
          quality. Fake or inadequate COAs are common in the research market. Use this interactive
          checklist to determine whether a COA meets minimum standards.
        </p>
      </div>

      {/* ── Disclaimer ────────────────────────────────────────────── */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#FFF8E6", border: `1px solid ${C.warning}` }}
      >
        <div className="flex items-start gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.warning} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div className="text-sm leading-relaxed" style={{ color: "#92400e" }}>
            <p className="font-semibold mb-1">Important Notice</p>
            <p>
              This tool provides a heuristic assessment only. It cannot definitively prove a COA is
              genuine or that a peptide is safe. Always consult a qualified professional and
              independently verify testing data before use. No liability is accepted for decisions
              made based on this score.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        {/* ── Checklist ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Required Items */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: C.navy }}>
                Required Items
              </h2>
              <span
                className="text-xs font-semibold rounded-full px-2.5 py-1"
                style={{ backgroundColor: "#E6F4F1", color: C.success }}
              >
                +10 points each
              </span>
            </div>
            <div className="space-y-3">
              {REQUIRED_ITEMS.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-50"
                  style={{ border: `1px solid ${required[item.id] ? C.success : C.border}` }}
                >
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 accent-[#2B8A5E] cursor-pointer"
                    checked={!!required[item.id]}
                    onChange={() => toggleRequired(item.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-1">
                      <span className="text-sm font-semibold" style={{ color: C.navy }}>
                        {item.label}
                      </span>
                      <Tooltip text={item.tooltip} />
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: C.muted }}>
                      {item.detail}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Red Flags */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: C.navy }}>
                Red Flags
              </h2>
              <span
                className="text-xs font-semibold rounded-full px-2.5 py-1"
                style={{ backgroundColor: "#FDECE8", color: C.accent }}
              >
                −15 points each
              </span>
            </div>
            <div className="space-y-3">
              {RED_FLAGS.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-50"
                  style={{ border: `1px solid ${redFlags[item.id] ? C.accent : C.border}` }}
                >
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 accent-[#D4553A] cursor-pointer"
                    checked={!!redFlags[item.id]}
                    onChange={() => toggleRedFlag(item.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-1">
                      <span className="text-sm font-semibold" style={{ color: C.navy }}>
                        {item.label}
                      </span>
                      <Tooltip text={item.tooltip} />
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: C.muted }}>
                      {item.detail}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Reset */}
          <div className="flex justify-end">
            <button
              onClick={reset}
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ color: C.navy, backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E8ECF1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.bg;
              }}
            >
              Reset Checklist
            </button>
          </div>
        </div>

        {/* ── Score Panel ───────────────────────────────────────── */}
        <div className="space-y-6">
          <div
            className="rounded-xl p-5 sticky top-6"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              Quality Score
            </h2>

            {/* Meter */}
            <div className="mb-4">
              <div className="flex items-end justify-between mb-1">
                <span className="text-3xl font-bold" style={{ color: tier.color }}>
                  {score}
                </span>
                <span className="text-xs font-semibold" style={{ color: C.muted }}>
                  / 70
                </span>
              </div>
              <div
                className="w-full h-4 rounded-full overflow-hidden"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${barPercent}%`,
                    backgroundColor: tier.color,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] font-semibold" style={{ color: C.muted }}>
                  0
                </span>
                <span className="text-[10px] font-semibold" style={{ color: C.muted }}>
                  35
                </span>
                <span className="text-[10px] font-semibold" style={{ color: C.muted }}>
                  70
                </span>
              </div>
            </div>

            {/* Result badge */}
            <div
              className="rounded-lg px-4 py-3 text-center text-sm font-bold mb-4"
              style={{
                backgroundColor: tier.bg,
                color: tier.color,
                border: `1px solid ${tier.border}`,
              }}
            >
              {tier.label}
            </div>

            {/* Stats */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: C.muted }}>Required items present</span>
                <span className="font-semibold" style={{ color: C.success }}>
                  {requiredCount} / {REQUIRED_ITEMS.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: C.muted }}>Red flags detected</span>
                <span className="font-semibold" style={{ color: C.accent }}>
                  {redFlagCount} / {RED_FLAGS.length}
                </span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
                Recommendations
              </h3>
              <ul className="space-y-2">
                {recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.teal }} />
                    {rec.href ? (
                      rec.external ? (
                        <a
                          href={rec.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:no-underline"
                          style={{ color: C.teal }}
                        >
                          {rec.text}
                        </a>
                      ) : (
                        <Link href={rec.href} className="underline hover:no-underline" style={{ color: C.teal }}>
                          {rec.text}
                        </Link>
                      )
                    ) : (
                      <span>{rec.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── Education ─────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          Learn More
        </h2>
        <div className="space-y-4">
          {EDUCATION_CARDS.map((card) => (
            <details
              key={card.title}
              className="group rounded-xl overflow-hidden"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <summary
                className="cursor-pointer px-5 py-4 flex items-center justify-between text-sm font-semibold list-none"
                style={{ color: C.navy }}
              >
                <span>{card.title}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={C.navy}
                  strokeWidth="2"
                  className="flex-shrink-0 ml-2 transition-transform group-open:rotate-180"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: C.muted }}>
                {card.body}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Peptide-Specific Notes ────────────────────────────────── */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          Peptide-Specific Verification Notes
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {PEPTIDE_NOTES.map((p) => (
            <div
              key={p.name}
              className="rounded-xl p-5"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
            >
              <h3 className="font-bold mb-1" style={{ color: C.navy }}>
                {p.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Heavy Disclaimers ─────────────────────────────────────── */}
      <section className="mb-12">
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
        >
          <h3 className="text-lg font-bold mb-3" style={{ color: C.navy }}>
            Full Disclaimers
          </h3>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: C.muted }}>
            <p>
              <strong>1. Not a guarantee of authenticity.</strong> This tool scores a COA based on
              the presence or absence of common data fields. A high score does not prove a COA is
              genuine, and a low score does not prove it is fake. Sophisticated counterfeiters can
              produce documents that pass superficial checks.
            </p>
            <p>
              <strong>2. Not medical or legal advice.</strong> Nothing on this page constitutes
              medical advice, legal advice, or a recommendation to purchase, possess, or use any
              peptide. Always consult a licensed healthcare provider and comply with local laws.
            </p>
            <p>
              <strong>3. No liability.</strong> We accept no liability for any loss, injury, or
              adverse outcome resulting from reliance on this tool, the scores it generates, or any
              peptide purchased based on its output.
            </p>
            <p>
              <strong>4. Independent verification required.</strong> The only way to be certain of
              peptide identity and purity is to send a sample to an independent, accredited
              analytical laboratory for testing.
            </p>
            <p>
              <strong>5. Research use only.</strong> Most peptides discussed are not approved by the
              FDA for human consumption or therapeutic use. They are sold for laboratory research
              purposes only.
            </p>
          </div>
        </div>
      </section>

      <MedicalDisclaimer />
    </div>
  );
}

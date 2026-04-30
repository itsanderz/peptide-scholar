"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";

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

/* ── Types ─────────────────────────────────────────────────────────────── */
type Step = "intro" | "foundation" | "contraindications" | "results";

type FoundationAnswer = 0 | 1 | 2;

interface FoundationQuestion {
  key: string;
  label: string;
  description: string;
  options: { value: FoundationAnswer; label: string }[];
}

interface Contraindication {
  key: string;
  question: string;
  severity: "stop" | "strong" | "caution";
  explanation: string;
}

/* ── Data ──────────────────────────────────────────────────────────────── */
const FOUNDATION_QUESTIONS: FoundationQuestion[] = [
  {
    key: "sleep",
    label: "Sleep",
    description: "Do you consistently get 7–8 hours of quality sleep per night?",
    options: [
      { value: 0, label: "No — I regularly get <6 hours or poor quality sleep" },
      { value: 1, label: "Sometimes — 6–7 hours, inconsistent quality" },
      { value: 2, label: "Yes — 7–8 hours, wake rested most nights" },
    ],
  },
  {
    key: "nutrition",
    label: "Nutrition",
    description: "Do you eat adequate protein (0.7g+/lb bodyweight) and mostly whole foods?",
    options: [
      { value: 0, label: "No — I rarely track macros or eat processed foods often" },
      { value: 1, label: "Sometimes — I try but am inconsistent" },
      { value: 2, label: "Yes — I hit protein targets and prioritize whole foods" },
    ],
  },
  {
    key: "training",
    label: "Training",
    description: "Do you resistance train 3 or more times per week?",
    options: [
      { value: 0, label: "No — I train <2×/week or not at all" },
      { value: 1, label: "Sometimes — 2×/week or inconsistent schedule" },
      { value: 2, label: "Yes — 3+ structured sessions per week" },
    ],
  },
  {
    key: "stress",
    label: "Stress Management",
    description: "Is your chronic stress well-managed on a day-to-day basis?",
    options: [
      { value: 0, label: "No — I feel overwhelmed, anxious, or burned out frequently" },
      { value: 1, label: "Sometimes — Stress spikes but I have some coping tools" },
      { value: 2, label: "Yes — I have consistent practices (mindfulness, boundaries, etc.)" },
    ],
  },
  {
    key: "health",
    label: "Health Monitoring",
    description: "Have you had comprehensive bloodwork in the past 12 months?",
    options: [
      { value: 0, label: "No — It has been >1 year or I have never had a full panel" },
      { value: 1, label: "Partial — Basic workup but missing hormones / metabolic markers" },
      { value: 2, label: "Yes — Full panel including hormones, lipids, metabolic markers" },
    ],
  },
];

const CONTRAINDICATIONS: Contraindication[] = [
  {
    key: "under25",
    question: "Are you under 25 years old?",
    severity: "strong",
    explanation:
      "The HPTA (hypothalamic-pituitary-testicular axis) is still maturing. Natural optimization — sleep, training, nutrition — will yield far greater results than peptides at this age.",
  },
  {
    key: "over65",
    question: "Are you over 65 years old?",
    severity: "caution",
    explanation:
      "Polypharmacy risk increases with age. Drug interactions and altered pharmacokinetics mean peptide use should only proceed under direct medical supervision with regular monitoring.",
  },
  {
    key: "autoimmune",
    question: "Do you have a diagnosed autoimmune condition?",
    severity: "caution",
    explanation:
      "Some peptides modulate immune function. Effects can be unpredictable in autoimmune states. Specialist consultation is strongly recommended before use.",
  },
  {
    key: "psychiatric",
    question: "Are you currently on prescription psychiatric medication?",
    severity: "caution",
    explanation:
      "Peptides that cross the blood-brain barrier or modulate neurotransmitters may interact with psychiatric medications. Coordinate with your prescribing physician.",
  },
  {
    key: "pregnant",
    question: "Are you pregnant or trying to conceive?",
    severity: "stop",
    explanation:
      "There is no established safety data for peptide use during pregnancy or conception. Do not use peptides during this period.",
  },
  {
    key: "type1diabetes",
    question: "Do you have Type 1 diabetes?",
    severity: "caution",
    explanation:
      "Growth-hormone-stimulating peptides can alter insulin sensitivity and glucose disposal. Close endocrinological supervision and glucose monitoring are essential.",
  },
  {
    key: "cancer",
    question: "Do you have a history of cancer?",
    severity: "caution",
    explanation:
      "Growth-hormone-releasing peptides may raise IGF-1, which could theoretically influence cancer biology. Avoid GH-stimulating peptides unless cleared by your oncologist.",
  },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */
function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ── Sub-Components ────────────────────────────────────────────────────── */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs font-semibold mb-1.5" style={{ color: C.muted }}>
        <span>Progress</span>
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E8F0" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: C.teal }}
        />
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={classNames("rounded-xl border p-5 md:p-6", className)}
      style={{ backgroundColor: C.surface, borderColor: C.border }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      style={{ backgroundColor: C.teal }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl px-4 py-2 text-sm font-semibold border transition-colors cursor-pointer"
      style={{ backgroundColor: C.surface, borderColor: C.border, color: C.navy }}
    >
      {children}
    </button>
  );
}

function SeverityBadge({ severity }: { severity: "stop" | "strong" | "caution" }) {
  const config = {
    stop: { bg: "#FEF2F2", color: C.accent, label: "STOP" },
    strong: { bg: "#FFF7ED", color: "#C2410C", label: "Strong Caution" },
    caution: { bg: "#FFFBEB", color: "#92400E", label: "Caution" },
  }[severity];
  return (
    <span
      className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}

/* ── Printable Summary ─────────────────────────────────────────────────── */
function PrintableSummary({
  foundationAnswers,
  contraindicationAnswers,
  foundationScore,
  readiness,
}: {
  foundationAnswers: Record<string, FoundationAnswer>;
  contraindicationAnswers: Record<string, boolean>;
  foundationScore: number;
  readiness: { label: string; color: string };
}) {
  const lines = [
    "═══════════════════════════════════════════════════════════════",
    "           PEPTIDE READINESS ASSESSMENT SUMMARY",
    "═══════════════════════════════════════════════════════════════",
    "",
    `Generated: ${new Date().toLocaleDateString()}`,
    "",
    "───────────────────────────────────────────────────────────────",
    "  FOUNDATION CHECKLIST",
    "───────────────────────────────────────────────────────────────",
    "",
    ...FOUNDATION_QUESTIONS.map((q) => {
      const ans = foundationAnswers[q.key];
      const opt = q.options.find((o) => o.value === ans);
      return `  [${ans ?? "?"}/2] ${q.label}\n      ${opt?.label ?? "Not answered"}`;
    }),
    "",
    `  FOUNDATION SCORE: ${foundationScore} / 10`,
    "",
    "───────────────────────────────────────────────────────────────",
    "  CONTRAINDICATIONS",
    "───────────────────────────────────────────────────────────────",
    "",
    ...CONTRAINDICATIONS.map((c) => {
      const ans = contraindicationAnswers[c.key];
      return `  [${ans ? "YES" : "No"}] ${c.question}\n      ${ans ? c.explanation : "No issue noted."}`;
    }),
    "",
    "───────────────────────────────────────────────────────────────",
    "  READINESS VERDICT",
    "───────────────────────────────────────────────────────────────",
    "",
    `  ${readiness.label.toUpperCase()}`,
    "",
    "═══════════════════════════════════════════════════════════════",
    "DISCLAIMER: This assessment is for educational purposes only.",
    "It does not constitute medical advice. Always consult a qualified",
    "healthcare provider before using peptides.",
    "═══════════════════════════════════════════════════════════════",
  ];

  return lines.join("\n");
}

/* ── Main Page ─────────────────────────────────────────────────────────── */
export default function BeginnerAssessmentPage() {
  const [step, setStep] = useState<Step>("intro");
  const [foundationAnswers, setFoundationAnswers] = useState<Record<string, FoundationAnswer>>({});
  const [contraindicationAnswers, setContraindicationAnswers] = useState<Record<string, boolean>>({});
  const [showPrintable, setShowPrintable] = useState(false);
  const printableRef = useRef<HTMLTextAreaElement>(null);

  const foundationScore = useMemo(() => {
    return Object.values(foundationAnswers).reduce<number>((sum, v) => sum + (v ?? 0), 0);
  }, [foundationAnswers]);

  const activeFlags = useMemo(() => {
    return CONTRAINDICATIONS.filter((c) => contraindicationAnswers[c.key]);
  }, [contraindicationAnswers]);

  const hasStopFlag = activeFlags.some((f) => f.severity === "stop");
  const hasStrongFlag = activeFlags.some((f) => f.severity === "strong");

  const readiness = useMemo(() => {
    if (hasStopFlag) return { label: "Not Ready", color: C.accent };
    if (foundationScore < 6) return { label: "Not Ready", color: C.accent };

    const score = foundationScore;
    let label: string;
    let color: string;

    if (score >= 9 && activeFlags.length === 0) {
      label = "Proceed";
      color = C.success;
    } else if (score >= 9 && activeFlags.length > 0) {
      label = "Ready with Guidance";
      color = C.teal;
    } else if (score >= 6 && activeFlags.length === 0) {
      label = "Caution";
      color = C.warning;
    } else {
      label = "Caution";
      color = C.warning;
    }

    if (hasStrongFlag && label === "Proceed") {
      label = "Ready with Guidance";
      color = C.teal;
    }
    if (hasStrongFlag && label === "Caution") {
      label = "Not Ready";
      color = C.accent;
    }

    return { label, color };
  }, [foundationScore, activeFlags, hasStopFlag, hasStrongFlag]);

  const foundationComplete =
    FOUNDATION_QUESTIONS.every((q) => typeof foundationAnswers[q.key] === "number");

  const contraindicationsComplete =
    CONTRAINDICATIONS.every((q) => typeof contraindicationAnswers[q.key] === "boolean");

  const summaryText = useMemo(
    () =>
      PrintableSummary({
        foundationAnswers,
        contraindicationAnswers,
        foundationScore,
        readiness,
      }),
    [foundationAnswers, contraindicationAnswers, foundationScore, readiness]
  );

  const handleCopy = async () => {
    if (printableRef.current) {
      printableRef.current.select();
      await navigator.clipboard.writeText(printableRef.current.value);
    }
  };

  /* ── Render: Intro ─────────────────────────────────────────────────── */
  if (step === "intro") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: C.bg }}>
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
          <Card>
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                style={{ backgroundColor: `${C.teal}14` }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Are You Ready for Peptides?
              </h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: C.muted }}>
                Peptides are not a shortcut. Before considering research compounds, your foundation — sleep,
                nutrition, training, and stress management — must be solid. This assessment helps you
                self-evaluate honestly and safely.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                { icon: "🛌", title: "Sleep", text: "7–8 hours of quality rest" },
                { icon: "🥩", title: "Nutrition", text: "Adequate protein and whole foods" },
                { icon: "🏋️", title: "Training", text: "Consistent resistance exercise" },
                { icon: "🧘", title: "Stress", text: "Managed chronic load" },
                { icon: "🩺", title: "Health", text: "Recent bloodwork and monitoring" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-lg px-4 py-3"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <span className="text-sm font-bold" style={{ color: C.navy }}>
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-lg p-4 mb-8 text-xs leading-relaxed"
              style={{ backgroundColor: "#FFFBEB", border: `1px solid ${C.warning}33`, color: "#92400E" }}
            >
              <strong>Disclaimer:</strong> This assessment is for educational purposes only. It does not
              constitute medical advice. Always consult a qualified healthcare provider before making decisions
              about peptide use.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <PrimaryButton onClick={() => setStep("foundation")}>Begin Assessment</PrimaryButton>
              <Link href="/tools">
                <SecondaryButton>Back to Tools</SecondaryButton>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  /* ── Render: Foundation ────────────────────────────────────────────── */
  if (step === "foundation") {
    const answeredCount = Object.keys(foundationAnswers).length;

    return (
      <div className="min-h-screen" style={{ backgroundColor: C.bg }}>
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
          <ProgressBar current={answeredCount} total={FOUNDATION_QUESTIONS.length} />

          <Card>
            <h2
              className="text-xl md:text-2xl font-bold mb-1"
              style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              Foundation Checklist
            </h2>
            <p className="text-sm mb-6" style={{ color: C.muted }}>
              Be honest. Each item is scored 0–2. A strong foundation is required before peptides can provide
              meaningful benefit.
            </p>

            <div className="space-y-6">
              {FOUNDATION_QUESTIONS.map((q) => (
                <div
                  key={q.key}
                  className="rounded-xl p-4 md:p-5"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span
                      className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${C.teal}14`, color: C.teal }}
                    >
                      {q.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-3" style={{ color: C.navy }}>
                    {q.description}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const selected = foundationAnswers[q.key] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setFoundationAnswers((prev) => ({ ...prev, [q.key]: opt.value }))
                          }
                          className={classNames(
                            "w-full text-left rounded-lg px-4 py-3 text-sm transition-all duration-150 border cursor-pointer",
                            selected && "font-semibold shadow-sm"
                          )}
                          style={{
                            backgroundColor: selected ? `${C.teal}08` : C.surface,
                            borderColor: selected ? C.teal : C.border,
                            color: selected ? C.navy : C.muted,
                          }}
                        >
                          <span
                            className="inline-block w-5 h-5 rounded-full border mr-3 align-middle flex-shrink-0"
                            style={{
                              borderColor: selected ? C.teal : C.border,
                              backgroundColor: selected ? C.teal : "transparent",
                            }}
                          />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Foundation interim feedback */}
            {foundationComplete && (
              <div className="mt-6">
                {foundationScore < 6 && (
                  <div
                    className="rounded-lg p-4 text-sm font-medium"
                    style={{ backgroundColor: "#FEF2F2", border: `1px solid ${C.accent}`, color: C.accent }}
                  >
                    <strong>Foundation needs work.</strong> Peptides will not fix a broken foundation. Prioritize
                    sleep, nutrition, training, and stress management first.
                  </div>
                )}
                {foundationScore >= 6 && foundationScore <= 8 && (
                  <div
                    className="rounded-lg p-4 text-sm font-medium"
                    style={{ backgroundColor: "#FFFBEB", border: `1px solid ${C.warning}`, color: "#92400E" }}
                  >
                    <strong>Okay foundation.</strong> You have some habits in place, but there is room to optimize
                    further before adding peptides.
                  </div>
                )}
                {foundationScore >= 9 && (
                  <div
                    className="rounded-lg p-4 text-sm font-medium"
                    style={{
                      backgroundColor: `${C.success}08`,
                      border: `1px solid ${C.success}`,
                      color: C.success,
                    }}
                  >
                    <strong>Solid foundation.</strong> Your basics are in place. Continue to the contraindication
                    screening.
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
              <SecondaryButton onClick={() => setStep("intro")}>Back</SecondaryButton>
              <PrimaryButton onClick={() => setStep("contraindications")} disabled={!foundationComplete}>
                Continue to Contraindications
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  /* ── Render: Contraindications ─────────────────────────────────────── */
  if (step === "contraindications") {
    const answeredCount = Object.keys(contraindicationAnswers).length;

    return (
      <div className="min-h-screen" style={{ backgroundColor: C.bg }}>
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
          <ProgressBar current={answeredCount + FOUNDATION_QUESTIONS.length} total={FOUNDATION_QUESTIONS.length + CONTRAINDICATIONS.length} />

          <Card>
            <h2
              className="text-xl md:text-2xl font-bold mb-1"
              style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              Contraindication Checker
            </h2>
            <p className="text-sm mb-6" style={{ color: C.muted }}>
              Answer each question honestly. Any &quot;yes&quot; will trigger a specific warning tailored to your situation.
            </p>

            <div className="space-y-4">
              {CONTRAINDICATIONS.map((c) => {
                const ans = contraindicationAnswers[c.key];
                return (
                  <div
                    key={c.key}
                    className="rounded-xl p-4 md:p-5"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="text-sm font-semibold" style={{ color: C.navy }}>
                        {c.question}
                      </p>
                      <SeverityBadge severity={c.severity} />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setContraindicationAnswers((prev) => ({ ...prev, [c.key]: false }))}
                        className={classNames(
                          "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold border transition-all cursor-pointer",
                          ans === false && "shadow-sm"
                        )}
                        style={{
                          backgroundColor: ans === false ? `${C.success}08` : C.surface,
                          borderColor: ans === false ? C.success : C.border,
                          color: ans === false ? C.success : C.muted,
                        }}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => setContraindicationAnswers((prev) => ({ ...prev, [c.key]: true }))}
                        className={classNames(
                          "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold border transition-all cursor-pointer",
                          ans === true && "shadow-sm"
                        )}
                        style={{
                          backgroundColor: ans === true ? `${C.accent}08` : C.surface,
                          borderColor: ans === true ? C.accent : C.border,
                          color: ans === true ? C.accent : C.muted,
                        }}
                      >
                        Yes
                      </button>
                    </div>

                    {ans === true && (
                      <div
                        className="mt-3 rounded-lg p-3 text-xs leading-relaxed"
                        style={{
                          backgroundColor: c.severity === "stop" ? "#FEF2F2" : "#FFFBEB",
                          border: `1px solid ${c.severity === "stop" ? C.accent : C.warning}`,
                          color: c.severity === "stop" ? C.accent : "#92400E",
                        }}
                      >
                        {c.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
              <SecondaryButton onClick={() => setStep("foundation")}>Back</SecondaryButton>
              <PrimaryButton onClick={() => setStep("results")} disabled={!contraindicationsComplete}>
                See Results
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  /* ── Render: Results ───────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg }}>
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <Card>
          <div className="text-center mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              Your Readiness Score
            </h2>
            <p className="text-sm" style={{ color: C.muted }}>
              Based on your foundation and contraindication screening.
            </p>
          </div>

          {/* Score circle */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-36 h-36 rounded-full flex flex-col items-center justify-center border-4 mb-4"
              style={{
                borderColor: readiness.color,
                backgroundColor: `${readiness.color}08`,
              }}
            >
              <span className="text-3xl font-extrabold" style={{ color: readiness.color }}>
                {foundationScore}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.muted }}>
                / 10
              </span>
            </div>
            <span
              className="text-xl font-bold uppercase tracking-wide"
              style={{ color: readiness.color }}
            >
              {readiness.label}
            </span>
          </div>

          {/* Flags summary */}
          {activeFlags.length > 0 && (
            <div className="mb-6 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: C.navy }}>
                Active Warnings
              </h3>
              {activeFlags.map((f) => (
                <div
                  key={f.key}
                  className="rounded-lg p-3 text-sm"
                  style={{
                    backgroundColor: f.severity === "stop" ? "#FEF2F2" : "#FFFBEB",
                    border: `1px solid ${f.severity === "stop" ? C.accent : C.warning}`,
                    color: f.severity === "stop" ? C.accent : "#92400E",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <SeverityBadge severity={f.severity} />
                    <span className="font-semibold">{f.question}</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">{f.explanation}</p>
                </div>
              ))}
            </div>
          )}

          {/* Personalized next steps */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: C.navy }}>
              Recommended Next Steps
            </h3>
            <div className="rounded-xl p-4 md:p-5" style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
              {readiness.label === "Not Ready" && (
                <ul className="space-y-2 text-sm" style={{ color: C.muted }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.accent }}>•</span>
                    <span>
                      <strong>Address your foundation first.</strong> Peptides amplify what is already there — they
                      do not create progress from nothing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.accent }}>•</span>
                    <span>
                      Focus on sleep hygiene, protein intake, and a consistent training block for the next 8–12
                      weeks before reassessing.
                    </span>
                  </li>
                  {hasStopFlag && (
                    <li className="flex items-start gap-2">
                      <span style={{ color: C.accent }}>•</span>
                      <span>
                        <strong>Do not proceed with peptides</strong> while the STOP-level condition is active.
                        Consult a physician.
                      </span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.accent }}>•</span>
                    <span>Re-take this assessment after you have made measurable improvements.</span>
                  </li>
                </ul>
              )}

              {readiness.label === "Caution" && (
                <ul className="space-y-2 text-sm" style={{ color: C.muted }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.warning }}>•</span>
                    <span>
                      <strong>Optimize one or two foundation areas</strong> before introducing peptides. You are
                      close, but small gaps become large liabilities under chemical assistance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.warning }}>•</span>
                    <span>
                      Get comprehensive bloodwork if you have not already — hormones, lipids, fasting insulin,
                      and CBC.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.warning }}>•</span>
                    <span>Consider working with a qualified clinician who has peptide experience.</span>
                  </li>
                </ul>
              )}

              {readiness.label === "Ready with Guidance" && (
                <ul className="space-y-2 text-sm" style={{ color: C.muted }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.teal }}>•</span>
                    <span>
                      <strong>Your foundation is solid,</strong> but contraindications require medical oversight.
                      Proceed only with a knowledgeable clinician.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.teal }}>•</span>
                    <span>
                      Print or copy the summary below and bring it to your consultation. It will save time and
                      improve the quality of guidance you receive.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.teal }}>•</span>
                    <span>
                      Start with the lowest effective dose, track biomarkers, and reassess every 4–6 weeks.
                    </span>
                  </li>
                </ul>
              )}

              {readiness.label === "Proceed" && (
                <ul className="space-y-2 text-sm" style={{ color: C.muted }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.success }}>•</span>
                    <span>
                      <strong>You have a strong foundation and no flagged contraindications.</strong> You are in
                      the best position to benefit from peptides responsibly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.success }}>•</span>
                    <span>
                      Continue with the Stack Generator to explore evidence-based options matched to your goals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: C.success }}>•</span>
                    <span>
                      Still consult a clinician before starting — even optimal candidates benefit from
                      professional monitoring.
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            {(readiness.label === "Ready with Guidance" || readiness.label === "Proceed") && (
              <Link href="/tools/stack-generator">
                <PrimaryButton>Go to Stack Generator</PrimaryButton>
              </Link>
            )}
            {(readiness.label === "Not Ready" || readiness.label === "Caution") && (
              <Link href="/guides">
                <PrimaryButton>Browse Guides</PrimaryButton>
              </Link>
            )}
            <SecondaryButton onClick={() => setShowPrintable((v) => !v)}>
              {showPrintable ? "Hide Summary" : "Download Foundation Checklist"}
            </SecondaryButton>
          </div>

          {/* Printable summary */}
          {showPrintable && (
            <div className="mb-6">
              <div
                className="rounded-xl border p-4"
                style={{ backgroundColor: C.surface, borderColor: C.border }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.navy }}>
                    Printable Summary
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer"
                    style={{ borderColor: C.border, color: C.teal }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy to Clipboard
                  </button>
                </div>
                <textarea
                  ref={printableRef}
                  readOnly
                  value={summaryText}
                  className="w-full h-96 rounded-lg p-3 text-xs font-mono leading-relaxed resize-y"
                  style={{
                    backgroundColor: C.bg,
                    border: `1px solid ${C.border}`,
                    color: C.navy,
                    outline: "none",
                  }}
                />
                <p className="text-[10px] mt-2" style={{ color: C.muted }}>
                  Copy the text above and paste into any document, or print this page. Bring it to your healthcare
                  provider.
                </p>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div
            className="rounded-lg p-4 text-xs leading-relaxed text-center"
            style={{ backgroundColor: "#FFFBEB", border: `1px solid ${C.warning}33`, color: "#92400E" }}
          >
            <strong>Medical Disclaimer:</strong> This assessment is for educational purposes only. It does not
            constitute medical advice, diagnosis, or treatment recommendation. Always consult a qualified
            healthcare provider before using peptides or making changes to your health regimen.
          </div>

          <div className="flex justify-center mt-6">
            <SecondaryButton onClick={() => setStep("intro")}>Restart Assessment</SecondaryButton>
          </div>
        </Card>
      </div>
    </div>
  );
}

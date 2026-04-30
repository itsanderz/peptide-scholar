"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BreadcrumbNav, MedicalDisclaimer } from "@/components";

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
const PEPTIDES = [
  "BPC-157",
  "TB-500",
  "GHK-Cu",
  "CJC-1295",
  "Ipamorelin",
  "Semaglutide",
  "Tirzepatide",
  "Retatrutide",
  "Semax",
  "Selank",
  "Tesamorelin",
  "MOTS-c",
  "SS-31",
  "Epithalon",
  "Bremelanotide",
];

const CATEGORIES = [
  {
    id: "injection-site",
    label: "Injection site reaction",
    examples: "Redness, pain, lump",
  },
  {
    id: "gi",
    label: "Gastrointestinal",
    examples: "Nausea, diarrhea, constipation, cramping",
  },
  {
    id: "cardiovascular",
    label: "Cardiovascular",
    examples: "Elevated heart rate, blood pressure changes, chest discomfort",
  },
  {
    id: "neuro-psych",
    label: "Neurological / Psychological",
    examples: "Anxiety, depression, brain fog, insomnia, overstimulation",
  },
  {
    id: "dermatological",
    label: "Dermatological",
    examples: "Rash, hives, flushing, acne, itching",
  },
  {
    id: "general",
    label: "General",
    examples: "Fatigue, fever, chills, headache, swelling",
  },
  {
    id: "allergic",
    label: "Allergic reaction",
    examples: "Throat swelling, difficulty breathing, severe hives",
  },
];

const TIMING_OPTIONS = [
  { id: "hours", label: "Hours after injection" },
  { id: "days", label: "Days after starting" },
  { id: "dose-increase", label: "After a dose increase" },
  { id: "ongoing", label: "Ongoing / chronic" },
];

const TREND_OPTIONS = [
  { id: "better", label: "Getting better" },
  { id: "stable", label: "Stable" },
  { id: "worse", label: "Getting worse" },
];

type TriageLevel = "green" | "yellow" | "orange" | "red";

interface TriageResult {
  level: TriageLevel;
  headline: string;
  action: string;
  peptideNotes: string[];
}

/* ── Helpers ───────────────────────────────────────────────────────────── */
function computeTriage(
  peptides: string[],
  categoryId: string,
  severity: number,
  timing: string,
  trend: string
): TriageResult {
  const notes: string[] = [];

  // Peptide-specific context
  const glps = peptides.filter((p) =>
    ["Semaglutide", "Tirzepatide", "Retatrutide"].includes(p)
  );
  const hasGhkCu = peptides.includes("GHK-Cu");
  const hasBpcTb = peptides.some((p) => ["BPC-157", "TB-500"].includes(p));
  const hasGhSecretagogues = peptides.some((p) =>
    ["CJC-1295", "Ipamorelin", "Tesamorelin"].includes(p)
  );
  const hasBremelanotide = peptides.includes("Bremelanotide");
  const hasSemaxSelank = peptides.some((p) => ["Semax", "Selank"].includes(p));

  if (glps.length > 0) {
    if (categoryId === "gi") {
      notes.push(
        `${glps.join(" / ")}: Nausea, diarrhea, and constipation are very common in the first 2–4 weeks and often improve over time. Severe or persistent GI symptoms beyond 2 weeks warrant attention.`
      );
    }
    if (categoryId === "cardiovascular") {
      notes.push(
        `${glps.join(" / ")}: Mild heart rate increases are documented. Chest discomfort is not a typical GLP-1 effect and should be evaluated promptly.`
      );
    }
  }

  if (hasGhkCu) {
    if (categoryId === "injection-site") {
      notes.push(
        "GHK-Cu: A brief burning or stinging sensation at the injection site is common due to copper content. Mild redness is usually normal. A persistent lump >3 days or spreading rash is not typical."
      );
    }
    if (categoryId === "dermatological") {
      notes.push(
        "GHK-Cu: Widespread rash or hives may indicate sensitivity or Cu/Zn imbalance rather than a normal mechanism effect."
      );
    }
  }

  if (hasBpcTb) {
    if (categoryId === "injection-site") {
      notes.push(
        "BPC-157 / TB-500: Mild injection site soreness or small bump for 24–48 hours is common. Prolonged lumps or increasing redness merit closer monitoring."
      );
    }
  }

  if (hasGhSecretagogues) {
    if (categoryId === "general") {
      notes.push(
        "CJC-1295 / Ipamorelin / Tesamorelin: Mild headache, flushing, and transient water retention are common early effects. Severe headaches or persistent swelling are not typical."
      );
    }
    if (categoryId === "dermatological") {
      notes.push(
        "GH secretagogues: Flushing is a known mechanism effect. Widespread hives or itching are less typical and may suggest impurity or allergy."
      );
    }
  }

  if (hasBremelanotide) {
    if (categoryId === "gi" || categoryId === "dermatological") {
      notes.push(
        "Bremelanotide: Nausea and flushing are expected mechanism effects in many users. Severe vomiting or sustained flushing are not typical."
      );
    }
  }

  if (hasSemaxSelank) {
    if (categoryId === "neuro-psych") {
      notes.push(
        "Semax / Selank: Mild stimulation or relaxation is expected. Significant anxiety, agitation, or mood changes are atypical and warrant re-evaluation."
      );
    }
  }

  // Triage logic
  if (categoryId === "allergic" || severity === 5) {
    return {
      level: "red",
      headline: "Seek Emergency Care",
      action:
        "Call 911 or go to the ER immediately. Do not take Benadryl and wait. Do not administer another dose.",
      peptideNotes: notes,
    };
  }

  if (categoryId === "cardiovascular" && severity >= 4) {
    return {
      level: "red",
      headline: "Seek Emergency Care",
      action:
        "Significant chest discomfort or severe cardiovascular symptoms require immediate emergency evaluation.",
      peptideNotes: notes,
    };
  }

  if (severity === 4) {
    return {
      level: "orange",
      headline: "Consider Stopping / Seek Guidance",
      action:
        "Stop peptides immediately. Consult your healthcare provider before resuming. Document everything including doses, batch numbers, and symptom timeline.",
      peptideNotes: notes,
    };
  }

  if (
    (severity === 3 && categoryId === "cardiovascular") ||
    (severity === 3 && categoryId === "neuro-psych" && trend === "worse") ||
    (severity === 3 && timing === "ongoing" && trend !== "better")
  ) {
    return {
      level: "orange",
      headline: "Consider Stopping / Seek Guidance",
      action:
        "Stop peptides and seek professional guidance before continuing. Persistent or worsening moderate symptoms can indicate a serious issue.",
      peptideNotes: notes,
    };
  }

  if (severity === 3) {
    return {
      level: "yellow",
      headline: "Caution / Monitor Closely",
      action:
        "Reduce the dose if possible, consider stopping one peptide at a time to isolate the cause, and consult your provider if symptoms persist beyond 1 week.",
      peptideNotes: notes,
    };
  }

  if (severity <= 2 && trend === "worse") {
    return {
      level: "yellow",
      headline: "Caution / Monitor Closely",
      action:
        "Even mild symptoms that are worsening deserve closer attention. Reduce dose or pause and reassess within 48–72 hours.",
      peptideNotes: notes,
    };
  }

  // Default for low severity
  return {
    level: "green",
    headline: "Likely Normal / Expected",
    action:
      "Monitor the symptom, manage it symptomatically, and continue if tolerable. Most early peptide effects are transient and improve within days to a week.",
    peptideNotes: notes,
  };
}

function severityColor(severity: number): string {
  if (severity <= 2) return C.success;
  if (severity === 3) return C.warning;
  if (severity === 4) return "#E8590C";
  return C.accent;
}

function triageStyles(level: TriageLevel) {
  switch (level) {
    case "green":
      return {
        bg: "#F0FDF4",
        border: "#BBF7D0",
        badgeBg: C.success,
        badgeText: "#fff",
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ),
      };
    case "yellow":
      return {
        bg: "#FFFBEB",
        border: "#FDE68A",
        badgeBg: C.warning,
        badgeText: "#fff",
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.warning} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      };
    case "orange":
      return {
        bg: "#FFF7ED",
        border: "#FDBA74",
        badgeBg: "#E8590C",
        badgeText: "#fff",
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8590C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        ),
      };
    case "red":
      return {
        bg: "#FEF2F2",
        border: "#FECACA",
        badgeBg: "#DC2626",
        badgeText: "#fff",
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      };
  }
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function SideEffectTriagePage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "en";
  const prefix = locale === "en" ? "" : `/${locale}`;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPeptides, setSelectedPeptides] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [severity, setSeverity] = useState<number>(1);
  const [timing, setTiming] = useState<string>("");
  const [trend, setTrend] = useState<string>("");

  const togglePeptide = (p: string) => {
    setSelectedPeptides((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const canProceedStep1 = selectedPeptides.length > 0;
  const canProceedStep2 = category !== "";
  const canProceedStep3 = timing !== "" && trend !== "";

  const result =
    step === 4
      ? computeTriage(selectedPeptides, category, severity, timing, trend)
      : null;

  const resultStyle = result ? triageStyles(result.level) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Tools", href: `${prefix}/tools` },
          { label: "Side Effect Triage", href: `${prefix}/tools/side-effect-triage` },
        ]}
      />

      {/* ── Title ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            color: C.navy,
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Is This Normal? Side Effect Triage
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
          An interactive tool to help peptide users triage symptoms by severity, timing, and
          known peptide effects. Not a substitute for professional medical advice.
        </p>
      </div>

      {/* ── Critical Disclaimer ───────────────────────────────────── */}
      <div
        className="rounded-xl p-4 mb-8 flex gap-3"
        style={{
          backgroundColor: "#FEF2F2",
          border: "1px solid #FECACA",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 mt-0.5"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <p className="text-sm" style={{ color: "#991B1B" }}>
          <strong>Emergency disclaimer:</strong> If you are experiencing difficulty breathing,
          throat swelling, severe chest pain, or signs of anaphylaxis, call 911 or go to the
          nearest emergency department immediately. This tool is for educational triage only
          and does not provide medical diagnosis or treatment advice.
        </p>
      </div>

      {/* ── Introduction ──────────────────────────────────────────── */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
      >
        <h2
          className="text-xl font-bold mb-3"
          style={{
            color: C.navy,
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Why am I feeling this?
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Side effects during peptide use can come from four main sources:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-3">
          <li>
            <strong>The peptide mechanism itself</strong> — predictable, often dose-dependent,
            and usually consistent with known pharmacology (e.g., GLP-1 nausea, GH-secretagogue
            flushing).
          </li>
          <li>
            <strong>Impurities or endotoxins</strong> — can cause fever, chills, malaise, or
            disproportionate injection site inflammation, especially within hours of a new
            vial or batch.
          </li>
          <li>
            <strong>Incorrect dosing or administration</strong> — too high a dose, too frequent
            injections, or poor technique can magnify side effects.
          </li>
          <li>
            <strong>Drug or supplement interactions</strong> — peptides may interact with
            prescriptions, OTC meds, or other research compounds.
          </li>
        </ul>
        <p className="text-sm text-gray-700 leading-relaxed">
          This tool helps you categorize your symptom, assess severity and timing, and receive
          a triage recommendation. Always share unexpected symptoms with a qualified healthcare
          provider.
        </p>
      </div>

      {/* ── Stepper ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: step >= s ? C.teal : C.border,
                color: step >= s ? "#fff" : C.muted,
              }}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className="w-8 h-0.5"
                style={{ backgroundColor: step > s ? C.teal : C.border }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Peptides ──────────────────────────────────────── */}
      {step === 1 && (
        <div className="mb-8">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Step 1: Which peptide(s) are you using?
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Select all that apply. You can select multiple if you are stacking peptides.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {PEPTIDES.map((p) => {
              const active = selectedPeptides.includes(p);
              return (
                <button
                  key={p}
                  onClick={() => togglePeptide(p)}
                  className="rounded-xl border p-4 text-left transition-all hover:shadow-md"
                  style={{
                    backgroundColor: active ? "#F0F9FF" : C.surface,
                    borderColor: active ? C.teal : C.border,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded border flex items-center justify-center"
                      style={{
                        backgroundColor: active ? C.teal : "transparent",
                        borderColor: active ? C.teal : C.border,
                      }}
                    >
                      {active && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: C.navy }}>
                      {p}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!canProceedStep1}
            className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: C.teal }}
          >
            Continue
          </button>
        </div>
      )}

      {/* ── Step 2: Symptom Category ──────────────────────────────── */}
      {step === 2 && (
        <div className="mb-8">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Step 2: What type of symptom are you experiencing?
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className="rounded-xl border p-4 text-left transition-all hover:shadow-md"
                  style={{
                    backgroundColor: active ? "#F0F9FF" : C.surface,
                    borderColor: active ? C.teal : C.border,
                  }}
                >
                  <div className="text-sm font-bold mb-1" style={{ color: C.navy }}>
                    {c.label}
                  </div>
                  <div className="text-xs" style={{ color: C.muted }}>
                    {c.examples}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold border"
              style={{ backgroundColor: C.surface, color: C.navy, borderColor: C.border }}
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!canProceedStep2}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: C.teal }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Severity & Timing ─────────────────────────────── */}
      {step === 3 && (
        <div className="mb-8">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Step 3: Severity & Timing
          </h2>

          {/* Timing */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3" style={{ color: C.navy }}>
              When did it start?
            </label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TIMING_OPTIONS.map((t) => {
                const active = timing === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTiming(t.id)}
                    className="rounded-xl border p-4 text-left transition-all hover:shadow-md"
                    style={{
                      backgroundColor: active ? "#F0F9FF" : C.surface,
                      borderColor: active ? C.teal : C.border,
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: C.navy }}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Severity */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3" style={{ color: C.navy }}>
              How severe is it?{" "}
              <span className="font-normal" style={{ color: C.muted }}>
                (1 = barely noticeable, 5 = incapacitating)
              </span>
            </label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSeverity(s)}
                  className="w-12 h-12 rounded-xl border text-lg font-bold transition-all hover:shadow-md"
                  style={{
                    backgroundColor: severity === s ? severityColor(s) : C.surface,
                    borderColor: severity === s ? severityColor(s) : C.border,
                    color: severity === s ? "#fff" : C.navy,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs font-medium" style={{ color: severityColor(severity) }}>
              {severity === 1 && "Barely noticeable"}
              {severity === 2 && "Mild — noticeable but not limiting"}
              {severity === 3 && "Moderate — somewhat limiting daily activities"}
              {severity === 4 && "Severe — significantly limiting"}
              {severity === 5 && "Incapacitating — unable to function normally"}
            </div>
          </div>

          {/* Trend */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3" style={{ color: C.navy }}>
              Is it getting better, worse, or stable?
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              {TREND_OPTIONS.map((t) => {
                const active = trend === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTrend(t.id)}
                    className="rounded-xl border p-4 text-left transition-all hover:shadow-md"
                    style={{
                      backgroundColor: active ? "#F0F9FF" : C.surface,
                      borderColor: active ? C.teal : C.border,
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: C.navy }}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold border"
              style={{ backgroundColor: C.surface, color: C.navy, borderColor: C.border }}
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!canProceedStep3}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: C.teal }}
            >
              See Triage Result
            </button>
          </div>
        </div>
      )}

      {/* ── Step 4: Result ────────────────────────────────────────── */}
      {step === 4 && result && resultStyle && (
        <div className="mb-10">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Triage Result
          </h2>

          <div
            className="rounded-xl p-6 mb-6"
            style={{
              backgroundColor: resultStyle.bg,
              border: `1px solid ${resultStyle.border}`,
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-0.5">{resultStyle.icon}</div>
              <div className="flex-1">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-2"
                  style={{
                    backgroundColor: resultStyle.badgeBg,
                    color: resultStyle.badgeText,
                  }}
                >
                  {result.level.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold mb-2" style={{ color: C.navy }}>
                  {result.headline}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.navy }}>
                  <strong>Recommended action:</strong> {result.action}
                </p>
              </div>
            </div>

            {result.peptideNotes.length > 0 && (
              <div
                className="rounded-xl p-4 mt-4"
                style={{ backgroundColor: "rgba(255,255,255,0.7)", border: `1px solid ${resultStyle.border}` }}
              >
                <h4 className="text-sm font-bold mb-2" style={{ color: C.navy }}>
                  Peptide-specific context
                </h4>
                <ul className="space-y-2">
                  {result.peptideNotes.map((note, i) => (
                    <li key={i} className="text-sm leading-relaxed" style={{ color: C.navy }}>
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Summary of inputs */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <h4 className="text-sm font-bold mb-2" style={{ color: C.navy }}>
              Your inputs
            </h4>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span style={{ color: C.muted }}>Peptides:</span>{" "}
                <span className="font-medium" style={{ color: C.navy }}>
                  {selectedPeptides.join(", ")}
                </span>
              </div>
              <div>
                <span style={{ color: C.muted }}>Category:</span>{" "}
                <span className="font-medium" style={{ color: C.navy }}>
                  {CATEGORIES.find((c) => c.id === category)?.label}
                </span>
              </div>
              <div>
                <span style={{ color: C.muted }}>Timing:</span>{" "}
                <span className="font-medium" style={{ color: C.navy }}>
                  {TIMING_OPTIONS.find((t) => t.id === timing)?.label}
                </span>
              </div>
              <div>
                <span style={{ color: C.muted }}>Severity:</span>{" "}
                <span className="font-medium" style={{ color: severityColor(severity) }}>
                  {severity}/5
                </span>
              </div>
              <div>
                <span style={{ color: C.muted }}>Trend:</span>{" "}
                <span className="font-medium" style={{ color: C.navy }}>
                  {TREND_OPTIONS.find((t) => t.id === trend)?.label}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(3)}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold border"
              style={{ backgroundColor: C.surface, color: C.navy, borderColor: C.border }}
            >
              Back
            </button>
            <button
              onClick={() => {
                setStep(1);
                setSelectedPeptides([]);
                setCategory("");
                setSeverity(1);
                setTiming("");
                setTrend("");
              }}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: C.teal }}
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      {/* ── Quality vs. Reaction Differentiation ──────────────────── */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            color: C.navy,
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Mechanism vs. Impurity vs. Endotoxin
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div
              className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-3"
              style={{ backgroundColor: "#E6F4F1", color: C.success }}
            >
              Normal Mechanism
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Predictable based on known pharmacology</li>
              <li>Dose-dependent: higher dose = stronger effect</li>
              <li>Consistent across batches from reputable sources</li>
              <li>Often improves after the first 1–2 weeks</li>
              <li>Examples: GLP-1 nausea, GH-secretagogue flushing, GHK-Cu injection sting</li>
            </ul>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div
              className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-3"
              style={{ backgroundColor: "#FFF7ED", color: "#9A3412" }}
            >
              Impurity / Quality Issue
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Unpredictable or inconsistent between doses</li>
              <li>Batch-dependent: one vial fine, next vial problematic</li>
              <li>May include unusual odors, cloudiness, or particulates</li>
              <li>Symptoms do not match known peptide effects</li>
              <li>Examples: unexpected rash, strange taste, unusual fatigue from a new batch</li>
            </ul>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <div
              className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-3"
              style={{ backgroundColor: "#FEF2F2", color: "#991B1B" }}
            >
              Endotoxin / Infection Sign
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Fever, chills, or malaise within hours of injection</li>
              <li>Significant injection site warmth, spreading redness, or pus</li>
              <li>Systemic symptoms out of proportion to dose</li>
              <li>Usually appears shortly after a new vial or reconstitution</li>
              <li>Action: discontinue immediately and seek medical evaluation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── When to Stop Decision Tree ────────────────────────────── */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            color: C.navy,
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          When to Stop Decision Tree
        </h2>
        <div className="space-y-4">
          {/* Green path */}
          <div className="flex items-stretch gap-3">
            <div
              className="rounded-xl p-4 flex-1"
              style={{ backgroundColor: "#F0FDF4", border: `1px solid #BBF7D0` }}
            >
              <div className="text-sm font-bold mb-1" style={{ color: C.success }}>
                Continue + Monitor
              </div>
              <p className="text-sm text-gray-700">
                Severity 1–2 + symptom is typical for your peptide + improving or stable + no
                fever or breathing issues.
              </p>
            </div>
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* Yellow path */}
          <div className="flex items-stretch gap-3">
            <div
              className="rounded-xl p-4 flex-1"
              style={{ backgroundColor: "#FFFBEB", border: `1px solid #FDE68A` }}
            >
              <div className="text-sm font-bold mb-1" style={{ color: C.warning }}>
                Reduce Dose / Pause One / Monitor Closely
              </div>
              <p className="text-sm text-gray-700">
                Severity 3 + typical symptom + not improving after 1 week, OR severity 2 that is
                worsening, OR new rash / lump lasting &gt;3 days.
              </p>
            </div>
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.warning} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* Orange path */}
          <div className="flex items-stretch gap-3">
            <div
              className="rounded-xl p-4 flex-1"
              style={{ backgroundColor: "#FFF7ED", border: `1px solid #FDBA74` }}
            >
              <div className="text-sm font-bold mb-1" style={{ color: "#9A3412" }}>
                Stop & Seek Guidance Before Resuming
              </div>
              <p className="text-sm text-gray-700">
                Severity 4, OR severity 3 with cardiovascular / neuro-psych symptoms, OR any
                symptom that is persistent and worsening after dose reduction.
              </p>
            </div>
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8590C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* Red path */}
          <div className="flex items-stretch gap-3">
            <div
              className="rounded-xl p-4 flex-1"
              style={{ backgroundColor: "#FEF2F2", border: `1px solid #FECACA` }}
            >
              <div className="text-sm font-bold mb-1" style={{ color: "#991B1B" }}>
                Seek Emergency Care Now
              </div>
              <p className="text-sm text-gray-700">
                Severity 5, OR any allergic reaction features (throat swelling, difficulty
                breathing, severe hives), OR severe chest pain / pressure.
              </p>
            </div>
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Extra Disclaimer Block ────────────────────────────────── */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
      >
        <h3
          className="text-lg font-bold mb-3"
          style={{
            color: C.navy,
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Important Limitations
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 leading-relaxed">
          <li>
            This tool is based on commonly reported side effects and does not cover every
            possible reaction or individual sensitivity.
          </li>
          <li>
            Research peptides lack comprehensive FDA safety profiles. Many side effects are
            documented from anecdotal reports and small clinical trials, not large randomized
            controlled studies.
          </li>
          <li>
            The absence of a warning for a specific peptide–symptom pair does not mean the
            combination is safe. New adverse effects are reported continuously.
          </li>
          <li>
            If you are pregnant, breastfeeding, have a chronic medical condition, or take
            prescription medications, consult a healthcare provider before using any peptide.
          </li>
          <li>
            Keep a symptom log with dates, doses, batch numbers, and any other variables. This
            documentation is invaluable for your provider and for identifying batch-related
            issues.
          </li>
        </ul>
      </div>

      {/* ── Related Tools ─────────────────────────────────────────── */}
      <div className="mb-8">
        <h3
          className="text-lg font-bold mb-3"
          style={{
            color: C.navy,
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Related Tools
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${prefix}/tools/interaction-checker`}
            className="rounded-lg px-4 py-2 text-sm font-semibold border transition-colors hover:shadow-sm"
            style={{ backgroundColor: C.surface, color: C.teal, borderColor: C.border }}
          >
            Interaction Checker
          </Link>
          <Link
            href={`${prefix}/tools/side-effects`}
            className="rounded-lg px-4 py-2 text-sm font-semibold border transition-colors hover:shadow-sm"
            style={{ backgroundColor: C.surface, color: C.teal, borderColor: C.border }}
          >
            Side Effect Visualizer
          </Link>
          <Link
            href={`${prefix}/tools/titration-planner`}
            className="rounded-lg px-4 py-2 text-sm font-semibold border transition-colors hover:shadow-sm"
            style={{ backgroundColor: C.surface, color: C.teal, borderColor: C.border }}
          >
            Titration Planner
          </Link>
          <Link
            href={`${prefix}/tools/doctor-export`}
            className="rounded-lg px-4 py-2 text-sm font-semibold border transition-colors hover:shadow-sm"
            style={{ backgroundColor: C.surface, color: C.teal, borderColor: C.border }}
          >
            Doctor Export
          </Link>
        </div>
      </div>

      <MedicalDisclaimer />
    </div>
  );
}

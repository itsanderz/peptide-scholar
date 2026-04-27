"use client";

import { useState, useMemo, useCallback } from "react";
import { trackDoctorExport } from "@/lib/analytics";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

/* ── Constants ─────────────────────────────────────────────────────────── */
const COMMON_SYMPTOMS = [
  "Nausea", "Vomiting", "Diarrhea", "Constipation",
  "Fatigue", "Headache", "Dizziness", "Decreased appetite",
  "Abdominal discomfort", "Bloating", "Injection site reaction",
  "Hair thinning", "Muscle aches", "Insomnia", "Acid reflux",
];

const FREQ_OPTIONS = [
  "Twice daily", "Once daily", "Every other day",
  "3× per week", "Twice weekly", "Once weekly",
  "Every 2 weeks", "Monthly",
];

const UNIT_OPTIONS = ["mcg", "mg", "IU", "mL", "units"];

/* ── Types ─────────────────────────────────────────────────────────────── */
interface MedEntry {
  id: number;
  name: string;
  dose: string;
  unit: string;
  frequency: string;
  startDate: string;
}

/* ── Helpers ───────────────────────────────────────────────────────────── */
let _nextId = 2;

function toInputDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDate(str: string): string {
  if (!str) return "Not specified";
  const d = new Date(str + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function calcDuration(startStr: string): string {
  if (!startStr) return "";
  const start = new Date(startStr + "T12:00:00");
  const days = Math.round((Date.now() - start.getTime()) / 86400000);
  if (days < 0) return "(upcoming)";
  if (days === 0) return "(started today)";
  if (days < 7) return `(${days} day${days !== 1 ? "s" : ""})`;
  const weeks = Math.round(days / 7);
  if (weeks < 8) return `(~${weeks} wk${weeks !== 1 ? "s" : ""})`;
  const months = Math.round(days / 30);
  return `(~${months} mo${months !== 1 ? "s" : ""})`;
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function DoctorExportClient() {
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(toInputDate(new Date()));
  const [medications, setMedications] = useState<MedEntry[]>([
    { id: 1, name: "", dose: "", unit: "mg", frequency: "Once weekly", startDate: "" },
  ]);
  const [checkedSymptoms, setCheckedSymptoms] = useState<Set<string>>(new Set());
  const [symptomNotes, setSymptomNotes] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasTracked, setHasTracked] = useState(false);

  const today = useMemo(() =>
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  []);

  /* ── Medication helpers ──────────────────────────────────────────────── */
  const addMedication = useCallback(() => {
    if (medications.length >= 6) return;
    setMedications((prev) => [
      ...prev,
      { id: _nextId++, name: "", dose: "", unit: "mg", frequency: "Once daily", startDate: "" },
    ]);
  }, [medications.length]);

  const removeMedication = useCallback((id: number) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateMed = useCallback(<K extends keyof MedEntry>(id: number, field: K, value: MedEntry[K]) => {
    setMedications((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  }, []);

  /* ── Symptom helpers ─────────────────────────────────────────────────── */
  const toggleSymptom = useCallback((s: string) => {
    setCheckedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }, []);

  /* ── Derived ─────────────────────────────────────────────────────────── */
  const validMeds = useMemo(() => medications.filter((m) => m.name.trim()), [medications]);

  const allSymptoms = useMemo(() => [
    ...Array.from(checkedSymptoms),
    ...(symptomNotes.trim() ? [symptomNotes.trim()] : []),
  ], [checkedSymptoms, symptomNotes]);

  /* ── Export actions ──────────────────────────────────────────────────── */
  const buildTextSummary = useCallback((): string => {
    const lines: string[] = [
      "MEDICATION SUMMARY FOR HEALTHCARE PROVIDER",
      `Prepared: ${today}`,
    ];
    if (patientName) lines.push(`Patient: ${patientName}`);
    if (appointmentDate) lines.push(`Appointment: ${formatDate(appointmentDate)}`);
    lines.push("");
    lines.push("CURRENT MEDICATIONS / COMPOUNDS");
    if (validMeds.length > 0) {
      validMeds.forEach((m) => {
        const dose = m.dose && m.unit ? ` — ${m.dose} ${m.unit}` : "";
        const freq = `, ${m.frequency}`;
        const started = m.startDate ? `, started ${formatDate(m.startDate)} ${calcDuration(m.startDate)}` : "";
        lines.push(`• ${m.name}${dose}${freq}${started}`);
      });
    } else {
      lines.push("(none entered)");
    }
    if (allSymptoms.length > 0) {
      lines.push("");
      lines.push("SIDE EFFECTS / SYMPTOMS EXPERIENCED");
      lines.push(allSymptoms.join(", "));
    }
    if (additionalNotes.trim()) {
      lines.push("");
      lines.push("NOTES & QUESTIONS");
      lines.push(additionalNotes.trim());
    }
    lines.push("");
    lines.push("---");
    lines.push("Generated with PeptideScholar Doctor Export (peptidescholar.com/tools/doctor-export)");
    lines.push("Not a medical record. For patient-provider communication purposes only.");
    return lines.join("\n");
  }, [today, patientName, appointmentDate, validMeds, allSymptoms, additionalNotes]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildTextSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silent fail — browser may not support clipboard API
    }
    if (!hasTracked) {
      trackDoctorExport("clipboard", validMeds.length);
      setHasTracked(true);
    }
  }, [buildTextSummary, hasTracked, validMeds.length]);

  const handlePrint = useCallback(() => {
    if (!hasTracked) {
      trackDoctorExport("print", validMeds.length);
      setHasTracked(true);
    }
    window.print();
  }, [hasTracked, validMeds.length]);

  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-8">
      {/* ── Input form ─────────────────────────────────────────────── */}
      <div className="print:hidden">
        <h3
          className="text-lg font-bold mb-5"
          style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          Enter Your Information
        </h3>

        {/* Patient info */}
        <div
          className="rounded-xl p-5 mb-4"
          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
        >
          <h4 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
            Patient Info{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-500">Your name</label>
              <input
                type="text"
                placeholder="Leave blank to omit"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm"
                style={{ border: `1px solid ${C.border}`, color: C.navy, outline: "none", backgroundColor: C.surface }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-500">Appointment date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm"
                style={{ border: `1px solid ${C.border}`, color: C.navy, outline: "none", backgroundColor: C.surface }}
              />
            </div>
          </div>
        </div>

        {/* Medications */}
        <div
          className="rounded-xl p-5 mb-4"
          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
        >
          <h4 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
            Medications / Compounds
          </h4>
          <div className="space-y-3">
            {medications.map((med, i) => (
              <div
                key={med.id}
                className="rounded-lg p-3"
                style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400">
                    Medication {i + 1}
                  </span>
                  {medications.length > 1 && (
                    <button
                      onClick={() => removeMedication(med.id)}
                      className="text-xs text-gray-400 hover:opacity-70"
                      style={{ color: "#EF4444" }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Medication / compound name"
                      value={med.name}
                      onChange={(e) => updateMed(med.id, "name", e.target.value)}
                      className="w-full rounded-lg px-3 py-2 text-sm"
                      style={{ border: `1px solid ${C.border}`, color: C.navy, outline: "none", backgroundColor: C.bg }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Dose"
                      value={med.dose}
                      onChange={(e) => updateMed(med.id, "dose", e.target.value)}
                      className="flex-1 rounded-lg px-3 py-2 text-sm min-w-0"
                      style={{ border: `1px solid ${C.border}`, color: C.navy, outline: "none", backgroundColor: C.bg }}
                    />
                    <select
                      value={med.unit}
                      onChange={(e) => updateMed(med.id, "unit", e.target.value)}
                      className="rounded-lg px-2 py-2 text-sm font-semibold flex-shrink-0"
                      style={{ border: `1px solid ${C.border}`, color: C.teal, outline: "none", backgroundColor: C.bg }}
                    >
                      {UNIT_OPTIONS.map((u) => <option key={u}>{u}</option>)}
                    </select>
                  </div>
                  <div>
                    <select
                      value={med.frequency}
                      onChange={(e) => updateMed(med.id, "frequency", e.target.value)}
                      className="w-full rounded-lg px-3 py-2 text-sm"
                      style={{ border: `1px solid ${C.border}`, color: C.navy, outline: "none", backgroundColor: C.bg }}
                    >
                      {FREQ_OPTIONS.map((f) => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Start date (optional)</label>
                    <input
                      type="date"
                      value={med.startDate}
                      onChange={(e) => updateMed(med.id, "startDate", e.target.value)}
                      className="w-full rounded-lg px-3 py-2 text-sm"
                      style={{ border: `1px solid ${C.border}`, color: C.navy, outline: "none", backgroundColor: C.bg }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {medications.length < 6 && (
            <button
              onClick={addMedication}
              className="mt-3 text-sm font-semibold"
              style={{ color: C.teal }}
            >
              + Add another medication
            </button>
          )}
        </div>

        {/* Symptoms */}
        <div
          className="rounded-xl p-5 mb-4"
          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
        >
          <h4 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
            Side Effects / Symptoms{" "}
            <span className="font-normal text-gray-400">(select all that apply)</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {COMMON_SYMPTOMS.map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className="rounded-full px-3 py-1 text-xs font-medium border transition-colors"
                style={{
                  backgroundColor: checkedSymptoms.has(s) ? C.teal : C.surface,
                  borderColor: checkedSymptoms.has(s) ? C.teal : C.border,
                  color: checkedSymptoms.has(s) ? "#FFFFFF" : "#64748B",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Other symptoms or details..."
            value={symptomNotes}
            onChange={(e) => setSymptomNotes(e.target.value)}
            rows={2}
            className="w-full rounded-lg px-3 py-2 text-sm resize-none"
            style={{ border: `1px solid ${C.border}`, color: C.navy, outline: "none", backgroundColor: C.surface }}
          />
        </div>

        {/* Notes */}
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
        >
          <h4 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
            Notes &amp; Questions
          </h4>
          <textarea
            placeholder="Questions for your provider, treatment goals, recent labs, concerns..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={4}
            className="w-full rounded-lg px-3 py-2 text-sm resize-none"
            style={{ border: `1px solid ${C.border}`, color: C.navy, outline: "none", backgroundColor: C.surface }}
          />
        </div>
      </div>

      {/* ── Preview / document ─────────────────────────────────────── */}
      <div>
        {/* Action bar */}
        <div className="flex items-center justify-between mb-5 print:hidden">
          <h3
            className="text-lg font-bold"
            style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            Preview
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="rounded-lg px-4 py-2 text-sm font-semibold border transition-colors"
              style={{
                borderColor: copied ? C.success : C.border,
                color: copied ? C.success : C.navy,
                backgroundColor: C.surface,
              }}
            >
              {copied ? "Copied!" : "Copy text"}
            </button>
            <button
              onClick={handlePrint}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: C.teal }}
            >
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Document */}
        <div
          className="rounded-xl p-6 print:rounded-none print:border-0 print:p-0"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {/* Header */}
          <div className="pb-4 mb-5" style={{ borderBottom: `2px solid ${C.navy}` }}>
            <h2 className="text-xl font-bold mb-0.5" style={{ color: C.navy, fontFamily: "inherit" }}>
              Medication Summary
            </h2>
            <p className="text-xs text-gray-500">
              Prepared for healthcare provider — {today}
            </p>
            {patientName && (
              <p className="text-sm font-bold mt-2" style={{ color: C.navy }}>
                Patient: {patientName}
              </p>
            )}
            {appointmentDate && (
              <p className="text-sm text-gray-600">
                Appointment: {formatDate(appointmentDate)}
              </p>
            )}
          </div>

          {/* Medications table */}
          <div className="mb-5">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: C.navy }}
            >
              Current Medications &amp; Compounds
            </h3>
            {validMeds.length > 0 ? (
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ backgroundColor: C.bg }}>
                    {["Medication", "Dose", "Frequency", "Started"].map((h) => (
                      <th
                        key={h}
                        className="text-left py-1.5 px-2 font-bold border"
                        style={{ color: C.navy, borderColor: C.border }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {validMeds.map((med, i) => (
                    <tr key={med.id} style={{ backgroundColor: i % 2 === 0 ? C.surface : C.bg }}>
                      <td className="py-1.5 px-2 border font-semibold" style={{ color: C.navy, borderColor: C.border }}>
                        {med.name}
                      </td>
                      <td className="py-1.5 px-2 border text-gray-600" style={{ borderColor: C.border }}>
                        {med.dose && med.unit ? `${med.dose} ${med.unit}` : "—"}
                      </td>
                      <td className="py-1.5 px-2 border text-gray-600" style={{ borderColor: C.border }}>
                        {med.frequency}
                      </td>
                      <td className="py-1.5 px-2 border text-gray-600" style={{ borderColor: C.border }}>
                        {med.startDate
                          ? `${formatDate(med.startDate)} ${calcDuration(med.startDate)}`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-xs italic text-gray-400">No medications entered yet.</p>
            )}
          </div>

          {/* Symptoms */}
          {allSymptoms.length > 0 && (
            <div className="mb-5">
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: C.navy }}
              >
                Side Effects / Symptoms Experienced
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {allSymptoms.join(", ")}
              </p>
            </div>
          )}

          {/* Notes */}
          {additionalNotes.trim() && (
            <div className="mb-5">
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: C.navy }}
              >
                Notes &amp; Questions
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {additionalNotes.trim()}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-xs text-gray-400 leading-relaxed">
              This summary was prepared using the PeptideScholar Doctor Export tool and reflects
              information entered by the patient. It is not a medical record, prescription, or
              clinical assessment. It is intended to support communication between the patient and
              their healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

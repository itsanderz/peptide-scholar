"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BRAND_OPTIONS,
  COMPOUND_LABELS,
  DAYS_OF_WEEK,
  PROTOCOL_TEMPLATES,
  SEVERITY_LABELS,
  SYMPTOMS,
  type CompoundSlug,
  type DoseEntry,
  type InjectionSite,
  type ProtocolEntry,
  type ProtocolPeptide,
  type ReminderConfig,
  type SymptomEntry,
  type TrackerData,
  addDoseEntry,
  addProtocol,
  addSymptomEntry,
  buildICS,
  buildProtocolICS,
  clearAllTrackerData,
  daysInProtocol,
  daysUntilWeekday,
  deleteDoseEntry,
  deleteProtocol,
  deleteSymptomEntry,
  estimateMonthlyCost,
  estimateVialDuration,
  generateId,
  getDefaultActiveDays,
  loadTrackerData,
  logProtocolDoses,
  protocolProgress,
  setReminderConfig,
} from "@/lib/tracker-store";
import {
  trackTrackerDoseLog,
  trackTrackerExport,
  trackTrackerReminderSet,
  trackTrackerSymptomLog,
} from "@/lib/analytics";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  bg: "#FAFBFC",
  border: "#D0D7E2",
  surface: "#FFFFFF",
} as const;

type Tab = "dose" | "symptom" | "reminder" | "protocols" | "export";

const TABS: { id: Tab; label: string }[] = [
  { id: "dose", label: "Dose Log" },
  { id: "symptom", label: "Symptoms" },
  { id: "reminder", label: "Reminder" },
  { id: "protocols", label: "Protocols" },
  { id: "export", label: "Export" },
];

const SITES: { value: InjectionSite; label: string }[] = [
  { value: "abdomen", label: "Abdomen" },
  { value: "thigh", label: "Thigh" },
  { value: "upper-arm", label: "Upper arm" },
  { value: "", label: "Not specified" },
];

/* ── Shared helpers ─────────────────────────────────────────────────────── */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

function InputLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>
      {children}
    </label>
  );
}

function FieldBox({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

const inputCls =
  "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300";
const inputStyle = { borderColor: C.border, backgroundColor: C.surface, color: "#1C2028" };

const btnPrimary =
  "rounded-xl px-5 py-2.5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-300";
const btnSecondary =
  "rounded-xl px-4 py-2 text-sm font-semibold border focus:outline-none focus:ring-2 focus:ring-blue-300";

/* ── Main component ─────────────────────────────────────────────────────── */
export default function TrackerClient() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<TrackerData>({
    doseLog: [],
    symptomLog: [],
    reminder: null,
    protocols: [],
    schemaVersion: 1,
  });
  const [activeTab, setActiveTab] = useState<Tab>("dose");

  // Dose form
  const [doseCompound, setDoseCompound] = useState<CompoundSlug>("semaglutide");
  const [doseBrand, setDoseBrand] = useState("Wegovy");
  const [doseAmount, setDoseAmount] = useState("");
  const [doseUnit, setDoseUnit] = useState("mg");
  const [doseDate, setDoseDate] = useState("");
  const [doseSite, setDoseSite] = useState<InjectionSite>("");
  const [doseNotes, setDoseNotes] = useState("");

  // Symptom form
  const [symptomDate, setSymptomDate] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(1);
  const [symptomNotes, setSymptomNotes] = useState("");

  // Reminder form
  const [reminderCompound, setReminderCompound] = useState<CompoundSlug>("semaglutide");
  const [reminderDay, setReminderDay] = useState(1); // Monday
  const [reminderHH, setReminderHH] = useState(9);
  const [reminderMM, setReminderMM] = useState(0);
  const [reminderSaved, setReminderSaved] = useState(false);

  // Protocol form
  const [protoTemplate, setProtoTemplate] = useState("");
  const [protoStart, setProtoStart] = useState("");
  const [protoEnd, setProtoEnd] = useState("");
  const [protoGlp1Type, setProtoGlp1Type] = useState("Semaglutide");
  const [customPeptides, setCustomPeptides] = useState<ProtocolPeptide[]>([]);
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);

  // Export
  const [exportCopied, setExportCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // One-shot hydration from localStorage. Safe here because SSR renders the
    // empty-default state and the client hydrates once on mount.
    const stored = loadTrackerData();
    const t = today();
    /* eslint-disable react-hooks/set-state-in-effect */
    setData(stored);
    if (stored.reminder) {
      setReminderCompound(stored.reminder.compound);
      setReminderDay(stored.reminder.dayOfWeek);
      setReminderHH(stored.reminder.timeHH);
      setReminderMM(stored.reminder.timeMM);
    }
    setDoseDate(t);
    setSymptomDate(t);
    setProtoStart(t);
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /* ── Compound → brand sync ──────────────────────────────────────────── */
  const handleDoseCompoundChange = useCallback((c: CompoundSlug) => {
    setDoseCompound(c);
    setDoseBrand(BRAND_OPTIONS[c][0]);
  }, []);

  /* ── Dose log ───────────────────────────────────────────────────────── */
  const handleAddDose = useCallback(() => {
    if (!doseAmount || !doseDate) return;
    const entry: DoseEntry = {
      id: generateId(),
      compound: doseCompound,
      brand: doseBrand,
      doseAmount,
      doseUnit,
      date: doseDate,
      site: doseSite,
      notes: doseNotes,
      createdAt: new Date().toISOString(),
    };
    setData(addDoseEntry(entry));
    setDoseAmount("");
    setDoseNotes("");
    trackTrackerDoseLog(doseCompound);
  }, [doseCompound, doseBrand, doseAmount, doseUnit, doseDate, doseSite, doseNotes]);

  const handleDeleteDose = useCallback((id: string) => {
    setData(deleteDoseEntry(id));
  }, []);

  /* ── Symptom log ────────────────────────────────────────────────────── */
  const toggleSymptom = useCallback((s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }, []);

  const handleAddSymptom = useCallback(() => {
    if (selectedSymptoms.length === 0 || !symptomDate) return;
    const entry: SymptomEntry = {
      id: generateId(),
      date: symptomDate,
      symptoms: selectedSymptoms,
      severity,
      notes: symptomNotes,
      createdAt: new Date().toISOString(),
    };
    setData(addSymptomEntry(entry));
    setSelectedSymptoms([]);
    setSeverity(1);
    setSymptomNotes("");
    trackTrackerSymptomLog(selectedSymptoms.length);
  }, [selectedSymptoms, symptomDate, severity, symptomNotes]);

  const handleDeleteSymptom = useCallback((id: string) => {
    setData(deleteSymptomEntry(id));
  }, []);

  /* ── Reminder ───────────────────────────────────────────────────────── */
  const handleSaveReminder = useCallback(() => {
    const config: ReminderConfig = {
      compound: reminderCompound,
      dayOfWeek: reminderDay,
      timeHH: reminderHH,
      timeMM: reminderMM,
    };
    setData(setReminderConfig(config));
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 2500);
    trackTrackerReminderSet(reminderCompound, reminderDay);
  }, [reminderCompound, reminderDay, reminderHH, reminderMM]);

  const handleDownloadICS = useCallback(() => {
    const config: ReminderConfig = {
      compound: reminderCompound,
      dayOfWeek: reminderDay,
      timeHH: reminderHH,
      timeMM: reminderMM,
    };
    const ics = buildICS(config, COMPOUND_LABELS[reminderCompound]);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reminderCompound}-injection-reminder.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }, [reminderCompound, reminderDay, reminderHH, reminderMM]);

  /* ── Export ─────────────────────────────────────────────────────────── */
  const handlePrint = useCallback(() => {
    window.print();
    trackTrackerExport("print");
  }, []);

  const handleCopyText = useCallback(() => {
    const lines: string[] = [
      "PeptideScholar Tracker Export",
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      "=== DOSE LOG ===",
      ...data.doseLog.map(
        (e) =>
          `${fmtDate(e.date)} | ${COMPOUND_LABELS[e.compound]} (${e.brand}) ${e.doseAmount} ${e.doseUnit}${e.site ? ` | Site: ${e.site}` : ""}${e.notes ? ` | Notes: ${e.notes}` : ""}`
      ),
      "",
      "=== SYMPTOM LOG ===",
      ...data.symptomLog.map(
        (e) =>
          `${fmtDate(e.date)} | Severity: ${SEVERITY_LABELS[e.severity]} | Symptoms: ${e.symptoms.join(", ")}${e.notes ? ` | Notes: ${e.notes}` : ""}`
      ),
      "",
      "=== PROTOCOLS ===",
      ...data.protocols.flatMap((p) => [
        `${p.name} (${p.status}) — ${fmtDate(p.startDate)} → ${fmtDate(p.endDate)}`,
        ...p.peptides.map((pep) => `  • ${pep.name} — ${pep.doseAmount} ${pep.doseUnit}, ${pep.timing} (${pep.frequency})`),
        "",
      ]),
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2500);
      trackTrackerExport("copy");
    });
  }, [data]);

  const handleClearAll = useCallback(() => {
    if (!confirm("Delete all logged data? This cannot be undone.")) return;
    clearAllTrackerData();
    setData({ doseLog: [], symptomLog: [], reminder: null, protocols: [], schemaVersion: 1 });
  }, []);

  /* ── Protocols ────────────────────────────────────────────────────────── */
  const activeTemplate = PROTOCOL_TEMPLATES.find((t) => t.id === protoTemplate);

  const handleStartProtocol = useCallback(() => {
    if (!activeTemplate || !protoStart || !protoEnd) return;
    let peptides = activeTemplate.peptides.map((p) => ({ ...p }));
    if (activeTemplate.id === "glp1") {
      peptides = peptides.map((p) => ({
        ...p,
        name: protoGlp1Type,
        compound: protoGlp1Type.toLowerCase().includes("tirzepatide") ? "tirzepatide" : "semaglutide",
      }));
    }
    if (activeTemplate.id === "custom") {
      if (customPeptides.length === 0) return;
      peptides = customPeptides.map((p) => ({ ...p }));
    }
    const entry: ProtocolEntry = {
      id: generateId(),
      name: activeTemplate.name,
      templateId: activeTemplate.id,
      peptides,
      startDate: protoStart,
      endDate: protoEnd,
      status: "active",
      dailyCheckoffs: {},
      glp1Type: activeTemplate.id === "glp1" ? protoGlp1Type : undefined,
      createdAt: new Date().toISOString(),
    };
    setData(addProtocol(entry));
    setProtoTemplate("");
    setCustomPeptides([]);
  }, [activeTemplate, protoStart, protoEnd, protoGlp1Type, customPeptides]);

  const handleDeleteProtocol = useCallback((id: string) => {
    if (!confirm("Delete this protocol?")) return;
    setData(deleteProtocol(id));
    if (expandedProtocol === id) setExpandedProtocol(null);
  }, [expandedProtocol]);

  const handleCheckProtocol = useCallback((protocolId: string, date: string) => {
    setData(logProtocolDoses(protocolId, date));
  }, []);

  const handleDownloadProtocolICS = useCallback((protocol: ProtocolEntry) => {
    const ics = buildProtocolICS(protocol);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${protocol.templateId}-protocol-reminder.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleExportProtocolText = useCallback((protocol: ProtocolEntry) => {
    const lines: string[] = [
      `Protocol: ${protocol.name}`,
      `Dates: ${fmtDate(protocol.startDate)} → ${fmtDate(protocol.endDate)}`,
      "",
      "Peptides:",
      ...protocol.peptides.map(
        (p) => `  • ${p.name} — ${p.doseAmount} ${p.doseUnit}, ${p.timing} (${p.frequency})`
      ),
      "",
      "Weekly Schedule:",
      ...protocol.peptides.map((p) => {
        const days = p.daysOfWeek ?? getDefaultActiveDays(p.frequency);
        return `  • ${p.name}: ${days.map((d) => DAYS_OF_WEEK[d]).join(", ")}`;
      }),
      "",
      `Estimated Monthly Cost: $${estimateMonthlyCost(protocol.peptides).toFixed(0)}`,
      "",
      "Disclaimer: These are example protocols for research planning only. Consult a qualified healthcare provider before starting any peptide regimen.",
    ];
    navigator.clipboard.writeText(lines.join("\n"));
  }, []);

  if (!loaded) {
    return (
      <div
        className="rounded-2xl p-8 text-center text-sm text-gray-400"
        style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
      >
        Loading tracker…
      </div>
    );
  }

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-1 rounded-xl p-1 mb-6"
        style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: activeTab === t.id ? C.surface : "transparent",
              color: activeTab === t.id ? C.navy : "#5A6577",
              boxShadow: activeTab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Dose Log ─────────────────────────────────────────────── */}
      {activeTab === "dose" && (
        <div>
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <h2 className="text-base font-bold mb-4" style={{ color: C.navy }}>
              Log a Dose
            </h2>

            <div className="grid sm:grid-cols-2 gap-x-4">
              <FieldBox>
                <InputLabel>Compound</InputLabel>
                <select
                  className={inputCls}
                  style={inputStyle}
                  value={doseCompound}
                  onChange={(e) => handleDoseCompoundChange(e.target.value as CompoundSlug)}
                >
                  {(Object.keys(COMPOUND_LABELS) as CompoundSlug[]).map((c) => (
                    <option key={c} value={c}>
                      {COMPOUND_LABELS[c]}
                    </option>
                  ))}
                </select>
              </FieldBox>

              <FieldBox>
                <InputLabel>Brand / Source</InputLabel>
                <select
                  className={inputCls}
                  style={inputStyle}
                  value={doseBrand}
                  onChange={(e) => setDoseBrand(e.target.value)}
                >
                  {BRAND_OPTIONS[doseCompound].map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </FieldBox>

              <FieldBox>
                <InputLabel>Dose Amount</InputLabel>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    className={`${inputCls} flex-1`}
                    style={inputStyle}
                    placeholder="e.g. 0.5"
                    value={doseAmount}
                    onChange={(e) => setDoseAmount(e.target.value)}
                  />
                  <select
                    className="rounded-lg border px-2 py-2 text-sm"
                    style={{ ...inputStyle, width: 64 }}
                    value={doseUnit}
                    onChange={(e) => setDoseUnit(e.target.value)}
                  >
                    <option value="mg">mg</option>
                    <option value="mcg">mcg</option>
                    <option value="units">units</option>
                  </select>
                </div>
              </FieldBox>

              <FieldBox>
                <InputLabel>Date</InputLabel>
                <input
                  type="date"
                  className={inputCls}
                  style={inputStyle}
                  value={doseDate}
                  onChange={(e) => setDoseDate(e.target.value)}
                />
              </FieldBox>

              <FieldBox>
                <InputLabel>Injection Site</InputLabel>
                <select
                  className={inputCls}
                  style={inputStyle}
                  value={doseSite}
                  onChange={(e) => setDoseSite(e.target.value as InjectionSite)}
                >
                  {SITES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </FieldBox>

              <FieldBox>
                <InputLabel>Notes (optional)</InputLabel>
                <input
                  type="text"
                  className={inputCls}
                  style={inputStyle}
                  placeholder="e.g. Nausea at 2 h"
                  value={doseNotes}
                  onChange={(e) => setDoseNotes(e.target.value)}
                />
              </FieldBox>
            </div>

            <button
              onClick={handleAddDose}
              disabled={!doseAmount || !doseDate}
              className={btnPrimary}
              style={{
                backgroundColor: doseAmount && doseDate ? C.teal : C.border,
              }}
            >
              Log Dose
            </button>
          </div>

          {/* Dose history */}
          <h3 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
            History ({data.doseLog.length} entries)
          </h3>
          {data.doseLog.length === 0 ? (
            <p className="text-sm text-gray-400">No doses logged yet.</p>
          ) : (
            <div className="space-y-2">
              {data.doseLog.map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl px-4 py-3 flex items-start justify-between gap-3"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold" style={{ color: C.teal }}>
                      {fmtDate(e.date)}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {COMPOUND_LABELS[e.compound]} ({e.brand}) — {e.doseAmount} {e.doseUnit}
                      {e.site ? ` · ${e.site}` : ""}
                    </span>
                    {e.notes && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{e.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteDose(e.id)}
                    className="text-xs text-gray-400 hover:text-red-500 flex-shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Symptom Log ──────────────────────────────────────────── */}
      {activeTab === "symptom" && (
        <div>
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <h2 className="text-base font-bold mb-4" style={{ color: C.navy }}>
              Log Symptoms
            </h2>

            <FieldBox>
              <InputLabel>Date</InputLabel>
              <input
                type="date"
                className={`${inputCls} max-w-xs`}
                style={inputStyle}
                value={symptomDate}
                onChange={(e) => setSymptomDate(e.target.value)}
              />
            </FieldBox>

            <FieldBox>
              <InputLabel>Symptoms experienced</InputLabel>
              <div className="flex flex-wrap gap-2 mt-1">
                {SYMPTOMS.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className="rounded-full px-3 py-1 text-xs font-semibold border transition-colors"
                    style={{
                      backgroundColor: selectedSymptoms.includes(s) ? C.navy : C.surface,
                      color: selectedSymptoms.includes(s) ? "#FFFFFF" : "#5A6577",
                      borderColor: selectedSymptoms.includes(s) ? C.navy : C.border,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FieldBox>

            <FieldBox>
              <InputLabel>Overall severity: {SEVERITY_LABELS[severity]}</InputLabel>
              <div className="flex gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setSeverity(n)}
                    className="w-10 h-10 rounded-xl text-sm font-bold border transition-colors"
                    style={{
                      backgroundColor: severity === n ? C.navy : C.surface,
                      color: severity === n ? "#FFFFFF" : "#5A6577",
                      borderColor: severity === n ? C.navy : C.border,
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </FieldBox>

            <FieldBox>
              <InputLabel>Notes (optional)</InputLabel>
              <textarea
                className={`${inputCls} resize-none`}
                style={inputStyle}
                rows={2}
                placeholder="Additional detail…"
                value={symptomNotes}
                onChange={(e) => setSymptomNotes(e.target.value)}
              />
            </FieldBox>

            <button
              onClick={handleAddSymptom}
              disabled={selectedSymptoms.length === 0 || !symptomDate}
              className={btnPrimary}
              style={{
                backgroundColor:
                  selectedSymptoms.length > 0 && symptomDate ? C.teal : C.border,
              }}
            >
              Log Symptoms
            </button>
          </div>

          <h3 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
            History ({data.symptomLog.length} entries)
          </h3>
          {data.symptomLog.length === 0 ? (
            <p className="text-sm text-gray-400">No symptoms logged yet.</p>
          ) : (
            <div className="space-y-2">
              {data.symptomLog.map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl px-4 py-3 flex items-start justify-between gap-3"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold" style={{ color: C.teal }}>
                      {fmtDate(e.date)}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      Severity: {SEVERITY_LABELS[e.severity]}
                    </span>
                    <p className="text-xs text-gray-600 mt-0.5">{e.symptoms.join(", ")}</p>
                    {e.notes && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{e.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteSymptom(e.id)}
                    className="text-xs text-gray-400 hover:text-red-500 flex-shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Reminder ─────────────────────────────────────────────── */}
      {activeTab === "reminder" && (
        <div>
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <h2 className="text-base font-bold mb-4" style={{ color: C.navy }}>
              Injection Reminder
            </h2>

            <FieldBox>
              <InputLabel>Compound</InputLabel>
              <select
                className={`${inputCls} max-w-xs`}
                style={inputStyle}
                value={reminderCompound}
                onChange={(e) => setReminderCompound(e.target.value as CompoundSlug)}
              >
                {(Object.keys(COMPOUND_LABELS) as CompoundSlug[]).map((c) => (
                  <option key={c} value={c}>
                    {COMPOUND_LABELS[c]}
                  </option>
                ))}
              </select>
            </FieldBox>

            <FieldBox>
              <InputLabel>Injection day</InputLabel>
              <div className="flex gap-2 mt-1 flex-wrap">
                {DAYS_OF_WEEK.map((day, i) => (
                  <button
                    key={day}
                    onClick={() => setReminderDay(i)}
                    className="rounded-xl px-3 py-2 text-xs font-bold border transition-colors"
                    style={{
                      backgroundColor: reminderDay === i ? C.navy : C.surface,
                      color: reminderDay === i ? "#FFFFFF" : "#5A6577",
                      borderColor: reminderDay === i ? C.navy : C.border,
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </FieldBox>

            <FieldBox>
              <InputLabel>Preferred time</InputLabel>
              <div className="flex items-center gap-2 mt-1">
                <select
                  className="rounded-lg border px-2 py-2 text-sm"
                  style={{ ...inputStyle, width: 80 }}
                  value={reminderHH}
                  onChange={(e) => setReminderHH(Number(e.target.value))}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {String(i).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <span className="text-gray-400 font-bold">:</span>
                <select
                  className="rounded-lg border px-2 py-2 text-sm"
                  style={{ ...inputStyle, width: 72 }}
                  value={reminderMM}
                  onChange={(e) => setReminderMM(Number(e.target.value))}
                >
                  <option value={0}>00</option>
                  <option value={30}>30</option>
                </select>
              </div>
            </FieldBox>

            {/* Countdown */}
            <div
              className="rounded-xl p-4 mb-4"
              style={{ backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD" }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: C.teal }}>
                Next injection
              </p>
              <p className="text-sm font-bold" style={{ color: C.navy }}>
                {daysUntilWeekday(reminderDay) === 7
                  ? "Next week — same day"
                  : `${daysUntilWeekday(reminderDay)} day${daysUntilWeekday(reminderDay) === 1 ? "" : "s"} from today`}{" "}
                ({DAYS_OF_WEEK[reminderDay]},{" "}
                {String(reminderHH).padStart(2, "0")}:{String(reminderMM).padStart(2, "0")})
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleSaveReminder}
                className={btnPrimary}
                style={{ backgroundColor: C.teal }}
              >
                {reminderSaved ? "Saved!" : "Save reminder"}
              </button>
              <button
                onClick={handleDownloadICS}
                className={btnSecondary}
                style={{ borderColor: C.border, color: C.teal }}
              >
                Add to calendar (.ics)
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              The .ics file creates a recurring weekly event in Apple Calendar, Google Calendar, or
              Outlook. No browser push notification is required.
            </p>
          </div>

          {data.reminder && (
            <div
              className="rounded-xl px-4 py-3 text-xs text-gray-600"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <strong>Saved reminder:</strong>{" "}
              {COMPOUND_LABELS[data.reminder.compound]} every{" "}
              {DAYS_OF_WEEK[data.reminder.dayOfWeek]} at{" "}
              {String(data.reminder.timeHH).padStart(2, "0")}:
              {String(data.reminder.timeMM).padStart(2, "0")}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Protocols ────────────────────────────────────────────── */}
      {activeTab === "protocols" && (
        <div>
          {/* New protocol form */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
          >
            <h2 className="text-base font-bold mb-4" style={{ color: C.navy }}>
              Start a Protocol
            </h2>

            <FieldBox>
              <InputLabel>Protocol Template</InputLabel>
              <select
                className={inputCls}
                style={inputStyle}
                value={protoTemplate}
                onChange={(e) => {
                  const id = e.target.value;
                  setProtoTemplate(id);
                  const tmpl = PROTOCOL_TEMPLATES.find((t) => t.id === id);
                  if (tmpl) {
                    const s = new Date(protoStart || today());
                    const end = new Date(s);
                    end.setDate(end.getDate() + tmpl.defaultLengthDays);
                    setProtoEnd(end.toISOString().slice(0, 10));
                  }
                  if (id !== "custom") setCustomPeptides([]);
                }}
              >
                <option value="">Select a protocol…</option>
                {PROTOCOL_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </FieldBox>

            {activeTemplate?.id === "glp1" && (
              <FieldBox>
                <InputLabel>GLP-1 Type</InputLabel>
                <select
                  className={inputCls}
                  style={inputStyle}
                  value={protoGlp1Type}
                  onChange={(e) => setProtoGlp1Type(e.target.value)}
                >
                  <option value="Semaglutide">Semaglutide</option>
                  <option value="Tirzepatide">Tirzepatide</option>
                </select>
              </FieldBox>
            )}

            {activeTemplate?.id === "custom" && (
              <div className="mb-4">
                <InputLabel>Custom Peptides</InputLabel>
                <div className="space-y-2">
                  {customPeptides.map((p, idx) => (
                    <div key={idx} className="grid grid-cols-5 gap-2">
                      <input
                        type="text"
                        placeholder="Name"
                        className={inputCls}
                        style={inputStyle}
                        value={p.name}
                        onChange={(e) => {
                          const next = [...customPeptides];
                          next[idx] = { ...next[idx], name: e.target.value };
                          setCustomPeptides(next);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Dose"
                        className={inputCls}
                        style={inputStyle}
                        value={p.doseAmount}
                        onChange={(e) => {
                          const next = [...customPeptides];
                          next[idx] = { ...next[idx], doseAmount: e.target.value };
                          setCustomPeptides(next);
                        }}
                      />
                      <select
                        className={inputCls}
                        style={inputStyle}
                        value={p.doseUnit}
                        onChange={(e) => {
                          const next = [...customPeptides];
                          next[idx] = { ...next[idx], doseUnit: e.target.value };
                          setCustomPeptides(next);
                        }}
                      >
                        <option value="mg">mg</option>
                        <option value="mcg">mcg</option>
                        <option value="units">units</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Timing"
                        className={inputCls}
                        style={inputStyle}
                        value={p.timing}
                        onChange={(e) => {
                          const next = [...customPeptides];
                          next[idx] = { ...next[idx], timing: e.target.value };
                          setCustomPeptides(next);
                        }}
                      />
                      <select
                        className={inputCls}
                        style={inputStyle}
                        value={p.frequency}
                        onChange={(e) => {
                          const next = [...customPeptides];
                          next[idx] = { ...next[idx], frequency: e.target.value };
                          setCustomPeptides(next);
                        }}
                      >
                        <option value="daily">Daily</option>
                        <option value="5 on / 2 off">5 on / 2 off</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCustomPeptides([
                      ...customPeptides,
                      { name: "", doseAmount: "", doseUnit: "mg", timing: "Morning", frequency: "daily" },
                    ])
                  }
                  className="mt-2 text-xs font-semibold"
                  style={{ color: C.teal }}
                >
                  + Add peptide
                </button>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-x-4">
              <FieldBox>
                <InputLabel>Start Date</InputLabel>
                <input
                  type="date"
                  className={inputCls}
                  style={inputStyle}
                  value={protoStart}
                  onChange={(e) => setProtoStart(e.target.value)}
                />
              </FieldBox>
              <FieldBox>
                <InputLabel>End Date</InputLabel>
                <input
                  type="date"
                  className={inputCls}
                  style={inputStyle}
                  value={protoEnd}
                  onChange={(e) => setProtoEnd(e.target.value)}
                />
              </FieldBox>
            </div>

            <button
              onClick={handleStartProtocol}
              disabled={!protoTemplate || !protoStart || !protoEnd || (activeTemplate?.id === "custom" && customPeptides.length === 0)}
              className={btnPrimary}
              style={{
                backgroundColor:
                  protoTemplate && protoStart && protoEnd && (activeTemplate?.id !== "custom" || customPeptides.length > 0)
                    ? C.teal
                    : C.border,
              }}
            >
              Start Protocol
            </button>
          </div>

          {/* Protocol list */}
          <h3 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
            Your Protocols ({data.protocols.length})
          </h3>
          {data.protocols.length === 0 ? (
            <p className="text-sm text-gray-400">No protocols started yet.</p>
          ) : (
            <div className="space-y-3">
              {data.protocols.map((protocol) => {
                const pct = protocolProgress(protocol);
                const isExpanded = expandedProtocol === protocol.id;
                const totalDays = daysInProtocol(protocol);
                const todayStr = today();
                const isActive = protocol.status === "active";
                const todayChecked = !!protocol.dailyCheckoffs[todayStr];
                const isGlp1 = protocol.templateId === "glp1";
                return (
                  <div
                    key={protocol.id}
                    className="rounded-2xl overflow-hidden"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                  >
                    {/* Header */}
                    <div className="px-5 py-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold" style={{ color: C.navy }}>
                          {protocol.name}
                        </h4>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: isActive ? "#E6F4EA" : "#F3F4F6",
                            color: isActive ? C.success : "#5A6577",
                          }}
                        >
                          {isActive ? `${pct}% complete` : protocol.status}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-2 rounded-full mb-3" style={{ backgroundColor: C.bg }}>
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: pct >= 100 ? C.success : C.teal,
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">
                          {fmtDate(protocol.startDate)} → {fmtDate(protocol.endDate)} · {totalDays} days
                        </p>
                        <div className="flex gap-2">
                          {isActive && (
                            <button
                              onClick={() => handleCheckProtocol(protocol.id, todayStr)}
                              disabled={todayChecked}
                              className="text-xs font-bold px-3 py-1.5 rounded-lg border"
                              style={{
                                backgroundColor: todayChecked ? "#E6F4EA" : C.surface,
                                color: todayChecked ? C.success : C.teal,
                                borderColor: todayChecked ? C.success : C.border,
                              }}
                            >
                              {todayChecked ? "Checked off" : "Check off today"}
                            </button>
                          )}
                          <button
                            onClick={() => setExpandedProtocol(isExpanded ? null : protocol.id)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border"
                            style={{ borderColor: C.border, color: C.navy }}
                          >
                            {isExpanded ? "Hide" : "View"}
                          </button>
                          <button
                            onClick={() => handleDeleteProtocol(protocol.id)}
                            className="text-xs text-gray-400 hover:text-red-500 px-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t" style={{ borderColor: C.border }}>
                        {/* Peptide list */}
                        <div className="mt-4 space-y-3">
                          {protocol.peptides.map((p, i) => {
                            const days = p.daysOfWeek ?? getDefaultActiveDays(p.frequency);
                            return (
                              <div
                                key={i}
                                className="rounded-xl p-3"
                                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-bold" style={{ color: C.navy }}>
                                    {p.name}
                                  </span>
                                  <span className="text-xs" style={{ color: C.teal }}>
                                    {p.doseAmount} {p.doseUnit} · {p.timing}
                                  </span>
                                </div>
                                <div className="flex gap-1 mt-2">
                                  {DAYS_OF_WEEK.map((d, idx) => (
                                    <div
                                      key={d}
                                      className="flex-1 text-center text-[10px] font-bold py-1 rounded"
                                      style={{
                                        backgroundColor: days.includes(idx) ? C.teal : "#E5E7EB",
                                        color: days.includes(idx) ? "#FFFFFF" : "#9CA3AF",
                                      }}
                                    >
                                      {d}
                                    </div>
                                  ))}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">
                                  Est. vial duration: {estimateVialDuration(p)}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Cost & meta */}
                        <div
                          className="rounded-xl p-3 mt-4"
                          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                        >
                          <p className="text-xs font-semibold" style={{ color: C.navy }}>
                            Estimated Monthly Cost:{" "}
                            <span style={{ color: C.teal }}>
                              ${estimateMonthlyCost(protocol.peptides).toFixed(0)}
                            </span>
                          </p>
                        </div>

                        {/* Daily checklist for today */}
                        {isActive && (
                          <div className="mt-4">
                            <p className="text-xs font-bold mb-2" style={{ color: C.navy }}>
                              Today&apos;s doses
                            </p>
                            <div className="space-y-1">
                              {protocol.peptides.map((p, i) => {
                                const days = p.daysOfWeek ?? getDefaultActiveDays(p.frequency);
                                const dayIdx = new Date(todayStr).getDay();
                                const shouldTake = days.includes(dayIdx);
                                if (!shouldTake) return null;
                                return (
                                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                    <span
                                      className="w-2 h-2 rounded-full"
                                      style={{ backgroundColor: todayChecked ? C.success : C.border }}
                                    />
                                    {p.name} — {p.doseAmount} {p.doseUnit} ({p.timing})
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Safety disclaimer */}
                        <div
                          className="rounded-xl p-3 mt-4"
                          style={{ backgroundColor: "#FFF7ED", border: `1px solid #FED7AA` }}
                        >
                          <p className="text-[11px]" style={{ color: "#92400E" }}>
                            These are example protocols for research planning only. Consult a qualified
                            healthcare provider before starting any peptide regimen.
                          </p>
                          {isGlp1 && (
                            <p className="text-[11px] font-bold mt-1" style={{ color: "#92400E" }}>
                              Requires medical supervision. Not for self-administration without
                              prescription.
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-4 flex-wrap">
                          <button
                            onClick={() => handleDownloadProtocolICS(protocol)}
                            className={btnSecondary}
                            style={{ borderColor: C.border, color: C.teal }}
                          >
                            Add to calendar (.ics)
                          </button>
                          <button
                            onClick={() => handleExportProtocolText(protocol)}
                            className={btnSecondary}
                            style={{ borderColor: C.border, color: C.navy }}
                          >
                            Copy schedule
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Export ───────────────────────────────────────────────── */}
      {activeTab === "export" && (
        <div>
          <div className="flex gap-3 mb-5 flex-wrap print:hidden">
            <button
              onClick={handlePrint}
              className={btnPrimary}
              style={{ backgroundColor: C.navy }}
            >
              Print Summary
            </button>
            <button
              onClick={handleCopyText}
              className={btnSecondary}
              style={{ borderColor: C.border, color: C.navy }}
            >
              {exportCopied ? "Copied!" : "Copy as text"}
            </button>
            <button
              onClick={handleClearAll}
              className={btnSecondary}
              style={{ borderColor: "#FECACA", color: "#D4553A" }}
            >
              Clear all data
            </button>
          </div>

          {/* Print-ready document */}
          <div
            ref={printRef}
            className="rounded-2xl p-6"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            <h2 className="text-lg font-bold mb-1" style={{ color: C.navy }}>
              Treatment Log — PeptideScholar Tracker
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              Generated {new Date().toLocaleDateString()} · Data stored locally on this device
            </p>

            {/* Dose log table */}
            <h3 className="text-sm font-bold mb-2" style={{ color: C.navy }}>
              Dose History ({data.doseLog.length} entries)
            </h3>
            {data.doseLog.length === 0 ? (
              <p className="text-xs text-gray-400 mb-4">No doses logged.</p>
            ) : (
              <div
                className="rounded-xl overflow-hidden mb-5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: C.bg }}>
                      {["Date", "Compound", "Brand", "Dose", "Site", "Notes"].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left font-semibold"
                          style={{ color: C.navy, borderBottom: `1px solid ${C.border}` }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.doseLog.map((e, i) => (
                      <tr
                        key={e.id}
                        style={{
                          backgroundColor: i % 2 === 0 ? C.surface : C.bg,
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        <td className="px-3 py-2">{fmtDate(e.date)}</td>
                        <td className="px-3 py-2">{COMPOUND_LABELS[e.compound]}</td>
                        <td className="px-3 py-2">{e.brand}</td>
                        <td className="px-3 py-2">
                          {e.doseAmount} {e.doseUnit}
                        </td>
                        <td className="px-3 py-2">{e.site || "—"}</td>
                        <td className="px-3 py-2 text-gray-500">{e.notes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Symptom log */}
            <h3 className="text-sm font-bold mb-2" style={{ color: C.navy }}>
              Symptom History ({data.symptomLog.length} entries)
            </h3>
            {data.symptomLog.length === 0 ? (
              <p className="text-xs text-gray-400">No symptoms logged.</p>
            ) : (
              <div className="space-y-2">
                {data.symptomLog.map((e) => (
                  <div
                    key={e.id}
                    className="rounded-xl px-3 py-2"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <span className="text-xs font-semibold" style={{ color: C.teal }}>
                      {fmtDate(e.date)}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Severity: {SEVERITY_LABELS[e.severity]}
                    </span>
                    <p className="text-xs text-gray-700 mt-0.5">{e.symptoms.join(", ")}</p>
                    {e.notes && <p className="text-xs text-gray-400 mt-0.5">{e.notes}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Protocols */}
            <h3 className="text-sm font-bold mb-2 mt-6" style={{ color: C.navy }}>
              Protocols ({data.protocols.length})
            </h3>
            {data.protocols.length === 0 ? (
              <p className="text-xs text-gray-400 mb-4">No protocols.</p>
            ) : (
              <div className="space-y-3 mb-5">
                {data.protocols.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl px-3 py-2"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <span className="text-xs font-semibold" style={{ color: C.teal }}>
                      {p.name}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {fmtDate(p.startDate)} → {fmtDate(p.endDate)} · {p.status}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {p.peptides.map((pep, i) => (
                        <p key={i} className="text-xs text-gray-700">
                          {pep.name} — {pep.doseAmount} {pep.doseUnit}, {pep.timing} ({pep.frequency})
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-300 mt-6 border-t pt-3" style={{ borderColor: C.border }}>
              This summary is for personal records only and does not constitute medical advice.
              Share with your prescribing clinician as a supplement to, not a replacement for,
              your clinical record.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

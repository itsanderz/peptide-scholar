// Local-first tracker data layer — all reads/writes go through localStorage.
// This module must only be called from client-side code (event handlers, useEffect).

export type CompoundSlug = "semaglutide" | "tirzepatide" | "liraglutide" | "other";
export type InjectionSite = "abdomen" | "thigh" | "upper-arm" | "";

export interface DoseEntry {
  id: string;
  compound: CompoundSlug;
  brand: string;
  doseAmount: string;
  doseUnit: string; // "mg" | "mcg"
  date: string; // yyyy-mm-dd
  site: InjectionSite;
  notes: string;
  createdAt: string; // ISO timestamp
}

export interface SymptomEntry {
  id: string;
  date: string; // yyyy-mm-dd
  symptoms: string[];
  severity: number; // 1-5
  notes: string;
  createdAt: string;
}

export interface ReminderConfig {
  compound: CompoundSlug;
  dayOfWeek: number; // 0 = Sunday … 6 = Saturday
  timeHH: number; // 0–23
  timeMM: number; // 0 or 30
}

export interface ProtocolPeptide {
  name: string;
  compound?: CompoundSlug;
  doseAmount: string;
  doseUnit: string;
  timing: string;
  frequency: string;
  daysOfWeek?: number[]; // 0=Sun … 6=Sat; omitted = daily
}

export interface ProtocolEntry {
  id: string;
  name: string;
  templateId: string;
  peptides: ProtocolPeptide[];
  startDate: string; // yyyy-mm-dd
  endDate: string;   // yyyy-mm-dd
  status: "planned" | "active" | "completed" | "stopped";
  dailyCheckoffs: Record<string, boolean>;
  glp1Type?: string;
  createdAt: string;
}

export interface TrackerData {
  doseLog: DoseEntry[];
  symptomLog: SymptomEntry[];
  reminder: ReminderConfig | null;
  protocols: ProtocolEntry[];
  schemaVersion: number;
}

const STORAGE_KEY = "ps_tracker_v1";

const DEFAULT_DATA: TrackerData = {
  doseLog: [],
  symptomLog: [],
  reminder: null,
  protocols: [],
  schemaVersion: 1,
};

export function loadTrackerData(): TrackerData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DATA };
    const parsed = JSON.parse(raw) as Partial<TrackerData>;
    return {
      doseLog: parsed.doseLog ?? [],
      symptomLog: parsed.symptomLog ?? [],
      reminder: parsed.reminder ?? null,
      protocols: parsed.protocols ?? [],
      schemaVersion: parsed.schemaVersion ?? 1,
    };
  } catch {
    return { ...DEFAULT_DATA };
  }
}

export function saveTrackerData(data: TrackerData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addDoseEntry(entry: DoseEntry): TrackerData {
  const data = loadTrackerData();
  data.doseLog = [entry, ...data.doseLog];
  saveTrackerData(data);
  return data;
}

export function deleteDoseEntry(id: string): TrackerData {
  const data = loadTrackerData();
  data.doseLog = data.doseLog.filter((e) => e.id !== id);
  saveTrackerData(data);
  return data;
}

export function addSymptomEntry(entry: SymptomEntry): TrackerData {
  const data = loadTrackerData();
  data.symptomLog = [entry, ...data.symptomLog];
  saveTrackerData(data);
  return data;
}

export function deleteSymptomEntry(id: string): TrackerData {
  const data = loadTrackerData();
  data.symptomLog = data.symptomLog.filter((e) => e.id !== id);
  saveTrackerData(data);
  return data;
}

export function setReminderConfig(config: ReminderConfig | null): TrackerData {
  const data = loadTrackerData();
  data.reminder = config;
  saveTrackerData(data);
  return data;
}

export function addProtocol(entry: ProtocolEntry): TrackerData {
  const data = loadTrackerData();
  data.protocols = [entry, ...data.protocols];
  saveTrackerData(data);
  return data;
}

export function updateProtocol(id: string, updates: Partial<ProtocolEntry>): TrackerData {
  const data = loadTrackerData();
  data.protocols = data.protocols.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveTrackerData(data);
  return data;
}

export function deleteProtocol(id: string): TrackerData {
  const data = loadTrackerData();
  data.protocols = data.protocols.filter((p) => p.id !== id);
  saveTrackerData(data);
  return data;
}

export function logProtocolDoses(protocolId: string, date: string): TrackerData {
  const data = loadTrackerData();
  const protocol = data.protocols.find((p) => p.id === protocolId);
  if (!protocol) return data;

  protocol.dailyCheckoffs[date] = true;

  const day = new Date(date).getDay();
  for (const peptide of protocol.peptides) {
    const activeDays = peptide.daysOfWeek ?? getDefaultActiveDays(peptide.frequency);
    if (!activeDays.includes(day)) continue;

    const entry: DoseEntry = {
      id: generateId(),
      compound: peptide.compound || "other",
      brand: peptide.name,
      doseAmount: peptide.doseAmount,
      doseUnit: peptide.doseUnit,
      date,
      site: "",
      notes: `From protocol: ${protocol.name}`,
      createdAt: new Date().toISOString(),
    };
    data.doseLog = [entry, ...data.doseLog];
  }

  saveTrackerData(data);
  return data;
}

export function clearAllTrackerData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Days until next occurrence of a given weekday (1–7, never 0 so "today" shows as 7). */
export function daysUntilWeekday(dayOfWeek: number): number {
  const today = new Date().getDay();
  const diff = (dayOfWeek - today + 7) % 7;
  return diff === 0 ? 7 : diff;
}

/** Next calendar date for a given weekday, as yyyy-mm-dd. */
export function nextWeekdayDate(dayOfWeek: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysUntilWeekday(dayOfWeek));
  return d.toISOString().slice(0, 10);
}

/** Build a .ics VCALENDAR string for a weekly injection reminder. */
export function buildICS(config: ReminderConfig, label: string): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const daysAhead = daysUntilWeekday(config.dayOfWeek);
  const start = new Date();
  start.setDate(start.getDate() + daysAhead);
  start.setHours(config.timeHH, config.timeMM, 0, 0);
  const dtstart = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(config.timeHH)}${pad(config.timeMM)}00`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PeptideScholar//Tracker//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `DTSTART:${dtstart}`,
    "RRULE:FREQ=WEEKLY",
    `SUMMARY:${label} injection reminder`,
    "DESCRIPTION:Weekly injection reminder — PeptideScholar Tracker",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export const COMPOUND_LABELS: Record<CompoundSlug, string> = {
  semaglutide: "Semaglutide",
  tirzepatide: "Tirzepatide",
  liraglutide: "Liraglutide",
  other: "Other",
};

export const BRAND_OPTIONS: Record<CompoundSlug, string[]> = {
  semaglutide: ["Wegovy", "Ozempic", "Compounded", "Other"],
  tirzepatide: ["Zepbound", "Mounjaro", "Compounded", "Other"],
  liraglutide: ["Saxenda", "Victoza", "Compounded", "Other"],
  other: ["Other"],
};

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const SYMPTOMS = [
  "Nausea",
  "Fatigue",
  "Reduced appetite",
  "Vomiting",
  "Diarrhea",
  "Constipation",
  "Injection site reaction",
  "Headache",
  "Dizziness",
  "Heartburn",
  "Bloating",
];

export const SEVERITY_LABELS: Record<number, string> = {
  1: "Mild",
  2: "Mild–Moderate",
  3: "Moderate",
  4: "Moderate–Severe",
  5: "Severe",
};

// ── Protocol Templates & Helpers ────────────────────────────────────────────

export const PROTOCOL_TEMPLATES: {
  id: string;
  name: string;
  peptides: ProtocolPeptide[];
  defaultLengthDays: number;
}[] = [
  {
    id: "wolverine",
    name: "Wolverine Stack (Healing)",
    peptides: [
      { name: "BPC-157", doseAmount: "500", doseUnit: "mcg", timing: "Morning", frequency: "daily" },
      { name: "TB-500", doseAmount: "500", doseUnit: "mcg", timing: "Morning", frequency: "daily" },
    ],
    defaultLengthDays: 56,
  },
  {
    id: "gh-optimization",
    name: "GH Optimization",
    peptides: [
      { name: "CJC-1295", doseAmount: "100", doseUnit: "mcg", timing: "Bedtime", frequency: "5 on / 2 off", daysOfWeek: [1, 2, 3, 4, 5] },
      { name: "Ipamorelin", doseAmount: "100", doseUnit: "mcg", timing: "Bedtime", frequency: "5 on / 2 off", daysOfWeek: [1, 2, 3, 4, 5] },
    ],
    defaultLengthDays: 84,
  },
  {
    id: "cognitive",
    name: "Cognitive Support",
    peptides: [
      { name: "Semax", doseAmount: "500", doseUnit: "mcg", timing: "Nasal AM", frequency: "daily" },
      { name: "Selank", doseAmount: "500", doseUnit: "mcg", timing: "Nasal PM", frequency: "daily" },
    ],
    defaultLengthDays: 56,
  },
  {
    id: "glp1",
    name: "GLP-1 Weight Loss",
    peptides: [
      { name: "Semaglutide", doseAmount: "0.25", doseUnit: "mg", timing: "Weekly", frequency: "weekly", daysOfWeek: [1] },
    ],
    defaultLengthDays: 84,
  },
  {
    id: "skin-recovery",
    name: "Skin & Recovery",
    peptides: [
      { name: "GHK-Cu", doseAmount: "2", doseUnit: "mg", timing: "Morning", frequency: "daily" },
      { name: "BPC-157", doseAmount: "250", doseUnit: "mcg", timing: "Morning", frequency: "daily" },
    ],
    defaultLengthDays: 56,
  },
  {
    id: "custom",
    name: "Custom Protocol",
    peptides: [],
    defaultLengthDays: 56,
  },
];

export const MONTHLY_COSTS: Record<string, number> = {
  "BPC-157": 70,
  "TB-500": 90,
  "CJC-1295": 75,
  "Ipamorelin": 60,
  "Semax": 65,
  "Selank": 55,
  "GHK-Cu": 50,
  "Semaglutide": 1100,
  "Tirzepatide": 1200,
};

/** Approximate vial sizes in mcg for duration calculation. */
const VIAL_SIZES_MCG: Record<string, number> = {
  "BPC-157": 5000,
  "TB-500": 5000,
  "CJC-1295": 2000,
  "Ipamorelin": 2000,
  "GHK-Cu": 50000,
  "Semax": 30000,
  "Selank": 30000,
  "Semaglutide": 2000,
  "Tirzepatide": 10000,
};

export function getDefaultActiveDays(frequency: string): number[] {
  if (frequency === "daily") return [0, 1, 2, 3, 4, 5, 6];
  if (frequency === "5 on / 2 off") return [1, 2, 3, 4, 5];
  if (frequency === "weekly") return [1];
  return [0, 1, 2, 3, 4, 5, 6];
}

export function estimateVialDuration(peptide: ProtocolPeptide): string {
  const vialMcg = VIAL_SIZES_MCG[peptide.name];
  if (!vialMcg) return "Unknown";
  const daily = parseFloat(peptide.doseAmount);
  if (!daily || daily <= 0) return "Unknown";
  let dosePerDayMcg = daily;
  if (peptide.doseUnit === "mg") dosePerDayMcg = daily * 1000;
  if (peptide.frequency === "weekly") {
    const weeks = vialMcg / dosePerDayMcg;
    const days = Math.round(weeks * 7);
    return `${Math.floor(days / 7)} weeks${days % 7 ? ` ${days % 7} days` : ""}`;
  }
  if (peptide.frequency === "5 on / 2 off") {
    const weeklyDose = dosePerDayMcg * 5;
    const totalWeeks = vialMcg / weeklyDose;
    const days = Math.round(totalWeeks * 7);
    return `${Math.floor(days / 7)} weeks${days % 7 ? ` ${days % 7} days` : ""}`;
  }
  const days = Math.round(vialMcg / dosePerDayMcg);
  return `${Math.floor(days / 7)} weeks${days % 7 ? ` ${days % 7} days` : ""}`;
}

export function estimateMonthlyCost(peptides: ProtocolPeptide[]): number {
  return peptides.reduce((sum, p) => {
    const cost = MONTHLY_COSTS[p.name] ?? 0;
    if (p.frequency === "weekly") return sum + cost / 4;
    if (p.frequency === "5 on / 2 off") return sum + (cost * 5) / 7;
    return sum + cost;
  }, 0);
}

export function protocolProgress(protocol: ProtocolEntry): number {
  const start = new Date(protocol.startDate).getTime();
  const end = new Date(protocol.endDate).getTime();
  const now = Date.now();
  if (now >= end) return 100;
  if (now <= start) return 0;
  return Math.round(((now - start) / (end - start)) * 100);
}

export function daysInProtocol(protocol: ProtocolEntry): number {
  const start = new Date(protocol.startDate);
  const end = new Date(protocol.endDate);
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

/** Build an ICS calendar containing one weekly event per peptide. */
export function buildProtocolICS(protocol: ProtocolEntry): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const events: string[] = [];

  for (const peptide of protocol.peptides) {
    const days = peptide.daysOfWeek ?? getDefaultActiveDays(peptide.frequency);
    for (const dow of days) {
      const daysAhead = daysUntilWeekday(dow);
      const start = new Date();
      start.setDate(start.getDate() + daysAhead);
      // Default times based on timing label
      let hh = 9, mm = 0;
      const t = peptide.timing.toLowerCase();
      if (t.includes("bedtime")) { hh = 22; mm = 0; }
      else if (t.includes("pm") || t.includes("evening")) { hh = 18; mm = 0; }
      else if (t.includes("am") || t.includes("morning")) { hh = 8; mm = 0; }
      start.setHours(hh, mm, 0, 0);
      const dtstart = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(hh)}${pad(mm)}00`;
      const rrule = peptide.frequency === "weekly" ? "RRULE:FREQ=WEEKLY" : "RRULE:FREQ=WEEKLY;BYDAY=" + dayNameIcs(dow);
      events.push(
        "BEGIN:VEVENT",
        `UID:${protocol.id}-${peptide.name}-${dow}@peptidescholar.app`,
        `DTSTART:${dtstart}`,
        rrule,
        `SUMMARY:${peptide.name} (${protocol.name})`,
        `DESCRIPTION:Dose: ${peptide.doseAmount} ${peptide.doseUnit} — ${peptide.timing}. Protocol: ${protocol.name}`,
        "END:VEVENT"
      );
      // sequence counter reserved for future multi-protocol UID disambiguation
    }
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PeptideScholar//Tracker//EN",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

function dayNameIcs(dow: number): string {
  return ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][dow];
}

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

export interface TrackerData {
  doseLog: DoseEntry[];
  symptomLog: SymptomEntry[];
  reminder: ReminderConfig | null;
  schemaVersion: number;
}

const STORAGE_KEY = "ps_tracker_v1";

const DEFAULT_DATA: TrackerData = {
  doseLog: [],
  symptomLog: [],
  reminder: null,
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

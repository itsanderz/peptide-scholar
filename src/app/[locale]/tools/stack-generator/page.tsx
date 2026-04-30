import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSymptoms, SymptomPeptideMapping } from "@/data/symptom-stacks";
import { isValidLocale } from "@/lib/i18n";
import { Metadata } from "next";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";
import { StackProviderMatcher } from "@/components/StackProviderMatcher";

const C = {
  navy: "#1A2B4A",
  teal: "#0891B2",
  gold: "#D4A843",
  muted: "#64748B",
  light: "#F8FAFC",
  border: "#E2E8F0",
  red: "#DC2626",
  green: "#16A34A",
  amber: "#D97706",
};

function evidenceColor(grade: string): string {
  if (grade === "A") return C.green;
  if (grade === "B") return C.teal;
  if (grade === "C") return C.amber;
  return C.red;
}

function evidenceBg(grade: string): string {
  if (grade === "A") return "#F0FDF4";
  if (grade === "B") return "#F0F9FF";
  if (grade === "C") return "#FFFBEB";
  return "#FEF2F2";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titleSuffix = locale === "en" ? "" : ` | ${siteConfig.name}`;
  return {
    title: `Peptide Stack Generator — Find Research-Backed Peptides by Symptom${titleSuffix}`,
    description:
      "Select your health concern and discover peptides studied for that condition. Every recommendation includes evidence grades, FDA status, safety warnings, and PubMed references. Not medical advice.",
  };
}

export default async function StackGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  await getRequestMarket();

  const symptoms = getAllSymptoms();
  const totalPeptides = symptoms.reduce((acc, s) => acc + s.peptides.length, 0);
  const fdaApprovedCount = symptoms.reduce(
    (acc, s) => acc + s.peptides.filter((p) => p.fdaApprovedForIndication).length,
    0
  );

  return (
    <main className="min-h-screen" style={{ backgroundColor: C.light }}>
      {/* Hero */}
      <section className="px-4 pt-16 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl" style={{ color: C.navy }}>
            Peptide Stack Generator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg" style={{ color: C.muted }}>
            Select a symptom or health goal to see peptides that have been studied for that condition. 
            Every result includes evidence grades, safety warnings, and PubMed references.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium">
            <span className="rounded-full px-3 py-1" style={{ backgroundColor: "#F0FDF4", color: C.green, border: "1px solid #BBF7D0" }}>
              {fdaApprovedCount} FDA-Approved
            </span>
            <span className="rounded-full px-3 py-1" style={{ backgroundColor: "#F0F9FF", color: C.teal, border: "1px solid #BAE6FD" }}>
              {totalPeptides - fdaApprovedCount} Investigational
            </span>
            <span className="rounded-full px-3 py-1" style={{ backgroundColor: "#FEF2F2", color: C.red, border: "1px solid #FECACA" }}>
              {symptoms.length} Symptom Categories
            </span>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-lg border-l-4 p-4 text-sm"
            style={{
              backgroundColor: "#FEF2F2",
              borderColor: C.red,
              color: C.navy,
            }}
          >
            <strong>Medical Disclaimer:</strong> This tool is for research and educational purposes only. 
            It is not medical advice, diagnosis, or treatment. Many peptides listed are not FDA-approved 
            for the stated indication, are investigational, or are banned by WADA. Always consult a 
            qualified healthcare provider before considering any peptide therapy.
          </div>
        </div>
      </section>

      {/* Symptom Grid */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {symptoms.map((symptom) => (
              <SymptomCard key={symptom.symptomId} symptom={symptom} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture + Community Promo */}
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Newsletter */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "#fff", borderColor: C.border }}>
              <h3 className="text-base font-semibold mb-2" style={{ color: C.navy }}>
                Get Peptide Research Updates
              </h3>
              <p className="text-xs mb-3" style={{ color: C.muted }}>
                Weekly digest of new clinical trials, regulatory changes, and evidence updates. 
                No spam. Unsubscribe anytime.
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLFormElement).email.value;
                  if (email) {
                    fetch("/api/subscribe", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, source: "stack-generator" }),
                    });
                    (e.target as HTMLFormElement).reset();
                    alert("Thanks for subscribing!");
                  }
                }}
              >
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: C.border }}
                />
                <button
                  type="submit"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: C.teal }}
                >
                  Subscribe
                </button>
              </form>
            </div>
            {/* Community promo */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "#fff", borderColor: C.border }}>
              <h3 className="text-base font-semibold mb-2" style={{ color: C.navy }}>
                Community Stack Reports
              </h3>
              <p className="text-xs mb-3" style={{ color: C.muted }}>
                Browse real-world stack reports shared by the community. See dosages, effects, 
                and side effects — all with transparency disclaimers.
              </p>
              <Link
                href="/tools/community-stacks"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: C.navy }}
              >
                Browse Community Reports
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Legend */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-lg font-semibold" style={{ color: C.navy }}>
            Evidence Grade Legend
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <EvidenceLegendItem
              grade="A"
              label="Strong"
              description="FDA-approved for this indication or supported by large randomized controlled trials"
            />
            <EvidenceLegendItem
              grade="B"
              label="Moderate"
              description="Small human trials or meta-analyses showing consistent but modest effects"
            />
            <EvidenceLegendItem
              grade="C"
              label="Weak"
              description="Case studies, anecdotal reports, or small uncontrolled trials"
            />
            <EvidenceLegendItem
              grade="D"
              label="Very Weak"
              description="Preclinical only (animal/cell studies). No human efficacy data"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function SymptomCard({
  symptom,
  locale,
}: {
  symptom: SymptomPeptideMapping;
  locale: string;
}) {
  const bestEvidence = symptom.peptides.reduce((best, p) => {
    const order = { A: 0, B: 1, C: 2, D: 3 };
    return order[p.evidenceQuality] < order[best] ? p.evidenceQuality : best;
  }, "D" as "A" | "B" | "C" | "D");

  const fdaCount = symptom.peptides.filter((p) => p.fdaApprovedForIndication).length;

  return (
    <div
      className="rounded-xl border p-5 transition-shadow hover:shadow-md"
      style={{ backgroundColor: "#fff", borderColor: C.border }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold" style={{ color: C.navy }}>
            {symptom.symptom}
          </h3>
          <div className="mt-1 flex flex-wrap gap-2">
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{
                backgroundColor: evidenceBg(bestEvidence),
                color: evidenceColor(bestEvidence),
              }}
            >
              Best Evidence: {bestEvidence}
            </span>
            {fdaCount > 0 && (
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: "#F0FDF4",
                  color: C.green,
                }}
              >
                {fdaCount} FDA-Approved
              </span>
            )}
          </div>
        </div>
        <span className="text-lg opacity-50">
          <SymptomIcon name={symptom.icon} />
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {symptom.peptides.slice(0, 3).map((peptide) => (
          <div
            key={peptide.name}
            className="rounded-lg border p-3"
            style={{ borderColor: C.border, backgroundColor: C.light }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: C.navy }}>
                {peptide.slug ? (
                  <Link
                    href={`/${locale === "en" ? "" : locale + "/"}peptides/${peptide.slug}`}
                    className="underline underline-offset-2 hover:no-underline"
                    style={{ color: C.teal }}
                  >
                    {peptide.name}
                  </Link>
                ) : (
                  peptide.name
                )}
              </span>
              <span
                className="rounded px-1.5 py-0.5 text-xs font-bold"
                style={{
                  backgroundColor: evidenceBg(peptide.evidenceQuality),
                  color: evidenceColor(peptide.evidenceQuality),
                }}
              >
                {peptide.evidenceQuality}
              </span>
            </div>
            <p className="mt-1 text-xs" style={{ color: C.muted }}>
              {peptide.evidenceDescription}
            </p>
            {peptide.fdaApprovedForIndication && (
              <span
                className="mt-1 inline-block rounded px-1.5 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: "#F0FDF4", color: C.green }}
              >
                FDA-Approved
              </span>
            )}
          </div>
        ))}
        {symptom.peptides.length > 3 && (
          <p className="text-xs" style={{ color: C.muted }}>
            +{symptom.peptides.length - 3} more peptides
          </p>
        )}
      </div>

      {/* Caveats */}
      <div className="mt-3 rounded border-l-2 p-2 text-xs" style={{ borderColor: C.amber, backgroundColor: "#FFFBEB", color: C.navy }}>
        <strong>Caution:</strong> {symptom.peptides[0].caveats}
      </div>

      {/* Provider Matcher */}
      <StackProviderMatcher symptomId={symptom.symptomId} locale={locale} />
    </div>
  );
}

function EvidenceLegendItem({
  grade,
  label,
  description,
}: {
  grade: string;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3" style={{ borderColor: C.border, backgroundColor: "#fff" }}>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: evidenceColor(grade) }}
      >
        {grade}
      </span>
      <div>
        <div className="text-sm font-semibold" style={{ color: C.navy }}>
          {label}
        </div>
        <div className="text-xs" style={{ color: C.muted }}>
          {description}
        </div>
      </div>
    </div>
  );
}

function SymptomIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    moon: "🌙",
    heart: "❤️",
    scissors: "✂️",
    brain: "🧠",
    cloud: "☁️",
    lightbulb: "💡",
    bandage: "🩹",
    dumbbell: "🏋️",
    scale: "⚖️",
    clock: "🕐",
    utensils: "🍽️",
    shield: "🛡️",
    fire: "🔥",
    sparkles: "✨",
    zap: "⚡",
    bone: "🦴",
    activity: "📈",
    bookmark: "🔖",
    "cloud-lightning": "⛈️",
    trophy: "🏆",
  };
  return <span>{icons[name] || "💊"}</span>;
}

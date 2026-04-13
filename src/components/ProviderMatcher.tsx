"use client";

import { useMemo, useState } from "react";
import {
  trackProviderLeadSubmit,
  trackProviderMatcherComplete,
  trackProviderMatcherStart,
} from "@/lib/analytics";
import { ProviderPartnerCard } from "@/components/ProviderPartnerCard";
import { canShowProviderReferrals } from "@/lib/market";
import type { ProviderPartner } from "@/data/provider-partners";
import {
  humanizeProviderTreatment,
  PROVIDER_BUDGET_OPTIONS,
  PROVIDER_GOAL_OPTIONS,
  PROVIDER_INSURANCE_OPTIONS,
  PROVIDER_TREATMENT_OPTIONS,
  PROVIDER_URGENCY_OPTIONS,
  PROVIDER_US_STATES,
} from "@/lib/provider-options";
import type { MarketCode } from "@/types/market";

type MatcherState = {
  treatmentSlug: string;
  goal: string;
  state: string;
  insuranceStatus: string;
  budgetBand: string;
  urgency: string;
  email: string;
};

type ProviderLeadResponse = {
  ok: boolean;
  leadId: string;
  status: string;
  providerEnabled: boolean;
  primaryPartnerSlug: string;
  qualificationScore: number;
  qualificationBand: "high" | "medium" | "low";
  scoreReasons: string[];
  matches: ProviderPartner[];
};

export function ProviderMatcher({
  marketCode,
  initialTreatment = "general",
}: {
  marketCode: MarketCode;
  initialTreatment?: string;
}) {
  const providerEnabled = canShowProviderReferrals(marketCode);
  const [started, setStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<ProviderPartner[]>([]);
  const [primaryPartnerSlug, setPrimaryPartnerSlug] = useState<string>("manual-review");
  const [leadScore, setLeadScore] = useState<number>(0);
  const [qualificationBand, setQualificationBand] = useState<"high" | "medium" | "low">("low");
  const [scoreReasons, setScoreReasons] = useState<string[]>([]);
  const [form, setForm] = useState<MatcherState>({
    treatmentSlug: PROVIDER_TREATMENT_OPTIONS.some((option) => option.value === initialTreatment)
      ? initialTreatment
      : "general",
    goal: "weight-management",
    state: "",
    insuranceStatus: "either",
    budgetBand: "unsure",
    urgency: "researching",
    email: "",
  });

  const recommendation = useMemo(() => {
    if (form.insuranceStatus === "insured") {
      return "Prioritize routing profiles that emphasize insurance navigation and prior-authorization support.";
    }
    if (form.budgetBand === "under-200") {
      return "Start with routing profiles that emphasize transparent cash-pay workflows and lower-friction intake.";
    }
    if (form.urgency === "this-week") {
      return "Prioritize telehealth-first routing profiles where faster intake may be available.";
    }
    return "Start with regulated telehealth or specialist routing profiles and use the match summary to narrow your next step.";
  }, [form.budgetBand, form.insuranceStatus, form.urgency]);

  function updateField<K extends keyof MatcherState>(key: K, value: MatcherState[K]) {
    if (!started) {
      trackProviderMatcherStart(marketCode, "providers_page", form.treatmentSlug);
      setStarted(true);
    }
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.email.trim()) {
      setError("Email is required so we can send your match summary.");
      return;
    }

    setIsSubmitting(true);

    try {
      trackProviderMatcherComplete(
        marketCode,
        form.treatmentSlug,
        form.budgetBand,
        form.insuranceStatus
      );

      const response = await fetch("/api/leads/provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marketCode,
          partnerSlug: providerEnabled ? "manual-review" : "waitlist-only",
          leadType: providerEnabled ? "provider-match" : "waitlist-match",
          treatmentSlug: form.treatmentSlug,
          goal: form.goal,
          state: form.state,
          insuranceStatus: form.insuranceStatus,
          budgetBand: form.budgetBand,
          urgency: form.urgency,
          email: form.email,
          entryPoint: "provider_matcher",
        }),
      });

      if (!response.ok) {
        throw new Error("Provider matcher request failed");
      }

      const data = (await response.json()) as ProviderLeadResponse;
      setMatches(Array.isArray(data.matches) ? data.matches : []);
      setPrimaryPartnerSlug(data.primaryPartnerSlug || "manual-review");
      setLeadScore(typeof data.qualificationScore === "number" ? data.qualificationScore : 0);
      setQualificationBand(data.qualificationBand ?? "low");
      setScoreReasons(Array.isArray(data.scoreReasons) ? data.scoreReasons : []);

      trackProviderLeadSubmit(
        marketCode,
        data.primaryPartnerSlug || (providerEnabled ? "manual-review" : "waitlist-only"),
        providerEnabled ? "provider-match" : "waitlist-match",
        form.treatmentSlug
      );

      setSubmitted(true);
    } catch {
      setError("We could not save your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0" }}
      >
        <h2 className="text-xl font-bold mb-3" style={{ color: "#065F46" }}>
          {providerEnabled ? "Your provider match request is in" : "You’re on the market waitlist"}
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#047857" }}>
          {providerEnabled
            ? `We saved your ${humanizeProviderTreatment(form.treatmentSlug)} request and your match summary will be routed for follow-up.`
            : `We saved your ${humanizeProviderTreatment(form.treatmentSlug)} interest and will notify you when provider matching opens in this market.`}
        </p>
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1FAE5" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#059669" }}>
            Suggested Next Step
          </div>
          <div className="text-sm" style={{ color: "#1C2028" }}>
            {recommendation}
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1FAE5" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#059669" }}>
              Qualification
            </div>
            <div className="text-lg font-bold capitalize" style={{ color: "#065F46" }}>
              {qualificationBand}
            </div>
          </div>
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1FAE5" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#059669" }}>
              Lead Score
            </div>
            <div className="text-lg font-bold" style={{ color: "#065F46" }}>
              {leadScore}/100
            </div>
          </div>
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1FAE5" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#059669" }}>
              Lead Signals
            </div>
            <div className="text-sm" style={{ color: "#1C2028" }}>
              {scoreReasons.slice(0, 2).join(" • ") || "Baseline intake captured"}
            </div>
          </div>
        </div>
        {matches.length > 0 && (
          <div className="mt-4 grid gap-3">
            {matches.map((partner) => (
              <ProviderPartnerCard
                key={partner.slug}
                partner={partner}
                location="provider_matcher"
                marketCode={marketCode}
                href={`/contact?topic=provider-match&partner=${partner.slug}&treatment=${form.treatmentSlug}`}
                ctaLabel="Request follow-up with this route"
              />
            ))}
          </div>
        )}
        {providerEnabled && matches.length === 0 && (
          <div className="mt-4 text-sm" style={{ color: "#047857" }}>
            Your request is saved under <strong>{primaryPartnerSlug}</strong> for manual routing.
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A3A5C" }}>
          Provider Matcher
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "#5A6577" }}>
          {providerEnabled
            ? "Tell us what you need and we will package the right routing profile for your situation."
            : "Provider routing is not live in this market yet, but you can still save your preferences and join the rollout list."}
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Treatment interest
            <select
              value={form.treatmentSlug}
              onChange={(event) => updateField("treatmentSlug", event.target.value)}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              {PROVIDER_TREATMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Primary goal
            <select
              value={form.goal}
              onChange={(event) => updateField("goal", event.target.value)}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              {PROVIDER_GOAL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            State
            <select
              value={form.state}
              onChange={(event) => updateField("state", event.target.value)}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              <option value="">Select a state</option>
              {PROVIDER_US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Insurance
            <select
              value={form.insuranceStatus}
              onChange={(event) => updateField("insuranceStatus", event.target.value)}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              {PROVIDER_INSURANCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Budget
            <select
              value={form.budgetBand}
              onChange={(event) => updateField("budgetBand", event.target.value)}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              {PROVIDER_BUDGET_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Timeline
            <select
              value={form.urgency}
              onChange={(event) => updateField("urgency", event.target.value)}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              {PROVIDER_URGENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            />
          </label>
        </div>

        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
            Match Logic
          </div>
          <div className="text-sm" style={{ color: "#1C2028" }}>
            {recommendation}
          </div>
        </div>

        {error && (
          <div className="text-sm font-medium" style={{ color: "#B91C1C" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold"
          style={{
            backgroundColor: isSubmitting ? "#94A3B8" : "#1A3A5C",
            color: "#FFFFFF",
          }}
        >
          {isSubmitting
            ? "Saving..."
            : providerEnabled
            ? "Request Provider Match"
            : "Join Provider Rollout List"}
        </button>
      </form>
    </div>
  );
}

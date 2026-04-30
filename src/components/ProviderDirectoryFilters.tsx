"use client";

import Link from "next/link";
import type { MarketCode } from "@/types/market";
import {
  PROVIDER_BUDGET_OPTIONS,
  PROVIDER_GOAL_OPTIONS,
  PROVIDER_INTAKE_MODE_OPTIONS,
  PROVIDER_INSURANCE_OPTIONS,
  PROVIDER_TREATMENT_OPTIONS,
  PROVIDER_URGENCY_OPTIONS,
} from "@/lib/provider-options";
import { trackProviderDirectoryFilter } from "@/lib/analytics";

interface ProviderDirectoryFiltersProps {
  marketCode: MarketCode;
  currentTreatment: string;
  currentGoal: string;
  currentInsurance: string;
  currentBudget: string;
  currentUrgency: string;
  currentIntakeMode: string;
}

export function ProviderDirectoryFilters({
  marketCode,
  currentTreatment,
  currentGoal,
  currentInsurance,
  currentBudget,
  currentUrgency,
  currentIntakeMode,
}: ProviderDirectoryFiltersProps) {
  const hasActiveFilters =
    currentTreatment !== "all" ||
    currentGoal !== "all" ||
    currentInsurance !== "all" ||
    currentBudget !== "all" ||
    currentUrgency !== "all" ||
    currentIntakeMode !== "all";

  return (
    <section
      className="tool-shell rounded-xl p-5 mb-8"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-bold mb-1" style={{ color: "#1A3A5C" }}>
            Browse Routing Profiles
          </h2>
          <p className="text-sm leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
            Filter the current routing-profile dataset by treatment, goal, insurance, budget, urgency, and intake style. These filters only change how PeptideScholar organizes its internal routing framework.
          </p>
        </div>
        {hasActiveFilters && (
          <Link
            href="/providers"
            className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold"
            style={{ backgroundColor: "#F8FAFC", color: "#1A3A5C", border: "1px solid #D0D7E2", textDecoration: "none" }}
          >
            Clear filters
          </Link>
        )}
      </div>

      <form
        method="get"
        className="grid gap-4"
        onSubmit={(event) => {
          const formData = new FormData(event.currentTarget);
          trackProviderDirectoryFilter(
            marketCode,
            String(formData.get("treatment") ?? "all"),
            String(formData.get("goal") ?? "all"),
            String(formData.get("insurance") ?? "all"),
            String(formData.get("budget") ?? "all"),
            String(formData.get("urgency") ?? "all"),
            String(formData.get("mode") ?? "all")
          );
        }}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Treatment
            <select
              name="treatment"
              defaultValue={currentTreatment}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              <option value="all">All treatments</option>
              {PROVIDER_TREATMENT_OPTIONS.filter((option) => option.value !== "general").map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Goal
            <select
              name="goal"
              defaultValue={currentGoal}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              <option value="all">All goals</option>
              {PROVIDER_GOAL_OPTIONS.filter((option) => option.value !== "education-first").map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Insurance
            <select
              name="insurance"
              defaultValue={currentInsurance}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              <option value="all">All insurance styles</option>
              {PROVIDER_INSURANCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Budget
            <select
              name="budget"
              defaultValue={currentBudget}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              <option value="all">All budget bands</option>
              {PROVIDER_BUDGET_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Urgency
            <select
              name="urgency"
              defaultValue={currentUrgency}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              <option value="all">All urgency levels</option>
              {PROVIDER_URGENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" style={{ color: "#1A3A5C" }}>
            Intake style
            <select
              name="mode"
              defaultValue={currentIntakeMode}
              className="rounded-lg px-3 py-2"
              style={{ border: "1px solid #D0D7E2", backgroundColor: "#FFFFFF" }}
            >
              <option value="all">All intake styles</option>
              {PROVIDER_INTAKE_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: "#1A3A5C", color: "#FFFFFF" }}
          >
            Apply filters
          </button>
          <Link
            href="/providers"
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: "#FFFFFF", color: "#1A3A5C", border: "1px solid #D0D7E2", textDecoration: "none" }}
          >
            Reset directory
          </Link>
        </div>
      </form>
    </section>
  );
}

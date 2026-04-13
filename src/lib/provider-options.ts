export const PROVIDER_US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

export const PROVIDER_TREATMENT_OPTIONS = [
  { value: "semaglutide", label: "Semaglutide" },
  { value: "tirzepatide", label: "Tirzepatide" },
  { value: "tesamorelin", label: "Tesamorelin" },
  { value: "sermorelin", label: "Sermorelin" },
  { value: "bremelanotide", label: "Bremelanotide" },
  { value: "general", label: "I need help choosing" },
] as const;

export const PROVIDER_GOAL_OPTIONS = [
  { value: "weight-management", label: "Weight management" },
  { value: "metabolic-health", label: "Metabolic health" },
  { value: "hormone-support", label: "Hormone support" },
  { value: "sexual-health", label: "Sexual health" },
  { value: "education-first", label: "Education first" },
] as const;

export const PROVIDER_INSURANCE_OPTIONS = [
  { value: "insured", label: "I want to use insurance" },
  { value: "cash-pay", label: "I can self-pay" },
  { value: "either", label: "Either is fine" },
] as const;

export const PROVIDER_BUDGET_OPTIONS = [
  { value: "under-200", label: "Under $200 / month" },
  { value: "200-500", label: "$200-$500 / month" },
  { value: "500-plus", label: "$500+ / month" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const PROVIDER_URGENCY_OPTIONS = [
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "researching", label: "Still researching" },
] as const;

export const PROVIDER_INTAKE_MODE_OPTIONS = [
  { value: "telehealth", label: "Telehealth-first" },
  { value: "hybrid", label: "Hybrid / specialist-led" },
] as const;

export function humanizeProviderTreatment(slug: string) {
  return PROVIDER_TREATMENT_OPTIONS.find((option) => option.value === slug)?.label ?? formatProviderSlug(slug);
}

export function humanizeProviderGoal(slug: string) {
  return PROVIDER_GOAL_OPTIONS.find((option) => option.value === slug)?.label ?? formatProviderSlug(slug);
}

export function humanizeProviderInsurance(slug: string) {
  return PROVIDER_INSURANCE_OPTIONS.find((option) => option.value === slug)?.label ?? formatProviderSlug(slug);
}

export function humanizeProviderInsuranceTaxonomy(slug: string) {
  switch (slug) {
    case "insured":
      return "Insurance-First";
    case "cash-pay":
      return "Self-Pay";
    case "either":
      return "Flexible Payment";
    default:
      return humanizeProviderInsurance(slug);
  }
}

export function humanizeProviderBudget(slug: string) {
  return PROVIDER_BUDGET_OPTIONS.find((option) => option.value === slug)?.label ?? formatProviderSlug(slug);
}

export function humanizeProviderUrgency(slug: string) {
  return PROVIDER_URGENCY_OPTIONS.find((option) => option.value === slug)?.label ?? formatProviderSlug(slug);
}

export function humanizeProviderIntakeMode(slug: string) {
  return PROVIDER_INTAKE_MODE_OPTIONS.find((option) => option.value === slug)?.label ?? formatProviderSlug(slug);
}

export function formatProviderSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

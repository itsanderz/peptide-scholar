declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

// ── Core ─────────────────────────────────────────────────────────────────

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Also tag Clarity custom events for session replay filtering
function tagClarity(key: string, value: string) {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("set", key, value);
  }
}

// ── Page-Level Tracking ──────────────────────────────────────────────────
// These fire once when a user views a specific content page.

export function trackPeptidePageView(slug: string, name: string, evidenceLevel: string, category: string) {
  trackEvent("peptide_view", {
    peptide_slug: slug,
    peptide_name: name,
    evidence_level: evidenceLevel,
    peptide_category: category,
  });
  tagClarity("peptide", name);
}

export function trackComparisonPageView(slug: string, peptideA: string, peptideB: string) {
  trackEvent("comparison_view", {
    comparison_slug: slug,
    peptide_a: peptideA,
    peptide_b: peptideB,
  });
  tagClarity("comparison", slug);
}

export function trackStatePageView(state: string) {
  trackEvent("state_view", { state_name: state });
  tagClarity("state", state);
}

export function trackPeptideStatePageView(peptideSlug: string, state: string) {
  trackEvent("peptide_state_view", {
    peptide_slug: peptideSlug,
    state_name: state,
  });
  tagClarity("peptide_state", `${peptideSlug}_${state}`);
}

export function trackCategoryPageView(category: string) {
  trackEvent("category_view", { category_name: category });
  tagClarity("category", category);
}

export function trackGuidePageView(guideSlug: string) {
  trackEvent("guide_view", { guide_slug: guideSlug });
  tagClarity("guide", guideSlug);
}

// ── Tool Interaction Tracking ────────────────────────────────────────────
// These fire when users interact with tools, capturing their specific inputs.

export function trackToolInteraction(tool: string, params: Record<string, string | number>) {
  trackEvent("tool_interaction", { tool_name: tool, ...params });
  tagClarity("tool", tool);
}

// Symptom checker: which medication + symptom
export function trackSymptomCheck(medication: string, symptom: string) {
  trackEvent("symptom_check", {
    medication_name: medication,
    symptom_name: symptom,
  });
  tagClarity("symptom_check", `${medication}_${symptom}`);
}

// Titration planner: which medication
export function trackTitrationPlan(medication: string) {
  trackEvent("titration_plan", { medication_name: medication });
  tagClarity("titration", medication);
}

// Cost calculator: which medication
export function trackCostLookup(medication: string) {
  trackEvent("cost_lookup", { medication_name: medication });
  tagClarity("cost_lookup", medication);
}

// Side effect comparison: which profiles selected
export function trackSideEffectCompare(medications: string[]) {
  trackEvent("side_effect_compare", {
    medications: medications.join(","),
    medication_count: medications.length,
  });
}

// Interaction checker: which pair
export function trackInteractionCheck(peptideA: string, peptideB: string, severity: string) {
  trackEvent("interaction_check", {
    peptide_a: peptideA,
    peptide_b: peptideB,
    interaction_severity: severity,
  });
  tagClarity("interaction", `${peptideA}_${peptideB}`);
}

// Legal checker: which peptide + state
export function trackLegalCheck(peptide: string, state: string) {
  trackEvent("legal_check", {
    peptide_name: peptide,
    state_name: state,
  });
  tagClarity("legal_check", `${peptide}_${state}`);
}

// Peptide finder: selections made
export function trackPeptideFinderResult(categories: string[], evidenceFilter: string, resultCount: number) {
  trackEvent("peptide_finder_result", {
    selected_categories: categories.join(","),
    evidence_filter: evidenceFilter,
    result_count: resultCount,
  });
}

// Protein calculator: inputs
export function trackProteinCalc(weightKg: number, ageRange: string, activityLevel: string, dailyTarget: number) {
  trackEvent("protein_calc", {
    weight_kg: Math.round(weightKg),
    age_range: ageRange,
    activity_level: activityLevel,
    daily_protein_target: Math.round(dailyTarget),
  });
}

// ── Engagement Tracking ──────────────────────────────────────────────────

export const trackToolUse = (tool: string, action: string) =>
  trackEvent("tool_use", { tool_name: tool, tool_action: action });

export const trackCTAClick = (cta: string, location: string) =>
  trackEvent("cta_click", { cta_name: cta, cta_location: location });

export const trackEmailSignup = (location: string) =>
  trackEvent("email_signup", { signup_location: location });

export const trackSearch = (query: string, resultCount: number) =>
  trackEvent("site_search", { search_term: query, result_count: resultCount });

export const trackOutboundClick = (url: string, context: string) =>
  trackEvent("outbound_click", { link_url: url, link_context: context });

export const trackScrollDepth = (depth: number, page: string) =>
  trackEvent("scroll_depth", { depth_percent: depth, page_path: page });

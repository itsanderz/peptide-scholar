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

export const trackEmailSignup = (
  location: string,
  market?: string,
  offerSlug?: string
) =>
  trackEvent("email_signup", {
    signup_location: location,
    ...(market ? { market } : {}),
    ...(offerSlug ? { offer_slug: offerSlug } : {}),
  });

export const trackSearch = (query: string, resultCount: number) =>
  trackEvent("site_search", { search_term: query, result_count: resultCount });

export function trackHalfLifeCalc(medication: string, daysSinceDose: number) {
  trackEvent("half_life_calc", {
    medication,
    days_since_dose: daysSinceDose,
  });
}

export function trackVialPlanner(peptide: string, vialMg: number, frequency: string) {
  trackEvent("vial_planner", {
    peptide,
    vial_mg: vialMg,
    frequency,
  });
}

export const trackOutboundClick = (url: string, context: string) =>
  trackEvent("outbound_click", { link_url: url, link_context: context });

export const trackScrollDepth = (depth: number, page: string) =>
  trackEvent("scroll_depth", { depth_percent: depth, page_path: page });

export const trackMarketPageView = (market: string, pageFamily: string, pageSlug: string) =>
  trackEvent("market_page_view", {
    market,
    page_family: pageFamily,
    page_slug: pageSlug,
  });

export const trackMarketSelection = (market: string, selectionSource: string) =>
  trackEvent("market_selected", {
    market,
    selection_source: selectionSource,
  });

export const trackProviderMatcherStart = (
  market: string,
  entryPoint: string,
  treatmentSlug?: string
) =>
  trackEvent("provider_matcher_start", {
    market,
    entry_point: entryPoint,
    ...(treatmentSlug ? { treatment_slug: treatmentSlug } : {}),
  });

export const trackProviderMatcherComplete = (
  market: string,
  treatmentSlug: string,
  budgetBand: string,
  insuranceStatus: string
) =>
  trackEvent("provider_matcher_complete", {
    market,
    treatment_slug: treatmentSlug,
    budget_band: budgetBand,
    insurance_status: insuranceStatus,
  });

export const trackProviderLeadSubmit = (
  market: string,
  partnerSlug: string,
  leadType: string,
  treatmentSlug: string
) =>
  trackEvent("provider_lead_submit", {
    market,
    partner_slug: partnerSlug,
    lead_type: leadType,
    treatment_slug: treatmentSlug,
  });

export const trackProviderPartnerSelect = (
  market: string,
  partnerSlug: string,
  location: string
) =>
  trackEvent("provider_partner_select", {
    market,
    partner_slug: partnerSlug,
    selection_location: location,
  });

export const trackProviderPartnerContactIntent = (
  market: string,
  partnerSlug: string,
  treatmentSlug?: string
) =>
  trackEvent("provider_partner_contact_intent", {
    market,
    partner_slug: partnerSlug,
    ...(treatmentSlug ? { treatment_slug: treatmentSlug } : {}),
  });

export const trackProviderDirectoryFilter = (
  market: string,
  treatmentSlug: string,
  goal: string,
  insuranceStatus: string,
  budgetBand: string,
  urgency: string,
  intakeMode: string
) =>
  trackEvent("provider_directory_filter", {
    market,
    treatment_slug: treatmentSlug,
    goal,
    insurance_status: insuranceStatus,
    budget_band: budgetBand,
    urgency,
    intake_mode: intakeMode,
  });

export const trackAppWaitlistJoin = (
  market: string,
  appUseCase: string,
  platformInterest: string
) =>
  trackEvent("app_waitlist_join", {
    market,
    app_use_case: appUseCase,
    platform_interest: platformInterest,
  });

export const trackAppInstallIntent = (
  market: string,
  appUseCase: string,
  platform: string
) =>
  trackEvent("app_install_intent", {
    market,
    app_use_case: appUseCase,
    platform,
  });

export const trackToolExport = (market: string, tool: string, exportFormat: string) =>
  trackEvent("tool_export", {
    market,
    tool_name: tool,
    export_format: exportFormat,
  });

export const trackToolSave = (market: string, tool: string, saveTarget: string) =>
  trackEvent("tool_save", {
    market,
    tool_name: tool,
    save_target: saveTarget,
  });

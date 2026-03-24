declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Tool usage
export const trackToolUse = (tool: string, action: string) =>
  trackEvent("tool_use", { tool_name: tool, tool_action: action });

// CTA clicks
export const trackCTAClick = (cta: string, location: string) =>
  trackEvent("cta_click", { cta_name: cta, cta_location: location });

// Email signup
export const trackEmailSignup = (location: string) =>
  trackEvent("email_signup", { signup_location: location });

// Search/filter
export const trackSearch = (query: string, resultCount: number) =>
  trackEvent("site_search", { search_term: query, result_count: resultCount });

// Peptide view
export const trackPeptideView = (peptide: string, evidenceLevel: string) =>
  trackEvent("peptide_view", { peptide_name: peptide, evidence_level: evidenceLevel });

// Comparison view
export const trackComparisonView = (comparison: string) =>
  trackEvent("comparison_view", { comparison_pair: comparison });

// Category navigation
export const trackCategoryClick = (category: string) =>
  trackEvent("category_click", { category_name: category });

// External link click
export const trackOutboundClick = (url: string, context: string) =>
  trackEvent("outbound_click", { link_url: url, link_context: context });

// Scroll depth (for long pages)
export const trackScrollDepth = (depth: number, page: string) =>
  trackEvent("scroll_depth", { depth_percent: depth, page_path: page });

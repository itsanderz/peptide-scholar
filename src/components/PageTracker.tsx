"use client";

import { useEffect, useRef } from "react";

interface PageTrackerProps {
  event: string;
  params: Record<string, string | number>;
}

/**
 * Fires a single GA4 event on mount. Used on content pages to track
 * which peptides, states, comparisons, categories, and guides users view.
 *
 * Usage: <PageTracker event="peptide_view" params={{ peptide_slug: "bpc-157", ... }} />
 */
export function PageTracker({ event, params }: PageTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event, params);
    }

    // Also tag Clarity for session filtering
    if (typeof window !== "undefined" && window.clarity) {
      const key = Object.keys(params)[0] || event;
      const val = String(Object.values(params)[0] || "");
      window.clarity("set", key, val);
    }
  }, [event, params]);

  return null;
}

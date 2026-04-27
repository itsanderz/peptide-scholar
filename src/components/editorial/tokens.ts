/**
 * Editorial design tokens — pilot design system inspired by peptaura, Levels,
 * and Stripe Press. Used on the design pilot (currently: /treatments/semaglutide).
 *
 * Not wired into Tailwind config yet; intentionally referenced inline so the
 * pilot stays visually isolated and easy to roll back.
 */
export const EDITORIAL = {
  // Paper / ink palette — warm, low-saturation
  paper: "#F5F2EC",
  paperDeep: "#ECE7DD",
  ink: "#121212",
  inkMuted: "#5C584F",
  rule: "#1F1E1B",
  ruleSoft: "#C9C2B3",

  // Single accent — sage. Used sparingly, primarily for links + rule accents.
  sage: "#4F6F5A",
  sageDeep: "#2F4438",

  // Status tones kept calm (no red/orange alarm)
  warn: "#8A6A1F",
  warnSurface: "#F2E9D1",

  // Typography scale — see app/layout.tsx for font vars
  serif: "var(--font-source-serif-4)",
  sans: "var(--font-libre-franklin)",
} as const;

export const editorialFont = {
  display: { fontFamily: EDITORIAL.serif, letterSpacing: "-0.02em" },
  eyebrow: {
    fontFamily: EDITORIAL.sans,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    fontWeight: 600,
  },
  body: { fontFamily: EDITORIAL.serif },
  meta: { fontFamily: EDITORIAL.sans },
};

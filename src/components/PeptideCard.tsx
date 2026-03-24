import Link from "next/link";
import { EvidenceBadge } from "./EvidenceBadge";

interface PeptideCardProps {
  name: string;
  slug: string;
  category: string;
  evidenceLevel: "A" | "B" | "C" | "D";
  description: string;
  fdaStatus: string;
  href?: string;
}

const LEVEL_ACCENT: Record<string, string> = {
  A: "#16a34a",
  B: "#2563eb",
  C: "#d97706",
  D: "#dc2626",
};

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  "Healing & Recovery": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
  ),
  "Growth Hormone Secretagogues": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
  ),
  "Weight Loss": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 3v1m0 16v1" /></svg>
  ),
  "Sexual Health": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
  ),
  "Sleep & Stress": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
  ),
  "Cognitive Enhancement": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
  ),
  "Anti-Aging & Longevity": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
  ),
  "Immune Support": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  ),
  "Anti-Inflammatory": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
  ),
};

export function PeptideCard({
  name,
  slug,
  category,
  evidenceLevel,
  description,
  fdaStatus,
  href,
}: PeptideCardProps) {
  const linkHref = href || `/peptides/${slug}`;
  const accent = LEVEL_ACCENT[evidenceLevel] || "#1A3A5C";
  const isApproved = fdaStatus.toLowerCase().includes("approved");
  const isCos = fdaStatus.toLowerCase().includes("cosmetic");
  const categoryIcon = CATEGORY_ICON[category] || null;

  return (
    <Link
      href={linkHref}
      className="group block relative rounded-xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D0D7E2",
      }}
    >
      {/* Top accent bar */}
      <div className="h-1.5" style={{ background: accent }} />

      <div className="p-5">
        {/* Header row: name + evidence badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="text-lg font-bold leading-tight group-hover:text-[#3B7A9E] transition-colors"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            {name}
          </h3>
          <EvidenceBadge level={evidenceLevel} showLabel={false} />
        </div>

        {/* Pills row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* Category pill with icon */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold"
            style={{
              backgroundColor: "#F0F3F7",
              color: "#3B7A9E",
              border: "1px solid #D0D7E2",
            }}
          >
            {categoryIcon && <span className="opacity-70">{categoryIcon}</span>}
            {category}
          </span>

          {/* FDA status pill */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold"
            style={{
              backgroundColor: isApproved ? "#ECFDF5" : isCos ? "#EFF6FF" : "#FFFBEB",
              color: isApproved ? "#15803d" : isCos ? "#1d4ed8" : "#92400e",
              border: `1px solid ${isApproved ? "#BBF7D0" : isCos ? "#BFDBFE" : "#FDE68A"}`,
            }}
          >
            {isApproved && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
            )}
            {fdaStatus}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: "#5A6577" }}
        >
          {description}
        </p>

        {/* Footer CTA */}
        <div
          className="mt-4 pt-3 flex items-center justify-between"
          style={{ borderTop: "1px solid #F0F3F7" }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#6B7280" }}
          >
            Evidence Level {evidenceLevel}
          </span>
          <span
            className="text-xs font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1"
            style={{ color: "#3B7A9E" }}
          >
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

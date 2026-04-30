import React from "react";

interface MedicalReviewBadgeProps {
  reviewerName: string;
  reviewerCredentials: string;
  reviewedAt: string;
  nextReviewAt?: string;
}

export const MedicalReviewBadge: React.FC<MedicalReviewBadgeProps> = ({
  reviewerName,
  reviewerCredentials,
  reviewedAt,
  nextReviewAt,
}) => {
  const reviewDate = new Date(reviewedAt);
  const now = new Date();
  const daysSince = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24));

  let freshness: "current" | "recent" | "stale" = "current";
  if (daysSince > 180) freshness = "stale";
  else if (daysSince > 90) freshness = "recent";

  const freshnessColors = {
    current: { bg: "#F0FDF4", border: "#BBF7D0", text: "#166534", dot: "#22C55E" },
    recent: { bg: "#FFFBEB", border: "#FCD34D", text: "#92400E", dot: "#F59E0B" },
    stale: { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B", dot: "#EF4444" },
  };

  const colors = freshnessColors[freshness];

  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3"
      style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <div className="mt-0.5 shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold" style={{ color: colors.text }}>
            Medically Reviewed
          </span>
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.dot }}
            title={freshness === "current" ? "Reviewed within 90 days" : freshness === "recent" ? "Reviewed within 180 days" : "Review pending"}
          />
        </div>
        <p className="text-sm mt-1" style={{ color: colors.text }}>
          This content was medically reviewed by{" "}
          <span className="font-semibold">{reviewerName}</span>,{" "}
          <span>{reviewerCredentials}</span>.
        </p>
        <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: colors.text, opacity: 0.8 }}>
          <span>Last reviewed: {reviewDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          {nextReviewAt && (
            <span>Next review: {new Date(nextReviewAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          )}
        </div>
      </div>
    </div>
  );
};

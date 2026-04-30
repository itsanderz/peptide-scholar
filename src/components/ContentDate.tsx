import React from "react";

interface ContentDateProps {
  publishedAt?: string;
  updatedAt?: string;
  reviewedAt?: string;
  showFreshness?: boolean;
}

export const ContentDate: React.FC<ContentDateProps> = ({
  publishedAt,
  updatedAt,
  reviewedAt,
  showFreshness = true,
}) => {
  const dates: { label: string; date: Date }[] = [];

  if (publishedAt) dates.push({ label: "Published", date: new Date(publishedAt) });
  if (updatedAt) dates.push({ label: "Updated", date: new Date(updatedAt) });
  if (reviewedAt) dates.push({ label: "Medically reviewed", date: new Date(reviewedAt) });

  if (dates.length === 0) return null;

  const now = new Date();
  const mostRecent = dates.reduce((a, b) => (a.date > b.date ? a : b));
  const daysSince = Math.floor((now.getTime() - mostRecent.date.getTime()) / (1000 * 60 * 60 * 24));

  let freshnessLabel = "";
  let freshnessColor = "";
  if (daysSince <= 30) {
    freshnessLabel = "Current";
    freshnessColor = "#166534";
  } else if (daysSince <= 90) {
    freshnessLabel = "Recent";
    freshnessColor = "#92400E";
  } else if (daysSince <= 180) {
    freshnessLabel = "May need review";
    freshnessColor = "#991B1B";
  } else {
    freshnessLabel = "Outdated";
    freshnessColor = "#991B1B";
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: "#5A6577" }}>
      {dates.map((d) => (
        <span key={d.label}>
          <span className="font-medium">{d.label}:</span>{" "}
          {d.date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      ))}
      {showFreshness && freshnessLabel && (
        <span
          className="font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider"
          style={{ backgroundColor: `${freshnessColor}12`, color: freshnessColor }}
        >
          {freshnessLabel}
        </span>
      )}
    </div>
  );
};

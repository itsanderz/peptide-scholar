interface ReviewedBadgeProps {
  lastReviewed?: string; // ISO date string, defaults to "2026-03-01"
  compact?: boolean;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatDateShort(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ReviewedBadge({
  lastReviewed = "2026-03-01",
  compact = false,
}: ReviewedBadgeProps) {
  if (compact) {
    return (
      <div
        className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md"
        style={{
          backgroundColor: "#F0F7FA",
          color: "#2C6E8A",
          border: "1px solid #C8DDE8",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3B7A9E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <span>
          Reviewed {formatDateShort(lastReviewed)} | Sources: PubMed
        </span>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg p-4 mb-4"
      style={{
        backgroundColor: "#F0F7FA",
        borderLeft: "4px solid #3B7A9E",
        border: "1px solid #C8DDE8",
        borderLeftWidth: "4px",
        borderLeftColor: "#3B7A9E",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Shield icon */}
        <div
          className="flex-shrink-0 mt-0.5"
          style={{ color: "#3B7A9E" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "#1A3A5C" }}
          >
            Content reviewed by clinical research staff
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "#4A6E85" }}>
            <span>Last reviewed: {formatDate(lastReviewed)}</span>
            <span>Sources: PubMed, FDA, WADA Prohibited List</span>
          </div>
          <p
            className="text-xs mt-1.5"
            style={{ color: "#5A8A9E" }}
          >
            Evidence graded using the PeptideScholar A-D system
          </p>
        </div>
      </div>
    </div>
  );
}

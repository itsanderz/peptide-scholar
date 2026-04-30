interface ReviewedBadgeProps {
  lastReviewed?: string;
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

function ShieldIcon() {
  return (
    <svg
      className="reviewed-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function ReviewedBadge({
  lastReviewed = "2026-03-01",
  compact = false,
}: ReviewedBadgeProps) {
  if (compact) {
    return (
      <div className="reviewed-badge is-compact">
        <ShieldIcon />
        <span>Reviewed {formatDateShort(lastReviewed)} | PubMed sources</span>
      </div>
    );
  }

  return (
    <div className="reviewed-badge">
      <ShieldIcon />
      <div>
        <p className="reviewed-title">Content reviewed by clinical research staff</p>
        <div className="reviewed-meta">
          <span>Last reviewed: {formatDate(lastReviewed)}</span>
          <span>Sources: PubMed, FDA, WADA Prohibited List</span>
        </div>
        <p className="reviewed-note">Evidence graded using the PeptideScholar A-D system.</p>
      </div>
    </div>
  );
}

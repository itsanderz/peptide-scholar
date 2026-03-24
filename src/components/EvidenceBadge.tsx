interface EvidenceBadgeProps {
  level: "A" | "B" | "C" | "D";
  showLabel?: boolean;
}

const EVIDENCE_CONFIG = {
  A: {
    label: "FDA Approved",
    bg: "#dcfce7",
    border: "#16a34a",
    text: "#15803d",
    title: "Level A: FDA-approved therapeutic with robust clinical evidence",
  },
  B: {
    label: "Human Studies",
    bg: "#dbeafe",
    border: "#2563eb",
    text: "#1d4ed8",
    title: "Level B: Supported by human clinical studies but not FDA-approved for this indication",
  },
  C: {
    label: "Preclinical",
    bg: "#fef3c7",
    border: "#d97706",
    text: "#b45309",
    title: "Level C: Preclinical (animal or in vitro) evidence only; no adequate human trials",
  },
  D: {
    label: "Limited Data",
    bg: "#fee2e2",
    border: "#dc2626",
    text: "#b91c1c",
    title: "Level D: Very limited or no published scientific evidence",
  },
} as const;

export function EvidenceBadge({ level, showLabel = true }: EvidenceBadgeProps) {
  const config = EVIDENCE_CONFIG[level];

  return (
    <span
      title={config.title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.2rem 0.6rem",
        borderRadius: "9999px",
        fontSize: "0.8rem",
        fontWeight: 700,
        lineHeight: 1.4,
        backgroundColor: config.bg,
        border: `1.5px solid ${config.border}`,
        color: config.text,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1.25rem",
          height: "1.25rem",
          borderRadius: "50%",
          backgroundColor: config.border,
          color: "#fff",
          fontSize: "0.7rem",
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {level}
      </span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

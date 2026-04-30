interface EvidenceBadgeProps {
  level: "A" | "B" | "C" | "D";
  showLabel?: boolean;
}

const EVIDENCE_CONFIG = {
  A: {
    label: "FDA Approved",
    bg: "var(--lime, #d8e628)",
    border: "var(--black, #050505)",
    text: "var(--black, #050505)",
    title: "Level A: FDA-approved with robust clinical evidence",
  },
  B: {
    label: "Human Studies",
    bg: "var(--blue, #5d75c7)",
    border: "var(--black, #050505)",
    text: "var(--bone, #edeae3)",
    title: "Level B: Supported by human clinical studies",
  },
  C: {
    label: "Preclinical",
    bg: "var(--concrete, #cfcfc9)",
    border: "var(--black, #050505)",
    text: "var(--black, #050505)",
    title: "Level C: Preclinical evidence only",
  },
  D: {
    label: "Limited Data",
    bg: "var(--black, #050505)",
    border: "var(--black, #050505)",
    text: "var(--bone, #edeae3)",
    title: "Level D: Very limited or no published evidence",
  },
} as const;

export function EvidenceBadge({ level, showLabel = true }: EvidenceBadgeProps) {
  const config = EVIDENCE_CONFIG[level];

  return (
    <span
      title={config.title}
      className="tag"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1rem",
          height: "1rem",
          fontWeight: 800,
          fontSize: "0.65rem",
          lineHeight: 1,
        }}
      >
        {level}
      </span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

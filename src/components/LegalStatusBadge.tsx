interface LegalStatusBadgeProps {
  fdaStatus: "approved" | "not-approved" | "cosmetic";
  prescriptionRequired: boolean;
  wadaBanned: boolean;
  controlledSubstance: boolean;
}

interface BadgeConfig {
  label: string;
  bg: string;
  color: string;
  border: string;
}

export function LegalStatusBadge({
  fdaStatus,
  prescriptionRequired,
  wadaBanned,
  controlledSubstance,
}: LegalStatusBadgeProps) {
  const badges: BadgeConfig[] = [];

  // FDA status badge
  if (fdaStatus === "approved") {
    badges.push({
      label: "FDA Approved",
      bg: "#dcfce7",
      color: "#15803d",
      border: "#bbf7d0",
    });
  } else if (fdaStatus === "cosmetic") {
    badges.push({
      label: "Cosmetic Ingredient",
      bg: "#dbeafe",
      color: "#1d4ed8",
      border: "#bfdbfe",
    });
  } else {
    badges.push({
      label: "Not FDA Approved",
      bg: "#fee2e2",
      color: "#b91c1c",
      border: "#fecaca",
    });
  }

  if (prescriptionRequired) {
    badges.push({
      label: "Prescription Required",
      bg: "#ede9fe",
      color: "#6d28d9",
      border: "#ddd6fe",
    });
  }

  if (wadaBanned) {
    badges.push({
      label: "WADA Banned",
      bg: "#fff7ed",
      color: "#c2410c",
      border: "#fed7aa",
    });
  }

  if (controlledSubstance) {
    badges.push({
      label: "Controlled Substance",
      bg: "#fee2e2",
      color: "#b91c1c",
      border: "#fecaca",
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.4rem",
        alignItems: "center",
      }}
    >
      {badges.map((badge) => (
        <span
          key={badge.label}
          style={{
            display: "inline-block",
            padding: "0.2rem 0.55rem",
            borderRadius: "9999px",
            fontSize: "0.72rem",
            fontWeight: 600,
            lineHeight: 1.5,
            backgroundColor: badge.bg,
            color: badge.color,
            border: `1px solid ${badge.border}`,
            whiteSpace: "nowrap",
          }}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}

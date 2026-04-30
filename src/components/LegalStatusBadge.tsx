interface LegalStatusBadgeProps {
  fdaStatus: "approved" | "not-approved" | "cosmetic" | "discontinued";
  prescriptionRequired: boolean;
  wadaBanned: boolean;
  controlledSubstance: boolean;
}

interface BadgeConfig {
  label: string;
  tone: "approved" | "cosmetic" | "warn" | "alert" | "rx";
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
      tone: "approved",
    });
  } else if (fdaStatus === "cosmetic") {
    badges.push({
      label: "Cosmetic Ingredient",
      tone: "cosmetic",
    });
  } else if (fdaStatus === "discontinued") {
    badges.push({
      label: "Discontinued",
      tone: "warn",
    });
  } else {
    badges.push({
      label: "Not FDA Approved",
      tone: "alert",
    });
  }

  if (prescriptionRequired) {
    badges.push({
      label: "Prescription Required",
      tone: "rx",
    });
  }

  if (wadaBanned) {
    badges.push({
      label: "WADA Banned",
      tone: "warn",
    });
  }

  if (controlledSubstance) {
    badges.push({
      label: "Controlled Substance",
      tone: "alert",
    });
  }

  return (
    <div className="legal-badges">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`legal-badge is-${badge.tone}`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}

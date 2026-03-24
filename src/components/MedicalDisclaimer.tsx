interface MedicalDisclaimerProps {
  compact?: boolean;
}

export function MedicalDisclaimer({ compact = false }: MedicalDisclaimerProps) {
  if (compact) {
    return (
      <p
        style={{
          fontSize: "0.8rem",
          color: "var(--color-text-muted, #92400e)",
          fontStyle: "italic",
          margin: "0.5rem 0",
        }}
      >
        This content is for informational purposes only and does not constitute medical advice.
      </p>
    );
  }

  return (
    <div
      role="alert"
      style={{
        margin: "1.5rem 0",
        padding: "1rem 1.25rem",
        borderLeft: "4px solid #d97706",
        backgroundColor: "#fffbeb",
        borderRadius: "0 0.5rem 0.5rem 0",
        fontSize: "0.875rem",
        lineHeight: 1.65,
        color: "#92400e",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d97706"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: "0.1rem" }}
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>
          <p style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem", color: "#b45309" }}>
            Medical Disclaimer
          </p>
          <p style={{ marginBottom: "0.4rem" }}>
            This content is for <strong>informational and educational purposes only</strong> and does not
            constitute medical advice, diagnosis, or treatment recommendations.
          </p>
          <p style={{ marginBottom: "0.4rem" }}>
            Always consult a qualified healthcare provider before starting, stopping, or modifying any
            treatment. Do not disregard professional medical advice based on information found on this site.
          </p>
          <p style={{ margin: 0 }}>
            No claims of therapeutic efficacy are made for substances that are not FDA-approved for the
            discussed indications. Research citations reflect published findings and do not imply endorsement.
          </p>
        </div>
      </div>
    </div>
  );
}

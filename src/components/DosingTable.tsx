import { MedicalDisclaimer } from "./MedicalDisclaimer";

interface DosingTableProps {
  peptideName: string;
  dosingNotes: string;
  routes?: string[];
}

export function DosingTable({
  peptideName,
  dosingNotes,
  routes,
}: DosingTableProps) {
  return (
    <div
      style={{
        border: "2px solid #D4553A",
        borderRadius: "0.75rem",
        overflow: "hidden",
        margin: "1.5rem 0",
      }}
    >
      {/* Warning banner */}
      <div
        style={{
          backgroundColor: "#D4553A",
          color: "#fff",
          padding: "0.6rem 1rem",
          fontSize: "0.8rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          textAlign: "center",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        Not Medical Advice &mdash; Research-Reported Information Only
      </div>

      <div style={{ padding: "1.25rem" }}>
        <MedicalDisclaimer compact />

        <h4
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--color-primary, #1A3A5C)",
            margin: "1rem 0 0.5rem",
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          {peptideName} &mdash; Dosing in Published Research
        </h4>

        {routes && routes.length > 0 && (
          <div style={{ marginBottom: "0.75rem" }}>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--color-text-muted, #6b7280)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Reported Routes:{" "}
            </span>
            <span style={{ fontSize: "0.875rem", color: "var(--color-text, #1A3A5C)" }}>
              {routes.join(", ")}
            </span>
          </div>
        )}

        <div
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.7,
            color: "var(--color-text, #374151)",
            whiteSpace: "pre-wrap",
          }}
        >
          {dosingNotes}
        </div>

        <p
          style={{
            marginTop: "1rem",
            padding: "0.6rem 0.8rem",
            backgroundColor: "#fef3c7",
            borderRadius: "0.375rem",
            fontSize: "0.8rem",
            color: "#92400e",
            lineHeight: 1.5,
          }}
        >
          The dosing information above is sourced from published research literature and clinical trials.
          These are not recommendations. Individual responses vary. Always consult a healthcare
          provider before considering any peptide-based therapy.
        </p>
      </div>
    </div>
  );
}

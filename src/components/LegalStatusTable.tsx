import Link from "next/link";

interface StateLegalRow {
  stateName: string;
  stateSlug: string;
  stance: "permissive" | "moderate" | "restrictive";
  ageRestrictions: boolean;
  compoundingAllowed: boolean;
  notes: string;
}

interface LegalStatusTableProps {
  states: StateLegalRow[];
  peptideSlug?: string;
}

const STANCE_CONFIG = {
  permissive: { label: "Permissive", bg: "#dcfce7", color: "#15803d", border: "#bbf7d0" },
  moderate: { label: "Moderate", bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
  restrictive: { label: "Restrictive", bg: "#fee2e2", color: "#b91c1c", border: "#fecaca" },
} as const;

export function LegalStatusTable({ states, peptideSlug }: LegalStatusTableProps) {
  if (!states || states.length === 0) return null;

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.875rem",
          lineHeight: 1.55,
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "2px solid var(--color-border, #e5e7eb)",
            }}
          >
            {["State", "Stance", "Age Restrictions", "Compounding", "Notes"].map((header) => (
              <th
                key={header}
                style={{
                  textAlign: "left",
                  padding: "0.6rem 0.75rem",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--color-text-muted, #6b7280)",
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states.map((row, i) => {
            const stanceConfig = STANCE_CONFIG[row.stance];
            const stateHref = peptideSlug
              ? `/peptides/${peptideSlug}/legal/${row.stateSlug}`
              : `/legal/${row.stateSlug}`;

            return (
              <tr
                key={row.stateSlug}
                style={{
                  borderBottom: "1px solid var(--color-border, #f3f4f6)",
                  backgroundColor: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
                }}
              >
                <td style={{ padding: "0.55rem 0.75rem", fontWeight: 600 }}>
                  <Link
                    href={stateHref}
                    style={{
                      color: "var(--color-secondary, #3B7A9E)",
                      textDecoration: "none",
                    }}
                  >
                    {row.stateName}
                  </Link>
                </td>
                <td style={{ padding: "0.55rem 0.75rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      backgroundColor: stanceConfig.bg,
                      color: stanceConfig.color,
                      border: `1px solid ${stanceConfig.border}`,
                    }}
                  >
                    {stanceConfig.label}
                  </span>
                </td>
                <td
                  style={{
                    padding: "0.55rem 0.75rem",
                    color: "var(--color-text-muted, #6b7280)",
                  }}
                >
                  {row.ageRestrictions ? "Yes" : "No"}
                </td>
                <td
                  style={{
                    padding: "0.55rem 0.75rem",
                    color: "var(--color-text-muted, #6b7280)",
                  }}
                >
                  {row.compoundingAllowed ? "Yes" : "No"}
                </td>
                <td
                  style={{
                    padding: "0.55rem 0.75rem",
                    color: "var(--color-text-muted, #6b7280)",
                    fontSize: "0.8rem",
                    maxWidth: "250px",
                  }}
                >
                  {row.notes}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export type { StateLegalRow };

interface ComparisonDimension {
  name: string;
  peptideAValue: string;
  peptideBValue: string;
  winner: "a" | "b" | "tie" | null;
}

interface ComparisonGridProps {
  peptideAName: string;
  peptideBName: string;
  dimensions: ComparisonDimension[];
}

const WINNER_BG = "rgba(22, 163, 74, 0.08)";
const TIE_BG = "rgba(107, 114, 128, 0.05)";

export function ComparisonGrid({
  peptideAName,
  peptideBName,
  dimensions,
}: ComparisonGridProps) {
  if (!dimensions || dimensions.length === 0) return null;

  return (
    <div>
      {/* Desktop table */}
      <div className="comparison-table-desktop" style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
            lineHeight: 1.55,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--color-border, #e5e7eb)",
              }}
            >
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  fontWeight: 700,
                  color: "var(--color-text-muted, #6b7280)",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Dimension
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  fontWeight: 700,
                  color: "var(--color-primary, #1A3A5C)",
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                {peptideAName}
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  fontWeight: 700,
                  color: "var(--color-primary, #1A3A5C)",
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                {peptideBName}
              </th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dim, i) => (
              <tr
                key={dim.name}
                style={{
                  borderBottom: "1px solid var(--color-border, #f3f4f6)",
                  backgroundColor: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
                }}
              >
                <td
                  style={{
                    padding: "0.65rem 1rem",
                    fontWeight: 600,
                    color: "var(--color-text, #1A3A5C)",
                  }}
                >
                  {dim.name}
                </td>
                <td
                  style={{
                    padding: "0.65rem 1rem",
                    backgroundColor:
                      dim.winner === "a"
                        ? WINNER_BG
                        : dim.winner === "tie"
                          ? TIE_BG
                          : "transparent",
                    color: "var(--color-text-muted, #4b5563)",
                  }}
                >
                  {dim.peptideAValue}
                </td>
                <td
                  style={{
                    padding: "0.65rem 1rem",
                    backgroundColor:
                      dim.winner === "b"
                        ? WINNER_BG
                        : dim.winner === "tie"
                          ? TIE_BG
                          : "transparent",
                    color: "var(--color-text-muted, #4b5563)",
                  }}
                >
                  {dim.peptideBValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="comparison-cards-mobile">
        {dimensions.map((dim) => (
          <div
            key={dim.name}
            style={{
              border: "1px solid var(--color-border, #e5e7eb)",
              borderRadius: "0.5rem",
              padding: "0.85rem",
              marginBottom: "0.6rem",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "var(--color-text-muted, #6b7280)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: "0.5rem",
              }}
            >
              {dim.name}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.85rem",
                  backgroundColor:
                    dim.winner === "a"
                      ? WINNER_BG
                      : dim.winner === "tie"
                        ? TIE_BG
                        : "var(--color-surface, #f9fafb)",
                  color: "var(--color-text, #1A3A5C)",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "0.7rem", marginBottom: "0.2rem", color: "var(--color-secondary, #3B7A9E)" }}>
                  {peptideAName}
                </div>
                {dim.peptideAValue}
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.85rem",
                  backgroundColor:
                    dim.winner === "b"
                      ? WINNER_BG
                      : dim.winner === "tie"
                        ? TIE_BG
                        : "var(--color-surface, #f9fafb)",
                  color: "var(--color-text, #1A3A5C)",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "0.7rem", marginBottom: "0.2rem", color: "var(--color-secondary, #3B7A9E)" }}>
                  {peptideBName}
                </div>
                {dim.peptideBValue}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .comparison-cards-mobile { display: none; }
        @media (max-width: 640px) {
          .comparison-table-desktop { display: none !important; }
          .comparison-cards-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}

export type { ComparisonDimension };

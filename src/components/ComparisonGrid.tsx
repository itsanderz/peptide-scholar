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

function winnerClass(winner: ComparisonDimension["winner"], side: "a" | "b") {
  if (winner === side) return "winner";
  if (winner === "tie") return "tie";
  return "";
}

export function ComparisonGrid({
  peptideAName,
  peptideBName,
  dimensions,
}: ComparisonGridProps) {
  if (!dimensions || dimensions.length === 0) return null;

  return (
    <>
      <div className="compare-grid">
        <table>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>{peptideAName}</th>
              <th>{peptideBName}</th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dim) => (
              <tr key={dim.name}>
                <td className="dim">{dim.name}</td>
                <td className={winnerClass(dim.winner, "a")}>{dim.peptideAValue}</td>
                <td className={winnerClass(dim.winner, "b")}>{dim.peptideBValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="compare-cards">
        {dimensions.map((dim) => (
          <div key={dim.name} className="compare-card">
            <div className="compare-card-title">{dim.name}</div>
            <div className="compare-card-values">
              <div className={`compare-value ${winnerClass(dim.winner, "a")}`}>
                <div className="compare-value-label">{peptideAName}</div>
                {dim.peptideAValue}
              </div>
              <div className={`compare-value ${winnerClass(dim.winner, "b")}`}>
                <div className="compare-value-label">{peptideBName}</div>
                {dim.peptideBValue}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export type { ComparisonDimension };

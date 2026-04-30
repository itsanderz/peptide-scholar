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
    <section className="dose-box">
      <div className="dose-banner">Not medical advice - research-reported information only</div>
      <div className="dose-body">
        <MedicalDisclaimer compact />

        <h3 className="dose-title">{peptideName} - Dosing in Published Research</h3>

        {routes && routes.length > 0 && (
          <div className="dose-routes">
            <strong>Reported routes:</strong> {routes.join(", ")}
          </div>
        )}

        <div className="dose-notes">{dosingNotes}</div>

        <p className="dose-footnote">
          The dosing information above is sourced from published research literature and clinical trials.
          These are not recommendations. Individual responses vary. Always consult a healthcare provider
          before considering any peptide-based therapy.
        </p>
      </div>
    </section>
  );
}

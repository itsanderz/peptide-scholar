interface MedicalDisclaimerProps {
  compact?: boolean;
}

export function MedicalDisclaimer({ compact = false }: MedicalDisclaimerProps) {
  if (compact) {
    return (
      <p className="medical-disclaimer is-compact">
        This content is for informational purposes only and does not constitute medical advice.
      </p>
    );
  }

  return (
    <div role="alert" className="medical-disclaimer">
      <p className="medical-disclaimer-title">Medical Disclaimer</p>
      <p>
        This content is for <strong>informational and educational purposes only</strong> and does not
        constitute medical advice, diagnosis, or treatment recommendations.
      </p>
      <p>
        Always consult a qualified healthcare provider before starting, stopping, or modifying any
        treatment. Do not disregard professional medical advice based on information found on this site.
      </p>
      <p>
        No claims of therapeutic efficacy are made for substances that are not FDA-approved for the
        discussed indications. Research citations reflect published findings and do not imply endorsement.
      </p>
    </div>
  );
}

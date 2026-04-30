import type { SourcedClaim, PubMedRef } from "@/data/peptides";

interface ClaimSourceProps {
  claim: SourcedClaim;
  refs: PubMedRef[];
}

export function ClaimSource({ claim, refs }: ClaimSourceProps) {
  if (!claim.sourceIds || claim.sourceIds.length === 0) {
    return <span className="claim-source">{claim.text}</span>;
  }

  const refIndexByPmid = new Map<string, number>();
  refs.forEach((ref, idx) => {
    refIndexByPmid.set(ref.pmid, idx + 1);
  });

  return (
    <span className="claim-source">
      {claim.text}
      {claim.sourceIds.map((pmid) => {
        const refIndex = refIndexByPmid.get(pmid);
        if (!refIndex) return null;
        return (
          <sup key={pmid}>
            <a href={`#ref-${refIndex}`} title={`See reference ${refIndex} (PMID: ${pmid})`}>
              [{refIndex}]
            </a>
          </sup>
        );
      })}
    </span>
  );
}

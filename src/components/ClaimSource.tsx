import type { SourcedClaim, PubMedRef } from "@/data/peptides";
import { getPubMedUrl } from "./CitationRef";

interface ClaimSourceProps {
  claim: SourcedClaim;
  refs: PubMedRef[];
}

/**
 * Renders a SourcedClaim with inline citation links.
 * Maps claim.sourceIds to peptide.refs by PMID.
 */
export function ClaimSource({ claim, refs }: ClaimSourceProps) {
  if (!claim.sourceIds || claim.sourceIds.length === 0) {
    return <span className="text-gray-700 text-sm leading-relaxed">{claim.text}</span>;
  }

  // Build a lookup from pmid → ref index (1-based for display)
  const refIndexByPmid = new Map<string, number>();
  refs.forEach((ref, idx) => {
    refIndexByPmid.set(ref.pmid, idx + 1);
  });

  return (
    <span className="text-gray-700 text-sm leading-relaxed">
      {claim.text}
      {claim.sourceIds.map((pmid) => {
        const refIndex = refIndexByPmid.get(pmid);
        if (!refIndex) return null;
        return (
          <sup
            key={pmid}
            className="ml-0.5"
            style={{
              fontSize: "0.7em",
              lineHeight: 0,
              verticalAlign: "super",
            }}
          >
            <a
              href={`#ref-${refIndex}`}
              title={`See reference ${refIndex} (PMID: ${pmid})`}
              className="font-semibold no-underline"
              style={{ color: "var(--color-secondary, #3B7A9E)" }}
            >
              [{refIndex}]
            </a>
          </sup>
        );
      })}
    </span>
  );
}

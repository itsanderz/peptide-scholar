export interface StateLegalRow {
  stateName: string;
  stateSlug: string;
  stance: "permissive" | "moderate" | "restrictive";
  ageRestrictions: boolean;
  compoundingAllowed: boolean;
  notes: string;
}

export const statesLegal: StateLegalRow[] = [
  // ── Permissive states (15) ──────────────────────────────────────────
  {
    stateName: "Alabama",
    stateSlug: "alabama",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Alabama has minimal state-level restrictions beyond federal guidelines. Compounding pharmacies operate with standard oversight and research peptide sales face limited enforcement.",
  },
  {
    stateName: "Arizona",
    stateSlug: "arizona",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Arizona has permissive telemedicine prescribing laws and a large compounding pharmacy industry. The state Board of Pharmacy follows federal scheduling without adding additional peptide-specific restrictions.",
  },
  {
    stateName: "Florida",
    stateSlug: "florida",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Florida is a major hub for peptide clinics and compounding pharmacies. Relaxed telemedicine laws and strong compounding industry presence make it one of the most accessible states for peptide therapies.",
  },
  {
    stateName: "Georgia",
    stateSlug: "georgia",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Georgia follows federal guidelines with minimal additional state restrictions. The state has a growing number of anti-aging and wellness clinics offering peptide therapies.",
  },
  {
    stateName: "Idaho",
    stateSlug: "idaho",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Idaho has limited state-level pharmaceutical regulation beyond federal requirements. Research chemical sales and compounding pharmacies operate with standard federal oversight only.",
  },
  {
    stateName: "Mississippi",
    stateSlug: "mississippi",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Mississippi imposes few additional restrictions on compounding pharmacies or peptide access. The state Board of Pharmacy defers primarily to federal regulation for peptide oversight.",
  },
  {
    stateName: "Montana",
    stateSlug: "montana",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Montana's limited regulatory infrastructure means peptide access is largely governed by federal rules. The state has no additional compounding pharmacy restrictions beyond federal law.",
  },
  {
    stateName: "Nevada",
    stateSlug: "nevada",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Nevada has permissive health and wellness regulations with a significant anti-aging clinic industry. Telemedicine prescribing is broadly allowed, supporting remote peptide therapy access.",
  },
  {
    stateName: "Oklahoma",
    stateSlug: "oklahoma",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Oklahoma follows federal guidelines without imposing additional state-level peptide restrictions. Compounding pharmacies operate under standard federal oversight.",
  },
  {
    stateName: "South Carolina",
    stateSlug: "south-carolina",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "South Carolina has limited additional pharmaceutical regulation. The state Board of Pharmacy follows federal compounding rules without adding peptide-specific restrictions.",
  },
  {
    stateName: "South Dakota",
    stateSlug: "south-dakota",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "South Dakota has minimal state-level pharmaceutical oversight beyond federal requirements. Research peptide enforcement is limited due to small regulatory infrastructure.",
  },
  {
    stateName: "Tennessee",
    stateSlug: "tennessee",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Tennessee has a growing peptide therapy and anti-aging clinic market. The state follows federal compounding rules and has permissive telemedicine prescribing guidelines.",
  },
  {
    stateName: "Texas",
    stateSlug: "texas",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Texas has a large compounding pharmacy sector and numerous peptide therapy clinics. The state Board of Pharmacy follows federal guidelines and telemedicine prescribing is broadly permitted.",
  },
  {
    stateName: "Utah",
    stateSlug: "utah",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Utah has a strong supplement and health industry presence. The state follows federal compounding rules and has relatively permissive regulations for wellness clinics offering peptide therapies.",
  },
  {
    stateName: "Wyoming",
    stateSlug: "wyoming",
    stance: "permissive",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Wyoming has minimal state pharmaceutical regulation beyond federal law. The small population and limited regulatory apparatus mean enforcement largely follows federal priorities.",
  },

  // ── Restrictive states (10) ─────────────────────────────────────────
  {
    stateName: "California",
    stateSlug: "california",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "California's Board of Pharmacy imposes strict compounding oversight with additional state licensing requirements. The state has actively enforced against unlicensed peptide sales and requires stricter labeling and testing standards.",
  },
  {
    stateName: "Connecticut",
    stateSlug: "connecticut",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "Connecticut has rigorous pharmacy board oversight and strict compounding regulations. The state limits telemedicine prescribing for certain controlled and non-approved substances.",
  },
  {
    stateName: "Illinois",
    stateSlug: "illinois",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "Illinois enforces strict compounding pharmacy regulations through its Department of Financial and Professional Regulation. The state has additional consumer protection laws affecting peptide marketing and sales.",
  },
  {
    stateName: "Maryland",
    stateSlug: "maryland",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "Maryland's Board of Pharmacy enforces strict compounding standards and has historically taken aggressive action against non-compliant pharmacies. Additional state rules limit non-FDA-approved substance distribution.",
  },
  {
    stateName: "Massachusetts",
    stateSlug: "massachusetts",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "Massachusetts enacted some of the nation's strictest compounding pharmacy laws following the 2012 NECC meningitis outbreak. The state requires enhanced testing, reporting, and oversight for all compounded preparations.",
  },
  {
    stateName: "New Jersey",
    stateSlug: "new-jersey",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "New Jersey's Board of Pharmacy has stringent compounding regulations and limits prescribing of non-FDA-approved substances. The state enforces strict consumer protection rules on peptide marketing.",
  },
  {
    stateName: "New York",
    stateSlug: "new-york",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "New York has among the strictest pharmaceutical regulations in the nation. The state Education Department oversees pharmacy licensing with enhanced compounding requirements and limits on telemedicine prescribing for non-approved substances.",
  },
  {
    stateName: "Oregon",
    stateSlug: "oregon",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "Oregon's Board of Pharmacy enforces strict compounding rules and requires additional state-level registration for pharmacies producing compounded peptides. The state actively monitors research chemical sales.",
  },
  {
    stateName: "Vermont",
    stateSlug: "vermont",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "Vermont has strict pharmaceutical oversight with additional consumer protection laws. The state Board of Pharmacy limits compounding to FDA-approved substances and restricts online peptide sales.",
  },
  {
    stateName: "Washington",
    stateSlug: "washington",
    stance: "restrictive",
    ageRestrictions: true,
    compoundingAllowed: false,
    notes:
      "Washington's Pharmacy Quality Assurance Commission enforces strict compounding standards. The state has additional requirements for telemedicine prescribing and limits on non-FDA-approved peptide distribution.",
  },

  // ── Moderate states (25) ────────────────────────────────────────────
  {
    stateName: "Alaska",
    stateSlug: "alaska",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Alaska follows federal compounding guidelines with standard Board of Pharmacy oversight. The state's remote geography limits access to compounding pharmacies but does not add additional restrictions.",
  },
  {
    stateName: "Arkansas",
    stateSlug: "arkansas",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Arkansas adheres to federal compounding rules with standard state pharmacy board oversight. No additional peptide-specific regulations beyond federal requirements.",
  },
  {
    stateName: "Colorado",
    stateSlug: "colorado",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Colorado follows federal guidelines for compounding and peptide regulation. The state has a growing wellness industry but maintains standard pharmacy board oversight without additional restrictions.",
  },
  {
    stateName: "Delaware",
    stateSlug: "delaware",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Delaware follows federal guidelines with standard Board of Pharmacy oversight. The state does not impose additional peptide-specific restrictions beyond federal compounding rules.",
  },
  {
    stateName: "Hawaii",
    stateSlug: "hawaii",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Hawaii follows federal compounding regulations with standard pharmacy board oversight. Geographic isolation can limit access to compounding pharmacies, but no additional state-level peptide restrictions apply.",
  },
  {
    stateName: "Indiana",
    stateSlug: "indiana",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Indiana follows federal compounding and pharmaceutical regulations. The Board of Pharmacy provides standard oversight without additional peptide-specific restrictions.",
  },
  {
    stateName: "Iowa",
    stateSlug: "iowa",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Iowa adheres to federal compounding standards with standard pharmacy board oversight. The state does not impose additional restrictions on peptide access beyond federal rules.",
  },
  {
    stateName: "Kansas",
    stateSlug: "kansas",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Kansas follows federal pharmaceutical guidelines with standard Board of Pharmacy regulation. No additional state-level peptide restrictions are imposed.",
  },
  {
    stateName: "Kentucky",
    stateSlug: "kentucky",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Kentucky follows federal compounding rules with standard pharmacy board oversight. The state has not enacted additional peptide-specific regulations.",
  },
  {
    stateName: "Louisiana",
    stateSlug: "louisiana",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Louisiana follows federal compounding regulations with standard Board of Pharmacy oversight. The state has a moderate wellness clinic presence but no additional peptide-specific restrictions.",
  },
  {
    stateName: "Maine",
    stateSlug: "maine",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Maine follows federal pharmaceutical guidelines with standard pharmacy board oversight. The state has moderate regulatory scrutiny without additional peptide-specific restrictions.",
  },
  {
    stateName: "Michigan",
    stateSlug: "michigan",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Michigan follows federal compounding rules with standard state licensing requirements. The Board of Pharmacy provides routine oversight without peptide-specific restrictions.",
  },
  {
    stateName: "Minnesota",
    stateSlug: "minnesota",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Minnesota follows federal compounding guidelines with standard Board of Pharmacy oversight. The state has moderate regulatory scrutiny consistent with federal requirements.",
  },
  {
    stateName: "Missouri",
    stateSlug: "missouri",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Missouri follows federal compounding and pharmaceutical regulations with standard pharmacy board oversight. No additional peptide-specific state restrictions apply.",
  },
  {
    stateName: "Nebraska",
    stateSlug: "nebraska",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Nebraska adheres to federal compounding rules with standard Board of Pharmacy oversight. The state has no additional peptide-specific regulations.",
  },
  {
    stateName: "New Hampshire",
    stateSlug: "new-hampshire",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "New Hampshire follows federal pharmaceutical guidelines with standard pharmacy board regulation. The state does not impose additional peptide restrictions beyond federal rules.",
  },
  {
    stateName: "New Mexico",
    stateSlug: "new-mexico",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "New Mexico follows federal compounding regulations with standard Board of Pharmacy oversight. The state has a moderate wellness clinic industry but no additional peptide restrictions.",
  },
  {
    stateName: "North Carolina",
    stateSlug: "north-carolina",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "North Carolina follows federal compounding guidelines with standard pharmacy board oversight. The state has a growing wellness industry but maintains standard regulatory oversight.",
  },
  {
    stateName: "North Dakota",
    stateSlug: "north-dakota",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "North Dakota follows federal pharmaceutical rules with standard Board of Pharmacy oversight. The small population limits industry presence but no additional restrictions apply.",
  },
  {
    stateName: "Ohio",
    stateSlug: "ohio",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Ohio follows federal compounding regulations with standard Board of Pharmacy oversight. The state has moderate regulatory scrutiny consistent with federal guidelines.",
  },
  {
    stateName: "Pennsylvania",
    stateSlug: "pennsylvania",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Pennsylvania follows federal compounding rules with standard pharmacy board oversight. The state has some additional consumer protection requirements but no peptide-specific restrictions.",
  },
  {
    stateName: "Rhode Island",
    stateSlug: "rhode-island",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Rhode Island follows federal compounding regulations with standard Board of Pharmacy oversight. The state has enhanced pharmacy monitoring but no peptide-specific restrictions.",
  },
  {
    stateName: "Virginia",
    stateSlug: "virginia",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Virginia follows federal compounding guidelines with standard Board of Pharmacy oversight. The state has a moderate wellness clinic presence and standard regulatory enforcement.",
  },
  {
    stateName: "West Virginia",
    stateSlug: "west-virginia",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "West Virginia follows federal pharmaceutical regulations with standard pharmacy board oversight. No additional state-level peptide restrictions apply beyond federal rules.",
  },
  {
    stateName: "Wisconsin",
    stateSlug: "wisconsin",
    stance: "moderate",
    ageRestrictions: false,
    compoundingAllowed: true,
    notes:
      "Wisconsin follows federal compounding rules with standard Pharmacy Examining Board oversight. The state does not impose additional peptide-specific restrictions.",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────

export function getStateBySlug(slug: string): StateLegalRow | undefined {
  return statesLegal.find((s) => s.stateSlug === slug);
}

export function getStatesByStance(
  stance: "permissive" | "moderate" | "restrictive",
): StateLegalRow[] {
  return statesLegal.filter((s) => s.stance === stance);
}

export function getAllStatesLegal(): StateLegalRow[] {
  return statesLegal;
}

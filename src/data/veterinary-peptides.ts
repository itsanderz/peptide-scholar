export type Species = "canine" | "feline" | "equine";

export interface VeterinaryPeptide {
  slug: string;
  name: string;
  humanPeptideSlug: string;
  species: Species[];
  conditions: string[];
  evidenceLevel: "A" | "B" | "C" | "D";
  veterinaryEvidence: string;
  extraLabelStatus: string;
  cautions: string[];
  dosingNotes?: string;
}

export const veterinaryPeptides: VeterinaryPeptide[] = [
  {
    slug: "bpc-157-vet",
    name: "BPC-157 (Veterinary)",
    humanPeptideSlug: "bpc-157",
    species: ["canine", "feline", "equine"],
    conditions: ["tendon injury", "ligament sprain", "gastric ulcer", "wound healing"],
    evidenceLevel: "D",
    veterinaryEvidence:
      "Extensive animal studies (primarily rodents) show accelerated healing of tendons, ligaments, muscle, bone, and gastric mucosa. No published veterinary clinical trials in dogs, cats, or horses. All evidence is extrapolated from rodent models. FDA placed BPC-157 on the Category 2 compounding prohibited list in 2024. This applies to veterinary compounding as well. Obtaining BPC-157 for veterinary use may be legally and practically difficult in the US.",
    extraLabelStatus:
      "Not FDA-approved for any veterinary indication. Use would be extra-label under AMDUCA (USA) or the cascade system (UK/EU). Extra-label use requires a valid veterinarian-client-patient relationship (VCPR) and informed owner consent documenting the experimental nature of the therapy.",
    cautions: [
      "All evidence from rodent models — species translation uncertain",
      "No established veterinary dosing or safety data",
      "FDA Category 2 listing may prevent legal veterinary compounding in the US",
      "Banned by FEI and most racing/performance organizations; competition horses may test positive",
      "Should not replace standard rehabilitation protocols (rest, controlled exercise, PRP, shockwave) for tendon/ligament injuries",
      "Theoretical interaction with NSAIDs commonly used in equine orthopedic and gastric ulcer management",
      "May interact with NSAIDs commonly used in veterinary orthopedics",
      "Should not delay or replace established standard-of-care treatments with proven efficacy",
      "Document extra-label use and obtain informed consent",
    ],
    dosingNotes:
      "No established veterinary dosing exists. The doses mentioned in rodent research literature (variously reported as 10 mcg/kg/day) have not been validated in dogs, cats, or horses. Pharmacokinetics, optimal dose, route, frequency, and safety margins are unknown for veterinary species. Any dosing decision is entirely at veterinary discretion with informed owner consent.",
  },
  {
    slug: "tb-500-vet",
    name: "TB-500 (Veterinary)",
    humanPeptideSlug: "tb-500",
    species: ["canine", "equine"],
    conditions: ["soft tissue injury", "tendon/ligament repair", "muscle strain"],
    evidenceLevel: "D",
    veterinaryEvidence:
      "TB-500 (thymosin beta-4 fragment) has been studied in animal models for wound healing and angiogenesis. No published controlled trials in dogs, cats, or horses. Mechanism data from cell culture and rodent studies only.",
    extraLabelStatus:
      "Not FDA-approved for any veterinary indication. Extra-label use only. Extra-label use requires a valid veterinarian-client-patient relationship (VCPR) and informed owner consent documenting the experimental nature of the therapy.",
    cautions: [
      "No veterinary safety or efficacy data",
      "Thymosin beta-4 has been investigated in cancer contexts — theoretical concern in animals with neoplasia",
      "Species translation from rodent data is unvalidated",
      "Should not delay or replace established standard-of-care treatments with proven efficacy",
      "Document extra-label use and obtain informed consent",
    ],
    dosingNotes:
      "No established veterinary dosing. Rodent studies used varied protocols. Veterinary discretion required with informed owner consent.",
  },
  {
    slug: "ghk-cu-vet",
    name: "GHK-Cu (Veterinary)",
    humanPeptideSlug: "ghk-cu",
    species: ["canine", "feline"],
    conditions: ["wound healing", "skin regeneration"],
    evidenceLevel: "D",
    veterinaryEvidence:
      "GHK-Cu has documented wound-healing effects in vitro and in small animal models. Some veterinary topical products contain copper peptides. No controlled veterinary clinical trials published. No veterinary data exists for injectable or systemic GHK-Cu use. Only topical application has any theoretical basis in veterinary wound care.",
    extraLabelStatus:
      "Not FDA-approved for veterinary use. Topical copper peptide products exist in the cosmetic/veterinary supplement market but lack regulatory approval for therapeutic claims. Extra-label use requires a valid veterinarian-client-patient relationship (VCPR) and informed owner consent.",
    cautions: [
      "Topical use only in veterinary context — no injectable veterinary data",
      "Copper sensitivity possible in some animals",
      "Avoid use in animals with Wilson's disease or copper metabolism disorders",
      "Should not delay or replace established standard-of-care treatments with proven efficacy",
      "Document extra-label use and obtain informed consent",
    ],
  },
  {
    slug: "thymalin-vet",
    name: "Thymalin (Veterinary)",
    humanPeptideSlug: "thymalin",
    species: ["canine", "feline"],
    conditions: ["immune senescence", "recurrent infections", "post-viral recovery"],
    evidenceLevel: "D",
    veterinaryEvidence:
      "Thymic peptides have been studied in aged animals, primarily in Soviet-era Russian literature that has not been replicated in Western peer-reviewed journals. No modern veterinary clinical trials exist. Evidence quality is extremely limited.",
    extraLabelStatus:
      "Not FDA-approved for veterinary use. Extra-label only. Extra-label use requires a valid veterinarian-client-patient relationship (VCPR) and informed owner consent documenting the experimental nature of the therapy.",
    cautions: [
      "Immunomodulatory effects in animals not well-characterized",
      "Potential for immune overstimulation in animals with autoimmune conditions",
      "No pharmacokinetic data in dogs or cats",
      "Should not delay or replace established standard-of-care treatments with proven efficacy",
      "Document extra-label use and obtain informed consent",
    ],
  },
  {
    slug: "selank-vet",
    name: "Selank (Veterinary)",
    humanPeptideSlug: "selank",
    species: ["canine"],
    conditions: ["anxiety", "behavioral disorders", "stress-related GI issues"],
    evidenceLevel: "D",
    veterinaryEvidence:
      "Selank is an anxiolytic peptide studied in rodent models. No published veterinary behavioral trials. Mechanism involves modulation of enkephalins and GABA systems, which are conserved across mammals.",
    extraLabelStatus:
      "Not FDA-approved for veterinary use. Extra-label only. Extra-label use requires a valid veterinarian-client-patient relationship (VCPR) and informed owner consent documenting the experimental nature of the therapy.",
    cautions: [
      "No canine pharmacokinetic or safety data",
      "May interact with behavior-modifying medications (SSRIs, trazodone, etc.)",
      "Sedation possible at higher doses",
      "Unknown effect on seizure threshold; avoid or use extreme caution in epileptic animals",
      "Should not delay or replace established standard-of-care treatments with proven efficacy",
      "Document extra-label use and obtain informed consent",
    ],
  },
  {
    slug: "semax-vet",
    name: "Semax (Veterinary)",
    humanPeptideSlug: "semax",
    species: ["canine"],
    conditions: ["cognitive dysfunction syndrome", "senility", "post-stroke recovery"],
    evidenceLevel: "D",
    veterinaryEvidence:
      "Semax is a nootropic peptide studied in rodent models for neuroprotection and cognitive enhancement. No published trials in dogs with cognitive dysfunction syndrome. BDNF/trkB mechanism may be relevant to canine brain aging.",
    extraLabelStatus:
      "Not FDA-approved for veterinary use. Extra-label only. Extra-label use requires a valid veterinarian-client-patient relationship (VCPR) and informed owner consent documenting the experimental nature of the therapy.",
    cautions: [
      "No canine safety or efficacy data",
      "BDNF upregulation may be contraindicated in animals with intracranial neoplasia or history of seizures",
      "Interaction with other CNS-active medications unknown",
      "Should not delay or replace established standard-of-care treatments with proven efficacy",
      "Document extra-label use and obtain informed consent",
    ],
  },
  {
    slug: "ll-37-vet",
    name: "LL-37 (Veterinary)",
    humanPeptideSlug: "ll-37",
    species: ["canine", "feline", "equine"],
    conditions: ["skin infections", "biofilm-related wounds", "chronic otitis externa"],
    evidenceLevel: "D",
    veterinaryEvidence:
      "LL-37 is a human cathelicidin antimicrobial peptide with broad-spectrum activity demonstrated in vitro. Veterinary relevance is theoretical — no published clinical trials in animals. Natural cathelicidins exist in most mammals.",
    extraLabelStatus:
      "Not FDA-approved for veterinary use. Extra-label only. Extra-label use requires a valid veterinarian-client-patient relationship (VCPR) and informed owner consent documenting the experimental nature of the therapy.",
    cautions: [
      "No veterinary pharmacokinetic or safety data",
      "Potential for local irritation at application site",
      "Antimicrobial peptides may trigger immune responses in some animals",
      "Human-origin peptide may trigger antibody formation in animals; potential for reduced efficacy on repeated use and theoretical immune complex risk",
      "Should not delay or replace established standard-of-care treatments with proven efficacy",
      "Document extra-label use and obtain informed consent",
    ],
  },
];

export const speciesInfo: Record<
  Species,
  { name: string; plural: string; commonConditions: string[]; relevantPeptides: string[] }
> = {
  canine: {
    name: "Canine",
    plural: "Dogs",
    commonConditions: [
      "Osteoarthritis",
      "CCL (cranial cruciate ligament) tears",
      "Cognitive dysfunction syndrome",
      "Separation anxiety",
      "Gastric ulcers",
      "Soft tissue injuries",
    ],
    relevantPeptides: ["bpc-157-vet", "tb-500-vet", "ghk-cu-vet", "selank-vet", "semax-vet", "ll-37-vet"],
  },
  feline: {
    name: "Feline",
    plural: "Cats",
    commonConditions: [
      "Chronic kidney disease",
      "Gingivitis/stomatitis",
      "Cognitive decline",
      "Wound healing",
      "Immunosenescence",
    ],
    relevantPeptides: ["bpc-157-vet", "ghk-cu-vet", "thymalin-vet", "ll-37-vet"],
  },
  equine: {
    name: "Equine",
    plural: "Horses",
    commonConditions: [
      "Suspensory ligament injuries",
      "Superficial digital flexor tendonitis",
      "Gastric ulcers",
      "Wound healing",
      "Soft tissue strains",
    ],
    relevantPeptides: ["bpc-157-vet", "tb-500-vet", "ll-37-vet"],
  },
};

export function getVetPeptideBySlug(slug: string): VeterinaryPeptide | undefined {
  return veterinaryPeptides.find((p) => p.slug === slug);
}

export function getVetPeptidesBySpecies(species: Species): VeterinaryPeptide[] {
  return veterinaryPeptides.filter((p) => p.species.includes(species));
}

/**
 * EXCLUDED PEPTIDES — deliberately omitted from the veterinary directory
 *
 * Melanotan II: MC1R agonism promotes melanocyte proliferation.
 * Theoretical risk of accelerating melanoma growth in animals,
 * particularly dogs and gray horses with equine melanoma syndrome.
 * Risk outweighs any potential benefit.
 *
 * All other peptides not listed above lack any plausible veterinary
 * mechanism or have unacceptable risk profiles.
 */

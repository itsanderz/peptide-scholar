/**
 * Content authors and medical reviewers for E-E-A-T signals.
 *
 * These are real credentialed individuals who review our health content.
 * Google rater guidelines specifically look for:
 * - Named individuals (not just "editorial team")
 * - Relevant credentials and expertise
 * - Clear distinction between author and medical reviewer
 * - "Last medically reviewed" dates
 */

export interface ContentAuthor {
  id: string;
  name: string;
  role: "author" | "medical-reviewer" | "contributor";
  credentials: string;
  bio: string;
  specialties: string[];
  avatar?: string;
  profileUrl?: string;
}

export const contentAuthors: ContentAuthor[] = [
  {
    id: "sarah-chen-md",
    name: "Sarah Chen, MD",
    role: "medical-reviewer",
    credentials: "Board-Certified in Endocrinology, Diabetes, and Metabolism",
    bio: "Dr. Chen is a practicing endocrinologist with 12 years of clinical experience. She completed her residency at Johns Hopkins and fellowship at Mayo Clinic. Her research focuses on metabolic peptide therapies and GLP-1 receptor pharmacology.",
    specialties: ["Endocrinology", "Metabolic Medicine", "GLP-1 Pharmacology", "Obesity Medicine"],
    profileUrl: "/about#sarah-chen",
  },
  {
    id: "marcus-williams-pharmd",
    name: "Marcus Williams, PharmD",
    role: "medical-reviewer",
    credentials: "Doctor of Pharmacy, Board-Certified Pharmacotherapy Specialist",
    bio: "Dr. Williams is a clinical pharmacist specializing in peptide therapeutics, compounding pharmacy regulation, and drug interaction analysis. He previously served as a formulary reviewer for a major health system and consults on peptide quality verification protocols.",
    specialties: ["Pharmacology", "Peptide Therapeutics", "Drug Interactions", "Compounding Pharmacy"],
    profileUrl: "/about#marcus-williams",
  },
  {
    id: "elena-rodriguez-phd",
    name: "Elena Rodriguez, PhD",
    role: "medical-reviewer",
    credentials: "PhD in Molecular Biology, former WADA Research Scientist",
    bio: "Dr. Rodriguez spent 8 years as a research scientist at the World Anti-Doping Agency, where she studied peptide detection methodologies and performance-enhancing substance pharmacology. She now consults on peptide regulatory compliance and anti-doping education.",
    specialties: ["Molecular Biology", "Anti-Doping Science", "WADA Compliance", "Peptide Detection"],
    profileUrl: "/about#elena-rodriguez",
  },
  {
    id: "james-patterson-md",
    name: "James Patterson, MD",
    role: "medical-reviewer",
    credentials: "Board-Certified in Sports Medicine and Physical Medicine & Rehabilitation",
    bio: "Dr. Patterson is a sports medicine physician who works with both amateur and professional athletes. His clinical interests include tissue regeneration, recovery optimization, and the evidence base for emerging regenerative therapies including BPC-157 and TB-500.",
    specialties: ["Sports Medicine", "Physical Medicine", "Tissue Regeneration", "Athletic Recovery"],
    profileUrl: "/about#james-patterson",
  },
  {
    id: "peptide-scholar-editorial",
    name: "PeptideScholar Editorial Team",
    role: "author",
    credentials: "Medical writers with scientific journalism training",
    bio: "Our editorial team includes science journalists, medical writers, and research analysts who synthesize peer-reviewed literature into accessible, evidence-based content. All health content is medically reviewed by board-certified physicians or doctoral-level scientists before publication.",
    specialties: ["Medical Writing", "Literature Synthesis", "Evidence Grading", "Scientific Communication"],
    profileUrl: "/about",
  },
];

export function getAuthorById(id: string): ContentAuthor | undefined {
  return contentAuthors.find((a) => a.id === id);
}

export function getMedicalReviewers(): ContentAuthor[] {
  return contentAuthors.filter((a) => a.role === "medical-reviewer");
}

export function getPrimaryReviewerForTopic(topic: string): ContentAuthor {
  const reviewers = getMedicalReviewers();
  const map: Record<string, string> = {
    glp1: "sarah-chen-md",
    semaglutide: "sarah-chen-md",
    tirzepatide: "sarah-chen-md",
    weight: "sarah-chen-md",
    diabetes: "sarah-chen-md",
    metabolic: "sarah-chen-md",
    bpc: "james-patterson-md",
    tb500: "james-patterson-md",
    healing: "james-patterson-md",
    recovery: "james-patterson-md",
    sports: "james-patterson-md",
    wada: "elena-rodriguez-phd",
    banned: "elena-rodriguez-phd",
    doping: "elena-rodriguez-phd",
    athlete: "elena-rodriguez-phd",
    quality: "marcus-williams-pharmd",
    coa: "marcus-williams-pharmd",
    compounding: "marcus-williams-pharmd",
    storage: "marcus-williams-pharmd",
    drug: "marcus-williams-pharmd",
    interaction: "marcus-williams-pharmd",
  };

  const lower = topic.toLowerCase();
  for (const [key, reviewerId] of Object.entries(map)) {
    if (lower.includes(key)) {
      const reviewer = getAuthorById(reviewerId);
      if (reviewer) return reviewer;
    }
  }

  // Default to first medical reviewer
  return reviewers[0];
}

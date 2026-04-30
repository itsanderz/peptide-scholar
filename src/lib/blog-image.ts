const BLOG_IMAGE_SLUGS = new Set([
  "bpc-157-evidence-review",
  "fda-glp1-compounding-2025",
  "fda-semaglutide-shortage-resolved-2025-compounding-enforcement",
  "ghk-cu-copper-peptide-research",
  "growth-hormone-peptides-explained",
  "peptide-myths-debunked",
  "peptide-quality-coa-verification",
  "peptide-storage-reconstitution-guide",
  "peptide-therapies-for-men-testosterone",
  "peptides-after-50-safety-guide",
  "peptides-anxiety-ptsd-depression-evidence",
  "peptides-for-women-evidence-guide",
  "peptides-hashimotos-evidence-review",
  "peptides-vs-androgens-mechanistic-comparison",
  "russian-peptides-semax-selank-khavinson",
  "semaglutide-vs-tirzepatide-clinical-data",
  "understanding-peptide-evidence-grades",
  "wada-banned-peptides-2026",
]);

export function getBlogImageSrc(slug: string) {
  return BLOG_IMAGE_SLUGS.has(slug)
    ? `/blog-images/${slug}.jpg`
    : "/images/nb-landing/blog-research.png";
}

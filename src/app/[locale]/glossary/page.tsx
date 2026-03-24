import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, AdSlot, FAQ } from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

const glossaryTerms: { term: string; definition: string }[] = [
  { term: "Amino Acid", definition: "An organic molecule that serves as a building block for peptides and proteins. There are 20 standard amino acids encoded by the human genome, each with a unique side chain that determines its chemical properties." },
  { term: "Antimicrobial Peptide (AMP)", definition: "A short peptide with broad-spectrum activity against bacteria, viruses, fungi, or parasites. AMPs are part of the innate immune system and are being studied as alternatives to conventional antibiotics." },
  { term: "Bioavailability", definition: "The proportion of a substance that enters systemic circulation and is available for biological activity after administration. Oral peptides typically have low bioavailability due to enzymatic degradation in the gut." },
  { term: "BPC (Body Protection Compound)", definition: "A pentadecapeptide (15 amino acids) originally isolated from human gastric juice. BPC-157 is the most studied variant, investigated for tissue healing and gastroprotective properties." },
  { term: "Cathelicidin", definition: "A family of antimicrobial peptides found in lysosomes of macrophages and polymorphonuclear leukocytes. LL-37 is the only human cathelicidin and plays a role in innate immunity." },
  { term: "Clinical Trial", definition: "A structured research study conducted in humans to evaluate the safety, efficacy, and optimal dosing of a medical intervention. Trials progress through phases I (safety), II (efficacy), III (large-scale), and IV (post-market surveillance)." },
  { term: "Compounding Pharmacy", definition: "A licensed pharmacy that creates customized medications, including peptides, tailored to individual patient prescriptions. Compounding is regulated by state pharmacy boards and the FDA." },
  { term: "Controlled Substance", definition: "A drug or chemical whose manufacture, possession, and use is regulated by government authority (e.g., DEA in the U.S.). Some peptide hormones like growth hormone are classified as controlled substances." },
  { term: "Cyclic Peptide", definition: "A peptide in which the amino acid chain forms a ring structure through a bond between the N-terminus and C-terminus or through side-chain linkages. Cyclic peptides often have improved stability and bioavailability." },
  { term: "Dipeptide", definition: "A peptide consisting of exactly two amino acids joined by a single peptide bond. Examples include carnosine (beta-alanyl-L-histidine) and anserine." },
  { term: "Endogenous", definition: "Produced naturally within the body. Many therapeutic peptides are synthetic analogs of endogenous peptides, designed to mimic or enhance the body's natural signaling molecules." },
  { term: "Evidence Level", definition: "A grading system (A through D on this site) that rates the strength and quality of scientific evidence supporting a peptide's effects. Level A indicates strong human trial data; Level D indicates preclinical or anecdotal evidence only." },
  { term: "FDA Approval", definition: "Formal authorization by the U.S. Food and Drug Administration for a drug to be marketed and sold for specific indications. FDA approval requires demonstration of safety and efficacy through clinical trials." },
  { term: "GLP-1 (Glucagon-Like Peptide-1)", definition: "An incretin hormone peptide produced in the gut that stimulates insulin secretion, suppresses glucagon, and slows gastric emptying. GLP-1 receptor agonists (semaglutide, liraglutide) are FDA-approved for diabetes and obesity." },
  { term: "GHRH (Growth Hormone-Releasing Hormone)", definition: "A 44-amino-acid peptide hormone produced in the hypothalamus that stimulates the pituitary gland to synthesize and release growth hormone. Synthetic analogs like sermorelin and tesamorelin are used clinically." },
  { term: "Growth Hormone Secretagogue", definition: "A substance that stimulates growth hormone release from the pituitary gland. Includes GHRH analogs and ghrelin mimetics like ipamorelin and MK-677 (which is technically a non-peptide secretagogue)." },
  { term: "Half-Life", definition: "The time required for the concentration of a peptide in the body to decrease by half. Short half-lives (minutes) require frequent dosing or sustained-release formulations, while modifications like PEGylation can extend half-life." },
  { term: "Heptapeptide", definition: "A peptide consisting of seven amino acids. Several cosmetic and research peptides are heptapeptides, including some collagen-stimulating sequences." },
  { term: "IGF-1 (Insulin-Like Growth Factor 1)", definition: "A 70-amino-acid peptide hormone structurally similar to insulin. Produced primarily in the liver in response to growth hormone, IGF-1 mediates many of GH's anabolic effects on tissues." },
  { term: "In Vitro", definition: "Experiments performed outside a living organism, typically in test tubes, petri dishes, or cell cultures. In vitro results do not always translate to in vivo (whole-organism) effects." },
  { term: "In Vivo", definition: "Experiments or observations made within a living organism (animal or human). In vivo studies provide more clinically relevant data than in vitro studies but are more complex and costly." },
  { term: "Melanocortin Receptor", definition: "A family of G protein-coupled receptors (MC1R through MC5R) activated by melanocortin peptides. MC1R regulates skin pigmentation; MC4R regulates appetite and energy homeostasis. Melanotan peptides target these receptors." },
  { term: "Neuropeptide", definition: "A peptide that functions as a neurotransmitter or neuromodulator in the nervous system. Examples include oxytocin, vasopressin, substance P, and neuropeptide Y." },
  { term: "Nootropic", definition: "A substance claimed to enhance cognitive function, including memory, creativity, or motivation. Some peptides like Semax and Selank are classified as nootropic peptides based on preclinical research." },
  { term: "Off-Label Use", definition: "The practice of using an FDA-approved medication for an indication, age group, or dosage form not specified in the approved labeling. Many peptide prescriptions are off-label." },
  { term: "Pentadecapeptide", definition: "A peptide consisting of 15 amino acids. BPC-157 is the most well-known pentadecapeptide in peptide research." },
  { term: "Peptide Bond", definition: "The covalent chemical bond formed between two amino acids when the carboxyl group of one reacts with the amino group of another, releasing a molecule of water (condensation reaction)." },
  { term: "PubMed / PMID", definition: "PubMed is the U.S. National Library of Medicine's free database of biomedical literature. PMID (PubMed Identifier) is the unique numerical ID assigned to each indexed article. All citations on this site include PMIDs for verification." },
  { term: "Randomized Controlled Trial (RCT)", definition: "A study design in which participants are randomly assigned to receive either the intervention or a control (placebo or standard treatment). RCTs are the gold standard for evaluating treatment efficacy." },
  { term: "Subcutaneous Injection", definition: "Administration of a substance into the fatty tissue layer between the skin and muscle. This is the most common route for peptide administration, typically using insulin syringes." },
  { term: "Telomerase", definition: "An enzyme that adds DNA sequence repeats to the ends of chromosomes (telomeres), preventing their shortening during cell division. Epitalon is a peptide studied for its potential to activate telomerase." },
  { term: "Tetrapeptide", definition: "A peptide consisting of four amino acids. Several bioactive tetrapeptides are used in skincare and research, including Epithalon (Ala-Glu-Asp-Gly)." },
  { term: "Tripeptide", definition: "A peptide consisting of three amino acids. GHK-Cu is a well-known copper-binding tripeptide studied for wound healing and anti-aging applications." },
  { term: "WADA (World Anti-Doping Agency)", definition: "The international organization that maintains the Prohibited List of substances banned in competitive sports. Many peptides, including growth hormone secretagogues, are on the WADA Prohibited List." },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/glossary", locale);

  return {
    ...generateSEO({
      title: "Peptide Glossary: Key Terms & Definitions",
      description:
        "Comprehensive glossary of peptide terminology. Understand amino acids, bioavailability, clinical trials, evidence levels, and 30+ essential terms used in peptide science and research.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;

  // Group terms by first letter
  const grouped: Record<string, { term: string; definition: string }[]> = {};
  for (const entry of glossaryTerms) {
    const letter = entry.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(entry);
  }
  const letters = Object.keys(grouped).sort();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Peptide Glossary",
    description:
      "Comprehensive glossary of peptide-related scientific and medical terms.",
    url: `${siteConfig.domain}${prefix}/glossary`,
    hasDefinedTerm: glossaryTerms.map((entry) => ({
      "@type": "DefinedTerm",
      name: entry.term,
      description: entry.definition,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Glossary", href: `${prefix}/glossary` },
          ]}
        />

        <h1 className="text-3xl md:text-4xl font-bold text-[#1A3A5C] mb-4">
          Peptide Glossary
        </h1>

        <p className="text-lg text-[#5A6577] mb-8 leading-relaxed" style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>
          A comprehensive reference of key terms and definitions used throughout
          peptide science, research, and clinical practice. Understanding this
          terminology is essential for interpreting peptide research and making
          informed decisions.
        </p>

        {/* Alphabetical jump links */}
        <nav aria-label="Alphabetical navigation" className="mb-8">
          <div className="flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F0F3F7] text-[#1A3A5C] font-semibold text-sm hover:bg-[#3B7A9E] hover:text-white transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </nav>

        {/* Terms grouped by letter */}
        <div className="space-y-10">
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`}>
              <h2 className="text-2xl font-bold text-[#1A3A5C] border-b-2 border-[#3B7A9E] pb-2 mb-4">
                {letter}
              </h2>
              <div className="space-y-3">
                {grouped[letter].map((entry) => (
                  <div
                    key={entry.term}
                    className="bg-white border border-[#D0D7E2] rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <dt className="font-bold text-[#1A3A5C] text-base mb-1">
                      {entry.term}
                    </dt>
                    <dd
                      className="text-[#5A6577] text-sm leading-relaxed m-0"
                      style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
                    >
                      {entry.definition}
                    </dd>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <AdSlot format="horizontal" className="my-8" />
        </div>

        <FAQ
          title="Glossary FAQ"
          items={[
            {
              question: "How are glossary terms selected?",
              answer:
                "Terms are selected based on their frequency in peptide research literature and their relevance to understanding peptide science. We prioritize terms that appear in PubMed-indexed studies and FDA regulatory documents.",
            },
            {
              question: "What do the evidence levels (A-D) mean?",
              answer:
                "Evidence Level A indicates strong support from multiple randomized controlled trials in humans. Level B indicates moderate support from limited human trials or strong animal data. Level C indicates preliminary evidence from animal studies or small human studies. Level D indicates preclinical, in vitro, or anecdotal evidence only.",
            },
            {
              question: "Why are some peptides not FDA-approved?",
              answer:
                "FDA approval requires extensive clinical trials demonstrating safety and efficacy for specific indications. Many peptides are still in early research stages, are used off-label, or are available through compounding pharmacies without going through the full FDA approval process.",
            },
          ]}
        />
      </div>
    </>
  );
}

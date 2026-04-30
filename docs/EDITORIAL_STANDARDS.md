# PeptideScholar Editorial Standards

## Purpose
Every blog post must pass Google's quality rater guidelines, avoid thin-content penalties, and never feel AI-generated. These rules are mandatory for all health and research content.

---

## 1. Anti-Thin Content Rules

### Minimum Substance
- **Hard floor:** 1,200 words for any article that claims to be a "guide" or "review"
- **Soft target:** 1,800–2,500 words for clinical-data or research-review posts
- **No filler:** Every paragraph must contain a claim, a data point, a mechanism explanation, or a practical insight the reader can act on
- **No repetition:** Do not restate the same idea in consecutive paragraphs using different synonyms

### Original Analysis Requirement
- Summarizing a single study is thin. Every post must **synthesize** at least 3–5 sources and add original framing
- Include a "Why this matters" or "Clinical takeaway" paragraph that is not found in the primary sources
- Comparison tables, decision trees, or dosing cheat-sheets count as original value-adds

### No Generic Introductions
Forbidden openers:
- "In recent years, [topic] has gained significant attention..."
- "As the field of [X] continues to evolve..."
- "With the growing popularity of [Y], many people are wondering..."

Allowed openers:
- Start with a concrete patient scenario or clinical dilemma
- Start with a surprising data point: "Only 12% of patients in the STEP 1 trial achieved ≥20% weight loss..."
- Start with a direct answer to the search query, then unpack it

---

## 2. Anti-AI Voice Rules

### Sentence Rhythm
- **Vary sentence length deliberately.** AI tends toward uniform 18–24 word sentences. Use short punchy sentences (8–12 words) mixed with longer explanatory ones (30–40 words)
- **Start sentences with conjunctions occasionally.** "But the real question is..." or "And yet, the trial data showed..."
- **Use fragments for emphasis.** "Not even close." or "The opposite, actually."

### Word Choice
- **Avoid AI tell-words:**
  - "delve" → use "explore," "break down," "look at"
  - "robust" → use "strong," "well-supported," "consistent across trials"
  - "landscape" → use "field," "market," "range of options"
  - "leverage" → use "use," "take advantage of," "build on"
  - "multifaceted" → use "complex," "has several moving parts"
  - "paradigm" → use "model," "standard approach," "common practice"
  - "synergy" → only use if describing actual pharmacological synergy with data
- **Prefer Anglo-Saxon over Latinate where possible:** "start" not "commence," "end" not "terminate," "use" not "utilize"

### Em Dash Policy
- **Use em dashes sparingly.** Maximum 2 per 500 words
- **Never use em dashes for mere clause separation** that a comma or parentheses could handle
- **Allowed uses:**
  - Interrupting a sentence for dramatic emphasis: "Semaglutide works—but not for everyone"
  - Setting off a surprising aside: "The drug was approved in 2017—for diabetes, not obesity"
- **Forbidden uses:**
  - Replacing commas in lists
  - Separating independent clauses where a period or semicolon works
  - Creating compound adjectives (use hyphens)

### Tone
- **Write like you're explaining to a smart colleague, not a search engine.** Imagine the reader is a biohacker who has read the abstracts but wants the clinical nuance
- **Be willing to say "we don't know."** AI tends to overstate confidence. Human experts hedge appropriately
- **Use second person sparingly.** "You should talk to your doctor" is fine. "You may be wondering" is AI-pattern
- **Include uncertainty language:** "appears to," "the data suggest," "it is not yet clear whether"

---

## 3. Source Verification Rules

### Credible Source Hierarchy
1. **Peer-reviewed RCTs:** NEJM, Lancet, JAMA, BMJ, Diabetes Care, Obesity, Journal of Clinical Endocrinology & Metabolism
2. **Meta-analyses and systematic reviews:** Cochrane, PubMed-indexed
3. **Regulatory documents:** FDA labels, EMA assessments, DEA scheduling decisions
4. **Professional society guidelines:** AACE, Endocrine Society, ADA, ASBP
5. **Reputable medical journalism:** STAT News, MedPage Today (for context, not primary claims)
6. **Manufacturer data:** Only for pricing, availability, and approved indications—not for efficacy claims

### Forbidden Sources
- Reddit, Twitter/X, TikTok, or any unmoderated forum
- Vendor or supplement-company websites
- Predatory journals (check Beall's List or thinkchecksubmit.org)
- News aggregator sites without original reporting
- AI-generated summaries (Perplexity, ChatGPT, etc.) as primary sources

### Verification Workflow
1. Before writing, search PubMed for the claim using the PMID or trial name
2. If citing a trial statistic, open the full text or the abstract and confirm the number
3. If citing a mechanism, trace it to a review article or textbook chapter
4. Every statistic must have a `{pmid: "..."}` or `{note: "Source: ..."}` citation
5. If a claim cannot be verified, remove it or downgrade it to "anecdotal" with explicit labeling

### Citation Format in Body Text
- Inline: "STEP 1 showed 14.9% mean weight loss at 68 weeks (PMID: 33567185)"
- For non-PubMed sources: "FDA approved tirzepatide for obesity in November 2023 (Source: FDA approval letter)"
- At end of article: Numbered reference list with full title, journal, year, and link

---

## 4. Structural Requirements

### Every Post Must Include
1. **Concrete opener** (patient scenario, surprising stat, or direct answer)
2. **Mechanism section** (how it works, not just "it activates receptors")
3. **Evidence section** (trial data with actual numbers, not vague "studies show")
4. **Comparison or context** (how does this compare to alternatives?)
5. **Practical section** (dosing, administration, monitoring, or patient selection)
6. **Honest limitations** (what we don't know, conflicts of interest, evidence gaps)
7. **References** (minimum 5 for guides, 8+ for research reviews)

### Heading Style
- Use sentence case, not title case: "How semaglutide works" not "How Semaglutide Works"
- Headings should be descriptive enough to stand alone: "GI side effects peak during weeks 4–8" not "Side Effects"
- No heading should be a complete sentence ending in a period

---

## 5. Visual Requirements

### When to Use FAL AI Images
- Hero image for every blog post (1200×630, no text, scientific illustration style)
- Mechanism diagrams when no suitable open-source image exists
- Comparison infographics for head-to-head data
- **Never use stock photos of pills, needles, or generic lab equipment**—they signal low-effort content

### Image Prompt Rules
- Always include: "no text, no words, no letters, no watermark"
- Style: "scientific illustration, medical textbook aesthetic, blue and white palette"
- Avoid: hyperrealistic 3D renders that look like pharmaceutical ads

---

## 6. Pre-Publication Checklist

Before any blog post goes live, the author must confirm:

- [ ] Word count ≥ 1,200 (or ≥ 800 for pure news updates)
- [ ] Every statistic has a verified source citation
- [ ] No em dash overuse (≤ 2 per 500 words)
- [ ] No AI tell-words (delve, robust, landscape, leverage, paradigm)
- [ ] Contains original analysis not found in primary sources
- [ ] Includes an explicit limitations/uncertainty paragraph
- [ ] Medical reviewer has signed off (for health content)
- [ ] Hero image generated or sourced
- [ ] Schema.org markup includes `reviewedBy` Person with credentials
- [ ] `dateModified` is updated if post is refreshed

---

## 7. Enforcement

These standards are enforced via:
1. **Code review:** All blog post additions to `blog-posts.ts` require PR review
2. **Automated checks:** `scripts/validate-blog-content.ts` checks word count, citation count, and banned words
3. **Manual spot-checks:** Random 10% of posts verified against PubMed monthly
4. **Reader feedback:** Comments and contact form reports of thin or inaccurate content are triaged within 48 hours

---

*Last updated: 2026-04-27*
*Enforced by: PeptideScholar Editorial Team*
*Medical review policy: All health content reviewed by board-certified MD or PharmD before publication*

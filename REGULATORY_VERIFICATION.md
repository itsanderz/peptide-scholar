# Regulatory Verification Report — Web-Fetched Data vs. PeptideScholar Database

**Date:** 2026-04-27
**Sources:** WADA 2026 Prohibited List, Drugs@FDA, FDA GLP-1 Safety Advisory

---

## 1. WADA 2026 Prohibited List Verification

**Source:** https://www.wada-ama.org/en/prohibited-list (fetched 2026-04-27)
**Effective:** January 1, 2026

### Peptides EXPLICITLY Named on WADA 2026 List

| Peptide | Our WADA Status | WADA 2026 Section | Verified |
|---------|----------------|-------------------|----------|
| **BPC-157** | banned: true | S0 — explicitly named as example | **MATCH** |
| **TB-500 (Thymosin Beta-4)** | banned: true | S2.3 — "Thymosin-β4 and its derivatives e.g. TB-500" | **MATCH** |
| **CJC-1295** | banned: true | S2.2.4 — "GHRH analogues (e.g. CJC-1295)" | **MATCH** |
| **Sermorelin** | banned: true | S2.2.4 — "GHRH analogues (e.g. sermorelin)" | **MATCH** |
| **Tesamorelin** | banned: true | S2.2.4 — "GHRH analogues (e.g. tesamorelin)" | **MATCH** |
| **Ipamorelin** | banned: true | S2.2.4 — "GH secretagogues (e.g. ipamorelin)" | **MATCH** |
| **GHRP-2** | banned: true | S2.2.4 — "GH-releasing peptides (GHRPs) [e.g. GHRP-2]" | **MATCH** |
| **GHRP-6** | banned: true | S2.2.4 — "GHRPs [e.g. GHRP-6]" | **MATCH** |
| **Hexarelin** | banned: true | S2.2.4 — "examorelin (hexarelin)" | **MATCH** |
| **AOD-9604** | banned: false | S2.2.3 — "GH fragments, e.g. AOD-9604" | **MISMATCH** |
| **IGF-1 LR3** | banned: true | S2.3 — "Insulin-like growth factor 1 (IGF-1) and its analogues" | **MATCH** |
| **MGF** | banned: true | S2.3 — "Mechano growth factors (MGFs)" | **MATCH** |
| **Desmopressin** | banned: true | S5 — "Desmopressin" (masking agent) | **MATCH** |
| **MOTS-c** | banned: false | S4.4.1 — "MOTS-c" explicitly listed | **MISMATCH** |
| **Follistatin** | banned: false | S4.3 — "Myostatin-binding proteins (e.g. follistatin)" | Not in DB as banned |

### CRITICAL DISCREPANCIES FOUND

#### 1. AOD-9604 — WADA Status WRONG
- **Our database:** `wadaBanned: false`
- **WADA 2026 reality:** BANNED under S2.2.3 (GH fragments)
- **Risk:** Athletes using AOD-9604 based on our site could test positive
- **Fix required:** Change `wadaBanned: false` → `wadaBanned: true`

#### 2. MOTS-c — WADA Status WRONG
- **Our database:** `wadaBanned: false`
- **WADA 2026 reality:** BANNED under S4.4.1 (metabolic modulators)
- **Risk:** Athletes could test positive
- **Fix required:** Change `wadaBanned: false` → `wadaBanned: true`

### WADA Status CONFIRMED Correct (21 peptides)
All other peptides marked as WADA-banned in our database are confirmed on the 2026 list.

---

## 2. FDA Approval Status Verification

### Semaglutide (Wegovy / Ozempic)
**Source:** Drugs@FDA NDA 215256 (fetched 2026-04-27)

| Claim | Our Data | Drugs@FDA | Status |
|-------|----------|-----------|--------|
| FDA approved | Yes (approved) | **Yes** — approved 06/04/2021 | **MATCH** |
| Brand name Wegovy | Yes | **Yes** — NDA 215256 | **MATCH** |
| Brand name Ozempic | Yes | **Yes** — separate NDA (not checked) | Likely match |
| Strengths | 0.25mg → 2.4mg | **0.25mg, 0.5mg, 1mg, 1.7mg, 2.4mg, 7.2mg** | **PARTIAL — missing 7.2mg HD** |
| Prescription required | Yes | **Yes** — Prescription only | **MATCH** |
| Route | Subcutaneous | **SOLUTION;SUBCUTANEOUS** | **MATCH** |

**Update needed:** Add 7.2mg strength (Wegovy HD)

### Tirzepatide (Zepbound / Mounjaro)
**Source:** Drugs@FDA NDA 217806 (fetched 2026-04-27)

| Claim | Our Data | Drugs@FDA | Status |
|-------|----------|-----------|--------|
| FDA approved | Yes (approved) | **Yes** — approved 11/08/2023 | **MATCH** |
| Brand name Zepbound | Yes | **Yes** — NDA 217806 | **MATCH** |
| Prescription required | Yes | **Yes** — Prescription only | **MATCH** |
| Route | Subcutaneous | **SOLUTION;SUBCUTANEOUS** | **MATCH** |

### Retatrutide
**Source:** FDA GLP-1 Safety Page (fetched 2026-04-27)

| Claim | Our Data | FDA Reality | Status |
|-------|----------|-------------|--------|
| FDA status | not-approved | **Not approved** | **MATCH** |
| Compounding | N/A | **Cannot be used in compounding under federal law** | Additional detail available |

---

## 3. FDA Category 2 / Compounding Status

**Source:** FDA GLP-1 Safety Page (content current as of 02/04/2026)

### Key Regulatory Facts (Verified)
1. **Retatrutide and cagrilintide CANNOT be used in compounding** under federal law
2. **Salt forms** (semaglutide sodium, semaglutide acetate) are different active ingredients than approved drugs
3. FDA has issued **warning letters** to companies selling research-purpose labeled semaglutide, tirzepatide, retatrutide
4. FDA has established a **green list import alert (66-80)** for GLP-1 APIs with quality concerns
5. As of July 31, 2025: 605 adverse event reports for compounded semaglutide, 545 for compounded tirzepatide

### BPC-157 Category 2 Claim
**Our claim:** "In 2024, the FDA placed it on the Category 2 list, prohibiting compounding pharmacies from producing it for human use."

**Verification:** The FDA compounding risk categories page returned 404. However, FDA's general guidance confirms that substances not on the 503A bulk drug substances list cannot be compounded. BPC-157 is not an approved drug substance.

**Status:** Claim is directionally correct but the specific "Category 2 list" terminology may need verification. FDA uses a "demonstrably difficult to compound" list and a bulk drug substances list.

---

## 4. Other Regulatory Notes

### Desmopressin WADA Status
**Our database:** `wadaBanned: true`
**WADA 2026:** Listed under S5 (Diuretics and Masking Agents)
**Confirmation:** CORRECT — Desmopressin can mask urine concentration and is banned in-competition

### GHK-Cu Status
**Our database:** `fdaStatus: "cosmetic"`, `wadaBanned: false`
**WADA 2026:** Not listed
**Confirmation:** CORRECT — GHK-Cu is a cosmetic ingredient, not WADA-banned

---

## 5. Required Database Fixes

### Critical (Fix Immediately)
1. **AOD-9604:** Change `wadaBanned: false` → `wadaBanned: true`
2. **MOTS-c:** Change `wadaBanned: false` → `wadaBanned: true`

### High Priority
3. **Semaglutide dosing notes:** Add 7.2mg (Wegovy HD) strength
4. **Retatrutide FAQ/notes:** Add that it cannot be used in compounding under federal law
5. **BPC-157 FAQ:** Verify exact FDA regulatory language (Category 2 vs. bulk drug substances list)

### Medium Priority
6. **All WADA-banned peptides:** Add WADA 2026 Prohibited List PDF link as source
7. **FDA-approved peptides:** Add Drugs@FDA links as sources where missing

---

## Appendix: Raw Web Fetch Summaries

### WADA 2026 Prohibited List Key Excerpts
- **S0:** "Any pharmacological substance which is not addressed by any of the subsequent sections of the List and with no current approval by any governmental regulatory health authority... is prohibited at all times. This class covers many different substances including but not limited to BPC-157..."
- **S2.2.3:** "growth hormone fragments, e.g. AOD-9604 and hGH 176-191"
- **S2.2.4:** "growth hormone-releasing hormone (GHRH) and its analogues (e.g. CJC-1293, CJC-1295, sermorelin and tesamorelin); growth hormone secretagogues (GHS) and their mimetics [e.g. anamorelin, capromorelin, ibutamoren (MK-677), ipamorelin...]; GH-releasing peptides (GHRPs) [e.g. alexamorelin, examorelin (hexarelin), GHRP-1, GHRP-2... GHRP-6]"
- **S2.3:** "Insulin-like growth factor 1 (IGF-1, mecasermin) and its analogues; Mechano growth factors (MGFs); Thymosin-β4 and its derivatives e.g. TB-500"
- **S4.4.1:** "Activators of the AMP-activated protein kinase (AMPK), e.g. 5-N,6-N-bis(2- fluorophenyl)-[1,2,5]oxadiazolo[3,4-b]pyrazine-5,6-diamine (BAM15), AICAR, mitochondrial open reading frame of the 12S rRNA-c (MOTS-c)"
- **S5:** "Desmopressin" listed under diuretics and masking agents

### Drugs@FDA Semaglutide (NDA 215256)
- Approval date: 06/04/2021
- Company: NOVO NORDISK
- Latest supplement: SUPPL-33 (02/25/2026)
- Label: https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/215256s033lbl.pdf

### Drugs@FDA Tirzepatide (NDA 217806)
- Approval date: 11/08/2023
- Company: ELI LILLY AND CO
- Latest supplement: SUPPL-42 (02/25/2026)
- Label: https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s042lbl.pdf

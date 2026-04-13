# Page Family Schema Spec

Date: April 11, 2026
Purpose: Define the first set of schema-driven page families for pSEO 2.0 and commercial rollout.

## 1. Principles

- all scalable pages should be built from structured data
- titles and slugs should be deterministic where possible
- high-risk fields should be deterministic or reviewed
- renderers should be purpose-built for each page family
- every page family must declare:
  - usefulness
  - CTA role
  - indexing rule
  - review requirement

## 2. Shared Blocks

Every page schema should include:
- `meta`
- `seo`
- `trust`
- `cta`
- `sources`
- `faqs` where appropriate

Required shared fields:
- market
- locale
- review state
- index state
- monetization state
- reviewed date
- disclaimer

## 3. Page Families

### 3.1 Treatment Hub

Intent:
- high-intent informational and commercial

Use cases:
- treatment overview
- evidence
- side effects
- provider CTA
- app handoff

Primary CTA:
- Find a provider

Indexing:
- yes, once reviewed

Review requirement:
- reviewed-indexable minimum
- monetizable for partner CTAs

### 3.2 Market Treatment Page

Intent:
- country-specific approval, availability, legal path, and cost

Use cases:
- semaglutide in Australia
- tirzepatide in Singapore

Primary CTA:
- market-specific next step

Indexing:
- only if market is content-ready and page has differentiated value

Review requirement:
- reviewed-indexable minimum

### 3.3 Comparison Page

Intent:
- decision support and commercial comparison

Use cases:
- semaglutide vs tirzepatide
- Wegovy vs Mounjaro in UK

Primary CTA:
- Compare and get matched

Indexing:
- yes

Review requirement:
- reviewed-indexable minimum

### 3.4 Provider Page

Intent:
- direct revenue and lead generation

Use cases:
- provider detail
- provider comparison
- provider result cards

Primary CTA:
- Start intake / book / learn more

Indexing:
- only in partner-ready markets
- only when the page has enough unique provider information

Review requirement:
- monetizable

### 3.5 Cost Page

Intent:
- high-intent commercial

Use cases:
- semaglutide cost in Australia
- tirzepatide insurance coverage in the US

Primary CTA:
- Find affordable options / provider path

Indexing:
- yes in market-ready countries

Review requirement:
- reviewed-indexable minimum

### 3.6 Tool Landing Page

Intent:
- informational + repeat utility + app conversion

Use cases:
- peptide half-life calculator
- tirzepatide dosage planner

Primary CTA:
- Use tool

Secondary CTA:
- Save/export/app handoff

Indexing:
- yes

Review requirement:
- reviewed-indexable minimum

### 3.7 App Landing Page

Intent:
- app-intent, waitlist, installs, premium conversion

Use cases:
- semaglutide tracker
- peptide protocol tracker

Primary CTA:
- Join waitlist / install / start web app

Indexing:
- yes

Review requirement:
- reviewed-indexable minimum

### 3.8 Safety / Legal Overview

Intent:
- high-trust explanatory entry point

Use cases:
- online pharmacy legality
- compounded GLP-1 safety
- COA guide

Primary CTA:
- use safety tool or see legal alternatives

Indexing:
- yes if differentiated and source-backed

Review requirement:
- reviewed-indexable minimum

## 4. Families To Keep Noindex By Default

- thin peptide x state/country variants
- auto-generated provider pages with insufficient proof signals
- low-supply markets with no meaningful CTA
- unsupported locale/market pair pages

## 5. Renderer Requirements

Every page family should support:
- trust bar
- market summary block
- FAQ block
- structured data
- internal link module
- related tools
- related app path
- CTA module

## 6. Acceptance Criteria Per Family

No page family launches unless:
- its schema is finalized
- its renderer exists
- its CTA logic is market-aware
- its internal link strategy is defined
- analytics events are defined
- index rules are defined


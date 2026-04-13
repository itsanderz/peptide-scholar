# PeptideScholar Implementation Blueprint

Date: April 11, 2026
Owner: Product / Growth / Platform leadership
Status: Working operating document

## 1. Purpose

This document is the operating blueprint for turning PeptideScholar into a global, high-trust, high-conversion peptide platform that:

- acquires demand through SEO, tools, and comparisons
- converts users into provider leads, email subscribers, and app/PWA users
- monetizes through provider referrals, premium tracker features, and vetted partners
- expands globally without creating low-trust, thin, or regulatorily risky content

The website must produce revenue independently.
The app/PWA must increase retention and LTV.
The system must scale globally without sacrificing quality, clarity, or compliance.

## 2. Business Objective

Build the category leader for evidence-based peptide and GLP-1 decisions.

Primary outcome:
- Website becomes the main acquisition and monetization layer.

Secondary outcome:
- App/PWA becomes the retention, premium, and recurring-use layer.

Operating thesis:
- Users want a safer path from curiosity to action.
- Competitors like The Peptide List are stronger at breadth and directory energy.
- PeptideScholar can win on trust, usability, legal clarity, and practical tools.

## 3. Strategic Model

PeptideScholar will operate as one platform with four layers:

1. Public discovery layer
- Treatments
- Compare
- Costs
- Providers
- Tools
- Learn
- App landing pages

2. Conversion layer
- Provider matcher
- Market-aware CTA logic
- Email capture
- Cost calculators
- Exports
- Partner pages

3. Utility layer
- Half-life visualization
- Reconstitution and vial depletion tools
- Protocol and cycle planning
- Side-effect and symptom utilities
- COA and sourcing safety workflows

4. Tracking layer
- PWA first
- Native app later if validated
- Logging, reminders, inventory, exports, adherence workflows

## 4. What Success Looks Like

Within 12 months:

- website generates meaningful revenue from provider referrals and digital premium products
- pSEO drives sustained organic growth without trust erosion or indexing collapse
- core tools become repeat-use assets, not one-time utilities
- PWA proves retention and willingness to pay before native app investment
- first international markets are live with market-correct content and monetization states

## 5. Strategic Rules

1. Separate market from locale.
- Locale controls language and UI text.
- Market controls regulation, pricing, approved products, CTAs, providers, and monetization state.

2. Use pSEO as software.
- AI fills strict schemas.
- Renderers generate page experiences.
- We do not publish freeform AI content at scale.

3. Scale by quality gates.
- Generate broadly.
- Review selectively.
- Index deliberately.
- Expand only after traffic, conversion, and quality thresholds are met.

4. Monetize approved and regulated pathways first.
- Research-peptide content is traffic and trust inventory.
- Approved-treatment pages are revenue inventory.

5. Keep the app in the wellness/adherence lane until a deliberate regulated-software decision is made.

## 6. Current Repo Implications

Current strengths:
- multilingual locale system in `src/lib/i18n.ts`
- broad sitemap and route generation in `src/app/sitemap.ts`
- existing tools surface in `src/app/[locale]/tools/page.tsx`
- existing legal and treatment page models

Current limitations:
- no distinct market model
- locale breadth exceeds current monetization and indexing strength
- tools are under-positioned as a commercial and retention engine
- CTA logic is too page-local and not market-aware

## 7. Proposed Technical Architecture

### 7.1 Routing Strategy

Phase 1:
- keep root `/` as US English canonical
- keep existing locale routes operational
- add market-aware rendering under the hood

Phase 2:
- add explicit market sections such as:
  - `/uk/...`
  - `/au/...`
  - `/sg/...`
  - `/ae/...`
  - `/nz/...`

Phase 3:
- support locale overlays only where commercially useful
- example: `/sg/zh/...` or `/ae/ar/...` only after market readiness

Rule:
- do not treat language pages as market pages

### 7.2 New Core Data Files

Add:
- `src/data/markets.ts`
- `src/data/market-regulations.ts`
- `src/data/approved-products.ts`
- `src/data/providers.ts`
- `src/data/pricing.ts`
- `src/data/generated/`
- `src/schemas/`
- `src/renderers/`
- `src/lib/market.ts`
- `src/lib/content-governance.ts`
- `src/lib/review-state.ts`
- `src/lib/source-registry.ts`

### 7.3 Core Entities

Market:
- code
- name
- region
- currencies
- units
- regulator
- approved products
- monetization readiness
- provider readiness
- app availability state
- legal disclaimers

Compound:
- slug
- names
- evidence grade
- routes
- risks
- approved products by market
- comparison relationships
- app support flags

Provider:
- slug
- markets
- treatment coverage
- telehealth availability
- pricing model
- insurance acceptance
- verification status
- partner status
- lead-routing metadata

Tool:
- slug
- category
- markets available
- data requirements
- app handoff support

Page asset:
- schema type
- market
- locale
- review state
- index state
- monetization state
- source completeness

## 8. Review and Publishing States

Every scalable asset must live in one of these states:

- `draft`
- `generated`
- `generated-noindex`
- `reviewed-indexable`
- `monetizable`
- `deprecated`

Rules:
- legal, provider, cost, and high-intent money pages cannot jump from `generated` to `monetizable`
- country launch pages require source review and commercial review
- thin or low-confidence pages remain `generated-noindex`

## 9. Information Architecture

Top-level navigation:
- Treatments
- Compare
- Costs
- Providers
- Tools
- App
- Learn

Secondary navigation by page family:

Treatments:
- overview
- evidence
- side effects
- legality
- cost
- provider options
- tracking

Compare:
- efficacy
- side effects
- route
- cost
- evidence
- legal availability

Costs:
- insurance
- coupons/savings
- cash pay
- prior auth
- country-specific cost pages

Providers:
- by market
- by treatment
- by care model
- by budget/insurance
- by telehealth availability

Tools:
- calculators
- visualizers
- planners
- exports
- safety checks

App:
- medication tracker pages
- protocol tracker
- reminder pages
- inventory pages

Learn:
- glossary
- market guides
- COA guides
- regulatory explainers
- evidence reviews

## 10. pSEO 2.0 System

### 10.1 Generation Principles

- AI fills strict JSON schemas only
- titles and slugs are deterministic wherever possible
- formulas, cost tables, legal flags, and product availability are deterministic
- intros, FAQ summaries, and low-risk supportive copy can be AI-assisted within constraints
- risky claims require reviewed source-backed data

### 10.2 Required Taxonomy Domains

- markets
- compounds
- goals
- approved products
- provider types
- insurance/payment models
- tool types
- app intents
- comparison intents
- evidence and risk classes
- source authorities

### 10.3 Priority pSEO Clusters

Cluster A: approved treatment x market
- semaglutide in australia
- tirzepatide in singapore
- wegovy in uk

Cluster B: approved treatment x cost / insurance / eligibility
- zepbound insurance uk
- semaglutide cost australia

Cluster C: approved treatment x compare
- wegovy vs mounjaro in uk
- semaglutide vs tirzepatide australia

Cluster D: provider x market x treatment
- semaglutide telehealth providers uk
- weight loss clinics australia mounjaro

Cluster E: tool-intent
- semaglutide half-life calculator
- peptide vial depletion calculator
- tirzepatide dosing planner

Cluster F: app-intent
- semaglutide tracker
- tirzepatide tracker
- peptide protocol tracker
- injection reminder app

Cluster G: safety and legality
- legal online pharmacy singapore
- compounded glp-1 warning australia
- peptide coa checklist

### 10.4 pSEO Rules

- generate many, index few first
- batch launch by cluster
- monitor indexation and conversion before expanding
- no city-name swap pages
- no generic translated clones
- every page must pass the usefulness test:
  - useful without search?
  - worth bookmarking?
  - has a clear next step?

## 11. Page Family Schemas

### 11.1 Treatment Hub Schema

Required fields:
- treatment slug
- market
- approved status
- product names
- evidence summary
- common side effects
- cost summary
- provider CTA
- app CTA
- FAQs
- reviewed date
- source IDs

### 11.2 Market Treatment Schema

Required fields:
- treatment
- market
- regulator status
- approved products in market
- route and availability notes
- local safety notes
- local cost notes
- local provider pathway
- local CTA state
- local FAQs

### 11.3 Comparison Schema

Required fields:
- treatment A
- treatment B
- market
- evidence comparison
- cost comparison
- side-effect comparison
- route comparison
- provider recommendation CTA

### 11.4 Provider Schema

Required fields:
- provider name
- markets served
- telehealth or local
- treatments offered
- pricing model
- insurance support
- proof signals
- partner status
- disclaimer
- lead-routing parameters

### 11.5 Cost Schema

Required fields:
- treatment
- market
- list price
- common cash range
- insurance range
- coupon/savings notes
- prior auth summary
- last updated

### 11.6 Tool Schema

Required fields:
- tool type
- market
- treatment support
- data inputs
- examples
- handoff CTA
- app support

### 11.7 App Landing Schema

Required fields:
- app use case
- treatment
- supported features
- screenshots or placeholders
- platform availability
- waitlist or install CTA
- privacy statement

## 12. Rendering System

Create specialized renderers for:
- treatment hubs
- market treatment pages
- comparisons
- providers
- costs
- calculators
- planners
- safety/legal pages
- app landing pages

All renderers should support:
- trust bar
- reviewed date
- evidence badge
- FAQ block
- internal links
- market selector
- CTA module
- structured data

## 13. Monetization Architecture

### 13.1 Revenue Sources

Primary:
- provider referrals

Secondary:
- premium app/PWA features

Tertiary:
- vetted sponsorships
- labs/tests/tools

Quaternary:
- concierge matching
- premium reports

### 13.2 CTA Hierarchy by Page Type

Treatment page:
- primary: Find a provider
- secondary: Compare options

Legal page:
- primary: See legal treatment options
- secondary: Use calculator

Comparison page:
- primary: Compare and get matched
- secondary: Save to tracker

Tool page:
- primary: Use tool
- secondary: Save/export/install app

Research content page:
- primary: See legal alternatives
- secondary: Join app waitlist

### 13.3 Provider Matcher

Inputs:
- market
- goal
- preferred treatment
- budget
- insurance
- telehealth preference
- urgency

Outputs:
- best-fit partner
- secondary options
- fallback content path if unsupported market

## 14. App / PWA Strategy

### 14.1 Product Positioning

Private protocol tracker for peptides and GLP-1s.

### 14.2 MVP Features

- dose logging
- reminders
- injection site rotation
- inventory and vial depletion
- side effects and notes
- multi-compound support
- half-life estimates
- exports for clinicians

### 14.3 Pricing

- free core
- lifetime unlock
- optional annual plan

### 14.4 Native App Gate

Do not build native until:
- PWA D30 retention is healthy
- export usage is meaningful
- users repeatedly request notifications/widgets
- conversion to paid is proven

## 15. Global Market Rollout

### Tier 1

US:
- full monetization
- provider referrals
- cost pages
- app waitlist and PWA

UK:
- market pages
- app capture
- provider monetization after partner setup

Australia:
- market pages
- app capture
- provider monetization after partner setup

### Tier 2

Singapore:
- educational pages
- app capture
- tools
- provider monetization later

UAE:
- educational pages
- app capture
- tools
- provider monetization later

New Zealand:
- educational pages
- app capture
- AU-adjacent expansion logic

### Tier 3

Germany
Netherlands
France
Spain

Focus:
- treatment and market pages
- tools
- app capture
- later partner routes

### Tier 4

Hong Kong
Japan
Korea

Focus:
- tool and app-intent pages first
- country-specific monetization only after validation

## 16. Design and UX Standards

Visual direction:
- calm medical-luxury
- no supplement-shop aesthetic
- no clutter
- strong spacing and typography
- fast interaction feedback

UX rules:
- answer first, explanation second
- one dominant CTA per screen
- mobile-first
- sticky actions on high-intent pages
- country, currency, and units visible
- consistent trust modules
- tool outputs should be exportable and savable

Performance:
- target fast LCP and responsive interaction
- every template must be optimized for mobile

Accessibility:
- WCAG-aligned colors and keyboard flows
- screen-reader labels for calculators and forms

## 17. Analytics and Dashboards

SEO dashboard:
- indexed pages
- known pages
- indexed/known ratio
- clicks, impressions, CTR
- cluster performance
- market performance

CRO dashboard:
- CTA CTR
- lead form completion
- tool completion
- email capture
- quick backs
- dead clicks

Revenue dashboard:
- revenue per session
- partner EPC
- qualified lead rate
- lead-to-booking
- app premium conversion

Retention dashboard:
- D7 and D30 retention
- repeat tool usage
- export usage
- reminder adoption

Quality dashboard:
- stale pages
- review backlog
- factual error count
- broken CTA count
- untranslated text count

## 18. CRM and Lifecycle

Required segments:
- approved-treatment users
- legal-intent users
- cost-intent users
- provider-matcher users
- tool users
- app waitlist users
- PWA users

Email flows:
- provider readiness
- cost and insurance guide
- treatment starter pack
- app beta onboarding
- tool follow-up
- inactive user revival

## 19. Compliance and Review Workflow

Review chain:
- source check
- factual QA
- market QA
- medical/legal wording QA
- CTA and partner QA
- final publishing QA

Do not publish without:
- reviewed date
- disclosures
- source references
- market-aware copy
- correct CTA behavior

## 20. Workstreams

### Workstream A: Platform

Scope:
- market model
- review states
- source registry
- routing
- structured data engine

Lead:
- Engineering platform lead

### Workstream B: CRO and Design

Scope:
- homepage redesign
- page template redesign
- provider matcher UX
- CTA modules
- trust modules

Lead:
- Design lead + growth PM

### Workstream C: pSEO Engine

Scope:
- taxonomy
- schemas
- JSON generation
- validation
- batch publishing
- indexing governance

Lead:
- SEO lead + platform engineer

### Workstream D: Revenue Ops

Scope:
- partner management
- referral tracking
- CRM
- lead scoring
- payout logic

Lead:
- Partnerships lead

### Workstream E: Tools and PWA

Scope:
- calculators
- planners
- saved outputs
- tracker MVP
- premium logic

Lead:
- Product + frontend/app lead

### Workstream F: Expansion

Scope:
- market research
- country launch kits
- localization QA
- market-specific monetization readiness

Lead:
- Expansion PM

## 21. First 12-Month Roadmap

### Phase 0: Weeks 1-3

- finalize taxonomy
- finalize market model
- define review states
- define analytics map
- define CRM and attribution model
- define noindex/index rules
- freeze indiscriminate locale expansion

### Phase 1: Weeks 3-10

- redesign homepage and nav
- build provider matcher
- tighten top money page templates
- launch half-life visualizer
- launch vial depletion calculator
- tighten canonical/index logic

### Phase 2: Weeks 8-18

- launch US provider monetization stack
- build approved-treatment and cost clusters
- launch app waitlist pages
- launch UK/AU market pages
- build doctor export and cycle planner

### Phase 3: Weeks 16-28

- launch PWA beta
- test premium pricing
- expand partner inventory
- launch Singapore/UAE educational plus app capture
- expand winning pSEO clusters

### Phase 4: Weeks 24-52

- scale winning clusters
- selective EU expansion
- selective Asia expansion
- decide on native app
- deepen CRM and retention flows

## 22. First 100 Deliverables

### Foundation: 1-10

1. Create `markets.ts`
2. Create `market-regulations.ts`
3. Create `approved-products.ts`
4. Create `providers.ts`
5. Create `pricing.ts`
6. Create `review-state.ts`
7. Create `source-registry.ts`
8. Define market codes and monetization states
9. Define page review state machine
10. Add governance documentation for index/noindex rules

### Routing and Platform: 11-20

11. Add market context resolver
12. Preserve US root as canonical default
13. Add `/uk`, `/au`, `/sg`, `/ae`, `/nz` route scaffolds
14. Add market selector component
15. Add language selector persistence
16. Add market-aware canonical helper
17. Add market-aware hreflang helper
18. Add structured data helper per page family
19. Add content freshness helper
20. Add review-state badge logic for internal admin use

### Design System and CRO: 21-30

21. Redesign homepage information architecture
22. Redesign global nav
23. Add one primary CTA framework per page type
24. Build trust bar component
25. Build reviewed-date component
26. Build evidence summary block
27. Build market summary block
28. Build sticky mobile CTA bar
29. Build app handoff CTA module
30. Build email capture variants by intent

### Provider Conversion: 31-40

31. Build provider matcher flow
32. Define provider lead schema
33. Add lead scoring logic
34. Add CRM event mapping
35. Build provider result page template
36. Build unsupported-market fallback flow
37. Build partner attribution tracking
38. Build provider comparison template
39. Build provider submission form
40. Build provider QA checklist

### pSEO Engine: 41-50

41. Define treatment hub schema
42. Define market-treatment schema
43. Define comparison schema
44. Define cost page schema
45. Define provider page schema
46. Define tool landing schema
47. Define app landing schema
48. Build schema validation pipeline
49. Build JSON content loader
50. Build batch publishing workflow

### Indexing and SEO Controls: 51-60

51. Update sitemap strategy to respect market readiness
52. Add per-page index state support
53. Add cluster-level noindex defaults
54. Add canonical conflict detection
55. Add stale-page detection
56. Add schema markup coverage report
57. Add internal-link recommendations by page family
58. Add app-intent landing pages to sitemap rules
59. Add tool-intent landing page generation rules
60. Add launch guard against indexing unsupported markets

### US Money Pages: 61-70

61. Rebuild semaglutide treatment hub
62. Rebuild tirzepatide treatment hub
63. Rebuild semaglutide vs tirzepatide comparison
64. Build semaglutide cost hub
65. Build tirzepatide cost hub
66. Rebuild legal overview page
67. Add provider CTAs to top legal pages
68. Build insurance and prior-auth explainer hub
69. Build semaglutide tracker landing page
70. Build tirzepatide tracker landing page

### International Launch Assets: 71-80

71. Build UK market hub
72. Build Australia market hub
73. Build Singapore market hub
74. Build UAE market hub
75. Build New Zealand market hub
76. Build UK semaglutide page
77. Build Australia tirzepatide page
78. Build Singapore legal GLP-1 guide
79. Build UAE telehealth and legality guide
80. Build market-specific fallback CTA logic

### Tools and PWA: 81-90

81. Build half-life visualizer
82. Build vial depletion calculator
83. Build cycle planner
84. Build doctor export
85. Build COA red-flag checker
86. Build saved result model
87. Build PWA shell
88. Build protocol tracker MVP
89. Build reminder and inventory logic
90. Build premium unlock framework

### Lifecycle, QA, and Ops: 91-100

91. Create analytics dashboard spec
92. Create CRO dashboard spec
93. Create revenue dashboard spec
94. Create retention dashboard spec
95. Create quality dashboard spec
96. Create market launch checklist
97. Create page family launch checklist
98. Create partner onboarding checklist
99. Create translation QA checklist
100. Create monthly review and scale/no-scale decision ritual

## 23. KPI Targets and Gates

Phase 1 gates:
- provider CTA CTR on key money pages > 4%
- tool completion rate > 35%
- quick-backs on top pages reduced materially from baseline

Phase 2 gates:
- qualified lead rate acceptable to partners
- revenue per session on money pages improving month over month
- indexed/known page ratio improving in priority clusters

Phase 3 gates:
- PWA D30 retention > 20%
- repeat use of at least one core tool
- export usage proving utility

Scale gates:
- no pSEO cluster scales until it proves traffic, useful engagement, and a viable monetization path

## 24. Risk Register

Risk: over-indexing weak pages
- mitigation: review states, noindex defaults, batch launches

Risk: low-trust AI content perception
- mitigation: schema-driven generation, reviewed pages, trust modules

Risk: compliance mismatch by country
- mitigation: market-specific review, market fallback logic

Risk: app built too early
- mitigation: PWA first, native gates

Risk: provider ops complexity
- mitigation: start with limited partners and strong lead scoring

Risk: design inconsistency across markets
- mitigation: shared renderer system and design tokens

## 25. Launch Checklists

### Page Launch Checklist

- content state approved
- sources complete
- reviewed date present
- evidence block present
- market block correct
- CTA correct
- analytics events firing
- schema markup valid
- canonical correct
- internal links present
- mobile QA complete

### Market Launch Checklist

- market metadata complete
- approved products verified
- legal framing reviewed
- pricing/currency logic reviewed
- unsupported paths handled
- provider supply verified if monetized
- local CTA behavior reviewed

### Tool Launch Checklist

- calculations validated
- inputs and units localized
- output export works
- app handoff CTA works
- analytics works
- accessibility QA passes

## 26. Operating Cadence

Weekly:
- SEO and indexing review
- CRO and lead-quality review
- partner operations review

Biweekly:
- pSEO launch batch review
- design and UX QA review
- tool performance review

Monthly:
- market readiness review
- stale-content review
- pricing and premium review
- stop/go decisions on new clusters

Quarterly:
- roadmap reprioritization
- native app decision review
- country expansion review

## 27. Immediate Next 30 Days

Must complete:
- market model
- review-state model
- homepage/nav redesign spec
- provider matcher spec
- half-life visualizer spec
- vial depletion calculator spec
- treatment/legal/comparison page template spec
- updated sitemap/indexing rules
- analytics event taxonomy
- CRM/partner attribution contract

## 28. Final Decision Framework

When choosing what to ship next, prioritize in this order:

1. pages or tools that already match current traffic intent
2. pages or tools with a clear revenue path
3. pages or tools that improve retention
4. market expansion only after local readiness
5. native app only after PWA proof

This is the operating rule:
- build what increases trust
- then what increases conversion
- then what increases retention
- then what increases scale


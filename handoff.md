# PeptideScholar Handoff

Last updated: 2026-04-12 (Phase 1 + Phase 2 complete)  
Repo: `C:\Users\drewm\Downloads\us\peptides-wiki`

This document is the canonical handoff for the next LLM or engineer. It is written to make the remaining work executable without relying on prior chat context.

## 1. Goal

PeptideScholar is being built into a `world-class, evidence-first, conversion-oriented peptide platform` with:

- `Website = acquisition + trust + monetization`
- `Provider layer = qualified treatment routing / lead generation`
- `Tools = repeat-use utility and conversion support`
- `App/PWA = retention + premium revenue`
- `Subdomains = future product variants, not random SEO branches`

The site should compete on:

- trust
- regulatory clarity
- strong UX
- useful tools
- cleaner provider decision flows
- higher monetization quality than directory-first competitors

## 2. Current Status Summary

Phase 1 (monetizable US core) and Phase 2 (CRM) are both complete as of 2026-04-12. The following are true:

- `npm run validate:generated` passes (6 assets: 2 treatment, 2 cost, 2 app)
- `npm run lint` passes
- `npm run build` passes — all routes including `/treatments` and `/treatments/[slug]` generated
- production-mode local site can be served with `next start`
- staged subdomains are live and verified

This means the repo is currently in a `buildable, lint-clean, Phase-1-complete` state. Next priority is Phase 3 (tools moat).

## 3. What Has Already Been Built

### 3.1 Market-aware platform foundation

Implemented:

- market registry and rollout metadata
- request-level market resolution
- host-aware site resolution
- host-aware robots and sitemap behavior
- market-aware alternate locale generation
- market-aware CTA behavior
- market selector in the main app

Key files:

- `src/data/markets.ts`
- `src/lib/market.ts`
- `src/lib/request-market.ts`
- `src/lib/request-site.ts`
- `src/proxy.ts`
- `src/lib/locale-params.ts`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/layout.tsx`

### 3.2 Provider conversion layer

Implemented:

- provider matcher UI
- provider routing profiles
- provider browse pages
- provider detail pages
- provider taxonomies
- provider routing by treatment, goal, insurance, intake mode, and state
- provider lead API
- provider attribution hooks

Important constraint:

- current “providers” are mostly `internal PeptideScholar routing profiles`, not a fully verified external clinic marketplace

Key files:

- `src/components/ProviderMatcher.tsx`
- `src/components/ProviderPartnerCard.tsx`
- `src/components/ProviderDirectoryFilters.tsx`
- `src/components/ProviderIntentCard.tsx`
- `src/components/TrackedMailtoLink.tsx`
- `src/data/provider-partners.ts`
- `src/lib/provider-routing.ts`
- `src/lib/provider-options.ts`
- `src/lib/provider-leads.ts`
- `src/app/api/leads/provider/route.ts`
- `src/app/[locale]/providers/...`

### 3.3 Approved-treatment monetization surfaces

Implemented:

- approved-treatment routing blocks on peptide pages
- approved-treatment routing blocks on comparison pages
- approved-treatment routing blocks on category pages
- money-path cards linking to cost and tracker pages

Key files:

- `src/components/ApprovedTreatmentRouteCard.tsx`
- `src/components/ApprovedComparisonRouteCard.tsx`
- `src/components/ApprovedCategoryRouteCard.tsx`
- `src/components/TreatmentMoneyLinks.tsx`
- `src/app/[locale]/peptides/[slug]/page.tsx`
- `src/app/[locale]/compare/[slug]/page.tsx`
- `src/app/[locale]/best-for/[category]/page.tsx`

### 3.4 Structured money-page system

Implemented:

- schema-backed cost pages
- schema-backed app / tracker waitlist pages
- typed loader for generated content
- generated-content validator script

Routes live:

- `/costs`
- `/costs/[slug]`
- `/app`
- `/app/[slug]`

Generated assets currently present:

- `src/data/generated/cost/us-semaglutide-cost.json`
- `src/data/generated/cost/us-tirzepatide-cost.json`
- `src/data/generated/app/us-semaglutide-tracker.json`
- `src/data/generated/app/us-tirzepatide-tracker.json`
- `src/data/generated/treatment/us-semaglutide-treatment.json`
- `src/data/generated/treatment/us-tirzepatide-treatment.json`

Key files:

- `src/lib/generated-content.ts`
- `src/types/generated-content.ts`
- `scripts/validate-generated-content.mjs`
- `src/app/[locale]/costs/page.tsx`
- `src/app/[locale]/costs/[slug]/page.tsx`
- `src/app/[locale]/app/page.tsx`
- `src/app/[locale]/app/[slug]/page.tsx`
- `src/components/SourceCitationList.tsx`

### 3.5 Analytics and operational documentation

Implemented:

- analytics event expansion for market/provider/app flows
- workstream and launch docs
- blueprint docs

Key files:

- `src/lib/analytics.ts`
- `docs/ANALYTICS_EVENT_MAP.md`
- `docs/WORKSTREAM_RACI.md`
- `docs/LAUNCH_CHECKLISTS.md`
- `IMPLEMENTATION_BLUEPRINT.md`

### 3.6 Subdomain architecture

Implemented and live:

- `https://pets.peptidescholar.com`
- `https://labs.peptidescholar.com`

Current behavior:

- both are live staged variants
- both return `200`
- both are `noindex, nofollow`
- both render dedicated staged landing pages
- both are isolated from the main-site sitemap/robots behavior

Key files:

- `src/lib/site-config.ts`
- `src/lib/request-site.ts`
- `src/app/[locale]/site-variant/page.tsx`
- `src/components/PlannedSiteLanding.tsx`
- `docs/SUBDOMAIN_ARCHITECTURE.md`

## 4. What Has Been Verified

The following have been explicitly re-checked in this session:

- `npm run validate:generated` passed with `6` assets validated
- `npm run lint` passed
- `npm run build` passed
- local production build can be served
- `pets.peptidescholar.com` and `labs.peptidescholar.com` respond successfully
- staged subdomains return `X-Robots-Tag: noindex, nofollow`

Additional verified facts:

- provider lead routing returns structured matches and scoring
- cost and app pages render in production build
- comparison pages include money-path surfaces

## 5. Important Current Limitations

These are the major incomplete or still-non-world-class parts of the system.

### 5.1 CRM is not operationally complete

The provider lead pipeline is built, but webhook delivery is not live until:

- `PROVIDER_LEAD_WEBHOOK_URL` is configured

Current state:

- lead scoring works
- routing works
- response payloads work
- CRM delivery remains effectively `stubbed` unless webhook env is set

### 5.2 Treatment hubs — COMPLETE

- `/treatments` — live, index of semaglutide and tirzepatide hubs
- `/treatments/semaglutide` — live, full hub with provider CTA, cost CTA, tracker CTA, source citations, FAQ
- `/treatments/tirzepatide` — live, same structure
- nav/footer exposure — "Treatments" link present
- sitemap coverage — treatment routes included
- treatment routes wired back into peptide and compare pages

### 5.3 The provider layer is still routing-first, not partner-network-first

Current provider system is good for:

- intent capture
- UX testing
- internal routing logic
- early monetization design

But it is not yet a fully world-class revenue engine because it lacks:

- verified partner inventory
- booking handoff
- real lead acceptance/rejection feedback loops
- partner-level economics tracking
- qualification-to-booking reporting

### 5.4 Tools are still behind the strategic plan

The strongest utility features from the roadmap are not yet built:

- half-life visualizer
- vial depletion calculator
- inventory / refill timing planner
- cycle planner
- doctor-ready export
- COA / source red-flag tool

### 5.5 PWA / app is still only at the landing-page stage

Not yet built:

- actual tracker shell
- local-first protocol logging
- reminders
- inventory state
- export workflow
- premium gating

### 5.6 Global rollout is still architecture-ready, not content-complete

The market system exists, but the following are not yet built as fully localized rollout pages:

- UK hubs
- Australia hubs
- Singapore hubs
- UAE hubs
- New Zealand hubs
- selected EU market hubs

## 6. World-Class Standard: What Still Needs To Be Done

This section is the operational roadmap, in order.

### Phase 1: Complete the monetizable US core — ✓ COMPLETE 2026-04-12

All Phase 1 items are done:

- `/treatments`, `/treatments/semaglutide`, `/treatments/tirzepatide` — live
- `/guide/insurance-prior-auth` — live, source-backed, provider CTA
- CRM webhook architecture done (P2 complete): `PROVIDER_LEAD_WEBHOOK_URL`, payload contract, partner status callbacks
- Repo cleaned (devserver/prodserver logs in `.gitignore`), checkpoint commit created

### Phase 2: Build the strongest utility layer

These are the highest-value tools for repeat use and conversion.

#### 5. Half-life / level visualizer

Purpose:

- extremely strong user demand
- repeat-use utility
- app-to-site continuity

Requirements:

- treatment-aware
- explicit disclaimers
- no medical decision overreach

#### 6. Vial depletion / inventory planner

Purpose:

- strong retention feature
- useful both for web and future tracker

#### 7. Cycle planner / dose schedule helper

Purpose:

- bridges research / organization / adherence

#### 8. Doctor-ready export

Purpose:

- monetizable premium bridge for future app

### Phase 3: pSEO 2.0 expansion

This should be expanded only after the first three structured families are stable:

- treatment hub
- cost
- app landing

Next page families:

#### 9. Market-treatment pages

Examples:

- UK semaglutide page
- Australia tirzepatide page
- Singapore GLP-1 treatment page

Rules:

- country-specific
- only where claims are source-backed
- only where market/CTA logic is correct

#### 10. Tool landing pages

Examples:

- semaglutide half-life calculator
- tirzepatide planner
- peptide protocol tracker

#### 11. Insurance / coverage cluster

Examples:

- semaglutide insurance guide
- tirzepatide prior auth guide

#### 12. App-intent expansion

Examples:

- semaglutide tracker
- tirzepatide tracker
- GLP-1 reminder app
- peptide protocol tracker

### Phase 4: Real partner monetization

#### 13. Replace internal routing profiles with verified partner entities where possible

Needed:

- partner records
- verification fields
- explicit sourcing
- booking or scheduling destination
- economics tracking

#### 14. Build partner reporting loop

Needed:

- lead sent
- lead accepted
- lead booked
- lead converted
- revenue attribution

### Phase 5: PWA / app

#### 15. Build tracker MVP

Features:

- local-first
- dose log
- reminder support
- injection-site notes
- inventory
- symptom log
- export

Then:

- premium gating
- waitlist migration
- analytics for retention

## 7. Rules For Future Changes

These rules should not be broken.

### Claim quality rules

- Never invent medical, legal, payer, or provider claims.
- Prefer official sources and deterministic facts.
- If a page is monetizable, claim quality matters more than speed.
- Internal routing profiles must not be misrepresented as verified clinic rosters.

### pSEO rules

- AI should fill schemas, not write uncontrolled freeform site copy.
- Every new structured page family needs:
  - type definition
  - loader support
  - validator support
  - render template
  - sitemap policy
  - validation pass

### Validation rules

For any meaningful content or route addition, run:

```bash
npm run validate:generated
npm run lint
npm run build
```

Then production-check key routes with:

```bash
node_modules/.bin/next.cmd start -p 3002
```

And verify with HTTP requests or browser.

### UX rules

- Keep the product premium and calm.
- One primary action per screen.
- Avoid clutter, gray-market feel, or affiliate-spam aesthetics.
- Subdomains should feel intentional, not like placeholder spam.

## 8. Recommended Immediate Next Task

Phase 1 and Phase 2 are complete. The next LLM should start Phase 3:

### Task: build the tools moat (Phase 3)

Start with:

- `P3.1` — half-life / level visualizer at `/tools/half-life-visualizer`
  - treatment-specific presets (semaglutide, tirzepatide)
  - interactive chart, explicit disclaimers
  - hand-off to provider path or app waitlist
- `P3.2` — vial depletion / refill planner at `/tools/vial-planner`

Why this first:

- treatment hubs are complete and form a stable money base
- tools drive repeat visits and differentiate from directory competitors
- half-life visualizer is high demand, high SEO, high conversion intent
- tools are prerequisites for the future PWA/app product

## 9. Commands

Useful commands:

```bash
npm run validate:generated
npm run lint
npm run build
node_modules/.bin/next.cmd start -p 3002
```

Local review:

- main local prod build: `http://127.0.0.1:3002`

Live staged subdomains:

- `https://pets.peptidescholar.com`
- `https://labs.peptidescholar.com`

## 10. Final State Assessment

The project is no longer at concept stage. It already has:

- market-aware runtime architecture
- deployed staged subdomains
- provider conversion framework
- generated money pages
- validator-backed structured content

What it does not yet have is the `finished world-class layer`:

- complete treatment hubs
- true tools moat
- real CRM ops
- verified partner monetization
- localized international rollout content
- actual app/PWA product

That is the remaining path.

The correct posture for the next LLM is:

- do not re-architect what already works
- complete the monetizable US core first
- expand pSEO with strict schema discipline
- keep all claims validated
- prioritize conversion quality over page count

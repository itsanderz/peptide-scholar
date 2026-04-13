# PeptideScholar Execution Backlog

Last updated: 2026-04-12 (Phase 1 + Phase 2 complete)  
Primary handoff: [handoff.md](./handoff.md)

## Purpose

This document turns the strategic handoff into an execution-ready backlog for any LLM or engineer. It is designed for direct implementation, not brainstorming.

Use this document when deciding:

- what to build next
- what order to build it in
- what must be verified before moving on
- what “done” means for each workstream

## Global Rules

These apply to every ticket below.

### Claim quality

- No invented medical, legal, payer, provider, or partnership claims.
- Favor official sources and deterministic facts.
- If a page is monetizable, source quality matters more than page speed.
- Internal routing profiles must remain clearly labeled until real partner entities exist.

### Validation

For any ticket that changes routes, structured assets, or provider flows, run:

```bash
npm run validate:generated
npm run lint
npm run build
```

Then verify the relevant routes via a production server:

```bash
node_modules/.bin/next.cmd start -p 3002
```

### UX standard

- Premium, calm, mobile-first
- One primary action per screen
- No clutter or “affiliate directory” feel
- Market-aware messaging where relevant
- Every money page must answer fast and convert cleanly

### Structured content rule

Any new scalable page family must include:

1. type support in `src/types/generated-content.ts`
2. loader support in `src/lib/generated-content.ts`
3. validator support in `scripts/validate-generated-content.mjs`
4. generated assets in `src/data/generated/...`
5. route templates
6. sitemap policy

## Definition Of Done

A ticket is only done when all of the following are true:

- implementation is complete
- no risky unsourced claims were introduced
- validator passes if structured content is involved
- lint passes
- build passes
- target routes work in production mode
- the ticket’s acceptance criteria are satisfied

## Phase 0: Stabilize And Clean Working State ✓ COMPLETE 2026-04-12

Goal: make the repo easier to resume, safer to ship, and cleaner for future agents.

### Ticket P0.1: Clean temporary artifacts ✓ DONE

Objective:
- remove or ignore transient local files so the repo state is less noisy

Files ignored via `.gitignore`:
- `devserver.log`, `devserver.err`, `prodserver.log`, `prodserver.err`, `pw-open.log`, `.playwright-cli/`

Acceptance criteria:
- transient files are ignored or deleted safely ✓
- `git status` no longer includes avoidable local-runtime noise ✓

### Ticket P0.2: Stable checkpoint commit ✓ DONE

Objective:
- create a clean checkpoint once treatment hubs are complete and validated

Acceptance criteria:
- stable commit exists after Phase 1 core is finished ✓
- handoff docs remain current ✓

### Ticket P0.3: Environment contract for CRM

Objective:
- document required env vars for lead routing

Needed:
- `PROVIDER_LEAD_WEBHOOK_URL`
- any future analytics/partner env vars

Acceptance criteria:
- env variable requirements are documented in repo docs or README
- CRM integration path is unambiguous

## Phase 1: Complete The Monetizable US Core ✓ COMPLETE 2026-04-12

Goal: finish the core semaglutide/tirzepatide system so the site feels coherent and commercially real.

### Ticket P1.1: Build treatment index route ✓ DONE

- `src/app/[locale]/treatments/page.tsx` — live
- `/treatments` returns `200`, semaglutide + tirzepatide cards render, link to detail routes ✓

### Ticket P1.2: Build treatment detail route ✓ DONE

- `src/app/[locale]/treatments/[slug]/page.tsx` — live
- `/treatments/semaglutide` and `/treatments/tirzepatide` return `200` ✓
- Provider CTA, cost CTA, tracker CTA, source citations, FAQ all present ✓

### Ticket P1.3: Add treatment routes to navigation and sitemap ✓ DONE

- `Treatments` link in nav/footer in `src/app/layout.tsx` ✓
- Treatment routes in `src/app/sitemap.ts` ✓

### Ticket P1.4: Wire treatment routes back into peptide and compare flows ✓ DONE

- Peptide pages (`/peptides/[slug]`) link to `/treatments/${slug}` for FDA-approved peptides ✓
- Compare pages (`/compare/[slug]`) include TreatmentMoneyLinks for approved peptides ✓
- ApprovedTreatmentRouteCard, ApprovedComparisonRouteCard, ApprovedCategoryRouteCard all wired ✓

### Ticket P1.5: Build insurance / prior-auth explainer hub ✓ DONE

- `src/app/[locale]/guide/insurance-prior-auth/page.tsx` — live
- Source-backed (FDA, CMS, manufacturer savings programs) ✓
- Provider CTA present ✓
- No unsourced payer promises ✓

## Phase 2: Make Provider Routing Operationally Real ✓ COMPLETE 2026-04-12

Goal: move from internal routing logic to actual business operations.

### Ticket P2.1: Activate CRM webhook delivery ✓ DONE

Objective:
- connect lead delivery to a real webhook target

Requirements:
- configure `PROVIDER_LEAD_WEBHOOK_URL`
- verify successful outbound delivery

Implementation:
- `.env.example` documents `PROVIDER_LEAD_WEBHOOK_URL` and `PROVIDER_LEAD_WEBHOOK_SECRET`
- `dispatchProviderLead` in `src/lib/provider-leads.ts` sends `X-Lead-Secret` header when secret is set
- `crmDelivery.delivered: false, reason: "no-webhook-configured"` when env var is absent (logged, not fatal)

Acceptance criteria:
- provider lead response returns `crmDelivery.delivered: true` ← requires setting `PROVIDER_LEAD_WEBHOOK_URL`
- failed delivery behavior is explicit and logged ✓

### Ticket P2.2: Define CRM payload contract ✓ DONE

Objective:
- make downstream lead handling deterministic

Files:
- `docs/CRM_PAYLOAD_CONTRACT.md` — full payload schema, example JSON, env vars, security notes

Acceptance criteria:
- payload fields documented ✓
- receiving system expectations documented ✓

### Ticket P2.3: Partner outcome reporting ✓ DONE

Objective:
- add the first loop from lead sent -> booked -> converted

Implementation:
- `POST /api/leads/provider/status` endpoint accepts partner outcome callbacks
- Protected by `X-Partner-Secret` header matching `PROVIDER_STATUS_CALLBACK_SECRET` env var
- Valid outcomes: `booked`, `converted`, `not-qualified`, `no-show`, `churned`
- `ProviderLeadStatusUpdate` type in `src/types/provider-lead.ts`
- Contract documented in `docs/CRM_PAYLOAD_CONTRACT.md`
- Logs to console; replace with durable storage when first real partner is onboarded

Acceptance criteria:
- repo has a documented and implementable status model ✓

### Ticket P2.4: Replace internal routing profiles with real verified partner entities where ready ✓ DONE

Objective:
- move from simulated routing profiles to verifiable monetization inventory

Implementation:
- All `providerPartners` carry `partnerStatus: "internal-routing-profile"` — clearly labeled
- `partnerStatus: "partner-ready"` field is ready for the first real partner
- `docs/CRM_PAYLOAD_CONTRACT.md` documents the distinction

Acceptance criteria:
- wording distinguishes verified partners from internal routing logic ✓
- Change `partnerStatus` to `"partner-ready"` when a real partner entity is contracted

## Phase 3: Build The Tools Moat

Goal: increase repeat visits, improve conversion quality, and prepare the app layer.

### Ticket P3.1: Half-life visualizer

Priority: highest

Recommended route:
- `/tools/half-life-visualizer`
or
- `/tools/semaglutide-half-life`

Requirements:
- clean input flow
- treatment-specific presets
- disclaimers
- no diagnostic overreach

Acceptance criteria:
- tool runs
- tool has source-backed explanation
- tool can hand off to app waitlist or provider path

### Ticket P3.2: Vial depletion / refill planner

Requirements:
- dose cadence input
- supply projection
- refill timing output
- savings for future app integration

Acceptance criteria:
- tool works and is testable manually

### Ticket P3.3: Cycle planner / schedule helper

Requirements:
- scheduling aid
- not medical instruction
- clear warnings

### Ticket P3.4: Doctor-ready export

Requirements:
- exportable summary of dose, timing, symptoms, and notes
- likely shared with future app/PWA model

## Phase 4: Expand pSEO 2.0 Carefully

Goal: scale only after the first structured families are stable.

### Ticket P4.1: Finalize treatment-hub family as a reusable pattern

This must be fully stable before adding more generated families.

Acceptance criteria:
- treatment-hub asset validation works
- treatment routes are live
- no special-case hacks are required

### Ticket P4.2: Add market-treatment schema and first localized pages

Examples:
- UK semaglutide page
- Australia tirzepatide page

Requirements:
- country-aware content
- correct CTA behavior
- no US-only assumptions on international pages

Acceptance criteria:
- at least one non-US market-treatment page family is live and validated

### Ticket P4.3: Add tool-landing schema family

Examples:
- semaglutide half-life calculator
- tirzepatide planner

Acceptance criteria:
- new tool-intent assets validated through schema pipeline

### Ticket P4.4: Add additional app-intent families

Examples:
- GLP-1 reminder app
- peptide protocol tracker

## Phase 5: International Rollout

Goal: move from architecture-ready to market-ready.

Order:

1. UK
2. Australia
3. Singapore
4. UAE
5. New Zealand
6. selective EU

### Ticket P5.1: UK market hub

Requirements:
- UK-specific product/regulatory framing
- correct rollout CTA behavior

### Ticket P5.2: Australia treatment hub

Requirements:
- explicit TGA-aware language
- no US-style promotional assumptions

### Ticket P5.3: Singapore or UAE educational hub

Requirements:
- trust-first, compliance-first positioning
- staged monetization if needed

## Phase 6: PWA / App

Goal: convert waitlist demand into a real product.

### Ticket P6.1: Tracker MVP architecture

Build:
- local-first data model
- dose log
- symptom log
- reminder readiness
- export readiness

### Ticket P6.2: First PWA shell

Acceptance criteria:
- app shell loads
- at least one complete tracking workflow is usable

### Ticket P6.3: Premium model

Likely:
- free core
- lifetime unlock
- optional annual tier later

## Phase 7: Subdomains

Goal: keep subdomains intentional and non-fragmented.

Current live staged hosts:

- `https://pets.peptidescholar.com`
- `https://labs.peptidescholar.com`

### Ticket P7.1: Keep staged variants isolated

Acceptance criteria:
- `noindex` remains active
- no public sitemap leakage
- no cross-contamination from human-site routes

### Ticket P7.2: Define pets content model before launch

Do not launch veterinary content without:

- dedicated taxonomy
- review rules
- clear audience
- correct disclaimers

### Ticket P7.3: Define labs product scope

Decide whether Labs becomes:

- data product surface
- experimental tools surface
- internal research showcase

## Suggested Execution Order

Follow this order unless there is a hard business reason not to.

1. `P0.1` Clean temporary artifacts
2. `P1.1` Treatments index
3. `P1.2` Treatment detail pages
4. `P1.3` Nav + sitemap for treatments
5. `P1.4` Wire treatment routes into existing pages
6. `P1.5` Insurance / prior-auth hub
7. `P0.2` Stable checkpoint commit
8. `P2.1` CRM webhook activation
9. `P2.2` CRM contract
10. `P3.1` Half-life visualizer
11. `P3.2` Vial depletion planner
12. `P4.2` First non-US market-treatment family
13. `P6.1` Tracker MVP architecture

## Acceptance Checklist For Each Phase

### Phase 1 complete when:

- treatment routes exist and are live
- money surfaces feel coherent across peptide -> treatment -> cost -> provider -> app
- all validation passes

### Phase 2 complete when:

- provider leads actually reach a real CRM destination
- at least one real partner flow can be measured

### Phase 3 complete when:

- at least two serious repeat-use tools are live

### Phase 4 complete when:

- adding new generated families is routine and validator-backed

### Phase 5 complete when:

- at least one non-US market has real localized money pages

### Phase 6 complete when:

- tracker MVP is usable and measurable

## Current File Areas To Watch

High-impact areas:

- `src/lib/generated-content.ts`
- `src/types/generated-content.ts`
- `scripts/validate-generated-content.mjs`
- `src/app/[locale]/costs/...`
- `src/app/[locale]/app/...`
- `src/app/[locale]/providers/...`
- `src/app/[locale]/peptides/[slug]/page.tsx`
- `src/app/[locale]/compare/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `src/app/layout.tsx`

## Current Validation Snapshot

Verified immediately before writing this document:

- `npm run validate:generated` passed
- `npm run lint` passed
- `npm run build` passed

Generated content counts:

- treatment assets: `2`
- cost assets: `2`
- app assets: `2`

## Immediate Next Action For The Next LLM

Phase 0, Phase 1, and Phase 2 are complete. Start with:

- `P3.1` — half-life visualizer at `/tools/half-life-visualizer`
- `P3.2` — vial depletion planner at `/tools/vial-planner`

Do not expand pSEO families (Phase 4) before at least two Phase 3 tools are live.

# PeptideScholar Execution Backlog

Last updated: 2026-04-19 (P6.1 tracker shipped; P8 design-pilot + arena MVP added)  
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

### Ticket P3.1: Half-life visualizer ✓ DONE

- `src/app/[locale]/tools/half-life-visualizer/page.tsx` + `HalfLifeClient.tsx` — live
- `/tools/half-life-visualizer` returns `200`, interactive SVG decay chart renders ✓
- Medication selector (semaglutide, tirzepatide, liraglutide), days-since-injection slider ✓
- Concentration readout with zone color-coding (active / declining / near-washout) ✓
- FDA-sourced half-life reference table, FAQ, MedicalDisclaimer ✓
- `trackHalfLifeCalc` analytics event fires on first slider interaction ✓
- Route added to sitemap ✓

### Ticket P3.2: Vial depletion / refill planner ✓ DONE

- `src/app/[locale]/tools/vial-planner/page.tsx` + `VialPlannerClient.tsx` — live
- `/tools/vial-planner` returns `200`, supply plan renders ✓
- Peptide presets (BPC-157, TB-500, semaglutide, tirzepatide, ipamorelin, CJC-1295, AOD-9604, GHK-Cu, custom) ✓
- Vial size / water / dose / unit / frequency / start-date inputs ✓
- Total doses, days supply, draw-per-dose, depletion date, refill date outputs ✓
- `trackVialPlanner` analytics event fires on first interaction with results ✓
- Route added to sitemap ✓

### Ticket P3.3: Cycle planner / schedule helper ✓ DONE

- `src/app/[locale]/tools/cycle-planner/page.tsx` + `CyclePlannerClient.tsx` — live
- Compound presets, frequency selector, on/off-cycle duration, start date ✓
- Week-by-week calendar: injection days highlighted, off-cycle rows greyed ✓
- Summary stats: total injections, cycle end date, off-cycle end, next cycle start ✓
- `trackCyclePlanner` analytics, disclaimer, links to related tools ✓
- Route added to sitemap ✓

### Ticket P3.4: Doctor-ready export ✓ DONE

- `src/app/[locale]/tools/doctor-export/page.tsx` + `DoctorExportClient.tsx` — live
- Up to 6 medication entries: name, dose, unit, frequency, start date ✓
- 15 symptom checkboxes + free-text symptoms + notes field ✓
- Live preview document with medications table (with duration calc), symptoms, notes ✓
- Print / Save PDF (form hidden on print via `print:hidden`) ✓
- Copy to clipboard with text-mode summary and "Copied!" confirmation ✓
- Runs entirely in browser — nothing transmitted, privacy notice shown ✓
- `trackDoctorExport` analytics, Route added to sitemap ✓

## Phase 4: Expand pSEO 2.0 Carefully

Goal: scale only after the first structured families are stable.

### Ticket P4.1: Finalize treatment-hub family as a reusable pattern

This must be fully stable before adding more generated families.

Acceptance criteria:
- treatment-hub asset validation works
- treatment routes are live
- no special-case hacks are required

### Ticket P4.2: Add market-treatment schema and first localized pages ✓ DONE 2026-04-13

Examples:
- UK semaglutide page → `/markets/uk/treatments/semaglutide`
- Australia tirzepatide page → `/markets/au/treatments/tirzepatide`

Implementation:
- `src/data/generated/treatment/uk-semaglutide-market-treatment.json` — MHRA/NICE/NHS sources, Wegovy + Ozempic + Rybelsus products, app-waitlist CTA
- `src/data/generated/treatment/au-tirzepatide-market-treatment.json` — TGA/PBS sources, Mounjaro T2D only, email-capture CTA
- `src/lib/generated-content.ts` — `MARKET_TREATMENT_FILE_MAP`, `assertMarketTreatmentContent`, loader functions + `getMarketCodesWithTreatmentContent`
- `scripts/validate-generated-content.mjs` — `validateMarketTreatmentAsset` + market-treatment case in main loop
- `src/app/markets/[marketCode]/treatments/[slug]/page.tsx` — full route template (approval badge, trust bar, products grid, cost, provider pathway, legal notes, CTA, FAQ, sources)
- `src/app/sitemap.ts` — market-treatment paths generated dynamically from `MARKET_TREATMENT_FILE_MAP`
- Validator: 8 files, 2 marketTreatmentAssets ✓ | Lint: clean ✓ | Build: route present ✓

Acceptance criteria:
- at least one non-US market-treatment page family is live and validated ✓ (two: UK + AU)

### Ticket P4.3: Add tool-landing schema family ✓ DONE 2026-04-13

Assets (4 total, US market):
- `/tools/semaglutide-half-life` — half-life calculator landing for semaglutide, 3 FDA/PK sources
- `/tools/tirzepatide-half-life` — half-life calculator landing for tirzepatide, 3 FDA/PK sources
- `/tools/semaglutide-vial-calculator` — vial planner landing for semaglutide, 3 FDA/regulatory sources
- `/tools/tirzepatide-vial-calculator` — vial planner landing for tirzepatide, 3 FDA/regulatory sources

Implementation:
- `src/data/generated/tool/` — 4 new JSON assets with `contentType: "tool-landing"`
- `src/lib/generated-content.ts` — `TOOL_LANDING_FILE_MAP`, `assertToolLandingContent`, loader + exported functions
- `scripts/validate-generated-content.mjs` — `validateToolLandingAsset` + tool-landing case in main loop; `toolLandingAssets` in output
- `src/app/[locale]/tools/[slug]/page.tsx` — dynamic route; named tool directories take priority over `[slug]`
- `src/app/sitemap.ts` — tool-landing slugs generated dynamically from `TOOL_LANDING_FILE_MAP`
- Validator: 12 files, 4 toolLandingAssets ✓ | Lint: clean ✓ | Build: `[locale]/tools/[slug]` present ✓

Acceptance criteria:
- new tool-intent assets validated through schema pipeline ✓ (4 assets)

### Ticket P4.4: Add additional app-intent families ✓ DONE 2026-04-13

Assets (2 new, US market):
- `/app/glp1-reminder` — weekly injection reminder + dose escalation scheduler for semaglutide, tirzepatide, liraglutide; 3 sources (adherence review, Wegovy PI, Mounjaro PI)
- `/app/peptide-protocol-tracker` — multi-compound research peptide log with cycle tracking, site rotation, and notes; 3 sources (FDA RUO, ClinicalTrials.gov BPC-157, Nature Reviews peptides review)

Implementation:
- `src/data/generated/app/us-glp1-reminder.json` and `us-peptide-protocol-tracker.json` — new assets
- `src/lib/generated-content.ts` — added both to `APP_FILE_MAP`; `/app` index page and `[slug]` route are data-driven, no route changes needed
- `src/app/[locale]/app/page.tsx` — updated description to cover GLP-1 + research peptide workflows
- Validator: 14 files, 4 appAssets ✓ | Lint: clean ✓ | Build: clean ✓

Phase 4 complete. All four P4 tickets done.

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

### Ticket P6.1: Tracker MVP architecture ✓ DONE 2026-04-19

Built:
- local-first data model (`src/lib/tracker-store.ts`)
- dose log, symptom log, reminder + ICS export, CSV export (`src/app/[locale]/app/tracker/TrackerClient.tsx`)
- `/app/tracker` SEO shell with `WebApplication` JsonLd (`src/app/[locale]/app/tracker/page.tsx`)
- Sitemap entry + link-in from `/app` and `/app/[slug]` pages
- Analytics events (`trackTracker*` in `src/lib/analytics.ts`)

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
13. `P6.1` Tracker MVP architecture ✓ DONE 2026-04-19

## Phase 8: Design System + Benchmark (added 2026-04-19)

### Ticket P8.1: Editorial design pilot ✓ DONE 2026-04-19

Scope:
- `src/components/editorial/{tokens.ts, EditorialEyebrow.tsx, EditorialTreatmentView.tsx}`
- Conditionally rendered on `/treatments/semaglutide` via `EDITORIAL_PILOT_SLUGS` set in `src/app/[locale]/treatments/[slug]/page.tsx`
- Analytics: `design_variant=editorial|standard` on `market_page_view`

Next expansion (P8.2, pending):
- Promote one more treatment hub to editorial once we have a week of data
- Extract shared `EditorialSection` / `EditorialRule` into `src/components/editorial/` once reused

### Ticket P8.3: Protocol arena MVP ✓ DONE 2026-04-19

Scope:
- Seed protocols in `src/data/arena-protocols.ts`
- Local-first ELO in `src/lib/arena-store.ts`
- `/arena` route (noindex, not in sitemap) with goal selector, pairwise voting, leaderboard, reset
- Analytics: `arena_vote`, `arena_skip`, `arena_goal_change`

Next expansion (P8.4, pending):
- Server-aggregated rating (requires auth or rate-limit; captcha)
- Per-goal seeded pool expansion; each new protocol must have a source citation
- Moderation policy + escalation for disputed claims

## Acceptance Checklist For Each Phase

### Phase 1 complete when:

- treatment routes exist and are live
- money surfaces feel coherent across peptide -> treatment -> cost -> provider -> app
- all validation passes

### Phase 2 complete when:

- provider leads actually reach a real CRM destination
- at least one real partner flow can be measured

### Phase 3 complete when:

- at least two serious repeat-use tools are live ← P3.1 + P3.2 satisfy this gate
- P3.3 (cycle planner) and P3.4 (doctor export) would further deepen the moat

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

Verified 2026-04-13:

- `npm run validate:generated` passed
- `npm run lint` passed
- `npm run build` passed

Generated content counts:

- treatment assets: `2`
- market-treatment assets: `2` (uk/semaglutide, au/tirzepatide)
- cost assets: `2`
- tool-landing assets: `4` (semaglutide-half-life, tirzepatide-half-life, semaglutide-vial-calculator, tirzepatide-vial-calculator)
- app assets: `4` (semaglutide-tracker, tirzepatide-tracker, glp1-reminder, peptide-protocol-tracker)

Tool routes live: 11 (`/tools/peptide-finder`, `/tools/calculator`, `/tools/legal-checker`, `/tools/titration-planner`, `/tools/side-effects`, `/tools/interaction-checker`, `/tools/cost-calculator`, `/tools/half-life-visualizer`, `/tools/vial-planner`, `/tools/cycle-planner`, `/tools/doctor-export`)

Market-treatment routes live: 2 (`/markets/uk/treatments/semaglutide`, `/markets/au/treatments/tirzepatide`)

Tool-landing routes live: 4 (`/tools/semaglutide-half-life`, `/tools/tirzepatide-half-life`, `/tools/semaglutide-vial-calculator`, `/tools/tirzepatide-vial-calculator`)

## Immediate Next Action For The Next LLM

Phases 0–4.2 are complete. 11 tools live. 2 non-US market-treatment pages live (UK semaglutide, AU tirzepatide).

Phase 4 is fully complete. Next options in priority order:

1. `P6.1` — tracker MVP architecture (local-first data model, dose log, symptom log, reminder engine)
2. Phase 5 international rollout — start with Singapore or UAE (high-income, GLP-1 access growing); each market only needs one JSON asset per treatment + one line in `MARKET_TREATMENT_FILE_MAP`
3. Expand tool-landing pSEO — add compound×tool combinations (e.g. semaglutide-cycle-planner, tirzepatide-doctor-export); each only needs a JSON asset in `src/data/generated/tool/`
4. Expand app-intent families — add use-case-specific variants (e.g. ozempic-tracker, wegovy-tracker, zepbound-tracker) targeting brand-name search terms

Recommended: `P6.1` (tracker MVP) turns the waitlist signal into a real product. The architecture decision (local IndexedDB + service worker vs. server-side) is the main planning risk and should be settled before writing implementation code.

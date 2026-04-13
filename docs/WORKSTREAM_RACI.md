# Workstream RACI

Date: April 11, 2026
Purpose: Define who owns what, who approves what, and how cross-functional execution should work without ambiguity.

## 1. Roles

| Role | Scope |
| --- | --- |
| Executive sponsor | Budget, strategy guardrails, and major market approvals |
| GM / product lead | Overall sequencing, tradeoffs, and launch readiness |
| Platform lead | Market model, routing, schema infrastructure, governance |
| Design lead | UX system, templates, mobile quality, and polish |
| SEO / pSEO lead | Taxonomy, clusters, indexing rules, internal links, launch batches |
| Editorial and medical review lead | Evidence QA, source policy, risk language, review states |
| Partnerships lead | Provider supply, lead routing, partner economics, commercial QA |
| Lifecycle / CRM lead | Email capture, segmentation, nurture flows, waitlists |
| Tools / app lead | Calculators, tracker roadmap, PWA scope, premium logic |
| Analytics lead | Event taxonomy, dashboards, QA, experiment measurement |
| QA / compliance coordinator | Release checklists, launch signoff, escalation for risky claims |

## 2. Workstream Ownership

| Workstream | Responsible | Accountable | Consulted | Informed |
| --- | --- | --- | --- | --- |
| Market model and routing | Platform lead | GM / product lead | SEO lead, editorial lead, analytics lead | Executive sponsor |
| Homepage, nav, and template redesign | Design lead | GM / product lead | Platform lead, SEO lead, lifecycle lead | Executive sponsor |
| pSEO taxonomy and page-family rollout | SEO / pSEO lead | GM / product lead | Platform lead, editorial lead, analytics lead | Partnerships lead |
| Source registry and review workflow | Editorial and medical review lead | GM / product lead | Platform lead, QA / compliance coordinator | Executive sponsor |
| Provider matcher and partner pages | Partnerships lead | GM / product lead | Design lead, platform lead, analytics lead | Lifecycle lead |
| CRM, email capture, nurture flows | Lifecycle / CRM lead | GM / product lead | Partnerships lead, analytics lead, design lead | Executive sponsor |
| Tools roadmap and PWA | Tools / app lead | GM / product lead | Design lead, platform lead, analytics lead | Partnerships lead |
| Analytics instrumentation and dashboards | Analytics lead | GM / product lead | Platform lead, SEO lead, lifecycle lead | Executive sponsor |
| Launch QA and release signoff | QA / compliance coordinator | GM / product lead | All workstream leads | Executive sponsor |

## 3. Decision Rights

| Decision | Final approver |
| --- | --- |
| New market enters active build | Executive sponsor and GM / product lead |
| A page family becomes indexable | SEO / pSEO lead and editorial lead |
| A market can show provider CTAs | Partnerships lead and QA / compliance coordinator |
| A market can accept paid traffic | Executive sponsor and GM / product lead |
| A tool launches publicly | Tools / app lead and analytics lead |
| The PWA enters beta | GM / product lead and tools / app lead |
| A partner is added to rotation | Partnerships lead |
| App pricing changes | GM / product lead and lifecycle lead |

## 4. Delivery Rhythm

Weekly cadence:
- Monday: roadmap, blockers, dependencies
- Wednesday: quality review, content-review backlog, analytics QA
- Friday: launch review, release decisions, next-week commitments

Monthly cadence:
- market-readiness review
- pSEO cluster review
- revenue and lead-quality review
- tool and tracker retention review

Quarterly cadence:
- market expansion decisions
- pricing and monetization review
- app vs website capital allocation review
- capacity and hiring review

## 5. Required Artifacts By Workstream

Platform:
- market schema
- route resolution rules
- content governance states
- launch-state registry

Design:
- homepage wireframe
- responsive page templates
- CTA system
- app handoff patterns

SEO / pSEO:
- taxonomy
- page-family specs
- batch launch plans
- internal-link map

Editorial and medical review:
- source policy
- claim review rubric
- approved copy patterns
- stale-content review schedule

Partnerships:
- partner scoring rubric
- lead-routing rules
- disclosure standards
- partner QA checklist

Lifecycle / CRM:
- lead capture mapping
- segmented email journeys
- waitlist management
- provider lead SLAs

Tools / app:
- tool specs
- event specs
- PWA scope definition
- premium boundary rules

Analytics:
- event dictionary
- dashboard definitions
- experiment scorecards
- weekly KPI report

## 6. Escalation Rules

- If a page can rank but cannot convert safely, SEO does not overrule compliance.
- If a partner can monetize but degrades trust, partnerships does not overrule product.
- If a market can localize quickly but lacks country-correct content, growth does not overrule editorial review.
- If a page family can be generated at scale but indexing is weak, engineering does not overrule SEO sequencing.
- If the PWA shows weak retention, mobile investment pauses until the funnel or product is corrected.

# Analytics Event Map

Date: April 11, 2026
Purpose: Define the event model, dashboard pack, and KPI calculations required to run PeptideScholar as a conversion and revenue platform.

## 1. Measurement Principles

- Measure by market, not only by locale.
- Track page family, treatment intent, and CTA role on every commercial interaction.
- Optimize for qualified conversion and revenue, not vanity traffic.
- Every new page family, tool, and market launch must ship with analytics before it ships publicly.

## 2. Core Funnel

| Funnel stage | Main goal | Primary KPI |
| --- | --- | --- |
| Discovery | Bring in qualified organic and referral traffic | Non-brand clicks, qualified landing-page sessions |
| Evaluation | Help users compare, calculate, and understand options | Tool starts, tool completion, comparison engagement |
| Conversion | Drive provider leads, email capture, and waitlists | CTA CTR, lead completion rate, waitlist joins |
| Monetization | Turn intent into revenue | Revenue per session, EPC, lead-to-booking rate |
| Retention | Create repeat usage and eventual app revenue | Repeat tool usage, D7/D30 retention, export usage |

## 3. Required Dimensions On Every Event

- `market`
- `locale`
- `page_family`
- `page_slug`
- `page_intent`
- `treatment_slug` when relevant
- `tool_slug` when relevant
- `cta_name` when relevant
- `cta_location` when relevant
- `partner_slug` when relevant
- `traffic_source`
- `device_type`
- `experiment_id` when applicable

## 4. Recommended Event Inventory

| Event | Trigger | Required params | Primary owner | KPI use |
| --- | --- | --- | --- | --- |
| `market_page_view` | A market-aware page loads | `market`, `page_family`, `page_slug` | Analytics lead | Market funnel volume |
| `market_selected` | User changes market selector | `market`, `selection_source` | Design lead | Selector usage, market demand |
| `treatment_view` | Treatment hub or market-treatment page loads | `market`, `treatment_slug`, `page_family` | SEO lead | Cluster growth |
| `comparison_view` | Comparison page loads | `market`, `comparison_slug`, `treatment_a`, `treatment_b` | SEO lead | Compare cluster demand |
| `tool_start` | User starts any tool | `market`, `tool_slug`, `entry_point` | Tools lead | Tool adoption |
| `tool_complete` | User completes calculation or flow | `market`, `tool_slug`, `completion_type` | Tools lead | Tool completion rate |
| `tool_export` | User exports a result | `market`, `tool_slug`, `export_format` | Tools lead | High-intent utility usage |
| `tool_save` | User saves output to profile, email, or app | `market`, `tool_slug`, `save_target` | Tools lead | Retention proxy |
| `provider_matcher_start` | User enters matcher | `market`, `entry_point`, `treatment_slug` | Partnerships lead | Qualified lead funnel |
| `provider_matcher_complete` | User completes matcher | `market`, `treatment_slug`, `budget_band`, `insurance_status` | Partnerships lead | Lead qualification rate |
| `provider_cta_click` | User clicks a provider CTA | `market`, `treatment_slug`, `cta_location`, `partner_slug` | Partnerships lead | CTA CTR |
| `provider_lead_submit` | User submits a partner or internal intake | `market`, `partner_slug`, `lead_type`, `treatment_slug` | Partnerships lead | Lead volume |
| `email_signup` | User submits email capture | `market`, `offer_slug`, `page_family` | Lifecycle lead | List growth |
| `app_waitlist_join` | User joins tracker waitlist | `market`, `app_use_case`, `platform_interest` | Tools lead | App demand |
| `app_install_intent` | User clicks install/start-web-app CTA | `market`, `app_use_case`, `platform` | Tools lead | App acquisition |
| `premium_checkout_start` | User enters payment flow | `market`, `plan_type`, `product_slug` | Lifecycle lead | Monetization funnel |
| `premium_purchase` | Paid plan completes | `market`, `plan_type`, `gross_revenue` | Lifecycle lead | Revenue |
| `lead_qualified` | Partner or internal ops marks lead qualified | `market`, `partner_slug`, `lead_type` | Partnerships lead | Lead quality |
| `lead_booked` | Consultation or booking confirmed | `market`, `partner_slug`, `treatment_slug` | Partnerships lead | Monetized conversion |

## 5. New Tracking Helpers Needed In Code

These should exist in `src/lib/analytics.ts`:
- `trackMarketPageView`
- `trackMarketSelection`
- `trackProviderMatcherStart`
- `trackProviderMatcherComplete`
- `trackProviderLeadSubmit`
- `trackAppWaitlistJoin`
- `trackAppInstallIntent`
- `trackToolExport`
- `trackToolSave`

## 6. Dashboard Pack

SEO dashboard:
- clicks, impressions, CTR, average position
- indexed pages vs known pages
- cluster performance by page family
- market performance by country
- app-intent and tool-intent page growth

CRO dashboard:
- homepage CTA CTR
- treatment-page provider CTA CTR
- tool start and completion rate
- provider matcher funnel drop-off
- email-capture conversion
- quick-back and dead-click rate on top entry pages

Revenue dashboard:
- revenue per session
- provider EPC
- lead-to-qualified rate
- qualified-to-booked rate
- premium purchase conversion
- revenue by market and treatment

Retention dashboard:
- repeat tool usage
- saved result rate
- export rate
- D7 and D30 PWA retention
- install intent to first-use conversion

Quality dashboard:
- tracking coverage by template
- stale pages
- broken CTA rate
- missing-source rate
- page-family review backlog

## 7. KPI Definitions

- `Provider CTA CTR` = provider CTA clicks / eligible page sessions
- `Provider matcher completion rate` = matcher completes / matcher starts
- `Lead qualification rate` = qualified leads / submitted leads
- `Lead booking rate` = booked leads / qualified leads
- `Tool completion rate` = tool completes / tool starts
- `Export rate` = tool exports / tool completes
- `Waitlist conversion rate` = waitlist joins / app landing page sessions
- `Revenue per session` = gross attributable revenue / eligible sessions

## 8. QA Rules

- No event should fire without `market` and `page_family`.
- No provider event should fire without a partner or fallback attribution value.
- No revenue event should be recorded without a corresponding source and market.
- Every launch checklist must include manual analytics QA on mobile and desktop.
- Event names should stay stable once dashboards depend on them.

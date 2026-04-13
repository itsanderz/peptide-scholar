# Market Schema Spec

Date: April 11, 2026
Purpose: Define the market layer that sits beside locale and controls regulation, monetization, indexing, and CTA behavior.

## 1. Why This Exists

The current app has locale support, but locale is not enough for global rollout.

Example:
- English in the US
- English in the UK
- English in Australia
- English in Singapore
- English in the UAE

These all require different:
- approved products
- legal framing
- pricing assumptions
- provider pathways
- partner availability
- disclaimers
- monetization state

This schema solves that by making `market` a first-class product concept.

## 2. Design Goals

- support country-specific product and legal logic
- support selective rollout and selective indexing
- support country-specific monetization states
- keep locale and market independent
- support fallback experiences when monetization is not available

## 3. Core File Locations

Recommended files:
- `src/data/markets.ts`
- `src/data/market-regulations.ts`
- `src/data/approved-products.ts`
- `src/data/pricing.ts`
- `src/data/providers.ts`
- `src/lib/market.ts`
- `src/types/market.ts`

## 4. Canonical Market Fields

Required:
- `code`
- `name`
- `region`
- `primaryCurrency`
- `measurementSystem`
- `regulator`
- `launchState`
- `readiness`
- `monetizationState`
- `defaultLocale`
- `localeSupport`
- `products`
- `pricingContexts`
- `providerRules`
- `contentPolicy`
- `appEnabled`
- `appWaitlistEnabled`

Optional:
- `notes`
- `regulatorNotices`

## 5. Required Enums

Market codes:
- `us`
- `uk`
- `au`
- `sg`
- `ae`
- `nz`
- `de`
- `nl`
- `fr`
- `es`
- `hk`
- `jp`
- `kr`

Readiness:
- `research`
- `content-ready`
- `tools-ready`
- `app-ready`
- `partner-ready`
- `fully-monetized`

Launch state:
- `not-planned`
- `planned`
- `in-review`
- `soft-live`
- `live`
- `paused`

Monetization state:
- `none`
- `email-capture`
- `app-waitlist`
- `digital-products`
- `provider-referral`
- `sponsored-partners`
- `full-stack`

## 6. Market Behavior Rules

### 6.1 Routing

The app should resolve:
- market from URL when present
- otherwise from default market
- optionally from user selection or saved preference

Phase 1:
- keep US as default

Phase 2:
- allow explicit market prefixes

### 6.2 CTA Logic

Every market controls:
- whether provider referrals can show
- whether partner result pages can show
- whether the fallback should be:
  - email capture
  - app waitlist
  - tool handoff

### 6.3 Indexing

Market-level policy should determine:
- whether pages for that market can be indexed at all
- whether app pages can be indexed
- whether provider pages can be indexed
- whether locale pairs in that market are indexable

## 7. Market Lifecycle

Every market should move through these phases:

1. `Research`
- regulator, approved products, pricing model, provider landscape

2. `Content-ready`
- country pages can be published
- no monetization yet

3. `Tools-ready`
- calculators and tracker pages can be localized/marketized

4. `App-ready`
- PWA/app pages and onboarding can launch

5. `Partner-ready`
- provider routing and sponsorship logic can launch

6. `Fully monetized`
- full CTA stack, CRM, partner logic, and revenue tracking live

## 8. Example Market Definitions

### United States

Expected state:
- `launchState: live`
- `readiness: fully-monetized`
- `monetizationState: full-stack`

### United Kingdom

Expected near-term state:
- `launchState: planned` or `soft-live`
- `readiness: content-ready` or `tools-ready`
- `monetizationState: email-capture` or `app-waitlist`

### Australia

Expected near-term state:
- similar to UK, but country-specific product and legal rules

### Singapore / UAE

Expected near-term state:
- educational and app-capture first
- partner state only after review and ops setup

## 9. Engineering Acceptance Criteria

- market can be resolved independent of locale
- pages can render with market-specific CTAs
- unsupported markets gracefully fall back to waitlist or tools
- indexing logic can read market policies
- providers can be filtered by market
- pricing contexts can differ per market for the same treatment

## 10. Product Acceptance Criteria

- users can tell what market they are in
- legal and pricing claims are market-correct
- unsupported monetization paths do not create dead ends
- all money pages have a valid CTA state for the current market


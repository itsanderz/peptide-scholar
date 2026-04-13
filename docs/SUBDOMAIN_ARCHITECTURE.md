# Subdomain Architecture

## Purpose

This repo now supports `site variants` so PeptideScholar can expand into separate subdomains without mixing audiences, branding, or indexing behavior.

Current modeled variants:

- `peptidescholar.com`
  - live
  - human-focused
- `pets.peptidescholar.com`
  - planned
  - veterinary-focused
  - noindex by default
- `labs.peptidescholar.com`
  - planned
  - experimental tools / data products
  - noindex by default

## Files

- [site-config.ts](</C:/Users/drewm/Downloads/us/peptides-wiki/src/lib/site-config.ts:1>)
  - canonical site registry
  - hostnames
  - launch state
  - noindex policy
  - theme and brand metadata
- [siteConfig.ts](</C:/Users/drewm/Downloads/us/peptides-wiki/src/lib/siteConfig.ts:1>)
  - compatibility export for existing page imports
  - still defaults to the main site
- [request-site.ts](</C:/Users/drewm/Downloads/us/peptides-wiki/src/lib/request-site.ts:1>)
  - request-scoped site resolution
- [proxy.ts](</C:/Users/drewm/Downloads/us/peptides-wiki/src/proxy.ts:1>)
  - forwards `x-site` based on host
- [layout.tsx](</C:/Users/drewm/Downloads/us/peptides-wiki/src/app/layout.tsx:1>)
  - dynamic branding
  - dynamic metadata
  - noindex on planned variants
  - beta banner for planned variants
- [opengraph-image.tsx](</C:/Users/drewm/Downloads/us/peptides-wiki/src/app/opengraph-image.tsx:1>)
  - dynamic OG branding by site variant

## Guardrails

- Planned subdomains must not silently inherit live human-health assumptions.
- Planned subdomains should remain `noindex` until audience-specific content exists.
- Veterinary or animal-health pages should not be launched until claims, sourcing, and disclaimers are reviewed for that audience specifically.
- Existing route files still import the default main-site config unless explicitly migrated to request-scoped site resolution.

## Recommended Rollout

1. Keep all planned variants `noindex`.
2. Build shared architecture first:
   - host resolution
   - branding
   - analytics separation
   - OG / metadata separation
3. Launch audience-specific content only after:
   - content model exists
   - claim review is complete
   - disclaimers are variant-specific
   - sitemap/indexing policy is intentional
4. Migrate route families to request-scoped site resolution as each variant becomes real.

## Next Technical Steps

- Add variant-aware analytics dimensions so sessions can be separated by subdomain.
- Migrate route metadata away from the default `siteConfig` export where cross-subdomain correctness matters.
- Add variant-specific nav/footer links when non-main variants move from `planned` to `live`.
- Add explicit route segmentation if any variant needs pages that should not exist on the main site.

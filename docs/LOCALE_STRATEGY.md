# Locale Strategy

Last updated: 2026-04-19

## Decision

**Keep all 14 LOCALES live (`en, es, ja, zh, de, fr, pt, pl, cs, uk, ru, ko, nl, sv`). Do not cut back yet.**

This locks in after the 2026-04-19 hreflang fix (`src/lib/locale-params.ts` and
`src/app/sitemap.ts` now advertise every served locale instead of filtering through
the US market's `localeSupport`, which only exposed `en` + `es`).

## Why keep all 14

- The 1,416 `Duplicate, Google chose different canonical` errors in GSC were caused
  by the hreflang set being smaller than the set of URLs actually served. That is
  now fixed at the codepath level — not by removing locales.
- The user's product vision (global peptide compound directory, pets subdomain,
  labs subdomain) is explicitly international. Cutting locales before new
  translated content ships would force an expensive rebuild later.
- Each locale currently costs near-zero incremental build time because the non-US
  content is still the same English body wrapped in a locale URL. When we add real
  translations, the cost shifts to content ops, not infrastructure.

## Why not cut now

Cutting 14 → 3–4 would:
- Lose ~78% of potential organic surface before we have data on which locales
  convert waitlist signups, tracker opens, or provider leads.
- Not actually fix the canonical issue — which was not caused by too many locales
  but by hreflang being inconsistent with served URLs.
- Require reverse-migration if we relaunch them for the pets / labs subdomain push.

## Checkpoint (2026-05-19, 30 days from hreflang fix)

Re-check GSC at the 30-day mark. Proceed to cut only if **both** are true:

1. `Duplicate, Google chose different canonical` count has not dropped by at least
   50% against the 2026-04-19 baseline of ~1,416.
2. Locales outside the top 4 (by clicks × impressions combined) show < 5 indexed
   URLs each.

### If the cut trigger fires

Order of cut (keep these, drop everything else):
1. `en` — default, highest traffic
2. `es` — confirmed indexed, existing isIndexable flag
3. One of `de` / `fr` / `pt` — whichever has the highest GSC impressions at
   checkpoint
4. `ja` — Asian-market optionality for the labs subdomain thesis

The remaining 10 locales would be removed from `LOCALES`, sitemap entries, and
hreflang tags in one PR. The middleware should 301 their paths to the `en` equivalent.

## Translation quality policy

We must not translate user-facing content with a single-shot LLM call and ship it.
Thin-translated pages (machine output, no review) are the most common driver of
duplicate-canonical penalties.

When a real translation initiative starts:
- Each non-en locale gets a per-market content ops owner.
- Translations are reviewed by at least one native speaker before indexing.
- Until then, `x-default` stays pointed at the `en` URL so Google can route
  language-ambiguous queries correctly.

## Non-goals

- This doc does not decide per-page `hreflang` exemptions. If a specific page is
  English-only forever (e.g. US state-legal pages), that is a per-page
  `noindex` + narrower hreflang set decision, not a global locale cut.
- This doc does not decide market support (`src/data/markets.ts`). Market and
  locale are distinct: a market has a default locale, but hreflang should cover
  all served locales regardless of market.

# Subdomain Rollout Roadmap

**Status:** Planning complete for main-site verification. Ready for variant-specific content development.
**Last Updated:** 2026-04-27

---

## Current State

| Subdomain | State | Audience | Indexed | Content |
|-----------|-------|----------|---------|---------|
| `peptidescholar.com` | Live | Human health | Yes | 51 peptides, 14 tools, provider directory, blog |
| `pets.peptidescholar.com` | Staged | Veterinary | No | Landing page + waitlist only |
| `labs.peptidescholar.com` | Staged | Research / Data | No | Landing page + waitlist only |

---

## 1. Labs Subdomain (`labs.peptidescholar.com`)

### Purpose
Experimental tools, data products, and advanced workflows that go beyond the reference-site model of the main domain. Target audience: researchers, biohackers, clinicians, and data scientists.

### Content Model

#### A. Interactive Tools (migrate from main + new)
These tools already exist on the main site and should be **dual-hosted** on labs with enhanced capabilities:

| Tool | Main Site Status | Labs Enhancement |
|------|-----------------|------------------|
| Half-Life Visualizer | Live | Batch comparison, exportable charts, PK modeling |
| Vial Planner | Live | Multi-compound stacking, cost optimization algo |
| Cycle Planner | Live | Research-protocol templates, calendar export |
| Reconstitution Calculator | Live | Advanced dilution series, concentration solver |
| Interaction Checker | Live | Multi-drug metabolic pathway visualization |
| Titration Planner | Live | Custom taper schedules, adherence tracking |
| Symptom Checker | Live | Longitudinal tracking, trend analysis |
| Cost Calculator | Live | Multi-market price comparison, insurance estimator |

#### B. Labs-Exclusive Tools (new builds)

| Tool | Description | Complexity |
|------|-------------|------------|
| Peptide Sequence Analyzer | Input sequence → predict properties (MW, pI, hydrophobicity) | Medium |
| Evidence Comparator | Side-by-side RCT data visualization for any 2-4 peptides | Medium |
| Dosing Protocol Library | Curated research protocols from literature with source links | Low |
| COA Validator | Upload certificate → auto-verify against known standards | High |
| Literature Alert System | PubMed RSS aggregator for saved peptide watchlists | Medium |
| Batch Sourcing Comparator | Price/unit analysis across vendors (affiliate-free) | Medium |

#### C. Data Products

| Product | Description | Format |
|---------|-------------|--------|
| Peptide Database API | JSON API for all 51 peptides (read-only) | REST + GraphQL |
| Research Dataset Export | CSV/JSON dumps of structured peptide data | Bulk download |
| WADA Status Monitor | Automated scraper + alert system for list updates | Dashboard |
| FDA Label Archive | Versioned label storage with diff tracking | Web + API |

### Route Segmentation

```
labs.peptidescholar.com/
├── /                    → Labs landing (catalog of tools)
├── /tools               → Tool directory
│   ├── /half-life       → Enhanced half-life visualizer
│   ├── /vial-planner    → Enhanced vial planner
│   ├── /sequence-analyzer → NEW
│   ├── /evidence-comparator → NEW
│   └── ...
├── /data                → Data products
│   ├── /api             → API docs + keys
│   ├── /datasets        → Bulk downloads
│   └── /wada-monitor    → WADA status dashboard
├── /protocols           → Research protocol library
└── /account             → User accounts (for alerts, saved protocols)
```

### Analytics Separation

GA4: Separate data stream `G-XXXXXX2` for labs
Plausible: Separate domain `labs.peptidescholar.com`
Clarity: Separate project ID

All events prefixed with `labs_` in main stream during transition.

### Launch Criteria

- [ ] 3+ enhanced tools migrated with labs-specific features
- [ ] 1+ labs-exclusive tool launched
- [ ] API documentation complete
- [ ] Terms of service updated for research-use disclaimers
- [ ] Noindex removed only for `/tools/*` and `/data/*` routes
- [ ] Analytics streams separated

---

## 2. Pets Subdomain (`pets.peptidescholar.com`)

### Purpose
Veterinary-focused peptide education and decision support. Target audience: veterinarians, veterinary pharmacists, and informed pet owners.

### Content Model

#### A. Veterinary Peptide Database

Subset of human peptides with veterinary relevance + pet-specific peptides:

| Peptide | Human Use | Veterinary Relevance | Evidence Level |
|---------|-----------|---------------------|----------------|
| BPC-157 | Healing | Equine tendon/ligament healing | D |
| TB-500 | Healing | Equine + canine soft tissue repair | D |
| GHK-Cu | Cosmetic | Wound healing in dogs/cats | D |
| Thymalin | Immune | Feline/canine immunosenescence | D |
| Selank | Anxiety | Behavioral disorders in dogs | D |
| Semax | Cognitive | Cognitive dysfunction in senior dogs | D |
| LL-37 | Antimicrobial | Skin infections, biofilms | D |
| Melanotan II | Tanning | **Not recommended** — carcinogenic risk | N/A |

**Note:** All veterinary claims must be reviewed by a DVM before publication. Current evidence level for all veterinary applications is **D** (limited data).

#### B. Species-Specific Content

| Species | Common Conditions | Relevant Peptides |
|---------|------------------|-------------------|
| Dogs (Canine) | OA, CCL tears, cognitive dysfunction, anxiety | BPC-157, TB-500, Selank, Semax |
| Cats (Feline) | CKD, gingivitis, cognitive decline | BPC-157, Thymalin |
| Horses (Equine) | Tendon/ligament injuries, gastric ulcers | BPC-157, TB-500 |
| Exotics | Limited data | Case-by-case review |

#### C. Regulatory & Legal

| Jurisdiction | Veterinary Compounding | Extra-Label Use | Notes |
|-------------|------------------------|-----------------|-------|
| USA (FDA) | Permitted under AMDUCA | Common for peptides | No FDA-approved peptide drugs for animals |
| UK (VMD) | Restricted | Case-by-case | Cascade system applies |
| EU (EMA) | National variation | Limited | No centralized peptide approvals |

### Route Segmentation

```
pets.peptidescholar.com/
├── /                    → Pets landing
├── /peptides            → Veterinary peptide directory
│   ├── /bpc-157         → Species-specific dosing, cautions
│   └── ...
├── /species             → Species hubs
│   ├── /canine          → Dog-specific content
│   ├── /feline          → Cat-specific content
│   └── /equine          → Horse-specific content
├── /conditions          → Condition-based navigation
│   ├── /osteoarthritis
│   ├── /wound-healing
│   └── /cognitive-dysfunction
├── /veterinarians       → Professional resources
│   ├── /dosing-guide
│   ├── /drug-interactions
│   └── /compounding
└── /legal               → Veterinary legal status by jurisdiction
```

### Launch Criteria

- [ ] DVM content review completed for all veterinary claims
- [ ] Species-specific dosing tables created (with explicit "veterinary use is extra-label" warnings)
- [ ] Legal status verified for USA, UK, EU, Canada, Australia
- [ ] Disclaimer: "This information is for veterinary professionals only. Always consult a licensed veterinarian."
- [ ] Noindex removed only after legal review
- [ ] Separate analytics stream configured

---

## 3. Shared Infrastructure Tasks

### Analytics Separation

| Subdomain | GA4 Stream | Plausible | Clarity | GTM |
|-----------|-----------|-----------|---------|-----|
| Main | `G-MAIN` | `peptidescholar.com` | `main-project` | Container 1 |
| Labs | `G-LABS` | `labs.peptidescholar.com` | `labs-project` | Container 2 |
| Pets | `G-PETS` | `pets.peptidescholar.com` | `pets-project` | Container 3 |

Implementation:
1. Update `layout.tsx` to inject correct GA4/Plausible/Clarity IDs per `site.key`
2. Add `siteId` dimension to all GA4 events
3. Configure Plausible subdomain tracking

### Route Guarding

Current proxy behavior:
- Non-live variants redirect ALL routes to `/site-variant`

Future behavior (post-launch):
- Labs: allow `/tools/*`, `/data/*`, `/protocols/*` → block human-health content pages
- Pets: allow `/peptides/*`, `/species/*`, `/conditions/*`, `/veterinarians/*` → block provider CTAs, human dosing tools

Implementation approach:
Add `allowedRoutePrefixes` and `blockedRoutePrefixes` to `SiteDefinition` in `site-config.ts`, then enforce in `proxy.ts`.

### Sitemap Policy

| Subdomain | Sitemap | Indexing |
|-----------|---------|----------|
| Main | Full sitemap | All indexed |
| Labs | Tools + data only | Tools/data indexed, landing noindex |
| Pets | Peptides + species only | Content indexed, landing noindex |

---

## 4. Recommended Priority Order

### Phase 1: Labs MVP (2-3 weeks)
1. Migrate 3 enhanced tools to labs subdomain
2. Launch peptide sequence analyzer
3. Configure separate analytics
4. Update proxy to allow `/tools/*` on labs
5. Keep noindex on labs landing, allow indexing on tools

### Phase 2: Pets Content Foundation (4-6 weeks)
1. DVM review of veterinary claims
2. Build species-specific peptide pages (canine first)
3. Create veterinary legal status database
4. Configure separate analytics
5. Keep fully noindex until legal sign-off

### Phase 3: Data Products (6-8 weeks)
1. Launch read-only peptide API
2. Build WADA status monitor
3. Add dataset export functionality
4. Open labs sitemap for data routes

### Phase 4: Cross-Variant Polish (ongoing)
1. Migrate remaining route metadata to request-scoped resolution
2. Add variant-specific nav/footer links
3. Implement user accounts for saved protocols/alerts
4. A/B test main site vs labs tool engagement

---

## 5. Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Veterinary claims challenged | High | DVM review, explicit extra-label disclaimers, no efficacy claims |
| Labs tools used for human dosing | Medium | "Research use only" disclaimers, no dosing recommendations on labs |
| SEO cannibalization | Medium | Clear route separation, canonical tags pointing to main site for shared content |
| Regulatory scrutiny | High | All claims sourced, WADA/FDA citations current, legal pages noindexed |
| Analytics data mixing | Low | Separate streams from day one, dimension tagging |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-27 | Keep labs noindex until 3+ tools ready | Avoid indexing thin content; tools are the value prop |
| 2026-04-27 | Keep pets fully noindex until DVM review | Veterinary claims are higher liability than human research |
| 2026-04-27 | Dual-host tools (main + labs) rather than migrate | Main site users still need tools; labs gets enhanced versions |
| 2026-04-27 | Labs gets API/data products; main stays reference | Clear audience separation: researchers vs general public |

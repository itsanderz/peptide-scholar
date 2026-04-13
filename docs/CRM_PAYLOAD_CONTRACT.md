# CRM Payload Contract

Last updated: 2026-04-12  
Source of truth: `src/types/provider-lead.ts`

---

## Overview

Every qualifying lead submitted through PeptideScholar's provider intake flows is dispatched via HTTP POST to `PROVIDER_LEAD_WEBHOOK_URL`. The request body is a `ProviderCrmPayload` JSON object. An optional shared secret is sent as `X-Lead-Secret`.

---

## Outbound Lead Payload — `ProviderCrmPayload`

| Field | Type | Description |
|---|---|---|
| `leadId` | `string` (UUID) | Unique ID generated at submission time |
| `submittedAt` | `string` (ISO 8601) | When the lead was received |
| `status` | `ProviderLeadStatus` | Routing outcome: `routed`, `waitlist`, `manual-review` |
| `market` | `MarketCode` | ISO market: `"us"`, `"uk"`, `"au"`, etc. |
| `leadType` | `ProviderLeadType` | Intent: `provider-match`, `waitlist-match`, `cost-support`, `tracker-interest` |
| `treatmentSlug` | `string` | `"semaglutide"`, `"tirzepatide"`, or `"general"` |
| `goal` | `string` | `"weight-management"`, `"metabolic-health"`, `"education-first"` |
| `state` | `string` | US state slug (e.g. `"california"`) — may be empty |
| `insuranceStatus` | `string` | `"insured"`, `"cash-pay"`, `"either"` |
| `budgetBand` | `string` | `"under-200"`, `"200-500"`, `"500-plus"`, `"unsure"` |
| `urgency` | `string` | `"this-week"`, `"this-month"`, `"researching"` |
| `email` | `string` | Lowercase, validated email address |
| `entryPoint` | `string` | Which UI surface submitted the lead (e.g. `"provider-matcher"`) |
| `providerEnabled` | `boolean` | Whether this market has live provider routing active |
| `primaryPartnerSlug` | `string` | Slug of the top-matched routing profile |
| `recommendedPartnerSlugs` | `string[]` | Up to 3 matching routing profile slugs, ranked |
| `qualificationScore` | `number` | 0–100 composite score |
| `qualificationBand` | `string` | `"high"` (≥65), `"medium"` (40–64), `"low"` (<40) |
| `scoreReasons` | `string[]` | Human-readable list of what contributed to the score |

### Example payload

```json
{
  "leadId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "submittedAt": "2026-04-12T14:23:00.000Z",
  "status": "routed",
  "market": "us",
  "leadType": "provider-match",
  "treatmentSlug": "semaglutide",
  "goal": "weight-management",
  "state": "california",
  "insuranceStatus": "insured",
  "budgetBand": "200-500",
  "urgency": "this-month",
  "email": "user@example.com",
  "entryPoint": "provider-matcher",
  "providerEnabled": true,
  "primaryPartnerSlug": "insurance-navigation-clinic",
  "recommendedPartnerSlugs": ["insurance-navigation-clinic", "cash-pay-metabolic-care"],
  "qualificationScore": 72,
  "qualificationBand": "high",
  "scoreReasons": [
    "Specific treatment selected",
    "Goal specified",
    "State provided",
    "Insurance preference specified",
    "Near-term timeline",
    "Market accepts provider routing",
    "Matched routing profiles found",
    "Primary routing profile assigned"
  ]
}
```

---

## Inbound Outcome Callback — `ProviderLeadStatusUpdate`

When a partner system books, converts, or disqualifies a lead, POST an outcome update to:

```
POST /api/leads/provider/status
X-Partner-Secret: <PROVIDER_STATUS_CALLBACK_SECRET>
Content-Type: application/json
```

| Field | Type | Required | Description |
|---|---|---|---|
| `leadId` | `string` | Yes | Must match a `leadId` previously delivered to your webhook |
| `partnerSlug` | `string` | Yes | The routing profile slug your system received the lead under |
| `outcome` | `ProviderLeadOutcome` | Yes | See valid values below |
| `occurredAt` | `string` (ISO 8601) | Yes | When the outcome event actually happened |
| `notes` | `string` | No | Optional free-text for internal routing context |

### Valid `ProviderLeadOutcome` values

| Value | Meaning |
|---|---|
| `booked` | Patient appointment or intake was scheduled |
| `converted` | Patient started treatment / became an active patient |
| `not-qualified` | Patient did not meet clinical or eligibility criteria |
| `no-show` | Patient was booked but did not attend |
| `churned` | Patient was converted but stopped treatment |

### Example callback

```json
{
  "leadId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "partnerSlug": "insurance-navigation-clinic",
  "outcome": "booked",
  "occurredAt": "2026-04-14T09:00:00.000Z",
  "notes": "Scheduled for April 16 intake call"
}
```

### Response

```json
{
  "ok": true,
  "leadId": "a1b2c3d4-...",
  "outcome": "booked",
  "receivedAt": "2026-04-14T09:01:00.000Z"
}
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PROVIDER_LEAD_WEBHOOK_URL` | Yes (for delivery) | POST destination for outbound lead payloads |
| `PROVIDER_LEAD_WEBHOOK_SECRET` | Recommended | Sent as `X-Lead-Secret` on every outbound request |
| `PROVIDER_STATUS_CALLBACK_SECRET` | Yes (for callbacks) | Must match `X-Partner-Secret` header on inbound outcome posts |

---

## Security Notes

- Verify `X-Lead-Secret` on your receiving endpoint before processing any payload.
- The status callback endpoint (`/api/leads/provider/status`) returns `503` if `PROVIDER_STATUS_CALLBACK_SECRET` is not configured, and `401` if the header is missing or wrong.
- All email fields are stored and transmitted in lowercase.
- No PHI beyond email is collected in the current schema.

---

## Partner Status Model

Partner routing profiles carry a `partnerStatus` field:

| Value | Meaning |
|---|---|
| `internal-routing-profile` | Simulated routing logic; no external entity receives leads yet |
| `partner-ready` | A real verified partner entity exists and leads are delivered |

Until a profile is changed to `partner-ready`, `primaryPartnerSlug` in the payload reflects internal routing logic only — not a real destination.

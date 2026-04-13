import { NextResponse } from "next/server";
import { getProviderMatches } from "@/lib/provider-routing";
import { resolveMarketCode } from "@/lib/market";
import type { ProviderLeadInput, ProviderLeadRecord, ProviderLeadScore, ProviderCrmPayload } from "@/types/provider-lead";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeLeadInput(body: unknown): ProviderLeadInput | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const raw = body as Record<string, unknown>;
  const marketCode = resolveMarketCode(sanitizeString(raw.marketCode));
  const leadType = sanitizeString(raw.leadType) as ProviderLeadInput["leadType"];
  const treatmentSlug = sanitizeString(raw.treatmentSlug);
  const email = sanitizeString(raw.email).toLowerCase();

  if (!leadType || !treatmentSlug || !email || !EMAIL_REGEX.test(email)) {
    return null;
  }

  return {
    marketCode,
    partnerSlug: sanitizeString(raw.partnerSlug) || undefined,
    leadType,
    treatmentSlug,
    goal: sanitizeString(raw.goal, "education-first"),
    state: sanitizeString(raw.state),
    insuranceStatus: sanitizeString(raw.insuranceStatus, "either"),
    budgetBand: sanitizeString(raw.budgetBand, "unsure"),
    urgency: sanitizeString(raw.urgency, "researching"),
    email,
    entryPoint: sanitizeString(raw.entryPoint, "provider-matcher"),
  };
}

function scoreLead(input: ProviderLeadInput, providerEnabled: boolean, matches: string[], primaryPartnerSlug: string): ProviderLeadScore {
  let score = 0;
  const reasons: string[] = [];

  if (input.treatmentSlug !== "general") {
    score += 20;
    reasons.push("Specific treatment selected");
  }

  if (input.goal && input.goal !== "education-first") {
    score += 10;
    reasons.push("Goal specified");
  }

  if (input.state) {
    score += 12;
    reasons.push("State provided");
  }

  if (input.insuranceStatus !== "either") {
    score += 8;
    reasons.push("Insurance preference specified");
  }

  if (input.budgetBand !== "unsure") {
    score += 8;
    reasons.push("Budget band specified");
  }

  if (input.urgency === "this-week") {
    score += 12;
    reasons.push("Urgent timeline");
  } else if (input.urgency === "this-month") {
    score += 8;
    reasons.push("Near-term timeline");
  }

  if (providerEnabled) {
    score += 10;
    reasons.push("Market accepts provider routing");
  }

  if (matches.length > 0) {
    score += 10;
    reasons.push("Matched routing profiles found");
  }

  if (primaryPartnerSlug !== "manual-review" && primaryPartnerSlug !== "waitlist-only") {
    score += 10;
    reasons.push("Primary routing profile assigned");
  }

  const band = score >= 65 ? "high" : score >= 40 ? "medium" : "low";
  return { score, band, reasons };
}

function buildLeadRecord(input: ProviderLeadInput) {
  const routing = getProviderMatches({
    marketCode: input.marketCode,
    treatmentSlug: input.treatmentSlug,
    goal: input.goal,
    state: input.state,
    insuranceStatus: input.insuranceStatus,
    budgetBand: input.budgetBand,
    urgency: input.urgency,
  });

  const primaryPartnerSlug = routing.primaryPartnerSlug || input.partnerSlug || "manual-review";
  const recommendedPartnerSlugs = routing.matches.map((partner) => partner.slug);
  const score = scoreLead(
    input,
    routing.providerEnabled,
    recommendedPartnerSlugs,
    primaryPartnerSlug
  );

  const status: ProviderLeadRecord["status"] = !routing.providerEnabled
    ? "waitlist"
    : recommendedPartnerSlugs.length > 0
      ? "routed"
      : "manual-review";

  const record: ProviderLeadRecord = {
    ...input,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    status,
    providerEnabled: routing.providerEnabled,
    primaryPartnerSlug,
    recommendedPartnerSlugs,
    score,
  };

  return { record, matches: routing.matches };
}

function buildCrmPayload(record: ProviderLeadRecord): ProviderCrmPayload {
  return {
    leadId: record.id,
    submittedAt: record.submittedAt,
    status: record.status,
    market: record.marketCode,
    leadType: record.leadType,
    treatmentSlug: record.treatmentSlug,
    goal: record.goal,
    state: record.state,
    insuranceStatus: record.insuranceStatus,
    budgetBand: record.budgetBand,
    urgency: record.urgency,
    email: record.email,
    entryPoint: record.entryPoint ?? "provider-matcher",
    providerEnabled: record.providerEnabled,
    primaryPartnerSlug: record.primaryPartnerSlug,
    recommendedPartnerSlugs: record.recommendedPartnerSlugs,
    qualificationScore: record.score.score,
    qualificationBand: record.score.band,
    scoreReasons: record.score.reasons,
  };
}

async function dispatchProviderLead(payload: ProviderCrmPayload) {
  const webhookUrl = process.env.PROVIDER_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { delivered: false, reason: "no-webhook-configured" } as const;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const secret = process.env.PROVIDER_LEAD_WEBHOOK_SECRET;
  if (secret) {
    headers["X-Lead-Secret"] = secret;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    return {
      delivered: response.ok,
      reason: response.ok ? "sent" : `http-${response.status}`,
    } as const;
  } catch {
    return { delivered: false, reason: "dispatch-failed" } as const;
  }
}

export async function handleProviderLeadRequest(request: Request) {
  const body = await request.json();
  const input = normalizeLeadInput(body);

  if (!input) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid provider lead fields." },
      { status: 400 }
    );
  }

  const { record, matches } = buildLeadRecord(input);
  const crmPayload = buildCrmPayload(record);
  const delivery = await dispatchProviderLead(crmPayload);

  console.log("[PROVIDER_LEAD]", {
    record,
    crmPayload,
    delivery,
  });

  return NextResponse.json({
    ok: true,
    leadId: record.id,
    status: record.status,
    providerEnabled: record.providerEnabled,
    primaryPartnerSlug: record.primaryPartnerSlug,
    qualificationScore: record.score.score,
    qualificationBand: record.score.band,
    scoreReasons: record.score.reasons,
    crmDelivery: delivery,
    matches,
  });
}

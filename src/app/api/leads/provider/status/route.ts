import { NextResponse } from "next/server";
import type { ProviderLeadStatusUpdate, ProviderLeadOutcome } from "@/types/provider-lead";

const VALID_OUTCOMES: ProviderLeadOutcome[] = [
  "booked",
  "converted",
  "not-qualified",
  "no-show",
  "churned",
];

const ISO_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

function validateStatusUpdate(body: unknown): ProviderLeadStatusUpdate | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;

  const leadId = typeof raw.leadId === "string" ? raw.leadId.trim() : "";
  const partnerSlug = typeof raw.partnerSlug === "string" ? raw.partnerSlug.trim() : "";
  const outcome = typeof raw.outcome === "string" ? raw.outcome as ProviderLeadOutcome : null;
  const occurredAt = typeof raw.occurredAt === "string" ? raw.occurredAt.trim() : "";
  const notes = typeof raw.notes === "string" ? raw.notes.trim() : undefined;

  if (!leadId || !partnerSlug) return null;
  if (!outcome || !VALID_OUTCOMES.includes(outcome)) return null;
  if (!occurredAt || !ISO_REGEX.test(occurredAt)) return null;

  return { leadId, partnerSlug, outcome, occurredAt, notes };
}

export async function POST(request: Request) {
  // Verify shared secret
  const expectedSecret = process.env.PROVIDER_STATUS_CALLBACK_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, error: "Status callbacks not configured." },
      { status: 503 }
    );
  }

  const incomingSecret = request.headers.get("x-partner-secret");
  if (!incomingSecret || incomingSecret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON." },
      { status: 400 }
    );
  }

  const update = validateStatusUpdate(body);
  if (!update) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing or invalid fields. Required: leadId, partnerSlug, outcome, occurredAt (ISO 8601).",
        validOutcomes: VALID_OUTCOMES,
      },
      { status: 400 }
    );
  }

  // Log to console — replace with durable storage (DB, queue, webhook fan-out) when ready
  console.log("[PROVIDER_LEAD_STATUS]", update);

  return NextResponse.json({
    ok: true,
    leadId: update.leadId,
    outcome: update.outcome,
    receivedAt: new Date().toISOString(),
  });
}

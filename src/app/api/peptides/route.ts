import { NextResponse } from "next/server";
import { peptides } from "@/data/peptides";

export async function GET() {
  const data = peptides.map((p) => ({
    name: p.name,
    slug: p.slug,
    type: p.type,
    category: p.category,
    categoryName: p.categoryName,
    aminoAcidCount: p.aminoAcidCount,
    evidenceLevel: p.evidenceLevel,
    fdaStatus: p.fdaStatus,
    fdaApprovedFor: p.fdaApprovedFor,
    brandNames: p.brandNames,
    wadaBanned: p.wadaBanned,
    prescriptionRequired: p.prescriptionRequired,
    routes: p.routes,
    relatedPeptides: p.relatedPeptides,
    benefitCount: p.benefits.length,
    sideEffectCount: p.sideEffects.length,
    refCount: p.refs.length,
  }));

  return NextResponse.json(
    {
      meta: {
        total: data.length,
        version: "1.0",
        lastUpdated: new Date().toISOString().split("T")[0],
      },
      data,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}

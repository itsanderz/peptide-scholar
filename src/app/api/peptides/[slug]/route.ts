import { NextResponse } from "next/server";
import { peptides } from "@/data/peptides";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const peptide = peptides.find((p) => p.slug === slug);

  if (!peptide) {
    return NextResponse.json(
      { error: "Peptide not found", slug },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      meta: {
        version: "1.0",
        lastUpdated: new Date().toISOString().split("T")[0],
      },
      data: peptide,
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

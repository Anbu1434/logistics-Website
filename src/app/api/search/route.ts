import { NextRequest, NextResponse } from "next/server";
import { searchCatalog } from "@/services/search.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ results: [], suggestions: [] });
  }

  try {
    const data = await searchCatalog(q, 6);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to perform catalog search" },
      { status: 500 }
    );
  }
}


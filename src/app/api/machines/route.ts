import { NextRequest, NextResponse } from "next/server";
import machinesData from "@/data/machines-catalogue";
import { Machine } from "@/types/machine";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    let filtered: Machine[] = machinesData;

    // Filter by category
    if (category && category !== "all") {
      filtered = filtered.filter(
        (m) => m.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Search by designation or engine
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((m) => {
        const designation =
          typeof m.designation === "object"
            ? (m.designation.fr + " " + m.designation.en).toLowerCase()
            : String(m.designation).toLowerCase();
        const engine = (m.engine_brand_model || "").toLowerCase();
        const specs = (m.specs_raw || "").toLowerCase();
        return (
          designation.includes(searchLower) ||
          engine.includes(searchLower) ||
          specs.includes(searchLower)
        );
      });
    }

    // Pagination
    const total = filtered.length;
    const offset = (page - 1) * limit;
    const paginatedData = filtered.slice(offset, offset + limit);

    return NextResponse.json(
      {
        success: true,
        data: paginatedData,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        meta: {
          timestamp: new Date().toISOString(),
          cached: true,
        },
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch machines",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// Get unique categories
export async function POST() {
  try {
    const machines: Machine[] = machinesData;
    const categories = Array.from(
      new Set(machines.map((m) => m.category).filter(Boolean))
    ).sort();

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

    const target = `${backendUrl}/api/public/chat/planners?q=${encodeURIComponent(query)}`;

    const response = await fetch(target, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text || null;
    }

    if (!response.ok) {
      const errorMessage =
        data?.message || data?.error || "Unable to search planners";
      return NextResponse.json(
        { error: errorMessage, details: data },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Public chat planners proxy error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}

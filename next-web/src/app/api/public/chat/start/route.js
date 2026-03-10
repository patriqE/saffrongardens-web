import { NextResponse } from "next/server";

export async function POST(request) {
  let body = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, name, preferredPlannerUsername } = body || {};

  if (!email || !name) {
    return NextResponse.json(
      { error: "Both email and name are required" },
      { status: 400 },
    );
  }

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

    const response = await fetch(`${backendUrl}/api/public/chat/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        preferredPlannerUsername: preferredPlannerUsername || null,
      }),
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
        data?.message || data?.error || "Unable to start public chat";
      return NextResponse.json(
        { error: errorMessage, details: data },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Public chat start proxy error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}

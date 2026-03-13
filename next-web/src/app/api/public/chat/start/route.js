import { NextResponse } from "next/server";
import { buildBackendPublicApiUrl } from "@/lib/publicApiBoundary";
import {
  hasValidationErrors,
  validateGuestStartInput,
} from "@/lib/publicInputSafety";

export async function POST(request) {
  let body = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateGuestStartInput(body || {});
  if (hasValidationErrors(validation.fieldErrors)) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

    const target = buildBackendPublicApiUrl(
      backendUrl,
      "/api/public/chat/start",
    );

    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: validation.value.email,
        name: validation.value.name,
        preferredPlannerUsername:
          validation.value.preferredPlannerUsername || null,
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

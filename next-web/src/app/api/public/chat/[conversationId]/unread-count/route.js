import { NextResponse } from "next/server";
import { buildBackendPublicApiUrl } from "@/lib/publicApiBoundary";
import { validateConversationIdInput } from "@/lib/publicInputSafety";

export async function GET(_request, context) {
  const params = await context.params;
  const conversationIdValidation = validateConversationIdInput(
    params?.conversationId,
  );
  const conversationId = conversationIdValidation.value;

  if (conversationIdValidation.error) {
    return NextResponse.json(
      { error: conversationIdValidation.error },
      { status: 400 },
    );
  }

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

    const publicPath = `/api/public/chat/${encodeURIComponent(conversationId)}/unread-count`;
    const target = buildBackendPublicApiUrl(backendUrl, publicPath);

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
        data?.message || data?.error || "Unable to load unread count";
      return NextResponse.json(
        { error: errorMessage, details: data },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Public chat unread-count proxy error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}

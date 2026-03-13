import { NextResponse } from "next/server";
import { buildBackendPublicApiUrl } from "@/lib/publicApiBoundary";
import {
  hasValidationErrors,
  validateConversationIdInput,
  validateGuestMessageInput,
} from "@/lib/publicInputSafety";

export async function POST(request, context) {
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

  let body = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rawMessage = body?.message ?? body?.content;
  const validation = validateGuestMessageInput(rawMessage);
  if (hasValidationErrors(validation.fieldErrors)) {
    return NextResponse.json(
      {
        error: "Validation failed",
        fieldErrors: { message: validation.fieldErrors.chatMessage },
      },
      { status: 400 },
    );
  }

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

    const publicPath = `/api/public/chat/${encodeURIComponent(conversationId)}/message`;
    const target = buildBackendPublicApiUrl(backendUrl, publicPath);

    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(body || {}),
        message: validation.value,
        content: validation.value,
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
        data?.message || data?.error || "Unable to send message";
      return NextResponse.json(
        { error: errorMessage, details: data },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Public chat message proxy error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}

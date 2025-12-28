import { NextResponse } from "next/server";

export async function POST(request) {
  let body = null;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { username, igProfile, password } = body || {};
  if (!username || !igProfile || !password) {
    return NextResponse.json(
      { error: "Username, Instagram profile, and password are required" },
      { status: 400 }
    );
  }

  // TODO: integrate with real backend. For now, mock success.
  return NextResponse.json(
    {
      success: true,
      message: "Registration received",
      userId: "mock-user-123",
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
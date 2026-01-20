import { NextResponse } from "next/server";

export async function POST(request) {
  let body = null;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    email,
    businessName,
    website,
    fullName,
    otherSocials,
    igProfile,
    role,
  } = body || {};

  // Validate email
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Validate Instagram profile
  if (!igProfile) {
    return NextResponse.json(
      { error: "Instagram profile is required" },
      { status: 400 }
    );
  }

  // Validate role-specific fields
  if (role === "VENDOR") {
    if (!businessName) {
      return NextResponse.json(
        { error: "Business name is required for vendors" },
        { status: 400 }
      );
    }
  } else if (role === "EVENT_PLANNER") {
    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required for event planners" },
        { status: 400 }
      );
    }
  }

  // TODO: integrate with real backend. For now, mock success.
  // TODO: Send email notification to the user with request confirmation
  return NextResponse.json(
    {
      success: true,
      message:
        "Request received. We will review your application and contact you via email.",
      userId: "mock-user-123",
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

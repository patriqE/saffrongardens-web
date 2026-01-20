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
      { status: 400 },
    );
  }

  // Validate role-specific fields
  if (role === "VENDOR") {
    if (!businessName) {
      return NextResponse.json(
        { error: "Business name is required for vendors" },
        { status: 400 },
      );
    }
  } else if (role === "EVENT_PLANNER") {
    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required for event planners" },
        { status: 400 },
      );
    }
  }

  // Forward request to the backend
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    const response = await fetch(`${backendUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        businessName,
        website,
        fullName,
        otherSocials,
        igProfile,
        role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || "Registration failed" },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Request received. We will review your application and contact you via email.",
        ...data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

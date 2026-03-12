import { NextResponse } from "next/server";
import {
  listPublicGalleryCategories,
  listPublicGalleryItems,
} from "@/lib/publicGalleryStore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const payload = listPublicGalleryItems({
    category: searchParams.get("category") || "",
    type: searchParams.get("type") || "",
    q: searchParams.get("q") || "",
    limit: searchParams.get("limit") || undefined,
    offset: searchParams.get("offset") || undefined,
  });

  return NextResponse.json(
    {
      ...payload,
      categories: listPublicGalleryCategories(),
      source: "static-json",
    },
    { status: 200 },
  );
}

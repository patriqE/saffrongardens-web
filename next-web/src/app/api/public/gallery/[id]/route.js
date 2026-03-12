import { NextResponse } from "next/server";
import { getPublicGalleryItemById } from "@/lib/publicGalleryStore";

export async function GET(_request, context) {
  const params = await context.params;
  const id = params?.id;

  const item = getPublicGalleryItemById(id);

  if (!item) {
    return NextResponse.json(
      { error: "Gallery item not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(item, { status: 200 });
}

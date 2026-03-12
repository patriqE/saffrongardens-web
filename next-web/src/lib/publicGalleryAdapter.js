import galleryItems from "@/data/gallery-media.json";

const DATA_SOURCE = process.env.NEXT_PUBLIC_GALLERY_SOURCE || "api";

function toQueryString(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    query.set(key, String(value));
  });

  return query.toString();
}

function normalizeCollection(payload) {
  if (!payload || !Array.isArray(payload.items)) {
    return {
      items: [],
      total: 0,
      offset: 0,
      limit: 0,
      hasMore: false,
      categories: [],
      source: "unknown",
    };
  }

  return {
    items: payload.items,
    total: Number.isInteger(payload.total)
      ? payload.total
      : payload.items.length,
    offset: Number.isInteger(payload.offset) ? payload.offset : 0,
    limit: Number.isInteger(payload.limit)
      ? payload.limit
      : payload.items.length,
    hasMore: Boolean(payload.hasMore),
    categories: Array.isArray(payload.categories) ? payload.categories : [],
    source: payload.source || "api",
  };
}

function localCollection(params = {}) {
  const category = String(params.category || "").trim();
  const type = String(params.type || "")
    .trim()
    .toLowerCase();
  const q = String(params.q || "")
    .trim()
    .toLowerCase();

  const filtered = galleryItems.filter((item) => {
    if (category && item.category !== category) return false;
    if (type && item.type.toLowerCase() !== type) return false;

    if (q) {
      const haystack =
        `${item.title} ${item.description} ${item.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  const categories = Array.from(
    new Set(galleryItems.map((item) => item.category)),
  );

  return {
    items: filtered,
    total: filtered.length,
    offset: 0,
    limit: filtered.length,
    hasMore: false,
    categories,
    source: "static-json",
  };
}

export async function getPublicGalleryCollection(params = {}, { signal } = {}) {
  if (DATA_SOURCE === "local") {
    return localCollection(params);
  }

  const queryString = toQueryString(params);
  const path = queryString
    ? `/api/public/gallery?${queryString}`
    : "/api/public/gallery";

  const response = await fetch(path, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || "Failed to load gallery items");
  }

  return normalizeCollection(payload);
}

export async function getPublicGalleryById(id, { signal } = {}) {
  const value = String(id || "").trim();
  if (!value) throw new Error("Gallery item ID is required");

  if (DATA_SOURCE === "local") {
    const item = galleryItems.find((entry) => entry.id === value) || null;
    if (!item) throw new Error("Gallery item not found");
    return item;
  }

  const response = await fetch(
    `/api/public/gallery/${encodeURIComponent(value)}`,
    {
      method: "GET",
      cache: "no-store",
      signal,
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || "Failed to load gallery item");
  }

  return payload;
}

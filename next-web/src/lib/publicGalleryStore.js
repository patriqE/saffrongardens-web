import galleryItems from "@/data/gallery-media.json";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return parsed;
}

function normalizeFilters(raw = {}) {
  return {
    category: (raw.category || "").trim(),
    type: (raw.type || "").trim().toLowerCase(),
    q: (raw.q || "").trim().toLowerCase(),
    limit: clamp(toPositiveInteger(raw.limit, 12), 1, 50),
    offset: toPositiveInteger(raw.offset, 0),
  };
}

function applyFilters(items, filters) {
  return items.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.type && item.type.toLowerCase() !== filters.type) return false;

    if (filters.q) {
      const haystack =
        `${item.title} ${item.description} ${item.category}`.toLowerCase();
      if (!haystack.includes(filters.q)) return false;
    }

    return true;
  });
}

export function listPublicGalleryItems(rawFilters = {}) {
  const filters = normalizeFilters(rawFilters);
  const filtered = applyFilters(galleryItems, filters);
  const items = filtered.slice(filters.offset, filters.offset + filters.limit);

  return {
    items,
    total: filtered.length,
    offset: filters.offset,
    limit: filters.limit,
    hasMore: filters.offset + items.length < filtered.length,
    filters: {
      category: filters.category,
      type: filters.type,
      q: filters.q,
    },
  };
}

export function getPublicGalleryItemById(id) {
  const value = String(id || "").trim();
  if (!value) return null;

  return galleryItems.find((item) => item.id === value) || null;
}

export function listPublicGalleryCategories() {
  return Array.from(new Set(galleryItems.map((item) => item.category)));
}

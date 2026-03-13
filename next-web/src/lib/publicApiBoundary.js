const PUBLIC_API_PREFIX = "/api/public/";
const FORBIDDEN_PREFIXES = ["/api/staff/", "/api/admin/"];

function toPathname(value) {
  if (typeof value !== "string") return "";

  try {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return new URL(value).pathname;
    }
  } catch {
    return value;
  }

  return value;
}

export function assertGuestPublicApiPath(path) {
  const pathname = toPathname(path);

  if (!pathname.startsWith("/api/")) return path;

  if (FORBIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    throw new Error(`Blocked restricted API path: ${pathname}`);
  }

  if (!pathname.startsWith(PUBLIC_API_PREFIX)) {
    throw new Error(
      `Guest app must use /api/public/** routes only: ${pathname}`,
    );
  }

  return path;
}

export function buildBackendPublicApiUrl(baseUrl, publicPath) {
  const safePath = assertGuestPublicApiPath(publicPath);
  const normalizedBase = String(baseUrl || "").replace(/\/+$/, "");
  return `${normalizedBase}${safePath}`;
}

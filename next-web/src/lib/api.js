const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// Global auth error handler
let onAuthError = null;

export function setAuthErrorHandler(handler) {
  onAuthError = handler;
}

export async function apiFetch(
  path,
  { method = "GET", headers = {}, body, authToken, credentials } = {},
) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const fetchHeaders = { "Content-Type": "application/json", ...headers };
  if (authToken) fetchHeaders["Authorization"] = `Bearer ${authToken}`;

  const res = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials, // e.g. "include" if backend uses cookies
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? safeJson(text) : null;

  if (!res.ok) {
    const message = data?.message || res.statusText || "Request failed";
    const error = new Error(message);
    error.status = res.status;
    error.data = data;

    // Handle authentication/authorization errors globally
    if (res.status === 401 || res.status === 403) {
      if (onAuthError) {
        onAuthError(error);
      }
    }

    throw error;
  }
  return data;
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Common API helpers (adjust paths to match backend routes)
export const Api = {
  login: (credentials) =>
    apiFetch("/api/auth/login", { method: "POST", body: credentials }),
  me: (token) => apiFetch("/api/auth/me", { authToken: token }),
  fetchUserProfile: (token) => apiFetch("/api/auth/me", { authToken: token }),
};

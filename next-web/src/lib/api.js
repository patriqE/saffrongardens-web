const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function apiFetch(
  path,
  { method = "GET", headers = {}, body, authToken, credentials } = {}
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
};

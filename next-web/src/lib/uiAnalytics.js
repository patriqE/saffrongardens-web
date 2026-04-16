import { createLogger } from "@/lib/logger";

const uiAnalyticsLogger = createLogger("UIAnalytics");

function sanitizeMetadata(metadata) {
  if (!metadata || typeof metadata !== "object") return {};

  return Object.entries(metadata).reduce((acc, [key, value]) => {
    if (value === undefined) return acc;
    acc[key] = value;
    return acc;
  }, {});
}

export function trackUiEvent(eventName, metadata = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event: eventName,
    metadata: sanitizeMetadata(metadata),
    timestamp: new Date().toISOString(),
  };

  uiAnalyticsLogger.debug(`Tracked UI event: ${eventName}`, payload.metadata);

  try {
    window.dispatchEvent(new CustomEvent("ui-analytics", { detail: payload }));
  } catch {
    // Ignore analytics dispatch failures.
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload.metadata);
  }
}

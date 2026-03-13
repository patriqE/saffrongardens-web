const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

function parseBooleanFlag(value, fallback = true) {
  if (typeof value !== "string") return fallback;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return fallback;

  return TRUE_VALUES.has(normalized);
}

export const chatbotEnabled = parseBooleanFlag(
  process.env.NEXT_PUBLIC_CHATBOT_ENABLED,
  true,
);

export const plannerOverrideLabel = "Talk to Planner";

export function getPrimaryChatLabel() {
  return chatbotEnabled ? "Chat" : plannerOverrideLabel;
}

export function getPrimaryChatCtaLabel() {
  return chatbotEnabled ? "Start A Quick Chat" : plannerOverrideLabel;
}

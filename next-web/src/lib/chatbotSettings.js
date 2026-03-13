const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

const DEFAULT_BUSINESS_HOURS = {
  days: [1, 2, 3, 4, 5, 6],
  start: "09:00",
  end: "18:00",
  timeZone: "local",
};

export const DEFAULT_CHATBOT_SETTINGS = {
  enabled: true,
  welcomeMessage:
    "Welcome to Saffron Gardens. I can help with venue tours, availability, pricing, and getting you to a planner.",
  quickReplies: ["Check availability", "Book a venue tour", "Talk to planner"],
  businessHours: DEFAULT_BUSINESS_HOURS,
  afterHoursMessage:
    "Our planners are currently offline. Leave your details and we will follow up during business hours.",
  autoEscalateToPlanner: true,
  escalationKeywords: [
    "planner",
    "person",
    "human",
    "quote",
    "booking",
    "urgent",
  ],
  fallbackMessage:
    "I can help with the basics, or you can ask to talk to a planner at any time.",
  handoverDelaySeconds: 30,
};

function parseBooleanFlag(value, fallback = true) {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return fallback;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return fallback;

  return TRUE_VALUES.has(normalized);
}

function parseStructuredValue(value) {
  if (typeof value !== "string") return value;

  const normalized = value.trim();
  if (!normalized) return null;

  if (
    (normalized.startsWith("[") && normalized.endsWith("]")) ||
    (normalized.startsWith("{") && normalized.endsWith("}"))
  ) {
    try {
      return JSON.parse(normalized);
    } catch {
      return value;
    }
  }

  return value;
}

function normalizeStringArray(value, fallback) {
  const structuredValue = parseStructuredValue(value);
  const source = Array.isArray(structuredValue)
    ? structuredValue
    : typeof structuredValue === "string"
      ? structuredValue.split(/\r?\n|,/)
      : [];

  const items = source.map((item) => String(item || "").trim()).filter(Boolean);

  return items.length > 0 ? items : [...fallback];
}

function normalizeTimeValue(value, fallback) {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return /^\d{2}:\d{2}$/.test(normalized) ? normalized : fallback;
}

function normalizeBusinessHours(value) {
  const structuredValue = parseStructuredValue(value);
  const source =
    structuredValue && typeof structuredValue === "object"
      ? structuredValue
      : {};

  const days = Array.isArray(source.days)
    ? source.days
        .map((day) => Number(day))
        .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
    : DEFAULT_BUSINESS_HOURS.days;

  return {
    days: days.length > 0 ? days : [...DEFAULT_BUSINESS_HOURS.days],
    start: normalizeTimeValue(source.start, DEFAULT_BUSINESS_HOURS.start),
    end: normalizeTimeValue(source.end, DEFAULT_BUSINESS_HOURS.end),
    timeZone:
      typeof source.timeZone === "string" && source.timeZone.trim()
        ? source.timeZone.trim()
        : DEFAULT_BUSINESS_HOURS.timeZone,
  };
}

function normalizeNumber(value, fallback) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  return Math.max(0, Math.floor(numericValue));
}

function normalizeString(value, fallback) {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

export function normalizeChatbotSettings(settings) {
  const payload = settings && typeof settings === "object" ? settings : {};

  return {
    enabled: parseBooleanFlag(
      payload.enabled,
      DEFAULT_CHATBOT_SETTINGS.enabled,
    ),
    welcomeMessage: normalizeString(
      payload.welcomeMessage,
      DEFAULT_CHATBOT_SETTINGS.welcomeMessage,
    ),
    quickReplies: normalizeStringArray(
      payload.quickReplies,
      DEFAULT_CHATBOT_SETTINGS.quickReplies,
    ),
    businessHours: normalizeBusinessHours(payload.businessHours),
    afterHoursMessage: normalizeString(
      payload.afterHoursMessage,
      DEFAULT_CHATBOT_SETTINGS.afterHoursMessage,
    ),
    autoEscalateToPlanner: parseBooleanFlag(
      payload.autoEscalateToPlanner,
      DEFAULT_CHATBOT_SETTINGS.autoEscalateToPlanner,
    ),
    escalationKeywords: normalizeStringArray(
      payload.escalationKeywords,
      DEFAULT_CHATBOT_SETTINGS.escalationKeywords,
    ),
    fallbackMessage: normalizeString(
      payload.fallbackMessage,
      DEFAULT_CHATBOT_SETTINGS.fallbackMessage,
    ),
    handoverDelaySeconds: normalizeNumber(
      payload.handoverDelaySeconds,
      DEFAULT_CHATBOT_SETTINGS.handoverDelaySeconds,
    ),
  };
}

export function createFrontendChatbotSettings(overrides = {}) {
  return normalizeChatbotSettings({
    enabled: process.env.NEXT_PUBLIC_CHATBOT_ENABLED,
    welcomeMessage: process.env.NEXT_PUBLIC_CHATBOT_WELCOME_MESSAGE,
    quickReplies: process.env.NEXT_PUBLIC_CHATBOT_QUICK_REPLIES,
    businessHours: process.env.NEXT_PUBLIC_CHATBOT_BUSINESS_HOURS,
    afterHoursMessage: process.env.NEXT_PUBLIC_CHATBOT_AFTER_HOURS_MESSAGE,
    autoEscalateToPlanner: process.env.NEXT_PUBLIC_CHATBOT_AUTO_ESCALATE,
    escalationKeywords: process.env.NEXT_PUBLIC_CHATBOT_ESCALATION_KEYWORDS,
    fallbackMessage: process.env.NEXT_PUBLIC_CHATBOT_FALLBACK_MESSAGE,
    handoverDelaySeconds:
      process.env.NEXT_PUBLIC_CHATBOT_HANDOVER_DELAY_SECONDS,
    ...overrides,
  });
}

export const frontendChatbotSettings = createFrontendChatbotSettings();

export function hydrateChatbotSettings(apiPayload) {
  return normalizeChatbotSettings(apiPayload);
}

export function isWithinBusinessHours(
  businessHours,
  referenceDate = new Date(),
) {
  const normalizedHours = normalizeBusinessHours(businessHours);
  const day = referenceDate.getDay();

  if (!normalizedHours.days.includes(day)) return false;

  const currentMinutes =
    referenceDate.getHours() * 60 + referenceDate.getMinutes();
  const [startHour, startMinute] = normalizedHours.start.split(":").map(Number);
  const [endHour, endMinute] = normalizedHours.end.split(":").map(Number);
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

export function formatBusinessHours(hours) {
  const normalizedHours = normalizeBusinessHours(hours);
  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayLabel = normalizedHours.days.map((day) => dayMap[day]).join(", ");

  return `${dayLabel} • ${normalizedHours.start}-${normalizedHours.end}`;
}

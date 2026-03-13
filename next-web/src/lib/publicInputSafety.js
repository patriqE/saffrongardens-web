const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const INPUT_LIMITS = {
  email: 120,
  name: 80,
  plannerQuery: 50,
  plannerUsername: 50,
  message: 1200,
  conversationId: 120,
  pageSize: 50,
};

function sanitizeValue(value, { maxLength, allowNewlines = false } = {}) {
  const source = String(value ?? "");
  const withoutControls = source.replace(CONTROL_CHARS_REGEX, " ");
  const normalizedWhitespace = allowNewlines
    ? withoutControls.replace(/\r/g, "")
    : withoutControls.replace(/\s+/g, " ");
  const trimmed = normalizedWhitespace.trim();

  if (!maxLength || maxLength <= 0) return trimmed;
  return trimmed.slice(0, maxLength);
}

function sanitizeWithoutLimit(value, options = {}) {
  return sanitizeValue(value, { ...options, maxLength: 0 });
}

function hasValue(value) {
  return Boolean(String(value ?? "").trim());
}

export function sanitizeConversationId(value) {
  return sanitizeValue(value, { maxLength: INPUT_LIMITS.conversationId });
}

export function validateConversationIdInput(value) {
  const normalized = sanitizeWithoutLimit(value);
  const sanitized = sanitizeConversationId(value);

  if (!hasValue(sanitized)) {
    return {
      value: sanitized,
      error: "conversationId is required",
    };
  }

  if (normalized.length > INPUT_LIMITS.conversationId) {
    return {
      value: sanitized,
      error: `conversationId exceeds ${INPUT_LIMITS.conversationId} characters`,
    };
  }

  return { value: sanitized, error: "" };
}

export function normalizePlannerSearchQuery(value) {
  return sanitizeValue(value, { maxLength: INPUT_LIMITS.plannerQuery });
}

export function validateGuestStartInput(payload = {}) {
  const normalizedEmail = sanitizeWithoutLimit(payload.email);
  const normalizedName = sanitizeWithoutLimit(payload.name);
  const normalizedPlannerUsername = sanitizeWithoutLimit(
    payload.preferredPlannerUsername,
  );

  const email = sanitizeValue(payload.email, { maxLength: INPUT_LIMITS.email });
  const name = sanitizeValue(payload.name, { maxLength: INPUT_LIMITS.name });
  const preferredPlannerUsername = sanitizeValue(
    payload.preferredPlannerUsername,
    {
      maxLength: INPUT_LIMITS.plannerUsername,
    },
  );

  const fieldErrors = {};

  if (!hasValue(email)) {
    fieldErrors.email = "Email is required.";
  } else if (normalizedEmail.length > INPUT_LIMITS.email) {
    fieldErrors.email = `Email must be ${INPUT_LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_REGEX.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!hasValue(name)) {
    fieldErrors.name = "Name is required.";
  } else if (normalizedName.length > INPUT_LIMITS.name) {
    fieldErrors.name = `Name must be ${INPUT_LIMITS.name} characters or fewer.`;
  }

  if (normalizedPlannerUsername.length > INPUT_LIMITS.plannerUsername) {
    fieldErrors.plannerQuery = `Planner username must be ${INPUT_LIMITS.plannerUsername} characters or fewer.`;
  }

  return {
    value: {
      email,
      name,
      preferredPlannerUsername: preferredPlannerUsername || undefined,
    },
    fieldErrors,
  };
}

export function validateGuestMessageInput(message) {
  const normalizedMessage = sanitizeWithoutLimit(message, {
    allowNewlines: true,
  });
  const sanitizedMessage = sanitizeValue(message, {
    maxLength: INPUT_LIMITS.message,
    allowNewlines: true,
  });

  const fieldErrors = {};
  if (!hasValue(sanitizedMessage)) {
    fieldErrors.chatMessage = "Message cannot be empty.";
  } else if (normalizedMessage.length > INPUT_LIMITS.message) {
    fieldErrors.chatMessage = `Message must be ${INPUT_LIMITS.message} characters or fewer.`;
  }

  return {
    value: sanitizedMessage,
    fieldErrors,
  };
}

export function validatePlannerQueryInput(query) {
  const normalizedQuery = sanitizeWithoutLimit(query);
  const sanitizedQuery = normalizePlannerSearchQuery(query);
  const fieldErrors = {};

  if (hasValue(query) && !hasValue(sanitizedQuery)) {
    fieldErrors.plannerQuery = "Search query contains unsupported characters.";
  } else if (normalizedQuery.length > INPUT_LIMITS.plannerQuery) {
    fieldErrors.plannerQuery = `Search query must be ${INPUT_LIMITS.plannerQuery} characters or fewer.`;
  }

  return {
    value: sanitizedQuery,
    fieldErrors,
  };
}

export function hasValidationErrors(fieldErrors) {
  return Object.values(fieldErrors || {}).some(Boolean);
}

export function normalizeFieldErrors(payload) {
  const source =
    payload && typeof payload.fieldErrors === "object"
      ? payload.fieldErrors
      : {};

  return {
    email: source.email || "",
    name: source.name || "",
    plannerQuery: source.plannerQuery || source.q || "",
    chatMessage: source.chatMessage || source.message || "",
  };
}

export function normalizePaging({ page, size }) {
  const parsedPage = Number.parseInt(String(page ?? "0"), 10);
  const parsedSize = Number.parseInt(String(size ?? "20"), 10);

  const safePage =
    Number.isFinite(parsedPage) && parsedPage >= 0 ? parsedPage : 0;
  const safeSize = Number.isFinite(parsedSize)
    ? Math.min(Math.max(parsedSize, 1), INPUT_LIMITS.pageSize)
    : 20;

  return {
    page: String(safePage),
    size: String(safeSize),
  };
}

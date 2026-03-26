/**
 * Logger utility for consistent logging across the application
 * Respects LOG_LEVEL environment variable (development, staging, production)
 */

const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4,
};

const levelNames = {
  0: "DEBUG",
  1: "INFO",
  2: "WARN",
  3: "ERROR",
  4: "SILENT",
};

function getLogLevel() {
  if (typeof window === "undefined") return LogLevel.INFO;

  const level = process.env.NEXT_PUBLIC_LOG_LEVEL || "development";
  switch (level) {
    case "development":
      return LogLevel.DEBUG;
    case "staging":
      return LogLevel.INFO;
    case "production":
      return LogLevel.WARN;
    default:
      return LogLevel.INFO;
  }
}

function formatMessage(category, level, message, data) {
  const timestamp = new Date().toISOString();
  const levelName = levelNames[level];
  const prefix = `[${timestamp}] [${levelName}] [${category}]`;

  if (data) {
    return `${prefix} ${message}`, data;
  }
  return `${prefix} ${message}`;
}

export function createLogger(category = "App") {
  const currentLevel = getLogLevel();

  return {
    debug: (message, data) => {
      if (currentLevel <= LogLevel.DEBUG) {
        const formatted = formatMessage(category, LogLevel.DEBUG, message, data);
        if (data) console.debug(formatted[0], formatted[1]);
        else console.debug(formatted);
      }
    },

    info: (message, data) => {
      if (currentLevel <= LogLevel.INFO) {
        const formatted = formatMessage(category, LogLevel.INFO, message, data);
        if (data) console.info(formatted[0], formatted[1]);
        else console.info(formatted);
      }
    },

    warn: (message, data) => {
      if (currentLevel <= LogLevel.WARN) {
        const formatted = formatMessage(category, LogLevel.WARN, message, data);
        if (data) console.warn(formatted[0], formatted[1]);
        else console.warn(formatted);
      }
    },

    error: (message, error) => {
      if (currentLevel <= LogLevel.ERROR) {
        const formatted = formatMessage(
          category,
          LogLevel.ERROR,
          message,
          error,
        );
        if (error) console.error(formatted[0], formatted[1]);
        else console.error(formatted);
      }
    },
  };
}

// Global logger instance
export const logger = createLogger("App");

// Category-specific loggers
export const apiLogger = createLogger("API");
export const chatLogger = createLogger("Chat");
export const authLogger = createLogger("Auth");

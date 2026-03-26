import { createLogger } from "@/lib/logger";

describe("Logger utility", () => {
  let consoleDebugSpy, consoleInfoSpy, consoleWarnSpy, consoleErrorSpy;

  beforeEach(() => {
    consoleDebugSpy = jest.spyOn(console, "debug").mockImplementation();
    consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should create a logger with a category", () => {
    const logger = createLogger("Test");
    expect(logger).toHaveProperty("debug");
    expect(logger).toHaveProperty("info");
    expect(logger).toHaveProperty("warn");
    expect(logger).toHaveProperty("error");
  });

  test("debug() should call console.debug", () => {
    const logger = createLogger("TestCategory");
    logger.debug("Test message");
    expect(consoleDebugSpy).toHaveBeenCalled();
  });

  test("info() should call console.info", () => {
    const logger = createLogger("TestCategory");
    logger.info("Test message");
    expect(consoleInfoSpy).toHaveBeenCalled();
  });

  test("warn() should call console.warn", () => {
    const logger = createLogger("TestCategory");
    logger.warn("Test warning");
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  test("error() should call console.error", () => {
    const logger = createLogger("TestCategory");
    logger.error("Test error");
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test("should format messages with timestamp and level", () => {
    const logger = createLogger("TestCategory");
    logger.info("Test message");
    const call = consoleInfoSpy.mock.calls[0][0];
    expect(call).toMatch(/\[\d{4}-\d{2}-\d{2}T/);
    expect(call).toMatch(/\[INFO\]/);
    expect(call).toMatch(/\[TestCategory\]/);
  });
});

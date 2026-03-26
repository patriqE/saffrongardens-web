import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Component that throws an error
const ThrowError = () => {
  throw new Error("Test error");
};

const WorkingComponent = () => <div>Works fine</div>;

describe("ErrorBoundary", () => {
  const originalError = console.error;

  beforeAll(() => {
    // Suppress console.error for error boundary tests
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  test("should render children when there is no error", () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Works fine")).toBeInTheDocument();
  });

  test("should display error UI when child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Oops, something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(/We encountered an unexpected error/),
    ).toBeInTheDocument();
  });

  test("should have a refresh button", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    const refreshButton = screen.getByRole("button", { name: /Refresh Page/i });
    expect(refreshButton).toBeInTheDocument();
  });
});

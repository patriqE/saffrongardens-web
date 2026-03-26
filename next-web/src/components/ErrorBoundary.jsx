"use client";

import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-ink via-ink/95 to-ink px-4">
          <div className="max-w-md rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
            <h1 className="mb-4 text-2xl font-bold text-white">
              Oops, something went wrong
            </h1>
            <p className="mb-6 text-white/70">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-6 cursor-pointer">
                <summary className="mb-2 font-mono text-sm text-white/50">
                  Error details (development only)
                </summary>
                <pre className="overflow-auto rounded bg-black/20 p-3 font-mono text-xs text-red-400">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded bg-white px-4 py-2 font-semibold text-ink transition-opacity hover:opacity-90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

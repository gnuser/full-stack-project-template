"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary component to catch JavaScript errors in child component tree
 * and display a fallback UI instead of crashing the entire app
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Show custom fallback UI if provided, otherwise show default fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex h-[50vh] flex-col items-center justify-center p-4 text-center">
          <div
            className="mb-6 rounded-full bg-red-100 p-3"
            style={{ background: "var(--error)", opacity: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              style={{ color: "var(--error)" }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2
            className="mb-2 text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Something went wrong
          </h2>
          <p
            className="mb-6 text-gray-600"
            style={{ color: "var(--foreground)", opacity: 0.7 }}
          >
            An error occurred in the application. Try refreshing the page or
            contact support if the problem persists.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()} variant="primary">
              Refresh Page
            </Button>
            <Button
              onClick={() =>
                this.setState({ hasError: false, error: undefined })
              }
              variant="outline"
            >
              Try Again
            </Button>
          </div>
          {process.env.NODE_ENV !== "production" && this.state.error && (
            <div className="mt-8 w-full max-w-2xl overflow-auto rounded-md bg-gray-800 p-4 text-left text-sm text-white">
              <p className="font-bold">
                {this.state.error.name}: {this.state.error.message}
              </p>
              <pre className="mt-2 text-red-300">{this.state.error.stack}</pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Convenience component that wraps a page or section with an error boundary
 */
export function WithErrorBoundary({
  children,
  fallback,
  onError,
}: ErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}

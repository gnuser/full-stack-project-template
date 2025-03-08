/**
 * Error utilities for standardized error handling
 */

// Custom error types
export class AppError extends Error {
  statusCode: number;
  code?: string;
  meta?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    meta?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.meta = meta;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthError extends AppError {
  constructor(
    message: string = "Authentication error",
    code?: string,
    meta?: Record<string, any>
  ) {
    super(message, 401, code, meta);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = "Resource not found",
    code?: string,
    meta?: Record<string, any>
  ) {
    super(message, 404, code, meta);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = "Validation error",
    code?: string,
    meta?: Record<string, any>
  ) {
    super(message, 400, code, meta);
  }
}

// Error logger
export const logError = (error: Error | AppError, context?: string) => {
  const timestamp = new Date().toISOString();
  const errorType = error.constructor.name;
  const statusCode = (error as AppError).statusCode || 500;
  const errorCode = (error as AppError).code || "UNKNOWN";

  console.error(
    `[${timestamp}] ${context ? `[${context}] ` : ""}${errorType} (${statusCode}): ${error.message}`
  );
  console.error(`Error Code: ${errorCode}`);

  if ((error as AppError).meta) {
    console.error("Additional data:", (error as AppError).meta);
  }

  console.error(error.stack);

  // In production, you might want to send this to a monitoring service
  if (process.env.NODE_ENV === "production") {
    // Send to monitoring service like Sentry
    // reportErrorToMonitoring(error);
  }
};

// Helper to safely handle async errors in route handlers
export const handleRouteError = (error: unknown) => {
  if (error instanceof AppError) {
    return Response.json(
      {
        error: error.message,
        code: error.code,
        meta: error.meta,
      },
      { status: error.statusCode }
    );
  }

  // For unknown errors
  const unexpectedError =
    error instanceof Error ? error : new Error(String(error));
  logError(unexpectedError, "Unhandled route error");

  return Response.json({ error: "Internal server error" }, { status: 500 });
};

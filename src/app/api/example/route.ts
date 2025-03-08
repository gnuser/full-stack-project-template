import { getSession } from "@/lib/session";
import { handleRouteError, ValidationError, AuthError } from "@/lib/error";

export interface ExampleData {
  message: string;
  timestamp: string;
  user?: string;
}

/**
 * GET /api/example
 * Example API route that demonstrates proper error handling
 */
export async function GET(request: Request) {
  try {
    // Optional: Get query parameters
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    // Optional: Get session for authenticated routes
    const session = await getSession();

    // Demonstrate different error types
    if (action === "validation-error") {
      throw new ValidationError(
        "Invalid parameters provided",
        "INVALID_PARAMS"
      );
    }

    if (action === "auth-error") {
      throw new AuthError("Authentication required", "AUTH_REQUIRED");
    }

    // Success response
    const data: ExampleData = {
      message: "API is working correctly!",
      timestamp: new Date().toISOString(),
      user: session?.user?.email || "Not authenticated",
    };

    return Response.json(data);
  } catch (error) {
    return handleRouteError(error);
  }
}

/**
 * POST /api/example
 * Example POST endpoint with validation
 */
export async function POST(request: Request) {
  try {
    // Parse JSON body
    const body = await request.json().catch(() => {
      throw new ValidationError("Invalid JSON body", "INVALID_JSON");
    });

    // Validate required fields
    if (!body.message) {
      throw new ValidationError("Message is required", "MISSING_FIELD", {
        field: "message",
      });
    }

    // Process the request
    const data = {
      success: true,
      message: `Received: ${body.message}`,
      timestamp: new Date().toISOString(),
    };

    return Response.json(data, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}

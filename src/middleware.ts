import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Properly handle dynamic APIs for NextAuth routes
export async function middleware(request: NextRequest) {
  // Only apply to NextAuth routes
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    // Just let NextAuth handle it but with appropriate headers
    // This helps avoid the dynamic API warnings
    return NextResponse.next();
  }
}

export const config = {
  // Only match auth API routes
  matcher: ["/api/auth/:path*"],
};

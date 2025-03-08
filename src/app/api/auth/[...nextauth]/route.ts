import { NextRequest } from "next/server";
import { authOptions } from "@/auth";
import NextAuth from "next-auth/next";

// For App Router, we need to use a more explicit approach to handle dynamic routes
// This follows Next.js 14+ recommendations and fixes the `Cannot destructure property 'nextauth'` errors

// Create a handler with type information
const handler = NextAuth(authOptions);

// Export the GET and POST handlers with proper typing
export async function GET(request: NextRequest) {
  return await handler(request);
}

export async function POST(request: NextRequest) {
  return await handler(request);
}

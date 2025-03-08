import { authOptions } from "@/auth";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";

// Create a handler that properly handles Next.js 15 API routes
const handler = NextAuth(authOptions);

export async function nextAuthHandler(req: NextRequest) {
  return handler(req);
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Properly handle dynamic APIs for NextAuth routes
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token (if it exists)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Define authentication paths
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.includes(pathname);

  // Routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/api/user"];

  // Check if route should be protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // If trying to access auth routes while logged in, redirect to home
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If trying to access protected routes without being logged in, redirect to login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // Default behavior - continue as normal
  return NextResponse.next();
}

export const config = {
  // Apply middleware to both auth routes and protected routes
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/api/user/:path*",
  ],
};

import { authOptions } from "@/auth";
import NextAuth from "next-auth";

// Export a single handler for all HTTP methods
// This way works correctly in App Router for dynamic routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import { authOptions } from "@/auth";
import NextAuth from "next-auth";

// This is the recommended approach for handling dynamic route segments in App Router
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments
const handler = NextAuth(authOptions);

// Export the handlers as named exports
export { handler as GET, handler as POST };

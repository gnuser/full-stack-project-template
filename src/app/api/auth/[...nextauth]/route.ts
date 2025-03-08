import { authOptions } from "@/auth";
import NextAuth from "next-auth";

// Use the default NextAuth export pattern
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

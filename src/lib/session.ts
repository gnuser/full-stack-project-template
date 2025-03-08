import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Get the session with proper typing
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Get the authenticated session or redirect to login
 * @param redirectTo Optional redirect path
 */
export async function getAuthSession(redirectTo: string = "/login") {
  const session = await getSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}

/**
 * Get a friendly display name for the current user
 */
export function getDisplayName(user: {
  name?: string | null;
  email?: string | null;
}) {
  return user.name || user.email?.split("@")[0] || "User";
}

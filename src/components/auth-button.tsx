"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <button
        type="button"
        disabled
        className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700"
      >
        Loading...
      </button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || "Profile"}
              className="h-8 w-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium">
            {session.user?.name || session.user?.email}
          </span>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Sign up
      </Link>
    </div>
  );
}

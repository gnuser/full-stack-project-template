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
        className="rounded-md px-4 py-2 text-sm opacity-70"
        style={{ backgroundColor: "var(--border)" }}
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
              className="h-8 w-8 rounded-full border-2"
              style={{ borderColor: "var(--primary)" }}
            />
          )}
          <span className="text-sm font-medium">
            {session.user?.name || session.user?.email}
          </span>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
          style={{
            backgroundColor: "var(--error)",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.filter = "brightness(90%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.filter = "brightness(100%)")
          }
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
        className="rounded-md px-4 py-2 text-sm font-medium transition-colors"
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }}
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
      >
        Sign up
      </Link>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user just registered
    if (searchParams?.get("registered") === "true") {
      setSuccess("Account created successfully! Please sign in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      }
    } catch (_err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          disabled={isLoading}
        >
          Sign in with Google
        </button>

        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-white shadow-sm hover:bg-gray-800"
          disabled={isLoading}
        >
          Sign in with GitHub
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-2 text-sm text-red-500">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-2 text-sm text-green-600">
            {success}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

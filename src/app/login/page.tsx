import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const session = await getSession();

  // Redirect to home if already logged in
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to access your dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

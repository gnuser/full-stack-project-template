import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Type assertion for user with id
  const user = session.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="rounded-lg border p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Welcome, {user.name || user.email}
        </h2>
        <p className="text-gray-600">
          This is a protected page. You can only see this if you are
          authenticated.
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Your Profile</h3>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            {user.id && (
              <p>
                <span className="font-medium">User ID:</span> {user.id}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

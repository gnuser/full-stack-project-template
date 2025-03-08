import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import WelcomeCard from "@/components/dashboard/welcome-card";
import ProfileCard from "@/components/dashboard/profile-card";

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

  // Get a friendly display name
  const displayName = user.name || user.email?.split("@")[0] || "User";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Use the client components for interactive elements */}
        <WelcomeCard userName={displayName} />
        <ProfileCard email={user.email} userId={user.id} />
      </div>
    </div>
  );
}

import { getAuthSession, getDisplayName } from "@/lib/session";
import WelcomeCard from "@/components/dashboard/welcome-card";
import ProfileCard from "@/components/dashboard/profile-card";

export default async function DashboardPage() {
  // Get authenticated session or redirect to login
  const session = await getAuthSession();

  // Get a friendly display name
  const displayName = getDisplayName(session.user);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <WelcomeCard userName={displayName} />
        <ProfileCard email={session.user.email} userId={session.user.id} />
      </div>
    </div>
  );
}

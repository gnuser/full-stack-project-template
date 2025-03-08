"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type WelcomeCardProps = {
  userName: string;
};

export default function WelcomeCard({ userName }: WelcomeCardProps) {
  return (
    <Card>
      <h2 className="mb-4 text-2xl font-semibold">Welcome, {userName}</h2>
      <p style={{ color: "var(--foreground)", opacity: 0.7 }}>
        This is a protected page. You can only see this if you are
        authenticated.
      </p>

      <div className="mt-6 flex justify-end">
        <Button>View Activity</Button>
      </div>
    </Card>
  );
}

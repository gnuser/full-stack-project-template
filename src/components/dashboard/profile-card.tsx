"use client";

import { Card, CardLabel } from "@/components/ui/card";

type ProfileCardProps = {
  email: string | null | undefined;
  userId: string | undefined;
};

export default function ProfileCard({ email, userId }: ProfileCardProps) {
  return (
    <Card title="Your Profile">
      <div className="mt-4 space-y-3">
        <div className="flex flex-col">
          <CardLabel>Email</CardLabel>
          <span className="font-medium">{email}</span>
        </div>

        {userId && (
          <div className="flex flex-col">
            <CardLabel>User ID</CardLabel>
            <span
              className="font-mono text-sm"
              style={{ wordBreak: "break-all" }}
            >
              {userId}
            </span>
          </div>
        )}

        <div className="flex flex-col">
          <CardLabel>Status</CardLabel>
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "var(--success)" }}
            ></div>
            <span className="font-medium">Active</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

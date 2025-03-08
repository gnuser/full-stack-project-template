"use client";

type ProfileCardProps = {
  email: string | null | undefined;
  userId: string | undefined;
};

export default function ProfileCard({ email, userId }: ProfileCardProps) {
  return (
    <div
      className="rounded-xl p-6 shadow-lg transition-all duration-200"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border)",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <h3 className="mb-4 text-xl font-medium">Your Profile</h3>

      <div className="mt-4 space-y-3">
        <div className="flex flex-col">
          <span
            className="text-sm"
            style={{ color: "var(--foreground)", opacity: 0.6 }}
          >
            Email
          </span>
          <span className="font-medium">{email}</span>
        </div>

        {userId && (
          <div className="flex flex-col">
            <span
              className="text-sm"
              style={{ color: "var(--foreground)", opacity: 0.6 }}
            >
              User ID
            </span>
            <span
              className="font-mono text-sm"
              style={{ wordBreak: "break-all" }}
            >
              {userId}
            </span>
          </div>
        )}

        <div className="flex flex-col">
          <span
            className="text-sm"
            style={{ color: "var(--foreground)", opacity: 0.6 }}
          >
            Status
          </span>
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "var(--success)" }}
            ></div>
            <span className="font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

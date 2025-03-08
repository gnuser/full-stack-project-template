"use client";

type WelcomeCardProps = {
  userName: string;
};

export default function WelcomeCard({ userName }: WelcomeCardProps) {
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
      <h2 className="mb-4 text-2xl font-semibold">Welcome, {userName}</h2>
      <p style={{ color: "var(--foreground)", opacity: 0.7 }}>
        This is a protected page. You can only see this if you are
        authenticated.
      </p>

      <div className="mt-6 flex justify-end">
        <button
          className="rounded-md px-4 py-2 text-sm font-medium transition-all"
          style={{
            backgroundColor: "var(--primary)",
            color: "white",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.filter = "brightness(110%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.filter = "brightness(100%)")
          }
        >
          View Activity
        </button>
      </div>
    </div>
  );
}

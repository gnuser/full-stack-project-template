"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      // Refresh session every 5 minutes
      refetchInterval={5 * 60}
      // Force re-fetch session when window focuses
      refetchOnWindowFocus={true}
      // Avoid flash of unauthenticated content
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
}

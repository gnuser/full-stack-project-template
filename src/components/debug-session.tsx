"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DebugSession() {
  const { data: session, status, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-gray-800 p-3 text-white shadow-lg"
      >
        🔍
      </button>

      {isOpen && (
        <div className="mt-2 w-80 rounded-lg bg-white p-4 shadow-xl">
          <div className="flex justify-between">
            <h3 className="text-sm font-bold">Session Debug</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500">
              ✕
            </button>
          </div>

          <div className="mt-2">
            <p className="text-xs">
              Status: <span className="font-semibold">{status}</span>
            </p>
            <div className="mt-2 max-h-40 overflow-auto rounded bg-gray-100 p-2">
              <pre className="text-xs">{JSON.stringify(session, null, 2)}</pre>
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => update()}
              className="rounded bg-blue-500 px-2 py-1 text-xs text-white"
            >
              Refresh Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

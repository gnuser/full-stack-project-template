"use client";

import { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg transition-all duration-200 ${className}`}
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border)",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {title && <h3 className="mb-4 text-xl font-medium">{title}</h3>}
      {children}
    </div>
  );
}

export function CardLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-sm"
      style={{ color: "var(--foreground)", opacity: 0.6 }}
    >
      {children}
    </span>
  );
}

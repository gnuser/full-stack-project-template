"use client";

import { useState, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Base classes
  const baseClassName = "rounded-md font-medium transition-all";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  // Style variations
  const getStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "var(--primary)",
          color: "white",
          filter: isHovered ? "brightness(110%)" : "brightness(100%)",
        };
      case "secondary":
        return {
          backgroundColor: "var(--secondary)",
          color: "white",
          filter: isHovered ? "brightness(110%)" : "brightness(100%)",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: "var(--primary)",
          borderColor: "var(--primary)",
          borderWidth: "1px",
          borderStyle: "solid",
          filter: isHovered ? "brightness(110%)" : "brightness(100%)",
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`${baseClassName} ${sizeClasses[size]} ${className}`}
      style={getStyles()}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
}

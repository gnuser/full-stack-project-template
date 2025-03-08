/**
 * Theme configuration for the application
 * This provides a central place to define colors, spacing, and other design tokens
 */

export const themeColors = {
  light: {
    background: "#ffffff",
    foreground: "#111827",
    primary: "#2563eb",
    primaryHover: "#1e40af",
    secondary: "#4f46e5",
    secondaryHover: "#4338ca",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    cardBackground: "#ffffff",
    border: "#e5e7eb",
    inputBackground: "#f9fafb",
    muted: "#6b7280",
  },
  dark: {
    background: "#111827",
    foreground: "#f9fafb",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#6366f1",
    secondaryHover: "#4f46e5",
    success: "#34d399",
    error: "#f87171",
    warning: "#fbbf24",
    cardBackground: "#1f2937",
    border: "#374151",
    inputBackground: "#1f2937",
    muted: "#9ca3af",
  },
};

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
};

export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
};

export const borderRadius = {
  none: "0",
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
};

export const animations = {
  spin: "spin 1s linear infinite",
  ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  bounce: "bounce 1s infinite",
};

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Helper functions for theme
export function getThemeVar(varName: string, isDark: boolean = false): string {
  const theme = isDark ? themeColors.dark : themeColors.light;
  return theme[varName as keyof typeof theme] || "";
}

export function getCSSVarValue(varName: string): string {
  return `var(--${varName})`;
}

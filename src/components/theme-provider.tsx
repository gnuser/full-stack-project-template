"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { themeColors } from "@/styles/theme";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = theme === "system" ? getSystemTheme() : theme;

    const themeVars =
      currentTheme === "dark" ? themeColors.dark : themeColors.light;

    // Set CSS variables for the theme
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Set data-theme attribute for potential CSS selectors
    root.setAttribute("data-theme", currentTheme);
  }, [theme]);

  // Update theme when system preference changes
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        const root = document.documentElement;
        const systemTheme = getSystemTheme();
        const themeVars =
          systemTheme === "dark" ? themeColors.dark : themeColors.light;

        // Set CSS variables for the theme
        Object.entries(themeVars).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });

        // Set data-theme attribute
        root.setAttribute("data-theme", systemTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Handle initial theme setup after mount to avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const value = {
    theme,
    setTheme,
  };

  // Avoid rendering with incorrect theme on first render
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

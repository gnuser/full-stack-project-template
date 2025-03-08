"use client";

import { useTheme } from "@/components/theme-provider";
import { useState, useRef, useEffect } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const themes = [
    { value: "light", label: "Light", icon: "☀️" },
    { value: "dark", label: "Dark", icon: "🌙" },
    { value: "system", label: "System", icon: "💻" },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-md border border-transparent p-2 text-sm hover:bg-opacity-80"
        style={{
          backgroundColor: "var(--inputBackground)",
          color: "var(--foreground)",
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="mr-2">{currentTheme.icon}</span>
        <span>{currentTheme.label}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 origin-top-right rounded-md shadow-lg"
          style={{
            backgroundColor: "var(--cardBackground)",
            borderColor: "var(--border)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <div
            className="rounded-md py-1"
            role="menu"
            aria-orientation="vertical"
          >
            {themes.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setTheme(item.value as "light" | "dark" | "system");
                  setIsOpen(false);
                }}
                className="flex w-full items-center px-4 py-2 text-sm hover:bg-opacity-10"
                style={{
                  backgroundColor:
                    theme === item.value ? "var(--primary)" : "transparent",
                  color: theme === item.value ? "white" : "var(--foreground)",
                }}
                role="menuitem"
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

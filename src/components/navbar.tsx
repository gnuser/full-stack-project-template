import Link from "next/link";
import AuthButton from "./auth-button";
import { ThemeSwitcher } from "./ui/theme-switcher";

export default function Navbar() {
  return (
    <nav
      className="border-b border-solid"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold"
            style={{ color: "var(--primary)" }}
          >
            My App
          </Link>
          <div className="hidden md:flex md:gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              Dashboard
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              Docs
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}

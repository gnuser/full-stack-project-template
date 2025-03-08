import Link from "next/link";
import AuthButton from "./auth-button";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            My App
          </Link>
          <div className="hidden md:flex md:gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}

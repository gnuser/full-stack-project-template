import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="mb-8 text-3xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        Documentation
      </h1>

      <div
        className="mb-8 rounded-xl p-6 shadow-lg"
        style={{
          backgroundColor: "var(--cardBackground)",
          borderColor: "var(--border)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Getting Started
        </h2>
        <p className="mb-4" style={{ color: "var(--foreground)" }}>
          Welcome to the Next.js Fullstack Template! This template provides a
          solid foundation for building full-stack applications with Next.js,
          TypeScript, Tailwind CSS, and NextAuth.js.
        </p>
        <h3
          className="mb-2 text-xl font-medium"
          style={{ color: "var(--foreground)" }}
        >
          Setup
        </h3>
        <ol
          className="ml-6 list-decimal space-y-2"
          style={{ color: "var(--foreground)" }}
        >
          <li>
            Run the setup script:{" "}
            <code className="rounded bg-gray-200 px-2 py-1 text-sm">
              ./setup.sh
            </code>
          </li>
          <li>
            Start the development server:{" "}
            <code className="rounded bg-gray-200 px-2 py-1 text-sm">
              npm run dev
            </code>
          </li>
          <li>
            Open{" "}
            <a
              href="http://localhost:3000"
              className="text-blue-500 hover:underline"
            >
              http://localhost:3000
            </a>{" "}
            in your browser
          </li>
        </ol>
      </div>

      <div
        className="mb-8 rounded-xl p-6 shadow-lg"
        style={{
          backgroundColor: "var(--cardBackground)",
          borderColor: "var(--border)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Features
        </h2>
        <ul
          className="ml-6 list-disc space-y-2"
          style={{ color: "var(--foreground)" }}
        >
          <li>
            <strong>Authentication:</strong> Ready-to-use authentication with
            NextAuth.js
          </li>
          <li>
            <strong>Database:</strong> Integration with Prisma ORM for type-safe
            database access
          </li>
          <li>
            <strong>Styling:</strong> Tailwind CSS with a custom theme system
            (light/dark mode)
          </li>
          <li>
            <strong>TypeScript:</strong> Full TypeScript support for better type
            safety
          </li>
          <li>
            <strong>Components:</strong> Reusable UI components for faster
            development
          </li>
        </ul>
      </div>

      <div
        className="mb-8 rounded-xl p-6 shadow-lg"
        style={{
          backgroundColor: "var(--cardBackground)",
          borderColor: "var(--border)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Project Structure
        </h2>
        <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
          {`src/
  ├── app/              # Next.js App Router
  ├── components/       # React components
  ├── lib/              # Utility functions
  ├── styles/           # Global styles
  └── types/            # TypeScript types`}
        </pre>
      </div>

      <div
        className="rounded-xl p-6 shadow-lg"
        style={{
          backgroundColor: "var(--cardBackground)",
          borderColor: "var(--border)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Need Help?
        </h2>
        <p className="mb-4" style={{ color: "var(--foreground)" }}>
          Check out the{" "}
          <Link
            href="https://nextjs.org/docs"
            className="text-blue-500 hover:underline"
          >
            Next.js documentation
          </Link>{" "}
          or the{" "}
          <Link
            href="https://next-auth.js.org/getting-started/introduction"
            className="text-blue-500 hover:underline"
          >
            NextAuth.js documentation
          </Link>{" "}
          for more information.
        </p>
        <p style={{ color: "var(--foreground)" }}>
          This template is designed to be a starting point. Feel free to modify
          it to suit your needs!
        </p>
      </div>
    </div>
  );
}

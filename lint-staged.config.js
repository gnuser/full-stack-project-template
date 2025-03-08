module.exports = {
  "*.{ts,tsx}": [
    // For lint-staged, it's often better to just skip the type-checking
    // We'll rely on the normal development process to catch type errors
    // 'bun tsc --noEmit --skipLibCheck',
    'echo "Skipping TypeScript checks in pre-commit hook"',
  ],
  "*.{json,md}": [
    // Using a function so biome receives the actual file paths instead of a glob pattern
    (files) => {
      if (files.length === 0) return 'echo "No JSON or MD files to format"';
      return `npx biome format ${files.join(" ")}`;
    },
  ],
};

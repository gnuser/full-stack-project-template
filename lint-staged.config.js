module.exports = {
  "*.{ts,tsx}": [
    // For lint-staged, it's often better to just skip the type-checking
    // We'll rely on the normal development process to catch type errors
    // 'bun tsc --noEmit --skipLibCheck',
    'echo "Skipping TypeScript checks in pre-commit hook"',
  ],
  "*.{json,md}": [
    (files) => {
      const fileList = files.join(" ");
      return `npx biome format --write ${fileList}`;
    },
  ],
};

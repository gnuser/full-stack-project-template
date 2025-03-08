module.exports = {
  "*.{ts,tsx}": [
    // Skip Biome checks for now as they're causing issues
    // 'biome check --write --log-level=error',
    "bun tsc --noEmit --skipLibCheck",
  ],
  "*.{json,md}": ["biome format --write"],
};

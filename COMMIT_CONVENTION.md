# Commit Convention

## Format

```
<emoji> <type>: <subject>
```

## Emoji Types

| Emoji | Type     | Description                        |
| ----- | -------- | ---------------------------------- |
| ✨    | feat     | New feature                        |
| 🐛    | fix      | Bug fix                            |
| 📚    | docs     | Documentation changes              |
| 💎    | style    | Code style/formatting              |
| ♻️    | refactor | Code refactoring                   |
| ⚡    | perf     | Performance improvements           |
| 🧪    | test     | Adding or updating tests           |
| 🔧    | chore    | Build tasks, dependencies, configs |
| 🔒    | security | Security fixes                     |
| 🚀    | deploy   | Deployment related changes         |
| 🎨    | ui       | UI/UX improvements                 |

## Examples

```
✨ feat: add user authentication flow
🐛 fix: resolve API connection timeout issue
📚 docs: update installation instructions
💎 style: format code according to Biome rules
♻️ refactor: simplify data fetching logic
⚡ perf: optimize database queries
🧪 test: add unit tests for auth components
🔧 chore: update dependencies
🔒 security: fix XSS vulnerability in forms
🚀 deploy: configure Vercel deployment
🎨 ui: improve button component design
```

## Tips

- Keep subjects concise (under 50 characters)
- Use imperative mood ("add" not "added")
- No period at the end
- Separate subject from body with a blank line if adding details
- Describe what was changed and why, not how

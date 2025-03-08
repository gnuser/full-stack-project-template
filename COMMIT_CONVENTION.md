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

---

# Branch Naming Convention

## Format

```
<type>/<short-description>
```

## Branch Types

| Type     | Description                        |
| -------- | ---------------------------------- |
| feat     | New feature                        |
| fix      | Bug fix                            |
| docs     | Documentation changes              |
| style    | Code style/formatting              |
| refactor | Code refactoring                   |
| perf     | Performance improvements           |
| test     | Adding or updating tests           |
| chore    | Build tasks, dependencies, configs |
| security | Security fixes                     |

## Examples

```
feat/user-authentication
fix/api-timeout
docs/installation-guide
style/biome-formatting
refactor/data-fetching
perf/optimize-queries
test/auth-components
chore/update-deps
security/fix-xss
```

## Tips

- Use lowercase for all branch names
- Use hyphens to separate words in the description
- Keep branch names concise but descriptive
- Include issue/ticket numbers when applicable (e.g., `feat/user-auth-#123`)

---

# Pull Request Convention

## PR Title Format

```
<emoji> <type>: <subject>
```

_Same format as commit messages_

## PR Description Template

```
## Description
Brief description of the changes

## Changes
- Change 1
- Change 2
- Change 3

## Screenshots
(if applicable)

## Testing
How these changes were tested

## Related Issues
Closes #issue_number
```

## Example PR Titles

```
✨ feat: implement user authentication flow
🐛 fix: resolve API connection timeout issue
♻️ refactor: simplify data fetching logic
```

## PR Guidelines

- Create focused PRs that address a single concern
- Keep PRs reasonably sized (under 400 lines when possible)
- Add meaningful comments on complex logic
- Make sure all tests pass before requesting review
- Request review from appropriate team members
- Address reviewer comments promptly

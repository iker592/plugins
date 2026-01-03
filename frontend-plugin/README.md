# Frontend Plugin

Comprehensive frontend development plugin for TypeScript, React, and Vite projects using Bun.

## Features

- **bun-vite-react Skill**: Complete workflow for Bun + Vite + React + TypeScript development
  - Verification scripts (ESLint, Prettier, TypeScript, Vitest)
  - Pre-commit hooks setup
  - Configuration templates
  - CI/CD templates
  - Best practices and troubleshooting

- **Code Reviewer Agent**: Automated code review for React/TypeScript projects
  - TypeScript type safety analysis
  - React best practices validation
  - Performance optimization suggestions
  - Accessibility (a11y) checks
  - Security issue detection

## Installation

```bash
https://github.com/iker592/plugins/frontend-plugin
```

Or clone locally:

```bash
git clone https://github.com/iker592/plugins.git
# Add frontend-plugin path to Claude Code settings
```

## Usage

### bun-vite-react Skill

Automatically activates when working with Bun projects (`bun.lockb`) or Vite projects (`vite.config.ts`).

**Manual triggering**:
- "Set up a new Bun + Vite + React project"
- "Verify my TypeScript code"
- "Configure pre-commit hooks for my React project"
- "Run all checks on my frontend code"

### Code Reviewer Agent

Request code review:
- "Review this React component for best practices"
- "Check my TypeScript types"
- "Analyze this code for performance issues"
- "Review for accessibility concerns"

## Components

- **Skills**: `bun-vite-react/`
- **Agents**: `react-ts-reviewer.md`

## License

MIT License - see [LICENSE](LICENSE) file for details.

---
name: bun-vite-react
description: This skill should be used when working with Bun projects (bun.lockb file present), Vite projects (vite.config.ts file present), or when the user asks to "set up a Bun + Vite + React project", "verify my TypeScript code", "configure pre-commit hooks for React", "run frontend checks", "create a React + TypeScript app", or mentions Bun, Vite, React, or TypeScript development workflows. Provides comprehensive guidance for building, linting, formatting, type checking, and testing React applications using Bun as the runtime and package manager with Vite as the build tool.
version: 0.1.0
---

# Bun + Vite + React + TypeScript Development

Comprehensive toolkit for building, verifying, and deploying modern React applications using Bun, Vite, and TypeScript.

## Quick Start

### New Project Setup

Initialize a new project using Vite's create command with Bun:

```bash
# Create new project
bun create vite my-app --template react-ts
cd my-app

# Install dependencies
bun install

# Copy configuration templates (optional - for enhanced setup)
# Templates available in skill assets/

# Start development server
bun run dev
```

### Existing Project Integration

Add verification workflow to existing Bun + Vite + React projects:

```bash
# Install dev dependencies
bun add -d eslint prettier typescript vitest husky

# Copy verification scripts
# Available in scripts/verify.ts and scripts/setup-precommit.ts

# Set up pre-commit hooks
bun run scripts/setup-precommit.ts

# Run verification
bun run scripts/verify.ts
```

## Core Workflows

### 1. Project Initialization

Use Vite's official create command for best results:

```bash
# React + TypeScript (recommended)
bun create vite my-app --template react-ts

# React + TypeScript + SWC (faster)
bun create vite my-app --template react-swc-ts

# Install dependencies
cd my-app
bun install
```

**What gets created:**
- Vite configuration
- TypeScript configuration
- Basic React app structure
- Development server setup

### 2. Verification Workflow

Run comprehensive code quality checks:

```bash
# Run all checks (lint, format, type check, test)
bun run scripts/verify.ts

# Auto-fix linting issues
bun run scripts/verify.ts --fix

# Auto-format code
bun run scripts/verify.ts --format

# Skip specific checks
bun run scripts/verify.ts --skip-lint --skip-type-check

# Adjust coverage threshold
bun run scripts/verify.ts --min-coverage 90

# Run without coverage
bun run scripts/verify.ts --no-coverage
```

**Script:** `scripts/verify.ts` - Orchestrates ESLint, Prettier, TypeScript compiler, and Vitest with colored output and summary.

**Checks performed:**
1. ESLint - Code linting
2. Prettier - Code formatting
3. TypeScript - Type checking
4. Vitest - Tests with coverage

### 3. Pre-commit Hooks Setup

Automate quality checks before commits:

```bash
# Full setup (installs husky, configures hooks)
bun run scripts/setup-precommit.ts

# Hooks will run verification on git commit
```

**Script:** `scripts/setup-precommit.ts`

**What it does:**
- Installs husky as dev dependency
- Initializes husky configuration
- Creates pre-commit hook that runs verification
- Adds verify script to package.json

### 4. CI/CD Integration

#### GitHub Actions

Copy template to `.github/workflows/ci.yml`:

```bash
mkdir -p .github/workflows
cp assets/github-actions-ci.yml.template .github/workflows/ci.yml
```

**Features:**
- Runs on push and pull requests
- ESLint, Prettier, TypeScript checks
- Vitest with coverage
- Build verification
- Coverage upload to Codecov

#### GitLab CI

Template available in `assets/gitlab-ci.yml.template` for GitLab pipelines.

### 5. Docker Deployment

Use multi-stage Dockerfile for production:

```bash
# Copy Dockerfile
cp assets/Dockerfile.template Dockerfile

# Build image
docker build -t my-app:latest .

# Run container
docker run -p 80:80 my-app:latest
```

**Template features:**
- Multi-stage build (builder + nginx)
- Optimized for production
- Health checks
- Static file serving with nginx

## Tool Configuration

### Bun

**Package manager and runtime:**
```bash
# Install dependencies
bun install

# Add dependency
bun add react-router-dom

# Add dev dependency
bun add -d @testing-library/react

# Run scripts
bun run dev
bun run build
bun test
```

### ESLint

Linting with TypeScript and React support.

**Configuration:** `assets/eslint.config.js.template`

**Key features:**
- TypeScript ESLint integration
- React hooks rules
- React Refresh support

**Commands:**
```bash
bun run lint
bun run lint:fix
```

### Prettier

Code formatting with opinionated defaults.

**Configuration:** `assets/.prettierrc.template`

**Settings:**
- Single quotes
- 100 char line width
- 2 space indentation
- Trailing commas ES5

**Commands:**
```bash
bun run format:check
bun run format
```

### TypeScript

Strict type checking for React applications.

**Configuration:** `assets/tsconfig.json.template`

**Key settings:**
- Strict mode enabled
- React JSX transform
- Bundler module resolution
- No unchecked indexed access

**Commands:**
```bash
bun run type-check
```

### Vitest

Testing framework with built-in coverage.

**Configuration:** `assets/vitest.config.ts.template` or `assets/vite.config.ts.template`

**Key features:**
- jsdom environment for React components
- Coverage with v8 provider
- 80% coverage threshold
- Test globals enabled

**Commands:**
```bash
bun test                    # Watch mode
bun run test:run           # Run once
bun run test:coverage      # With coverage
```

### Vite

Fast build tool and dev server.

**Configuration:** `assets/vite.config.ts.template`

**Features:**
- React SWC plugin for fast refresh
- Optimized for React development
- Lightning-fast HMR

**Commands:**
```bash
bun run dev        # Development server
bun run build      # Production build
bun run preview    # Preview build locally
```

## Configuration Templates

All templates in `assets/` directory:

- `package.json.template` - Dependencies and scripts
- `tsconfig.json.template` - TypeScript configuration
- `vite.config.ts.template` - Vite with React SWC
- `vitest.config.ts.template` - Vitest with coverage
- `eslint.config.js.template` - ESLint flat config
- `.prettierrc.template` - Prettier settings
- `github-actions-ci.yml.template` - GitHub Actions
- `Dockerfile.template` - Multi-stage Docker build
- `gitignore.template` - Frontend .gitignore

## Best Practices

See `references/best-practices.md` for:
- Bun commands reference
- React component patterns
- Custom hooks examples
- State management (useState, useReducer, Context)
- TypeScript best practices
- Testing patterns
- Performance optimization
- Common libraries (React Router, Next.js)
- Security guidelines
- Build optimization

## Troubleshooting

See `references/troubleshooting.md` for solutions to:
- Bun installation and usage
- TypeScript configuration
- ESLint errors
- Vite build issues
- Vitest test problems
- Performance optimization
- Common error messages
- Debug mode

## Common Tasks

### Add New Dependency

```bash
# Production
bun add package-name

# Development
bun add -d package-name
```

### Update Dependencies

```bash
bun update
```

### Run Single Check

```bash
bun run lint
bun run format:check
bun run type-check
bun test
```

### Fix All Issues

```bash
bun run scripts/verify.ts --fix --format
```

## Integration Notes

### IDE Setup

**VS Code:**
- Install ESLint extension
- Install Prettier extension
- Enable format on save
- Configure to use workspace TypeScript

**WebStorm:**
- Enable ESLint
- Enable Prettier
- Configure TypeScript service
- Use Bun as package manager

### Verify vs Pre-commit

- **Pre-commit hooks**: Run automatically on `git commit`, fast checks on changed files
- **Verify script**: Run manually or in CI, comprehensive checks on entire codebase

Use both for best results.

## Tips

1. **Use templates**: Copy configuration templates as starting point
2. **Run verification**: Check code quality before committing
3. **Configure IDE**: Set up ESLint, Prettier, TypeScript in editor
4. **Enable husky**: Automate checks with pre-commit hooks
5. **Check coverage**: Aim for 80%+ test coverage
6. **Use SWC**: Faster than Babel for React refresh

## Additional Resources

For detailed information, consult:

- **`references/best-practices.md`** - Comprehensive patterns and examples
- **`references/troubleshooting.md`** - Common issues and solutions
- **`scripts/verify.ts`** - Full verification workflow
- **`scripts/setup-precommit.ts`** - Automated hook setup

# Troubleshooting Guide

## Bun Issues

### Command not found

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Add to PATH
export PATH="$HOME/.bun/bin:$PATH"

# Reload shell
source ~/.bashrc  # or ~/.zshrc
```

### Lock file conflicts

```bash
# Delete and regenerate
rm bun.lockb
bun install
```

## TypeScript Issues

### Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
```

### Type errors in node_modules

```tsconfig
{
  "compilerOptions": {
    "skipLibCheck": true  // Skip type checking in node_modules
  }
}
```

## ESLint Issues

### Parse errors

Check `eslint.config.js` has correct parser configuration for TypeScript.

### False positives

```typescript
// Disable for line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = response;

// Disable for file
/* eslint-disable @typescript-eslint/no-explicit-any */
```

## Vite Issues

### HMR not working

Clear Vite cache:
```bash
rm -rf node_modules/.vite
bun run dev
```

### Build failures

Check for:
- TypeScript errors: `bun run type-check`
- Missing dependencies
- Circular dependencies

## Vitest Issues

### Tests not found

Check `vitest.config.ts`:
```typescript
{
  test: {
    globals: true,
    environment: 'jsdom',
  }
}
```

### Import errors in tests

Add to test setup file:
```typescript
// src/test/setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

## Performance Issues

### Slow builds

1. Use SWC plugin: `@vitejs/plugin-react-swc`
2. Reduce bundle size with code splitting
3. Check for circular dependencies

### Slow tests

1. Use `vi.mock()` to mock expensive operations
2. Run tests in parallel (default in Vitest)
3. Use `--run` for CI to skip watch mode

## Common Error Messages

**"Cannot find module 'X'"**
- Run `bun install`
- Check import path is correct
- Verify package in dependencies

**"Unexpected token"**
- Check file has correct extension (`.ts`, `.tsx`)
- Verify Babel/SWC config for JSX

**"React is not defined"**
- With new JSX transform, no need to import React
- Check `tsconfig.json`: `"jsx": "react-jsx"`

**"Module has no exported member"**
- Check import matches export
- Verify type definitions installed

## Debug Mode

```bash
# Verbose Vite output
bun run dev --debug

# Verbose test output
bun test --reporter=verbose
```

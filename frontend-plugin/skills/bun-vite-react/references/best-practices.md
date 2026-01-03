# Bun + Vite + React + TypeScript Best Practices

## Project Initialization

### Creating a New Project

Use Vite's create command with Bun:

```bash
bun create vite my-app --template react-ts
cd my-app
bun install
```

**Template options:**
- `react-ts` - React + TypeScript (recommended)
- `react` - React + JavaScript
- `react-swc-ts` - React + TypeScript + SWC (faster)

### Installing Dependencies

```bash
# Install dependencies
bun install

# Add production dependency
bun add react-router-dom

# Add dev dependency
bun add -d vitest

# Remove dependency
bun remove package-name

# Update dependencies
bun update
```

## Bun Commands Reference

### Development

```bash
# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Code Quality

```bash
# Lint
bun run lint

# Lint with auto-fix
bun run lint:fix

# Format check
bun run format:check

# Format code
bun run format

# Type check
bun run type-check
```

### Testing

```bash
# Run tests in watch mode
bun test

# Run tests once
bun run test:run

# Run with coverage
bun run test:coverage

# Run specific test file
bun test src/components/Button.test.tsx
```

### Verification

```bash
# Run all checks
bun run verify
```

## React Best Practices

### Component Patterns

**Functional Components (Preferred):**
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

**Custom Hooks:**
```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### State Management

**useState for local state:**
```typescript
const [count, setCount] = useState(0);
```

**useReducer for complex state:**
```typescript
type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return 0;
  }
}

const [count, dispatch] = useReducer(counterReducer, 0);
```

**Context for shared state:**
```typescript
interface ThemeContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

## TypeScript Best Practices

### Type Safety

**Strict type checking:**
```typescript
// Enable in tsconfig.json
"strict": true,
"noUncheckedIndexedAccess": true
```

**Proper typing:**
```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

const user: User = fetchUser();

// Avoid
const user: any = fetchUser(); // ❌ Don't use any
```

### Generic Types

```typescript
function identity<T>(value: T): T {
  return value;
}

// Array utilities
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

## Testing Best Practices

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## Performance Optimization

### React.memo

```typescript
const MemoizedComponent = memo(function ExpensiveComponent({ data }: Props) {
  // Expensive rendering logic
  return <div>{/* ... */}</div>;
});
```

### useMemo

```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

### useCallback

```typescript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## Common Libraries

### React Router

```bash
bun add react-router-dom
```

```typescript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Next.js (App Router)

```bash
bunx create-next-app@latest my-app
cd my-app
bun install
```

**App Router structure:**
```
app/
├── layout.tsx
├── page.tsx
└── about/
    └── page.tsx
```

## Security Best Practices

### Avoid XSS

```typescript
// ❌ Dangerous
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Safe
<div>{userInput}</div>
```

### Sanitize User Input

```typescript
import DOMPurify from 'dompurify';

const cleanHTML = DOMPurify.sanitize(userHTML);
```

## Build Optimization

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Tree Shaking

Vite automatically tree-shakes unused code. Use named exports:

```typescript
// ✅ Good for tree-shaking
export { Button, Input, Select };

// ❌ Less optimal
export default { Button, Input, Select };
```

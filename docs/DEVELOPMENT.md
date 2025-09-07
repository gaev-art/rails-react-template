# Development Guide

## Overview

This guide provides detailed information for developers working with the React Starter Kit, including setup instructions, development workflows, coding standards, and best practices.

## Quick Start

### Prerequisites Check
Before starting development, ensure you have the correct versions:

```bash
# Check versions
ruby --version    # Should be 3.4.5
node --version    # Should be 22.18.0
npm --version     # Should be compatible with Node 22.x
```

### Initial Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd react-starter-kit

# 2. Install Ruby dependencies
bundle install

# 3. Install Node.js dependencies
npm install

# 4. Set up Git hooks
npm run prepare

# 5. Run initial checks
npm run check:all
```

### Development Server

```bash
# Start development server (Rails + Vite)
bin/dev

# Alternative: Start servers individually
# Terminal 1: Rails server
bundle exec rails server

# Terminal 2: Vite dev server
npm run dev
```

The application will be available at:
- **Rails server**: http://localhost:3000
- **Vite HMR**: http://localhost:3036 (internal)

## Development Workflow

### Daily Development

1. **Start your day**
   ```bash
   git pull origin main
   npm install  # If package.json changed
   bundle install  # If Gemfile changed
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Development cycle**
   ```bash
   # Start dev servers
   bin/dev

   # Make changes...
   # Check types and lint
   npm run check:all

   # Commit changes (hooks will run automatically)
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Before pushing**
   ```bash
   # Final validation
   npm run ci

   # Push changes
   git push origin feature/your-feature-name
   ```

### Git Hooks & Code Quality

The project uses **Husky** and **lint-staged** for automated quality checks:

**Pre-commit hooks automatically run:**
- Biome linting and formatting
- TypeScript type checking
- Only on staged files for performance

**Commit message format:**
```bash
# Conventional commits format
type(scope): description

# Examples
feat: add user authentication
fix: resolve theme switching bug
docs: update API documentation
style: format components code
refactor: reorganize component structure
test: add button component tests
```

## Code Standards

### TypeScript Guidelines

#### 1. Strict Type Safety
```typescript
// ✅ Good - explicit types
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

const fetchUser = async (id: string): Promise<User> => {
  // implementation
}

// ❌ Avoid - any types
const fetchUser = async (id: any): Promise<any> => {
  // implementation
}
```

#### 2. Component Props
```typescript
// ✅ Good - defined interface
interface ButtonProps {
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'sm' | 'default' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export function Button({ variant = 'default', size = 'default', children, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }))} {...props}>{children}</button>
}

// ❌ Avoid - inline types
export function Button(props: {
  variant?: string
  children: any
  onClick?: any
}) {
  // implementation
}
```

#### 3. Custom Hooks
```typescript
// ✅ Good - typed hook
interface UseThemeReturn {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  isInitialized: boolean
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isInitialized, setIsInitialized] = useState(false)

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  return { theme, toggleTheme, isInitialized }
}
```

### React Best Practices

#### 1. Component Structure
```typescript
// ✅ Good - consistent component structure
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  // props interface
}

export function ComponentName({ prop1, prop2 }: Props) {
  // 1. Hooks
  const [state, setState] = useState('')

  // 2. Effects
  useEffect(() => {
    // side effects
  }, [])

  // 3. Callbacks
  const handleClick = useCallback(() => {
    // handler logic
  }, [])

  // 4. Early returns
  if (!prop1) return null

  // 5. Render
  return (
    <Card>
      <CardHeader>
        <CardTitle>{prop1}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClick}>{prop2}</Button>
      </CardContent>
    </Card>
  )
}
```

#### 2. Event Handlers
```typescript
// ✅ Good - proper event typing
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  // handler logic
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value)
}

// ✅ Good - callback handlers
const handleUserSelect = useCallback((userId: string) => {
  onUserSelect(userId)
}, [onUserSelect])
```

#### 3. Conditional Rendering
```typescript
// ✅ Good - clear conditional rendering
return (
  <div>
    {isLoading && <Spinner />}
    {error && <Alert variant="destructive">{error.message}</Alert>}
    {data && (
      <div>
        {data.items.map(item => (
          <Card key={item.id}>
            {/* content */}
          </Card>
        ))}
      </div>
    )}
  </div>
)

// ❌ Avoid - complex ternary nesting
return (
  <div>
    {isLoading ? <Spinner /> : error ? <Alert>{error.message}</Alert> : data ? <Content data={data} /> : null}
  </div>
)
```

### Styling Guidelines

#### 1. Tailwind CSS Classes
```typescript
// ✅ Good - organized class names
<div className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground">
  <h2 className="text-lg font-semibold">Title</h2>
  <Button variant="outline" size="sm">Action</Button>
</div>

// ✅ Good - use clsx for conditional classes
const buttonClasses = clsx(
  'px-4 py-2 rounded-md font-medium',
  'transition-colors duration-200',
  {
    'bg-primary text-primary-foreground': variant === 'primary',
    'bg-secondary text-secondary-foreground': variant === 'secondary',
    'opacity-50 cursor-not-allowed': disabled,
  }
)
```

#### 2. CSS Variables
```typescript
// ✅ Good - use semantic color variables
<div className="bg-background text-foreground border-border">
  <div className="bg-primary text-primary-foreground">Primary content</div>
  <div className="bg-muted text-muted-foreground">Muted content</div>
</div>

// ❌ Avoid - hardcoded colors that break theming
<div className="bg-white text-black border-gray-200">
  <div className="bg-blue-500 text-white">Content</div>
</div>
```

#### 3. Responsive Design
```typescript
// ✅ Good - mobile-first responsive design
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map(item => (
    <Card key={item.id} className="transition-transform hover:scale-105">
      {/* card content */}
    </Card>
  ))}
</div>
```

## Project Structure

### File Organization

```
app/frontend/
├── components/
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── App.tsx          # Main app component
├── pages/               # Page components
│   ├── SimplePage.tsx
│   ├── ComponentsPage.tsx
│   └── AnimatedPage.tsx
├── hooks/               # Custom hooks
│   └── useTheme.ts
├── lib/                 # Utility functions
│   └── utils.ts
├── types/               # TypeScript definitions
│   └── vite-env.d.ts
└── entrypoints/         # Vite entry points
    ├── application.ts
    └── application.css
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with "use" prefix (`useTheme.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`User.ts`, `ApiResponse.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Import Organization

```typescript
// 1. React imports
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Third-party libraries
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

// 3. Internal components (with @ alias)
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// 4. Hooks and utilities
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

// 5. Types
import type { User } from '@/types/user'
```

## Development Tools

### TypeScript Configuration

The project uses multiple TypeScript configs:

- **`tsconfig.json`** - Project references and path aliases
- **`tsconfig.app.json`** - Application code configuration
- **`tsconfig.node.json`** - Node.js tooling configuration

#### Path Aliases
```typescript
// Use @ alias for clean imports
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

// Instead of relative paths
import { Button } from '../../components/ui/button'
import { useTheme } from '../hooks/useTheme'
```

### Biome Configuration

Biome handles both linting and formatting:

```bash
# Check all files
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format all files
npm run format

# CI validation
npm run ci
```

Key Biome features:
- **Fast performance** - Much faster than ESLint + Prettier
- **Consistent formatting** - Opinionated code style
- **TypeScript support** - Built-in TypeScript understanding
- **Git integration** - Works with lint-staged

### Vite Configuration

Key Vite features in this project:
- **React plugin** for JSX transformation
- **Tailwind CSS plugin** for styling
- **Ruby plugin** for Rails integration
- **HMR** on localhost:3036
- **SSR support** for production builds

## Testing Guidelines

### Current Testing Setup

The project currently includes:
- **TypeScript compilation** checking
- **Biome linting** for code quality
- **Git hooks** for pre-commit validation

### Recommended Testing Additions

#### 1. Unit Testing Setup
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @types/jest
```

#### 2. Component Testing Example
```typescript
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border', 'border-input')
  })
})
```

#### 3. Hook Testing Example
```typescript
// __tests__/useTheme.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '@/hooks/useTheme'

describe('useTheme Hook', () => {
  it('initializes with light theme', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
  })
})
```

## Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run preview

# Check for unused dependencies
npx depcheck
```

### Performance Best Practices

#### 1. Component Optimization
```typescript
// ✅ Good - memoize expensive components
const ExpensiveComponent = memo(({ data }: { data: ComplexData }) => {
  const processedData = useMemo(() => {
    return expensiveProcessing(data)
  }, [data])

  return <div>{processedData}</div>
})

// ✅ Good - optimize re-renders
const ParentComponent = () => {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<User>()

  // Memoize callback to prevent child re-renders
  const handleUserUpdate = useCallback((newUser: User) => {
    setUser(newUser)
  }, [])

  return (
    <div>
      <Counter count={count} onChange={setCount} />
      <UserProfile user={user} onUpdate={handleUserUpdate} />
    </div>
  )
}
```

#### 2. Bundle Optimization
```typescript
// ✅ Good - lazy load pages
const AnimatedPage = lazy(() => import('@/pages/AnimatedPage'))
const ComponentsPage = lazy(() => import('@/pages/ComponentsPage'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SimplePage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/animated" element={<AnimatedPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
```

## Debugging

### Development Debugging

#### 1. Browser Dev Tools
- **React DevTools** - Component tree and props inspection
- **Console** - Debug logs and errors
- **Network tab** - API requests and asset loading
- **Performance tab** - Component rendering performance

#### 2. TypeScript Errors
```bash
# Check types in real-time
npm run check

# Specific file type checking
npx tsc --noEmit app/frontend/components/ui/button.tsx
```

#### 3. Vite Debugging
```bash
# Debug Vite build
npm run build -- --debug

# Vite dev server with debug info
VITE_DEBUG=1 npm run dev
```

### Common Issues & Solutions

#### 1. HMR Not Working
```bash
# Check if Vite dev server is running
lsof -i :3036

# Restart development servers
pkill -f "vite\|rails"
bin/dev
```

#### 2. Type Errors After Dependency Updates
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run check
```

#### 3. Style Issues
```bash
# Check Tailwind compilation
npm run build
# Look for CSS in dist/ folder

# Verify CSS variables in browser dev tools
# Check :root and [data-theme] selectors
```

## Deployment

### Production Build

```bash
# Build for production
npm run build
npm run check:all

# Docker build
docker build -t react-starter-kit .

# SSR build
docker build -f Dockerfile-ssr -t react-starter-kit:ssr .
```

### Environment Variables

Create `.env.production` for production settings:
```bash
RAILS_ENV=production
NODE_ENV=production
RAILS_MASTER_KEY=your_master_key_here
```

### Deployment Checklist

- [ ] All tests pass
- [ ] TypeScript compilation successful
- [ ] Linting passes
- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Assets precompiled
- [ ] Health check endpoint responds

## Contributing

### Pull Request Process

1. **Create feature branch** from `main`
2. **Implement changes** following code standards
3. **Add/update tests** if applicable
4. **Update documentation** if needed
5. **Ensure all checks pass** (`npm run ci`)
6. **Create pull request** with clear description
7. **Address review feedback**
8. **Merge after approval**

### Code Review Guidelines

When reviewing code, check for:
- **TypeScript** - Proper typing and no `any` usage
- **Performance** - Unnecessary re-renders or heavy computations
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Styling** - Consistent use of theme colors and spacing
- **Testing** - Adequate test coverage for new features

---

This development guide should help you work effectively with the React Starter Kit. For questions or improvements to this guide, please open an issue or submit a pull request.

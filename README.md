# React Starter Kit with Rails Backend

**A modern full-stack starter template combining Ruby on Rails with React 19, TypeScript, Vite, and Tailwind CSS.**

## 🚀 Project Overview

This starter kit provides a production-ready foundation for building modern web applications with:
- **Rails** as a robust backend API and asset host
- **React 19** for a rich, interactive frontend
- **TypeScript** for type safety and better development experience
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** with shadcn/ui components for beautiful, consistent UI
- **SSR support** for improved SEO and performance

## ✨ Key Features

### Frontend Stack
- 🎯 **React 19** - Latest React with enhanced performance
- 📝 **TypeScript 5.7** - Full type safety across the codebase
- ⚡ **Vite 7.0** - Ultra-fast development server and builds
- 🎨 **Tailwind CSS 4.0** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible component library
- 🌗 **Theme Support** - Built-in dark/light mode switching
- 📱 **Responsive Design** - Mobile-first approach

### Backend Stack
- 💎 **Ruby on Rails** - Mature, convention-over-configuration framework
- 🔧 **Modern Rails** - Latest Rails with optimized configuration
- 🐳 **Docker Ready** - Production-ready containerization
- 🔒 **Security First** - CSP, modern browser requirements

### Development Experience
- 🔍 **Biome** - Fast linting and formatting
- 🪝 **Husky** - Git hooks for code quality
- 🧪 **Vitest** - Modern testing framework with React Testing Library
- 📦 **Hot Module Replacement** - Instant feedback during development
- ✅ **Type Checking** - Comprehensive TypeScript validation
- 🎯 **Path Aliases** - Clean import statements with `@/` prefix
- 📊 **Test Coverage** - Comprehensive coverage reporting

## 📋 Prerequisites

- **Ruby**: 3.4+ (tested with 3.4.5)
- **Node.js**: 22+ (tested with 22.18.0)
- **npm** or **pnpm**
- **Docker** (for production deployment)

> **Note**: Check the latest tested versions in [CHANGELOG.md](CHANGELOG.md)

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd react-starter-kit

# Install Ruby gems
bundle install

# Install Node.js dependencies
npm install
```

### 2. Development Server

```bash
# Start the development server (Rails + Vite)
bin/dev
```

This will start:
- Rails server on `http://localhost:3000`
- Vite dev server with HMR on port `3036`

### 3. Available Scripts

```bash
# Type checking
npm run check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format

# Testing
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage report
npm run test:ui       # Run tests with Vitest UI

# Full check (lint + type check)
npm run check:all

# CI validation
npm run ci
```

### 4. API Development Example

```bash
# Future API endpoints (see docs/API.md for full implementation)
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer your-jwt-token"

curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{"user": {"name": "John Doe", "email": "john@example.com"}}'

# Health check endpoint (currently available)
curl http://localhost:3000/up
```

## 🏗️ Project Architecture

### Directory Structure

```
react-starter-kit/
├── app/
│   ├── controllers/           # Rails controllers
│   ├── frontend/             # React application
│   │   ├── components/       # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── App.tsx      # Main app component
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── entrypoints/     # Vite entry points
│   └── models/              # Rails models
├── config/                  # Rails configuration
├── public/                  # Static assets
├── spec/                    # Test files
└── [config files]           # Various config files
```

### Frontend Architecture

- **SPA (Single Page Application)** structure with React Router
- **Component-based architecture** with reusable UI components
- **Custom hooks** for shared logic (e.g., theme management)
- **TypeScript** for type safety and better IDE support
- **CSS Variables** for theme customization

### Backend Integration

- **Rails as SPA host** - serves the React application
- **API-ready** - can easily add API endpoints for data
- **Modern browser support** - optimized for current web standards
- **Asset pipeline** - Vite handles all frontend assets

## 🧩 Available Components

The project includes a comprehensive set of shadcn/ui components:

### Core Components
- **Button** - Multiple variants and sizes
- **Card** - Flexible content containers
- **Badge** - Status and category indicators
- **Avatar** - User profile images
- **Alert** - Notification messages

### Form Components
- **Input** - Text input fields
- **Textarea** - Multi-line text input
- **Checkbox** - Boolean selection
- **Switch** - Toggle controls
- **Select** - Dropdown selection
- **Slider** - Range input
- **Label** - Form field labels

### Layout Components
- **Separator** - Content dividers
- **Tabs** - Tabbed interfaces
- **Dialog** - Modal windows
- **Popover** - Floating content
- **Dropdown Menu** - Context menus

### Interactive Components
- **Progress** - Progress indicators
- **Calendar** - Date selection
- **Animated Components** - Custom animations

## 🎨 Theming System

### Built-in Theme Support

The project includes a comprehensive theming system:

```typescript
// Hook usage
const { theme, toggleTheme, isInitialized } = useTheme()

// Theme switching
<Button onClick={toggleTheme}>
  Switch to {theme === 'light' ? 'dark' : 'light'} theme
</Button>
```

### Color System

All colors use CSS variables for automatic theme adaptation:

- `--background` / `--foreground` - Main background and text
- `--primary` / `--primary-foreground` - Primary brand colors
- `--secondary` / `--secondary-foreground` - Secondary colors
- `--muted` / `--muted-foreground` - Muted/subtle colors
- `--accent` / `--accent-foreground` - Accent colors
- `--destructive` / `--destructive-foreground` - Error/danger colors
- `--border` / `--input` / `--ring` - Border and focus colors

## 📱 Pages & Navigation

### Available Pages

1. **Simple Page** (`/`) - Component showcase and theme demo
2. **Components Page** (`/components`) - Complete component library
3. **Animated Page** (`/animated`) - Advanced animations and effects

### Navigation

The app uses React Router for client-side routing:

```typescript
// App.tsx
<Router>
  <Routes>
    <Route path='/' element={<SimplePage />} />
    <Route path='/components' element={<ComponentsPage />} />
    <Route path='/animated' element={<AnimatedPage />} />
  </Routes>
</Router>
```

## 🐳 Production Deployment

### Docker Build

```bash
# Standard build
docker build -t react-starter-kit .

# SSR build
docker build -f Dockerfile-ssr -t react-starter-kit:ssr .
```

### Running in Production

```bash
docker run -d -p 80:80 \
  -e RAILS_MASTER_KEY=<your_master_key> \
  --name react-starter-kit \
  react-starter-kit
```

### Environment Variables

- `RAILS_MASTER_KEY` - Required for Rails credentials
- `SECRET_KEY_BASE` - Rails secret key (auto-generated if not provided)

## 🔧 Configuration Files

### Key Configuration

- **`vite.config.ts`** - Vite build configuration with Rails integration
- **`tailwind.config.js`** - Tailwind CSS with shadcn/ui setup
- **`tsconfig.json`** - TypeScript configuration with path aliases
- **`biome.json`** - Linting and formatting rules
- **`package.json`** - Dependencies and scripts

### Rails Integration

- **`config/routes.rb`** - SPA fallback routing
- **`app/controllers/application_controller.rb`** - Main controller
- **Modern browser requirement** - Optimized for current standards

## 🧪 Testing

The project includes a comprehensive testing setup with **Vitest** and **React Testing Library**:

```bash
# Run tests in watch mode (development)
npm run test

# Run all tests once
npm run test:run

# Generate coverage report
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

### Testing Features
- **Component Testing** - All UI components have comprehensive unit tests
- **Hook Testing** - Custom hooks like `useTheme` are thoroughly tested
- **Test Utilities** - Helper functions for common testing patterns
- **Coverage Reporting** - Detailed coverage reports with thresholds
- **Mock Support** - Built-in mocking for localStorage, routers, and more

### Writing Tests

```typescript
// Component test example
import { render, screen, fireEvent } from '../../test-utils'
import { Button } from '@/components/ui/button'

test('button handles click events', () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click me</Button>)

  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## 🎯 Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
```

## 🤝 Contributing

1. **Code Quality**: All code is automatically formatted with Biome
2. **Git Hooks**: Pre-commit hooks ensure code quality
3. **Type Safety**: TypeScript is required for all new code
4. **Component Standards**: Follow shadcn/ui patterns for new components

## 📚 Learning Resources

### Documentation
- [React 19 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Ruby on Rails](https://rubyonrails.org/)

### Key Concepts
- **Component Composition** - Building complex UIs from simple components
- **CSS Variables** - Dynamic theming system
- **TypeScript Integration** - Type-safe React development
- **Vite + Rails** - Modern asset pipeline

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Vite HMR uses port 3036
2. **Type errors**: Run `npm run check` for detailed TypeScript errors
3. **Asset loading**: Ensure Vite dev server is running alongside Rails
4. **Theme issues**: Check CSS variable definitions in global styles

### Development Tips

- Use browser dev tools to inspect CSS variables
- Check terminal for Vite and Rails server outputs
- TypeScript errors are shown in real-time during development
- Hot reload works for most changes without full page refresh

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Architecture Guide](docs/ARCHITECTURE.md)** - System design and patterns
- **[Component Library](docs/COMPONENTS.md)** - UI components with examples
- **[Development Guide](docs/DEVELOPMENT.md)** - Developer workflow and standards
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment strategies
- **[API Documentation](docs/API.md)** - API development framework
- **[Changelog](CHANGELOG.md)** - Version history and updates

## 🤝 Contributing

We welcome contributions! Please see our documentation for:

1. **Code Standards** - Follow TypeScript and React best practices
2. **Git Workflow** - Use conventional commits and proper branching
3. **Testing** - Add tests for new features
4. **Documentation** - Update relevant docs for changes

## 📄 License

## 🔄 Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and migration guides.

---

**Happy coding! 🚀**

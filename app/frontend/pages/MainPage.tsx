import { useId, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from '@/hooks/useTheme'
import { AuthModal } from '../components/auth/AuthModal'
import { UserProfile } from '../components/auth/UserProfile'
import { useAuth } from '../contexts/AuthContext'

// Color palette data for showcase
const colorPalette = [
  {
    name: 'Background',
    variable: '--background',
    className: 'bg-background text-foreground',
    description: 'Main background color',
  },
  {
    name: 'Primary',
    variable: '--primary',
    className: 'bg-primary text-primary-foreground',
    description: 'Primary brand color',
  },
  {
    name: 'Secondary',
    variable: '--secondary',
    className: 'bg-secondary text-secondary-foreground',
    description: 'Secondary UI elements',
  },
  {
    name: 'Muted',
    variable: '--muted',
    className: 'bg-muted text-muted-foreground',
    description: 'Muted background',
  },
  {
    name: 'Accent',
    variable: '--accent',
    className: 'bg-accent text-accent-foreground',
    description: 'Accent color for highlights',
  },
  {
    name: 'Destructive',
    variable: '--destructive',
    className: 'bg-destructive text-destructive-foreground',
    description: 'Error and danger states',
  },
]

export default function MainPage() {
  const { theme, toggleTheme, isInitialized } = useTheme()
  const { isAuthenticated, user } = useAuth()
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const checkboxId = useId()

  if (!isInitialized) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-muted-foreground'>Loading theme...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background text-foreground p-6 space-y-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Header */}
        <header className='text-center space-y-4'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
            React Starter Kit
          </h1>
          <p className='text-muted-foreground text-lg'>
            Modern React + Rails application with theme-aware components
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Badge variant='secondary' className='text-sm'>
              Current theme: {theme}
            </Badge>
            <Button
              onClick={toggleTheme}
              variant='outline'
              size='sm'
              data-testid='theme-toggle'
            >
              Switch to {theme === 'light' ? 'dark' : 'light'} theme
            </Button>
            {!isAuthenticated ? (
              <Button
                onClick={() => setShowAuthModal(true)}
                variant='default'
                size='sm'
              >
                Войти в систему
              </Button>
            ) : (
              <Badge variant='default' className='text-base'>
                Привет, {user?.name}!
              </Badge>
            )}
          </div>
        </header>

        {/* Color Palette Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              🎨 Color Palette
              <Badge variant='outline'>Theme-aware</Badge>
            </CardTitle>
            <CardDescription>
              Semantic color system that automatically adapts to light and dark
              themes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {colorPalette.map((color) => (
                <Card
                  key={color.name}
                  className='transition-all duration-300 hover:scale-105 hover:shadow-lg'
                  data-testid={`color-card-${color.name.toLowerCase()}`}
                  style={{
                    backgroundColor: `hsl(var(--${color.name.toLowerCase()}))`,
                    color: `hsl(var(--${color.name.toLowerCase()}-foreground))`,
                  }}
                >
                  <CardContent className='p-4'>
                    <h3 className='font-semibold text-lg'>{color.name}</h3>
                    <p className='text-sm opacity-90 mb-2'>
                      {color.description}
                    </p>
                    <code className='text-xs font-mono bg-black/10 dark:bg-white/10 px-2 py-1 rounded'>
                      {color.variable}
                    </code>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Component Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              🧩 Basic Components
              <Badge variant='secondary'>Interactive</Badge>
            </CardTitle>
            <CardDescription>
              Essential form components with consistent styling and theme
              support
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Buttons */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold'>Buttons</h3>
              <div className='flex flex-wrap gap-3'>
                <Button data-testid='button-default'>Default</Button>
                <Button variant='secondary' data-testid='button-secondary'>
                  Secondary
                </Button>
                <Button variant='outline' data-testid='button-outline'>
                  Outline
                </Button>
                <Button variant='ghost' data-testid='button-ghost'>
                  Ghost
                </Button>
                <Button variant='destructive' data-testid='button-destructive'>
                  Destructive
                </Button>
                <Button variant='link' data-testid='button-link'>
                  Link
                </Button>
              </div>
            </div>

            {/* Input Field */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold'>Input Field</h3>
              <div className='max-w-md'>
                <Input
                  placeholder='Enter some text...'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  data-testid='input-field'
                />
                {inputValue && (
                  <p className='text-sm text-muted-foreground mt-2'>
                    You typed:{' '}
                    <span className='text-foreground font-medium'>
                      {inputValue}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Checkbox */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold'>Checkbox</h3>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id={checkboxId}
                  checked={isChecked}
                  onCheckedChange={(checked) => setIsChecked(checked === true)}
                  data-testid='checkbox'
                />
                <label
                  htmlFor={checkboxId}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
                >
                  I agree to the terms and conditions
                </label>
              </div>
              {isChecked && (
                <p className='text-sm text-green-600 dark:text-green-400'>
                  ✓ Thank you for agreeing!
                </p>
              )}
            </div>

            {/* Textarea */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold'>Textarea</h3>
              <div className='max-w-md'>
                <Textarea
                  placeholder='Enter a longer message...'
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                  data-testid='textarea'
                />
                {textareaValue && (
                  <p className='text-sm text-muted-foreground mt-2'>
                    Character count:{' '}
                    <span className='text-foreground font-medium'>
                      {textareaValue.length}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              🌙 Theme System
              <Badge variant='outline'>Automatic</Badge>
            </CardTitle>
            <CardDescription>
              Dark and light theme support with system preference detection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-4 border rounded-lg'>
                  <h4 className='font-semibold mb-2'>Current Theme</h4>
                  <p className='text-sm text-muted-foreground mb-2'>
                    Active theme:{' '}
                    <span className='text-foreground font-medium'>{theme}</span>
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Theme preference is automatically saved to localStorage
                  </p>
                </div>
                <div className='p-4 border rounded-lg'>
                  <h4 className='font-semibold mb-2'>Auto Detection</h4>
                  <p className='text-sm text-muted-foreground mb-2'>
                    Respects system color scheme preference
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Uses prefers-color-scheme media query on first visit
                  </p>
                </div>
              </div>
              <div className='bg-muted p-4 rounded-lg'>
                <p className='text-sm text-muted-foreground'>
                  💡 <strong>Tip:</strong> Try switching between light and dark
                  themes to see how all components automatically adapt their
                  colors while maintaining perfect contrast and readability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Profile Section */}
        {isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                👤 User Profile
                <Badge variant='outline'>Authenticated</Badge>
              </CardTitle>
              <CardDescription>
                Your account information and authentication status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfile />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  )
}

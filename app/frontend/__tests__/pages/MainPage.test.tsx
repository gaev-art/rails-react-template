import { beforeEach, describe, expect, it, vi } from 'vitest'
import MainPage from '@/pages/MainPage'
import { fireEvent, render, screen } from '../test-utils'

// Mock the useTheme hook
const mockToggleTheme = vi.fn()
vi.mock('@/hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    toggleTheme: mockToggleTheme,
    isInitialized: true,
  })),
}))

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Loading State', () => {
    it('should show loading state when theme is not initialized', () => {
      const { useTheme } = require('@/hooks/useTheme')
      useTheme.mockReturnValueOnce({
        theme: 'light',
        toggleTheme: mockToggleTheme,
        isInitialized: false,
      })

      render(<MainPage />)

      expect(screen.getByText('Loading theme...')).toBeInTheDocument()
    })
  })

  describe('Page Structure', () => {
    it('should render the main page header', () => {
      render(<MainPage />)

      expect(
        screen.getByRole('heading', { name: /react starter kit/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/modern react \+ rails application/i),
      ).toBeInTheDocument()
    })

    it('should display current theme badge', () => {
      render(<MainPage />)

      expect(screen.getByText('Current theme: light')).toBeInTheDocument()
    })

    it('should render theme toggle button', () => {
      render(<MainPage />)

      const toggleButton = screen.getByTestId('theme-toggle')
      expect(toggleButton).toBeInTheDocument()
      expect(toggleButton).toHaveTextContent('Switch to dark theme')
    })
  })

  describe('Theme Toggle Functionality', () => {
    it('should call toggleTheme when theme toggle button is clicked', () => {
      render(<MainPage />)

      const toggleButton = screen.getByTestId('theme-toggle')
      fireEvent.click(toggleButton)

      expect(mockToggleTheme).toHaveBeenCalledTimes(1)
    })

    it('should show correct button text for dark theme', () => {
      const { useTheme } = require('@/hooks/useTheme')
      useTheme.mockReturnValueOnce({
        theme: 'dark',
        toggleTheme: mockToggleTheme,
        isInitialized: true,
      })

      render(<MainPage />)

      const toggleButton = screen.getByTestId('theme-toggle')
      expect(toggleButton).toHaveTextContent('Switch to light theme')
      expect(screen.getByText('Current theme: dark')).toBeInTheDocument()
    })
  })

  describe('Color Palette Showcase', () => {
    it('should render color palette section', () => {
      render(<MainPage />)

      expect(
        screen.getByRole('heading', { name: /🎨 color palette/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/semantic color system that automatically adapts/i),
      ).toBeInTheDocument()
    })

    it('should render all color cards', () => {
      render(<MainPage />)

      const colorNames = [
        'background',
        'primary',
        'secondary',
        'muted',
        'accent',
        'destructive',
      ]

      colorNames.forEach((colorName) => {
        const colorCard = screen.getByTestId(`color-card-${colorName}`)
        expect(colorCard).toBeInTheDocument()
      })
    })

    it('should display color descriptions', () => {
      render(<MainPage />)

      expect(screen.getByText('Main background color')).toBeInTheDocument()
      expect(screen.getByText('Primary brand color')).toBeInTheDocument()
      expect(screen.getByText('Secondary UI elements')).toBeInTheDocument()
    })
  })

  describe('Component Showcase', () => {
    it('should render component showcase section', () => {
      render(<MainPage />)

      expect(
        screen.getByRole('heading', { name: /🧩 basic components/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/essential form components with consistent styling/i),
      ).toBeInTheDocument()
    })

    it('should render all button variants', () => {
      render(<MainPage />)

      const buttonVariants = [
        'default',
        'secondary',
        'outline',
        'ghost',
        'destructive',
        'link',
      ]

      buttonVariants.forEach((variant) => {
        const button = screen.getByTestId(`button-${variant}`)
        expect(button).toBeInTheDocument()
      })
    })

    it('should render input field', () => {
      render(<MainPage />)

      const input = screen.getByTestId('input-field')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', 'Enter some text...')
    })

    it('should render checkbox', () => {
      render(<MainPage />)

      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(
        screen.getByText('I agree to the terms and conditions'),
      ).toBeInTheDocument()
    })

    it('should render textarea', () => {
      render(<MainPage />)

      const textarea = screen.getByTestId('textarea')
      expect(textarea).toBeInTheDocument()
      expect(textarea).toHaveAttribute(
        'placeholder',
        'Enter a longer message...',
      )
    })
  })

  describe('Interactive Functionality', () => {
    it('should update input value and show typed text', () => {
      render(<MainPage />)

      const input = screen.getByTestId('input-field')
      fireEvent.change(input, { target: { value: 'test input' } })

      expect(input).toHaveValue('test input')
      expect(screen.getByText('You typed:')).toBeInTheDocument()
      expect(screen.getByText('test input')).toBeInTheDocument()
    })

    it('should not show typed text when input is empty', () => {
      render(<MainPage />)

      expect(screen.queryByText('You typed:')).not.toBeInTheDocument()
    })

    it('should handle checkbox state changes', () => {
      render(<MainPage />)

      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).not.toBeChecked()
      expect(
        screen.queryByText('✓ Thank you for agreeing!'),
      ).not.toBeInTheDocument()

      fireEvent.click(checkbox)

      expect(checkbox).toBeChecked()
      expect(screen.getByText('✓ Thank you for agreeing!')).toBeInTheDocument()
    })

    it('should update textarea value and show character count', () => {
      render(<MainPage />)

      const textarea = screen.getByTestId('textarea')
      fireEvent.change(textarea, { target: { value: 'test message' } })

      expect(textarea).toHaveValue('test message')
      expect(screen.getByText('Character count:')).toBeInTheDocument()
      expect(screen.getByText('12')).toBeInTheDocument()
    })

    it('should not show character count when textarea is empty', () => {
      render(<MainPage />)

      expect(screen.queryByText('Character count:')).not.toBeInTheDocument()
    })
  })

  describe('Theme Information Section', () => {
    it('should render theme information section', () => {
      render(<MainPage />)

      expect(
        screen.getByRole('heading', { name: /🌙 theme system/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/dark and light theme support/i),
      ).toBeInTheDocument()
    })

    it('should display current theme information', () => {
      render(<MainPage />)

      expect(screen.getByText('Current Theme')).toBeInTheDocument()
      expect(screen.getByText('Active theme:')).toBeInTheDocument()
      expect(screen.getByText('light')).toBeInTheDocument()
    })

    it('should display auto detection information', () => {
      render(<MainPage />)

      expect(screen.getByText('Auto Detection')).toBeInTheDocument()
      expect(
        screen.getByText(/respects system color scheme preference/i),
      ).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<MainPage />)

      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('React Starter Kit')

      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      expect(h3Elements.length).toBeGreaterThan(0)
    })

    it('should have proper labels for form elements', () => {
      render(<MainPage />)

      const checkbox = screen.getByRole('checkbox')
      const label = screen.getByLabelText('I agree to the terms and conditions')

      expect(checkbox).toBeInTheDocument()
      expect(label).toBeInTheDocument()
    })

    it('should have descriptive test ids for interactive elements', () => {
      render(<MainPage />)

      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
      expect(screen.getByTestId('input-field')).toBeInTheDocument()
      expect(screen.getByTestId('checkbox')).toBeInTheDocument()
      expect(screen.getByTestId('textarea')).toBeInTheDocument()
    })
  })

  describe('Responsive Design Elements', () => {
    it('should have responsive grid classes for color palette', () => {
      render(<MainPage />)

      const colorGrid = screen.getByTestId('color-card-primary').parentElement
      expect(colorGrid).toHaveClass(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
      )
    })

    it('should have responsive layout classes', () => {
      render(<MainPage />)

      const mainContainer = document.querySelector('.max-w-6xl')
      expect(mainContainer).toBeTruthy()
    })
  })
})

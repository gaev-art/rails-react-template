import { type RenderOptions, render } from '@testing-library/react'
import type React from 'react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Custom render function that includes common providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]
}

const AllTheProviders = ({
  children,
  initialEntries = ['/'],
}: {
  children: React.ReactNode
  initialEntries?: string[]
}) => {
  return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
}

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { initialEntries = ['/'], ...renderOptions } = options

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialEntries={initialEntries}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  })
}

// Theme testing utilities
export const getComputedThemeVariables = (element: HTMLElement) => {
  const computedStyle = window.getComputedStyle(element)
  return {
    background: computedStyle.getPropertyValue('--background'),
    foreground: computedStyle.getPropertyValue('--foreground'),
    primary: computedStyle.getPropertyValue('--primary'),
    primaryForeground: computedStyle.getPropertyValue('--primary-foreground'),
    secondary: computedStyle.getPropertyValue('--secondary'),
    secondaryForeground: computedStyle.getPropertyValue(
      '--secondary-foreground',
    ),
    muted: computedStyle.getPropertyValue('--muted'),
    mutedForeground: computedStyle.getPropertyValue('--muted-foreground'),
    accent: computedStyle.getPropertyValue('--accent'),
    accentForeground: computedStyle.getPropertyValue('--accent-foreground'),
    destructive: computedStyle.getPropertyValue('--destructive'),
    destructiveForeground: computedStyle.getPropertyValue(
      '--destructive-foreground',
    ),
    border: computedStyle.getPropertyValue('--border'),
    input: computedStyle.getPropertyValue('--input'),
    ring: computedStyle.getPropertyValue('--ring'),
  }
}

export const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })
  return localStorageMock
}

// Router testing utilities
export const mockNavigate = vi.fn()

// Mock useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Export custom render and utilities
// biome-ignore lint/performance/noBarrelFile: Test utilities need to re-export testing library functions
export * from '@testing-library/react'
export { customRender as render }

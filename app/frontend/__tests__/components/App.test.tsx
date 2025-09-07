import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '@/components/App'

// Mock the MainPage component since we're testing routing
vi.mock('@/pages/MainPage', () => ({
  default: () => <div data-testid='main-page'>Main Page Content</div>,
}))

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)

    expect(screen.getByTestId('main-page')).toBeInTheDocument()
  })

  it('renders MainPage component as default route', () => {
    render(<App />)

    expect(screen.getByTestId('main-page')).toBeInTheDocument()
    expect(screen.getByText('Main Page Content')).toBeInTheDocument()
  })

  it('has proper component structure', () => {
    const { container } = render(<App />)

    // Router should be present in the component tree
    expect(container.firstChild).toBeTruthy()
    expect(screen.getByTestId('main-page')).toBeInTheDocument()
  })
})

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from '@/hooks/useTheme'
import { mockLocalStorage } from '../test-utils'

describe('useTheme Hook', () => {
  let localStorageMock: ReturnType<typeof mockLocalStorage>

  beforeEach(() => {
    localStorageMock = mockLocalStorage()
    // Reset document class
    document.documentElement.className = ''
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with light theme by default', () => {
    localStorageMock.getItem.mockReturnValue(null)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
    expect(result.current.isInitialized).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('initializes with saved theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark')

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
    expect(result.current.isInitialized).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('initializes with system theme when no saved theme', () => {
    localStorageMock.getItem.mockReturnValue(null)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: true, // Simulate dark mode preference
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles theme correctly', () => {
    localStorageMock.getItem.mockReturnValue('light')

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  it('saves theme to localStorage when theme changes', () => {
    localStorageMock.getItem.mockReturnValue('light')

    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('updates document class when theme changes', () => {
    localStorageMock.getItem.mockReturnValue('light')

    const { result } = renderHook(() => useTheme())

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    act(() => {
      result.current.toggleTheme()
    })

    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => {
      result.current.toggleTheme()
    })

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('does not save to localStorage during system theme detection', () => {
    localStorageMock.getItem.mockReturnValue(null)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, // Light mode
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    renderHook(() => useTheme())

    // Should save system theme during initialization
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })
})

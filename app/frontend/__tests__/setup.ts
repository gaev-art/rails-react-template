import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll } from 'vitest'

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// Mock IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    root: Element | Document | null = null
    rootMargin: string = '0px'
    thresholds: ReadonlyArray<number> = []

    constructor(
      _callback: IntersectionObserverCallback,
      _options?: IntersectionObserverInit,
    ) {
      // Initialize properties based on options if provided
      if (_options?.root) this.root = _options.root
      if (_options?.rootMargin) this.rootMargin = _options.rootMargin
      if (_options?.threshold) {
        this.thresholds = Array.isArray(_options.threshold)
          ? _options.threshold
          : [_options.threshold]
      }
    }

    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  }

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  })
})

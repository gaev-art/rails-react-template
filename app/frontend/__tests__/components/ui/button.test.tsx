import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/button'
import { fireEvent, render, screen } from '../../test-utils'

describe('Button Component', () => {
  it('renders with correct default props', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-slot', 'button')
  })

  it('renders different variants correctly', () => {
    const { rerender } = render(
      <Button variant='destructive'>Destructive</Button>,
    )
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')

    rerender(<Button variant='outline'>Outline</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('border')

    rerender(<Button variant='secondary'>Secondary</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary')

    rerender(<Button variant='ghost'>Ghost</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('hover:bg-accent')

    rerender(<Button variant='link'>Link</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('underline-offset-4')
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Button size='sm'>Small</Button>)
    let button = screen.getByRole('button')
    expect(button).toHaveClass('h-8')

    rerender(<Button size='lg'>Large</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-10')

    rerender(<Button size='icon'>Icon</Button>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('size-9')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href='https://example.com'>Link Button</a>
      </Button>,
    )

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('data-slot', 'button')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Button with ref</Button>)

    expect(ref).toHaveBeenCalled()
  })

  it('supports accessibility attributes', () => {
    render(
      <Button aria-label='Custom label' aria-describedby='description'>
        Button
      </Button>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Custom label')
    expect(button).toHaveAttribute('aria-describedby', 'description')
  })
})

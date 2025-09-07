import { describe, expect, it, vi } from 'vitest'
import { Input } from '@/components/ui/input'
import { fireEvent, render, screen } from '../../test-utils'

describe('Input Component', () => {
  it('renders with correct default props', () => {
    render(<Input data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('data-slot', 'input')
    // HTML input elements have text as default type
    expect(input).toHaveProperty('type', 'text')
  })

  it('renders with different input types', () => {
    const { rerender } = render(<Input type='email' data-testid='test-input' />)
    let input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('type', 'email')

    rerender(<Input type='password' data-testid='test-input' />)
    input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('type', 'password')

    rerender(<Input type='number' data-testid='test-input' />)
    input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('type', 'number')
  })

  it('displays placeholder text', () => {
    render(<Input placeholder='Enter your name' data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('placeholder', 'Enter your name')
  })

  it('handles value changes', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    fireEvent.change(input, { target: { value: 'test value' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('test value')
  })

  it('supports controlled input with value prop', () => {
    const { rerender } = render(
      <Input value='initial' data-testid='test-input' readOnly />,
    )

    const input = screen.getByTestId('test-input')
    expect(input).toHaveValue('initial')

    rerender(<Input value='updated' data-testid='test-input' readOnly />)
    expect(input).toHaveValue('updated')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:opacity-50')
  })

  it('applies custom className', () => {
    render(<Input className='custom-class' data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toHaveClass('custom-class')
  })

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    render(
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid='test-input'
      />,
    )

    const input = screen.getByTestId('test-input')

    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)

    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('supports accessibility attributes', () => {
    render(
      <Input
        aria-label='Custom label'
        aria-describedby='description'
        data-testid='test-input'
      />,
    )

    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('aria-label', 'Custom label')
    expect(input).toHaveAttribute('aria-describedby', 'description')
  })

  it('handles required attribute', () => {
    render(<Input required data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('required')
  })

  it('has proper styling classes', () => {
    render(<Input data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toHaveClass(
      'flex',
      'h-9',
      'w-full',
      'rounded-md',
      'border',
      'bg-transparent',
      'px-3',
      'py-1',
      'text-base',
      'shadow-xs',
      'transition-[color,box-shadow]',
      'outline-none',
    )
  })

  it('supports file input type with proper styling', () => {
    render(<Input type='file' data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('type', 'file')
    expect(input).toHaveClass('file:text-foreground')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Input ref={ref} data-testid='test-input' />)

    expect(ref).toHaveBeenCalled()
  })

  it('supports min and max attributes for number input', () => {
    render(<Input type='number' min='0' max='100' data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('max', '100')
  })

  it('supports maxLength attribute', () => {
    render(<Input maxLength={50} data-testid='test-input' />)

    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('maxLength', '50')
  })
})

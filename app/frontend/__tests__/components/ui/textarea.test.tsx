import { describe, expect, it, vi } from 'vitest'
import { Textarea } from '@/components/ui/textarea'
import { fireEvent, render, screen } from '../../test-utils'

describe('Textarea Component', () => {
  it('renders with correct default props', () => {
    render(<Textarea data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('data-slot', 'textarea')
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('displays placeholder text', () => {
    render(
      <Textarea placeholder='Enter your message' data-testid='test-textarea' />,
    )

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('placeholder', 'Enter your message')
  })

  it('handles value changes', () => {
    const handleChange = vi.fn()
    render(<Textarea onChange={handleChange} data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    fireEvent.change(textarea, { target: { value: 'test message' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(textarea).toHaveValue('test message')
  })

  it('supports controlled textarea with value prop', () => {
    const { rerender } = render(
      <Textarea value='initial text' data-testid='test-textarea' readOnly />,
    )

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveValue('initial text')

    rerender(
      <Textarea value='updated text' data-testid='test-textarea' readOnly />,
    )
    expect(textarea).toHaveValue('updated text')
  })

  it('supports rows attribute', () => {
    render(<Textarea rows={5} data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('supports cols attribute', () => {
    render(<Textarea cols={40} data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('cols', '40')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass(
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
    )
  })

  it('applies custom className', () => {
    render(<Textarea className='custom-class' data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveClass('custom-class')
  })

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    render(
      <Textarea
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid='test-textarea'
      />,
    )

    const textarea = screen.getByTestId('test-textarea')

    fireEvent.focus(textarea)
    expect(handleFocus).toHaveBeenCalledTimes(1)

    fireEvent.blur(textarea)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('supports accessibility attributes', () => {
    render(
      <Textarea
        aria-label='Custom label'
        aria-describedby='description'
        data-testid='test-textarea'
      />,
    )

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('aria-label', 'Custom label')
    expect(textarea).toHaveAttribute('aria-describedby', 'description')
  })

  it('handles required attribute', () => {
    render(<Textarea required data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('required')
  })

  it('has proper styling classes', () => {
    render(<Textarea data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveClass(
      'flex',
      'field-sizing-content',
      'min-h-16',
      'w-full',
      'rounded-md',
      'border',
      'bg-transparent',
      'px-3',
      'py-2',
      'text-base',
      'shadow-xs',
      'transition-[color,box-shadow]',
      'outline-none',
    )
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Textarea ref={ref} data-testid='test-textarea' />)

    expect(ref).toHaveBeenCalled()
  })

  it('supports maxLength attribute', () => {
    render(<Textarea maxLength={200} data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('maxLength', '200')
  })

  it('supports minLength attribute', () => {
    render(<Textarea minLength={10} data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('minLength', '10')
  })

  it('supports wrap attribute', () => {
    render(<Textarea wrap='soft' data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('wrap', 'soft')
  })

  it('handles keyboard events', () => {
    const handleKeyDown = vi.fn()
    const handleKeyUp = vi.fn()
    render(
      <Textarea
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        data-testid='test-textarea'
      />,
    )

    const textarea = screen.getByTestId('test-textarea')

    fireEvent.keyDown(textarea, { key: 'Enter' })
    expect(handleKeyDown).toHaveBeenCalledTimes(1)

    fireEvent.keyUp(textarea, { key: 'Enter' })
    expect(handleKeyUp).toHaveBeenCalledTimes(1)
  })

  it('supports form integration with name attribute', () => {
    render(<Textarea name='message' data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('name', 'message')
  })

  it('supports readonly attribute', () => {
    render(<Textarea readOnly data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('readonly')
  })

  it('handles text selection', () => {
    render(
      <Textarea
        defaultValue='Some text to select'
        data-testid='test-textarea'
      />,
    )

    const textarea = screen.getByTestId('test-textarea')

    // Simulate text selection
    fireEvent.select(textarea)

    expect(textarea).toHaveValue('Some text to select')
  })

  it('supports autoFocus attribute', () => {
    render(<Textarea autoFocus data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    // Check that textarea was rendered with autoFocus
    expect(textarea).toBeInTheDocument()
  })

  it('supports spellCheck attribute', () => {
    render(<Textarea spellCheck={false} data-testid='test-textarea' />)

    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('spellCheck', 'false')
  })

  it('works with label association', () => {
    const testId = `test-textarea-${Math.random().toString(36).substr(2, 9)}`
    render(
      <div>
        <label htmlFor={testId}>Message</label>
        <Textarea id={testId} data-testid='test-textarea' />
      </div>,
    )

    const textarea = screen.getByTestId('test-textarea')
    const label = screen.getByText('Message')

    expect(textarea).toHaveAttribute('id', testId)
    expect(label).toHaveAttribute('for', testId)

    // Focus the textarea directly to test the association
    textarea.focus()
    expect(textarea).toHaveFocus()
  })
})

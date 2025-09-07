import { describe, expect, it } from 'vitest'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { render, screen } from '../../test-utils'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders correctly with default props', () => {
      render(<Card data-testid='card'>Card content</Card>)

      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveAttribute('data-slot', 'card')
      expect(card).toHaveClass(
        'bg-card',
        'text-card-foreground',
        'rounded-xl',
        'border',
      )
    })

    it('applies custom className', () => {
      render(<Card className='custom-class'>Card content</Card>)

      const card = screen.getByText('Card content')
      expect(card).toHaveClass('custom-class')
    })
  })

  describe('CardHeader', () => {
    it('renders correctly', () => {
      render(<CardHeader data-testid='card-header'>Header content</CardHeader>)

      const header = screen.getByTestId('card-header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveAttribute('data-slot', 'card-header')
      expect(header).toHaveClass('grid', 'auto-rows-min', 'px-6')
    })
  })

  describe('CardTitle', () => {
    it('renders correctly', () => {
      render(<CardTitle data-testid='card-title'>Card Title</CardTitle>)

      const title = screen.getByTestId('card-title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveAttribute('data-slot', 'card-title')
      expect(title).toHaveClass('leading-none', 'font-semibold')
      expect(title).toHaveTextContent('Card Title')
    })
  })

  describe('CardDescription', () => {
    it('renders correctly', () => {
      render(
        <CardDescription data-testid='card-desc'>
          Card description
        </CardDescription>,
      )

      const description = screen.getByTestId('card-desc')
      expect(description).toBeInTheDocument()
      expect(description).toHaveAttribute('data-slot', 'card-description')
      expect(description).toHaveClass('text-muted-foreground', 'text-sm')
      expect(description).toHaveTextContent('Card description')
    })
  })

  describe('CardAction', () => {
    it('renders correctly', () => {
      render(<CardAction data-testid='card-action'>Action content</CardAction>)

      const action = screen.getByTestId('card-action')
      expect(action).toBeInTheDocument()
      expect(action).toHaveAttribute('data-slot', 'card-action')
      expect(action).toHaveClass(
        'col-start-2',
        'row-span-2',
        'justify-self-end',
      )
    })
  })

  describe('CardContent', () => {
    it('renders correctly', () => {
      render(<CardContent data-testid='card-content'>Content here</CardContent>)

      const content = screen.getByTestId('card-content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveAttribute('data-slot', 'card-content')
      expect(content).toHaveClass('px-6')
      expect(content).toHaveTextContent('Content here')
    })
  })

  describe('CardFooter', () => {
    it('renders correctly', () => {
      render(<CardFooter data-testid='card-footer'>Footer content</CardFooter>)

      const footer = screen.getByTestId('card-footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveAttribute('data-slot', 'card-footer')
      expect(footer).toHaveClass('flex', 'items-center', 'px-6')
    })
  })

  describe('Full Card Structure', () => {
    it('renders complete card structure correctly', () => {
      render(
        <Card data-testid='full-card'>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test card</CardDescription>
            <CardAction>
              <button type='button'>Action</button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Main content goes here</p>
          </CardContent>
          <CardFooter>
            <button type='button'>Footer button</button>
          </CardFooter>
        </Card>,
      )

      const card = screen.getByTestId('full-card')
      expect(card).toBeInTheDocument()

      expect(screen.getByText('Test Card')).toBeInTheDocument()
      expect(screen.getByText('This is a test card')).toBeInTheDocument()
      expect(screen.getByText('Main content goes here')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Footer button' }),
      ).toBeInTheDocument()
    })
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import { AccessibleButton } from '@/components/ui/accessible-button'

describe('AccessibleButton', () => {
  it('renders with correct text', () => {
    render(<AccessibleButton>Click me</AccessibleButton>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state correctly', () => {
    render(
      <AccessibleButton loading loadingText="Loading...">
        Submit
      </AccessibleButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toBeDisabled()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<AccessibleButton disabled>Click me</AccessibleButton>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('has correct ARIA attributes', () => {
    render(
      <AccessibleButton 
        aria-label="Custom label" 
        aria-describedby="description"
      >
        Click me
      </AccessibleButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Custom label')
    expect(button).toHaveAttribute('aria-describedby', 'description')
  })

  it('supports keyboard navigation', () => {
    const handleClick = jest.fn()
    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>)
    
    const button = screen.getByRole('button')
    button.focus()
    expect(button).toHaveFocus()
    
    fireEvent.keyDown(button, { key: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<AccessibleButton variant="destructive">Delete</AccessibleButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })
})
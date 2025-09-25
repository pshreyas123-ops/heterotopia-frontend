import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { AccessibleButton } from '@/components/ui/accessible-button'
import { AccessibleInput } from '@/components/ui/accessible-input'
import { EmptyState } from '@/components/EmptyState'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  describe('AccessibleButton', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <AccessibleButton aria-label="Test button">
          Click me
        </AccessibleButton>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when loading', async () => {
      const { container } = render(
        <AccessibleButton loading loadingText="Loading...">
          Submit
        </AccessibleButton>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when disabled', async () => {
      const { container } = render(
        <AccessibleButton disabled>
          Disabled button
        </AccessibleButton>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('AccessibleInput', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <AccessibleInput
          label="Email address"
          type="email"
          required
          helperText="Enter your email address"
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with error state', async () => {
      const { container } = render(
        <AccessibleInput
          label="Email address"
          type="email"
          required
          error="Please enter a valid email address"
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('EmptyState', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <EmptyState
          title="No results found"
          description="Try adjusting your search criteria"
          action={{
            label: "Clear filters",
            onClick: jest.fn(),
          }}
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with multiple actions', async () => {
      const { container } = render(
        <EmptyState
          title="No data available"
          description="Get started by adding your first item"
          action={{
            label: "Add item",
            onClick: jest.fn(),
          }}
          secondaryAction={{
            label: "Learn more",
            onClick: jest.fn(),
          }}
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Form Accessibility', () => {
    it('should handle form with multiple inputs accessibly', async () => {
      const { container } = render(
        <form>
          <AccessibleInput
            label="First Name"
            required
            helperText="Enter your first name"
          />
          <AccessibleInput
            label="Last Name"
            required
            helperText="Enter your last name"
          />
          <AccessibleInput
            label="Email"
            type="email"
            required
            error="Please enter a valid email"
          />
          <AccessibleButton type="submit">
            Submit Form
          </AccessibleButton>
        </form>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useForm } from '@/hooks/useForm'
import { z } from 'zod'

// Mock API calls
jest.mock('@/services/api', () => ({
  authAPI: {
    login: jest.fn(),
    register: jest.fn(),
  },
  userAPI: {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
  },
  searchAPI: {
    semanticSearch: jest.fn(),
  },
}))

// Test wrapper with providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// Mock form component for testing
const TestForm = () => {
  const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })

  const { values, errors, handleSubmit, getFieldProps } = useForm({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log('Form submitted:', values)
    },
  })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...getFieldProps('email')}
        />
        {errors.email && <span role="alert">{errors.email}</span>}
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...getFieldProps('password')}
        />
        {errors.password && <span role="alert">{errors.password}</span>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  )
}

describe('User Flow Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  describe('Form Validation Flow', () => {
    it('should validate form fields and show errors', async () => {
      render(<TestForm />, { wrapper: TestWrapper })

      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: 'Submit' })

      // Try to submit empty form
      await user.click(submitButton)

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument()
        expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument()
      })

      // Fill in invalid email
      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument()
      })

      // Fill in valid email but short password
      await user.clear(emailInput)
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, '123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()
        expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument()
      })

      // Fill in valid data
      await user.clear(passwordInput)
      await user.type(passwordInput, 'validpassword123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()
        expect(screen.queryByText('Password must be at least 8 characters')).not.toBeInTheDocument()
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation through form', async () => {
      render(<TestForm />, { wrapper: TestWrapper })

      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: 'Submit' })

      // Tab through form elements
      await user.tab()
      expect(emailInput).toHaveFocus()

      await user.tab()
      expect(passwordInput).toHaveFocus()

      await user.tab()
      expect(submitButton).toHaveFocus()

      // Should be able to submit with Enter
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'validpassword123')
      
      submitButton.focus()
      await user.keyboard('{Enter}')

      // Form should submit without errors
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle and display API errors gracefully', async () => {
      const mockError = new Error('Network error')
      
      // Mock a failing API call
      const { authAPI } = require('@/services/api')
      authAPI.login.mockRejectedValueOnce(mockError)

      const TestComponent = () => {
        const [error, setError] = React.useState<string | null>(null)
        const [loading, setLoading] = React.useState(false)

        const handleLogin = async () => {
          try {
            setLoading(true)
            setError(null)
            await authAPI.login('test@example.com', 'password')
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
          } finally {
            setLoading(false)
          }
        }

        return (
          <div>
            <button onClick={handleLogin} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <div role="alert">{error}</div>}
          </div>
        )
      }

      render(<TestComponent />, { wrapper: TestWrapper })

      const loginButton = screen.getByRole('button', { name: 'Login' })
      await user.click(loginButton)

      // Should show loading state
      expect(screen.getByRole('button', { name: 'Logging in...' })).toBeDisabled()

      // Should show error message
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Network error')
      })

      // Button should be enabled again
      expect(screen.getByRole('button', { name: 'Login' })).not.toBeDisabled()
    })
  })

  describe('Search Flow', () => {
    it('should handle search with loading and results', async () => {
      const mockResults = {
        funders: [
          { id: '1', name: 'Test Funder', description: 'Test description' },
        ],
        total: 1,
      }

      const { searchAPI } = require('@/services/api')
      searchAPI.semanticSearch.mockResolvedValueOnce(mockResults)

      const SearchComponent = () => {
        const [query, setQuery] = React.useState('')
        const [results, setResults] = React.useState<any>(null)
        const [loading, setLoading] = React.useState(false)

        const handleSearch = async () => {
          if (!query.trim()) return

          try {
            setLoading(true)
            const searchResults = await searchAPI.semanticSearch(query)
            setResults(searchResults)
          } catch (error) {
            console.error('Search failed:', error)
          } finally {
            setLoading(false)
          }
        }

        return (
          <div>
            <input
              type="text"
              placeholder="Search funders..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search funders"
            />
            <button onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
            
            {results && (
              <div role="region" aria-label="Search results">
                <p>{results.total} results found</p>
                {results.funders.map((funder: any) => (
                  <div key={funder.id}>
                    <h3>{funder.name}</h3>
                    <p>{funder.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }

      render(<SearchComponent />, { wrapper: TestWrapper })

      const searchInput = screen.getByLabelText('Search funders')
      const searchButton = screen.getByRole('button', { name: 'Search' })

      // Enter search query
      await user.type(searchInput, 'climate change')
      await user.click(searchButton)

      // Should show loading state
      expect(screen.getByRole('button', { name: 'Searching...' })).toBeDisabled()

      // Should show results
      await waitFor(() => {
        expect(screen.getByText('1 results found')).toBeInTheDocument()
        expect(screen.getByText('Test Funder')).toBeInTheDocument()
        expect(screen.getByText('Test description')).toBeInTheDocument()
      })
    })
  })
})
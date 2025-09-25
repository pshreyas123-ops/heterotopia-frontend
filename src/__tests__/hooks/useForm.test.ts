import { renderHook, act } from '@testing-library/react'
import { z } from 'zod'
import { useForm } from '@/hooks/useForm'

const testSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be at least 18'),
})

const initialValues = {
  name: '',
  email: '',
  age: 0,
}

describe('useForm', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: jest.fn(),
      })
    )

    expect(result.current.values).toEqual(initialValues)
    expect(result.current.errors).toEqual({})
    expect(result.current.isValid).toBe(true)
    expect(result.current.isDirty).toBe(false)
    expect(result.current.isSubmitting).toBe(false)
  })

  it('updates values correctly', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        validationSchema: testSchema,
        onSubmit: jest.fn(),
      })
    )

    act(() => {
      result.current.setValue('name', 'John Doe')
    })

    expect(result.current.values.name).toBe('John Doe')
    expect(result.current.isDirty).toBe(true)
  })

  it('validates fields on change when enabled', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        validationSchema: testSchema,
        onSubmit: jest.fn(),
        validateOnChange: true,
      })
    )

    act(() => {
      result.current.setValue('email', 'invalid-email')
    })

    expect(result.current.errors.email).toBe('Invalid email')
    expect(result.current.isValid).toBe(false)
  })

  it('validates fields on blur when enabled', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        validationSchema: testSchema,
        onSubmit: jest.fn(),
        validateOnBlur: true,
      })
    )

    act(() => {
      result.current.setValue('name', '')
      result.current.setFieldTouched('name', true)
    })

    expect(result.current.errors.name).toBe('Name is required')
    expect(result.current.touched.name).toBe(true)
  })

  it('sanitizes input when enabled', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: jest.fn(),
        sanitizeInputs: true,
      })
    )

    act(() => {
      result.current.setValue('name', '<script>alert("xss")</script>John')
    })

    expect(result.current.values.name).toBe('John')
  })

  it('handles form submission correctly', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() =>
      useForm({
        initialValues: { name: 'John', email: 'john@example.com', age: 25 },
        validationSchema: testSchema,
        onSubmit,
      })
    )

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
      age: 25,
    })
  })

  it('prevents submission with validation errors', async () => {
    const onSubmit = jest.fn()
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        validationSchema: testSchema,
        onSubmit,
      })
    )

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(onSubmit).not.toHaveBeenCalled()
    expect(result.current.isValid).toBe(false)
    expect(Object.keys(result.current.errors)).toHaveLength(3)
  })

  it('resets form correctly', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: jest.fn(),
      })
    )

    act(() => {
      result.current.setValue('name', 'John')
      result.current.setFieldTouched('name', true)
      result.current.reset()
    })

    expect(result.current.values).toEqual(initialValues)
    expect(result.current.errors).toEqual({})
    expect(result.current.touched).toEqual({})
    expect(result.current.isDirty).toBe(false)
  })

  it('provides correct field props', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        onSubmit: jest.fn(),
      })
    )

    const fieldProps = result.current.getFieldProps('name')

    expect(fieldProps).toHaveProperty('name', 'name')
    expect(fieldProps).toHaveProperty('value', '')
    expect(fieldProps).toHaveProperty('onChange')
    expect(fieldProps).toHaveProperty('onBlur')
  })
})
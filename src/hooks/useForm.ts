import { useState, useCallback, useMemo } from 'react';
import { z } from 'zod';
import { sanitizeInput } from '@/lib/security';

export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
  sanitizeInputs?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
  sanitizeInputs = true,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
    isDirty: false,
  });

  const validateField = useCallback(
    (name: keyof T, value: any): string | null => {
      if (!validationSchema) return null;

      try {
        // Create a partial schema for single field validation
        const fieldSchema = validationSchema.pick({ [name]: true } as any);
        fieldSchema.parse({ [name]: value });
        return null;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find(err => 
            err.path.includes(name as string)
          );
          return fieldError?.message || 'Invalid value';
        }
        return 'Validation error';
      }
    },
    [validationSchema]
  );

  const validateAllFields = useCallback(
    (values: T): Partial<Record<keyof T, string>> => {
      if (!validationSchema) return {};

      try {
        validationSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Partial<Record<keyof T, string>> = {};
          error.errors.forEach(err => {
            const field = err.path[0] as keyof T;
            if (field) {
              errors[field] = err.message;
            }
          });
          return errors;
        }
        return {};
      }
    },
    [validationSchema]
  );

  const setValue = useCallback((name: keyof T, value: any) => {
    setState(prev => {
      let processedValue = value;
      
      // Sanitize string inputs
      if (sanitizeInputs && typeof value === 'string') {
        processedValue = sanitizeInput(value);
      }

      const newValues = { ...prev.values, [name]: processedValue };
      const isDirty = JSON.stringify(newValues) !== JSON.stringify(initialValues);
      
      let newErrors = { ...prev.errors };
      
      // Validate on change if enabled
      if (validateOnChange) {
        const fieldError = validateField(name, processedValue);
        if (fieldError) {
          newErrors[name] = fieldError;
        } else {
          delete newErrors[name];
        }
      }

      const isValid = Object.keys(newErrors).length === 0;

      return {
        ...prev,
        values: newValues,
        errors: newErrors,
        isValid,
        isDirty,
      };
    });
  }, [validateField, validateOnChange, sanitizeInputs, initialValues]);

  const setFieldTouched = useCallback((name: keyof T, touched = true) => {
    setState(prev => {
      const newTouched = { ...prev.touched, [name]: touched };
      let newErrors = { ...prev.errors };

      // Validate on blur if enabled and field is touched
      if (validateOnBlur && touched) {
        const fieldError = validateField(name, prev.values[name]);
        if (fieldError) {
          newErrors[name] = fieldError;
        } else {
          delete newErrors[name];
        }
      }

      return {
        ...prev,
        touched: newTouched,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0,
      };
    });
  }, [validateField, validateOnBlur]);

  const setFieldError = useCallback((name: keyof T, error: string | null) => {
    setState(prev => {
      const newErrors = { ...prev.errors };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      return {
        ...prev,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0,
      };
    });
  }, []);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(state.values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>
      );

      // Validate all fields
      const allErrors = validateAllFields(state.values);
      const isValid = Object.keys(allErrors).length === 0;

      setState(prev => ({
        ...prev,
        touched: allTouched,
        errors: allErrors,
        isValid,
        isSubmitting: true,
      }));

      if (!isValid) {
        setState(prev => ({ ...prev, isSubmitting: false }));
        return;
      }

      try {
        await onSubmit(state.values);
      } catch (error) {
        console.error('Form submission error:', error);
        // Handle submission errors
        if (error instanceof Error) {
          setState(prev => ({
            ...prev,
            errors: { ...prev.errors, _form: error.message },
            isValid: false,
          }));
        }
      } finally {
        setState(prev => ({ ...prev, isSubmitting: false }));
      }
    },
    [state.values, validateAllFields, onSubmit]
  );

  const reset = useCallback((newValues?: Partial<T>) => {
    const resetValues = newValues ? { ...initialValues, ...newValues } : initialValues;
    setState({
      values: resetValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
      isDirty: false,
    });
  }, [initialValues]);

  const getFieldProps = useCallback((name: keyof T) => ({
    name: name as string,
    value: state.values[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      setValue(name, e.target.value),
    onBlur: () => setFieldTouched(name, true),
    error: state.touched[name] ? state.errors[name] : undefined,
    'aria-invalid': !!(state.touched[name] && state.errors[name]),
  }), [state.values, state.errors, state.touched, setValue, setFieldTouched]);

  // Memoized computed values
  const computedState = useMemo(() => ({
    hasErrors: Object.keys(state.errors).length > 0,
    touchedFields: Object.keys(state.touched).filter(key => state.touched[key as keyof T]),
    dirtyFields: Object.keys(state.values).filter(key => 
      state.values[key as keyof T] !== initialValues[key as keyof T]
    ),
  }), [state.errors, state.touched, state.values, initialValues]);

  return {
    // State
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    isDirty: state.isDirty,
    
    // Computed state
    ...computedState,
    
    // Actions
    setValue,
    setFieldTouched,
    setFieldError,
    handleSubmit,
    reset,
    getFieldProps,
    
    // Validation
    validateField: (name: keyof T) => validateField(name, state.values[name]),
    validateForm: () => validateAllFields(state.values),
  };
}
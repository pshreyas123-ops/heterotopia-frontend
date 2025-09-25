"use client";

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { sanitizeInput } from '@/lib/security';

export interface AccessibleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  showRequiredIndicator?: boolean;
  sanitize?: boolean;
}

const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    helperText,
    required = false,
    showRequiredIndicator = true,
    sanitize = true,
    id,
    onChange,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false);
    
    // Generate unique IDs for accessibility
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (sanitize && type === 'text') {
        e.target.value = sanitizeInput(e.target.value);
      }
      onChange?.(e);
    };

    const inputClasses = cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error && "border-red-500 focus-visible:ring-red-500",
      focused && !error && "ring-2 ring-blue-500 ring-offset-2",
      className
    );

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error && "text-red-600"
            )}
          >
            {label}
            {required && showRequiredIndicator && (
              <span className="text-red-500 ml-1" aria-label="required">*</span>
            )}
          </label>
        )}
        
        <input
          type={type}
          className={inputClasses}
          ref={ref}
          id={inputId}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={cn(
            errorId,
            helperId
          ).trim() || undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          {...props}
        />
        
        {helperText && !error && (
          <p 
            id={helperId}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
        
        {error && (
          <p 
            id={errorId}
            className="text-sm text-red-600 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <svg 
              className="h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = "AccessibleInput";

export { AccessibleInput };
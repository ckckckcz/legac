'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  /** Field name */
  name: string;
  /** Field label */
  label: string;
  /** Field type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** Placeholder text */
  placeholder?: string;
  /** Current field value */
  value?: string | number;
  /** Change handler */
  onChange?: (value: string | number) => void;
  /** Blur handler for validation */
  onBlur?: () => void;
  /** Error message to display */
  error?: string;
  /** Whether field is required */
  required?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Helper text below field */
  helperText?: string;
  /** CSS class */
  className?: string;
  /** Custom validation pattern */
  pattern?: string;
  /** Min length validation */
  minLength?: number;
  /** Max length validation */
  maxLength?: number;
}

interface FormFieldState {
  value: string | number;
  error?: string;
  touched: boolean;
}

/**
 * FormField component wrapper for shadcn Input with built-in validation support
 * 
 * Features:
 * - Built-in validation (required, email, pattern, min/max length)
 * - Error message display
 * - Helper text support
 * - TypeScript support
 * - Compatible with react-hook-form (can be wrapped)
 * 
 * Usage:
 * ```tsx
 * const [email, setEmail] = useState('');
 * const [error, setError] = useState('');
 * 
 * <FormField
 *   name="email"
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   error={error}
 *   required
 * />
 * ```
 */
export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  value = '',
  onChange,
  onBlur,
  error,
  required,
  disabled,
  helperText,
  className,
  pattern,
  minLength,
  maxLength,
}: FormFieldProps) {
  const fieldId = `field-${name}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) : e.target.value;
    onChange?.(newValue);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={fieldId}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Input
        id={fieldId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
        className={cn(
          error && 'border-red-500 focus-visible:ring-red-500'
        )}
      />

      {error && (
        <p id={`${fieldId}-error`} className="text-sm text-red-500 font-medium">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${fieldId}-helper`} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Validation utilities for common patterns
 */
export const FormValidation = {
  /** Email validation regex */
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  /** URL validation regex */
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,

  /**
   * Validate required field
   */
  required: (value: string | number | undefined): string | undefined => {
    if (!value || value.toString().trim() === '') {
      return 'This field is required';
    }
  },

  /**
   * Validate email format
   */
  validateEmail: (value: string): string | undefined => {
    if (!value) return 'Email is required';
    if (!FormValidation.email.test(value)) {
      return 'Please enter a valid email address';
    }
  },

  /**
   * Validate minimum length
   */
  minLength: (min: number) => (value: string): string | undefined => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  },

  /**
   * Validate maximum length
   */
  maxLength: (max: number) => (value: string): string | undefined => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  },

  /**
   * Validate URL format
   */
  validateUrl: (value: string): string | undefined => {
    if (!value) return 'URL is required';
    if (!FormValidation.url.test(value)) {
      return 'Please enter a valid URL';
    }
  },

  /**
   * Compose multiple validators
   */
  compose: (...validators: Array<(v: any) => string | undefined>) => 
    (value: any): string | undefined => {
      for (const validator of validators) {
        const error = validator(value);
        if (error) return error;
      }
    },
};

export type { FormFieldState };

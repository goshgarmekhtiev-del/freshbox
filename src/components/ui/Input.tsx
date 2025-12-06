import React from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  inputSize?: InputSize;
  fullWidth?: boolean;
}

/**
 * Premium Input Component for FreshBox
 * 
 * Features:
 * - Optional label, error, helper text
 * - Optional icon (left side)
 * - Sizes: sm, md, lg
 * - Brand-styled focus state
 * - Accessible with proper ARIA attributes
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      inputSize = 'md',
      fullWidth = true,
      className = '',
      id,
      required,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Size styles
    const sizeStyles: Record<InputSize, string> = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-4 text-base',
      lg: 'px-6 py-5 text-lg',
    };

    // Icon padding adjustment
    const iconPadding = icon ? 'pl-14' : '';

    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';

    // Error/Success border
    const borderStyle = error
      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
      : 'border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-brand-accent/20';

    return (
      <div className={widthStyle}>
        {label && (
          <label
            htmlFor={inputId}
            className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`${widthStyle} ${sizeStyles[inputSize]} ${iconPadding} rounded-[--radius-ui] border-2 ${borderStyle} focus:outline-none focus:ring-4 transition-all text-brand-text placeholder-brand-text-soft/70 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm font-medium text-brand-text-soft">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

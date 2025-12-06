import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

/**
 * Premium TextArea Component for FreshBox
 * 
 * Features:
 * - Optional label, error, helper text
 * - Brand-styled focus state
 * - Accessible with proper ARIA attributes
 * - Auto-resize support via rows prop
 */
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      className = '',
      id,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

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
            htmlFor={textareaId}
            className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          rows={rows}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          className={`${widthStyle} px-6 py-4 rounded-[--radius-ui] border-2 ${borderStyle} focus:outline-none focus:ring-4 transition-all text-brand-text placeholder-brand-text-soft/70 font-medium text-base resize-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 ${className}`}
          {...props}
        />

        {error && (
          <p id={`${textareaId}-error`} className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-2 text-sm font-medium text-brand-text-soft">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };

import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

/**
 * Premium Button Component for FreshBox
 * 
 * Variants:
 * - primary: Brand gradient (orange-yellow), main CTA
 * - secondary: Outlined brand color, secondary actions
 * - ghost: Transparent with hover, tertiary actions
 * - danger: Red, destructive actions
 * - success: Green, confirmation actions
 * 
 * Sizes: sm, md, lg, xl
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles - Updated with disabled hover prevention
    const baseStyles = 'inline-flex items-center justify-center gap-3 font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 active:scale-95 relative overflow-hidden';

    // Variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] hover:scale-105 hover:brightness-110 border-2 border-white/30 group',
      secondary: 'bg-white border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white shadow-[--shadow-soft] hover:shadow-brand-accent/30 hover:scale-105',
      ghost: 'bg-transparent text-brand-text hover:bg-brand-accent/10 hover:text-brand-accent',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-[--shadow-soft] hover:shadow-red-500/30 hover:scale-105',
      success: 'bg-brand-green text-white hover:bg-brand-green/90 shadow-[--shadow-soft] hover:shadow-brand-green/30 hover:scale-105',
    };

    // Size styles
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-6 text-xl',
    };

    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';

    // Shimmer effect for primary variant (only when not disabled)
    const shimmerEffect = variant === 'primary' && !disabled && !isLoading ? (
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
    ) : null;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {shimmerEffect}
        
        {isLoading ? (
          <>
            <Loader2 className="animate-spin relative z-10" size={size === 'sm' ? 16 : size === 'xl' ? 24 : 20} strokeWidth={2.5} />
            <span className="relative z-10">Загрузка...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="relative z-10">{icon}</span>}
            <span className="relative z-10">{children}</span>
            {icon && iconPosition === 'right' && <span className="relative z-10">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

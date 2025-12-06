import React from 'react';

export type CardVariant = 'light' | 'dark' | 'glass' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  shadow?: boolean;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Premium Card Component for FreshBox
 * 
 * Variants:
 * - light: White background, subtle border
 * - dark: Dark green gradient, white text
 * - glass: Glassmorphism effect
 * - outlined: Transparent with border
 * 
 * Features:
 * - Configurable padding (none, sm, md, lg)
 * - Optional shadow
 * - Optional hover effect
 */
const Card: React.FC<CardProps> = ({
  variant = 'light',
  padding = 'md',
  shadow = true,
  hover = false,
  className = '',
  children,
  onClick,
}) => {
  // Base styles
  const baseStyles = 'rounded-[--radius-card] transition-all duration-300';

  // Variant styles
  const variantStyles: Record<CardVariant, string> = {
    light: 'bg-white border border-gray-100 text-brand-text',
    dark: 'bg-gradient-to-br from-brand-text via-brand-text-soft to-brand-green text-white border border-white/10',
    glass: 'glass border-2 border-white/70 text-brand-text backdrop-blur-xl',
    outlined: 'bg-transparent border-2 border-brand-accent/30 text-brand-text',
  };

  // Padding styles
  const paddingStyles: Record<CardPadding, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
  };

  // Shadow styles
  const shadowStyle = shadow ? 'shadow-[--shadow-soft]' : '';

  // Hover styles
  const hoverStyle = hover
    ? 'hover:shadow-[--shadow-elevated] hover:-translate-y-2 cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${shadowStyle} ${hoverStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { Card };

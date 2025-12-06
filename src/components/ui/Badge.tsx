import React from 'react';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Premium Badge Component for FreshBox
 * 
 * Variants:
 * - primary: Brand accent (orange)
 * - success: Green, positive states
 * - warning: Yellow, cautionary
 * - info: Blue-ish, informational
 * - danger: Red, errors/alerts
 * - neutral: Gray, default/inactive
 * 
 * Sizes: sm, md, lg
 */
const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center gap-2 font-black uppercase tracking-wider rounded-lg';

  // Variant styles
  const variantStyles: Record<BadgeVariant, string> = {
    primary: 'bg-brand-accent/10 text-brand-accent',
    success: 'bg-brand-green/10 text-brand-green',
    warning: 'bg-brand-yellow/20 text-brand-text',
    info: 'bg-brand-accent-light/20 text-brand-text',
    danger: 'bg-red-500/10 text-red-600',
    neutral: 'bg-brand-bg text-brand-text-soft',
  };

  // Size styles
  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
};

export { Badge };

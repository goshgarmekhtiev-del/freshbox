import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container Component - Unified Content Width
 * 
 * Provides consistent max-width and horizontal padding across all sections.
 * Ensures premium, aligned layout throughout the site.
 * 
 * Default: max-w-7xl (1280px) with responsive horizontal padding
 */
const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;

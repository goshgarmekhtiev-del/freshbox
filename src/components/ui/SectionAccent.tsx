import React from 'react';
import Container from './Container';

interface SectionAccentProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  withBlobs?: boolean;
  containerClassName?: string;
  paddingY?: 'normal' | 'large';
}

/**
 * Accent Section Component
 * Background: Warm orange-to-lime gradient with soft blobs
 * Usage: Hero, Catalog, B2B, OrderForm - conversion-critical areas
 */
const SectionAccent = React.forwardRef<HTMLElement, SectionAccentProps>(({
  children,
  id,
  className = '',
  withBlobs = true,
  containerClassName = '',
  paddingY = 'normal',
}, ref) => {
  const pyClass = paddingY === 'large' ? 'py-20 md:py-24 lg:py-28' : 'py-16 md:py-20 lg:py-24';

  return (
    <section
      ref={ref}
      id={id}
      className={`${pyClass} bg-gradient-to-b from-white via-brand-bg/30 to-white relative overflow-hidden ${className}`}
    >
      {/* Accent Background Blobs - Softer Glow */}
      {withBlobs && (
        <>
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-brand-accent/8 to-transparent rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-brand-yellow/6 to-transparent rounded-full blur-[150px] opacity-30 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-brand-green/5 to-transparent rounded-full blur-[150px] opacity-25 pointer-events-none"></div>
        </>
      )}

      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
});

SectionAccent.displayName = 'SectionAccent';

export default SectionAccent;

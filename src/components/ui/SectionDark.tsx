import React from 'react';
import Container from './Container';

interface SectionDarkProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  withPattern?: boolean;
  containerClassName?: string;
}

/**
 * Dark Section Component
 * Background: Dark green gradient (brand-text → brand-text-soft → brand-green)
 * Usage: Footer, Benefits, high-contrast emphasis sections
 */
const SectionDark = React.forwardRef<HTMLElement, SectionDarkProps>(({
  children,
  id,
  className = '',
  withPattern = true,
  containerClassName = '',
}, ref) => {
  return (
    <section
      ref={ref}
      id={id}
      className={`py-12 md:py-16 lg:py-20 bg-gradient-to-br from-brand-text via-brand-text-soft to-brand-green text-white relative overflow-hidden ${className}`}
    >
      {/* Dark Background Pattern with Soft Accent Glows */}
      {withPattern && (
        <>
          <div className="absolute top-0 left-0 w-full h-full opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-accent/15 to-transparent rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-yellow/10 to-transparent rounded-full blur-[150px] opacity-30 pointer-events-none"></div>
        </>
      )}

      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
});

SectionDark.displayName = 'SectionDark';

export default SectionDark;

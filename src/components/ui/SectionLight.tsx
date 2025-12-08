import React from 'react';
import Container from './Container';

interface SectionLightProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  withBlobs?: boolean;
  containerClassName?: string;
}

/**
 * Light Section Component
 * Background: bg-brand-bg (soft cream #fff7ed) or white
 * Usage: Content-focused sections (ProblemSolution, HowItWorks, Reviews, FAQ, Configurator)
 */
const SectionLight = React.forwardRef<HTMLElement, SectionLightProps>(({
  children,
  id,
  className = '',
  withBlobs = false,
  containerClassName = '',
}, ref) => {
  return (
    <section
      ref={ref}
      id={id}
      className={`py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden ${className}`}
    >
      {/* Optional: Subtle blobs for depth - Softer */}
      {withBlobs && (
        <>
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-brand-accent/4 to-transparent rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-brand-yellow/3 to-transparent rounded-full blur-[150px] opacity-30 pointer-events-none"></div>
        </>
      )}

      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
});

SectionLight.displayName = 'SectionLight';

export default SectionLight;

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
const SectionLight: React.FC<SectionLightProps> = ({
  children,
  id,
  className = '',
  withBlobs = false,
  containerClassName = '',
}) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 bg-brand-bg relative overflow-hidden ${className}`}
    >
      {/* Optional: Subtle blobs for depth */}
      {withBlobs && (
        <>
          <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-accent/8 to-transparent rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
          <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-yellow/6 to-transparent rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        </>
      )}

      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};

export default SectionLight;

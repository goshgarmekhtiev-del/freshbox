import React from 'react';

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
const SectionAccent: React.FC<SectionAccentProps> = ({
  children,
  id,
  className = '',
  withBlobs = true,
  containerClassName = '',
  paddingY = 'normal',
}) => {
  const pyClass = paddingY === 'large' ? 'py-24 md:py-40' : 'py-24 md:py-32';

  return (
    <section
      id={id}
      className={`${pyClass} bg-gradient-to-br from-orange-50 via-brand-accent-light to-lime-50 relative overflow-hidden ${className}`}
    >
      {/* Accent Background Blobs - Orange & Yellow Glow */}
      {withBlobs && (
        <>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-accent/20 to-transparent rounded-full blur-[150px] opacity-60 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-brand-yellow/15 to-transparent rounded-full blur-[150px] opacity-50 pointer-events-none"></div>
        </>
      )}

      <div className={`container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 relative z-10 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default SectionAccent;

import React from 'react';

interface SkeletonCardProps {
  count?: number;
}

/**
 * Premium Skeleton Loader for Catalog Cards
 * Matches exact structure of CatalogCard for zero layout shift
 */
const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="relative flex flex-col h-full animate-pulse"
        >
          {/* Image skeleton - EXACT aspect-ratio match */}
          <div className="relative aspect-[4/5] rounded-[--radius-card] overflow-hidden mb-6 bg-gradient-to-br from-brand-bg via-brand-accent-light/20 to-brand-yellow/10">
            {/* Shimmer overlay - Premium effect */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            
            {/* Subtle radial pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05)_0%,transparent_100%)]"></div>
          </div>
          
          {/* Content section - Matches CatalogCard spacing */}
          <div className="flex-1 flex flex-col space-y-4 relative z-10">
            {/* Title skeleton */}
            <div className="h-8 bg-gradient-to-r from-brand-bg via-brand-accent-light/30 to-brand-bg rounded-lg w-3/4"></div>
            
            {/* Description skeleton - 2 lines */}
            <div className="space-y-2.5">
              <div className="h-5 bg-gradient-to-r from-brand-bg via-brand-accent-light/25 to-brand-bg rounded w-full"></div>
              <div className="h-5 bg-gradient-to-r from-brand-bg via-brand-accent-light/25 to-brand-bg rounded w-5/6"></div>
            </div>
            
            {/* Ingredients badge skeleton */}
            <div className="h-12 bg-gradient-to-r from-brand-accent-light/40 via-brand-accent-light/30 to-brand-yellow/20 rounded-[--radius-ui] border border-brand-accent/20"></div>
            
            {/* Price and button skeleton */}
            <div className="mt-auto flex items-center justify-between pt-2">
              {/* Price skeleton */}
              <div className="h-8 bg-gradient-to-r from-brand-bg via-brand-accent-light/30 to-brand-bg rounded-lg w-24"></div>
              
              {/* Button skeleton */}
              <div className="h-12 bg-gradient-to-r from-brand-accent/60 via-brand-accent/50 to-brand-accent-dark/60 rounded-full w-36"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;

import React from 'react';

interface SkeletonCardProps {
  count?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="group relative bg-white rounded-[--radius-card] shadow-[--shadow-soft] overflow-hidden border border-gray-100/50"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          
          {/* Image skeleton */}
          <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-t-[--radius-card]">
            {/* Optional subtle pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,transparent_100%)]"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            {/* Title skeleton */}
            <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-3/4"></div>
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6"></div>
            </div>
            
            {/* Ingredients badge skeleton */}
            <div className="h-10 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-[--radius-ui]"></div>
            
            {/* Price and button skeleton */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-32"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;

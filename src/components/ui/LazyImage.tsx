import React, { useState, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Container classes for wrapper div */
  containerClassName?: string;
  /** Image classes */
  imgClassName?: string;
  /** Skeleton/placeholder classes */
  skeletonClassName?: string;
  /** Priority loading (eager) for above-fold images */
  priority?: boolean;
  /** Aspect ratio classes (e.g., "aspect-[4/5]", "aspect-square") */
  aspectRatio?: string;
  /** Enable WebP optimization for Unsplash/Supabase URLs */
  autoOptimize?: boolean;
}

/**
 * LazyImage Component - Premium image loading with skeleton placeholder
 * 
 * Features:
 * - Animated skeleton with pulse + shimmer effect while loading
 * - Smooth fade-in transition when loaded
 * - Zero layout shift (fixed aspect ratio)
 * - Lazy loading for performance
 * - Auto WebP optimization for supported CDNs
 * - Loading state management
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  containerClassName = '',
  imgClassName = '',
  skeletonClassName = '',
  priority = false,
  aspectRatio = '',
  autoOptimize = false,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Optimize image URL if autoOptimize is enabled
  useEffect(() => {
    if (!autoOptimize) {
      setImageSrc(src);
      return;
    }

    let optimizedSrc = src;

    // Skip optimization if already webp
    if (src.endsWith('.webp') || src.includes('.webp?')) {
      setImageSrc(src);
      return;
    }

    // Unsplash optimization
    if (src.includes('unsplash.com')) {
      try {
        const url = new URL(src);
        url.searchParams.set('fm', 'webp');
        url.searchParams.set('auto', 'format');
        if (!url.searchParams.has('q')) {
          url.searchParams.set('q', '80');
        }
        optimizedSrc = url.toString();
      } catch (e) {
        // Invalid URL, use original
        optimizedSrc = src;
      }
    }
    // Supabase optimization (only for non-webp)
    else if (src.includes('supabase.co')) {
      try {
        const url = new URL(src);
        url.searchParams.set('format', 'webp');
        url.searchParams.set('quality', '80');
        optimizedSrc = url.toString();
      } catch (e) {
        optimizedSrc = src;
      }
    }

    setImageSrc(optimizedSrc);
  }, [src, autoOptimize]);

  // Check if image is already cached and load instantly
  useEffect(() => {
    setIsLoaded(false);
    
    // Create a temporary image to check cache status
    const img = new Image();
    img.src = imageSrc;
    
    // If image is already in cache (complete), show it immediately
    if (img.complete && img.naturalHeight !== 0) {
      setIsLoaded(true);
    }
  }, [imageSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // On error, mark as loaded to show alt text
    setIsLoaded(true);
  };

  return (
    <div 
      className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}
    >
      {/* Premium Skeleton Placeholder */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-yellow-100/90 via-orange-50/80 to-amber-100/90 animate-pulse ${skeletonClassName}`}
          aria-hidden="true"
        >
          {/* Shimmer overlay effect */}
          <div 
            className="absolute inset-0 -translate-x-full animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }}
          />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName} ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
export type { LazyImageProps };


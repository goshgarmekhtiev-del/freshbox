import React, { useState, useEffect } from 'react';

interface ImageWithPlaceholderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderClassName?: string;
  containerClassName?: string;
  /** Enable WebP format with fallback (default: true) */
  useWebP?: boolean;
  /** Lazy load image (default: true for below-fold content) */
  loading?: 'lazy' | 'eager';
}

/**
 * Premium image component with smooth fade-in and gradient placeholder
 * Features:
 * - Automatic WebP format detection with fallback
 * - Lazy loading for performance
 * - Async decoding to prevent blocking
 * - Zero layout shift with absolute positioning
 * - Smooth fade-in transition
 */
const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  alt,
  placeholderClassName = '',
  containerClassName = '',
  className = '',
  useWebP = true,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [supportsWebP, setSupportsWebP] = useState(true);

  // Detect WebP support on mount
  useEffect(() => {
    if (!useWebP) {
      setSupportsWebP(false);
      return;
    }

    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      if (canvas.getContext && canvas.getContext('2d')) {
        // Check WebP support
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;
    };

    setSupportsWebP(checkWebPSupport());
  }, [useWebP]);

  // Convert image URL to WebP format if supported
  useEffect(() => {
    let finalSrc = src;

    if (useWebP && supportsWebP) {
      // For Unsplash images, add WebP format parameter
      if (src.includes('unsplash.com')) {
        const url = new URL(src);
        url.searchParams.set('fm', 'webp');
        finalSrc = url.toString();
      }
      // For Supabase images, add WebP conversion
      else if (src.includes('supabase.co/storage')) {
        // Supabase supports format transformation via URL params
        const url = new URL(src);
        url.searchParams.set('format', 'webp');
        finalSrc = url.toString();
      }
      // For local images, try .webp extension
      else if (src.startsWith('/')) {
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        finalSrc = webpSrc;
      }
    }

    setImageSrc(finalSrc);
  }, [src, useWebP, supportsWebP]);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);

    // Preload image
    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      // If WebP fails, try fallback to original format
      if (useWebP && imageSrc !== src) {
        setImageSrc(src);
      } else {
        setHasError(true);
        setIsLoaded(true); // Show alt text
      }
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, src, useWebP]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Placeholder gradient - absolute positioned */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-brand-accent-light/40 via-brand-bg to-brand-yellow/30 animate-pulse ${placeholderClassName}`}
          aria-hidden="true"
        >
          {/* Optional shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      )}

      {/* Actual image - absolute positioned for zero layout shift */}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`absolute inset-0 ${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />

      {/* Error state (optional) */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-bg text-brand-text-soft text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default ImageWithPlaceholder;

import React from 'react';

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  src: string;
  alt: string;
  sizes?: string;
  /**
   * Breakpoints for responsive images
   * Format: { width: number; url: string }[]
   */
  srcSet?: { width: number; url: string }[];
  /**
   * Lazy loading (default: true for below-fold images)
   */
  loading?: 'lazy' | 'eager';
  /**
   * Decode strategy
   */
  decoding?: 'async' | 'sync' | 'auto';
  /**
   * Generate srcset from Unsplash URL (auto-optimization)
   */
  autoOptimize?: boolean;
}

/**
 * ResponsiveImage Component
 * 
 * Optimizes images with:
 * - srcset for multiple resolutions
 * - sizes attribute for proper image selection
 * - Lazy loading for below-fold images
 * - WebP auto-conversion (via Unsplash/Supabase)
 * - Async decoding for performance
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  srcSet,
  loading = 'lazy',
  decoding = 'async',
  autoOptimize = false,
  className = '',
  ...props
}) => {
  // Generate srcset string from array
  const generateSrcSet = (): string | undefined => {
    if (!srcSet || srcSet.length === 0) {
      // Auto-generate from Unsplash URL
      if (autoOptimize && src.includes('unsplash.com')) {
        const baseUrl = src.split('?')[0];
        return [
          `${baseUrl}?auto=format&fit=crop&w=400&q=75 400w`,
          `${baseUrl}?auto=format&fit=crop&w=800&q=80 800w`,
          `${baseUrl}?auto=format&fit=crop&w=1200&q=85 1200w`,
          `${baseUrl}?auto=format&fit=crop&w=1600&q=85 1600w`
        ].join(', ');
      }
      
      // Auto-generate from Supabase URL
      if (autoOptimize && src.includes('supabase.co')) {
        // Supabase storage supports transformation params
        const baseUrl = src;
        return [
          `${baseUrl}?width=400&quality=75 400w`,
          `${baseUrl}?width=800&quality=80 800w`,
          `${baseUrl}?width=1200&quality=85 1200w`
        ].join(', ');
      }
      
      return undefined;
    }

    return srcSet
      .map(({ width, url }) => `${url} ${width}w`)
      .join(', ');
  };

  const srcSetString = generateSrcSet();

  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSetString}
      sizes={sizes}
      loading={loading}
      decoding={decoding}
      className={className}
      {...props}
    />
  );
};

export { ResponsiveImage };
export type { ResponsiveImageProps };

import React, { useState, useEffect, useRef } from 'react';

// 🔧 ДИАГНОСТИКА: Флаг для включения логов
const DEBUG_BLINK = typeof window !== 'undefined' && localStorage.getItem('DEBUG_BLINK') === '1';

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
  const prevImageSrcRef = useRef<string>(src);
  const isLoadedRef = useRef<boolean>(false);

  // Optimize image URL if autoOptimize is enabled
  // 🔧 ФИКС: Не обновляем imageSrc если src не изменился реально
  useEffect(() => {
    if (!autoOptimize) {
      // Если src не изменился - не трогаем imageSrc
      if (imageSrc !== src && prevImageSrcRef.current !== src) {
        if (DEBUG_BLINK) console.log('[LazyImage] Setting imageSrc to src (no optimization)', { src });
        setImageSrc(src);
      }
      return;
    }

    let optimizedSrc = src;

    // Skip optimization if already webp
    if (src.endsWith('.webp') || src.includes('.webp?')) {
      // Если src не изменился - не трогаем imageSrc
      if (imageSrc !== src && prevImageSrcRef.current !== src) {
        if (DEBUG_BLINK) console.log('[LazyImage] Setting imageSrc to src (already webp)', { src });
        setImageSrc(src);
      }
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

    // Обновляем только если оптимизированный URL отличается от текущего
    if (optimizedSrc !== imageSrc && optimizedSrc !== prevImageSrcRef.current) {
      if (DEBUG_BLINK) console.log('[LazyImage] Setting optimized imageSrc', { src, optimizedSrc });
      setImageSrc(optimizedSrc);
    }
  }, [src, autoOptimize, imageSrc]);

  // Check if image is already cached and load instantly
  // 🔧 ФИКС: Не сбрасываем isLoaded если imageSrc не изменился реально
  useEffect(() => {
    // SSR-safe: проверяем наличие window
    if (typeof window === 'undefined') return;
    
    // Если imageSrc не изменился и изображение уже загружено - не трогаем
    if (imageSrc === prevImageSrcRef.current && isLoadedRef.current) {
      if (DEBUG_BLINK) console.log('[LazyImage] Skipping reset - imageSrc unchanged and already loaded', { imageSrc });
      return;
    }
    
    if (DEBUG_BLINK) {
      console.log('[LazyImage] Image src changed or not loaded', {
        prev: prevImageSrcRef.current,
        new: imageSrc,
        wasLoaded: isLoadedRef.current
      });
    }
    
    prevImageSrcRef.current = imageSrc;
    setIsLoaded(false);
    isLoadedRef.current = false;
    
    // Create a temporary image to check cache status
    const img = new Image();
    img.src = imageSrc;
    
    // If image is already in cache (complete), show it immediately
    if (img.complete && img.naturalHeight !== 0) {
      if (DEBUG_BLINK) console.log('[LazyImage] Image already cached, setting loaded immediately');
      setIsLoaded(true);
      isLoadedRef.current = true;
    }
  }, [imageSrc]);

  const handleLoad = () => {
    if (DEBUG_BLINK) console.log('[LazyImage] handleLoad called', { imageSrc });
    setIsLoaded(true);
    isLoadedRef.current = true;
  };

  const handleError = () => {
    if (DEBUG_BLINK) console.log('[LazyImage] handleError called', { imageSrc });
    // On error, mark as loaded to show alt text
    setIsLoaded(true);
    isLoadedRef.current = true;
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


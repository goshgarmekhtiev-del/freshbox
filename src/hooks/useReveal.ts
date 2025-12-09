import { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

/**
 * Custom hook for reveal animations using IntersectionObserver
 * 
 * @param options - Configuration options
 * @returns Object containing ref to attach to element and visibility state
 * 
 * @example
 * const { ref, isVisible } = useReveal({ threshold: 0.2, triggerOnce: true });
 * <div ref={ref} className={`reveal ${isVisible ? 'reveal-visible' : ''}`}>
 */
export const useReveal = (options: UseRevealOptions = {}) => {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create observer with optimized settings for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply delay if specified
            if (delay > 0) {
              setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }

            // Disconnect after first trigger if triggerOnce is true
            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isVisible };
};

/**
 * Hook for staggered reveals in lists
 * 
 * @param count - Number of items
 * @param baseDelay - Base delay in ms
 * @param staggerDelay - Delay between items in ms
 * @returns Array of reveal objects for each item
 * 
 * @example
 * const reveals = useStaggeredReveal(products.length, 0, 100);
 * {products.map((product, i) => (
 *   <div ref={reveals[i].ref} className={reveals[i].isVisible ? 'reveal-visible' : ''}>
 * ))}
 */
export const useStaggeredReveal = (
  count: number,
  baseDelay: number = 0,
  staggerDelay: number = 100
) => {
  const reveals = Array.from({ length: count }, (_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useReveal({
      threshold: 0.05,  // More aggressive - trigger earlier (was 0.1)
      rootMargin: '0px 0px 0px 0px',  // No negative margin to avoid hiding on mobile
      triggerOnce: true,
      delay: baseDelay + index * staggerDelay
    })
  );

  return reveals;
};

export default useReveal;

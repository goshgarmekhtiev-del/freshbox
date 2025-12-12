import { useEffect, useRef, useState, useMemo } from 'react';

// 🔧 ДИАГНОСТИКА: Флаг для включения логов
const DEBUG_BLINK = typeof window !== 'undefined' && localStorage.getItem('DEBUG_BLINK') === '1';

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
  // 🔧 ФИКС: Мемоизируем options, чтобы useEffect не перезапускался из-за нового объекта
  const memoizedOptions = useMemo(() => options, [
    options.threshold,
    options.rootMargin,
    options.triggerOnce,
    options.delay
  ]);

  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = memoizedOptions;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // 🔧 ФИКС: Ref для хранения предыдущего значения, чтобы не вызывать setState без необходимости
  const prevIsVisibleRef = useRef(false);
  // 🔧 ФИКС: Флаг для отслеживания, был ли уже reveal при triggerOnce=true
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 🔧 ФИКС: Сбрасываем флаг при изменении зависимостей (новый элемент/настройки)
    hasRevealedRef.current = false;
    prevIsVisibleRef.current = false;

    // 🔧 ФИКС: Улучшенные настройки observer для предотвращения ложных срабатываний
    // Используем threshold (по умолчанию 0.15 - элемент должен быть виден минимум на 15%) и небольшой отрицательный rootMargin
    const optimizedThreshold = threshold !== undefined ? threshold : 0.15;
    const optimizedRootMargin = rootMargin !== undefined ? rootMargin : '0px 0px -10% 0px'; // Элемент считается видимым только когда реально вошёл в область

    // Create observer with optimized settings for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 🔧 ФИКС: Если triggerOnce=true и уже был reveal - полностью игнорируем callbacks
          if (triggerOnce && hasRevealedRef.current) {
            if (DEBUG_BLINK) {
              console.log('[useReveal] Ignoring callback - already revealed (triggerOnce=true)', {
                isIntersecting: entry.isIntersecting,
                intersectionRatio: entry.intersectionRatio
              });
            }
            return;
          }

          if (DEBUG_BLINK) {
            console.log('[useReveal] IntersectionObserver callback', {
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              triggerOnce,
              hasRevealed: hasRevealedRef.current,
              currentIsVisible: prevIsVisibleRef.current
            });
          }

          if (entry.isIntersecting) {
            // 🔧 ФИКС: Вызываем setState только если значение реально изменилось И ещё не было reveal
            if (!prevIsVisibleRef.current && !hasRevealedRef.current) {
              prevIsVisibleRef.current = true;
              
              // 🔧 ФИКС: При triggerOnce=true помечаем, что reveal уже произошёл
              if (triggerOnce) {
                hasRevealedRef.current = true;
                // 🔧 ФИКС: Немедленно отключаем observer, чтобы callbacks больше не приходили
                observer.unobserve(element);
                observer.disconnect();
              }

              // Apply delay if specified
              if (delay > 0) {
                setTimeout(() => {
                  if (DEBUG_BLINK) console.log('[useReveal] setIsVisible(true) after delay', delay);
                  setIsVisible(true);
                }, delay);
              } else {
                if (DEBUG_BLINK) console.log('[useReveal] setIsVisible(true) immediately');
                setIsVisible(true);
              }
            }
          } else if (!triggerOnce) {
            // 🔧 ФИКС: Вызываем setState только если значение реально изменилось
            if (prevIsVisibleRef.current) {
              prevIsVisibleRef.current = false;
              if (DEBUG_BLINK) console.log('[useReveal] setIsVisible(false) - element left viewport');
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold: optimizedThreshold,
        rootMargin: optimizedRootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      // 🔧 ФИКС: Сбрасываем флаги при размонтировании
      hasRevealedRef.current = false;
      prevIsVisibleRef.current = false;
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

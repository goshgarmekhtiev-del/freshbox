import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Hero, ProblemSolution, Catalog, WhyFreshBox, SuccessPage, FailPage } from '@/components/sections';
import CartSidebar from '@/components/CartSidebar';
import QuickViewModal from '@/components/QuickViewModal';
import SocialProof from '@/components/SocialProof';
import DecorativeBackground from '@/components/DecorativeBackground';
// import Marquee from '@/components/Marquee'; // 🔧 TEMP: Отключено для проверки моргания Hero
import MiniCart from '@/components/MiniCart';
import { Toast } from '@/components/ui';
import CookieBanner from '@/components/CookieBanner';
import type { Product, CartItem, NotificationData } from '@/types';
import { ArrowUp } from 'lucide-react';
import { fireConfetti } from '@/utils/confetti';
import { sendEvent } from '@/utils/metrics';
import { getCurrentUtmFromUrl, loadStoredUtm, saveUtmOnce, getEffectiveUtm } from '@/utils/utm';

// Lazy load heavy components that are below the fold
// These components load ONLY when user scrolls to them, reducing initial bundle size
const Configurator = lazy(() => import(/* webpackChunkName: "configurator" */ '@/components/Configurator'));
const Benefits = lazy(() => import(/* webpackChunkName: "benefits" */ '@/components/sections/Benefits'));
const HowItWorks = lazy(() => import(/* webpackChunkName: "how-it-works" */ '@/components/sections/HowItWorks'));
const Reviews = lazy(() => import(/* webpackChunkName: "reviews" */ '@/components/sections/Reviews'));
const B2B = lazy(() => import(/* webpackChunkName: "b2b" */ '@/components/sections/B2B'));
const FAQ = lazy(() => import(/* webpackChunkName: "faq" */ '@/components/sections/FAQ'));
const Footer = lazy(() => import(/* webpackChunkName: "footer" */ '@/components/Footer'));

// 🔧 ДИАГНОСТИКА: Флаг для включения логов (localStorage.DEBUG_BLINK=1)
const DEBUG_BLINK = typeof window !== 'undefined' && localStorage.getItem('DEBUG_BLINK') === '1';

// 🔧 ДИАГНОСТИКА: Throttle для логов (не чаще 1 раза в 500ms)
let lastLogTime = 0;
const throttledLog = (key: string, value: any) => {
  if (!DEBUG_BLINK) return;
  const now = Date.now();
  if (now - lastLogTime < 500) return;
  lastLogTime = now;
  console.log(`[APP STATE] ${key}:`, value);
};

const App: React.FC = () => {
  // 🔧 ДИАГНОСТИКА: Логи MOUNT/UNMOUNT для App
  useEffect(() => {
    if (DEBUG_BLINK) {
      console.log('[APP] MOUNT', { timestamp: Date.now() });
    }
    return () => {
      if (DEBUG_BLINK) {
        console.log('[APP] UNMOUNT', { timestamp: Date.now() });
      }
    };
  }, []);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Toast система зарезервирована для error-сценариев (сетевые ошибки, проблемы оформления и т.п.)
  // Success toast при добавлении в корзину убран для премиального UX
  // @ts-ignore - Reserved for future error toasts
  const [showToast, setShowToast] = useState(false);
  // @ts-ignore - Reserved for future error toasts  
  const [toastMessage, setToastMessage] = useState('');
  
  const [lastOrder, setLastOrder] = useState<NotificationData | null>(null);
  
  // Track if user is in the order/checkout section
  const [isInOrderSection, setIsInOrderSection] = useState(false);

  // 🔧 ФИКС: Ref для хранения предыдущего значения showScrollTop, чтобы не вызывать setState на каждом скролле
  const prevShowScrollTopRef = useRef(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll('.reveal');
      sections.forEach(section => observer.observe(section));
    }, 100);

    // 🔧 ФИКС: Вызываем setState только при реальном изменении значения
    const handleScroll = () => {
      const newValue = window.scrollY > 400;
      if (newValue !== prevShowScrollTopRef.current) {
        prevShowScrollTopRef.current = newValue;
        setShowScrollTop(newValue);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track when user enters/exits the order form section
  // This is used to hide the floating MiniCart widget when user is already in checkout
  useEffect(() => {
    const orderFormElement = document.getElementById('order-form');
    if (!orderFormElement) return;

    const observerOptions = {
      threshold: 0.3, // At least 30% of the section is visible
      rootMargin: "0px 0px -100px 0px"
    };

    const orderObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Show/hide floating cart based on whether user is viewing the order section
        setIsInOrderSection(entry.isIntersecting);
      });
    }, observerOptions);

    // Small delay to ensure OrderForm is rendered (it's lazy loaded)
    const timeoutId = setTimeout(() => {
      orderObserver.observe(orderFormElement);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      orderObserver.disconnect();
    };
  }, []);

  // Инициализация UTM при первом заходе
  useEffect(() => {
    const utmFromUrl = getCurrentUtmFromUrl();
    const stored = loadStoredUtm();
    
    if (!stored && Object.keys(utmFromUrl).length > 0) {
      // Если есть UTM в URL и нет сохранённых данных — сохраняем
      saveUtmOnce(utmFromUrl);
    } else if (!stored && Object.keys(utmFromUrl).length === 0) {
      // Если пользователь пришёл без UTM — всё равно сохраняем referrer и first_visit_time
      saveUtmOnce({});
    }
    
    // Логирование для отладки
    console.log("[UTM] effective utm:", getEffectiveUtm());
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('freshbox_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          setCart([]);
          localStorage.removeItem('freshbox_cart');
        }
      } catch (e) {
        console.error('Failed to parse cart', e);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('freshbox_cart', JSON.stringify(cart));
  }, [cart]);

  // 🔧 ФИКС: Мемоизируем функции, чтобы они не пересоздавались при каждом рендере
  const addToCart = useCallback((product: Product, quantity = 1, e?: React.MouseEvent | React.TouchEvent) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    // Отправляем событие в Яндекс Метрику
    sendEvent("Add_To_Cart", { id: product.id, name: product.name });
    
    // ✅ Toast убран для более премиального UX
    // Визуальная обратная связь:
    // - Кнопка "Добавлено" с зелёной галочкой
    // - Обновление счётчика корзины
    // - Confetti эффект
    // - MiniCart виджет
    
    if (e) fireConfetti(e);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  }, []);

  const handleOrderComplete = useCallback((data: NotificationData) => {
    setLastOrder(data);
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  /**
   * Determines if the floating cart widget should be visible
   * Conditions:
   * - Cart has items
   * - User is NOT in the order/checkout section
   */
  const shouldShowFloatingCart = useCallback(() => {
    const result = cart.length > 0 && !isInOrderSection;
    throttledLog('shouldShowFloatingCart', { result, cartLength: cart.length, isInOrderSection });
    return result;
  }, [cart.length, isInOrderSection]);

  // 🔧 ФИКС: Hero вынесен в отдельный стабильный компонент, который не зависит от cart/menu состояний
  // Это предотвращает ремоунт Hero при пересоздании HomePage из-за изменений зависимостей
  const HeroSection = React.useMemo(() => {
    return <Hero />;
  }, []); // Пустой массив зависимостей - Hero рендерится только один раз

  // 🔧 ФИКС: Используем useRef для хранения актуальных ссылок на функции
  // Это позволяет HomePage не пересоздаваться, но иметь доступ к актуальным значениям
  const handlersRef = useRef({
    addToCart,
    setQuickViewProduct
  });

  // Обновляем refs при изменении значений
  useEffect(() => {
    handlersRef.current = {
      addToCart,
      setQuickViewProduct
    };
  }, [addToCart, setQuickViewProduct]);

  // Main Home Page Component - стабильный компонент, который не пересоздаётся
  // 🔧 ФИКС: Используем стабильную функцию-компонент, которая берёт актуальные значения из refs
  // Функция не пересоздаётся, но имеет доступ к актуальным значениям через refs
  const HomePage = React.useCallback(() => {
    // 🔧 ДИАГНОСТИКА: Логи MOUNT/UNMOUNT для HomePage
    React.useEffect(() => {
      if (DEBUG_BLINK) {
        console.log('[HOMEPAGE] MOUNT', { timestamp: Date.now() });
      }
      return () => {
        if (DEBUG_BLINK) {
          console.log('[HOMEPAGE] UNMOUNT', { timestamp: Date.now() });
        }
      };
    }, []);

    // Используем актуальные значения из refs
    const handlers = handlersRef.current;

    return (
      <>
        {/* 🔧 ФИКС CLS: Постоянный padding-bottom для мобильной панели корзины (h-20 = 5rem = 80px) */}
        <main className="relative z-10 pt-20 pb-20 md:pb-0">
        {/* 
          🎯 CONVERSION FUNNEL FOR COLD TRAFFIC (TikTok/Reels/Shorts)
          Target: Get user to catalog in 10-15 seconds (1-2 swipes on mobile)
        */}
        
        {/* Step 1: HERO - Hook & Value Proposition (3-5 sec) */}
        {/* 🔧 ФИКС: Hero рендерится из мемоизированного компонента, не зависит от cart/menu */}
        {HeroSection}
        
        {/* Step 2: MARQUEE - Social proof & trust triggers (2-3 sec) */}
        {/* 🔧 TEMP: Отключено для проверки моргания Hero */}
        {/* <Marquee speed="normal" className="relative z-10" /> */}
        
        {/* Step 3: CATALOG - IMMEDIATE CONVERSION OPPORTUNITY (5-10 sec) 
            🚀 KEY CHANGE: Moved catalog right after hook to minimize friction
            User sees products BEFORE reading explanations = faster decision
        */}
        <Catalog 
          onAdd={(p, e) => {
            console.log('[HOMEPAGE] Catalog onAdd called', { productId: p.id });
            handlers.addToCart(p, 1, e);
          }} 
          onQuickView={(product) => {
            console.log('[HOMEPAGE] Catalog onQuickView called', { productId: product?.id, handlerType: typeof handlers.setQuickViewProduct });
            handlers.setQuickViewProduct(product);
            console.log('[HOMEPAGE] setQuickViewProduct called');
          }} 
        />
        
        {/* Step 4-5: SOCIAL PROOF & BENEFITS - Why choose us (for interested users) */}
        <ProblemSolution />
        <WhyFreshBox />
        
        {/* Below-fold: Supporting content (lazy-loaded for performance) */}
        <Suspense fallback={
          <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-lime-50">
            <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <HowItWorks />
          <Reviews />
          <Benefits />
          <Configurator onAddCustom={(p, e) => addToCart(p, 1, e)} />
          <B2B />
          <FAQ />
          <Footer />
        </Suspense>
      </main>

      {/* Global UI Elements - вынесены из HomePage, чтобы они получали актуальные props */}
      {/* Эти компоненты рендерятся на уровне App, поэтому они всегда получают актуальные значения */}
    </> 
    );
    // 🔧 ФИКС: Только HeroSection в зависимостях - функция не пересоздаётся при изменении cart/menu
    // Актуальные значения берём из refs, которые обновляются через useEffect
  }, [HeroSection]);

  return (
    <div 
      className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden"
      style={{ overflowAnchor: 'none' }}
    >
      {/* Premium Decorative Background - NO scroll dependencies */}
      <DecorativeBackground />
      
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/fail" element={<FailPage />} />
      </Routes>

      {/* 🔧 ФИКС: Global UI Elements вынесены из HomePage на уровень App */}
      {/* Это гарантирует, что они получают актуальные props и не вызывают ремоунт HomePage */}
      <SocialProof customNotification={lastOrder} />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onQuickView={setQuickViewProduct}
        onOrderComplete={handleOrderComplete}
      />

      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={2000}
        type="success"
      />

      {/* Mini Cart Widget - Floating 
          Only shown when:
          1. Cart has items
          2. User is NOT in the order/checkout section
          
          Click behavior: Opens CartSidebar for quick access
      */}
      {/* 🔧 ФИКС: MiniCart должен быть pointer-events-none когда модалка открыта */}
      <MiniCart 
        cart={cart}
        onCheckout={() => setIsCartOpen(true)}
        isVisible={shouldShowFloatingCart() && !quickViewProduct}
      />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 w-14 h-14 bg-brand-accent text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-40 hover:scale-110 hover:bg-brand-accent-dark ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>

      {/* Cookie Banner - показывается внизу экрана до согласия */}
      <CookieBanner />
    </div>
  );
};

export default App;

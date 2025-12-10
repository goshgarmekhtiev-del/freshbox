import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { Hero, ProblemSolution, Catalog, WhyFreshBox } from '@/components/sections';
import CartSidebar from '@/components/CartSidebar';
import QuickViewModal from '@/components/QuickViewModal';
import SocialProof from '@/components/SocialProof';
import DecorativeBackground from '@/components/DecorativeBackground';
import Marquee from '@/components/Marquee';
import MiniCart from '@/components/MiniCart';
import { Toast } from '@/components/ui';
import type { Product, CartItem, NotificationData } from '@/types';
import { ArrowUp } from 'lucide-react';
import { fireConfetti } from '@/utils/confetti';

// Lazy load heavy components that are below the fold
// These components load ONLY when user scrolls to them, reducing initial bundle size
const Configurator = lazy(() => import(/* webpackChunkName: "configurator" */ '@/components/Configurator'));
const Benefits = lazy(() => import(/* webpackChunkName: "benefits" */ '@/components/sections/Benefits'));
const HowItWorks = lazy(() => import(/* webpackChunkName: "how-it-works" */ '@/components/sections/HowItWorks'));
const Reviews = lazy(() => import(/* webpackChunkName: "reviews" */ '@/components/sections/Reviews'));
const B2B = lazy(() => import(/* webpackChunkName: "b2b" */ '@/components/sections/B2B'));
const FAQ = lazy(() => import(/* webpackChunkName: "faq" */ '@/components/sections/FAQ'));
const OrderForm = lazy(() => import(/* webpackChunkName: "order-form" */ '@/components/OrderForm'));
const Footer = lazy(() => import(/* webpackChunkName: "footer" */ '@/components/Footer'));

const App: React.FC = () => {
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

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

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

  const addToCart = (product: Product, quantity = 1, e?: React.MouseEvent | React.TouchEvent) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    // ✅ Toast убран для более премиального UX
    // Визуальная обратная связь:
    // - Кнопка "Добавлено" с зелёной галочкой
    // - Обновление счётчика корзины
    // - Confetti эффект
    // - MiniCart виджет
    
    if (e) fireConfetti(e);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleOrderSubmit = (formData: any) => {
    console.log('Order submitted:', { formData, cart });
    setCart([]);
    localStorage.removeItem('freshbox_cart');
  };
  
  const handleOrderComplete = (data: NotificationData) => {
    setLastOrder(data);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  /**
   * Determines if the floating cart widget should be visible
   * Conditions:
   * - Cart has items
   * - User is NOT in the order/checkout section
   */
  const shouldShowFloatingCart = () => {
    return cart.length > 0 && !isInOrderSection;
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
      {/* Premium Decorative Background - NO scroll dependencies */}
      <DecorativeBackground />
      
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="relative z-10 pt-20">
        {/* 
          🎯 CONVERSION FUNNEL FOR COLD TRAFFIC (TikTok/Reels/Shorts)
          Target: Get user to catalog in 10-15 seconds (1-2 swipes on mobile)
        */}
        
        {/* Step 1: HERO - Hook & Value Proposition (3-5 sec) */}
        <Hero />
        
        {/* Step 2: MARQUEE - Social proof & trust triggers (2-3 sec) */}
        <Marquee speed="normal" className="relative z-10" />
        
        {/* Step 3: CATALOG - IMMEDIATE CONVERSION OPPORTUNITY (5-10 sec) 
            🚀 KEY CHANGE: Moved catalog right after hook to minimize friction
            User sees products BEFORE reading explanations = faster decision
        */}
        <Catalog onAdd={(p, e) => addToCart(p, 1, e)} onQuickView={setQuickViewProduct} />
        
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
          <OrderForm 
            cart={cart} 
            onSubmit={handleOrderSubmit} 
            onOrderComplete={handleOrderComplete}
            onUpdateQty={updateQuantity}
            onRemove={removeFromCart}
          />
          <Footer />
        </Suspense>
      </main>

      {/* Global UI Elements */}
      <SocialProof customNotification={lastOrder} />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onQuickView={setQuickViewProduct}
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
      <MiniCart 
        cart={cart}
        onCheckout={() => setIsCartOpen(true)}
        isVisible={shouldShowFloatingCart()}
      />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 w-14 h-14 bg-brand-accent text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-40 hover:scale-110 hover:bg-brand-accent-dark ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>
    </div>
  );
};

export default App;

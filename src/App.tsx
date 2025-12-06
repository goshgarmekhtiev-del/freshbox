import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Catalog from './components/Catalog';
import Configurator from './components/Configurator';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import B2B from './components/B2B';
import FAQ from './components/FAQ';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import QuickViewModal from './components/QuickViewModal';
import SocialProof from './components/SocialProof';
import FruitBackground from './components/FruitBackground';
import type { Product, CartItem, NotificationData } from './types';
import { ArrowUp } from 'lucide-react';
import { fireConfetti } from './utils/confetti';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const [lastOrder, setLastOrder] = useState<NotificationData | null>(null);

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

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
      <FruitBackground />
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="relative z-10">
        <Hero />
        <ProblemSolution />
        <Catalog onAdd={(p, e) => addToCart(p, 1, e)} onQuickView={setQuickViewProduct} />
        <Configurator onAddCustom={(p, e) => addToCart(p, 1, e)} />
        <Benefits />
        <HowItWorks />
        <Reviews />
        <B2B />
        <FAQ />
        <OrderForm 
          cart={cart} 
          onSubmit={handleOrderSubmit} 
          onOrderComplete={handleOrderComplete}
          onUpdateQty={updateQuantity}
          onRemove={removeFromCart}
        />
      </main>

      <Footer />
      <SocialProof customNotification={lastOrder} />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />

      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
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


import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBasket, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(cartCount);
  
  // 🔧 ФИКС: Ref для хранения предыдущего значения scrolled, чтобы не вызывать setState на каждом скролле
  const prevScrolledRef = useRef(false);

  useEffect(() => {
    // 🔧 ФИКС: Вызываем setState только при реальном изменении значения
    const handleScroll = () => {
      const newValue = window.scrollY > 20;
      if (newValue !== prevScrolledRef.current) {
        prevScrolledRef.current = newValue;
        setScrolled(newValue);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger cart bounce animation when count changes
  useEffect(() => {
    if (cartCount > prevCartCount) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 600);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 transition-[backdrop-filter,background-color,border-color,box-shadow,border-radius,padding] duration-500 ${
        scrolled || isMenuOpen 
          ? 'backdrop-blur-xl bg-white/90 border border-brand-accent/10 shadow-[--shadow-elevated] rounded-2xl py-3 px-6' 
          : 'backdrop-blur-md bg-white/60 border border-white/20 shadow-[--shadow-soft] rounded-full py-3 px-4'
      }`}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Logo - Compact */}
        <div 
          className="flex items-center gap-2 cursor-pointer group flex-shrink-0" 
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="text-xl sm:text-2xl transition-transform duration-300 group-hover:rotate-12" role="img" aria-label="orange">🍊</div>
          <span className="text-lg sm:text-xl font-black text-brand-text tracking-tight hover:scale-105 transition-transform duration-300 whitespace-nowrap">
            Fresh<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-yellow">Box</span>
          </span>
        </div>

        {/* Desktop Nav - Minimalist */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {['catalog', 'configurator', 'b2b', 'reviews'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)} 
              className="relative px-4 py-2 text-brand-text/70 hover:text-brand-text font-medium text-sm transition-all duration-300 rounded-full hover:bg-brand-accent/5 group"
            >
              <span className="relative z-10">
                {item === 'catalog' ? 'Фрукты' : 
                 item === 'configurator' ? 'Конструктор' :
                 item === 'b2b' ? 'Офисам' : 'Отзывы'}
              </span>
            </button>
          ))}
        </div>

        {/* Actions - Compact */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a 
            href="tel:+79990000000" 
            className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full font-medium text-xs text-brand-text/70 hover:text-brand-accent hover:bg-brand-accent/5 transition-all duration-300 whitespace-nowrap"
          >
            <Phone size={16} strokeWidth={2.5} />
            <span>+7 (999) 000-00-00</span>
          </a>
          
          <button 
            id="cart-trigger" 
            onClick={onOpenCart}
            aria-label={`Корзина: ${cartCount} ${cartCount === 1 ? 'товар' : 'товаров'}`}
            className="relative min-w-[40px] min-h-[40px] px-4 py-2 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300 shadow-[--shadow-elevated] group flex items-center justify-center"
          >
            <ShoppingBasket 
              size={18} 
              strokeWidth={2.5} 
              className={`transition-transform duration-300 ${
                cartBounce ? 'animate-cart-bounce' : ''
              }`} 
            />
            {cartCount > 0 && (
              <span className={`absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-black min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full border-2 border-white shadow-[--shadow-elevated] transition-transform duration-300 ${
                cartBounce ? 'scale-125' : 'scale-100'
              }`}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          <button 
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="md:hidden p-2 text-brand-text/70 hover:text-brand-accent transition-colors duration-300 active:scale-95 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-brand-accent/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Floating Style */}
      <div className={`md:hidden absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-white/95 border border-brand-accent/10 shadow-[--shadow-elevated] rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="py-4 px-4 flex flex-col items-stretch gap-2">
          {['catalog', 'configurator', 'b2b', 'reviews'].map((item, index) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)} 
              className="w-full py-3 px-4 text-base font-medium text-brand-text hover:text-brand-accent hover:bg-brand-accent/5 transition-all duration-300 rounded-xl text-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item === 'catalog' ? 'Фрукты' : 
               item === 'configurator' ? 'Конструктор' :
               item === 'b2b' ? 'Офисам' : 'Отзывы'}
            </button>
          ))}
          <a 
            href="tel:+79990000000" 
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-brand-text hover:text-white hover:bg-gradient-to-r hover:from-brand-accent hover:via-brand-accent-dark hover:to-brand-yellow transition-all duration-300"
          >
            <Phone size={18} strokeWidth={2.5} />
            <span>+7 (999) 000-00-00</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

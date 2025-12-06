
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
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
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || isMenuOpen 
          ? 'glass border-b-2 border-brand-accent/30 shadow-[--shadow-elevated] py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="text-2xl sm:text-3xl" role="img" aria-label="orange">🍊</div>
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-text tracking-tighter hover:scale-105 transition-transform duration-300">
            Fresh<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">.</span>Box
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-brand-text font-bold text-base tracking-wide">
          {['catalog', 'configurator', 'b2b', 'reviews'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)} 
              className="relative py-2 hover:text-brand-accent transition-all duration-300 group"
            >
              <span className="relative z-10">
                {item === 'catalog' ? 'Фрукты' : 
                 item === 'configurator' ? 'Конструктор' :
                 item === 'b2b' ? 'Офисам' : 'Отзывы'}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a 
            href="tel:+79990000000" 
            className="hidden lg:flex items-center gap-2.5 px-5 py-3 glass-dark rounded-full font-bold text-sm text-brand-text hover:bg-gradient-to-r hover:from-brand-accent hover:via-brand-accent-dark hover:to-brand-yellow hover:text-white transition-all duration-300 hover:scale-105 shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] border-2 border-brand-accent/20 hover:border-transparent"
          >
            <Phone size={16} strokeWidth={2.5} />
            <span className="whitespace-nowrap">+7 (999) 000-00-00</span>
          </a>
          
          <button 
            id="cart-trigger" 
            onClick={onOpenCart}
            aria-label={`Корзина: ${cartCount} ${cartCount === 1 ? 'товар' : 'товаров'}`}
            className="relative min-w-[48px] min-h-[48px] px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300 shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] group border-2 border-white/30"
          >
            <ShoppingBasket 
              size={20} 
              strokeWidth={2.5} 
              className={`transition-transform duration-300 ${
                cartBounce ? 'animate-cart-bounce' : ''
              }`} 
            />
            {cartCount > 0 && (
              <span className={`absolute -top-1.5 -right-1.5 bg-brand-green text-white text-xs font-black min-w-[24px] h-6 px-1.5 flex items-center justify-center rounded-full border-2 border-white shadow-[--shadow-soft] transition-transform duration-300 ${
                cartBounce ? 'scale-125' : 'scale-100'
              }`}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          <button 
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="md:hidden p-2.5 text-brand-text hover:text-brand-accent transition-colors duration-300 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full glass border-t-2 border-brand-accent/30 shadow-[--shadow-elevated] overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="py-6 px-4 flex flex-col items-center gap-4">
          {['catalog', 'configurator', 'b2b', 'reviews'].map((item, index) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)} 
              className="w-full max-w-xs py-3.5 px-6 text-xl font-bold text-brand-text hover:text-white hover:bg-gradient-to-r hover:from-brand-accent hover:via-brand-accent-dark hover:to-brand-yellow transition-all duration-300 rounded-full hover:scale-105 active:scale-95"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item === 'catalog' ? 'Фрукты' : 
               item === 'configurator' ? 'Конструктор' :
               item === 'b2b' ? 'Офисам' : 'Отзывы'}
            </button>
          ))}
          <a 
            href="tel:+79990000000" 
            className="mt-2 flex items-center gap-2.5 px-6 py-3 glass-dark rounded-full font-bold text-base text-brand-text hover:bg-gradient-to-r hover:from-brand-accent hover:via-brand-accent-dark hover:to-brand-yellow hover:text-white transition-all duration-300 hover:scale-105 shadow-[--shadow-soft] border-2 border-brand-accent/20"
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

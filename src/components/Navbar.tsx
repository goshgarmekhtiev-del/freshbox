
import React, { useState, useEffect } from 'react';
import { ShoppingBasket, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
          <span className="text-3xl font-serif font-extrabold text-brand-text tracking-tighter hover:scale-105 transition-transform">
            Fresh<span className="text-brand-accent">.</span>Box
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-brand-text font-bold text-sm tracking-wide">
          {['catalog', 'configurator', 'b2b', 'reviews'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)} 
              className="hover:text-brand-accent transition-colors py-2"
            >
              {item === 'catalog' ? 'Фрукты' : 
               item === 'configurator' ? 'Конструктор' :
               item === 'b2b' ? 'Офисам' : 'Отзывы'}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a href="tel:+79990000000" className="hidden lg:flex items-center gap-2 px-4 py-2 bg-brand-accent-light/30 text-brand-text rounded-full font-bold text-sm hover:bg-brand-accent hover:text-white transition-colors">
            <Phone size={16} />
            <span>+7 (999) 000-00-00</span>
          </a>
          
          <button 
            id="cart-trigger" 
            onClick={onOpenCart}
            className="relative p-3 bg-brand-text text-white rounded-full hover:bg-brand-accent transition-colors shadow-lg group"
          >
            <ShoppingBasket size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-accent-dark text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className="md:hidden p-2 text-brand-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 flex flex-col items-center gap-6 animate-fade-in-up">
          <button onClick={() => scrollTo('catalog')} className="text-2xl font-bold text-brand-text">Фрукты</button>
          <button onClick={() => scrollTo('configurator')} className="text-2xl font-bold text-brand-text">Конструктор</button>
          <button onClick={() => scrollTo('b2b')} className="text-2xl font-bold text-brand-text">Офисам</button>
          <button onClick={() => scrollTo('reviews')} className="text-2xl font-bold text-brand-text">Отзывы</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

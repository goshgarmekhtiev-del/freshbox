
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || isMenuOpen 
          ? 'glass border-b-2 border-orange-200/40 shadow-medium py-4' 
          : 'bg-transparent py-7'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="text-5xl" role="img" aria-label="orange">🍊</div>
          <span className="text-4xl font-black text-brown-900 tracking-tighter hover:scale-105 transition-transform duration-300">
            Fresh<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-peach-500 to-honey-400">.</span>Box
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-brown-900 font-bold text-base tracking-wide">
          {['catalog', 'configurator', 'b2b', 'reviews'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item)} 
              className="relative py-2 hover:text-orange-500 transition-all duration-300 group"
            >
              <span className="relative z-10">
                {item === 'catalog' ? 'Фрукты' : 
                 item === 'configurator' ? 'Конструктор' :
                 item === 'b2b' ? 'Офисам' : 'Отзывы'}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-400 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a 
            href="tel:+79990000000" 
            className="hidden lg:flex items-center gap-3 px-6 py-3.5 glass-dark rounded-full font-bold text-base text-brown-900 hover:bg-gradient-to-r hover:from-orange-500 hover:via-peach-500 hover:to-honey-400 hover:text-white transition-all duration-300 hover:scale-105 shadow-soft hover:shadow-medium border-2 border-orange-200/30 hover:border-transparent"
          >
            <Phone size={18} strokeWidth={2.5} />
            <span>+7 (999) 000-00-00</span>
          </a>
          
          <button 
            id="cart-trigger" 
            onClick={onOpenCart}
            className="relative px-6 py-4 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-400 text-white rounded-full hover:scale-110 transition-all duration-300 shadow-deep hover:shadow-deep-xl group border-2 border-white/30"
          >
            <ShoppingBasket size={22} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-lime-500 text-white text-xs font-black w-7 h-7 flex items-center justify-center rounded-full border-3 border-white shadow-deep animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className="md:hidden p-3 text-brown-900 hover:text-orange-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t-2 border-orange-200/40 shadow-deep-xl py-8 flex flex-col items-center gap-6 animate-fade-in-up">
          <button 
            onClick={() => scrollTo('catalog')} 
            className="text-2xl font-black text-brown-900 hover:text-orange-500 transition-colors duration-300 hover:scale-105"
          >
            Фрукты
          </button>
          <button 
            onClick={() => scrollTo('configurator')} 
            className="text-2xl font-black text-brown-900 hover:text-orange-500 transition-colors duration-300 hover:scale-105"
          >
            Конструктор
          </button>
          <button 
            onClick={() => scrollTo('b2b')} 
            className="text-2xl font-black text-brown-900 hover:text-orange-500 transition-colors duration-300 hover:scale-105"
          >
            Офисам
          </button>
          <button 
            onClick={() => scrollTo('reviews')} 
            className="text-2xl font-black text-brown-900 hover:text-orange-500 transition-colors duration-300 hover:scale-105"
          >
            Отзывы
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '@/types';

interface MiniCartProps {
  cart: CartItem[];
  onCheckout: () => void; // Opens CartSidebar for quick cart access
  isVisible: boolean;
}

const MiniCart: React.FC<MiniCartProps> = ({ cart, onCheckout, isVisible }) => {
  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Helper for pluralization
  const getBoxesText = (count: number) => {
    if (count === 1) return '1 набор';
    if (count >= 2 && count <= 4) return `${count} набора`;
    return `${count} наборов`;
  };

  // Don't render if cart is empty or if explicitly hidden
  if (cart.length === 0 || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Desktop Version - Bottom Right Corner */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-50">
        <button
          onClick={onCheckout}
          aria-label={`Открыть корзину: ${getBoxesText(totalItems)} на сумму ${totalPrice.toLocaleString()} рублей`}
          className="
            group
            flex items-center gap-4
            px-6 py-4
            rounded-full
            bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow
            text-white
            shadow-[0_20px_50px_rgba(249,115,22,0.4)]
            hover:shadow-[0_24px_60px_rgba(249,115,22,0.5)]
            hover:scale-105
            active:scale-[0.98]
            transition-all duration-300
            animate-fade-in-up
          "
        >
          {/* Icon with badge */}
          <div className="relative">
            <ShoppingBag size={24} strokeWidth={2.5} />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-brand-accent text-xs font-black flex items-center justify-center">
              {totalItems}
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium text-white/80">В корзине {getBoxesText(totalItems)}</span>
            <span className="text-lg font-black text-white">{totalPrice.toLocaleString()} ₽</span>
          </div>

          {/* Arrow */}
          <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Mobile Version - Bottom Bar Full Width */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 animate-fade-in-up">
        <button
          onClick={onCheckout}
          aria-label={`Открыть корзину: ${getBoxesText(totalItems)} на сумму ${totalPrice.toLocaleString()} рублей`}
          className="
            w-full
            flex items-center justify-between
            px-5 py-4
            bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow
            text-white
            shadow-[0_-10px_40px_rgba(249,115,22,0.3)]
            hover:shadow-[0_-12px_50px_rgba(249,115,22,0.4)]
            active:scale-[0.98]
            transition-all duration-300
            border-t-2 border-white/20
          "
        >
          {/* Left: Icon + Text */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={24} strokeWidth={2.5} />
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-brand-accent text-xs font-black flex items-center justify-center">
                {totalItems}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-white/80">В корзине</span>
              <span className="text-sm font-bold text-white">{getBoxesText(totalItems)}</span>
            </div>
          </div>

          {/* Right: Price + CTA */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-black text-white">{totalPrice.toLocaleString()} ₽</span>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-sm font-bold text-white whitespace-nowrap">Оформить</span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default MiniCart;


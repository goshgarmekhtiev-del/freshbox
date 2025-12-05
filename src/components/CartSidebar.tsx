
import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, ArrowRight, Check, RotateCcw } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

// Helper component for smooth number counting
const AnimatedPrice: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (displayValue === value) return;

    const difference = value - displayValue;
    const duration = 300; // ms - Faster animation
    const steps = 15;
    const increment = difference / steps;
    const intervalTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(prev => Math.round(prev + increment));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [value, displayValue]);

  return <>{displayValue.toLocaleString()}</>;
};

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQty }) => {
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const FREE_SHIPPING_THRESHOLD = 5000;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - total;

  const scrollToOrder = () => {
    onClose();
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset removal state when cart changes or closes
  useEffect(() => {
    if (!isOpen) setItemToRemove(null);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-[#FAFAF9] shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-white animate-fade-in-up">
        
        {/* Header */}
        <div className="p-6 bg-white shadow-sm z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-brand-text flex items-center gap-2">
              <ShoppingBag className="text-brand-accent" /> Корзина
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-brand-text/50 hover:text-brand-text">
              <X size={28} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {cart.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 transition-all duration-300">
              {remainingForFreeShipping > 0 ? (
                <p className="text-sm font-bold text-brand-text mb-2">
                  До бесплатной доставки: <span className="text-brand-accent"><AnimatedPrice value={remainingForFreeShipping} /> ₽</span>
                </p>
              ) : (
                <p className="text-sm font-bold text-brand-green mb-2 flex items-center gap-2">
                  <Truck size={16} /> Бесплатная доставка активирована!
                </p>
              )}
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-accent to-brand-yellow transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-brand-accent/10 rounded-full flex items-center justify-center animate-bounce-slow">
                 <ShoppingBag size={48} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-brand-text mb-2">Здесь пока пусто</h3>
                <p className="text-brand-text-soft font-medium max-w-[200px] mx-auto">
                  Наполните корзину витаминами для отличного настроения!
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="px-8 py-3 bg-white border-2 border-brand-accent text-brand-accent font-bold rounded-full hover:bg-brand-accent hover:text-white transition-all shadow-lg hover:shadow-brand-accent/30"
              >
                Перейти в каталог
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.id} 
                className={`group flex gap-4 p-4 rounded-3xl shadow-sm border transition-all duration-300 ${
                  itemToRemove === item.id 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-white border-gray-100 hover:border-brand-accent/30 hover:shadow-md'
                }`}
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 relative">
                  <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-transform duration-500 ${itemToRemove === item.id ? 'grayscale opacity-50' : 'group-hover:scale-110'}`} />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-brand-text text-base leading-tight mb-1 pr-2">{item.name}</h3>
                      
                      {itemToRemove !== item.id && (
                        <button 
                          onClick={() => setItemToRemove(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors -mt-1 -mr-1 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                    {itemToRemove !== item.id && (
                      <p className="text-xs font-bold text-brand-text-soft bg-gray-50 inline-block px-2 py-1 rounded-md mb-2">{item.price} ₽ / шт</p>
                    )}
                  </div>

                  {itemToRemove === item.id ? (
                    <div className="flex items-center justify-between gap-2 animate-fade-in-up">
                      <span className="text-xs font-bold text-red-500">Удалить?</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setItemToRemove(null)}
                          className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                        >
                          Отмена
                        </button>
                        <button 
                          onClick={() => {
                            onRemove(item.id);
                            setItemToRemove(null);
                          }}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 shadow-sm flex items-center gap-1"
                        >
                          Да <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-100">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-brand-text hover:text-brand-accent transition-colors disabled:opacity-50 active:scale-90"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        
                        {/* Animated Quantity Key for pop effect - Faster animation */}
                        <span key={item.quantity} className="text-sm font-extrabold w-8 text-center text-brand-text animate-[pulse_0.2s_ease-in-out]">
                          {item.quantity}
                        </span>
                        
                        <button 
                           onClick={() => onUpdateQty(item.id, 1)}
                           className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-brand-text hover:text-brand-accent transition-colors active:scale-90"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                      <span className="font-black text-lg text-brand-text">
                        <AnimatedPrice value={item.price * item.quantity} /> ₽
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
            <div className="flex items-center justify-between mb-6">
              <span className="text-brand-text-soft font-bold">Итого:</span>
              <span className="text-3xl font-extrabold text-brand-text">
                <AnimatedPrice value={total} /> ₽
              </span>
            </div>
            <button 
              onClick={scrollToOrder}
              className="w-full py-4 bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white font-extrabold text-lg rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 hover:brightness-110 flex items-center justify-center gap-2 group"
            >
              Оформить заказ <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;

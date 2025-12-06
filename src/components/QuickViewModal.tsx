
import React, { useState } from 'react';
import type { Product } from '../types';
import { X, Plus, Minus, ShoppingBag, Flame, Star, Leaf } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, e: React.MouseEvent) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);

  if (!isOpen || !product) return null;

  const handleAdd = (e: React.MouseEvent) => {
    onAddToCart(product, qty, e);
    setQty(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in-up" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-fade-in-up overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-brand-accent hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 relative bg-gray-50 min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8">
           <img 
             src={product.image} 
             alt={product.name} 
             className="w-full h-full object-contain drop-shadow-2xl animate-float"
           />
           {product.tag && (
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide shadow-lg flex items-center gap-1">
                <Flame size={14} className="text-brand-accent" fill="currentColor" /> {product.tag}
              </div>
           )}
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
           <div className="mb-auto">
             <div className="flex gap-1 mb-4">
               {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-brand-yellow fill-current" />)}
               <span className="text-gray-400 text-sm font-bold ml-2">(42 отзыва)</span>
             </div>
             
             <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-4 leading-tight">{product.name}</h2>
             <p className="text-brand-text-soft font-medium text-lg leading-relaxed mb-6">{product.description}</p>
             
             <div className="bg-brand-bg rounded-2xl p-4 mb-8">
               <h4 className="flex items-center gap-2 font-bold text-brand-text mb-2">
                 <Leaf size={18} className="text-brand-green" /> Состав бокса:
               </h4>
               <p className="text-sm font-medium opacity-80">{product.ingredients}</p>
             </div>
           </div>

           {/* Controls */}
           <div className="border-t border-gray-100 pt-6 mt-6">
             <div className="flex items-center justify-between mb-6">
               <span className="text-brand-text-soft font-bold text-sm">Цена</span>
               <span className="text-3xl font-black text-brand-text">{product.price * qty} ₽</span>
             </div>

             <div className="flex gap-4">
               {/* Quantity */}
               <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-1">
                 <button 
                   onClick={() => setQty(Math.max(1, qty - 1))}
                   className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-brand-accent transition-colors disabled:opacity-50"
                   disabled={qty <= 1}
                 >
                   <Minus size={20} />
                 </button>
                 <span className="w-12 text-center font-black text-xl text-brand-text">{qty}</span>
                 <button 
                   onClick={() => setQty(qty + 1)}
                   className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-brand-accent transition-colors"
                 >
                   <Plus size={20} />
                 </button>
               </div>

               {/* Add Button */}
               <button 
                 onClick={handleAdd}
                 className="flex-1 bg-brand-text text-white rounded-2xl font-bold text-lg hover:bg-brand-accent transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
               >
                 <ShoppingBag size={20} className="group-hover:animate-bounce" /> Добавить
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

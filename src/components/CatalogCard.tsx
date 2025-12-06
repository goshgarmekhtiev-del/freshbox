import React from 'react';
import type { Product } from '../types';
import { Plus, Flame, Sparkles, Eye, ShoppingBag, Star } from 'lucide-react';

interface CatalogCardProps {
  product: Product;
  onAdd: (e: React.MouseEvent) => void;
  onQuickView: () => void;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ product, onAdd, onQuickView }) => {
  return (
    <div className="relative">
      {/* Glassmorphism Light Effect - Design System Colors */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-orange-400/30 via-peach-300/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-honey-400/25 via-lime-300/15 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Bigger Fruit Photo Container */}
      <div className="relative aspect-square rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-orange-100/60 via-peach-50/40 to-honey-100/50 cursor-pointer shadow-soft-md group-hover:shadow-medium" onClick={onQuickView}>
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110 group-hover:saturate-110"
        />
        
        {/* Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/25 via-transparent to-peach-100/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Modern Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
           <button 
             onClick={(e) => { e.stopPropagation(); onQuickView(); }}
             className="px-8 py-4 glass border-2 border-white/80 rounded-full flex items-center gap-3 text-brown-900 font-black text-base shadow-deep-xl transform scale-75 group-hover:scale-100 transition-all duration-300 hover:scale-110"
           >
              <Eye size={20} strokeWidth={3} />
              <span className="tracking-wide">Quick View</span>
           </button>
        </div>

        {/* Premium Tag Badge */}
        {product.tag && (
          <div className="absolute top-6 right-6 glass text-brown-900 px-6 py-3 rounded-full text-sm font-black uppercase tracking-[0.1em] shadow-medium flex items-center gap-2.5 z-10 border-3 border-white/70">
            {product.tag.includes('Новинка') ? 
              <Sparkles size={16} className="text-orange-500" fill="currentColor" strokeWidth={2.5} /> : 
              <Flame size={16} className="text-orange-500" fill="currentColor" strokeWidth={2.5} />
            }
            <span className="bg-gradient-to-r from-orange-600 to-peach-600 text-transparent bg-clip-text">{product.tag}</span>
          </div>
        )}

        {/* Visually Striking Price Tag */}
        <div className="absolute bottom-6 left-6 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white px-8 py-5 rounded-3xl font-black text-3xl shadow-deep-xl z-10 border-3 border-white/30">
          <span className="drop-shadow-lg">{product.price}</span>
          <span className="text-lg ml-2 font-bold">₽</span>
        </div>
      </div>
      
      {/* Clean Content Section */}
      <div className="flex-1 flex flex-col space-y-6 relative z-10">
        {/* Title - More Striking */}
        <h3 
          className="text-3xl lg:text-4xl font-black text-brown-900 leading-tight group-hover:text-orange-600 transition-colors duration-300 cursor-pointer tracking-tighter" 
          onClick={onQuickView}
        >
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-brown-600 font-medium text-lg leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        {/* Weight/Ingredients - Striking */}
        <div className="flex items-start gap-3 bg-gradient-to-r from-orange-50/80 via-peach-50/60 to-honey-50/50 rounded-2xl p-4 border-2 border-orange-200/50">
          <Star size={18} className="text-orange-500 fill-orange-500 shrink-0 mt-1" strokeWidth={2.5} />
          <span className="text-sm font-bold text-brown-700 leading-relaxed line-clamp-2" title={product.ingredients}>
            {product.ingredients}
          </span>
        </div>
        
        {/* Large, Bright, Appetizing CTA Button */}
        <button 
          onClick={onAdd} 
          className="group/btn mt-auto w-full py-6 rounded-full bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white flex items-center justify-center gap-4 font-black text-xl shadow-deep hover:shadow-deep-2xl transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden relative border-3 border-white/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/35 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
          <ShoppingBag size={24} strokeWidth={3} className="relative z-10" />
          <span className="relative z-10 tracking-wide">Add to Cart</span>
          <Plus size={24} strokeWidth={3.5} className="relative z-10" />
        </button>
      </div>
    </div>
  );
};

export default CatalogCard;
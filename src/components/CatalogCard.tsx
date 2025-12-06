import React, { useState } from 'react';
import type { Product } from '@/types';
import { Plus, Flame, Sparkles, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { ResponsiveImage } from '@/components/ui';

interface CatalogCardProps {
  product: Product;
  onAdd: (e: React.MouseEvent) => void;
  onQuickView: () => void;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ product, onAdd, onQuickView }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    setIsAdded(true);
    onAdd(e);

    // Reset button state after animation
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  return (
    <div className="relative flex flex-col h-full">
      {/* Glassmorphism Light Effect - Design System Colors */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-brand-accent/30 via-brand-accent-dark/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-brand-yellow/25 via-brand-green/15 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Product Image with 4:5 Aspect Ratio */}
      <div 
        role="button"
        tabIndex={0}
        onClick={onQuickView}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onQuickView();
          }
        }}
        aria-label={`Открыть быстрый просмотр ${product.name}`}
        className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-brand-accent-light/60 via-brand-accent-light/40 to-brand-yellow/50 cursor-pointer shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10"
      >
        <ResponsiveImage
          src={product.image}
          alt={`Фруктовый бокс ${product.name} — ${product.description}`}
          autoOptimize
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-text/25 via-transparent to-brand-accent-light/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Modern Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
           <button 
             onClick={(e) => { e.stopPropagation(); onQuickView(); }}
             className="px-8 py-4 glass border-2 border-white/80 rounded-full flex items-center gap-3 text-brand-text font-black text-base shadow-xl shadow-black/10 scale-75 group-hover:scale-100 transition-all duration-300"
           >
            <Eye size={20} strokeWidth={3} />
            <span className="tracking-wide">Quick View</span>
           </button>
        </div>

        {/* Premium Tag Badge */}
        {product.tag && (
          <div className="absolute top-6 right-6 glass text-brand-text px-6 py-3 rounded-full text-sm font-black uppercase tracking-[0.1em] shadow-lg shadow-black/10 flex items-center gap-2.5 z-10 border-3 border-white/70">
            {product.tag.includes('Новинка') ? 
              <Sparkles size={16} className="text-brand-accent" fill="currentColor" strokeWidth={2.5} /> : 
              <Flame size={16} className="text-brand-accent" fill="currentColor" strokeWidth={2.5} />
            }
            <span className="bg-gradient-to-r from-brand-accent to-brand-accent-dark text-transparent bg-clip-text">{product.tag}</span>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="flex-1 flex flex-col space-y-4 relative z-10">
        {/* Title */}
        <h3 
          className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-brand-text group-hover:text-brand-accent transition-colors duration-300 cursor-pointer" 
          onClick={onQuickView}
        >
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-lg font-medium text-brand-text-soft leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        {/* Ingredients */}
        <div className="flex items-start gap-2 bg-gradient-to-r from-brand-accent-light/80 via-brand-accent-light/60 to-brand-yellow/50 rounded-xl p-3 border border-brand-accent/50">
          <Star size={16} className="text-brand-accent fill-brand-accent shrink-0 mt-0.5" strokeWidth={2.5} />
          <span className="text-xs font-semibold text-brand-text-soft leading-relaxed line-clamp-2" title={product.ingredients}>
            {product.ingredients}
          </span>
        </div>
        
        {/* Price and CTA */}
        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Price */}
          <div className="text-2xl font-bold text-brand-text">
            {product.price} ₽
          </div>
          
          {/* CTA Button - Premium Orange with Animation */}
          <button 
            onClick={handleAdd} 
            disabled={isAdded}
            className={`px-5 py-3 rounded-full text-white flex items-center gap-2 font-bold text-base shadow-lg transition-all duration-300 active:scale-95 overflow-hidden relative ${
              isAdded 
                ? 'bg-brand-green shadow-brand-green/30' 
                : 'bg-brand-accent shadow-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/40 hover:bg-brand-accent-dark'
            }`}
          >
            <ShoppingBag size={18} strokeWidth={2.5} className="relative z-10" />
            <span className="relative z-10">
              {isAdded ? 'Добавлено' : 'В корзину'}
            </span>
            {isAdded ? (
              <Check size={18} strokeWidth={2.5} className="relative z-10 animate-scale-in" />
            ) : (
              <Plus size={18} strokeWidth={2.5} className="relative z-10" />
            )}
            
            {/* Success ripple effect */}
            {isAdded && (
              <span className="absolute inset-0 bg-brand-green animate-ping opacity-75"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
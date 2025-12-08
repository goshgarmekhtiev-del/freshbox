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
    <div className="group relative flex flex-col h-full bg-white rounded-[--radius-card] overflow-hidden border border-brand-text/5 hover:border-brand-accent/20 transition-all duration-500 hover:shadow-[--shadow-elevated] hover:-translate-y-2">
      {/* Product Image - Modern Large */}
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
        className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand-accent-light/30 to-brand-yellow/20 cursor-pointer"
      >
        <ResponsiveImage
          src={product.image}
          alt={`Фруктовый бокс ${product.name} — ${product.description}`}
          autoOptimize
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Warm Gradient Overlay - Softer */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-text/20 via-transparent to-brand-accent-light/5 opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button 
             onClick={(e) => { e.stopPropagation(); onQuickView(); }}
             className="px-6 py-3 bg-white rounded-full flex items-center gap-2 text-brand-text font-bold text-sm shadow-[--shadow-elevated] hover:scale-110 transition-transform duration-300"
           >
            <Eye size={18} strokeWidth={2.5} />
            <span>Быстрый просмотр</span>
           </button>
        </div>

        {/* Tag Badge - More Subtle */}
        {product.tag && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-brand-accent text-xs font-black uppercase tracking-wider border border-brand-accent/15 shadow-[--shadow-soft]">
            {product.tag.includes('Новинка') ? 
              <Sparkles size={12} className="inline mr-1" fill="currentColor" strokeWidth={2.5} /> : 
              <Flame size={12} className="inline mr-1" fill="currentColor" strokeWidth={2.5} />
            }
            {product.tag}
          </div>
        )}
      </div>
      
      {/* Content Section - More Spacious */}
      <div className="flex-1 flex flex-col p-8 md:p-10 space-y-5">
        {/* Title */}
        <h3 
          className="text-2xl md:text-3xl font-black text-brand-text leading-tight cursor-pointer group-hover:text-brand-accent transition-colors duration-300" 
          onClick={onQuickView}
        >
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-base md:text-lg text-brand-text-soft leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        {/* Ingredients - More Subtle */}
        <div className="flex items-start gap-2 bg-brand-accent-light/5 rounded-xl p-4 border border-brand-accent-light/10">
          <Star size={16} className="text-brand-accent fill-brand-accent shrink-0 mt-0.5" strokeWidth={2.5} />
          <span className="text-xs md:text-sm font-medium text-brand-text leading-relaxed line-clamp-2" title={product.ingredients}>
            {product.ingredients}
          </span>
        </div>
        
        {/* Price and CTA */}
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-text/5">
          {/* Price */}
          <div className="text-3xl md:text-4xl font-black text-brand-text">
            {product.price} ₽
          </div>
          
          {/* CTA Button */}
          <button 
            onClick={handleAdd} 
            disabled={isAdded}
            className={`px-6 py-3 rounded-full text-white flex items-center gap-2 font-bold text-sm md:text-base shadow-[--shadow-elevated] transition-all duration-300 hover:scale-105 ${
              isAdded 
                ? 'bg-brand-green' 
                : 'bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:brightness-110'
            }`}
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            <span>{isAdded ? 'Добавлено' : 'В корзину'}</span>
            {isAdded ? (
              <Check size={18} strokeWidth={2.5} />
            ) : (
              <Plus size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
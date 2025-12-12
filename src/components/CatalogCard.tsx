import React, { useState } from 'react';
import type { Product } from '@/types';
import { Plus, Flame, Sparkles, Eye, ShoppingBag, Check } from 'lucide-react';
import { LazyImage } from '@/components/ui';
import { sendEvent } from '@/utils/metrics';

interface CatalogCardProps {
  product: Product;
  onAdd: (e: React.MouseEvent) => void;
  onQuickView: () => void;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ product, onAdd, onQuickView }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    // Событие Add_To_Cart отправляется в App.tsx в функции addToCart
    // Здесь не дублируем, чтобы избежать двойного события
    onAdd(e);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleOpenProduct = () => {
    console.log('[CATALOG_CARD] handleOpenProduct called', { productId: product.id, productName: product.name });
    sendEvent("Open_Product", { id: product.id, name: product.name });
    console.log('[CATALOG_CARD] Calling onQuickView', { onQuickView: typeof onQuickView });
    onQuickView();
    console.log('[CATALOG_CARD] onQuickView called');
  };

  return (
    <div 
      className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden border-2 border-brand-text/10 hover:border-brand-green/40 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer"
      onClick={handleOpenProduct}
    >
      {/* Product Image - Fixed Aspect Ratio with LazyImage */}
      <div className="relative overflow-hidden">
        <LazyImage
          src={product.image}
          alt={`Фруктовый бокс ${product.name} — ${product.description}`}
          priority={false}
          aspectRatio="aspect-[4/5]"
          imgClassName="object-cover transition-all duration-700 group-hover:scale-110"
          skeletonClassName="bg-gradient-to-br from-orange-100/80 via-yellow-100/70 to-amber-100/80"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        
        {/* Quick View Overlay - Desktop Hover */}
        <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
          <button 
            type="button"
            onClick={(e) => { 
              e.stopPropagation(); 
              handleOpenProduct();
            }}
            className="px-6 py-3 bg-white rounded-full flex items-center gap-2 text-brand-text font-bold text-sm shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <Eye size={18} strokeWidth={2.5} />
            <span>Быстрый просмотр</span>
          </button>
        </div>

        {/* Mobile Quick View Button - Always Visible */}
        <button 
          type="button"
          onClick={(e) => { 
            e.stopPropagation(); 
            handleOpenProduct();
          }}
          className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-2 text-brand-text font-bold text-sm shadow-lg"
        >
          <Eye size={16} strokeWidth={2.5} />
          <span>Открыть</span>
        </button>

        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full badge-brand-dark text-xs font-bold uppercase tracking-widest shadow-sm flex items-center gap-1">
            {product.tag.includes('Новинка') ? 
              <Sparkles size={12} className="inline text-white" fill="currentColor" strokeWidth={2.5} /> : 
              <Flame size={12} className="inline text-white" fill="currentColor" strokeWidth={2.5} />
            }
            <span className="text-white">{product.tag}</span>
          </div>
        )}
      </div>
      
      {/* Content Section - Compact */}
      <div className="flex-1 flex flex-col p-5 md:p-6 space-y-3">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-black text-brand-text leading-tight line-clamp-2 group-hover:text-brand-accent transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm md:text-base text-brand-text-soft leading-relaxed line-clamp-1">
          {product.description}
        </p>
        
        {/* Ingredients Chip - Compact */}
        <div className="flex items-center gap-2 px-3 py-2 bg-brand-accent-light/10 rounded-xl border border-brand-accent-light/20">
          <span className="text-xs font-medium text-brand-text line-clamp-1" title={product.ingredients}>
            {product.ingredients}
          </span>
        </div>
        
        {/* Price and CTA */}
        <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-brand-text/5">
          {/* Price */}
          <div className="text-2xl md:text-3xl font-black text-brand-text">
            {product.price} ₽
          </div>
          
          {/* CTA Button */}
          <button 
            type="button"
            onClick={handleAdd} 
            disabled={isAdded}
            className={`w-full sm:w-auto px-5 py-3 rounded-full text-white flex items-center justify-center gap-2 font-bold text-sm shadow-lg transition-all duration-300 hover:scale-105 ${
              isAdded 
                ? 'bg-brand-green' 
                : 'bg-gradient-to-r from-brand-accent to-brand-accent-dark'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={18} strokeWidth={2.5} />
                <span>Добавлено</span>
              </>
            ) : (
              <>
                <ShoppingBag size={18} strokeWidth={2.5} />
                <span>В корзину</span>
                <Plus size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;

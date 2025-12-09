import React, { useState } from 'react';
import type { Product } from '@/types';
import { X, Plus, Minus, ShoppingBag, Flame, Star, Leaf, CheckCircle2, Sparkles, Gift, Heart, TrendingUp } from 'lucide-react';
import { useFocusTrap } from '@/hooks';
import { LazyImage } from '@/components/ui';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, e: React.MouseEvent) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const modalRef = useFocusTrap({ isOpen, onClose });

  if (!isOpen || !product) return null;

  const handleAdd = (e: React.MouseEvent) => {
    onAddToCart(product, qty, e);
    setQty(1);
    onClose();
  };

  // Trust triggers
  const trustPoints = [
    { icon: <CheckCircle2 size={14} strokeWidth={2.5} className="text-brand-green" />, text: 'Только спелые и сладкие фрукты' },
    { icon: <CheckCircle2 size={14} strokeWidth={2.5} className="text-brand-green" />, text: 'Ручная сборка под заказ' },
    { icon: <CheckCircle2 size={14} strokeWidth={2.5} className="text-brand-green" />, text: 'Фото соответствует реальному боксу' },
  ];

  // Parse ingredients into array (assuming comma-separated string)
  const ingredientsList = product.ingredients
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);

  // Mock data for "Идеален для" (can be replaced with product.tags if available)
  const idealForTags = [
    { icon: '🎁', label: 'Подарок другу' },
    { icon: '💑', label: 'Вечер вдвоём' },
    { icon: '✨', label: 'Вау-эффект' },
  ];

  // Mock scarcity trigger (can be replaced with product.stock if available)
  const showScarcity = true; // Show conditionally based on product.stock
  const remainingStock = 5; // Replace with product.stock if available

  // Mock rating data (can be replaced with product.rating and product.reviewsCount if available)
  const rating = 4.9;
  const reviewsCount = 42;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-4 lg:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-fade-in-up" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content - Optimized for 1366x768 desktop without vertical scroll */}
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        aria-describedby="quick-view-description"
        className="relative bg-white w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] lg:max-h-[calc(100vh-80px)] md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in-up"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Закрыть быстрый просмотр"
          className="absolute top-4 right-4 z-30 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-lg hover:scale-110"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        {/* Left Side - Image (Hero) - Height constrained for desktop */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-6 md:p-8 lg:p-10">
          <LazyImage
            src={product.image}
            alt={`Фруктовый бокс ${product.name} — ${product.description}`}
            priority={true}
            aspectRatio="w-full aspect-[4/5]"
            containerClassName="lg:max-h-[520px]"
            imgClassName="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-[32px]"
            skeletonClassName="bg-gradient-to-br from-orange-100/70 via-yellow-100/60 to-amber-100/70 rounded-[32px]"
            autoOptimize
          />
          
          {/* Tag Badge */}
          {product.tag && (
            <div className="absolute top-8 left-8 lg:top-12 lg:left-12 bg-white/95 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs font-black uppercase tracking-wide shadow-md flex items-center gap-1.5 border border-brand-accent/20">
              <Flame size={14} strokeWidth={2.5} className="text-brand-accent" fill="currentColor" />
              {product.tag}
            </div>
          )}
        </div>

        {/* Right Side - Content - Compact layout for desktop */}
        <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
          {/* Scrollable Content on Mobile, No scroll on Desktop */}
          <div className="flex-1 overflow-y-auto lg:overflow-y-visible p-6 md:p-6 lg:p-6 pb-40 md:pb-6 lg:pb-6 flex flex-col">
            {/* Compact Header: Rating + Title + Description */}
            <div className="mb-4 lg:mb-3">
              {/* Rating - Compact inline */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5" role="img" aria-label={`Рейтинг ${rating} звёзд`}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} strokeWidth={2.5} className="text-brand-yellow fill-current" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-brand-text font-bold text-sm">
                  {rating}
                </span>
                <span className="text-brand-text-soft text-xs font-semibold">
                  · {reviewsCount} отзывов
                </span>
              </div>
              
              {/* Title - Compact */}
              <h2 id="quick-view-title" className="text-xl md:text-2xl lg:text-2xl font-black text-brand-text mb-1.5 leading-tight line-clamp-2">
                {product.name}
              </h2>
              
              {/* Description - Compact, 1 line */}
              <p id="quick-view-description" className="text-brand-text-soft font-medium text-sm lg:text-sm leading-snug line-clamp-1">
                {product.description}
              </p>
            </div>
            
            {/* Composition Card - Compact with limited chips */}
            <div className="bg-gradient-to-br from-lime-50 via-yellow-50 to-orange-50 rounded-2xl p-3 lg:p-3.5 mb-3 lg:mb-3 border border-brand-accent/15 shadow-sm">
              <h3 className="flex items-center gap-1.5 font-black text-brand-text mb-2 text-sm">
                <Leaf size={16} strokeWidth={2.5} className="text-brand-green fill-brand-green/20" />
                Состав бокса
              </h3>
              
              {/* Ingredients as Chips - Max 2 rows */}
              <div className="flex flex-wrap gap-1.5 line-clamp-2">
                {ingredientsList.slice(0, 6).map((ingredient, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-text border border-brand-accent/20 shadow-sm"
                  >
                    {ingredient}
                  </span>
                ))}
                {ingredientsList.length > 6 && (
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-brand-accent">
                    +{ingredientsList.length - 6} ещё
                  </span>
                )}
              </div>
            </div>

            {/* Trust Blocks - Two Columns on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-3">
              {/* Trust Block - "Почему любят" */}
              <div>
                <h4 className="text-xs lg:text-sm font-black text-brand-text mb-2 flex items-center gap-1.5">
                  <Heart size={14} strokeWidth={2.5} className="text-brand-accent fill-brand-accent/20" />
                  Почему любят
                </h4>
                <div className="space-y-1.5">
                  {trustPoints.slice(0, 3).map((point, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs font-medium text-brand-text">
                      {point.icon}
                      <span className="leading-tight">{point.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Идеален для" */}
              <div>
                <h4 className="text-xs lg:text-sm font-black text-brand-text mb-2 flex items-center gap-1.5">
                  <Gift size={14} strokeWidth={2.5} className="text-brand-yellow fill-brand-yellow/20" />
                  Идеален для
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {idealForTags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-brand-accent/10 to-brand-yellow/10 rounded-full text-xs font-bold text-brand-text border border-brand-accent/20 shadow-sm"
                    >
                      <span className="text-sm">{tag.icon}</span>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Spacer to push footer to bottom on desktop */}
            <div className="flex-1 lg:hidden"></div>
          </div>

          {/* Sticky Footer (Mobile) / Compact Bottom Section (Desktop) */}
          <div className="sticky md:relative bottom-0 left-0 right-0 bg-white/95 md:bg-white backdrop-blur-md md:backdrop-blur-none border-t-2 border-brand-text/10 p-4 md:p-5 lg:p-4 shadow-2xl md:shadow-none">
            {/* Compact Bottom Layout for Desktop */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4">
              {/* Left: Scarcity + Price + Delivery */}
              <div className="flex-1 mb-3 lg:mb-0">
                {/* Scarcity Trigger - Compact */}
                {showScarcity && remainingStock <= 10 && (
                  <div className="mb-2 flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 border border-red-200 rounded-lg inline-flex">
                    <TrendingUp size={14} strokeWidth={2.5} className="text-red-600" />
                    <span className="text-xs font-bold text-red-600">
                      Осталось {remainingStock} боксов на сегодня
                    </span>
                  </div>
                )}

                {/* Price Block - Compact */}
                <div className="mb-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl lg:text-3xl font-black text-brand-text">
                      {(product.price * qty).toLocaleString()} ₽
                    </span>
                    {qty > 1 && (
                      <span className="text-xs font-semibold text-brand-text-soft">
                        {product.price.toLocaleString()} ₽ × {qty}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-brand-text-soft flex items-center gap-1">
                    <Sparkles size={12} className="text-brand-accent" />
                    Доставка ~2 часа по городу
                  </p>
                </div>
              </div>

              {/* Right: Quantity + CTA Button - Inline on Desktop */}
              <div className="flex flex-col sm:flex-row lg:flex-row gap-2 lg:gap-3 lg:items-center">
                {/* Quantity Selector - Compact */}
                <div className="flex items-center bg-gradient-to-r from-brand-accent/5 to-brand-yellow/5 rounded-xl border-2 border-brand-accent/20 p-1 shrink-0">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Уменьшить количество"
                    className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-brand-accent hover:text-white transition-all duration-300 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-brand-text active:scale-90"
                    disabled={qty <= 1}
                  >
                    <Minus size={16} strokeWidth={2.5} />
                  </button>
                  <span className="w-10 text-center font-black text-lg text-brand-text" aria-live="polite">
                    {qty}
                  </span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    aria-label="Увеличить количество"
                    className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-brand-accent hover:text-white transition-all duration-300 active:scale-90"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Add to Cart Button - Compact on Desktop */}
                <button 
                  onClick={handleAdd}
                  className="flex-1 lg:flex-none lg:w-auto bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white rounded-xl font-bold text-sm lg:text-base py-3 lg:py-3 px-5 lg:px-6 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg whitespace-nowrap"
                >
                  <ShoppingBag size={18} strokeWidth={2.5} />
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

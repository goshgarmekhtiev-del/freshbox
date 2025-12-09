import React, { useState } from 'react';
import { ShoppingBag, Truck, Plus, Minus, Trash2, Shield, ArrowLeft, ChevronDown } from 'lucide-react';
import type { CartItem } from '@/types';
import { LazyImage } from '@/components/ui';

interface OrderSummaryProps {
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, onUpdateQty, onRemove }) => {
  // Accordion state for mobile
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 2000 ? 0 : 300;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(0, 2000 - subtotal);
  const progress = Math.min(100, (subtotal / 2000) * 100);
  const freeShippingActivated = shipping === 0;

  const handleGoToCatalog = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/#catalog';
    }
  };

  // Helper for pluralization
  const getBoxesText = (count: number) => {
    if (count === 1) return '1 бокс';
    if (count >= 2 && count <= 4) return `${count} бокса`;
    return `${count} боксов`;
  };

  const totalBoxes = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="lg:sticky lg:top-24">
      {/* Mobile: Accordion Header */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full rounded-3xl bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white p-5 shadow-xl flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} strokeWidth={2.5} className="text-white" />
            <div className="text-left">
              <div className="text-lg font-black text-white">Ваш заказ</div>
              <div className="text-sm text-white/80 font-medium">
                {totalBoxes > 0 ? `${getBoxesText(totalBoxes)} • ${total.toLocaleString()} ₽` : 'Корзина пуста'}
              </div>
            </div>
          </div>
          <ChevronDown 
            size={24} 
            strokeWidth={2.5} 
            className={`text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Mobile: Accordion Content */}
        <div 
          className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${isExpanded ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
          `}
        >
          <div className="rounded-3xl bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white p-6 shadow-xl space-y-4">
            <MobileSummaryContent
              cart={cart}
              onUpdateQty={onUpdateQty}
              onRemove={onRemove}
              handleGoToCatalog={handleGoToCatalog}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              remainingForFreeShipping={remainingForFreeShipping}
              progress={progress}
              freeShippingActivated={freeShippingActivated}
            />
          </div>
        </div>
      </div>

      {/* Desktop: Normal Sticky Content */}
      <div className="hidden lg:block rounded-3xl bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white p-6 lg:p-7 shadow-xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-3">
            <ShoppingBag size={28} strokeWidth={2.5} className="text-white" /> 
            Ваш заказ
          </h2>
          <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold">
            Шаг 2 из 2
          </div>
        </div>

        <MobileSummaryContent
          cart={cart}
          onUpdateQty={onUpdateQty}
          onRemove={onRemove}
          handleGoToCatalog={handleGoToCatalog}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          remainingForFreeShipping={remainingForFreeShipping}
          progress={progress}
          freeShippingActivated={freeShippingActivated}
        />
      </div>
    </section>
  );
};

// Extracted content component to avoid duplication
interface SummaryContentProps {
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  handleGoToCatalog: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  remainingForFreeShipping: number;
  progress: number;
  freeShippingActivated: boolean;
}

const MobileSummaryContent: React.FC<SummaryContentProps> = ({
  cart,
  onUpdateQty,
  onRemove,
  handleGoToCatalog,
  subtotal,
  shipping,
  total,
  remainingForFreeShipping,
  progress,
  freeShippingActivated
}) => {
  return (
    <>
      {/* Empty Cart State */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 min-h-[300px]">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-black text-white mb-2">Пока в корзине пусто</h3>
          <p className="text-white/80 font-medium mb-6 max-w-xs">
            Выберите боксы в каталоге, а затем вернитесь к оформлению заказа.
          </p>
          <button
            onClick={handleGoToCatalog}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-accent px-6 py-3 font-semibold shadow-lg hover:bg-brand-accent-light hover:scale-105 transition-all"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            Вернуться к каталогу
          </button>
        </div>
      ) : (
        <>
          {/* Free Shipping Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            {!freeShippingActivated ? (
              <>
                <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Truck size={16} strokeWidth={2.5} /> 
                  Осталось <span className="font-black">{remainingForFreeShipping} ₽</span> до бесплатной доставки
                </p>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-white to-brand-accent-light transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="text-sm font-bold text-white flex items-center gap-2">
                <Truck size={16} strokeWidth={2.5} /> 
                Бесплатная доставка активирована 🎉
              </p>
            )}
          </div>

          {/* Cart Items */}
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 items-start bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15 hover:bg-white/15 transition-all group"
              >
                <LazyImage
                  src={item.image}
                  alt={`${item.name} в корзине`}
                  aspectRatio="w-16 h-16"
                  containerClassName="rounded-xl flex-shrink-0 border border-white/20"
                  imgClassName="object-cover"
                  skeletonClassName="bg-gradient-to-br from-orange-100/50 via-yellow-100/40 to-amber-100/50"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm leading-tight mb-1 line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-white/70 text-xs mb-2">
                    {item.price} ₽ / шт
                  </p>
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                      type="button"
                    >
                      <Minus size={14} strokeWidth={2.5} className="text-white" />
                    </button>
                    <span className="font-black text-base min-w-[20px] text-center text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                      type="button"
                    >
                      <Plus size={14} strokeWidth={2.5} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-black text-lg text-white whitespace-nowrap">
                    {(item.price * item.quantity).toLocaleString()} ₽
                  </span>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 text-white/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Удалить"
                    type="button"
                  >
                    <Trash2 size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-white/20 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70 font-medium">Сумма заказа</span>
              <span className="text-white font-bold">{subtotal.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70 font-medium">Доставка</span>
              <span className="text-white font-bold">
                {shipping === 0 ? 'Бесплатно' : `${shipping} ₽`}
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-3 border-t border-white/20">
              <div className="flex justify-between items-end">
                <span className="text-white/90 font-bold uppercase tracking-wide text-xs">
                  Итого к оплате
                </span>
                <span className="text-4xl font-black text-white tracking-tight">
                  {total.toLocaleString()} ₽
                </span>
              </div>
              {/* Enhanced security notice */}
              <p className="text-[11px] leading-relaxed text-white/60 font-medium mt-1">
                Оплата проходит через защищённый платёжный шлюз, данные карты не сохраняем
              </p>
            </div>
          </div>

          {/* Security Notice (moved to bottom) */}
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex items-start gap-3 text-xs text-white/80 border border-white/10">
            <Shield size={18} strokeWidth={2.5} className="text-brand-accent-light flex-shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">
              Мы не храним данные вашей карты. Все платежи обрабатываются через защищённое соединение.
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default OrderSummary;

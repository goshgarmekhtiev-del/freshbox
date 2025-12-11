import React, { useState, useEffect, useRef } from 'react';
import type { CartItem, Product, NotificationData } from '@/types';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Eye, ChevronLeft, Loader2, CreditCard } from 'lucide-react';
import { useFocusTrap } from '@/hooks';
import { LazyImage } from '@/components/ui';
import CheckoutForm, { type CheckoutFormHandle } from '@/components/checkout/CheckoutForm';
import { calculateOrderTotals } from '@/utils/cart';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onQuickView?: (product: Product) => void;
  onOrderComplete?: (data: NotificationData) => void;
}

// Helper component for smooth number counting
const AnimatedPrice: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (displayValue === value) return;

    const difference = value - displayValue;
    const duration = 300;
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

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQty, onQuickView, onOrderComplete }) => {
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const modalRef = useFocusTrap({ isOpen, onClose });
  const checkoutFormRef = useRef<CheckoutFormHandle>(null);
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalBoxes = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Используем утилиту для расчёта сумм (для прогресс-бара используем старый порог 5000)
  const totals = calculateOrderTotals(cart);
  const FREE_SHIPPING_THRESHOLD_PROGRESS = 5000; // Для прогресс-бара на шаге 1
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD_PROGRESS) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD_PROGRESS - total;
  const freeShippingActivated = remainingForFreeShipping <= 0;

  const handleProceedToCheckout = () => {
    setStep(2);
    // Прокручиваем к началу шторки при переходе на шаг 2
    const drawer = modalRef.current;
    if (drawer) {
      drawer.scrollTop = 0;
    }
  };

  const handleStickySubmit = async () => {
    if (checkoutFormRef.current) {
      setCheckoutStatus('loading');
      await checkoutFormRef.current.submit();
      // Статус обновляется через ref
      const status = checkoutFormRef.current.getStatus();
      setCheckoutStatus(status);
    }
  };

  // Синхронизируем статус формы и способ оплаты с локальным состоянием на шаге 2
  useEffect(() => {
    if (step === 2 && checkoutFormRef.current) {
      const updateStatus = () => {
        if (checkoutFormRef.current) {
          const status = checkoutFormRef.current.getStatus();
          const method = checkoutFormRef.current.getPaymentMethod();
          setCheckoutStatus(status);
          setPaymentMethod(method);
        }
      };
      // Обновляем статус сразу и затем периодически
      updateStatus();
      const interval = setInterval(updateStatus, 200);
      return () => clearInterval(interval);
    } else {
      setCheckoutStatus('idle');
      setPaymentMethod('card');
    }
  }, [step]);

  // Helper function for pluralization
  const getBoxesText = (count: number) => {
    if (count === 1) return '1 бокс';
    if (count >= 2 && count <= 4) return `${count} бокса`;
    return `${count} боксов`;
  };

  // Trust/guarantee points
  const guaranteePoints = [
    { icon: <CheckCircle2 size={16} strokeWidth={2.5} className="text-brand-green" />, text: 'Только спелые и сладкие фрукты' },
    { icon: <CheckCircle2 size={16} strokeWidth={2.5} className="text-brand-green" />, text: 'Собираем бокс в день доставки' },
    { icon: <CheckCircle2 size={16} strokeWidth={2.5} className="text-brand-green" />, text: 'Вернём деньги, если что-то пойдёт не так' },
  ];

  // Reset removal state and step when cart changes or closes
  useEffect(() => {
    if (!isOpen) {
      setItemToRemove(null);
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop - Solid darkening for better readability */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Cart Drawer - Wide premium drawer on desktop, full width on mobile */}
      <aside 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
        className="fixed inset-y-0 right-0 w-full lg:w-[1000px] bg-[#FFFEFB] shadow-[0_24px_60px_rgba(15,118,110,0.32)] lg:rounded-l-[32px] transform transition-transform duration-300 ease-out"
      >
        {/* Empty State - Full Screen */}
        {cart.length === 0 ? (
          <div className="h-full flex flex-col">
            {/* Header with Close Button */}
            <header className="px-6 md:px-8 pt-6 md:pt-7 pb-4 border-b border-emerald-50 flex items-start justify-between gap-4 flex-shrink-0">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center shadow-md">
                    <ShoppingBag size={20} strokeWidth={2.5} className="text-white" />
                  </div>
                  <h2 id="cart-title" className="text-[28px] leading-tight font-bold text-[#064E3B]">
                    Корзина
                  </h2>
                </div>
              </div>
              <button 
                onClick={onClose} 
                aria-label="Закрыть корзину"
                className="p-2.5 hover:bg-brand-accent hover:text-white rounded-full transition-all duration-300 text-brand-text/50 hover:scale-110 shadow-sm flex-shrink-0"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </header>

            {/* Empty State Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-4">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-accent/10 to-brand-yellow/10 rounded-3xl flex items-center justify-center shadow-lg">
                <ShoppingBag size={48} strokeWidth={2.5} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#064E3B] mb-2">Здесь пока пусто</h3>
                <p className="text-[#115E59] font-semibold max-w-[240px] mx-auto leading-relaxed">
                  Наполните корзину витаминами для отличного настроения!
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                Перейти в каталог
              </button>
            </div>
          </div>
        ) : (
          /* Two-Column Layout on Desktop, Single Column on Mobile */
          <div className="h-full flex flex-col lg:flex-row">
            {/* LEFT COLUMN - Products List (60-65% on desktop) */}
            <div className="flex flex-col lg:w-2/3 lg:border-r lg:border-emerald-50 overflow-hidden">
              {/* Header - Always visible */}
              <header className="px-6 md:px-8 pt-6 md:pt-7 pb-4 border-b border-emerald-50 flex items-start justify-between gap-4 flex-shrink-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    {step === 2 && (
                      <button
                        onClick={() => setStep(1)}
                        className="p-1.5 hover:bg-brand-accent/10 rounded-lg transition-colors mr-1"
                        aria-label="Вернуться к корзине"
                      >
                        <ChevronLeft size={20} strokeWidth={2.5} className="text-brand-accent" />
                      </button>
                    )}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center shadow-md">
                      <ShoppingBag size={20} strokeWidth={2.5} className="text-white" />
                    </div>
                    <h2 id="cart-title" className="text-[28px] leading-tight font-bold text-[#064E3B]">
                      {step === 1 ? 'Корзина' : 'Оформление заказа'}
                    </h2>
                    {step === 2 && (
                      <p className="mt-1 text-sm text-brand-text-soft">
                        Заполните данные и перейдите к безопасной оплате в ЮKassa.
                      </p>
                    )}
                    {step === 1 && (
                      /* Badge with quantity */
                      <div className="px-3 py-1 bg-gradient-to-r from-brand-accent to-brand-yellow text-white text-xs font-black rounded-full shadow-sm">
                        {getBoxesText(totalBoxes)}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[#115E59] font-semibold mb-1">
                    {step === 1 ? 'Шаг 1 из 2: проверяем заказ' : 'Шаг 2 из 2: оформление заказа'}
                  </p>
                  
                  {/* Mini Progress: Корзина → Оформление → Оплата */}
                  <div className="text-xs text-brand-text-soft mb-2">
                    <span className={step === 1 ? 'font-bold text-brand-text' : ''}>Корзина</span>
                    {' → '}
                    <span className={step === 2 ? 'font-bold text-brand-text' : ''}>Оформление</span>
                    {' → '}
                    <span>Оплата</span>
                  </div>
                  
                  {/* Microtext under step title */}
                  {step === 1 ? (
                    <p className="text-sm text-brand-text-soft leading-snug">
                      Проверьте состав боксов и сумму перед оформлением.
                    </p>
                  ) : (
                    <p className="text-sm text-brand-text-soft leading-snug">
                      Остался последний шаг — заполните данные для доставки.
                    </p>
                  )}
                </div>
                <button 
                  onClick={onClose} 
                  aria-label="Закрыть корзину"
                  className="p-2.5 hover:bg-brand-accent hover:text-white rounded-full transition-all duration-300 text-brand-text/50 hover:scale-110 shadow-sm flex-shrink-0"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
              </header>

              {/* Progress Bar Section - Always visible (only on step 1) */}
              {step === 1 && (
                <section className="px-6 md:px-8 py-4 border-b border-emerald-50 bg-amber-50/80 flex-shrink-0">
                  {!freeShippingActivated ? (
                    <p id="cart-description" className="text-sm font-bold text-[#064E3B] mb-3 flex items-center gap-2 leading-snug">
                      <Truck size={18} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                      До бесплатной доставки осталось <span className="text-brand-accent"><AnimatedPrice value={remainingForFreeShipping} /> ₽</span> 🚚
                    </p>
                  ) : (
                    <p id="cart-description" className="text-sm font-bold text-brand-green mb-3 flex items-center gap-2 leading-snug">
                      <Truck size={18} strokeWidth={2.5} className="flex-shrink-0" />
                      Бесплатная доставка активирована! 🚚
                    </p>
                  )}
                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-white/60 rounded-full overflow-hidden shadow-inner" role="progressbar" aria-valuemin={0} aria-valuemax={FREE_SHIPPING_THRESHOLD_PROGRESS} aria-valuenow={total}>
                    <div 
                      className="h-full bg-gradient-to-r from-brand-accent via-brand-yellow to-brand-green transition-all duration-500 ease-out shadow-sm"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </section>
              )}

              {/* Step 2: Checkout Form */}
              {step === 2 ? (
                <div className="flex-1 overflow-y-auto px-0 py-6 pb-24">
                  <CheckoutForm 
                    ref={checkoutFormRef}
                    cart={cart} 
                    onOrderComplete={onOrderComplete || (() => {})}
                    layout="compact"
                  />
                </div>
              ) : (
                /* Step 1: Scrollable Cart Items List */
                <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-3 lg:pr-4">
                  {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className={`group rounded-2xl p-3 shadow-md border-2 transition-all duration-300 ${
                      itemToRemove === item.id 
                        ? 'bg-red-50 border-red-300' 
                        : 'bg-white border-brand-text/10 hover:border-brand-accent/40 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Product Image - Clickable for Quick View */}
                      <button
                        onClick={() => onQuickView?.(item)}
                        className="shrink-0 relative shadow-sm cursor-pointer group/img"
                        aria-label={`Посмотреть детали ${item.name}`}
                      >
                        <LazyImage
                          src={item.image}
                          alt={`${item.name} в корзине`}
                          aspectRatio="w-16 h-16"
                          containerClassName="rounded-xl"
                          imgClassName={`object-cover transition-all duration-500 ${
                            itemToRemove === item.id ? 'grayscale opacity-50' : 'group-hover/img:scale-110'
                          }`}
                          skeletonClassName="bg-gradient-to-br from-orange-100/60 via-yellow-100/50 to-amber-100/60"
                        />
                        {/* Quick View Overlay on hover */}
                        {itemToRemove !== item.id && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                            <Eye size={16} strokeWidth={2.5} className="text-white" />
                          </div>
                        )}
                      </button>
                      
                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        {/* Top: Name + Tag + Delete */}
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-[#064E3B] text-base leading-tight line-clamp-2">
                              {item.name}
                            </h3>
                            {/* Secondary description/tag */}
                            {item.tag && (
                              <p className="text-xs font-semibold text-brand-accent mt-0.5 line-clamp-1">
                                {item.tag}
                              </p>
                            )}
                          </div>
                          
                          {itemToRemove !== item.id && (
                            <button 
                              onClick={() => setItemToRemove(item.id)}
                              aria-label={`Удалить ${item.name}`}
                              className="text-brand-text-soft/40 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 shrink-0"
                            >
                              <Trash2 size={16} strokeWidth={2.5} />
                            </button>
                          )}
                        </div>

                        {/* Price per unit */}
                        {itemToRemove !== item.id && (
                          <p className="text-xs text-[#115E59] leading-snug mb-2">
                            {item.price.toLocaleString()} ₽ / шт
                          </p>
                        )}

                        {/* Bottom: Quantity + Total or Delete Confirmation */}
                        {itemToRemove === item.id ? (
                          <div className="flex items-center justify-between gap-2 animate-fade-in-up">
                            <span className="text-xs font-bold text-red-600">Удалить из корзины?</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setItemToRemove(null)}
                                className="px-3 py-1.5 bg-white border-2 border-brand-text/20 rounded-lg text-xs font-bold text-[#064E3B] hover:bg-brand-accent-light/20 transition-colors"
                              >
                                Отмена
                              </button>
                              <button 
                                onClick={() => {
                                  onRemove(item.id);
                                  setItemToRemove(null);
                                }}
                                className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 shadow-sm flex items-center gap-1 transition-colors"
                              >
                                Да <Trash2 size={12} strokeWidth={2.5} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-1 bg-gradient-to-r from-brand-accent/5 to-brand-yellow/5 rounded-full p-1 border border-brand-accent/20 shadow-sm">
                              <button 
                                onClick={() => onUpdateQty(item.id, -1)}
                                aria-label={`Уменьшить количество ${item.name}`}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#064E3B] hover:bg-brand-accent hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#064E3B] active:scale-90"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} strokeWidth={2.5} />
                              </button>
                              
                              <span 
                                key={item.quantity} 
                                className="text-sm font-black w-8 text-center text-[#064E3B] animate-[pulse_0.2s_ease-in-out]" 
                                aria-live="polite"
                              >
                                {item.quantity}
                              </span>
                              
                              <button 
                                onClick={() => onUpdateQty(item.id, 1)}
                                aria-label={`Увеличить количество ${item.name}`}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#064E3B] hover:bg-brand-accent hover:text-white transition-all active:scale-90"
                              >
                                <Plus size={14} strokeWidth={2.5} />
                              </button>
                            </div>

                            {/* Total for item */}
                            <span className="font-black text-lg text-[#064E3B] whitespace-nowrap">
                              <AnimatedPrice value={item.price * item.quantity} /> ₽
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}

              {/* Mobile-only: Show guarantees and CTA in single column (only on step 1) */}
              {step === 1 && (
                <div className="lg:hidden">
                {/* Guarantee Block */}
                <div className="px-6 md:px-8 pb-6">
                  <div className="p-4 bg-gradient-to-r from-lime-50 to-yellow-50 rounded-3xl border border-brand-green/20 shadow-sm">
                    <h4 className="text-sm font-black text-[#064E3B] mb-3 uppercase tracking-wide">
                      Почему можно не переживать
                    </h4>
                    <div className="space-y-2">
                      {guaranteePoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-[#064E3B] leading-snug">
                          {point.icon}
                          <span className="font-medium">{point.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <footer className="px-6 md:px-8 pt-4 pb-6 border-t border-emerald-50 bg-white/95 flex-shrink-0">
                  {/* Total Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-[#115E59]">Итого:</span>
                      <span className="text-xl font-semibold text-[#064E3B]">
                        <AnimatedPrice value={total} /> ₽
                      </span>
                    </div>
                    <p className="text-xs text-[#115E59] leading-snug flex items-center gap-1.5">
                      <Sparkles size={12} className="text-brand-accent flex-shrink-0" />
                      Доставка ~2 часа по городу
                    </p>
                  </div>

                  {/* Hint about Step 2 */}
                  <p className="text-xs text-center text-[#115E59] leading-snug mb-4 flex items-center justify-center gap-1.5">
                    <ArrowRight size={12} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                    На следующем шаге выберешь адрес и время доставки
                  </p>

                  {/* CTA Button */}
                  <button 
                    onClick={handleProceedToCheckout}
                    className="w-full py-4 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group mb-3"
                  >
                    Оформить заказ
                    <ArrowRight size={22} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Sub-text */}
                  <p className="text-xs text-center text-[#115E59] leading-snug mb-3">
                    Заполнить контактные данные — займёт 1–2 минуты
                  </p>

                  {/* Continue Shopping Link */}
                  <button 
                    onClick={onClose}
                    className="w-full text-sm font-bold text-brand-green hover:text-brand-accent transition-colors flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-brand-accent-light/10"
                  >
                    <ArrowLeft size={16} strokeWidth={2.5} />
                    Продолжить выбирать боксы
                  </button>
                </footer>
              </div>
              )}
            </div>

            {/* RIGHT COLUMN - Summary & Guarantees (35-40% on desktop, hidden on mobile, only on step 1) */}
            {step === 1 && (
              <div className="hidden lg:flex lg:flex-col lg:w-1/3 px-6 py-7">
              {/* Guarantee Block - "Почему можно не переживать" */}
              <div className="p-5 bg-gradient-to-r from-lime-50 to-yellow-50 rounded-3xl border border-brand-green/20 shadow-md mb-6">
                <h4 className="text-sm font-black text-[#064E3B] mb-3 uppercase tracking-wide">
                  Почему можно не переживать
                </h4>
                <div className="space-y-2.5">
                  {guaranteePoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-[#064E3B] leading-snug">
                      {point.icon}
                      <span className="font-medium">{point.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacer to push CTA to bottom */}
              <div className="flex-1"></div>

              {/* Total & CTA Section - Always at bottom */}
              <div className="mt-auto space-y-4">
                {/* Total Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#115E59]">Итого:</span>
                    <span className="text-2xl font-bold text-[#064E3B]">
                      <AnimatedPrice value={total} /> ₽
                    </span>
                  </div>
                  <p className="text-xs text-[#115E59] leading-snug flex items-center gap-1.5 mb-2">
                    <Sparkles size={12} className="text-brand-accent flex-shrink-0" />
                    Доставка ~2 часа по городу
                  </p>
                </div>

                {/* Hint about Step 2 */}
                <p className="text-xs text-[#115E59] leading-snug mb-4 flex items-center gap-1.5">
                  <ArrowRight size={12} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                  На следующем шаге выберешь адрес и время доставки
                </p>

                {/* CTA Button */}
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  Перейти к оформлению
                  <ArrowRight size={22} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Sub-text */}
                <p className="text-xs text-center text-[#115E59] leading-snug">
                  Заполнить контактные данные — займёт 1–2 минуты
                </p>

                {/* Continue Shopping Link */}
                <button 
                  onClick={onClose}
                  className="w-full text-sm font-bold text-brand-green hover:text-brand-accent transition-colors flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-brand-accent-light/10"
                >
                  <ArrowLeft size={16} strokeWidth={2.5} />
                  Продолжить выбирать боксы
                </button>
              </div>
            </div>
            )}
          </div>
        )}

        {/* Sticky Bottom Panel - Only on Step 2 */}
        {step === 2 && (
          <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-emerald-100 shadow-[0_-4px_20px_rgba(15,118,110,0.1)] px-6 md:px-8 py-4 z-10">
            <div className="flex items-center justify-between gap-4">
              {/* Total */}
              <div className="flex-1">
                <p className="text-xs text-[#115E59] font-semibold mb-1">Итого</p>
                <p className="text-2xl font-black text-[#064E3B]">
                  {totals.total.toLocaleString()} ₽
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleStickySubmit}
                disabled={checkoutStatus === 'loading' || cart.length === 0}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black text-base rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {checkoutStatus === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} strokeWidth={2.5} />
                    <span>{paymentMethod === 'card' ? 'Создаём платёж...' : 'Отправляем заказ...'}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {paymentMethod === 'card' 
                        ? `Оплатить ${totals.total.toLocaleString()} ₽`
                        : 'Подтвердить заказ'
                      }
                    </span>
                    {paymentMethod === 'card' && <CreditCard size={20} strokeWidth={2.5} />}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartSidebar;

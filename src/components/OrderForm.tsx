import React, { useState, useEffect } from 'react';
import type { CartItem, NotificationData } from '@/types';
import { Loader2, Zap, CreditCard, ShoppingBag, Truck, Plus, Minus, Trash2, Calendar, ChevronLeft, ChevronRight, User, MapPin, MessageSquare } from 'lucide-react';
import { useReveal } from '@/hooks';

interface OrderFormProps {
  cart: CartItem[];
  onSubmit: (formData: any) => void;
  onOrderComplete: (data: NotificationData) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ cart, onSubmit: _onSubmit, onOrderComplete, onUpdateQty, onRemove }) => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const { ref: formRef, isVisible: formVisible } = useReveal({ threshold: 0.15 });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryTime: '',
    comment: '',
    paymentMethod: 'card',
    agreement: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // --- CUSTOM CALENDAR STATE ---
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sync custom date/time to formData string
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const dateStr = selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
      setFormData(prev => ({ ...prev, deliveryTime: `${dateStr}, ${selectedTime}` }));
      
      // UX Improvement: Auto-collapse calendar after full selection
      const timeout = setTimeout(() => {
        setShowCalendar(false);
      }, 500); 
      return () => clearTimeout(timeout);
    }
  }, [selectedDate, selectedTime]);

  // Calendar Helpers
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay() || 7;

  const changeMonth = (delta: number) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  // Generate time slots from 9:00 to 21:00 every 2 hours
  const timeSlots = Array.from({ length: 7 }, (_, i) => {
    const hour = 9 + i * 2;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 2000 ? 0 : 300;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(0, 2000 - subtotal);
  const progress = Math.min(100, (subtotal / 2000) * 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName as keyof typeof formData]);
  };

  // Validation functions
  const validateField = (fieldName: string, value: any) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value || value.trim().length < 2) {
          error = 'Введите ваше имя (минимум 2 символа)';
        }
        break;
      case 'phone':
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!value) {
          error = 'Укажите телефон для связи';
        } else if (!phoneRegex.test(value.replace(/[\s()-]/g, ''))) {
          error = 'Неверный формат телефона (пример: +7 999 000-00-00)';
        }
        break;
      case 'email':
        if (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = 'Неверный формат email (пример: ivan@example.com)';
          }
        }
        break;
      case 'address':
        if (!value || value.trim().length < 5) {
          error = 'Введите полный адрес доставки (минимум 5 символов)';
        }
        break;
      case 'deliveryTime':
        if (!value) {
          error = 'Выберите дату и время доставки';
        }
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }

    return !error;
  };

  const validateForm = () => {
    const fieldsToValidate = ['name', 'phone', 'email', 'address', 'deliveryTime'];
    let isValid = true;
    const newErrors: Record<string, string> = {};

    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        isValid = false;
      }
    });

    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие с условиями';
      isValid = false;
    }

    if (cart.length === 0) {
      newErrors.cart = 'Добавьте товары в корзину';
      isValid = false;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      agreement: e.target.checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      phone: true,
      email: true,
      address: true,
      deliveryTime: true,
      agreement: true
    });

    // Validate entire form
    if (!validateForm()) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      
      // Notify parent component for social proof
      const randomItem = cart[Math.floor(Math.random() * cart.length)];
      onOrderComplete({
        name: formData.name.split(' ')[0],
        city: 'Москва',
        product: randomItem.name
      });
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          deliveryTime: '',
          comment: '',
          paymentMethod: 'card',
          agreement: false
        });
        setErrors({});
        setTouched({});
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="order-form" ref={sectionRef as React.RefObject<HTMLElement>} className={`py-16 md:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-brand-accent-light to-lime-50 reveal relative overflow-hidden ${sectionVisible ? 'reveal-visible' : ''}`}>
      {/* Accent Background Blobs - Orange & Yellow Glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-brand-accent/20 to-transparent rounded-full blur-[150px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-yellow/15 to-transparent rounded-full blur-[150px] opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 max-w-7xl">
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-wider mb-6">
            Заказ
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-brand-text leading-[0.95] mb-6">
            Оформление <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-yellow">заказа</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-text-soft max-w-2xl leading-relaxed">
            Заполните форму, и мы доставим свежие фрукты прямо к вашей двери
          </p>
        </div>
        <div ref={formRef as React.RefObject<HTMLDivElement>} className={`bg-white rounded-3xl md:rounded-[2.5rem] shadow-[--shadow-elevated] grid lg:grid-cols-12 min-h-[700px] border border-brand-text/5 relative z-10 overflow-hidden reveal reveal-scale-in ${formVisible ? 'reveal-visible' : ''}`}>
          {/* Cart Summary Side */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white p-8 md:p-12 lg:p-16 flex flex-col relative overflow-hidden rounded-t-3xl md:rounded-t-[2.5rem] lg:rounded-tr-none lg:rounded-l-3xl md:lg:rounded-l-[2.5rem]">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
                <ShoppingBag size={32} strokeWidth={2.5} className="text-white" /> Ваш заказ
              </h2>
              {/* Free Shipping Progress */}
              {cart.length > 0 && (
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
                  {remainingForFreeShipping > 0 ? (
                    <>
                      <p className="text-sm font-black text-white mb-3 flex items-center gap-2">
                        <Truck size={16} strokeWidth={2.5} /> До бесплатной доставки: <span className="text-white">{remainingForFreeShipping} ₽</span>
                      </p>
                      <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-white to-brand-accent-light transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm font-black text-brand-accent-light mb-2 flex items-center gap-2">
                      <Truck size={16} strokeWidth={2.5} /> Бесплатная доставка активирована!
                    </p>
                  )}
                </div>
              )}
              <div className="flex-1 relative z-10 overflow-y-auto pr-2 custom-scrollbar mt-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center border-2 border-dashed border-white/20 rounded-2xl p-12 bg-white/5 backdrop-blur-sm">
                     <p className="font-black text-2xl md:text-3xl mb-3 text-white">В корзине пусто</p>
                     <p className="text-white/80 font-medium text-lg md:text-xl">Добавьте сочных фруктов!</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-5 items-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/15 hover:bg-white/20 transition-all duration-300 group">
                        <div className="w-20 h-20 rounded-xl bg-white overflow-hidden flex-shrink-0 border border-white/20">
                           <img src={item.image} alt={`Изображение товара в корзине — ${item.name}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-white truncate text-lg leading-tight mb-1">{item.name}</h4>
                          <p className="text-white/70 text-sm mb-3">{item.price} ₽ за штуку</p>
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                             <button 
                               onClick={() => onUpdateQty(item.id, -1)}
                               className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                               disabled={item.quantity <= 1}
                               type="button"
                             >
                               <Minus size={16} strokeWidth={2.5} className="text-white" />
                             </button>
                             <span className="font-black text-lg min-w-[24px] text-center text-white">{item.quantity}</span>
                             <button 
                               onClick={() => onUpdateQty(item.id, 1)}
                               className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                               type="button"
                             >
                               <Plus size={16} strokeWidth={2.5} className="text-white" />
                             </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <span className="font-black text-xl text-white">{item.price * item.quantity} ₽</span>
                            <button 
                                onClick={() => onRemove(item.id)}
                                className="p-2 text-white/40 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                title="Удалить"
                                type="button"
                            >
                                <Trash2 size={18} strokeWidth={2.5} />
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-10 pt-8 border-t border-white/20 relative z-10">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-white/70 font-bold uppercase tracking-wider text-sm">Итого к оплате</span>
                  <span className="text-3xl md:text-4xl font-black text-white">{total.toLocaleString()} ₽</span>
                </div>
                <div className="bg-white/10 p-5 rounded-xl flex items-start gap-4 text-sm text-white/80 border border-white/10 backdrop-blur-sm">
                   <Zap size={24} strokeWidth={2.5} className="text-brand-accent-light flex-shrink-0 mt-0.5" />
                   <span className="font-medium leading-relaxed">
                     {remainingForFreeShipping > 0 
                        ? 'Осталось совсем чуть-чуть до бесплатной доставки!' 
                        : 'Доставим бесплатно и за 2 часа!'}
                   </span>
                </div>
              </div>
            </div>
          </div>
          {/* Form Side */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 bg-white flex flex-col justify-center rounded-b-3xl md:rounded-b-[2.5rem] lg:rounded-bl-none lg:rounded-r-3xl md:lg:rounded-r-[2.5rem]">
            <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto w-full">
              {/* Header */}
              <div>
                 <h3 className="text-3xl md:text-4xl font-black text-brand-text mb-4">Оформление</h3>
                 <p className="text-lg md:text-xl text-brand-text-soft">Осталось пару шагов до витаминного рая</p>
              </div>
              {/* Section 1: Customer Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center text-white">
                    <User size={24} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-2xl font-black text-brand-text">Контактные данные</h4>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-text mb-3">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      className={`w-full px-5 py-4 rounded-xl border-2 ${
                        touched.name && errors.name
                          ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-brand-text/10 bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10'
                      } outline-none transition-all text-brand-text placeholder-brand-text-soft/50 font-medium text-base`}
                      placeholder="Иван Иванов"
                    />
                    {touched.name && errors.name && (
                      <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-brand-text mb-3">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur('phone')}
                        className={`w-full px-5 py-4 rounded-xl border-2 ${
                          touched.phone && errors.phone
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-brand-text/10 bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10'
                        } outline-none transition-all text-brand-text placeholder-brand-text-soft/50 font-medium text-base`}
                        placeholder="+7 (999) 000-00-00"
                      />
                      {touched.phone && errors.phone && (
                        <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-text mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-5 py-4 rounded-xl border-2 ${
                          touched.email && errors.email
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-brand-text/10 bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10'
                        } outline-none transition-all text-brand-text placeholder-brand-text-soft/50 font-medium text-base`}
                        placeholder="ivan@example.com"
                      />
                      {touched.email && errors.email && (
                        <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 2: Delivery Info */}
              <div className="space-y-6 pt-4 border-t-2 border-brand-accent-light/30 mb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent-light to-brand-yellow flex items-center justify-center text-white shadow-medium">
                    <Truck size={20} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-xl font-black text-brand-text tracking-tight">Доставка</h4>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3 ml-1">
                    <MapPin size={14} strokeWidth={2.5} className="text-brand-accent" />
                    Адрес доставки
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={() => handleBlur('address')}
                    className={`w-full px-6 py-5 rounded-[--radius-ui] border-2 ${
                      touched.address && errors.address
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20'
                    } outline-none transition-all text-brand-text placeholder-brand-text-soft/70 font-medium text-base`}
                    placeholder="Улица, дом, квартира"
                  />
                  {touched.address && errors.address && (
                    <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-6">
                   {/* INLINE CALENDAR TRIGGER */}
                   <div>
                     <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3 ml-1">
                       <Calendar size={14} strokeWidth={2.5} className="text-brand-accent" />
                       Когда доставить?
                     </label>
                     <div 
                       onClick={() => setShowCalendar(!showCalendar)}
                       className={`w-full px-6 py-5 rounded-[--radius-ui] border-2 cursor-pointer flex items-center justify-between transition-all group ${
                         touched.deliveryTime && errors.deliveryTime
                           ? 'border-red-400 bg-red-50'
                           : showCalendar || formData.deliveryTime 
                             ? 'border-brand-accent glass ring-4 ring-brand-accent/20' 
                             : 'border-brand-accent-light/40 glass hover:border-brand-accent'
                       }`}
                     >
                       <div className="flex items-center gap-3 flex-1 min-w-0">
                         <div className={`w-10 h-10 rounded-[--radius-ui] flex items-center justify-center transition-colors shrink-0 ${showCalendar || formData.deliveryTime ? 'bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white shadow-medium' : 'bg-brand-accent-light text-brand-accent group-hover:bg-brand-accent-light'}`}>
                           <Calendar size={20} strokeWidth={2.5} />
                         </div>
                         <span className={`font-medium truncate text-base ${formData.deliveryTime ? 'text-brand-text' : 'text-brand-text-soft/70'}`}>
                           {formData.deliveryTime || 'Выберите дату и время'}
                         </span>
                       </div>
                       <ChevronRight size={20} strokeWidth={2.5} className={`text-brand-text-soft/70 shrink-0 transition-transform duration-300 ${showCalendar ? 'rotate-90 text-brand-accent' : ''}`} />
                     </div>
                     {touched.deliveryTime && errors.deliveryTime && (
                       <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                         <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                         {errors.deliveryTime}
                       </p>
                     )}
                     {/* INLINE CALENDAR CONTENT (EXPANDABLE) */}
                     <div 
                        className={`grid transition-[grid-template-rows,margin,opacity] duration-500 ease-in-out ${
                          showCalendar ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                     >
                       <div className="overflow-hidden">
                         <div className="p-3 sm:p-6 bg-white border-2 border-brand-accent-light/40 rounded-[2rem] shadow-sm">
                           {/* Header */}
                           <div className="flex items-center justify-between mb-4">
                              <button type="button" onClick={() => changeMonth(-1)} className="p-2 hover:bg-brand-accent-light rounded-[--radius-ui] text-brand-text transition-colors"><ChevronLeft size={20} strokeWidth={2.5}/></button>
                              <span className="font-black text-brand-text capitalize tracking-tight text-sm sm:text-base">
                                {monthNames[currentMonth.getMonth()]} <span className="text-brand-accent">{currentMonth.getFullYear()}</span>
                              </span>
                              <button type="button" onClick={() => changeMonth(1)} className="p-2 hover:bg-brand-accent-light rounded-[--radius-ui] text-brand-text transition-colors"><ChevronRight size={20} strokeWidth={2.5}/></button>
                           </div>
                           {/* Flex Container - ALWAYS ROW (Side-by-side) */}
                           <div className="flex gap-2 sm:gap-6 flex-row">
                              {/* Date Grid - Takes available space */}
                              <div className="flex-1 min-w-0">
                                  <div className="grid grid-cols-7 mb-2 text-center">
                                    {weekDays.map(d => <span key={d} className="text-[8px] sm:text-[10px] font-black text-brand-text-soft uppercase tracking-widest">{d}</span>)}
                                  </div>
                                  <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 sm:gap-x-1">
                                    {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => <div key={`empty-${i}`} />)}
                                    {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                                      const day = i + 1;
                                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                                      const isToday = new Date().toDateString() === date.toDateString();
                                      const isPast = date < new Date(new Date().setHours(0,0,0,0));

                                      return (
                                        <button
                                          key={day}
                                          type="button"
                                          disabled={isPast}
                                          onClick={() => setSelectedDate(date)}
                                          className={`h-7 w-7 sm:h-9 sm:w-9 mx-auto rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all relative
                                            ${isSelected 
                                              ? 'bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white shadow-medium scale-110' 
                                              : 'text-brand-text hover:bg-brand-accent-light'
                                            }
                                            ${isPast ? 'opacity-20 cursor-not-allowed hover:bg-transparent' : ''}
                                            ${isToday && !isSelected ? 'text-brand-accent ring-1 ring-brand-accent' : ''}
                                          `}
                                        >
                                          {day}
                                        </button>
                                      );
                                    })}
                                  </div>
                              </div>
                              {/* Time Column - Vertical Scroll, Fixed Width */}
                              <div className="w-20 sm:w-1/3 border-l border-brand-accent-light/40 pl-2 sm:pl-6 shrink-0 flex flex-col">
                                 <div className="mb-2 text-center sm:text-left">
                                    <span className="text-[9px] sm:text-[10px] font-bold uppercase text-brand-text-soft tracking-wider">Время</span>
                                 </div>
                                 <div className="grid grid-cols-1 gap-2 max-h-[190px] sm:max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                                    {timeSlots.map(time => (
                                      <button
                                        key={time}
                                        type="button"
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-1.5 sm:py-2 px-1 sm:px-3 rounded-lg sm:rounded-[--radius-ui] text-[10px] sm:text-xs font-bold border transition-all text-center whitespace-nowrap
                                          ${selectedTime === time 
                                            ? 'bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white border-brand-accent shadow-medium scale-[1.02]' 
                                            : 'bg-white border-brand-accent-light/40 text-brand-text hover:border-brand-accent hover:text-brand-accent'
                                          }
                                        `}
                                      >
                                        {time}
                                      </button>
                                    ))}
                                 </div>
                              </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
              {/* Section 3: Payment Method */}
              <div className="space-y-6 pt-6 border-t-2 border-brand-accent-light/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-yellow to-brand-accent flex items-center justify-center text-white shadow-medium">
                    <CreditCard size={20} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-xl font-black text-brand-text tracking-tight">Способ оплаты</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                    className={`p-5 rounded-[--radius-ui] border-2 flex items-center gap-4 transition-all ${formData.paymentMethod === 'card' ? 'border-brand-accent bg-brand-accent-light ring-4 ring-brand-accent/20' : 'border-brand-accent-light/40 glass hover:border-brand-accent'}`}
                  >
                    <div className={`w-12 h-12 rounded-[--radius-ui] flex items-center justify-center ${formData.paymentMethod === 'card' ? 'bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white shadow-medium' : 'bg-brand-accent-light text-brand-accent'}`}>
                      <CreditCard size={24} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-brand-text text-lg">Банковская карта</div>
                      <div className="text-brand-text-soft text-sm font-medium">Оплата онлайн</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
                    className={`p-5 rounded-[--radius-ui] border-2 flex items-center gap-4 transition-all ${formData.paymentMethod === 'cash' ? 'border-brand-accent bg-brand-accent-light ring-4 ring-brand-accent/20' : 'border-brand-accent-light/40 glass hover:border-brand-accent'}`}
                  >
                    <div className={`w-12 h-12 rounded-[--radius-ui] flex items-center justify-center ${formData.paymentMethod === 'cash' ? 'bg-gradient-to-br from-brand-yellow to-brand-accent text-white shadow-medium' : 'bg-brand-accent-light text-brand-accent'}`}>
                      <Zap size={24} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-brand-text text-lg">Наличными</div>
                      <div className="text-brand-text-soft text-sm font-medium">При получении</div>
                    </div>
                  </button>
                </div>
              </div>
              {/* Comment Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3 ml-1">
                  <MessageSquare size={14} strokeWidth={2.5} className="text-brand-accent" />
                  Дополнительно
                </label>
                <input
                  type="text"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full px-6 py-5 rounded-[--radius-ui] border-2 border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 outline-none transition-all text-brand-text placeholder-brand-text-soft/70 font-medium text-base"
                  placeholder="Промокод / Код домофона"
                />
              </div>
              <div className="flex items-start gap-4 pt-4">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={formData.agreement}
                  onChange={handleCheckbox}
                  className="w-6 h-6 accent-brand-accent rounded-lg cursor-pointer mt-1 flex-shrink-0"
                />
                <label htmlFor="agreement" className="text-brand-text-soft cursor-pointer leading-relaxed font-medium text-base">
                  Согласен с условиями <span className="underline decoration-dotted text-brand-accent font-bold">оферты</span> и даю согласие на обработку персональных данных.
                </label>
              </div>
              {touched.agreement && errors.agreement && (
                <p className="text-sm font-bold text-red-500 flex items-start gap-2 -mt-2">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                  {errors.agreement}
                </p>
              )}
              <button
                type="submit"
                disabled={cart.length === 0 || status === 'loading'}
                className="w-full py-6 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black text-xl rounded-[--radius-ui] transition-all shadow-deep-xl hover:shadow-deep-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 mt-6 active:scale-95 hover:brightness-110 flex items-center justify-center gap-4 group border-3 border-white/30 relative overflow-hidden"
              >
                {!cart.length && status === 'idle' && (
                  <span className="absolute inset-0 bg-red-500/20"></span>
                )}
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative z-10 flex items-center gap-4">
                  {status === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" size={24} strokeWidth={2.5} /> Ждем...
                      </>
                  ) : (
                      <>
                        <span>Оформить заказ</span>
                        <CreditCard size={24} strokeWidth={2.5} className="transition-transform duration-300" />
                      </>
                  )}
                </span>
              </button>
              {errors.cart && (
                <p className="text-sm font-bold text-red-500 flex items-center justify-center gap-2 -mt-2">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0"></span>
                  {errors.cart}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
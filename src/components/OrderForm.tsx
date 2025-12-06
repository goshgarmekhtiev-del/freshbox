import React, { useState, useEffect } from 'react';
import type { CartItem, NotificationData } from '../types';
import { Loader2, CheckCircle2, Zap, CreditCard, ShoppingBag, Truck, Plus, Minus, Trash2, Calendar, ChevronLeft, ChevronRight, User, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useReveal } from '../utils/useReveal';

interface OrderFormProps {
  cart: CartItem[];
  onSubmit: (formData: any) => void;
  onOrderComplete: (data: NotificationData) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ cart, onSubmit, onOrderComplete, onUpdateQty, onRemove }) => {
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
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => {
    let day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    if (day === 0) day = 7; 
    return day - 1; 
  };

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentMonth(newDate);
  };
  // -----------------------------

  // Calculate totals and shipping
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 5000;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - total;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('Пожалуйста, подтвердите согласие на обработку данных');
      return;
    }

    setStatus('loading');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      
      // Trigger the "Social Proof" notification for the user
      const mainProduct = cart.length > 0 ? cart[0].name : 'Фруктовый бокс';
      // Simple logic to guess city from address or default to current city
      const city = formData.address.split(',')[0] || 'Москва';
      
      onOrderComplete({
        name: formData.name,
        city: city,
        product: mainProduct
      });
      
      setTimeout(() => {
        onSubmit(formData);
        setStatus('idle');
        setFormData({
            name: '', phone: '', email: '', address: '', deliveryTime: '', comment: '', paymentMethod: 'card', agreement: false
        });
        setSelectedDate(null);
        setSelectedTime(null);
        setShowCalendar(false);
      }, 3000);

    } catch (error) {
      console.error('Order failed', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreement: e.target.checked }));
  };

  if (status === 'success') {
    return (
        <section id="order-form" className="py-32 bg-gradient-to-br from-lime-50 to-lime-100 reveal">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-lime-500 to-lime-600 rounded-full flex items-center justify-center text-white mb-10 shadow-deep-xl animate-bounce">
                    <CheckCircle2 size={64} strokeWidth={2.5} />
                </div>
                <h2 className="text-5xl font-black text-brown-900 mb-6 tracking-tight">Супер! Заказ принят.</h2>
                <p className="text-brown-600 text-xl max-w-xl font-medium leading-relaxed">
                  Мы уже побежали собирать ваш бокс! Скоро позвоним для подтверждения.
                </p>
            </div>
        </section>
    );
  }

  return (
    <section id="order-form" className="py-24 md:py-32 bg-gradient-to-br from-orange-50 via-white to-peach-50 reveal">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 max-w-7xl">
        {/* Main form container */}
        <div ref={formRef as React.RefObject<HTMLDivElement>} className={`bg-white rounded-[3rem] shadow-deep-xl grid lg:grid-cols-12 min-h-[700px] border-3 border-orange-200/40 relative z-10 overflow-hidden reveal reveal-scale-in ${formVisible ? 'reveal-visible' : ''}`}>
            
            {/* Cart Summary Side */}
            <div className="lg:col-span-5 bg-gradient-to-br from-orange-500 to-peach-500 text-white p-8 md:p-12 lg:p-16 flex flex-col relative overflow-hidden rounded-t-[3rem] lg:rounded-tr-none lg:rounded-l-[3rem]">
              {/* Deco Elements */}
              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-8 flex items-center gap-3 tracking-tight">
                  <ShoppingBag size={32} strokeWidth={2.5} className="text-white" /> Ваш заказ
                </h2>

                {/* Free Shipping Progress */}
                {cart.length > 0 && (
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 mb-8 shadow-medium">
                    {remainingForFreeShipping > 0 ? (
                      <>
                        <p className="text-sm font-black text-white mb-3 flex items-center gap-2">
                          <Truck size={16} strokeWidth={2.5} /> До бесплатной доставки: <span className="text-white">{remainingForFreeShipping} ₽</span>
                        </p>
                        <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-white to-lime-200 transition-all duration-700"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm font-black text-lime-200 mb-2 flex items-center gap-2">
                        <Truck size={16} strokeWidth={2.5} /> Бесплатная доставка активирована!
                      </p>
                    )}
                  </div>
                )}
               
              <div className="flex-1 relative z-10 overflow-y-auto pr-2 custom-scrollbar mt-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-70 border-2 border-dashed border-white/20 rounded-2xl p-8 bg-white/5">
                     <p className="font-black text-xl mb-2">В корзине пусто :(</p>
                     <p className="text-white/80 font-medium mt-1">Добавьте сочных фруктов!</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-5 items-center bg-white/10 p-4 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300 group">
                        <div className="w-20 h-20 rounded-xl bg-white overflow-hidden flex-shrink-0 border-2 border-white/20 shadow-medium">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
                               <Minus size={16} strokeWidth={3} className="text-white" />
                             </button>
                             <span className="font-black text-lg min-w-[24px] text-center text-white">{item.quantity}</span>
                             <button 
                               onClick={() => onUpdateQty(item.id, 1)}
                               className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                               type="button"
                             >
                               <Plus size={16} strokeWidth={3} className="text-white" />
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
                <div className="flex justify-between items-end mb-8">
                  <span className="text-white/80 font-black uppercase tracking-wider text-sm">Итого к оплате</span>
                  <span className="text-5xl font-black text-white">{total.toLocaleString()} ₽</span>
                </div>
                
                <div className="bg-white/15 p-5 rounded-2xl flex items-start gap-4 text-sm text-white/90 border border-white/10 backdrop-blur-sm shadow-medium">
                   <Zap size={24} strokeWidth={2.5} className="text-lime-300 flex-shrink-0 mt-0.5" />
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
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 bg-white flex flex-col justify-center rounded-b-[3rem] lg:rounded-bl-none lg:rounded-r-[3rem]">
              <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto w-full">
                {/* Header */}
                <div className="text-center">
                   <h3 className="text-4xl md:text-5xl font-black text-brown-900 tracking-tight mb-3">Оформление</h3>
                   <p className="text-brown-600 font-medium text-lg">Осталось пару шагов до витаминного рая 🍊</p>
                </div>
                
                {/* Section 1: Customer Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-peach-500 flex items-center justify-center text-white shadow-medium">
                      <User size={20} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-xl font-black text-brown-900 tracking-tight">Контактные данные</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                        <User size={14} strokeWidth={2.5} className="text-orange-500" />
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-5 rounded-2xl border-2 border-orange-200/40 glass focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all text-brown-900 placeholder-brown-400 font-medium text-base"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                          <Phone size={14} strokeWidth={2.5} className="text-orange-500" />
                          Телефон
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-6 py-5 rounded-2xl border-2 border-orange-200/40 glass focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all text-brown-900 placeholder-brown-400 font-medium text-base"
                          placeholder="+7 (999) 000-00-00"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                          <Mail size={14} strokeWidth={2.5} className="text-orange-500" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-6 py-5 rounded-2xl border-2 border-orange-200/40 glass focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all text-brown-900 placeholder-brown-400 font-medium text-base"
                          placeholder="ivan@example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Delivery Info */}
                <div className="space-y-6 pt-4 border-t-2 border-orange-100 mb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-peach-500 to-honey-400 flex items-center justify-center text-white shadow-medium">
                      <Truck size={20} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-xl font-black text-brown-900 tracking-tight">Доставка</h4>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                      <MapPin size={14} strokeWidth={2.5} className="text-orange-500" />
                      Адрес доставки
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-6 py-5 rounded-2xl border-2 border-orange-200/40 glass focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all text-brown-900 placeholder-brown-400 font-medium text-base"
                      placeholder="Улица, дом, квартира"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     {/* INLINE CALENDAR TRIGGER */}
                     <div>
                       <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                         <Calendar size={14} strokeWidth={2.5} className="text-orange-500" />
                         Когда доставить?
                       </label>
                       
                       <div 
                         onClick={() => setShowCalendar(!showCalendar)}
                         className={`w-full px-6 py-5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all group ${showCalendar || formData.deliveryTime ? 'border-orange-500 glass ring-4 ring-orange-500/20' : 'border-orange-200/40 glass hover:border-orange-300'}`}
                       >
                         <div className="flex items-center gap-3 flex-1 min-w-0">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${showCalendar || formData.deliveryTime ? 'bg-gradient-to-br from-orange-500 to-peach-500 text-white shadow-medium' : 'bg-orange-100 text-orange-500 group-hover:bg-orange-200'}`}>
                             <Calendar size={20} strokeWidth={2.5} />
                           </div>
                           <span className={`font-medium truncate text-base ${formData.deliveryTime ? 'text-brown-900' : 'text-brown-400'}`}>
                             {formData.deliveryTime || 'Выберите дату и время'}
                           </span>
                         </div>
                         <ChevronRight size={20} strokeWidth={2.5} className={`text-brown-400 shrink-0 transition-transform duration-300 ${showCalendar ? 'rotate-90 text-orange-500' : ''}`} />
                       </div>

                       {/* INLINE CALENDAR CONTENT (EXPANDABLE) */}
                       <div 
                          className={`grid transition-[grid-template-rows,margin,opacity] duration-500 ease-in-out ${
                            showCalendar ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                          }`}
                       >
                         <div className="overflow-hidden">
                           <div className="p-3 sm:p-6 bg-white border-2 border-orange-200/40 rounded-[2rem] shadow-sm">
                             
                             {/* Header */}
                             <div className="flex items-center justify-between mb-4">
                                <button type="button" onClick={() => changeMonth(-1)} className="p-2 hover:bg-orange-50 rounded-xl text-brown-900 transition-colors"><ChevronLeft size={20} strokeWidth={2.5}/></button>
                                <span className="font-black text-brown-900 capitalize tracking-tight text-sm sm:text-base">
                                  {monthNames[currentMonth.getMonth()]} <span className="text-orange-500">{currentMonth.getFullYear()}</span>
                                </span>
                                <button type="button" onClick={() => changeMonth(1)} className="p-2 hover:bg-orange-50 rounded-xl text-brown-900 transition-colors"><ChevronRight size={20} strokeWidth={2.5}/></button>
                             </div>

                             {/* Flex Container - ALWAYS ROW (Side-by-side) */}
                             <div className="flex gap-2 sm:gap-6 flex-row">
                                
                                {/* Date Grid - Takes available space */}
                                <div className="flex-1 min-w-0">
                                    <div className="grid grid-cols-7 mb-2 text-center">
                                      {weekDays.map(d => <span key={d} className="text-[8px] sm:text-[10px] font-black text-brown-400 uppercase tracking-widest">{d}</span>)}
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
                                                ? 'bg-gradient-to-br from-orange-500 to-peach-500 text-white shadow-medium scale-110' 
                                                : 'text-brown-900 hover:bg-orange-100'
                                              }
                                              ${isPast ? 'opacity-20 cursor-not-allowed hover:bg-transparent' : ''}
                                              ${isToday && !isSelected ? 'text-orange-500 ring-1 ring-orange-500' : ''}
                                            `}
                                          >
                                            {day}
                                          </button>
                                        );
                                      })}
                                    </div>
                                </div>

                                {/* Time Column - Vertical Scroll, Fixed Width */}
                                <div className="w-20 sm:w-1/3 border-l border-orange-200/40 pl-2 sm:pl-6 shrink-0 flex flex-col">
                                   <div className="mb-2 text-center sm:text-left">
                                      <span className="text-[9px] sm:text-[10px] font-bold uppercase text-brown-600 tracking-wider">Время</span>
                                   </div>
                                   <div className="grid grid-cols-1 gap-2 max-h-[190px] sm:max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                                      {timeSlots.map(time => (
                                        <button
                                          key={time}
                                          type="button"
                                          onClick={() => setSelectedTime(time)}
                                          className={`py-1.5 sm:py-2 px-1 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold border transition-all text-center whitespace-nowrap
                                            ${selectedTime === time 
                                              ? 'bg-gradient-to-br from-orange-500 to-peach-500 text-white border-orange-500 shadow-medium scale-[1.02]' 
                                              : 'bg-white border-orange-200/40 text-brown-900 hover:border-orange-500 hover:text-orange-500'
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
                <div className="space-y-6 pt-6 border-t-2 border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-honey-400 to-orange-500 flex items-center justify-center text-white shadow-medium">
                      <CreditCard size={20} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-xl font-black text-brown-900 tracking-tight">Способ оплаты</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                      className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${formData.paymentMethod === 'card' ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-500/20' : 'border-orange-200/40 glass hover:border-orange-300'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.paymentMethod === 'card' ? 'bg-gradient-to-br from-orange-500 to-peach-500 text-white shadow-medium' : 'bg-orange-100 text-orange-500'}`}>
                        <CreditCard size={24} strokeWidth={2.5} />
                      </div>
                      <div className="text-left">
                        <div className="font-black text-brown-900 text-lg">Банковская карта</div>
                        <div className="text-brown-600 text-sm font-medium">Оплата онлайн</div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
                      className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${formData.paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-500/20' : 'border-orange-200/40 glass hover:border-orange-300'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.paymentMethod === 'cash' ? 'bg-gradient-to-br from-honey-400 to-orange-500 text-white shadow-medium' : 'bg-orange-100 text-orange-500'}`}>
                        <Zap size={24} strokeWidth={2.5} />
                      </div>
                      <div className="text-left">
                        <div className="font-black text-brown-900 text-lg">Наличными</div>
                        <div className="text-brown-600 text-sm font-medium">При получении</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Comment Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                    <MessageSquare size={14} strokeWidth={2.5} className="text-orange-500" />
                    Дополнительно
                  </label>
                  <input
                    type="text"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full px-6 py-5 rounded-2xl border-2 border-orange-200/40 glass focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all text-brown-900 placeholder-brown-400 font-medium text-base"
                    placeholder="Промокод / Код домофона"
                  />
                </div>

                <div className="flex items-start gap-4 pt-4">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={formData.agreement}
                    onChange={handleCheckbox}
                    className="w-6 h-6 accent-orange-500 rounded-lg cursor-pointer mt-1 flex-shrink-0"
                  />
                  <label htmlFor="agreement" className="text-brown-600 cursor-pointer leading-relaxed font-medium text-base">
                    Согласен с условиями <span className="underline decoration-dotted text-orange-500 font-bold">оферты</span> и даю согласие на обработку персональных данных.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0 || status === 'loading'}
                  className="w-full py-6 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white font-black text-xl rounded-2xl transition-all shadow-deep-xl hover:shadow-deep-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-6 active:scale-95 hover:brightness-110 flex items-center justify-center gap-4 group border-3 border-white/30 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="relative z-10 flex items-center gap-4">
                    {status === 'loading' ? (
                        <>
                          <Loader2 className="animate-spin" size={24} strokeWidth={2.5} /> Ждем...
                        </>
                    ) : (
                        <>
                          <span>Оформить заказ</span>
                          <CreditCard size={24} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform duration-300" />
                        </>
                    )}
                  </span>
                </button>
              </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
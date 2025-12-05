
import React, { useState, useEffect } from 'react';
import { CartItem, NotificationData } from '../types';
import { Loader2, CheckCircle2, Zap, CreditCard, ShoppingBag, Truck, Plus, Minus, Trash2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface OrderFormProps {
  cart: CartItem[];
  onSubmit: (formData: any) => void;
  onOrderComplete: (data: NotificationData) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ cart, onSubmit, onOrderComplete, onUpdateQty, onRemove }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryTime: '',
    comment: '',
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
            name: '', phone: '', email: '', address: '', deliveryTime: '', comment: '', agreement: false
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
        <section id="order-form" className="py-32 bg-green-50 reveal">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white mb-8 shadow-xl animate-bounce">
                    <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-extrabold text-brand-text mb-4">Супер! Заказ принят.</h2>
                <p className="text-brand-text-soft text-lg max-w-md font-medium">
                  Мы уже побежали собирать ваш бокс! Скоро позвоним для подтверждения.
                </p>
            </div>
        </section>
    );
  }

  return (
    <section id="order-form" className="py-24 bg-brand-bg reveal">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl grid lg:grid-cols-12 min-h-[600px] border border-gray-100 relative z-10 overflow-hidden">
            
            {/* Cart Summary Side */}
            <div className="lg:col-span-5 bg-[#064E3B] text-white p-6 md:p-10 lg:p-14 flex flex-col relative overflow-hidden rounded-t-[2.5rem] lg:rounded-tr-none lg:rounded-l-[2.5rem]">
               {/* Deco */}
               <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl"></div>
               <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-brand-accent-light/10 rounded-full blur-3xl"></div>

              <h2 className="text-3xl font-bold mb-6 relative z-10 flex items-center gap-2">
                <ShoppingBag className="text-brand-accent" /> Ваш заказ
              </h2>

              {/* Free Shipping Progress inside Order Form */}
              {cart.length > 0 && (
                <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6">
                  {remainingForFreeShipping > 0 ? (
                    <p className="text-sm font-bold text-white mb-2">
                      До бесплатной доставки: <span className="text-brand-accent">{remainingForFreeShipping} ₽</span>
                    </p>
                  ) : (
                    <p className="text-sm font-bold text-brand-accent-light mb-2 flex items-center gap-2">
                      <Truck size={16} /> Бесплатная доставка активирована!
                    </p>
                  )}
                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-accent to-brand-yellow transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex-1 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50 border-2 border-dashed border-white/10 rounded-2xl p-8">
                     <p className="font-medium">В корзине пусто :(</p>
                     <p className="text-sm mt-2">Добавьте сочных фруктов!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 rounded-xl bg-white overflow-hidden flex-shrink-0 border-2 border-white/20">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white truncate text-base leading-tight">{item.name}</h4>
                          <p className="text-white/60 text-xs mt-1">{item.price} ₽</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                             <button 
                               onClick={() => onUpdateQty(item.id, -1)}
                               className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-colors disabled:opacity-30"
                               disabled={item.quantity <= 1}
                               type="button"
                             >
                               <Minus size={12} strokeWidth={3} />
                             </button>
                             <span className="font-bold text-sm min-w-[16px] text-center">{item.quantity}</span>
                             <button 
                               onClick={() => onUpdateQty(item.id, 1)}
                               className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-colors"
                               type="button"
                             >
                               <Plus size={12} strokeWidth={3} />
                             </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="font-bold text-lg">{item.price * item.quantity} ₽</span>
                            <button 
                                onClick={() => onRemove(item.id)}
                                className="p-2 text-white/30 hover:text-red-400 transition-colors"
                                title="Удалить"
                                type="button"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-white/60 font-bold uppercase tracking-wider text-sm">Итого к оплате</span>
                  <span className="text-4xl font-extrabold text-brand-accent">{total.toLocaleString()} ₽</span>
                </div>
                
                <div className="bg-white/10 p-4 rounded-xl flex items-center gap-3 text-sm text-white/90 border border-white/5 backdrop-blur-sm">
                   <Zap size={20} className="text-brand-accent flex-shrink-0 fill-current" />
                   <span className="font-medium leading-snug">
                     {remainingForFreeShipping > 0 
                        ? 'Осталось совсем чуть-чуть до бесплатной доставки!' 
                        : 'Доставим бесплатно и за 2 часа!'}
                   </span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7 p-10 md:p-14 bg-white flex flex-col justify-center rounded-b-[2.5rem] lg:rounded-bl-none lg:rounded-r-[2.5rem]">
              <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto w-full">
                <div className="text-center lg:text-left mb-4">
                   <h3 className="text-3xl font-extrabold text-brand-text">Оформление</h3>
                   <p className="text-brand-text-soft font-medium">Осталось пару шагов до витаминного рая</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-2 ml-1">
                            Ваше имя
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all text-brand-text placeholder-gray-400 font-medium"
                            placeholder="Иван"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-2 ml-1">
                            Телефон
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all text-brand-text placeholder-gray-400 font-medium"
                            placeholder="+7 (999) 000-00-00"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-2 ml-1">
                        Адрес доставки
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all text-brand-text placeholder-gray-400 font-medium"
                        placeholder="Улица, дом, квартира"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                     {/* INLINE CALENDAR TRIGGER */}
                     <div className="md:col-span-2">
                       <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-2 ml-1">
                         Когда доставить?
                       </label>
                       
                       <div 
                         onClick={() => setShowCalendar(!showCalendar)}
                         className={`w-full px-4 py-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all group hover:border-brand-accent/50 ${showCalendar || formData.deliveryTime ? 'border-brand-accent bg-white ring-4 ring-brand-accent/10' : 'border-gray-100 bg-gray-50'}`}
                       >
                         <div className="flex items-center gap-3 flex-1 min-w-0">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${showCalendar || formData.deliveryTime ? 'bg-brand-accent text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-brand-accent group-hover:text-white'}`}>
                             <Calendar size={18} />
                           </div>
                           <span className={`font-medium truncate ${formData.deliveryTime ? 'text-brand-text' : 'text-gray-400'}`}>
                             {formData.deliveryTime || 'Выберите дату и время'}
                           </span>
                         </div>
                         <ChevronRight size={18} className={`text-gray-400 shrink-0 transition-transform duration-300 ${showCalendar ? 'rotate-90 text-brand-accent' : ''}`} />
                       </div>

                       {/* INLINE CALENDAR CONTENT (EXPANDABLE) */}
                       <div 
                          className={`grid transition-[grid-template-rows,margin,opacity] duration-500 ease-in-out ${
                            showCalendar ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                          }`}
                       >
                         <div className="overflow-hidden">
                           <div className="p-3 sm:p-6 bg-white border-2 border-gray-100 rounded-[2rem] shadow-sm">
                             
                             {/* Header */}
                             <div className="flex items-center justify-between mb-4">
                                <button type="button" onClick={() => changeMonth(-1)} className="p-2 hover:bg-orange-50 rounded-xl text-brand-text transition-colors"><ChevronLeft size={20}/></button>
                                <span className="font-black text-brand-text capitalize tracking-tight text-sm sm:text-base">
                                  {monthNames[currentMonth.getMonth()]} <span className="text-brand-accent">{currentMonth.getFullYear()}</span>
                                </span>
                                <button type="button" onClick={() => changeMonth(1)} className="p-2 hover:bg-orange-50 rounded-xl text-brand-text transition-colors"><ChevronRight size={20}/></button>
                             </div>

                             {/* Flex Container - ALWAYS ROW (Side-by-side) */}
                             <div className="flex gap-2 sm:gap-6 flex-row">
                                
                                {/* Date Grid - Takes available space */}
                                <div className="flex-1 min-w-0">
                                    <div className="grid grid-cols-7 mb-2 text-center">
                                      {weekDays.map(d => <span key={d} className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</span>)}
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
                                                ? 'bg-brand-accent text-white shadow-md scale-110' 
                                                : 'text-brand-text hover:bg-gray-100'
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
                                <div className="w-20 sm:w-1/3 border-l border-gray-100 pl-2 sm:pl-6 shrink-0 flex flex-col">
                                   <div className="mb-2 text-center sm:text-left">
                                      <span className="text-[9px] sm:text-[10px] font-bold uppercase text-brand-text-soft tracking-wider">Время</span>
                                   </div>
                                   <div className="grid grid-cols-1 gap-2 max-h-[190px] sm:max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                                      {timeSlots.map(time => (
                                        <button
                                          key={time}
                                          type="button"
                                          onClick={() => setSelectedTime(time)}
                                          className={`py-1.5 sm:py-2 px-1 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold border transition-all text-center whitespace-nowrap
                                            ${selectedTime === time 
                                              ? 'bg-brand-text text-white border-brand-text shadow-sm scale-[1.02]' 
                                              : 'bg-white border-gray-200 text-brand-text hover:border-brand-accent hover:text-brand-accent'
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

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-2 ml-1">
                         Дополнительно
                       </label>
                       <input
                           type="text"
                           name="comment"
                           value={formData.comment}
                           onChange={handleChange}
                           className="w-full px-6 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all text-brand-text placeholder-gray-400 font-medium"
                           placeholder="Промокод / Код домофона"
                       />
                    </div>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={formData.agreement}
                    onChange={handleCheckbox}
                    className="w-6 h-6 accent-brand-accent rounded-lg cursor-pointer"
                  />
                  <label htmlFor="agreement" className="text-xs text-brand-text-soft cursor-pointer leading-tight select-none font-medium">
                    Согласен с условиями <span className="underline decoration-dotted text-brand-accent">оферты</span>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0 || status === 'loading'}
                  className="w-full py-5 bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white font-extrabold text-xl rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-4 active:scale-95 hover:brightness-110 flex items-center justify-center gap-3 group"
                >
                  {status === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" /> Ждем...
                      </>
                  ) : (
                      <>
                        <span>Оформить заказ</span>
                        <CreditCard size={24} className="group-hover:rotate-12 transition-transform" />
                      </>
                  )}
                </button>
              </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;

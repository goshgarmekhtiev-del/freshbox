import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem, NotificationData } from '@/types';
import { Loader2, CreditCard, Calendar, ChevronLeft, ChevronRight, User, MapPin, MessageSquare, Zap } from 'lucide-react';
import { calculateOrderTotals } from '@/utils/cart';

interface CheckoutFormProps {
  cart: CartItem[];
  onOrderComplete: (data: NotificationData) => void;
  layout?: 'full' | 'compact';
}

export interface CheckoutFormHandle {
  submit: () => void;
  getStatus: () => 'idle' | 'loading' | 'success' | 'error';
}

const CheckoutForm = forwardRef<CheckoutFormHandle, CheckoutFormProps>(
  ({ cart, onOrderComplete, layout = 'full' }, ref) => {
  const navigate = useNavigate();

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

  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sync custom date/time to formData string
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const dateStr = selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
      setFormData(prev => ({ ...prev, deliveryTime: `${dateStr}, ${selectedTime}` }));
      
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
          error = 'Неверный формат телефона';
        }
        break;
      case 'email':
        if (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = 'Неверный формат email';
          }
        }
        break;
      case 'address':
        if (!value || value.trim().length < 5) {
          error = 'Введите полный адрес доставки';
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
    const fieldsToValidate = ['name', 'phone', 'address', 'deliveryTime'];
    let isValid = true;
    const newErrors: Record<string, string> = {};

    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        isValid = false;
      }
    });

    if (formData.email) {
      validateField('email', formData.email);
    }

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

  const performSubmit = async () => {
    setTouched({
      name: true,
      phone: true,
      email: true,
      address: true,
      deliveryTime: true,
      agreement: true
    });

    if (!validateForm()) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    try {
      // Отправляем заказ на serverless endpoint
      // В dev-режиме пропускаем отправку, так как endpoint недоступен локально
      if (import.meta.env.DEV) {
        console.log('DEV MODE: skipping send-lead');
      } else {
        const response = await fetch('/api/send-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'Order',
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            deliveryTime: formData.deliveryTime,
            comment: formData.comment || '',
            cart: cart.map(item => ({
              title: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to send order');
        }
      }

      // Если выбран способ оплаты "картой", создаём платеж через YooKassa
      if (formData.paymentMethod === 'card') {
        try {
          // Вычисляем сумму заказа используя утилиту
          const totals = calculateOrderTotals(cart);

          // Формируем описание из товаров корзины
          const description = cart.map(i => `${i.name} x${i.quantity}`).join(', ');

          // Создаём платеж через YooKassa
          const paymentResponse = await fetch('/api/create-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: totals.total,
              orderId: Date.now(),
              description: description,
            }),
          });

          if (!paymentResponse.ok) {
            throw new Error('Failed to create payment');
          }

          const paymentData = await paymentResponse.json();

          // Если получен confirmation_url, перенаправляем пользователя на оплату
          if (paymentData.confirmation_url) {
            window.location.href = paymentData.confirmation_url;
            return; // Прерываем выполнение, так как происходит редирект
          } else {
            throw new Error('No confirmation URL received');
          }
        } catch (paymentErr) {
          console.error('PAYMENT CREATE FAILED', paymentErr);
          setStatus('idle');
          // Перенаправляем на страницу ошибки вместо alert
          navigate('/fail');
          return;
        }
      }

      // Если оплата наличными или платеж не требуется
      // Успешная отправка
      setStatus('success');
      
      const randomItem = cart[Math.floor(Math.random() * cart.length)];
      onOrderComplete({
        name: formData.name.split(' ')[0],
        city: 'Москва',
        product: randomItem.name
      });
      
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
    } catch (err) {
      console.error('Error sending order:', err);
      setStatus('idle');
      alert('Ошибка отправки заказа. Пожалуйста, попробуйте ещё раз.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSubmit();
  };

  // Пробрасываем функцию сабмита наружу через ref
  useImperativeHandle(ref, () => ({
    submit: performSubmit,
    getStatus: () => status,
  }));

  const isCompact = layout === 'compact';

  return (
    <form onSubmit={handleSubmit} className={isCompact ? 'space-y-4' : 'space-y-6'}>
      {/* Section 1: Customer Info */}
      <div className={`${isCompact ? 'p-4' : 'p-5'} rounded-2xl bg-gradient-to-br from-emerald-50/50 to-lime-50/50 border border-emerald-100 space-y-4`}>
        <div className="flex items-center gap-3">
          <div className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-xl bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center text-white`}>
            <User size={isCompact ? 16 : 20} strokeWidth={2.5} />
          </div>
          <h4 className={`${isCompact ? 'text-lg' : 'text-xl'} font-black text-brand-text`}>Контактные данные</h4>
        </div>
        
        <div className={`grid grid-cols-1 ${isCompact ? '' : 'lg:grid-cols-2'} gap-4`}>
          <div className={isCompact ? '' : 'lg:col-span-2'}>
            <label className="block text-sm font-bold text-brand-text mb-2">Ваше имя</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                touched.name && errors.name
                  ? 'border-[#e34a28]/50 bg-[#e34a28]/10'
                  : 'border-emerald-200 bg-white focus:border-brand-accent'
              } outline-none transition-all text-brand-text placeholder-brand-text-soft/50 font-medium`}
              placeholder="Иван Иванов"
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-xs font-semibold text-[#e34a28]">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-text mb-2">Телефон</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                touched.phone && errors.phone
                  ? 'border-[#e34a28]/50 bg-[#e34a28]/10'
                  : 'border-emerald-200 bg-white focus:border-brand-accent'
              } outline-none transition-all text-brand-text placeholder-brand-text-soft/50 font-medium`}
              placeholder="+7 (999) 000-00-00"
            />
            {touched.phone && errors.phone && (
              <p className="mt-1 text-xs font-semibold text-[#e34a28]">{errors.phone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-text mb-2">
              Email <span className="text-xs font-normal text-brand-text-soft">(для чека)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                touched.email && errors.email
                  ? 'border-[#e34a28]/50 bg-[#e34a28]/10'
                  : 'border-emerald-200 bg-white focus:border-brand-accent'
              } outline-none transition-all text-brand-text placeholder-brand-text-soft/50 font-medium`}
              placeholder="ivan@example.com"
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs font-semibold text-[#e34a28]">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Delivery Info */}
      <div className={`${isCompact ? 'p-4' : 'p-5'} rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 border border-amber-100 space-y-4`}>
        <div className="flex items-center gap-3">
          <div className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-xl bg-gradient-to-br from-brand-yellow to-brand-accent flex items-center justify-center text-white`}>
            <MapPin size={isCompact ? 16 : 20} strokeWidth={2.5} />
          </div>
          <h4 className={`${isCompact ? 'text-lg' : 'text-xl'} font-black text-brand-text`}>Адрес доставки</h4>
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-brand-text mb-2">
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
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              touched.address && errors.address
                ? 'border-[#e34a28]/50 bg-[#e34a28]/10'
                : 'border-amber-200 bg-white focus:border-brand-accent'
            } outline-none transition-all text-brand-text placeholder-brand-text-soft/50 font-medium`}
            placeholder="Улица, дом, подъезд, квартира"
          />
          {touched.address && errors.address && (
            <p className="mt-1 text-xs font-semibold text-[#e34a28]">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-brand-text mb-2">
            <Calendar size={14} strokeWidth={2.5} className="text-brand-accent" />
            Когда доставить?
          </label>
          <div 
            onClick={() => setShowCalendar(!showCalendar)}
            className={`w-full px-4 py-3 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
              touched.deliveryTime && errors.deliveryTime
                ? 'border-[#e34a28]/50 bg-[#e34a28]/10'
                : showCalendar || formData.deliveryTime 
                  ? 'border-brand-accent bg-white' 
                  : 'border-amber-200 bg-white hover:border-brand-accent'
            }`}
          >
            <span className={`font-medium text-sm ${formData.deliveryTime ? 'text-brand-text' : 'text-brand-text-soft/50'}`}>
              {formData.deliveryTime || 'Выберите дату и время'}
            </span>
            <ChevronRight size={18} strokeWidth={2.5} className={`text-brand-text-soft transition-transform ${showCalendar ? 'rotate-90' : ''}`} />
          </div>
          {touched.deliveryTime && errors.deliveryTime && (
            <p className="mt-1 text-xs font-semibold text-[#e34a28]">{errors.deliveryTime}</p>
          )}

          {/* Inline Calendar with smooth animation */}
          <div 
            className={`
              overflow-hidden transition-all duration-500 ease-in-out
              ${showCalendar ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}
            `}
          >
            <div className="p-4 bg-white border-2 border-brand-accent-light rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={() => changeMonth(-1)} className="p-2 hover:bg-emerald-50 rounded-xl transition-colors">
                  <ChevronLeft size={18} strokeWidth={2.5}/>
                </button>
                <span className="font-bold text-brand-text text-sm">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button type="button" onClick={() => changeMonth(1)} className="p-2 hover:bg-emerald-50 rounded-xl transition-colors">
                  <ChevronRight size={18} strokeWidth={2.5}/>
                </button>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="grid grid-cols-7 mb-2 text-center">
                    {weekDays.map(d => <span key={d} className="text-[10px] font-bold text-brand-text-soft">{d}</span>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: getFirstDayOfMonth(currentMonth) - 1 }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                      const day = i + 1;
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      const isPast = date < new Date(new Date().setHours(0,0,0,0));

                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={isPast}
                          onClick={() => setSelectedDate(date)}
                          className={`h-8 w-8 mx-auto rounded-lg flex items-center justify-center text-xs font-semibold transition-all
                            ${isSelected 
                              ? 'bg-brand-accent text-white' 
                              : 'text-brand-text hover:bg-emerald-50'
                            }
                            ${isPast ? 'opacity-20 cursor-not-allowed' : ''}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="w-24 border-l border-emerald-100 pl-3 space-y-2 max-h-[200px] overflow-y-auto">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`w-full py-2 px-2 rounded-lg text-xs font-semibold transition-all
                        ${selectedTime === time 
                          ? 'bg-brand-accent text-white' 
                          : 'bg-emerald-50 text-brand-text hover:bg-emerald-100'
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

      {/* Section 3: Payment Method */}
      <div className={`${isCompact ? 'p-4' : 'p-5'} rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100 space-y-4`}>
        <div className="flex items-center gap-3">
          <div className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white`}>
            <CreditCard size={isCompact ? 16 : 20} strokeWidth={2.5} />
          </div>
          <h4 className={`${isCompact ? 'text-lg' : 'text-xl'} font-black text-brand-text`}>Способ оплаты</h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData({...formData, paymentMethod: 'card'})}
            className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
              formData.paymentMethod === 'card' 
                ? 'border-brand-accent bg-brand-accent-light/30' 
                : 'border-blue-200 bg-white hover:border-brand-accent'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              formData.paymentMethod === 'card' 
                ? 'bg-brand-accent text-white' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              <CreditCard size={18} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <div className="font-bold text-brand-text text-sm">Банковская карта</div>
              <div className="text-brand-text-soft text-xs">Оплата онлайн</div>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
            className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
              formData.paymentMethod === 'cash' 
                ? 'border-brand-accent bg-brand-accent-light/30' 
                : 'border-blue-200 bg-white hover:border-brand-accent'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              formData.paymentMethod === 'cash' 
                ? 'bg-brand-accent text-white' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              <Zap size={18} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <div className="font-bold text-brand-text text-sm">Наличными</div>
              <div className="text-brand-text-soft text-xs">При получении</div>
            </div>
          </button>
        </div>
      </div>

      {/* Section 4: Additional */}
      {!isCompact && (
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-brand-text mb-2">
            <MessageSquare size={14} strokeWidth={2.5} className="text-brand-accent" />
            Дополнительно
          </label>
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-emerald-200 bg-white focus:border-brand-accent outline-none transition-all text-brand-text placeholder-brand-text-soft/50 font-medium"
            placeholder="Промокод / Код домофона"
          />
        </div>
      )}

      {/* Agreement - clickable label */}
      <label htmlFor="agreement" className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          id="agreement"
          checked={formData.agreement}
          onChange={handleChange}
          name="agreement"
          className="w-5 h-5 accent-brand-accent rounded cursor-pointer mt-0.5 flex-shrink-0"
        />
        <span className="text-sm text-brand-text-soft group-hover:text-brand-text leading-relaxed transition-colors">
          Согласен с условиями{' '}
          <a 
            href="/offer" 
            onClick={(e) => e.stopPropagation()}
            className="underline text-brand-accent font-semibold hover:text-brand-accent-dark"
          >
            оферты
          </a>{' '}
          и даю согласие на обработку персональных данных
        </span>
      </label>
      {touched.agreement && errors.agreement && (
        <p className="text-xs font-semibold text-[#e34a28] -mt-2">{errors.agreement}</p>
      )}

      {/* Submit Button - Hidden in compact mode (using sticky panel instead) */}
      {!isCompact && (
        <button
          type="submit"
          disabled={!formData.agreement || status === 'loading' || cart.length === 0}
          className="w-full py-4 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black text-lg rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={22} strokeWidth={2.5} /> 
              {formData.paymentMethod === 'card' ? 'Создаём платёж...' : 'Отправляем заказ...'}
            </>
          ) : (
            <>
              Оформить заказ
              <CreditCard size={22} strokeWidth={2.5} />
            </>
          )}
        </button>
      )}

      {!isCompact && (
        <p className="text-xs text-center text-brand-text-soft leading-relaxed">
          Нажимая кнопку, вы соглашаетесь с условиями оферты
        </p>
      )}
    </form>
  );
});

CheckoutForm.displayName = 'CheckoutForm';

export default CheckoutForm;


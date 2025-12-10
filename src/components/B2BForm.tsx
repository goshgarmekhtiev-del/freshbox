import React, { useState } from 'react';
import { X, CheckCircle2, Building2, Send, Loader2, Users, CalendarClock, Package, MessageSquare, Lightbulb, Mail, Phone } from 'lucide-react';
import { useFocusTrap } from '@/hooks';
import { B2BSelect } from '@/components/ui';

interface B2BFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const B2BForm: React.FC<B2BFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    teamSize: '', // Changed default to empty
    frequency: '', // Changed default to empty
    interest: '',
    comment: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const modalRef = useFocusTrap({ isOpen, onClose });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark only required fields as touched
    setTouched({
      company: true,
      name: true,
      email: true,
      teamSize: true,
      frequency: true
    });

    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setStatus('loading');
    
    try {
      // Отправляем заявку на serverless endpoint
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'B2B',
          name: formData.name,
          phone: formData.phone || '',
          email: formData.email,
          comment: formData.comment || '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send lead');
      }

      // Успешная отправка
      setStatus('success');
      
      // Auto-close after 5 seconds or user can click "Return to site"
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({
          company: '', name: '', phone: '', email: '',
          teamSize: '', frequency: '', interest: '', comment: ''
        });
        setErrors({});
        setTouched({});
      }, 5000);
    } catch (err) {
      console.error('Error sending B2B lead:', err);
      setStatus('idle');
      alert('Ошибка отправки заявки. Пожалуйста, попробуйте ещё раз.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
      case 'company':
        if (!value || value.trim().length < 2) {
          error = 'Введите название компании';
        }
        break;
      case 'name':
        if (!value || value.trim().length < 2) {
          error = 'Введите ваше имя';
        }
        break;
      case 'phone':
        // Phone is optional, but if provided, validate format
        if (value) {
          const phoneRegex = /^\+?[0-9]{10,15}$/;
          if (!phoneRegex.test(value.replace(/[\s()-]/g, ''))) {
            error = 'Неверный формат телефона';
          }
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Укажите email для связи';
        } else if (!emailRegex.test(value)) {
          error = 'Неверный формат email';
        }
        break;
      case 'teamSize':
        if (!value) {
          error = 'Выберите количество сотрудников';
        }
        break;
      case 'frequency':
        if (!value) {
          error = 'Выберите частоту поставок';
        }
        break;
      case 'interest':
        // Interest is optional, no validation needed
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
    // Only validate required fields (phone and comment are optional)
    const fieldsToValidate = ['company', 'name', 'email', 'teamSize', 'frequency'];
    let isValid = true;

    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const teamSizes = ['до 20', '20–50', '50–100', '100–300', '300+'];
  const frequencies = ['Разово', 'Еженедельно', '2 раза в неделю', 'Ежедневно'];
  const interestOptions = ['Фруктовые боксы', 'Подарочные наборы', 'Фрукты для офиса', 'Другое'];

  // Formatted options for B2BSelect
  const teamSizeOptions = teamSizes.map(size => ({ value: size, label: `${size} сотрудников` }));
  const frequencyOptions = frequencies.map(freq => ({ value: freq, label: freq }));
  const interestSelectOptions = interestOptions.map(opt => ({ value: opt, label: opt }));

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-start md:items-center justify-center p-4 animate-fade-in">
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="b2b-form-title"
        aria-describedby="b2b-form-description"
        className="relative w-full max-w-5xl max-h-[92vh] mt-6 md:mt-0 bg-white rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,0.4)] border-2 border-white/40 flex flex-col overflow-hidden"
      >
        
        {/* Success State */}
        {status === 'success' && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent via-brand-accent-dark to-brand-yellow rounded-[32px] flex flex-col items-center justify-center text-white z-20 p-8 md:p-12 text-center">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 animate-fade-in-up">
              <CheckCircle2 size={64} strokeWidth={2.5} className="text-white" />
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Заявка принята! 🎉
            </h3>
            <p className="text-lg md:text-xl font-semibold max-w-2xl leading-relaxed mb-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Мы отправили подтверждение на <span className="font-black underline">{formData.email}</span>
            </p>
            <p className="text-base md:text-lg font-medium text-white/90 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              Наш B2B-менеджер свяжется с вами в течение <span className="font-black">30–60 минут</span> в рабочее время и отправит персональное коммерческое предложение.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-4 bg-white text-brand-accent font-black text-lg rounded-full hover:scale-105 transition-all shadow-lg animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              Вернуться на сайт
            </button>
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Закрыть форму B2B"
          className="absolute top-6 right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-text/10 hover:bg-brand-text/20 flex items-center justify-center text-brand-text backdrop-blur-sm transition-all duration-300 hover:scale-110"
          disabled={status === 'loading'}
        >
          <X size={20} strokeWidth={2.5} className="md:w-6 md:h-6" />
        </button>

        {/* Header - Fixed */}
        <div className="flex-shrink-0 px-6 md:px-10 pt-8 md:pt-10 pb-6 border-b border-brand-text/5 bg-gradient-to-b from-white to-[#FFFEF9]">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white font-black text-xs uppercase tracking-wider shadow-sm mb-4 border border-white/30">
              <Building2 size={16} strokeWidth={2.5} />
              <span>B2B Предложение</span>
            </div>
            
            <h2 id="b2b-form-title" className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-text leading-tight mb-3">
              Коммерческое <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent-dark">предложение</span>
            </h2>
            
            <p id="b2b-form-description" className="text-base md:text-lg text-brand-text-soft font-semibold leading-relaxed max-w-3xl mx-auto">
              Заполните <span className="font-black text-brand-accent">5 обязательных полей</span> — мы подготовим персональное КП и отправим его на email в течение <span className="font-black text-brand-accent">30–60 минут</span> в рабочее время
            </p>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 py-6 md:py-8">

          <form id="b2b-form" onSubmit={handleSubmit} className="space-y-10">
            
            {/* ============================================ */}
            {/* БЛОК 1: ЧТО ВАМ НУЖНО */}
            {/* ============================================ */}
            <div className="space-y-5">
              {/* Block Header */}
              <div className="flex items-start gap-3 pb-3 border-b-2 border-[#D9F99D]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent/10 to-brand-yellow/10 flex items-center justify-center">
                  <Lightbulb size={20} strokeWidth={2.5} className="text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-text leading-tight">
                    1. Что вам нужно
                  </h3>
                  <p className="text-xs text-brand-text-soft font-medium mt-1">
                    Помогите нам понять формат поставок, чтобы сразу предложить подходящий вариант
                  </p>
                </div>
              </div>

              {/* Fields Grid */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Interest (Optional - first in block) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-brand-text tracking-wide mb-2">
                    <Package size={16} strokeWidth={2.5} className="text-brand-text/70 flex-shrink-0" />
                    <span>Интересует</span>
                    <span className="text-xs text-brand-text-soft font-normal ml-auto">(необязательно)</span>
                  </label>
                  <B2BSelect
                    value={formData.interest}
                    onChange={(value) => setFormData(prev => ({ ...prev, interest: value }))}
                    options={interestSelectOptions}
                    placeholder="Выберите, что интересует"
                    error={false}
                  />
                </div>

                {/* Frequency (Required) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-brand-text tracking-wide mb-2">
                    <CalendarClock size={16} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                    <span>Частота поставок</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <B2BSelect
                    value={formData.frequency}
                    onChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
                    onBlur={() => handleBlur('frequency')}
                    options={frequencyOptions}
                    placeholder="Выберите частоту"
                    error={!!(touched.frequency && errors.frequency)}
                  />
                  {touched.frequency && errors.frequency && (
                    <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0"></span>
                      {errors.frequency}
                    </p>
                  )}
                </div>

                {/* Team Size (Required) */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-brand-text tracking-wide mb-2">
                    <Users size={16} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                    <span>Количество сотрудников</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="max-w-md">
                    <B2BSelect
                      value={formData.teamSize}
                      onChange={(value) => setFormData(prev => ({ ...prev, teamSize: value }))}
                      onBlur={() => handleBlur('teamSize')}
                      options={teamSizeOptions}
                      placeholder="Выберите количество"
                      error={!!(touched.teamSize && errors.teamSize)}
                    />
                  </div>
                  {touched.teamSize && errors.teamSize && (
                    <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0"></span>
                      {errors.teamSize}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* БЛОК 2: О КОМПАНИИ */}
            {/* ============================================ */}
            <div className="space-y-5">
              {/* Block Header */}
              <div className="flex items-start gap-3 pb-3 border-b-2 border-[#D9F99D]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent/10 to-brand-yellow/10 flex items-center justify-center">
                  <Building2 size={20} strokeWidth={2.5} className="text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-text leading-tight">
                    2. О компании
                  </h3>
                  <p className="text-xs text-brand-text-soft font-medium mt-1">
                    Немного расскажите о вашей компании, чтобы мы точнее подобрали условия
                  </p>
                </div>
              </div>

              {/* Company Name Field */}
              <div className="max-w-2xl">
                <label className="flex items-center gap-2 text-sm font-bold text-brand-text tracking-wide mb-2">
                  <Building2 size={16} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                  <span>Название компании</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={() => handleBlur('company')}
                  className={`w-full px-5 py-3.5 rounded-full border-2 ${
                    touched.company && errors.company
                      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-[#D9F99D] bg-[#FCFFF7] focus:bg-white focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-light/30'
                  } outline-none transition-all text-brand-text placeholder:text-brand-text-soft/60 font-medium text-base shadow-sm hover:shadow-md`}
                  placeholder="ООО Ромашка"
                />
                {touched.company && errors.company && (
                  <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0"></span>
                    {errors.company}
                  </p>
                )}
              </div>
            </div>

            {/* ============================================ */}
            {/* БЛОК 3: КОНТАКТНЫЕ ДАННЫЕ */}
            {/* ============================================ */}
            <div className="space-y-5">
              {/* Block Header */}
              <div className="flex items-start gap-3 pb-3 border-b-2 border-[#D9F99D]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent/10 to-brand-yellow/10 flex items-center justify-center">
                  <Mail size={20} strokeWidth={2.5} className="text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-text leading-tight">
                    3. Контактные данные
                  </h3>
                  <p className="text-xs text-brand-text-soft font-medium mt-1">
                    Куда отправить коммерческое предложение и как к вам обратиться
                  </p>
                </div>
              </div>

              {/* Fields Grid */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-brand-text tracking-wide mb-2">
                    <Users size={16} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                    <span>Ваше имя</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-5 py-3.5 rounded-full border-2 ${
                      touched.name && errors.name
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-[#D9F99D] bg-[#FCFFF7] focus:bg-white focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-light/30'
                    } outline-none transition-all text-brand-text placeholder:text-brand-text-soft/60 font-medium text-base shadow-sm hover:shadow-md`}
                    placeholder="Иван Петров"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0"></span>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-brand-text tracking-wide mb-2">
                    <Phone size={16} strokeWidth={2.5} className="text-brand-text/70 flex-shrink-0" />
                    <span>Телефон</span>
                    <span className="text-xs text-brand-text-soft font-normal ml-auto">(необязательно)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-full border-2 border-[#D9F99D] bg-[#FCFFF7] focus:bg-white focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-light/30 outline-none transition-all text-brand-text placeholder:text-brand-text-soft/60 font-medium text-base shadow-sm hover:shadow-md"
                    placeholder="+7 (900) 123-45-67"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-brand-text tracking-wide mb-2">
                    <Mail size={16} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                    <span>Email для отправки КП</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={`w-full max-w-2xl px-5 py-3.5 rounded-full border-2 ${
                      touched.email && errors.email
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-[#D9F99D] bg-[#FCFFF7] focus:bg-white focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-light/30'
                    } outline-none transition-all text-brand-text placeholder:text-brand-text-soft/60 font-medium text-base shadow-sm hover:shadow-md`}
                    placeholder="ivan@romashka.ru"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Comment (Optional) - Full Width */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-brand-text tracking-wide mb-2">
                    <MessageSquare size={16} strokeWidth={2.5} className="text-brand-text/70 flex-shrink-0" />
                    <span>Дополнительная информация</span>
                    <span className="text-xs text-brand-text-soft font-normal ml-auto">(необязательно)</span>
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-5 py-4 rounded-3xl border-2 border-[#D9F99D] bg-[#FCFFF7] focus:bg-white focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-light/30 outline-none transition-all text-brand-text placeholder:text-brand-text-soft/60 font-medium text-base resize-none shadow-sm hover:shadow-md"
                    placeholder="Укажите особые пожелания, даты поставок, специальные требования..."
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Footer with CTA */}
        <div className="flex-shrink-0 px-6 md:px-10 py-4 md:py-5 border-t border-brand-text/5 bg-gradient-to-t from-white via-white/95 to-white/80 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Promise Text */}
            <div className="flex items-start gap-3 text-left">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center">
                <CheckCircle2 size={18} strokeWidth={2.5} className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-text leading-snug">
                  После отправки с вами свяжется B2B-менеджер
                </p>
                <p className="text-xs text-brand-text-soft font-medium mt-0.5">
                  В течение 30–60 минут в рабочее время
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              form="b2b-form"
              disabled={status === 'loading'}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black text-base md:text-lg rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95 flex items-center justify-center gap-3 group border-2 border-white/30 relative overflow-hidden whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative z-10 flex items-center gap-3">
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} strokeWidth={2.5} />
                    <span>Отправляем...</span>
                  </>
                ) : (
                  <>
                    <span>Получить КП</span>
                    <Send size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-xs text-brand-text-soft/70 font-medium mt-3">
            Мы не шлём спам и используем ваши данные только для расчёта предложения
          </p>
        </div>
      </div>
    </div>
  );
};

export default B2BForm;
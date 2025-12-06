import React, { useState } from 'react';
import { X, CheckCircle2, Building2, Send, Loader2, Users, CalendarClock, Package, MessageSquare, ChevronDown } from 'lucide-react';
import { useFocusTrap } from '../utils/useFocusTrap';

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
    
    // Mark all fields as touched
    setTouched({
      company: true,
      name: true,
      phone: true,
      email: true,
      teamSize: true,
      frequency: true,
      interest: true
    });

    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    console.log('B2B Form Data Submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setTimeout(() => {
      onClose();
      setStatus('idle');
      setFormData({
        company: '', name: '', phone: '', email: '',
        teamSize: '', frequency: '', interest: '', comment: ''
      });
      setErrors({});
      setTouched({});
    }, 4000);
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
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!value) {
          error = 'Укажите телефон для связи';
        } else if (!phoneRegex.test(value.replace(/[\s()-]/g, ''))) {
          error = 'Неверный формат телефона';
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
        if (!value) {
          error = 'Укажите, что вас интересует';
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
    const fieldsToValidate = ['company', 'name', 'phone', 'email', 'teamSize', 'frequency', 'interest'];
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

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="b2b-form-title"
        aria-describedby="b2b-form-description"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-white rounded-[--radius-card] shadow-[--shadow-elevated] border-3 border-white/30"
      >
        
        {/* Success State */}
        {status === 'success' && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-[--radius-card] flex flex-col items-center justify-center text-white z-10 p-12 text-center">
            <CheckCircle2 size={80} strokeWidth={1.5} className="mb-6 text-white" />
            <h3 className="text-4xl font-black mb-4">Спасибо!</h3>
            <p className="text-xl font-medium max-w-md leading-relaxed">
              Мы свяжемся с вами в течение 1 часа. Коммерческое предложение уже формируется.
            </p>
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Закрыть форму B2B"
          className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white backdrop-blur-sm z-10 transition-all duration-300 hover:scale-110"
          disabled={status === 'loading'}
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        {/* Form Content */}
        <div className="p-10 md:p-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white font-black text-sm uppercase tracking-[0.1em] shadow-[--shadow-soft] mb-6 border-2 border-white/30">
              <Building2 size={18} strokeWidth={2.5} />
              <span>B2B Предложение</span>
            </div>
            
            <h2 id="b2b-form-title" className="text-4xl md:text-5xl font-black text-brand-text tracking-tight mb-4">
              Коммерческое <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent-dark">предложение</span>
            </h2>
            <p id="b2b-form-description" className="text-xl text-brand-text-soft font-medium">
              Получите индивидуальные условия для вашей компании
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Company Info */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3">
                    <Building2 size={16} strokeWidth={2.5} className="text-brand-accent" />
                    Название компании
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={() => handleBlur('company')}
                    className={`w-full px-6 py-5 rounded-[--radius-ui] border-2 ${
                      touched.company && errors.company
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20'
                    } outline-none transition-all text-brand-text placeholder-brand-text-soft/70 font-medium text-base`}
                    placeholder="ООО Ромашка"
                  />
                  {touched.company && errors.company && (
                    <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3">
                    <Users size={16} strokeWidth={2.5} className="text-brand-accent" />
                    Количество сотрудников
                  </label>
                  <div className="relative">
                    <select
                      name="teamSize"
                      required
                      value={formData.teamSize}
                      onChange={handleChange}
                      onBlur={() => handleBlur('teamSize')}
                      className={`w-full px-6 py-5 rounded-[--radius-ui] border-2 ${
                        touched.teamSize && errors.teamSize
                          ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20'
                      } outline-none transition-all text-brand-text font-medium text-base appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Выберите количество</option>
                      {teamSizes.map(size => (
                        <option key={size} value={size}>{size} сотрудников</option>
                      ))}
                    </select>
                    <ChevronDown size={20} strokeWidth={2.5} className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-text-soft pointer-events-none" />
                  </div>
                  {touched.teamSize && errors.teamSize && (
                    <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      {errors.teamSize}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3">
                    <Users size={16} strokeWidth={2.5} className="text-brand-accent" />
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-6 py-5 rounded-[--radius-ui] border-2 ${
                      touched.name && errors.name
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20'
                    } outline-none transition-all text-brand-text placeholder-brand-text-soft/70 font-medium text-base`}
                    placeholder="Иван Петров"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3">
                    <Send size={16} strokeWidth={2.5} className="text-brand-accent" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-6 py-5 rounded-[--radius-ui] border-2 ${
                      touched.email && errors.email
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20'
                    } outline-none transition-all text-brand-text placeholder-brand-text-soft/70 font-medium text-base`}
                    placeholder="ivan@romashka.ru"
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

            {/* Additional Fields */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3">
                  <CalendarClock size={16} strokeWidth={2.5} className="text-brand-accent" />
                  Частота поставок
                </label>
                <div className="relative">
                  <select
                    name="frequency"
                    required
                    value={formData.frequency}
                    onChange={handleChange}
                    onBlur={() => handleBlur('frequency')}
                    className={`w-full px-6 py-5 rounded-[--radius-ui] border-2 ${
                      touched.frequency && errors.frequency
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20'
                    } outline-none transition-all text-brand-text font-medium text-base appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Выберите частоту</option>
                    {frequencies.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-text-soft pointer-events-none" />
                </div>
                {touched.frequency && errors.frequency && (
                  <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    {errors.frequency}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3">
                  <Package size={16} strokeWidth={2.5} className="text-brand-accent" />
                  Интересует
                </label>
                <div className="relative">
                  <select
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    onBlur={() => handleBlur('interest')}
                    className={`w-full px-6 py-5 rounded-[--radius-ui] border-2 ${
                      touched.interest && errors.interest
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20'
                    } outline-none transition-all text-brand-text font-medium text-base appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Выберите интерес</option>
                    {interestOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-text-soft pointer-events-none" />
                </div>
                {touched.interest && errors.interest && (
                  <p className="mt-2 text-sm font-bold text-red-500 flex items-start gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    {errors.interest}
                  </p>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3">
                <MessageSquare size={16} strokeWidth={2.5} className="text-brand-accent" />
                Дополнительная информация
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                className="w-full px-6 py-5 rounded-[--radius-ui] border-2 border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 outline-none transition-all text-brand-text placeholder-brand-text-soft/70 font-medium text-base resize-none"
                placeholder="Укажите особые пожелания, даты поставок, специальные требования..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-6 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black text-xl rounded-[--radius-ui] transition-all shadow-deep-xl hover:shadow-deep-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 mt-6 active:scale-95 hover:brightness-110 flex items-center justify-center gap-4 group border-3 border-white/30 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative z-10 flex items-center gap-4">
                {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={24} strokeWidth={2.5} /> Отправляем...
                    </>
                ) : (
                    <>
                      <span>Получить КП</span>
                      <Send size={24} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default B2BForm;
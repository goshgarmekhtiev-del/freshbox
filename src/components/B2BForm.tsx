
import React, { useState } from 'react';
import { X, CheckCircle2, Building2, Send, Loader2, Users, CalendarClock, Package, MessageSquare, ChevronDown } from 'lucide-react';

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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const teamSizes = ['до 20', '20–50', '50–100', '100–300', '300+'];
  const frequencies = ['Разово', 'Еженедельно', '2 раза в неделю', 'Ежедневно'];
  const interestOptions = ['Фруктовые боксы', 'Подарочные наборы', 'Фрукты для офиса', 'Другое'];

  // Uniform input classes - reduced padding slightly for better fit
  const inputClasses = "w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-brand-text placeholder-gray-400 text-sm";
  const selectClasses = "w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-brand-text appearance-none cursor-pointer text-sm";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl p-6 md:p-8 animate-fade-in-up border border-white/20 my-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full hover:bg-brand-accent hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-extrabold text-brand-text mb-4">Заявка принята!</h3>
            <p className="text-brand-text-soft font-medium text-lg max-w-sm">
              Мы уже готовим для вас индивидуальное предложение. Менеджер свяжется в ближайшее время.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-brand-accent font-bold uppercase tracking-wider text-xs mb-2 bg-orange-50 px-3 py-1 rounded-full">
                <Building2 size={14} />
                <span>Корпоративным клиентам</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-brand-text leading-tight">Коммерческое предложение</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Main Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-1.5 ml-1">Компания</label>
                  <input 
                    required
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Название компании"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-1.5 ml-1">Контактное лицо</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-1.5 ml-1">Телефон</label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 000-00-00" // Restored full placeholder
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-1.5 ml-1">Email</label>
                  <input 
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="corp@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Details - Removed bg-brand-bg to match other fields */}
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                 <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-1.5 ml-1">
                       <Users size={14} className="text-brand-accent"/> Размер команды
                    </label>
                    <div className="relative">
                      <select 
                        name="teamSize" 
                        value={formData.teamSize} 
                        onChange={handleChange}
                        required
                        className={`${selectClasses} ${!formData.teamSize ? 'text-gray-400' : 'text-brand-text'}`}
                      >
                        <option value="" disabled>Выбрать...</option>
                        {teamSizes.map(s => <option key={s} value={s} className="text-brand-text">{s} чел.</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                 </div>
                 <div className="relative">
                    <label className="flex items-center gap-2 text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-1.5 ml-1">
                       <CalendarClock size={14} className="text-brand-accent"/> Периодичность
                    </label>
                    <div className="relative">
                      <select 
                        name="frequency" 
                        value={formData.frequency} 
                        onChange={handleChange}
                        required
                        className={`${selectClasses} ${!formData.frequency ? 'text-gray-400' : 'text-brand-text'}`}
                      >
                        <option value="" disabled>Выбрать...</option>
                        {frequencies.map(f => <option key={f} value={f} className="text-brand-text">{f}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                 </div>
              </div>

              {/* Interests - Dropdown with default placeholder */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-1.5 ml-1">
                   <Package size={14} className="text-brand-accent"/> Что вас интересует?
                </label>
                <div className="relative">
                  <select 
                    name="interest" 
                    value={formData.interest} 
                    onChange={handleChange}
                    required
                    className={`${selectClasses} ${!formData.interest ? 'text-gray-400' : 'text-brand-text'}`}
                  >
                    <option value="" disabled>Выбрать...</option>
                    {interestOptions.map(opt => (
                      <option key={opt} value={opt} className="text-brand-text">{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Comment - Reduced height slightly */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-brand-text-soft uppercase tracking-wider mb-1.5 ml-1">
                   <MessageSquare size={14} className="text-brand-accent"/> Комментарий
                </label>
                <textarea 
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Ваши пожелания, бюджет или особые требования..."
                  className={`${inputClasses} h-20 resize-none`}
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-4 bg-brand-accent text-white rounded-xl font-bold text-lg hover:bg-brand-accent-dark transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 hover:brightness-110 flex items-center justify-center gap-3 mt-2"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Получить предложение <Send size={20} /></>}
              </button>
              
              <p className="text-[10px] text-center text-gray-400 font-medium mt-2">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default B2BForm;

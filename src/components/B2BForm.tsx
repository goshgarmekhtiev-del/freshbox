
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

  // Uniform input classes with improved styling
  const inputClasses = "w-full px-5 py-4 rounded-2xl glass border-2 border-orange-200/30 focus:border-orange-500 focus:shadow-soft outline-none transition-all font-medium text-brown-900 placeholder-brown-400 text-base";
  const selectClasses = "w-full px-5 py-4 rounded-2xl glass border-2 border-orange-200/30 focus:border-orange-500 focus:shadow-soft outline-none transition-all font-medium text-brown-900 appearance-none cursor-pointer text-base";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-brown-900/70 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative glass rounded-[3rem] w-full max-w-3xl shadow-deep-2xl p-8 md:p-12 animate-fade-in-up border-3 border-orange-200/40 my-4 max-h-[92vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 glass-dark rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 z-10 border-2 border-orange-200/30 hover:border-orange-500 hover:scale-110 hover:rotate-90"
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="w-28 h-28 bg-gradient-to-br from-lime-500 to-lime-600 text-white rounded-full flex items-center justify-center mb-8 shadow-deep-xl animate-bounce">
              <CheckCircle2 size={56} strokeWidth={2.5} />
            </div>
            <h3 className="text-4xl font-black text-brown-900 mb-5 tracking-tight">Заявка принята!</h3>
            <p className="text-brown-600 font-medium text-xl max-w-md leading-relaxed">
              Мы уже готовим для вас индивидуальное предложение. Менеджер свяжется в ближайшее время.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white font-black uppercase text-xs tracking-[0.15em] shadow-deep shadow-orange-400/50 mb-6 border-3 border-white/30">
                <Building2 size={16} strokeWidth={2.5} />
                <span>Корпоративным клиентам</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-brown-900 tracking-tight leading-tight">Коммерческое предложение</h3>
              <p className="text-brown-600 font-medium mt-3 text-lg">Заполните форму, и мы свяжемся с вами</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Main Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">Компания</label>
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
                  <label className="block text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">Контактное лицо</label>
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

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">Телефон</label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 000-00-00"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">Email</label>
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

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="relative">
                    <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                       <Users size={16} strokeWidth={2.5} className="text-orange-500"/> Размер команды
                    </label>
                    <div className="relative">
                      <select 
                        name="teamSize" 
                        value={formData.teamSize} 
                        onChange={handleChange}
                        required
                        className={`${selectClasses} ${!formData.teamSize ? 'text-brown-400' : 'text-brown-900'}`}
                      >
                        <option value="" disabled>Выбрать...</option>
                        {teamSizes.map(s => <option key={s} value={s} className="text-brown-900">{s} чел.</option>)}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-brown-400 pointer-events-none" size={18} strokeWidth={2.5} />
                    </div>
                 </div>
                 <div className="relative">
                    <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                       <CalendarClock size={16} strokeWidth={2.5} className="text-orange-500"/> Периодичность
                    </label>
                    <div className="relative">
                      <select 
                        name="frequency" 
                        value={formData.frequency} 
                        onChange={handleChange}
                        required
                        className={`${selectClasses} ${!formData.frequency ? 'text-brown-400' : 'text-brown-900'}`}
                      >
                        <option value="" disabled>Выбрать...</option>
                        {frequencies.map(f => <option key={f} value={f} className="text-brown-900">{f}</option>)}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-brown-400 pointer-events-none" size={18} strokeWidth={2.5} />
                    </div>
                 </div>
              </div>

              {/* Interests */}
              <div>
                <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                   <Package size={16} strokeWidth={2.5} className="text-orange-500"/> Что вас интересует?
                </label>
                <div className="relative">
                  <select 
                    name="interest" 
                    value={formData.interest} 
                    onChange={handleChange}
                    required
                    className={`${selectClasses} ${!formData.interest ? 'text-brown-400' : 'text-brown-900'}`}
                  >
                    <option value="" disabled>Выбрать...</option>
                    {interestOptions.map(opt => (
                      <option key={opt} value={opt} className="text-brown-900">{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-brown-400 pointer-events-none" size={18} strokeWidth={2.5} />
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="flex items-center gap-2 text-sm font-black text-brown-900 uppercase tracking-wider mb-3 ml-1">
                   <MessageSquare size={16} strokeWidth={2.5} className="text-orange-500"/> Комментарий
                </label>
                <textarea 
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Ваши пожелания, бюджет или особые требования..."
                  className={`${inputClasses} h-28 resize-none`}
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-6 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all duration-300 shadow-deep-xl hover:shadow-deep-2xl flex items-center justify-center gap-3 border-3 border-white/30 group relative overflow-hidden"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={24} strokeWidth={2.5} />
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                    <span className="relative z-10">Получить предложение</span>
                    <Send size={22} strokeWidth={2.5} className="relative z-10" />
                  </>
                )}
              </button>
              
              <p className="text-xs text-center text-brown-500/70 font-medium mt-4">
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

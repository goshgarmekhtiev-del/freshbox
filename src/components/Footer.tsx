import React, { useState } from 'react';
import { Instagram, Send, Phone, MapPin, ArrowRight, Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { ref: footerRef, isVisible: footerVisible } = useReveal({ threshold: 0.05 });

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Пожалуйста, введите email';
    } else if (!emailRegex.test(value)) {
      return 'Пожалуйста, введите корректный email';
    }
    return '';
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setIsSubmitting(true);
    setEmailError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setEmailSuccess(true);
    setEmail('');
    setIsSubmitting(false);
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setEmailSuccess(false);
    }, 5000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
    if (emailSuccess) {
      setEmailSuccess(false);
    }
  };

  const newsletterBenefits = [
    'Скидки до 50% на премиальные боксы',
    'Ранний доступ к редким фруктам и экзотике',
    'Без спама, только полезные подборки'
  ];

  return (
    <footer
      id="contacts"
      ref={footerRef}
      className={`relative bg-section-dark text-white py-16 lg:py-20 reveal overflow-hidden ${
        footerVisible ? 'reveal-visible' : ''
      }`}
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-accent/5 to-transparent rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-brand-yellow/5 to-transparent rounded-full blur-[120px] opacity-30 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
          
          {/* Left Column: Heading & Benefits */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-5 shadow-sm">
              <Sparkles size={12} strokeWidth={2.5} />
              Секретные акции
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              Секретные акции
            </h3>
            
            <p className="text-base lg:text-lg text-white/70 leading-relaxed mb-6">
              Подпишись и получай эксклюзивные скидки и предложения на лучшие фрукты
            </p>

            {/* Benefits List */}
            <ul className="space-y-3">
              {newsletterBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckCircle2 size={18} strokeWidth={2.5} className="text-brand-accent flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Form Card */}
          <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-6 lg:p-8 shadow-xl">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Ваш email" 
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isSubmitting}
                    className={`
                      w-full px-5 py-4 rounded-2xl text-white placeholder-white/40 
                      font-medium transition-all duration-200 outline-none
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${emailError
                        ? 'bg-red-500/20 border-2 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                        : emailSuccess
                          ? 'bg-emerald-500/20 border-2 border-emerald-400'
                          : 'bg-white/5 border-2 border-white/20 hover:border-white/30 focus:bg-white/10 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20'
                      }
                    `}
                  />
                </div>
                
                {/* Error Message with smooth animation */}
                <div 
                  className={`
                    overflow-hidden transition-all duration-200 ease-out
                    ${emailError ? 'max-h-8 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
                  `}
                >
                  <p className="text-xs font-semibold text-red-400 flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0"></span>
                    {emailError}
                  </p>
                </div>

                {/* Success Message with smooth animation */}
                <div 
                  className={`
                    overflow-hidden transition-all duration-200 ease-out
                    ${emailSuccess ? 'max-h-16 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
                  `}
                >
                  <div className="flex items-start gap-2 p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl">
                    <CheckCircle2 size={16} strokeWidth={2.5} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-emerald-100 leading-relaxed">
                      Готово! Мы будем присылать только вкусные предложения ✉️
                    </p>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full px-6 py-4 rounded-2xl
                  bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow 
                  text-white font-bold text-base
                  shadow-lg shadow-brand-accent/30
                  hover:shadow-xl hover:shadow-brand-accent/40 hover:scale-[1.02]
                  active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  transition-all duration-200
                  flex items-center justify-center gap-2 group
                "
              >
                <span>{isSubmitting ? 'Отправляем...' : 'Получать секретные акции'}</span>
                <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid - 4 Columns on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 border-t border-white/10 pt-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-accent-dark/20 flex items-center justify-center border border-white/10">
                <span className="text-2xl">🍊</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Fresh<span className="text-brand-accent">Box</span></h3>
                <p className="text-xs font-medium text-white/50">Премиум фрукты</p>
              </div>
            </div>
            
            <p className="text-sm text-white/60 leading-relaxed">
              Доставляем свежие фрукты высшего сорта прямо к вашей двери. Заботимся о вашем здоровье.
            </p>
            
            <div className="flex gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent hover:scale-110 transition-all duration-200"
              >
                <Instagram size={18} strokeWidth={2} />
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent hover:scale-110 transition-all duration-200"
              >
                <Send size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Contact Info */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">Контакты</h4>
            
            <div className="space-y-4">
              <a 
                href="tel:+74951234567"
                className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-accent/10 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                  <Phone size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm group-hover:text-brand-accent-light transition-colors">+7 (495) 123-45-67</p>
                  <p className="text-white/50 text-xs mt-0.5">Ежедневно 9:00–22:00</p>
                </div>
              </a>
              
              <a 
                href="mailto:hello@freshbox.ru"
                className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <Mail size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm group-hover:text-brand-accent-light transition-colors">hello@freshbox.ru</p>
                  <p className="text-white/50 text-xs mt-0.5">Ответим в течение часа</p>
                </div>
              </a>
              
              <div className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-white flex-shrink-0">
                  <MapPin size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Москва</p>
                  <p className="text-white/50 text-xs mt-0.5">Доставка в пределах МКАД</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Column 3: Navigation */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">Навигация</h4>
            
            <ul className="space-y-3">
              {[
                { label: 'Каталог боксов', id: 'catalog' },
                { label: 'Конструктор', id: 'configurator' },
                { label: 'Для бизнеса', id: 'b2b' },
                { label: 'FAQ', id: 'faq' }
              ].map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollTo(link.id)} 
                    className="text-white/60 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors flex-shrink-0"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Additional */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">Информация</h4>
            
            <ul className="space-y-3">
              {[
                { label: 'О компании', href: '#' },
                { label: 'Доставка и оплата', href: '#' },
                { label: 'Политика конфиденциальности', href: '#' },
                { label: 'Публичная оферта', href: '/offer' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors flex-shrink-0"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar - Clean & Tight */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} FreshBox. Все права защищены</p>
          <p className="flex items-center gap-2">
            <span>Сделано с</span>
            <span className="text-lg" role="img" aria-label="orange">🍊</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

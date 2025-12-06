import React, { useState } from 'react';
import { Instagram, Send, Phone, MapPin, ArrowRight, Mail, Shield, Truck, Award, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui';

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

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Укажите email';
    } else if (!emailRegex.test(value)) {
      return 'Неверный формат email';
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
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setEmailSuccess(false);
      setIsSubmitting(false);
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

  return (
    <footer id="contacts" className="relative bg-gradient-to-br from-brand-text via-brand-text-soft to-brand-green text-white/90 py-12 md:py-16 reveal overflow-hidden border-t-2 border-brand-accent-light/20">
      {/* Minimalist Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-accent/10 to-transparent rounded-full blur-[120px] opacity-30 pointer-events-none"></div>

      <Container>
        
        {/* Newsletter Section - Premium & Minimal */}
        <div className="rounded-2xl p-8 md:p-10 mb-12 md:mb-16 border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-accent/30 to-brand-yellow/20 flex items-center justify-center mb-3">
              <span className="text-2xl" role="img" aria-label="sparkles">✨</span>
            </div>
            <h3 className="text-brand-h3 text-white mb-2">Секретные акции</h3>
            <p className="text-brand-body text-brand-text-soft">Подпишись, чтобы ловить скидки до 50% и новые экзотические поставки.</p>
          </div>
          <form className="w-full md:w-auto flex-1 max-w-lg" onSubmit={handleEmailSubmit}>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50" size={20} strokeWidth={2} />
              <input 
                type="email" 
                placeholder="Ваш email" 
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
                className={`w-full pl-14 pr-16 py-4 border rounded-full text-white placeholder-white/40 focus:outline-none transition-all font-medium backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  emailError
                    ? 'bg-red-500/20 border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/30'
                    : emailSuccess
                      ? 'bg-brand-green/20 border-brand-green focus:border-brand-green focus:ring-2 focus:ring-brand-green/30'
                      : 'bg-white/5 border-white/20 focus:bg-white/10 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30'
                }`}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-brand-accent to-brand-accent-dark rounded-full flex items-center justify-center text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-brand-accent/20 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {emailSuccess ? (
                  <CheckCircle2 size={20} strokeWidth={2.5} />
                ) : (
                  <ArrowRight size={20} strokeWidth={2.5} />
                )}
              </button>
            </div>
            {emailError && (
              <p className="mt-2 text-sm font-medium text-red-400 flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0"></span>
                {emailError}
              </p>
            )}
            {emailSuccess && (
              <p className="mt-2 text-sm font-medium text-brand-green flex items-center gap-2">
                <CheckCircle2 size={16} strokeWidth={2} className="flex-shrink-0" />
                Готово! Проверяй почту — скидка уже летит к тебе!
              </p>
            )}
          </form>
        </div>

        {/* Trust Badges - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-accent/30 to-brand-accent-dark/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
              <Shield size={24} strokeWidth={2} className="text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Гарантия свежести</h4>
            <p className="text-brand-small text-brand-text-soft">Вернём деньги или заменим товар, если фрукты не совершенны</p>
          </div>
          
          <div className="rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green/30 to-brand-accent/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
              <Truck size={24} strokeWidth={2} className="text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Быстрая доставка</h4>
            <p className="text-brand-small text-brand-text-soft">Привезём в течение 2 часов в пределах МКАД</p>
          </div>
          
          <div className="rounded-xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow/30 to-brand-accent/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
              <Award size={24} strokeWidth={2} className="text-white" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Премиум качество</h4>
            <p className="text-brand-small text-brand-text-soft">Отбираем каждый фрукт вручную перед отправкой</p>
          </div>
        </div>

        {/* Main Footer Grid - Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
          
          {/* Brand Info */}
          <div className="space-y-5 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent/40 to-brand-accent-dark/40 flex items-center justify-center border border-white/20">
                <span className="text-xl">🍊</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Fresh<span className="text-brand-accent">Box</span></h3>
                <p className="text-xs font-medium text-brand-text-soft">Премиум фрукты с доставкой</p>
              </div>
            </div>
            
            <p className="text-brand-body text-brand-text-soft max-w-md">
              Доставляем свежие фрукты высшего сорта прямо к вашей двери. 
              Заботимся о вашем здоровье и настроении.
            </p>
            
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-300">
                <Instagram size={20} strokeWidth={2} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-300">
                <Send size={20} strokeWidth={2} />
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Контакты</h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-white group-hover:bg-brand-accent/30 transition-colors duration-300">
                  <Phone size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">+7 (495) 123-45-67</p>
                  <p className="text-brand-text-soft text-xs">Ежедневно с 9:00 до 22:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-white group-hover:bg-brand-green/30 transition-colors duration-300">
                  <Mail size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">hello@freshbox.ru</p>
                  <p className="text-brand-text-soft text-xs">Отвечаем в течение часа</p>
                </div>
              </div>
              
              <div 
                onClick={() => scrollTo('contacts')}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-white group-hover:bg-brand-yellow/30 transition-colors duration-300">
                  <MapPin size={16} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Москва</p>
                  <p className="text-brand-text-soft text-xs">Доставка в пределах МКАД</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Навигация</h4>
            
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => scrollTo('catalog')} 
                  className="text-brand-text-soft hover:text-brand-accent transition-all duration-300 text-left text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-accent/50 group-hover:bg-brand-accent transition-colors"></span>
                  Каталог боксов
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('configurator')} 
                  className="text-brand-text-soft hover:text-brand-accent transition-all duration-300 text-left text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-accent/50 group-hover:bg-brand-accent transition-colors"></span>
                  Конструктор боксов
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('faq')} 
                  className="text-brand-text-soft hover:text-brand-accent transition-all duration-300 text-left text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-accent/50 group-hover:bg-brand-accent transition-colors"></span>
                  Зона доставки
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('b2b')} 
                  className="text-brand-text-soft hover:text-brand-accent transition-all duration-300 text-left text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-accent/50 group-hover:bg-brand-accent transition-colors"></span>
                  Бизнес-предложение
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('order-form')} 
                  className="text-brand-text-soft hover:text-brand-accent transition-all duration-300 text-left text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-accent/50 group-hover:bg-brand-accent transition-colors"></span>
                  Конфиденциальность
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('order-form')} 
                  className="text-brand-text-soft hover:text-brand-accent transition-all duration-300 text-left text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-accent/50 group-hover:bg-brand-accent transition-colors"></span>
                  Оферта
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar - Minimal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs gap-4 text-brand-text-soft">
          <p className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} FreshBox.</span>
            <span className="hidden md:inline">Все права защищены</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span>Made with</span>
            <span className="text-base" role="img" aria-label="orange">🍊</span>
            <span>energy</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
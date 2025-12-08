import React, { useState } from 'react';
import { Instagram, Send, Phone, MapPin, ArrowRight, Mail, Shield, Truck, Award, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui';
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
    <footer
      id="contacts"
      ref={footerRef}
      className={`relative bg-gradient-to-b from-brand-text via-brand-text-soft to-brand-text text-white py-16 md:py-20 lg:py-24 reveal overflow-hidden ${
        footerVisible ? 'reveal-visible' : ''
      }`}
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-brand-accent/6 to-transparent rounded-full blur-[150px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-brand-green/5 to-transparent rounded-full blur-[150px] opacity-25 pointer-events-none"></div>

      <Container>
        
        {/* Newsletter Section - Modern & Clean */}
        <div className="rounded-[--radius-card] p-10 md:p-12 lg:p-16 mb-12 md:mb-16 lg:mb-20 border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 hover:border-brand-accent/30 hover:bg-white/8 transition-all duration-300 shadow-[--shadow-soft]">
          <div className="max-w-2xl">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-yellow/15 flex items-center justify-center mb-6">
              <span className="text-3xl" role="img" aria-label="sparkles">✨</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Секретные акции</h3>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">Подпишись, чтобы получать скидки до 50% и узнавать о новых экзотических поставках первым.</p>
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

        {/* Trust Badges - Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16 lg:mb-20">
          <div className="rounded-[--radius-card] p-8 md:p-10 border border-white/8 bg-white/3 backdrop-blur-sm hover:border-brand-accent/30 hover:bg-white/6 transition-all duration-300 group hover:-translate-y-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-accent-dark/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield size={28} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-3">Гарантия свежести</h4>
            <p className="text-base md:text-lg text-white/60 leading-relaxed">Вернём деньги или заменим товар, если фрукты не совершенны</p>
          </div>
          
          <div className="rounded-[--radius-card] p-8 md:p-10 border border-white/8 bg-white/3 backdrop-blur-sm hover:border-brand-accent/30 hover:bg-white/6 transition-all duration-300 group hover:-translate-y-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-green/20 to-brand-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Truck size={28} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-3">Быстрая доставка</h4>
            <p className="text-base md:text-lg text-white/60 leading-relaxed">Привезём в течение 2 часов в пределах МКАД</p>
          </div>
          
          <div className="rounded-[--radius-card] p-8 md:p-10 border border-white/8 bg-white/3 backdrop-blur-sm hover:border-brand-accent/30 hover:bg-white/6 transition-all duration-300 group hover:-translate-y-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-yellow/20 to-brand-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award size={28} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-3">Премиум качество</h4>
            <p className="text-base md:text-lg text-white/60 leading-relaxed">Отбираем каждый фрукт вручную перед отправкой</p>
          </div>
        </div>

        {/* Main Footer Grid - Modern Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20 mb-12 md:mb-16 lg:mb-20">
          
          {/* Brand Info */}
          <div className="space-y-8 lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-accent-dark/20 flex items-center justify-center border border-white/10">
                <span className="text-3xl">🍊</span>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white">Fresh<span className="text-brand-accent">Box</span></h3>
                <p className="text-base font-medium text-white/50 mt-1">Премиум фрукты с доставкой</p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
              Доставляем свежие фрукты высшего сорта прямо к вашей двери. 
              Заботимся о вашем здоровье и настроении.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent hover:scale-110 transition-all duration-300">
                <Instagram size={22} strokeWidth={2} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent hover:scale-110 transition-all duration-300">
                <Send size={22} strokeWidth={2} />
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-6">Контакты</h4>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-brand-accent/15 flex items-center justify-center text-white group-hover:bg-brand-accent/25 transition-colors duration-300 flex-shrink-0">
                  <Phone size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">+7 (495) 123-45-67</p>
                  <p className="text-white/50 text-sm mt-1">Ежедневно с 9:00 до 22:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-brand-green/15 flex items-center justify-center text-white group-hover:bg-brand-green/25 transition-colors duration-300 flex-shrink-0">
                  <Mail size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">hello@freshbox.ru</p>
                  <p className="text-white/50 text-sm mt-1">Отвечаем в течение часа</p>
                </div>
              </div>
              
              <div 
                onClick={() => scrollTo('contacts')}
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-brand-yellow/15 flex items-center justify-center text-white group-hover:bg-brand-yellow/25 transition-colors duration-300 flex-shrink-0">
                  <MapPin size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Москва</p>
                  <p className="text-white/50 text-sm mt-1">Доставка в пределах МКАД</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-6">Навигация</h4>
            
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => scrollTo('catalog')} 
                  className="text-white/60 hover:text-white transition-all duration-300 text-left text-base flex items-center gap-3 group"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors flex-shrink-0"></span>
                  Каталог боксов
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('configurator')} 
                  className="text-white/60 hover:text-white transition-all duration-300 text-left text-base flex items-center gap-3 group"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors flex-shrink-0"></span>
                  Конструктор боксов
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('faq')} 
                  className="text-white/60 hover:text-white transition-all duration-300 text-left text-base flex items-center gap-3 group"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors flex-shrink-0"></span>
                  Зона доставки
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('b2b')} 
                  className="text-white/60 hover:text-white transition-all duration-300 text-left text-base flex items-center gap-3 group"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors flex-shrink-0"></span>
                  Бизнес-предложение
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar - Clean */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} FreshBox. Все права защищены</p>
          <p className="flex items-center gap-2">
            <span>Сделано с</span>
            <span className="text-xl" role="img" aria-label="orange">🍊</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
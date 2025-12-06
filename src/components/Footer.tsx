import React, { useState } from 'react';
import { Instagram, Send, Phone, MapPin, ArrowRight, Mail, Shield, Truck, Award, CheckCircle2 } from 'lucide-react';

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
    <footer id="contacts" className="relative bg-gradient-to-br from-brand-text via-brand-text-soft to-brand-green text-white/90 py-24 md:py-32 reveal overflow-hidden">
      {/* Dark Background Blobs - Soft Accent Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-accent/15 to-transparent rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-yellow/10 to-transparent rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 relative z-10">
        
        {/* Newsletter Section */}
        <div className="glass-dark rounded-[3rem] p-10 md:p-14 mb-20 border-2 border-brand-accent/20 shadow-[--shadow-elevated] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-yellow/20 flex items-center justify-center mb-4">
              <span className="text-3xl" role="img" aria-label="sparkles">✨</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-white mb-3">Секретные акции</h3>
            <p className="text-lg font-medium text-white/90 leading-relaxed">Подпишись, чтобы ловить скидки до 50% и новые экзотические поставки.</p>
          </div>
          <form className="w-full md:w-auto flex-1 max-w-lg" onSubmit={handleEmailSubmit}>
            <div className="relative">
              <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-white/60" size={22} strokeWidth={2.5} />
              <input 
                type="email" 
                placeholder="Ваш email" 
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
                className={`w-full pl-16 pr-20 py-6 border-2 rounded-full text-white text-lg placeholder-white/50 focus:outline-none transition-all font-medium backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  emailError
                    ? 'bg-red-500/20 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/30'
                    : emailSuccess
                      ? 'bg-brand-green/20 border-brand-green focus:border-brand-green focus:ring-4 focus:ring-brand-green/30'
                      : 'bg-white/10 border-white/20 focus:bg-white/15 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/30'
                }`}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="absolute right-2.5 top-2.5 bottom-2.5 px-8 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow rounded-full flex items-center justify-center text-white hover:scale-105 hover:brightness-110 transition-all duration-300 shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] border-2 border-white/30 font-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100"
              >
                {emailSuccess ? (
                  <CheckCircle2 size={22} strokeWidth={2.5} />
                ) : (
                  <ArrowRight size={22} strokeWidth={2.5} />
                )}
              </button>
            </div>
            {emailError && (
              <p className="mt-3 text-sm font-bold text-red-400 flex items-start gap-2 ml-2">
                <span className="inline-block w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></span>
                {emailError}
              </p>
            )}
            {emailSuccess && (
              <p className="mt-3 text-sm font-bold text-brand-green flex items-start gap-2 ml-2">
                <CheckCircle2 size={16} strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
                Готово! Проверяй почту — скидка уже летит к тебе!
              </p>
            )}
          </form>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-dark rounded-[--radius-card] p-8 border-2 border-brand-accent/20 hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-deep-xl group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Shield size={32} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-white mb-2">Гарантия свежести</h4>
            <p className="text-sm font-medium text-white/80 leading-relaxed">Вернём деньги или заменим товар, если фрукты не совершенны</p>
          </div>
          
          <div className="glass-dark rounded-[--radius-card] p-8 border-2 border-brand-accent/20 hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-deep-xl group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-green to-brand-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Truck size={32} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-white mb-2">Быстрая доставка</h4>
            <p className="text-sm font-medium text-white/80 leading-relaxed">Привезём в течение 2 часов в пределах МКАД</p>
          </div>
          
          <div className="glass-dark rounded-[--radius-card] p-8 border-2 border-brand-accent/20 hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-deep-xl group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-yellow to-brand-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Award size={32} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-white mb-2">Премиум качество</h4>
            <p className="text-sm font-medium text-white/80 leading-relaxed">Отбираем каждый фрукт вручную перед отправкой</p>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center text-white font-black text-xl shadow-[--shadow-soft] border-2 border-white/20">
                <span className="text-2xl">🍊</span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-white">Fresh<span className="text-brand-accent">Box</span></h3>
                <p className="text-sm font-medium text-white/60 leading-relaxed">Премиум фрукты с доставкой</p>
              </div>
            </div>
            
            <p className="text-white/80 font-medium leading-relaxed">
              Доставляем свежие фрукты высшего сорта прямо к вашей двери. 
              Заботимся о вашем здоровье и настроении.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-accent transition-all duration-300 shadow-medium">
                <Instagram size={24} strokeWidth={2.5} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-accent transition-all duration-300 shadow-medium">
                <Send size={24} strokeWidth={2.5} />
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-white mb-6">Контакты</h4>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <Phone size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">+7 (495) 123-45-67</p>
                  <p className="text-white/70 text-sm font-medium">Ежедневно с 9:00 до 22:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green to-brand-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <Mail size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">hello@freshbox.ru</p>
                  <p className="text-white/70 text-sm font-medium">Отвечаем в течение часа</p>
                </div>
              </div>
              
              <div 
                onClick={() => scrollTo('contacts')}
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow to-brand-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Москва</p>
                  <p className="text-white/70 text-sm font-medium">Доставка в пределах МКАД</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-white mb-6">Навигация</h4>
            
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => scrollTo('catalog')} 
                  className="hover:text-brand-accent transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-brand-accent-dark transition-colors"></span>
                  Каталог боксов
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('configurator')} 
                  className="hover:text-brand-accent transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-brand-accent-dark transition-colors"></span>
                  Конструктор боксов
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('faq')} 
                  className="hover:text-brand-accent transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-brand-accent-dark transition-colors"></span>
                  Зона доставки
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('b2b')} 
                  className="hover:text-brand-accent transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-brand-accent-dark transition-colors"></span>
                  Бизнес-предложение
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('order-form')} 
                  className="hover:text-brand-accent transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-brand-accent-dark transition-colors"></span>
                  Конфиденциальность
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('order-form')} 
                  className="hover:text-brand-accent transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-brand-accent-dark transition-colors"></span>
                  Оферта
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm tracking-wide gap-6 font-bold text-white/40">
          <p className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} FreshBox.</span>
            <span className="hidden md:inline">Все права защищены</span>
          </p>
          <p className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-lg" role="img" aria-label="orange">🍊</span>
            <span>energy</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
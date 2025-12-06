
import React from 'react';
import { Instagram, Send, Phone, MapPin, ArrowRight, Mail, Shield, Truck, Award } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacts" className="relative bg-gradient-to-br from-brown-900 via-orange-950 to-brown-900 text-white/70 py-24 md:py-32 reveal overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/15 rounded-full blur-[150px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-peach-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 relative z-10">
        
        {/* Newsletter Section */}
        <div className="glass-dark rounded-[3rem] p-10 md:p-14 mb-20 border-2 border-orange-200/20 shadow-deep-xl flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-lg">
            <div className="text-6xl mb-4" role="img" aria-label="secret">🤫</div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Секретные акции</h3>
            <p className="text-white/90 font-medium text-lg leading-relaxed">Подпишись, чтобы ловить скидки до 50% и новые экзотические поставки.</p>
          </div>
          <form className="w-full md:w-auto flex-1 max-w-lg relative" onSubmit={(e) => e.preventDefault()}>
            <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-white/60" size={22} />
            <input 
              type="email" 
              placeholder="Ваш email" 
              className="w-full pl-16 pr-20 py-6 bg-white/10 border-2 border-white/20 rounded-full text-white text-lg placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-orange-400 transition-all font-medium backdrop-blur-sm"
            />
            <button className="absolute right-2.5 top-2.5 bottom-2.5 px-8 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-deep hover:shadow-deep-xl border-2 border-white/30 font-black">
              <ArrowRight size={22} strokeWidth={3} />
            </button>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-dark rounded-3xl p-8 border-2 border-orange-200/20 hover:border-orange-300/40 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-deep group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-peach-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Shield size={32} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-white font-black text-xl mb-2">Гарантия свежести</h4>
            <p className="text-white/80 font-medium leading-relaxed">Вернём деньги или заменим товар, если фрукты не совершенны</p>
          </div>
          <div className="glass-dark rounded-3xl p-8 border-2 border-orange-200/20 hover:border-peach-300/40 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-deep group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-peach-500 to-honey-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Truck size={32} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-white font-black text-xl mb-2">Быстрая доставка</h4>
            <p className="text-white/80 font-medium leading-relaxed">Привозим за 2–4 часа по всей Москве. Без задержек</p>
          </div>
          <div className="glass-dark rounded-3xl p-8 border-2 border-orange-200/20 hover:border-lime-300/40 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-deep group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-500 to-lime-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Award size={32} strokeWidth={2.5} className="text-white" />
            </div>
            <h4 className="text-white font-black text-xl mb-2">Премиум-качество</h4>
            <p className="text-white/80 font-medium leading-relaxed">Только отборные фрукты от проверенных поставщиков</p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-14 md:gap-10 mb-20 border-b-2 border-white/10 pb-20">
          <div className="col-span-1 md:col-span-2 pr-0 md:pr-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl" role="img" aria-label="orange">🍊</div>
              <h3 className="text-5xl font-black text-white tracking-tight">
                Fresh<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-peach-400 to-honey-400">.</span>Box
              </h3>
            </div>
            <p className="max-w-lg text-base leading-loose font-medium mb-10 text-white/70">
              Самый сочный сервис доставки в Москве. Мы верим, что фрукты должны быть яркими, вкусными и красивыми.
            </p>
            <div className="flex gap-5">
              <a 
                href="#" 
                className="w-14 h-14 glass-dark rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-peach-500 hover:text-white transition-all duration-300 border-2 border-white/10 hover:border-transparent hover:scale-110 shadow-soft hover:shadow-medium"
              >
                <Instagram size={24} strokeWidth={2} />
              </a>
              <a 
                href="#" 
                className="w-14 h-14 glass-dark rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-peach-500 hover:to-honey-400 hover:text-white transition-all duration-300 border-2 border-white/10 hover:border-transparent hover:scale-110 shadow-soft hover:shadow-medium"
              >
                <Send size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black text-xl mb-8 tracking-tight">Связь</h4>
            <ul className="space-y-7 text-base">
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-peach-500 flex items-center justify-center text-white mt-1 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-medium">
                  <Phone size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <a href="tel:+79990000000" className="text-white hover:text-orange-300 transition-colors block text-xl font-black mb-1">+7 (999) 000-00-00</a>
                  <span className="text-xs uppercase tracking-wider mt-1 block text-white/50 font-bold">09:00 — 21:00 Без выходных</span>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach-500 to-honey-400 flex items-center justify-center text-white mt-1 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-medium">
                   <MapPin size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="leading-relaxed font-bold text-white/90 block">Москва,</span>
                  <span className="leading-relaxed font-medium text-white/70">Пресненская наб., 12</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black text-xl mb-8 tracking-tight">Клиентам</h4>
            <ul className="space-y-5 text-base font-medium">
              <li>
                <button 
                  onClick={() => scrollTo('how-it-works')} 
                  className="hover:text-orange-300 transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:bg-orange-300 transition-colors"></span>
                  Как это работает
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('faq')} 
                  className="hover:text-orange-300 transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:bg-orange-300 transition-colors"></span>
                  Зона доставки
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('b2b')} 
                  className="hover:text-orange-300 transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:bg-orange-300 transition-colors"></span>
                  Бизнес-предложение
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('order-form')} 
                  className="hover:text-orange-300 transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:bg-orange-300 transition-colors"></span>
                  Конфиденциальность
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('order-form')} 
                  className="hover:text-orange-300 transition-all duration-300 text-left hover:translate-x-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:bg-orange-300 transition-colors"></span>
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
            <span className="text-2xl" role="img" aria-label="orange">🍊</span>
            <span>energy</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

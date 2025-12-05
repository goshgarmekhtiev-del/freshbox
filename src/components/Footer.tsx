
import React from 'react';
import { Instagram, Send, Phone, MapPin, ArrowRight, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacts" className="bg-[#064E3B] text-white/70 py-20 reveal relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Newsletter Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 mb-16 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Секретные акции 🤫</h3>
            <p className="text-white/80 font-medium">Подпишись, чтобы ловить скидки до 50% и новые экзотические поставки.</p>
          </div>
          <form className="w-full md:w-auto flex-1 max-w-md relative" onSubmit={(e) => e.preventDefault()}>
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50" size={20} />
            <input 
              type="email" 
              placeholder="Ваш email" 
              className="w-full pl-14 pr-16 py-5 bg-black/20 border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:bg-black/30 transition-all font-medium"
            />
            <button className="absolute right-2 top-2 bottom-2 w-12 bg-brand-accent rounded-full flex items-center justify-center text-white hover:bg-white hover:text-brand-accent transition-all shadow-lg hover:scale-110 active:scale-95 hover:shadow-xl hover:brightness-110">
              <ArrowRight size={20} />
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-16 border-b border-white/10 pb-16">
          <div className="col-span-1 md:col-span-2 pr-0 md:pr-12">
            <h3 className="text-3xl font-serif font-extrabold text-white mb-6 tracking-tight">
              Fresh<span className="text-brand-accent">.</span>Box
            </h3>
            <p className="max-w-md text-sm leading-loose font-medium mb-8 text-white/60">
              Самый сочный сервис доставки в Москве. Мы верим, что фрукты должны быть яркими, вкусными и красивыми.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all duration-300">
                <Send size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Связь</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-white mt-1 shrink-0">
                  <Phone size={14} />
                </div>
                <div>
                  <a href="tel:+79990000000" className="text-white hover:text-brand-accent transition-colors block text-lg font-bold">+7 (999) 000-00-00</a>
                  <span className="text-xs uppercase tracking-wider mt-1 block opacity-50">09:00 — 21:00 Без выходных</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-white mt-1 shrink-0">
                   <MapPin size={14} />
                </div>
                <span className="leading-relaxed font-medium text-white/80">Москва,<br/>Пресненская наб., 12</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Клиентам</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-brand-accent transition-colors text-left">Как это работает</button></li>
              <li><button onClick={() => scrollTo('faq')} className="hover:text-brand-accent transition-colors text-left">Зона доставки</button></li>
              <li><button onClick={() => scrollTo('b2b')} className="hover:text-brand-accent transition-colors text-left">Бизнес-предложение</button></li>
              <li><button onClick={() => scrollTo('order-form')} className="hover:text-brand-accent transition-colors text-left">Конфиденциальность</button></li>
              <li><button onClick={() => scrollTo('order-form')} className="hover:text-brand-accent transition-colors text-left">Оферта</button></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest gap-4 font-bold text-white/30">
          <p>© {new Date().getFullYear()} FreshBox.</p>
          <p>Made with 🍊 energy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

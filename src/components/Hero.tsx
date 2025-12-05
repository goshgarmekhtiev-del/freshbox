
import React from 'react';
import { ArrowRight, Zap, PlayCircle, Star } from 'lucide-react';
import { JUICY_IMAGES } from '../constants'; // Import the images object

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[105vh] flex flex-col justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-green-50 overflow-hidden pt-24 md:pt-0 reveal">
      
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-accent-light/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex-1 flex items-center pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent-light text-brand-text font-bold text-xs uppercase tracking-wider transform -rotate-2 shadow-sm mx-auto lg:mx-0">
              <Zap size={14} className="fill-brand-text" />
              <span>Заряд витаминов №1</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-sans font-extrabold leading-tight text-brand-text">
              Включи <span className="text-brand-accent relative inline-block">
                яркость
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-accent-light -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span> <br/>
              на максимум
            </h1>
            
            <p className="text-xl text-brand-text-soft font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Самые сочные фруктовые боксы в Москве. 
              Доставим за 2 часа или подарим бесплатно. Попробуй лето на вкус!
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
              <button 
                onClick={() => scrollTo('catalog')}
                className="px-10 py-5 bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white rounded-full font-extrabold text-lg tracking-wide shadow-xl shadow-brand-accent/30 hover:shadow-2xl hover:scale-105 active:scale-95 hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Хочу бокс! <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
              <button 
                onClick={() => scrollTo('configurator')}
                className="px-10 py-5 bg-white text-brand-text border-2 border-brand-text/10 rounded-full font-bold text-lg hover:border-brand-accent hover:text-brand-accent hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PlayCircle size={22} /> Конструктор
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
               <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full border-2 border-white" alt="Client"/>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full border-2 border-white" alt="Client"/>
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full border-2 border-white" alt="Client"/>
               </div>
               <div className="text-sm font-bold text-brand-text">
                 <span className="text-brand-accent">500+</span> счастливых клиентов сегодня
               </div>
            </div>
          </div>
          
          {/* Visual Content - 3D Splash / Levitation Effect */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
             <div className="relative w-full max-w-[600px] aspect-square animate-float">
                
                {/* Back Glow */}
                <div className="absolute inset-10 bg-brand-accent-light rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
                
                {/* Main 3D Image (Using local file from constants) */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img 
                      src={JUICY_IMAGES.box1} 
                      alt="3D Fruit Explosion Splash" 
                      className="w-full h-full object-contain drop-shadow-2xl transform scale-110 hover:scale-125 transition-transform duration-1000"
                    />
                </div>
                
                {/* Floating Glass Elements */}
                {/* Kiwi Card */}
                <div className="absolute top-10 -right-2 bg-white/30 backdrop-blur-xl border border-white/40 p-3 rounded-2xl shadow-xl z-20 rotate-12 animate-float-delayed">
                   <div className="bg-white/80 rounded-xl p-2 shadow-sm">
                      <span className="text-4xl">🥝</span>
                   </div>
                </div>

                {/* Orange Card */}
                <div className="absolute bottom-20 -left-6 bg-white/30 backdrop-blur-xl border border-white/40 p-3 rounded-2xl shadow-xl z-20 -rotate-12 animate-float">
                   <div className="bg-white/80 rounded-xl p-2 shadow-sm">
                      <span className="text-4xl">🍊</span>
                   </div>
                </div>

                {/* Promo Badge - Modern & Glassy */}
                <div className="absolute -bottom-6 right-10 bg-brand-text/80 backdrop-blur-xl text-white px-8 py-5 rounded-[2rem] shadow-2xl z-20 border border-brand-accent-light/20 animate-bounce-slow">
                  <p className="font-black text-3xl text-brand-accent-light leading-none">-20%</p>
                  <p className="text-[10px] font-bold opacity-90 uppercase tracking-widest mt-1">На первый заказ</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="absolute bottom-8 -left-[10%] w-[120%] bg-white/30 border-y border-white/40 overflow-hidden py-5 rotate-2 backdrop-blur-md z-20 shadow-lg">
        <div className="flex animate-marquee whitespace-nowrap">
           {[1,2,3,4,5,6,7,8,9,10].map((i) => (
             <div key={i} className="flex items-center gap-10 px-6">
               <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-green uppercase tracking-tighter drop-shadow-sm">
                 Fresh Only
               </span>
               <Star className="text-brand-accent fill-brand-accent" size={28} />
               <span className="text-4xl md:text-6xl font-black text-brand-accent uppercase tracking-tighter drop-shadow-sm">
                 2 Hours Delivery
               </span>
               <Star className="text-brand-green fill-brand-green" size={28} />
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

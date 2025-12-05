
import React from 'react';
import { MousePointerClick, Truck, Gift, ShoppingBag } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    { 
      num: '1', 
      title: 'Клик', 
      desc: 'Выбери готовый бокс или создай свой.',
      icon: <MousePointerClick size={32} strokeWidth={2.5} />
    },
    { 
      num: '2', 
      title: 'Заказ', 
      desc: 'Оставь контакт. Это займет 30 сек.',
      icon: <ShoppingBag size={32} strokeWidth={2.5} />
    },
    { 
      num: '3', 
      title: 'Вжух', 
      desc: 'Курьер мчит к тебе. Всего 2 часа.',
      icon: <Truck size={32} strokeWidth={2.5} />
    },
    { 
      num: '4', 
      title: 'Вау!', 
      desc: 'Ты наслаждаешься сочными фруктами.',
      icon: <Gift size={32} strokeWidth={2.5} />
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-brand-bg reveal">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-accent font-black tracking-[0.2em] uppercase text-xs">Все просто</span>
          <h2 className="text-4xl font-extrabold text-brand-text mt-3">Как мы работаем</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-3 bg-white shadow-sm rounded-full"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative z-10 group cursor-default">
              <div className="w-24 h-24 bg-white border-8 border-brand-bg rounded-full flex items-center justify-center text-brand-text mb-8 shadow-xl group-hover:bg-brand-accent group-hover:text-white group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
                {step.icon}
              </div>
              <h3 className="text-2xl font-extrabold text-brand-text mb-3">{step.title}</h3>
              <p className="text-brand-text-soft text-base leading-relaxed font-bold px-4 opacity-70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

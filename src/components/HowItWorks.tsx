import React from 'react';
import { MousePointerClick, Truck, Gift, ShoppingBag } from 'lucide-react';
import { useStaggeredReveal } from '../utils/useReveal';
import { SectionLight } from './ui';

const HowItWorks: React.FC = () => {
  const stepReveals = useStaggeredReveal(4, 200, 120);

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
    <SectionLight id="how-it-works" className="reveal">
      <div className="text-center mb-20">
        <span className="text-sm font-bold text-brand-accent leading-relaxed tracking-wider uppercase">Все просто</span>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-brand-text mt-3">Как мы работаем</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-10 left-0 w-full h-3 bg-white shadow-[--shadow-soft] rounded-full"></div>
        
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            ref={stepReveals[idx].ref as React.RefObject<HTMLDivElement>}
            className={`flex flex-col items-center text-center relative z-10 group cursor-default reveal reveal-scale-in ${stepReveals[idx].isVisible ? 'reveal-visible' : ''}`}
          >
            <div className="w-24 h-24 bg-white border-8 border-brand-accent-light rounded-full flex items-center justify-center text-brand-text mb-8 shadow-[--shadow-soft] group-hover:bg-brand-accent group-hover:text-white group-hover:scale-110 transition-all duration-300">
              {step.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-brand-text mb-3">{step.title}</h3>
            <p className="text-lg font-medium text-brand-text-soft leading-relaxed px-4">{step.desc}</p>
          </div>
        ))}
      </div>
    </SectionLight>
  );
};

export default HowItWorks;
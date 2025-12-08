import React from 'react';
import { MousePointerClick, Truck, Gift, ShoppingBag } from 'lucide-react';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

const HowItWorks: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
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
    <SectionLight id="how-it-works" ref={sectionRef} className={`reveal ${sectionVisible ? 'reveal-visible' : ''}`} withBlobs={true}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Centered */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-8">
            Процесс
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-text leading-[0.9] mb-8 max-w-4xl mx-auto">
            Как мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">работаем</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed">
            Заказ премиальных фруктов — это просто и быстро. Всего 4 шага до свежести.
          </p>
        </div>

        {/* Steps - Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              ref={stepReveals[idx].ref as React.RefObject<HTMLDivElement>}
              className={`group relative reveal reveal-fade-up ${stepReveals[idx].isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Step Number Badge - Top */}
                <div className="mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-brand-accent font-black text-2xl md:text-3xl shadow-[--shadow-elevated] border-2 border-brand-accent/20 group-hover:scale-110 transition-all duration-500">
                    {step.num}
                  </div>
                </div>
                
                {/* Icon Container - Centered */}
                <div className="mb-8">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center text-white shadow-[--shadow-elevated] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <div className="scale-125">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Content - Centered */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-text mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-brand-text-soft leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Connector Line - Between Steps (Desktop Only) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 w-full h-0.5 bg-gradient-to-r from-brand-accent/20 via-brand-accent/40 to-transparent translate-x-1/2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionLight>
  );
};

export default HowItWorks;
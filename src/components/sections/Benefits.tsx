
import React from 'react';
import { Truck, ShieldCheck, Heart, Sun } from 'lucide-react';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { SectionDark } from '@/components/ui';

const Benefits: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const benefitReveals = useStaggeredReveal(4, 150, 100);

  const benefits = [
    {
      icon: <Sun size={32} strokeWidth={2.5} />,
      title: 'Вкус лета',
      text: 'Фрукты, созревшие на солнце. Максимум сахара и пользы.'
    },
    {
      icon: <Truck size={32} strokeWidth={2.5} />,
      title: 'Пуля-доставка',
      text: '120 минут по Москве. Мы ценим вашу скорость жизни.'
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={2.5} />,
      title: 'Честная гарантия',
      text: 'Одно пятнышко? Заменим весь бокс бесплатно.'
    },
    {
      icon: <Heart size={32} strokeWidth={2.5} />,
      title: 'С любовью',
      text: 'Каждый бокс собираем как для мамы. Аккуратно и с душой.'
    }
  ];

  return (
    <SectionDark ref={sectionRef} className={`reveal ${sectionVisible ? 'reveal-visible' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Centered, Bold */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-white font-bold text-xs uppercase tracking-widest mb-8">
            Преимущества
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] mb-8 max-w-4xl mx-auto">
            Что делает нас <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-yellow to-brand-green">особенными</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Каждая деталь продумана для вашего комфорта и удовольствия
          </p>
        </div>

        {/* Benefits - Modern Grid with Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`group relative overflow-hidden bg-white/3 backdrop-blur-sm rounded-[--radius-card] p-10 md:p-12 lg:p-14 border border-white/8 hover:border-brand-accent/30 hover:bg-white/8 transition-all duration-500 hover:shadow-[--shadow-elevated] hover:-translate-y-2 reveal reveal-fade-up ${benefitReveals[index].isVisible ? 'reveal-visible' : ''}`}
            >
              {/* Accent Gradient on Hover - Softer */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-brand-yellow/3 to-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon - Large, Bold */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-brand-accent/15 to-brand-yellow/15 border border-brand-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[--shadow-soft]">
                    <div className="text-white scale-125">
                      {benefit.icon}
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionDark>
  );
};

export default Benefits;

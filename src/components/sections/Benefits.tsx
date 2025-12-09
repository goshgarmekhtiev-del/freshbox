import React from 'react';
import { Truck, ShieldCheck, Heart, Sun, CheckCircle } from 'lucide-react';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { SectionDark } from '@/components/ui';

interface BenefitItem {
  label: string;
  icon: React.ReactNode;
  title: string;
  bullets: string[];
}

const Benefits: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const benefitReveals = useStaggeredReveal(4, 150, 100);

  const benefits: BenefitItem[] = [
    {
      label: 'Качество',
      icon: <Sun size={40} strokeWidth={2.5} />,
      title: 'Только спелые фрукты',
      bullets: [
        'Отбираем каждый фрукт вручную',
        'Работаем только с проверенными поставщиками',
        'Если что-то не понравилось — вернём или заменим бокс'
      ]
    },
    {
      label: 'Скорость',
      icon: <Truck size={40} strokeWidth={2.5} />,
      title: 'Доставка за ~120 минут',
      bullets: [
        'Привезём в течение ~2 часов по Москве',
        'Охлаждённые боксы, ничего не поплывёт',
        'Удобные слоты доставки под ваш график'
      ]
    },
    {
      label: 'Гарантия',
      icon: <ShieldCheck size={40} strokeWidth={2.5} />,
      title: 'Честная гарантия FreshBox',
      bullets: [
        'Одно пятнышко — меняем весь бокс бесплатно',
        'Фотоконтроль перед отправкой',
        'Заботимся о репутации сильнее, чем о разовой прибыли'
      ]
    },
    {
      label: 'Забота',
      icon: <Heart size={40} strokeWidth={2.5} />,
      title: 'Собираем как для близких',
      bullets: [
        'Аккуратная выкладка в каждой коробке',
        'Упаковка "как подарок" по умолчанию',
        'Можно добавить открытку с вашим текстом'
      ]
    }
  ];

  return (
    <SectionDark ref={sectionRef} className={`reveal ${sectionVisible ? 'reveal-visible' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered, Compact */}
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-white font-bold text-xs uppercase tracking-widest mb-6">
            Преимущества
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto tracking-tight">
            Что делает нас{' '}
            <span className="inline-block text-[1.15em] text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-yellow to-brand-green drop-shadow-[0_0_30px_rgba(234,88,12,0.5)]">
              особенными
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Каждая деталь продумана для вашего комфорта и удовольствия
          </p>
        </div>

        {/* Benefits Grid - Equal height cards, 2×2 on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-brand-accent/40 hover:bg-white/8 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(234,88,12,0.2)] hover:-translate-y-2 reveal reveal-fade-up ${
                benefitReveals[index].isVisible ? 'reveal-visible' : ''
              }`}
            >
              {/* Accent Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 via-brand-yellow/5 to-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Content - Flex column for equal height */}
              <div className="relative z-10 h-full flex flex-col py-8 px-8 md:py-10 md:px-10">
                {/* Icon - with enhanced hover effect */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-yellow/20 border border-brand-accent/30 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-[0_10px_40px_rgba(234,88,12,0.4)]">
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                  {benefit.title}
                </h3>

                {/* Label Badge - closer to title */}
                <span className="inline-flex self-start items-center px-3 py-1 rounded-full bg-brand-accent/30 border border-brand-accent/50 text-white text-xs font-bold uppercase tracking-wide backdrop-blur-sm mb-5 shadow-sm">
                  {benefit.label}
                </span>
                
                {/* Bullets - push to bottom with mt-auto */}
                <ul className="space-y-3 mt-auto">
                  {benefit.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3 text-white/80 text-sm md:text-base leading-relaxed">
                      <CheckCircle 
                        size={18} 
                        strokeWidth={2.5} 
                        className="flex-shrink-0 mt-0.5 text-brand-green" 
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </SectionDark>
  );
};

export default Benefits;

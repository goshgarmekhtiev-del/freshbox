import React from 'react';
import { Sparkles, Package, BadgeCheck, Apple } from 'lucide-react';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

interface Benefit {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    id: '1',
    icon: Apple,
    title: 'Только премиальные фрукты',
    description: 'Отбираем каждый фрукт вручную. Никаких компромиссов в качестве.'
  },
  {
    id: '2',
    icon: Sparkles,
    title: 'Сбор в день доставки',
    description: 'Утром на базе — в обед у вас. Максимальная свежесть гарантирована.'
  },
  {
    id: '3',
    icon: Package,
    title: 'Идеально упаковано',
    description: 'Красивая экологичная упаковка. Готово к подарку и сторис.'
  },
  {
    id: '4',
    icon: BadgeCheck,
    title: '100% свежесть гарантирована',
    description: 'Не понравилось? Вернём деньги без лишних вопросов.'
  }
];

const WhyFreshBox: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const benefitReveals = useStaggeredReveal(BENEFITS.length, 100, 150);

  return (
    <SectionLight id="why-freshbox" ref={sectionRef} className={`reveal ${sectionVisible ? 'reveal-visible' : ''}`} withBlobs={true}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Centered, Bold */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/8 border border-brand-green/15 text-brand-green font-bold text-xs uppercase tracking-widest mb-8">
            Наша философия
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-text leading-[0.9] mb-8 max-w-4xl mx-auto">
            Почему <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-accent to-brand-yellow">FreshBox</span>?
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed">
            Мы делаем больше, чем доставляем фрукты — мы дарим радость и заботу о вашем здоровье
          </p>
        </div>

        {/* Benefits Grid - Modern 2x2 Layout with More Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
                className={`group relative overflow-hidden bg-white rounded-[--radius-card] p-10 md:p-12 lg:p-14 border border-brand-text/5 hover:border-brand-accent/20 transition-all duration-500 hover:shadow-[--shadow-elevated] hover:-translate-y-2 reveal reveal-fade-up ${
                  benefitReveals[index].isVisible ? 'reveal-visible' : ''
                }`}
              >
                {/* Subtle Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/2 via-brand-accent-light/1 to-brand-yellow/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon - Modern Style, Larger */}
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-brand-green/8 to-brand-accent-light/8 border border-brand-green/15 group-hover:bg-gradient-to-br group-hover:from-brand-green/15 group-hover:to-brand-accent-light/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Icon 
                        size={40} 
                        strokeWidth={2.5} 
                        className="text-brand-green group-hover:text-brand-accent transition-colors duration-500" 
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-text mb-4 leading-tight">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-brand-text-soft leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionLight>
  );
};

export default WhyFreshBox;

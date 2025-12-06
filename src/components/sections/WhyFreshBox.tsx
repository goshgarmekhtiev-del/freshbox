import React from 'react';
import { Sparkles, Package, BadgeCheck, Apple } from 'lucide-react';
import { useStaggeredReveal } from '@/hooks';
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
  const benefitReveals = useStaggeredReveal(BENEFITS.length, 100, 150);

  return (
    <SectionLight id="why-freshbox" className="reveal">
      <div className="text-center mb-12 md:mb-16">
        <span className="text-brand-overline">Why Choose Us</span>
        <h2 className="text-brand-h2 mt-4">Почему FreshBox?</h2>
        <p className="text-brand-body mt-6 max-w-2xl mx-auto">
          Мы делаем больше, чем доставляем фрукты — мы дарим радость и заботу о вашем здоровье
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {BENEFITS.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.id}
              ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`flex flex-col items-center text-center p-8 rounded-[--radius-card] bg-white/70 backdrop-blur-xl border border-white shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] hover:-translate-y-2 transition-all duration-300 group reveal reveal-fade-up ${
                benefitReveals[index].isVisible ? 'reveal-visible' : ''
              }`}
            >
              {/* Icon Container with Premium Gradient Background */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 via-brand-accent-light/30 to-brand-yellow/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-green/10 to-brand-accent-light/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon 
                    size={32} 
                    strokeWidth={2.5} 
                    className="text-brand-green group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-brand-text mb-3 leading-snug">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-base font-medium text-brand-text-soft leading-relaxed">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionLight>
  );
};

export default WhyFreshBox;

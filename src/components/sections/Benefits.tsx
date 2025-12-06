
import React from 'react';
import { Truck, ShieldCheck, Heart, Sun } from 'lucide-react';
import { useStaggeredReveal } from '@/hooks';
import { SectionDark } from '@/components/ui';

const Benefits: React.FC = () => {
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
    <SectionDark className="reveal">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
            className={`flex flex-col items-center text-center group bg-white/5 p-6 rounded-[--radius-card] border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm reveal reveal-fade-up ${benefitReveals[index].isVisible ? 'reveal-visible' : ''}`}
          >
            <div className="w-20 h-20 rounded-[--radius-ui] bg-brand-accent-light text-brand-text flex items-center justify-center mb-6 shadow-[--shadow-soft] group-hover:scale-110 transition-transform duration-300">
              {benefit.icon}
            </div>
            <h3 className="text-brand-h3 mb-4">{benefit.title}</h3>
            <p className="text-brand-small text-white/90">{benefit.text}</p>
          </div>
        ))}
      </div>
    </SectionDark>
  );
};

export default Benefits;

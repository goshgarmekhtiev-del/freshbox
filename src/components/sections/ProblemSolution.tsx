import React from 'react';
import { Clock, Gift, Zap, CheckCircle2, Heart } from 'lucide-react';
import { useStaggeredReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

const ProblemSolution: React.FC = () => {
  const cardReveals = useStaggeredReveal(3, 100, 150);

  const cards = [
    {
      icon: <Clock size={40} strokeWidth={2.5} />,
      title: 'Экономим ваше',
      titleBreak: 'время',
      text: 'Никаких пробок и очередей. Закажите в пару кликов, и через 2 часа курьер уже звонит в дверь.',
      badge: 'Быстрая доставка',
      badgeIcon: <Zap size={16} strokeWidth={2.5} fill="currentColor" />,
      badgeColor: 'orange',
      gradient: 'from-brand-accent to-brand-accent-dark',
      hoverShadow: 'hover:shadow-brand-accent/20',
      hoverBorder: 'hover:border-brand-accent/20'
    },
    {
      icon: <CheckCircle2 size={40} strokeWidth={2.5} />,
      title: 'Гарантия',
      titleBreak: 'сладости',
      text: 'Мы пробуем каждую партию. Если фрукт не идеален, он не попадет в коробку. Только спелое и сочное.',
      badge: 'Ручной отбор',
      badgeIcon: <CheckCircle2 size={16} strokeWidth={2.5} />,
      badgeColor: 'green',
      gradient: 'from-brand-green to-brand-green',
      hoverShadow: 'hover:shadow-brand-green/20',
      hoverBorder: 'hover:border-brand-green/20'
    },
    {
      icon: <Gift size={40} strokeWidth={2.5} />,
      title: 'WOW-эффект',
      titleBreak: 'подарка',
      text: 'Крафтовая упаковка, ленты, открытки. Идеальный способ сказать "Люблю" или "Спасибо".',
      badge: 'Premium Pack',
      badgeIcon: <Heart size={16} strokeWidth={2.5} fill="currentColor" />,
      badgeColor: 'accent',
      gradient: 'from-brand-accent-light to-brand-yellow',
      hoverShadow: 'hover:shadow-brand-accent/20',
      hoverBorder: 'hover:border-brand-accent/20'
    }
  ];

  return (
    <SectionLight className="reveal" withBlobs={true}>
      <div className="text-center mb-16">
         <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-brand-text tracking-tight mb-4">Почему выбирают нас?</h2>
         <p className="text-lg font-medium text-brand-text-soft leading-relaxed max-w-2xl mx-auto">Мы решаем главную проблему — где найти вкусные фрукты в мегаполисе</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {cards.map((card, index) => (
          <div 
            key={index}
            ref={cardReveals[index].ref as React.RefObject<HTMLDivElement>}
            className={`group bg-white p-8 rounded-[--radius-card] shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] transition-all duration-300 hover:-translate-y-2 border-2 border-transparent ${card.hoverBorder} reveal reveal-scale-in ${cardReveals[index].isVisible ? 'reveal-visible' : ''}`}
          >
            <div className={`w-20 h-20 rounded-[--radius-ui] bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {card.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-brand-text mb-4">
              {card.title} <br/>{card.titleBreak}
            </h3>
            <p className="text-lg font-medium text-brand-text-soft leading-relaxed mb-6">
              {card.text}
            </p>
            <div className={`inline-flex items-center gap-2 ${
              card.badgeColor === 'orange' ? 'text-brand-accent bg-brand-accent/10' :
              card.badgeColor === 'green' ? 'text-brand-green bg-brand-green/10' :
              'text-brand-accent bg-brand-accent/10'
            } font-black text-sm uppercase tracking-wider px-4 py-2 rounded-lg`}>
              {card.badgeIcon} {card.badge}
            </div>
          </div>
        ))}
      </div>
    </SectionLight>
  );
};

export default ProblemSolution;
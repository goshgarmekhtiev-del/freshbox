import React from 'react';
import { Clock, Gift, Zap, CheckCircle2, Heart } from 'lucide-react';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

const ProblemSolution: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
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
    <SectionLight ref={sectionRef} className={`reveal ${sectionVisible ? 'reveal-visible' : ''}`} withBlobs={true}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Centered, Bold */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-8">
            Решение проблемы
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-text leading-[0.9] mb-8 max-w-5xl mx-auto">
            Где найти <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">вкусные фрукты</span> в мегаполисе?
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed">
            Мы решаем эту проблему раз и навсегда
          </p>
        </div>

        {/* Cards - Modern Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {cards.map((card, index) => (
            <div 
              key={index}
              ref={cardReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`group relative overflow-hidden bg-white rounded-[--radius-card] p-10 md:p-12 lg:p-14 border border-brand-text/5 hover:border-brand-accent/20 transition-all duration-500 hover:shadow-[--shadow-elevated] hover:-translate-y-2 reveal reveal-fade-up ${cardReveals[index].isVisible ? 'reveal-visible' : ''}`}
            >
              {/* Background Gradient Accent - Subtle */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                card.badgeColor === 'orange' ? 'bg-gradient-to-br from-brand-accent/3 to-transparent' :
                card.badgeColor === 'green' ? 'bg-gradient-to-br from-brand-green/3 to-transparent' :
                'bg-gradient-to-br from-brand-yellow/3 to-transparent'
              }`}></div>
              
              {/* Icon - Large, Centered */}
              <div className={`relative z-10 flex justify-center mb-8`}>
                <div className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-[--shadow-elevated] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <div className="scale-125">
                    {card.icon}
                  </div>
                </div>
              </div>

              {/* Content - Centered */}
              <div className="relative z-10 text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-text leading-tight mb-4">
                  {card.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent-dark">{card.titleBreak}</span>
                </h3>
                <p className="text-base md:text-lg text-brand-text-soft leading-relaxed mb-8">
                  {card.text}
                </p>
                <div className={`inline-flex items-center gap-2.5 ${
                  card.badgeColor === 'orange' ? 'text-brand-accent bg-brand-accent/8 border-brand-accent/15' :
                  card.badgeColor === 'green' ? 'text-brand-green bg-brand-green/8 border-brand-green/15' :
                  'text-brand-accent bg-brand-accent/8 border-brand-accent/15'
                } font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full border`}>
                  {card.badgeIcon} {card.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionLight>
  );
};

export default ProblemSolution;